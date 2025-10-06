import { google } from 'googleapis';
import { AnalyticsData, LandingPageData, TrafficDataPoint, GoogleAPIError } from '@/types/google-api';
import { handleGoogleAPIError, retryWithBackoff, ReportGenerationError } from './error-handling';
import { createGoogleAuthClient, refreshAccessToken } from './config';

export class AnalyticsClient {
  private analyticsData = google.analyticsdata('v1beta');

  /**
   * Get comprehensive organic traffic data from Google Analytics 4
   */
  async getOrganicTrafficData(
    propertyId: string,
    accessToken: string,
    startDate: string,
    endDate: string
  ): Promise<AnalyticsData> {
    try {
      return await retryWithBackoff(async () => {
        const auth = createGoogleAuthClient();
        auth.setCredentials({ access_token: accessToken });

        // Calculate previous period for comparison
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        const daysDiff = Math.ceil((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24));
        
        const prevEndDate = new Date(startDateObj);
        prevEndDate.setDate(prevEndDate.getDate() - 1);
        const prevStartDate = new Date(prevEndDate);
        prevStartDate.setDate(prevStartDate.getDate() - daysDiff);

        // Get current and previous period data, plus landing pages and traffic trend
        const [currentResponse, previousResponse, landingPages, trafficTrend] = await Promise.all([
          this.getOrganicMetrics(propertyId, auth, startDate, endDate),
          this.getOrganicMetrics(propertyId, auth, prevStartDate.toISOString().split('T')[0]!, prevEndDate.toISOString().split('T')[0]!),
          this.getTopLandingPages(propertyId, accessToken, startDate, endDate),
          this.getTrafficTrend(propertyId, auth, startDate, endDate)
        ]);

        // Calculate percentage change
        const calculateChange = (current: number, previous: number): number => {
          if (previous === 0) return current > 0 ? 100 : 0;
          return Number((((current - previous) / previous) * 100).toFixed(1));
        };

        return {
          organicSessions: currentResponse.sessions,
          sessionsDelta: calculateChange(currentResponse.sessions, previousResponse.sessions),
          bounceRate: currentResponse.bounceRate,
          averageSessionDuration: currentResponse.averageSessionDuration,
          topLandingPages: landingPages,
          trafficTrend: trafficTrend,
          dateRange: {
            startDate,
            endDate
          }
        };
      });
    } catch (error) {
      const apiError = handleGoogleAPIError(error, 'ga4');
      throw new ReportGenerationError(
        'ga4',
        apiError.statusCode,
        apiError.message,
        apiError.retryable,
        apiError.needsReauth
      );
    }
  }

  /**
   * Get organic traffic metrics for a specific period
   */
  private async getOrganicMetrics(
    propertyId: string,
    auth: any,
    startDate: string,
    endDate: string
  ): Promise<{
    sessions: number;
    users: number;
    bounceRate: number;
    averageSessionDuration: number;
  }> {
    const response = await this.analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      auth,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' }
        ],
        dimensionFilter: {
          filter: {
            fieldName: 'sessionDefaultChannelGroup',
            stringFilter: {
              matchType: 'EXACT',
              value: 'Organic Search'
            }
          }
        }
      }
    });

    const row = response.data.rows?.[0];
    if (!row?.metricValues) {
      return { sessions: 0, users: 0, bounceRate: 0, averageSessionDuration: 0 };
    }

    return {
      sessions: parseInt(row.metricValues[0]?.value || '0'),
      users: parseInt(row.metricValues[1]?.value || '0'),
      bounceRate: Number((parseFloat(row.metricValues[2]?.value || '0') * 100).toFixed(2)),
      averageSessionDuration: Number(parseFloat(row.metricValues[3]?.value || '0').toFixed(2))
    };
  }

  /**
   * Get top landing pages from organic search traffic
   */
  async getTopLandingPages(
    propertyId: string,
    accessToken: string,
    startDate: string,
    endDate: string,
    limit: number = 10
  ): Promise<LandingPageData[]> {
    try {
      return await retryWithBackoff(async () => {
        const auth = createGoogleAuthClient();
        auth.setCredentials({ access_token: accessToken });

        const response = await this.analyticsData.properties.runReport({
          property: `properties/${propertyId}`,
          auth,
          requestBody: {
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: 'landingPage' }],
            metrics: [
              { name: 'sessions' },
              { name: 'activeUsers' },
              { name: 'bounceRate' },
              { name: 'averageSessionDuration' }
            ],
            dimensionFilter: {
              filter: {
                fieldName: 'sessionDefaultChannelGroup',
                stringFilter: {
                  matchType: 'EXACT',
                  value: 'Organic Search'
                }
              }
            },
            orderBys: [
              {
                metric: { metricName: 'sessions' },
                desc: true
              }
            ],
            limit: String(limit)
          }
        });

        if (!response.data.rows) {
          return [];
        }

        return response.data.rows.map(row => {
          const dimensionValues = row.dimensionValues || [];
          const metricValues = row.metricValues || [];

          return {
            page: dimensionValues[0]?.value || '',
            sessions: parseInt(metricValues[0]?.value || '0'),
            users: parseInt(metricValues[1]?.value || '0'),
            bounceRate: Number((parseFloat(metricValues[2]?.value || '0') * 100).toFixed(2)),
            averageSessionDuration: Number(parseFloat(metricValues[3]?.value || '0').toFixed(2))
          };
        });
      });
    } catch (error) {
      console.error('Failed to fetch top landing pages:', error);
      return [];
    }
  }

  /**
   * Get daily traffic trend for the specified period
   */
  private async getTrafficTrend(
    propertyId: string,
    auth: any,
    startDate: string,
    endDate: string
  ): Promise<TrafficDataPoint[]> {
    try {
      const response = await this.analyticsData.properties.runReport({
        property: `properties/${propertyId}`,
        auth,
        requestBody: {
          dateRanges: [{ startDate, endDate }],
          dimensions: [{ name: 'date' }],
          metrics: [
            { name: 'sessions' },
            { name: 'activeUsers' }
          ],
          dimensionFilter: {
            filter: {
              fieldName: 'sessionDefaultChannelGroup',
              stringFilter: {
                matchType: 'EXACT',
                value: 'Organic Search'
              }
            }
          },
          orderBys: [
            {
              dimension: { dimensionName: 'date' },
              desc: false
            }
          ]
        }
      });

      if (!response.data.rows) {
        return [];
      }

      return response.data.rows.map(row => {
        const dimensionValues = row.dimensionValues || [];
        const metricValues = row.metricValues || [];
        
        // Format date from YYYYMMDD to YYYY-MM-DD
        const dateString = dimensionValues[0]?.value || '';
        const formattedDate = `${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(6, 8)}`;

        return {
          date: formattedDate,
          sessions: parseInt(metricValues[0]?.value || '0'),
          users: parseInt(metricValues[1]?.value || '0')
        };
      });
    } catch (error) {
      console.error('Failed to fetch traffic trend:', error);
      return [];
    }
  }

  /**
   * Get traffic sources breakdown
   */
  async getTrafficSources(
    propertyId: string,
    accessToken: string,
    startDate: string,
    endDate: string
  ): Promise<Array<{ source: string; users: number; percentage: number }>> {
    try {
      return await retryWithBackoff(async () => {
        const auth = createGoogleAuthClient();
        auth.setCredentials({ access_token: accessToken });

        const response = await this.analyticsData.properties.runReport({
          property: `properties/${propertyId}`,
          auth,
          requestBody: {
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: 'sessionDefaultChannelGroup' }],
            metrics: [{ name: 'activeUsers' }],
            orderBys: [
              {
                metric: { metricName: 'activeUsers' },
                desc: true
              }
            ]
          }
        });

        if (!response.data.rows) {
          return [];
        }

        const totalUsers = response.data.rows.reduce((sum, row) => {
          return sum + parseInt(row.metricValues?.[0]?.value || '0');
        }, 0);

        return response.data.rows.map(row => {
          const users = parseInt(row.metricValues?.[0]?.value || '0');
          return {
            source: row.dimensionValues?.[0]?.value || 'Unknown',
            users,
            percentage: totalUsers > 0 ? Number(((users / totalUsers) * 100).toFixed(1)) : 0
          };
        });
      });
    } catch (error) {
      console.error('Failed to fetch traffic sources:', error);
      return [];
    }
  }

  /**
   * Get conversion data if ecommerce is enabled
   */
  async getConversionData(
    propertyId: string,
    accessToken: string,
    startDate: string,
    endDate: string
  ): Promise<{
    totalConversions: number;
    conversionRate: number;
    organicConversions: number;
    organicConversionRate: number;
  }> {
    try {
      return await retryWithBackoff(async () => {
        const auth = createGoogleAuthClient();
        auth.setCredentials({ access_token: accessToken });

        // Get overall conversions
        const [overallResponse, organicResponse] = await Promise.all([
          this.analyticsData.properties.runReport({
            property: `properties/${propertyId}`,
            auth,
            requestBody: {
              dateRanges: [{ startDate, endDate }],
              dimensions: [],
              metrics: [
                { name: 'sessions' },
                { name: 'conversions' }
              ]
            }
          }),
          this.analyticsData.properties.runReport({
            property: `properties/${propertyId}`,
            auth,
            requestBody: {
              dateRanges: [{ startDate, endDate }],
              dimensions: [],
              metrics: [
                { name: 'sessions' },
                { name: 'conversions' }
              ],
              dimensionFilter: {
                filter: {
                  fieldName: 'sessionDefaultChannelGroup',
                  stringFilter: {
                    matchType: 'EXACT',
                    value: 'Organic Search'
                  }
                }
              }
            }
          })
        ]);

        const overallData = overallResponse.data.rows?.[0]?.metricValues || [];
        const organicData = organicResponse.data.rows?.[0]?.metricValues || [];

        const totalSessions = parseInt(overallData[0]?.value || '0');
        const totalConversions = parseInt(overallData[1]?.value || '0');
        const organicSessions = parseInt(organicData[0]?.value || '0');
        const organicConversions = parseInt(organicData[1]?.value || '0');

        return {
          totalConversions,
          conversionRate: totalSessions > 0 ? Number(((totalConversions / totalSessions) * 100).toFixed(2)) : 0,
          organicConversions,
          organicConversionRate: organicSessions > 0 ? Number(((organicConversions / organicSessions) * 100).toFixed(2)) : 0
        };
      });
    } catch (error) {
      console.error('Failed to fetch conversion data:', error);
      return {
        totalConversions: 0,
        conversionRate: 0,
        organicConversions: 0,
        organicConversionRate: 0
      };
    }
  }

  /**
   * Validate that a property ID is accessible with current credentials
   */
  async validatePropertyAccess(propertyId: string, accessToken: string): Promise<boolean> {
    try {
      const auth = createGoogleAuthClient();
      auth.setCredentials({ access_token: accessToken });

      // Try to fetch a small amount of data to validate access
      await this.analyticsData.properties.runReport({
        property: `properties/${propertyId}`,
        auth,
        requestBody: {
          dateRanges: [{ startDate: '7daysAgo', endDate: 'yesterday' }],
          dimensions: [],
          metrics: [{ name: 'sessions' }],
          limit: "1"
        }
      });

      return true;
    } catch (error) {
      console.error('Property access validation failed:', error);
      return false;
    }
  }

  /**
   * Get list of accessible GA4 properties for a user
   */
  async getAccessibleProperties(accessToken: string): Promise<Array<{ id: string; name: string }>> {
    try {
      return await retryWithBackoff(async () => {
        const auth = createGoogleAuthClient();
        auth.setCredentials({ access_token: accessToken });

        const analyticsAdmin = google.analyticsadmin('v1beta');
        
        // First get accounts
        const accountsResponse = await analyticsAdmin.accounts.list({ auth });
        
        if (!accountsResponse.data.accounts) {
          return [];
        }

        const properties: Array<{ id: string; name: string }> = [];

        // Get properties for each account
        for (const account of accountsResponse.data.accounts) {
          if (!account.name) continue;

          try {
            const propertiesResponse = await analyticsAdmin.properties.list({
              auth,
              filter: `parent:${account.name}`
            });

            if (propertiesResponse.data.properties) {
              for (const property of propertiesResponse.data.properties) {
                if (property.name && property.displayName) {
                  // Extract property ID from the full name (properties/123456789)
                  const propertyId = property.name.split('/')[1];
                  if (propertyId) {
                    properties.push({
                      id: propertyId,
                      name: property.displayName
                    });
                  }
                }
              }
            }
          } catch (error) {
            console.error(`Failed to fetch properties for account ${account.name}:`, error);
          }
        }

        return properties;
      });
    } catch (error) {
      console.error('Failed to fetch accessible properties:', error);
      return [];
    }
  }

  /**
   * Helper to format property ID (removes 'properties/' prefix if present)
   */
  static formatPropertyId(propertyId: string): string {
    return propertyId.replace('properties/', '');
  }
}

// Export singleton instance
export const analyticsClient = new AnalyticsClient();
import { google } from 'googleapis';
import { SearchConsoleData, KeywordPerformance, PagePerformance, GoogleAPIError } from '@/types/google-api';
import { handleGoogleAPIError, retryWithBackoff, ReportGenerationError } from './error-handling';
import { createGoogleAuthClient, refreshAccessToken } from './config';

export class SearchConsoleClient {
  private searchconsole = google.searchconsole('v1');

  /**
   * Get comprehensive performance data from Google Search Console
   */
  async getPerformanceData(
    siteUrl: string,
    accessToken: string,
    startDate: string,
    endDate: string
  ): Promise<SearchConsoleData> {
    try {
      return await retryWithBackoff(async () => {
        // Set up authentication
        const auth = createGoogleAuthClient();
        auth.setCredentials({ access_token: accessToken });

        // Get overall performance data
        const overallResponse = await this.searchconsole.searchanalytics.query({
          siteUrl,
          auth,
          requestBody: {
            startDate,
            endDate,
            dimensions: [], // No dimensions for overall metrics
            aggregationType: 'auto'
          }
        });

        const overallData = overallResponse.data.rows?.[0] || {
          clicks: 0,
          impressions: 0,
          ctr: 0,
          position: 0
        };

        // Get top keywords and pages in parallel
        const [topKeywords, topPages] = await Promise.all([
          this.getTopKeywords(siteUrl, accessToken, 10),
          this.getTopPages(siteUrl, accessToken, 10)
        ]);

        return {
          totalClicks: Math.round(overallData.clicks || 0),
          totalImpressions: Math.round(overallData.impressions || 0),
          averagePosition: Number((overallData.position || 0).toFixed(1)),
          averageCTR: Number(((overallData.ctr || 0) * 100).toFixed(2)),
          topKeywords,
          topPages,
          dateRange: {
            startDate,
            endDate
          }
        };
      });
    } catch (error) {
      const apiError = handleGoogleAPIError(error, 'gsc');
      throw new ReportGenerationError(
        'gsc',
        apiError.statusCode,
        apiError.message,
        apiError.retryable,
        apiError.needsReauth
      );
    }
  }

  /**
   * Get top performing keywords from Search Console
   */
  async getTopKeywords(
    siteUrl: string,
    accessToken: string,
    limit: number = 10
  ): Promise<KeywordPerformance[]> {
    try {
      return await retryWithBackoff(async () => {
        const auth = createGoogleAuthClient();
        auth.setCredentials({ access_token: accessToken });

        const response = await this.searchconsole.searchanalytics.query({
          siteUrl,
          auth,
          requestBody: {
            startDate: this.getDateDaysAgo(30), // Last 30 days
            endDate: this.getDateDaysAgo(1),   // Yesterday
            dimensions: ['query'],
            rowLimit: limit,
            aggregationType: 'auto'
          }
        });

        if (!response.data.rows) {
          return [];
        }

        return response.data.rows.map(row => ({
          keyword: row.keys?.[0] || '',
          clicks: Math.round(row.clicks || 0),
          impressions: Math.round(row.impressions || 0),
          ctr: Number(((row.ctr || 0) * 100).toFixed(2)),
          position: Number((row.position || 0).toFixed(1))
        }));
      });
    } catch (error) {
      console.error('Failed to fetch top keywords:', error);
      return [];
    }
  }

  /**
   * Get top performing pages from Search Console
   */
  async getTopPages(
    siteUrl: string,
    accessToken: string,
    limit: number = 10
  ): Promise<PagePerformance[]> {
    try {
      return await retryWithBackoff(async () => {
        const auth = createGoogleAuthClient();
        auth.setCredentials({ access_token: accessToken });

        const response = await this.searchconsole.searchanalytics.query({
          siteUrl,
          auth,
          requestBody: {
            startDate: this.getDateDaysAgo(30), // Last 30 days
            endDate: this.getDateDaysAgo(1),   // Yesterday
            dimensions: ['page'],
            rowLimit: limit,
            aggregationType: 'auto'
          }
        });

        if (!response.data.rows) {
          return [];
        }

        return response.data.rows.map(row => ({
          page: row.keys?.[0] || '',
          clicks: Math.round(row.clicks || 0),
          impressions: Math.round(row.impressions || 0),
          ctr: Number(((row.ctr || 0) * 100).toFixed(2)),
          position: Number((row.position || 0).toFixed(1))
        }));
      });
    } catch (error) {
      console.error('Failed to fetch top pages:', error);
      return [];
    }
  }

  /**
   * Get performance comparison between two periods
   */
  async getPerformanceComparison(
    siteUrl: string,
    accessToken: string,
    currentStartDate: string,
    currentEndDate: string,
    previousStartDate: string,
    previousEndDate: string
  ): Promise<{
    current: { clicks: number; impressions: number; ctr: number; position: number };
    previous: { clicks: number; impressions: number; ctr: number; position: number };
    changes: { clicksChange: number; impressionsChange: number; ctrChange: number; positionChange: number };
  }> {
    try {
      return await retryWithBackoff(async () => {
        const auth = createGoogleAuthClient();
        auth.setCredentials({ access_token: accessToken });

        // Get current and previous period data in parallel
        const [currentResponse, previousResponse] = await Promise.all([
          this.searchconsole.searchanalytics.query({
            siteUrl,
            auth,
            requestBody: {
              startDate: currentStartDate,
              endDate: currentEndDate,
              dimensions: [],
              aggregationType: 'auto'
            }
          }),
          this.searchconsole.searchanalytics.query({
            siteUrl,
            auth,
            requestBody: {
              startDate: previousStartDate,
              endDate: previousEndDate,
              dimensions: [],
              aggregationType: 'auto'
            }
          })
        ]);

        const current = currentResponse.data.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
        const previous = previousResponse.data.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };

        // Calculate percentage changes
        const calculateChange = (current: number, previous: number): number => {
          if (previous === 0) return current > 0 ? 100 : 0;
          return Number((((current - previous) / previous) * 100).toFixed(1));
        };

        return {
          current: {
            clicks: Math.round(current.clicks || 0),
            impressions: Math.round(current.impressions || 0),
            ctr: Number(((current.ctr || 0) * 100).toFixed(2)),
            position: Number((current.position || 0).toFixed(1))
          },
          previous: {
            clicks: Math.round(previous.clicks || 0),
            impressions: Math.round(previous.impressions || 0),
            ctr: Number(((previous.ctr || 0) * 100).toFixed(2)),
            position: Number((previous.position || 0).toFixed(1))
          },
          changes: {
            clicksChange: calculateChange(current.clicks || 0, previous.clicks || 0),
            impressionsChange: calculateChange(current.impressions || 0, previous.impressions || 0),
            ctrChange: calculateChange((current.ctr || 0) * 100, (previous.ctr || 0) * 100),
            positionChange: calculateChange(current.position || 0, previous.position || 0) * -1 // Negative because lower position is better
          }
        };
      });
    } catch (error) {
      console.error('Failed to get performance comparison:', error);
      // Return zero values if comparison fails
      return {
        current: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
        previous: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
        changes: { clicksChange: 0, impressionsChange: 0, ctrChange: 0, positionChange: 0 }
      };
    }
  }

  /**
   * Get list of verified sites for a user
   */
  async getVerifiedSites(accessToken: string): Promise<string[]> {
    try {
      return await retryWithBackoff(async () => {
        const auth = createGoogleAuthClient();
        auth.setCredentials({ access_token: accessToken });

        const response = await this.searchconsole.sites.list({
          auth
        });

        return response.data.siteEntry?.map(site => site.siteUrl || '').filter(Boolean) || [];
      });
    } catch (error) {
      console.error('Failed to fetch verified sites:', error);
      return [];
    }
  }

  /**
   * Validate that a site URL is accessible with current credentials
   */
  async validateSiteAccess(siteUrl: string, accessToken: string): Promise<boolean> {
    try {
      const auth = createGoogleAuthClient();
      auth.setCredentials({ access_token: accessToken });

      // Try to fetch a small amount of data to validate access
      await this.searchconsole.searchanalytics.query({
        siteUrl,
        auth,
        requestBody: {
          startDate: this.getDateDaysAgo(7),
          endDate: this.getDateDaysAgo(1),
          dimensions: [],
          rowLimit: 1
        }
      });

      return true;
    } catch (error) {
      console.error('Site access validation failed:', error);
      return false;
    }
  }

  /**
   * Helper function to get date string N days ago
   */
  private getDateDaysAgo(daysAgo: number): string {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0]!;
  }

  /**
   * Helper function to format URL for Search Console API
   */
  static formatSiteUrl(domain: string): string {
    // Handle different URL formats
    if (domain.startsWith('http://') || domain.startsWith('https://')) {
      return domain.endsWith('/') ? domain : domain + '/';
    }
    
    // Default to https for domain-only inputs
    return `https://${domain}/`;
  }

  /**
   * Get keyword and page mapping for cross-referencing with Analytics
   */
  async getKeywordPageMapping(
    siteUrl: string,
    accessToken: string,
    startDate: string,
    endDate: string
  ): Promise<Array<{ keyword: string; page: string; clicks: number; impressions: number; position: number }>> {
    try {
      return await retryWithBackoff(async () => {
        const auth = createGoogleAuthClient();
        auth.setCredentials({ access_token: accessToken });

        const response = await this.searchconsole.searchanalytics.query({
          siteUrl,
          auth,
          requestBody: {
            startDate,
            endDate,
            dimensions: ['query', 'page'],
            rowLimit: 100, // Limit to top combinations
            aggregationType: 'auto'
          }
        });

        if (!response.data.rows) {
          return [];
        }

        return response.data.rows.map(row => ({
          keyword: row.keys?.[0] || '',
          page: row.keys?.[1] || '',
          clicks: Math.round(row.clicks || 0),
          impressions: Math.round(row.impressions || 0),
          position: Number((row.position || 0).toFixed(1))
        }));
      });
    } catch (error) {
      console.error('Failed to fetch keyword-page mapping:', error);
      return [];
    }
  }

  /**
   * Get daily performance data for time-series charts
   */
  async getDailyPerformanceData(
    siteUrl: string,
    accessToken: string,
    startDate: string,
    endDate: string
  ): Promise<Array<{ date: string; clicks: number; impressions: number; ctr: number; position: number }>> {
    try {
      return await retryWithBackoff(async () => {
        const auth = createGoogleAuthClient();
        auth.setCredentials({ access_token: accessToken });

        const response = await this.searchconsole.searchanalytics.query({
          siteUrl,
          auth,
          requestBody: {
            startDate,
            endDate,
            dimensions: ['date'],
            aggregationType: 'auto'
          }
        });

        if (!response.data.rows) {
          return [];
        }

        return response.data.rows
          .map(row => ({
            date: row.keys?.[0] || '',
            clicks: Math.round(row.clicks || 0),
            impressions: Math.round(row.impressions || 0),
            ctr: Number(((row.ctr || 0) * 100).toFixed(2)),
            position: Number((row.position || 0).toFixed(1))
          }))
          .sort((a, b) => a.date.localeCompare(b.date)); // Sort by date ascending
      });
    } catch (error) {
      console.error('Failed to fetch daily performance data:', error);
      return [];
    }
  }
}

// Export singleton instance
export const searchConsoleClient = new SearchConsoleClient();
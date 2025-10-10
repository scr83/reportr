import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { getValidAccessToken, GoogleTokenError, createAuthenticatedGoogleClient } from '@/lib/utils/refresh-google-token';
import { prisma } from '@/lib/prisma';
import { google } from 'googleapis';

export interface AnalyticsLandingPage {
  page: string;
  sessions: number;
  users: number;
  bounceRate: string;
  avgSessionDuration: string;
}

export interface AnalyticsTrafficData {
  date: string;
  sessions: number;
  users: number;
}

export interface AnalyticsData {
  users: number;
  sessions: number;
  bounceRate: string;
  conversions: number;
  avgSessionDuration: string;
  topLandingPages: AnalyticsLandingPage[];
  trafficTrend: AnalyticsTrafficData[];
  summary: {
    totalUsers: number;
    totalSessions: number;
    avgBounceRate: number;
    totalConversions: number;
  };
}

/**
 * Fetches Google Analytics 4 data for organic traffic
 */
export async function getAnalyticsData(
  clientId: string,
  startDate: string,
  endDate: string,
  propertyId?: string
): Promise<AnalyticsData> {
  try {
    // Get client with property ID
    const client = await prisma.client.findUnique({
      where: { id: clientId }
    });

    if (!client) {
      throw new Error('Client not found');
    }

    // Use provided propertyId or fallback to stored one
    const targetPropertyId = propertyId || client.ga4PropertyId;
    
    if (!targetPropertyId) {
      throw new Error('Google Analytics property ID not configured');
    }

    if (!client.googleRefreshToken) {
      throw new Error('Google account not connected for this client. Please connect in client settings.');
    }

    const accessToken = await getValidAccessToken(clientId);
    
    // Use proper OAuth2 credentials format
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        type: 'authorized_user',
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        refresh_token: client.googleRefreshToken,
        access_token: accessToken
      }
    });

    // Fetch main organic traffic metrics
    const [mainResponse] = await analyticsDataClient.runReport({
      property: `properties/${targetPropertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'bounceRate' },
        { name: 'conversions' },
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
    });

    // Fetch top landing pages for organic traffic
    const [landingPagesResponse] = await analyticsDataClient.runReport({
      property: `properties/${targetPropertyId}`,
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
      limit: 20,
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }]
    });

    // Fetch daily traffic trend
    const [trendResponse] = await analyticsDataClient.runReport({
      property: `properties/${targetPropertyId}`,
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
      orderBys: [{ dimension: { dimensionName: 'date' } }]
    });

    // Parse main metrics
    const mainRow = mainResponse.rows?.[0];
    const users = parseInt(mainRow?.metricValues?.[0]?.value || '0');
    const sessions = parseInt(mainRow?.metricValues?.[1]?.value || '0');
    const bounceRate = parseFloat(mainRow?.metricValues?.[2]?.value || '0');
    const conversions = parseInt(mainRow?.metricValues?.[3]?.value || '0');
    const avgSessionDuration = parseFloat(mainRow?.metricValues?.[4]?.value || '0');

    // Parse landing pages
    const topLandingPages: AnalyticsLandingPage[] = landingPagesResponse.rows?.map(row => ({
      page: row.dimensionValues?.[0]?.value || '',
      sessions: parseInt(row.metricValues?.[0]?.value || '0'),
      users: parseInt(row.metricValues?.[1]?.value || '0'),
      bounceRate: (parseFloat(row.metricValues?.[2]?.value || '0') * 100).toFixed(2),
      avgSessionDuration: formatDuration(parseFloat(row.metricValues?.[3]?.value || '0'))
    })) || [];

    // Parse traffic trend
    const trafficTrend: AnalyticsTrafficData[] = trendResponse.rows?.map(row => ({
      date: row.dimensionValues?.[0]?.value || '',
      sessions: parseInt(row.metricValues?.[0]?.value || '0'),
      users: parseInt(row.metricValues?.[1]?.value || '0')
    })) || [];

    // Update the client's GA property ID if it was successful
    if (!client.ga4PropertyId && targetPropertyId) {
      await prisma.client.update({
        where: { id: clientId },
        data: { ga4PropertyId: targetPropertyId }
      });
    }

    return {
      users,
      sessions,
      bounceRate: (bounceRate * 100).toFixed(2),
      conversions,
      avgSessionDuration: formatDuration(avgSessionDuration),
      topLandingPages,
      trafficTrend,
      summary: {
        totalUsers: users,
        totalSessions: sessions,
        avgBounceRate: bounceRate * 100,
        totalConversions: conversions
      }
    };
  } catch (error: any) {
    console.error('Google Analytics API error:', error);
    
    if (error instanceof GoogleTokenError) {
      throw error;
    }
    
    // Handle specific Google API errors
    if (error.code === 403) {
      throw new Error('Access denied to Google Analytics. Please ensure you have access to the property.');
    }
    
    if (error.code === 404) {
      throw new Error('Google Analytics property not found. Please verify the property ID.');
    }
    
    throw new Error(`Failed to fetch Google Analytics data: ${error.message}`);
  }
}

export interface GA4Property {
  name: string;        // e.g., "properties/123456789"
  propertyId: string;  // e.g., "123456789"
  displayName: string; // e.g., "Acme Corp Website"
}

/**
 * Lists available Google Analytics properties for a client using Admin API
 */
export async function getAnalyticsProperties(clientId: string): Promise<GA4Property[]> {
  try {
    console.log(`Fetching GA4 properties for client: ${clientId}`);
    
    // Use the same auth method as working GSC implementation
    const auth = await createAuthenticatedGoogleClient(clientId);
    const analyticsadmin = google.analyticsadmin({ version: 'v1beta', auth });
    
    // First get all Analytics accounts
    const accountsResponse = await analyticsadmin.accounts.list();
    const accounts = accountsResponse.data.accounts || [];
    
    if (accounts.length === 0) {
      console.log('No Analytics accounts found for client');
      return [];
    }
    
    console.log(`Found ${accounts.length} Analytics accounts`);
    
    // Get properties for all accounts
    const allProperties: GA4Property[] = [];
    
    for (const account of accounts) {
      try {
        const response = await analyticsadmin.properties.list({
          filter: `parent:${account.name}`  // Format: parent:accounts/123456789
        });
        
        const accountProperties = (response.data.properties || []).map((prop: any) => {
          // Extract property ID from name (format: "properties/123456789")
          const propertyId = prop.name?.split('/')[1] || '';
          
          return {
            name: prop.name || '',
            propertyId: propertyId,
            displayName: prop.displayName || prop.name || ''
          };
        });
        
        allProperties.push(...accountProperties);
        
      } catch (accountError: any) {
        console.warn(`Failed to get properties for account ${account.displayName}:`, accountError.message);
        // Continue with other accounts
      }
    }
    
    console.log(`Found ${allProperties.length} Analytics properties`);
    return allProperties;
    
  } catch (error: any) {
    console.error('Error listing GA4 properties:', error.message);
    
    // Handle specific error types
    if (error instanceof GoogleTokenError) {
      throw error;
    }
    
    // Handle Google API specific errors
    if (error.code === 403 || error.status === 403) {
      console.log('Insufficient permissions to list properties, manual entry required');
      return [];
    }
    
    if (error.code === 404 || error.status === 404) {
      throw new Error('Google Analytics Admin API not found. Please ensure the Analytics Admin API is enabled in Google Cloud Console.');
    }
    
    if (error.code === 400 || error.status === 400) {
      throw new Error(`Invalid request to Google Analytics API: ${error.message}`);
    }
    
    throw new Error(`Failed to fetch Analytics properties: ${error.message || 'Unknown error'}`);
  }
}

/**
 * Formats duration from seconds to human readable format
 */
function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
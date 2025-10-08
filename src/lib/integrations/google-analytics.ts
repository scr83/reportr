import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { getValidAccessToken, GoogleTokenError } from '@/lib/utils/refresh-google-token';
import { prisma } from '@/lib/prisma';

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
    const targetPropertyId = propertyId || client.gaPropertyId;
    
    if (!targetPropertyId) {
      throw new Error('Google Analytics property ID not configured');
    }

    const accessToken = await getValidAccessToken(clientId);
    
    // Create Google OAuth2 client
    const { google } = require('googleapis');
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });
    
    // Create Analytics Data client with OAuth credentials
    const analyticsDataClient = new BetaAnalyticsDataClient({
      auth: oauth2Client
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
    if (!client.gaPropertyId && targetPropertyId) {
      await prisma.client.update({
        where: { id: clientId },
        data: { gaPropertyId: targetPropertyId }
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

/**
 * Lists available Google Analytics properties for a client
 * Note: This is a simplified version - in production you might want to use the Admin API
 */
export async function getAnalyticsProperties(clientId: string) {
  try {
    // For now, we'll skip the properties listing to avoid complex Admin API setup
    // In production, you would implement the Admin API client here
    console.log('Analytics properties listing not implemented yet');
    return [];
  } catch (error: any) {
    console.error('Failed to list Analytics properties:', error);
    throw new Error(`Failed to list Analytics properties: ${error.message}`);
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
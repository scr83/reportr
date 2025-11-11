import { getValidAccessToken, GoogleTokenError, createAuthenticatedGoogleClient } from '@/lib/utils/refresh-google-token';
import { prisma } from '@/lib/prisma';
import { google } from 'googleapis';
import { CustomMetric } from '@/types/custom-metrics';

// Map frontend metric IDs to GA4 API metric names
const METRIC_MAPPING: Record<string, string> = {
  // Audience metrics
  'users': 'totalUsers',
  'newUsers': 'newUsers',
  'sessions': 'sessions',
  'engagedSessions': 'engagedSessions',
  'engagementRate': 'engagementRate',
  'sessionsPerUser': 'sessionsPerUser',
  
  // Engagement metrics
  'bounceRate': 'bounceRate',
  'pagesPerSession': 'screenPageViewsPerSession',
  'avgSessionDuration': 'averageSessionDuration',
  'eventCount': 'eventCount',
  'scrollDepth': 'scrollDepth', // May not be available in all properties
  
  // Conversion metrics
  'conversions': 'conversions',
  'conversionRate': 'sessionConversionRate',
  'revenue': 'totalRevenue',
  'ecommercePurchases': 'ecommercePurchases',
  'transactions': 'transactions',
  
  // Traffic source metrics (calculated differently)
  'organicTraffic': 'sessions', // Will be filtered by source
  'directTraffic': 'sessions',
  'referralTraffic': 'sessions',
  'socialTraffic': 'sessions',
  'paidTraffic': 'sessions',
  
  // Behavior metrics (require additional API calls)
  'deviceBreakdown': 'sessions', // Grouped by deviceCategory dimension
  'topLandingPages': 'sessions', // Grouped by landingPage dimension
  'topExitPages': 'sessions', // Grouped by exitPage dimension
  'screenPageViews': 'screenPageViews'
};

/**
 * Get metric configuration for either predefined or custom metrics
 * 
 * @param metricId - The metric ID to look up (e.g., "users" or "custom_1")
 * @param customMetrics - Array of custom metrics from client
 * @returns Metric configuration object or null if not found
 */
export function getMetricConfig(
  metricId: string,
  customMetrics: CustomMetric[] = []
): any {
  // First, check if it's a predefined metric
  if (METRIC_MAPPING[metricId]) {
    return {
      apiName: METRIC_MAPPING[metricId],
      displayName: metricId, // Use the frontend ID as display name for predefined metrics
      description: 'Predefined GA4 metric',
      category: 'predefined',
      format: 'number',
      isCustom: false
    };
  }
  
  // Then check if it's a custom metric
  const customMetric = customMetrics.find(m => m.id === metricId);
  if (customMetric) {
    return {
      apiName: customMetric.apiName,
      displayName: customMetric.displayName,
      description: 'Custom GA4 metric',
      category: 'custom',
      format: customMetric.format,
      isCustom: true
    };
  }
  
  // Not found
  return null;
}

/**
 * Build array of GA4 API metric names from selected metric IDs
 * Handles both predefined and custom metrics
 * 
 * @param selectedMetrics - Array of metric IDs (e.g., ["users", "sessions", "custom_1"])
 * @param customMetrics - Array of custom metrics from client
 * @returns Array of GA4 API metric names (e.g., ["totalUsers", "sessions", "customEvent:test"])
 */
export function buildMetricsForGA4Request(
  selectedMetrics: string[],
  customMetrics: CustomMetric[] = []
): string[] {
  // Valid predefined GA4 metrics (the original working set)
  const validPredefinedMetrics = [
    'totalUsers', 'sessions', 'bounceRate', 'conversions',
    'newUsers', 'engagedSessions', 'engagementRate', 'sessionsPerUser',
    'screenPageViewsPerSession', 'averageSessionDuration', 'eventCount',
    'screenPageViews', 'ecommercePurchases', 'totalRevenue'
  ];

  const metricNames = selectedMetrics
    .map(metricId => {
      const config = getMetricConfig(metricId, customMetrics);
      if (!config) {
        console.warn(`Unknown metric: ${metricId}, skipping`);
        return null;
      }
      return config.apiName;
    })
    .filter((apiName): apiName is string => apiName !== null)
    .filter(name => 
      validPredefinedMetrics.includes(name) ||  // Original 25 metrics
      name.startsWith('customEvent:')            // User's custom metrics
    )
    .filter((name, index, arr) => arr.indexOf(name) === index); // Remove duplicates

  return metricNames;
}

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
  dynamicMetrics: Record<string, any>; // NEW: Dynamic metrics data
}

// Fetch landing pages separately (requires dimension query)
async function getTopLandingPages(
  analyticsData: any,
  propertyId: string,
  startDate: string,
  endDate: string
) {
  try {
    const response = await analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'landingPage' }],
        metrics: [
          { name: 'sessions' },
          { name: 'totalUsers' },
          { name: 'bounceRate' }
        ],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 10
      }
    });

    return response.data.rows?.map((row: any) => ({
      page: row.dimensionValues?.[0]?.value || '',
      sessions: parseInt(row.metricValues?.[0]?.value || '0'),
      users: parseInt(row.metricValues?.[1]?.value || '0'),
      bounceRate: parseFloat(row.metricValues?.[2]?.value || '0')
    })) || [];
  } catch (error) {
    console.error('Error fetching landing pages:', error);
    return [];
  }
}

// Fetch device breakdown separately
async function getDeviceBreakdown(
  analyticsData: any,
  propertyId: string,
  startDate: string,
  endDate: string
) {
  try {
    const response = await analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'sessions' }]
      }
    });

    const breakdown: Record<string, number> = {};
    response.data.rows?.forEach((row: any) => {
      const device = row.dimensionValues?.[0]?.value || 'unknown';
      const sessions = parseInt(row.metricValues?.[0]?.value || '0');
      breakdown[device] = sessions;
    });

    return breakdown;
  } catch (error) {
    console.error('Error fetching device breakdown:', error);
    return {};
  }
}

/**
 * Fetches Google Analytics 4 data for organic traffic
 * Now supports dynamic metric selection
 */
export async function getAnalyticsData(
  clientId: string,
  startDate: string,
  endDate: string,
  propertyId?: string,
  requestedMetrics?: string[], // NEW: Array of metric IDs from frontend
  customMetrics?: CustomMetric[] // NEW: Custom metrics configuration
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
    
    // Ensure propertyId is a string
    const propertyIdString = String(targetPropertyId);

    if (!client.googleRefreshToken) {
      throw new Error('Google account not connected for this client. Please connect in client settings.');
    }

    // Create authenticated Google client using working method
    const auth = await createAuthenticatedGoogleClient(clientId);
    const analyticsData = google.analyticsdata({ version: 'v1beta', auth });

    // Build GA4 metrics array (supports both predefined and custom)
    const metricsToFetch = requestedMetrics && requestedMetrics.length > 0
      ? buildMetricsForGA4Request(requestedMetrics, customMetrics || [])
      : ['totalUsers', 'sessions', 'bounceRate', 'conversions']; // Default metrics

    console.log('🔍 GA4 metrics for API request:', { requestedMetrics, metricsToFetch, customMetricsCount: customMetrics?.length || 0 });

    // Build metrics array for GA4 API
    const metrics = metricsToFetch.map(name => ({ name }));

    // Fetch main metrics
    const mainResponse = await analyticsData.properties.runReport({
      property: `properties/${propertyIdString}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        metrics: metrics
      }
    });

    // Fetch top landing pages for organic traffic
    const landingPagesResponse = await (analyticsData.properties.runReport as any)({
      property: `properties/${propertyIdString}`,
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
        limit: 20,
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }]
      }
    });

    // Fetch daily traffic trend
    const trendResponse = await (analyticsData.properties.runReport as any)({
      property: `properties/${propertyIdString}`,
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
        orderBys: [{ dimension: { dimensionName: 'date' } }]
      }
    });

    // Process response and map back to frontend IDs
    const result: Record<string, any> = {};

    if (mainResponse.data.rows && mainResponse.data.rows.length > 0) {
      const row = mainResponse.data.rows[0];
      
      mainResponse.data.metricHeaders?.forEach((header: any, index: number) => {
        const ga4MetricName = header.name;
        const value = row?.metricValues?.[index]?.value;
        
        // Find frontend ID for this GA4 metric
        const frontendId = Object.keys(METRIC_MAPPING).find(
          key => METRIC_MAPPING[key] === ga4MetricName
        );
        
        if (frontendId && value !== undefined && value !== null) {
          // Format numeric values appropriately
          if (['users', 'newUsers', 'sessions', 'engagedSessions', 'conversions', 'ecommercePurchases', 'transactions', 'eventCount', 'screenPageViews'].includes(frontendId)) {
            result[frontendId] = parseInt(value) || 0;
          } else if (['bounceRate', 'engagementRate', 'conversionRate', 'avgSessionDuration', 'pagesPerSession', 'sessionsPerUser', 'revenue'].includes(frontendId)) {
            result[frontendId] = parseFloat(value) || 0;
          } else {
            result[frontendId] = value;
          }
        }
      });
    }

    // Handle special metrics that require separate API calls
    if (requestedMetrics?.includes('topLandingPages')) {
      result.topLandingPages = await getTopLandingPages(
        analyticsData,
        propertyIdString,
        startDate,
        endDate
      );
    }

    if (requestedMetrics?.includes('deviceBreakdown')) {
      result.deviceBreakdown = await getDeviceBreakdown(
        analyticsData,
        propertyIdString,
        startDate,
        endDate
      );
    }

    // Keep backward compatibility with existing interface
    const users = result.users || 0;
    const sessions = result.sessions || 0;
    const bounceRate = result.bounceRate || 0;
    const conversions = result.conversions || 0;
    const avgSessionDuration = result.avgSessionDuration || 0;

    // Parse landing pages
    const topLandingPages: AnalyticsLandingPage[] = landingPagesResponse.data.rows?.map((row: any) => ({
      page: row.dimensionValues?.[0]?.value || '',
      sessions: parseInt(row.metricValues?.[0]?.value || '0'),
      users: parseInt(row.metricValues?.[1]?.value || '0'),
      bounceRate: (parseFloat(row.metricValues?.[2]?.value || '0') * 100).toFixed(2),
      avgSessionDuration: formatDuration(parseFloat(row.metricValues?.[3]?.value || '0'))
    })) || [];

    // Parse traffic trend
    const trafficTrend: AnalyticsTrafficData[] = trendResponse.data.rows?.map((row: any) => ({
      date: row.dimensionValues?.[0]?.value || '',
      sessions: parseInt(row.metricValues?.[0]?.value || '0'),
      users: parseInt(row.metricValues?.[1]?.value || '0')
    })) || [];

    // Update the client's GA property ID if it was successful
    if (!client.ga4PropertyId && targetPropertyId) {
      await prisma.client.update({
        where: { id: clientId },
        data: { ga4PropertyId: propertyIdString }
      });
    }

    return {
      // Legacy format for backward compatibility
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
      },
      // NEW: Dynamic metrics data
      dynamicMetrics: result
    };
  } catch (error: any) {
    console.error('Google Analytics API error:', error);
    
    if (error instanceof GoogleTokenError) {
      throw error;
    }
    
    // Handle specific Google API errors
    if (error.code === 400 && error.message?.includes('not a valid metric')) {
      console.warn('Some metrics were invalid, filtering and retrying...');
      // Try again with just basic metrics
      return await getAnalyticsData(clientId, startDate, endDate, propertyId, ['users', 'sessions', 'bounceRate']);
    }
    
    if (error.code === 403 || error.status === 403) {
      throw new Error('Access denied to Google Analytics. Please ensure you have access to the property.');
    }
    
    if (error.code === 404 || error.status === 404) {
      throw new Error('Google Analytics property not found. Please verify the property ID.');
    }
    
    if (error.code === 401 || error.status === 401) {
      throw new Error('Google authentication failed. Please reconnect your Google account.');
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
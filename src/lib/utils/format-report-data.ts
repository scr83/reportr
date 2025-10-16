/**
 * Data formatting utilities for PDF report generation
 * Transforms raw data into standardized format with proper fallbacks
 */

export function formatReportData(rawData: any): Record<string, string> {
  return {
    // Agency Branding
    AGENCY_NAME: rawData.agency?.name || rawData.branding?.name || 'Reportr',
    AGENCY_WEBSITE: rawData.agency?.website || rawData.branding?.website || 'https://reportr.app',
    AGENCY_EMAIL: rawData.agency?.email || rawData.branding?.email || '',
    AGENCY_PHONE: rawData.agency?.phone || rawData.branding?.phone || '',
    
    // Client Info
    CLIENT_NAME: rawData.client?.name || rawData.clientName || 'Unknown Client',
    CLIENT_DOMAIN: rawData.client?.domain || rawData.domain || '',
    
    // Date Ranges
    DATE_RANGE: `${formatDate(rawData.startDate)} - ${formatDate(rawData.endDate)}`,
    REPORT_DATE: formatDate(new Date()),
    START_DATE: formatDate(rawData.startDate),
    END_DATE: formatDate(rawData.endDate),
    
    // GSC Metrics (with multiple possible field names)
    TOTAL_CLICKS: formatNumber(
      rawData.gscData?.clicks || 
      rawData.gscData?.totalClicks || 
      rawData.searchConsole?.clicks || 
      0
    ),
    TOTAL_IMPRESSIONS: formatNumber(
      rawData.gscData?.impressions || 
      rawData.gscData?.totalImpressions || 
      rawData.searchConsole?.impressions || 
      0
    ),
    AVERAGE_CTR: formatPercentage(
      rawData.gscData?.ctr || 
      rawData.gscData?.averageCTR || 
      rawData.searchConsole?.ctr || 
      0
    ),
    AVERAGE_POSITION: formatDecimal(
      rawData.gscData?.position || 
      rawData.gscData?.averagePosition || 
      rawData.searchConsole?.position || 
      0
    ),
    
    // GA4 Metrics (with multiple possible field names)
    TOTAL_USERS: formatNumber(
      rawData.ga4Data?.users || 
      rawData.analytics?.users || 
      rawData.metrics?.users || 
      0
    ),
    SESSIONS: formatNumber(
      rawData.ga4Data?.sessions || 
      rawData.analytics?.sessions || 
      rawData.metrics?.sessions || 
      0
    ),
    NEW_USERS: formatNumber(
      rawData.ga4Data?.newUsers || 
      rawData.analytics?.newUsers || 
      rawData.metrics?.newUsers || 
      0
    ),
    BOUNCE_RATE: formatPercentage(
      rawData.ga4Data?.bounceRate || 
      rawData.analytics?.bounceRate || 
      rawData.metrics?.bounceRate || 
      0
    ),
    CONVERSIONS: formatNumber(
      rawData.ga4Data?.conversions || 
      rawData.analytics?.conversions || 
      rawData.metrics?.conversions || 
      0
    ),
    CONVERSION_RATE: formatPercentage(
      rawData.ga4Data?.conversionRate || 
      rawData.analytics?.conversionRate || 
      rawData.metrics?.conversionRate || 
      0
    ),
    PAGES_PER_SESSION: formatDecimal(
      rawData.ga4Data?.pagesPerSession || 
      rawData.analytics?.pagesPerSession || 
      rawData.metrics?.pagesPerSession || 
      0
    ),
    AVG_SESSION_DURATION: formatDuration(
      rawData.ga4Data?.avgSessionDuration || 
      rawData.analytics?.avgSessionDuration || 
      rawData.metrics?.avgSessionDuration || 
      0
    ),
    
    // Traffic Sources
    ORGANIC_TRAFFIC: formatNumber(
      rawData.ga4Data?.organicTraffic || 
      rawData.analytics?.organicTraffic || 
      rawData.metrics?.organicTraffic || 
      0
    ),
    DIRECT_TRAFFIC: formatNumber(
      rawData.ga4Data?.directTraffic || 
      rawData.analytics?.directTraffic || 
      rawData.metrics?.directTraffic || 
      0
    ),
    REFERRAL_TRAFFIC: formatNumber(
      rawData.ga4Data?.referralTraffic || 
      rawData.analytics?.referralTraffic || 
      rawData.metrics?.referralTraffic || 
      0
    ),
    
    // Device Breakdown
    MOBILE_USERS: formatNumber(
      rawData.ga4Data?.deviceBreakdown?.mobile || 
      rawData.analytics?.mobileUsers || 
      rawData.metrics?.mobileUsers || 
      0
    ),
    DESKTOP_USERS: formatNumber(
      rawData.ga4Data?.deviceBreakdown?.desktop || 
      rawData.analytics?.desktopUsers || 
      rawData.metrics?.desktopUsers || 
      0
    ),
    TABLET_USERS: formatNumber(
      rawData.ga4Data?.deviceBreakdown?.tablet || 
      rawData.analytics?.tabletUsers || 
      rawData.metrics?.tabletUsers || 
      0
    ),
    
    // Page Speed Metrics
    MOBILE_SPEED_SCORE: formatNumber(
      rawData.pageSpeedData?.mobile?.score || 
      rawData.pagespeed?.mobile?.score || 
      0
    ),
    DESKTOP_SPEED_SCORE: formatNumber(
      rawData.pageSpeedData?.desktop?.score || 
      rawData.pagespeed?.desktop?.score || 
      0
    ),
    
    // Engagement Metrics
    ENGAGED_SESSIONS: formatNumber(
      rawData.ga4Data?.engagedSessions || 
      rawData.analytics?.engagedSessions || 
      rawData.metrics?.engagedSessions || 
      0
    ),
    ENGAGEMENT_RATE: formatPercentage(
      rawData.ga4Data?.engagementRate || 
      rawData.analytics?.engagementRate || 
      rawData.metrics?.engagementRate || 
      0
    ),
  };
}

/**
 * Formats a number with proper locale and abbreviations
 */
export function formatNumber(num: number): string {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString('en-US');
}

/**
 * Formats a decimal number as a percentage
 */
export function formatPercentage(decimal: number): string {
  if (typeof decimal !== 'number' || isNaN(decimal)) return '0.0%';
  
  // Handle both decimal (0.45) and percentage (45) formats
  const percentage = decimal > 1 ? decimal : decimal * 100;
  return `${percentage.toFixed(1)}%`;
}

/**
 * Formats a number to specified decimal places
 */
export function formatDecimal(num: number, places: number = 1): string {
  if (typeof num !== 'number' || isNaN(num)) return '0.0';
  return num.toFixed(places);
}

/**
 * Formats duration in seconds to human-readable format
 */
export function formatDuration(seconds: number): string {
  if (typeof seconds !== 'number' || isNaN(seconds)) return '0s';
  
  if (seconds >= 3600) {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  }
  if (seconds >= 60) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  }
  return `${Math.floor(seconds)}s`;
}

/**
 * Formats a date string or Date object
 */
export function formatDate(date: Date | string): string {
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return 'Invalid Date';
  }
}

/**
 * Formats a date for shorter display
 */
export function formatDateShort(date: Date | string): string {
  try {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    return 'Invalid Date';
  }
}

/**
 * Validates and normalizes raw report data
 */
export function validateReportData(rawData: any): {
  isValid: boolean;
  errors: string[];
  normalized: any;
} {
  const errors: string[] = [];
  
  // Required fields validation
  if (!rawData.clientName && !rawData.client?.name) {
    errors.push('Client name is required');
  }
  
  if (!rawData.startDate) {
    errors.push('Start date is required');
  }
  
  if (!rawData.endDate) {
    errors.push('End date is required');
  }
  
  // Date validation
  try {
    const start = new Date(rawData.startDate);
    const end = new Date(rawData.endDate);
    if (start >= end) {
      errors.push('End date must be after start date');
    }
  } catch {
    errors.push('Invalid date format');
  }
  
  // Normalize the data structure
  const normalized = {
    ...rawData,
    clientName: rawData.clientName || rawData.client?.name || 'Unknown Client',
    startDate: rawData.startDate,
    endDate: rawData.endDate,
    gscData: rawData.gscData || rawData.searchConsole || {},
    ga4Data: rawData.ga4Data || rawData.analytics || rawData.metrics || {},
    branding: rawData.branding || rawData.agency || {},
  };
  
  return {
    isValid: errors.length === 0,
    errors,
    normalized
  };
}

/**
 * Extracts top queries from GSC data with proper formatting
 */
export function formatTopQueries(gscData: any, limit: number = 10): Array<{
  query: string;
  clicks: string;
  impressions: string;
  ctr: string;
  position: string;
}> {
  const queries = gscData?.topQueries || gscData?.queries || [];
  
  return queries
    .slice(0, limit)
    .map((query: any) => ({
      query: query.query || query.keyword || 'Unknown',
      clicks: formatNumber(query.clicks || 0),
      impressions: formatNumber(query.impressions || 0),
      ctr: formatPercentage(query.ctr || 0),
      position: formatDecimal(query.position || 0, 1)
    }));
}

/**
 * Extracts top pages from GA4 data with proper formatting
 */
export function formatTopPages(ga4Data: any, limit: number = 10): Array<{
  page: string;
  sessions: string;
  users: string;
  bounceRate: string;
}> {
  const pages = ga4Data?.topLandingPages || ga4Data?.topPages || [];
  
  return pages
    .slice(0, limit)
    .map((page: any) => ({
      page: page.page || page.path || 'Unknown',
      sessions: formatNumber(page.sessions || 0),
      users: formatNumber(page.users || 0),
      bounceRate: formatPercentage(page.bounceRate || 0)
    }));
}
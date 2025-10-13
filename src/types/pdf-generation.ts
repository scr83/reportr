/**
 * TypeScript interfaces for Enhanced PDF Generation API
 * 
 * These interfaces define the expected data structures for the
 * /api/generate-pdf endpoint, supporting dynamic GA4 data and
 * all report types (executive, standard, custom).
 */

// Landing page data structure
export interface LandingPageData {
  page: string
  sessions: number
  users: number
  bounceRate: number
  conversions?: number
}

// Device breakdown data structure
export interface DeviceBreakdownData {
  mobile: number
  desktop: number
  tablet: number
}

// Google Search Console query data
export interface TopQueryData {
  query: string
  clicks: number
  impressions: number
  ctr: number
  position: number
}

// Google Search Console data structure
export interface GSCData {
  clicks: number
  impressions: number
  ctr: number
  position: number
  topQueries?: TopQueryData[]
}

// Enhanced GA4 data structure - supports dynamic fields
export interface EnhancedGA4Data {
  // Core required fields
  users: number
  sessions: number
  bounceRate: number
  conversions: number

  // Optional audience metrics
  newUsers?: number
  returningUsers?: number
  engagedSessions?: number
  engagementRate?: number

  // Optional behavior metrics
  pagesPerSession?: number
  avgSessionDuration?: number
  pageViews?: number
  uniquePageViews?: number
  averageTimeOnPage?: number
  exitRate?: number

  // Optional conversion metrics
  conversionRate?: number

  // Optional traffic source metrics
  organicTraffic?: number
  directTraffic?: number
  referralTraffic?: number
  socialTraffic?: number
  emailTraffic?: number
  paidTraffic?: number

  // Optional device metrics
  mobileUsers?: number
  desktopUsers?: number
  tabletUsers?: number

  // Dynamic data structures from frontend forms
  topLandingPages?: LandingPageData[]
  deviceBreakdown?: DeviceBreakdownData

  // Allow additional dynamic fields
  [key: string]: any
}

// Custom field types for advanced reports
export interface CustomFieldData {
  title: string
  content: string
  type: 'insight' | 'recommendation' | 'metric'
}

// Complete PDF generation request interface
export interface PDFGenerationRequest {
  // Basic report information
  clientId: string
  clientName: string
  startDate: string // ISO date string
  endDate: string   // ISO date string
  reportType?: 'standard' | 'custom' | 'executive'

  // Custom report configuration
  selectedMetrics?: string[]
  customFields?: CustomFieldData[]

  // Agency branding
  agencyName?: string
  agencyLogo?: string

  // Data sources
  gscData: GSCData
  ga4Data?: EnhancedGA4Data

  // Legacy metrics support (backward compatibility)
  metrics?: {
    users?: number
    newUsers?: number
    sessions?: number
    engagedSessions?: number
    engagementRate?: number
    bounceRate?: number
    conversions?: number
    conversionRate?: number
    pagesPerSession?: number
    avgSessionDuration?: number
    organicTraffic?: number
    directTraffic?: number
    referralTraffic?: number
    socialTraffic?: number
    emailTraffic?: number
    paidTraffic?: number
    mobileUsers?: number
    desktopUsers?: number
    tabletUsers?: number
    returningUsers?: number
    pageViews?: number
    uniquePageViews?: number
    averageTimeOnPage?: number
    exitRate?: number
  }
}

// API response interfaces
export interface PDFGenerationResponse {
  // Success response includes PDF binary data
  // Headers include metadata:
  // - X-Report-ID: string
  // - X-Blob-URL: string  
  // - X-Processing-Time: string (milliseconds)
  // - Content-Type: 'application/pdf'
  // - Content-Disposition: attachment with filename
}

export interface PDFGenerationError {
  error: string
  message?: string
  code?: string
  details?: Array<{
    field: string
    message: string
  }>
}

// Available metrics for custom reports
export const AVAILABLE_METRICS = [
  // Audience Metrics
  'users',
  'newUsers', 
  'returningUsers',
  'sessions',
  'engagedSessions',
  'engagementRate',
  'bounceRate',

  // Behavior Metrics  
  'pagesPerSession',
  'avgSessionDuration',
  'pageViews',
  'uniquePageViews',
  'averageTimeOnPage',
  'exitRate',

  // Conversion Metrics
  'conversions',
  'conversionRate',

  // Traffic Source Metrics
  'organicTraffic',
  'directTraffic', 
  'referralTraffic',
  'socialTraffic',
  'emailTraffic',
  'paidTraffic',

  // Device Metrics
  'mobileUsers',
  'desktopUsers',
  'tabletUsers'
] as const

export type AvailableMetric = typeof AVAILABLE_METRICS[number]

// Helper type for metric configuration
export interface MetricConfig {
  title: string
  description: string
  category: 'audience' | 'behavior' | 'conversion' | 'traffic' | 'device'
  format: 'number' | 'percentage' | 'duration'
}

// Comprehensive metric metadata
export const METRIC_CONFIGS: Record<AvailableMetric, MetricConfig> = {
  // Audience Metrics
  users: {
    title: 'Total Users',
    description: 'Unique website visitors',
    category: 'audience',
    format: 'number'
  },
  newUsers: {
    title: 'New Users', 
    description: 'First-time visitors',
    category: 'audience',
    format: 'number'
  },
  returningUsers: {
    title: 'Returning Users',
    description: 'Repeat visitors', 
    category: 'audience',
    format: 'number'
  },
  sessions: {
    title: 'Total Sessions',
    description: 'Website visits',
    category: 'audience', 
    format: 'number'
  },
  engagedSessions: {
    title: 'Engaged Sessions',
    description: 'Sessions with engagement',
    category: 'audience',
    format: 'number'
  },
  engagementRate: {
    title: 'Engagement Rate',
    description: 'Percentage of engaged sessions',
    category: 'audience',
    format: 'percentage'
  },
  bounceRate: {
    title: 'Bounce Rate', 
    description: 'Single-page sessions percentage',
    category: 'audience',
    format: 'percentage'
  },

  // Behavior Metrics
  pagesPerSession: {
    title: 'Pages Per Session',
    description: 'Average pages viewed per session',
    category: 'behavior',
    format: 'number'
  },
  avgSessionDuration: {
    title: 'Session Duration',
    description: 'Average time spent on site',
    category: 'behavior', 
    format: 'duration'
  },
  pageViews: {
    title: 'Page Views',
    description: 'Total page views',
    category: 'behavior',
    format: 'number'
  },
  uniquePageViews: {
    title: 'Unique Page Views',
    description: 'Unique page views',
    category: 'behavior',
    format: 'number'
  },
  averageTimeOnPage: {
    title: 'Avg Time On Page', 
    description: 'Average time spent per page',
    category: 'behavior',
    format: 'duration'
  },
  exitRate: {
    title: 'Exit Rate',
    description: 'Percentage of exits from pages', 
    category: 'behavior',
    format: 'percentage'
  },

  // Conversion Metrics
  conversions: {
    title: 'Conversions',
    description: 'Goal completions',
    category: 'conversion',
    format: 'number'
  },
  conversionRate: {
    title: 'Conversion Rate',
    description: 'Percentage of sessions converting',
    category: 'conversion', 
    format: 'percentage'
  },

  // Traffic Source Metrics
  organicTraffic: {
    title: 'Organic Traffic',
    description: 'Search engine traffic',
    category: 'traffic',
    format: 'number'
  },
  directTraffic: {
    title: 'Direct Traffic',
    description: 'Direct visits',
    category: 'traffic',
    format: 'number'
  },
  referralTraffic: {
    title: 'Referral Traffic', 
    description: 'Traffic from other sites',
    category: 'traffic',
    format: 'number'
  },
  socialTraffic: {
    title: 'Social Traffic',
    description: 'Social media traffic',
    category: 'traffic',
    format: 'number'
  },
  emailTraffic: {
    title: 'Email Traffic',
    description: 'Email campaign traffic', 
    category: 'traffic',
    format: 'number'
  },
  paidTraffic: {
    title: 'Paid Traffic',
    description: 'Paid advertising traffic',
    category: 'traffic',
    format: 'number'
  },

  // Device Metrics
  mobileUsers: {
    title: 'Mobile Users',
    description: 'Mobile device users',
    category: 'device',
    format: 'number'
  },
  desktopUsers: {
    title: 'Desktop Users', 
    description: 'Desktop computer users',
    category: 'device',
    format: 'number'
  },
  tabletUsers: {
    title: 'Tablet Users',
    description: 'Tablet device users',
    category: 'device',
    format: 'number'
  }
}
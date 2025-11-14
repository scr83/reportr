// PDF Report Generation Types

import type { PageSpeedMetrics } from '@/lib/integrations/pagespeed'
import type { CustomMetric } from '@/types/custom-metrics'

export interface BrandingConfig {
  companyName: string
  primaryColor?: string
  website: string
  email: string
  phone?: string
  logo?: string
  whiteLabelEnabled?: boolean
  supportEmail?: string
}

export interface MetricData {
  users?: number
  sessions?: number
  bounceRate?: number
  conversions?: number
  conversionRate?: number
  avgSessionDuration?: number
  pagesPerSession?: number
  newUsers?: number
  organicTraffic?: number
  engagedSessions?: number
  engagementRate?: number
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

export interface GSCData {
  totalClicks: number
  totalImpressions: number
  averageCTR: number
  averagePosition: number
  topQueries?: Array<{
    query: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }>
  dailyData?: Array<{
    date: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }>
}

export interface GA4Data {
  users: number
  sessions: number
  bounceRate: number
  conversions: number
  avgSessionDuration: number
  pagesPerSession: number
  newUsers: number
  organicTraffic: number
  directTraffic?: number
  referralTraffic?: number
  socialTraffic?: number
  paidTraffic?: number
  otherTraffic?: number
  topLandingPages: Array<{
    page: string
    sessions: number
    users: number
    bounceRate: number
    conversions?: number
  }>
  deviceBreakdown: {
    desktop: number
    mobile: number
    tablet: number
  }
  trafficSources?: Array<{
    source: string
    sessions: number
    percentage: number
  }>
}

// PageSpeed data type alias - using the type from the PageSpeed integration
export type PageSpeedData = PageSpeedMetrics

export interface TrafficDataPoint {
  date: string
  sessions: number
  users: number
}

export interface AIInsight {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  category: 'keyword' | 'technical' | 'content' | 'performance'
  recommendations: string[]
}

export interface ReportData {
  clientName: string
  reportType: 'executive' | 'standard' | 'custom'
  startDate: string
  endDate: string
  branding: BrandingConfig
  
  // For executive reports (4 metrics only)
  metrics?: MetricData
  
  // For standard reports (comprehensive data)
  gscData?: GSCData
  ga4Data?: GA4Data
  pageSpeedData?: PageSpeedData
  trafficTrend?: TrafficDataPoint[]
  insights?: AIInsight[]
  
  // For custom reports (variable metrics)
  selectedMetrics?: string[]
  customMetrics?: CustomMetric[]
  customFields?: Array<{
    title: string
    content: string
    type: 'insight' | 'recommendation' | 'metric'
  }>
}

// PDF Generation Props
export interface PDFTemplateProps {
  data: ReportData
}

export interface CoverPageProps {
  clientName: string
  reportType: string
  dateRange: string
  branding: BrandingConfig
}

export interface MetricCardProps {
  title: string
  value: string | number
  icon?: string
  description?: string
  color?: string
}

export interface DataTableProps {
  title: string
  headers: string[]
  rows: Array<Record<string, any>>
  maxRows?: number
}

export interface ChartProps {
  data: any[]
  title: string
  type: 'line' | 'bar' | 'pie' | 'area'
  color?: string
}

export interface SectionProps {
  title: string
  children: React.ReactNode
  pageBreak?: boolean
}

// Report Generation API Types
export interface GeneratePDFRequest {
  reportData: ReportData
}

export interface GeneratePDFResponse {
  success: boolean
  pdfUrl?: string
  filename?: string
  error?: string
}

// PDF Styles
export interface PDFStyles {
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    textLight: string
    background: string
    border: string
  }
  fonts: {
    regular: string
    bold: string
    light: string
  }
  spacing: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
  }
  borderRadius: number
}
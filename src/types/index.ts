// Core application types
export interface User {
  id: string
  email: string
  name: string
  image?: string
  companyName: string
  primaryColor: string
  logo?: string
  createdAt: Date
  updatedAt: Date
}

export interface Client {
  id: string
  name: string
  domain: string
  contactEmail?: string
  contactName?: string
  userId: string
  googleSearchConsoleConnected: boolean
  googleAnalyticsConnected: boolean
  searchConsolePropertyUrl?: string
  googleAnalyticsPropertyId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Report {
  id: string
  title: string
  status: ReportStatus
  clientId: string
  userId: string
  data?: ReportData
  pdfUrl?: string
  createdAt: Date
  updatedAt: Date
}

export type ReportStatus = 'pending' | 'processing' | 'completed' | 'failed'

export interface ReportData {
  dateRange: {
    start: string
    end: string
  }
  searchConsole?: SearchConsoleData
  analytics?: AnalyticsData
  pagespeed?: PagespeedData
  summary: ReportSummary
}

export interface SearchConsoleData {
  totalClicks: number
  totalImpressions: number
  averageCTR: number
  averagePosition: number
  topQueries: Array<{
    query: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }>
  topPages: Array<{
    page: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }>
  dailyData?: Array<{
    date: string      // Format: 'YYYY-MM-DD'
    clicks: number
    impressions: number
    ctr: number
    position: number
  }>
}

export interface AnalyticsData {
  totalUsers: number
  totalSessions: number
  bounceRate: number
  averageSessionDuration: number
  pageviews: number
  conversions?: number
  topPages: Array<{
    page: string
    users: number
    sessions: number
    bounceRate: number
  }>
  trafficSources: Array<{
    source: string
    users: number
    percentage: number
  }>
}

export interface PagespeedData {
  mobile: {
    score: number
    fcp: number
    lcp: number
    cls: number
    fid: number
  }
  desktop: {
    score: number
    fcp: number
    lcp: number
    cls: number
    fid: number
  }
}

export interface ReportSummary {
  performanceScore: number
  keyInsights: string[]
  recommendations: string[]
  previousPeriodComparison?: {
    clicksChange: number
    impressionsChange: number
    usersChange: number
    performanceChange: number
  }
}

// UI Component types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'error'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  children: React.ReactNode
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string
  error?: string
  onChange?: (value: string) => void
}

export interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  changeType?: 'positive' | 'negative' | 'neutral'
  icon?: React.ReactNode
  loading?: boolean
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface ClientForm {
  name: string
  domain: string
  contactEmail?: string
  contactName?: string
}

export interface BrandingForm {
  companyName: string
  primaryColor: string
  logo?: File
}

// Utility types
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export * from './custom-metrics';
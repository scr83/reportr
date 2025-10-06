// Google API Response Types
export interface SearchConsoleData {
  totalClicks: number;
  totalImpressions: number;
  averagePosition: number;
  averageCTR: number;
  topKeywords: KeywordPerformance[];
  topPages: PagePerformance[];
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export interface KeywordPerformance {
  keyword: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface PagePerformance {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface AnalyticsData {
  organicSessions: number;
  sessionsDelta: number; // percentage change vs previous period
  bounceRate: number;
  averageSessionDuration: number;
  topLandingPages: LandingPageData[];
  trafficTrend: TrafficDataPoint[];
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export interface LandingPageData {
  page: string;
  sessions: number;
  users: number;
  bounceRate: number;
  averageSessionDuration: number;
}

export interface TrafficDataPoint {
  date: string;
  sessions: number;
  users: number;
}

export interface PageSpeedData {
  url: string;
  mobileScore: number;
  desktopScore: number;
  coreWebVitals: {
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
  };
  opportunities: PageSpeedOpportunity[];
}

export interface PageSpeedOpportunity {
  title: string;
  description: string;
  savings: number; // milliseconds
  impact: 'high' | 'medium' | 'low';
}

// Aggregated Report Data
export interface ReportData {
  client: {
    id: string;
    name: string;
    domain: string;
  };
  summary: {
    totalClicks: number;
    clicksChange: number;
    totalImpressions: number;
    impressionsChange: number;
    averagePosition: number;
    positionChange: number;
    organicSessions: number;
    sessionsChange: number;
    mobileScore: number;
    desktopScore: number;
  };
  searchConsole: SearchConsoleData;
  analytics: AnalyticsData;
  pageSpeed: PageSpeedData;
  keywordPages: KeywordPageMapping[];
  insights: AIInsight[];
  generatedAt: string;
}

export interface KeywordPageMapping {
  keyword: string;
  position: number;
  clicks: number;
  landingPage: string;
  pageTitle: string;
  sessions: number;
  bounceRate: number;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'keyword' | 'technical' | 'content' | 'performance';
  expectedImpact: string;
  actionItems: string[];
  dataSource: string[];
}

// API Error Types
export interface GoogleAPIError {
  service: 'gsc' | 'ga4' | 'pagespeed';
  statusCode: number;
  message: string;
  retryable: boolean;
  needsReauth?: boolean;
}

// Connection Status
export enum ConnectionStatus {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR'
}

export interface ConnectionState {
  gsc: ConnectionStatus;
  ga4: ConnectionStatus;
  lastConnected: string | null;
  lastError: string | null;
}
// PRODUCTION-READY PDF TYPES - Phase 1 Implementation

import type { PageSpeedMetrics } from '../integrations/pagespeed';

export interface GSCKeyword {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GSCPage {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GSCCountry {
  country: string;
  clicks: number;
  impressions: number;
  ctr: number;
}

export interface GSCDevice {
  device: string; // "desktop" | "mobile" | "tablet"
  clicks: number;
  impressions: number;
  ctr: number;
}

export interface GSCMetrics {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  topKeywords?: GSCKeyword[];
  topPages?: GSCPage[];
  topCountries?: GSCCountry[];
  deviceBreakdown?: GSCDevice[];
}

export interface ReportData {
  reportType: 'executive' | 'standard' | 'custom';
  clientName: string;
  clientDomain: string;
  
  reportPeriod: {
    startDate: string;
    endDate: string;
  };
  
  branding: {
    companyName: string;
    website: string;
    email: string;
    phone?: string;
    logo?: string;
    primaryColor?: string;
    // White label settings
    whiteLabelEnabled?: boolean;
    supportEmail?: string;
    enabled?: boolean;
    showPoweredBy?: boolean;
  };
  
  // GSC Data - ALWAYS REQUIRED (4 metrics + tables)
  gscMetrics: GSCMetrics;
  
  // Alternative GSC Data structure (used by new PDF generation)
  gscData?: {
    totalClicks: number;
    totalImpressions: number;
    averageCTR: number;
    averagePosition: number;
    topQueries?: Array<{
      query: string;
      clicks: number;
      impressions: number;
      ctr: number;
      position: number;
    }>;
    dailyData?: Array<{
      date: string;
      clicks: number;
      impressions: number;
      ctr: number;
      position: number;
    }>;
  };
  
  // GA4 Data - Structure varies by report type
  ga4Metrics: GA4Metrics;
  
  // PageSpeed Data - Optional
  pageSpeedData?: PageSpeedMetrics | null;
  
  // Custom report selected metrics - only used for custom report type
  selectedMetrics?: string[];
  
  insights?: {
    traffic?: string;
    engagement?: string;
    search?: string;
  };
  
  recommendations?: Array<{
    title: string;
    description: string;
    priority?: 'high' | 'medium' | 'low';
  }>;
}

export interface GA4Metrics {
  // Executive & Standard - REQUIRED
  users: number;
  sessions: number;
  bounceRate: number;
  conversions: number;
  
  // Standard only - REQUIRED for Standard
  avgSessionDuration?: number;
  pagesPerSession?: number;
  newUsers?: number;
  organicTraffic?: number;
  topLandingPages?: Array<{
    page: string;
    sessions: number;
    users: number;
    bounceRate: number;
  }>;
  deviceBreakdown?: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  
  // Custom - any combination of available metrics
  [key: string]: any;
}

// Legacy BrandingConfig interface for backward compatibility
export interface BrandingConfig {
  name: string;
  website: string;
  logo?: string;
  primaryColor?: string;
  accentColor?: string;
  email?: string;
  phone?: string;
}

// React-PDF specific interfaces
export interface ReactPDFGenerationOptions {
  timeout?: number;
  debug?: boolean;
  compressionLevel?: number;
}

export interface PDFGenerationResult {
  buffer: Buffer;
  filename: string;
  processingTime: number;
  reportId?: string;
}

export interface PDFGeneratorResult {
  success: boolean;
  pdfBuffer?: Buffer;
  error?: string;
  processingTime?: number;
}

export interface ReactPDFError extends Error {
  stage: 'initialization' | 'rendering' | 'buffer_generation' | 'cleanup';
  duration: number;
  originalError?: Error;
}

// White Label Branding Interface
export interface ReportBranding {
  enabled: boolean;          // Is white label enabled?
  companyName: string;        // "Reportr" or user's agency name
  logo: string;               // Reportr logo path or user's logo URL
  primaryColor: string;       // "#7e23ce" or user's custom color
  showPoweredBy: boolean;     // Show "Powered by Reportr"? (opposite of enabled)
}


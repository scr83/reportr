import { ReportData, BrandingConfig, AIInsight, TrafficDataPoint, PageSpeedData } from '@/types/report'

export const MOCK_BRANDING: BrandingConfig = {
  companyName: 'Digital Frog Agency',
  primaryColor: '#9810f9', // Digital Frog Purple from brand
  website: 'https://digitalfrog.co',
  email: 'jump@digitalfrog.co',
  phone: '+56 9 9073 0352',
  whiteLabelEnabled: true,
  supportEmail: 'support@digitalfrog.co'
  // logo will be added when we have upload functionality
}

export const MOCK_EXECUTIVE_REPORT: ReportData = {
  clientName: 'Digital Frog',
  reportType: 'executive',
  startDate: '2024-09-01',
  endDate: '2024-10-01',
  branding: MOCK_BRANDING,
  metrics: {
    users: 12,
    sessions: 13,
    bounceRate: 15.38,
    conversions: 0
  }
}

export const MOCK_STANDARD_REPORT: ReportData = {
  clientName: 'Digital Frog',
  reportType: 'standard',
  startDate: '2024-09-01',
  endDate: '2024-10-01',
  branding: MOCK_BRANDING,
  gscData: {
    totalClicks: 2,
    totalImpressions: 44,
    averageCTR: 4.55,
    averagePosition: 17.5,
    topQueries: [
      { query: 'the digital frog', clicks: 1, impressions: 3, ctr: 33.33, position: 1.7 },
      { query: 'digital frog agency', clicks: 1, impressions: 8, ctr: 12.5, position: 4.3 },
      { query: 'seo services chile', clicks: 0, impressions: 15, ctr: 0, position: 23.1 },
      { query: 'marketing digital santiago', clicks: 0, impressions: 12, ctr: 0, position: 18.9 },
      { query: 'web design chile', clicks: 0, impressions: 6, ctr: 0, position: 31.2 }
    ]
  },
  ga4Data: {
    users: 12,
    sessions: 13,
    bounceRate: 15.38,
    conversions: 0,
    avgSessionDuration: 414,
    pagesPerSession: 4.2,
    newUsers: 10,
    organicTraffic: 68.5,
    topLandingPages: [
      { page: '/', sessions: 11, users: 11, bounceRate: 9.09 },
      { page: '/what-we-do', sessions: 1, users: 1, bounceRate: 100 },
      { page: '/services/seo', sessions: 1, users: 1, bounceRate: 0 }
    ],
    deviceBreakdown: {
      desktop: 8,
      mobile: 5,
      tablet: 0
    },
    trafficSources: [
      { source: 'Organic Search', sessions: 9, percentage: 69.2 },
      { source: 'Direct', sessions: 3, percentage: 23.1 },
      { source: 'Social', sessions: 1, percentage: 7.7 }
    ]
  }
}

export const MOCK_CUSTOM_REPORT: ReportData = {
  clientName: 'Digital Frog',
  reportType: 'custom',
  startDate: '2024-09-01',
  endDate: '2024-10-01',
  branding: MOCK_BRANDING,
  selectedMetrics: [
    'users', 'sessions', 'bounceRate', 'conversions', 
    'avgSessionDuration', 'pagesPerSession', 'newUsers', 
    'organicTraffic', 'totalClicks', 'totalImpressions'
  ],
  gscData: {
    totalClicks: 2,
    totalImpressions: 44,
    averageCTR: 4.55,
    averagePosition: 17.5,
    topQueries: [
      { query: 'the digital frog', clicks: 1, impressions: 3, ctr: 33.33, position: 1.7 },
      { query: 'digital frog agency', clicks: 1, impressions: 8, ctr: 12.5, position: 4.3 }
    ]
  },
  ga4Data: {
    users: 12,
    sessions: 13,
    bounceRate: 15.38,
    conversions: 0,
    avgSessionDuration: 414,
    pagesPerSession: 4.2,
    newUsers: 10,
    organicTraffic: 68.5,
    topLandingPages: [
      { page: '/', sessions: 11, users: 11, bounceRate: 9.09 },
      { page: '/what-we-do', sessions: 1, users: 1, bounceRate: 100 }
    ],
    deviceBreakdown: {
      desktop: 8,
      mobile: 5,
      tablet: 0
    }
  }
}

// Additional mock data for charts and insights
export const MOCK_TRAFFIC_TREND: TrafficDataPoint[] = [
  { date: '2024-09-01', sessions: 1, users: 1 },
  { date: '2024-09-03', sessions: 2, users: 2 },
  { date: '2024-09-05', sessions: 1, users: 1 },
  { date: '2024-09-08', sessions: 3, users: 2 },
  { date: '2024-09-12', sessions: 2, users: 2 },
  { date: '2024-09-15', sessions: 1, users: 1 },
  { date: '2024-09-18', sessions: 2, users: 2 },
  { date: '2024-09-22', sessions: 1, users: 1 }
]

export const MOCK_AI_INSIGHTS: AIInsight[] = [
  {
    id: '1',
    title: 'Strong Brand Recognition',
    description: 'Your brand keyword "the digital frog" is ranking in position 1.7 with excellent CTR of 33.33%.',
    priority: 'high' as const,
    category: 'keyword' as const,
    recommendations: [
      'Continue focusing on brand awareness campaigns',
      'Create more content around your brand story'
    ]
  },
  {
    id: '2',
    title: 'Low Bounce Rate Opportunity',
    description: 'Your overall bounce rate of 15.38% is excellent, indicating high-quality traffic and content.',
    priority: 'medium' as const,
    category: 'performance' as const,
    recommendations: [
      'Leverage this low bounce rate to improve conversion tracking',
      'Add more call-to-action elements on high-performing pages'
    ]
  },
  {
    id: '3',
    title: 'Mobile Traffic Growth',
    description: 'Mobile traffic represents 38% of total sessions, showing mobile optimization is working.',
    priority: 'medium' as const,
    category: 'technical' as const,
    recommendations: [
      'Continue mobile-first design approach',
      'Test mobile conversion funnels'
    ]
  }
]

export const MOCK_PAGE_SPEED: PageSpeedData = {
  mobile: {
    score: 78,
    fcp: 1.2, // First Contentful Paint in seconds
    lcp: 2.1, // Largest Contentful Paint in seconds
    cls: 0.05, // Cumulative Layout Shift
    fid: 45 // First Input Delay in milliseconds
  },
  desktop: {
    score: 95,
    fcp: 0.8,
    lcp: 1.3,
    cls: 0.02,
    fid: 12
  }
}
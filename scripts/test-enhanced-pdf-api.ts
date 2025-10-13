#!/usr/bin/env tsx

/**
 * Test Script for Enhanced PDF Generation API
 * 
 * This script tests the new PDF API route with dynamic GA4 data
 * including topLandingPages, deviceBreakdown, and selected metrics
 */

const API_BASE = 'http://localhost:3000'

// Sample test data mimicking frontend form submission
const testReportData = {
  // Basic report info
  clientId: 'test-client-id',
  clientName: 'Acme Corporation',
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  reportType: 'custom' as const,

  // Selected metrics for custom report
  selectedMetrics: [
    'users',
    'sessions',
    'bounceRate',
    'conversions',
    'newUsers',
    'organicTraffic',
    'mobileUsers',
    'desktopUsers',
    'pagesPerSession',
    'avgSessionDuration'
  ],

  // Agency branding
  agencyName: 'Digital Frog Agency',
  agencyLogo: undefined,

  // Google Search Console data
  gscData: {
    clicks: 12450,
    impressions: 234567,
    ctr: 5.3,
    position: 12.4,
    topQueries: [
      {
        query: 'digital marketing services',
        clicks: 1250,
        impressions: 15600,
        ctr: 8.0,
        position: 8.2
      },
      {
        query: 'seo optimization',
        clicks: 980,
        impressions: 12300,
        ctr: 8.0,
        position: 9.1
      },
      {
        query: 'content marketing strategy',
        clicks: 780,
        impressions: 9800,
        ctr: 8.0,
        position: 11.5
      }
    ]
  },

  // Enhanced GA4 data with dynamic fields
  ga4Data: {
    // Core metrics
    users: 45230,
    sessions: 52180,
    bounceRate: 34.2,
    conversions: 234,

    // Additional audience metrics
    newUsers: 32400,
    returningUsers: 12830,
    engagedSessions: 34320,
    engagementRate: 65.8,

    // Behavior metrics
    pagesPerSession: 3.2,
    avgSessionDuration: 142, // seconds
    pageViews: 167376,
    uniquePageViews: 134250,
    averageTimeOnPage: 95, // seconds

    // Conversion metrics
    conversionRate: 0.45,

    // Traffic source metrics
    organicTraffic: 28140,
    directTraffic: 12650,
    referralTraffic: 7890,
    socialTraffic: 2340,
    emailTraffic: 1160,
    paidTraffic: 0,

    // Device breakdown (dynamic data from frontend)
    deviceBreakdown: {
      mobile: 24567, // 54.3%
      desktop: 18234, // 40.3%
      tablet: 2429    // 5.4%
    },

    // Top landing pages (dynamic data from frontend)
    topLandingPages: [
      {
        page: '/services/digital-marketing',
        sessions: 8450,
        users: 7234,
        bounceRate: 28.4,
        conversions: 67
      },
      {
        page: '/blog/seo-best-practices',
        sessions: 6780,
        users: 5890,
        bounceRate: 22.1,
        conversions: 23
      },
      {
        page: '/contact',
        sessions: 4320,
        users: 3890,
        bounceRate: 45.6,
        conversions: 89
      },
      {
        page: '/pricing',
        sessions: 3450,
        users: 3120,
        bounceRate: 31.2,
        conversions: 34
      },
      {
        page: '/case-studies',
        sessions: 2890,
        users: 2567,
        bounceRate: 18.9,
        conversions: 21
      }
    ]
  },

  // Custom fields for insights and recommendations
  customFields: [
    {
      title: 'Traffic Growth Analysis',
      content: 'Your organic traffic increased by 23% compared to the previous period, with mobile users driving the majority of this growth.',
      type: 'insight' as const
    },
    {
      title: 'Conversion Optimization Opportunity',
      content: 'Your /contact page has a high bounce rate (45.6%) but strong conversion rate when users engage. Consider A/B testing the initial content.',
      type: 'recommendation' as const
    }
  ]
}

async function testPDFGeneration() {
  console.log('🧪 Testing Enhanced PDF Generation API')
  console.log('=====================================')
  
  try {
    console.log('📊 Sending test data with dynamic GA4 metrics...')
    console.log('Selected metrics:', testReportData.selectedMetrics)
    console.log('Device breakdown:', testReportData.ga4Data.deviceBreakdown)
    console.log('Landing pages count:', testReportData.ga4Data.topLandingPages?.length)
    
    const response = await fetch(`${API_BASE}/api/generate-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testReportData)
    })
    
    console.log('📡 API Response Status:', response.status)
    console.log('📡 API Response Headers:', Object.fromEntries(response.headers.entries()))
    
    if (response.ok) {
      console.log('✅ PDF Generation Successful!')
      
      // Get response headers for metadata
      const reportId = response.headers.get('X-Report-ID')
      const blobUrl = response.headers.get('X-Blob-URL')
      const processingTime = response.headers.get('X-Processing-Time')
      
      console.log('📋 Report Metadata:')
      console.log('  - Report ID:', reportId)
      console.log('  - Blob URL:', blobUrl)
      console.log('  - Processing Time:', processingTime, 'ms')
      
      // Get PDF data
      const pdfBuffer = await response.arrayBuffer()
      console.log('📄 PDF Size:', (pdfBuffer.byteLength / 1024 / 1024).toFixed(2), 'MB')
      
      // Test data integrity
      if (pdfBuffer.byteLength < 1000) {
        console.log('⚠️  Warning: PDF size seems too small')
      } else {
        console.log('✅ PDF size looks good')
      }
      
    } else {
      console.log('❌ PDF Generation Failed')
      const errorData = await response.json()
      console.log('Error Details:', errorData)
    }
    
  } catch (error) {
    console.error('🚨 Test Failed:', error)
  }
}

async function testDataValidation() {
  console.log('\n🔍 Testing Data Validation')
  console.log('==========================')
  
  // Test with missing required fields
  const invalidData = {
    clientName: 'Test Client',
    // Missing required fields
  }
  
  try {
    const response = await fetch(`${API_BASE}/api/generate-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidData)
    })
    
    if (response.status === 400) {
      const errorData = await response.json()
      console.log('✅ Validation working correctly')
      console.log('📋 Validation errors:', errorData.details?.length || 'Multiple')
    } else {
      console.log('⚠️  Expected validation error, got:', response.status)
    }
    
  } catch (error) {
    console.error('🚨 Validation test failed:', error)
  }
}

async function runTests() {
  console.log('🎯 Enhanced PDF API Integration Tests')
  console.log('======================================\n')
  
  // Test 1: Valid data with dynamic fields
  await testPDFGeneration()
  
  // Test 2: Data validation
  await testDataValidation()
  
  console.log('\n🏁 Tests Complete')
}

// Run tests if called directly
if (require.main === module) {
  runTests().catch(console.error)
}

export { testReportData, testPDFGeneration, testDataValidation }
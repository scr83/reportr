#!/usr/bin/env npx tsx

/**
 * QA Test Script for Device Usage Percentage Fix
 * Tests the specific Fernando Perez scenario and edge cases
 */

import { generatePDF } from '../src/lib/pdf-generator'
import { ReportData } from '../src/types/report'
import fs from 'fs'
import path from 'path'

const MOCK_BRANDING = {
  companyName: 'QA Test Agency',
  primaryColor: '#3B82F6',
  website: 'https://test.com',
  email: 'test@test.com',
  phone: '+1234567890',
  whiteLabelEnabled: true,
  supportEmail: 'support@test.com'
}

// Test 1: Fernando Perez scenario (the original bug scenario)
const FERNANDO_PEREZ_DATA: ReportData = {
  clientName: 'Fernando Perez (QA Test)',
  reportType: 'standard',
  startDate: '2024-09-01',
  endDate: '2024-10-01',
  branding: MOCK_BRANDING,
  gscData: {
    totalClicks: 150,
    totalImpressions: 5000,
    averageCTR: 3.0,
    averagePosition: 12.5,
    topQueries: [
      { query: 'test keyword', clicks: 50, impressions: 800, ctr: 6.25, position: 8.2 }
    ]
  },
  ga4Data: {
    users: 850,
    sessions: 1272, // This is the total that should be used for percentage calculation
    bounceRate: 42.5,
    conversions: 23,
    avgSessionDuration: 185,
    pagesPerSession: 2.8,
    newUsers: 680,
    organicTraffic: 65.2,
    topLandingPages: [
      { page: '/', sessions: 400, users: 350, bounceRate: 35.5 }
    ],
    deviceBreakdown: {
      desktop: 707,   // Should show as 55.6% (707/1272)
      mobile: 561,    // Should show as 44.1% (561/1272)
      tablet: 4       // Should show as 0.3% (4/1272)
    }
  }
}

// Test 2: Edge case - Zero sessions
const ZERO_SESSIONS_DATA: ReportData = {
  clientName: 'Zero Sessions Client (QA Test)',
  reportType: 'standard',
  startDate: '2024-09-01',
  endDate: '2024-10-01',
  branding: MOCK_BRANDING,
  ga4Data: {
    users: 0,
    sessions: 0,
    bounceRate: 0,
    conversions: 0,
    deviceBreakdown: {
      desktop: 0,
      mobile: 0,
      tablet: 0
    }
  }
}

// Test 3: Edge case - Mobile-first site
const MOBILE_FIRST_DATA: ReportData = {
  clientName: 'Mobile-First Client (QA Test)',
  reportType: 'standard',
  startDate: '2024-09-01',
  endDate: '2024-10-01',
  branding: MOCK_BRANDING,
  ga4Data: {
    users: 1000,
    sessions: 1000,
    bounceRate: 35.0,
    conversions: 50,
    deviceBreakdown: {
      desktop: 250,   // Should show as 25.0%
      mobile: 700,    // Should show as 70.0% (primary)
      tablet: 50      // Should show as 5.0%
    }
  }
}

// Test 4: Edge case - Small numbers
const SMALL_NUMBERS_DATA: ReportData = {
  clientName: 'Small Numbers Client (QA Test)',
  reportType: 'standard',
  startDate: '2024-09-01',
  endDate: '2024-10-01',
  branding: MOCK_BRANDING,
  ga4Data: {
    users: 8,
    sessions: 8,
    bounceRate: 25.0,
    conversions: 2,
    deviceBreakdown: {
      desktop: 5,    // Should show as 62.5%
      mobile: 3,     // Should show as 37.5%
      tablet: 0      // Should show as 0.0%
    }
  }
}

// Test 5: Edge case - Null device breakdown
const NULL_DEVICE_DATA: ReportData = {
  clientName: 'Null Device Client (QA Test)',
  reportType: 'standard',
  startDate: '2024-09-01',
  endDate: '2024-10-01',
  branding: MOCK_BRANDING,
  ga4Data: {
    users: 100,
    sessions: 150,
    bounceRate: 40.0,
    conversions: 5,
    deviceBreakdown: undefined as any // Test null handling
  }
}

async function runQATest(testName: string, reportData: ReportData): Promise<void> {
  console.log(`\n🧪 Testing: ${testName}`)
  console.log('=' .repeat(50))
  
  try {
    // Generate PDF
    const blob = await generatePDF(reportData)
    
    // Save PDF for manual inspection
    const buffer = Buffer.from(await blob.arrayBuffer())
    const filename = `qa-test-${testName.toLowerCase().replace(/\s+/g, '-')}.pdf`
    const filepath = path.join(__dirname, filename)
    fs.writeFileSync(filepath, buffer)
    
    const sizeMB = (buffer.length / 1024 / 1024).toFixed(2)
    console.log(`✅ PDF generated successfully`)
    console.log(`📁 File: ${filename} (${sizeMB}MB)`)
    
    // Manual verification steps for each test
    if (testName.includes('Fernando Perez')) {
      console.log('\n📋 MANUAL VERIFICATION CHECKLIST:')
      console.log('Page 10 - Device Usage Patterns section should show:')
      console.log('  • Desktop: 55.6% (NOT 707.0%)')
      console.log('  • Mobile: 44.1% (NOT 561.0%)')
      console.log('  • Text: "primarily uses desktop devices"')
      console.log('  • Text: "with opportunities for mobile optimization"')
      console.log('Page 7 - Device Breakdown should match the above percentages')
    } else if (testName.includes('Zero Sessions')) {
      console.log('\n📋 MANUAL VERIFICATION CHECKLIST:')
      console.log('Page 10 should show:')
      console.log('  • Graceful fallback message for device data')
      console.log('  • NO "NaN%" or "Infinity%" values')
      console.log('  • NO application crash')
    } else if (testName.includes('Mobile-First')) {
      console.log('\n📋 MANUAL VERIFICATION CHECKLIST:')
      console.log('Page 10 should show:')
      console.log('  • Mobile: 70.0% (primary device)')
      console.log('  • Desktop: 25.0%')
      console.log('  • Text: "primarily uses mobile devices"')
      console.log('  • Text: "indicating mobile-first behavior"')
    } else if (testName.includes('Small Numbers')) {
      console.log('\n📋 MANUAL VERIFICATION CHECKLIST:')
      console.log('Page 10 should show:')
      console.log('  • Desktop: 62.5%')
      console.log('  • Mobile: 37.5%')
      console.log('  • NO decimal precision errors')
    } else if (testName.includes('Null Device')) {
      console.log('\n📋 MANUAL VERIFICATION CHECKLIST:')
      console.log('Page 10 should show:')
      console.log('  • Fallback message for unavailable device data')
      console.log('  • NO crash or error in PDF')
    }
    
  } catch (error) {
    console.log(`❌ FAILED: ${error}`)
  }
}

async function main() {
  console.log('🔍 QA AUDIT: Device Usage Percentage Fix Verification')
  console.log('='.repeat(60))
  console.log('Testing the fix for device percentage display bug')
  console.log('Original bug: 707 sessions shown as 707.0% instead of 55.6%')
  
  // Run all QA tests
  await runQATest('Fernando Perez Original Scenario', FERNANDO_PEREZ_DATA)
  await runQATest('Zero Sessions Edge Case', ZERO_SESSIONS_DATA)
  await runQATest('Mobile-First Client', MOBILE_FIRST_DATA)
  await runQATest('Small Numbers', SMALL_NUMBERS_DATA)
  await runQATest('Null Device Data', NULL_DEVICE_DATA)
  
  console.log('\n🎯 QA TEST COMPLETE')
  console.log('='.repeat(30))
  console.log('📂 Generated PDF files in scripts/ directory')
  console.log('👀 Manual inspection required for final verification')
  console.log('\n✅ Next steps:')
  console.log('   1. Open each PDF file')
  console.log('   2. Navigate to Page 10 (Key Insights)')
  console.log('   3. Check Device Usage Patterns section')
  console.log('   4. Verify percentages are correctly calculated')
  console.log('   5. Compare Page 7 and Page 10 for consistency')
  
  console.log('\n🚨 CRITICAL: If Page 10 still shows 707.0% or 561.0%,')
  console.log('   the fix has NOT been applied correctly!')
}

main().catch(error => {
  console.error('❌ QA Test failed:', error)
  process.exit(1)
})
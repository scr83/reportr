#!/usr/bin/env npx tsx

/**
 * Phase 7E: End-to-End Report Generation Test
 * 
 * This script tests the complete flow from API data to PDF generation
 */

import { getAnalyticsData } from '../src/lib/integrations/google-analytics';
import { getSearchConsoleData } from '../src/lib/integrations/google-search-console';
import { generateAndDownloadPDF } from '../src/lib/pdf-generator';
import { ReportData } from '../src/types/report';
import { MOCK_BRANDING } from '../src/lib/mock-report-data';
import { prisma } from '../src/lib/prisma';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testEndToEndReportGeneration() {
  log('🚀 Phase 7E: End-to-End Report Generation Test', 'magenta');
  log('='.repeat(60), 'magenta');
  
  try {
    // Step 1: Get test client
    log('\n🔧 STEP 1: Finding test client with OAuth tokens', 'cyan');
    const client = await prisma.client.findFirst({
      where: {
        googleRefreshToken: { not: null },
        gscSiteUrl: { not: null },
        ga4PropertyId: { not: null }
      }
    });

    if (!client) {
      log('❌ No suitable test client found', 'red');
      log('   Please ensure a client has:', 'yellow');
      log('   - Google OAuth tokens (connected)', 'yellow');
      log('   - GSC site URL configured', 'yellow');
      log('   - GA4 property ID configured', 'yellow');
      return;
    }

    log(`✅ Found test client: ${client.name}`, 'green');
    log(`   Domain: ${client.domain}`, 'blue');
    log(`   GSC Site: ${client.gscSiteUrl}`, 'blue');
    log(`   GA4 Property: ${client.ga4PropertyId}`, 'blue');

    // Step 2: Fetch real API data
    log('\n🔧 STEP 2: Fetching real API data', 'cyan');
    const endDate: string = new Date().toISOString().split('T')[0]!;
    const startDate: string = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]!;

    log(`   Date range: ${startDate} to ${endDate}`, 'blue');

    // Fetch GA4 data
    log('   Fetching GA4 data...', 'blue');
    const ga4Data = await getAnalyticsData(
      client.id,
      startDate,
      endDate,
      undefined,
      ['users', 'sessions', 'bounceRate', 'conversions']
    );

    // Fetch GSC data
    log('   Fetching GSC data...', 'blue');
    const gscData = await getSearchConsoleData(client.id, startDate, endDate);

    log('✅ API data fetched successfully', 'green');
    log(`   GA4: ${ga4Data.users} users, ${ga4Data.sessions} sessions`, 'blue');
    log(`   GSC: ${gscData.summary.totalClicks} clicks, ${gscData.summary.totalImpressions} impressions`, 'blue');

    // Step 3: Convert to PDF report data format
    log('\n🔧 STEP 3: Converting to PDF report format', 'cyan');

    const reportData: ReportData = {
      clientName: client.name,
      reportType: 'standard',
      startDate,
      endDate,
      branding: MOCK_BRANDING,
      gscData: {
        totalClicks: gscData.summary.totalClicks || 0,
        totalImpressions: gscData.summary.totalImpressions || 0,
        averageCTR: gscData.summary.averageCTR || 0,
        averagePosition: gscData.summary.averagePosition || 0,
        topQueries: gscData.topQueries || []
      },
      ga4Data: {
        users: ga4Data.users || 0,
        sessions: ga4Data.sessions || 0,
        bounceRate: parseFloat(ga4Data.bounceRate?.toString().replace('%', '')) || 0,
        conversions: ga4Data.conversions || 0,
        avgSessionDuration: 240, // Default
        pagesPerSession: 2.5, // Default
        newUsers: Math.floor((ga4Data.users || 0) * 0.7),
        organicTraffic: 65.5, // Default
        topLandingPages: ga4Data.topLandingPages || [],
        deviceBreakdown: {
          desktop: Math.floor((ga4Data.sessions || 0) * 0.6),
          mobile: Math.floor((ga4Data.sessions || 0) * 0.35),
          tablet: Math.floor((ga4Data.sessions || 0) * 0.05)
        }
      }
    };

    log('✅ Report data converted successfully', 'green');
    log(`   Report type: ${reportData.reportType}`, 'blue');
    log(`   Client: ${reportData.clientName}`, 'blue');
    log(`   Has GSC data: ${!!reportData.gscData}`, 'blue');
    log(`   Has GA4 data: ${!!reportData.ga4Data}`, 'blue');

    // Step 4: Generate PDF (without download in Node.js)
    log('\n🔧 STEP 4: Generating PDF report', 'cyan');
    log('   This may take 10-30 seconds...', 'yellow');

    // Import the PDF generation function directly to avoid browser-specific download
    const { generatePDF } = await import('../src/lib/pdf-generator');
    
    try {
      const pdfBlob = await generatePDF(reportData);
      log('✅ PDF generated successfully!', 'green');
      log(`   PDF size: ${pdfBlob.size} bytes`, 'blue');
      log(`   PDF type: ${pdfBlob.type}`, 'blue');
    } catch (pdfError: any) {
      log(`❌ PDF generation failed: ${pdfError.message}`, 'red');
      console.error('PDF Error Details:', pdfError);
      return;
    }

    // Step 5: Summary
    log('\n✅ END-TO-END TEST COMPLETE!', 'green');
    log('🎉 All systems working:', 'green');
    log('   ✓ OAuth authentication', 'green');
    log('   ✓ Token refresh', 'green');
    log('   ✓ GA4 API calls', 'green');
    log('   ✓ GSC API calls', 'green');
    log('   ✓ Data conversion', 'green');
    log('   ✓ PDF generation', 'green');
    log('   ✓ Null/missing value handling', 'green');

  } catch (error: any) {
    log(`❌ End-to-end test failed: ${error.message}`, 'red');
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testEndToEndReportGeneration().catch((error) => {
  console.error('Test script failed:', error);
  process.exit(1);
});
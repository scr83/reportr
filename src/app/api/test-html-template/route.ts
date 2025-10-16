import { NextRequest, NextResponse } from 'next/server';
import { generateReportHTML } from '@/lib/pdf/template-utils';
import { ReportData, BrandingConfig } from '@/lib/pdf/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Test API Route for HTML Template Generation
 * Returns the generated HTML for inspection in browser
 */
export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Testing HTML template generation...');
    
    const body = await request.json();
    
    // Use provided data or create test data
    const testReportData: ReportData = body.reportData || {
      clientName: 'Acme Corporation',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      gscData: {
        totalClicks: 12450,
        totalImpressions: 185600,
        averageCTR: 0.067,
        averagePosition: 15.2,
        topQueries: [
          { query: 'digital marketing services', clicks: 1200, impressions: 15000, ctr: 0.08, position: 12.5 },
          { query: 'SEO optimization', clicks: 980, impressions: 12000, ctr: 0.082, position: 8.3 },
          { query: 'web design agency', clicks: 750, impressions: 9500, ctr: 0.079, position: 14.1 },
          { query: 'content marketing', clicks: 650, impressions: 8200, ctr: 0.079, position: 16.8 },
          { query: 'social media management', clicks: 520, impressions: 7800, ctr: 0.067, position: 18.9 }
        ]
      },
      ga4Data: {
        users: 8950,
        sessions: 13780,
        bounceRate: 0.423,
        conversions: 187,
        newUsers: 6745,
        avgSessionDuration: 185,
        pagesPerSession: 3.2,
        organicTraffic: 0.685,
        engagementRate: 0.577,
        conversionRate: 0.014
      }
    };
    
    const testBranding: BrandingConfig = body.branding || {
      agencyName: 'Digital Frog Agency',
      agencyLogo: '', // No logo for now
      primaryColor: '#6366f1',
      accentColor: '#22d3ee',
      agencyWebsite: 'https://digitalfrog.agency'
    };
    
    console.log('📊 Generating HTML with test data...');
    const html = generateReportHTML(testReportData);
    
    console.log('✅ HTML template generated successfully');
    console.log('📏 HTML size:', html.length, 'characters');
    
    // Return HTML with proper content type for browser viewing
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Template-Size': html.length.toString(),
        'X-Generated-At': new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('❌ HTML template generation error:', error);
    
    return NextResponse.json({
      error: 'HTML template generation failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  // Return test HTML with default data
  return POST(new NextRequest('http://localhost/api/test-html-template', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  }));
}
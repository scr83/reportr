import { NextRequest, NextResponse } from 'next/server';
import { ReactPDFGenerator } from '@/lib/pdf/react-pdf-generator';
import { ReportData } from '@/lib/pdf/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reportType = searchParams.get('type') || 'executive';
  const requestId = crypto.randomUUID();
  
  console.log('========== TEST PDF GENERATION START ==========');
  console.log(`[${requestId}] Test PDF generation started with React-PDF`);
  console.log(`[${requestId}] Report type: ${reportType}`);
  
  try {
    // Comprehensive sample data for testing all features
    const testReportData: ReportData = {
      reportType: reportType as 'executive' | 'standard' | 'custom',
      clientName: 'Acme Digital Solutions',
      clientDomain: 'acmedigitalsolutions.com',
      
      reportPeriod: {
        startDate: '2024-01-01',
        endDate: '2024-01-31',
      },
      
      branding: {
        companyName: 'Digital Frog Agency',
        website: 'https://digitalfrog.cl',
        logo: undefined, // Test without logo first
        primaryColor: '#8B5CF6', // Purple brand color
        email: 'hello@digitalfrog.agency',
        phone: '+1 (555) 123-4567',
        whiteLabelEnabled: true,
        supportEmail: 'support@digitalfrog.cl'
      },

      // GSC Data - ALWAYS REQUIRED (4 metrics + tables)
      gscMetrics: {
        clicks: 12543,
        impressions: 89342,
        ctr: 0.1404, // 14.04%
        position: 8.7,
        
        // ADD MISSING GSC TABLE DATA - This was the source of the blank pages!
        topKeywords: [
          {
            query: 'digital marketing services',
            clicks: 2847,
            impressions: 18934,
            ctr: 0.1504,
            position: 4.2
          },
          {
            query: 'seo consulting company',
            clicks: 1923,
            impressions: 15672,
            ctr: 0.1227,
            position: 6.8
          },
          {
            query: 'content marketing strategy',
            clicks: 1456,
            impressions: 12984,
            ctr: 0.1121,
            position: 7.3
          },
          {
            query: 'local seo services',
            clicks: 1234,
            impressions: 11567,
            ctr: 0.1067,
            position: 8.1
          },
          {
            query: 'ppc management agency',
            clicks: 987,
            impressions: 9876,
            ctr: 0.0999,
            position: 9.2
          },
          {
            query: 'social media marketing',
            clicks: 876,
            impressions: 8934,
            ctr: 0.0980,
            position: 10.1
          },
          {
            query: 'web design services',
            clicks: 743,
            impressions: 7823,
            ctr: 0.0950,
            position: 11.3
          },
          {
            query: 'digital advertising agency',
            clicks: 654,
            impressions: 6745,
            ctr: 0.0970,
            position: 12.1
          }
        ],
        
        topPages: [
          {
            page: '/services/digital-marketing',
            clicks: 3452,
            impressions: 23456,
            ctr: 0.1472,
            position: 5.1
          },
          {
            page: '/services/seo-consulting',
            clicks: 2834,
            impressions: 19876,
            ctr: 0.1426,
            position: 5.8
          },
          {
            page: '/blog/content-marketing-guide',
            clicks: 2156,
            impressions: 16789,
            ctr: 0.1284,
            position: 6.4
          },
          {
            page: '/services/local-seo',
            clicks: 1876,
            impressions: 14567,
            ctr: 0.1288,
            position: 7.2
          },
          {
            page: '/case-studies/ecommerce-success',
            clicks: 1543,
            impressions: 12345,
            ctr: 0.1250,
            position: 8.0
          },
          {
            page: '/about-us',
            clicks: 1234,
            impressions: 10987,
            ctr: 0.1124,
            position: 8.9
          }
        ],
        
        topCountries: [
          {
            country: 'United States',
            clicks: 8934,
            impressions: 56789,
            ctr: 0.1574
          },
          {
            country: 'Canada',
            clicks: 1456,
            impressions: 10234,
            ctr: 0.1423
          },
          {
            country: 'United Kingdom',
            clicks: 987,
            impressions: 7456,
            ctr: 0.1324
          },
          {
            country: 'Australia',
            clicks: 654,
            impressions: 5234,
            ctr: 0.1249
          },
          {
            country: 'Germany',
            clicks: 432,
            impressions: 3567,
            ctr: 0.1211
          }
        ],
        
        deviceBreakdown: [
          {
            device: 'desktop',
            clicks: 7234,
            impressions: 48567,
            ctr: 0.1489
          },
          {
            device: 'mobile',
            clicks: 4567,
            impressions: 34789,
            ctr: 0.1313
          },
          {
            device: 'tablet',
            clicks: 742,
            impressions: 5986,
            ctr: 0.1239
          }
        ]
      },
      
      // GA4 Metrics - Structure varies by report type
      ga4Metrics: {
        // Required core metrics for all report types
        users: 45678,
        sessions: 67834,
        bounceRate: 32.4,
        conversions: 1247,
        
        // Optional metrics for Standard/Custom reports
        avgSessionDuration: 145.6, // seconds
        pagesPerSession: 3.42,
        newUsers: 28934,
        organicTraffic: 38456,
        
        // Standard report specific data
        topLandingPages: [
          {
            page: '/services/digital-marketing',
            sessions: 8934,
            users: 7823,
            bounceRate: 28.5
          },
          {
            page: '/services/seo-consulting',
            sessions: 6745,
            users: 5892,
            bounceRate: 31.2
          },
          {
            page: '/blog/content-marketing-guide',
            sessions: 5432,
            users: 4987,
            bounceRate: 25.8
          }
        ],
        
        deviceBreakdown: {
          desktop: 58.3,
          mobile: 37.2,
          tablet: 4.5
        }
      },
      
      // Custom report selected metrics (for custom report type)
      selectedMetrics: reportType === 'custom' ? [
        'users', 'sessions', 'bounceRate', 'conversions', 
        'avgSessionDuration', 'pagesPerSession', 'newUsers', 'organicTraffic'
      ] : undefined,
      
      // Optional insights for recommendations page
      insights: {
        traffic: 'Your organic traffic increased by 23% this month, driven primarily by improved rankings for key service pages.',
        engagement: 'Session duration and pages per session both improved, indicating better content engagement and user experience.',
        search: 'Your average search position improved from 9.2 to 8.7, with several high-value keywords moving into the top 5 positions.'
      },
      
      // Optional recommendations
      recommendations: [
        {
          title: 'Optimize Mobile Experience',
          description: 'With 37% of traffic coming from mobile devices, focus on improving mobile page speed and user experience.',
          priority: 'high' as const
        },
        {
          title: 'Content Strategy Enhancement',
          description: 'Your blog content is performing well. Consider expanding content around high-performing topics.',
          priority: 'medium' as const
        }
      ]
    };
    
    console.log(`[${requestId}] Test data prepared:`, {
      clientName: testReportData.clientName,
      reportType: testReportData.reportType,
      hasGSCMetrics: !!testReportData.gscMetrics,
      hasGA4Metrics: !!testReportData.ga4Metrics,
      hasInsights: !!testReportData.insights,
      hasRecommendations: !!testReportData.recommendations
    });
    
    // Generate PDF using React-PDF
    console.log(`[${requestId}] Generating PDF with React-PDF...`);
    const pdfGenerator = new ReactPDFGenerator();
    const result = await pdfGenerator.generateReport(testReportData);
    
    if (!result.success) {
      throw new Error(`React-PDF generation failed: ${result.error}`);
    }
    
    const pdfBuffer = result.pdfBuffer!;
    
    console.log(`[${requestId}] PDF generated successfully:`, {
      bufferSize: pdfBuffer.length,
      sizeMB: (pdfBuffer.length / 1024 / 1024).toFixed(2),
      reportType: testReportData.reportType
    });
    
    console.log('========== TEST PDF GENERATION SUCCESS ==========');
    
    // Return PDF as response
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="test-${reportType}-report-${requestId}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'no-cache'
      }
    });
    
  } catch (error) {
    console.error(`[${requestId}] Test PDF generation failed:`, error);
    console.log('========== TEST PDF GENERATION FAILED ==========');
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      requestId
    }, { status: 500 });
  }
}
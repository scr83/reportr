import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsData, buildMetricsForGA4Request } from '@/lib/integrations/google-analytics';
import { GoogleTokenError } from '@/lib/utils/refresh-google-token';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth-helpers';
import { CustomMetric } from '@/types/custom-metrics';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // ============================================================================
    // TEMPORARY AUTH: Using client existence check until NextAuth is configured
    // TODO: Replace with proper session-based auth before production launch
    // This allows development to continue while auth is implemented in Phase 6
    // See: documentation/PHASE_5C_DATA_FETCHING_FIX.md for full context
    // Security: Google OAuth tokens provide primary API security layer
    // Risk: No user isolation - acceptable for single-user development only
    // Required Before Production: Implement full NextAuth session validation
    // ============================================================================

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const propertyId = searchParams.get('propertyId');
    const metricsParam = searchParams.get('metrics'); // NEW: Support for dynamic metrics
    const clientId = params.id;
    
    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'startDate and endDate are required' },
        { status: 400 }
      );
    }

    const user = await requireUser();
    
    const client = await prisma.client.findFirst({
      where: { 
        id: clientId,
        userId: user.id
      },
      select: {
        id: true,
        googleRefreshToken: true,
        ga4PropertyId: true,
        ga4PropertyName: true,
        customMetrics: true
      }
    });

    if (!client) {
      console.error(`Client not found: ${clientId}`);
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    if (!client.googleRefreshToken) {
      console.error(`Google account not connected for client: ${clientId}`);
      return NextResponse.json(
        { error: 'Google account not connected for this client. Please connect in client settings.' },
        { status: 403 }
      );
    }

    if (!client.ga4PropertyId) {
      console.error(`GA4 property not configured for client: ${clientId}`);
      return NextResponse.json(
        { error: 'Google Analytics property not configured. Please configure in client settings.' },
        { status: 403 }
      );
    }

    // Get custom metrics configuration from client
    const customMetrics = (client.customMetrics as unknown as CustomMetric[]) || [];

    console.log(`📊 Generating report with ${customMetrics.length} custom metrics`);

    // Parse metrics if provided
    const requestedMetrics = metricsParam 
      ? metricsParam.split(',').map(m => m.trim()).filter(Boolean)
      : undefined;

    // Use helper function to build GA4 metrics array (supports both predefined and custom)
    const actualMetricsToFetch = requestedMetrics 
      ? buildMetricsForGA4Request(requestedMetrics, customMetrics)
      : undefined;

    console.log('🔍 GA4 API metrics:', actualMetricsToFetch);

    console.log(`Fetching GA4 data for client ${clientId}`, {
      property: client.ga4PropertyId,
      dateRange: `${startDate} to ${endDate}`,
      frontendMetrics: requestedMetrics || 'default (4 metrics)',
      ga4ApiMetrics: actualMetricsToFetch || 'default',
      customMetricsCount: customMetrics.length
    });
    
    try {
      const data = await getAnalyticsData(
        client.id,
        startDate,
        endDate,
        propertyId || undefined,
        requestedMetrics,
        customMetrics
      );
      
      return NextResponse.json({
        success: true,
        data,
        customMetrics // Pass custom metrics config to frontend for PDF generation
      });
    } catch (ga4Error: any) {
      console.error('GA4 API error (may include custom metrics):', ga4Error);
      
      // If GA4 fails, provide helpful error message
      if (ga4Error.message?.includes('not a valid metric')) {
        return NextResponse.json({
          error: 'Some metrics are invalid. This may be caused by custom metrics that don\'t exist in your GA4 property.',
          details: ga4Error.message,
          customMetricsCount: customMetrics.length
        }, { status: 400 });
      }
      
      // Re-throw for general error handling
      throw ga4Error;
    }
  } catch (error: any) {
    console.error('Google Analytics API error:', error);
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    if (error instanceof GoogleTokenError) {
      return NextResponse.json(
        { 
          error: error.message,
          code: error.code
        },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to fetch Google Analytics data',
        code: 'FETCH_ERROR'
      },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsData } from '@/lib/integrations/google-analytics';
import { GoogleTokenError } from '@/lib/utils/refresh-google-token';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth-helpers';

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
        ga4PropertyName: true
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

    // Parse metrics if provided
    const requestedMetrics = metricsParam 
      ? metricsParam.split(',').map(m => m.trim()).filter(Boolean)
      : undefined;

    console.log(`Fetching GA4 data for client ${clientId}`, {
      property: client.ga4PropertyId,
      dateRange: `${startDate} to ${endDate}`,
      metrics: requestedMetrics || 'default (4 metrics)'
    });
    
    const data = await getAnalyticsData(
      client.id,
      startDate,
      endDate,
      propertyId || undefined,
      requestedMetrics
    );
    
    return NextResponse.json({
      success: true,
      data
    });
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
import { NextRequest, NextResponse } from 'next/server';
import { getSearchConsoleData } from '@/lib/integrations/google-search-console';
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
    const siteUrl = searchParams.get('siteUrl');
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
        gscSiteUrl: true,
        gscSiteName: true
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

    if (!client.gscSiteUrl) {
      console.error(`GSC site not configured for client: ${clientId}`);
      return NextResponse.json(
        { error: 'Google Search Console site not configured. Please configure in client settings.' },
        { status: 403 }
      );
    }

    console.log(`Fetching GSC data for client ${clientId}, site: ${client.gscSiteUrl}`);
    
    const data = await getSearchConsoleData(
      client.id,
      startDate,
      endDate,
      siteUrl || undefined
    );
    
    console.log('🔍 [GSC-API-ROUTE] Data received from integration:', {
      hasData: !!data,
      dataKeys: Object.keys(data || {}),
      hasDailyData: !!data?.dailyData,
      dailyDataLength: data?.dailyData?.length || 0,
      sampleDailyEntry: data?.dailyData?.[0]
    });
    
    const response = {
      success: true,
      data
    };
    
    console.log('🔍 [GSC-API-ROUTE] Returning response:', {
      success: response.success,
      responseDataKeys: Object.keys(response.data || {}),
      includesDailyData: !!response.data?.dailyData,
      dailyDataLength: response.data?.dailyData?.length || 0
    });
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Search Console API error:', error);
    
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
        error: error.message || 'Failed to fetch Search Console data',
        code: 'FETCH_ERROR'
      },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsProperties } from '@/lib/integrations/google-analytics';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const clientId = searchParams.get('clientId');

    if (!clientId) {
      return NextResponse.json(
        { error: 'Client ID is required' },
        { status: 400 }
      );
    }

    console.log(`Fetching GA4 properties for client: ${clientId}`);
    
    const properties = await getAnalyticsProperties(clientId);
    
    return NextResponse.json({ properties });
    
  } catch (error: any) {
    console.error('Error in GA4 properties endpoint:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch Analytics properties' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { searchConsoleAPI } from '@/lib/integrations/search-console';

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

    console.log(`Fetching GSC sites for client: ${clientId}`);
    
    const sites = await searchConsoleAPI.listSites(clientId);
    
    return NextResponse.json({ sites });
    
  } catch (error: any) {
    console.error('Error in GSC sites endpoint:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch Search Console sites' },
      { status: 500 }
    );
  }
}
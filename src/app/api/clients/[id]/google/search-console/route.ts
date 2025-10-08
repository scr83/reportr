import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getSearchConsoleData } from '@/lib/integrations/google-search-console';
import { GoogleTokenError } from '@/lib/utils/refresh-google-token';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const siteUrl = searchParams.get('siteUrl');
    
    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'startDate and endDate are required' },
        { status: 400 }
      );
    }

    // Verify client belongs to user
    const client = await prisma.client.findFirst({
      where: { 
        id: params.id,
        userId: session.user.id 
      }
    });
    
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }
    
    if (!client.googleAccessToken) {
      return NextResponse.json(
        { 
          error: 'Google account not connected',
          code: 'NOT_CONNECTED'
        },
        { status: 400 }
      );
    }
    
    const data = await getSearchConsoleData(
      client.id,
      startDate,
      endDate,
      siteUrl || undefined
    );
    
    return NextResponse.json({
      success: true,
      data
    });
  } catch (error: any) {
    console.error('Search Console API error:', error);
    
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
import { NextRequest, NextResponse } from 'next/server';
import { fetchPageSpeedData } from '@/lib/integrations/pagespeed';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth-helpers';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const clientId = params.id;
    
    console.log(`[PageSpeed API] Starting PageSpeed fetch for client: ${clientId}`);

    // Authenticate user
    const user = await requireUser();
    
    // Verify client ownership and get domain
    const client = await prisma.client.findFirst({
      where: { 
        id: clientId,
        userId: user.id
      },
      select: {
        id: true,
        name: true,
        domain: true
      }
    });

    if (!client) {
      console.warn(`[PageSpeed API] Client not found or access denied: ${clientId}`);
      return NextResponse.json(
        { error: 'Client not found or access denied' },
        { status: 404 }
      );
    }

    if (!client.domain) {
      console.warn(`[PageSpeed API] Client has no domain configured: ${clientId}`);
      return NextResponse.json(
        { error: 'Client domain not configured' },
        { status: 400 }
      );
    }

    console.log(`[PageSpeed API] Fetching PageSpeed data for domain: ${client.domain}`);

    // Fetch PageSpeed data using our integration
    const pageSpeedData = await fetchPageSpeedData(client.domain);

    if (!pageSpeedData) {
      console.warn(`[PageSpeed API] PageSpeed fetch returned null for domain: ${client.domain}`);
      return NextResponse.json(
        { 
          error: 'PageSpeed data temporarily unavailable',
          message: 'The PageSpeed Insights API is temporarily unavailable. This may be due to rate limiting, connectivity issues, or the website being unavailable for testing.',
          clientDomain: client.domain
        },
        { status: 503 }
      );
    }

    console.log(`[PageSpeed API] Successfully fetched PageSpeed data for ${client.domain}:`, {
      mobileScore: pageSpeedData.mobile.score,
      desktopScore: pageSpeedData.desktop.score,
      opportunitiesCount: pageSpeedData.opportunities?.length || 0
    });

    return NextResponse.json({
      success: true,
      data: pageSpeedData,
      clientInfo: {
        id: client.id,
        name: client.name,
        domain: client.domain
      }
    });

  } catch (error: any) {
    console.error('[PageSpeed API] Error fetching PageSpeed data:', error);
    
    return NextResponse.json(
      {
        error: 'PageSpeed fetch failed',
        message: 'An unexpected error occurred while fetching PageSpeed Insights data',
        details: error.message
      },
      { status: 500 }
    );
  }
}
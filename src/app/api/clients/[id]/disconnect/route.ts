import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireUser();
    const clientId = params.id;

    console.log(`Disconnecting Google account for client: ${clientId}`);

    // Validate client exists AND belongs to user
    const client = await prisma.client.findFirst({
      where: { 
        id: clientId,
        userId: user.id
      }
    });

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found or unauthorized' },
        { status: 404 }
      );
    }

    // Clear all Google-related data
    const updatedClient = await prisma.client.update({
      where: { id: clientId },
      data: {
        // OAuth tokens
        googleAccessToken: null,
        googleRefreshToken: null,
        googleTokenExpiry: null,
        googleConnectedAt: null,
        
        // Property selections
        gscSiteUrl: null,
        gscSiteName: null,
        ga4PropertyId: null,
        ga4PropertyName: null,
        
        // Legacy fields (if they exist)
        googleSearchConsoleConnected: false,
        googleAnalyticsConnected: false,
        
        // Update timestamp
        updatedAt: new Date()
      }
    });

    console.log(`Successfully disconnected Google account for client: ${clientId}`);

    return NextResponse.json({
      success: true,
      message: 'Google account disconnected successfully',
      client: {
        id: updatedClient.id,
        name: updatedClient.name,
        googleConnectedAt: null,
        gscSiteUrl: null,
        gscSiteName: null,
        ga4PropertyId: null,
        ga4PropertyName: null
      }
    });
    
  } catch (error: any) {
    console.error('Error disconnecting Google account:', error);
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Handle specific database errors
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to disconnect Google account' },
      { status: 500 }
    );
  }
}
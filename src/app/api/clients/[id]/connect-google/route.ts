import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { searchConsoleClient } from '@/lib/google/search-console';
import { analyticsClient } from '@/lib/google/analytics';
import { z } from 'zod';

const connectGoogleSchema = z.object({
  service: z.enum(['gsc', 'ga4', 'both']),
  searchConsolePropertyUrl: z.string().url().optional(),
  analyticsPropertyId: z.string().optional(),
});

// POST /api/clients/[id]/connect-google - Connect Google services to client
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || !session.accessToken) {
      return NextResponse.json({ error: 'Unauthorized or missing Google access token' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();

    // Validate request body
    const validationResult = connectGoogleSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { service, searchConsolePropertyUrl, analyticsPropertyId } = validationResult.data;

    // Check if client exists and belongs to user
    const client = await prisma.client.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    const updateData: any = {};
    const connectionResults: any = {};

    try {
      // Handle Search Console connection
      if (service === 'gsc' || service === 'both') {
        if (!searchConsolePropertyUrl) {
          return NextResponse.json(
            { error: 'Search Console property URL is required' },
            { status: 400 }
          );
        }

        // Validate Search Console access
        const hasGSCAccess = await searchConsoleClient.validateSiteAccess(
          searchConsolePropertyUrl,
          session.accessToken
        );

        if (!hasGSCAccess) {
          return NextResponse.json(
            { error: 'Cannot access Search Console property. Please ensure the site is verified and you have permission.' },
            { status: 403 }
          );
        }

        updateData.googleSearchConsoleConnected = true;
        updateData.searchConsolePropertyUrl = searchConsolePropertyUrl;
        
        // Store refresh token if available
        if (session.refreshToken) {
          updateData.searchConsoleRefreshToken = session.refreshToken;
        }

        connectionResults.searchConsole = {
          connected: true,
          propertyUrl: searchConsolePropertyUrl,
        };
      }

      // Handle Analytics connection
      if (service === 'ga4' || service === 'both') {
        if (!analyticsPropertyId) {
          return NextResponse.json(
            { error: 'Analytics property ID is required' },
            { status: 400 }
          );
        }

        // Validate Analytics access
        const hasGA4Access = await analyticsClient.validatePropertyAccess(
          analyticsPropertyId,
          session.accessToken
        );

        if (!hasGA4Access) {
          return NextResponse.json(
            { error: 'Cannot access Analytics property. Please ensure you have permission to view this property.' },
            { status: 403 }
          );
        }

        updateData.googleAnalyticsConnected = true;
        updateData.googleAnalyticsPropertyId = analyticsPropertyId;
        
        // Store refresh token if available
        if (session.refreshToken) {
          updateData.analyticsRefreshToken = session.refreshToken;
        }

        connectionResults.analytics = {
          connected: true,
          propertyId: analyticsPropertyId,
        };
      }

      // Update client with connection information
      const updatedClient = await prisma.client.update({
        where: { id },
        data: {
          ...updateData,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({
        message: 'Google services connected successfully',
        data: updatedClient,
        connections: connectionResults,
      });

    } catch (error: any) {
      console.error('Google API connection error:', error);
      
      // Handle specific Google API errors
      if (error.retryable === false && error.needsReauth) {
        return NextResponse.json(
          { 
            error: 'Google authentication expired',
            message: 'Please reconnect your Google account and try again.',
            needsReauth: true,
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { 
          error: 'Failed to connect Google services',
          message: error.message || 'Unknown error occurred',
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Failed to connect Google services:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/clients/[id]/connect-google - Get available Google properties for connection
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || !session.accessToken) {
      return NextResponse.json({ error: 'Unauthorized or missing Google access token' }, { status: 401 });
    }

    const { id } = params;

    // Check if client exists and belongs to user
    const client = await prisma.client.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    try {
      // Get available properties in parallel
      const [searchConsoleSites, analyticsProperties] = await Promise.all([
        searchConsoleClient.getVerifiedSites(session.accessToken),
        analyticsClient.getAccessibleProperties(session.accessToken),
      ]);

      return NextResponse.json({
        client: {
          id: client.id,
          name: client.name,
          domain: client.domain,
          currentConnections: {
            searchConsole: client.googleSearchConsoleConnected,
            analytics: client.googleAnalyticsConnected,
            searchConsoleUrl: client.searchConsolePropertyUrl,
            analyticsPropertyId: client.googleAnalyticsPropertyId,
          },
        },
        availableProperties: {
          searchConsole: searchConsoleSites,
          analytics: analyticsProperties,
        },
      });

    } catch (error: any) {
      console.error('Failed to fetch Google properties:', error);
      
      if (error.retryable === false && error.needsReauth) {
        return NextResponse.json(
          { 
            error: 'Google authentication expired',
            message: 'Please reconnect your Google account and try again.',
            needsReauth: true,
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { 
          error: 'Failed to fetch Google properties',
          message: error.message || 'Unknown error occurred',
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Failed to get Google connection info:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/clients/[id]/connect-google - Disconnect Google services
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const { searchParams } = new URL(request.url);
    const service = searchParams.get('service'); // 'gsc', 'ga4', or 'both'

    // Check if client exists and belongs to user
    const client = await prisma.client.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    const updateData: any = {};

    // Disconnect based on service parameter
    if (service === 'gsc' || service === 'both' || !service) {
      updateData.googleSearchConsoleConnected = false;
      updateData.searchConsolePropertyUrl = null;
      updateData.searchConsoleRefreshToken = null;
    }

    if (service === 'ga4' || service === 'both' || !service) {
      updateData.googleAnalyticsConnected = false;
      updateData.googleAnalyticsPropertyId = null;
      updateData.analyticsRefreshToken = null;
    }

    // Update client
    const updatedClient = await prisma.client.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: 'Google services disconnected successfully',
      data: updatedClient,
    });

  } catch (error) {
    console.error('Failed to disconnect Google services:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
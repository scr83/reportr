import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth-helpers';
import { CustomMetric } from '@/types/custom-metrics';

/**
 * GET /api/clients/[id]/custom-metrics
 * 
 * Fetches custom metrics for a specific client.
 * Returns empty array initially since no custom metrics exist yet.
 * 
 * Security:
 * - Requires authentication
 * - Verifies user owns the client
 * 
 * @returns {success: boolean, metrics: CustomMetric[]}
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication and get user
    const user = await requireUser();
    
    // Fetch client and verify ownership
    const client = await prisma.client.findFirst({
      where: { 
        id: params.id,
        userId: user.id  // Ensures user owns this client
      },
      select: {
        id: true,
        name: true,
        customMetrics: true
      }
    });
    
    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' }, 
        { status: 404 }
      );
    }
    
    // Get custom metrics from client
    // Will be empty array initially since customMetrics is null
    const customMetrics = client.customMetrics || [];
    
    return NextResponse.json({
      success: true,
      metrics: customMetrics
    });
    
  } catch (error: any) {
    console.error('Error fetching custom metrics:', error);
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/clients/[id]/custom-metrics
 * 
 * Saves custom metrics for a specific client.
 * Replaces entire customMetrics array (not appending).
 * 
 * Security:
 * - Requires authentication
 * - Verifies user owns the client
 * - Limits to 10 custom metrics per client
 * 
 * @body {customMetrics: CustomMetric[]}
 * @returns {success: boolean, customMetrics: CustomMetric[]}
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication and get user
    const user = await requireUser();
    
    // Parse request body
    const body = await req.json();
    const { customMetrics } = body;
    
    // Validate input - must be array
    if (!Array.isArray(customMetrics)) {
      return NextResponse.json(
        { error: 'customMetrics must be an array' },
        { status: 400 }
      );
    }
    
    // Limit to 10 custom metrics per client
    if (customMetrics.length > 10) {
      return NextResponse.json(
        { error: 'Maximum 10 custom metrics allowed per client' },
        { status: 400 }
      );
    }
    
    // Validate each metric has required fields
    for (const metric of customMetrics) {
      if (!metric.id || !metric.apiName || !metric.displayName) {
        return NextResponse.json(
          { error: 'Each metric must have id, apiName, and displayName' },
          { status: 400 }
        );
      }
    }
    
    // Update client with custom metrics
    const client = await prisma.client.update({
      where: {
        id: params.id,
        userId: user.id  // Ensures user owns this client
      },
      data: {
        customMetrics: customMetrics
      }
    });
    
    return NextResponse.json({
      success: true,
      customMetrics: client.customMetrics
    });
    
  } catch (error: any) {
    console.error('Error saving custom metrics:', error);
    
    // Check if it's a Prisma "not found" error
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Client not found or access denied' },
        { status: 404 }
      );
    }
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
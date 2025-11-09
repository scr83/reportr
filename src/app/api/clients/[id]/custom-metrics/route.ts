import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth-helpers';

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
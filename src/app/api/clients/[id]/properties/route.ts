import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';

interface PropertyUpdateBody {
  gscSiteUrl?: string;
  gscSiteName?: string;
  ga4PropertyId?: string;
  ga4PropertyName?: string;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireUser();
    const clientId = params.id;
    const body: PropertyUpdateBody = await request.json();

    console.log(`Updating properties for client: ${clientId}`, body);

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

    // Update client with property selections
    const updatedClient = await prisma.client.update({
      where: { id: clientId },
      data: {
        gscSiteUrl: body.gscSiteUrl,
        gscSiteName: body.gscSiteName,
        ga4PropertyId: body.ga4PropertyId,
        ga4PropertyName: body.ga4PropertyName,
        updatedAt: new Date()
      }
    });

    console.log('Properties updated successfully');

    return NextResponse.json({
      success: true,
      client: updatedClient
    });
    
  } catch (error: any) {
    console.error('Error updating properties:', error);
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to update properties' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { updateClientSchema } from '@/lib/validations';

// GET /api/clients/[id] - Get a specific client
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const client = await prisma.client.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        reports: {
          orderBy: { createdAt: 'desc' },
          take: 5, // Latest 5 reports
          select: {
            id: true,
            title: true,
            status: true,
            createdAt: true,
            processingCompletedAt: true,
            generationTimeMs: true,
          },
        },
        _count: {
          select: {
            reports: true,
          },
        },
      },
    });

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    return NextResponse.json({ data: client });
  } catch (error) {
    console.error('Failed to fetch client:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/clients/[id] - Update a client
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();

    // Validate request body
    const validationResult = updateClientSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    // Check if client exists and belongs to user
    const existingClient = await prisma.client.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingClient) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    const updateData = validationResult.data;

    // If domain is being updated, normalize it and check for conflicts
    if (updateData.domain) {
      const normalizedDomain = updateData.domain.startsWith('http') 
        ? updateData.domain 
        : `https://${updateData.domain}`;

      // Check if domain conflicts with another client
      const conflictingClient = await prisma.client.findFirst({
        where: {
          userId: session.user.id,
          domain: normalizedDomain,
          id: { not: id }, // Exclude current client
        },
      });

      if (conflictingClient) {
        return NextResponse.json(
          { error: 'A client with this domain already exists' },
          { status: 409 }
        );
      }

      updateData.domain = normalizedDomain;
    }

    // Update client
    const updatedClient = await prisma.client.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
      include: {
        _count: {
          select: {
            reports: true,
          },
        },
      },
    });

    return NextResponse.json({ data: updatedClient });
  } catch (error) {
    console.error('Failed to update client:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/clients/[id] - Delete a client
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

    // Check if client exists and belongs to user
    const client = await prisma.client.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        _count: {
          select: {
            reports: true,
          },
        },
      },
    });

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    // Check if client has reports - you might want to prevent deletion if reports exist
    if (client._count.reports > 0) {
      const { searchParams } = new URL(request.url);
      const force = searchParams.get('force') === 'true';
      
      if (!force) {
        return NextResponse.json(
          { 
            error: 'Client has existing reports',
            message: 'Cannot delete client with existing reports. Use force=true to delete anyway.',
            reportCount: client._count.reports,
          },
          { status: 409 }
        );
      }
    }

    // Delete client (reports will be deleted automatically due to CASCADE)
    await prisma.client.delete({
      where: { id },
    });

    return NextResponse.json({ 
      message: 'Client deleted successfully',
      deletedId: id,
    });
  } catch (error) {
    console.error('Failed to delete client:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
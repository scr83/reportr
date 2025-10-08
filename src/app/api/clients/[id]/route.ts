import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateClientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  domain: z.string().url('Must be a valid URL').optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().email('Must be a valid email').optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await prisma.client.findUnique({
      where: { 
        id: params.id,
        userId: 'test-user-id' // Ensure user owns this client
      },
      include: {
        reports: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    return NextResponse.json(client);
  } catch (error: any) {
    console.error('Failed to fetch client:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch client' 
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validated = updateClientSchema.parse(body);
    
    // Check if client exists and belongs to user
    const existingClient = await prisma.client.findUnique({
      where: { 
        id: params.id,
        userId: 'test-user-id'
      }
    });

    if (!existingClient) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    const updatedClient = await prisma.client.update({
      where: { id: params.id },
      data: validated,
      include: {
        reports: {
          take: 1,
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    
    return NextResponse.json(updatedClient);
  } catch (error: any) {
    console.error('Failed to update client:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation error', 
        details: error.errors 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: error.message || 'Failed to update client' 
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if client exists and belongs to user
    const existingClient = await prisma.client.findUnique({
      where: { 
        id: params.id,
        userId: 'test-user-id'
      }
    });

    if (!existingClient) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    // Delete client (reports will be cascade deleted)
    await prisma.client.delete({
      where: { id: params.id }
    });
    
    return NextResponse.json({ message: 'Client deleted successfully' });
  } catch (error: any) {
    console.error('Failed to delete client:', error);
    return NextResponse.json({ 
      error: 'Failed to delete client' 
    }, { status: 500 });
  }
}
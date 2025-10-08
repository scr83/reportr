import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const clientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  domain: z.string().url('Must be a valid URL'),
  contactName: z.string().optional(),
  contactEmail: z.string().email('Must be a valid email').optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = clientSchema.parse(body);
    
    // For now, use hardcoded test user ID
    // Later this will come from auth session
    const testUserId = 'test-user-id';
    
    const client = await prisma.client.create({
      data: {
        name: validated.name,
        domain: validated.domain,
        contactName: validated.contactName,
        contactEmail: validated.contactEmail,
        userId: testUserId
      }
    });
    
    return NextResponse.json(client, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create client:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation error', 
        details: error.errors 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: error.message || 'Failed to create client' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Get all clients for test user
    const clients = await prisma.client.findMany({
      where: { userId: 'test-user-id' },
      include: {
        reports: {
          take: 1,
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(clients);
  } catch (error: any) {
    console.error('Failed to fetch clients:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch clients' 
    }, { status: 500 });
  }
}
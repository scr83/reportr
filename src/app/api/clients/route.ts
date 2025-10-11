import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { requireUser } from '@/lib/auth-helpers';

// Force dynamic rendering for client API
export const dynamic = 'force-dynamic';

const clientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  domain: z.string().url('Must be a valid URL'),
  contactName: z.string().optional(),
  contactEmail: z.string().email('Must be a valid email').optional(),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser();
    
    const body = await request.json();
    const validated = clientSchema.parse(body);
    
    const client = await prisma.client.create({
      data: {
        name: validated.name,
        domain: validated.domain,
        contactName: validated.contactName,
        contactEmail: validated.contactEmail,
        userId: user.id
      }
    });
    
    return NextResponse.json(client, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create client:', error);
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
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
    const user = await requireUser();
    
    const clients = await prisma.client.findMany({
      where: { userId: user.id },
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
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to fetch clients' 
    }, { status: 500 });
  }
}
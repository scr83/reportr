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
    
    // Check tier limits
    const clientCount = await prisma.client.count({
      where: { userId: user.id }
    });

    // FREE tier: 1 client max
    if (user.plan === 'FREE' && clientCount >= 1) {
      return NextResponse.json({ 
        error: 'Client limit reached',
        message: 'FREE plan allows 1 client. Upgrade to add more clients.',
        upgrade: true
      }, { status: 403 });
    }

    // STARTER tier: 5 clients max
    if (user.plan === 'STARTER' && clientCount >= 5) {
      return NextResponse.json({ 
        error: 'Client limit reached',
        message: 'STARTER plan allows 5 clients. Upgrade to PROFESSIONAL for 15 clients.',
        upgrade: true
      }, { status: 403 });
    }

    // PROFESSIONAL tier: 15 clients max  
    if (user.plan === 'PROFESSIONAL' && clientCount >= 15) {
      return NextResponse.json({ 
        error: 'Client limit reached',
        message: 'PROFESSIONAL plan allows 15 clients. Upgrade to ENTERPRISE for 50 clients.',
        upgrade: true
      }, { status: 403 });
    }

    // ENTERPRISE tier: 50 clients max
    if (user.plan === 'ENTERPRISE' && clientCount >= 50) {
      return NextResponse.json({ 
        error: 'Client limit reached',
        message: 'ENTERPRISE plan allows 50 clients. Contact us for custom pricing.',
        upgrade: true
      }, { status: 403 });
    }
    
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
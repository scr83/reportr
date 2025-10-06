import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createClientSchema, paginationSchema, searchSchema, sortSchema } from '@/lib/validations';
import { z } from 'zod';

// GET /api/clients - Get all clients for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    
    // Validate query parameters
    const paginationResult = paginationSchema.safeParse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
    });
    
    const searchResult = searchSchema.safeParse({
      query: searchParams.get('query'),
    });
    
    const sortResult = sortSchema.safeParse({
      sortBy: searchParams.get('sortBy'),
      sortOrder: searchParams.get('sortOrder'),
    });

    if (!paginationResult.success || !searchResult.success || !sortResult.success) {
      return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 });
    }

    const { page, limit } = paginationResult.data;
    const { query } = searchResult.data;
    const { sortBy, sortOrder } = sortResult.data;

    // Build where clause
    const where: any = { userId: session.user.id };
    
    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { domain: { contains: query, mode: 'insensitive' } },
        { contactEmail: { contains: query, mode: 'insensitive' } },
        { contactName: { contains: query, mode: 'insensitive' } },
      ];
    }

    // Get total count for pagination
    const total = await prisma.client.count({ where });

    // Get clients with pagination and sorting
    const clients = await prisma.client.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        _count: {
          select: {
            reports: true,
          },
        },
      },
    });

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      data: clients,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    });
  } catch (error) {
    console.error('Failed to fetch clients:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/clients - Create a new client
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate request body
    const validationResult = createClientSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { name, domain, contactEmail, contactName } = validationResult.data;

    // Check if domain already exists for this user
    const existingClient = await prisma.client.findFirst({
      where: {
        userId: session.user.id,
        domain: domain,
      },
    });

    if (existingClient) {
      return NextResponse.json(
        { error: 'A client with this domain already exists' },
        { status: 409 }
      );
    }

    // Normalize domain URL
    const normalizedDomain = domain.startsWith('http') 
      ? domain 
      : `https://${domain}`;

    // Create new client
    const client = await prisma.client.create({
      data: {
        name,
        domain: normalizedDomain,
        contactEmail,
        contactName,
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

    return NextResponse.json({ data: client }, { status: 201 });
  } catch (error) {
    console.error('Failed to create client:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
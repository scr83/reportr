import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('🔍 Testing clients table...')
    
    // Test database connection and fetch sample clients
    const clients = await prisma.client.findMany({
      include: {
        user: {
          select: {
            name: true,
            companyName: true
          }
        },
        _count: {
          select: {
            reports: true
          }
        }
      },
      take: 10 // Limit to 10 clients for testing
    })

    console.log(`✅ Successfully fetched ${clients.length} clients from database`)

    return NextResponse.json(clients)
  } catch (error) {
    console.error('❌ Database connection error:', error)
    
    return NextResponse.json(
      { 
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
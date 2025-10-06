import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('🔍 Testing database connection...')
    
    // Test database connection and fetch sample users
    const users = await prisma.user.findMany({
      include: {
        _count: {
          select: {
            clients: true,
            reports: true
          }
        }
      },
      take: 10 // Limit to 10 users for testing
    })

    console.log(`✅ Successfully fetched ${users.length} users from database`)

    return NextResponse.json(users)
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
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'
import { Plan } from '@prisma/client'

const updateSettingsSchema = z.object({
  plan: z.enum(['FREE', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE']).optional(),
  stripeCustomerId: z.string().optional(),
  planExpires: z.string().datetime().optional(),
})

// GET /api/users/settings - Fetch user settings and subscription info
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        plan: true,
        planExpires: true,
        stripeCustomerId: true,
        createdAt: true,
        _count: {
          select: {
            clients: true,
            reports: true,
          }
        }
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Calculate usage statistics
    const lastMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)

    const recentReports = await db.report.count({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: lastMonth,
        },
      },
    })

    // Get API usage for current month
    const currentMonth = new Date()
    currentMonth.setDate(1)
    currentMonth.setHours(0, 0, 0, 0)

    const apiUsage = await db.apiUsage.aggregate({
      where: {
        userId: session.user.id,
        timestamp: {
          gte: currentMonth,
        },
      },
      _sum: {
        cost: true,
      },
      _count: true,
    })

    return NextResponse.json({
      settings: {
        plan: user.plan,
        planExpires: user.planExpires,
        accountAge: Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)),
        hasStripeCustomer: !!user.stripeCustomerId,
      },
      usage: {
        totalClients: user._count.clients,
        totalReports: user._count.reports,
        reportsThisMonth: recentReports,
        apiCallsThisMonth: apiUsage._count || 0,
        costThisMonth: apiUsage._sum.cost || 0,
      },
      limits: getPlanLimits(user.plan),
    })
  } catch (error) {
    console.error('Error fetching user settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/users/settings - Update user subscription settings
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validate request data
    const validationResult = updateSettingsSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid data', 
          details: validationResult.error.errors 
        },
        { status: 400 }
      )
    }

    const updateData: any = {}
    
    if (validationResult.data.plan) {
      updateData.plan = validationResult.data.plan as Plan
    }
    
    if (validationResult.data.stripeCustomerId) {
      updateData.stripeCustomerId = validationResult.data.stripeCustomerId
    }
    
    if (validationResult.data.planExpires) {
      updateData.planExpires = new Date(validationResult.data.planExpires)
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      )
    }

    // Update user settings
    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
      select: {
        plan: true,
        planExpires: true,
        stripeCustomerId: true,
        updatedAt: true,
      }
    })

    return NextResponse.json({
      message: 'Settings updated successfully',
      settings: {
        plan: updatedUser.plan,
        planExpires: updatedUser.planExpires,
        hasStripeCustomer: !!updatedUser.stripeCustomerId,
      }
    })
  } catch (error) {
    console.error('Error updating user settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function getPlanLimits(plan: Plan) {
  const limits = {
    FREE: {
      clients: 3,
      reportsPerMonth: 10,
      apiCallsPerMonth: 1000,
      features: ['Basic reports', 'Google Search Console', 'Email support'],
    },
    STARTER: {
      clients: 10,
      reportsPerMonth: 50,
      apiCallsPerMonth: 5000,
      features: ['All basic features', 'Google Analytics', 'PDF exports', 'Priority support'],
    },
    PROFESSIONAL: {
      clients: 50,
      reportsPerMonth: 200,
      apiCallsPerMonth: 20000,
      features: ['All starter features', 'White-label branding', 'API access', 'Custom reports'],
    },
    ENTERPRISE: {
      clients: -1, // Unlimited
      reportsPerMonth: -1, // Unlimited
      apiCallsPerMonth: -1, // Unlimited
      features: ['All professional features', 'Dedicated support', 'Custom integrations', 'SLA'],
    },
  }

  return limits[plan] || limits.FREE
}
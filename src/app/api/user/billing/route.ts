import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user with billing data
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        plan: true,
        planExpires: true,
        billingCycleStart: true,
        billingCycleEnd: true,
        paypalSubscriptionId: true,
        subscriptionStatus: true,
        paypalCustomerId: true,
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 10, // Last 10 payments
          select: {
            id: true,
            paypalOrderId: true,
            amount: true,
            currency: true,
            status: true,
            plan: true,
            createdAt: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      subscription: {
        plan: user.plan,
        status: user.subscriptionStatus,
        planExpires: user.planExpires,
        billingCycleStart: user.billingCycleStart,
        billingCycleEnd: user.billingCycleEnd,
        paypalSubscriptionId: user.paypalSubscriptionId,
        paypalCustomerId: user.paypalCustomerId
      },
      payments: user.payments
    })
  } catch (error) {
    console.error('Error fetching billing data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  try {
    // Verify this is a cron request (check for cron secret or Vercel cron header)
    const authHeader = req.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    // Allow requests from Vercel cron or with valid secret
    const isVercelCron = req.headers.get('user-agent')?.includes('vercel')
    const isValidSecret = cronSecret && authHeader === `Bearer ${cronSecret}`
    
    if (!isVercelCron && !isValidSecret) {
      console.log('Unauthorized cron request:', {
        authHeader,
        userAgent: req.headers.get('user-agent'),
        hasSecret: !!cronSecret
      })
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Starting cancellation processing cron job...')

    const today = new Date()
    
    // Find users whose cancelled subscription period has ended
    const usersToDowngrade = await prisma.user.findMany({
      where: {
        subscriptionStatus: 'cancelled',
        subscriptionEndDate: {
          lte: today
        },
        plan: {
          not: 'FREE'
        }
      },
      select: {
        id: true,
        email: true,
        plan: true,
        subscriptionEndDate: true,
        paypalSubscriptionId: true
      }
    })

    console.log(`Found ${usersToDowngrade.length} users to downgrade`)

    const results = []

    for (const user of usersToDowngrade) {
      try {
        console.log(`Processing downgrade for user ${user.id} (${user.email}) from ${user.plan} to FREE`)

        // Downgrade to FREE plan and mark as inactive
        await prisma.user.update({
          where: { id: user.id },
          data: {
            plan: 'FREE',
            subscriptionStatus: 'inactive',
            paypalSubscriptionId: null // Clear PayPal subscription ID since it's ended
          }
        })

        console.log(`Successfully downgraded user ${user.id}`)
        
        results.push({ 
          userId: user.id, 
          email: user.email,
          previousPlan: user.plan,
          status: 'downgraded' 
        })

        // TODO: Send email notification here
        // await sendEmail(user.email, 'subscriptionEnded', {
        //   previousPlan: user.plan,
        //   endDate: user.subscriptionEndDate
        // });

      } catch (error: any) {
        console.error(`Failed to downgrade user ${user.id}:`, error)
        results.push({ 
          userId: user.id, 
          email: user.email,
          status: 'failed', 
          error: error.message 
        })
      }
    }

    // Clean up old cancellation records (older than 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    
    try {
      const cleanupResult = await prisma.user.updateMany({
        where: {
          cancelledAt: {
            lt: sixMonthsAgo
          },
          subscriptionStatus: 'inactive',
          plan: 'FREE'
        },
        data: {
          cancelledAt: null,
          subscriptionEndDate: null
        }
      })
      
      console.log(`Cleaned up ${cleanupResult.count} old cancellation records`)
    } catch (cleanupError) {
      console.error('Error cleaning up old records:', cleanupError)
    }

    console.log('Cancellation processing cron job completed')

    return NextResponse.json({
      success: true,
      processed: usersToDowngrade.length,
      results,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Cron job error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
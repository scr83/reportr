import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { requireUser } from '@/lib/auth-helpers'
import { checkTrialExpiry } from '@/lib/check-trial'
import { getBillingCycleInfo, getReportsInCurrentCycle } from '@/lib/billing-cycle'

const createReportSchema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  title: z.string().min(1, 'Title is required'),
  data: z.object({
    clientName: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    agencyName: z.string().optional(),
    agencyLogo: z.string().optional(),
    gscData: z.object({
      clicks: z.number(),
      impressions: z.number(),
      ctr: z.number(),
      position: z.number(),
      topQueries: z.array(z.object({
        query: z.string(),
        clicks: z.number(),
        impressions: z.number(),
        ctr: z.number(),
        position: z.number()
      })).optional()
    }),
    ga4Data: z.object({
      users: z.number(),
      sessions: z.number(),
      bounceRate: z.number(),
      conversions: z.number()
    })
  }),
  pdfBase64: z.string().optional()
})

export async function GET(request: NextRequest) {
  try {
    const user = await requireUser()
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get('clientId')
    
    let whereClause: { userId: string; clientId?: string } = { userId: user.id }
    if (clientId) {
      // Verify the client belongs to the user first
      const client = await prisma.client.findFirst({
        where: { id: clientId, userId: user.id }
      })
      if (!client) {
        return NextResponse.json(
          { error: 'Client not found or unauthorized' },
          { status: 404 }
        )
      }
      whereClause = { ...whereClause, clientId }
    }
    
    const reports = await prisma.report.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            domain: true
          }
        }
      }
    })
    
    return NextResponse.json(reports)
  } catch (error: any) {
    console.error('Failed to fetch reports:', error)
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    let user = await requireUser()
    const body = await request.json()
    const validatedData = createReportSchema.parse(body)
    
    // Check trial expiry and possibly downgrade user
    const trialStatus = await checkTrialExpiry(user.id);
    if (trialStatus.expired) {
      // Refetch user data after potential downgrade
      user = await requireUser();
    }
    
    // Check billing cycle report limits (30-day rolling)
    const billingCycleInfo = await getBillingCycleInfo(user.id)
    const reportCount = await getReportsInCurrentCycle(user.id)

    // Define tier limits
    const limits = {
      FREE: 5,
      STARTER: 25,
      PROFESSIONAL: 75,
      ENTERPRISE: 250
    } as const

    const userPlan = user.plan as keyof typeof limits
    const limit = limits[userPlan] || limits.FREE
    
    if (reportCount >= limit) {
      return NextResponse.json({
        error: 'Report limit reached',
        message: `${user.plan} plan allows ${limit} reports per billing cycle. You have used ${reportCount}/${limit} reports. Your limit resets in ${billingCycleInfo.daysRemaining} days.`,
        upgrade: true,
        currentUsage: reportCount,
        limit: limit,
        plan: user.plan,
        billingCycle: {
          start: billingCycleInfo.cycleStart,
          end: billingCycleInfo.cycleEnd,
          daysRemaining: billingCycleInfo.daysRemaining
        }
      }, { status: 403 })
    }
    
    // Check if client exists AND belongs to the user
    const client = await prisma.client.findFirst({
      where: { 
        id: validatedData.clientId,
        userId: user.id
      }
    })
    
    if (!client) {
      return NextResponse.json(
        { error: 'Client not found or unauthorized' },
        { status: 404 }
      )
    }
    
    // Create the report
    const report = await prisma.report.create({
      data: {
        title: validatedData.title,
        status: 'COMPLETED',
        data: validatedData.data,
        pdfUrl: validatedData.pdfBase64, // Store base64 PDF in pdfUrl field
        processingStartedAt: new Date(),
        processingCompletedAt: new Date(),
        clientId: validatedData.clientId,
        userId: user.id
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            domain: true
          }
        }
      }
    })
    
    // Update client's last report generated and count
    await prisma.client.update({
      where: { id: validatedData.clientId },
      data: {
        lastReportGenerated: new Date(),
        totalReportsGenerated: {
          increment: 1
        }
      }
    })
    
    // Check if FREE user should get upgrade warning (after 4+ reports)
    if (user.plan === 'FREE' && reportCount >= 4) {
      console.log(`FREE user ${user.id} has generated ${reportCount + 1} reports - showing upgrade warning`)
      return NextResponse.json({
        ...report,
        warning: {
          message: `You've used ${reportCount + 1} of your 5 free reports this billing cycle. Upgrade to STARTER for 25 reports per cycle!`,
          reportsRemaining: limits.FREE - (reportCount + 1),
          upgradePrompt: true,
          currentPlan: 'FREE',
          billingCycle: {
            daysRemaining: billingCycleInfo.daysRemaining,
            resetsOn: billingCycleInfo.cycleEnd
          },
          upgradeOptions: {
            starter: {
              plan: 'STARTER',
              reports: 25,
              clients: 5,
              features: ['Custom reports', 'Advanced analytics', 'Priority support']
            }
          }
        }
      }, { status: 201 })
    }
    
    return NextResponse.json(report, { status: 201 })
  } catch (error: any) {
    console.error('Failed to create report:', error)
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid request data',
          details: error.errors
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create report' },
      { status: 500 }
    )
  }
}
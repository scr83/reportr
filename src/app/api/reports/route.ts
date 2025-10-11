import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { requireUser } from '@/lib/auth-helpers'

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
    const user = await requireUser()
    const body = await request.json()
    const validatedData = createReportSchema.parse(body)
    
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
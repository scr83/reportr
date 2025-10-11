import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireUser } from '@/lib/auth-helpers'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const user = await requireUser()
    
    const report = await prisma.report.findFirst({
      where: { 
        id: params.id,
        userId: user.id // Ensure user owns this report
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            domain: true,
            contactEmail: true,
            contactName: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            companyName: true,
            primaryColor: true,
            logo: true
          }
        }
      }
    })
    
    if (!report) {
      return NextResponse.json(
        { error: 'Report not found or unauthorized' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(report)
  } catch (error: any) {
    console.error('Failed to fetch report:', error)
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch report' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const user = await requireUser()
    
    // Check if report exists AND belongs to user
    const existingReport = await prisma.report.findFirst({
      where: { 
        id: params.id,
        userId: user.id
      },
      include: { client: true }
    })
    
    if (!existingReport) {
      return NextResponse.json(
        { error: 'Report not found or unauthorized' },
        { status: 404 }
      )
    }
    
    // Delete the report
    await prisma.report.delete({
      where: { id: params.id }
    })
    
    // Update client's report count
    await prisma.client.update({
      where: { id: existingReport.clientId },
      data: {
        totalReportsGenerated: {
          decrement: 1
        }
      }
    })
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Failed to delete report:', error)
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    return NextResponse.json(
      { error: 'Failed to delete report' },
      { status: 500 }
    )
  }
}
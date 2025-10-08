import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    const report = await prisma.report.findUnique({
      where: { id: params.id },
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
        { error: 'Report not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(report)
  } catch (error) {
    console.error('Failed to fetch report:', error)
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
    // Check if report exists
    const existingReport = await prisma.report.findUnique({
      where: { id: params.id },
      include: { client: true }
    })
    
    if (!existingReport) {
      return NextResponse.json(
        { error: 'Report not found' },
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
  } catch (error) {
    console.error('Failed to delete report:', error)
    return NextResponse.json(
      { error: 'Failed to delete report' },
      { status: 500 }
    )
  }
}
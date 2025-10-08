import React from 'react'
import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { ReportTemplate } from '@/components/pdf/ReportTemplate'
import { z } from 'zod'

const topQuerySchema = z.object({
  query: z.string(),
  clicks: z.number(),
  impressions: z.number(),
  ctr: z.number(),
  position: z.number()
})

const generatePdfSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  agencyName: z.string().optional(),
  agencyLogo: z.string().optional(),
  gscData: z.object({
    clicks: z.number().min(0),
    impressions: z.number().min(0),
    ctr: z.number().min(0),
    position: z.number().min(0),
    topQueries: z.array(topQuerySchema).optional()
  }),
  ga4Data: z.object({
    users: z.number().min(0),
    sessions: z.number().min(0),
    bounceRate: z.number().min(0),
    conversions: z.number().min(0)
  })
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request data
    const validatedData = generatePdfSchema.parse(body)
    
    // Generate the PDF
    const ReportDoc = () => React.createElement(ReportTemplate, { data: validatedData })
    const pdfBuffer = await renderToBuffer(React.createElement(ReportDoc))
    
    // Create filename
    const startDate = new Date(validatedData.startDate).toISOString().split('T')[0]
    const endDate = new Date(validatedData.endDate).toISOString().split('T')[0]
    const filename = `${validatedData.clientName.replace(/[^a-zA-Z0-9]/g, '_')}_SEO_Report_${startDate}_${endDate}.pdf`
    
    // Return the PDF as a downloadable file
    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    })
    
  } catch (error) {
    console.error('PDF generation error:', error)
    
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
      { 
        error: 'Failed to generate PDF',
        message: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}
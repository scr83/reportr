import { NextRequest, NextResponse } from 'next/server'
import { generatePDFWithJsPDF } from '@/lib/pdf/jspdf-generator'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const topQuerySchema = z.object({
  query: z.string(),
  clicks: z.number(),
  impressions: z.number(),
  ctr: z.number(),
  position: z.number()
})

const generatePdfSchema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
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
  const processingStarted = new Date()
  
  try {
    const body = await request.json()
    
    // Validate the request data
    const validatedData = generatePdfSchema.parse(body)
    
    // Check if client exists
    const client = await prisma.client.findUnique({
      where: { id: validatedData.clientId },
      include: { user: true }
    })
    
    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      )
    }
    
    // Generate the PDF using jsPDF
    const pdfArrayBuffer = generatePDFWithJsPDF(validatedData)
    const pdfBuffer = Buffer.from(pdfArrayBuffer)
    
    // Convert PDF to base64 for storage
    const pdfBase64 = pdfBuffer.toString('base64')
    
    // Create filename and title
    const startDate = new Date(validatedData.startDate).toISOString().split('T')[0]
    const endDate = new Date(validatedData.endDate).toISOString().split('T')[0]
    const filename = `${validatedData.clientName.replace(/[^a-zA-Z0-9]/g, '_')}_SEO_Report_${startDate}_${endDate}.pdf`
    const reportTitle = `SEO Report - ${validatedData.clientName} (${startDate} to ${endDate})`
    
    // Save report to database
    const report = await prisma.report.create({
      data: {
        title: reportTitle,
        status: 'COMPLETED',
        data: {
          clientName: validatedData.clientName,
          startDate: validatedData.startDate,
          endDate: validatedData.endDate,
          agencyName: validatedData.agencyName,
          agencyLogo: validatedData.agencyLogo,
          gscData: validatedData.gscData,
          ga4Data: validatedData.ga4Data
        },
        pdfUrl: pdfBase64, // Store base64 PDF
        pdfSize: pdfBuffer.length,
        processingStartedAt: processingStarted,
        processingCompletedAt: new Date(),
        generationTimeMs: Date.now() - processingStarted.getTime(),
        clientId: validatedData.clientId,
        userId: client.userId
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
    
    // Return the PDF as a downloadable file with report ID in headers
    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
        'X-Report-ID': report.id, // Include report ID for reference
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
import { NextRequest, NextResponse } from 'next/server'
import { generatePDFWithJsPDF } from '@/lib/pdf/jspdf-generator'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { requireUser } from '@/lib/auth-helpers'

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
  console.log('========== PDF GENERATION START ==========')
  
  try {
    console.log('1. Getting authenticated user...')
    const user = await requireUser()
    console.log('2. User authenticated:', { userId: user.id, email: user.email })
    
    console.log('3. Parsing request body...')
    const body = await request.json()
    console.log('4. Request body received:', {
      clientId: body.clientId,
      clientName: body.clientName,
      hasGscData: !!body.gscData,
      hasGa4Data: !!body.ga4Data
    })
    
    console.log('5. Validating request data...')
    const validatedData = generatePdfSchema.parse(body)
    console.log('6. Data validated successfully')
    
    console.log('7. Looking up client in database...')
    const client = await prisma.client.findFirst({
      where: { 
        id: validatedData.clientId,
        userId: user.id
      },
      include: { user: true }
    })
    
    if (!client) {
      console.error('8. CLIENT NOT FOUND:', {
        searchedClientId: validatedData.clientId,
        searchedUserId: user.id
      })
      return NextResponse.json(
        { error: 'Client not found or unauthorized' },
        { status: 404 }
      )
    }
    
    console.log('8. Client found:', {
      clientId: client.id,
      clientName: client.name,
      userId: client.userId
    })
    
    console.log('9. Generating PDF...')
    const pdfArrayBuffer = generatePDFWithJsPDF(validatedData)
    const pdfBuffer = Buffer.from(pdfArrayBuffer)
    console.log('10. PDF generated:', {
      bufferSize: pdfBuffer.length,
      sizeKB: (pdfBuffer.length / 1024).toFixed(2)
    })
    
    console.log('11. Converting PDF to base64...')
    const pdfBase64 = pdfBuffer.toString('base64')
    console.log('12. Base64 conversion complete:', {
      base64Length: pdfBase64.length
    })
    
    const startDate = new Date(validatedData.startDate).toISOString().split('T')[0]
    const endDate = new Date(validatedData.endDate).toISOString().split('T')[0]
    const filename = `${validatedData.clientName.replace(/[^a-zA-Z0-9]/g, '_')}_SEO_Report_${startDate}_${endDate}.pdf`
    const reportTitle = `SEO Report - ${validatedData.clientName} (${startDate} to ${endDate})`
    
    console.log('13. Creating report in database...')
    console.log('Report data to save:', {
      title: reportTitle,
      status: 'COMPLETED',
      clientId: validatedData.clientId,
      userId: user.id,
      pdfSize: pdfBuffer.length,
      hasData: !!validatedData
    })
    
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
        pdfUrl: pdfBase64,
        pdfSize: pdfBuffer.length,
        processingStartedAt: processingStarted,
        processingCompletedAt: new Date(),
        generationTimeMs: Date.now() - processingStarted.getTime(),
        clientId: validatedData.clientId,
        userId: user.id
      }
    })
    
    console.log('14. Report created successfully:', {
      reportId: report.id,
      title: report.title,
      status: report.status,
      clientId: report.clientId,
      userId: report.userId
    })
    
    console.log('15. Updating client statistics...')
    await prisma.client.update({
      where: { id: validatedData.clientId },
      data: {
        lastReportGenerated: new Date(),
        totalReportsGenerated: {
          increment: 1
        }
      }
    })
    console.log('16. Client statistics updated')
    
    console.log('17. Returning PDF response...')
    console.log('========== PDF GENERATION SUCCESS ==========')
    
    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
        'X-Report-ID': report.id,
      },
    })
    
  } catch (error: any) {
    console.error('========== PDF GENERATION ERROR ==========')
    console.error('Error type:', error.constructor.name)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    console.error('Full error object:', JSON.stringify(error, null, 2))
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    if (error instanceof z.ZodError) {
      console.error('Validation errors:', error.errors)
      return NextResponse.json(
        { 
          error: 'Invalid request data', 
          details: error.errors 
        }, 
        { status: 400 }
      )
    }
    
    // Check for database-specific errors
    if (error.code === 'P2002') {
      console.error('Database constraint violation:', error.meta)
    } else if (error.code?.startsWith('P')) {
      console.error('Prisma error code:', error.code, 'Meta:', error.meta)
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to generate PDF',
        message: error instanceof Error ? error.message : 'Unknown error',
        code: error.code || 'UNKNOWN'
      }, 
      { status: 500 }
    )
  }
}
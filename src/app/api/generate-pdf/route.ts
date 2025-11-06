import { NextRequest, NextResponse } from 'next/server'
import { pdfGenerator } from '@/lib/pdf/react-pdf-generator'
import { prisma } from '@/lib/prisma'
import { put } from '@vercel/blob'
import { z } from 'zod'
import { requireUser } from '@/lib/auth-helpers'
import { canGenerateReport } from '@/lib/plan-limits'
import { getBillingCycleInfo } from '@/lib/billing-cycle'
import { randomUUID } from 'crypto'

// Enhanced validation schemas for flexible data handling
const topQuerySchema = z.object({
  query: z.string(),
  clicks: z.number(),
  impressions: z.number(),
  ctr: z.number(),
  position: z.number()
})

const landingPageSchema = z.object({
  page: z.string(),
  sessions: z.number(),
  users: z.number(),
  bounceRate: z.number(),
  conversions: z.number().optional()
})

const deviceBreakdownSchema = z.object({
  mobile: z.number(),
  desktop: z.number(),
  tablet: z.number()
})

// Flexible GA4 data schema - accepts any additional fields
const flexibleGA4Schema = z.object({
  users: z.number().min(0),
  sessions: z.number().min(0),
  bounceRate: z.number().min(0),
  conversions: z.number().min(0),
  // Optional additional fields that may come from dynamic forms
  newUsers: z.number().optional(),
  engagedSessions: z.number().optional(),
  engagementRate: z.number().optional(),
  pagesPerSession: z.number().optional(),
  avgSessionDuration: z.number().optional(),
  organicTraffic: z.number().optional(),
  directTraffic: z.number().optional(),
  referralTraffic: z.number().optional(),
  socialTraffic: z.number().optional(),
  emailTraffic: z.number().optional(),
  paidTraffic: z.number().optional(),
  mobileUsers: z.number().optional(),
  desktopUsers: z.number().optional(),
  tabletUsers: z.number().optional(),
  returningUsers: z.number().optional(),
  pageViews: z.number().optional(),
  uniquePageViews: z.number().optional(),
  averageTimeOnPage: z.number().optional(),
  exitRate: z.number().optional(),
  conversionRate: z.number().optional(),
  // Allow for dynamic landing pages and device breakdown
  topLandingPages: z.array(landingPageSchema).optional(),
  deviceBreakdown: deviceBreakdownSchema.optional()
}).passthrough() // Allow additional fields not defined in schema

const generatePdfSchema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  clientName: z.string().min(1, 'Client name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  reportType: z.enum(['standard', 'custom', 'executive']).optional().default('standard'),
  
  // Custom fields for advanced report customization
  customFields: z.array(z.object({
    title: z.string(),
    content: z.string(),
    type: z.enum(['insight', 'recommendation', 'metric'])
  })).optional(),
  
  // Selected metrics for custom reports
  selectedMetrics: z.array(z.string()).optional(),
  
  // Agency branding
  agencyName: z.string().optional(),
  agencyLogo: z.string().optional(),
  
  // Google Search Console data - REQUIRED
  gscData: z.object({
    clicks: z.number().min(0),
    impressions: z.number().min(0),
    ctr: z.number().min(0),
    position: z.number().min(0),
    topQueries: z.array(topQuerySchema).optional(),
    dailyData: z.array(z.object({
      date: z.string(),
      clicks: z.number(),
      impressions: z.number(),
      ctr: z.number(),
      position: z.number()
    })).optional()
  }),
  
  // Flexible GA4 data - REQUIRED for all report types
  ga4Data: flexibleGA4Schema,
  
  // Legacy metrics object (for backward compatibility)
  metrics: z.object({
    users: z.number().optional(),
    newUsers: z.number().optional(),
    sessions: z.number().optional(),
    engagedSessions: z.number().optional(),
    engagementRate: z.number().optional(),
    bounceRate: z.number().optional(),
    conversions: z.number().optional(),
    conversionRate: z.number().optional(),
    pagesPerSession: z.number().optional(),
    avgSessionDuration: z.number().optional(),
    organicTraffic: z.number().optional(),
    directTraffic: z.number().optional(),
    referralTraffic: z.number().optional(),
    socialTraffic: z.number().optional(),
    emailTraffic: z.number().optional(),
    paidTraffic: z.number().optional(),
    mobileUsers: z.number().optional(),
    desktopUsers: z.number().optional(),
    tabletUsers: z.number().optional(),
    returningUsers: z.number().optional(),
    pageViews: z.number().optional(),
    uniquePageViews: z.number().optional(),
    averageTimeOnPage: z.number().optional(),
    exitRate: z.number().optional()
  }).optional()
})

// Configure route for serverless function optimization
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Extended for React-PDF processing and Vercel Blob upload

/**
 * Enhanced PDF Generation API Route
 * Handles all report types (executive, standard, custom) with dynamic GA4 data
 * Integrates with Vercel Blob storage for scalable PDF storage
 * Supports complex report data with full metrics and custom fields
 */
export async function POST(request: NextRequest) {
  const requestId = randomUUID()
  const processingStarted = new Date()
  const startTime = Date.now()
  
  console.log('========== REACT-PDF GENERATION START ==========')
  console.log(`[${requestId}] PDF generation started (React-PDF)`)
  console.log('Timestamp:', processingStarted.toISOString())
  
  try {
    // Step 1: Authentication and fetch white label settings
    console.log('1. Authenticating user...')
    const user = await requireUser()
    console.log('2. User authenticated:', { 
      userId: user.id, 
      email: user.email,
      companyName: user.companyName 
    })
    
    // Step 1.5: Fetch user's white label settings from database
    console.log('2.5. Fetching user white label settings...')
    const userWithBranding = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        companyName: true,
        whiteLabelEnabled: true,
        primaryColor: true,
        logo: true,
        website: true,
        supportEmail: true,
      }
    })
    
    if (!userWithBranding) {
      console.error('User not found in database')
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    console.log('User white label settings:', {
      whiteLabelEnabled: userWithBranding.whiteLabelEnabled,
      primaryColor: userWithBranding.primaryColor,
      hasLogo: !!userWithBranding.logo,
      companyName: userWithBranding.companyName
    })
    
    // Step 1.9: CHECK REPORT GENERATION LIMITS BEFORE PROCESSING
    console.log('1.9. Checking report generation limits...')
    const limitCheck = await canGenerateReport(user.id)
    
    if (!limitCheck.allowed) {
      console.log('LIMIT CHECK FAILED:', {
        currentCount: limitCheck.currentCount,
        limit: limitCheck.limit,
        reason: limitCheck.reason
      })
      
      // Get billing cycle info for additional context
      const billingCycleInfo = await getBillingCycleInfo(user.id)
      
      return NextResponse.json(
        { 
          error: limitCheck.reason,
          currentCount: limitCheck.currentCount,
          limit: limitCheck.limit,
          upgradeRequired: true,
          billingCycle: {
            start: billingCycleInfo.cycleStart,
            end: billingCycleInfo.cycleEnd,
            daysRemaining: billingCycleInfo.daysRemaining
          }
        },
        { status: 403 }
      )
    }
    
    console.log('Limit check passed:', {
      currentCount: limitCheck.currentCount,
      limit: limitCheck.limit,
      remaining: limitCheck.limit - limitCheck.currentCount
    })
    
    // Step 2: Parse and validate request data
    console.log('3. Parsing request body...')
    const body = await request.json()
    
    console.log('🔍 [PDF-API] PDF generation request received');
    console.log('🔍 [PDF-API] Request data structure:', {
      hasGscData: !!body.gscData,
      gscDataKeys: Object.keys(body.gscData || {}),
      hasDailyData: !!body.gscData?.dailyData,
      dailyDataLength: body.gscData?.dailyData?.length || 0
    });
    
    if (body.gscData?.dailyData) {
      console.log('🔍 [PDF-API] Daily data sample:', {
        first: body.gscData.dailyData[0],
        last: body.gscData.dailyData[body.gscData.dailyData.length - 1]
      });
    } else {
      console.log('🔍 [PDF-API] ❌ NO DAILY DATA FOUND IN REQUEST');
    }
    
    // PHASE 2 DIAGNOSTIC LOGGING: Enhanced request data analysis
    console.log('🟢 API: Received request');
    console.log('Request body keys:', Object.keys(body));
    console.log('Report Type:', body.reportType);
    console.log('Full body:', JSON.stringify(body, null, 2));
    
    console.log('4. Request data structure:', {
      clientId: body.clientId,
      clientName: body.clientName,
      reportType: body.reportType,
      hasGscData: !!body.gscData,
      hasGa4Data: !!body.ga4Data,
      hasSelectedMetrics: !!body.selectedMetrics,
      selectedMetricsCount: body.selectedMetrics?.length || 0,
      hasCustomFields: !!body.customFields,
      ga4DataKeys: body.ga4Data ? Object.keys(body.ga4Data) : [],
      hasTopLandingPages: !!body.ga4Data?.topLandingPages,
      hasDeviceBreakdown: !!body.ga4Data?.deviceBreakdown,
      // PHASE 2: Count data fields for different report types
      gscDataFieldCount: body.gscData ? Object.keys(body.gscData).length : 0,
      ga4DataFieldCount: body.ga4Data ? Object.keys(body.ga4Data).length : 0,
      totalDataFields: (body.gscData ? Object.keys(body.gscData).length : 0) + (body.ga4Data ? Object.keys(body.ga4Data).length : 0)
    })
    
    console.log('5. Validating request data...')
    const validatedData = generatePdfSchema.parse(body)
    console.log('6. Data validation successful')
    
    // Validation passed - all report types use the same Zod schema
    console.log('7. All validation checks passed')
    
    // Step 2.5: Check report type restrictions for FREE plan
    if (user.plan === 'FREE' && validatedData.reportType === 'custom') {
      console.log('8. BLOCKED: FREE plan attempting Custom report generation')
      return NextResponse.json(
        {
          error: 'Custom reports are not available on the FREE plan',
          message: 'Upgrade to STARTER plan to unlock custom reports with advanced features.',
          upgradeRequired: true,
          currentPlan: 'FREE',
          requiredPlan: 'STARTER',
          reportType: 'custom'
        },
        { status: 403 }
      );
    }
    console.log('8. Report type access verified for plan:', user.plan)
    
    // Step 3: Verify client ownership
    console.log('9. Verifying client ownership...')
    const client = await prisma.client.findFirst({
      where: { 
        id: validatedData.clientId,
        userId: user.id
      },
      include: { user: true }
    })
    
    if (!client) {
      console.error('10. CLIENT ACCESS DENIED:', {
        requestedClientId: validatedData.clientId,
        userId: user.id
      })
      return NextResponse.json(
        { error: 'Client not found or access denied' },
        { status: 404 }
      )
    }
    
    console.log('11. Client ownership verified:', {
      clientId: client.id,
      clientName: client.name,
      domain: client.domain
    })
    
    // Step 4: Merge GA4 data intelligently
    console.log('12. Processing GA4 data...')
    
    // Ensure required fields are present with defaults
    const baseGA4Data = {
      users: 0,
      sessions: 0,
      bounceRate: 0,
      conversions: 0
    }
    
    // Merge legacy metrics and new GA4 data, ensuring required fields
    const mergedGA4Data = {
      ...baseGA4Data, // Defaults for required fields
      ...validatedData.metrics, // Legacy metrics as fallback
      ...validatedData.ga4Data, // New GA4 data takes priority
    }
    
    console.log('13. Merged GA4 data keys:', Object.keys(mergedGA4Data))
    console.log('14. Required fields check:', {
      users: mergedGA4Data.users,
      sessions: mergedGA4Data.sessions,
      bounceRate: mergedGA4Data.bounceRate,
      conversions: mergedGA4Data.conversions
    })
    
    // Step 5: Generate PDF with React-PDF
    console.log(`[${requestId}] 15. Generating PDF with React-PDF...`)
    
    // Prepare report data for new React-PDF template interface
    const reactPDFReportData = {
      reportType: validatedData.reportType,
      clientName: validatedData.clientName,
      clientDomain: validatedData.clientName + '.com',
      
      reportPeriod: {
        startDate: validatedData.startDate,
        endDate: validatedData.endDate,
      },
      
      // Step 2B: Build branding object based on white label status
      branding: (() => {
        const brandingObj = {
          companyName: userWithBranding.whiteLabelEnabled 
            ? (userWithBranding.companyName || validatedData.agencyName || 'Agency') 
            : 'Reportr',
          website: userWithBranding.whiteLabelEnabled 
            ? (userWithBranding.website || 'https://example.com')
            : 'https://reportr.app',
          email: userWithBranding.email,
          phone: '',
          logo: userWithBranding.whiteLabelEnabled 
            ? (userWithBranding.logo || validatedData.agencyLogo || '/default-agency-logo.png') 
            : '/reportr-logo.png',
          primaryColor: userWithBranding.whiteLabelEnabled 
            ? userWithBranding.primaryColor 
            : '#7e23ce',
          // White label settings
          whiteLabelEnabled: userWithBranding.whiteLabelEnabled,
          supportEmail: userWithBranding.supportEmail || undefined,
          enabled: userWithBranding.whiteLabelEnabled,
          showPoweredBy: !userWithBranding.whiteLabelEnabled, // Show ONLY when white label is OFF
        };
        
        console.log('Generated branding object:', brandingObj);
        return brandingObj;
      })(),
      
      // GSC Metrics - ALWAYS REQUIRED (4 metrics)
      gscMetrics: {
        clicks: validatedData.gscData?.clicks || 0,
        impressions: validatedData.gscData?.impressions || 0,
        ctr: validatedData.gscData?.ctr || 0,
        position: validatedData.gscData?.position || 0,
      },
      
      // GSC Data with topQueries for TopQueriesPage
      gscData: {
        totalClicks: validatedData.gscData?.clicks || 0,
        totalImpressions: validatedData.gscData?.impressions || 0,
        averageCTR: validatedData.gscData?.ctr || 0,
        averagePosition: validatedData.gscData?.position || 0,
        topQueries: validatedData.gscData?.topQueries || [],
        dailyData: validatedData.gscData?.dailyData || [],
      },
      
      // GA4 Metrics - Structure varies by report type
      ga4Metrics: {
        // Core required metrics
        users: mergedGA4Data.users || 0,
        sessions: mergedGA4Data.sessions || 0,
        bounceRate: mergedGA4Data.bounceRate || 0,
        conversions: mergedGA4Data.conversions || 0,
        
        // Optional metrics for Standard/Custom reports
        ...(mergedGA4Data.avgSessionDuration !== undefined && { avgSessionDuration: mergedGA4Data.avgSessionDuration }),
        ...(mergedGA4Data.pagesPerSession !== undefined && { pagesPerSession: mergedGA4Data.pagesPerSession }),
        ...(mergedGA4Data.newUsers !== undefined && { newUsers: mergedGA4Data.newUsers }),
        ...(mergedGA4Data.organicTraffic !== undefined && { organicTraffic: mergedGA4Data.organicTraffic }),
        ...((mergedGA4Data as any).topLandingPages && { topLandingPages: (mergedGA4Data as any).topLandingPages }),
        ...((mergedGA4Data as any).deviceBreakdown && { deviceBreakdown: (mergedGA4Data as any).deviceBreakdown }),
      },
      
      // CRITICAL FIX: Pass selectedMetrics to PDF generator for custom reports
      selectedMetrics: validatedData.selectedMetrics || [],
    }
    
    // Generate PDF using React-PDF
    const result = await pdfGenerator.generateReport(reactPDFReportData)
    
    if (!result.success) {
      throw new Error(`React-PDF generation failed: ${result.error}`)
    }
    
    const pdfBuffer = result.pdfBuffer!
    
    const pdfGenerationTime = Date.now() - startTime
    console.log(`[${requestId}] 16. PDF generated successfully:`, {
      bufferSize: pdfBuffer.length,
      sizeMB: (pdfBuffer.length / 1024 / 1024).toFixed(2),
      reportType: validatedData.reportType,
      generationTime: pdfGenerationTime + 'ms'
    })
    
    // Step 6: Upload to Vercel Blob storage
    console.log('17. Uploading PDF to Vercel Blob storage...')
    
    const startDate = new Date(validatedData.startDate).toISOString().split('T')[0]
    const endDate = new Date(validatedData.endDate).toISOString().split('T')[0]
    const timestamp = Date.now()
    const sanitizedClientName = validatedData.clientName.replace(/[^a-zA-Z0-9]/g, '_')
    const filename = `reports/${sanitizedClientName}_${validatedData.reportType}_${startDate}_${endDate}_${timestamp}.pdf`
    
    // Upload to Vercel Blob
    const blob = await put(filename, pdfBuffer, {
      access: 'public',
      contentType: 'application/pdf'
    })
    
    console.log('18. PDF uploaded to blob storage:', {
      url: blob.url,
      size: pdfBuffer.length,
      filename: filename
    })
    
    // Step 7: Save complete report data to database
    console.log('19. Saving report to database...')
    
    const reportTitle = `${validatedData.reportType.charAt(0).toUpperCase() + validatedData.reportType.slice(1)} Report - ${validatedData.clientName} (${startDate} to ${endDate})`
    
    // Store comprehensive report data
    const reportData = {
      // Basic report info
      clientName: validatedData.clientName,
      startDate: validatedData.startDate,
      endDate: validatedData.endDate,
      reportType: validatedData.reportType,
      
      // Custom configuration
      customFields: validatedData.customFields,
      selectedMetrics: validatedData.selectedMetrics,
      
      // Agency branding
      agencyName: validatedData.agencyName || user.companyName || 'Digital Frog Agency',
      agencyLogo: validatedData.agencyLogo,
      
      // SEO data
      gscData: validatedData.gscData,
      
      // Complete GA4 data (including dynamic fields)
      ga4Data: mergedGA4Data,
      
      // Additional metadata
      generatedAt: processingStarted.toISOString(),
      dataSourceInfo: {
        hasGSC: !!validatedData.gscData,
        hasGA4: !!validatedData.ga4Data,
        metricsCount: Object.keys(mergedGA4Data).length,
        hasCustomFields: !!validatedData.customFields?.length,
        selectedMetricsCount: validatedData.selectedMetrics?.length || 0
      }
    }
    
    const report = await prisma.report.create({
      data: {
        title: reportTitle,
        status: 'COMPLETED',
        data: reportData, // Save comprehensive data
        pdfUrl: blob.url, // Store Vercel Blob URL
        pdfSize: pdfBuffer.length,
        processingStartedAt: processingStarted,
        processingCompletedAt: new Date(),
        generationTimeMs: Date.now() - processingStarted.getTime(),
        clientId: validatedData.clientId,
        userId: user.id
      }
    })
    
    console.log('20. Report saved to database:', {
      reportId: report.id,
      title: report.title,
      pdfUrl: report.pdfUrl,
      dataSize: JSON.stringify(reportData).length
    })
    
    // Step 8: Update client statistics
    console.log('21. Updating client statistics...')
    await prisma.client.update({
      where: { id: validatedData.clientId },
      data: {
        lastReportGenerated: new Date(),
        totalReportsGenerated: {
          increment: 1
        }
      }
    })
    
    const processingTime = Date.now() - startTime
    console.log(`[${requestId}] 22. Client statistics updated`)
    console.log('========== REACT-PDF GENERATION SUCCESS ==========')
    console.log(`[${requestId}] Total processing time: ${processingTime}ms`)
    
    // Step 9: Return enhanced response with performance tracking
    const downloadFilename = `${sanitizedClientName}_${validatedData.reportType}_Report_${startDate}_to_${endDate}.pdf`
    
    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${downloadFilename}"`,
        'Content-Length': pdfBuffer.length.toString(),
        'X-Report-ID': report.id,
        'X-Blob-URL': blob.url,
        'X-Processing-Time': processingTime.toString(),
        'X-Generator': 'react-pdf',
        'X-Request-ID': requestId
      },
    })
    
  } catch (error: any) {
    const processingTime = Date.now() - startTime
    
    console.error('========== REACT-PDF GENERATION ERROR ==========')
    console.error(`[${requestId}] Processing time before error: ${processingTime}ms`)
    console.error(`[${requestId}] Error type:`, error.constructor.name)
    console.error(`[${requestId}] Error message:`, error.message)
    console.error(`[${requestId}] Error details:`, {
      message: error.message,
      stack: error.stack,
      userId: undefined, // Will be set below if auth succeeds
      stage: error.stage || 'unknown',
      duration: error.duration || processingTime,
      requestId
    })
    
    // Enhanced error logging
    if (error instanceof z.ZodError) {
      console.error('Validation errors:', error.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message,
        code: e.code
      })))
      
      return NextResponse.json(
        { 
          error: 'Invalid request data', 
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        }, 
        { status: 400 }
      )
    }
    
    // Handle authentication errors
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ 
        error: 'Authentication required' 
      }, { status: 401 })
    }
    
    // Handle Vercel Blob errors
    if (error.message?.includes('blob') || error.message?.includes('storage')) {
      console.error('Blob storage error:', error.message)
      return NextResponse.json(
        { 
          error: 'PDF storage failed',
          message: 'Unable to save PDF to cloud storage'
        }, 
        { status: 500 }
      )
    }
    
    // Handle React-PDF specific errors
    if (error.message?.includes('React-PDF') || error.message?.includes('renderToBuffer') || error.stage) {
      console.error(`[${requestId}] React-PDF error:`, {
        stage: error.stage,
        duration: error.duration,
        originalError: error.originalError?.message
      })
      
      // Return different status codes based on error type
      if (error.message.includes('timeout') || error.stage === 'rendering') {
        return NextResponse.json(
          { 
            error: 'PDF generation service temporarily unavailable',
            details: 'Please try again in a few moments',
            requestId,
            stage: error.stage || 'timeout'
          },
          { status: 503 }
        )
      }
      
      return NextResponse.json(
        { 
          error: 'PDF generation failed',
          details: 'Unable to create PDF using React-PDF engine',
          requestId,
          stage: error.stage || 'unknown'
        },
        { status: 500 }
      )
    }
    
    // Handle legacy PDF generation errors (jsPDF)
    if (error.message?.includes('PDF') || error.message?.includes('jsPDF')) {
      console.error(`[${requestId}] PDF generation error:`, error.message)
      return NextResponse.json(
        { 
          error: 'PDF generation failed',
          message: 'Unable to create PDF from provided data',
          requestId
        }, 
        { status: 500 }
      )
    }
    
    // Handle database errors
    if (error.code?.startsWith('P')) {
      console.error('Database error:', error.code, error.meta)
      return NextResponse.json(
        { 
          error: 'Database operation failed',
          message: 'Unable to save report data'
        }, 
        { status: 500 }
      )
    }
    
    // Generic error handling
    console.error(`[${requestId}] Unexpected error:`, error.stack)
    return NextResponse.json(
      { 
        error: 'PDF generation failed',
        message: 'An unexpected error occurred during PDF generation',
        code: error.code || 'UNKNOWN_ERROR',
        requestId
      }, 
      { status: 500 }
    )
  }
}
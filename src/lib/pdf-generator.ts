import { pdf } from '@react-pdf/renderer'
import { ReportData, GeneratePDFResponse } from '@/types/report'
import { ExecutiveSummaryTemplate } from '@/components/pdf/templates/ExecutiveSummaryTemplate'
import { StandardReportTemplate } from '@/components/pdf/templates/StandardReportTemplate'
import { CustomReportTemplate } from '@/components/pdf/templates/CustomReportTemplate'

/**
 * Generate a PDF report based on the report data and type
 */
export async function generatePDF(reportData: ReportData): Promise<Blob> {
  let template

  switch (reportData.reportType) {
    case 'executive':
      template = ExecutiveSummaryTemplate({ data: reportData })
      break
    case 'standard':
      template = StandardReportTemplate({ data: reportData })
      break
    case 'custom':
      template = CustomReportTemplate({ data: reportData })
      break
    default:
      throw new Error(`Invalid report type: ${reportData.reportType}`)
  }

  try {
    const blob = await pdf(template).toBlob()
    return blob
  } catch (error) {
    console.error('PDF generation failed:', error)
    throw new Error('Failed to generate PDF report')
  }
}

/**
 * Download a PDF blob with a formatted filename
 */
export function downloadPDF(blob: Blob, filename: string): void {
  try {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    
    // Append to body, click, and remove
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Clean up the URL object
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('PDF download failed:', error)
    throw new Error('Failed to download PDF')
  }
}

/**
 * Generate a formatted filename for the PDF report
 */
export function generatePDFFilename(reportData: ReportData): string {
  const clientName = reportData.clientName.toLowerCase().replace(/[^a-z0-9]/g, '-')
  const reportType = reportData.reportType
  const endDate = reportData.endDate
  const timestamp = new Date().toISOString().split('T')[0]
  
  return `${clientName}-${reportType}-report-${endDate}-${timestamp}.pdf`
}

/**
 * Validate report data before PDF generation
 */
export function validateReportData(reportData: ReportData): string[] {
  const errors: string[] = []
  
  // Required fields
  if (!reportData.clientName?.trim()) {
    errors.push('Client name is required')
  }
  
  if (!reportData.reportType) {
    errors.push('Report type is required')
  }
  
  if (!reportData.startDate) {
    errors.push('Start date is required')
  }
  
  if (!reportData.endDate) {
    errors.push('End date is required')
  }
  
  if (!reportData.branding?.name?.trim()) {
    errors.push('Agency name is required')
  }
  
  if (!reportData.branding?.email?.trim()) {
    errors.push('Agency email is required')
  }
  
  // Report type specific validation
  switch (reportData.reportType) {
    case 'executive':
      if (!reportData.metrics) {
        errors.push('Executive report requires basic metrics data')
      }
      break
      
    case 'standard':
      if (!reportData.gscData && !reportData.ga4Data) {
        errors.push('Standard report requires either Search Console or Analytics data')
      }
      break
      
    case 'custom':
      if (!reportData.selectedMetrics || reportData.selectedMetrics.length === 0) {
        errors.push('Custom report requires at least one selected metric')
      }
      break
  }
  
  return errors
}

/**
 * Generate and download PDF report with error handling
 */
export async function generateAndDownloadPDF(reportData: ReportData): Promise<GeneratePDFResponse> {
  try {
    // Validate data first
    const validationErrors = validateReportData(reportData)
    if (validationErrors.length > 0) {
      return {
        success: false,
        error: `Validation failed: ${validationErrors.join(', ')}`
      }
    }
    
    // Generate PDF
    const pdfBlob = await generatePDF(reportData)
    
    // Generate filename
    const filename = generatePDFFilename(reportData)
    
    // Download PDF
    downloadPDF(pdfBlob, filename)
    
    return {
      success: true,
      filename,
      pdfUrl: URL.createObjectURL(pdfBlob)
    }
    
  } catch (error) {
    console.error('PDF generation and download failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

/**
 * Estimate PDF file size based on report type and data
 */
export function estimatePDFSize(reportData: ReportData): string {
  let estimatedSizeKB = 50 // Base size
  
  switch (reportData.reportType) {
    case 'executive':
      estimatedSizeKB += 100 // 2-3 pages
      break
    case 'standard':
      estimatedSizeKB += 300 // 5-7 pages
      break
    case 'custom':
      const metricCount = reportData.selectedMetrics?.length || 4
      estimatedSizeKB += Math.min(metricCount * 25, 500) // Variable based on metrics
      break
  }
  
  // Add size for data tables
  if (reportData.gscData?.topQueries?.length) {
    estimatedSizeKB += reportData.gscData.topQueries.length * 2
  }
  
  if (reportData.ga4Data?.topLandingPages?.length) {
    estimatedSizeKB += reportData.ga4Data.topLandingPages.length * 2
  }
  
  // Convert to appropriate unit
  if (estimatedSizeKB < 1024) {
    return `~${estimatedSizeKB}KB`
  } else {
    return `~${(estimatedSizeKB / 1024).toFixed(1)}MB`
  }
}

/**
 * Get report type description for UI display
 */
export function getReportTypeDescription(reportType: string): string {
  switch (reportType) {
    case 'executive':
      return 'Quick 2-3 page overview with key metrics and insights'
    case 'standard':
      return 'Comprehensive 5-7 page report with detailed analytics'
    case 'custom':
      return 'Tailored report with your selected metrics and data'
    default:
      return 'SEO performance report'
  }
}

/**
 * Check if browser supports PDF generation
 */
export function checkPDFSupport(): boolean {
  try {
    // Check for required APIs
    return !!(
      typeof Blob !== 'undefined' &&
      typeof URL !== 'undefined' &&
      typeof URL.createObjectURL !== 'undefined' &&
      typeof document !== 'undefined' &&
      typeof document.createElement !== 'undefined'
    )
  } catch {
    return false
  }
}

/**
 * Preview report data before PDF generation (for debugging)
 */
export function previewReportData(reportData: ReportData): void {
  if (process.env.NODE_ENV === 'development') {
    console.group('📊 Report Data Preview')
    console.log('Client:', reportData.clientName)
    console.log('Type:', reportData.reportType)
    console.log('Date Range:', `${reportData.startDate} to ${reportData.endDate}`)
    console.log('Selected Metrics:', reportData.selectedMetrics)
    console.log('GA4 Data:', reportData.ga4Data)
    console.log('GSC Data:', reportData.gscData)
    console.log('Estimated Size:', estimatePDFSize(reportData))
    console.groupEnd()
  }
}
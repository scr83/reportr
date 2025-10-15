import { jsPDF } from 'jspdf'

interface ReportData {
  clientName: string
  startDate: string
  endDate: string
  agencyName?: string
  agencyLogo?: string
  reportType?: 'standard' | 'custom' | 'executive'
  customFields?: CustomFieldData[]
  selectedMetrics?: string[]
  gscData: {
    clicks: number
    impressions: number
    ctr: number
    position: number
    // Support alternative field names from frontend
    totalClicks?: number
    totalImpressions?: number
    averageCTR?: number
    averagePosition?: number
    topQueries?: Array<{
      query: string
      clicks: number
      impressions: number
      ctr: number
      position: number
    }>
  }
  // Enhanced GA4 data interface - now supports dynamic fields
  ga4Data: {
    users: number
    sessions: number
    bounceRate: number
    conversions: number
    // Dynamic additional fields from frontend forms
    newUsers?: number
    engagedSessions?: number
    engagementRate?: number
    pagesPerSession?: number
    avgSessionDuration?: number
    organicTraffic?: number
    directTraffic?: number
    referralTraffic?: number
    socialTraffic?: number
    emailTraffic?: number
    paidTraffic?: number
    mobileUsers?: number
    desktopUsers?: number
    tabletUsers?: number
    returningUsers?: number
    pageViews?: number
    uniquePageViews?: number
    averageTimeOnPage?: number
    exitRate?: number
    conversionRate?: number
    // Landing pages data
    topLandingPages?: Array<{
      page: string
      sessions: number
      users: number
      bounceRate: number
      conversions?: number
    }>
    // Device breakdown data
    deviceBreakdown?: {
      mobile: number
      desktop: number
      tablet: number
    }
  } & Record<string, any> // Allow any additional fields from dynamic forms
  // Extended metrics for custom reports (backward compatibility)
  metrics?: {
    users?: number
    newUsers?: number
    sessions?: number
    engagedSessions?: number
    engagementRate?: number
    bounceRate?: number
    conversions?: number
    conversionRate?: number
    pagesPerSession?: number
    avgSessionDuration?: number
    organicTraffic?: number
    directTraffic?: number
    referralTraffic?: number
    socialTraffic?: number
    emailTraffic?: number
    paidTraffic?: number
    mobileUsers?: number
    desktopUsers?: number
    tabletUsers?: number
    returningUsers?: number
    pageViews?: number
    uniquePageViews?: number
    averageTimeOnPage?: number
    exitRate?: number
  }
}

interface CustomFieldData {
  title: string
  content: string
  type: 'insight' | 'recommendation' | 'metric'
}

// Helper Functions for Smart Data Formatting
const formatMetricValue = (key: string, value: any): string => {
  console.log(`=== FORMATTING METRIC ${key} ===`);
  console.log('Raw value:', value, typeof value);
  
  if (value === undefined || value === null || value === '') {
    console.log(`${key} is empty, returning "0"`);
    return '0';
  }
  
  // Handle JSON strings first
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      if (Array.isArray(parsed)) {
        return `${parsed.length} items`
      } else if (typeof parsed === 'object' && parsed !== null) {
        const keys = Object.keys(parsed)
        return `${keys.length} categories`
      }
    } catch {
      // If not JSON, treat as regular string
      if (value.length > 50) return `${value.substring(0, 47)}...`
      return value
    }
  }
  
  // Handle specific object types first
  if (typeof value === 'object' && value !== null) {
    // Device breakdown object
    if (key === 'deviceBreakdown' && value.desktop !== undefined) {
      const total = (value.desktop || 0) + (value.mobile || 0) + (value.tablet || 0)
      if (total === 0) return 'No data'
      const mobile = Math.round(((value.mobile || 0) / total) * 100)
      const desktop = Math.round(((value.desktop || 0) / total) * 100)
      const tablet = Math.round(((value.tablet || 0) / total) * 100)
      
      const parts = []
      if (mobile > 0) parts.push(`${mobile}% mobile`)
      if (desktop > 0) parts.push(`${desktop}% desktop`)
      if (tablet > 0) parts.push(`${tablet}% tablet`)
      
      return parts.join(', ') || 'No data'
    }
    
    // Top landing pages array
    if (key === 'topLandingPages' && Array.isArray(value)) {
      if (value.length === 0) return 'No data'
      
      const topThree = value.slice(0, 3).map(page => 
        `${page.page} (${page.sessions} sessions)`
      )
      
      if (value.length > 3) {
        return `${topThree.join(', ')}, +${value.length - 3} more`
      }
      
      return topThree.join(', ')
    }
    
    // Generic array handling
    if (Array.isArray(value)) {
      return `${value.length} items`
    }
    
    // Generic object handling
    return `${Object.keys(value).length} categories`
  }
  
  // Convert to number for formatting
  const numValue = Number(value)
  if (isNaN(numValue)) return String(value)
  
  // Percentage formatting
  if (key.toLowerCase().includes('rate') || key.toLowerCase().includes('ctr') || key === 'bounceRate' || key === 'engagementRate' || key === 'conversionRate' || key === 'exitRate') {
    return `${numValue.toFixed(1)}%`
  }
  
  // Currency formatting (if we add revenue metrics later)
  if (key.toLowerCase().includes('revenue') || key.toLowerCase().includes('value') || key.toLowerCase().includes('cost')) {
    return `$${numValue.toLocaleString()}`
  }
  
  // Duration formatting (seconds to minutes/seconds)
  if (key.toLowerCase().includes('duration') || key.toLowerCase().includes('time') || key === 'avgSessionDuration' || key === 'averageTimeOnPage') {
    const mins = Math.floor(numValue / 60)
    const secs = Math.floor(numValue % 60)
    return `${mins}m ${secs}s`
  }
  
  // Large number formatting with commas
  if (numValue >= 1000) {
    return numValue.toLocaleString()
  }
  
  // Small decimals
  if (numValue < 10 && numValue % 1 !== 0) {
    return numValue.toFixed(2)
  }
  
  return numValue.toString()
}

const getMetricDisplayName = (key: string): string => {
  const displayNames: Record<string, string> = {
    users: 'Total Users',
    newUsers: 'New Users',
    sessions: 'Sessions',
    bounceRate: 'Bounce Rate',
    conversions: 'Conversions',
    pagesPerSession: 'Pages/Session',
    avgSessionDuration: 'Avg Session Duration',
    engagedSessions: 'Engaged Sessions',
    engagementRate: 'Engagement Rate',
    conversionRate: 'Conversion Rate',
    organicTraffic: 'Organic Traffic',
    directTraffic: 'Direct Traffic',
    referralTraffic: 'Referral Traffic',
    socialTraffic: 'Social Traffic',
    emailTraffic: 'Email Traffic',
    paidTraffic: 'Paid Traffic',
    mobileUsers: 'Mobile Users',
    desktopUsers: 'Desktop Users',
    tabletUsers: 'Tablet Users',
    returningUsers: 'Returning Users',
    pageViews: 'Page Views',
    uniquePageViews: 'Unique Page Views',
    averageTimeOnPage: 'Avg Time on Page',
    exitRate: 'Exit Rate',
    topLandingPages: 'Top Landing Pages',
    deviceBreakdown: 'Device Breakdown'
  }
  
  return displayNames[key] || key.split(/(?=[A-Z])/).map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')
}

export function generatePDFWithJsPDF(data: ReportData): ArrayBuffer {
  // CRITICAL DEBUGGING: Log what PDF generator receives
  console.log('🎨 PDF GENERATOR RECEIVED:', {
    reportType: data.reportType,
    gscDataKeys: Object.keys(data.gscData || {}), // Should always be 4
    ga4DataKeys: Object.keys(data.ga4Data || {}), // Should vary by report type
    selectedMetrics: data.selectedMetrics,
    selectedMetricsLength: data.selectedMetrics?.length || 0,
    gscData: data.gscData,
    ga4DataSample: data.ga4Data,
    hasGscData: !!data.gscData,
    hasGa4Data: !!data.ga4Data
  })
  
  // Validate critical data
  if (!data.gscData) {
    console.error('❌ MISSING GSC DATA - GSC metrics will show as 0')
  }
  if (!data.ga4Data) {
    console.error('❌ MISSING GA4 DATA - GA4 metrics will show as 0')
  }
  if (data.reportType === 'custom' && (!data.selectedMetrics || data.selectedMetrics.length === 0)) {
    console.error('❌ CUSTOM REPORT WITHOUT SELECTED METRICS')
  }
  
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  const margin = 20

  // Premium Design System Colors
  const colors = {
    // Primary Purple
    purplePrimary: [139, 92, 246] as [number, number, number], // #8B5CF6
    purpleDark: [124, 58, 237] as [number, number, number], // #7C3AED
    purpleLight: [243, 232, 255] as [number, number, number], // #F3E8FF
    purpleVeryLight: [250, 245, 255] as [number, number, number], // #FAF5FF
    
    // Accent Colors
    cyanPrimary: [6, 182, 212] as [number, number, number], // #06B6D4
    cyanLight: [207, 250, 254] as [number, number, number], // #CFFAFE
    greenPrimary: [16, 185, 129] as [number, number, number], // #10B981
    greenLight: [209, 250, 229] as [number, number, number], // #D1FAE5
    limePrimary: [132, 204, 22] as [number, number, number], // #84CC16
    
    // Neutrals
    gray900: [31, 41, 55] as [number, number, number], // #1F2937
    gray700: [55, 65, 81] as [number, number, number], // #374151
    gray500: [107, 114, 128] as [number, number, number], // #6B7280
    gray100: [243, 244, 246] as [number, number, number], // #F3F4F6
    white: [255, 255, 255] as [number, number, number]
  }

  const formatNumber = (num: number): string => {
    return num.toLocaleString()
  }

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Layout constants for premium design - FIXED DIMENSIONS
  const layout = {
    pageWidth: 210, // A4 page dimensions in mm
    pageHeight: 297,
    margins: {
      top: 50,
      right: 60,
      bottom: 50,
      left: 60
    },
    cardGap: 28,
    sectionGap: 40,
    cardPadding: {
      vertical: 7,  // Reduced padding
      horizontal: 6
    }
  }

  // 2-column card grid calculation - FIXED
  const contentWidth = layout.pageWidth - layout.margins.left - layout.margins.right // = 90mm
  const cardWidth = (contentWidth - layout.cardGap) / 2 // = 31mm each card
  const cardHeight = 35 // 35mm height (not too tall!)

  console.log('Card dimensions:', {
    width: cardWidth,
    height: cardHeight,
    gap: layout.cardGap,
    contentWidth: contentWidth
  })

  const agencyName = data.agencyName || 'Digital Frog Agency'
  const agencyWebsite = 'https://digitalfrog.co'
  const agencyEmail = 'jump@digitalfrog.co'
  const agencyPhone = '+56 9 9073 0352'


  // Generate dynamic content based on report type
  const generateInsights = (): Array<{
    title: string
    text: string
    bgColor: [number, number, number]
    borderColor: [number, number, number]
    titleColor: [number, number, number]
  }> => {
    // Use custom insights if provided
    const customInsights = data.customFields?.filter(f => f.type === 'insight')
    if (customInsights && customInsights.length > 0) {
      return customInsights.map(insight => ({
        title: insight.title,
        text: insight.content,
        bgColor: colors.purpleVeryLight,
        borderColor: colors.purplePrimary,
        titleColor: colors.purpleDark
      }))
    }

    // Generate standard insights based on report type
    const standardInsights = [
      {
        title: 'Search Performance',
        text: `Your website received ${formatNumber(data.ga4Data.users)} unique visitors across ${formatNumber(data.ga4Data.sessions)} sessions. Search visibility shows ${data.gscData.clicks > 1000 ? 'strong' : 'moderate'} performance with ${formatNumber(data.gscData.clicks || data.gscData.totalClicks || 0)} clicks from Google Search.`,
        bgColor: colors.purpleVeryLight,
        borderColor: colors.purplePrimary,
        titleColor: colors.purpleDark
      },
      {
        title: 'User Engagement',
        text: `${data.ga4Data.bounceRate < 40 ? 'Excellent' : data.ga4Data.bounceRate < 60 ? 'Good' : 'Moderate'} engagement with ${data.ga4Data.bounceRate.toFixed(1)}% bounce rate. This indicates ${data.ga4Data.bounceRate < 50 ? 'strong content relevance and user satisfaction' : 'room for improvement in content relevance or page loading speed'}.`,
        bgColor: colors.cyanLight,
        borderColor: colors.cyanPrimary,
        titleColor: [8, 145, 178] as [number, number, number] // #0891B2
      }
    ]

    if (data.reportType === 'executive') {
      return standardInsights.slice(0, 2) // Shorter for executive
    }

    standardInsights.push({
      title: 'Conversion Performance',
      text: `${data.ga4Data.conversions > 0 ? `Achieved ${formatNumber(data.ga4Data.conversions)} conversions during this period. Focus on scaling successful campaigns and optimizing conversion funnels.` : 'No conversions tracked. Implementing proper conversion tracking is crucial for measuring ROI and optimizing marketing efforts.'}`,
      bgColor: colors.greenLight,
      borderColor: colors.greenPrimary,
      titleColor: [5, 150, 105] as [number, number, number] // #059669
    })

    return standardInsights
  }

  const generateRecommendations = (): Array<{
    number: string
    title: string
    description: string
  }> => {
    // Use custom recommendations if provided
    const customRecs = data.customFields?.filter(f => f.type === 'recommendation')
    if (customRecs && customRecs.length > 0) {
      return customRecs.map((rec, index) => ({
        number: (index + 1).toString(),
        title: rec.title,
        description: rec.content
      }))
    }

    // Generate standard recommendations based on data
    const recommendations = [
      {
        number: '1',
        title: 'Enhance Conversion Tracking',
        description: 'Set up detailed conversion tracking to measure the effectiveness of your marketing efforts.'
      },
      {
        number: '2',
        title: 'Optimize Conversion Funnel',
        description: 'Focus on improving the user journey and conversion funnel to maximize results from existing traffic.'
      }
    ]

    // Add different recommendations based on report type
    if (data.reportType === 'custom' && data.selectedMetrics?.includes('bounceRate') && data.ga4Data.bounceRate > 60) {
      recommendations.push({
        number: '3',
        title: 'Reduce Bounce Rate',
        description: 'Your bounce rate is above 60%. Focus on improving page loading speed and content relevance to keep visitors engaged.'
      })
    } else {
      recommendations.push({
        number: '3',
        title: 'Regular Monitoring',
        description: 'Establish monthly reporting to track progress and identify trends early. Monitor key metrics consistently.'
      })
    }

    return recommendations
  }

  const getReportTitle = (): string => {
    switch (data.reportType) {
      case 'executive':
        return 'Executive Summary Report'
      case 'custom':
        return 'Custom Analytics Report'
      case 'standard':
      default:
        return 'SEO Standard Report'
    }
  }


  // Helper: Add footer with proper spacing - FIXED
  const addFooter = (pageNum?: number, totalPages?: number) => {
    const footerY = layout.pageHeight - 20 // 20mm from bottom
    
    // Border line
    doc.setDrawColor(229, 231, 235) // #E5E7EB
    doc.setLineWidth(0.3)
    doc.line(layout.margins.left, footerY - 5, layout.pageWidth - layout.margins.right, footerY - 5)
    
    // Left: Agency name (purple)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...colors.purplePrimary)
    doc.text(agencyName, layout.margins.left, footerY)
    
    // Center: Generated by
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...colors.gray500)
    const generatedDate = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    doc.text(`Generated by Reportr • ${generatedDate}`, layout.pageWidth / 2, footerY, { align: 'center' })
    
    // Right: Page number
    if (pageNum && totalPages) {
      doc.text(`Page ${pageNum} of ${totalPages}`, layout.pageWidth - layout.margins.right, footerY, { align: 'right' })
    }
  }

  // Helper: Add header with separator
  const addPageHeader = (pageSubtitle?: string) => {
    // Left side: Agency name and website
    doc.setFontSize(16)
    doc.setTextColor(...colors.purplePrimary)
    doc.setFont('helvetica', 'bold')
    doc.text(agencyName, layout.margins.left, layout.margins.top - 30)

    doc.setFontSize(14)
    doc.setTextColor(...colors.gray500)
    doc.setFont('helvetica', 'normal')
    doc.text(agencyWebsite, layout.margins.left, layout.margins.top - 15)

    // Right side: Client name and page subtitle
    doc.setFontSize(20)
    doc.setTextColor(...colors.gray900)
    doc.setFont('helvetica', 'bold')
    doc.text(data.clientName, pageWidth - layout.margins.right, layout.margins.top - 30, { align: 'right' })

    if (pageSubtitle) {
      doc.setFontSize(12)
      doc.setTextColor(...colors.gray500)
      doc.setFont('helvetica', 'normal')
      doc.text(pageSubtitle, pageWidth - layout.margins.right, layout.margins.top - 15, { align: 'right' })
    }
    
    // Purple separator line
    doc.setDrawColor(...colors.purplePrimary)
    doc.setLineWidth(3)
    doc.line(layout.margins.left, layout.margins.top - 5, pageWidth - layout.margins.right, layout.margins.top - 5)
  }

  // Helper: Add premium section header with gradient underline
  const addSectionHeader = (title: string, subtitle: string, y: number): number => {
    // Section title - large purple
    doc.setFontSize(32)
    doc.setTextColor(...colors.purplePrimary)
    doc.setFont('helvetica', 'extra-bold') // fallback to bold
    doc.text(title, layout.margins.left, y)
    
    // Lime/cyan gradient underline (simulated with two colored segments)
    const underlineY = y + 5
    const underlineLength = 120
    doc.setDrawColor(...colors.limePrimary)
    doc.setLineWidth(3)
    doc.line(layout.margins.left, underlineY, layout.margins.left + underlineLength/2, underlineY)
    
    doc.setDrawColor(...colors.cyanPrimary)
    doc.line(layout.margins.left + underlineLength/2, underlineY, layout.margins.left + underlineLength, underlineY)
    
    // Section subtitle
    doc.setFontSize(14)
    doc.setTextColor(...colors.gray500)
    doc.setFont('helvetica', 'normal')
    doc.text(subtitle, layout.margins.left, y + 20)
    
    return y + 35 // Return next Y position
  }

  // Helper: Create premium metric card (2-column layout) - FIXED
  const createMetricCard = (metric: any, x: number, y: number, cardWidth: number): void => {
    // Card background
    doc.setFillColor(...colors.purpleLight)
    doc.roundedRect(x, y, cardWidth, cardHeight, 4, 4, 'F') // Smaller border radius

    // Card content with proper padding
    const contentX = x + layout.cardPadding.horizontal
    const contentY = y + layout.cardPadding.vertical

    // 1. Draw title (small, uppercase, purple)
    doc.setFontSize(10) // Small
    doc.setTextColor(...colors.purplePrimary)
    doc.setFont('helvetica', 'bold')
    doc.text(metric.title.toUpperCase(), contentX, contentY)

    // 2. Draw value (LARGE, bold, dark gray)
    doc.setFontSize(28) // LARGE!
    doc.setTextColor(...colors.gray900)
    doc.setFont('helvetica', 'bold')
    doc.text(metric.value, contentX, contentY + 12) // 12mm below title

    // 3. Draw description (small, light gray)
    doc.setFontSize(9)
    doc.setTextColor(...colors.gray500)
    doc.setFont('helvetica', 'normal')
    
    // Wrap description text
    const maxDescWidth = cardWidth - (layout.cardPadding.horizontal * 2)
    const descLines = doc.splitTextToSize(metric.description, maxDescWidth)
    doc.text(descLines[0], contentX, contentY + 20) // 20mm below title
  }

  // Helper: Create premium data table
  const createDataTable = (title: string, headers: string[], rows: string[][], y: number): number => {
    const tableWidth = pageWidth - layout.margins.left - layout.margins.right
    const headerHeight = 35
    const rowHeight = 30
    const tableHeight = headerHeight + (rows.length * rowHeight)
    
    // Check if table fits on current page
    if (y + tableHeight > pageHeight - 100) {
      addFooter(currentPageNumber, getTotalPages())
      doc.addPage()
      addPageHeader(title)
      currentPageNumber++
      y = layout.margins.top + 15
    }

    // Table title
    doc.setFontSize(18)
    doc.setTextColor(...colors.purplePrimary)
    doc.setFont('helvetica', 'bold')
    doc.text(title, layout.margins.left, y)
    y += 25

    // Table container with shadow
    doc.setFillColor(...colors.white)
    doc.roundedRect(layout.margins.left + 2, y + 2, tableWidth, tableHeight, 12, 12, 'F')
    doc.setFillColor(0, 0, 0)
    doc.setGState(doc.GState({ opacity: 0.08 }))
    doc.roundedRect(layout.margins.left + 2, y + 2, tableWidth, tableHeight, 12, 12, 'F')
    doc.setGState(doc.GState({ opacity: 1 }))

    // Main table background
    doc.setFillColor(...colors.white)
    doc.roundedRect(layout.margins.left, y, tableWidth, tableHeight, 12, 12, 'F')

    // Table header with purple gradient
    doc.setFillColor(...colors.purplePrimary)
    doc.roundedRect(layout.margins.left, y, tableWidth, headerHeight, 12, 12, 'F')
    
    // Purple gradient overlay
    doc.setFillColor(...colors.purpleDark)
    doc.setGState(doc.GState({ opacity: 0.3 }))
    doc.roundedRect(layout.margins.left, y, tableWidth, headerHeight, 12, 12, 'F')
    doc.setGState(doc.GState({ opacity: 1 }))

    // Header text
    doc.setTextColor(...colors.white)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    
    const colWidth = tableWidth / headers.length
    headers.forEach((header, i) => {
      const headerX = layout.margins.left + (i * colWidth) + 20
      doc.text(header.toUpperCase(), headerX, y + 20)
    })
    
    y += headerHeight

    // Table rows
    rows.forEach((row, rowIndex) => {
      // Alternating row colors
      if (rowIndex % 2 === 0) {
        doc.setFillColor(...colors.gray100)
        doc.rect(layout.margins.left, y, tableWidth, rowHeight, 'F')
      }

      // Row text
      doc.setTextColor(...colors.gray700)
      doc.setFontSize(14)
      doc.setFont('helvetica', 'normal')
      
      row.forEach((cell, colIndex) => {
        const cellX = layout.margins.left + (colIndex * colWidth) + 20
        
        // First column (name/label) in bold
        if (colIndex === 0) {
          doc.setTextColor(...colors.gray900)
          doc.setFont('helvetica', 'bold')
        } else {
          doc.setTextColor(...colors.gray700)
          doc.setFont('helvetica', 'normal')
        }
        
        // Truncate long text
        const maxCellWidth = colWidth - 40
        const cellLines = doc.splitTextToSize(cell, maxCellWidth)
        doc.text(cellLines[0], cellX, y + 18)
      })
      
      y += rowHeight
    })

    return y + 25 // Return next Y position with spacing
  }


  // ======================
  // PAGE 1: COVER PAGE - FULL BLEED PURPLE GRADIENT
  // ======================
  
  // Create gradient background using color steps
  const gradientColors: Array<{ r: number; g: number; b: number }> = [
    { r: 139, g: 92, b: 246 },   // #8B5CF6 (top)
    { r: 124, g: 58, b: 237 },   // #7C3AED (middle)
    { r: 109, g: 40, b: 217 }    // #6D28D9 (bottom)
  ]
  
  const steps = 100
  const stripHeight = layout.pageHeight / steps
  
  for (let i = 0; i < steps; i++) {
    const ratio = i / steps
    
    // Interpolate between colors
    let r: number, g: number, b: number
    if (ratio < 0.5) {
      // Top to middle
      const localRatio = ratio * 2
      const color1 = gradientColors[0]!
      const color2 = gradientColors[1]!
      r = color1.r + (color2.r - color1.r) * localRatio
      g = color1.g + (color2.g - color1.g) * localRatio
      b = color1.b + (color2.b - color1.b) * localRatio
    } else {
      // Middle to bottom
      const localRatio = (ratio - 0.5) * 2
      const color1 = gradientColors[1]!
      const color2 = gradientColors[2]!
      r = color1.r + (color2.r - color1.r) * localRatio
      g = color1.g + (color2.g - color1.g) * localRatio
      b = color1.b + (color2.b - color1.b) * localRatio
    }
    
    doc.setFillColor(Math.round(r), Math.round(g), Math.round(b))
    doc.rect(0, i * stripHeight, layout.pageWidth, stripHeight, 'F')
  }

  // All text in WHITE for contrast on purple background
  doc.setTextColor(...colors.white)

  // Agency Name (top, large)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text(agencyName, layout.pageWidth / 2, 60, { align: 'center' })

  // Report Title (very large, main focus)
  doc.setFontSize(36)
  doc.setFont('helvetica', 'bold')
  doc.text(getReportTitle(), layout.pageWidth / 2, 120, { align: 'center' })

  // Client Name (large, but smaller than title)
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.text(data.clientName, layout.pageWidth / 2, 160, { align: 'center' })

  // Date Range (medium size)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'normal')
  doc.text(`${formatDate(data.startDate)} - ${formatDate(data.endDate)}`, layout.pageWidth / 2, 185, { align: 'center' })

  // LIME GREEN separator line for brand accent
  doc.setDrawColor(...colors.limePrimary)
  doc.setLineWidth(1)
  const lineWidth = 80
  const lineX = (layout.pageWidth - lineWidth) / 2
  doc.line(lineX, 195, lineX + lineWidth, 195)

  // Generated date (smaller, white)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text(`Generated on ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, layout.pageWidth / 2, 210, { align: 'center' })

  // ======================
  // PAGE 2+: CONTENT PAGES WITH METRICS
  // ======================
  
  doc.addPage()
  addPageHeader('Performance Overview')
  let currentPageNumber = 2
  let contentY = layout.margins.top + 15

  // Determine metrics to show based on report type
  let metricsToShow: Array<{
    title: string
    value: string
    description: string
  }> = []

  console.log('=== METRIC CARD DATA DEBUG ===');
  console.log('Full data object:', JSON.stringify(data, null, 2));
  console.log('GSC Data:', {
    clicks: data.gscData?.clicks,
    impressions: data.gscData?.impressions,
    ctr: data.gscData?.ctr,
    position: data.gscData?.position
  });
  console.log('GA4 Data:', {
    users: data.ga4Data?.users,
    sessions: data.ga4Data?.sessions,
    bounceRate: data.ga4Data?.bounceRate,
    conversions: data.ga4Data?.conversions
  });
  console.log('=== END DEBUG ===');

  // ALWAYS ADD GSC METRICS FIRST (4 metrics for all report types)
  // Handle both field naming conventions: totalClicks/clicks, totalImpressions/impressions, etc.
  const gscMetrics = [
    {
      title: 'Total Clicks',
      value: formatMetricValue('clicks', data.gscData.clicks || data.gscData.totalClicks),
      description: 'Clicks from Google Search'
    },
    {
      title: 'Total Impressions', 
      value: formatMetricValue('impressions', data.gscData.impressions || data.gscData.totalImpressions),
      description: 'Times shown in search results'
    },
    {
      title: 'Average CTR',
      value: formatMetricValue('ctr', data.gscData.ctr || data.gscData.averageCTR),
      description: 'Click-through rate'
    },
    {
      title: 'Average Position',
      value: formatMetricValue('position', data.gscData.position || data.gscData.averagePosition),
      description: 'Average ranking position'
    }
  ]

  // Add GSC metrics to all reports
  metricsToShow = [...gscMetrics]
  
  console.log('📊 GSC METRICS ADDED:', {
    gscMetricsCount: gscMetrics.length,
    gscMetrics: gscMetrics.map(m => ({ title: m.title, value: m.value }))
  })

  // Add metrics based on report type
  if (data.reportType === 'executive') {
    // Executive: 4 GSC + 4 GA4 = 8 total metrics
    const coreGA4Metrics = ['users', 'sessions', 'bounceRate', 'conversions']
    const ga4Metrics = coreGA4Metrics.map(key => ({
      title: getMetricDisplayName(key),
      value: formatMetricValue(key, data.ga4Data[key]),
      description: key === 'users' ? 'Unique website visitors' :
                  key === 'sessions' ? 'Website visits' :
                  key === 'bounceRate' ? 'Single-page sessions' :
                  'Goal completions'
    }))
    metricsToShow = [...metricsToShow, ...ga4Metrics]
    
  } else if (data.reportType === 'standard') {
    // Standard: 4 GSC + 10 specific GA4 metrics
    const standardGA4Metrics = [
      'users', 'sessions', 'bounceRate', 'conversions',
      'newUsers', 'returningUsers', 'engagementRate', 'avgSessionDuration',
      'pagesPerSession'
    ]
    
    const ga4Metrics = standardGA4Metrics.map(key => ({
      title: getMetricDisplayName(key),
      value: formatMetricValue(key, data.ga4Data[key]),
      description: `${getMetricDisplayName(key)} data`
    }))
    metricsToShow = [...metricsToShow, ...ga4Metrics]
    
  } else if (data.reportType === 'custom' && data.selectedMetrics) {
    // Custom: 4 GSC + ALL selected GA4 metrics (no filtering)
    const ga4Metrics = data.selectedMetrics.map(key => ({
      title: getMetricDisplayName(key),
      value: formatMetricValue(key, data.ga4Data[key] || 0), // Show 0 if missing, don't skip
      description: 'Selected metric'
    }))
    metricsToShow = [...metricsToShow, ...ga4Metrics]
  }
  
  // PREMIUM 2-COLUMN METRICS DISPLAY
  console.log('📋 FINAL METRICS SUMMARY:', {
    reportType: data.reportType,
    totalMetricsToShow: metricsToShow.length,
    metricsBreakdown: metricsToShow.map(m => ({ title: m.title, value: m.value }))
  })

  // Search Console Performance Section
  contentY = addSectionHeader(
    'Search Console Performance', 
    `Search data for ${formatDate(data.startDate)} to ${formatDate(data.endDate)}`,
    contentY
  )

  // Display first 4 metrics (GSC) in 2-column grid - FIXED
  let cardY = contentY
  
  for (let i = 0; i < 4 && i < metricsToShow.length; i++) {
    // Calculate position in 2-column grid
    const col = i % 2 // 0 or 1
    const row = Math.floor(i / 2)
    
    // X position: left margin + (column * (card width + gap))
    const currentX = layout.margins.left + (col * (cardWidth + layout.cardGap))
    
    // Y position: start + (row * (card height + gap))
    const currentY = contentY + (row * (cardHeight + layout.cardGap))
    
    console.log(`Card ${i} (${metricsToShow[i].title}): x=${currentX}, y=${currentY}`)
    
    createMetricCard(metricsToShow[i], currentX, currentY, cardWidth)
  }
  
  // Calculate Y position after all GSC cards
  const totalGSCRows = Math.ceil(Math.min(4, metricsToShow.length) / 2)
  cardY = contentY + (totalGSCRows * (cardHeight + layout.cardGap)) + 20 // +20mm extra spacing

  // Check if we need more space for GA4 metrics
  if (metricsToShow.length > 4) {
    // Add spacing before next section
    cardY += layout.sectionGap
    
    // Check if we need a new page
    if (cardY > pageHeight - 150) {
      addFooter(currentPageNumber, getTotalPages())
      doc.addPage()
      addPageHeader('Website Analytics')
      currentPageNumber++
      cardY = layout.margins.top + 15
    }
    
    // Website Analytics Section  
    cardY = addSectionHeader(
      'Website Analytics',
      'User behavior and engagement metrics',
      cardY
    )

    // Display remaining GA4 metrics in 2-column grid - FIXED
    for (let i = 4; i < metricsToShow.length; i++) {
      const relativeIndex = i - 4
      const col = relativeIndex % 2 // 0 or 1
      const row = Math.floor(relativeIndex / 2)
      
      // X position: left margin + (column * (card width + gap))
      const currentX = layout.margins.left + (col * (cardWidth + layout.cardGap))
      
      // Y position: start + (row * (card height + gap))
      const currentY = cardY + (row * (cardHeight + layout.cardGap))
      
      // Check for page overflow before creating card
      if (currentY > layout.pageHeight - 150) {
        addFooter(currentPageNumber, getTotalPages())
        doc.addPage()
        addPageHeader('Website Analytics (continued)')
        currentPageNumber++
        cardY = layout.margins.top + 15
        // Recalculate Y position for new page
        const newCurrentY = cardY + (row * (cardHeight + layout.cardGap))
        createMetricCard(metricsToShow[i], currentX, newCurrentY, cardWidth)
      } else {
        createMetricCard(metricsToShow[i], currentX, currentY, cardWidth)
      }
    }
  }

  // Helper function to calculate total pages
  function getTotalPages(): number {
    if (data.reportType === 'executive') {
      // Cover + Performance + Insights + Recommendations = 4 pages
      return 4
    } else if (data.reportType === 'standard') {
      // Cover + Performance + GSC Tables + GA4 Tables + Insights + Recommendations = 6-7 pages
      return 7
    } else {
      // Custom: Cover + Performance + GSC Tables + GA4 Tables + Insights + Recommendations = 6-7 pages
      return 7
    }
  }

  // Add GSC tables for Standard and Custom reports (NOT Executive)
  if (data.reportType !== 'executive') {
    
    // Add GSC Tables on new page
    addFooter(currentPageNumber, getTotalPages())
    doc.addPage()
    addPageHeader('Search Console Data')
    currentPageNumber++
    contentY = layout.margins.top + 15

    // Top Performing Keywords Table
    if (data.gscData.topQueries && data.gscData.topQueries.length > 0) {
      const keywordHeaders = ['Query', 'Clicks', 'Impressions', 'CTR %', 'Position']
      const keywordRows = data.gscData.topQueries.slice(0, 15).map(query => [
        query.query,
        formatNumber(query.clicks),
        formatNumber(query.impressions),
        (query.ctr * 100).toFixed(1) + '%',
        query.position.toFixed(1)
      ])
      
      contentY = createDataTable('Top Performing Keywords', keywordHeaders, keywordRows, contentY)
    }

    // Top Pages Table (mock data if not available)
    const topPagesHeaders = ['Page', 'Clicks', 'Impressions', 'CTR %', 'Position']
    const topPagesRows = [
      ['/', '2,543', '15,234', '16.7%', '5.2'],
      ['/services', '1,876', '8,432', '22.2%', '3.1'],
      ['/about', '1,234', '6,789', '18.2%', '4.5'],
      ['/contact', '987', '4,567', '21.6%', '2.8'],
      ['/blog', '765', '3,456', '22.1%', '6.7']
    ]
    
    contentY = createDataTable('Top Pages by Clicks', topPagesHeaders, topPagesRows, contentY)

    // Check if we need a new page for more tables
    if (contentY > pageHeight - 200) {
      addFooter(currentPageNumber, getTotalPages())
      doc.addPage()
      addPageHeader('Search Console Data (continued)')
      currentPageNumber++
      contentY = layout.margins.top + 15
    }

    // Top Countries Table
    const countriesHeaders = ['Country', 'Clicks', 'Impressions', 'CTR %']
    const countriesRows = [
      ['United States', '8,765', '45,234', '19.4%'],
      ['Canada', '2,345', '12,876', '18.2%'],
      ['United Kingdom', '1,876', '9,543', '19.6%'],
      ['Australia', '1,234', '6,789', '18.2%'],
      ['Germany', '987', '5,432', '18.2%']
    ]
    
    contentY = createDataTable('Top Countries', countriesHeaders, countriesRows, contentY)

    // Device Breakdown Table
    const deviceHeaders = ['Device', 'Clicks', 'Impressions', 'CTR %']
    const deviceRows = [
      ['Mobile', '9,876', '52,143', '18.9%'],
      ['Desktop', '5,432', '28,765', '18.9%'],
      ['Tablet', '1,234', '6,789', '18.2%']
    ]
    
    contentY = createDataTable('Device Breakdown', deviceHeaders, deviceRows, contentY)
  }

  // Add GA4 tables for Standard and Custom reports
  if (data.reportType === 'standard' || data.reportType === 'custom') {
    
    // Check if we need a new page
    if (contentY > pageHeight - 200) {
      addFooter(currentPageNumber, getTotalPages())
      doc.addPage()
      addPageHeader('Website Analytics Data')
      currentPageNumber++
      contentY = layout.margins.top + 15
    }

    // Traffic Sources Table
    const trafficHeaders = ['Source', 'Users', 'Sessions', 'Bounce Rate', 'Conversions']
    const trafficRows = [
      ['Organic Search', '5,432', '7,865', '42.3%', '234'],
      ['Direct', '3,214', '4,567', '38.9%', '156'], 
      ['Social Media', '1,876', '2,543', '55.7%', '67'],
      ['Referral', '1,234', '1,789', '47.2%', '45'],
      ['Email', '987', '1,234', '32.1%', '89']
    ]
    
    contentY = createDataTable('Traffic Sources', trafficHeaders, trafficRows, contentY)

    // Top Landing Pages Table
    if (data.ga4Data.topLandingPages && data.ga4Data.topLandingPages.length > 0) {
      const landingHeaders = ['Page', 'Sessions', 'Bounce Rate', 'Avg Time', 'Conversions']
      const landingRows = data.ga4Data.topLandingPages.slice(0, 10).map(page => [
        page.page,
        formatNumber(page.sessions),
        (page.bounceRate * 100).toFixed(1) + '%',
        '2m 34s', // Mock data for avg time
        formatNumber(page.conversions || 0)
      ])
      
      contentY = createDataTable('Top Landing Pages', landingHeaders, landingRows, contentY)
    } else {
      // Mock landing pages table
      const landingHeaders = ['Page', 'Sessions', 'Bounce Rate', 'Avg Time', 'Conversions']
      const landingRows = [
        ['/', '2,543', '35.2%', '3m 45s', '89'],
        ['/services', '1,876', '28.7%', '4m 12s', '67'],
        ['/about', '1,234', '42.3%', '2m 34s', '23'],
        ['/contact', '987', '25.6%', '1m 56s', '156'],
        ['/blog', '765', '58.9%', '5m 23s', '12']
      ]
      
      contentY = createDataTable('Top Landing Pages', landingHeaders, landingRows, contentY)
    }
  }
  
  addFooter(currentPageNumber, getTotalPages())

  // ======================
  // KEY INSIGHTS PAGE
  // ======================
  
  doc.addPage()
  addPageHeader('Key Insights')
  currentPageNumber++
  contentY = layout.margins.top + 15

  // Section header
  contentY = addSectionHeader(
    'Key Insights',
    'AI-powered insights based on your data analysis',
    contentY
  )

  // Get dynamic insights based on report type
  const insights = generateInsights()

  insights.forEach((insight, index) => {
    const cardHeight = 80 // Reduced height for better fit
    const cardPadding = 10
    const cardWidth = layout.pageWidth - layout.margins.left - layout.margins.right
    
    // Check for page overflow
    if (contentY + cardHeight > layout.pageHeight - 100) {
      addFooter(currentPageNumber, getTotalPages())
      doc.addPage()
      addPageHeader('Key Insights (continued)')
      currentPageNumber++
      contentY = layout.margins.top + 15
    }

    // Card background with appropriate color
    doc.setFillColor(...insight.bgColor)
    doc.roundedRect(layout.margins.left, contentY, cardWidth, cardHeight, 4, 4, 'F')

    // Full border (2px = ~0.7mm)
    doc.setDrawColor(...insight.borderColor)
    doc.setLineWidth(0.7)
    doc.roundedRect(layout.margins.left, contentY, cardWidth, cardHeight, 4, 4, 'S')

    // Title
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...insight.titleColor)
    doc.text(insight.title, layout.margins.left + cardPadding, contentY + cardPadding + 5)

    // Text content
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(55, 65, 81) // #374151
    const maxTextWidth = cardWidth - (cardPadding * 2)
    const textLines = doc.splitTextToSize(insight.text, maxTextWidth)
    
    // Ensure text fits in card
    const lineHeight = 5
    const maxLines = Math.floor((cardHeight - cardPadding * 2 - 15) / lineHeight)
    const displayLines = textLines.slice(0, maxLines)
    
    doc.text(displayLines, layout.margins.left + cardPadding, contentY + cardPadding + 15)

    contentY += cardHeight + 10 // Space between cards
  })

  addFooter(currentPageNumber, getTotalPages())


  // ======================
  // STRATEGIC RECOMMENDATIONS PAGE
  // ======================
  
  doc.addPage()
  addPageHeader('Strategic Recommendations')
  currentPageNumber++
  contentY = layout.margins.top + 15

  // Section header
  contentY = addSectionHeader(
    'Strategic Recommendations',
    'Next steps to improve your digital performance',
    contentY
  )

  // Priority Actions subsection
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...colors.gray900)
  doc.text('Priority Actions', layout.margins.left, contentY)
  contentY += 25

  // Get dynamic recommendations based on report type
  const recommendations = generateRecommendations()

  recommendations.forEach((rec, index) => {
    // Check for page overflow
    if (contentY > layout.pageHeight - 150) {
      addFooter(currentPageNumber, getTotalPages())
      doc.addPage()
      addPageHeader('Strategic Recommendations (continued)')
      currentPageNumber++
      contentY = layout.margins.top + 15
    }

    // Small circular badge (24mm diameter / 2 = 12mm radius)
    const badgeRadius = 12
    const badgeX = layout.margins.left + badgeRadius
    const badgeY = contentY + badgeRadius
    
    // Draw circle
    doc.setFillColor(...colors.purplePrimary)
    doc.circle(badgeX, badgeY, badgeRadius, 'F')

    // White number inside badge (centered)
    doc.setTextColor(...colors.white)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text(rec.number, badgeX, badgeY + 2, { align: 'center' })

    // Text to the RIGHT of badge
    const textX = layout.margins.left + (badgeRadius * 2) + 10 // 10mm gap
    const textWidth = layout.pageWidth - layout.margins.right - textX

    // Recommendation title
    doc.setTextColor(...colors.purplePrimary)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text(rec.title, textX, contentY + 10)

    // Recommendation description (wrapped)
    doc.setFontSize(12)
    doc.setTextColor(...colors.gray700)
    doc.setFont('helvetica', 'normal')
    const wrappedDesc = doc.splitTextToSize(rec.description, textWidth)
    doc.text(wrappedDesc, textX, contentY + 18)

    // Calculate height for next recommendation
    const descHeight = wrappedDesc.length * 5
    contentY += Math.max(badgeRadius * 2, 18 + descHeight) + 15
  })

  contentY += 20

  // Next Steps box with green styling
  const nextStepsHeight = 140
  
  // Check if box fits on current page
  if (contentY + nextStepsHeight > pageHeight - 100) {
    addFooter(currentPageNumber, getTotalPages())
    doc.addPage()
    addPageHeader('Next Steps')
    currentPageNumber++
    contentY = layout.margins.top + 15
  }

  const boxWidth = pageWidth - layout.margins.left - layout.margins.right
  
  // Green gradient background
  doc.setFillColor(...colors.greenLight)
  doc.roundedRect(layout.margins.left, contentY, boxWidth, nextStepsHeight, 16, 16, 'F')

  // Full 2px green border
  doc.setDrawColor(...colors.greenPrimary)
  doc.setLineWidth(2)
  doc.roundedRect(layout.margins.left, contentY, boxWidth, nextStepsHeight, 16, 16, 'S')

  // "Next Steps" title (green, 20px, bold)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(5, 150, 105) // #059669
  doc.text('Next Steps', layout.margins.left + 32, contentY + 32)

  // List items with green bullets
  const nextSteps = [
    'Schedule monthly performance reviews',
    'Implement recommended optimizations', 
    'Set up automated monitoring alerts',
    'Plan quarterly strategy adjustments'
  ]

  doc.setFontSize(15)
  doc.setTextColor(...colors.gray700)
  doc.setFont('helvetica', 'normal')
  
  nextSteps.forEach((step, index) => {
    const itemY = contentY + 55 + (index * 20)
    
    // Green bullet (•)
    doc.setTextColor(...colors.greenPrimary)
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('•', layout.margins.left + 40, itemY)
    
    // Step text
    doc.setTextColor(...colors.gray700)
    doc.setFontSize(15)
    doc.setFont('helvetica', 'normal')
    doc.text(step, layout.margins.left + 55, itemY)
  })

  contentY += nextStepsHeight + 30

  // Contact section (centered)
  doc.setFontSize(14)
  doc.setTextColor(...colors.gray500)
  doc.setFont('helvetica', 'normal')
  doc.text(`Questions about this report? Contact ${agencyName}`, pageWidth / 2, contentY, { align: 'center' })

  addFooter(currentPageNumber, getTotalPages())


  return doc.output('arraybuffer')
}

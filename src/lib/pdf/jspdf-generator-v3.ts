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
  if (value === undefined || value === null) return '0'
  
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
  
  // Handle arrays and objects
  if (Array.isArray(value)) {
    return `${value.length} items`
  }
  if (typeof value === 'object' && value !== null) {
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
    gscDataKeys: Object.keys(data.gscData || {}), // Always 4
    ga4DataKeys: Object.keys(data.ga4Data || {}), // Should vary
    selectedMetrics: data.selectedMetrics,
    ga4DataSample: data.ga4Data
  })
  
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  const margin = 20
  let yPosition = margin

  // Updated Colors - Purple Primary with Cyan Accents
  const primaryPurple: [number, number, number] = [139, 92, 246] // #8b5cf6
  const lightPurple: [number, number, number] = [243, 232, 255] // #f3e8ff
  const veryLightPurple: [number, number, number] = [250, 245, 255] // #faf5ff
  const cyan: [number, number, number] = [34, 211, 238] // #22d3ee
  const lightCyan: [number, number, number] = [165, 243, 252] // #a5f3fc
  const darkGray: [number, number, number] = [30, 41, 59] // #1e293b
  const mediumGray: [number, number, number] = [100, 116, 139] // #64748b
  const lightGray: [number, number, number] = [241, 245, 249] // #f1f5f9

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
  }> => {
    // Use custom insights if provided
    const customInsights = data.customFields?.filter(f => f.type === 'insight')
    if (customInsights && customInsights.length > 0) {
      return customInsights.map(insight => ({
        title: insight.title,
        text: insight.content,
        bgColor: veryLightPurple,
        borderColor: lightPurple
      }))
    }

    // Generate standard insights based on report type
    const standardInsights = [
      {
        title: 'Traffic Overview',
        text: `Your website received ${formatNumber(data.ga4Data.users)} unique visitors across ${formatNumber(data.ga4Data.sessions)} sessions. Visitors are returning to your site, indicating good content quality and user experience.`,
        bgColor: veryLightPurple,
        borderColor: lightPurple
      },
      {
        title: 'User Engagement Analysis',
        text: `${data.ga4Data.bounceRate < 40 ? 'Excellent' : data.ga4Data.bounceRate < 60 ? 'Good' : 'Moderate'} engagement with ${data.ga4Data.bounceRate.toFixed(1)}% bounce rate. This indicates ${data.ga4Data.bounceRate < 50 ? 'strong content relevance and user satisfaction' : 'room for improvement in content relevance or page loading speed'}.`,
        bgColor: [240, 253, 250] as [number, number, number],
        borderColor: lightCyan
      }
    ]

    if (data.reportType === 'executive') {
      return standardInsights.slice(0, 2) // Shorter for executive
    }

    standardInsights.push({
      title: 'Conversion Performance',
      text: `${data.ga4Data.conversions > 0 ? `Achieved ${formatNumber(data.ga4Data.conversions)} conversions during this period. Focus on scaling successful campaigns and optimizing conversion funnels.` : 'No conversions tracked. Implementing proper conversion tracking is crucial for measuring ROI and optimizing marketing efforts.'}`,
      bgColor: [240, 253, 250] as [number, number, number],
      borderColor: lightCyan
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


  // Helper: Add footer with proper spacing
  const addFooter = (pageNum?: number, totalPages?: number) => {
    doc.setDrawColor(...mediumGray)
    doc.setLineWidth(0.5)
    doc.line(margin, pageHeight - 28, pageWidth - margin, pageHeight - 28)

    // Left: Agency info
    doc.setFontSize(9)
    doc.setTextColor(...primaryPurple)
    doc.setFont('helvetica', 'bold')
    doc.text(agencyName, margin, pageHeight - 18)

    doc.setTextColor(...mediumGray)
    doc.setFont('helvetica', 'normal')
    doc.text(`${agencyEmail} • ${agencyPhone}`, margin, pageHeight - 12)

    // Center: Generated by info
    const generatedText = `Generated by Reportr • ${new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`
    doc.text(generatedText, pageWidth / 2, pageHeight - 12, { align: 'center' })

    // Right: Page numbers
    if (pageNum && totalPages) {
      doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 12, { align: 'right' })
    }
  }

  // Helper: Add header with separator
  const addPageHeader = () => {
    doc.setFontSize(10)
    doc.setTextColor(...primaryPurple)
    doc.setFont('helvetica', 'bold')
    doc.text(agencyName, margin, 15)

    doc.setTextColor(...darkGray)
    doc.setFont('helvetica', 'normal')
    doc.text(agencyWebsite, pageWidth - margin, 15, { align: 'right' })

    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text(data.clientName, pageWidth - margin, 22, { align: 'right' })

    doc.setTextColor(...mediumGray)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    
    doc.setDrawColor(...primaryPurple)
    doc.setLineWidth(2)
    doc.line(margin, 28, pageWidth - margin, 28)
  }


  // ======================
  // PAGE 1: COVER PAGE
  // ======================
  
  // White background (default - no need to set)
  // doc.setFillColor(255, 255, 255)
  // doc.rect(0, 0, pageWidth, pageHeight, 'F')

  // Purple content card with border and soft fill
  const contentY = 80
  const contentHeight = 170
  
  // Soft purple fill first
  doc.setFillColor(...lightPurple) // Light purple fill
  doc.roundedRect(margin, contentY, pageWidth - 2 * margin, contentHeight, 15, 15, 'F')
  
  // Bold purple border on top
  doc.setDrawColor(...primaryPurple)
  doc.setLineWidth(2)
  doc.roundedRect(margin, contentY, pageWidth - 2 * margin, contentHeight, 15, 15, 'S')

  // Agency name above purple card
  doc.setTextColor(...primaryPurple)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text(agencyName, pageWidth / 2, 50, { align: 'center' })

  // Report title on purple card (purple text on light background)
  doc.setTextColor(...primaryPurple)
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.text(getReportTitle(), pageWidth / 2, contentY + 40, { align: 'center' })

  // Client name (dark text)
  doc.setTextColor(...darkGray)
  doc.setFontSize(22)
  doc.text(data.clientName, pageWidth / 2, contentY + 70, { align: 'center' })

  // Date range (dark text)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'normal')
  doc.text(`${formatDate(data.startDate)} - ${formatDate(data.endDate)}`, pageWidth / 2, contentY + 95, { align: 'center' })

  // Separator line (cyan for contrast)
  doc.setDrawColor(...cyan)
  doc.setLineWidth(2)
  doc.line(pageWidth / 2 - 40, contentY + 105, pageWidth / 2 + 40, contentY + 105)

  // Generated date (medium gray)
  doc.setFontSize(11)
  doc.setTextColor(...mediumGray)
  doc.text(`Generated on ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, pageWidth / 2, contentY + 130, { align: 'center' })

  // ======================
  // PAGE 2: METRICS (Different by report type)
  // ======================
  
  doc.addPage()
  addPageHeader()
  let currentPageNumber = 2

  // Determine metrics to show based on report type
  let metricsToShow: Array<{
    title: string
    value: string
    description: string
  }> = []

  if (data.reportType === 'executive') {
    // Executive: EXACTLY 4 core metrics
    const coreMetrics = ['users', 'sessions', 'bounceRate', 'conversions']
    metricsToShow = coreMetrics.map(key => ({
      title: getMetricDisplayName(key),
      value: formatMetricValue(key, data.ga4Data[key]),
      description: key === 'users' ? 'Unique website visitors' :
                  key === 'sessions' ? 'Website visits' :
                  key === 'bounceRate' ? 'Single-page sessions' :
                  'Goal completions'
    }))
    
    // Page title
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryPurple)
    doc.text('Executive Summary', margin, 40)
    
  } else if (data.reportType === 'standard') {
    // Standard: ALL available data fields that have values (including zeros)
    const allDataKeys = Object.keys(data.ga4Data).filter(key => 
      data.ga4Data[key] !== undefined && 
      data.ga4Data[key] !== null
      // ✅ REMOVED !== 0 condition - zero is valid for metrics like conversions
    )
    
    metricsToShow = allDataKeys.map(key => ({
      title: getMetricDisplayName(key),
      value: formatMetricValue(key, data.ga4Data[key]),
      description: `${key} metric data`
    }))
    
    // Page title
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryPurple)
    doc.text('Standard Analytics Report', margin, 40)
    
  } else if (data.reportType === 'custom' && data.selectedMetrics) {
    // Custom: ONLY user-selected metrics
    metricsToShow = data.selectedMetrics
      .filter(key => data.ga4Data[key] !== undefined && data.ga4Data[key] !== null)
      .map(key => ({
        title: getMetricDisplayName(key),
        value: formatMetricValue(key, data.ga4Data[key]),
        description: `Selected: ${key}`
      }))
    
    // Page title
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryPurple)
    doc.text('Custom Analytics Report', margin, 40)
  }

  // Underline
  doc.setDrawColor(...cyan)
  doc.setLineWidth(1.5)
  doc.line(margin, 45, margin + 80, 45)

  // Subtitle
  doc.setFontSize(10)
  doc.setTextColor(...mediumGray)
  doc.setFont('helvetica', 'normal')
  doc.text(`Performance data for ${formatDate(data.startDate)} to ${formatDate(data.endDate)}`, margin, 57)

  // Adaptive grid layout based on metric count
  const metricCount = metricsToShow.length
  const columns = metricCount <= 4 ? 2 : metricCount <= 9 ? 3 : 4
  const cardWidth = (pageWidth - (2 * margin) - ((columns - 1) * 10)) / columns
  const cardHeight = 45
  
  let x = margin
  let y = 70
  let col = 0

  metricsToShow.forEach((metric, index) => {
    // Check for page overflow
    if (y > pageHeight - 100 && index < metricsToShow.length - 1) {
      addFooter(currentPageNumber, 4)
      doc.addPage()
      addPageHeader()
      currentPageNumber++
      x = margin
      y = 50
      col = 0
    }

    // Draw metric card with enhanced styling
    doc.setFillColor(...lightPurple)
    doc.setDrawColor(...primaryPurple)
    doc.setLineWidth(1)
    doc.roundedRect(x, y, cardWidth, cardHeight, 8, 8, 'FD')
    
    // Metric content
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryPurple)
    doc.text(metric.title, x + 8, y + 15)
    
    doc.setFontSize(18)
    doc.setTextColor(...darkGray)
    // Ensure value fits in card width
    const maxWidth = cardWidth - 16
    const valueLines = doc.splitTextToSize(metric.value, maxWidth)
    doc.text(valueLines[0], x + 8, y + 28)
    
    doc.setFontSize(8)
    doc.setTextColor(...mediumGray)
    const descLines = doc.splitTextToSize(metric.description, maxWidth)
    doc.text(descLines[0], x + 8, y + 36)
    
    // Grid positioning
    col++
    if (col >= columns) {
      col = 0
      x = margin
      y += cardHeight + 10
    } else {
      x += cardWidth + 10
    }
  })
  
  addFooter(currentPageNumber, 4)

  // ======================
  // PAGE 3: KEY INSIGHTS
  // ======================
  
  doc.addPage()
  addPageHeader()
  yPosition = 40

  // Page title
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...primaryPurple)
  doc.text('Key Insights', margin, yPosition)
  yPosition += 5

  // Underline
  doc.setDrawColor(...cyan)
  doc.setLineWidth(1.5)
  doc.line(margin, yPosition, margin + 35, yPosition)
  yPosition += 15

  // Subtitle
  doc.setFontSize(10)
  doc.setTextColor(...mediumGray)
  doc.setFont('helvetica', 'normal')
  doc.text('AI-powered insights based on your data analysis', margin, yPosition)
  yPosition += 20

  // Get dynamic insights based on report type
  const insights = generateInsights()

  insights.forEach(insight => {
    const boxHeight = 50 // Increased height for more content
    
    // Box background
    doc.setFillColor(...insight.bgColor)
    doc.roundedRect(margin, yPosition, pageWidth - 2 * margin, boxHeight, 3, 3, 'F')

    // Box border
    doc.setDrawColor(...insight.borderColor)
    doc.setLineWidth(1)
    doc.roundedRect(margin, yPosition, pageWidth - 2 * margin, boxHeight, 3, 3, 'S')

    // Title
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryPurple)
    doc.text(insight.title, margin + 8, yPosition + 12)

    // Text
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...darkGray)
    const textLines = doc.splitTextToSize(insight.text, pageWidth - 2 * margin - 16)
    doc.text(textLines, margin + 8, yPosition + 24)

    yPosition += boxHeight + 12
  })

  const insightsPageNum = currentPageNumber + 1
  addFooter(insightsPageNum, 4)


  // ======================
  // PAGE 4: STRATEGIC RECOMMENDATIONS  
  // ======================
  
  doc.addPage()
  addPageHeader()
  yPosition = 40

  // Page title
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...primaryPurple)
  doc.text('Strategic Recommendations', margin, yPosition)
  yPosition += 5

  doc.setDrawColor(...cyan)
  doc.setLineWidth(1.5)
  doc.line(margin, yPosition, margin + 70, yPosition)
  yPosition += 15

  // Subtitle
  doc.setFontSize(11)
  doc.setTextColor(...mediumGray)
  doc.setFont('helvetica', 'normal')
  doc.text('Next steps to improve your digital performance', margin, yPosition)
  yPosition += 20

  // Priority Actions header
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...darkGray)
  doc.text('Priority Actions', margin, yPosition)
  yPosition += 15

  // Get dynamic recommendations based on report type
  const recommendations = generateRecommendations()

  recommendations.forEach(rec => {
    // Number badge
    doc.setFillColor(...primaryPurple)
    doc.circle(margin + 5, yPosition - 2, 4, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(rec.number, margin + 5, yPosition, { align: 'center' })

    // Title
    doc.setTextColor(...primaryPurple)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text(rec.title, margin + 15, yPosition)

    // Description
    doc.setFontSize(10)
    doc.setTextColor(...darkGray)
    doc.setFont('helvetica', 'normal')
    const descLines = doc.splitTextToSize(rec.description, pageWidth - 2 * margin - 15)
    doc.text(descLines, margin + 15, yPosition + 8)

    yPosition += 25
  })

  yPosition += 10

  // Next Steps box
  doc.setFillColor(240, 253, 244) // light green
  doc.roundedRect(margin, yPosition, pageWidth - 2 * margin, 60, 3, 3, 'F')

  doc.setDrawColor(134, 239, 172) // green
  doc.setLineWidth(1)
  doc.roundedRect(margin, yPosition, pageWidth - 2 * margin, 60, 3, 3, 'S')

  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...primaryPurple)
  doc.text('Next Steps', margin + 5, yPosition + 12)

  const nextSteps = [
    '• Schedule monthly performance reviews',
    '• Implement recommended optimizations',
    '• Set up automated monitoring alerts',
    '• Plan quarterly strategy adjustments'
  ]

  doc.setFontSize(10)
  doc.setTextColor(...darkGray)
  doc.setFont('helvetica', 'normal')
  nextSteps.forEach((step, index) => {
    doc.text(step, margin + 8, yPosition + 25 + (index * 8))
  })

  yPosition += 75

  // Contact section
  doc.setFontSize(11)
  doc.setTextColor(...mediumGray)
  doc.text('Questions about this report? Contact Digital Frog Agency', pageWidth / 2, yPosition, { align: 'center' })

  doc.setFontSize(11)
  doc.setTextColor(...primaryPurple)
  doc.setFont('helvetica', 'bold')
  doc.text(`${agencyEmail} • ${agencyPhone}`, pageWidth / 2, yPosition + 8, { align: 'center' })

  const finalPageNum = currentPageNumber + 2
  addFooter(finalPageNum, 4)


  return doc.output('arraybuffer')
}

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
  ga4Data: {
    users: number
    sessions: number
    bounceRate: number
    conversions: number
  }
  // Extended metrics for custom reports (all 24 available metrics)
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

export function generatePDFWithJsPDF(data: ReportData): ArrayBuffer {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  const margin = 20
  let yPosition = margin

  // Colors - Digital Frog Purple Branding
  const primaryPurple: [number, number, number] = [146, 51, 234] // #9233ea
  const softPurple: [number, number, number] = [200, 153, 244] // 50% opacity purple for cover (#9233ea at 50%)
  const lightPurple: [number, number, number] = [233, 213, 255] // #e9d5ff
  const veryLightPurple: [number, number, number] = [250, 245, 255] // #faf5ff
  const teal: [number, number, number] = [34, 211, 238] // #22d3ee
  const lightTeal: [number, number, number] = [165, 243, 252] // #a5f3fc
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

  // Complete mapping of all 24 available metrics
  const AVAILABLE_METRICS: Record<string, {
    title: string
    getValue: (data: ReportData) => any
    desc: string
    format: (val: any) => string
  }> = {
    // Audience Metrics (7)
    users: {
      title: 'Total Users',
      getValue: (data: ReportData) => data.metrics?.users || data.ga4Data?.users,
      desc: 'Unique website visitors',
      format: (val: any) => val?.toLocaleString() || '0'
    },
    newUsers: {
      title: 'New Users',
      getValue: (data: ReportData) => data.metrics?.newUsers,
      desc: 'First-time visitors',
      format: (val: any) => val?.toLocaleString() || '0'
    },
    returningUsers: {
      title: 'Returning Users',
      getValue: (data: ReportData) => data.metrics?.returningUsers,
      desc: 'Repeat visitors',
      format: (val: any) => val?.toLocaleString() || '0'
    },
    sessions: {
      title: 'Total Sessions',
      getValue: (data: ReportData) => data.metrics?.sessions || data.ga4Data?.sessions,
      desc: 'Website visits',
      format: (val: any) => val?.toLocaleString() || '0'
    },
    engagedSessions: {
      title: 'Engaged Sessions',
      getValue: (data: ReportData) => data.metrics?.engagedSessions,
      desc: 'Sessions with engagement',
      format: (val: any) => val?.toLocaleString() || '0'
    },
    engagementRate: {
      title: 'Engagement Rate',
      getValue: (data: ReportData) => data.metrics?.engagementRate,
      desc: '% of engaged sessions',
      format: (val: any) => `${val?.toFixed(2) || 0}%`
    },
    bounceRate: {
      title: 'Bounce Rate',
      getValue: (data: ReportData) => data.metrics?.bounceRate || data.ga4Data?.bounceRate,
      desc: 'Single-page sessions (%)',
      format: (val: any) => `${val?.toFixed(2) || 0}%`
    },

    // Behavior Metrics (4)
    pagesPerSession: {
      title: 'Pages Per Session',
      getValue: (data: ReportData) => data.metrics?.pagesPerSession,
      desc: 'Avg pages viewed',
      format: (val: any) => val?.toFixed(2) || '0'
    },
    avgSessionDuration: {
      title: 'Session Duration',
      getValue: (data: ReportData) => data.metrics?.avgSessionDuration,
      desc: 'Average time on site',
      format: (val: any) => {
        const seconds = val || 0
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}m ${secs}s`
      }
    },
    pageViews: {
      title: 'Page Views',
      getValue: (data: ReportData) => data.metrics?.pageViews,
      desc: 'Total page views',
      format: (val: any) => val?.toLocaleString() || '0'
    },
    uniquePageViews: {
      title: 'Unique Page Views',
      getValue: (data: ReportData) => data.metrics?.uniquePageViews,
      desc: 'Unique page views',
      format: (val: any) => val?.toLocaleString() || '0'
    },

    // Conversion Metrics (3)
    conversions: {
      title: 'Conversions',
      getValue: (data: ReportData) => data.metrics?.conversions || data.ga4Data?.conversions,
      desc: 'Goal completions',
      format: (val: any) => val?.toLocaleString() || '0'
    },
    conversionRate: {
      title: 'Conversion Rate',
      getValue: (data: ReportData) => data.metrics?.conversionRate,
      desc: '% of sessions converting',
      format: (val: any) => `${val?.toFixed(2) || 0}%`
    },
    averageTimeOnPage: {
      title: 'Avg Time On Page',
      getValue: (data: ReportData) => data.metrics?.averageTimeOnPage,
      desc: 'Average page duration',
      format: (val: any) => {
        const seconds = val || 0
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}m ${secs}s`
      }
    },

    // Traffic Source Metrics (6)
    organicTraffic: {
      title: 'Organic Traffic',
      getValue: (data: ReportData) => data.metrics?.organicTraffic,
      desc: 'Search engine traffic',
      format: (val: any) => val?.toLocaleString() || '0'
    },
    directTraffic: {
      title: 'Direct Traffic',
      getValue: (data: ReportData) => data.metrics?.directTraffic,
      desc: 'Direct visits',
      format: (val: any) => val?.toLocaleString() || '0'
    },
    referralTraffic: {
      title: 'Referral Traffic',
      getValue: (data: ReportData) => data.metrics?.referralTraffic,
      desc: 'Traffic from other sites',
      format: (val: any) => val?.toLocaleString() || '0'
    },
    socialTraffic: {
      title: 'Social Traffic',
      getValue: (data: ReportData) => data.metrics?.socialTraffic,
      desc: 'Social media traffic',
      format: (val: any) => val?.toLocaleString() || '0'
    },
    emailTraffic: {
      title: 'Email Traffic',
      getValue: (data: ReportData) => data.metrics?.emailTraffic,
      desc: 'Email campaign traffic',
      format: (val: any) => val?.toLocaleString() || '0'
    },
    paidTraffic: {
      title: 'Paid Traffic',
      getValue: (data: ReportData) => data.metrics?.paidTraffic,
      desc: 'Paid advertising traffic',
      format: (val: any) => val?.toLocaleString() || '0'
    },

    // Device Metrics (3)
    mobileUsers: {
      title: 'Mobile Users',
      getValue: (data: ReportData) => data.metrics?.mobileUsers,
      desc: 'Mobile device users',
      format: (val: any) => val?.toLocaleString() || '0'
    },
    desktopUsers: {
      title: 'Desktop Users',
      getValue: (data: ReportData) => data.metrics?.desktopUsers,
      desc: 'Desktop computer users',
      format: (val: any) => val?.toLocaleString() || '0'
    },
    tabletUsers: {
      title: 'Tablet Users',
      getValue: (data: ReportData) => data.metrics?.tabletUsers,
      desc: 'Tablet device users',
      format: (val: any) => val?.toLocaleString() || '0'
    },

    // Additional Metric (1)
    exitRate: {
      title: 'Exit Rate',
      getValue: (data: ReportData) => data.metrics?.exitRate,
      desc: '% exits from pages',
      format: (val: any) => `${val?.toFixed(2) || 0}%`
    }
  }

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
        borderColor: lightTeal
      }
    ]

    if (data.reportType === 'executive') {
      return standardInsights.slice(0, 2) // Shorter for executive
    }

    standardInsights.push({
      title: 'Conversion Performance',
      text: `${data.ga4Data.conversions > 0 ? `Achieved ${formatNumber(data.ga4Data.conversions)} conversions during this period. Focus on scaling successful campaigns and optimizing conversion funnels.` : 'No conversions tracked. Implementing proper conversion tracking is crucial for measuring ROI and optimizing marketing efforts.'}`,
      bgColor: [240, 253, 250] as [number, number, number],
      borderColor: lightTeal
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

  // Custom Metrics Page Generator
  const generateCustomMetricsPage = (): { pageCount: number } => {
    if (!data.selectedMetrics || data.selectedMetrics.length === 0) {
      return { pageCount: 0 }
    }

    // Filter to only show selected metrics with data
    const metricsToShow = data.selectedMetrics
      .filter(metricKey => AVAILABLE_METRICS[metricKey])
      .map(metricKey => {
        const metric = AVAILABLE_METRICS[metricKey]
        if (!metric) return null
        const value = metric.getValue(data)
        return {
          title: metric.title,
          value: metric.format(value),
          desc: metric.desc,
          hasData: value !== undefined && value !== null
        }
      })
      .filter((m): m is NonNullable<typeof m> => m !== null && m.hasData)

    if (metricsToShow.length === 0) {
      return { pageCount: 0 }
    }

    doc.addPage()
    addPageHeader()
    
    // Page title
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryPurple)
    doc.text('Custom Analytics Report', margin, 40)
    
    // Underline
    doc.setDrawColor(...teal)
    doc.setLineWidth(1.5)
    doc.line(margin, 45, margin + 70, 45)

    // Adaptive grid layout based on metric count
    const metricCount = metricsToShow.length
    const columns = metricCount <= 4 ? 2 : metricCount <= 9 ? 3 : 4
    const cardWidth = (pageWidth - (2 * margin) - ((columns - 1) * 10)) / columns
    const cardHeight = 45
    
    let x = margin
    let y = 60
    let col = 0
    let currentPageNum = 2

    metricsToShow.forEach((metric, index) => {
      // Draw metric card
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
      doc.text(metric.value, x + 8, y + 28)
      
      doc.setFontSize(8)
      doc.setTextColor(...mediumGray)
      doc.text(metric.desc, x + 8, y + 36)
      
      // Grid positioning
      col++
      if (col >= columns) {
        col = 0
        x = margin
        y += cardHeight + 10
      } else {
        x += cardWidth + 10
      }
      
      // Handle page overflow
      if (y > pageHeight - 80 && index < metricsToShow.length - 1) {
        addFooter(currentPageNum, 4)
        doc.addPage()
        addPageHeader()
        currentPageNum++
        x = margin
        y = 60
        col = 0
      }
    })
    
    addFooter(currentPageNum, 4)
    return { pageCount: currentPageNum }
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

  // Separator line (teal for contrast)
  doc.setDrawColor(...teal)
  doc.setLineWidth(2)
  doc.line(pageWidth / 2 - 40, contentY + 105, pageWidth / 2 + 40, contentY + 105)

  // Generated date (medium gray)
  doc.setFontSize(11)
  doc.setTextColor(...mediumGray)
  doc.text(`Generated on ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, pageWidth / 2, contentY + 130, { align: 'center' })

  // ======================
  // PAGE 2: EXECUTIVE SUMMARY
  // ======================
  
  doc.addPage()
  addPageHeader()
  yPosition = 40

  // Page title
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...primaryPurple)
  doc.text('Executive Summary', margin, yPosition)
  yPosition += 5

  // Underline
  doc.setDrawColor(...teal)
  doc.setLineWidth(1.5)
  doc.line(margin, yPosition, margin + 50, yPosition)
  yPosition += 12

  // Subtitle
  doc.setFontSize(10)
  doc.setTextColor(...mediumGray)
  doc.setFont('helvetica', 'normal')
  doc.text(`Performance overview for ${formatDate(data.startDate)} to ${formatDate(data.endDate)}`, margin, yPosition)
  yPosition += 15

  // Metric Cards (2x2 grid) - REDUCED HEIGHT
  const cardWidth = (pageWidth - 3 * margin) / 2
  const cardHeight = 38 // Reduced from 45
  const cardSpacing = 8 // Reduced from 10

  const summaryMetrics: Array<{
    label: string
    value: string
    description: string
    color: [number, number, number]
  }> = [
    { 
      label: 'Total Users', 
      value: formatNumber(data.ga4Data.users),
      description: 'Unique website visitors',
      color: lightPurple
    },
    { 
      label: 'Total Sessions', 
      value: formatNumber(data.ga4Data.sessions),
      description: 'Website visits',
      color: lightPurple
    },
    { 
      label: 'Bounce Rate', 
      value: `${data.ga4Data.bounceRate.toFixed(2)}%`,
      description: 'Single-page sessions (%)',
      color: lightPurple
    },
    { 
      label: 'Conversions', 
      value: formatNumber(data.ga4Data.conversions),
      description: 'Goal completions',
      color: lightPurple
    }
  ]

  let cardX = margin
  let cardY = yPosition

  summaryMetrics.forEach((metric, index) => {
    // Card background
    doc.setFillColor(...metric.color)
    doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 3, 3, 'F')

    // Card border
    doc.setDrawColor(...primaryPurple)
    doc.setLineWidth(1)
    doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 3, 3, 'S')

    // Label
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryPurple)
    doc.text(metric.label, cardX + 6, cardY + 10)

    // Value
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...darkGray)
    doc.text(metric.value, cardX + 6, cardY + 24)

    // Description
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...mediumGray)
    doc.text(metric.description, cardX + 6, cardY + 32)

    // Move to next position
    if (index % 2 === 0) {
      cardX += cardWidth + cardSpacing
    } else {
      cardX = margin
      cardY += cardHeight + cardSpacing
    }
  })

  yPosition = cardY + cardHeight + 18 // Reduced spacing

  // Executive Summary now ends here - Key Insights moved to Page 3
  addFooter(1, 4)

  // ======================
  // PAGE 2: METRICS (Different by report type)
  // ======================
  
  let currentPageNumber = 2

  if (data.reportType === 'executive') {
    // Executive report: same as current page 1 summary, no additional metrics page needed
    // Skip metrics page for executive reports
  } else if (data.reportType === 'standard') {
    // Standard report: show standard metrics set (~10 metrics)
    doc.addPage()
    addPageHeader()
    
    // Page title
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryPurple)
    doc.text('Standard Analytics Report', margin, 40)
    
    // Underline
    doc.setDrawColor(...teal)
    doc.setLineWidth(1.5)
    doc.line(margin, 45, margin + 70, 45)

    // Standard metrics (2x5 grid)
    const standardMetrics = ['users', 'sessions', 'bounceRate', 'conversions', 'pagesPerSession', 'avgSessionDuration', 'newUsers', 'organicTraffic', 'engagementRate', 'conversionRate']
    const metricsToShow = standardMetrics
      .filter(metricKey => AVAILABLE_METRICS[metricKey])
      .map(metricKey => {
        const metric = AVAILABLE_METRICS[metricKey]
        if (!metric) return null
        const value = metric.getValue(data)
        return {
          title: metric.title,
          value: metric.format(value),
          desc: metric.desc,
          hasData: value !== undefined && value !== null
        }
      })
      .filter((m): m is NonNullable<typeof m> => m !== null && m.hasData)
      .slice(0, 10) // Limit to 10 for standard

    const columns = 2
    const cardWidth = (pageWidth - (2 * margin) - ((columns - 1) * 10)) / columns
    const cardHeight = 45
    
    let x = margin
    let y = 60
    let col = 0

    metricsToShow.forEach((metric, index) => {
      // Draw metric card
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
      doc.text(metric.value, x + 8, y + 28)
      
      doc.setFontSize(8)
      doc.setTextColor(...mediumGray)
      doc.text(metric.desc, x + 8, y + 36)
      
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
    
    addFooter(2, 4)
  } else if (data.reportType === 'custom') {
    // Custom report: show only selected metrics
    const customPageResult = generateCustomMetricsPage()
    currentPageNumber = customPageResult.pageCount
  }

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
  doc.setDrawColor(...teal)
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

  const insightsPageNum = data.reportType === 'executive' ? 2 : (data.reportType === 'custom' && currentPageNumber > 2) ? currentPageNumber + 1 : 3
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

  doc.setDrawColor(...teal)
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

  const finalPageNum = data.reportType === 'executive' ? 3 : 4
  addFooter(finalPageNum, 4)


  return doc.output('arraybuffer')
}

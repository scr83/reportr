import { jsPDF } from 'jspdf'

interface ReportData {
  clientName: string
  startDate: string
  endDate: string
  agencyName?: string
  agencyLogo?: string
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
}

export function generatePDFWithJsPDF(data: ReportData): ArrayBuffer {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  const margin = 20
  let yPosition = margin

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

  const agencyName = data.agencyName || 'SEO Agency'

  // Helper function to add text with word wrap
  const addText = (text: string, x: number, y: number, maxWidth: number = pageWidth - 2 * margin): number => {
    const splitText = doc.splitTextToSize(text, maxWidth)
    doc.text(splitText, x, y)
    return y + (splitText.length * 7)
  }

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace: number): number => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage()
      return margin
    }
    return yPosition
  }

  // Cover Page
  // Background color for header
  doc.setFillColor(99, 102, 241) // #6366f1
  doc.rect(0, 0, pageWidth, 80, 'F')

  // Title
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.text('SEO Performance Report', pageWidth / 2, 35, { align: 'center' })

  // Client name
  doc.setFontSize(20)
  doc.text(data.clientName, pageWidth / 2, 55, { align: 'center' })

  // Reset text color
  doc.setTextColor(0, 0, 0)
  yPosition = 100

  // Date range
  doc.setFontSize(14)
  doc.setFont('helvetica', 'normal')
  yPosition = addText(`Report Period: ${formatDate(data.startDate)} - ${formatDate(data.endDate)}`, margin, yPosition)
  yPosition += 10

  // Agency name
  doc.setFontSize(12)
  yPosition = addText(`Prepared by: ${agencyName}`, margin, yPosition)
  yPosition += 20

  // Executive Summary
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  yPosition = addText('Executive Summary', margin, yPosition)
  yPosition += 10

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  const summaryText = `This comprehensive SEO report provides insights into your website's search performance for the period from ${formatDate(data.startDate)} to ${formatDate(data.endDate)}. The analysis includes data from Google Search Console and Google Analytics 4, offering a complete view of your organic search presence and user engagement metrics.`
  yPosition = addText(summaryText, margin, yPosition)
  yPosition += 20

  // New page for metrics
  doc.addPage()
  yPosition = margin

  // Google Search Console Section
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(99, 102, 241)
  yPosition = addText('Google Search Console', margin, yPosition)
  yPosition += 15

  doc.setTextColor(0, 0, 0)

  // GSC Metrics in a grid
  const metrics = [
    { label: 'Total Clicks', value: formatNumber(data.gscData.clicks) },
    { label: 'Total Impressions', value: formatNumber(data.gscData.impressions) },
    { label: 'Average CTR', value: `${data.gscData.ctr.toFixed(2)}%` },
    { label: 'Average Position', value: data.gscData.position.toFixed(1) }
  ]

  // Draw metric boxes
  const boxWidth = (pageWidth - 3 * margin) / 2
  const boxHeight = 40
  let currentRow = 0
  let currentCol = 0

  metrics.forEach((metric, index) => {
    const x = margin + currentCol * (boxWidth + margin / 2)
    const y = yPosition + currentRow * (boxHeight + 10)

    // Box border
    doc.setDrawColor(99, 102, 241)
    doc.setLineWidth(0.5)
    doc.rect(x, y, boxWidth, boxHeight)

    // Metric label
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 116, 139)
    doc.text(metric.label.toUpperCase(), x + 5, y + 12)

    // Metric value
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30, 41, 59)
    doc.text(metric.value, x + 5, y + 28)

    currentCol++
    if (currentCol >= 2) {
      currentCol = 0
      currentRow++
    }
  })

  yPosition += (Math.ceil(metrics.length / 2) * (boxHeight + 10)) + 20

  // Top Keywords Table
  if (data.gscData.topQueries && data.gscData.topQueries.length > 0) {
    yPosition = checkNewPage(100)
    
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(99, 102, 241)
    yPosition = addText('Top Performing Keywords', margin, yPosition)
    yPosition += 15

    // Table header
    doc.setFillColor(99, 102, 241)
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 15, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Keyword', margin + 5, yPosition + 10)
    doc.text('Clicks', margin + 80, yPosition + 10)
    doc.text('Impressions', margin + 110, yPosition + 10)
    doc.text('CTR', margin + 150, yPosition + 10)
    doc.text('Position', margin + 170, yPosition + 10)

    yPosition += 15

    // Table rows
    doc.setTextColor(0, 0, 0)
    doc.setFont('helvetica', 'normal')
    
    data.gscData.topQueries.slice(0, 8).forEach((query, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(248, 250, 252)
        doc.rect(margin, yPosition, pageWidth - 2 * margin, 12, 'F')
      }

      doc.setFontSize(9)
      // Truncate long keywords
      const truncatedQuery = query.query.length > 25 ? query.query.substring(0, 25) + '...' : query.query
      doc.text(truncatedQuery, margin + 5, yPosition + 8)
      doc.text(formatNumber(query.clicks), margin + 80, yPosition + 8)
      doc.text(formatNumber(query.impressions), margin + 110, yPosition + 8)
      doc.text(`${query.ctr.toFixed(1)}%`, margin + 150, yPosition + 8)
      doc.text(query.position.toFixed(1), margin + 170, yPosition + 8)

      yPosition += 12
    })

    yPosition += 20
  }

  // New page for GA4
  doc.addPage()
  yPosition = margin

  // Google Analytics 4 Section
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(99, 102, 241)
  yPosition = addText('Google Analytics 4', margin, yPosition)
  yPosition += 15

  doc.setTextColor(0, 0, 0)

  // GA4 Metrics
  const ga4Metrics = [
    { label: 'Total Users', value: formatNumber(data.ga4Data.users) },
    { label: 'Total Sessions', value: formatNumber(data.ga4Data.sessions) },
    { label: 'Bounce Rate', value: `${data.ga4Data.bounceRate.toFixed(1)}%` },
    { label: 'Conversions', value: formatNumber(data.ga4Data.conversions) }
  ]

  // Draw GA4 metric boxes
  currentRow = 0
  currentCol = 0

  ga4Metrics.forEach((metric, index) => {
    const x = margin + currentCol * (boxWidth + margin / 2)
    const y = yPosition + currentRow * (boxHeight + 10)

    // Box border
    doc.setDrawColor(99, 102, 241)
    doc.setLineWidth(0.5)
    doc.rect(x, y, boxWidth, boxHeight)

    // Metric label
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 116, 139)
    doc.text(metric.label.toUpperCase(), x + 5, y + 12)

    // Metric value
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30, 41, 59)
    doc.text(metric.value, x + 5, y + 28)

    currentCol++
    if (currentCol >= 2) {
      currentCol = 0
      currentRow++
    }
  })

  yPosition += (Math.ceil(ga4Metrics.length / 2) * (boxHeight + 10)) + 30

  // Key Insights
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(99, 102, 241)
  yPosition = addText('Key Performance Insights', margin, yPosition)
  yPosition += 15

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)

  const insights = [
    `Your website received ${formatNumber(data.gscData.clicks)} clicks from search results`,
    `Search visibility reached ${formatNumber(data.gscData.impressions)} impressions`,
    `Average click-through rate of ${data.gscData.ctr.toFixed(2)}% indicates good search appeal`,
    `User engagement shows ${formatNumber(data.ga4Data.users)} unique visitors`,
    `Conversion performance delivered ${formatNumber(data.ga4Data.conversions)} goal completions`
  ]

  insights.forEach((insight, index) => {
    doc.text(`• ${insight}`, margin + 5, yPosition)
    yPosition += 12
  })

  // Footer
  yPosition = pageHeight - margin
  doc.setFontSize(9)
  doc.setTextColor(100, 116, 139)
  doc.text(`Generated on ${new Date().toLocaleDateString()} | ${agencyName}`, pageWidth / 2, yPosition, { align: 'center' })
  doc.text('This report contains confidential and proprietary information', pageWidth / 2, yPosition + 8, { align: 'center' })

  return doc.output('arraybuffer')
}
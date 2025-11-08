import React from 'react'
import { Page, View, Text } from '@react-pdf/renderer'
import { PDFTemplateProps } from '@/types/report'
import { BaseTemplate, createPDFStyles, createStyleSheet } from '../BaseTemplate'
import { CoverPage } from '../components/CoverPage'
import { ReportHeader } from '../components/ReportHeader'
import { ReportFooter } from '../components/ReportFooter'
import { MetricGrid } from '../components/MetricCard'
import { SectionTitle, InsightBox } from '../components/SectionTitle'
import { GSCPerformancePage } from '../components/GSCPerformancePage'

export function ExecutiveSummaryTemplate({ data }: PDFTemplateProps) {
  const pdfStyles = createPDFStyles(data.branding)
  const styles = createStyleSheet(pdfStyles)
  
  // Format date range for cover page
  const dateRange = `${data.startDate} to ${data.endDate}`
  
  // Helper function for PageSpeed score color coding
  const getScoreColor = (score: number): string => {
    if (score >= 90) return '#10b981' // green
    if (score >= 50) return '#f59e0b' // orange
    return '#ef4444' // red
  }
  
  // Prepare metrics for the executive summary (4 key metrics + PageSpeed if available)
  const baseMetrics = [
    {
      title: 'Total Users',
      value: data.metrics?.users || 0,
      description: 'Unique website visitors'
    },
    {
      title: 'Total Sessions',
      value: data.metrics?.sessions || 0,
      description: 'Website visits'
    },
    {
      title: 'Bounce Rate',
      value: data.metrics?.bounceRate || 0,
      description: 'Single-page sessions (%)'
    },
    {
      title: 'Conversions',
      value: data.metrics?.conversions || 0,
      description: 'Goal completions'
    }
  ]

  // Add PageSpeed metrics if available
  const keyMetrics = data.pageSpeedData ? [
    ...baseMetrics,
    {
      title: 'Mobile Speed',
      value: `${data.pageSpeedData.mobile.score}/100`,
      description: 'PageSpeed mobile performance',
      color: getScoreColor(data.pageSpeedData.mobile.score)
    },
    {
      title: 'Desktop Speed',
      value: `${data.pageSpeedData.desktop.score}/100`,
      description: 'PageSpeed desktop performance',
      color: getScoreColor(data.pageSpeedData.desktop.score)
    }
  ] : baseMetrics
  
  // Calculate some basic insights
  const bounceRate = data.metrics?.bounceRate || 0
  const sessions = data.metrics?.sessions || 0
  const users = data.metrics?.users || 0
  
  const getBounceRateInsight = () => {
    if (bounceRate < 20) return { type: 'success' as const, message: 'Excellent user engagement with very low bounce rate.' }
    if (bounceRate < 40) return { type: 'success' as const, message: 'Good user engagement with acceptable bounce rate.' }
    if (bounceRate < 60) return { type: 'warning' as const, message: 'Average bounce rate - consider improving page content.' }
    return { type: 'error' as const, message: 'High bounce rate indicates potential user experience issues.' }
  }
  
  const bounceInsight = getBounceRateInsight()
  
  return (
    <BaseTemplate branding={data.branding} title={`Executive Summary - ${data.clientName}`}>
      {/* Page 1: Cover Page */}
      <CoverPage
        clientName={data.clientName}
        reportType={data.reportType}
        dateRange={dateRange}
        branding={data.branding}
      />
      
      {/* Page 2: Executive Summary */}
      <Page size="A4" style={styles.page}>
        <ReportHeader
          branding={data.branding}
          clientName={data.clientName}
          title="Executive Summary"
        />
        
        <View style={styles.container}>
          {/* Executive Summary Header */}
          <SectionTitle
            title="Executive Summary"
            subtitle={`Performance overview for ${dateRange}`}
            branding={data.branding}
            marginTop={0}
          />
          
          {/* Key Performance Metrics */}
          <MetricGrid
            metrics={keyMetrics}
            branding={data.branding}
            columns={data.pageSpeedData ? 3 : 2}
          />
          
          {/* Performance Insights */}
          <SectionTitle
            title="Key Insights"
            branding={data.branding}
            marginTop={32}
            marginBottom={16}
          />
          
          {/* Traffic Overview */}
          <InsightBox
            title="Traffic Overview"
            content={`Your website received ${users} unique visitors across ${sessions} sessions during this period. ${sessions > users ? 'Visitors are returning to your site, indicating good content quality.' : 'Most traffic consists of new visitors, presenting growth opportunities.'}`}
            type="info"
            branding={data.branding}
          />
          
          {/* Bounce Rate Analysis */}
          <InsightBox
            title="User Engagement"
            content={bounceInsight.message}
            type={bounceInsight.type}
            branding={data.branding}
          />
          
          {/* Conversion Performance */}
          <InsightBox
            title="Conversion Performance"
            content={data.metrics?.conversions ? 
              `Great! You achieved ${data.metrics.conversions} conversions during this period. Continue optimizing high-performing pages.` :
              'No conversions were tracked during this period. Consider setting up goal tracking in Google Analytics to measure success.'
            }
            type={data.metrics?.conversions ? 'success' : 'warning'}
            branding={data.branding}
          />

          {/* PageSpeed Performance */}
          {data.pageSpeedData ? (
            <InsightBox
              title="Website Performance"
              content={`Your website scores ${data.pageSpeedData.mobile.score}/100 on mobile and ${data.pageSpeedData.desktop.score}/100 on desktop performance. ${
                Math.min(data.pageSpeedData.mobile.score, data.pageSpeedData.desktop.score) >= 90 
                  ? 'Excellent performance! Your site loads quickly for users.'
                  : Math.min(data.pageSpeedData.mobile.score, data.pageSpeedData.desktop.score) >= 50
                  ? 'Good performance with room for optimization. Consider improving loading speed.'
                  : 'Performance needs attention. Slow loading speeds may impact user experience and SEO rankings.'
              }`}
              type={
                Math.min(data.pageSpeedData.mobile.score, data.pageSpeedData.desktop.score) >= 90 
                  ? 'success' 
                  : Math.min(data.pageSpeedData.mobile.score, data.pageSpeedData.desktop.score) >= 50
                  ? 'warning'
                  : 'error'
              }
              branding={data.branding}
            />
          ) : (
            <InsightBox
              title="Website Performance"
              content="⚠️ Performance data temporarily unavailable. PageSpeed Insights could not be retrieved at this time."
              type="warning"
              branding={data.branding}
            />
          )}
        </View>
        
        <ReportFooter
          branding={data.branding}
          pageNumber={1}
          totalPages={3}
        />
      </Page>
      
      {/* Page 3: GSC Performance Charts */}
      {data.gscData && data.gscData.dailyData && data.gscData.dailyData.length > 0 && (
        <GSCPerformancePage
          gscData={data.gscData}
          branding={data.branding}
          clientName={data.clientName}
          pageNumber={2}
          totalPages={3}
        />
      )}
      
      {/* Page 4: Recommendations */}
      <Page size="A4" style={styles.page}>
        <ReportHeader
          branding={data.branding}
          clientName={data.clientName}
          title="Recommendations"
        />
        
        <View style={styles.container}>
          <SectionTitle
            title="Strategic Recommendations"
            subtitle="Next steps to improve your digital performance"
            branding={data.branding}
            marginTop={0}
          />
          
          {/* Recommendations based on data */}
          <View style={{ marginBottom: 24 }}>
            <Text style={[styles.h3, { marginBottom: 16 }]}>
              Priority Actions
            </Text>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={[styles.h4, { color: pdfStyles.colors.primary, marginBottom: 8 }]}>
                1. {bounceRate > 50 ? 'Improve User Experience' : 'Enhance Conversion Tracking'}
              </Text>
              <Text style={styles.body}>
                {bounceRate > 50 ? 
                  'Focus on improving page loading speed, mobile responsiveness, and content relevance to reduce bounce rate.' :
                  'Set up detailed conversion tracking to measure the effectiveness of your marketing efforts.'
                }
              </Text>
            </View>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={[styles.h4, { color: pdfStyles.colors.primary, marginBottom: 8 }]}>
                2. {sessions < 50 ? 'Increase Traffic Volume' : 'Optimize Conversion Funnel'}
              </Text>
              <Text style={styles.body}>
                {sessions < 50 ? 
                  'Implement SEO optimization and content marketing strategies to increase organic traffic.' :
                  'Focus on improving the user journey and conversion funnel to maximize results from existing traffic.'
                }
              </Text>
            </View>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={[styles.h4, { color: pdfStyles.colors.primary, marginBottom: 8 }]}>
                3. Regular Monitoring
              </Text>
              <Text style={styles.body}>
                Establish monthly reporting to track progress and identify trends early. Monitor key metrics consistently.
              </Text>
            </View>
          </View>
          
          {/* Next Steps */}
          <View style={[styles.card, { backgroundColor: `${pdfStyles.colors.secondary}20`, padding: 20 }]}>
            <Text style={[styles.h3, { color: pdfStyles.colors.primary, marginBottom: 12 }]}>
              Next Steps
            </Text>
            <Text style={[styles.body, { marginBottom: 8 }]}>
              • Schedule monthly performance reviews
            </Text>
            <Text style={[styles.body, { marginBottom: 8 }]}>
              • Implement recommended optimizations
            </Text>
            <Text style={[styles.body, { marginBottom: 8 }]}>
              • Set up automated monitoring alerts
            </Text>
            <Text style={styles.body}>
              • Plan quarterly strategy adjustments
            </Text>
          </View>
          
          {/* Contact CTA */}
          <View style={{ marginTop: 32, textAlign: 'center' }}>
            <Text style={[styles.body, { color: pdfStyles.colors.textLight }]}>
              Questions about this report? Contact {data.branding.companyName}
            </Text>
            <Text style={[styles.bodySmall, { color: pdfStyles.colors.primary, marginTop: 4 }]}>
              {data.branding.email} • {data.branding.phone}
            </Text>
          </View>
        </View>
        
        <ReportFooter
          branding={data.branding}
          pageNumber={3}
          totalPages={3}
        />
      </Page>
    </BaseTemplate>
  )
}
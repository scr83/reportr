import React from 'react'
import { Page, View, Text } from '@react-pdf/renderer'
import { PDFTemplateProps } from '@/types/report'
import { BaseTemplate, createPDFStyles, createStyleSheet } from '../BaseTemplate'
import { CoverPage } from '../components/CoverPage'
import { ReportHeader } from '../components/ReportHeader'
import { ReportFooter } from '../components/ReportFooter'
import { MetricGrid } from '../components/MetricCard'
import { DataTable } from '../components/DataTable'
import { SectionTitle, InsightBox } from '../components/SectionTitle'

export function CustomReportTemplate({ data }: PDFTemplateProps) {
  const pdfStyles = createPDFStyles(data.branding)
  const styles = createStyleSheet(pdfStyles)
  
  // Format date range for cover page
  const dateRange = `${data.startDate} to ${data.endDate}`
  
  // Get selected metrics and organize them
  const selectedMetrics = data.selectedMetrics || []
  
  // Define all available metrics with their sources
  const allMetrics = {
    // Basic metrics
    users: { value: data.ga4Data?.users || 0, title: 'Total Users', description: 'Unique website visitors', source: 'ga4' },
    sessions: { value: data.ga4Data?.sessions || 0, title: 'Total Sessions', description: 'Website visits', source: 'ga4' },
    bounceRate: { value: data.ga4Data?.bounceRate || 0, title: 'Bounce Rate', description: 'Single-page sessions (%)', source: 'ga4' },
    conversions: { value: data.ga4Data?.conversions || 0, title: 'Conversions', description: 'Goal completions', source: 'ga4' },
    
    // Advanced GA4 metrics
    avgSessionDuration: { 
      value: `${Math.floor((data.ga4Data?.avgSessionDuration || 0) / 60)}m ${Math.floor((data.ga4Data?.avgSessionDuration || 0) % 60)}s`, 
      title: 'Avg Session Duration', 
      description: 'Time spent on site', 
      source: 'ga4' 
    },
    pagesPerSession: { value: data.ga4Data?.pagesPerSession?.toFixed(1) || '0.0', title: 'Pages per Session', description: 'Page views per visit', source: 'ga4' },
    newUsers: { value: data.ga4Data?.newUsers || 0, title: 'New Users', description: 'First-time visitors', source: 'ga4' },
    organicTraffic: { value: data.ga4Data?.organicTraffic || 0, title: 'Organic Traffic', description: 'Search engine traffic (%)', source: 'ga4' },
    
    // Search Console metrics
    totalClicks: { value: data.gscData?.totalClicks || 0, title: 'Total Clicks', description: 'Clicks from search results', source: 'gsc' },
    totalImpressions: { value: data.gscData?.totalImpressions || 0, title: 'Total Impressions', description: 'Times shown in search results', source: 'gsc' },
    averageCTR: { value: data.gscData?.averageCTR || 0, title: 'Average CTR', description: 'Click-through rate (%)', source: 'gsc' },
    averagePosition: { value: data.gscData?.averagePosition?.toFixed(1) || '0.0', title: 'Average Position', description: 'Average ranking position', source: 'gsc' }
  }
  
  // Filter metrics based on selection
  const displayMetrics = selectedMetrics
    .filter(metricKey => allMetrics[metricKey as keyof typeof allMetrics])
    .map(metricKey => {
      const metric = allMetrics[metricKey as keyof typeof allMetrics]
      return {
        title: metric.title,
        value: metric.value,
        description: metric.description,
        source: metric.source
      }
    })
  
  // Group metrics by source
  const ga4Metrics = displayMetrics.filter(m => m.source === 'ga4')
  const gscMetrics = displayMetrics.filter(m => m.source === 'gsc')
  
  // Calculate number of pages needed
  const metricsPerPage = 8
  const totalPages = Math.max(
    3, // Minimum 3 pages (cover + summary + contact)
    Math.ceil(displayMetrics.length / metricsPerPage) + 2
  )
  
  // Determine if we should show detailed data tables
  const showTopQueries = selectedMetrics.includes('totalClicks') || selectedMetrics.includes('totalImpressions')
  const showTopPages = selectedMetrics.includes('users') || selectedMetrics.includes('sessions')
  const showDeviceData = selectedMetrics.includes('sessions')
  
  return (
    <BaseTemplate branding={data.branding} title={`Custom Report - ${data.clientName}`}>
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
          pageTitle="Custom Report Overview"
        />
        
        <View style={styles.container}>
          <SectionTitle
            title="Custom Report Overview"
            subtitle={`Selected metrics for ${dateRange}`}
            branding={data.branding}
            marginTop={0}
          />
          
          {/* Show first set of metrics */}
          <MetricGrid
            metrics={displayMetrics.slice(0, 4).map(m => ({
              title: m.title,
              value: m.value,
              description: m.description
            }))}
            branding={data.branding}
            columns={2}
          />
          
          {/* Report Configuration */}
          <SectionTitle
            title="Report Configuration"
            branding={data.branding}
            marginTop={32}
          />
          
          <View style={[styles.card, { padding: 16 }]}>
            <Text style={[styles.h4, { marginBottom: 12 }]}>Selected Metrics ({selectedMetrics.length})</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {selectedMetrics.map((metric, index) => (
                <View key={metric} style={{
                  backgroundColor: `${pdfStyles.colors.primary}20`,
                  borderRadius: 4,
                  padding: '4px 8px',
                  marginRight: 8,
                  marginBottom: 4
                }}>
                  <Text style={[styles.bodySmall, { color: pdfStyles.colors.primary }]}>
                    {allMetrics[metric as keyof typeof allMetrics]?.title || metric}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* Quick insights based on selected metrics */}
          <InsightBox
            title="Report Focus"
            content={`This custom report focuses on ${selectedMetrics.length} selected metrics across ${gscMetrics.length > 0 ? 'search console' : ''}${gscMetrics.length > 0 && ga4Metrics.length > 0 ? ' and ' : ''}${ga4Metrics.length > 0 ? 'website analytics' : ''}. Review the detailed sections below for comprehensive analysis.`}
            type="info"
            branding={data.branding}
          />
        </View>
        
        <ReportFooter
          branding={data.branding}
          pageNumber={1}
          totalPages={totalPages}
        />
      </Page>
      
      {/* Page 3+: Detailed Metrics Pages */}
      {displayMetrics.length > 4 && (
        <Page size="A4" style={styles.page}>
          <ReportHeader
            branding={data.branding}
            clientName={data.clientName}
            pageTitle="Detailed Metrics"
          />
          
          <View style={styles.container}>
            <SectionTitle
              title="Detailed Performance Metrics"
              subtitle="Complete view of your selected KPIs"
              branding={data.branding}
              marginTop={0}
            />
            
            {/* Show remaining metrics */}
            <MetricGrid
              metrics={displayMetrics.slice(4).map(m => ({
                title: m.title,
                value: m.value,
                description: m.description
              }))}
              branding={data.branding}
              columns={2}
            />
            
            {/* Performance Analysis */}
            <SectionTitle
              title="Performance Analysis"
              branding={data.branding}
              marginTop={32}
            />
            
            {ga4Metrics.length > 0 && (
              <InsightBox
                title="Website Performance"
                content={`Your website analytics show ${data.ga4Data?.users || 0} users across ${data.ga4Data?.sessions || 0} sessions with a ${(data.ga4Data?.bounceRate || 0).toFixed(1)}% bounce rate. This indicates ${(data.ga4Data?.bounceRate || 0) < 40 ? 'excellent' : (data.ga4Data?.bounceRate || 0) < 60 ? 'good' : 'average'} user engagement levels.`}
                type={(data.ga4Data?.bounceRate || 0) < 40 ? 'success' : (data.ga4Data?.bounceRate || 0) < 60 ? 'info' : 'warning'}
                branding={data.branding}
              />
            )}
            
            {gscMetrics.length > 0 && (
              <InsightBox
                title="Search Visibility"
                content={`Your search performance generated ${data.gscData?.totalClicks || 0} clicks from ${data.gscData?.totalImpressions || 0} impressions, achieving a ${(data.gscData?.averageCTR || 0).toFixed(2)}% CTR with an average position of ${(data.gscData?.averagePosition || 0).toFixed(1)}.`}
                type="info"
                branding={data.branding}
              />
            )}
          </View>
          
          <ReportFooter
            branding={data.branding}
            pageNumber={2}
            totalPages={totalPages}
          />
        </Page>
      )}
      
      {/* Additional Data Pages (if relevant data selected) */}
      {(showTopQueries || showTopPages || showDeviceData) && (
        <Page size="A4" style={styles.page}>
          <ReportHeader
            branding={data.branding}
            clientName={data.clientName}
            pageTitle="Detailed Data Analysis"
          />
          
          <View style={styles.container}>
            <SectionTitle
              title="Detailed Data Analysis"
              subtitle="Breakdown of top-performing elements"
              branding={data.branding}
              marginTop={0}
            />
            
            {/* Top Queries (if search console metrics selected) */}
            {showTopQueries && data.gscData?.topQueries && data.gscData.topQueries.length > 0 && (
              <DataTable
                title="Top Performing Keywords"
                headers={['Query', 'Clicks', 'Impressions', 'CTR (%)', 'Position']}
                rows={data.gscData.topQueries.map(query => ({
                  query: query.query,
                  clicks: query.clicks,
                  impressions: query.impressions,
                  'ctr (%)': typeof query.ctr === 'number' ? query.ctr.toFixed(2) : parseFloat(query.ctr || '0').toFixed(2),
                  position: typeof query.position === 'number' ? query.position.toFixed(1) : parseFloat(query.position || '0').toFixed(1)
                }))}
                maxRows={6}
                branding={data.branding}
              />
            )}
            
            {/* Top Landing Pages (if analytics metrics selected) */}
            {showTopPages && data.ga4Data?.topLandingPages && data.ga4Data.topLandingPages.length > 0 && (
              <DataTable
                title="Top Landing Pages"
                headers={['Page', 'Sessions', 'Users', 'Bounce Rate (%)']}
                rows={data.ga4Data.topLandingPages.map(page => ({
                  page: page.page,
                  sessions: page.sessions,
                  users: page.users,
                  'bounce rate (%)': typeof page.bounceRate === 'number' ? page.bounceRate.toFixed(1) : parseFloat(page.bounceRate || '0').toFixed(1)
                }))}
                maxRows={5}
                branding={data.branding}
              />
            )}
            
            {/* Device Breakdown (if sessions selected) */}
            {showDeviceData && data.ga4Data?.deviceBreakdown && (
              <View style={{ marginTop: 24 }}>
                <Text style={[styles.h3, { marginBottom: 16 }]}>Device Distribution</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={[styles.metricCard, { width: '31%' }]}>
                    <Text style={[styles.h4, { color: pdfStyles.colors.primary, marginBottom: 8 }]}>
                      Desktop
                    </Text>
                    <Text style={[styles.h2, { marginBottom: 4 }]}>
                      {data.ga4Data.deviceBreakdown.desktop}
                    </Text>
                    <Text style={[styles.bodySmall, { color: pdfStyles.colors.textLight }]}>
                      sessions
                    </Text>
                  </View>
                  <View style={[styles.metricCard, { width: '31%' }]}>
                    <Text style={[styles.h4, { color: pdfStyles.colors.secondary, marginBottom: 8 }]}>
                      Mobile
                    </Text>
                    <Text style={[styles.h2, { marginBottom: 4 }]}>
                      {data.ga4Data.deviceBreakdown.mobile}
                    </Text>
                    <Text style={[styles.bodySmall, { color: pdfStyles.colors.textLight }]}>
                      sessions
                    </Text>
                  </View>
                  <View style={[styles.metricCard, { width: '31%' }]}>
                    <Text style={[styles.h4, { color: pdfStyles.colors.accent, marginBottom: 8 }]}>
                      Tablet
                    </Text>
                    <Text style={[styles.h2, { marginBottom: 4 }]}>
                      {data.ga4Data.deviceBreakdown.tablet}
                    </Text>
                    <Text style={[styles.bodySmall, { color: pdfStyles.colors.textLight }]}>
                      sessions
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          
          <ReportFooter
            branding={data.branding}
            pageNumber={totalPages - 1}
            totalPages={totalPages}
          />
        </Page>
      )}
      
      {/* Final Page: Summary & Contact */}
      <Page size="A4" style={styles.page}>
        <ReportHeader
          branding={data.branding}
          clientName={data.clientName}
          pageTitle="Report Summary"
        />
        
        <View style={styles.container}>
          <SectionTitle
            title="Custom Report Summary"
            subtitle="Key takeaways from your selected metrics"
            branding={data.branding}
            marginTop={0}
          />
          
          {/* Key Findings */}
          <View style={[styles.card, { 
            backgroundColor: `${pdfStyles.colors.primary}20`, 
            padding: 20,
            marginBottom: 24 
          }]}>
            <Text style={[styles.h3, { color: pdfStyles.colors.primary, marginBottom: 16 }]}>
              Key Findings
            </Text>
            
            {ga4Metrics.length > 0 && (
              <Text style={[styles.body, { marginBottom: 12 }]}>
                • Your website attracted {data.ga4Data?.users || 0} users with {(data.ga4Data?.bounceRate || 0).toFixed(1)}% bounce rate
              </Text>
            )}
            
            {gscMetrics.length > 0 && (
              <Text style={[styles.body, { marginBottom: 12 }]}>
                • Search visibility generated {data.gscData?.totalClicks || 0} clicks from {data.gscData?.totalImpressions || 0} impressions
              </Text>
            )}
            
            <Text style={[styles.body, { marginBottom: 12 }]}>
              • This custom report analyzed {selectedMetrics.length} key performance indicators
            </Text>
            
            <Text style={styles.body}>
              • Data collected from {dateRange} provides actionable insights for optimization
            </Text>
          </View>
          
          {/* Recommendations */}
          <SectionTitle
            title="Recommendations"
            branding={data.branding}
          />
          
          <View style={{ marginBottom: 24 }}>
            <Text style={[styles.h4, { color: pdfStyles.colors.primary, marginBottom: 8 }]}>
              1. Focus on High-Impact Metrics
            </Text>
            <Text style={[styles.body, { marginBottom: 12 }]}>
              Prioritize optimization efforts on the metrics showing the greatest potential for improvement.
            </Text>
            
            <Text style={[styles.h4, { color: pdfStyles.colors.primary, marginBottom: 8 }]}>
              2. Regular Monitoring
            </Text>
            <Text style={[styles.body, { marginBottom: 12 }]}>
              Schedule monthly reviews of these custom metrics to track progress and identify trends.
            </Text>
            
            <Text style={[styles.h4, { color: pdfStyles.colors.primary, marginBottom: 8 }]}>
              3. Data-Driven Decisions
            </Text>
            <Text style={styles.body}>
              Use these metrics to guide strategic decisions and measure the success of optimization efforts.
            </Text>
          </View>
          
          {/* Contact Information */}
          <View style={[styles.card, { 
            border: `2px solid ${pdfStyles.colors.primary}`,
            padding: 20,
            textAlign: 'center'
          }]}>
            <Text style={[styles.h3, { color: pdfStyles.colors.primary, marginBottom: 12 }]}>
              Need Help Interpreting This Data?
            </Text>
            <Text style={[styles.body, { marginBottom: 8 }]}>
              Contact {data.branding.name} for detailed analysis and strategic recommendations
            </Text>
            <Text style={[styles.h4, { color: pdfStyles.colors.primary, marginBottom: 4 }]}>
              {data.branding.email}
            </Text>
            <Text style={[styles.h4, { color: pdfStyles.colors.primary }]}>
              {data.branding.phone}
            </Text>
          </View>
        </View>
        
        <ReportFooter
          branding={data.branding}
          pageNumber={totalPages}
          totalPages={totalPages}
        />
      </Page>
    </BaseTemplate>
  )
}
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

export function StandardReportTemplate({ data }: PDFTemplateProps) {
  const pdfStyles = createPDFStyles(data.branding)
  const styles = createStyleSheet(pdfStyles)
  
  // Format date range for cover page
  const dateRange = `${data.startDate} to ${data.endDate}`
  
  // Prepare executive summary metrics
  const executiveMetrics = [
    {
      title: 'Total Users',
      value: data.ga4Data?.users || 0,
      description: 'Unique website visitors'
    },
    {
      title: 'Total Sessions',
      value: data.ga4Data?.sessions || 0,
      description: 'Website visits'
    },
    {
      title: 'Bounce Rate',
      value: data.ga4Data?.bounceRate || 0,
      description: 'Single-page sessions (%)'
    },
    {
      title: 'Conversions',
      value: data.ga4Data?.conversions || 0,
      description: 'Goal completions'
    }
  ]
  
  // Prepare Search Console metrics
  const gscMetrics = [
    {
      title: 'Total Clicks',
      value: data.gscData?.totalClicks || 0,
      description: 'Clicks from search results'
    },
    {
      title: 'Total Impressions',
      value: data.gscData?.totalImpressions || 0,
      description: 'Times shown in search results'
    },
    {
      title: 'Average CTR',
      value: data.gscData?.averageCTR || 0,
      description: 'Click-through rate (%)'
    },
    {
      title: 'Average Position',
      value: data.gscData?.averagePosition || 0,
      description: 'Average ranking position'
    }
  ]
  
  // Prepare Analytics metrics
  const analyticsMetrics = [
    {
      title: 'Session Duration',
      value: `${Math.floor((data.ga4Data?.avgSessionDuration || 0) / 60)}m ${Math.floor((data.ga4Data?.avgSessionDuration || 0) % 60)}s`,
      description: 'Average time on site'
    },
    {
      title: 'Pages per Session',
      value: data.ga4Data?.pagesPerSession?.toFixed(1) || '0.0',
      description: 'Page views per visit'
    },
    {
      title: 'New Users',
      value: data.ga4Data?.newUsers || 0,
      description: 'First-time visitors'
    },
    {
      title: 'Organic Traffic',
      value: data.ga4Data?.organicTraffic || 0,
      description: 'Search engine traffic (%)'
    }
  ]
  
  return (
    <BaseTemplate branding={data.branding} title={`Standard SEO Report - ${data.clientName}`}>
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
          pageTitle="Executive Summary"
        />
        
        <View style={styles.container}>
          <SectionTitle
            title="Executive Summary"
            subtitle={`Performance overview for ${dateRange}`}
            branding={data.branding}
            marginTop={0}
          />
          
          <MetricGrid
            metrics={executiveMetrics}
            branding={data.branding}
            columns={2}
          />
          
          {/* Quick Insights */}
          <SectionTitle
            title="Key Highlights"
            branding={data.branding}
            marginTop={24}
          />
          
          <InsightBox
            title="Traffic Performance"
            content={`Your website attracted ${data.ga4Data?.users || 0} unique visitors with a ${(data.ga4Data?.bounceRate || 0).toFixed(1)}% bounce rate, indicating ${(data.ga4Data?.bounceRate || 0) < 40 ? 'excellent' : (data.ga4Data?.bounceRate || 0) < 60 ? 'good' : 'average'} user engagement.`}
            type={(data.ga4Data?.bounceRate || 0) < 40 ? 'success' : (data.ga4Data?.bounceRate || 0) < 60 ? 'info' : 'warning'}
            branding={data.branding}
          />
          
          <InsightBox
            title="Search Visibility"
            content={`Your site appeared ${data.gscData?.totalImpressions || 0} times in search results, generating ${data.gscData?.totalClicks || 0} clicks with an average position of ${(data.gscData?.averagePosition || 0).toFixed(1)}.`}
            type="info"
            branding={data.branding}
          />
        </View>
        
        <ReportFooter
          branding={data.branding}
          pageNumber={1}
          totalPages={6}
        />
      </Page>
      
      {/* Page 3: Search Console Data */}
      <Page size="A4" style={styles.page}>
        <ReportHeader
          branding={data.branding}
          clientName={data.clientName}
          pageTitle="Search Console Performance"
        />
        
        <View style={styles.container}>
          <SectionTitle
            title="Google Search Console"
            subtitle="Search engine visibility and keyword performance"
            branding={data.branding}
            marginTop={0}
          />
          
          <MetricGrid
            metrics={gscMetrics}
            branding={data.branding}
            columns={2}
          />
          
          {/* Top Queries Table */}
          {data.gscData?.topQueries && data.gscData.topQueries.length > 0 && (
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
              maxRows={8}
              branding={data.branding}
            />
          )}
        </View>
        
        <ReportFooter
          branding={data.branding}
          pageNumber={2}
          totalPages={6}
        />
      </Page>
      
      {/* Page 4: Analytics Performance */}
      <Page size="A4" style={styles.page}>
        <ReportHeader
          branding={data.branding}
          clientName={data.clientName}
          pageTitle="Website Analytics"
        />
        
        <View style={styles.container}>
          <SectionTitle
            title="Google Analytics 4"
            subtitle="User behavior and website performance"
            branding={data.branding}
            marginTop={0}
          />
          
          <MetricGrid
            metrics={analyticsMetrics}
            branding={data.branding}
            columns={2}
          />
          
          {/* Top Landing Pages */}
          {data.ga4Data?.topLandingPages && data.ga4Data.topLandingPages.length > 0 && (
            <DataTable
              title="Top Landing Pages"
              headers={['Page', 'Sessions', 'Users', 'Bounce Rate (%)']}
              rows={data.ga4Data.topLandingPages.map(page => ({
                page: page.page,
                sessions: page.sessions,
                users: page.users,
                'bounce rate (%)': typeof page.bounceRate === 'number' ? page.bounceRate.toFixed(1) : parseFloat(page.bounceRate || '0').toFixed(1)
              }))}
              maxRows={6}
              branding={data.branding}
            />
          )}
        </View>
        
        <ReportFooter
          branding={data.branding}
          pageNumber={3}
          totalPages={6}
        />
      </Page>
      
      {/* Page 5: Device & Traffic Sources */}
      <Page size="A4" style={styles.page}>
        <ReportHeader
          branding={data.branding}
          clientName={data.clientName}
          pageTitle="Audience Insights"
        />
        
        <View style={styles.container}>
          <SectionTitle
            title="Device & Traffic Analysis"
            subtitle="How users find and access your website"
            branding={data.branding}
            marginTop={0}
          />
          
          {/* Device Breakdown */}
          {data.ga4Data?.deviceBreakdown && (
            <View style={{ marginBottom: 32 }}>
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
          
          {/* Traffic Sources */}
          {data.ga4Data?.trafficSources && data.ga4Data.trafficSources.length > 0 && (
            <DataTable
              title="Traffic Sources"
              headers={['Source', 'Sessions', 'Percentage (%)']}
              rows={data.ga4Data.trafficSources.map(source => ({
                source: source.source,
                sessions: source.sessions,
                'percentage (%)': source.percentage.toFixed(1)
              }))}
              maxRows={5}
              branding={data.branding}
            />
          )}
        </View>
        
        <ReportFooter
          branding={data.branding}
          pageNumber={4}
          totalPages={6}
        />
      </Page>
      
      {/* Page 6: Insights & Recommendations */}
      <Page size="A4" style={styles.page}>
        <ReportHeader
          branding={data.branding}
          clientName={data.clientName}
          pageTitle="Insights & Recommendations"
        />
        
        <View style={styles.container}>
          <SectionTitle
            title="Key Insights & Recommendations"
            subtitle="Data-driven strategies for growth"
            branding={data.branding}
            marginTop={0}
          />
          
          {/* Performance Analysis */}
          <InsightBox
            title="Search Performance"
            content={`With ${data.gscData?.totalClicks || 0} clicks from ${data.gscData?.totalImpressions || 0} impressions, your CTR is ${((data.gscData?.totalClicks || 0) / (data.gscData?.totalImpressions || 1) * 100).toFixed(2)}%. ${((data.gscData?.totalClicks || 0) / (data.gscData?.totalImpressions || 1) * 100) > 3 ? 'This is performing well above average.' : 'Consider optimizing meta titles and descriptions to improve click-through rates.'}`}
            type={((data.gscData?.totalClicks || 0) / (data.gscData?.totalImpressions || 1) * 100) > 3 ? 'success' : 'warning'}
            branding={data.branding}
          />
          
          <InsightBox
            title="User Engagement"
            content={`Users spend an average of ${Math.floor((data.ga4Data?.avgSessionDuration || 0) / 60)} minutes on your site and view ${data.ga4Data?.pagesPerSession?.toFixed(1) || 0} pages per session. ${(data.ga4Data?.pagesPerSession || 0) > 2 ? 'Strong engagement indicates quality content.' : 'Consider improving internal linking and content relevance.'}`}
            type={(data.ga4Data?.pagesPerSession || 0) > 2 ? 'success' : 'info'}
            branding={data.branding}
          />
          
          <InsightBox
            title="Mobile Optimization"
            content={`${Math.round((data.ga4Data?.deviceBreakdown?.mobile || 0) / (data.ga4Data?.sessions || 1) * 100)}% of your traffic comes from mobile devices. ${(data.ga4Data?.deviceBreakdown?.mobile || 0) / (data.ga4Data?.sessions || 1) > 0.5 ? 'Ensure your mobile experience is optimized for the majority of your users.' : 'Desktop remains the primary device - maintain strong desktop performance while improving mobile experience.'}`}
            type="info"
            branding={data.branding}
          />
          
          {/* Action Items */}
          <View style={[styles.card, { backgroundColor: `${pdfStyles.colors.primary}20`, padding: 20, marginTop: 24 }]}>
            <Text style={[styles.h3, { color: pdfStyles.colors.primary, marginBottom: 16 }]}>
              Priority Action Items
            </Text>
            
            <Text style={[styles.h4, { marginBottom: 8 }]}>
              1. SEO Optimization
            </Text>
            <Text style={[styles.body, { marginBottom: 12 }]}>
              Focus on improving rankings for keywords currently in positions 5-15 to drive more clicks.
            </Text>
            
            <Text style={[styles.h4, { marginBottom: 8 }]}>
              2. Content Strategy
            </Text>
            <Text style={[styles.body, { marginBottom: 12 }]}>
              Create content targeting high-impression, low-click keywords to capture more traffic.
            </Text>
            
            <Text style={[styles.h4, { marginBottom: 8 }]}>
              3. Conversion Optimization
            </Text>
            <Text style={styles.body}>
              {data.ga4Data?.conversions ? 
                'Build on successful conversion tracking with A/B testing and funnel optimization.' :
                'Implement goal tracking to measure and optimize conversion performance.'
              }
            </Text>
          </View>
        </View>
        
        <ReportFooter
          branding={data.branding}
          pageNumber={5}
          totalPages={6}
        />
      </Page>
      
      {/* Page 7: Summary & Contact */}
      <Page size="A4" style={styles.page}>
        <ReportHeader
          branding={data.branding}
          clientName={data.clientName}
          pageTitle="Report Summary"
        />
        
        <View style={styles.container}>
          <SectionTitle
            title="Report Summary"
            subtitle="Your digital marketing performance at a glance"
            branding={data.branding}
            marginTop={0}
          />
          
          {/* Overall Performance Score */}
          <View style={[styles.card, { 
            backgroundColor: `${pdfStyles.colors.secondary}20`, 
            padding: 24, 
            textAlign: 'center',
            marginBottom: 32 
          }]}>
            <Text style={[styles.h2, { color: pdfStyles.colors.primary, marginBottom: 12 }]}>
              Overall Performance
            </Text>
            <Text style={[styles.h1, { color: pdfStyles.colors.secondary, marginBottom: 8 }]}>
              {/* Calculate simple performance score based on key metrics */}
              {Math.round(((data.gscData?.averageCTR || 0) * 10 + 
                          (100 - (data.ga4Data?.bounceRate || 100)) + 
                          Math.min((data.ga4Data?.pagesPerSession || 0) * 20, 50)) / 3)}%
            </Text>
            <Text style={styles.body}>
              Based on search visibility, user engagement, and content performance
            </Text>
          </View>
          
          {/* Next Steps */}
          <View style={{ marginBottom: 32 }}>
            <Text style={[styles.h3, { marginBottom: 16 }]}>Next Review</Text>
            <Text style={styles.body}>
              We recommend reviewing your SEO performance monthly to track progress and identify new opportunities. 
              The next report should be generated around {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}.
            </Text>
          </View>
          
          {/* Contact Information */}
          <View style={[styles.card, { 
            border: `2px solid ${pdfStyles.colors.primary}`,
            padding: 24,
            textAlign: 'center'
          }]}>
            <Text style={[styles.h3, { color: pdfStyles.colors.primary, marginBottom: 16 }]}>
              Questions About This Report?
            </Text>
            <Text style={[styles.body, { marginBottom: 8 }]}>
              Contact {data.branding.name} for detailed analysis and strategic guidance
            </Text>
            <Text style={[styles.h4, { color: pdfStyles.colors.primary, marginBottom: 4 }]}>
              {data.branding.email}
            </Text>
            <Text style={[styles.h4, { color: pdfStyles.colors.primary, marginBottom: 8 }]}>
              {data.branding.phone}
            </Text>
            <Text style={[styles.bodySmall, { color: pdfStyles.colors.textLight }]}>
              {data.branding.website}
            </Text>
          </View>
        </View>
        
        <ReportFooter
          branding={data.branding}
          pageNumber={6}
          totalPages={6}
        />
      </Page>
    </BaseTemplate>
  )
}
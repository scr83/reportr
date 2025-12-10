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
import { GSCPerformancePage } from '../components/GSCPerformancePage'
import { CustomMetric } from '@/types/custom-metrics'

export function CustomReportTemplate({ data }: PDFTemplateProps) {
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
  
  // Get selected metrics and organize them
  const selectedMetrics = data.selectedMetrics || []
  
  // Extract custom metrics from data
  const customMetricsList = (data.customMetrics || []) as CustomMetric[];
  
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
    directTraffic: { value: data.ga4Data?.directTraffic || 0, title: 'Direct Traffic', description: 'Direct website visits', source: 'ga4' },
    referralTraffic: { value: data.ga4Data?.referralTraffic || 0, title: 'Referral Traffic', description: 'Traffic from other sites', source: 'ga4' },
    
    // Search Console metrics
    totalClicks: { value: data.gscData?.totalClicks || 0, title: 'Total Clicks', description: 'Clicks from search results', source: 'gsc' },
    totalImpressions: { value: data.gscData?.totalImpressions || 0, title: 'Total Impressions', description: 'Times shown in search results', source: 'gsc' },
    averageCTR: { value: data.gscData?.averageCTR || 0, title: 'Average CTR', description: 'Click-through rate (%)', source: 'gsc' },
    averagePosition: { value: data.gscData?.averagePosition?.toFixed(1) || '0.0', title: 'Average Position', description: 'Average ranking position', source: 'gsc' },
    
    // PageSpeed metrics
    ...(data.pageSpeedData ? {
      mobileSpeed: { 
        value: `${data.pageSpeedData.mobile.score}/100`, 
        title: 'Mobile Speed Score', 
        description: 'PageSpeed mobile performance',
        source: 'pagespeed',
        color: getScoreColor(data.pageSpeedData.mobile.score)
      },
      desktopSpeed: { 
        value: `${data.pageSpeedData.desktop.score}/100`, 
        title: 'Desktop Speed Score', 
        description: 'PageSpeed desktop performance',
        source: 'pagespeed',
        color: getScoreColor(data.pageSpeedData.desktop.score)
      },
      mobileLCP: { 
        value: data.pageSpeedData.mobile.lcp ? `${(data.pageSpeedData.mobile.lcp / 1000).toFixed(2)}s` : 'N/A', 
        title: 'Mobile LCP', 
        description: 'Largest Contentful Paint (mobile)',
        source: 'pagespeed'
      },
      mobileFID: { 
        value: data.pageSpeedData.mobile.fid ? `${data.pageSpeedData.mobile.fid.toFixed(0)}ms` : 'N/A', 
        title: 'Mobile FID', 
        description: 'First Input Delay (mobile)',
        source: 'pagespeed'
      },
      mobileCLS: { 
        value: data.pageSpeedData.mobile.cls !== null ? data.pageSpeedData.mobile.cls.toFixed(3) : 'N/A', 
        title: 'Mobile CLS', 
        description: 'Cumulative Layout Shift (mobile)',
        source: 'pagespeed'
      }
    } : {}),
    
    // Custom metrics from database
    ...customMetricsList.reduce((acc, customMetric) => {
      // Get the custom metric value from GA4 data
      const metricValue = data.ga4Data?.[customMetric.apiName as keyof typeof data.ga4Data] || 0;
      
      acc[customMetric.id] = {
        value: metricValue,
        title: customMetric.displayName,
        description: `Custom metric: ${customMetric.displayName}`,
        source: 'custom'
      };
      
      return acc;
    }, {} as Record<string, any>)
  }
  
  // Filter metrics based on selection
  const displayMetrics = selectedMetrics
    .filter(metricKey => allMetrics[metricKey as keyof typeof allMetrics])
    .map(metricKey => {
      const metric = allMetrics[metricKey as keyof typeof allMetrics]
      if (!metric) {
        return {
          title: 'Unknown Metric',
          value: 'N/A',
          description: 'Metric not found',
          source: 'unknown'
        }
      }
      return {
        title: metric.title,
        value: metric.value,
        description: metric.description,
        source: metric.source,
        ...((metric as any).color && { color: (metric as any).color })
      }
    })
  
  // Group metrics by source
  const ga4Metrics = displayMetrics.filter(m => m.source === 'ga4')
  const gscMetrics = displayMetrics.filter(m => m.source === 'gsc')
  const customMetrics = displayMetrics.filter(m => m.source === 'custom')
  
  // Calculate number of pages needed
  const metricsPerPage = 8
  const hasGSCData = data.gscData && data.gscData.dailyData && data.gscData.dailyData.length > 0
  const gscPageCount = hasGSCData ? 1 : 0
  const totalPages = Math.max(
    3 + gscPageCount, // Minimum pages + GSC performance page if data exists
    Math.ceil(displayMetrics.length / metricsPerPage) + 2 + gscPageCount
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
          title="Custom Report Overview"
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
      
      {/* Page 2.5: GSC Performance Charts (if data exists) */}
      {data.gscData && data.gscData.dailyData && data.gscData.dailyData.length > 0 && (
        <GSCPerformancePage
          gscData={data.gscData}
          branding={data.branding}
          clientName={data.clientName}
          pageNumber={2}
          totalPages={totalPages}
        />
      )}
      
      {/* Page 3+: Detailed Metrics Pages */}
      {displayMetrics.length > 4 && (
        <Page size="A4" style={styles.page}>
          <ReportHeader
            branding={data.branding}
            clientName={data.clientName}
            title="Detailed Metrics"
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
            
            {customMetrics.length > 0 && (
              <InsightBox
                title="Custom Metrics"
                content={`This report includes ${customMetrics.length} custom metric${customMetrics.length > 1 ? 's' : ''}: ${customMetrics.map(m => m.title).join(', ')}. These metrics provide additional insights specific to your business objectives and goals.`}
                type="success"
                branding={data.branding}
              />
            )}
          </View>
          
          <ReportFooter
            branding={data.branding}
            pageNumber={2 + gscPageCount}
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
            title="Detailed Data Analysis"
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
      
      {/* PageSpeed Performance Analysis (if available and selected) */}
      {data.pageSpeedData && (selectedMetrics.includes('mobileSpeed') || selectedMetrics.includes('desktopSpeed') || selectedMetrics.includes('mobileLCP') || selectedMetrics.includes('mobileFID') || selectedMetrics.includes('mobileCLS')) && (
        <Page size="A4" style={styles.page}>
          <ReportHeader
            branding={data.branding}
            clientName={data.clientName}
            title="Website Performance"
          />
          
          <View style={styles.container}>
            {/* Use the same PageSpeed section from Standard template */}
            <SectionTitle
              title="Website Performance Analysis"
              subtitle="Measured via Google PageSpeed Insights"
              branding={data.branding}
              marginTop={0}
            />

            {/* Performance Scores */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 20,
              gap: 20,
            }}>
              <View style={{
                flex: 1,
                alignItems: 'center',
                padding: 20,
                backgroundColor: '#f9fafb',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#e5e7eb',
              }}>
                <Text style={{
                  fontSize: 12,
                  color: '#6b7280',
                  marginBottom: 8,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}>
                  Mobile Performance
                </Text>
                <Text style={{
                  fontSize: 48,
                  fontWeight: 'bold',
                  color: getScoreColor(data.pageSpeedData.mobile.score),
                  marginBottom: 4,
                }}>
                  {data.pageSpeedData.mobile.score}
                </Text>
                <Text style={{
                  fontSize: 18,
                  color: '#9ca3af',
                }}>
                  /100
                </Text>
              </View>
              
              <View style={{
                flex: 1,
                alignItems: 'center',
                padding: 20,
                backgroundColor: '#f9fafb',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#e5e7eb',
              }}>
                <Text style={{
                  fontSize: 12,
                  color: '#6b7280',
                  marginBottom: 8,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}>
                  Desktop Performance
                </Text>
                <Text style={{
                  fontSize: 48,
                  fontWeight: 'bold',
                  color: getScoreColor(data.pageSpeedData.desktop.score),
                  marginBottom: 4,
                }}>
                  {data.pageSpeedData.desktop.score}
                </Text>
                <Text style={{
                  fontSize: 18,
                  color: '#9ca3af',
                }}>
                  /100
                </Text>
              </View>
            </View>

            {/* Core Web Vitals (only if CWV metrics are selected) */}
            {(selectedMetrics.includes('mobileLCP') || selectedMetrics.includes('mobileFID') || selectedMetrics.includes('mobileCLS')) && (
              <View>
                <SectionTitle
                  title="Core Web Vitals (Mobile)"
                  subtitle="Key metrics that impact user experience and search rankings"
                  branding={data.branding}
                  marginTop={24}
                  marginBottom={16}
                />
                
                <View style={{
                  flexDirection: 'row',
                  gap: 15,
                  marginTop: 15,
                }}>
                  {/* Show only selected Core Web Vitals */}
                  {selectedMetrics.includes('mobileLCP') && (
                    <View style={{
                      flex: 1,
                      padding: 15,
                      backgroundColor: '#ffffff',
                      borderWidth: 1,
                      borderColor: '#e5e7eb',
                      borderRadius: 6,
                    }}>
                      <Text style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#111827',
                        marginBottom: 8,
                      }}>
                        LCP
                      </Text>
                      <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: data.branding.primaryColor || '#7e23ce',
                        marginBottom: 8,
                      }}>
                        {data.pageSpeedData.mobile.lcp 
                          ? `${(data.pageSpeedData.mobile.lcp / 1000).toFixed(2)}s`
                          : 'N/A'
                        }
                      </Text>
                      <Text style={{
                        fontSize: 9,
                        color: '#6b7280',
                        lineHeight: 1.4,
                      }}>
                        Largest Contentful Paint{'\n'}
                        Target: &lt; 2.5s
                      </Text>
                    </View>
                  )}

                  {selectedMetrics.includes('mobileFID') && (
                    <View style={{
                      flex: 1,
                      padding: 15,
                      backgroundColor: '#ffffff',
                      borderWidth: 1,
                      borderColor: '#e5e7eb',
                      borderRadius: 6,
                    }}>
                      <Text style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#111827',
                        marginBottom: 8,
                      }}>
                        FID
                      </Text>
                      <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: data.branding.primaryColor || '#7e23ce',
                        marginBottom: 8,
                      }}>
                        {data.pageSpeedData.mobile.fid 
                          ? `${data.pageSpeedData.mobile.fid.toFixed(0)}ms`
                          : 'N/A'
                        }
                      </Text>
                      <Text style={{
                        fontSize: 9,
                        color: '#6b7280',
                        lineHeight: 1.4,
                      }}>
                        First Input Delay{'\n'}
                        Target: &lt; 100ms
                      </Text>
                    </View>
                  )}

                  {selectedMetrics.includes('mobileCLS') && (
                    <View style={{
                      flex: 1,
                      padding: 15,
                      backgroundColor: '#ffffff',
                      borderWidth: 1,
                      borderColor: '#e5e7eb',
                      borderRadius: 6,
                    }}>
                      <Text style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#111827',
                        marginBottom: 8,
                      }}>
                        CLS
                      </Text>
                      <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: data.branding.primaryColor || '#7e23ce',
                        marginBottom: 8,
                      }}>
                        {data.pageSpeedData.mobile.cls !== null
                          ? data.pageSpeedData.mobile.cls.toFixed(3)
                          : 'N/A'
                        }
                      </Text>
                      <Text style={{
                        fontSize: 9,
                        color: '#6b7280',
                        lineHeight: 1.4,
                      }}>
                        Cumulative Layout Shift{'\n'}
                        Target: &lt; 0.1
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}

            {/* Performance Opportunities */}
            {data.pageSpeedData.opportunities && data.pageSpeedData.opportunities.length > 0 && (
              <View style={{ marginTop: 24 }}>
                <SectionTitle
                  title="Top Performance Opportunities"
                  subtitle="Recommendations to improve website speed"
                  branding={data.branding}
                  marginTop={0}
                  marginBottom={16}
                />
                
                {data.pageSpeedData.opportunities.slice(0, 3).map((opportunity, index) => (
                  <View key={index} style={{
                    padding: 12,
                    backgroundColor: '#fef3c7',
                    borderLeftWidth: 4,
                    borderLeftColor: '#f59e0b',
                    marginBottom: 10,
                    borderRadius: 4,
                  }}>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 6,
                    }}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#f59e0b',
                        marginRight: 8,
                        width: 24,
                        textAlign: 'center',
                      }}>
                        {index + 1}
                      </Text>
                      <Text style={{
                        fontSize: 11,
                        fontWeight: 'bold',
                        color: '#92400e',
                        flex: 1,
                      }}>
                        {opportunity.title}
                      </Text>
                    </View>
                    <Text style={{
                      fontSize: 9,
                      color: '#78350f',
                      lineHeight: 1.4,
                      marginBottom: 4,
                    }}>
                      {opportunity.description}
                    </Text>
                    {opportunity.displayValue && (
                      <Text style={{
                        fontSize: 9,
                        color: '#b45309',
                        fontStyle: 'italic',
                      }}>
                        💡 {opportunity.displayValue}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
          
          <ReportFooter
            branding={data.branding}
            pageNumber={4}
            totalPages={5}
          />
        </Page>
      )}
      
      {/* Final Page: Summary & Contact */}
      <Page size="A4" style={styles.page}>
        <ReportHeader
          branding={data.branding}
          clientName={data.clientName}
          title="Report Summary"
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
            
            {customMetrics.length > 0 && (
              <Text style={[styles.body, { marginBottom: 12 }]}>
                • Custom metrics analysis: {customMetrics.map(m => `${m.title} (${m.value})`).join(', ')}
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
            {data.insights && data.insights.length > 0 ? (
              // Show AI-generated recommendations if available
              data.insights.map((insight: any, index: number) => (
                <View key={insight.id || index} style={{ marginBottom: 12 }}>
                  <Text style={[styles.h4, { color: pdfStyles.colors.primary, marginBottom: 8 }]}>
                    {index + 1}. {insight.title}
                  </Text>
                  <Text style={[styles.body, { marginBottom: 12 }]}>
                    {insight.description}
                  </Text>
                </View>
              ))
            ) : (
              // Fallback to original static recommendations
              <>
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
              </>
            )}
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
              Contact {data.branding.companyName} for detailed analysis and strategic recommendations
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
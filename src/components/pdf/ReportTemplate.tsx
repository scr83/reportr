import React from 'react'
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Font,
  Image
} from '@react-pdf/renderer'

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

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 40,
    lineHeight: 1.4,
  },
  
  // Cover Page Styles
  coverPage: {
    backgroundColor: '#6366f1',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '100vh',
  },
  
  coverLogo: {
    position: 'absolute',
    top: 40,
    left: 40,
    width: 120,
    height: 40,
  },
  
  reportTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  
  clientName: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#22d3ee',
  },
  
  reportPeriod: {
    fontSize: 20,
    marginBottom: 60,
    opacity: 0.9,
  },
  
  generatedDate: {
    position: 'absolute',
    bottom: 40,
    fontSize: 14,
    opacity: 0.8,
  },
  
  // Header Styles
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#6366f1',
  },
  
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 10,
  },
  
  // Layout Styles
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  
  column: {
    flex: 1,
    paddingRight: 20,
  },
  
  columnLast: {
    flex: 1,
    paddingRight: 0,
  },
  
  // Metrics Styles
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  
  metricCard: {
    width: '48%',
    margin: '1%',
    padding: 20,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  
  metricLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 5,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  
  metricChange: {
    fontSize: 12,
    marginTop: 5,
  },
  
  positive: {
    color: '#059669',
  },
  
  negative: {
    color: '#dc2626',
  },
  
  // Table Styles
  table: {
    marginTop: 20,
    marginBottom: 20,
  },
  
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#6366f1',
    color: 'white',
    padding: 10,
    fontWeight: 'bold',
  },
  
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    padding: 10,
    backgroundColor: 'white',
  },
  
  tableRowAlt: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    padding: 10,
    backgroundColor: '#f8fafc',
  },
  
  tableCell: {
    flex: 1,
    fontSize: 10,
    textAlign: 'left',
  },
  
  tableCellCenter: {
    flex: 1,
    fontSize: 10,
    textAlign: 'center',
  },
  
  tableCellRight: {
    flex: 1,
    fontSize: 10,
    textAlign: 'right',
  },
  
  // Summary Styles
  summaryText: {
    fontSize: 14,
    lineHeight: 1.6,
    color: '#374151',
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#22d3ee',
  },
  
  // Footer Styles
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 10,
    color: '#64748b',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
  },
  
  pageNumber: {
    fontSize: 10,
    color: '#64748b',
  },
})

export const ReportTemplate: React.FC<{ data: ReportData }> = ({ data }) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString()
  }

  const formatPercentage = (num: number): string => {
    return `${num.toFixed(2)}%`
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const generateSummaryText = (): string => {
    return `During ${formatDate(data.startDate)} to ${formatDate(data.endDate)}, ${data.clientName} received ${formatNumber(data.gscData.clicks)} clicks and ${formatNumber(data.gscData.impressions)} impressions from search results. The average search position was ${data.gscData.position.toFixed(1)} with a click-through rate of ${formatPercentage(data.gscData.ctr)}. Google Analytics tracked ${formatNumber(data.ga4Data.users)} users with ${formatNumber(data.ga4Data.sessions)} sessions.`
  }

  return (
    <Document>
      {/* PAGE 1 - COVER PAGE */}
      <Page size="A4" style={[styles.page, styles.coverPage]}>
        {data.agencyLogo && (
          <Image src={data.agencyLogo} style={styles.coverLogo} alt="Agency logo" />
        )}
        
        <Text style={styles.reportTitle}>SEO Performance Report</Text>
        <Text style={styles.clientName}>{data.clientName}</Text>
        <Text style={styles.reportPeriod}>
          {formatDate(data.startDate)} - {formatDate(data.endDate)}
        </Text>
        
        <Text style={styles.generatedDate}>
          Generated on {new Date().toLocaleDateString()}
        </Text>
      </Page>

      {/* PAGE 2 - EXECUTIVE SUMMARY */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Executive Summary</Text>
        </View>

        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Total Clicks</Text>
            <Text style={styles.metricValue}>{formatNumber(data.gscData.clicks)}</Text>
          </View>
          
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Total Impressions</Text>
            <Text style={styles.metricValue}>{formatNumber(data.gscData.impressions)}</Text>
          </View>
          
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Average Position</Text>
            <Text style={styles.metricValue}>{data.gscData.position.toFixed(1)}</Text>
          </View>
          
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Total Users</Text>
            <Text style={styles.metricValue}>{formatNumber(data.ga4Data.users)}</Text>
          </View>
        </View>

        <Text style={styles.summaryText}>
          {generateSummaryText()}
        </Text>

        <View style={styles.footer}>
          <Text>{data.agencyName || 'SEO Reports'}</Text>
          <Text style={styles.pageNumber}>Page 2</Text>
        </View>
      </Page>

      {/* PAGE 3 - GOOGLE SEARCH CONSOLE */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Google Search Console Performance</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={[styles.metricLabel, { marginBottom: 15 }]}>Key Metrics</Text>
            
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.metricLabel}>Total Clicks</Text>
              <Text style={styles.metricValue}>{formatNumber(data.gscData.clicks)}</Text>
            </View>
            
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.metricLabel}>Total Impressions</Text>
              <Text style={styles.metricValue}>{formatNumber(data.gscData.impressions)}</Text>
            </View>
            
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.metricLabel}>Average CTR</Text>
              <Text style={styles.metricValue}>{formatPercentage(data.gscData.ctr)}</Text>
            </View>
            
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.metricLabel}>Average Position</Text>
              <Text style={styles.metricValue}>{data.gscData.position.toFixed(1)}</Text>
            </View>
          </View>

          <View style={styles.columnLast}>
            <Text style={[styles.metricLabel, { marginBottom: 15 }]}>Performance Overview</Text>
            <View style={{
              height: 200,
              backgroundColor: '#f8fafc',
              borderRadius: 8,
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#e2e8f0'
            }}>
              <Text style={{ fontSize: 14, color: '#64748b', textAlign: 'center' }}>
                Chart Placeholder{'\n'}
                Clicks: {formatNumber(data.gscData.clicks)}{'\n'}
                Impressions: {formatNumber(data.gscData.impressions)}{'\n'}
                CTR: {formatPercentage(data.gscData.ctr)}
              </Text>
            </View>
          </View>
        </View>

        {/* Top Keywords Table */}
        {data.gscData.topQueries && data.gscData.topQueries.length > 0 && (
          <View style={styles.table}>
            <Text style={[styles.metricLabel, { marginBottom: 10 }]}>Top Performing Keywords</Text>
            
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, { flex: 2 }]}>Keyword</Text>
              <Text style={styles.tableCellCenter}>Clicks</Text>
              <Text style={styles.tableCellCenter}>Impressions</Text>
              <Text style={styles.tableCellCenter}>CTR</Text>
              <Text style={styles.tableCellCenter}>Position</Text>
            </View>
            
            {data.gscData.topQueries.slice(0, 10).map((query, index) => (
              <View key={index} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                <Text style={[styles.tableCell, { flex: 2 }]}>{query.query}</Text>
                <Text style={styles.tableCellCenter}>{formatNumber(query.clicks)}</Text>
                <Text style={styles.tableCellCenter}>{formatNumber(query.impressions)}</Text>
                <Text style={styles.tableCellCenter}>{formatPercentage(query.ctr)}</Text>
                <Text style={styles.tableCellCenter}>{query.position.toFixed(1)}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <Text>{data.agencyName || 'SEO Reports'}</Text>
          <Text style={styles.pageNumber}>Page 3</Text>
        </View>
      </Page>

      {/* PAGE 4 - GOOGLE ANALYTICS 4 */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Google Analytics 4 Insights</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={[styles.metricLabel, { marginBottom: 15 }]}>Key Metrics</Text>
            
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.metricLabel}>Total Users</Text>
              <Text style={styles.metricValue}>{formatNumber(data.ga4Data.users)}</Text>
            </View>
            
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.metricLabel}>Total Sessions</Text>
              <Text style={styles.metricValue}>{formatNumber(data.ga4Data.sessions)}</Text>
            </View>
            
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.metricLabel}>Bounce Rate</Text>
              <Text style={styles.metricValue}>{formatPercentage(data.ga4Data.bounceRate)}</Text>
            </View>
            
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.metricLabel}>Conversions</Text>
              <Text style={styles.metricValue}>{formatNumber(data.ga4Data.conversions)}</Text>
            </View>
          </View>

          <View style={styles.columnLast}>
            <Text style={[styles.metricLabel, { marginBottom: 15 }]}>Traffic Overview</Text>
            <View style={{
              height: 200,
              backgroundColor: '#f8fafc',
              borderRadius: 8,
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#e2e8f0'
            }}>
              <Text style={{ fontSize: 14, color: '#64748b', textAlign: 'center' }}>
                Chart Placeholder{'\n'}
                Users: {formatNumber(data.ga4Data.users)}{'\n'}
                Sessions: {formatNumber(data.ga4Data.sessions)}{'\n'}
                Conversions: {formatNumber(data.ga4Data.conversions)}
              </Text>
            </View>
          </View>
        </View>

        {/* Engagement Summary */}
        <View style={styles.summaryText}>
          <Text>
            Your website engaged {formatNumber(data.ga4Data.users)} users across {formatNumber(data.ga4Data.sessions)} sessions. 
            The bounce rate of {formatPercentage(data.ga4Data.bounceRate)} indicates {data.ga4Data.bounceRate < 40 ? 'excellent' : data.ga4Data.bounceRate < 60 ? 'good' : 'room for improvement in'} user engagement. 
            A total of {formatNumber(data.ga4Data.conversions)} conversions were recorded during this period.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>{data.agencyName || 'SEO Reports'}</Text>
          <Text style={styles.pageNumber}>Page 4</Text>
        </View>
      </Page>
    </Document>
  )
}
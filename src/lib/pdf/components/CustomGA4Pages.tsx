import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { ReportData } from '../types';
import { formatNumber, formatPercentage, formatDuration, formatDecimal } from './styles';

interface CustomGA4PagesProps {
  data: ReportData;
}

export const CustomGA4Pages: React.FC<CustomGA4PagesProps> = ({ data }) => {
  const primaryColor = data.branding.primaryColor || '#8B5CF6';

  // CRITICAL FIX: Only show metrics that are in selectedMetrics array
  // This ensures custom reports only show user-selected metrics
  const getSelectedMetrics = () => {
    const metrics: any[] = [];
    const ga4 = data.ga4Metrics;
    const selectedMetrics = data.selectedMetrics || [];
    
    // DEBUG: Log the data to identify the issue
    if (process.env.NODE_ENV === 'development') {
      console.log('🔵 CustomGA4Pages: selectedMetrics =', selectedMetrics);
      console.log('🔵 CustomGA4Pages: selectedMetrics.length =', selectedMetrics.length);
      console.log('🔵 CustomGA4Pages: typeof selectedMetrics =', typeof selectedMetrics);
    }

    // Create mapping of metric keys to their display information
    const metricMapping: Record<string, { label: string; getValue: () => string; description: string }> = {
      users: {
        label: 'Total Users',
        getValue: () => formatNumber(ga4.users),
        description: 'Number of unique visitors to your website'
      },
      sessions: {
        label: 'Total Sessions',
        getValue: () => formatNumber(ga4.sessions),
        description: 'Total number of visits to your website'
      },
      bounceRate: {
        label: 'Bounce Rate',
        getValue: () => formatPercentage(ga4.bounceRate),
        description: 'Percentage of single-page sessions'
      },
      conversions: {
        label: 'Conversions',
        getValue: () => formatNumber(ga4.conversions),
        description: 'Number of completed conversion events'
      },
      avgSessionDuration: {
        label: 'Avg Session Duration',
        getValue: () => formatDuration(ga4.avgSessionDuration),
        description: 'Average time users spend on your website'
      },
      pagesPerSession: {
        label: 'Pages Per Session',
        getValue: () => formatDecimal(ga4.pagesPerSession, 1),
        description: 'Average number of pages viewed per session'
      },
      newUsers: {
        label: 'New Users',
        getValue: () => formatNumber(ga4.newUsers),
        description: 'First-time visitors to your website'
      },
      organicTraffic: {
        label: 'Organic Traffic',
        getValue: () => formatNumber(ga4.organicTraffic),
        description: 'Sessions from search engines'
      },
      engagedSessions: {
        label: 'Engaged Sessions',
        getValue: () => formatNumber(ga4.engagedSessions),
        description: 'Sessions with meaningful interaction'
      },
      pageViews: {
        label: 'Page Views',
        getValue: () => formatNumber(ga4.pageViews),
        description: 'Total number of pages viewed'
      },
      engagementRate: {
        label: 'Engagement Rate',
        getValue: () => formatPercentage(ga4.engagementRate),
        description: 'Percentage of engaged sessions'
      },
      conversionRate: {
        label: 'Conversion Rate',
        getValue: () => formatPercentage(ga4.conversionRate),
        description: 'Percentage of sessions with conversions'
      },
      sessionsPerUser: {
        label: 'Sessions Per User',
        getValue: () => formatDecimal(ga4.sessionsPerUser, 1),
        description: 'Average number of sessions per user'
      },
      directTraffic: {
        label: 'Direct Traffic',
        getValue: () => formatNumber(ga4.directTraffic),
        description: 'Sessions from direct visits'
      },
      referralTraffic: {
        label: 'Referral Traffic',
        getValue: () => formatNumber(ga4.referralTraffic),
        description: 'Sessions from referring websites'
      },
      socialTraffic: {
        label: 'Social Traffic',
        getValue: () => formatNumber(ga4.socialTraffic),
        description: 'Sessions from social media'
      },
      paidTraffic: {
        label: 'Paid Traffic',
        getValue: () => formatNumber(ga4.paidTraffic),
        description: 'Sessions from paid advertising'
      },
      topLandingPages: {
        label: 'Top Landing Pages',
        getValue: () => ga4.topLandingPages?.length ? `${ga4.topLandingPages.length} pages` : 'No data',
        description: 'Most visited landing pages (see table below)'
      },
      deviceBreakdown: {
        label: 'Device Breakdown',
        getValue: () => ga4.deviceBreakdown ? 'Available' : 'No data',
        description: 'Traffic distribution by device type (see details below)'
      }
    };

    // Only include metrics that are in selectedMetrics array
    // But exclude complex metrics that should be rendered as special sections, not cards
    const complexMetrics = ['topLandingPages', 'deviceBreakdown'];
    
    selectedMetrics.forEach(metricKey => {
      // Skip complex metrics - they'll be handled separately as tables/special sections
      if (complexMetrics.includes(metricKey)) {
        return;
      }
      
      if (metricMapping[metricKey]) {
        const mapping = metricMapping[metricKey];
        metrics.push({
          key: metricKey,
          label: mapping.label,
          value: mapping.getValue(),
          description: mapping.description
        });
      } else {
        // Handle unknown metrics from ga4Metrics object
        const value = ga4[metricKey];
        if (value !== undefined) {
          // Skip arrays and complex objects - these should be handled with special sections, not as metric cards
          if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
            console.warn(`Skipping complex metric '${metricKey}' - arrays and objects should be handled with special sections`);
            return;
          }
          
          metrics.push({
            key: metricKey,
            label: metricKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
            value: typeof value === 'number' ? formatNumber(value) : String(value),
            description: 'Custom metric value'
          });
        }
      }
    });

    return metrics;
  };

  const selectedMetricsData = getSelectedMetrics();

  // Handle case where no metrics are selected
  if (selectedMetricsData.length === 0) {
    return (
      <Page style={{ padding: 40, backgroundColor: '#FFFFFF', fontFamily: 'Helvetica' }}>
        <View style={{ marginBottom: 30, paddingBottom: 15, borderBottomWidth: 2, borderBottomColor: primaryColor }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1F2937', marginBottom: 5 }}>
            Custom Analytics Report
          </Text>
          <Text style={{ fontSize: 12, color: '#6B7280' }}>
            No metrics selected for {data.clientDomain} | {data.reportPeriod.startDate} - {data.reportPeriod.endDate}
          </Text>
        </View>
        <View style={{ 
          backgroundColor: '#FEF3C7', 
          borderWidth: 1, 
          borderColor: '#F59E0B', 
          borderRadius: 8, 
          padding: 20, 
          marginTop: 40 
        }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#92400E', marginBottom: 8 }}>
            No Metrics Selected
          </Text>
          <Text style={{ fontSize: 12, color: '#78350F', lineHeight: 1.4 }}>
            Please select at least one metric to include in your custom report. You can choose from various GA4 metrics 
            such as users, sessions, bounce rate, conversions, and more to create a personalized analytics overview.
          </Text>
        </View>
      </Page>
    );
  }

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      backgroundColor: '#FFFFFF',
      fontFamily: 'Helvetica',
    },
    header: {
      marginBottom: 30,
      paddingBottom: 15,
      borderBottomWidth: 2,
      borderBottomColor: primaryColor,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 12,
      color: '#6B7280',
    },
    metricsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    metricCard: {
      width: '48%',
      backgroundColor: '#F9FAFB',
      borderWidth: 1,
      borderColor: '#E5E7EB',
      borderRadius: 8,
      padding: 20,
      marginBottom: 20,
    },
    metricValue: {
      fontSize: 28,
      fontWeight: 'bold',
      color: primaryColor,
      marginBottom: 8,
    },
    metricLabel: {
      fontSize: 14,
      color: '#374151',
      fontWeight: 'bold',
      marginBottom: 4,
    },
    metricDescription: {
      fontSize: 10,
      color: '#6B7280',
      lineHeight: 1.4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1F2937',
      marginTop: 30,
      marginBottom: 15,
    },
    tableContainer: {
      backgroundColor: '#F9FAFB',
      borderWidth: 1,
      borderColor: '#E5E7EB',
      borderRadius: 8,
      padding: 15,
      marginTop: 20,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: primaryColor,
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 4,
      marginBottom: 10,
    },
    tableHeaderText: {
      color: '#FFFFFF',
      fontSize: 10,
      fontWeight: 'bold',
      flex: 1,
    },
    tableRow: {
      flexDirection: 'row',
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
    },
    tableCell: {
      fontSize: 9,
      color: '#374151',
      flex: 1,
    },
  });

  // Calculate total pages needed including complex metrics
  const metricsPerPage = 8;
  const simpleMetricsPages = Math.ceil(selectedMetricsData.length / metricsPerPage);
  
  // Count complex metrics that need their own sections
  const hasTopLandingPages = data.selectedMetrics?.includes('topLandingPages') && 
                             data.ga4Metrics.topLandingPages && 
                             data.ga4Metrics.topLandingPages.length > 0;
  const hasDeviceBreakdown = data.selectedMetrics?.includes('deviceBreakdown') && 
                             data.ga4Metrics.deviceBreakdown;
  
  // We need at least one page for simple metrics, plus potentially additional pages for complex metrics
  const totalPages = Math.max(1, simpleMetricsPages);

  const renderMetricsPage = (pageIndex: number) => {
    const startIndex = pageIndex * metricsPerPage;
    const endIndex = Math.min(startIndex + metricsPerPage, selectedMetricsData.length);
    const pageMetrics = selectedMetricsData.slice(startIndex, endIndex);
    
    // Check if this is the last page and has space for complex metrics
    const isLastPage = pageIndex === totalPages - 1;
    const hasSpaceForComplexMetrics = pageMetrics.length <= 4;

    return (
      <Page key={pageIndex} style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Custom Analytics Report {totalPages > 1 ? `(Page ${pageIndex + 1} of ${totalPages})` : ''}
          </Text>
          <Text style={styles.subtitle}>
            Selected metrics for {data.clientDomain} | {data.reportPeriod.startDate} - {data.reportPeriod.endDate}
          </Text>
        </View>

        <View style={styles.metricsGrid}>
          {pageMetrics.map((metric, index) => (
            <View key={metric.key} style={styles.metricCard}>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
              <Text style={styles.metricDescription}>{metric.description}</Text>
            </View>
          ))}
        </View>

      </Page>
    );
  };

  // Render additional pages for complex metrics if they don't fit on the last page
  const renderComplexMetricsPage = () => {
    return (
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Custom Analytics Report - Additional Data
          </Text>
          <Text style={styles.subtitle}>
            Selected detailed metrics for {data.clientDomain} | {data.reportPeriod.startDate} - {data.reportPeriod.endDate}
          </Text>
        </View>

        {/* Top Landing Pages Table */}
        {hasTopLandingPages && (
          <>
            <Text style={styles.sectionTitle}>Top Landing Pages</Text>
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Page</Text>
                <Text style={styles.tableHeaderText}>Sessions</Text>
                <Text style={styles.tableHeaderText}>Users</Text>
                <Text style={styles.tableHeaderText}>Bounce Rate</Text>
              </View>
              {data.ga4Metrics.topLandingPages.slice(0, 8).map((page, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>
                    {page.page.length > 40 ? `${page.page.substring(0, 40)}...` : page.page}
                  </Text>
                  <Text style={styles.tableCell}>{formatNumber(page.sessions)}</Text>
                  <Text style={styles.tableCell}>{formatNumber(page.users)}</Text>
                  <Text style={styles.tableCell}>{formatPercentage(page.bounceRate)}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Device Breakdown */}
        {hasDeviceBreakdown && (
          <>
            <Text style={styles.sectionTitle}>Device Breakdown</Text>
            <View style={styles.metricsGrid}>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>
                  {formatPercentage(data.ga4Metrics.deviceBreakdown.desktop)}
                </Text>
                <Text style={styles.metricLabel}>Desktop</Text>
                <Text style={styles.metricDescription}>
                  Percentage of sessions from desktop devices
                </Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>
                  {formatPercentage(data.ga4Metrics.deviceBreakdown.mobile)}
                </Text>
                <Text style={styles.metricLabel}>Mobile</Text>
                <Text style={styles.metricDescription}>
                  Percentage of sessions from mobile devices
                </Text>
              </View>
              {data.ga4Metrics.deviceBreakdown.tablet !== undefined && (
                <View style={styles.metricCard}>
                  <Text style={styles.metricValue}>
                    {formatPercentage(data.ga4Metrics.deviceBreakdown.tablet)}
                  </Text>
                  <Text style={styles.metricLabel}>Tablet</Text>
                  <Text style={styles.metricDescription}>
                    Percentage of sessions from tablet devices
                  </Text>
                </View>
              )}
            </View>
          </>
        )}
      </Page>
    );
  };

  return (
    <>
      {Array.from({ length: totalPages }, (_, index) => renderMetricsPage(index))}
      {/* Add a dedicated page for complex metrics if they exist and don't fit on metric pages */}
      {(hasTopLandingPages || hasDeviceBreakdown) && renderComplexMetricsPage()}
    </>
  );
};
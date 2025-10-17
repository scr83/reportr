import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { ReportData } from '../types';
import { formatNumber, formatPercentage, formatDuration, formatDecimal } from './styles';

interface CustomGA4PagesProps {
  data: ReportData;
}

export const CustomGA4Pages: React.FC<CustomGA4PagesProps> = ({ data }) => {
  const primaryColor = data.branding.primaryColor || '#8B5CF6';

  // CRITICAL FIX: Get ALL available metrics - show them regardless of value
  // This function must NEVER filter out metrics based on their values
  const getAvailableMetrics = () => {
    const metrics = [];
    const ga4 = data.ga4Metrics;

    // ALWAYS include core metrics - use formatNumber which handles null/undefined/zero properly
    metrics.push({ key: 'users', label: 'Total Users', value: formatNumber(ga4.users), description: 'Number of unique visitors to your website' });
    metrics.push({ key: 'sessions', label: 'Total Sessions', value: formatNumber(ga4.sessions), description: 'Total number of visits to your website' });
    metrics.push({ key: 'bounceRate', label: 'Bounce Rate', value: formatPercentage(ga4.bounceRate), description: 'Percentage of single-page sessions' });
    metrics.push({ key: 'conversions', label: 'Conversions', value: formatNumber(ga4.conversions), description: 'Number of completed conversion events' });
    metrics.push({ key: 'avgSessionDuration', label: 'Avg Session Duration', value: formatDuration(ga4.avgSessionDuration), description: 'Average time users spend on your website' });
    metrics.push({ key: 'pagesPerSession', label: 'Pages Per Session', value: formatDecimal(ga4.pagesPerSession), description: 'Average number of pages viewed per session' });
    metrics.push({ key: 'newUsers', label: 'New Users', value: formatNumber(ga4.newUsers), description: 'First-time visitors to your website' });
    metrics.push({ key: 'organicTraffic', label: 'Organic Traffic', value: formatNumber(ga4.organicTraffic), description: 'Sessions from search engines' });

    // Add any additional custom metrics - NO filtering based on undefined
    Object.keys(ga4).forEach(key => {
      if (!['users', 'sessions', 'bounceRate', 'conversions', 'avgSessionDuration', 'pagesPerSession', 'newUsers', 'organicTraffic', 'topLandingPages', 'deviceBreakdown'].includes(key)) {
        const value = ga4[key];
        // Don't filter by type - include everything and let formatNumber handle it
        metrics.push({
          key,
          label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
          value: typeof value === 'number' ? formatNumber(value) : (value ? String(value) : 'N/A'),
          description: 'Custom metric value'
        });
      }
    });

    return metrics;
  };

  const availableMetrics = getAvailableMetrics();

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

  // Split metrics into pages (8 metrics per page maximum)
  const metricsPerPage = 8;
  const totalPages = Math.ceil(availableMetrics.length / metricsPerPage);

  const renderMetricsPage = (pageIndex: number) => {
    const startIndex = pageIndex * metricsPerPage;
    const endIndex = Math.min(startIndex + metricsPerPage, availableMetrics.length);
    const pageMetrics = availableMetrics.slice(startIndex, endIndex);

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

        {/* Show tables on the last page if there's space */}
        {pageIndex === totalPages - 1 && pageMetrics.length <= 4 && (
          <>
            {/* Top Landing Pages Table */}
            {data.ga4Metrics.topLandingPages && data.ga4Metrics.topLandingPages.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Top Landing Pages</Text>
                <View style={styles.tableContainer}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Page</Text>
                    <Text style={styles.tableHeaderText}>Sessions</Text>
                    <Text style={styles.tableHeaderText}>Users</Text>
                    <Text style={styles.tableHeaderText}>Bounce Rate</Text>
                  </View>
                  {data.ga4Metrics.topLandingPages.slice(0, 6).map((page, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={styles.tableCell}>
                        {page.page.length > 35 ? `${page.page.substring(0, 35)}...` : page.page}
                      </Text>
                      <Text style={styles.tableCell}>{formatNumber(page.sessions)}</Text>
                      <Text style={styles.tableCell}>{formatNumber(page.users)}</Text>
                      <Text style={styles.tableCell}>{formatPercentage(page.bounceRate)}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </>
        )}
      </Page>
    );
  };

  return (
    <>
      {Array.from({ length: totalPages }, (_, index) => renderMetricsPage(index))}
    </>
  );
};
import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { ReportData } from '../types';
import { formatNumber, formatPercentage, formatDuration, formatDecimal } from './styles';

interface StandardGA4PagesProps {
  data: ReportData;
}

export const StandardGA4Pages: React.FC<StandardGA4PagesProps> = ({ data }) => {
  const primaryColor = data.branding.primaryColor || '#8B5CF6';

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
    metricsGrid3: {
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
    metricCard3: {
      width: '31%',
      backgroundColor: '#F9FAFB',
      borderWidth: 1,
      borderColor: '#E5E7EB',
      borderRadius: 8,
      padding: 15,
      marginBottom: 20,
    },
    metricValue: {
      fontSize: 28,
      fontWeight: 'bold',
      color: primaryColor,
      marginBottom: 8,
    },
    metricValueSmall: {
      fontSize: 24,
      fontWeight: 'bold',
      color: primaryColor,
      marginBottom: 6,
    },
    metricLabel: {
      fontSize: 14,
      color: '#374151',
      fontWeight: 'bold',
      marginBottom: 4,
    },
    metricLabelSmall: {
      fontSize: 12,
      color: '#374151',
      fontWeight: 'bold',
      marginBottom: 3,
    },
    metricDescription: {
      fontSize: 10,
      color: '#6B7280',
      lineHeight: 1.4,
    },
    metricDescriptionSmall: {
      fontSize: 9,
      color: '#6B7280',
      lineHeight: 1.3,
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

  return (
    <>
      {/* Page 1: Core Metrics (2x3 grid) */}
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Google Analytics 4 - Core Metrics</Text>
          <Text style={styles.subtitle}>
            Comprehensive website performance data for {data.clientDomain} | {data.reportPeriod.startDate} - {data.reportPeriod.endDate}
          </Text>
        </View>

        <View style={styles.metricsGrid}>
          {/* Total Users */}
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{formatNumber(data.ga4Metrics.users)}</Text>
            <Text style={styles.metricLabel}>Total Users</Text>
            <Text style={styles.metricDescription}>
              Number of unique visitors to your website during the reporting period
            </Text>
          </View>

          {/* Total Sessions */}
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{formatNumber(data.ga4Metrics.sessions)}</Text>
            <Text style={styles.metricLabel}>Total Sessions</Text>
            <Text style={styles.metricDescription}>
              Total number of visits to your website including repeat visitors
            </Text>
          </View>

          {/* Bounce Rate */}
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{formatPercentage(data.ga4Metrics.bounceRate)}</Text>
            <Text style={styles.metricLabel}>Bounce Rate</Text>
            <Text style={styles.metricDescription}>
              Percentage of single-page sessions with no interaction with the page
            </Text>
          </View>

          {/* Conversions */}
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{formatNumber(data.ga4Metrics.conversions)}</Text>
            <Text style={styles.metricLabel}>Conversions</Text>
            <Text style={styles.metricDescription}>
              Number of completed conversion events tracked on your website
            </Text>
          </View>

          {/* Average Session Duration */}
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>
              {formatDuration(data.ga4Metrics.avgSessionDuration)}
            </Text>
            <Text style={styles.metricLabel}>Avg Session Duration</Text>
            <Text style={styles.metricDescription}>
              Average time users spend on your website per session
            </Text>
          </View>

          {/* Pages Per Session */}
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>
              {formatDecimal(data.ga4Metrics.pagesPerSession, 1)}
            </Text>
            <Text style={styles.metricLabel}>Pages Per Session</Text>
            <Text style={styles.metricDescription}>
              Average number of pages viewed during each session
            </Text>
          </View>
        </View>
      </Page>

      {/* Page 2: Additional Metrics & Tables */}
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Analytics Breakdown & Performance</Text>
          <Text style={styles.subtitle}>
            Detailed insights and device analytics for {data.clientDomain}
          </Text>
        </View>

        {/* Additional Metrics */}
        <View style={styles.metricsGrid3}>
          {/* New Users */}
          <View style={styles.metricCard3}>
            <Text style={styles.metricValueSmall}>
              {formatNumber(data.ga4Metrics.newUsers)}
            </Text>
            <Text style={styles.metricLabelSmall}>New Users</Text>
            <Text style={styles.metricDescriptionSmall}>
              First-time visitors to your website
            </Text>
          </View>

          {/* Organic Traffic */}
          <View style={styles.metricCard3}>
            <Text style={styles.metricValueSmall}>
              {formatNumber(data.ga4Metrics.organicTraffic)}
            </Text>
            <Text style={styles.metricLabelSmall}>Organic Traffic</Text>
            <Text style={styles.metricDescriptionSmall}>
              Sessions from search engines
            </Text>
          </View>

          {/* Device Breakdown Title */}
          <View style={styles.metricCard3}>
            <Text style={styles.metricLabelSmall}>Device Breakdown</Text>
            {data.ga4Metrics.deviceBreakdown ? (
              (() => {
                // Normalize percentages to ensure they add up to 100%
                const breakdown = data.ga4Metrics.deviceBreakdown;
                const rawTotal = (breakdown.desktop || 0) + (breakdown.mobile || 0) + (breakdown.tablet || 0);
                
                if (rawTotal > 0) {
                  const normalizedDesktop = ((breakdown.desktop || 0) / rawTotal) * 100;
                  const normalizedMobile = ((breakdown.mobile || 0) / rawTotal) * 100;
                  const normalizedTablet = ((breakdown.tablet || 0) / rawTotal) * 100;
                  
                  return (
                    <>
                      <Text style={styles.metricDescriptionSmall}>
                        Desktop: {normalizedDesktop.toFixed(1)}%
                      </Text>
                      <Text style={styles.metricDescriptionSmall}>
                        Mobile: {normalizedMobile.toFixed(1)}%
                      </Text>
                      <Text style={styles.metricDescriptionSmall}>
                        Tablet: {normalizedTablet.toFixed(1)}%
                      </Text>
                    </>
                  );
                } else {
                  return (
                    <Text style={styles.metricDescriptionSmall}>No device data available</Text>
                  );
                }
              })()
            ) : (
              <Text style={styles.metricDescriptionSmall}>No device data available</Text>
            )}
          </View>
        </View>

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

        
        {/* Top Countries */}
        {data.gscMetrics?.topCountries && Array.isArray(data.gscMetrics.topCountries) && data.gscMetrics.topCountries.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Top Countries</Text>
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, {flex: 2}]}>Country</Text>
                <Text style={styles.tableHeaderText}>Clicks</Text>
                <Text style={styles.tableHeaderText}>Impressions</Text>
                <Text style={styles.tableHeaderText}>CTR (%)</Text>
              </View>
              {data.gscMetrics.topCountries.slice(0, 8).map((country, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, {flex: 2}]}>{country.country}</Text>
                  <Text style={styles.tableCell}>{formatNumber(country.clicks)}</Text>
                  <Text style={styles.tableCell}>{formatNumber(country.impressions)}</Text>
                  <Text style={styles.tableCell}>{formatPercentage(country.ctr)}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </Page>

    </>
  );
};
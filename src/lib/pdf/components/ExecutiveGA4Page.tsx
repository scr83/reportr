import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { ReportData } from '../types';
import { formatNumber, formatPercentage, formatDecimal } from './styles';

interface ExecutiveGA4PageProps {
  data: ReportData;
}

export const ExecutiveGA4Page: React.FC<ExecutiveGA4PageProps> = ({ data }) => {
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerLeft: {
      flex: 1,
    },
    headerRight: {
      alignItems: 'flex-end',
    },
    clientName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: primaryColor,
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
      marginTop: 10,
      marginBottom: 20,
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
    footer: {
      position: 'absolute',
      bottom: 20,
      left: 40,
      right: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
    },
    footerLeft: {
      fontSize: 10,
      color: '#6B7280',
    },
    footerCenter: {
      fontSize: 10,
      color: '#6B7280',
    },
    footerRight: {
      fontSize: 10,
      color: '#6B7280',
    },
  });

  return (
    <>
      {/* Page 1: Core GA4 Metrics */}
      <Page style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Google Analytics 4 Metrics</Text>
            <Text style={styles.subtitle}>
              Website performance data for {data.clientDomain} | {data.reportPeriod.startDate} - {data.reportPeriod.endDate}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.clientName}>{data.clientName}</Text>
          </View>
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
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerLeft}></Text>
          <Text style={styles.footerCenter}>
            Generated by Reportr • {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', month: 'long', day: 'numeric' 
            })}
          </Text>
          <Text style={styles.footerRight} render={({ pageNumber, totalPages }) => 
            `Page ${pageNumber} of ${totalPages}`
          } />
        </View>
      </Page>

      {/* Page 2: GSC Performance Tables */}
      <Page style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Search Console Performance</Text>
            <Text style={styles.subtitle}>
              Detailed search performance data for {data.clientDomain} | {data.reportPeriod.startDate} - {data.reportPeriod.endDate}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.clientName}>{data.clientName}</Text>
          </View>
        </View>

        {/* Top Performing Keywords */}
        {data.gscMetrics.topKeywords && data.gscMetrics.topKeywords.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Top Performing Keywords</Text>
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, {flex: 2}]}>Query</Text>
                <Text style={styles.tableHeaderText}>Clicks</Text>
                <Text style={styles.tableHeaderText}>Impressions</Text>
                <Text style={styles.tableHeaderText}>CTR (%)</Text>
                <Text style={styles.tableHeaderText}>Position</Text>
              </View>
              {data.gscMetrics.topKeywords.slice(0, 10).map((keyword, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, {flex: 2}]}>
                    {keyword.query.length > 50 ? `${keyword.query.substring(0, 50)}...` : keyword.query}
                  </Text>
                  <Text style={styles.tableCell}>{formatNumber(keyword.clicks)}</Text>
                  <Text style={styles.tableCell}>{formatNumber(keyword.impressions)}</Text>
                  <Text style={styles.tableCell}>{formatPercentage(keyword.ctr)}</Text>
                  <Text style={styles.tableCell}>{formatDecimal(keyword.position, 1)}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Top Pages */}
        {data.gscMetrics.topPages && data.gscMetrics.topPages.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Top Pages</Text>
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, {flex: 2}]}>Page</Text>
                <Text style={styles.tableHeaderText}>Clicks</Text>
                <Text style={styles.tableHeaderText}>Impressions</Text>
                <Text style={styles.tableHeaderText}>CTR (%)</Text>
                <Text style={styles.tableHeaderText}>Position</Text>
              </View>
              {data.gscMetrics.topPages.slice(0, 10).map((page, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, {flex: 2}]}>
                    {page.page.length > 50 ? `${page.page.substring(0, 50)}...` : page.page}
                  </Text>
                  <Text style={styles.tableCell}>{formatNumber(page.clicks)}</Text>
                  <Text style={styles.tableCell}>{formatNumber(page.impressions)}</Text>
                  <Text style={styles.tableCell}>{formatPercentage(page.ctr)}</Text>
                  <Text style={styles.tableCell}>{formatDecimal(page.position, 1)}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Top Countries */}
        {data.gscMetrics.topCountries && data.gscMetrics.topCountries.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Top Countries</Text>
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, {flex: 2}]}>Country</Text>
                <Text style={styles.tableHeaderText}>Clicks</Text>
                <Text style={styles.tableHeaderText}>Impressions</Text>
                <Text style={styles.tableHeaderText}>CTR (%)</Text>
              </View>
              {data.gscMetrics.topCountries.slice(0, 10).map((country, index) => (
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

        {/* Device Breakdown (Table Format) */}
        {data.gscMetrics.deviceBreakdown && data.gscMetrics.deviceBreakdown.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Device Breakdown</Text>
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, {flex: 2}]}>Device</Text>
                <Text style={styles.tableHeaderText}>Clicks</Text>
                <Text style={styles.tableHeaderText}>Impressions</Text>
                <Text style={styles.tableHeaderText}>CTR (%)</Text>
              </View>
              {data.gscMetrics.deviceBreakdown.map((device, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, {flex: 2}]}>{device.device}</Text>
                  <Text style={styles.tableCell}>{formatNumber(device.clicks)}</Text>
                  <Text style={styles.tableCell}>{formatNumber(device.impressions)}</Text>
                  <Text style={styles.tableCell}>{formatPercentage(device.ctr)}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        <View style={styles.footer} fixed>
          <Text style={styles.footerLeft}></Text>
          <Text style={styles.footerCenter}>
            Generated by Reportr • {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', month: 'long', day: 'numeric' 
            })}
          </Text>
          <Text style={styles.footerRight} render={({ pageNumber, totalPages }) => 
            `Page ${pageNumber} of ${totalPages}`
          } />
        </View>
      </Page>
    </>
  );
};
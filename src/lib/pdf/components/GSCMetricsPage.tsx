import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { ReportData } from '../types';
import { formatNumber, formatPercentage, formatDecimal } from './styles';

interface GSCMetricsPageProps {
  data: ReportData;
}

export const GSCMetricsPage: React.FC<GSCMetricsPageProps> = ({ data }) => {
  const primaryColor = data.branding.primaryColor || '#7e23ce';

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
  });

  return (
    <Page style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Google Search Console Metrics</Text>
        <Text style={styles.subtitle}>
          Search performance data for {data.clientDomain} | {data.reportPeriod.startDate} - {data.reportPeriod.endDate}
        </Text>
      </View>

      <View style={styles.metricsGrid}>
        {/* Total Clicks */}
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{formatNumber(data.gscMetrics.clicks)}</Text>
          <Text style={styles.metricLabel}>Total Clicks</Text>
          <Text style={styles.metricDescription}>
            Number of times users clicked through to your website from Google search results
          </Text>
        </View>

        {/* Total Impressions */}
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{formatNumber(data.gscMetrics.impressions)}</Text>
          <Text style={styles.metricLabel}>Total Impressions</Text>
          <Text style={styles.metricDescription}>
            How many times your pages appeared in Google search results
          </Text>
        </View>

        {/* Average CTR */}
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{formatPercentage(data.gscMetrics.ctr)}</Text>
          <Text style={styles.metricLabel}>Average CTR</Text>
          <Text style={styles.metricDescription}>
            Click-through rate - percentage of impressions that resulted in clicks
          </Text>
        </View>

        {/* Average Position */}
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{formatDecimal(data.gscMetrics.position, 1)}</Text>
          <Text style={styles.metricLabel}>Average Position</Text>
          <Text style={styles.metricDescription}>
            Average ranking position of your pages in Google search results
          </Text>
        </View>
      </View>
    </Page>
  );
};
import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { ReportData } from '../types';
import { formatNumber, formatPercentage } from './styles';

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
        <Text style={styles.title}>Google Analytics 4 Metrics</Text>
        <Text style={styles.subtitle}>
          Website performance data for {data.clientDomain} | {data.reportPeriod.startDate} - {data.reportPeriod.endDate}
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
      </View>
    </Page>
  );
};
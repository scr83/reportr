import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { ReportData } from '../types';
import { formatNumber, formatPercentage, formatDecimal } from './styles';
import { ReportHeader } from '../../../components/pdf/components/ReportHeader';
import { ReportFooter } from '../../../components/pdf/components/ReportFooter';

interface ExecutiveGA4PageProps {
  data: ReportData;
}

export const ExecutiveGA4Page: React.FC<ExecutiveGA4PageProps> = ({ data }) => {
  const primaryColor = data.branding.primaryColor || '#7e23ce';

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      backgroundColor: '#FFFFFF',
      fontFamily: 'Helvetica',
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
  });

  return (
    <>
      {/* Page 1: Core GA4 Metrics */}
      <Page style={styles.page}>
        <ReportHeader
          title="Google Analytics 4 Metrics"
          subtitle={`Website performance data for ${data.clientDomain} | ${data.reportPeriod.startDate} - ${data.reportPeriod.endDate}`}
          clientName={data.clientName}
          branding={data.branding}
        />

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


        {/* Show fallback message only if core GSC data is missing */}
        {(!data.gscMetrics || 
          (data.gscMetrics.clicks === 0 && data.gscMetrics.impressions === 0)) && (
          <View style={{
            backgroundColor: '#FEF3C7',
            borderWidth: 1,
            borderColor: '#F59E0B',
            borderRadius: 8,
            padding: 20,
            marginTop: 30
          }}>
            <Text style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: '#92400E',
              marginBottom: 8
            }}>
              No Search Console Data Available
            </Text>
            <Text style={{
              fontSize: 12,
              color: '#78350F',
              lineHeight: 1.4
            }}>
              Google Search Console data tables will appear here once your website is connected and has performance data available.
              This may take 24-48 hours after connecting your Search Console account.
            </Text>
          </View>
        )}

        <ReportFooter branding={data.branding} />
      </Page>

    </>
  );
};
import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { ReportData } from '../types';
import { formatNumber, formatPercentage, formatDuration, formatDecimal, getFooterText } from './styles';

interface KeyInsightsPageProps {
  data: ReportData;
}

export const KeyInsightsPage: React.FC<KeyInsightsPageProps> = ({ data }) => {
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
    clientName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: primaryColor,
    },
    insightBox: {
      borderLeftWidth: 4,
      padding: 20,
      marginBottom: 20,
      borderRadius: 8,
    },
    insightTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    insightText: {
      fontSize: 12,
      color: '#374151',
      lineHeight: 1.5,
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
    <Page style={styles.page}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Key Insights</Text>
          <Text style={styles.subtitle}>AI-powered insights based on your data analysis</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.clientName}>{data.clientName}</Text>
        </View>
      </View>

      {/* Insight 1: Search Performance */}
      <View style={[styles.insightBox, {backgroundColor: '#EDE9FE', borderColor: '#7e23ce'}]}>
        <Text style={[styles.insightTitle, {color: '#6D28D9'}]}>Search Performance</Text>
        <Text style={styles.insightText}>
          Your website received {formatNumber(data.gscMetrics.clicks)} clicks from{' '}
          {formatNumber(data.gscMetrics.impressions)} impressions with an average CTR of{' '}
          {formatPercentage(data.gscMetrics.ctr)}. Your average position of{' '}
          {formatDecimal(data.gscMetrics.position, 1)} indicates{' '}
          {data.gscMetrics.position < 10 ? 'strong visibility' : 'room for improvement'} in search results.
        </Text>
      </View>

      {/* Insight 2: User Engagement */}
      <View style={[styles.insightBox, {backgroundColor: '#CFFAFE', borderColor: '#06B6D4'}]}>
        <Text style={[styles.insightTitle, {color: '#0E7490'}]}>User Engagement</Text>
        <Text style={styles.insightText}>
          Your site attracted {formatNumber(data.ga4Metrics.users)} unique visitors with{' '}
          {formatNumber(data.ga4Metrics.sessions)} total sessions. The bounce rate of{' '}
          {formatPercentage(data.ga4Metrics.bounceRate)} and average session duration of{' '}
          {data.ga4Metrics.avgSessionDuration 
            ? formatDuration(data.ga4Metrics.avgSessionDuration) 
            : 'N/A'} suggest{' '}
          {data.ga4Metrics.bounceRate < 40 ? 'strong' : 'moderate'} user engagement.
        </Text>
      </View>

      {/* Insight 3: Conversion Performance */}
      <View style={[styles.insightBox, {backgroundColor: '#D1FAE5', borderColor: '#10B981'}]}>
        <Text style={[styles.insightTitle, {color: '#065F46'}]}>Conversion Performance</Text>
        <Text style={styles.insightText}>
          You achieved {formatNumber(data.ga4Metrics.conversions)} conversions this period
          {data.ga4Metrics.conversionRate 
            ? ` with a conversion rate of ${formatPercentage(data.ga4Metrics.conversionRate)}` 
            : ''}. {data.ga4Metrics.newUsers ? formatNumber(data.ga4Metrics.newUsers) : 'N/A'} of your{' '}
          {formatNumber(data.ga4Metrics.users)} visitors were first-time users, representing a{' '}
          {data.ga4Metrics.newUsers 
            ? formatPercentage((data.ga4Metrics.newUsers / data.ga4Metrics.users) * 100)
            : 'N/A'} new visitor rate.
        </Text>
      </View>

      {/* Insight 4: Traffic Sources */}
      <View style={[styles.insightBox, {backgroundColor: '#FEF3C7', borderColor: '#F59E0B'}]}>
        <Text style={[styles.insightTitle, {color: '#92400E'}]}>Traffic Distribution</Text>
        <Text style={styles.insightText}>
          {data.ga4Metrics.organicTraffic 
            ? `Organic search drives ${formatNumber(data.ga4Metrics.organicTraffic)} sessions (${formatPercentage((data.ga4Metrics.organicTraffic / data.ga4Metrics.sessions) * 100)})` 
            : 'Organic traffic data not available'}
          {data.ga4Metrics.directTraffic 
            ? `, while direct traffic contributes ${formatNumber(data.ga4Metrics.directTraffic)} sessions` 
            : ''}. This distribution shows{' '}
          {data.ga4Metrics.organicTraffic && (data.ga4Metrics.organicTraffic / data.ga4Metrics.sessions) > 0.5 
            ? 'strong SEO performance' 
            : 'opportunity to improve organic visibility'}.
        </Text>
      </View>

      {/* Insight 5: Device Performance */}
      <View style={[styles.insightBox, {backgroundColor: '#E0E7FF', borderColor: '#6366F1'}]}>
        <Text style={[styles.insightTitle, {color: '#4338CA'}]}>Device Usage Patterns</Text>
        <Text style={styles.insightText}>
          {data.ga4Metrics.deviceBreakdown ? (
            `Your audience primarily uses ${
              data.ga4Metrics.deviceBreakdown.desktop > data.ga4Metrics.deviceBreakdown.mobile ? 'desktop' : 'mobile'
            } devices (${
              data.ga4Metrics.deviceBreakdown.desktop > data.ga4Metrics.deviceBreakdown.mobile 
                ? formatPercentage(data.ga4Metrics.deviceBreakdown.desktop) 
                : formatPercentage(data.ga4Metrics.deviceBreakdown.mobile)
            }). Mobile represents ${formatPercentage(data.ga4Metrics.deviceBreakdown.mobile)} of traffic, indicating ${
              data.ga4Metrics.deviceBreakdown.mobile > 50 ? 'mobile-first behavior' : 'desktop preference'
            }.`
          ) : (
            'Device breakdown data helps optimize user experience across different platforms. Consider implementing device-specific optimizations to improve engagement rates.'
          )}
        </Text>
      </View>

      <View style={styles.footer} fixed>
        <Text style={styles.footerLeft}>{getFooterText(data.branding)}</Text>
        <Text style={styles.footerCenter}>
          {data.branding.whiteLabelEnabled && data.branding.companyName ? data.branding.companyName : 'Generated by Reportr'}
        </Text>
        <Text style={styles.footerRight} render={({ pageNumber, totalPages }) => 
          `Page ${pageNumber} of ${totalPages}`
        } />
      </View>
    </Page>
  );
};
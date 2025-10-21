import React from 'react';
import { Page, View, Text, Svg, Line, Polyline, StyleSheet } from '@react-pdf/renderer';
import { ReportData } from '../types';
import { formatNumber } from './styles';

interface GSCPerformanceChartsPageProps {
  data: ReportData;
}

export const GSCPerformanceChartsPage: React.FC<GSCPerformanceChartsPageProps> = ({ data }) => {
  // Get daily data from gscData
  const dailyData = data.gscData?.dailyData || [];
  
  // Skip page if no daily data
  if (dailyData.length === 0) {
    console.log('⚠️ GSCPerformanceChartsPage: No daily data available, skipping page');
    return null;
  }

  console.log('📊 GSCPerformanceChartsPage: Rendering with data:', {
    dailyDataLength: dailyData.length,
    firstEntry: dailyData[0],
    lastEntry: dailyData[dailyData.length - 1]
  });

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
    insightBox: {
      backgroundColor: `${primaryColor}10`,
      marginBottom: 24,
      padding: 16,
      borderRadius: 8,
    },
    insightTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: primaryColor,
      marginBottom: 8,
    },
    insightText: {
      fontSize: 11,
      lineHeight: 1.4,
      color: '#374151',
    },
    chartContainer: {
      marginBottom: 24,
    },
    chartTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: primaryColor,
      marginBottom: 12,
    },
    chartWrapper: {
      border: '1px solid #E5E7EB',
      borderRadius: 8,
      padding: 16,
      backgroundColor: '#FAFAFA',
    },
    chartLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      fontSize: 10,
      color: '#6B7280',
    },
    metricsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    metricCard: {
      backgroundColor: '#F9FAFB',
      padding: 12,
      borderRadius: 8,
      width: '22%',
      border: '1px solid #E5E7EB',
    },
    metricLabel: {
      fontSize: 10,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    metricValue: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 2,
      color: '#1F2937',
    },
    metricDescription: {
      fontSize: 8,
      color: '#6B7280',
    },
  });

  // Generate insights based on the data
  const generateInsights = () => {
    const totalDays = dailyData.length;
    const firstHalf = dailyData.slice(0, Math.floor(totalDays / 2));
    const secondHalf = dailyData.slice(Math.floor(totalDays / 2));

    const firstHalfAvgClicks = firstHalf.reduce((sum, day) => sum + day.clicks, 0) / firstHalf.length;
    const secondHalfAvgClicks = secondHalf.reduce((sum, day) => sum + day.clicks, 0) / secondHalf.length;
    
    const clicksChange = ((secondHalfAvgClicks - firstHalfAvgClicks) / firstHalfAvgClicks) * 100;

    const firstHalfAvgImpressions = firstHalf.reduce((sum, day) => sum + day.impressions, 0) / firstHalf.length;
    const secondHalfAvgImpressions = secondHalf.reduce((sum, day) => sum + day.impressions, 0) / secondHalf.length;
    
    const impressionsChange = ((secondHalfAvgImpressions - firstHalfAvgImpressions) / firstHalfAvgImpressions) * 100;

    let insight = `Over the reporting period, `;
    
    if (Math.abs(clicksChange) > 5) {
      insight += `clicks ${clicksChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(clicksChange).toFixed(1)}% `;
    } else {
      insight += `clicks remained relatively stable `;
    }

    insight += `and `;

    if (Math.abs(impressionsChange) > 5) {
      insight += `impressions ${impressionsChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(impressionsChange).toFixed(1)}%.`;
    } else {
      insight += `impressions remained relatively stable.`;
    }

    return insight;
  };

  // Simple chart component for line graphs (simplified for React-PDF compatibility)
  const SimpleLineChart = ({ 
    data: chartData, 
    title, 
    lineColor 
  }: {
    data: Array<{ date: string; value: number }>;
    title: string;
    lineColor: string;
  }) => {
    if (chartData.length === 0) return null;

    // Calculate min/max for display
    const maxValue = Math.max(...chartData.map(d => d.value));
    const minValue = Math.min(...chartData.map(d => d.value));
    
    return (
      <View style={styles.chartContainer}>
        <Text style={[styles.chartTitle, { color: lineColor }]}>
          {title}
        </Text>
        
        <View style={styles.chartWrapper}>
          {/* Simplified chart representation */}
          <View style={{
            height: 120,
            backgroundColor: '#FFFFFF',
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',
            border: `2px solid ${lineColor}`,
          }}>
            <Text style={{
              fontSize: 12,
              color: lineColor,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
              {title} Chart
            </Text>
            <Text style={{
              fontSize: 10,
              color: '#6B7280',
              textAlign: 'center',
              marginTop: 4,
            }}>
              {chartData.length} data points
            </Text>
          </View>
          
          <View style={styles.chartLabels}>
            <Text>Min: {formatNumber(minValue)}</Text>
            <Text>Max: {formatNumber(maxValue)}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Page style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Performance Over Time</Text>
        <Text style={styles.subtitle}>
          Daily clicks and impressions trend analysis | {data.reportPeriod.startDate} - {data.reportPeriod.endDate}
        </Text>
      </View>

      {/* Performance Summary */}
      <View style={styles.insightBox}>
        <Text style={styles.insightTitle}>
          Period Overview
        </Text>
        <Text style={styles.insightText}>
          {generateInsights()}
        </Text>
      </View>

      {/* Impressions Chart */}
      <SimpleLineChart
        data={dailyData.map(day => ({
          date: day.date,
          value: day.impressions
        }))}
        title="Impressions Over Time"
        lineColor="#9233ea" // Purple
      />

      {/* Clicks Chart */}
      <SimpleLineChart
        data={dailyData.map(day => ({
          date: day.date,
          value: day.clicks
        }))}
        title="Clicks Over Time"
        lineColor="#22d3ee" // Cyan
      />

      {/* Key Metrics Summary */}
      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={[styles.metricLabel, { color: '#9233ea' }]}>
            Total Impressions
          </Text>
          <Text style={styles.metricValue}>
            {formatNumber(data.gscData?.totalImpressions || 0)}
          </Text>
          <Text style={styles.metricDescription}>
            Search results shown
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={[styles.metricLabel, { color: '#22d3ee' }]}>
            Total Clicks
          </Text>
          <Text style={styles.metricValue}>
            {formatNumber(data.gscData?.totalClicks || 0)}
          </Text>
          <Text style={styles.metricDescription}>
            Users clicked through
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={[styles.metricLabel, { color: primaryColor }]}>
            Average CTR
          </Text>
          <Text style={styles.metricValue}>
            {(data.gscData?.averageCTR || 0).toFixed(1)}%
          </Text>
          <Text style={styles.metricDescription}>
            Click-through rate
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={[styles.metricLabel, { color: '#10B981' }]}>
            Avg Position
          </Text>
          <Text style={styles.metricValue}>
            {(data.gscData?.averagePosition || 0).toFixed(1)}
          </Text>
          <Text style={styles.metricDescription}>
            Search ranking
          </Text>
        </View>
      </View>
    </Page>
  );
};
import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { ReportData } from '../types';

interface PageSpeedInsightsPageProps {
  data: ReportData;
}

export const PageSpeedInsightsPage: React.FC<PageSpeedInsightsPageProps> = ({ data }) => {
  if (!data.pageSpeedData) {
    return null; // Don't render page if no PageSpeed data
  }

  const { pageSpeedData } = data;
  const primaryColor = data.branding.primaryColor || '#7e23ce';

  // Helper function for score color
  const getScoreColor = (score: number): string => {
    if (score >= 90) return '#10b981'; // green
    if (score >= 50) return '#f59e0b'; // orange
    return '#ef4444'; // red
  };

  // Helper function for CWV status
  const getCWVStatus = (value: number | null, thresholds: {good: number, poor: number}): string => {
    if (value === null) return 'N/A';
    if (value <= thresholds.good) return 'Good';
    if (value <= thresholds.poor) return 'Needs Improvement';
    return 'Poor';
  };

  const getCWVStatusColor = (value: number | null, thresholds: {good: number, poor: number}): string => {
    if (value === null) return '#9ca3af';
    if (value <= thresholds.good) return '#10b981';
    if (value <= thresholds.poor) return '#f59e0b';
    return '#ef4444';
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      padding: 30,
      fontFamily: 'Helvetica',
    },
    header: {
      backgroundColor: primaryColor,
      padding: 20,
      marginBottom: 24,
      borderRadius: 8,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 14,
      color: '#ffffff',
      opacity: 0.9,
    },
    scoresContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 32,
      gap: 20,
    },
    scoreCard: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f9fafb',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#e5e7eb',
    },
    scoreLabel: {
      fontSize: 12,
      color: '#6b7280',
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    scoreValue: {
      fontSize: 48,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    scoreOutOf: {
      fontSize: 18,
      color: '#9ca3af',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 16,
      marginTop: 24,
    },
    cwvContainer: {
      flexDirection: 'row',
      gap: 15,
      marginBottom: 24,
    },
    cwvCard: {
      flex: 1,
      padding: 15,
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#e5e7eb',
      borderRadius: 6,
    },
    cwvTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 8,
    },
    cwvValue: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    cwvDescription: {
      fontSize: 9,
      color: '#6b7280',
      lineHeight: 1.4,
      marginBottom: 8,
    },
    cwvStatus: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 4,
      alignSelf: 'flex-start',
    },
    cwvStatusText: {
      fontSize: 9,
      color: '#ffffff',
      fontWeight: 'bold',
    },
    opportunitiesContainer: {
      marginTop: 24,
    },
    opportunityCard: {
      padding: 12,
      backgroundColor: '#fef3c7',
      borderLeftWidth: 4,
      borderLeftColor: '#f59e0b',
      marginBottom: 10,
      borderRadius: 4,
    },
    opportunityHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },
    opportunityNumber: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#f59e0b',
      marginRight: 8,
      width: 24,
      textAlign: 'center',
    },
    opportunityTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#92400e',
      flex: 1,
    },
    opportunityDescription: {
      fontSize: 9,
      color: '#78350f',
      lineHeight: 1.4,
      marginBottom: 4,
    },
    opportunityValue: {
      fontSize: 9,
      color: '#b45309',
      fontStyle: 'italic',
    },
  });

  return (
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PageSpeed Insights</Text>
        <Text style={styles.headerSubtitle}>
          Performance analysis for {data.clientName}
        </Text>
      </View>

      {/* Performance Scores */}
      <View style={styles.scoresContainer}>
        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Mobile Performance</Text>
          <Text style={[styles.scoreValue, { color: getScoreColor(pageSpeedData.mobile.score) }]}>
            {pageSpeedData.mobile.score}
          </Text>
          <Text style={styles.scoreOutOf}>/100</Text>
        </View>
        
        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Desktop Performance</Text>
          <Text style={[styles.scoreValue, { color: getScoreColor(pageSpeedData.desktop.score) }]}>
            {pageSpeedData.desktop.score}
          </Text>
          <Text style={styles.scoreOutOf}>/100</Text>
        </View>
      </View>

      {/* Core Web Vitals */}
      <Text style={styles.sectionTitle}>Core Web Vitals (Mobile)</Text>
      <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 16 }}>
        Key metrics that impact user experience and search rankings
      </Text>
      
      <View style={styles.cwvContainer}>
        {/* LCP */}
        <View style={styles.cwvCard}>
          <Text style={styles.cwvTitle}>LCP</Text>
          <Text style={[styles.cwvValue, { color: primaryColor }]}>
            {pageSpeedData.mobile.lcp 
              ? `${(pageSpeedData.mobile.lcp / 1000).toFixed(2)}s`
              : 'N/A'
            }
          </Text>
          <Text style={styles.cwvDescription}>
            Largest Contentful Paint{'\n'}Target: ≤ 2.5s
          </Text>
          {pageSpeedData.mobile.lcp && (
            <View style={[
              styles.cwvStatus, 
              { backgroundColor: getCWVStatusColor(pageSpeedData.mobile.lcp, {good: 2500, poor: 4000}) }
            ]}>
              <Text style={styles.cwvStatusText}>
                {getCWVStatus(pageSpeedData.mobile.lcp, {good: 2500, poor: 4000})}
              </Text>
            </View>
          )}
        </View>

        {/* FID */}
        <View style={styles.cwvCard}>
          <Text style={styles.cwvTitle}>FID</Text>
          <Text style={[styles.cwvValue, { color: primaryColor }]}>
            {pageSpeedData.mobile.fid 
              ? `${pageSpeedData.mobile.fid.toFixed(0)}ms`
              : 'N/A'
            }
          </Text>
          <Text style={styles.cwvDescription}>
            First Input Delay{'\n'}Target: ≤ 100ms
          </Text>
          {pageSpeedData.mobile.fid && (
            <View style={[
              styles.cwvStatus, 
              { backgroundColor: getCWVStatusColor(pageSpeedData.mobile.fid, {good: 100, poor: 300}) }
            ]}>
              <Text style={styles.cwvStatusText}>
                {getCWVStatus(pageSpeedData.mobile.fid, {good: 100, poor: 300})}
              </Text>
            </View>
          )}
        </View>

        {/* CLS */}
        <View style={styles.cwvCard}>
          <Text style={styles.cwvTitle}>CLS</Text>
          <Text style={[styles.cwvValue, { color: primaryColor }]}>
            {pageSpeedData.mobile.cls !== null
              ? pageSpeedData.mobile.cls.toFixed(3)
              : 'N/A'
            }
          </Text>
          <Text style={styles.cwvDescription}>
            Cumulative Layout Shift{'\n'}Target: ≤ 0.1
          </Text>
          {pageSpeedData.mobile.cls !== null && (
            <View style={[
              styles.cwvStatus, 
              { backgroundColor: getCWVStatusColor(pageSpeedData.mobile.cls, {good: 0.1, poor: 0.25}) }
            ]}>
              <Text style={styles.cwvStatusText}>
                {getCWVStatus(pageSpeedData.mobile.cls, {good: 0.1, poor: 0.25})}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Performance Opportunities */}
      {pageSpeedData.opportunities && pageSpeedData.opportunities.length > 0 && (
        <View style={styles.opportunitiesContainer}>
          <Text style={styles.sectionTitle}>Top Performance Opportunities</Text>
          <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 16 }}>
            Recommendations to improve website speed
          </Text>
          
          {pageSpeedData.opportunities.slice(0, 5).map((opportunity, index) => (
            <View key={index} style={styles.opportunityCard}>
              <View style={styles.opportunityHeader}>
                <Text style={styles.opportunityNumber}>{index + 1}</Text>
                <Text style={styles.opportunityTitle}>
                  {opportunity.title}
                </Text>
              </View>
              <Text style={styles.opportunityDescription}>
                {opportunity.description}
              </Text>
              {opportunity.displayValue && (
                <Text style={styles.opportunityValue}>
                  💡 {opportunity.displayValue}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </Page>
  );
};
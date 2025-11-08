import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { ReportData } from '../types';
import { ReportHeader } from '@/components/pdf/components/ReportHeader';
import { ReportFooter } from '@/components/pdf/components/ReportFooter';
import { createPDFStyles, createStyleSheet } from '@/components/pdf/BaseTemplate';

interface PageSpeedInsightsPageProps {
  data: ReportData;
  pageNumber: number;
  totalPages: number;
}

export const PageSpeedInsightsPage: React.FC<PageSpeedInsightsPageProps> = ({ data, pageNumber, totalPages }) => {
  if (!data.pageSpeedData) {
    return null; // Don't render page if no PageSpeed data
  }

  const { pageSpeedData } = data;
  const branding = data.branding;
  const pdfStyles = createPDFStyles(branding);
  const baseStyles = createStyleSheet(pdfStyles);
  const primaryColor = branding.primaryColor || '#7e23ce';

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

  const pageSpeedStyles = StyleSheet.create({
    // Remove page style as it's now handled by baseStyles
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
    <Page size="A4" style={baseStyles.page}>
      <ReportHeader
        title="PageSpeed Insights"
        subtitle={`Performance analysis for ${data.clientName}`}
        clientName={data.clientName}
        branding={branding}
      />
      
      <View style={baseStyles.container}>
      {/* Page Content Header */}
      <View style={pageSpeedStyles.header}>
        <Text style={pageSpeedStyles.headerTitle}>PageSpeed Insights</Text>
        <Text style={pageSpeedStyles.headerSubtitle}>
          Performance analysis for {data.clientName}
        </Text>
      </View>

      {/* Performance Scores */}
      <View style={pageSpeedStyles.scoresContainer}>
        <View style={pageSpeedStyles.scoreCard}>
          <Text style={pageSpeedStyles.scoreLabel}>Mobile Performance</Text>
          <Text style={[pageSpeedStyles.scoreValue, { color: getScoreColor(pageSpeedData.mobile.score) }]}>
            {pageSpeedData.mobile.score}
          </Text>
          <Text style={pageSpeedStyles.scoreOutOf}>/100</Text>
        </View>
        
        <View style={pageSpeedStyles.scoreCard}>
          <Text style={pageSpeedStyles.scoreLabel}>Desktop Performance</Text>
          <Text style={[pageSpeedStyles.scoreValue, { color: getScoreColor(pageSpeedData.desktop.score) }]}>
            {pageSpeedData.desktop.score}
          </Text>
          <Text style={pageSpeedStyles.scoreOutOf}>/100</Text>
        </View>
      </View>

      {/* Core Web Vitals */}
      <Text style={pageSpeedStyles.sectionTitle}>Core Web Vitals (Mobile)</Text>
      <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 16 }}>
        Key metrics that impact user experience and search rankings
      </Text>
      
      <View style={pageSpeedStyles.cwvContainer}>
        {/* LCP */}
        <View style={pageSpeedStyles.cwvCard}>
          <Text style={pageSpeedStyles.cwvTitle}>LCP</Text>
          <Text style={[pageSpeedStyles.cwvValue, { color: primaryColor }]}>
            {pageSpeedData.mobile.lcp 
              ? `${(pageSpeedData.mobile.lcp / 1000).toFixed(2)}s`
              : 'N/A'
            }
          </Text>
          <Text style={pageSpeedStyles.cwvDescription}>
            Largest Contentful Paint{'\n'}Target: ≤ 2.5s
          </Text>
          {pageSpeedData.mobile.lcp && (
            <View style={[
              pageSpeedStyles.cwvStatus, 
              { backgroundColor: getCWVStatusColor(pageSpeedData.mobile.lcp, {good: 2500, poor: 4000}) }
            ]}>
              <Text style={pageSpeedStyles.cwvStatusText}>
                {getCWVStatus(pageSpeedData.mobile.lcp, {good: 2500, poor: 4000})}
              </Text>
            </View>
          )}
        </View>

        {/* FID */}
        <View style={pageSpeedStyles.cwvCard}>
          <Text style={pageSpeedStyles.cwvTitle}>FID</Text>
          <Text style={[pageSpeedStyles.cwvValue, { color: primaryColor }]}>
            {pageSpeedData.mobile.fid 
              ? `${pageSpeedData.mobile.fid.toFixed(0)}ms`
              : 'N/A'
            }
          </Text>
          <Text style={pageSpeedStyles.cwvDescription}>
            First Input Delay{'\n'}Target: ≤ 100ms
          </Text>
          {pageSpeedData.mobile.fid && (
            <View style={[
              pageSpeedStyles.cwvStatus, 
              { backgroundColor: getCWVStatusColor(pageSpeedData.mobile.fid, {good: 100, poor: 300}) }
            ]}>
              <Text style={pageSpeedStyles.cwvStatusText}>
                {getCWVStatus(pageSpeedData.mobile.fid, {good: 100, poor: 300})}
              </Text>
            </View>
          )}
        </View>

        {/* CLS */}
        <View style={pageSpeedStyles.cwvCard}>
          <Text style={pageSpeedStyles.cwvTitle}>CLS</Text>
          <Text style={[pageSpeedStyles.cwvValue, { color: primaryColor }]}>
            {pageSpeedData.mobile.cls !== null
              ? pageSpeedData.mobile.cls.toFixed(3)
              : 'N/A'
            }
          </Text>
          <Text style={pageSpeedStyles.cwvDescription}>
            Cumulative Layout Shift{'\n'}Target: ≤ 0.1
          </Text>
          {pageSpeedData.mobile.cls !== null && (
            <View style={[
              pageSpeedStyles.cwvStatus, 
              { backgroundColor: getCWVStatusColor(pageSpeedData.mobile.cls, {good: 0.1, poor: 0.25}) }
            ]}>
              <Text style={pageSpeedStyles.cwvStatusText}>
                {getCWVStatus(pageSpeedData.mobile.cls, {good: 0.1, poor: 0.25})}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Performance Opportunities - Prevent page breaks within this section */}
      {pageSpeedData.opportunities && pageSpeedData.opportunities.length > 0 && (
        <View style={pageSpeedStyles.opportunitiesContainer} break={false}>
          <Text style={pageSpeedStyles.sectionTitle}>Top Performance Opportunities</Text>
          <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 16 }}>
            Recommendations to improve website speed
          </Text>
          
          {pageSpeedData.opportunities.slice(0, 5).map((opportunity, index) => (
            <View key={index} style={pageSpeedStyles.opportunityCard}>
              <View style={pageSpeedStyles.opportunityHeader}>
                <Text style={pageSpeedStyles.opportunityNumber}>{index + 1}</Text>
                <Text style={pageSpeedStyles.opportunityTitle}>
                  {opportunity.title}
                </Text>
              </View>
              <Text style={pageSpeedStyles.opportunityDescription}>
                {opportunity.description}
              </Text>
              {opportunity.displayValue && (
                <Text style={pageSpeedStyles.opportunityValue}>
                  💡 {opportunity.displayValue}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
      </View>
      
      <ReportFooter
        branding={branding}
      />
    </Page>
  );
};
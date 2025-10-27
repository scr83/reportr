import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { ReportData } from '../types';
import { formatPercentage, getFooterText } from './styles';

interface StrategicRecommendationsPageProps {
  data: ReportData;
}

export const StrategicRecommendationsPage: React.FC<StrategicRecommendationsPageProps> = ({ data }) => {
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
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1F2937',
      marginTop: 20,
      marginBottom: 15,
    },
    actionItem: {
      flexDirection: 'row',
      marginBottom: 20,
      alignItems: 'flex-start',
    },
    actionNumber: {
      width: 28,
      height: 28,
      backgroundColor: primaryColor,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 15,
      marginTop: 2,
    },
    actionNumberText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    actionContent: {
      flex: 1,
    },
    actionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: 6,
    },
    actionDescription: {
      fontSize: 12,
      color: '#374151',
      lineHeight: 1.5,
    },
    nextStepsBox: {
      borderLeftWidth: 4,
      padding: 20,
      borderRadius: 8,
      marginTop: 30,
    },
    nextStepsTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    bulletList: {
      marginLeft: 0,
    },
    bulletItem: {
      fontSize: 12,
      color: '#374151',
      lineHeight: 1.6,
      marginBottom: 4,
    },
    contactQuestion: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#1F2937',
      textAlign: 'center',
      marginTop: 40,
      marginBottom: 8,
    },
    contactInfo: {
      fontSize: 12,
      textAlign: 'center',
      fontWeight: 'bold',
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
      {/* Page 1: Strategic Recommendations */}
      <Page style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Strategic Recommendations</Text>
            <Text style={styles.subtitle}>Next steps to improve your digital performance</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.clientName}>{data.clientName}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Priority Actions</Text>

        {/* Action 1 */}
        <View style={styles.actionItem}>
          <View style={styles.actionNumber}>
            <Text style={styles.actionNumberText}>1</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Enhance Conversion Tracking</Text>
            <Text style={styles.actionDescription}>
              Set up detailed conversion tracking to measure the effectiveness of your marketing 
              efforts. Implement event tracking for key user actions and establish conversion 
              funnels to identify drop-off points.
            </Text>
          </View>
        </View>

        {/* Action 2 */}
        <View style={styles.actionItem}>
          <View style={styles.actionNumber}>
            <Text style={styles.actionNumberText}>2</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Optimize Conversion Funnel</Text>
            <Text style={styles.actionDescription}>
              Focus on improving the user journey and conversion funnel to maximize results from 
              existing traffic. Conduct A/B testing on landing pages and CTAs to improve 
              conversion rates across high-traffic pages.
            </Text>
          </View>
        </View>

        {/* Action 3 */}
        <View style={styles.actionItem}>
          <View style={styles.actionNumber}>
            <Text style={styles.actionNumberText}>3</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Improve Search Visibility</Text>
            <Text style={styles.actionDescription}>
              Based on your current average position of {data.gscMetrics.position.toFixed(1)}, 
              focus on optimizing content for target keywords. Implement technical SEO improvements 
              and content optimization to move rankings from page 2 to page 1.
            </Text>
          </View>
        </View>

        {/* Action 4 */}
        <View style={styles.actionItem}>
          <View style={styles.actionNumber}>
            <Text style={styles.actionNumberText}>4</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Enhance User Experience</Text>
            <Text style={styles.actionDescription}>
              With a bounce rate of {formatPercentage(data.ga4Metrics.bounceRate)}, focus on improving 
              page load speeds, mobile responsiveness, and content relevance. Consider implementing 
              personalization features to increase engagement and session duration.
            </Text>
          </View>
        </View>

        {/* Action 5 */}
        <View style={styles.actionItem}>
          <View style={styles.actionNumber}>
            <Text style={styles.actionNumberText}>5</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Expand Content Strategy</Text>
            <Text style={styles.actionDescription}>
              Develop a comprehensive content strategy targeting long-tail keywords and user intent. 
              Create valuable resources that address your audience&apos;s pain points and establish 
              thought leadership in your industry.
            </Text>
          </View>
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

      {/* Page 2: Next Steps */}
      <Page style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Strategic Recommendations</Text>
            <Text style={styles.subtitle}>Implementation plan and next steps</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.clientName}>{data.clientName}</Text>
          </View>
        </View>

        {/* Next Steps Box - Now guaranteed to start at top of new page */}
        <View style={[styles.nextStepsBox, {backgroundColor: '#D1FAE5', borderColor: '#10B981', marginTop: 20}]}>
          <Text style={[styles.nextStepsTitle, {color: '#065F46'}]}>Next Steps</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Schedule monthly performance reviews</Text>
            <Text style={styles.bulletItem}>• Implement recommended optimizations</Text>
            <Text style={styles.bulletItem}>• Set up automated monitoring alerts</Text>
            <Text style={styles.bulletItem}>• Plan quarterly strategy adjustments</Text>
            <Text style={styles.bulletItem}>• Monitor competitor performance and trends</Text>
          </View>
        </View>

        {/* Footer Question */}
        <Text style={styles.contactQuestion}>
          Questions about this report? Contact {data.branding.companyName || 'your agency'}
        </Text>
        <Text style={[styles.contactInfo, {color: primaryColor}]}>
          {data.branding.email || data.branding.website}
        </Text>

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
    </>
  );
};
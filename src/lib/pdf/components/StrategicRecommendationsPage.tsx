import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { ReportData } from '../types';
import { formatPercentage } from './styles';
import { ReportFooter } from '../../../components/pdf/components/ReportFooter';

interface StrategicRecommendationsPageProps {
  data: ReportData;
}

export const StrategicRecommendationsPage: React.FC<StrategicRecommendationsPageProps> = ({ data }) => {
  const primaryColor = data.branding.primaryColor || '#7e23ce';
  
  // Get AI insights or fallback to hardcoded recommendations
  const insights = data.aiInsights && data.aiInsights.length > 0 
    ? data.aiInsights.slice(0, 5) // Limit to 5 insights to match layout
    : null;
    
  console.log('🔍 [STRATEGIC-RECOMMENDATIONS-PDF] Received data.aiInsights:', JSON.stringify(data.aiInsights, null, 2));
  console.log('🔍 [STRATEGIC-RECOMMENDATIONS-PDF] Using insights:', insights ? 'AI insights' : 'fallback recommendations');

  // Helper function to get priority-based action number background color
  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return '#DC2626'; // red-600
      case 'medium':
        return '#D97706'; // orange-600
      case 'low':
        return '#059669'; // green-600
      default:
        return primaryColor;
    }
  };

  // Fallback hardcoded recommendations for backward compatibility
  const fallbackRecommendations = [
    {
      title: 'Enhance Conversion Tracking',
      description: 'Set up detailed conversion tracking to measure the effectiveness of your marketing efforts. Implement event tracking for key user actions and establish conversion funnels to identify drop-off points.',
      priority: 'high' as const,
      expectedImpact: 'Better tracking leads to 25% improvement in marketing ROI',
      actionItems: [
        'Set up Google Analytics 4 conversion goals',
        'Implement event tracking for key user actions',
        'Create custom conversion funnels in analytics'
      ]
    },
    {
      title: 'Optimize Conversion Funnel',
      description: 'Focus on improving the user journey and conversion funnel to maximize results from existing traffic. Conduct A/B testing on landing pages and CTAs to improve conversion rates across high-traffic pages.',
      priority: 'medium' as const,
      expectedImpact: 'A/B testing typically increases conversions by 10-30%',
      actionItems: [
        'Identify top 3 high-traffic landing pages',
        'Create A/B tests for headlines and CTAs',
        'Optimize checkout or contact form processes'
      ]
    },
    {
      title: 'Improve Search Visibility',
      description: `Based on your current average position of ${data.gscMetrics.position.toFixed(1)}, focus on optimizing content for target keywords. Implement technical SEO improvements and content optimization to move rankings from page 2 to page 1.`,
      priority: 'high' as const,
      expectedImpact: 'Moving to page 1 can increase organic traffic by 50-100%',
      actionItems: [
        'Optimize title tags and meta descriptions',
        'Improve page loading speed and Core Web Vitals',
        'Build high-quality backlinks to target pages'
      ]
    },
    {
      title: 'Enhance User Experience',
      description: `With a bounce rate of ${formatPercentage(data.ga4Metrics.bounceRate)}, focus on improving page load speeds, mobile responsiveness, and content relevance. Consider implementing personalization features to increase engagement and session duration.`,
      priority: 'medium' as const,
      expectedImpact: 'Better UX can reduce bounce rate by 20% and increase conversions',
      actionItems: [
        'Optimize page loading speed (target <3 seconds)',
        'Improve mobile responsiveness and navigation',
        'Add relevant calls-to-action above the fold'
      ]
    },
    {
      title: 'Expand Content Strategy',
      description: 'Develop a comprehensive content strategy targeting long-tail keywords and user intent. Create valuable resources that address your audience\'s pain points and establish thought leadership in your industry.',
      priority: 'low' as const,
      expectedImpact: 'Content hubs can increase organic traffic by 30-50% over 6 months',
      actionItems: [
        'Research competitor content gaps and opportunities',
        'Create comprehensive topic clusters',
        'Develop regular content publication schedule'
      ]
    }
  ];

  // Get recommendations to display (AI insights or fallback)
  const recommendations = insights ? insights.map(insight => ({
    title: insight.title,
    description: insight.description,
    priority: insight.priority,
    expectedImpact: insight.expectedImpact,
    actionItems: insight.actionItems
  })) : fallbackRecommendations;

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
    expectedImpact: {
      fontSize: 11,
      color: '#059669', // green-600
      fontWeight: 'bold',
      marginTop: 6,
      marginBottom: 6,
    },
    actionItemsContainer: {
      marginTop: 8,
    },
    actionItemsHeader: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#374151',
      marginBottom: 4,
    },
    actionItemBullet: {
      fontSize: 10,
      color: '#4B5563',
      lineHeight: 1.4,
      marginBottom: 2,
      marginLeft: 8,
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

        {/* Dynamic Action Items - AI Insights or Fallback */}
        {recommendations.map((recommendation, index) => (
          <View key={index} style={styles.actionItem}>
            <View style={[
              styles.actionNumber,
              { backgroundColor: getPriorityColor(recommendation.priority) }
            ]}>
              <Text style={styles.actionNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>{recommendation.title}</Text>
              <Text style={styles.actionDescription}>
                {recommendation.description}
              </Text>
              
              {/* Show expected impact if available */}
              {recommendation.expectedImpact && (
                <Text style={styles.expectedImpact}>
                  Expected Impact: {recommendation.expectedImpact}
                </Text>
              )}
              
              {/* Show action items if available */}
              {recommendation.actionItems && recommendation.actionItems.length > 0 && (
                <View style={styles.actionItemsContainer}>
                  <Text style={styles.actionItemsHeader}>Action Steps:</Text>
                  {recommendation.actionItems.map((action, actionIndex) => (
                    <Text key={actionIndex} style={styles.actionItemBullet}>
                      • {action}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </View>
        ))}

        <ReportFooter branding={data.branding} pageNumber={1} />
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
          Questions about this report? Contact {(!data.branding.whiteLabelEnabled && !data.branding.enabled) ? 'Reportr' : (data.branding.companyName || 'your agency')}
        </Text>
        <Text style={[styles.contactInfo, {color: primaryColor}]}>
          {(!data.branding.whiteLabelEnabled && !data.branding.enabled) ? 'hello@reportr.agency' : (data.branding.supportEmail || data.branding.email || 'hello@reportr.agency')}
        </Text>

        <ReportFooter branding={data.branding} pageNumber={2} />
      </Page>
    </>
  );
};
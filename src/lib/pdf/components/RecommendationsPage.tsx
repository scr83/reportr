import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles, createBrandedStyles } from './styles';
import { ReportData } from '../types';
import { ReportHeader } from '../../../components/pdf/components/ReportHeader';
import { ReportFooter } from '../../../components/pdf/components/ReportFooter';

interface RecommendationsPageProps {
  data: ReportData;
}

export const RecommendationsPage: React.FC<RecommendationsPageProps> = ({ data }) => {
  const brandedStyles = createBrandedStyles(data.branding.primaryColor);


  // Get recommendations from data or create default ones
  const getRecommendations = () => {
    // Use direct recommendations if available
    if (data.recommendations && data.recommendations.length > 0) {
      return data.recommendations.map(rec => rec.description).slice(0, 8);
    }

    // Use insights if available
    if (data.insights) {
      const recommendations: string[] = [];
      if (data.insights.traffic) recommendations.push(data.insights.traffic);
      if (data.insights.engagement) recommendations.push(data.insights.engagement);
      if (data.insights.search) recommendations.push(data.insights.search);
      if (recommendations.length > 0) return recommendations;
    }

    // Default recommendations based on available data
    const defaultRecommendations: string[] = [];

    if (data.ga4Metrics.bounceRate > 60) {
      defaultRecommendations.push('Improve page loading speed to reduce bounce rate and keep visitors engaged longer on your site.');
    }

    if (data.gscMetrics.position > 10) {
      defaultRecommendations.push('Focus on optimizing your top-performing keywords to improve search rankings and increase organic visibility.');
    }

    if (data.gscMetrics.ctr < 0.05) {
      defaultRecommendations.push('Improve meta titles and descriptions to increase click-through rates from search results.');
    }

    if (data.ga4Metrics.avgSessionDuration && data.ga4Metrics.avgSessionDuration < 120) {
      defaultRecommendations.push('Create more engaging content and improve internal linking to increase session duration.');
    }

    defaultRecommendations.push('Implement structured data markup to enhance search result appearance and improve organic click-through rates.');
    defaultRecommendations.push('Conduct regular content audits to identify and optimize underperforming pages.');
    defaultRecommendations.push('Build high-quality backlinks through strategic outreach and content marketing initiatives.');

    return defaultRecommendations.slice(0, 8);
  };

  const recommendations = getRecommendations();

  return (
    <Page size="A4" style={styles.page}>
      <ReportHeader
        title="Strategic Recommendations"
        subtitle={`Generated on ${new Date().toLocaleDateString('en-US')}`}
        clientName={data.clientName}
        branding={data.branding}
      />
      
      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Strategic Action Items</Text>
          <Text style={styles.sectionContent}>
            Based on our analysis of your SEO performance, we recommend implementing 
            the following strategies to improve your search engine visibility and 
            drive more qualified traffic to your website.
          </Text>
          
          <View style={styles.recommendationsList}>
            {recommendations.map((recommendation, index) => (
              <View key={index} style={styles.recommendationItem}>
                <Text style={[styles.recommendationNumber, brandedStyles.brandBackground]}>
                  {index + 1}
                </Text>
                <Text style={styles.recommendationText}>
                  {recommendation}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Call to Action Section */}
      <View style={[styles.ctaSection, brandedStyles.brandBackground]}>
        <Text style={styles.ctaTitle}>
          Ready to Improve Your SEO Performance?
        </Text>
        <Text style={styles.ctaText}>
          Our team is ready to help you implement these recommendations and 
          drive measurable results for your business. Let&apos;s schedule a consultation 
          to discuss your SEO strategy and growth opportunities.
        </Text>
        
        <View style={styles.ctaContact}>
          {data.branding.email && (
            <Text style={styles.ctaContactText}>
              {data.branding.email}
            </Text>
          )}
          {data.branding.phone && (
            <Text style={styles.ctaContactText}>
              {data.branding.phone}
            </Text>
          )}
        </View>
        
        {data.branding.website && (
          <Text style={[styles.ctaText, styles.textCenter, styles.mt10]}>
            Visit us at {data.branding.website}
          </Text>
        )}
      </View>

      <ReportFooter branding={data.branding} />
    </Page>
  );
};
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles, createBrandedStyles, formatNumber, formatPercentage, formatDuration } from './styles';
import { ReportData } from '../types';

interface ExecutiveSummaryProps {
  data: ReportData;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ data }) => {
  const brandedStyles = createBrandedStyles(data.branding.primaryColor);

  // Get metrics data - prioritize GA4 data, fall back to metrics
  const metrics = data.ga4Metrics || {};
  const gscData = data.gscMetrics;

  // Header Component
  const Header: React.FC = () => (
    <View style={styles.header}>
      <Text style={[styles.headerTitle, brandedStyles.brandPrimary]}>
        Executive Summary
      </Text>
      <Text style={styles.headerDate}>
        {new Date().toLocaleDateString('en-US')}
      </Text>
    </View>
  );

  // Footer Component
  const Footer: React.FC = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        {data.branding.companyName} • {data.clientName} SEO Report
      </Text>
      <Text style={styles.footerPage}>
        Page 2
      </Text>
    </View>
  );

  // Metric Card Component
  const MetricCard: React.FC<{
    title: string;
    value: string;
    subtitle?: string;
    isPositive?: boolean;
  }> = ({ title, value, subtitle, isPositive = true }) => (
    <View style={styles.metricCard}>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      {subtitle && (
        <Text style={isPositive ? styles.metricChange : styles.metricChangeNegative}>
          {subtitle}
        </Text>
      )}
    </View>
  );

  // Key Insight Component
  const KeyInsight: React.FC<{
    title: string;
    description: string;
    priority?: 'high' | 'medium' | 'low';
  }> = ({ title, description, priority = 'medium' }) => (
    <View style={styles.insightBox}>
      <Text style={styles.insightTitle}>{title}</Text>
      <Text style={styles.insightText}>{description}</Text>
      {priority && (
        <Text style={[
          styles.insightPriority,
          priority === 'high' ? styles.priorityHigh :
          priority === 'medium' ? styles.priorityMedium :
          styles.priorityLow
        ]}>
          {priority} priority
        </Text>
      )}
    </View>
  );

  return (
    <Page size="A4" style={styles.page}>
      <Header />
      
      {/* Key Metrics Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Performance Metrics</Text>
        
        <View style={styles.metricsGrid}>
          <MetricCard
            title="Total Users"
            value={formatNumber(metrics.users || metrics.newUsers)}
            subtitle="Website visitors"
          />
          
          <MetricCard
            title="Sessions"
            value={formatNumber(metrics.sessions)}
            subtitle="Total visits"
          />
          
          <MetricCard
            title="Bounce Rate"
            value={formatPercentage(metrics.bounceRate)}
            subtitle="Single-page visits"
            isPositive={false}
          />
          
          <MetricCard
            title="Avg Session Duration"
            value={formatDuration(metrics.avgSessionDuration)}
            subtitle="Time on site"
          />
        </View>

        {/* Additional metrics if available */}
        {(gscData || metrics.conversions) && (
          <View style={styles.metricsGrid}>
            {gscData && (
              <>
                <MetricCard
                  title="Search Console Clicks"
                  value={formatNumber(gscData.clicks)}
                  subtitle="From Google search"
                />
                
                <MetricCard
                  title="Average Position"
                  value={gscData.position.toFixed(1)}
                  subtitle="In search results"
                />
              </>
            )}
            
            {metrics.conversions && (
              <MetricCard
                title="Conversions"
                value={formatNumber(metrics.conversions)}
                subtitle="Goal completions"
              />
            )}
            
          </View>
        )}
      </View>

      {/* Key Insights Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Insights</Text>
        
        {data.insights ? (
          <>
            {data.insights.traffic && (
              <KeyInsight
                key="traffic"
                title="Traffic Analysis"
                description={data.insights.traffic}
                priority="high"
              />
            )}
            {data.insights.engagement && (
              <KeyInsight
                key="engagement"
                title="Engagement Insights"
                description={data.insights.engagement}
                priority="medium"
              />
            )}
            {data.insights.search && (
              <KeyInsight
                key="search"
                title="Search Performance"
                description={data.insights.search}
                priority="high"
              />
            )}
          </>
        ) : (
          <>
            {/* Default insights based on available data */}
            {metrics.bounceRate && metrics.bounceRate > 60 && (
              <KeyInsight
                title="High Bounce Rate Detected"
                description={`Your bounce rate of ${formatPercentage(metrics.bounceRate)} indicates visitors are leaving quickly. Consider improving page load speed and content relevance.`}
                priority="high"
              />
            )}
            
            {gscData && gscData.position > 10 && (
              <KeyInsight
                title="Search Ranking Opportunity"
                description={`Average search position of ${gscData.position.toFixed(1)} shows room for improvement. Focus on optimizing top-performing keywords.`}
                priority="medium"
              />
            )}
            
            
            {metrics.organicTraffic && (
              <KeyInsight
                title="Organic Traffic Performance"
                description={`${formatNumber(metrics.organicTraffic)} organic visitors shows your SEO efforts are generating results. Continue building on this foundation.`}
                priority="low"
              />
            )}
          </>
        )}
      </View>

      <Footer />
    </Page>
  );
};
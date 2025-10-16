import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles, createBrandedStyles, formatNumber, formatPercentage, formatDuration } from './styles';
import { ReportData } from '../types';

interface StandardReportPageProps {
  data: ReportData;
}

export const StandardReportPage: React.FC<StandardReportPageProps> = ({ data }) => {
  const brandedStyles = createBrandedStyles(data.branding.primaryColor);

  // Get comprehensive data for standard reports
  const ga4Data = data.ga4Metrics;
  const gscData = data.gscMetrics;
  const metrics = ga4Data || {};

  // Header Component
  const Header: React.FC = () => (
    <View style={styles.header}>
      <Text style={[styles.headerTitle, brandedStyles.brandPrimary]}>
        Standard SEO Report
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
        Page 3
      </Text>
    </View>
  );

  // Comprehensive Metric Card Component
  const MetricCard: React.FC<{
    title: string;
    value: string;
    subtitle?: string;
    isPositive?: boolean;
    width?: string;
  }> = ({ title, value, subtitle, isPositive = true, width = '48%' }) => (
    <View style={[styles.metricCard, { width }]}>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      {subtitle && (
        <Text style={isPositive ? styles.metricChange : styles.metricChangeNegative}>
          {subtitle}
        </Text>
      )}
    </View>
  );

  // Data Table Component for top queries/pages
  const DataTable: React.FC<{
    title: string;
    headers: string[];
    data: any[];
    maxRows?: number;
  }> = ({ title, headers, data, maxRows = 5 }) => (
    <View style={[styles.section, styles.mb20]}>
      <Text style={styles.sectionSubtitle}>{title}</Text>
      
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          {headers.map((header, index) => (
            <Text key={index} style={styles.tableHeaderCell}>
              {header}
            </Text>
          ))}
        </View>
        
        {/* Table Rows */}
        {data.slice(0, maxRows).map((row, rowIndex) => (
          <View key={rowIndex} style={styles.tableRow}>
            {Object.values(row).map((cell: any, cellIndex) => (
              <Text 
                key={cellIndex} 
                style={cellIndex === 0 ? styles.tableCell : styles.tableCellNumber}
              >
                {typeof cell === 'number' ? formatNumber(cell) : String(cell)}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <Page size="A4" style={styles.page}>
      <Header />
      
      {/* Comprehensive Metrics Grid */}
      {ga4Data && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comprehensive Analytics</Text>
          
          {/* Primary Metrics */}
          <View style={styles.metricsGrid}>
            <MetricCard
              title="Total Users"
              value={formatNumber(ga4Data.users)}
              subtitle="Unique visitors"
            />
            
            <MetricCard
              title="Sessions"
              value={formatNumber(ga4Data.sessions)}
              subtitle="Total visits"
            />
            
            <MetricCard
              title="New Users"
              value={formatNumber(ga4Data.newUsers || 0)}
              subtitle="First-time visitors"
            />
            
            <MetricCard
              title="Page Views"
              value={formatNumber(ga4Data.pageViews || 0)}
              subtitle="Total page views"
            />
          </View>

          {/* Engagement Metrics */}
          <View style={styles.metricsGrid}>
            <MetricCard
              title="Bounce Rate"
              value={formatPercentage(ga4Data.bounceRate)}
              subtitle="Single-page visits"
              isPositive={false}
            />
            
            <MetricCard
              title="Session Duration"
              value={formatDuration(ga4Data.sessionDuration || 0)}
              subtitle="Average time on site"
            />
            
            <MetricCard
              title="Engagement Rate"
              value={formatPercentage(ga4Data.engagementRate || 0)}
              subtitle="User engagement"
            />
            
            <MetricCard
              title="Conversions"
              value={formatNumber(ga4Data.conversions || 0)}
              subtitle="Goal completions"
            />
          </View>

          {/* Device Breakdown - disabled for new interface */}
        </View>
      )}

      {/* Google Search Console Performance */}
      {gscData && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search Console Performance</Text>
          
          <View style={styles.metricsGrid}>
            <MetricCard
              title="Total Clicks"
              value={formatNumber(gscData.clicks)}
              subtitle="From Google search"
            />
            
            <MetricCard
              title="Total Impressions"
              value={formatNumber(gscData.impressions)}
              subtitle="Search result views"
            />
            
            <MetricCard
              title="Average CTR"
              value={formatPercentage(gscData.ctr)}
              subtitle="Click-through rate"
            />
            
            <MetricCard
              title="Average Position"
              value={gscData.position?.toFixed(1) || '0.0'}
              subtitle="Search ranking"
              isPositive={gscData.position <= 10}
            />
          </View>
        </View>
      )}

      {/* Additional sections disabled - not part of new interface */}

      <Footer />
    </Page>
  );
};
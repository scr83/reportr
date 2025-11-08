import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles, createBrandedStyles, formatNumber, formatPercentage, formatDuration, formatDecimal, formatValue } from './styles';
import { ReportData } from '../types';
import { ReportFooter } from '../../../components/pdf/components/ReportFooter';

interface CustomReportPageProps {
  data: ReportData;
}

export const CustomReportPage: React.FC<CustomReportPageProps> = ({ data }) => {
  const brandedStyles = createBrandedStyles(data.branding.primaryColor);

  // Get available data sources
  const ga4Data = data.ga4Metrics;
  const gscData = data.gscMetrics;
  const metrics = data.ga4Metrics || {};
  const selectedMetrics = (data as any).selectedMetrics || [];
  const customFields = (data as any).customFields || [];

  // Header Component
  const Header: React.FC = () => (
    <View style={styles.header}>
      <Text style={[styles.headerTitle, brandedStyles.brandPrimary]}>
        Custom SEO Report
      </Text>
      <Text style={styles.headerDate}>
        {new Date().toLocaleDateString('en-US')}
      </Text>
    </View>
  );


  // Dynamic Metric Card Component
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

  // Custom Field Component
  const CustomField: React.FC<{
    field: {
      title: string;
      content: string;
      type: 'insight' | 'recommendation' | 'metric';
    };
  }> = ({ field }) => {
    const getFieldStyle = () => {
      switch (field.type) {
        case 'insight':
          return styles.insightBox;
        case 'recommendation':
          return { ...styles.insightBox, backgroundColor: '#FEF3C7', borderLeftColor: '#D97706' };
        case 'metric':
          return { ...styles.insightBox, backgroundColor: '#ECFDF5', borderLeftColor: '#059669' };
        default:
          return styles.insightBox;
      }
    };

    const getFieldIcon = () => {
      switch (field.type) {
        case 'insight': return '💡';
        case 'recommendation': return '🎯';
        case 'metric': return '📊';
        default: return '📋';
      }
    };

    return (
      <View style={getFieldStyle()}>
        <Text style={styles.insightTitle}>
          {getFieldIcon()} {field.title}
        </Text>
        <Text style={styles.insightText}>{field.content}</Text>
        <Text style={[styles.insightPriority, styles.priorityMedium]}>
          {field.type}
        </Text>
      </View>
    );
  };

  // CRITICAL FIX: Get metric value and format it - ALWAYS return a value, never hide metrics
  const getMetricValue = (metricKey: string): { value: string; subtitle: string; isPositive?: boolean } => {
    const combinedData = { ...metrics, ...ga4Data, ...gscData } as any;
    
    switch (metricKey) {
      case 'users':
        return {
          value: formatNumber(combinedData.users),
          subtitle: 'Website visitors'
        };
      case 'sessions':
        return {
          value: formatNumber(combinedData.sessions),
          subtitle: 'Total visits'
        };
      case 'bounceRate':
        return {
          value: formatPercentage(combinedData.bounceRate),
          subtitle: 'Single-page visits',
          isPositive: false
        };
      case 'conversions':
        return {
          value: formatNumber(combinedData.conversions),
          subtitle: 'Goal completions'
        };
      case 'avgSessionDuration':
        return {
          value: formatDuration(combinedData.avgSessionDuration),
          subtitle: 'Average time on site'
        };
      case 'pagesPerSession':
        return {
          value: formatDecimal(combinedData.pagesPerSession, 2),
          subtitle: 'Page depth'
        };
      case 'newUsers':
        return {
          value: formatNumber(combinedData.newUsers),
          subtitle: 'First-time visitors'
        };
      case 'totalClicks':
        return {
          value: formatNumber(combinedData.totalClicks || combinedData.clicks),
          subtitle: 'Search Console clicks'
        };
      case 'totalImpressions':
        return {
          value: formatNumber(combinedData.totalImpressions || combinedData.impressions),
          subtitle: 'Search impressions'
        };
      case 'averageCTR':
        return {
          value: formatPercentage(combinedData.averageCTR || combinedData.ctr),
          subtitle: 'Click-through rate'
        };
      case 'averagePosition':
        return {
          value: formatDecimal(combinedData.averagePosition || combinedData.position),
          subtitle: 'Search ranking',
          isPositive: (combinedData.averagePosition || combinedData.position || 100) <= 10
        };
      case 'conversionRate':
        return {
          value: formatPercentage(combinedData.conversionRate),
          subtitle: 'Conversion rate'
        };
      case 'engagementRate':
        return {
          value: formatPercentage(combinedData.engagementRate),
          subtitle: 'User engagement'
        };
      case 'pageViews':
        return {
          value: formatNumber(combinedData.pageViews),
          subtitle: 'Total page views'
        };
      case 'uniquePageViews':
        return {
          value: formatNumber(combinedData.uniquePageViews),
          subtitle: 'Unique page views'
        };
      case 'directTraffic':
        return {
          value: formatNumber(combinedData.directTraffic),
          subtitle: 'Direct traffic sessions'
        };
      case 'referralTraffic':
        return {
          value: formatNumber(combinedData.referralTraffic),
          subtitle: 'Referral traffic sessions'
        };
      case 'socialTraffic':
        return {
          value: formatNumber(combinedData.socialTraffic),
          subtitle: 'Social media traffic'
        };
      case 'emailTraffic':
        return {
          value: formatNumber(combinedData.emailTraffic),
          subtitle: 'Email campaign traffic'
        };
      case 'paidTraffic':
        return {
          value: formatNumber(combinedData.paidTraffic),
          subtitle: 'Paid advertising traffic'
        };
      case 'mobileUsers':
        return {
          value: formatNumber(combinedData.mobileUsers),
          subtitle: 'Mobile device users'
        };
      case 'desktopUsers':
        return {
          value: formatNumber(combinedData.desktopUsers),
          subtitle: 'Desktop device users'
        };
      case 'tabletUsers':
        return {
          value: formatNumber(combinedData.tabletUsers),
          subtitle: 'Tablet device users'
        };
      case 'returningUsers':
        return {
          value: formatNumber(combinedData.returningUsers),
          subtitle: 'Returning visitors'
        };
      case 'averageTimeOnPage':
        return {
          value: formatDuration(combinedData.averageTimeOnPage),
          subtitle: 'Avg time per page'
        };
      case 'exitRate':
        return {
          value: formatPercentage(combinedData.exitRate),
          subtitle: 'Page exit rate',
          isPositive: false
        };
      default:
        return {
          value: formatValue(combinedData[metricKey as keyof typeof combinedData]),
          subtitle: metricKey.replace(/([A-Z])/g, ' $1').toLowerCase()
        };
    }
  };

  // Function to get human-readable metric title
  const getMetricTitle = (metricKey: string): string => {
    const titleMap: { [key: string]: string } = {
      'users': 'Total Users',
      'sessions': 'Sessions',
      'bounceRate': 'Bounce Rate',
      'conversions': 'Conversions',
      'avgSessionDuration': 'Avg Session Duration',
      'pagesPerSession': 'Pages per Session',
      'newUsers': 'New Users',
      'totalClicks': 'Search Console Clicks',
      'totalImpressions': 'Search Impressions',
      'averageCTR': 'Average CTR',
      'averagePosition': 'Average Position',
      'conversionRate': 'Conversion Rate',
      'engagementRate': 'Engagement Rate',
      'pageViews': 'Page Views',
      'uniquePageViews': 'Unique Page Views',
      'directTraffic': 'Direct Traffic',
      'referralTraffic': 'Referral Traffic',
      'socialTraffic': 'Social Traffic',
      'emailTraffic': 'Email Traffic',
      'paidTraffic': 'Paid Traffic',
      'mobileUsers': 'Mobile Users',
      'desktopUsers': 'Desktop Users',
      'tabletUsers': 'Tablet Users',
      'returningUsers': 'Returning Users',
      'averageTimeOnPage': 'Avg Time on Page',
      'exitRate': 'Exit Rate'
    };
    
    return titleMap[metricKey] || metricKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  // Calculate optimal grid layout based on number of metrics
  const getMetricCardWidth = (): string => {
    const metricCount = selectedMetrics.length;
    if (metricCount <= 2) return '48%';
    if (metricCount <= 3) return '31%';
    if (metricCount <= 4) return '48%';
    if (metricCount <= 6) return '31%';
    return '23%'; // For 7+ metrics
  };

  return (
    <Page size="A4" style={styles.page}>
      <Header />
      
      {/* Selected Metrics Section */}
      {selectedMetrics.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Performance Metrics</Text>
          
          <View style={styles.metricsGrid}>
            {selectedMetrics.slice(0, 8).map((metricKey: any, index: any) => {
              const metricData = getMetricValue(metricKey);
              return (
                <MetricCard
                  key={index}
                  title={getMetricTitle(metricKey)}
                  value={metricData.value}
                  subtitle={metricData.subtitle}
                  isPositive={metricData.isPositive}
                  width={getMetricCardWidth()}
                />
              );
            })}
          </View>
        </View>
      )}

      {/* Custom Fields Section */}
      {customFields.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Analysis</Text>
          
          {customFields.map((field: any, index: any) => (
            <CustomField key={index} field={field} />
          ))}
        </View>
      )}

      {/* Device Breakdown (if selected and available) */}
      {selectedMetrics.some((m: any) => ['mobileUsers', 'desktopUsers', 'tabletUsers'].includes(m)) && ga4Data?.deviceBreakdown && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Device Performance</Text>
          
          <View style={styles.metricsGrid}>
            {selectedMetrics.includes('desktopUsers') && (
              <MetricCard
                title="Desktop Users"
                value={formatNumber(ga4Data.deviceBreakdown.desktop)}
                subtitle={`${((ga4Data.deviceBreakdown.desktop / ga4Data.users) * 100).toFixed(1)}%`}
                width="31%"
              />
            )}
            
            {selectedMetrics.includes('mobileUsers') && (
              <MetricCard
                title="Mobile Users"
                value={formatNumber(ga4Data.deviceBreakdown.mobile)}
                subtitle={`${((ga4Data.deviceBreakdown.mobile / ga4Data.users) * 100).toFixed(1)}%`}
                width="31%"
              />
            )}
            
            {selectedMetrics.includes('tabletUsers') && (
              <MetricCard
                title="Tablet Users"
                value={formatNumber(ga4Data.deviceBreakdown.tablet)}
                subtitle={`${((ga4Data.deviceBreakdown.tablet / ga4Data.users) * 100).toFixed(1)}%`}
                width="31%"
              />
            )}
          </View>
        </View>
      )}

      {/* Search Console Data (if Search Console metrics are selected) */}
      {selectedMetrics.some((m: any) => ['totalClicks', 'totalImpressions', 'averageCTR', 'averagePosition'].includes(m)) && gscData && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search Console Performance</Text>
          
          <View style={styles.metricsGrid}>
            {selectedMetrics.includes('totalClicks') && (
              <MetricCard
                title="Total Clicks"
                value={formatNumber(gscData.clicks)}
                subtitle="From Google search"
              />
            )}
            
            {selectedMetrics.includes('totalImpressions') && (
              <MetricCard
                title="Total Impressions"
                value={formatNumber(gscData.impressions)}
                subtitle="Search result views"
              />
            )}
            
            {selectedMetrics.includes('averageCTR') && (
              <MetricCard
                title="Average CTR"
                value={formatPercentage(gscData.ctr)}
                subtitle="Click-through rate"
              />
            )}
            
            {selectedMetrics.includes('averagePosition') && (
              <MetricCard
                title="Average Position"
                value={gscData.position?.toFixed(1) || '0.0'}
                subtitle="Search ranking"
                isPositive={gscData.position <= 10}
              />
            )}
          </View>
        </View>
      )}

      {/* Top Performing Keywords (if GSC data available and relevant) */}
      {(gscData as any)?.topQueries && (gscData as any).topQueries.length > 0 && 
       selectedMetrics.some((m: any) => ['totalClicks', 'averagePosition'].includes(m)) && (
        <View style={styles.section}>
          <Text style={styles.sectionSubtitle}>Top Keywords Performance</Text>
          
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Keyword</Text>
              <Text style={styles.tableHeaderCell}>Clicks</Text>
              <Text style={styles.tableHeaderCell}>Position</Text>
              <Text style={styles.tableHeaderCell}>CTR</Text>
            </View>
            
            {(gscData as any).topQueries.slice(0, 5).map((query: any, index: any) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>
                  {query.query.length > 25 ? `${query.query.substring(0, 25)}...` : query.query}
                </Text>
                <Text style={styles.tableCellNumber}>{formatNumber(query.clicks)}</Text>
                <Text style={styles.tableCellNumber}>{query.position.toFixed(1)}</Text>
                <Text style={styles.tableCellNumber}>{query.ctr.toFixed(1)}%</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Page Speed Performance (if available) */}
      {false && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Insights</Text>
          
          <View style={styles.metricsGrid}>
            <MetricCard
              title="Mobile Speed Score"
              value={`90/100`}
              subtitle="Core Web Vitals"
              isPositive={true}
            />
            
            <MetricCard
              title="Desktop Speed Score"
              value={`95/100`}
              subtitle="Performance rating"
              isPositive={true}
            />
          </View>
        </View>
      )}

      {/* Fallback message if no custom configuration */}
      {selectedMetrics.length === 0 && customFields.length === 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Report Configuration</Text>
          
          <View style={styles.insightBox}>
            <Text style={styles.insightTitle}>No Custom Configuration Found</Text>
            <Text style={styles.insightText}>
              This custom report appears to have no specific metrics or fields selected. 
              To create a more detailed custom report, please select specific metrics 
              and add custom fields during report generation.
            </Text>
          </View>
          
          {/* Show available data as fallback */}
          {ga4Data && (
            <View style={styles.metricsGrid}>
              <MetricCard
                title="Total Users"
                value={formatNumber(ga4Data.users)}
                subtitle="Available in GA4 data"
              />
              
              <MetricCard
                title="Sessions"
                value={formatNumber(ga4Data.sessions)}
                subtitle="Available in GA4 data"
              />
            </View>
          )}
        </View>
      )}

      <ReportFooter branding={data.branding} />
    </Page>
  );
};
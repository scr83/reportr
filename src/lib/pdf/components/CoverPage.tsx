import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles, createBrandedStyles } from './styles';
import { ReportData } from '../types';

interface CoverPageProps {
  data: ReportData;
}

export const CoverPage: React.FC<CoverPageProps> = ({ data }) => {
  const brandedStyles = createBrandedStyles(data.branding.primaryColor);
  
  // Format date range
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const dateRange = `${formatDate(data.reportPeriod.startDate)} - ${formatDate(data.reportPeriod.endDate)}`;
  const reportTypeTitle = data.reportType === 'executive' 
    ? 'Executive SEO Report' 
    : data.reportType === 'standard'
    ? 'Comprehensive SEO Report'
    : 'Custom SEO Report';

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.coverPage}>
        {/* Main Report Title */}
        <Text style={[styles.coverTitle, brandedStyles.brandPrimary]}>
          {reportTypeTitle}
        </Text>
        
        {/* Client Name */}
        <Text style={styles.coverClient}>
          {data.clientName}
        </Text>
        
        {/* Date Range */}
        <Text style={styles.coverDate}>
          Report Period: {dateRange}
        </Text>
        
        {/* Report Generation Date */}
        <Text style={styles.coverDate}>
          Generated on {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        
        {/* Agency Branding Section */}
        <View style={styles.coverBranding}>
          <View>
            <Text style={[styles.brandingName, brandedStyles.brandPrimary]}>
              {data.branding.companyName}
            </Text>
            {data.branding.website && (
              <Text style={styles.brandingWebsite}>
                {data.branding.website}
              </Text>
            )}
          </View>
          
          <View style={styles.alignCenter}>
            {data.branding.email && (
              <Text style={styles.brandingWebsite}>
                {data.branding.email}
              </Text>
            )}
            {data.branding.phone && (
              <Text style={styles.brandingWebsite}>
                {data.branding.phone}
              </Text>
            )}
          </View>
        </View>
      </View>
    </Page>
  );
};
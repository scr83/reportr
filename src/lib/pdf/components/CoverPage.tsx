import React from 'react';
import { Page, View, Text, Image } from '@react-pdf/renderer';
import { styles, createBrandedStyles } from './styles';
import { ReportData } from '../types';

interface CoverPageProps {
  data: ReportData;
}

export const CoverPage: React.FC<CoverPageProps> = ({ data }) => {
  const brandedStyles = createBrandedStyles(data.branding.primaryColor);
  
  // Determine which logo to display
  const getLogoUrl = () => {
    // For white-label enabled users, use their logo if available, otherwise fall back to Reportr logo
    if (data.branding.whiteLabelEnabled || data.branding.enabled) {
      return data.branding.logo || 'https://reportr.agency/logo-purple.png';
    }
    // For non-white-label users, always use Reportr logo
    return 'https://reportr.agency/logo-purple.png';
  };
  
  const logoUrl = getLogoUrl();
  
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
    ? 'Standard SEO Report'
    : 'Custom SEO Report';

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.coverPage}>
        {/* Logo */}
        <Image
          src={logoUrl}
          style={{
            width: 120,
            height: 60,
            objectFit: 'contain',
            marginBottom: 30,
          }}
        />
        
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

        {/* Prominent Agency Name for White-Label Users */}
        {(data.branding.whiteLabelEnabled || data.branding.enabled) && data.branding.companyName && (
          <Text style={[styles.coverAgencyName, brandedStyles.brandPrimary]}>
            {data.branding.companyName}
          </Text>
        )}

        {/* Agency Contact Info for White-Label Users - Website only, no email */}
        {(data.branding.whiteLabelEnabled || data.branding.enabled) && data.branding.website && (
          <Text style={styles.coverAgencyContact}>
            {data.branding.website.replace(/^https?:\/\//, '')}
          </Text>
        )}
        
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
          
          {data.branding.phone && (
            <View style={styles.alignCenter}>
              <Text style={styles.brandingWebsite}>
                {data.branding.phone}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Page>
  );
};
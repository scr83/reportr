import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  // Document and Page Styles
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 12,
    lineHeight: 1.5,
  },

  // Cover Page Styles
  coverPage: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    backgroundColor: '#FFFFFF',
  },

  coverTitle: {
    fontSize: 36,
    fontFamily: 'Helvetica-Bold',
    color: '#9333EA',
    textAlign: 'center',
    marginBottom: 20,
  },

  coverSubtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 10,
  },

  coverClient: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 30,
  },

  coverDate: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
  },

  coverBranding: {
    position: 'absolute',
    bottom: 60,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  brandingName: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#9333EA',
  },

  brandingWebsite: {
    fontSize: 12,
    color: '#6B7280',
  },

  // Header and Footer Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#9333EA',
  },

  headerTitle: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#1F2937',
  },

  headerDate: {
    fontSize: 12,
    color: '#6B7280',
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

  footerText: {
    fontSize: 10,
    color: '#6B7280',
  },

  footerPage: {
    fontSize: 10,
    color: '#6B7280',
  },

  // Section Styles
  section: {
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: '#1F2937',
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  sectionSubtitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
    marginBottom: 12,
  },

  sectionContent: {
    marginBottom: 15,
  },

  // Metrics Grid Styles
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  metricCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  metricTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 5,
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
  },

  metricValue: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#1F2937',
    marginBottom: 3,
  },

  metricChange: {
    fontSize: 10,
    color: '#059669',
  },

  metricChangeNegative: {
    fontSize: 10,
    color: '#DC2626',
  },

  // Key Insights Styles
  insightBox: {
    backgroundColor: '#EEF2FF',
    borderLeftWidth: 4,
    borderLeftColor: '#9333EA',
    padding: 15,
    marginBottom: 12,
  },

  insightTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#1F2937',
    marginBottom: 6,
  },

  insightText: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 1.5,
  },

  insightPriority: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    marginTop: 6,
  },

  priorityHigh: {
    color: '#DC2626',
  },

  priorityMedium: {
    color: '#D97706',
  },

  priorityLow: {
    color: '#059669',
  },

  // Recommendations Styles
  recommendationsList: {
    marginTop: 15,
  },

  recommendationItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },

  recommendationNumber: {
    width: 20,
    height: 20,
    backgroundColor: '#9333EA',
    borderRadius: 10,
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 1.8,
    marginRight: 12,
    marginTop: 2,
  },

  recommendationText: {
    flex: 1,
    fontSize: 12,
    color: '#374151',
    lineHeight: 1.5,
  },

  // Contact and CTA Styles
  ctaSection: {
    backgroundColor: '#9333EA',
    padding: 20,
    borderRadius: 8,
    marginTop: 30,
  },

  ctaTitle: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },

  ctaText: {
    fontSize: 12,
    color: '#E0E7FF',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 1.5,
  },

  ctaContact: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  ctaContactText: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
    marginRight: 15,
  },

  // Data Table Styles
  table: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 15,
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    padding: 8,
  },

  tableHeaderCell: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
    textAlign: 'left',
  },

  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    padding: 8,
  },

  tableCell: {
    flex: 1,
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'left',
  },

  tableCellNumber: {
    flex: 1,
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'right',
  },

  // Utility Styles
  flexRow: {
    flexDirection: 'row',
  },

  flexColumn: {
    flexDirection: 'column',
  },

  alignCenter: {
    alignItems: 'center',
  },

  justifyBetween: {
    justifyContent: 'space-between',
  },

  textCenter: {
    textAlign: 'center',
  },

  textRight: {
    textAlign: 'right',
  },

  bold: {
    fontFamily: 'Helvetica-Bold',
  },

  uppercase: {
    textTransform: 'uppercase',
  },

  // Spacing Utilities
  mb5: {
    marginBottom: 5,
  },

  mb10: {
    marginBottom: 10,
  },

  mb15: {
    marginBottom: 15,
  },

  mb20: {
    marginBottom: 20,
  },

  mb30: {
    marginBottom: 30,
  },

  mt10: {
    marginTop: 10,
  },

  mt15: {
    marginTop: 15,
  },

  mt20: {
    marginTop: 20,
  },

  mt30: {
    marginTop: 30,
  },

  // Color Utilities
  primaryColor: {
    color: '#9333EA',
  },

  secondaryColor: {
    color: '#6B7280',
  },

  successColor: {
    color: '#059669',
  },

  warningColor: {
    color: '#D97706',
  },

  errorColor: {
    color: '#DC2626',
  },
});

// Dynamic styles function for branding colors
export const createBrandedStyles = (primaryColor: string = '#9333EA') => {
  return StyleSheet.create({
    brandPrimary: {
      color: primaryColor,
    },
    brandBackground: {
      backgroundColor: primaryColor,
    },
    brandBorder: {
      borderColor: primaryColor,
    },
    brandAccent: {
      backgroundColor: `${primaryColor}15`, // 15% opacity approximation
    },
  });
};

// UNIVERSAL VALUE FORMATTING FUNCTIONS - CRITICAL FOR METRIC DISPLAY
// These functions ensure ALL metrics display properly regardless of their values

// Helper function to format numbers with proper N/A handling
export const formatNumber = (num: number | undefined | null): string => {
  // Handle completely missing/null/undefined values
  if (num === undefined || num === null) return 'N/A';
  
  // Handle zero explicitly (don't hide it!)
  if (num === 0) return '0';
  
  // UPDATED: Always use comma separators for readability
  // Use toLocaleString for all numbers to ensure comma formatting
  return Math.round(num).toLocaleString();
};

// Helper function to format percentages with proper N/A handling  
export const formatPercentage = (num: number | undefined | null): string => {
  // Handle completely missing/null/undefined values
  if (num === undefined || num === null) return 'N/A';
  
  // Handle zero explicitly (show as 0.0%)
  if (num === 0) return '0.0%';
  
  // CRITICAL FIX: Handle CTR values that are already percentages (> 1)
  // If the value is > 1, it's likely already been multiplied by 100, so divide by 100
  const normalizedValue = num > 1 ? num / 100 : num;
  
  return `${normalizedValue.toFixed(1)}%`;
};

// Helper function to format duration with proper N/A handling
export const formatDuration = (seconds: number | undefined | null): string => {
  // Handle completely missing/null/undefined values
  if (seconds === undefined || seconds === null) return 'N/A';
  
  // Handle zero explicitly (show as 0:00)
  if (seconds === 0) return '0:00';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Helper function to format decimal values (like position)
export const formatDecimal = (num: number | undefined | null, decimals: number = 1): string => {
  // Handle completely missing/null/undefined values
  if (num === undefined || num === null) return 'N/A';
  
  // Handle zero explicitly
  if (num === 0) return '0.0';
  
  return num.toFixed(decimals);
};

// CRITICAL: Universal metric value formatter based on type
export const formatValue = (value: any, type: 'number' | 'percentage' | 'duration' | 'decimal' = 'number', decimals: number = 1): string => {
  switch(type) {
    case 'percentage':
      return formatPercentage(value);
    case 'duration':
      return formatDuration(value);
    case 'decimal':
      return formatDecimal(value, decimals);
    case 'number':
    default:
      return formatNumber(value);
  }
};
import React from 'react'
import { Page, View, Text, Image } from '@react-pdf/renderer'
import { CoverPageProps } from '@/types/report'
import { createPDFStyles, createStyleSheet } from '../BaseTemplate'

export function CoverPage({ clientName, reportType, dateRange, branding }: CoverPageProps) {
  const pdfStyles = createPDFStyles(branding)
  const styles = createStyleSheet(pdfStyles)
  
  const formatReportType = (type: string) => {
    switch (type) {
      case 'executive': return 'Executive Summary Report'
      case 'standard': return 'Standard SEO Report'
      case 'custom': return 'Custom Analytics Report'
      default: return 'SEO Report'
    }
  }
  
  const formatDateRange = (range: string) => {
    // Convert "2024-09-01 to 2024-10-01" format
    const [start, end] = range.split(' to ')
    if (start && end) {
      const startDate = new Date(start).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      const endDate = new Date(end).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      return `${startDate} - ${endDate}`
    }
    return range
  }
  
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.coverPage}>
        {/* Agency Logo (if available) */}
        {branding.logo && (
          <View style={{ marginBottom: 32 }}>
            <Image 
              src={branding.logo} 
              style={{ 
                width: 120, 
                height: 60, 
                objectFit: 'contain' 
              }}
            />
          </View>
        )}
        
        {/* Agency Name */}
        <Text style={[styles.coverTitle, { fontSize: 28, marginBottom: 16 }]}>
          {branding.companyName}
        </Text>
        
        {/* Report Title */}
        <Text style={styles.coverTitle}>
          {formatReportType(reportType)}
        </Text>
        
        {/* Client Name */}
        <Text style={[styles.coverSubtitle, { fontSize: 20, marginBottom: 24 }]}>
          {clientName}
        </Text>
        
        {/* Date Range */}
        <Text style={[styles.coverSubtitle, { fontSize: 14, marginBottom: 40 }]}>
          {formatDateRange(dateRange)}
        </Text>
        
        {/* Decorative Line */}
        <View style={{
          width: 200,
          height: 2,
          backgroundColor: pdfStyles.colors.secondary,
          marginBottom: 40
        }} />
        
        {/* Generated Date */}
        <Text style={[styles.bodySmall, { color: pdfStyles.colors.background, opacity: 0.8 }]}>
          Generated on {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
      </View>
    </Page>
  )
}
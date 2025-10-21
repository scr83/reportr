import React from 'react'
import { Document, Page, View, Text, StyleSheet, Font } from '@react-pdf/renderer'
import { BrandingConfig, PDFStyles } from '@/types/report'

// Use built-in fonts for PDF generation (more reliable)
// React PDF supports these built-in fonts: Helvetica, Times-Roman, Courier

export function createPDFStyles(branding: BrandingConfig): PDFStyles {
  return {
    colors: {
      primary: branding.primaryColor || '#3B82F6',
      secondary: '#6B7280',
      accent: '#22D3EE', // Digital Frog Aqua
      text: '#1F2937',
      textLight: '#6B7280',
      background: '#FFFFFF',
      border: '#E5E7EB'
    },
    fonts: {
      regular: 'Helvetica',
      bold: 'Helvetica-Bold',
      light: 'Helvetica'
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32
    },
    borderRadius: 8
  }
}

export function createStyleSheet(styles: PDFStyles) {
  return StyleSheet.create({
    page: {
      fontFamily: styles.fonts.regular,
      fontSize: 12,
      color: styles.colors.text,
      backgroundColor: styles.colors.background,
      padding: 40,
      lineHeight: 1.4
    },
    
    // Typography
    h1: {
      fontSize: 24,
      fontFamily: 'Helvetica-Bold',
      color: styles.colors.text,
      marginBottom: styles.spacing.lg
    },
    h2: {
      fontSize: 20,
      fontFamily: 'Helvetica-Bold',
      color: styles.colors.text,
      marginBottom: styles.spacing.md
    },
    h3: {
      fontSize: 16,
      fontFamily: 'Helvetica-Bold',
      color: styles.colors.text,
      marginBottom: styles.spacing.sm
    },
    h4: {
      fontSize: 14,
      fontFamily: 'Helvetica-Bold',
      color: styles.colors.text,
      marginBottom: styles.spacing.sm
    },
    body: {
      fontSize: 12,
      fontFamily: 'Helvetica',
      color: styles.colors.text,
      lineHeight: 1.5,
      marginBottom: styles.spacing.sm
    },
    bodySmall: {
      fontSize: 10,
      fontFamily: 'Helvetica',
      color: styles.colors.textLight,
      lineHeight: 1.4
    },
    caption: {
      fontSize: 9,
      fontFamily: 'Helvetica',
      color: styles.colors.textLight,
      lineHeight: 1.3
    },
    
    // Layout
    container: {
      flex: 1,
      paddingTop: styles.spacing.lg,
      paddingBottom: styles.spacing.lg
    },
    section: {
      marginBottom: styles.spacing.xl,
      padding: styles.spacing.md,
      border: `1px solid ${styles.colors.border}`,
      borderRadius: styles.borderRadius
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: styles.spacing.sm
    },
    column: {
      flexDirection: 'column',
      flex: 1
    },
    
    // Cards and Components
    card: {
      backgroundColor: styles.colors.background,
      border: `1px solid ${styles.colors.border}`,
      borderRadius: styles.borderRadius,
      padding: styles.spacing.md,
      marginBottom: styles.spacing.md
    },
    metricCard: {
      backgroundColor: styles.colors.background,
      border: `2px solid ${styles.colors.primary}`,
      borderRadius: styles.borderRadius,
      padding: styles.spacing.md,
      marginBottom: styles.spacing.md,
      flex: 1,
      marginRight: styles.spacing.sm
    },
    
    // Header and Footer
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: styles.spacing.xl,
      paddingBottom: styles.spacing.md,
      borderBottom: `2px solid ${styles.colors.primary}`
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 40,
      right: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: styles.spacing.sm,
      borderTop: `1px solid ${styles.colors.border}`,
      fontSize: 9,
      color: styles.colors.textLight
    },
    
    // Cover Page
    coverPage: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: styles.colors.primary,
      color: styles.colors.background,
      padding: styles.spacing.xl
    },
    coverTitle: {
      fontSize: 32,
      fontFamily: 'Helvetica-Bold',
      marginBottom: styles.spacing.lg,
      color: styles.colors.background
    },
    coverSubtitle: {
      fontSize: 18,
      fontFamily: 'Helvetica',
      marginBottom: styles.spacing.xl,
      color: styles.colors.background,
      opacity: 0.9
    },
    
    // Data Tables
    table: {
      marginTop: styles.spacing.md,
      marginBottom: styles.spacing.lg
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: styles.colors.primary,
      color: styles.colors.background,
      padding: styles.spacing.sm,
      fontSize: 10,
      fontFamily: 'Helvetica-Bold'
    },
    tableRow: {
      flexDirection: 'row',
      padding: styles.spacing.sm,
      borderBottom: `1px solid ${styles.colors.border}`,
      fontSize: 10,
      fontFamily: 'Helvetica'
    },
    tableCell: {
      flex: 1,
      textAlign: 'left'
    },
    
    // Utilities
    textCenter: {
      textAlign: 'center'
    },
    textRight: {
      textAlign: 'right'
    },
    textPrimary: {
      color: styles.colors.primary
    },
    textSecondary: {
      color: styles.colors.secondary
    },
    backgroundPrimary: {
      backgroundColor: styles.colors.primary
    },
    backgroundSecondary: {
      backgroundColor: styles.colors.secondary
    },
    
    // Spacing utilities
    mt: { marginTop: styles.spacing.md },
    mb: { marginBottom: styles.spacing.md },
    ml: { marginLeft: styles.spacing.md },
    mr: { marginRight: styles.spacing.md },
    px: { paddingLeft: styles.spacing.md, paddingRight: styles.spacing.md },
    py: { paddingTop: styles.spacing.md, paddingBottom: styles.spacing.md },
    
    // Status indicators
    statusBadge: {
      backgroundColor: styles.colors.secondary,
      color: styles.colors.background,
      padding: `${styles.spacing.xs}px ${styles.spacing.sm}px`,
      borderRadius: styles.borderRadius,
      fontSize: 9,
      fontFamily: 'Helvetica-Bold'
    }
  })
}

interface BaseTemplateProps {
  children: React.ReactNode
  branding: BrandingConfig
  title?: string
  author?: string
}

export function BaseTemplate({ children, branding, title = 'SEO Report', author }: BaseTemplateProps) {
  const pdfStyles = createPDFStyles(branding)
  const styles = createStyleSheet(pdfStyles)
  
  return (
    <Document title={title} author={author || branding.companyName}>
      {children}
    </Document>
  )
}
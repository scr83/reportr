import React from 'react'
import { View, Text, Image } from '@react-pdf/renderer'
import { BrandingConfig } from '@/types/report'
import { createPDFStyles, createStyleSheet } from '../BaseTemplate'

interface ReportHeaderProps {
  branding: BrandingConfig
  clientName: string
  pageTitle?: string
  showLogo?: boolean
}

export function ReportHeader({ branding, clientName, pageTitle, showLogo = true }: ReportHeaderProps) {
  const pdfStyles = createPDFStyles(branding)
  const styles = createStyleSheet(pdfStyles)
  
  return (
    <View style={styles.header}>
      {/* Left side - Logo and Agency Info */}
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        {showLogo && branding.logo && (
          <Image 
            src={branding.logo} 
            style={{ 
              width: 40, 
              height: 20, 
              objectFit: 'contain',
              marginRight: 12
            }}
          />
        )}
        <View>
          <Text style={[styles.h4, { marginBottom: 2, color: pdfStyles.colors.primary }]}>
            {branding.name}
          </Text>
          <Text style={[styles.bodySmall, { color: pdfStyles.colors.textLight }]}>
            {branding.website}
          </Text>
        </View>
      </View>
      
      {/* Right side - Client and Page Info */}
      <View style={{ textAlign: 'right' }}>
        <Text style={[styles.h4, { marginBottom: 2 }]}>
          {clientName}
        </Text>
        {pageTitle && (
          <Text style={[styles.bodySmall, { color: pdfStyles.colors.textLight }]}>
            {pageTitle}
          </Text>
        )}
      </View>
    </View>
  )
}
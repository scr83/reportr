import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import { BrandingConfig } from '@/types/report'
import { createPDFStyles, createStyleSheet } from '../BaseTemplate'

interface SectionTitleProps {
  title: string
  subtitle?: string
  branding: BrandingConfig
  marginTop?: number
  marginBottom?: number
  showLine?: boolean
}

export function SectionTitle({ 
  title, 
  subtitle, 
  branding, 
  marginTop = 24,
  marginBottom = 16,
  showLine = true 
}: SectionTitleProps) {
  const pdfStyles = createPDFStyles(branding)
  const styles = createStyleSheet(pdfStyles)
  
  return (
    <View style={{ marginTop, marginBottom }}>
      {/* Main Title */}
      <Text style={[styles.h2, { 
        color: pdfStyles.colors.primary,
        marginBottom: subtitle ? 4 : (showLine ? 8 : 0)
      }]}>
        {title}
      </Text>
      
      {/* Subtitle */}
      {subtitle && (
        <Text style={[styles.bodySmall, { 
          color: pdfStyles.colors.textLight,
          marginBottom: showLine ? 8 : 0
        }]}>
          {subtitle}
        </Text>
      )}
      
      {/* Decorative Line */}
      {showLine && (
        <View style={{
          width: 60,
          height: 2,
          backgroundColor: pdfStyles.colors.secondary,
          marginBottom: 8
        }} />
      )}
    </View>
  )
}

interface InsightBoxProps {
  title: string
  content: string
  type?: 'info' | 'success' | 'warning' | 'error'
  branding: BrandingConfig
}

export function InsightBox({ title, content, type = 'info', branding }: InsightBoxProps) {
  const pdfStyles = createPDFStyles(branding)
  const styles = createStyleSheet(pdfStyles)
  
  const getTypeColors = () => {
    switch (type) {
      case 'success':
        return { bg: '#10B98120', border: '#10B981', icon: '✓' }
      case 'warning':
        return { bg: '#F59E0B20', border: '#F59E0B', icon: '⚠' }
      case 'error':
        return { bg: '#EF444420', border: '#EF4444', icon: '✗' }
      default:
        return { bg: `${pdfStyles.colors.primary}20`, border: pdfStyles.colors.primary, icon: 'ℹ' }
    }
  }
  
  const typeColors = getTypeColors()
  
  return (
    <View style={{
      backgroundColor: typeColors.bg,
      border: `1px solid ${typeColors.border}`,
      borderRadius: 8,
      padding: 12,
      marginBottom: 16
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {/* Icon */}
        <Text style={{
          color: typeColors.border,
          fontSize: 14,
          marginRight: 8,
          marginTop: 1
        }}>
          {typeColors.icon}
        </Text>
        
        {/* Content */}
        <View style={{ flex: 1 }}>
          <Text style={[styles.h4, { 
            color: typeColors.border,
            marginBottom: 4,
            fontSize: 12
          }]}>
            {title}
          </Text>
          <Text style={[styles.body, { 
            color: pdfStyles.colors.text,
            fontSize: 10,
            lineHeight: 1.4
          }]}>
            {content}
          </Text>
        </View>
      </View>
    </View>
  )
}
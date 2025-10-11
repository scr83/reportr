import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import { MetricCardProps, BrandingConfig } from '@/types/report'
import { createPDFStyles, createStyleSheet } from '../BaseTemplate'

interface PDFMetricCardProps extends MetricCardProps {
  branding: BrandingConfig
  width?: string | number
}

export function MetricCard({ 
  title, 
  value, 
  description, 
  color, 
  branding,
  width = '48%' 
}: PDFMetricCardProps) {
  const pdfStyles = createPDFStyles(branding)
  const styles = createStyleSheet(pdfStyles)
  
  // Format large numbers with commas
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (val >= 1000) {
        return val.toLocaleString()
      }
      return val.toString()
    }
    return val
  }
  
  // Determine if value indicates percentage
  const isPercentage = (val: string | number) => {
    return title.toLowerCase().includes('rate') || 
           title.toLowerCase().includes('%') ||
           title.toLowerCase().includes('percentage')
  }
  
  const displayValue = isPercentage(value) ? `${formatValue(value)}%` : formatValue(value)
  
  return (
    <View style={[
      styles.metricCard,
      {
        width: width,
        borderColor: color || pdfStyles.colors.primary,
        backgroundColor: color ? `${color}10` : `${pdfStyles.colors.primary}10`
      }
    ]}>
      {/* Title */}
      <Text style={[styles.h4, { 
        color: color || pdfStyles.colors.primary,
        marginBottom: 8,
        fontSize: 11
      }]}>
        {title}
      </Text>
      
      {/* Value */}
      <Text style={[styles.h2, { 
        color: pdfStyles.colors.text,
        marginBottom: 4,
        fontSize: 24,
        fontWeight: 'bold'
      }]}>
        {displayValue}
      </Text>
      
      {/* Description */}
      {description && (
        <Text style={[styles.bodySmall, { 
          color: pdfStyles.colors.textLight,
          fontSize: 9
        }]}>
          {description}
        </Text>
      )}
    </View>
  )
}

interface MetricGridProps {
  metrics: Array<{
    title: string
    value: string | number
    description?: string
    color?: string
  }>
  branding: BrandingConfig
  columns?: number
}

export function MetricGrid({ metrics, branding, columns = 2 }: MetricGridProps) {
  const pdfStyles = createPDFStyles(branding)
  
  // Split metrics into rows based on columns
  const rows = []
  for (let i = 0; i < metrics.length; i += columns) {
    rows.push(metrics.slice(i, i + columns))
  }
  
  const cardWidth = columns === 2 ? '48%' : columns === 3 ? '31%' : '23%'
  
  return (
    <View>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16
        }}>
          {row.map((metric, metricIndex) => (
            <MetricCard
              key={`${rowIndex}-${metricIndex}`}
              title={metric.title}
              value={metric.value}
              description={metric.description}
              color={metric.color}
              branding={branding}
              width={cardWidth}
            />
          ))}
          
          {/* Fill empty space if row is not complete */}
          {row.length < columns && Array.from({ length: columns - row.length }).map((_, emptyIndex) => (
            <View key={`empty-${rowIndex}-${emptyIndex}`} style={{ width: cardWidth }} />
          ))}
        </View>
      ))}
    </View>
  )
}
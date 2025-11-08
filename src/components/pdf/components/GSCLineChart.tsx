import React from 'react'
import { View, Text, Svg, Path, Line, Circle, G } from '@react-pdf/renderer'
import { BrandingConfig } from '@/types/report'
import { createPDFStyles, createStyleSheet } from '../BaseTemplate'

interface DataPoint {
  date: string
  value: number
}

interface GSCLineChartProps {
  data: DataPoint[]
  title: string
  lineColor: string
  yAxisLabel: string
  branding: BrandingConfig
  height?: number
  width?: number
}

export function GSCLineChart({ 
  data, 
  title, 
  lineColor, 
  yAxisLabel, 
  branding,
  height = 300,
  width = 600
}: GSCLineChartProps) {
  const pdfStyles = createPDFStyles(branding)
  const styles = createStyleSheet(pdfStyles)
  
  // Chart dimensions
  const chartWidth = width - 80  // Leave space for Y-axis labels
  const chartHeight = height - 60 // Leave space for X-axis labels
  const padding = { top: 20, right: 20, bottom: 40, left: 60 }
  
  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <View style={{ marginBottom: 24 }}>
        <Text style={[styles.h4, { marginBottom: 16, color: pdfStyles.colors.primary }]}>
          {title}
        </Text>
        <View style={{
          height: height,
          width: width,
          border: `1px solid ${pdfStyles.colors.border}`,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f9fafb'
        }}>
          <Text style={[styles.bodySmall, { color: pdfStyles.colors.textLight }]}>
            No data available for the selected period
          </Text>
        </View>
      </View>
    )
  }

  // Calculate data ranges
  const values = data.map(d => d.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const valueRange = maxValue - minValue || 1

  // Create scale functions
  const xScale = (index: number) => {
    return padding.left + (index / (data.length - 1)) * (chartWidth - padding.left - padding.right)
  }

  const yScale = (value: number) => {
    return padding.top + (1 - (value - minValue) / valueRange) * (chartHeight - padding.top - padding.bottom)
  }

  // Generate path for the line
  const generatePath = () => {
    if (data.length === 0) return ''
    
    let path = `M ${xScale(0)} ${yScale(data[0]!.value)}`
    
    for (let i = 1; i < data.length; i++) {
      const currentX = xScale(i)
      const currentY = yScale(data[i]!.value)
      
      // Create smooth curves using quadratic bezier curves
      if (i === 1) {
        path += ` Q ${currentX} ${currentY} ${currentX} ${currentY}`
      } else {
        const prevX = xScale(i - 1)
        const prevY = yScale(data[i - 1]!.value)
        const controlX = prevX + (currentX - prevX) / 2
        
        path += ` Q ${controlX} ${prevY} ${currentX} ${currentY}`
      }
    }
    
    return path
  }

  // Format value for display
  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toLocaleString()
  }

  // Format date for X-axis
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  // Generate Y-axis ticks
  const yTicks = []
  const tickCount = 5
  for (let i = 0; i <= tickCount; i++) {
    const value = minValue + (maxValue - minValue) * (i / tickCount)
    yTicks.push({
      value: value,
      y: yScale(value),
      label: formatValue(value)
    })
  }

  // Generate X-axis ticks (show every few points to avoid overcrowding)
  const xTickInterval = Math.ceil(data.length / 6) // Show about 6 labels
  const xTicks = data
    .filter((_, index) => index % xTickInterval === 0 || index === data.length - 1)
    .map((d, index) => ({
      x: xScale(data.findIndex(item => item.date === d.date)),
      label: formatDate(d.date)
    }))

  return (
    <View style={{ marginVertical: 16, width: '100%' }}>
      {/* Chart Title */}
      <Text style={[styles.h4, { 
        marginBottom: 12, 
        color: pdfStyles.colors.primary,
        textAlign: 'center'
      }]}>
        {title}
      </Text>
      
      {/* Chart Container */}
      <View>
        <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
          {/* Grid lines */}
          <G>
            {/* Horizontal grid lines */}
            {yTicks.map((tick, index) => (
              <Line
                key={`h-grid-${index}`}
                x1={padding.left}
                y1={tick.y}
                x2={chartWidth - padding.right}
                y2={tick.y}
                stroke="#e5e7eb"
                strokeWidth={1}
                strokeDasharray="3,3"
              />
            ))}
            
            {/* Vertical grid lines */}
            {xTicks.map((tick, index) => (
              <Line
                key={`v-grid-${index}`}
                x1={tick.x}
                y1={padding.top}
                x2={tick.x}
                y2={chartHeight - padding.bottom}
                stroke="#e5e7eb"
                strokeWidth={1}
                strokeDasharray="3,3"
              />
            ))}
          </G>

          {/* Main chart line */}
          <Path
            d={generatePath()}
            stroke={lineColor}
            strokeWidth={1.5}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {data.map((point, index) => (
            <Circle
              key={`point-${index}`}
              cx={xScale(index)}
              cy={yScale(point.value)}
              r={3}
              fill={lineColor}
              stroke="#ffffff"
              strokeWidth={1.5}
            />
          ))}

          {/* Y-axis labels */}
          {yTicks.map((tick, index) => (
            <G key={`y-label-${index}`}>
              <Text
                x={padding.left - 10}
                y={tick.y + 2}
                style={{ fontSize: 9, fill: pdfStyles.colors.textLight, textAnchor: 'end' }}
              >
                {tick.label}
              </Text>
            </G>
          ))}

          {/* X-axis labels */}
          {xTicks.map((tick, index) => (
            <G key={`x-label-${index}`}>
              <Text
                x={tick.x}
                y={chartHeight - padding.bottom + 15}
                style={{ fontSize: 9, fill: pdfStyles.colors.textLight, textAnchor: 'middle' }}
              >
                {tick.label}
              </Text>
            </G>
          ))}


          {/* Chart border */}
          <Path
            d={`M ${padding.left} ${padding.top} 
                L ${chartWidth - padding.right} ${padding.top} 
                L ${chartWidth - padding.right} ${chartHeight - padding.bottom} 
                L ${padding.left} ${chartHeight - padding.bottom} 
                Z`}
            stroke={pdfStyles.colors.border}
            strokeWidth={1}
            fill="none"
          />
        </Svg>
      </View>

      {/* Chart Summary */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8
      }}>
        <Text style={[styles.bodySmall, { color: pdfStyles.colors.textLight }]}>
          Min: {formatValue(minValue)}
        </Text>
        <Text style={[styles.bodySmall, { color: pdfStyles.colors.textLight }]}>
          Max: {formatValue(maxValue)}
        </Text>
        <Text style={[styles.bodySmall, { color: pdfStyles.colors.textLight }]}>
          Avg: {formatValue(Math.round(values.reduce((a, b) => a + b, 0) / values.length))}
        </Text>
      </View>
    </View>
  )
}
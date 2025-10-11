import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import { DataTableProps, BrandingConfig } from '@/types/report'
import { createPDFStyles, createStyleSheet } from '../BaseTemplate'

interface PDFDataTableProps extends DataTableProps {
  branding: BrandingConfig
}

export function DataTable({ title, headers, rows, maxRows = 10, branding }: PDFDataTableProps) {
  const pdfStyles = createPDFStyles(branding)
  const styles = createStyleSheet(pdfStyles)
  
  // Limit rows if specified
  const displayRows = maxRows ? rows.slice(0, maxRows) : rows
  
  // Calculate column widths based on content
  const columnWidth = `${100 / headers.length}%`
  
  return (
    <View style={{ marginBottom: 24 }}>
      {/* Table Title */}
      <Text style={[styles.h3, { marginBottom: 12 }]}>
        {title}
      </Text>
      
      {/* Table */}
      <View style={styles.table}>
        {/* Header Row */}
        <View style={[styles.tableHeader, { backgroundColor: pdfStyles.colors.primary }]}>
          {headers.map((header, index) => (
            <Text key={index} style={[styles.tableCell, { width: columnWidth }]}>
              {header}
            </Text>
          ))}
        </View>
        
        {/* Data Rows */}
        {displayRows.map((row, rowIndex) => (
          <View 
            key={rowIndex} 
            style={[
              styles.tableRow,
              rowIndex % 2 === 0 ? { backgroundColor: '#F9FAFB' } : {}
            ]}
          >
            {headers.map((header, cellIndex) => {
              const cellKey = header.toLowerCase().replace(/\s+/g, '')
              const cellValue = row[cellKey] || row[header] || ''
              
              return (
                <Text key={cellIndex} style={[styles.tableCell, { width: columnWidth }]}>
                  {formatCellValue(cellValue, header)}
                </Text>
              )
            })}
          </View>
        ))}
        
        {/* No data row */}
        {displayRows.length === 0 && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '100%', textAlign: 'center', fontStyle: 'italic' }]}>
              No data available
            </Text>
          </View>
        )}
        
        {/* Show truncation notice if rows were limited */}
        {maxRows && rows.length > maxRows && (
          <View style={[styles.tableRow, { backgroundColor: '#F3F4F6' }]}>
            <Text style={[styles.tableCell, { 
              width: '100%', 
              textAlign: 'center', 
              fontStyle: 'italic',
              color: pdfStyles.colors.textLight
            }]}>
              Showing top {maxRows} of {rows.length} results
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

// Helper function to format cell values based on column type
function formatCellValue(value: any, header: string): string {
  if (value === null || value === undefined) return '-'
  
  const headerLower = header.toLowerCase()
  
  // Format percentages
  if (headerLower.includes('rate') || headerLower.includes('%') || headerLower.includes('ctr')) {
    if (typeof value === 'number') {
      return `${value.toFixed(2)}%`
    }
  }
  
  // Format positions
  if (headerLower.includes('position')) {
    if (typeof value === 'number') {
      return value.toFixed(1)
    }
  }
  
  // Format large numbers with commas
  if (typeof value === 'number' && value >= 1000) {
    return value.toLocaleString()
  }
  
  // Truncate long URLs or text
  if (typeof value === 'string' && value.length > 40) {
    return value.substring(0, 37) + '...'
  }
  
  return value.toString()
}
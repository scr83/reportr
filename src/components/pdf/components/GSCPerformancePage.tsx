import React from 'react'
import { Page, View, Text } from '@react-pdf/renderer'
import { BrandingConfig, GSCData } from '@/types/report'
import { createPDFStyles, createStyleSheet } from '../BaseTemplate'
import { ReportHeader } from './ReportHeader'
import { ReportFooter } from './ReportFooter'
import { SectionTitle } from './SectionTitle'
import { GSCLineChart } from './GSCLineChart'

interface GSCPerformancePageProps {
  gscData: GSCData
  branding: BrandingConfig
  clientName: string
  pageNumber: number
  totalPages: number
}

export function GSCPerformancePage({ 
  gscData, 
  branding, 
  clientName, 
  pageNumber, 
  totalPages 
}: GSCPerformancePageProps) {
  const pdfStyles = createPDFStyles(branding)
  const styles = createStyleSheet(pdfStyles)

  // Transform daily data for charts
  const impressionsData = (gscData.dailyData || []).map(day => ({
    date: day.date,
    value: day.impressions
  }))

  const clicksData = (gscData.dailyData || []).map(day => ({
    date: day.date,
    value: day.clicks
  }))

  // Generate insights based on the data
  const generateInsights = () => {
    if (!gscData.dailyData || gscData.dailyData.length === 0) {
      return "No daily data available for trend analysis during this period."
    }

    const totalDays = gscData.dailyData.length
    const firstHalf = gscData.dailyData.slice(0, Math.floor(totalDays / 2))
    const secondHalf = gscData.dailyData.slice(Math.floor(totalDays / 2))

    const firstHalfAvgClicks = firstHalf.reduce((sum, day) => sum + day.clicks, 0) / firstHalf.length
    const secondHalfAvgClicks = secondHalf.reduce((sum, day) => sum + day.clicks, 0) / secondHalf.length
    
    const clicksChange = ((secondHalfAvgClicks - firstHalfAvgClicks) / firstHalfAvgClicks) * 100

    const firstHalfAvgImpressions = firstHalf.reduce((sum, day) => sum + day.impressions, 0) / firstHalf.length
    const secondHalfAvgImpressions = secondHalf.reduce((sum, day) => sum + day.impressions, 0) / secondHalf.length
    
    const impressionsChange = ((secondHalfAvgImpressions - firstHalfAvgImpressions) / firstHalfAvgImpressions) * 100

    let insight = `Over the reporting period, `
    
    if (Math.abs(clicksChange) > 5) {
      insight += `clicks ${clicksChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(clicksChange).toFixed(1)}% `
    } else {
      insight += `clicks remained relatively stable `
    }

    insight += `and `

    if (Math.abs(impressionsChange) > 5) {
      insight += `impressions ${impressionsChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(impressionsChange).toFixed(1)}%.`
    } else {
      insight += `impressions remained relatively stable.`
    }

    return insight
  }

  return (
    <Page size="A4" style={styles.page}>
      <ReportHeader
        branding={branding}
        clientName={clientName}
        pageTitle="Search Console Performance"
      />
      
      <View style={styles.container}>
        <SectionTitle
          title="Search Console Performance"
          subtitle="Daily clicks and impressions trend analysis"
          branding={branding}
          marginTop={0}
        />

        {/* Performance Summary */}
        <View style={[styles.card, { 
          backgroundColor: `${pdfStyles.colors.primary}10`,
          marginBottom: 24,
          padding: 16
        }]}>
          <Text style={[styles.h4, { 
            color: pdfStyles.colors.primary, 
            marginBottom: 8 
          }]}>
            Period Overview
          </Text>
          <Text style={[styles.body, { marginBottom: 0 }]}>
            {generateInsights()}
          </Text>
        </View>

        {/* Impressions Chart */}
        <GSCLineChart
          data={impressionsData}
          title="Impressions Over Time"
          lineColor="#9233ea" // Purple
          yAxisLabel="Impressions"
          branding={branding}
          height={180}
          width={500}
        />

        {/* Clicks Chart */}
        <GSCLineChart
          data={clicksData}
          title="Clicks Over Time"
          lineColor="#22d3ee" // Cyan
          yAxisLabel="Clicks"
          branding={branding}
          height={180}
          width={500}
        />

        {/* Key Metrics Summary */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16
        }}>
          <View style={[styles.metricCard, { width: '22%', marginRight: 8 }]}>
            <Text style={[styles.h4, { 
              color: '#9233ea', 
              marginBottom: 8, 
              fontSize: 10 
            }]}>
              Total Impressions
            </Text>
            <Text style={[styles.h2, { 
              fontSize: 16, 
              marginBottom: 4 
            }]}>
              {gscData.totalImpressions.toLocaleString()}
            </Text>
            <Text style={[styles.bodySmall, { 
              color: pdfStyles.colors.textLight,
              fontSize: 8
            }]}>
              Search results shown
            </Text>
          </View>

          <View style={[styles.metricCard, { width: '22%', marginRight: 8 }]}>
            <Text style={[styles.h4, { 
              color: '#22d3ee', 
              marginBottom: 8, 
              fontSize: 10 
            }]}>
              Total Clicks
            </Text>
            <Text style={[styles.h2, { 
              fontSize: 16, 
              marginBottom: 4 
            }]}>
              {gscData.totalClicks.toLocaleString()}
            </Text>
            <Text style={[styles.bodySmall, { 
              color: pdfStyles.colors.textLight,
              fontSize: 8
            }]}>
              Users clicked through
            </Text>
          </View>

          <View style={[styles.metricCard, { width: '22%', marginRight: 8 }]}>
            <Text style={[styles.h4, { 
              color: pdfStyles.colors.primary, 
              marginBottom: 8, 
              fontSize: 10 
            }]}>
              Average CTR
            </Text>
            <Text style={[styles.h2, { 
              fontSize: 16, 
              marginBottom: 4 
            }]}>
              {gscData.averageCTR.toFixed(1)}%
            </Text>
            <Text style={[styles.bodySmall, { 
              color: pdfStyles.colors.textLight,
              fontSize: 8
            }]}>
              Click-through rate
            </Text>
          </View>

          <View style={[styles.metricCard, { width: '22%' }]}>
            <Text style={[styles.h4, { 
              color: pdfStyles.colors.secondary, 
              marginBottom: 8, 
              fontSize: 10 
            }]}>
              Avg Position
            </Text>
            <Text style={[styles.h2, { 
              fontSize: 16, 
              marginBottom: 4 
            }]}>
              {gscData.averagePosition.toFixed(1)}
            </Text>
            <Text style={[styles.bodySmall, { 
              color: pdfStyles.colors.textLight,
              fontSize: 8
            }]}>
              Search ranking
            </Text>
          </View>
        </View>
      </View>
      
      <ReportFooter
        branding={branding}
        pageNumber={pageNumber}
        totalPages={totalPages}
      />
    </Page>
  )
}
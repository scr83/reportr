'use client'

import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { Card, Typography, Button, Input, Select } from '@/components/atoms'
import { MetricSelectorModal } from '@/components/organisms'
import { ArrowLeft, ArrowRight, Check, FileText, BarChart3, Calendar, Download, AlertCircle, RefreshCw, Zap } from 'lucide-react'
import { checkPDFSupport, getReportTypeDescription, estimatePDFSize } from '@/lib/pdf-generator'
import { MOCK_BRANDING, MOCK_EXECUTIVE_REPORT, MOCK_STANDARD_REPORT, MOCK_CUSTOM_REPORT } from '@/lib/mock-report-data'
import { ReportData } from '@/types/report'

interface LegacyReportData {
  clientId: string
  client: string
  startDate: string
  endDate: string
  gscData: {
    totalClicks: string
    totalImpressions: string
    averageCTR: string
    averagePosition: string
    topQueries: string
  }
  ga4Data: {
    users: string
    sessions: string
    bounceRate: string
    conversions: string
  }
}

export default function GenerateReportPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isFetchingGoogle, setIsFetchingGoogle] = useState(false)
  const [googleError, setGoogleError] = useState<string | null>(null)
  const [jsonError, setJsonError] = useState<string | null>(null)
  const [clients, setClients] = useState<any[]>([])
  const [loadingClients, setLoadingClients] = useState(true)
  const [reportType, setReportType] = useState<'executive' | 'standard' | 'custom'>('executive')
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['users', 'sessions', 'bounceRate', 'conversions'])
  const [isMetricModalOpen, setIsMetricModalOpen] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [reportData, setReportData] = useState<LegacyReportData>({
    clientId: '',
    client: '',
    startDate: '',
    endDate: '',
    gscData: {
      totalClicks: '',
      totalImpressions: '',
      averageCTR: '',
      averagePosition: '',
      topQueries: ''
    },
    ga4Data: {
      users: '',
      sessions: '',
      bounceRate: '',
      conversions: ''
    }
  })
  const [activeDataTab, setActiveDataTab] = useState<'gsc' | 'ga4'>('gsc')

  // Field definitions for each report type
  const REPORT_FIELDS = {
    executive: [
      { id: 'users', label: 'Users', placeholder: 'e.g., 1,234' },
      { id: 'sessions', label: 'Sessions', placeholder: 'e.g., 2,456' },
      { id: 'bounceRate', label: 'Bounce Rate (%)', placeholder: 'e.g., 45.2' },
      { id: 'conversions', label: 'Conversions', placeholder: 'e.g., 24' }
    ],
    standard: [
      { id: 'users', label: 'Users', placeholder: 'e.g., 1,234' },
      { id: 'sessions', label: 'Sessions', placeholder: 'e.g., 2,456' },
      { id: 'bounceRate', label: 'Bounce Rate (%)', placeholder: 'e.g., 45.2' },
      { id: 'conversions', label: 'Conversions', placeholder: 'e.g., 24' },
      { id: 'avgSessionDuration', label: 'Avg Session Duration', placeholder: 'e.g., 3:24' },
      { id: 'pagesPerSession', label: 'Pages per Session', placeholder: 'e.g., 4.2' },
      { id: 'newUsers', label: 'New Users', placeholder: 'e.g., 856' },
      { id: 'organicTraffic', label: 'Organic Traffic %', placeholder: 'e.g., 68.5' },
      { id: 'topLandingPages', label: 'Top Landing Pages (JSON)', placeholder: '[...]' },
      { id: 'deviceBreakdown', label: 'Device Breakdown (JSON)', placeholder: '{...}' }
    ],
    custom: [] // Will be populated from selectedMetrics
  }

  // Get metric categories for field mapping
  const METRIC_CATEGORIES = {
    audience: {
      title: '👥 Audience',
      metrics: [
        { id: 'users', name: 'Users', description: 'Total number of users' },
        { id: 'newUsers', name: 'New Users', description: 'First-time visitors' },
        { id: 'sessions', name: 'Sessions', description: 'Total sessions' },
        { id: 'engagedSessions', name: 'Engaged Sessions', description: 'Sessions with engagement' },
        { id: 'engagementRate', name: 'Engagement Rate', description: '% of engaged sessions' },
        { id: 'sessionsPerUser', name: 'Sessions per User', description: 'Avg sessions per user' }
      ]
    },
    engagement: {
      title: '🎯 Engagement',
      metrics: [
        { id: 'bounceRate', name: 'Bounce Rate', description: '% of single-page sessions' },
        { id: 'pagesPerSession', name: 'Pages per Session', description: 'Avg pages viewed' },
        { id: 'avgSessionDuration', name: 'Avg Session Duration', description: 'Time on site' },
        { id: 'eventCount', name: 'Event Count', description: 'Total events triggered' },
        { id: 'scrollDepth', name: 'Scroll Depth', description: 'How far users scroll' }
      ]
    },
    conversions: {
      title: '💰 Conversions',
      metrics: [
        { id: 'conversions', name: 'Conversions', description: 'Total conversions' },
        { id: 'conversionRate', name: 'Conversion Rate', description: '% of converting sessions' },
        { id: 'revenue', name: 'Revenue', description: 'Total revenue (if e-commerce)' },
        { id: 'ecommercePurchases', name: 'E-commerce Purchases', description: 'Purchase events' },
        { id: 'transactions', name: 'Transactions', description: 'Completed transactions' }
      ]
    },
    traffic: {
      title: '📍 Traffic Sources',
      metrics: [
        { id: 'organicTraffic', name: 'Organic Traffic %', description: 'Traffic from search' },
        { id: 'directTraffic', name: 'Direct Traffic', description: 'Direct visits' },
        { id: 'referralTraffic', name: 'Referral Traffic', description: 'Traffic from other sites' },
        { id: 'socialTraffic', name: 'Social Traffic', description: 'Traffic from social media' },
        { id: 'paidTraffic', name: 'Paid Traffic', description: 'Traffic from ads' }
      ]
    },
    behavior: {
      title: '📱 Behavior',
      metrics: [
        { id: 'deviceBreakdown', name: 'Device Breakdown', description: 'Desktop/Mobile/Tablet' },
        { id: 'topLandingPages', name: 'Top Landing Pages', description: 'Most visited entry pages' },
        { id: 'topExitPages', name: 'Top Exit Pages', description: 'Most common exit points' },
        { id: 'screenPageViews', name: 'Page Views', description: 'Total page views' }
      ]
    }
  }

  // Determine which fields to show
  const getFieldsForReportType = () => {
    if (reportType === 'custom') {
      // Map selected metric IDs to field definitions
      return selectedMetrics.map(metricId => {
        // Find metric definition from METRIC_CATEGORIES
        for (const category of Object.values(METRIC_CATEGORIES)) {
          const metric = category.metrics.find(m => m.id === metricId)
          if (metric) {
            return {
              id: metricId,
              label: metric.name,
              placeholder: `e.g., value for ${metric.name}`
            }
          }
        }
        return null
      }).filter((field): field is { id: string; label: string; placeholder: string } => field !== null)
    }
    
    return REPORT_FIELDS[reportType] || REPORT_FIELDS.executive
  }

  // Fetch clients on component mount and handle URL params
  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await fetch('/api/clients')
        const data = await response.json()
        setClients(data || [])
        
        // Auto-select client from URL params
        const urlParams = new URLSearchParams(window.location.search)
        const clientIdFromUrl = urlParams.get('clientId')
        if (clientIdFromUrl && data) {
          const selectedClient = data.find((c: any) => c.id === clientIdFromUrl)
          if (selectedClient) {
            setReportData(prev => ({
              ...prev,
              clientId: selectedClient.id,
              client: selectedClient.name
            }))
          }
        }
      } catch (error) {
        console.error('Failed to fetch clients:', error)
      } finally {
        setLoadingClients(false)
      }
    }
    
    fetchClients()
  }, [])

  const steps = [
    { number: 1, title: 'Report Details', icon: FileText },
    { number: 2, title: 'Import Data', icon: BarChart3 },
    { number: 3, title: 'Preview & Generate', icon: Check }
  ]

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const validateJsonQueries = (jsonString: string): boolean => {
    if (!jsonString.trim()) return true
    
    try {
      const parsed = JSON.parse(jsonString)
      if (!Array.isArray(parsed)) {
        setJsonError('Top queries must be an array')
        return false
      }
      
      for (const item of parsed) {
        if (typeof item !== 'object' || !item.query || typeof item.clicks !== 'number' || typeof item.impressions !== 'number' || typeof item.ctr !== 'number' || typeof item.position !== 'number') {
          setJsonError('Each query must have: query (string), clicks (number), impressions (number), ctr (number), position (number)')
          return false
        }
      }
      
      setJsonError(null)
      return true
    } catch (error) {
      setJsonError('Invalid JSON format')
      return false
    }
  }

  const handleFetchGoogleData = async () => {
    if (!reportData.clientId || !reportData.startDate || !reportData.endDate) {
      setGoogleError('Please select a client and date range first')
      return
    }

    // Check if client has properties configured
    const selectedClient = clients.find(c => c.id === reportData.clientId)
    if (!selectedClient?.gscSiteUrl || !selectedClient?.ga4PropertyId) {
      setGoogleError('This client needs Google properties configured first. Please go to the client page and set up Search Console and Analytics properties.')
      return
    }

    setIsFetchingGoogle(true)
    setGoogleError(null)

    try {
      // Fetch GSC data
      const gscRes = await fetch(
        `/api/clients/${reportData.clientId}/google/search-console?startDate=${reportData.startDate}&endDate=${reportData.endDate}`
      )
      
      let gscData = null
      if (gscRes.ok) {
        const gscResponse = await gscRes.json()
        gscData = gscResponse.data
      } else {
        const gscError = await gscRes.json()
        console.warn('GSC fetch failed:', gscError.error)
      }

      // Fetch GA4 data with dynamic metrics
      const fieldsToShow = getFieldsForReportType()
      const metricsToRequest = fieldsToShow.map(field => field.id).join(',')
      
      const ga4Res = await fetch(
        `/api/clients/${reportData.clientId}/google/analytics?startDate=${reportData.startDate}&endDate=${reportData.endDate}&metrics=${metricsToRequest}`
      )
      
      let ga4Data = null
      if (ga4Res.ok) {
        const ga4Response = await ga4Res.json()
        ga4Data = ga4Response.data
      } else {
        const ga4Error = await ga4Res.json()
        console.warn('GA4 fetch failed:', ga4Error.error)
      }

      // Update form data with fetched data
      if (gscData || ga4Data) {
        // Update legacy reportData for existing functionality
        setReportData(prev => ({
          ...prev,
          gscData: {
            totalClicks: gscData?.clicks ? gscData.clicks.toLocaleString() : prev.gscData.totalClicks || 'N/A',
            totalImpressions: gscData?.impressions ? gscData.impressions.toLocaleString() : prev.gscData.totalImpressions || 'N/A',
            averageCTR: gscData?.ctr ? `${gscData.ctr}%` : prev.gscData.averageCTR || 'N/A',
            averagePosition: gscData?.position ? gscData.position : prev.gscData.averagePosition || 'N/A',
            topQueries: gscData?.topQueries ? JSON.stringify(gscData.topQueries, null, 2) : prev.gscData.topQueries || '[]'
          },
          ga4Data: {
            users: ga4Data?.users ? ga4Data.users.toLocaleString() : prev.ga4Data.users || 'N/A',
            sessions: ga4Data?.sessions ? ga4Data.sessions.toLocaleString() : prev.ga4Data.sessions || 'N/A',
            bounceRate: ga4Data?.bounceRate ? `${ga4Data.bounceRate}%` : prev.ga4Data.bounceRate || 'N/A',
            conversions: ga4Data?.conversions ? ga4Data.conversions.toLocaleString() : prev.ga4Data.conversions || 'N/A'
          }
        }))

        // Map fetched data to dynamic form fields with null safety
        const newFormData: Record<string, any> = {}
        const fieldsToShow = getFieldsForReportType()
        
        // Add GSC data with fallbacks
        if (gscData) {
          newFormData.totalClicks = gscData.clicks !== undefined ? gscData.clicks.toLocaleString() : ''
          newFormData.totalImpressions = gscData.impressions !== undefined ? gscData.impressions.toLocaleString() : ''
          newFormData.averageCTR = gscData.ctr ? `${gscData.ctr}%` : ''
          newFormData.averagePosition = gscData.position || ''
          newFormData.topQueries = gscData.topQueries && gscData.topQueries.length > 0 ? JSON.stringify(gscData.topQueries, null, 2) : ''
          newFormData.topPages = gscData.topPages && gscData.topPages.length > 0 ? JSON.stringify(gscData.topPages, null, 2) : ''
        }
        
        // Add GA4 data for dynamic fields from new dynamicMetrics property
        fieldsToShow.forEach(field => {
          if (ga4Data && ga4Data.dynamicMetrics) {
            const value = ga4Data.dynamicMetrics[field.id]
            if (value !== undefined) {
              // Format the value appropriately
              if (typeof value === 'number' && ['users', 'newUsers', 'sessions', 'conversions'].includes(field.id)) {
                newFormData[field.id] = value.toLocaleString()
              } else if (typeof value === 'object') {
                newFormData[field.id] = JSON.stringify(value, null, 2)
              } else {
                newFormData[field.id] = value.toString()
              }
            }
          }
        })
        
        // Keep backward compatibility with existing hardcoded fields
        if (ga4Data) {
          if (ga4Data.users) newFormData.users = ga4Data.users.toString()
          if (ga4Data.sessions) newFormData.sessions = ga4Data.sessions.toString()
          if (ga4Data.bounceRate) newFormData.bounceRate = ga4Data.bounceRate.toString()
          if (ga4Data.conversions) newFormData.conversions = ga4Data.conversions.toString()
        }
        
        setFormData(newFormData)

        // Show success message
        const fetchedSources = []
        if (gscData) fetchedSources.push('Search Console')
        if (ga4Data) fetchedSources.push('Analytics')
        
        alert(`Data successfully fetched from Google ${fetchedSources.join(' and ')}!`)
      } else {
        throw new Error('Failed to fetch data from both Google APIs. Please verify your Google connection and try again.')
      }

    } catch (error: any) {
      console.error('Google data fetch error:', error)
      setGoogleError(error.message || 'Failed to fetch data from Google APIs')
    } finally {
      setIsFetchingGoogle(false)
    }
  }

  const handleGeneratePDF = async () => {
    if (!checkPDFSupport()) {
      alert('PDF generation is not supported in your browser. Please use a modern browser.')
      return
    }

    setIsGenerating(true)
    
    try {
      // Prepare report data for our new PDF system
      const clientName = reportData.client === 'techstart' ? 'TechStart Solutions' : reportData.client
      
      // Convert legacy report data to our new format
      const pdfReportData: ReportData = {
        clientName,
        reportType,
        startDate: reportData.startDate,
        endDate: reportData.endDate,
        branding: MOCK_BRANDING,
        selectedMetrics: reportType === 'custom' ? selectedMetrics : undefined
      }

      // Add metrics based on report type
      if (reportType === 'executive') {
        pdfReportData.metrics = {
          users: parseFloat(reportData.ga4Data.users.replace(/,/g, '')) || 0,
          sessions: parseFloat(reportData.ga4Data.sessions.replace(/,/g, '')) || 0,
          bounceRate: parseFloat(reportData.ga4Data.bounceRate) || 0,
          conversions: parseFloat(reportData.ga4Data.conversions.replace(/,/g, '')) || 0
        }
      } else {
        // For standard and custom reports, include full data
        if (reportData.gscData.totalClicks || reportData.gscData.totalImpressions) {
          pdfReportData.gscData = {
            totalClicks: parseFloat(reportData.gscData.totalClicks.replace(/,/g, '')) || 0,
            totalImpressions: parseFloat(reportData.gscData.totalImpressions.replace(/,/g, '')) || 0,
            averageCTR: parseFloat(reportData.gscData.averageCTR) || 0,
            averagePosition: parseFloat(reportData.gscData.averagePosition) || 0,
            topQueries: reportData.gscData.topQueries ? 
              JSON.parse(reportData.gscData.topQueries) : []
          }
        }

        if (reportData.ga4Data.users || reportData.ga4Data.sessions) {
          pdfReportData.ga4Data = {
            users: parseFloat(reportData.ga4Data.users.replace(/,/g, '')) || 0,
            sessions: parseFloat(reportData.ga4Data.sessions.replace(/,/g, '')) || 0,
            bounceRate: parseFloat(reportData.ga4Data.bounceRate) || 0,
            conversions: parseFloat(reportData.ga4Data.conversions.replace(/,/g, '')) || 0,
            avgSessionDuration: 240, // Default value
            pagesPerSession: 2.5, // Default value
            newUsers: Math.floor((parseFloat(reportData.ga4Data.users.replace(/,/g, '')) || 0) * 0.7),
            organicTraffic: 65.5, // Default value
            topLandingPages: [
              { page: '/', sessions: Math.floor(((parseFloat(reportData.ga4Data.sessions.replace(/,/g, '')) || 0) * 0.4)), users: Math.floor(((parseFloat(reportData.ga4Data.users.replace(/,/g, '')) || 0) * 0.4)), bounceRate: 25.3 },
              { page: '/services', sessions: Math.floor(((parseFloat(reportData.ga4Data.sessions.replace(/,/g, '')) || 0) * 0.3)), users: Math.floor(((parseFloat(reportData.ga4Data.users.replace(/,/g, '')) || 0) * 0.3)), bounceRate: 45.2 },
              { page: '/about', sessions: Math.floor(((parseFloat(reportData.ga4Data.sessions.replace(/,/g, '')) || 0) * 0.2)), users: Math.floor(((parseFloat(reportData.ga4Data.users.replace(/,/g, '')) || 0) * 0.2)), bounceRate: 55.8 }
            ],
            deviceBreakdown: {
              desktop: Math.floor(((parseFloat(reportData.ga4Data.sessions.replace(/,/g, '')) || 0) * 0.6)),
              mobile: Math.floor(((parseFloat(reportData.ga4Data.sessions.replace(/,/g, '')) || 0) * 0.35)),
              tablet: Math.floor(((parseFloat(reportData.ga4Data.sessions.replace(/,/g, '')) || 0) * 0.05))
            },
            trafficSources: [
              { source: 'Organic Search', sessions: Math.floor(((parseFloat(reportData.ga4Data.sessions.replace(/,/g, '')) || 0) * 0.65)), percentage: 65.5 },
              { source: 'Direct', sessions: Math.floor(((parseFloat(reportData.ga4Data.sessions.replace(/,/g, '')) || 0) * 0.25)), percentage: 25.0 },
              { source: 'Social', sessions: Math.floor(((parseFloat(reportData.ga4Data.sessions.replace(/,/g, '')) || 0) * 0.10)), percentage: 9.5 }
            ]
          }
        }
      }

      // Use mock data if no real data is available
      if (!pdfReportData.metrics && !pdfReportData.ga4Data && !pdfReportData.gscData) {
        console.log('No real data available, using mock data for demonstration')
        const mockData = reportType === 'executive' ? MOCK_EXECUTIVE_REPORT : 
                         reportType === 'standard' ? MOCK_STANDARD_REPORT : 
                         MOCK_CUSTOM_REPORT
        Object.assign(pdfReportData, mockData)
        pdfReportData.clientName = clientName
      }
      
      // Generate and download PDF via server API (saves to database)
      console.log('🚀 Calling server-side PDF generation API...')
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: reportData.clientId,
          clientName: pdfReportData.clientName,
          startDate: pdfReportData.startDate,
          endDate: pdfReportData.endDate,
          agencyName: pdfReportData.branding?.name,
          agencyLogo: pdfReportData.branding?.logo,
          gscData: {
            clicks: pdfReportData.gscData?.clicks || 0,
            impressions: pdfReportData.gscData?.impressions || 0,
            ctr: pdfReportData.gscData?.ctr || 0,
            position: pdfReportData.gscData?.position || 0,
            topQueries: pdfReportData.gscData?.topQueries
          },
          ga4Data: {
            users: pdfReportData.ga4Data?.users || 0,
            sessions: pdfReportData.ga4Data?.sessions || 0,
            bounceRate: pdfReportData.ga4Data?.bounceRate || 0,
            conversions: pdfReportData.ga4Data?.conversions || 0
          }
        })
      })

      if (response.ok) {
        // Server returns PDF as blob for immediate download
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = `${pdfReportData.clientName.replace(/[^a-zA-Z0-9]/g, '_')}_SEO_Report.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        
        console.log('✅ PDF generated, downloaded, and saved to database!')
        alert('PDF report generated and downloaded successfully! 🎉\n\nThe report has been saved to your Reports Library.')
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate PDF')
      }
      
    } catch (error) {
      console.error('PDF generation error:', error)
      alert(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const renderProgressBar = () => (
    <div className="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center w-full sm:w-auto">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
            currentStep >= step.number
              ? 'bg-purple-600 border-purple-600 text-white'
              : 'border-gray-300 text-gray-400'
          }`}>
            {currentStep > step.number ? (
              <Check className="w-5 h-5" />
            ) : (
              <step.icon className="w-5 h-5" />
            )}
          </div>
          <div className="ml-3 text-sm flex-1">
            <div className={`font-medium ${currentStep >= step.number ? 'text-purple-600' : 'text-gray-400'}`}>
              Step {step.number}
            </div>
            <div className="text-gray-600">{step.title}</div>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-20 h-0.5 mx-4 hidden sm:block ${
              currentStep > step.number ? 'bg-purple-600' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <Card className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <Typography variant="h2" className="text-2xl font-bold text-gray-900 mb-6">
        Report Details
      </Typography>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Client
          </label>
          {loadingClients ? (
            <div className="p-3 text-slate-400 bg-gray-50 rounded-md">
              Loading clients...
            </div>
          ) : clients.length === 0 ? (
            <div className="p-3 text-slate-400 bg-gray-50 rounded-md">
              No clients found. Add a client first.
            </div>
          ) : (
            <Select
              value={reportData.clientId}
              onChange={(e) => {
                const selectedClient = clients.find(c => c.id === e.target.value)
                setReportData({ 
                  ...reportData, 
                  clientId: e.target.value,
                  client: selectedClient?.name || ''
                })
              }}
              className="w-full"
            >
              <option value="">Choose a client...</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </Select>
          )}
        </div>

        {/* Report Type Selection */}
        <div className="bg-gray-50 rounded-lg p-6">
          <Typography variant="h3" className="text-lg font-semibold text-gray-900 mb-4">
            Report Type
          </Typography>
          <div className="space-y-3">
            <label className="flex items-start p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50">
              <input
                type="radio"
                name="reportType"
                value="executive"
                checked={reportType === 'executive'}
                onChange={(e) => setReportType(e.target.value as 'executive')}
                className="mt-1 w-4 h-4 text-purple-600"
              />
              <div className="ml-3">
                <div className="font-medium text-gray-900">📊 Executive Summary</div>
                <div className="text-sm text-gray-600">High-level overview with key metrics and insights</div>
                <div className="text-xs text-gray-500 mt-1">
                  Users • Sessions • Bounce Rate • Conversions
                </div>
              </div>
            </label>
            
            <label className="flex items-start p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50">
              <input
                type="radio"
                name="reportType"
                value="standard"
                checked={reportType === 'standard'}
                onChange={(e) => setReportType(e.target.value as 'standard')}
                className="mt-1 w-4 h-4 text-purple-600"
              />
              <div className="ml-3">
                <div className="font-medium text-gray-900">📈 Standard SEO Report</div>
                <div className="text-sm text-gray-600">Comprehensive analysis with all standard metrics</div>
                <div className="text-xs text-gray-500 mt-1">
                  Users • Sessions • Bounce Rate • Conversions • Avg Duration • Pages/Session • New Users • Organic % • Top Landing Pages • Devices
                </div>
              </div>
            </label>
            
            <label className="flex items-start p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50">
              <input
                type="radio"
                name="reportType"
                value="custom"
                checked={reportType === 'custom'}
                onChange={(e) => setReportType(e.target.value as 'custom')}
                className="mt-1 w-4 h-4 text-purple-600"
              />
              <div className="ml-3">
                <div className="font-medium text-gray-900">⚙️ Custom Report</div>
                <div className="text-sm text-gray-600">Choose specific metrics and sections</div>
                <div className="text-xs text-gray-500 mt-1">
                  Select from 30+ available GA4 metrics
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Custom Metrics Selection */}
        {reportType === 'custom' && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <Typography variant="h4" className="text-md font-semibold text-gray-900">
                Selected Metrics ({selectedMetrics.length})
              </Typography>
              <Button
                variant="outline"
                onClick={() => setIsMetricModalOpen(true)}
                className="border-purple-300 text-purple-700 hover:bg-purple-100"
              >
                Choose Metrics
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedMetrics.map(metric => (
                <span
                  key={metric}
                  className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded"
                >
                  {metric}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <Input
              type="date"
              value={reportData.startDate}
              onChange={(value) => setReportData({ ...reportData, startDate: value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <Input
              type="date"
              value={reportData.endDate}
              onChange={(value) => setReportData({ ...reportData, endDate: value })}
            />
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button 
            onClick={handleNext}
            disabled={!reportData.clientId || !reportData.startDate || !reportData.endDate}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Continue to Data Import
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )

  const renderStep2 = () => (
    <Card className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <Typography variant="h2" className="text-2xl font-bold text-gray-900 mb-6">
        Import Data
      </Typography>

      {/* Google Auto-Fetch Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-3">
              <Typography className="text-lg font-semibold text-gray-900">
                Auto-Fetch from Google APIs
              </Typography>
              <Typography className="text-sm text-gray-600">
                Automatically import data from Google Search Console and Analytics
              </Typography>
            </div>
          </div>
          <Button 
            variant="outline"
            onClick={handleFetchGoogleData}
            disabled={isFetchingGoogle || !reportData.clientId || !reportData.startDate || !reportData.endDate}
            className="border-purple-300 text-purple-700 hover:bg-purple-50"
          >
            {isFetchingGoogle ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Fetching...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Fetch from Google
              </>
            )}
          </Button>
        </div>
        
        {googleError && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-3">
            <div className="flex">
              <AlertCircle className="h-4 w-4 text-red-400 mt-0.5" />
              <div className="ml-2">
                <Typography className="text-sm text-red-800">{googleError}</Typography>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-4 text-xs text-gray-500">
          <strong>Note:</strong> You can also manually enter data below if auto-fetch is not available.
        </div>
      </div>

      {/* Data Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveDataTab('gsc')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeDataTab === 'gsc'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Google Search Console
          </button>
          <button
            onClick={() => setActiveDataTab('ga4')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeDataTab === 'ga4'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Google Analytics 4
          </button>
        </nav>
      </div>

      {/* GSC Fields */}
      {activeDataTab === 'gsc' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Clicks
              </label>
              <Input
                value={reportData.gscData.totalClicks}
                onChange={(value) => setReportData({
                  ...reportData,
                  gscData: { ...reportData.gscData, totalClicks: value }
                })}
                placeholder="e.g., 1,234"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Impressions
              </label>
              <Input
                value={reportData.gscData.totalImpressions}
                onChange={(value) => setReportData({
                  ...reportData,
                  gscData: { ...reportData.gscData, totalImpressions: value }
                })}
                placeholder="e.g., 45,678"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average CTR (%)
              </label>
              <Input
                value={reportData.gscData.averageCTR}
                onChange={(value) => setReportData({
                  ...reportData,
                  gscData: { ...reportData.gscData, averageCTR: value }
                })}
                placeholder="e.g., 2.7"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average Position
              </label>
              <Input
                value={reportData.gscData.averagePosition}
                onChange={(value) => setReportData({
                  ...reportData,
                  gscData: { ...reportData.gscData, averagePosition: value }
                })}
                placeholder="e.g., 12.5"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Top Queries (JSON format)
            </label>
            <textarea
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={reportData.gscData.topQueries}
              onChange={(e) => setReportData({
                ...reportData,
                gscData: { ...reportData.gscData, topQueries: e.target.value }
              })}
              placeholder='[{"query": "seo tools", "clicks": 123, "impressions": 4567}, ...]'
            />
          </div>
        </div>
      )}

      {/* GA4 Fields */}
      {activeDataTab === 'ga4' && (
        <div className="space-y-4">
          {(() => {
            const fieldsToShow = getFieldsForReportType()
            
            if (fieldsToShow.length === 0) {
              return (
                <div className="text-center py-8 text-gray-500">
                  No metrics selected. Please select metrics in Step 1.
                </div>
              )
            }
            
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fieldsToShow.map(field => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={formData[field.id] || ''}
                      onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                ))}
              </div>
            )
          })()}
        </div>
      )}

      <div className="flex justify-between pt-8">
        <Button variant="secondary" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700">
          Preview Report
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  )

  const renderStep3 = () => (
    <Card className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <Typography variant="h2" className="text-2xl font-bold text-gray-900 mb-6">
        Preview & Generate
      </Typography>

      {/* Client & Period Info */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <Typography variant="h3" className="text-lg font-semibold text-gray-900 mb-2">
          {reportData.client || 'Selected Client'}
        </Typography>
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          Reporting Period: {reportData.startDate} to {reportData.endDate}
        </div>
      </div>

      {/* Metrics Display */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* GSC Metrics */}
        <div>
          <Typography variant="h3" className="text-lg font-semibold text-gray-900 mb-4">
            Google Search Console
          </Typography>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Total Clicks</span>
              <span className="font-medium">{reportData.gscData.totalClicks || '—'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Total Impressions</span>
              <span className="font-medium">{reportData.gscData.totalImpressions || '—'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Average CTR</span>
              <span className="font-medium">{reportData.gscData.averageCTR ? `${reportData.gscData.averageCTR}%` : '—'}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Average Position</span>
              <span className="font-medium">{reportData.gscData.averagePosition || '—'}</span>
            </div>
          </div>
        </div>

        {/* GA4 Metrics - Dynamic */}
        <div>
          <Typography variant="h3" className="text-lg font-semibold text-gray-900 mb-4">
            Google Analytics 4
          </Typography>
          <div className="space-y-3">
            {(() => {
              const fieldsToShow = getFieldsForReportType()
              
              if (fieldsToShow.length === 0) {
                return (
                  <div className="text-center py-8 text-gray-500">
                    No metrics selected for preview
                  </div>
                )
              }
              
              return fieldsToShow.map((field, index) => {
                const value = formData[field.id]
                const isLast = index === fieldsToShow.length - 1
                
                return (
                  <div key={field.id} className={`flex justify-between py-2 ${!isLast ? 'border-b border-gray-200' : ''}`}>
                    <span className="text-gray-600">{field.label}</span>
                    <span className="font-medium">
                      {value ? (
                        typeof value === 'object' ? JSON.stringify(value) : value
                      ) : '—'}
                    </span>
                  </div>
                )
              })
            })()}
          </div>
          
          {/* Show message if no data */}
          {Object.keys(formData).length === 0 && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-sm text-yellow-800">
                💡 No data fetched yet. Go back to Step 2 and fetch data from Google APIs to see preview.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PDF Report Preview */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Typography variant="h4" className="text-md font-semibold text-blue-900 mb-2">
              📄 PDF Report Preview
            </Typography>
            <div className="space-y-2 text-sm text-blue-800">
              <div><strong>Type:</strong> {getReportTypeDescription(reportType)}</div>
              <div><strong>Client:</strong> {reportData.client || 'Select a client'}</div>
              <div><strong>Period:</strong> {reportData.startDate && reportData.endDate ? `${reportData.startDate} to ${reportData.endDate}` : 'Select dates'}</div>
              {reportType === 'custom' && (
                <div><strong>Metrics:</strong> {selectedMetrics.length} selected</div>
              )}
              <div><strong>Estimated Size:</strong> {(() => {
                const mockReportData = {
                  clientName: reportData.client || 'Client',
                  reportType,
                  startDate: reportData.startDate,
                  endDate: reportData.endDate,
                  branding: MOCK_BRANDING,
                  selectedMetrics: reportType === 'custom' ? selectedMetrics : undefined
                }
                return estimatePDFSize(mockReportData)
              })()}</div>
            </div>
          </div>
          <div className="ml-4">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="secondary" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed" 
          onClick={handleGeneratePDF}
          disabled={isGenerating || !!jsonError}
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Generate PDF Report
            </>
          )}
        </Button>
      </div>
    </Card>
  )

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 sm:mb-8">
          <Typography variant="h1" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Generate Report
          </Typography>
          <Typography className="text-gray-600">
            Create a comprehensive SEO report in 3 simple steps.
          </Typography>
        </div>

        {renderProgressBar()}

        <div className="min-h-[600px]">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        {/* Metric Selector Modal */}
        <MetricSelectorModal
          isOpen={isMetricModalOpen}
          onClose={() => setIsMetricModalOpen(false)}
          selectedMetrics={selectedMetrics}
          onSave={(metrics: string[]) => setSelectedMetrics(metrics)}
        />
      </div>
    </DashboardLayout>
  )
}
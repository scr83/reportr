'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { Card, Typography, Button, Input } from '@/components/atoms'
import { Search, FileText, Eye, Calendar, Download, X } from 'lucide-react'

interface Report {
  id: string
  title: string
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  data: {
    clientName: string
    startDate: string
    endDate: string
    gscData: {
      clicks: number
      impressions: number
      ctr: number
      position: number
    }
    ga4Data: {
      users: number
      sessions: number
      bounceRate: number
      conversions: number
    }
  }
  pdfUrl?: string
  createdAt: string
  client: {
    id: string
    name: string
    domain: string
  }
}

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/reports')
      if (response.ok) {
        const data = await response.json()
        setReports(data)
      } else {
        console.error('Failed to fetch reports')
      }
    } catch (error) {
      console.error('Error fetching reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewReport = (report: Report) => {
    setSelectedReport(report)
    setIsModalOpen(true)
  }

  const handleDownloadPDF = (report: Report) => {
    if (!report.pdfUrl) {
      alert('PDF not available for this report')
      return
    }

    try {
      // Convert base64 to blob and download
      const base64Response = fetch(`data:application/pdf;base64,${report.pdfUrl}`)
      base64Response.then(res => res.blob()).then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = `${report.data.clientName.replace(/[^a-zA-Z0-9]/g, '_')}_SEO_Report.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      })
    } catch (error) {
      console.error('Error downloading PDF:', error)
      alert('Failed to download PDF')
    }
  }

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const end = new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    return `${start} - ${end}`
  }

  const getStatusBadge = (status: string) => {
    const statusColors = {
      COMPLETED: 'bg-green-100 text-green-800',
      PROCESSING: 'bg-yellow-100 text-yellow-800',
      PENDING: 'bg-gray-100 text-gray-800',
      FAILED: 'bg-red-100 text-red-800'
    }
    return statusColors[status as keyof typeof statusColors] || statusColors.PENDING
  }

  const filteredReports = reports.filter(report =>
    report.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.data.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <Typography variant="h1" className="text-3xl font-bold text-gray-900 mb-2">
            Reports Library
          </Typography>
          <Typography className="text-gray-600">
            Browse and download all your generated SEO reports.
          </Typography>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by client name..."
              value={searchQuery}
              onChange={(value) => setSearchQuery(value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </Card>
            ))}
          </div>
        )}

        {/* Reports Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-themed-light">
                      <FileText className="h-4 w-4 text-primary-themed" />
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(report.status)}`}>
                      {report.status.toLowerCase()}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleViewReport(report)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mb-4">
                  <Typography className="font-semibold text-gray-900 mb-1">
                    {report.data.clientName}
                  </Typography>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDateRange(report.data.startDate, report.data.endDate)}
                  </div>
                  <Typography className="text-xs text-gray-500">
                    Generated on {new Date(report.createdAt).toLocaleDateString()}
                  </Typography>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GSC Clicks:</span>
                    <span className="font-medium text-gray-900">{report.data.gscData.clicks.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GA4 Users:</span>
                    <span className="font-medium text-gray-900">{report.data.ga4Data.users.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewReport(report)}
                  >
                    View Details
                  </Button>
                  {report.status === 'COMPLETED' && report.pdfUrl && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadPDF(report)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredReports.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <Typography variant="h3" className="text-lg font-medium text-gray-900 mb-2">
              No reports found
            </Typography>
            <Typography className="text-gray-600 mb-4">
              No reports match your search query &quot;{searchQuery}&quot;.
            </Typography>
            <Button variant="ghost" onClick={() => setSearchQuery('')}>
              Clear search
            </Button>
          </div>
        )}

        {/* Generate New Report CTA */}
        {!loading && filteredReports.length === 0 && !searchQuery && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <Typography variant="h3" className="text-lg font-medium text-gray-900 mb-2">
              No reports yet
            </Typography>
            <Typography className="text-gray-600 mb-4">
              Start by generating your first SEO report.
            </Typography>
            <Link href="/generate-report">
              <Button className="btn-primary-themed">
                Generate Report
              </Button>
            </Link>
          </div>
        )}

        {/* Report Details Modal */}
        {isModalOpen && selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <Typography variant="h2" className="text-xl font-semibold text-gray-900">
                    Report Details
                  </Typography>
                  <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <Typography className="font-semibold text-gray-900 mb-2">Report Information</Typography>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Client:</span>
                        <span className="font-medium">{selectedReport.data.clientName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date Range:</span>
                        <span className="font-medium">{formatDateRange(selectedReport.data.startDate, selectedReport.data.endDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(selectedReport.status)}`}>
                          {selectedReport.status.toLowerCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Generated:</span>
                        <span className="font-medium">{new Date(selectedReport.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* GSC Data */}
                  <div>
                    <Typography className="font-semibold text-gray-900 mb-2">Google Search Console Data</Typography>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Clicks:</span>
                        <span className="font-medium">{selectedReport.data.gscData.clicks.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Impressions:</span>
                        <span className="font-medium">{selectedReport.data.gscData.impressions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average CTR:</span>
                        <span className="font-medium">{selectedReport.data.gscData.ctr.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average Position:</span>
                        <span className="font-medium">{selectedReport.data.gscData.position.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  {/* GA4 Data */}
                  <div>
                    <Typography className="font-semibold text-gray-900 mb-2">Google Analytics 4 Data</Typography>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Users:</span>
                        <span className="font-medium">{selectedReport.data.ga4Data.users.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sessions:</span>
                        <span className="font-medium">{selectedReport.data.ga4Data.sessions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bounce Rate:</span>
                        <span className="font-medium">{selectedReport.data.ga4Data.bounceRate.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Conversions:</span>
                        <span className="font-medium">{selectedReport.data.ga4Data.conversions.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    {selectedReport.status === 'COMPLETED' && selectedReport.pdfUrl && (
                      <Button 
                        className="btn-primary-themed"
                        onClick={() => handleDownloadPDF(selectedReport)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { Card, Typography, Button, Input } from '@/components/atoms'
import { Search, FileText, Eye, Calendar } from 'lucide-react'

interface Report {
  id: string
  client: string
  dateRange: string
  status: 'generated'
  gscClicks: string
  ga4Users: string
  createdAt: string
}

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const reports: Report[] = [
    {
      id: '1',
      client: 'TechStart Solutions',
      dateRange: 'Oct 1-31, 2024',
      status: 'generated',
      gscClicks: '1,234',
      ga4Users: '856',
      createdAt: '2024-11-01'
    },
    {
      id: '2',
      client: 'TechStart Solutions',
      dateRange: 'Sep 1-30, 2024',
      status: 'generated',
      gscClicks: '1,156',
      ga4Users: '782',
      createdAt: '2024-10-01'
    },
    {
      id: '3',
      client: 'TechStart Solutions',
      dateRange: 'Aug 1-31, 2024',
      status: 'generated',
      gscClicks: '1,089',
      ga4Users: '734',
      createdAt: '2024-09-01'
    },
    {
      id: '4',
      client: 'TechStart Solutions',
      dateRange: 'Jul 1-31, 2024',
      status: 'generated',
      gscClicks: '998',
      ga4Users: '672',
      createdAt: '2024-08-01'
    },
    {
      id: '5',
      client: 'TechStart Solutions',
      dateRange: 'Jun 1-30, 2024',
      status: 'generated',
      gscClicks: '945',
      ga4Users: '625',
      createdAt: '2024-07-01'
    },
    {
      id: '6',
      client: 'TechStart Solutions',
      dateRange: 'May 1-31, 2024',
      status: 'generated',
      gscClicks: '876',
      ga4Users: '598',
      createdAt: '2024-06-01'
    }
  ]

  const filteredReports = reports.filter(report =>
    report.client.toLowerCase().includes(searchQuery.toLowerCase())
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

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <Card key={report.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                    <FileText className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {report.status}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => alert(`Viewing report ${report.id}`)}>
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              <div className="mb-4">
                <Typography className="font-semibold text-gray-900 mb-1">
                  {report.client}
                </Typography>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Calendar className="h-3 w-3 mr-1" />
                  {report.dateRange}
                </div>
                <Typography className="text-xs text-gray-500">
                  Generated on {new Date(report.createdAt).toLocaleDateString()}
                </Typography>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GSC Clicks:</span>
                  <span className="font-medium text-gray-900">{report.gscClicks}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GA4 Users:</span>
                  <span className="font-medium text-gray-900">{report.ga4Users}</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => alert(`Downloading report ${report.id}`)}
              >
                View Report
              </Button>
            </Card>
          ))}
        </div>

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
        {filteredReports.length === 0 && !searchQuery && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <Typography variant="h3" className="text-lg font-medium text-gray-900 mb-2">
              No reports yet
            </Typography>
            <Typography className="text-gray-600 mb-4">
              Start by generating your first SEO report.
            </Typography>
            <Link href="/generate-report">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Generate Report
              </Button>
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
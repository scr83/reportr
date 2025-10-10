'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { Card, Typography, Button } from '@/components/atoms'
import { Users, FileText, TrendingUp, Plus, ExternalLink } from 'lucide-react'

interface Client {
  id: string
  name: string
  domain: string
  reports: Report[]
}

interface Report {
  id: string
  title: string
  status: string
  createdAt: string
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
  client: {
    id: string
    name: string
    domain: string
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Calculate stats from real data
  const stats = [
    {
      title: 'Total Clients',
      value: `${clients.length} active`,
      icon: Users,
      color: 'bg-blue-500',
      iconColor: 'text-white'
    },
    {
      title: 'Total Reports',
      value: `${reports.length} generated`,
      icon: FileText,
      color: 'bg-pink-500',
      iconColor: 'text-white'
    },
    {
      title: 'Success Rate',
      value: reports.length > 0 ? `${Math.round((reports.filter(r => r.status === 'COMPLETED').length / reports.length) * 100)}%` : '0%',
      icon: TrendingUp,
      color: 'bg-green-500',
      iconColor: 'text-white'
    }
  ]

  // Get recent reports from real data
  const recentReports = reports
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
    .map(report => ({
      id: report.id,
      client: report.client.name,
      dateRange: `${new Date(report.data.startDate).toLocaleDateString()} - ${new Date(report.data.endDate).toLocaleDateString()}`,
      status: report.status.toLowerCase(),
      gscClicks: report.data.gscData?.clicks?.toLocaleString() || 'N/A',
      ga4Users: report.data.ga4Data?.users?.toLocaleString() || 'N/A'
    }))

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true)
        setError(null)

        // Fetch clients and reports in parallel
        const [clientsResponse, reportsResponse] = await Promise.all([
          fetch('/api/clients'),
          fetch('/api/reports')
        ])

        if (!clientsResponse.ok) {
          throw new Error(`Failed to fetch clients: ${clientsResponse.statusText}`)
        }
        if (!reportsResponse.ok) {
          throw new Error(`Failed to fetch reports: ${reportsResponse.statusText}`)
        }

        const clientsData = await clientsResponse.json()
        const reportsData = await reportsResponse.json()

        setClients(clientsData)
        setReports(reportsData)
      } catch (err) {
        console.error('Dashboard data fetch error:', err)
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const quickActions = [
    {
      title: 'Manage Clients',
      description: 'Add, edit, or remove clients',
      href: '/dashboard/clients',
      icon: Users
    },
    {
      title: 'Generate New Report',
      description: 'Create a fresh SEO report',
      href: '/generate-report',
      icon: Plus
    },
    {
      title: 'View All Reports',
      description: 'Browse your reports library',
      href: '/reports',
      icon: FileText
    }
  ]

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <Typography variant="h1" className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </Typography>
          <Typography className="text-gray-600">
            Welcome back! Here&apos;s what&apos;s happening with your SEO reports.
          </Typography>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="p-6 animate-pulse">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
                  <div className="ml-4 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            stats.map((stat, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}>
                    <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                  <div className="ml-4">
                    <Typography className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </Typography>
                    <Typography className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </Typography>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Reports Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <Typography variant="h2" className="text-xl font-semibold text-gray-900">
                Recent Reports
              </Typography>
              <Link href="/reports">
                <Button variant="ghost" size="sm">
                  View all
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {error ? (
                <Card className="p-6">
                  <Typography className="text-red-600 text-center">
                    {error}
                  </Typography>
                </Card>
              ) : loading ? (
                // Loading skeleton for reports
                Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="p-6 animate-pulse">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="h-5 bg-gray-200 rounded w-32"></div>
                          <div className="h-5 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                        <div className="flex items-center space-x-6">
                          <div className="h-4 bg-gray-200 rounded w-20"></div>
                          <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </div>
                      </div>
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                  </Card>
                ))
              ) : recentReports.length === 0 ? (
                <Card className="p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <Typography className="text-gray-600 mb-2">
                    No reports generated yet
                  </Typography>
                  <Typography className="text-sm text-gray-500">
                    Create your first report to see it here
                  </Typography>
                  <Button 
                    className="mt-4"
                    onClick={() => router.push('/generate-report')}
                  >
                    Generate First Report
                  </Button>
                </Card>
              ) : (
                recentReports.map((report, index) => (
                  <Card key={report.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Typography className="font-semibold text-gray-900">
                            {report.client}
                          </Typography>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            report.status === 'completed' ? 'bg-green-100 text-green-800' :
                            report.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                        <Typography className="text-sm text-gray-600 mb-3">
                          {report.dateRange}
                        </Typography>
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center space-x-1">
                            <span className="font-medium text-gray-700">GSC Clicks:</span>
                            <span className="text-gray-600">{report.gscClicks}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="font-medium text-gray-700">GA4 Users:</span>
                            <span className="text-gray-600">{report.ga4Users}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div>
            <Typography variant="h2" className="text-xl font-semibold text-gray-900 mb-6">
              Quick Actions
            </Typography>
            
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <Card key={index} className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <Button 
                    variant="ghost" 
                    className="w-full p-0 h-auto text-left"
                    onClick={() => router.push(action.href as any)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                        <action.icon className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Typography className="font-semibold text-gray-900 mb-1">
                          {action.title}
                        </Typography>
                        <Typography className="text-sm text-gray-600">
                          {action.description}
                        </Typography>
                      </div>
                    </div>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { Card, Typography, Button } from '@/components/atoms'
import { UsageCard } from '@/components/molecules/UsageCard'
import { Users, FileText, TrendingUp, Plus, ExternalLink, UserCheck } from 'lucide-react'

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

interface UsageStats {
  clients: {
    used: number;
    limit: number;
    percentage: number;
    remaining: number;
    isAtLimit: boolean;
    isNearLimit: boolean;
  };
  reports: {
    used: number;
    limit: number;
    percentage: number;
    remaining: number;
    isAtLimit: boolean;
    isNearLimit: boolean;
  };
  plan: string;
  planName: string;
  whiteLabelEnabled: boolean;
}

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [clients, setClients] = useState<Client[]>([])
  const [reports, setReports] = useState<Report[]>([])
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

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
    // Check for verification success
    const verified = searchParams?.get('verified')
    if (verified === 'true') {
      setSuccessMessage('✅ Email verified successfully! Your 14-day trial has started.')
      // Clear the URL param
      const url = new URL(window.location.href)
      url.searchParams.delete('verified')
      window.history.replaceState({}, '', url.toString())
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000)
    }

    async function fetchDashboardData() {
      try {
        setLoading(true)
        setError(null)

        // Fetch clients, reports, and usage stats in parallel
        const [clientsResponse, reportsResponse, usageResponse] = await Promise.all([
          fetch('/api/clients'),
          fetch('/api/reports'),
          fetch('/api/usage')
        ])

        if (!clientsResponse.ok) {
          throw new Error(`Failed to fetch clients: ${clientsResponse.statusText}`)
        }
        if (!reportsResponse.ok) {
          throw new Error(`Failed to fetch reports: ${reportsResponse.statusText}`)
        }
        if (!usageResponse.ok) {
          console.warn('Failed to fetch usage stats, continuing without them')
        }

        const clientsData = await clientsResponse.json()
        const reportsData = await reportsResponse.json()
        
        if (usageResponse.ok) {
          const usageData = await usageResponse.json()
          setUsageStats(usageData)
        }

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
  }, [searchParams])


  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700">
            <div className="flex items-center justify-between">
              <p className="font-medium">{successMessage}</p>
              <button
                onClick={() => setSuccessMessage(null)}
                className="ml-4 text-green-400 hover:text-green-600"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Typography variant="h1" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </Typography>
          <Typography className="text-gray-600">
            Welcome back! Here&apos;s what&apos;s happening with your SEO reports.
          </Typography>
        </div>

        {/* Usage Cards */}
        {usageStats && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h2" className="text-lg font-semibold text-gray-900">
                Plan Usage ({usageStats.planName})
              </Typography>
              <Link
                href="/pricing"
                className="text-primary-themed text-sm font-medium hover:underline"
              >
                Upgrade Plan
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UsageCard
                label="Clients"
                icon={<Users className="w-5 h-5" />}
                used={usageStats.clients.used}
                limit={usageStats.clients.limit}
                percentage={usageStats.clients.percentage}
                isAtLimit={usageStats.clients.isAtLimit}
                isNearLimit={usageStats.clients.isNearLimit}
              />
              <UsageCard
                label="Reports This Cycle"
                icon={<FileText className="w-5 h-5" />}
                used={usageStats.reports.used}
                limit={usageStats.reports.limit}
                percentage={usageStats.reports.percentage}
                isAtLimit={usageStats.reports.isAtLimit}
                isNearLimit={usageStats.reports.isNearLimit}
              />
            </div>
          </div>
        )}

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Column 1: Recent Reports */}
          <div className="lg:col-span-1">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Recent Reports</h2>
              <Link
                href="/reports"
                className="text-primary-themed text-sm font-medium flex items-center gap-1"
              >
                View all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Recent Reports List */}
            <div className="space-y-4">
              {error ? (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <Typography className="text-red-600 text-center">
                    {error}
                  </Typography>
                </div>
              ) : loading ? (
                // Loading skeleton for reports
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
                    <div className="flex items-start justify-between mb-2">
                      <div className="h-5 bg-gray-200 rounded w-32"></div>
                      <div className="h-5 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                    <div className="flex justify-between items-center text-xs">
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                ))
              ) : recentReports.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <p className="text-gray-500 mb-4">No reports generated yet</p>
                  <Link 
                    href="/generate-report"
                    className="inline-block btn-primary-themed text-sm"
                  >
                    Generate First Report
                  </Link>
                </div>
              ) : (
                recentReports.slice(0, 3).map((report) => (
                  <div
                    key={report.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{report.client}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        report.status === 'completed' ? 'bg-green-100 text-green-800' :
                        report.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {report.dateRange}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Clicks: {report.gscClicks}</span>
                      <span>Users: {report.ga4Users}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Column 2: Active Clients */}
          <div className="lg:col-span-1">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Active Clients</h2>
              <Link 
                href="/dashboard/clients"
                className="text-primary-themed text-sm font-medium flex items-center gap-1"
              >
                View all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Active Clients List */}
            <div className="space-y-3">
              {loading ? (
                // Loading skeleton for clients
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                      <div className="h-5 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                ))
              ) : clients.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <p className="text-gray-500 mb-4">No clients yet</p>
                  <Link 
                    href="/dashboard/clients"
                    className="inline-block btn-primary-themed text-sm"
                  >
                    Add First Client
                  </Link>
                </div>
              ) : (
                clients.slice(0, 3).map((client) => (
                  <Link 
                    key={client.id}
                    href={`/dashboard/clients?client=${client.id}`}
                    className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all hover:border-primary-themed"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{client.name}</h3>
                        <p className="text-sm text-gray-500 truncate">{client.domain}</p>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                        Setup
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {client.reports?.length || 0} reports
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Column 3: Quick Actions */}
          <div className="lg:col-span-1">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Quick Actions</h2>
            </div>

            <div className="space-y-3">
              {/* Manage Clients */}
              <Link 
                href="/dashboard/clients"
                className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all hover:border-primary-themed"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-themed-light flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-themed" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Manage Clients</h3>
                    <p className="text-sm text-gray-600">Add, edit, or remove clients</p>
                  </div>
                </div>
              </Link>

              {/* Generate New Report */}
              <Link 
                href="/generate-report"
                className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all hover:border-primary-themed"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-themed-light flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-themed" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Generate New Report</h3>
                    <p className="text-sm text-gray-600">Create a fresh SEO report</p>
                  </div>
                </div>
              </Link>

              {/* View All Reports */}
              <Link 
                href="/reports"
                className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all hover:border-primary-themed"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-themed-light flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-themed" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">View All Reports</h3>
                    <p className="text-sm text-gray-600">Browse your reports library</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
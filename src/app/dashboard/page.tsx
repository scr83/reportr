'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { Card, Typography, Button } from '@/components/atoms'
import { Users, FileText, TrendingUp, Plus, ExternalLink } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const stats = [
    {
      title: 'Total Clients',
      value: '2 active',
      icon: Users,
      color: 'bg-blue-500',
      iconColor: 'text-white'
    },
    {
      title: 'Total Reports',
      value: '2 this month',
      icon: FileText,
      color: 'bg-pink-500',
      iconColor: 'text-white'
    },
    {
      title: 'Report Success',
      value: '98%',
      icon: TrendingUp,
      color: 'bg-green-500',
      iconColor: 'text-white'
    }
  ]

  const recentReports = [
    {
      client: 'TechStart Solutions',
      dateRange: 'Oct 1-31, 2024',
      status: 'generated',
      gscClicks: '1,234',
      ga4Users: '856'
    },
    {
      client: 'TechStart Solutions',
      dateRange: 'Sep 1-30, 2024',
      status: 'generated',
      gscClicks: '1,156',
      ga4Users: '782'
    }
  ]

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
          {stats.map((stat, index) => (
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
          ))}
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
              {recentReports.map((report, index) => (
                <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Typography className="font-semibold text-gray-900">
                          {report.client}
                        </Typography>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
              ))}
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
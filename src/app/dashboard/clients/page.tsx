'use client'

import React from 'react'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { Card, Typography, Button } from '@/components/atoms'
import { Users, Plus, Globe, Calendar } from 'lucide-react'

export default function ClientsPage() {
  const clients = [
    {
      id: '1',
      name: 'TechStart Solutions',
      domain: 'https://techstart.com',
      contactName: 'John Smith',
      contactEmail: 'john@techstart.com',
      reportsCount: 6,
      lastReportDate: '2024-11-01',
      gscConnected: true,
      ga4Connected: true
    },
    {
      id: '2',
      name: 'Digital Marketing Pro',
      domain: 'https://digitalmktpro.com',
      contactName: 'Sarah Johnson',
      contactEmail: 'sarah@digitalmktpro.com',
      reportsCount: 3,
      lastReportDate: '2024-10-15',
      gscConnected: true,
      ga4Connected: false
    }
  ]

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Typography variant="h1" className="text-3xl font-bold text-gray-900 mb-2">
              Clients
            </Typography>
            <Typography className="text-gray-600">
              Manage your client websites and SEO reports.
            </Typography>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => alert('Add client functionality coming soon!')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {clients.map((client) => (
            <Card key={client.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <Typography className="font-semibold text-gray-900">
                      {client.name}
                    </Typography>
                    <div className="flex items-center text-sm text-gray-600">
                      <Globe className="h-3 w-3 mr-1" />
                      {client.domain}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => alert(`Managing ${client.name}`)}>
                  Manage
                </Button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Contact</span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{client.contactName}</div>
                    <div className="text-xs text-gray-600">{client.contactEmail}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Reports Generated</span>
                  <span className="text-sm font-medium text-gray-900">{client.reportsCount}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Report</span>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(client.lastReportDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Connection Status */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Connections</span>
                </div>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${client.gscConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-xs text-gray-600">GSC</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${client.ga4Connected ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-xs text-gray-600">GA4</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => alert(`Generating report for ${client.name}`)}>
                  Generate Report
                </Button>
                <Button variant="ghost" size="sm" onClick={() => alert(`Editing ${client.name}`)}>
                  Edit
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State for when no clients exist */}
        {clients.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <Typography variant="h3" className="text-lg font-medium text-gray-900 mb-2">
              No clients yet
            </Typography>
            <Typography className="text-gray-600 mb-4">
              Start by adding your first client to begin generating SEO reports.
            </Typography>
            <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => alert('Add client functionality coming soon!')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Client
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
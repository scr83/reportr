'use client'

import { useState, useEffect } from 'react'
import { Button, Card, Typography, Badge, Spinner } from '@/components/atoms'
import { DashboardTemplate } from '@/components/templates'

interface User {
  id: string
  name: string
  email: string
  companyName: string
  primaryColor: string
  _count: {
    clients: number
    reports: number
  }
}

interface Client {
  id: string
  name: string
  domain: string
  googleSearchConsoleConnected: boolean
  googleAnalyticsConnected: boolean
  totalReportsGenerated: number
}

export default function DatabaseTestPage() {
  const [users, setUsers] = useState<User[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Test API calls
      const [usersRes, clientsRes] = await Promise.all([
        fetch('/api/test/users'),
        fetch('/api/test/clients')
      ])

      if (!usersRes.ok || !clientsRes.ok) {
        throw new Error('Failed to fetch data')
      }

      const usersData = await usersRes.json()
      const clientsData = await clientsRes.json()

      setUsers(usersData)
      setClients(clientsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <DashboardTemplate title="Database Test">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Spinner size="lg" className="mb-4" />
            <Typography variant="body">Testing database connection...</Typography>
          </div>
        </div>
      </DashboardTemplate>
    )
  }

  if (error) {
    return (
      <DashboardTemplate title="Database Test">
        <Card className="p-6 border-red-200 bg-red-50">
          <Typography variant="h4" className="text-red-700 mb-2">
            Database Connection Error
          </Typography>
          <Typography variant="body" className="text-red-600 mb-4">
            {error}
          </Typography>
          <Button variant="secondary" onClick={fetchData}>
            Retry Connection
          </Button>
        </Card>
      </DashboardTemplate>
    )
  }

  return (
    <DashboardTemplate title="Database Test">
      <div className="space-y-8">
        {/* Connection Status */}
        <Card className="p-6 border-green-200 bg-green-50">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <Typography variant="h4" className="text-green-700">
              Database Connected Successfully!
            </Typography>
          </div>
          <Typography variant="body" className="text-green-600 mt-2">
            PostgreSQL database is running and accessible via Prisma
          </Typography>
        </Card>

        {/* Users Section */}
        <div>
          <Typography variant="h3" className="mb-4">
            Sample Users ({users.length})
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map((user) => (
              <Card key={user.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Typography variant="h5">{user.name}</Typography>
                    <Typography variant="caption" className="text-neutral-600">
                      {user.email}
                    </Typography>
                  </div>
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: user.primaryColor }}
                  />
                </div>
                
                <Typography variant="body" className="font-medium mb-2">
                  {user.companyName}
                </Typography>
                
                <div className="flex space-x-2">
                  <Badge variant="neutral">
                    {user._count.clients} clients
                  </Badge>
                  <Badge variant="brand">
                    {user._count.reports} reports
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Clients Section */}
        <div>
          <Typography variant="h3" className="mb-4">
            Sample Clients ({clients.length})
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client) => (
              <Card key={client.id} className="p-4">
                <Typography variant="h5" className="mb-2">
                  {client.name}
                </Typography>
                <Typography variant="caption" className="text-neutral-600 mb-3">
                  {client.domain}
                </Typography>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Search Console</span>
                    <Badge variant={client.googleSearchConsoleConnected ? "success" : "neutral"}>
                      {client.googleSearchConsoleConnected ? "Connected" : "Not connected"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Analytics</span>
                    <Badge variant={client.googleAnalyticsConnected ? "success" : "neutral"}>
                      {client.googleAnalyticsConnected ? "Connected" : "Not connected"}
                    </Badge>
                  </div>
                </div>
                
                <Typography variant="caption" className="text-neutral-600">
                  {client.totalReportsGenerated} reports generated
                </Typography>
              </Card>
            ))}
          </div>
        </div>

        {/* Test Actions */}
        <Card className="p-6">
          <Typography variant="h4" className="mb-4">
            Database Test Actions
          </Typography>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="primary" 
              onClick={fetchData}
            >
              Refresh Data
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => window.open('http://localhost:5555', '_blank')}
            >
              Open Prisma Studio
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => window.open('/showcase', '_blank')}
            >
              View Component Showcase
            </Button>
          </div>
        </Card>
      </div>
    </DashboardTemplate>
  )
}
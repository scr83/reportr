'use client'

import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { Card, Typography, Button, Input, Alert } from '@/components/atoms'
import { Modal } from '@/components/organisms'
import { Users, Plus, Globe, Calendar, Link, CheckCircle, XCircle } from 'lucide-react'

interface Client {
  id: string
  name: string
  domain: string
  contactName: string | null
  contactEmail: string | null
  reportsCount: number
  lastReportDate: string
  gscConnected: boolean
  ga4Connected: boolean
  googleConnectedAt?: string | null
  googleAccessToken?: string | null
  reports?: any[]
  createdAt?: string
  updatedAt?: string
}

interface ClientFormData {
  name: string
  domain: string
  contactName: string
  contactEmail: string
}

interface FormErrors {
  name?: string
  domain?: string
  contactEmail?: string
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    domain: '',
    contactName: '',
    contactEmail: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})

  // Fetch clients on mount
  useEffect(() => {
    fetchClients()
    
    // Handle OAuth callback results
    const urlParams = new URLSearchParams(window.location.search)
    const connected = urlParams.get('connected')
    const errorParam = urlParams.get('error')
    
    if (connected === 'true') {
      setSuccessMessage('Google account connected successfully! 🎉')
      setShowSuccess(true)
      setError('')
      setTimeout(() => setShowSuccess(false), 5000)
      // Clean up URL
      window.history.replaceState({}, '', '/dashboard/clients')
    } else if (errorParam) {
      let errorMessage = 'Failed to connect Google account'
      if (errorParam === 'oauth_denied') {
        errorMessage = 'Google OAuth was denied. Please try connecting again.'
      } else if (errorParam === 'client_not_found') {
        errorMessage = 'Client not found. Please refresh the page and try again.'
      } else if (errorParam === 'oauth_failed') {
        errorMessage = 'Google OAuth failed. Please try connecting again.'
      }
      setError(errorMessage)
      // Clean up URL
      window.history.replaceState({}, '', '/dashboard/clients')
    }
  }, [])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/clients')
      if (!res.ok) throw new Error('Failed to fetch clients')
      const data = await res.json()
      
      // Transform database data to match Client interface
      const transformedClients = data.map((client: any) => ({
        ...client,
        reportsCount: client.reports?.length || 0,
        lastReportDate: client.reports?.[0]?.createdAt 
          ? new Date(client.reports[0].createdAt).toLocaleDateString()
          : 'Never',
        gscConnected: !!client.googleAccessToken,
        ga4Connected: !!client.googleAccessToken,
        contactName: client.contactName || '',
        contactEmail: client.contactEmail || ''
      }))
      
      setClients(transformedClients)
    } catch (error) {
      console.error('Failed to fetch clients:', error)
      setError('Failed to load clients')
    } finally {
      setLoading(false)
    }
  }

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Client name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Client name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Client name must be at least 2 characters'
    }

    // Domain validation
    if (!formData.domain.trim()) {
      newErrors.domain = 'Website domain is required'
    } else {
      try {
        new URL(formData.domain)
      } catch {
        newErrors.domain = 'Please enter a valid URL (e.g., https://example.com)'
      }
    }

    // Contact email validation (optional but must be valid if provided)
    if (formData.contactEmail.trim() && !isValidEmail(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Handle form submission
  const handleAddClient = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          domain: formData.domain.trim(),
          contactName: formData.contactName.trim() || undefined,
          contactEmail: formData.contactEmail.trim() || undefined
        })
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to create client')
      }

      const newClient = await res.json()
      
      // Transform the new client to match our interface
      const transformedClient = {
        ...newClient,
        reportsCount: 0,
        lastReportDate: 'Never',
        gscConnected: false,
        ga4Connected: false,
        contactName: newClient.contactName || '',
        contactEmail: newClient.contactEmail || ''
      }

      // Add to clients list
      setClients(prev => [transformedClient, ...prev])

      // Reset form and close modal
      setFormData({ name: '', domain: '', contactName: '', contactEmail: '' })
      setErrors({})
      setIsModalOpen(false)
      setSuccessMessage('Client added successfully! 🎉')
      setShowSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000)

    } catch (error: any) {
      console.error('Failed to add client:', error)
      setError(error.message || 'Failed to add client')
    } finally {
      setIsLoading(false)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setFormData({ name: '', domain: '', contactName: '', contactEmail: '' })
    setErrors({})
    setError('')
  }

  // Handle Google OAuth connection
  const handleConnectGoogle = (clientId: string) => {
    const width = 600
    const height = 700
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2
    
    const popup = window.open(
      `/api/auth/google/authorize?clientId=${clientId}`,
      'google-oauth',
      `width=${width},height=${height},left=${left},top=${top}`
    )

    // Listen for popup close to refresh client data
    const checkClosed = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkClosed)
        // Refresh client data
        fetchClients()
      }
    }, 1000)
  }

  // Check if client has Google connection
  const hasGoogleConnection = (client: Client) => {
    return client.gscConnected || client.ga4Connected || client.googleConnectedAt || client.googleAccessToken
  }

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
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6">
            <Alert variant="error">{error}</Alert>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-2 text-gray-600">Loading clients...</span>
          </div>
        ) : (
          <>
            {/* Clients Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {clients.map((client) => (
                <Card key={client.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                        <Users className="h-5 w-5 text-purple-600" />
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
                        <div className="text-sm font-medium text-gray-900">{client.contactName || 'Not provided'}</div>
                        <div className="text-xs text-gray-600">{client.contactEmail || 'Not provided'}</div>
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
                        {client.lastReportDate === 'Never' ? 'Never' : client.lastReportDate}
                      </div>
                    </div>
                  </div>

                  {/* Connection Status */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">Google Integration</span>
                      {hasGoogleConnection(client) ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Connected
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <XCircle className="h-3 w-3 mr-1" />
                          Not Connected
                        </span>
                      )}
                    </div>
                    
                    {hasGoogleConnection(client) ? (
                      <div className="flex space-x-4 mb-3">
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${client.gscConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className="text-xs text-gray-600">Search Console</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${client.ga4Connected ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className="text-xs text-gray-600">Analytics</span>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleConnectGoogle(client.id)}
                        >
                          <Link className="h-4 w-4 mr-2" />
                          Connect Google Accounts
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1" 
                      onClick={() => alert(`Generating report for ${client.name}`)}
                      disabled={!hasGoogleConnection(client)}
                    >
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
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setIsModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Client
                </Button>
              </div>
            )}
          </>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50">
            <Alert variant="success" className="shadow-lg">
              {successMessage}
            </Alert>
          </div>
        )}

        {/* Add Client Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title="Add New Client"
          description="Add a new client to start generating SEO reports"
          size="md"
        >
          <div className="space-y-6">
            <div>
              <Input
                label="Client Name"
                placeholder="Acme Corporation"
                value={formData.name}
                onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                error={errors.name}
                required
              />
            </div>

            <div>
              <Input
                label="Website Domain"
                placeholder="https://example.com"
                value={formData.domain}
                onChange={(value) => setFormData(prev => ({ ...prev, domain: value }))}
                error={errors.domain}
                required
              />
            </div>

            <div>
              <Input
                label="Contact Name"
                placeholder="John Smith"
                value={formData.contactName}
                onChange={(value) => setFormData(prev => ({ ...prev, contactName: value }))}
              />
              <p className="text-sm text-gray-500 mt-1">Optional</p>
            </div>

            <div>
              <Input
                label="Contact Email"
                type="email"
                placeholder="john@example.com"
                value={formData.contactEmail}
                onChange={(value) => setFormData(prev => ({ ...prev, contactEmail: value }))}
                error={errors.contactEmail}
              />
              <p className="text-sm text-gray-500 mt-1">Optional</p>
            </div>

            {/* Error in modal */}
            {error && (
              <Alert variant="error">{error}</Alert>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handleModalClose}
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddClient}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                disabled={isLoading}
              >
                {isLoading ? 'Adding...' : 'Add Client'}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
'use client'

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { Card, Typography, Button, Input, Alert } from '@/components/atoms'
import { Modal } from '@/components/organisms'
import { Users, Plus, Globe, Calendar, Link, CheckCircle, XCircle } from 'lucide-react'

interface Client {
  id: string
  name: string
  domain: string
  contactName: string
  contactEmail: string
  reportsCount: number
  lastReportDate: string
  gscConnected: boolean
  ga4Connected: boolean
  googleConnectedAt?: string
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
  const [clients, setClients] = useState<Client[]>([
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
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    domain: '',
    contactName: '',
    contactEmail: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})

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

    try {
      // For now, simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Create new client with generated ID
      const newClient: Client = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        domain: formData.domain.trim(),
        contactName: formData.contactName.trim(),
        contactEmail: formData.contactEmail.trim(),
        reportsCount: 0,
        lastReportDate: 'Never',
        gscConnected: false,
        ga4Connected: false
      }

      // Add to clients list
      setClients(prev => [...prev, newClient])

      // Reset form and close modal
      setFormData({ name: '', domain: '', contactName: '', contactEmail: '' })
      setErrors({})
      setIsModalOpen(false)
      setShowSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000)

    } catch (error) {
      console.error('Failed to add client:', error)
      // In a real app, show error message to user
    } finally {
      setIsLoading(false)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setFormData({ name: '', domain: '', contactName: '', contactEmail: '' })
    setErrors({})
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
        // Refresh page or update client data
        window.location.reload()
      }
    }, 1000)
  }

  // Check if client has Google connection
  const hasGoogleConnection = (client: Client) => {
    return client.gscConnected || client.ga4Connected || client.googleConnectedAt
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
                      Connect Google APIs
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

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50">
            <Alert variant="success" className="shadow-lg">
              Client added successfully! 🎉
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
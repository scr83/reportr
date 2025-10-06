'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, MoreHorizontal, ExternalLink, Settings, Trash2, Edit, Link as LinkIcon, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import {
  Typography,
  Button,
  Card,
  Icon,
  Input
} from '@/components/atoms'
import { EmptyState, StatusBadge } from '@/components/molecules'
import { Modal } from '@/components/organisms'
import { FormField } from '@/components/molecules'

interface Client {
  id: string
  name: string
  domain: string
  contactEmail?: string
  contactName?: string
  googleSearchConsoleConnected: boolean
  googleAnalyticsConnected: boolean
  searchConsolePropertyUrl?: string
  googleAnalyticsPropertyId?: string
  createdAt: string
  updatedAt: string
  _count: {
    reports: number
  }
}

interface ClientFormData {
  name: string
  domain: string
  contactEmail: string
  contactName: string
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    domain: '',
    contactEmail: '',
    contactName: ''
  })
  const [submitting, setSubmitting] = useState(false)


  // Fetch clients
  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/clients')
      
      if (!response.ok) {
        throw new Error('Failed to fetch clients')
      }
      
      const result = await response.json()
      setClients(result.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch clients')
    } finally {
      setLoading(false)
    }
  }

  // Filter clients based on search query
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.contactEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.contactName?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create client')
      }

      await fetchClients()
      setIsAddModalOpen(false)
      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create client')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditClient = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedClient) return

    setSubmitting(true)

    try {
      const response = await fetch(`/api/clients/${selectedClient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update client')
      }

      await fetchClients()
      setIsEditModalOpen(false)
      resetForm()
      setSelectedClient(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update client')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteClient = async () => {
    if (!selectedClient) return

    setSubmitting(true)

    try {
      const response = await fetch(`/api/clients/${selectedClient.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 409) {
          // Client has reports, show force delete option
          const forceDelete = confirm(`This client has ${errorData.reportCount} reports. Are you sure you want to delete everything?`)
          if (forceDelete) {
            const forceResponse = await fetch(`/api/clients/${selectedClient.id}?force=true`, {
              method: 'DELETE',
            })
            if (!forceResponse.ok) {
              throw new Error('Failed to delete client')
            }
          } else {
            return
          }
        } else {
          throw new Error(errorData.error || 'Failed to delete client')
        }
      }

      await fetchClients()
      setIsDeleteModalOpen(false)
      setSelectedClient(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete client')
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      domain: '',
      contactEmail: '',
      contactName: ''
    })
  }

  const openEditModal = (client: Client) => {
    setSelectedClient(client)
    setFormData({
      name: client.name,
      domain: client.domain,
      contactEmail: client.contactEmail || '',
      contactName: client.contactName || ''
    })
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (client: Client) => {
    setSelectedClient(client)
    setIsDeleteModalOpen(true)
  }

  const getConnectionStatus = (client: Client) => {
    if (client.googleSearchConsoleConnected && client.googleAnalyticsConnected) {
      return { status: 'success' as const, label: 'Fully Connected' }
    } else if (client.googleSearchConsoleConnected || client.googleAnalyticsConnected) {
      return { status: 'warning' as const, label: 'Partially Connected' }
    } else {
      return { status: 'error' as const, label: 'Not Connected' }
    }
  }

  const actions = (
    <Button 
      variant="primary" 
      onClick={() => setIsAddModalOpen(true)}
    >
      <Icon icon={Plus} size="sm" className="mr-2" />
      Add Client
    </Button>
  )

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Typography variant="h1" className="text-3xl font-bold text-neutral-900 mb-2">
              Clients
            </Typography>
            <Typography variant="body" className="text-neutral-600">
              Manage your client accounts and integrations
            </Typography>
          </div>
        </div>
        <Card className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
            <Typography variant="body" className="ml-3">Loading clients...</Typography>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Typography variant="h1" className="text-3xl font-bold text-neutral-900 mb-2">
            Clients
          </Typography>
          <Typography variant="body" className="text-neutral-600">
            Manage your client accounts and integrations
          </Typography>
        </div>
        <Button 
          variant="primary" 
          onClick={() => setIsAddModalOpen(true)}
        >
          <Icon icon={Plus} size="sm" className="mr-2" />
          Add Client
        </Button>
      </div>

      {error && (
        <Card className="p-4 mb-6 bg-error-50 border-error-200">
          <div className="flex items-center">
            <Icon icon={AlertCircle} size="sm" className="text-error-600 mr-2" />
            <Typography variant="body" className="text-error-800">{error}</Typography>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setError(null)}
              className="ml-auto"
            >
              Dismiss
            </Button>
          </div>
        </Card>
      )}

      {clients.length > 0 && (
        <Card className="p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Icon icon={Search} size="sm" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(value) => setSearchQuery(value)}
                className="pl-10"
              />
            </div>
            <Typography variant="caption" className="text-neutral-500">
              {filteredClients.length} of {clients.length} clients
            </Typography>
          </div>
        </Card>
      )}

      {filteredClients.length === 0 && !loading ? (
        <Card className="p-12">
          <EmptyState
            title={searchQuery ? "No clients found" : "No clients yet"}
            description={searchQuery ? "Try adjusting your search terms." : "Add your first client to start generating SEO reports."}
            icon={<Icon icon={Users} size="lg" />}
            action={!searchQuery ? {
              label: "Add Your First Client",
              onClick: () => setIsAddModalOpen(true),
              variant: "primary" as const
            } : undefined}
          />
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map((client) => {
            const connectionStatus = getConnectionStatus(client)
            
            return (
              <Card key={client.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <Typography variant="h4" className="font-semibold text-neutral-900 truncate">
                      {client.name}
                    </Typography>
                    <div className="flex items-center mt-1">
                      <Icon icon={ExternalLink} size="xs" className="text-neutral-400 mr-1" />
                      <Typography variant="caption" className="text-neutral-600 truncate">
                        {client.domain.replace(/^https?:\/\//, '')}
                      </Typography>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <StatusBadge 
                      status={connectionStatus.status}
                      label={connectionStatus.label}
                      size="sm"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <Icon icon={MoreHorizontal} size="sm" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {client.contactName && (
                    <Typography variant="caption" className="text-neutral-600">
                      Contact: {client.contactName}
                    </Typography>
                  )}
                  {client.contactEmail && (
                    <Typography variant="caption" className="text-neutral-600">
                      Email: {client.contactEmail}
                    </Typography>
                  )}
                  <Typography variant="caption" className="text-neutral-600">
                    Reports: {client._count.reports}
                  </Typography>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(client)}
                    className="flex-1"
                  >
                    <Icon icon={Edit} size="xs" className="mr-1" />
                    Edit
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Icon icon={LinkIcon} size="xs" className="mr-1" />
                    Connect
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openDeleteModal(client)}
                    className="text-error-600 hover:text-error-700 hover:bg-error-50"
                  >
                    <Icon icon={Trash2} size="xs" />
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Add Client Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          resetForm()
        }}
        title="Add New Client"
        description="Add a new client to start generating SEO reports."
        size="md"
      >
        <form onSubmit={handleAddClient} className="space-y-4">
          <FormField
            label="Client Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(value) => setFormData(prev => ({ ...prev, name: value as string }))}
            placeholder="Acme Corporation"
            required
          />
          
          <FormField
            label="Website Domain"
            name="domain"
            type="url"
            value={formData.domain}
            onChange={(value) => setFormData(prev => ({ ...prev, domain: value as string }))}
            placeholder="https://example.com"
            required
          />
          
          <FormField
            label="Contact Name"
            name="contactName"
            type="text"
            value={formData.contactName}
            onChange={(value) => setFormData(prev => ({ ...prev, contactName: value as string }))}
            placeholder="John Smith"
          />
          
          <FormField
            label="Contact Email"
            name="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={(value) => setFormData(prev => ({ ...prev, contactEmail: value as string }))}
            placeholder="john@example.com"
          />
          
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false)
                resetForm()
              }}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={submitting}
            >
              Add Client
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Client Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          resetForm()
          setSelectedClient(null)
        }}
        title="Edit Client"
        description="Update client information."
        size="md"
      >
        <form onSubmit={handleEditClient} className="space-y-4">
          <FormField
            label="Client Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(value) => setFormData(prev => ({ ...prev, name: value as string }))}
            placeholder="Acme Corporation"
            required
          />
          
          <FormField
            label="Website Domain"
            name="domain"
            type="url"
            value={formData.domain}
            onChange={(value) => setFormData(prev => ({ ...prev, domain: value as string }))}
            placeholder="https://example.com"
            required
          />
          
          <FormField
            label="Contact Name"
            name="contactName"
            type="text"
            value={formData.contactName}
            onChange={(value) => setFormData(prev => ({ ...prev, contactName: value as string }))}
            placeholder="John Smith"
          />
          
          <FormField
            label="Contact Email"
            name="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={(value) => setFormData(prev => ({ ...prev, contactEmail: value as string }))}
            placeholder="john@example.com"
          />
          
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsEditModalOpen(false)
                resetForm()
                setSelectedClient(null)
              }}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={submitting}
            >
              Update Client
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedClient(null)
        }}
        title="Delete Client"
        description="This action cannot be undone."
        size="sm"
      >
        <div className="space-y-4">
          <Typography variant="body" className="text-neutral-700">
            Are you sure you want to delete <strong>{selectedClient?.name}</strong>?
            {selectedClient && selectedClient._count.reports > 0 && (
              <span className="block mt-2 text-warning-600">
                This client has {selectedClient._count.reports} reports that will also be deleted.
              </span>
            )}
          </Typography>
          
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteModalOpen(false)
                setSelectedClient(null)
              }}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              variant="error"
              onClick={handleDeleteClient}
              loading={submitting}
            >
              Delete Client
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
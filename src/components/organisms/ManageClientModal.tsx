'use client'

import React, { useState, useEffect } from 'react'
import { Modal } from '@/components/organisms'
import { Button, Input, Alert } from '@/components/atoms'
import { AlertTriangle, Trash2 } from 'lucide-react'

interface Client {
  id: string
  name: string
  domain: string
  contactName: string | null
  contactEmail: string | null
}

interface ManageClientModalProps {
  isOpen: boolean
  onClose: () => void
  client: Client | null
  onSuccess: () => void
}

interface FormData {
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

export const ManageClientModal: React.FC<ManageClientModalProps> = ({
  isOpen,
  onClose,
  client,
  onSuccess
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    domain: '',
    contactName: '',
    contactEmail: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [error, setError] = useState('')

  // Populate form when client changes
  useEffect(() => {
    if (client && isOpen) {
      setFormData({
        name: client.name,
        domain: client.domain,
        contactName: client.contactName || '',
        contactEmail: client.contactEmail || ''
      })
      setErrors({})
      setError('')
      setShowDeleteConfirm(false)
    }
  }, [client, isOpen])

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

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

  const handleSave = async () => {
    if (!client || !validateForm()) {
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const res = await fetch(`/api/clients/${client.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          domain: formData.domain.trim(),
          contactName: formData.contactName.trim() || null,
          contactEmail: formData.contactEmail.trim() || null
        })
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to update client')
      }

      onSuccess()
      onClose()
    } catch (error: any) {
      console.error('Failed to update client:', error)
      setError(error.message || 'Failed to update client')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!client) return

    setIsDeleting(true)
    setError('')

    try {
      const res = await fetch(`/api/clients/${client.id}`, {
        method: 'DELETE'
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to delete client')
      }

      onSuccess()
      onClose()
    } catch (error: any) {
      console.error('Failed to delete client:', error)
      setError(error.message || 'Failed to delete client')
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  const handleModalClose = () => {
    if (isLoading || isDeleting) return
    setShowDeleteConfirm(false)
    setError('')
    onClose()
  }

  if (!client) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      title="Manage Client"
      size="md"
      closeOnOverlayClick={!isLoading && !isDeleting}
      closeOnEscape={!isLoading && !isDeleting}
    >
      <div className="space-y-6">
        {/* Form Fields */}
        <div>
          <Input
            label="Client Name"
            placeholder="Acme Corporation"
            value={formData.name}
            onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
            error={errors.name}
            disabled={isLoading || isDeleting}
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
            disabled={isLoading || isDeleting}
            required
          />
        </div>

        <div>
          <Input
            label="Contact Name"
            placeholder="John Smith"
            value={formData.contactName}
            onChange={(value) => setFormData(prev => ({ ...prev, contactName: value }))}
            disabled={isLoading || isDeleting}
          />
        </div>

        <div>
          <Input
            label="Contact Email"
            type="email"
            placeholder="john@example.com"
            value={formData.contactEmail}
            onChange={(value) => setFormData(prev => ({ ...prev, contactEmail: value }))}
            error={errors.contactEmail}
            disabled={isLoading || isDeleting}
          />
        </div>

        {/* Danger Zone */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium text-red-600">Danger Zone</span>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700 mb-3">
              Delete this client permanently. This action cannot be undone and will also delete all associated reports.
            </p>
            
            {!showDeleteConfirm ? (
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isLoading || isDeleting}
                className="border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Client
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm font-medium text-red-800">
                  Are you sure you want to delete this client?
                </p>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                    className="border-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="error">{error}</Alert>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleModalClose}
            className="flex-1"
            disabled={isLoading || isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 btn-primary-themed"
            disabled={isLoading || isDeleting || showDeleteConfirm}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

ManageClientModal.displayName = 'ManageClientModal'
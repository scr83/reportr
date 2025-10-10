'use client'

import React, { useState, useEffect } from 'react'
import { Modal } from '@/components/organisms'
import { Button, Alert, Spinner } from '@/components/atoms'
import { Select } from '@/components/atoms'
import { User, Globe, BarChart, AlertCircle, CheckCircle, Unlink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PropertyManagementModalProps {
  isOpen: boolean
  onClose: () => void
  clientId: string
  clientName: string
  onSuccess?: () => void
}

interface GSCSite {
  siteUrl: string
  permissionLevel: string
}

interface GA4Property {
  name: string
  propertyId: string
  displayName: string
}

interface Client {
  id: string
  name: string
  googleConnectedAt?: string | null
  googleAccessToken?: string | null
  gscSiteUrl?: string | null
  gscSiteName?: string | null
  ga4PropertyId?: string | null
  ga4PropertyName?: string | null
}

export const PropertyManagementModal: React.FC<PropertyManagementModalProps> = ({
  isOpen,
  onClose,
  clientId,
  clientName,
  onSuccess
}) => {
  const [client, setClient] = useState<Client | null>(null)
  const [gscSites, setGscSites] = useState<GSCSite[]>([])
  const [ga4Properties, setGA4Properties] = useState<GA4Property[]>([])
  const [selectedGscSite, setSelectedGscSite] = useState('')
  const [selectedGA4Property, setSelectedGA4Property] = useState('')
  const [manualGA4PropertyId, setManualGA4PropertyId] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingProperties, setLoadingProperties] = useState(false)
  const [saving, setSaving] = useState(false)
  const [disconnecting, setDisconnecting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showManualGA4, setShowManualGA4] = useState(false)

  // Fetch client data and properties when modal opens
  useEffect(() => {
    if (isOpen && clientId) {
      fetchClientData()
      fetchProperties()
    }
  }, [isOpen, clientId]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchClientData = async () => {
    try {
      const response = await fetch(`/api/clients/${clientId}`)
      if (!response.ok) throw new Error('Failed to fetch client data')
      
      const clientData = await response.json()
      setClient(clientData)
      
      // Pre-select current properties
      if (clientData.gscSiteUrl) {
        setSelectedGscSite(clientData.gscSiteUrl)
      }
      if (clientData.ga4PropertyId) {
        setSelectedGA4Property(clientData.ga4PropertyId)
      }
    } catch (error: any) {
      console.error('Failed to fetch client data:', error)
      setError('Failed to load client information')
    }
  }

  const fetchProperties = async () => {
    setLoadingProperties(true)
    setError('')
    
    try {
      // Fetch GSC sites
      const gscResponse = await fetch(`/api/google/search-console/sites?clientId=${clientId}`)
      if (gscResponse.ok) {
        const gscData = await gscResponse.json()
        setGscSites(gscData.sites || [])
      } else {
        console.warn('Failed to fetch GSC sites')
        setGscSites([])
      }

      // Fetch GA4 properties
      const ga4Response = await fetch(`/api/google/analytics/properties?clientId=${clientId}`)
      if (ga4Response.ok) {
        const ga4Data = await ga4Response.json()
        setGA4Properties(ga4Data.properties || [])
        // If no properties found (403 permissions), show manual entry
        if (!ga4Data.properties || ga4Data.properties.length === 0) {
          setShowManualGA4(true)
        }
      } else {
        console.warn('Failed to fetch GA4 properties')
        setGA4Properties([])
        setShowManualGA4(true)
      }
    } catch (error: any) {
      console.error('Failed to fetch properties:', error)
      setError('Failed to load Google properties. You may need to reconnect your Google account.')
    } finally {
      setLoadingProperties(false)
    }
  }

  const handleSaveProperties = async () => {
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      // Determine GA4 property values
      let ga4PropertyId = selectedGA4Property
      let ga4PropertyName = ''

      if (showManualGA4 && manualGA4PropertyId.trim()) {
        ga4PropertyId = manualGA4PropertyId.trim()
        ga4PropertyName = `Manual Entry (${ga4PropertyId})`
      } else if (selectedGA4Property) {
        const selectedProperty = ga4Properties.find(p => p.propertyId === selectedGA4Property)
        ga4PropertyName = selectedProperty?.displayName || selectedGA4Property
      }

      // Determine GSC site values
      let gscSiteName = ''
      if (selectedGscSite) {
        gscSiteName = selectedGscSite
          .replace('https://', '')
          .replace('http://', '')
          .replace('sc-domain:', '')
      }

      const response = await fetch(`/api/clients/${clientId}/properties`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gscSiteUrl: selectedGscSite || null,
          gscSiteName: gscSiteName || null,
          ga4PropertyId: ga4PropertyId || null,
          ga4PropertyName: ga4PropertyName || null
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save properties')
      }

      setSuccess('Properties saved successfully!')
      setTimeout(() => {
        onSuccess?.()
        onClose()
      }, 1500)

    } catch (error: any) {
      console.error('Failed to save properties:', error)
      setError(error.message || 'Failed to save properties')
    } finally {
      setSaving(false)
    }
  }

  const handleDisconnectGoogle = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to disconnect this Google account? You will need to reconnect to generate reports.'
    )
    
    if (!confirmed) return

    setDisconnecting(true)
    setError('')

    try {
      const response = await fetch(`/api/clients/${clientId}/disconnect`, {
        method: 'POST'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to disconnect account')
      }

      setSuccess('Google account disconnected successfully!')
      setTimeout(() => {
        onSuccess?.()
        onClose()
      }, 1500)

    } catch (error: any) {
      console.error('Failed to disconnect Google account:', error)
      setError(error.message || 'Failed to disconnect Google account')
    } finally {
      setDisconnecting(false)
    }
  }

  const handleModalClose = () => {
    setError('')
    setSuccess('')
    onClose()
  }

  const isGoogleConnected = client?.googleConnectedAt && client?.googleAccessToken
  const hasCurrentSelections = client?.gscSiteUrl || client?.ga4PropertyId

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      title="Manage Google Properties"
      description={`Configure Google Search Console and Analytics properties for ${clientName}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Google Connection Status */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Google Account</h3>
                <p className="text-xs text-gray-600">
                  {isGoogleConnected ? 'Connected ✓' : 'Not Connected'}
                </p>
              </div>
            </div>
            
            {isGoogleConnected && (
              <Button
                variant="error"
                size="sm"
                onClick={handleDisconnectGoogle}
                disabled={disconnecting}
                loading={disconnecting}
              >
                <Unlink className="h-4 w-4 mr-1" />
                Disconnect
              </Button>
            )}
          </div>
        </div>

        {/* Property Selections */}
        {isGoogleConnected ? (
          <>
            {/* Search Console Section */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <Globe className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Search Console Site</h3>
                  {client?.gscSiteUrl && (
                    <p className="text-xs text-[#9810f9] font-medium">
                      Currently: {client.gscSiteName}
                    </p>
                  )}
                </div>
              </div>

              {loadingProperties ? (
                <div className="flex items-center space-x-2 py-3">
                  <Spinner size="sm" />
                  <span className="text-sm text-gray-600">Loading sites...</span>
                </div>
              ) : gscSites.length > 0 ? (
                <Select
                  placeholder="Select a Search Console site"
                  value={selectedGscSite}
                  onChange={(e) => setSelectedGscSite(e.target.value)}
                  className="border-2 border-[#9810f9] focus:border-[#9810f9] focus:ring-[#9810f9]"
                >
                  <option value="">-- Select Site --</option>
                  {gscSites.map((site) => (
                    <option key={site.siteUrl} value={site.siteUrl}>
                      {site.siteUrl}
                    </option>
                  ))}
                </Select>
              ) : (
                <div className="text-center py-4 text-gray-500 border border-gray-200 rounded">
                  <AlertCircle className="h-5 w-5 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">No Search Console sites found.</p>
                  <p className="text-xs">Make sure you have verified sites in Google Search Console.</p>
                </div>
              )}
            </div>

            {/* Analytics Section */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <BarChart className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Google Analytics Property</h3>
                  {client?.ga4PropertyId && (
                    <p className="text-xs text-[#9810f9] font-medium">
                      Currently: {client.ga4PropertyName}
                    </p>
                  )}
                </div>
              </div>

              {loadingProperties ? (
                <div className="flex items-center space-x-2 py-3">
                  <Spinner size="sm" />
                  <span className="text-sm text-gray-600">Loading properties... (this may take 20 seconds)</span>
                </div>
              ) : ga4Properties.length > 0 ? (
                <div className="space-y-3">
                  <Select
                    placeholder="Select a Google Analytics property"
                    value={selectedGA4Property}
                    onChange={(e) => setSelectedGA4Property(e.target.value)}
                    className="border-2 border-[#9810f9] focus:border-[#9810f9] focus:ring-[#9810f9]"
                  >
                    <option value="">-- Select Property --</option>
                    {ga4Properties.map((property) => (
                      <option key={property.propertyId} value={property.propertyId}>
                        {property.displayName} ({property.propertyId})
                      </option>
                    ))}
                  </Select>
                  
                  <button
                    type="button"
                    onClick={() => setShowManualGA4(!showManualGA4)}
                    className="text-xs text-[#9810f9] hover:underline"
                  >
                    {showManualGA4 ? 'Hide manual entry' : 'Enter property ID manually'}
                  </button>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-yellow-800 font-medium">
                        No Analytics properties found
                      </p>
                      <p className="text-xs text-yellow-700 mt-1">
                        You may not have Admin access to any GA4 properties. You can manually enter a property ID if you know it.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Manual GA4 Property Entry */}
              {showManualGA4 && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                  <label className="block text-xs font-medium text-blue-900 mb-2">
                    Manual Property ID Entry
                  </label>
                  <input
                    type="text"
                    placeholder="Enter GA4 Property ID (e.g., 123456789)"
                    value={manualGA4PropertyId}
                    onChange={(e) => setManualGA4PropertyId(e.target.value)}
                    className="w-full px-3 py-2 border border-blue-300 rounded focus:border-[#9810f9] focus:ring-[#9810f9] text-sm"
                  />
                  <p className="text-xs text-blue-700 mt-1">
                    You can find this in your GA4 property settings under &quot;Property Details&quot;
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-8 border border-gray-200 rounded-lg bg-gray-50">
            <AlertCircle className="h-8 w-8 mx-auto mb-3 text-gray-400" />
            <h3 className="text-sm font-medium text-gray-900 mb-2">Google Account Not Connected</h3>
            <p className="text-sm text-gray-600 mb-4">
              Connect your Google account first to manage Search Console and Analytics properties.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                onClose()
                // Trigger Google OAuth connection
                const width = 600
                const height = 700
                const left = window.screen.width / 2 - width / 2
                const top = window.screen.height / 2 - height / 2
                
                window.open(
                  `/api/auth/google/authorize?clientId=${clientId}`,
                  'google-oauth',
                  `width=${width},height=${height},left=${left},top=${top}`
                )
              }}
            >
              Connect Google Account
            </Button>
          </div>
        )}

        {/* Error/Success Messages */}
        {error && (
          <Alert variant="error">{error}</Alert>
        )}

        {success && (
          <Alert variant="success">{success}</Alert>
        )}

        {/* Action Buttons */}
        {isGoogleConnected && (
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleModalClose}
              className="flex-1"
              disabled={saving || disconnecting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveProperties}
              className="flex-1 bg-[#9810f9] hover:bg-[#7d0dd1] text-white"
              disabled={saving || disconnecting || (!selectedGscSite && !selectedGA4Property && !manualGA4PropertyId.trim())}
              loading={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  )
}

PropertyManagementModal.displayName = 'PropertyManagementModal'
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Typography } from '@/components/atoms/Typography'
import { Card, CardContent } from '@/components/atoms/Card'

interface ClientData {
  name: string
  domain: string
  contactEmail: string
}

export default function EnterpriseBatchClientsPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [clients, setClients] = useState<ClientData[]>(
    Array(8).fill({ name: '', domain: '', contactEmail: '' })
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/onboarding/success')
    return null
  }

  const handleClientChange = (index: number, field: keyof ClientData, value: string) => {
    setClients(prev => prev.map((client, i) => 
      i === index ? { ...client, [field]: value } : client
    ))
    if (error) setError('')
  }

  const addClientRow = () => {
    if (clients.length < 50) {
      setClients(prev => [...prev, { name: '', domain: '', contactEmail: '' }])
    }
  }

  const removeClientRow = (index: number) => {
    if (clients.length > 1) {
      setClients(prev => prev.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Filter out empty clients (only name and domain are required)
      const validClients = clients.filter(client => client.name.trim() && client.domain.trim())
      
      // Save clients to localStorage for completion page
      localStorage.setItem('clientsBatch', JSON.stringify(validClients))

      // Continue to completion
      router.push('/onboarding/complete')
    } catch (error) {
      console.error('Error saving client info:', error)
      setError('Failed to save client information. Please try again.')
      setIsSubmitting(false)
    }
  }

  const handleSkip = () => {
    // Clear any saved client data and continue
    localStorage.removeItem('clientsBatch')
    router.push('/onboarding/complete')
  }

  const validClientCount = clients.filter(client => client.name.trim() && client.domain.trim()).length

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-7xl w-full">
        {/* Progress */}
        <div className="text-center mb-8">
          <Typography variant="caption" className="text-slate-600 mb-2 block">
            Step 4 of 4
          </Typography>
          <div className="w-full bg-slate-200 rounded-full h-2 mb-6">
            <div className="bg-[#9233ea] h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Main Card */}
        <Card className="bg-white border border-slate-200 shadow-sm p-8">
          <CardContent>
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">🏢</span>
              </div>
            </div>

            {/* Header */}
            <Typography variant="h1" className="text-slate-900 text-center mb-2">
              Add Your Clients
            </Typography>
            <Typography variant="lead" className="text-slate-600 text-center mb-8">
              ENTERPRISE Plan: Up to 50 clients, 250 reports per month
            </Typography>

            {/* ENTERPRISE Tier Info */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 mb-8">
              <div className="flex items-start space-x-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-[#9233ea] text-white rounded-full text-sm flex-shrink-0">
                  🏢
                </span>
                <div className="flex-1">
                  <Typography variant="body" className="text-slate-700 text-sm">
                    <strong>ENTERPRISE Plan - 14-Day Free Trial:</strong> Perfect for large agencies
                  </Typography>
                  <Typography variant="caption" className="text-slate-600 mt-1 block">
                    • Up to 50 clients • 250 reports per month • $199/month after trial
                  </Typography>
                  <div className="mt-2 inline-flex items-center text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    💡 CSV Import coming soon for bulk client uploads
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-2">
                {clients.map((client, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                    <div className="flex justify-between items-center mb-3">
                      <Typography variant="body" className="text-slate-900 font-medium text-sm">
                        Client {index + 1}
                      </Typography>
                      {clients.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeClientRow(index)}
                          className="text-red-600 border-red-200 hover:bg-red-50 text-xs px-2 py-1"
                        >
                          ✕
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {/* Client Name */}
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Client Name *
                        </label>
                        <Input
                          type="text"
                          placeholder="e.g., Acme Corp"
                          value={client.name}
                          onChange={(value) => handleClientChange(index, 'name', value)}
                          className="w-full bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#9233ea] focus:ring-[#9233ea] text-sm"
                          disabled={isSubmitting}
                        />
                      </div>

                      {/* Website URL */}
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Website URL *
                        </label>
                        <Input
                          type="url"
                          placeholder="https://example.com"
                          value={client.domain}
                          onChange={(value) => handleClientChange(index, 'domain', value)}
                          className="w-full bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#9233ea] focus:ring-[#9233ea] text-sm"
                          disabled={isSubmitting}
                        />
                      </div>

                      {/* Contact Email */}
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Contact Email
                        </label>
                        <Input
                          type="email"
                          placeholder="client@example.com"
                          value={client.contactEmail}
                          onChange={(value) => handleClientChange(index, 'contactEmail', value)}
                          className="w-full bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#9233ea] focus:ring-[#9233ea] text-sm"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add More Button */}
              {clients.length < 50 && (
                <div className="text-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addClientRow}
                    className="border-[#9233ea] text-[#9233ea] hover:bg-purple-50"
                  >
                    + Add Another Client ({clients.length}/50)
                  </Button>
                </div>
              )}

              {/* CSV Import Placeholder */}
              <div className="text-center">
                <Button
                  type="button"
                  variant="outline"
                  disabled
                  className="border-slate-300 text-slate-500 cursor-not-allowed"
                >
                  📄 Import from CSV (Coming Soon)
                </Button>
                <Typography variant="caption" className="text-slate-500 mt-2 block">
                  Bulk import feature will be available soon for Enterprise customers
                </Typography>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleSkip}
                  className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
                  disabled={isSubmitting}
                >
                  Skip for Now
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  className="flex-1 bg-[#9233ea] hover:bg-[#7c2bc7] text-white disabled:opacity-50"
                >
                  {isSubmitting 
                    ? 'Adding Clients...' 
                    : validClientCount > 0 
                      ? `Add ${validClientCount} Client${validClientCount > 1 ? 's' : ''} & Continue →`
                      : 'Continue →'
                  }
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Progress Dots */}
        <div className="flex gap-2 justify-center mt-8">
          <div className="w-2 h-2 rounded-full bg-[#9233ea]" />
          <div className="w-2 h-2 rounded-full bg-[#9233ea]" />
          <div className="w-2 h-2 rounded-full bg-[#9233ea]" />
          <div className="w-2 h-2 rounded-full bg-[#9233ea]" />
        </div>
      </div>
    </div>
  )
}
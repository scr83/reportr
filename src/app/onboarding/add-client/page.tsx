'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Typography } from '@/components/atoms/Typography'
import { Card, CardContent } from '@/components/atoms/Card'

export default function AddFirstClientPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    contactEmail: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/onboarding/success')
    return null
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Save client info to localStorage for completion page
      localStorage.setItem('firstClient', JSON.stringify({
        name: formData.name,
        domain: formData.domain,
        contactEmail: formData.contactEmail || undefined,
      }))

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
    localStorage.removeItem('firstClient')
    router.push('/onboarding/complete')
  }

  const isFormValid = formData.name.trim() && formData.domain.trim()

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
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
                <span className="text-3xl">🎯</span>
              </div>
            </div>

            {/* Header */}
            <Typography variant="h1" className="text-slate-900 text-center mb-2">
              Add Your First Client
            </Typography>
            <Typography variant="lead" className="text-slate-600 text-center mb-8">
              Start generating SEO reports right away
            </Typography>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Client Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Client Name *
                </label>
                <Input
                  type="text"
                  required
                  placeholder="e.g., Acme Corp"
                  value={formData.name}
                  onChange={(value) => handleInputChange('name', value)}
                  className="w-full bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#9233ea] focus:ring-[#9233ea]"
                  disabled={isSubmitting}
                />
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Website URL *
                </label>
                <Input
                  type="url"
                  required
                  placeholder="https://example.com"
                  value={formData.domain}
                  onChange={(value) => handleInputChange('domain', value)}
                  className="w-full bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#9233ea] focus:ring-[#9233ea]"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-slate-500 mt-1">
                  Include https:// or http://
                </p>
              </div>

              {/* Contact Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Contact Email (optional)
                </label>
                <Input
                  type="email"
                  placeholder="client@example.com"
                  value={formData.contactEmail}
                  onChange={(value) => handleInputChange('contactEmail', value)}
                  className="w-full bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#9233ea] focus:ring-[#9233ea]"
                  disabled={isSubmitting}
                />
              </div>

              {/* FREE Tier Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-sm flex-shrink-0">
                    ℹ️
                  </span>
                  <div>
                    <Typography variant="body" className="text-slate-700 text-sm">
                      <strong>FREE Plan:</strong> 1 client, 5 reports included
                    </Typography>
                    <Typography variant="caption" className="text-slate-600 mt-1 block">
                      Perfect for testing! Upgrade anytime for more clients and unlimited reports.
                    </Typography>
                  </div>
                </div>
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
                  disabled={!isFormValid || isSubmitting}
                  loading={isSubmitting}
                  className="flex-1 bg-[#9233ea] hover:bg-[#7c2bc7] text-white disabled:opacity-50"
                >
                  {isSubmitting ? 'Adding Client...' : 'Add Client & Continue →'}
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

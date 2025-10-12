'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Typography } from '@/components/atoms/Typography'
import { Card, CardContent } from '@/components/atoms/Card'

interface AgencySetupData {
  companyName: string
  website: string
  email: string
}

export default function AgencySetupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<AgencySetupData>({
    companyName: '',
    website: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof AgencySetupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleContinue = async () => {
    if (!isFormValid) return
    
    setIsSubmitting(true)
    
    // Save agency setup data to localStorage for now
    localStorage.setItem('agencySetup', JSON.stringify(formData))
    
    // Simulate saving process
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    router.push('/onboarding/success')
  }

  const handleBack = () => {
    router.push('/onboarding/welcome')
  }

  const isFormValid = formData.companyName.trim() && 
                     formData.email.trim()

  const formatWebsiteUrl = (url: string) => {
    if (!url) return ''
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`
    }
    return url
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="text-center mb-6">
            <Typography variant="caption" className="text-slate-600 mb-2 block">
              Step 2 of 3
            </Typography>
            <div className="w-full bg-slate-200 rounded-full h-2 mb-6">
              <div className="bg-[#9233ea] h-2 rounded-full" style={{ width: '66%' }}></div>
            </div>
          </div>
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#9233ea] rounded-full mb-6">
            <span className="text-2xl">🏢</span>
          </div>
          <Typography variant="h1" className="text-slate-900 mb-4">
            Set Up Your Agency
          </Typography>
          <Typography variant="lead" className="text-slate-600">
            Tell us about your business so we can personalize your experience
          </Typography>
        </div>

        <Card className="bg-white border border-slate-200 shadow-sm p-8">
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Agency/Business Name *
                </label>
                <Input
                  placeholder="e.g., Acme Digital Marketing"
                  value={formData.companyName}
                  onChange={(value) => handleInputChange('companyName', value)}
                  required
                  className="bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#9233ea] focus:ring-[#9233ea]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your Website (optional)
                </label>
                <Input
                  placeholder="https://acmedigital.com"
                  value={formData.website}
                  onChange={(value) => handleInputChange('website', value)}
                  className="bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#9233ea] focus:ring-[#9233ea]"
                />
                {formData.website && (
                  <p className="text-sm text-slate-500 mt-1">
                    Your agency website: {formatWebsiteUrl(formData.website)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Contact Email *
                </label>
                <Input
                  type="email"
                  placeholder="you@acmedigital.com"
                  value={formData.email}
                  onChange={(value) => handleInputChange('email', value)}
                  required
                  className="bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#9233ea] focus:ring-[#9233ea]"
                />
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-[#9233ea] text-white rounded-full text-sm">
                      💡
                    </span>
                  </div>
                  <div>
                    <Typography variant="body" className="text-slate-700">
                      This information will appear on your dashboard and reports
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleContinue}
                  disabled={!isFormValid}
                  loading={isSubmitting}
                  className="flex-1 bg-[#9233ea] hover:bg-[#7c2bc7] text-white"
                >
                  {isSubmitting ? 'Saving...' : 'Continue'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-[#9233ea]"></div>
            <div className="w-2 h-2 rounded-full bg-[#9233ea]"></div>
            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
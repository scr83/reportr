'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/atoms/Button'
import { Radio } from '@/components/atoms/Radio'
import { Typography } from '@/components/atoms/Typography'
import { Card, CardContent } from '@/components/atoms/Card'

type UserRole = 'freelancer' | 'small-agency' | 'marketing-manager' | 'consultant'

interface WelcomeFormData {
  role: UserRole | null
  clientCount: string
}

export default function WelcomePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<WelcomeFormData>({
    role: null,
    clientCount: ''
  })

  const roleOptions = [
    {
      value: 'freelancer' as const,
      label: 'Freelancer',
      description: 'Independent SEO specialist working with multiple clients'
    },
    {
      value: 'small-agency' as const,
      label: 'Small Agency Owner',
      description: 'Running a boutique digital marketing agency'
    },
    {
      value: 'marketing-manager' as const,
      label: 'Marketing Manager',
      description: 'In-house marketing professional managing SEO'
    },
    {
      value: 'consultant' as const,
      label: 'SEO Consultant',
      description: 'Providing strategic SEO guidance to businesses'
    }
  ]

  const clientCountOptions = [
    { value: '1', label: '1 client', tier: 'FREE', price: '$0' },
    { value: '2-5', label: '2-5 clients', tier: 'STARTER', price: '$39/mo' },
    { value: '6-15', label: '6-15 clients', tier: 'PROFESSIONAL', price: '$99/mo' },
    { value: '16+', label: '16+ clients', tier: 'ENTERPRISE', price: '$199/mo' }
  ]

  // Get recommended tier based on client count
  const getRecommendedTier = (clientCount: string) => {
    if (clientCount === '1') return 'FREE'
    if (clientCount === '2-5') return 'STARTER'
    if (clientCount === '6-15') return 'PROFESSIONAL'
    if (clientCount === '16+') return 'ENTERPRISE'
    return 'FREE'
  }

  const selectedOption = clientCountOptions.find(opt => opt.value === formData.clientCount)
  const recommendedTier = selectedOption ? getRecommendedTier(selectedOption.value) : null

  const handleContinue = () => {
    if (formData.role && formData.clientCount) {
      // Save recommended tier to localStorage for later use
      const tier = getRecommendedTier(formData.clientCount)
      localStorage.setItem('recommendedTier', tier)
      localStorage.setItem('agencyRole', formData.role)
      localStorage.setItem('clientCount', formData.clientCount)
      
      router.push('/onboarding/connect-client')
    }
  }

  const isFormValid = formData.role && formData.clientCount

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="text-center mb-6">
            <Typography variant="caption" className="text-slate-600 mb-2 block">
              Step 1 of 3
            </Typography>
            <div className="w-full bg-slate-200 rounded-full h-2 mb-6">
              <div className="bg-[#9233ea] h-2 rounded-full" style={{ width: '33%' }}></div>
            </div>
          </div>
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#9233ea] rounded-full mb-6">
            <span className="text-2xl">👋</span>
          </div>
          <Typography variant="h1" className="text-slate-900 mb-4">
            Welcome to Reportr
          </Typography>
          <Typography variant="lead" className="text-slate-600">
            Let&apos;s get you set up with professional SEO reports in under 3 minutes
          </Typography>
        </div>

        <Card className="bg-white border border-slate-200 shadow-sm p-8">
          <CardContent>
            <div className="space-y-8">
              <div>
                <Typography variant="h3" className="text-slate-900 mb-6">
                  What best describes your role?
                </Typography>
                <div className="space-y-4">
                  {roleOptions.map((option) => (
                    <Radio
                      key={option.value}
                      name="role"
                      value={option.value}
                      label={option.label}
                      description={option.description}
                      checked={formData.role === option.value}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                      className="text-slate-900"
                    />
                  ))}
                </div>
              </div>

              <div>
                <Typography variant="h3" className="text-slate-900 mb-6">
                  How many clients do you typically work with?
                </Typography>
                <div className="grid grid-cols-2 gap-4">
                  {clientCountOptions.map((option) => (
                    <div key={option.value} className="relative">
                      <Radio
                        name="clientCount"
                        value={option.value}
                        label={option.label}
                        checked={formData.clientCount === option.value}
                        onChange={(e) => setFormData({ ...formData, clientCount: e.target.value })}
                        className="text-slate-900"
                      />
                      <div className="mt-1 text-xs text-slate-500">
                        {option.tier} • {option.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tier Recommendation */}
              {recommendedTier && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#9233ea] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <Typography variant="h4" className="text-slate-900 mb-2">
                        {recommendedTier} Plan is perfect for you
                      </Typography>
                      <Typography variant="body" className="text-slate-600 mb-3">
                        {recommendedTier === 'FREE' ? (
                          <>Perfect for testing with your first client. Includes 1 client and 5 reports per month.</>
                        ) : recommendedTier === 'STARTER' ? (
                          <>Great for small agencies. Includes 5 clients, 20 reports/month. Start with a 14-day free trial.</>
                        ) : recommendedTier === 'PROFESSIONAL' ? (
                          <>Ideal for growing agencies. Includes 15 clients, 75 reports/month. Start with a 14-day free trial.</>
                        ) : (
                          <>Perfect for large agencies. Includes 50 clients, 250 reports/month. Start with a 14-day free trial.</>
                        )}
                      </Typography>
                      {recommendedTier !== 'FREE' && (
                        <div className="inline-flex items-center text-sm text-[#9233ea] font-medium">
                          🎉 14-day free trial included
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => router.back()}
                  className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleContinue}
                  disabled={!isFormValid}
                  className="flex-1 bg-[#9233ea] hover:bg-[#7c2bc7] text-white"
                >
                  {recommendedTier === 'FREE' ? 'Get Started Free' : 'Start Free Trial'} →
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-[#9233ea]"></div>
            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
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
    { value: '1-5', label: '1-5 clients' },
    { value: '6-15', label: '6-15 clients' },
    { value: '16-30', label: '16-30 clients' },
    { value: '30+', label: '30+ clients' }
  ]

  const handleContinue = () => {
    if (formData.role && formData.clientCount) {
      router.push('/onboarding/connect-client')
    }
  }

  const isFormValid = formData.role && formData.clientCount

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-6">
            <span className="text-2xl">👋</span>
          </div>
          <Typography variant="h1" className="text-white mb-4">
            Welcome to Reportr
          </Typography>
          <Typography variant="lead" className="text-slate-400">
            Let&apos;s get you set up with professional SEO reports in under 3 minutes
          </Typography>
        </div>

        <Card className="bg-slate-800 border border-slate-700 p-8">
          <CardContent>
            <div className="space-y-8">
              <div>
                <Typography variant="h3" className="text-white mb-6">
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
                      className="text-white"
                    />
                  ))}
                </div>
              </div>

              <div>
                <Typography variant="h3" className="text-white mb-6">
                  How many clients do you typically work with?
                </Typography>
                <div className="grid grid-cols-2 gap-4">
                  {clientCountOptions.map((option) => (
                    <Radio
                      key={option.value}
                      name="clientCount"
                      value={option.value}
                      label={option.label}
                      checked={formData.clientCount === option.value}
                      onChange={(e) => setFormData({ ...formData, clientCount: e.target.value })}
                      className="text-white"
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => router.back()}
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleContinue}
                  disabled={!isFormValid}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
                >
                  Continue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
            <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
            <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
            <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
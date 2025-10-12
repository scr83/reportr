'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Typography } from '@/components/atoms/Typography'
import { Card, CardContent } from '@/components/atoms/Card'

interface ClientFormData {
  businessName: string
  website: string
  primaryKeywords: string
}

export default function ConnectClientPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<ClientFormData>({
    businessName: '',
    website: '',
    primaryKeywords: ''
  })
  const [isConnecting, setIsConnecting] = useState(false)

  const handleInputChange = (field: keyof ClientFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleConnect = async () => {
    if (!isFormValid) return
    
    setIsConnecting(true)
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsConnecting(false)
    router.push('/onboarding/generate-report')
  }

  const handleBack = () => {
    router.push('/onboarding/welcome')
  }

  const isFormValid = formData.businessName.trim() && 
                     formData.website.trim() && 
                     formData.primaryKeywords.trim()

  const formatWebsiteUrl = (url: string) => {
    if (!url) return ''
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`
    }
    return url
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-6">
            <span className="text-2xl">🔗</span>
          </div>
          <Typography variant="h1" className="text-white mb-4">
            Connect Your First Client
          </Typography>
          <Typography variant="lead" className="text-slate-400">
            Add a client to generate your first professional SEO report
          </Typography>
        </div>

        <Card className="bg-slate-800 border border-slate-700 p-8">
          <CardContent>
            <div className="space-y-6">
              <div>
                <Input
                  label="Business Name"
                  placeholder="e.g., Acme Digital Marketing"
                  value={formData.businessName}
                  onChange={(value) => handleInputChange('businessName', value)}
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <Input
                  label="Website URL"
                  placeholder="e.g., acmedigital.com"
                  value={formData.website}
                  onChange={(value) => handleInputChange('website', value)}
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500"
                />
                {formData.website && (
                  <p className="text-sm text-slate-400 mt-1">
                    Will analyze: {formatWebsiteUrl(formData.website)}
                  </p>
                )}
              </div>

              <div>
                <Input
                  label="Primary Keywords"
                  placeholder="e.g., digital marketing, SEO services, PPC management"
                  value={formData.primaryKeywords}
                  onChange={(value) => handleInputChange('primaryKeywords', value)}
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500"
                />
                <p className="text-sm text-slate-400 mt-1">
                  Separate multiple keywords with commas
                </p>
              </div>

              <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm">
                      ℹ
                    </span>
                  </div>
                  <div>
                    <Typography variant="body" className="text-slate-200 mb-2">
                      What we&apos;ll analyze:
                    </Typography>
                    <ul className="text-sm text-slate-400 space-y-1">
                      <li>• Google Search Console performance</li>
                      <li>• Google Analytics 4 traffic data</li>
                      <li>• PageSpeed Insights scores</li>
                      <li>• Keyword ranking positions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleBack}
                  disabled={isConnecting}
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleConnect}
                  disabled={!isFormValid}
                  loading={isConnecting}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
                >
                  {isConnecting ? 'Connecting...' : 'Connect & Continue'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
            <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
            <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
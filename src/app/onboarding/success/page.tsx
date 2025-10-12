'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/atoms/Button'
import { Typography } from '@/components/atoms/Typography'
import { Card, CardContent } from '@/components/atoms/Card'
import { Badge } from '@/components/atoms/Badge'

export default function SuccessPage() {
  const router = useRouter()
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadReport = async () => {
    setIsDownloading(true)
    
    // Simulate PDF download
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Create a mock download
    const link = document.createElement('a')
    link.href = '#'
    link.download = 'acme-digital-marketing-seo-report.pdf'
    link.click()
    
    setIsDownloading(false)
  }

  const handleUpgrade = () => {
    window.location.href = '/pricing'
  }

  const handleGoToDashboard = () => {
    router.push('/dashboard')
  }

  const reportFeatures = [
    'Executive Summary with Key Insights',
    'Search Console Performance Analysis',
    'Google Analytics Traffic Overview',
    'PageSpeed & Core Web Vitals Audit',
    'AI-Generated SEO Recommendations',
    'Professional Branded Design'
  ]

  const upgradeFeatures = [
    'Unlimited report generation',
    'Advanced keyword tracking',
    'Competitor analysis',
    'White-label customization',
    'API integrations',
    'Priority support'
  ]

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6">
            <span className="text-4xl">🎉</span>
          </div>
          <Typography variant="h1" className="text-white mb-4">
            Congratulations!
          </Typography>
          <Typography variant="lead" className="text-slate-400 mb-6">
            Your first professional SEO report is ready for download
          </Typography>
          <Badge variant="success" className="mb-4">
            Report Generated Successfully
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Report Download Card */}
          <Card className="bg-slate-800 border border-slate-700 p-6">
            <CardContent>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-lg mb-4">
                  <span className="text-2xl">📄</span>
                </div>
                <Typography variant="h3" className="text-white mb-2">
                  Your SEO Report
                </Typography>
                <Typography variant="body" className="text-slate-400">
                  Professional 12-page analysis ready for client presentation
                </Typography>
              </div>

              <div className="bg-slate-700 border border-slate-600 rounded-lg p-4 mb-6">
                <Typography variant="body" className="text-slate-200 mb-3">
                  Includes:
                </Typography>
                <ul className="text-sm text-slate-400 space-y-1">
                  {reportFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleDownloadReport}
                loading={isDownloading}
                className="w-full bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 mb-4"
              >
                {isDownloading ? 'Preparing Download...' : 'Download PDF Report'}
              </Button>

              <div className="text-center">
                <Typography variant="caption" className="text-slate-500">
                  File size: ~2.5MB • PDF Format
                </Typography>
              </div>
            </CardContent>
          </Card>

          {/* Upgrade Card */}
          <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-purple-600/30 p-6">
            <CardContent>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <Typography variant="h3" className="text-white mb-2">
                  Upgrade to Pro
                </Typography>
                <Typography variant="body" className="text-slate-300">
                  Scale your SEO reporting with unlimited access
                </Typography>
              </div>

              <div className="bg-slate-800/50 border border-slate-600/50 rounded-lg p-4 mb-6">
                <Typography variant="body" className="text-slate-200 mb-3">
                  Pro features:
                </Typography>
                <ul className="text-sm text-slate-300 space-y-1">
                  {upgradeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-purple-400 mr-2">✨</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center mb-4">
                <div className="inline-flex items-baseline">
                  <span className="text-3xl font-bold text-white">$29</span>
                  <span className="text-slate-400 ml-1">/month</span>
                </div>
                <Typography variant="caption" className="text-slate-400 block">
                  Start 14-day free trial
                </Typography>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleUpgrade}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Start Free Trial
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="bg-slate-800 border border-slate-700 p-6 mb-8">
          <CardContent>
            <Typography variant="h3" className="text-white mb-6 text-center">
              What&apos;s Next?
            </Typography>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-3">
                  <span className="text-xl">📊</span>
                </div>
                <Typography variant="body" className="text-white mb-2">
                  Explore Dashboard
                </Typography>
                <Typography variant="caption" className="text-slate-400">
                  View all your reports and analytics
                </Typography>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-lg mb-3">
                  <span className="text-xl">👥</span>
                </div>
                <Typography variant="body" className="text-white mb-2">
                  Add More Clients
                </Typography>
                <Typography variant="caption" className="text-slate-400">
                  Generate reports for additional clients
                </Typography>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg mb-3">
                  <span className="text-xl">🎨</span>
                </div>
                <Typography variant="body" className="text-white mb-2">
                  Customize Branding
                </Typography>
                <Typography variant="caption" className="text-slate-400">
                  Add your logo and company colors
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handleGoToDashboard}
            className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Go to Dashboard
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleUpgrade}
            className="flex-1 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
          >
            Upgrade to Pro
          </Button>
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
            <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
            <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
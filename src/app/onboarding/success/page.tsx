'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/atoms/Button'
import { Typography } from '@/components/atoms/Typography'
import { Card, CardContent } from '@/components/atoms/Card'

export default function GoogleOAuthPage() {
  const router = useRouter()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnectGoogle = async () => {
    setIsConnecting(true)
    
    // In a real implementation, this would redirect to Google OAuth
    // For now, we'll simulate the process and go to dashboard
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Redirect to Google OAuth endpoint (this would be the real implementation)
    // window.location.href = '/api/auth/google/connect'
    
    // For demo purposes, go straight to dashboard
    router.push('/dashboard?welcome=true')
  }

  const handleSkipForNow = () => {
    router.push('/dashboard')
  }

  const handleBack = () => {
    router.push('/onboarding/connect-client')
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="text-center mb-6">
            <Typography variant="caption" className="text-slate-600 mb-2 block">
              Step 3 of 3
            </Typography>
            <div className="w-full bg-slate-200 rounded-full h-2 mb-6">
              <div className="bg-[#9233ea] h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#9233ea] rounded-full mb-6">
            <span className="text-2xl">🎉</span>
          </div>
          <Typography variant="h1" className="text-slate-900 mb-4">
            Almost There!
          </Typography>
          <Typography variant="lead" className="text-slate-600">
            Connect your Google account to start generating SEO reports
          </Typography>
        </div>

        <Card className="bg-white border border-slate-200 shadow-sm p-8 mb-6">
          <CardContent>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-lg mb-4">
                <span className="text-2xl">🔐</span>
              </div>
              <Typography variant="h3" className="text-slate-900 mb-4">
                Secure Connection
              </Typography>
              <Typography variant="body" className="text-slate-600 mb-6">
                By connecting Google, you can access:
              </Typography>
              
              <div className="bg-slate-50 rounded-lg p-6 mb-8">
                <ul className="text-left text-slate-700 space-y-3">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    Search Console data
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    Analytics insights
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    Automated reporting
                  </li>
                </ul>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleConnectGoogle}
                loading={isConnecting}
                className="w-full bg-[#9233ea] hover:bg-[#7c2bc7] text-white mb-4"
              >
                {isConnecting ? 'Connecting...' : '🔗 Connect Google'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center">
            <span className="text-slate-600 mr-2">🔒</span>
            <Typography variant="body" className="text-slate-600 text-sm">
              We never access your personal data. Only SEO metrics you authorize.
            </Typography>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handleBack}
            disabled={isConnecting}
            className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Back
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={handleSkipForNow}
            disabled={isConnecting}
            className="flex-1 text-slate-600 hover:text-slate-900"
          >
            Skip for now
          </Button>
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-[#9233ea]"></div>
            <div className="w-2 h-2 rounded-full bg-[#9233ea]"></div>
            <div className="w-2 h-2 rounded-full bg-[#9233ea]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
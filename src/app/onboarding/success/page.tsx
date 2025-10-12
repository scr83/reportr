'use client'

import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/atoms/Button'
import { Typography } from '@/components/atoms/Typography'
import { Card, CardContent } from '@/components/atoms/Card'

export default function SignInPage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  // If already authenticated, redirect to complete onboarding
  useEffect(() => {
    if (status === 'authenticated' && session) {
      // User just signed in, complete onboarding
      router.push('/onboarding/complete')
    }
  }, [status, session, router])

  const handleSignIn = async () => {
    await signIn('google', {
      callbackUrl: '/onboarding/complete'
    })
  }

  const handleBack = () => {
    router.push('/onboarding/connect-client')
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress */}
        <div className="text-center mb-8">
          <Typography variant="caption" className="text-slate-600 mb-2 block">
            Step 3 of 3
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
                <span className="text-3xl">🔐</span>
              </div>
            </div>

            {/* Header */}
            <Typography variant="h1" className="text-slate-900 text-center mb-2">
              Create Your Account
            </Typography>
            <Typography variant="lead" className="text-slate-600 text-center mb-8">
              Sign in with Google to complete your setup
            </Typography>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <Typography variant="body" className="text-slate-700">
                    <strong>Secure authentication</strong> - Your data is protected
                  </Typography>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <Typography variant="body" className="text-slate-700">
                    <strong>Quick setup</strong> - No password required
                  </Typography>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <Typography variant="body" className="text-slate-700">
                    <strong>Easy access</strong> - Connect Google services automatically
                  </Typography>
                </div>
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              size="lg"
              onClick={handleSignIn}
              className="w-full bg-[#9233ea] hover:bg-[#7c2bc7] text-white mb-4"
              loading={status === 'loading'}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleBack}
              className="w-full border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Back
            </Button>

            {/* Info */}
            <div className="mt-6 text-center">
              <Typography variant="caption" className="text-slate-500">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </Typography>
            </div>
          </CardContent>
        </Card>

        {/* Progress Dots */}
        <div className="flex gap-2 justify-center mt-8">
          <div className="w-2 h-2 rounded-full bg-[#9233ea]" />
          <div className="w-2 h-2 rounded-full bg-[#9233ea]" />
          <div className="w-2 h-2 rounded-full bg-[#9233ea]" />
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { 
  Typography,
  Button,
  Icon
} from '@/components/atoms'
import { PayPalSubscribeButton } from '@/components/molecules/PayPalSubscribeButton'
import { ArrowLeft, CheckCircle, Users } from 'lucide-react'

function SignupPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()

  // Get UTM parameters for tracking
  const ref = searchParams.get('ref') || 'direct'
  const utmSource = searchParams.get('utm_source') || 'direct'
  const utmMedium = searchParams.get('utm_medium') || 'direct'
  const utmCampaign = searchParams.get('utm_campaign') || 'direct'

  // Redirect to dashboard if already signed in
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard')
    }
  }, [status, session, router])

  const handleSignup = () => {
    // Track the signup attempt
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'sign_up_attempt', {
        method: 'Google',
        source: utmSource,
        medium: utmMedium,
        campaign: utmCampaign,
        ref: ref
      })
    }

    // 🔧 NEW: Set STARTER trial intent instead of FREE
    if (typeof window !== 'undefined') {
      document.cookie = `signupIntent=PAID_TRIAL; path=/; max-age=1800; SameSite=Lax`;
      console.log('📝 Set signupIntent cookie = PAID_TRIAL for STARTER trial');
    }

    // Add URL parameters to persist subscription intent
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('subscribe', 'pending');
    currentUrl.searchParams.set('selectedPlan', 'STARTER');
    currentUrl.searchParams.set('selectedPlanId', 'P-0X464499YG9822634NEQJ5XQ');
    currentUrl.searchParams.set('flow', 'paid');
    
    // Sign in with Google, redirect back with subscription intent
    signIn('google', { 
      callbackUrl: currentUrl.toString(),
      redirect: true 
    })
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600 mx-auto mb-4"></div>
          <Typography>Loading...</Typography>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      {/* Minimal Header */}
      <header className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-neutral-900">Reportr</span>
            </Link>
            <Link 
              href="/"
              className="text-neutral-600 hover:text-neutral-900 flex items-center space-x-1 text-sm font-medium transition-colors"
            >
              <Icon icon={ArrowLeft} size="sm" />
              <span>Back</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Ultra-Minimal Signup Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <Typography 
              variant="h1" 
              className="text-4xl sm:text-5xl font-bold text-neutral-900"
            >
              Start Your 14-Day Trial
            </Typography>
            <Typography 
              className="text-2xl font-semibold text-brand-600"
            >
              Then $29/mo — Cancel Anytime
            </Typography>
          </div>

          {/* Simple Subtext */}
          <Typography 
            className="text-lg text-neutral-600 max-w-sm mx-auto"
          >
            Generate your first professional SEO report in under 5 minutes.
          </Typography>

          {/* Main CTA Button */}
          <div className="space-y-6">
            {/* For authenticated users: Show PayPal trial button */}
            {session?.user ? (
              <div className="space-y-3">
                <PayPalSubscribeButton
                  planId={'P-0X464499YG9822634NEQJ5XQ'}
                  planName="STARTER"
                  plan="STARTER"
                  price={29}
                  isTrial={true}
                  className="w-full"
                />
              </div>
            ) : (
              /* For non-authenticated users: Show Google signup button */
              <Button 
                size="lg" 
                className="bg-brand-600 hover:bg-brand-700 text-white px-12 py-5 text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto" 
                onClick={handleSignup}
              >
                <Icon icon={Users} size="sm" className="mr-3" />
                Start 14-Day Trial — Then $29/mo
              </Button>
            )}

            {/* Trust Message */}
            <p className="text-sm text-gray-600 mt-2 text-center">
              We&apos;ll only charge you after 14 days. Cancel anytime during your trial.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-neutral-600">
              <div className="flex items-center space-x-2">
                <Icon icon={CheckCircle} size="sm" className="text-green-600" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon icon={CheckCircle} size="sm" className="text-green-600" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon icon={CheckCircle} size="sm" className="text-green-600" />
                <span>Cancel anytime</span>
              </div>
            </div>

            {/* Legal Text */}
            <div className="text-sm text-neutral-500 text-center max-w-xs mx-auto">
              By signing up, you agree to our{' '}
              <Link href="/terms" className="underline hover:no-underline">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="underline hover:no-underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600 mx-auto mb-4"></div>
          <Typography>Loading...</Typography>
        </div>
      </div>
    }>
      <SignupPageContent />
    </Suspense>
  )
}
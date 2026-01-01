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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50 relative overflow-hidden">
      {/* Subtle dot pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" className="text-brand-600"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      
      {/* Logo Section (Top Left) */}
      <div className="absolute top-8 left-8 z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center group-hover:bg-brand-700 transition-colors">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Reportr</span>
        </Link>
      </div>

      {/* Main Content Container */}
      <div className="relative max-w-xl mx-auto px-4 py-16 md:py-24 text-center min-h-screen flex flex-col justify-center">
        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
          Start Your 14-Day
          <span className="block text-brand-600 mt-2">Free Trial</span>
        </h1>
        
        {/* Pricing */}
        <p className="text-2xl text-gray-600 mb-8 font-medium">
          Then <span className="font-bold text-brand-600">$29/mo</span> — Cancel Anytime
        </p>
        
        {/* Value Prop */}
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          Generate your first professional SEO report in under 5 minutes.
        </p>

        {/* CTA Button - Keep all existing functionality */}
        <div className="mb-8">
          {session?.user ? (
            <div className="space-y-3">
              <PayPalSubscribeButton
                planId={'P-0X464499YG9822634NEQJ5XQ'}
                planName="STARTER"
                plan="STARTER"
                price={29}
                isTrial={true}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-600 text-white font-bold text-lg px-10 py-5 rounded-xl hover:bg-brand-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0"
              />
            </div>
          ) : (
            <button 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-600 text-white font-bold text-lg px-10 py-5 rounded-xl hover:bg-brand-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0"
              onClick={handleSignup}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
              Start 14-Day Trial — Then $29/mo
            </button>
          )}
        </div>

        {/* Trust Signals */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="font-medium text-base">14-day free trial</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="font-medium text-base">No setup fees</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="font-medium text-base">Cancel anytime</span>
          </div>
        </div>

        {/* Feature Preview Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Connect Once</h3>
            <p className="text-gray-600 text-sm leading-relaxed">One-click OAuth to Google Search Console and Analytics</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Generate Reports</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Professional PDFs in 30 seconds with your branding</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343"/>
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">White-Label</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Your logo, your colors. No &quot;Powered by&quot; badges</p>
          </div>
        </div>

        {/* Legal Text */}
        <p className="text-sm text-gray-500 mt-12 leading-relaxed">
          By signing up, you agree to our{' '}
          <Link href="/terms" className="text-brand-600 hover:text-brand-700 hover:underline transition-colors">
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-brand-600 hover:text-brand-700 hover:underline transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
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
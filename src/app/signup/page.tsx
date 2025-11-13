'use client'

import React, { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import { 
  Container,
  Typography,
  Button,
  Icon,
  Card
} from '@/components/atoms'
import { Header, Footer } from '@/components/landing'
import { ArrowRight, CheckCircle, Zap, Shield, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

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

    // Sign in with Google, redirect to dashboard on success
    signIn('google', { 
      callbackUrl: '/dashboard',
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
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        <section className="py-20 bg-gradient-to-br from-brand-50 to-white">
          <Container className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              {/* Main Headline */}
              <Typography 
                variant="h1" 
                className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6"
              >
                Start Your Free Trial
                <span className="text-brand-600 block">No Setup Fees Required</span>
              </Typography>

              {/* Subheadline */}
              <Typography 
                variant="h2" 
                className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto"
              >
                Generate your first professional SEO report in under 5 minutes. 
                Join 500+ agencies already using Reportr to impress clients and win more business.
              </Typography>

              {/* Main CTA */}
              <div className="mb-12">
                <Button 
                  size="lg" 
                  className="bg-brand-600 hover:bg-brand-700 text-white px-12 py-5 text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200" 
                  onClick={handleSignup}
                >
                  <Icon icon={Users} size="sm" className="mr-3" />
                  Sign Up with Google
                  <Icon icon={ArrowRight} size="sm" className="ml-3" />
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-neutral-500 mb-12">
                <div className="flex items-center space-x-2">
                  <Icon icon={CheckCircle} size="sm" className="text-green-600" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon icon={CheckCircle} size="sm" className="text-green-600" />
                  <span>No setup fees required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon icon={CheckCircle} size="sm" className="text-green-600" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <Card className="p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon icon={Zap} size="lg" className="text-brand-600" />
                  </div>
                  <Typography variant="h3" className="text-xl font-semibold text-neutral-900 mb-4">
                    Generate Reports in 30 Seconds
                  </Typography>
                  <Typography className="text-neutral-600 leading-relaxed">
                    Transform hours of manual work into seconds of automated reporting. 
                    Connect your Google accounts and generate your first report instantly.
                  </Typography>
                </Card>

                <Card className="p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon icon={Shield} size="lg" className="text-brand-600" />
                  </div>
                  <Typography variant="h3" className="text-xl font-semibold text-neutral-900 mb-4">
                    Professional White-Label Reports
                  </Typography>
                  <Typography className="text-neutral-600 leading-relaxed">
                    Fully branded reports with your logo, colors, and company name. 
                    Impress clients with reports that look like they cost thousands.
                  </Typography>
                </Card>

                <Card className="p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon icon={Users} size="lg" className="text-brand-600" />
                  </div>
                  <Typography variant="h3" className="text-xl font-semibold text-neutral-900 mb-4">
                    Join 500+ Growing Agencies
                  </Typography>
                  <Typography className="text-neutral-600 leading-relaxed">
                    Trusted by agencies worldwide to deliver professional reports 
                    that increase client retention and justify premium pricing.
                  </Typography>
                </Card>
              </div>

              {/* Final CTA */}
              <div className="text-center">
                <Card className="p-8 bg-gradient-to-br from-brand-600 to-brand-700 text-white">
                  <Typography variant="h3" className="text-2xl font-bold mb-4">
                    Ready to Transform Your Agency?
                  </Typography>
                  <Typography className="text-brand-100 mb-6 max-w-2xl mx-auto">
                    Stop spending hours on manual reports. Start generating professional, 
                    branded SEO reports that wow your clients in under 5 minutes.
                  </Typography>
                  <Button 
                    size="lg" 
                    className="bg-white text-brand-600 hover:bg-brand-50 px-8 py-4 text-lg font-semibold" 
                    onClick={handleSignup}
                  >
                    Start Your Free Trial Now
                    <Icon icon={ArrowRight} size="sm" className="ml-2" />
                  </Button>
                  <div className="mt-4 text-sm text-brand-200">
                    Setup takes 5 minutes • Full access to all features • No commitment
                  </div>
                </Card>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
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
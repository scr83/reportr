'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import { Check, Star } from 'lucide-react'
import { 
  Container,
  Typography,
  Button,
  CTAButton,
  Icon,
  Grid,
  Card,
  Badge
} from '@/components/atoms'
import { cn } from '@/lib/utils'
import { PayPalSubscribeButton } from '@/components/molecules/PayPalSubscribeButton'

export interface PricingProps {
  className?: string
}

const plans = [
  {
    name: 'FREE',
    price: '$0',
    period: '/forever',
    description: 'Perfect for trying out Reportr',
    popular: false,
    features: [
      'Up to 1 client',
      '5 reports per month',
      'Basic SEO metrics',
      'Google Search Console',
      'Google Analytics 4',
      'PageSpeed Insights',
      'Standard templates',
      'Email support (48hrs)'
    ],
    cta: 'Start Free',
    highlight: false
  },
  {
    name: 'STARTER',
    price: '$29',
    period: '/month',
    description: 'Perfect for freelancers',
    popular: true,
    features: [
      'Up to 5 clients',
      '25 reports per month',
      'Advanced SEO analytics',
      'Google Search Console',
      'Google Analytics 4',
      'PageSpeed Insights',
      'White-label branding included',
      'Custom logo, colors & company name',
      'AI insights',
      'Priority email support (24hrs)'
    ],
    cta: 'Start Free Trial',
    highlight: true
  },
  {
    name: 'PROFESSIONAL',
    price: '$59',
    period: '/month',
    description: 'For growing agencies',
    popular: false,
    features: [
      'Up to 15 clients',
      '75 reports per month',
      'Everything in Starter',
      'White-label branding included',
      'Custom logo, colors & company name',
      'PageSpeed Insights',
      'AI insights',
      'Priority support',
      'Advanced analytics'
    ],
    cta: 'Start Free Trial',
    highlight: false
  }
]

export const Pricing: React.FC<PricingProps> = ({ className }) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  // Handle authentication for FREE plan
  const handleFreeAuth = () => {
    // Add GTM tracking FIRST, before any existing logic
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'cta_click',
        cta_location: 'pricing_homepage',
        cta_text: 'Start Free',
        plan: 'FREE',
        cta_destination: '/signup'
      });
    }

    if (session) {
      router.push('/dashboard')
    } else {
      // Set cookie to mark FREE intent (server-accessible)
      if (typeof window !== 'undefined') {
        document.cookie = `signupIntent=FREE; path=/; max-age=1800; SameSite=Lax`;
        console.log('📝 Set signupIntent cookie = FREE');
      }
      signIn('google', { callbackUrl: '/dashboard?flow=free' })
    }
  }

  return (
    <section 
      id="pricing"
      className={cn(
        'py-20 bg-white',
        className
      )}
    >
      <Container className="px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Typography variant="h2" className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Simple, Transparent Pricing
          </Typography>
          <Typography variant="body" className="text-xl text-neutral-600">
            Whether you&apos;re a solo freelancer or a growing team. Start free, upgrade when you&apos;re ready.
          </Typography>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-6xl mx-auto">
          <Grid cols={1} gap="lg" className="lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={cn(
                  'relative p-8 transition-all duration-300',
                  plan.highlight 
                    ? 'border-2 border-brand-600 shadow-xl scale-105 bg-white' 
                    : 'border border-neutral-200 hover:shadow-lg bg-white'
                )}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-brand-600 text-white px-4 py-2 text-sm font-semibold rounded-full flex items-center space-x-1">
                      <Icon icon={Star} size="sm" />
                      <span>MOST POPULAR</span>
                    </Badge>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <Typography variant="h3" className="text-lg font-semibold text-neutral-900 mb-2 uppercase tracking-wider">
                    {plan.name}
                  </Typography>
                  <div className="flex items-baseline justify-center mb-2">
                    <Typography variant="h1" className="text-5xl font-bold text-neutral-900">
                      {plan.price}
                    </Typography>
                    <Typography variant="body" className="text-neutral-600 ml-1">
                      {plan.period}
                    </Typography>
                  </div>
                  <Typography variant="body" className="text-neutral-600">
                    {plan.description}
                  </Typography>
                </div>

                {/* Features List */}
                <div className="mb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                            <Icon icon={Check} size="xs" className="text-green-600" />
                          </div>
                          <Typography variant="body" className="text-neutral-700 flex-1">
                            {feature}
                          </Typography>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  {status === 'loading' ? (
                    <Button 
                      size="lg" 
                      className="w-full py-3 text-lg font-semibold" 
                      disabled
                    >
                      Loading...
                    </Button>
                  ) : plan.name === 'FREE' ? (
                    <button
                      onClick={handleFreeAuth}
                      disabled={status === 'loading' as any}
                      className="w-full py-3 text-lg font-semibold bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-all duration-200"
                    >
                      {status === 'loading' as any ? 'Loading...' : 'Start Free'}
                    </button>
                  ) : plan.name === 'STARTER' ? (
                    <div className="space-y-3">
                      {/* STARTER: Trial Button */}
                      <PayPalSubscribeButton
                        planId={'P-0X464499YG9822634NEQJ5XQ'}
                        planName="STARTER"
                        plan="STARTER"
                        price={29}
                        isTrial={true}
                      />
                      
                      {/* STARTER: Subscribe Button */}
                      <PayPalSubscribeButton
                        planId={'P-6PJ50716H4431863PNEQKBLQ'}
                        planName="STARTER"
                        plan="STARTER"
                        price={29}
                      />
                    </div>
                  ) : plan.name === 'PROFESSIONAL' ? (
                    <div className="space-y-3">
                      {/* PROFESSIONAL: Trial Button */}
                      <PayPalSubscribeButton
                        planId={'P-09P26662R8680522DNEQJ7XY'}
                        planName="PROFESSIONAL"
                        plan="PROFESSIONAL"
                        price={59}
                        isTrial={true}
                      />
                      
                      {/* PROFESSIONAL: Subscribe Button */}
                      <PayPalSubscribeButton
                        planId={'P-90W906144W5364313NEQKB5I'}
                        planName="PROFESSIONAL"
                        plan="PROFESSIONAL"
                        price={59}
                      />
                    </div>
                  ) : (
                    <CTAButton 
                      href="/signup"
                      location="pricing-fallback"
                      size="lg" 
                      className="w-full py-3 text-lg font-semibold bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-all duration-200"
                    >
                      {plan.cta}
                    </CTAButton>
                  )}
                </div>
              </Card>
            ))}
          </Grid>
        </div>

        {/* Bottom FAQ */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <Typography variant="body" className="text-neutral-600 mb-6">
            All plans include a 14-day free trial. No setup fees required to start.
          </Typography>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-neutral-500">
            <span>✓ Cancel anytime</span>
            <span>✓ No setup fees</span>
            <span>✓ 30-day money-back guarantee</span>
          </div>
        </div>
      </Container>
    </section>
  )
}

Pricing.displayName = 'Pricing'
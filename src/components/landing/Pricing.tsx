'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import { Check, Star } from 'lucide-react'
import { 
  Container,
  Typography,
  Button,
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
    period: '/month',
    description: 'Perfect for trying out Reportr',
    popular: false,
    features: [
      '5 reports per month',
      '1 client',
      'Basic SEO metrics',
      'Standard templates',
      'Email support',
      'Google integrations'
    ],
    cta: 'Start Free',
    highlight: false
  },
  {
    name: 'STARTER',
    price: '$29',
    period: '/month',
    description: 'Best for growing agencies',
    popular: true,
    features: [
      '25 reports per month',
      '5 clients',
      'Advanced SEO metrics',
      'automated insights',
      'Priority support',
      'All integrations',
      'PDF downloads'
    ],
    cta: 'Start Free Trial',
    highlight: true
  }
]

export const Pricing: React.FC<PricingProps> = ({ className }) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const handleGetStarted = (planName: string) => {
    if (session) {
      router.push('/dashboard')
    } else {
      signIn('google', { callbackUrl: '/dashboard' })
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
            Start free and scale as your agency grows. No hidden fees, no surprises.
          </Typography>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-4xl mx-auto">
          <Grid cols={1} gap="lg" className="lg:grid-cols-2">
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
                        <Typography variant="body" className="text-neutral-700">
                          {feature}
                        </Typography>
                      </li>
                    ))}
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
                  ) : plan.name === 'STARTER' ? (
                    <div className="space-y-3">
                      <Button 
                        size="lg" 
                        className="w-full py-3 text-lg font-semibold text-[#7e23ce] bg-white border-2 border-[#7e23ce] hover:bg-purple-50 transition-all duration-200"
                        onClick={() => handleGetStarted(plan.name)}
                      >
                        {plan.cta}
                      </Button>
                      
                      <PayPalSubscribeButton
                        planId={process.env.NEXT_PUBLIC_PAYPAL_STARTER_DIRECT_PLAN_ID || 'P-6PJ50716H4431863PNEQKBLQ'}
                        planName="Starter"
                        price={29}
                        className="mt-2"
                      />
                    </div>
                  ) : (
                    <Button 
                      size="lg" 
                      className={cn(
                        'w-full py-3 text-lg font-semibold transition-all duration-200',
                        plan.highlight 
                          ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg hover:shadow-xl' 
                          : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                      )}
                      onClick={() => handleGetStarted(plan.name)}
                    >
                      {plan.cta}
                    </Button>
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
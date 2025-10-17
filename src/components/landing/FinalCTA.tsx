'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import { ArrowRight, CheckCircle, Users, Clock, Star } from 'lucide-react'
import { 
  Container,
  Typography,
  Button,
  Icon,
  Grid
} from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface FinalCTAProps {
  className?: string
}

const trustIndicators = [
  {
    icon: Users,
    text: 'Trusted by 500+ agencies'
  },
  {
    icon: Clock,
    text: '5 minutes to setup'
  },
  {
    icon: Star,
    text: '4.9/5 customer rating'
  }
]

export const FinalCTA: React.FC<FinalCTAProps> = ({ className }) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  return (
    <section className={cn(
      'relative overflow-hidden',
      'bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800',
      'py-20',
      className
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-300 rounded-full blur-3xl opacity-20" />
        </div>
      </div>

      <Container className="relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <Typography 
            variant="h2" 
            className="text-3xl lg:text-4xl font-bold text-white mb-6"
          >
            Ready to Transform Your SEO Reporting?
          </Typography>

          {/* Subheading */}
          <Typography 
            variant="body" 
            className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto"
          >
            Join hundreds of agencies saving time and impressing clients with 
            professional, AI-powered SEO reports.
          </Typography>

          {/* Trust Indicators */}
          <div className="mb-10">
            <Grid cols={1} gap="md" className="sm:grid-cols-3">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center justify-center space-x-2 text-brand-100">
                  <Icon icon={indicator.icon} size="sm" />
                  <Typography variant="body" className="font-medium">
                    {indicator.text}
                  </Typography>
                </div>
              ))}
            </Grid>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center space-y-6">
            {status === 'loading' ? (
              <Button 
                size="xl" 
                className="px-12 py-6 text-xl font-semibold bg-white text-brand-600 hover:bg-neutral-50 shadow-2xl" 
                disabled
              >
                Loading...
              </Button>
            ) : session ? (
              <Button 
                size="xl" 
                className="px-12 py-6 text-xl font-semibold bg-white text-brand-600 hover:bg-neutral-50 shadow-2xl hover:shadow-3xl transition-all duration-200" 
                onClick={() => router.push('/dashboard')}
              >
                Go to Dashboard
                <Icon icon={ArrowRight} size="md" className="ml-3" />
              </Button>
            ) : (
              <Button 
                size="xl" 
                className="px-12 py-6 text-xl font-semibold bg-white text-brand-600 hover:bg-neutral-50 shadow-2xl hover:shadow-3xl transition-all duration-200" 
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              >
                Start Free Trial Now
                <Icon icon={ArrowRight} size="md" className="ml-3" />
              </Button>
            )}

            {/* Additional Trust Elements */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-brand-200">
              <div className="flex items-center space-x-2">
                <Icon icon={CheckCircle} size="sm" className="text-green-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon icon={CheckCircle} size="sm" className="text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon icon={CheckCircle} size="sm" className="text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="mt-16 pt-8 border-t border-brand-500/30">
            <Typography variant="body" className="text-brand-100 italic text-lg mb-4">
              "Reportr has transformed how we deliver SEO insights to our clients. 
              What used to take hours now takes minutes."
            </Typography>
            <Typography variant="caption" className="text-brand-200">
              — Sarah Johnson, Digital Marketing Agency Owner
            </Typography>
          </div>
        </div>
      </Container>
    </section>
  )
}

FinalCTA.displayName = 'FinalCTA'
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import { ArrowRight, Play, CheckCircle } from 'lucide-react'
import { 
  Container,
  Typography,
  Button,
  Icon,
  Grid,
  Card
} from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface HeroProps {
  className?: string
}

export const Hero: React.FC<HeroProps> = ({ className }) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className={cn(
      'relative overflow-hidden',
      'bg-gradient-to-br from-brand-50 via-white to-brand-50',
      'pt-20 pb-16 lg:pt-24 lg:pb-20',
      className
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600 rounded-full blur-3xl opacity-5" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-400 rounded-full blur-3xl opacity-5" />
      </div>

      <Container className="relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <Typography 
            variant="h1" 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight"
          >
            Professional SEO Reports in{' '}
            <span className="text-brand-600">Minutes, Not Hours</span>
          </Typography>

          {/* Subheadline */}
          <Typography 
            variant="h2" 
            className="text-xl lg:text-2xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Stop spending hours on manual client reports. Generate stunning, white-label SEO reports automatically from Google Search Console 
            and Analytics 4. Perfect for SEO freelancers and growing agencies.
          </Typography>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            {status === 'loading' ? (
              <Button size="lg" className="px-8 py-4 text-lg font-semibold" disabled>
                Loading...
              </Button>
            ) : session ? (
              <Button 
                size="lg" 
                className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200" 
                onClick={() => router.push('/dashboard')}
              >
                Go to Dashboard
                <Icon icon={ArrowRight} size="sm" className="ml-2" />
              </Button>
            ) : (
              <>
                <Button 
                  size="lg" 
                  className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200" 
                  onClick={() => router.push('/pricing')}
                >
                  Start Free Trial
                  <Icon icon={ArrowRight} size="sm" className="ml-2" />
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="border-2 border-neutral-300 hover:border-neutral-400 px-8 py-4 text-lg font-semibold transition-all duration-200"
                  onClick={() => scrollToSection('how-it-works')}
                >
                  <Icon icon={Play} size="sm" className="mr-2" />
                  See How It Works
                </Button>
              </>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-neutral-500 mb-12">
            <div className="flex items-center space-x-2">
              <Icon icon={CheckCircle} size="sm" className="text-green-600" />
              <span>No setup fees required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon icon={CheckCircle} size="sm" className="text-green-600" />
              <span>5 minutes to first report</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon icon={CheckCircle} size="sm" className="text-green-600" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Visual Preview */}
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 shadow-2xl border border-neutral-200/50 bg-white/70 backdrop-blur-sm">
            <div className="space-y-6">
              {/* Mock Report Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <div className="space-y-2">
                  <div className="h-6 bg-brand-600 rounded w-32"></div>
                  <div className="h-4 bg-neutral-300 rounded w-48"></div>
                </div>
                <div className="h-12 w-12 bg-brand-100 rounded-lg"></div>
              </div>

              {/* Mock Metrics Grid */}
              <Grid cols={1} gap="md" className="sm:grid-cols-3">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                  <div className="h-4 bg-green-200 rounded w-20 mb-2"></div>
                  <div className="h-8 bg-green-300 rounded w-16"></div>
                </div>
                <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-lg p-4">
                  <div className="h-4 bg-brand-200 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-brand-300 rounded w-20"></div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                  <div className="h-4 bg-purple-200 rounded w-18 mb-2"></div>
                  <div className="h-8 bg-purple-300 rounded w-14"></div>
                </div>
              </Grid>

              {/* Mock Chart */}
              <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg p-6">
                <div className="h-4 bg-neutral-300 rounded w-32 mb-4"></div>
                <div className="h-32 bg-gradient-to-t from-brand-200 to-brand-400 rounded relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
              </div>

              {/* Mock Insights */}
              <div className="space-y-3">
                <div className="h-4 bg-neutral-300 rounded w-40"></div>
                <div className="h-3 bg-neutral-200 rounded w-full"></div>
                <div className="h-3 bg-neutral-200 rounded w-3/4"></div>
                <div className="h-3 bg-neutral-200 rounded w-5/6"></div>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  )
}

Hero.displayName = 'Hero'
'use client'

import React from 'react'
import { 
  Zap, 
  Clock, 
  Palette, 
  BarChart3, 
  Shield, 
  Star 
} from 'lucide-react'
import { 
  Container,
  Typography,
  Icon,
  Grid,
  Card
} from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface FeaturesProps {
  className?: string
}

const features = [
  {
    icon: Zap,
    title: 'Automated Reports',
    description: 'Generate professional SEO reports automatically with AI-powered insights and recommendations.',
    color: 'text-yellow-600 bg-yellow-100'
  },
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Reduce report creation time from hours to minutes with our streamlined automation process.',
    color: 'text-blue-600 bg-blue-100'
  },
  {
    icon: Palette,
    title: 'Professional Reports',
    description: 'Beautifully designed PDF reports that showcase your client\'s SEO data clearly and professionally.',
    color: 'text-purple-600 bg-purple-100'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Comprehensive SEO metrics from Google Search Console and Analytics 4.',
    color: 'text-green-600 bg-green-100'
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with encrypted data storage and 99.9% uptime reliability.',
    color: 'text-red-600 bg-red-100'
  },
  {
    icon: Star,
    title: 'Client-Ready',
    description: 'Professional reports that impress clients with clear insights and actionable recommendations.',
    color: 'text-brand-600 bg-brand-100'
  }
]

export const Features: React.FC<FeaturesProps> = ({ className }) => {
  return (
    <section 
      id="features"
      className={cn(
        'py-20 bg-neutral-50',
        className
      )}
    >
      <Container className="px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Typography variant="h2" className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Everything You Need to Impress Your Clients
          </Typography>
          <Typography variant="body" className="text-xl text-neutral-600">
            Built specifically for digital marketing agencies who need professional 
            reports without the hassle.
          </Typography>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto">
          <Grid cols={1} gap="lg" className="sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-8 text-center hover:shadow-lg transition-all duration-300 border border-neutral-200 bg-white group"
              >
                {/* Icon */}
                <div className={cn(
                  'mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110',
                  feature.color
                )}>
                  <Icon 
                    icon={feature.icon} 
                    size="lg" 
                    className="transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <Typography variant="h3" className="text-xl font-semibold text-neutral-900 mb-4">
                  {feature.title}
                </Typography>
                <Typography variant="body" className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </Typography>
              </Card>
            ))}
          </Grid>
        </div>

        {/* Bottom Stats */}
        <div className="mt-20">
          <div className="max-w-4xl mx-auto">
            <Grid cols={1} gap="lg" className="sm:grid-cols-2">
              <div className="text-center">
                <Typography variant="h2" className="text-4xl font-bold text-brand-600 mb-2">
                  10x
                </Typography>
                <Typography variant="body" className="text-neutral-600">
                  Faster than manual reporting
                </Typography>
              </div>
              <div className="text-center">
                <Typography variant="h2" className="text-4xl font-bold text-brand-600 mb-2">
                  99.9%
                </Typography>
                <Typography variant="body" className="text-neutral-600">
                  Uptime reliability
                </Typography>
              </div>
            </Grid>
          </div>
        </div>
      </Container>
    </section>
  )
}

Features.displayName = 'Features'
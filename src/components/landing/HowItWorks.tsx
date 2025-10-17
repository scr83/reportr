'use client'

import React from 'react'
import { Link, BarChart3, FileText } from 'lucide-react'
import { 
  Container,
  Typography,
  Icon,
  Grid,
  Card
} from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface HowItWorksProps {
  className?: string
}

const steps = [
  {
    number: 1,
    icon: Link,
    title: 'Connect Your Accounts',
    description: 'Securely connect your Google Search Console and Analytics 4 accounts with just a few clicks.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    number: 2,
    icon: BarChart3,
    title: 'Pull Your Data',
    description: 'Our AI automatically collects and analyzes your SEO data, identifying trends, opportunities, and insights.',
    color: 'from-brand-500 to-brand-600'
  },
  {
    number: 3,
    icon: FileText,
    title: 'Generate Report',
    description: 'Get a professional PDF report with AI-powered insights and recommendations in minutes.'
    color: 'from-green-500 to-green-600'
  }
]

export const HowItWorks: React.FC<HowItWorksProps> = ({ className }) => {
  return (
    <section 
      id="how-it-works"
      className={cn(
        'py-20 bg-white',
        className
      )}
    >
      <Container className="px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Typography variant="h2" className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            How It Works
          </Typography>
          <Typography variant="body" className="text-xl text-neutral-600">
            Get professional SEO reports in three simple steps. No technical expertise required.
          </Typography>
        </div>

        {/* Steps Grid */}
        <div className="max-w-6xl mx-auto">
          <Grid cols={1} gap="xl" className="lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connecting Line (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-px bg-gradient-to-r from-neutral-300 to-transparent z-0" />
                )}

                <Card className="relative z-10 p-8 text-center hover:shadow-lg transition-all duration-300 border border-neutral-200 bg-white">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-neutral-100 rounded-full text-neutral-600 font-bold text-lg mb-6">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={cn(
                    'mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6',
                    'bg-gradient-to-br',
                    step.color
                  )}>
                    <Icon 
                      icon={step.icon} 
                      size="lg" 
                      className="text-white"
                    />
                  </div>

                  {/* Content */}
                  <Typography variant="h3" className="text-xl font-semibold text-neutral-900 mb-4">
                    {step.title}
                  </Typography>
                  <Typography variant="body" className="text-neutral-600 leading-relaxed">
                    {step.description}
                  </Typography>
                </Card>
              </div>
            ))}
          </Grid>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Typography variant="body" className="text-lg text-neutral-600 mb-6">
            Ready to streamline your SEO reporting process?
          </Typography>
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-brand-50 rounded-lg border border-brand-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <Typography variant="body" className="text-brand-700 font-medium">
              Average setup time: 5 minutes
            </Typography>
          </div>
        </div>
      </Container>
    </section>
  )
}

HowItWorks.displayName = 'HowItWorks'
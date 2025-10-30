'use client'

import React from 'react'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'
import { 
  Link as LinkIcon, 
  BarChart3, 
  FileText, 
  Globe,
  Settings,
  Download,
  Clock,
  Shield,
  Sparkles,
  Users,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { 
  Container,
  Typography,
  Icon,
  Grid,
  Card,
  Button
} from '@/components/atoms'
import { Header, Footer } from '@/components/landing'
import { cn } from '@/lib/utils'

const mainSteps = [
  {
    number: 1,
    icon: LinkIcon,
    title: 'Connect Your Accounts',
    description: 'Securely connect your Google Search Console and Analytics 4 accounts with just a few clicks using OAuth2.',
    color: 'from-blue-500 to-blue-600',
    details: [
      'One-click OAuth2 connection',
      'Enterprise-grade security encryption',
      'No passwords or API keys needed',
      'Takes less than 2 minutes'
    ]
  },
  {
    number: 2,
    icon: BarChart3,
    title: 'Collect Your Data',
    description: 'Our system automatically pulls your SEO data from Google Search Console and Analytics, then organizes it for reporting.',
    color: 'from-brand-500 to-brand-600',
    details: [
      'Automated data collection from multiple sources',
      'Clean data organization',
      'Professional formatting',
      'Key metrics compilation'
    ]
  },
  {
    number: 3,
    icon: FileText,
    title: 'Generate Professional Reports',
    description: 'Get a beautifully designed, white-labeled PDF report with your client\'s data professionally formatted in 30 seconds.',
    color: 'from-green-500 to-green-600',
    details: [
      '30-second report generation',
      'Professional PDF formatting',
      'Custom branding throughout',
      'Ready to send to clients'
    ]
  }
]

const additionalSteps = [
  {
    icon: Globe,
    title: 'Add Multiple Clients',
    description: 'Scale your reporting by adding unlimited client websites and domains.'
  },
  {
    icon: Settings,
    title: 'Customize Your Branding',
    description: 'Upload your logo, set brand colors, and customize report templates.'
  },
  {
    icon: Download,
    title: 'Download & Share',
    description: 'Download professional PDFs or share secure links with your clients.'
  }
]

const benefits = [
  {
    icon: Clock,
    title: 'Save 8+ Hours Per Report',
    description: 'Automate what used to take hours of manual work into 30 seconds.',
    stat: '95% Time Saved'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'OAuth2 connections and encrypted storage keep your data safe.',
    stat: '99.9% Uptime'
  },
  {
    icon: Sparkles,
    title: 'Professional Formatting',
    description: 'Transforms raw SEO data into polished, client-ready reports automatically.',
    stat: 'Time Saver'
  },
  {
    icon: Users,
    title: 'Impress Your Clients',
    description: 'Professional reports that showcase your expertise and value.',
    stat: '200+ Agencies'
  }
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-brand-50 to-white">
          <Container className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Typography variant="h1" className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6">
                How Reportr
                <span className="text-brand-600 block">Transforms Your Workflow</span>
              </Typography>
              <Typography variant="body" className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
                From manual data compilation that takes hours to professional PDFs generated in seconds. 
                See how easy it is to transform your SEO reporting workflow.
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 text-lg font-semibold"
                  onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                >
                  Start Free Trial
                </Button>
                <Link href="/features">
                  <Button 
                    variant="secondary"
                    className="px-8 py-4 text-lg font-semibold"
                  >
                    View Features
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Main Steps */}
        <section className="py-20 bg-white">
          <Container className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Typography variant="h2" className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                3 Simple Steps to Professional Reports
              </Typography>
              <Typography variant="body" className="text-xl text-neutral-600">
                No technical expertise required. Connect your accounts and start generating professional reports today.
              </Typography>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="space-y-16">
                {mainSteps.map((step, index) => (
                  <div key={step.number} className="relative">
                    {/* Connecting Line */}
                    {index < mainSteps.length - 1 && (
                      <div className="hidden lg:block absolute left-1/2 top-full w-px h-16 bg-gradient-to-b from-neutral-300 to-transparent z-0 transform -translate-x-1/2" />
                    )}

                    <div className={cn(
                      'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
                      index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                    )}>
                      {/* Content */}
                      <div className={cn(
                        'space-y-6',
                        index % 2 === 1 ? 'lg:col-start-2' : ''
                      )}>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-neutral-100 rounded-full text-neutral-600 font-bold text-lg">
                            {step.number}
                          </div>
                          <Typography variant="h3" className="text-2xl font-semibold text-neutral-900">
                            {step.title}
                          </Typography>
                        </div>
                        
                        <Typography variant="body" className="text-lg text-neutral-600 leading-relaxed">
                          {step.description}
                        </Typography>

                        <ul className="space-y-3">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-center text-neutral-600">
                              <CheckCircle className="w-5 h-5 text-brand-600 mr-3 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Visual */}
                      <div className={cn(
                        'flex justify-center',
                        index % 2 === 1 ? 'lg:col-start-1' : ''
                      )}>
                        <Card className="p-12 bg-white border-2 border-neutral-200 hover:shadow-lg transition-all duration-300">
                          <div className={cn(
                            'mx-auto w-24 h-24 rounded-full flex items-center justify-center',
                            'bg-gradient-to-br',
                            step.color
                          )}>
                            <Icon 
                              icon={step.icon} 
                              size="xl" 
                              className="text-white"
                            />
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Additional Steps */}
        <section className="py-20 bg-neutral-50">
          <Container className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Typography variant="h2" className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Advanced Capabilities
              </Typography>
              <Typography variant="body" className="text-xl text-neutral-600">
                Scale your data presentation with additional features designed for growing agencies.
              </Typography>
            </div>

            <div className="max-w-6xl mx-auto">
              <Grid cols={1} gap="lg" className="sm:grid-cols-3">
                {additionalSteps.map((step, index) => (
                  <Card 
                    key={index} 
                    className="p-8 text-center hover:shadow-lg transition-all duration-300 border border-neutral-200 bg-white group"
                  >
                    <div className="mx-auto w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                      <Icon 
                        icon={step.icon} 
                        size="lg" 
                        className="text-brand-600"
                      />
                    </div>

                    <Typography variant="h3" className="text-xl font-semibold text-neutral-900 mb-4">
                      {step.title}
                    </Typography>
                    <Typography variant="body" className="text-neutral-600 leading-relaxed">
                      {step.description}
                    </Typography>
                  </Card>
                ))}
              </Grid>
            </div>
          </Container>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-white">
          <Container className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Typography variant="h2" className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                The Reportr Advantage
              </Typography>
              <Typography variant="body" className="text-xl text-neutral-600">
                See why agencies choose Reportr to save time on SEO data presentation.
              </Typography>
            </div>

            <div className="max-w-6xl mx-auto">
              <Grid cols={1} gap="lg" className="sm:grid-cols-2 lg:grid-cols-4">
                {benefits.map((benefit, index) => (
                  <Card 
                    key={index} 
                    className="p-6 text-center hover:shadow-lg transition-all duration-300 border border-neutral-200 bg-white group"
                  >
                    <div className="mx-auto w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                      <Icon 
                        icon={benefit.icon} 
                        size="md" 
                        className="text-brand-600"
                      />
                    </div>

                    <Typography variant="h3" className="text-lg font-semibold text-neutral-900 mb-2">
                      {benefit.title}
                    </Typography>
                    <Typography variant="body" className="text-neutral-600 text-sm leading-relaxed mb-3">
                      {benefit.description}
                    </Typography>
                    <div className="inline-flex items-center px-3 py-1 bg-brand-50 rounded-full">
                      <Typography className="text-brand-700 font-semibold text-xs">
                        {benefit.stat}
                      </Typography>
                    </div>
                  </Card>
                ))}
              </Grid>
            </div>
          </Container>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-neutral-50">
          <Container className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <Typography variant="h2" className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                  Your First Report in 5 Minutes
                </Typography>
                <Typography variant="body" className="text-xl text-neutral-600">
                  From signup to your first professional report delivered to a client.
                </Typography>
              </div>

              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-brand-600 rounded-full text-white font-semibold text-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <Typography className="font-semibold text-neutral-900">Sign up with Google (30 seconds)</Typography>
                    <Typography className="text-neutral-600 text-sm">Create your account using your Google login</Typography>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-brand-600 rounded-full text-white font-semibold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <Typography className="font-semibold text-neutral-900">Connect APIs (2 minutes)</Typography>
                    <Typography className="text-neutral-600 text-sm">Authorize Google Search Console and Analytics access</Typography>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-brand-600 rounded-full text-white font-semibold text-sm">
                    3
                  </div>
                  <div className="flex-1">
                    <Typography className="font-semibold text-neutral-900">Add your branding (1 minute)</Typography>
                    <Typography className="text-neutral-600 text-sm">Upload logo and set your brand colors</Typography>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-brand-600 rounded-full text-white font-semibold text-sm">
                    4
                  </div>
                  <div className="flex-1">
                    <Typography className="font-semibold text-neutral-900">Generate first report (30 seconds)</Typography>
                    <Typography className="text-neutral-600 text-sm">Click generate and download your professional PDF</Typography>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full text-white font-semibold text-sm">
                    ✓
                  </div>
                  <div className="flex-1">
                    <Typography className="font-semibold text-neutral-900">Impress your client</Typography>
                    <Typography className="text-neutral-600 text-sm">Send professional report and get positive feedback</Typography>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-brand-600">
          <Container className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Typography variant="h2" className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Get Started?
              </Typography>
              <Typography variant="body" className="text-xl text-brand-100 mb-8">
                Join hundreds of agencies who have transformed their SEO reporting with Reportr. 
                Try it free for 14 days.
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-white text-brand-600 hover:bg-brand-50 px-8 py-4 text-lg font-semibold"
                  onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Link href="/pricing">
                  <Button 
                    variant="ghost"
                    className="text-white border-white hover:bg-brand-700 px-8 py-4 text-lg font-semibold"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
              <Typography className="text-brand-200 text-sm mt-6">
                No credit card required • 14-day free trial • Cancel anytime
              </Typography>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  )
}
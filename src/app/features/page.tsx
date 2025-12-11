'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Zap, 
  Clock, 
  Palette, 
  BarChart3, 
  Shield, 
  Star,
  Bot,
  FileText,
  Globe,
  TrendingUp,
  Users,
  CheckCircle,
  Sparkles
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

const mainFeatures = [
  {
    icon: Sparkles,
    title: 'AI Insights',
    description: 'Every report includes actionable AI-generated recommendations and strategic insights tailored to your client\'s specific SEO performance.',
    color: 'text-purple-600 bg-purple-100',
    details: ['AI-generated recommendations', 'Strategic action items', 'Performance insights']
  },
  {
    icon: Zap,
    title: 'Automated Reporting',
    description: 'Generate professional SEO reports automatically by pulling and formatting data from Google Search Console and Analytics.',
    color: 'text-yellow-600 bg-yellow-100',
    details: ['Automated data collection', 'Professional formatting', 'Clean data presentation']
  },
  {
    icon: Clock,
    title: 'Save 95% of Your Time',
    description: 'Reduce report creation time from hours to minutes with our streamlined automation process.',
    color: 'text-blue-600 bg-blue-100',
    details: ['Report generation in minutes', 'Scheduled automated reports', 'Bulk client processing']
  },
  {
    icon: Palette,
    title: 'White-Label Branding',
    description: 'Beautifully designed PDF reports that showcase your brand and client data professionally.',
    color: 'text-purple-600 bg-purple-100',
    details: ['Custom logo integration', 'Brand color customization', 'Professional layouts']
  },
  {
    icon: BarChart3,
    title: 'Data Aggregation',
    description: 'Pulls comprehensive SEO metrics from Google Search Console, Analytics 4, and PageSpeed Insights into one report.',
    color: 'text-green-600 bg-green-100',
    details: ['Multi-source data integration', 'Clean data formatting', 'Professional presentation']
  },
  {
    icon: Shield,
    title: 'Secure Connections',
    description: 'Bank-level security with OAuth2 Google authentication and encrypted data storage.',
    color: 'text-red-600 bg-red-100',
    details: ['OAuth2 Google authentication', 'Encrypted data storage', 'Secure API connections']
  },
  {
    icon: Star,
    title: 'Client-Ready Reports',
    description: 'Professional reports that present your client\'s SEO data in a clear, branded format that saves hours of manual work.',
    color: 'text-brand-600 bg-brand-100',
    details: ['Executive summaries', 'Visual data presentations', 'Key metrics highlighted']
  }
]

const additionalFeatures = [
  {
    icon: Bot,
    title: 'Data Compilation',
    description: 'Automatically compiles your SEO data from multiple sources and presents it in a professional format.'
  },
  {
    icon: FileText,
    title: 'PDF Export',
    description: 'Download professional PDF reports that you can send directly to clients.'
  },
  {
    icon: Globe,
    title: 'Multi-Domain Support',
    description: 'Manage unlimited clients and domains from a single dashboard.'
  },
  {
    icon: TrendingUp,
    title: 'Performance Tracking',
    description: 'Track keyword rankings, traffic trends, and SEO improvements over time.'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share reports with team members and collaborate on SEO strategies.'
  },
  {
    icon: CheckCircle,
    title: 'Quality Assurance',
    description: 'Automated data validation ensures accurate and reliable reporting.'
  }
]

export default function FeaturesPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-brand-50 to-white">
          <Container className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Typography variant="h1" className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6">
                Everything You Need for
                <span className="text-brand-600 block">Professional SEO Reporting</span>
              </Typography>
              <Typography variant="body" className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
                Reportr pulls data from Google Search Console and Analytics, then formats it into 
                professional reports that save you hours of manual work.
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 text-lg font-semibold"
                  onClick={() => router.push('/pricing')}
                >
                  Start Free Trial
                </Button>
                <Link href="/pricing">
                  <Button 
                    variant="secondary"
                    className="px-8 py-4 text-lg font-semibold"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Main Features Grid */}
        <section className="py-20 bg-white">
          <Container className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Typography variant="h2" className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Core Features
              </Typography>
              <Typography variant="body" className="text-xl text-neutral-600">
                Built specifically for SEO freelancers and growing agencies who need to present client 
                SEO data professionally without spending hours on formatting.
              </Typography>
            </div>

            <div className="max-w-6xl mx-auto">
              <Grid cols={1} gap="lg" className="lg:grid-cols-2">
                {mainFeatures.map((feature, index) => (
                  <Card 
                    key={index} 
                    className="p-8 hover:shadow-lg transition-all duration-300 border border-neutral-200 bg-white group"
                  >
                    {/* Icon */}
                    <div className={cn(
                      'w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110',
                      feature.color
                    )}>
                      <Icon 
                        icon={feature.icon} 
                        size="lg" 
                        className="transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <Typography variant="h3" className="text-xl font-semibold text-neutral-900 mb-3">
                      {feature.title}
                    </Typography>
                    <Typography variant="body" className="text-neutral-600 leading-relaxed mb-4">
                      {feature.description}
                    </Typography>

                    {/* Feature Details */}
                    <ul className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-sm text-neutral-600">
                          <CheckCircle className="w-4 h-4 text-brand-600 mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </Grid>
            </div>
          </Container>
        </section>

        {/* Additional Features */}
        <section className="py-20 bg-neutral-50">
          <Container className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Typography variant="h2" className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Additional Capabilities
              </Typography>
              <Typography variant="body" className="text-xl text-neutral-600">
                More features to help you deliver exceptional SEO reporting services.
              </Typography>
            </div>

            <div className="max-w-6xl mx-auto">
              <Grid cols={1} gap="lg" className="sm:grid-cols-2 lg:grid-cols-3">
                {additionalFeatures.map((feature, index) => (
                  <Card 
                    key={index} 
                    className="p-6 text-center hover:shadow-lg transition-all duration-300 border border-neutral-200 bg-white group"
                  >
                    {/* Icon */}
                    <div className="mx-auto w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                      <Icon 
                        icon={feature.icon} 
                        size="md" 
                        className="text-brand-600"
                      />
                    </div>

                    {/* Content */}
                    <Typography variant="h3" className="text-lg font-semibold text-neutral-900 mb-3">
                      {feature.title}
                    </Typography>
                    <Typography variant="body" className="text-neutral-600 text-sm leading-relaxed">
                      {feature.description}
                    </Typography>
                  </Card>
                ))}
              </Grid>
            </div>
          </Container>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <Container className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Typography variant="h2" className="text-3xl lg:text-4xl font-bold text-neutral-900 text-center mb-16">
                Trusted by Growing Agencies
              </Typography>
              
              <Grid cols={1} gap="lg" className="sm:grid-cols-3 text-center">
                <div>
                  <Typography variant="h2" className="text-4xl font-bold text-brand-600 mb-2">
                    95%
                  </Typography>
                  <Typography variant="body" className="text-neutral-600">
                    Time Saved on Reporting
                  </Typography>
                </div>
                <div>
                  <Typography variant="h2" className="text-4xl font-bold text-brand-600 mb-2">
                    3 min
                  </Typography>
                  <Typography variant="body" className="text-neutral-600">
                    Average Report Generation
                  </Typography>
                </div>
                <div>
                  <Typography variant="h2" className="text-4xl font-bold text-brand-600 mb-2">
                    99.9%
                  </Typography>
                  <Typography variant="body" className="text-neutral-600">
                    Uptime Reliability
                  </Typography>
                </div>
              </Grid>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-brand-600">
          <Container className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Typography variant="h2" className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Transform Your SEO Reporting?
              </Typography>
              <Typography variant="body" className="text-xl text-brand-100 mb-8">
                Join SEO freelancers and agencies saving time and impressing clients with professional SEO reports.
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-white text-brand-600 hover:bg-brand-50 px-8 py-4 text-lg font-semibold"
                  onClick={() => router.push('/pricing')}
                >
                  Start Free Trial
                </Button>
                <Link href="/how-it-works">
                  <Button 
                    variant="ghost"
                    className="text-white border-white hover:bg-brand-700 px-8 py-4 text-lg font-semibold"
                  >
                    See How It Works
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  )
}
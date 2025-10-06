'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  Icon, 
  Logo,
  Flex,
  Spacer 
} from '@/components/atoms'
import { NavigationBar } from '@/components/organisms'
import { 
  Zap, 
  Clock, 
  Users, 
  BarChart3, 
  CheckCircle, 
  ArrowRight,
  Star,
  Shield
} from 'lucide-react'

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Client-side redirect for authenticated users
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard')
    }
  }, [session, status, router])

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600 mx-auto mb-4"></div>
          <Typography variant="body">Loading...</Typography>
        </div>
      </div>
    )
  }

  // Don't render marketing page if user is authenticated (will redirect)
  if (status === 'authenticated') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Typography variant="body">Redirecting to dashboard...</Typography>
        </div>
      </div>
    )
  }

  const features = [
    {
      icon: Zap,
      title: 'Automated Reports',
      description: 'Generate professional SEO reports automatically with just a few clicks'
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Reduce report creation time from hours to minutes'
    },
    {
      icon: Users,
      title: 'White-Label Ready',
      description: 'Fully customizable branding to match your agency'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive SEO metrics and insights'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime'
    },
    {
      icon: Star,
      title: 'Client-Ready',
      description: 'Professional reports your clients will love'
    }
  ]

  const benefits = [
    'Generate reports 10x faster than manual methods',
    'Professional templates designed for agencies',
    'Full white-label customization',
    'Automated data collection and analysis',
    'Client portal access',
    'Priority support and training'
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <NavigationBar />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-brand-50 to-neutral-50">
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Typography variant="h1" className="text-5xl sm:text-6xl font-bold text-neutral-900 mb-6">
              Professional SEO Reports
              <br />
              <span className="text-brand-600">Made Simple</span>
            </Typography>
            
            <Typography variant="h2" className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Generate stunning, white-label SEO reports for your clients in minutes, not hours. 
              Perfect for digital marketing agencies who value their time.
            </Typography>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-4 text-lg" onClick={() => router.push('/signin')}>
                Start Free Trial
                <Icon icon={ArrowRight} size="sm" className="ml-2" />
              </Button>
              <Button variant="secondary" size="lg" className="px-8 py-4 text-lg">
                Watch Demo
              </Button>
            </div>

            <Typography variant="caption" className="text-neutral-500 mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </Typography>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Typography variant="h2" className="text-3xl font-bold text-neutral-900 mb-4">
              Everything You Need to Impress Your Clients
            </Typography>
            <Typography variant="body" className="text-xl text-neutral-600">
              Built specifically for digital marketing agencies who need professional, 
              branded reports without the hassle.
            </Typography>
          </div>

          <Grid cols={1} gap="lg" className="sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="mx-auto w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mb-6">
                  <Icon 
                    icon={feature.icon} 
                    size="lg" 
                    className="text-brand-600"
                  />
                </div>
                <Typography variant="h3" className="text-xl font-semibold text-neutral-900 mb-4">
                  {feature.title}
                </Typography>
                <Typography variant="body" className="text-neutral-600">
                  {feature.description}
                </Typography>
              </Card>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-neutral-50">
        <Container className="px-4 sm:px-6 lg:px-8">
          <Grid cols={1} gap="xl" className="lg:grid-cols-2 items-center">
            {/* Content */}
            <div>
              <Typography variant="h2" className="text-3xl font-bold text-neutral-900 mb-6">
                Why Agencies Choose Reportr
              </Typography>
              
              <Typography variant="body" className="text-lg text-neutral-600 mb-8">
                Join hundreds of agencies who have transformed their reporting process 
                and impressed their clients with professional, branded SEO reports.
              </Typography>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <Flex key={index} align="center" className="space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Icon icon={CheckCircle} size="sm" className="text-green-600" />
                    </div>
                    <Typography variant="body" className="text-neutral-700">
                      {benefit}
                    </Typography>
                  </Flex>
                ))}
              </div>

              <Spacer size="lg" />

              <Button size="xl" className="px-12 py-6 text-lg font-semibold" onClick={() => router.push('/signin')}>
                Get Started Today
                <Icon icon={ArrowRight} size="md" className="ml-3" />
              </Button>
            </div>

            {/* Visual */}
            <div className="relative">
              <Card className="p-8 shadow-xl">
                <div className="space-y-4">
                  <div className="h-4 bg-brand-200 rounded w-3/4"></div>
                  <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                  <div className="h-32 bg-gradient-to-br from-brand-100 to-brand-200 rounded"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-16 bg-green-100 rounded"></div>
                    <div className="h-16 bg-brand-100 rounded"></div>
                    <div className="h-16 bg-purple-100 rounded"></div>
                  </div>
                  <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
                </div>
              </Card>
            </div>
          </Grid>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-600 text-white">
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Typography variant="h2" className="text-3xl font-bold mb-4">
              Ready to Transform Your Reporting?
            </Typography>
            
            <Typography variant="body" className="text-xl text-brand-100 mb-8">
              Join hundreds of agencies saving time and impressing clients with 
              professional SEO reports.
            </Typography>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="px-8 py-4 text-lg" onClick={() => router.push('/signin')}>
                Start Free Trial
              </Button>
              <Button variant="ghost" size="lg" className="px-8 py-4 text-lg text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>

            <Typography variant="caption" className="text-brand-200 mt-4">
              14-day free trial • No setup fees • Cancel anytime
            </Typography>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-neutral-900 text-white">
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Logo 
              size="sm" 
              variant="white"
              className="mx-auto mb-4"
              fallback={
                <div className="text-brand-400 text-xl font-bold">
                  Reportr
                </div>
              }
            />
            <Typography variant="caption" className="text-neutral-400">
              © 2024 Reportr. Professional SEO reporting for digital marketing agencies.
            </Typography>
          </div>
        </Container>
      </footer>
    </div>
  )
}
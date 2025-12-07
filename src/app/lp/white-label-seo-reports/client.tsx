'use client'

import React, { Suspense } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PayPalSubscribeButton } from '@/components/molecules/PayPalSubscribeButton'
import { Check, X } from 'lucide-react'

function WhiteLabelSEOReportsContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Preserve UTM parameters
  const utmParams = {
    utm_source: searchParams.get('utm_source'),
    utm_medium: searchParams.get('utm_medium'),
    utm_campaign: searchParams.get('utm_campaign'),
    utm_content: searchParams.get('utm_content'),
    utm_term: searchParams.get('utm_term'),
  }

  // Handle authentication for FREE plan
  const handleFreeAuth = () => {
    if (session) {
      router.push('/dashboard')
    } else {
      if (typeof window !== 'undefined') {
        document.cookie = `signupIntent=FREE; path=/; max-age=1800; SameSite=Lax`
        console.log('📝 Set signupIntent cookie = FREE')
      }
      signIn('google', { callbackUrl: '/dashboard?flow=free' })
    }
  }

  // Pricing plans - matching the pricing page structure
  const tiers = [
    {
      name: 'STARTER',
      basePrice: 29,
      period: 'month',
      description: 'Perfect for freelancers',
      clients: 5,
      reports: 25,
      features: [
        'Up to 5 clients',
        '25 reports per month',
        'Advanced SEO analytics',
        'Google Search Console',
        'Google Analytics 4',
        'PageSpeed Insights',
        'White-label branding included',
        'Custom logo, colors & company name',
        { text: 'AI Insights', badge: 'Coming Soon' },
        'Priority email support (24hrs)'
      ],
      cta: 'Start 14-Day Trial',
      ctaLink: '/subscribe?plan=starter',
      popular: true, // STARTER IS MOST POPULAR for this landing page
      canAddWhiteLabel: false
    },
    {
      name: 'PROFESSIONAL',
      basePrice: 59,
      period: 'month',
      description: 'For growing agencies',
      clients: 15,
      reports: 75,
      features: [
        'Up to 15 clients',
        '75 reports per month',
        'Everything in Starter',
        'White-label branding included',
        'Custom logo, colors & company name',
        'PageSpeed Insights',
        { text: 'AI Insights', badge: 'Coming Soon' },
        'Priority support',
        'Advanced analytics'
      ],
      cta: 'Start 14-Day Trial',
      ctaLink: '/subscribe?plan=professional',
      popular: false,
      canAddWhiteLabel: false
    },
    {
      name: 'AGENCY',
      basePrice: 99,
      period: 'month',
      description: 'For large agencies',
      clients: 50,
      reports: 250,
      features: [
        'Up to 50 clients',
        '250 reports per month',
        'Everything in Professional',
        'White-label branding included',
        'Custom logo, colors & company name',
        'PageSpeed Insights',
        { text: 'AI Insights', badge: 'Coming Soon' },
        { text: 'Custom Domain', badge: 'Coming Soon' },
        'Dedicated account manager',
        'Priority support',
        '99.9% uptime SLA',
        'White-glove onboarding'
      ],
      cta: 'Start 14-Day Trial',
      ctaLink: '/subscribe?plan=agency',
      popular: false,
      canAddWhiteLabel: false
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#7e23ce] to-[#6b1fad] text-white py-16 px-5 md:py-24 overflow-hidden">
        {/* Skewed bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-white transform -skew-y-3 translate-y-12"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/40 text-green-200 px-5 py-2 rounded-full text-sm font-semibold mb-6">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="9" r="8"/>
                  <path d="M9 5v4l2.5 2.5"/>
                </svg>
                Save 8+ hours every week
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
                White-Label SEO Reports in{' '}
                <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                  30 Seconds
                </span>
              </h1>
              
              <p className="text-xl opacity-95 mb-8 leading-relaxed">
                Stop wasting hours on manual reporting. Connect your clients&apos; Google APIs once, and download beautiful, branded PDF reports forever.
              </p>
              
              <button
                onClick={handleFreeAuth}
                disabled={status === 'loading'}
                className="inline-flex items-center gap-3 bg-white text-[#6b1fad] px-11 py-5 text-lg font-bold rounded-xl hover:transform hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-3xl"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                {status === 'loading' ? 'Loading...' : 'Start Free Trial'}
              </button>
              
              <div className="mt-5 flex flex-wrap gap-6 text-sm opacity-90">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  No setup fees
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  14-day full access
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Cancel anytime
                </span>
              </div>
            </div>
            
            {/* Report Preview */}
            <div className="relative mt-10 lg:mt-0">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform lg:perspective-1000 lg:rotate-y-5 max-w-md lg:max-w-none mx-auto">
                {/* Report Header */}
                <div className="bg-gradient-to-r from-[#8B5CF6] to-[#7e23ce] p-6 text-white">
                  <div className="flex justify-between items-center mb-4">
                    <div className="bg-white text-[#7e23ce] px-4 py-2 rounded-lg font-bold text-sm">
                      Your Agency
                    </div>
                    <span className="text-xs opacity-90">December 2025</span>
                  </div>
                  <div className="text-xl font-bold">SEO Performance Report</div>
                </div>
                
                {/* Report Body */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    {[
                      { value: '24.5K', label: 'Total Clicks', change: '↑ 18.2%' },
                      { value: '892K', label: 'Impressions', change: '↑ 24.7%' },
                      { value: '12.4', label: 'Avg Position', change: '↑ 2.1' },
                      { value: '92', label: 'Mobile Score', change: '↑ 8 pts' },
                    ].map((metric, i) => (
                      <div key={i} className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-extrabold text-[#7e23ce]">{metric.value}</div>
                        <div className="text-xs text-gray-500 mt-1">{metric.label}</div>
                        <div className="text-xs text-green-500 font-semibold">{metric.change}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#f5f0ff] to-[#ede5ff] border-l-4 border-[#8B5CF6] p-4 rounded-r-lg">
                    <div className="text-xs font-bold text-[#7e23ce] uppercase tracking-wide mb-1">
                      💡 AI RECOMMENDATION
                    </div>
                    <div className="text-sm text-gray-700">
                      Your &ldquo;SEO services&rdquo; keyword improved 4 positions. Consider adding internal links to boost it to page 1.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Before/After Section */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            From 8 Hours to 30 Seconds
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-14">
            See how agencies like yours are transforming their reporting workflow.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Before */}
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 p-8 rounded-2xl">
              <span className="inline-block bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold mb-5">
                Before Reportr
              </span>
              <h3 className="text-2xl font-bold text-gray-600 mb-5">Manual Reporting Hell</h3>
              <ul className="space-y-4">
                {[
                  'Log into GSC, GA4, PageSpeed separately',
                  'Copy data into Word or Canva',
                  'Format charts and tables manually',
                  'Write recommendations from scratch',
                  'Add branding to each report',
                  'Repeat for every client, every month'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Arrow */}
            <div className="flex justify-center">
              <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#8B5CF6] transform md:rotate-0 rotate-90">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            
            {/* After */}
            <div className="bg-gradient-to-br from-[#f5f0ff] to-[#ede5ff] border-2 border-[#c4adff] p-8 rounded-2xl shadow-lg">
              <span className="inline-block bg-[#8B5CF6] text-white px-4 py-2 rounded-full text-sm font-semibold mb-5">
                With Reportr
              </span>
              <h3 className="text-2xl font-bold text-[#6b1fad] mb-5">One-Click Automation</h3>
              <ul className="space-y-4">
                {[
                  'Connect APIs once (takes 2 minutes)',
                  'Click "Generate Report"',
                  'Beautiful charts created automatically',
                  'AI writes personalized recommendations',
                  'Your branding applied everywhere',
                  'Download PDF in 30 seconds'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-14">
            Three simple steps to automated reporting. No technical skills required.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                number: '1',
                title: 'Connect Google APIs',
                description: "Link your clients&apos; Search Console, Analytics, and we&apos;ll fetch PageSpeed automatically. One-time setup per client.",
                time: '⏱️ 2 minutes'
              },
              {
                number: '2',
                title: 'Add Your Branding',
                description: "Upload your logo, choose your colors, and every report will look like it came from your agency.",
                time: '⏱️ 1 minute'
              },
              {
                number: '3',
                title: 'Generate Reports',
                description: "Click one button. Get a professional PDF with metrics, charts, and AI recommendations. Done.",
                time: '⏱️ 30 seconds'
              }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#7e23ce] text-white text-2xl font-extrabold rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <span className="inline-block bg-green-100 text-green-500 px-3 py-1 rounded-full text-sm font-semibold">
                  {step.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Everything You Need. Nothing You Don&apos;t.
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Built specifically for SEO agencies who want speed and simplicity.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '📊',
                title: 'Google Search Console Data',
                description: 'Clicks, impressions, CTR, positions, top keywords, and top pages—all automatically pulled.'
              },
              {
                icon: '📈',
                title: 'Google Analytics 4',
                description: 'Users, sessions, bounce rate, and organic traffic trends. Filtered to organic only.'
              },
              {
                icon: '⚡',
                title: 'PageSpeed Insights',
                description: 'Mobile and desktop scores, Core Web Vitals, and performance recommendations.'
              },
              {
                icon: '🤖',
                title: 'AI Recommendations',
                description: 'Every report includes actionable insights generated by AI. Not just data—actual advice.'
              },
              {
                icon: '🏷️',
                title: 'White-Label Branding',
                description: 'Your logo, your colors, your agency name. No "Powered by" badges unless you want them.'
              },
              {
                icon: '📄',
                title: 'Professional PDFs',
                description: 'Download beautiful, client-ready PDF reports. Print-quality layouts that impress.'
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 border border-gray-200 rounded-2xl hover:border-[#c4adff] hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl mb-5">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section - Using EXACT same logic as pricing page */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Simple, Honest Pricing
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            No hidden fees. No annual contracts. Cancel anytime.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map((tier) => {
              const finalPrice = tier.basePrice
              
              return (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl border-2 p-8 bg-white ${
                    tier.popular
                      ? 'border-purple-600 shadow-xl scale-105'
                      : 'border-gray-200'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-gray-600 text-sm">{tier.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold">${finalPrice}</span>
                      <span className="text-gray-600 ml-2">/{tier.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, i) => {
                      const isObject = typeof feature === 'object'
                      const featureText = isObject ? feature.text : feature
                      const badge = isObject ? feature.badge : null
                      
                      return (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 flex-1">
                            {featureText}
                            {badge && (
                              <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                                {badge}
                              </span>
                            )}
                          </span>
                        </li>
                      )
                    })}
                  </ul>

                  {/* BUTTONS - Using exact same logic as pricing page */}
                  {tier.name === 'STARTER' ? (
                    <div className="space-y-3">
                      {/* STARTER: Trial Button - HARDCODED */}
                      <PayPalSubscribeButton
                        planId={'P-0X464499YG9822634NEQJ5XQ'}
                        planName="STARTER"
                        plan="STARTER"
                        price={finalPrice}
                        isTrial={true}
                      />
                      
                      {/* STARTER: Subscribe Button - HARDCODED */}
                      <PayPalSubscribeButton
                        planId={'P-6PJ50716H4431863PNEQKBLQ'}
                        planName="STARTER"
                        plan="STARTER"
                        price={finalPrice}
                      />
                    </div>
                  ) : tier.name === 'PROFESSIONAL' ? (
                    <div className="space-y-3">
                      {/* PROFESSIONAL: Trial Button - HARDCODED */}
                      <PayPalSubscribeButton
                        planId={'P-09P26662R8680522DNEQJ7XY'}
                        planName="PROFESSIONAL"
                        plan="PROFESSIONAL"
                        price={finalPrice}
                        isTrial={true}
                      />
                      
                      {/* PROFESSIONAL: Subscribe Button - HARDCODED */}
                      <PayPalSubscribeButton
                        planId={'P-90W906144W5364313NEQKB5I'}
                        planName="PROFESSIONAL"
                        plan="PROFESSIONAL"
                        price={finalPrice}
                      />
                    </div>
                  ) : tier.name === 'AGENCY' ? (
                    <div className="space-y-3">
                      {/* AGENCY: Trial Button - HARDCODED */}
                      <PayPalSubscribeButton
                        planId={'P-7SU477161L382370MNEQKCQQ'}
                        planName="AGENCY"
                        plan="AGENCY"
                        price={finalPrice}
                        isTrial={true}
                      />
                      
                      {/* AGENCY: Subscribe Button - HARDCODED */}
                      <PayPalSubscribeButton
                        planId={'P-0KW62605U4011430FNEQKDCY'}
                        planName="AGENCY"
                        plan="AGENCY"
                        price={finalPrice}
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* FALLBACK: Any remaining plans */}
                      <a
                        href={tier.ctaLink}
                        className="block w-full text-center px-6 py-3 rounded-lg font-semibold transition border-2 border-purple-600 text-purple-600 bg-white hover:bg-purple-50"
                      >
                        Start 14-Day Trial
                      </a>
                      
                      <a
                        href={tier.ctaLink}
                        className="block w-full text-center px-6 py-3 rounded-lg font-semibold transition bg-purple-600 text-white hover:bg-purple-700"
                      >
                        Subscribe to {tier.name} - ${finalPrice}/month
                      </a>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* Founder Testimonial */}
      <section className="py-20 px-5 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-gray-900">
            Built to Solve Our Own Problem
          </h2>
          
          <div className="bg-gray-50 p-12 rounded-2xl">
            <blockquote className="text-xl md:text-2xl italic text-gray-700 mb-6 leading-relaxed">
              &ldquo;I built Reportr because I was spending every Tuesday afternoon creating reports in Word and Canva. 6+ hours of copying data, formatting charts, and writing the same recommendations. There had to be a better way—so I built one.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#a67fff] to-[#7e23ce] rounded-full flex items-center justify-center text-white font-bold text-xl">
                SF
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Sebastian</h4>
                <p className="text-sm text-gray-500">Founder, Reportr</p>
              </div>
            </div>
          </div>
          
          <p className="mt-8 text-gray-500">
            We&apos;re a new tool built by an agency owner who understands your pain. <br />
            Try it free and see if it solves yours too.
          </p>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20 px-5 bg-gradient-to-br from-[#7e23ce] to-[#5a1d8a] text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Generate Your First Report in 5 Minutes
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join agencies saving 8+ hours every week on SEO reporting. No setup fees, no annual contracts.
          </p>
          
          <button
            onClick={handleFreeAuth}
            disabled={status === 'loading'}
            className="inline-flex items-center gap-3 bg-white text-[#6b1fad] px-11 py-5 text-lg font-bold rounded-xl hover:transform hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-3xl"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            {status === 'loading' ? 'Loading...' : 'Start Free Trial'}
          </button>
          
          <div className="mt-6 flex items-center justify-center gap-3 text-sm opacity-90">
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            14-day free trial • Full features • Cancel anytime
          </div>
        </div>
      </section>
      
      {/* Minimal Footer */}
      <footer className="py-10 px-5 bg-gray-900 text-gray-400 text-center text-sm">
        <p>&copy; 2025 Reportr. White-label SEO reporting for agencies.</p>
        <p className="mt-2">
          <a href="/privacy" className="text-gray-300 hover:text-white">Privacy</a> •{' '}
          <a href="/terms" className="text-gray-300 hover:text-white">Terms</a> •{' '}
          <a href="/" className="text-gray-300 hover:text-white">Visit Website</a>
        </p>
      </footer>
    </div>
  )
}

export default function WhiteLabelSEOReportsClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <WhiteLabelSEOReportsContent />
    </Suspense>
  )
}
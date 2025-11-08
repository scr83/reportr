'use client'

import React, { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Header, Footer } from '@/components/landing'
import { Check, X } from 'lucide-react'
import { PayPalSubscribeButton } from '@/components/molecules/PayPalSubscribeButton'

// Helper component for brand mentions
const BrandLink = ({ children }: { children: React.ReactNode }) => (
  <a href="/" className="font-bold hover:text-purple-700 transition">
    {children}
  </a>
)

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your agency. All plans include unlimited report generation, 
              white-label customization, and priority support.
            </p>
          </div>

          {/* Pricing Tiers */}
          <PricingTiers />

          {/* Feature Comparison Table */}
          <FeatureComparison />

          {/* FAQ Section */}
          <FAQ />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

// Pricing tier cards component
function PricingTiers() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  // State for white-label checkboxes
  const [whiteLabelEnabled, setWhiteLabelEnabled] = useState<{[key: string]: boolean}>({
    starter: false,
    professional: false,
    enterprise: false
  })


  // Handle authentication for FREE plan
  const handleFreeAuth = () => {
    if (session) {
      router.push('/dashboard')
    } else {
      signIn('google', { callbackUrl: '/dashboard?flow=free' })
    }
  }

  const tiers = [
    {
      name: 'FREE',
      basePrice: 0,
      whiteLabelPrice: 0,
      period: 'forever',
      description: 'Perfect for trying out Reportr',
      clients: 1,
      reports: 5,
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
      ctaLink: '/auth/signin',
      popular: false,
      canAddWhiteLabel: false
    },
    {
      name: 'STARTER',
      basePrice: 29,
      whiteLabelPrice: 20,
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
        { text: 'AI Insights', badge: 'Coming Soon' },
        'Custom branding (for white label users)',
        'Custom report templates',
        'Priority email support (24hrs)',
        'API access'
      ],
      cta: 'Start 14-Day Trial',
      ctaLink: whiteLabelEnabled.starter 
        ? '/subscribe?plan=starter-whitelabel'
        : '/subscribe?plan=starter',
      popular: true, // STARTER IS MOST POPULAR
      canAddWhiteLabel: true
    },
    {
      name: 'PROFESSIONAL',
      basePrice: 99,
      whiteLabelPrice: 20,
      period: 'month',
      description: 'For growing agencies',
      clients: 15,
      reports: 75,
      features: [
        'Up to 15 clients',
        '75 reports per month',
        'Everything in Starter',
        'PageSpeed Insights',
        { text: 'AI Insights', badge: 'Coming Soon' },
        'Custom report templates',
        'Priority support',
        'Team collaboration',
        'Advanced analytics'
      ],
      cta: 'Start 14-Day Trial',
      ctaLink: whiteLabelEnabled.professional
        ? '/subscribe?plan=professional-whitelabel'
        : '/subscribe?plan=professional',
      popular: false,
      canAddWhiteLabel: true
    },
    {
      name: 'AGENCY',
      basePrice: 199,
      whiteLabelPrice: 20,
      period: 'month',
      description: 'For large agencies',
      clients: 50,
      reports: 250,
      features: [
        'Up to 50 clients',
        '250 reports per month',
        'Everything in Professional',
        'PageSpeed Insights',
        { text: 'AI Insights', badge: 'Coming Soon' },
        { text: 'Custom Domain', badge: 'Coming Soon' },
        'Dedicated account manager',
        'Custom integrations',
        'Priority support',
        '99.9% uptime SLA',
        'White-glove onboarding'
      ],
      cta: 'Start 14-Day Trial',
      ctaLink: whiteLabelEnabled.agency
        ? '/subscribe?plan=agency-whitelabel'
        : '/subscribe?plan=agency',
      popular: false,
      canAddWhiteLabel: true
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
      {tiers.map((tier) => {
        const finalPrice = tier.basePrice + (
          tier.canAddWhiteLabel && whiteLabelEnabled[tier.name.toLowerCase()]
            ? tier.whiteLabelPrice
            : 0
        )
        
        return (
          <div
            key={tier.name}
            className={`relative rounded-2xl border-2 p-8 ${
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
                // Handle both string and object features
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

            {/* White-Label Add-On Checkbox */}
            {tier.canAddWhiteLabel && (
              <div className="mb-6 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={whiteLabelEnabled[tier.name.toLowerCase()]}
                    onChange={(e) => setWhiteLabelEnabled({
                      ...whiteLabelEnabled,
                      [tier.name.toLowerCase()]: e.target.checked
                    })}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-purple-900">
                      Add White-Label Branding
                    </span>
                    <p className="text-xs text-purple-700">
                      +$20/month - Replace all <BrandLink>Reportr</BrandLink> branding with yours
                    </p>
                  </div>
                </label>
              </div>
            )}

            {/* BUTTONS */}
            {tier.name === 'FREE' ? (
              <button
                onClick={handleFreeAuth}
                disabled={status === 'loading'}
                className="block w-full text-center px-6 py-3 rounded-lg font-semibold transition bg-gray-900 text-white hover:bg-gray-800"
              >
                {status === 'loading' ? 'Loading...' : 'Start Free'}
              </button>
            ) : tier.name === 'STARTER' ? (
              <div className="space-y-3">
                {/* STARTER: Trial Button */}
                <PayPalSubscribeButton
                  planId={(whiteLabelEnabled.starter ?? false)
                    ? process.env.NEXT_PUBLIC_PAYPAL_STARTER_WL_TRIAL_PLAN_ID || 'P-91W2526908999423DNEDY5TQ'
                    : process.env.NEXT_PUBLIC_PAYPAL_STARTER_TRIAL_PLAN_ID || 'P-0SN795424D608834YNEDY4UY'
                  }
                  planName="STARTER"
                  price={finalPrice}
                  isTrial={true}
                />
                
                {/* STARTER: Subscribe Button */}
                <PayPalSubscribeButton
                  planId={(whiteLabelEnabled.starter ?? false)
                    ? process.env.NEXT_PUBLIC_PAYPAL_STARTER_WL_PLAN_ID || 'P-2YF10717TE559492JND4NS5Y'
                    : process.env.NEXT_PUBLIC_PAYPAL_STARTER_PLAN_ID || 'P-09S98046PD2685338ND3AO4Q'
                  }
                  planName="STARTER"
                  price={finalPrice}
                />
              </div>
            ) : tier.name === 'PROFESSIONAL' ? (
              <div className="space-y-3">
                {/* PROFESSIONAL: Trial Button */}
                <PayPalSubscribeButton
                  planId={(whiteLabelEnabled.professional ?? false)
                    ? process.env.NEXT_PUBLIC_PAYPAL_PRO_WL_TRIAL_PLAN_ID || 'P-9G486628TV699383DNEDY67Q'
                    : process.env.NEXT_PUBLIC_PAYPAL_PRO_TRIAL_PLAN_ID || 'P-9LW168698M465441PNEDY6KQ'
                  }
                  planName="PROFESSIONAL"
                  price={finalPrice}
                  isTrial={true}
                />
                
                {/* PROFESSIONAL: Subscribe Button */}
                <PayPalSubscribeButton
                  planId={(whiteLabelEnabled.professional ?? false)
                    ? process.env.NEXT_PUBLIC_PAYPAL_PRO_WL_PLAN_ID || 'P-7KR93055H1331572DND4NU7I'
                    : process.env.NEXT_PUBLIC_PAYPAL_PRO_PLAN_ID || 'P-9JC023812E1399125ND4NUAY'
                  }
                  planName="PROFESSIONAL"
                  price={finalPrice}
                />
              </div>
            ) : tier.name === 'AGENCY' ? (
              <div className="space-y-3">
                {/* AGENCY: Trial Button */}
                <PayPalSubscribeButton
                  planId={(whiteLabelEnabled.agency ?? false)
                    ? process.env.NEXT_PUBLIC_PAYPAL_AGENCY_WL_TRIAL_PLAN_ID || 'P-4KW51269HY146730FNEDZALI'
                    : process.env.NEXT_PUBLIC_PAYPAL_AGENCY_TRIAL_PLAN_ID || 'P-09W11474GA233304HNEDY7UI'
                  }
                  planName="AGENCY"
                  price={finalPrice}
                  isTrial={true}
                />
                
                {/* AGENCY: Subscribe Button */}
                <PayPalSubscribeButton
                  planId={(whiteLabelEnabled.agency ?? false)
                    ? process.env.NEXT_PUBLIC_PAYPAL_AGENCY_WL_PLAN_ID || 'P-7JJ708823A489180TND4NWVI'
                    : process.env.NEXT_PUBLIC_PAYPAL_AGENCY_PLAN_ID || 'P-6KN07205JA012891NND4NVSI'
                  }
                  planName="AGENCY"
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
  )
}

// Feature comparison table
function FeatureComparison() {
  const features = [
    {
      category: 'Core Features',
      items: [
        { name: 'Client Management', free: true, starter: true, pro: true, enterprise: true },
        { name: 'SEO Reports', free: '5/mo', starter: '25/mo', pro: '75/mo', enterprise: '250/mo' },
        { name: 'Google Search Console', free: true, starter: true, pro: true, enterprise: true },
        { name: 'Google Analytics 4', free: true, starter: true, pro: true, enterprise: true },
        { name: 'PageSpeed Insights', free: true, starter: true, pro: true, enterprise: true },
        { name: 'AI Insights', free: false, starter: 'Coming Soon', pro: 'Coming Soon', enterprise: 'Coming Soon' },
      ]
    },
    {
      category: 'Branding & Customization',
      items: [
        { name: 'Custom Agency Name', free: false, starter: true, pro: true, enterprise: true },
        { name: 'Custom Colors', free: false, starter: true, pro: true, enterprise: true },
        { name: 'White-Label Branding', free: false, starter: '+$20/mo', pro: '+$20/mo', enterprise: '+$20/mo' },
        { name: 'Custom Report Templates', free: false, starter: true, pro: true, enterprise: true },
        { name: 'Custom Domain', free: false, starter: false, pro: false, enterprise: 'Coming Soon' },
      ]
    },
    {
      category: 'Support & Services',
      items: [
        { name: 'Email Support', free: '48hrs', starter: '24hrs', pro: 'Priority', enterprise: 'Priority' },
      ]
    }
  ]

  const renderCell = (value: any) => {
    if (value === true) return <Check className="w-5 h-5 text-green-600 mx-auto" />
    if (value === false) return <X className="w-5 h-5 text-gray-300 mx-auto" />
    
    // Handle "Coming Soon" values
    if (typeof value === 'string' && value.includes('Soon')) {
      return (
        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
          Coming Soon
        </span>
      )
    }
    
    return <span className="text-sm text-gray-700">{value}</span>
  }

  return (
    <div className="mb-24">
      <h2 className="text-3xl font-bold text-center mb-12">
        Compare All Features
      </h2>
      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Features
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Free
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Starter
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600 bg-purple-50">
                  Professional
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Agency
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((category, catIndex) => (
                <React.Fragment key={catIndex}>
                  <tr className="bg-gray-100">
                    <td colSpan={5} className="px-6 py-3 text-sm font-semibold text-gray-900">
                      {category.category}
                    </td>
                  </tr>
                  {category.items.map((item, itemIndex) => (
                    <tr key={itemIndex} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderCell(item.free)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderCell(item.starter)}
                      </td>
                      <td className="px-6 py-4 text-center bg-purple-50">
                        {renderCell(item.pro)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderCell(item.enterprise)}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// FAQ section
function FAQ() {
  const faqs = [
    {
      question: 'Can I change plans at any time?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any charges or credits.'
    },
    {
      question: 'What happens if I exceed my monthly report limit?',
      answer: 'Your reports will be queued until your next billing cycle. Alternatively, you can upgrade to a higher tier to generate reports immediately.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! All paid plans come with a 14-day free trial. A payment method is required to start, but you won\'t be charged for 14 days. You can cancel anytime during the trial with no charges.'
    },
    {
      question: 'How does the white-label add-on work?',
      answer: (
        <span>
          White-label branding is available as a $20/month add-on for any paid plan (Starter, Professional, or Agency). 
          When enabled, you can replace all <BrandLink>Reportr</BrandLink> branding with your agency&apos;s logo, colors, 
          and company name in both the dashboard and generated PDF reports. Simply check the &quot;Add White-Label Branding&quot; 
          box when subscribing.
        </span>
      )
    },
    {
      question: 'What features are "Coming Soon"?',
      answer: (
        <span>
          We&apos;re actively developing <strong>PageSpeed Insights</strong> integration (all plans), 
          <strong> Google Ads</strong>, <strong>Meta Ads</strong>, and <strong>LinkedIn Ads</strong> reporting 
          (Professional+ plans), plus <strong>Custom Domain</strong> hosting (Agency only). 
          These features will be automatically enabled for your plan once released, at no additional cost.
        </span>
      )
    },
    {
      question: 'What is a custom domain?',
      answer: (
        <span>
          Custom domain (Agency only, coming soon) will allow you to host the <BrandLink>Reportr</BrandLink> application 
          on your own domain (e.g., reports.youragency.com) instead of using <BrandLink>reportr.agency</BrandLink>. 
          This provides the ultimate white-label experience for your clients.
        </span>
      )
    },
    {
      question: 'Do you offer annual billing?',
      answer: 'Yes! Annual billing is available with a 20% discount. Contact us at sales@reportr.agency for annual pricing details.'
    },
    {
      question: 'Do all plans include AI insights?',
      answer: 'No, our free forever plan does not include AI Insights. AI insights are only available for paid plans, does not include the free 14-day trial'
    },
    {
      question: 'Can I add more clients to my plan?',
      answer: 'Yes! You can upgrade to a higher tier for more clients, or contact us for custom Agency pricing if you need more than 50 clients.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards via PayPal. Agency customers can also pay via invoice with NET 30 terms.'
    },
    {
      question: 'Is my data secure?',
      answer: (
        <span>
          Yes. We use industry-standard HTTPS encryption (TLS 1.3) for all data transmission and secure 
          PostgreSQL database with encryption at rest. Your Google account data is accessed via OAuth tokens 
          that you can revoke anytime. All reports are private to your account, and we never share your data 
          with third parties. Our infrastructure is hosted on <strong>Vercel</strong>, 
          a SOC 2 Type II certified provider.
        </span>
      )
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription at any time from your account settings. You\'ll retain access until the end of your current billing period.'
    },
    {
      question: 'Do you offer discounts for non-profits or educators?',
      answer: 'Yes! We offer 30% off for qualifying non-profit organizations and educational institutions. Contact us at sales@reportr.agency with proof of status.'
    }
  ]

  return (
    <div className="mb-24">
      <h2 className="text-3xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>
      
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:border-purple-300 transition"
          >
            <summary className="flex justify-between items-center font-semibold text-lg text-gray-900 list-none">
              {faq.question}
              <span className="ml-4 flex-shrink-0 text-purple-600 group-open:rotate-180 transition">
                ▼
              </span>
            </summary>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>

      {/* Still have questions CTA */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">Still have questions?</p>
        <a
          href="mailto:sales@reportr.agency"
          className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  )
}
'use client'

import React from 'react'
import { Header, Footer } from '@/components/landing'
import { Check, X } from 'lucide-react'

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
  const tiers = [
    {
      name: 'FREE',
      price: 0,
      period: 'forever',
      description: 'Perfect for trying out Reportr',
      clients: 1,
      reports: 5,
      features: [
        'Up to 1 client',
        '5 reports per month',
        'Basic SEO metrics',
        'Standard templates',
        'Email support'
      ],
      cta: 'Start Free',
      ctaLink: '/auth/signin',
      popular: false
    },
    {
      name: 'STARTER',
      price: 29,
      period: 'month',
      description: 'For freelancers and small agencies',
      clients: 5,
      reports: 20,
      features: [
        'Up to 5 clients',
        '20 reports per month',
        'Advanced SEO analytics',
        'Custom branding',
        'Priority email support',
        'Google integrations'
      ],
      cta: 'Start 14-Day Trial',
      ctaLink: '/auth/signin?plan=starter',
      popular: false
    },
    {
      name: 'PROFESSIONAL',
      price: 99,
      period: 'month',
      description: 'Most popular for growing agencies',
      clients: 15,
      reports: 75,
      features: [
        'Up to 15 clients',
        '75 reports per month',
        'Everything in Starter',
        'White-label branding (+$20/mo)',
        'API access',
        'Custom report templates',
        'Phone & email support',
        'Team collaboration'
      ],
      cta: 'Start 14-Day Trial',
      ctaLink: '/auth/signin?plan=professional',
      popular: true
    },
    {
      name: 'ENTERPRISE',
      price: 199,
      period: 'month',
      description: 'For large agencies and teams',
      clients: 50,
      reports: 250,
      features: [
        'Up to 50 clients',
        '250 reports per month',
        'Everything in Professional',
        'Dedicated account manager',
        'Custom integrations',
        'SSO & advanced security',
        '99.9% uptime SLA',
        'White-glove onboarding'
      ],
      cta: 'Contact Sales',
      ctaLink: 'mailto:jump@digitalfrog.co',
      popular: false
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
      {tiers.map((tier) => (
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
              <span className="text-5xl font-bold">${tier.price}</span>
              <span className="text-gray-600 ml-2">/{tier.period}</span>
            </div>
          </div>

          <ul className="space-y-3 mb-8">
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href={tier.ctaLink}
            className={`block w-full text-center py-3 rounded-lg font-semibold transition ${
              tier.popular
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            {tier.cta}
          </a>
        </div>
      ))}
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
        { name: 'SEO Reports', free: '5/mo', starter: '20/mo', pro: '75/mo', enterprise: '250/mo' },
        { name: 'Google Search Console', free: true, starter: true, pro: true, enterprise: true },
        { name: 'Google Analytics 4', free: true, starter: true, pro: true, enterprise: true },
        { name: 'PageSpeed Insights', free: true, starter: true, pro: true, enterprise: true },
      ]
    },
    {
      category: 'Branding & Customization',
      items: [
        { name: 'Custom Agency Name', free: false, starter: true, pro: true, enterprise: true },
        { name: 'Custom Colors', free: false, starter: true, pro: true, enterprise: true },
        { name: 'White-Label Branding', free: false, starter: false, pro: '+$20/mo', enterprise: true },
        { name: 'Custom Report Templates', free: false, starter: false, pro: true, enterprise: true },
        { name: 'Custom Domain', free: false, starter: false, pro: false, enterprise: true },
      ]
    },
    {
      category: 'Support & Services',
      items: [
        { name: 'Email Support', free: '48hrs', starter: '24hrs', pro: '12hrs', enterprise: '4hrs' },
        { name: 'Phone Support', free: false, starter: false, pro: true, enterprise: true },
        { name: 'Dedicated Account Manager', free: false, starter: false, pro: false, enterprise: true },
        { name: 'Onboarding Assistance', free: false, starter: true, pro: true, enterprise: 'White-glove' },
        { name: 'SLA', free: false, starter: false, pro: false, enterprise: '99.9%' },
      ]
    },
    {
      category: 'Advanced Features',
      items: [
        { name: 'API Access', free: false, starter: false, pro: true, enterprise: true },
        { name: 'Team Collaboration', free: false, starter: false, pro: true, enterprise: true },
        { name: 'SSO / SAML', free: false, starter: false, pro: false, enterprise: true },
        { name: 'Custom Integrations', free: false, starter: false, pro: false, enterprise: true },
        { name: 'Priority Feature Requests', free: false, starter: false, pro: false, enterprise: true },
      ]
    }
  ]

  const renderCell = (value: any) => {
    if (value === true) return <Check className="w-5 h-5 text-green-600 mx-auto" />
    if (value === false) return <X className="w-5 h-5 text-gray-300 mx-auto" />
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
                  Enterprise
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
      answer: 'Yes! All paid plans come with a 14-day free trial. No credit card required to start. You can cancel anytime during the trial with no charges.'
    },
    {
      question: 'What\'s included in white-label branding?',
      answer: 'White-label branding (+$20/month on Professional plan, included in Enterprise) allows you to replace all Reportr branding with your agency\'s logo, colors, and company name in both the dashboard and generated PDF reports.'
    },
    {
      question: 'Do you offer annual billing?',
      answer: 'Yes! Annual billing is available with a 20% discount. Contact us at jump@digitalfrog.co for annual pricing details.'
    },
    {
      question: 'Can I add more clients to my plan?',
      answer: 'Yes! You can upgrade to a higher tier for more clients, or contact us for custom Enterprise pricing if you need more than 50 clients.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards via PayPal. Enterprise customers can also pay via invoice with NET 30 terms.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use bank-level encryption for all data transmission and storage. All reports are private to your account, and we never share your data with third parties.'
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription at any time from your account settings. You\'ll retain access until the end of your current billing period.'
    },
    {
      question: 'Do you offer discounts for non-profits or educators?',
      answer: 'Yes! We offer 30% off for qualifying non-profit organizations and educational institutions. Contact us at jump@digitalfrog.co with proof of status.'
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
          href="mailto:jump@digitalfrog.co"
          className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  )
}
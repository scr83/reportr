'use client'

import React from 'react'
import { ArrowRight, Check, Shield, CreditCard, CheckCircle, FileText } from 'lucide-react'
import { PayPalSubscribeButton } from '@/components/molecules/PayPalSubscribeButton'

export default function CompetitorAlternativeClient() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#7e23ce] via-[#6b1fad] to-[#5a1d8a] text-white py-16 px-5 md:py-24 text-center overflow-hidden">
        {/* Pattern overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block bg-white/20 border border-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            🚀 The #1 Alternative for Frustrated Agencies
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            Stop Overpaying for{' '}
            <span className="text-amber-400">Complicated</span>{' '}
            SEO Reporting
          </h1>
          
          <p className="text-xl md:text-2xl opacity-95 mb-8 max-w-2xl mx-auto leading-relaxed">
            Generate beautiful, white-label SEO reports in 30 seconds. No learning curve. No bloated features. Just professional PDFs your clients will love.
          </p>
          
          {/* PRIMARY CTA - EXACT STARTER TRIAL FLOW FROM PRICING PAGE */}
          <div className="mb-4">
            <PayPalSubscribeButton
              planId={'P-0X464499YG9822634NEQJ5XQ'}
              planName="STARTER"
              plan="STARTER"
              price={29}
              isTrial={true}
              className="inline-block"
            />
          </div>
          
          <p className="text-sm text-gray-200 opacity-90">
            No charge for 14 days. Cancel anytime during your trial.
          </p>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Sound Familiar?
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            If you&apos;re here, you&apos;ve probably experienced these frustrations with your current tool.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '💸',
                title: 'Paying $150+/month for features you don\'t use',
                description: 'Most enterprise tools charge premium prices for 50+ integrations. But you only need Google Search Console, GA4, and PageSpeed. Why pay for the rest?'
              },
              {
                icon: '😤',
                title: 'Spending hours learning complex dashboards',
                description: 'Training videos, documentation, onboarding calls... You just want to create a report, not get a PhD in dashboard navigation.'
              },
              {
                icon: '⏰',
                title: 'Reports still take 30+ minutes to generate',
                description: '"Automated" tools that require you to manually configure, tweak, and export every single report. That\'s not automation.'
              },
              {
                icon: '🎨',
                title: 'White-labeling that looks... off',
                description: 'Your logo squeezed into a corner. Colors that don\'t match your brand. Reports that scream "we use a third-party tool."'
              },
              {
                icon: '📊',
                title: 'Data overload instead of insights',
                description: '50 charts, 100 metrics, zero actionable recommendations. Your clients want to know what to DO, not stare at numbers.'
              },
              {
                icon: '🔄',
                title: 'Locked into annual contracts',
                description: 'Committed for 12 months before realizing the tool doesn\'t fit your workflow. No refunds, no flexibility.'
              }
            ].map((pain, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 text-2xl">
                  {pain.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{pain.title}</h3>
                <p className="text-gray-600">{pain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Reportr Does One Thing. Perfectly.
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            We don&apos;t try to be everything. We create stunning SEO reports in 30 seconds.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: '⚡',
                title: '30-Second Reports',
                description: 'Connect your client\'s Google APIs once. Generate beautiful PDFs forever. No configuration, no manual work.'
              },
              {
                icon: '🏷️',
                title: 'True White-Label',
                description: 'Your logo. Your colors. Your brand everywhere. No "Powered by" badges unless you want them.'
              },
              {
                icon: '🤖',
                title: 'AI Recommendations',
                description: 'Every report includes intelligent, actionable insights. Not just data—actual recommendations your clients can act on.'
              }
            ].map((solution, i) => (
              <div key={i} className="text-center p-10 bg-gradient-to-br from-purple-50 to-white rounded-3xl border border-purple-100">
                <div className="w-18 h-18 bg-gradient-to-br from-[#8B5CF6] to-[#7e23ce] rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl text-white">
                  {solution.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{solution.title}</h3>
                <p className="text-gray-600 leading-relaxed">{solution.description}</p>
              </div>
            ))}
          </div>

          {/* MID-PAGE CTA */}
          <div className="text-center">
            <PayPalSubscribeButton
              planId={'P-0X464499YG9822634NEQJ5XQ'}
              planName="STARTER"
              plan="STARTER"
              price={29}
              isTrial={true}
              className="inline-block"
            />
            <p className="text-sm text-gray-600 mt-2">
              No charge for 14 days. Cancel anytime during your trial.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            How Reportr Compares
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            A focused tool built for agencies who value simplicity and speed.
          </p>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-6 py-5 text-left font-semibold text-sm uppercase tracking-wider bg-purple-600">Feature</th>
                    <th className="px-6 py-5 text-left font-semibold text-sm uppercase tracking-wider">Reportr</th>
                    <th className="px-6 py-5 text-left font-semibold text-sm uppercase tracking-wider">Enterprise Tools</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Time to generate report', reportr: '30 seconds', enterprise: '30-60 minutes', highlight: true, reportrGood: true },
                    { feature: 'Learning curve', reportr: '5 minutes', enterprise: 'Hours/days', reportrGood: true },
                    { feature: 'Starting price', reportr: '$29/month', enterprise: '$99-199/month', highlight: true, reportrGood: true },
                    { feature: 'White-label branding', reportr: '✓ Full customization', enterprise: '✓ Limited on lower tiers', reportrGood: true },
                    { feature: 'AI-powered insights', reportr: '✓ Every report', enterprise: '✗ Extra cost or none', reportrGood: true },
                    { feature: 'Contract length', reportr: 'Monthly, cancel anytime', enterprise: 'Annual commitment', reportrGood: true },
                    { feature: 'Integrations', reportr: 'GSC, GA4, PageSpeed', enterprise: '50+ (most unused)', reportrGood: false },
                    { feature: 'Focus', reportr: 'SEO reporting excellence', enterprise: 'Everything for everyone', highlight: true, reportrGood: true }
                  ].map((row, i) => (
                    <tr 
                      key={i} 
                      className={`border-b border-gray-100 hover:bg-gray-50 ${row.highlight ? 'bg-purple-50' : ''}`}
                    >
                      <td className="px-6 py-5 font-semibold text-gray-800">{row.feature}</td>
                      <td className={`px-6 py-5 ${row.reportrGood ? 'text-green-600 font-bold' : 'text-gray-700'}`}>
                        {row.reportr}
                      </td>
                      <td className={`px-6 py-5 ${row.reportrGood ? 'text-red-500' : 'text-gray-700'}`}>
                        {row.enterprise}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Built by Agency */}
      <section className="py-20 px-5 bg-white text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            Built by an Agency, for Agencies
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Reportr was created to solve a real problem: spending 8+ hours every week on manual SEO reporting.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'The Problem We Solved',
                content: 'Every Tuesday meant copying data from GSC into Word, formatting charts in Canva, and writing the same recommendations over and over. There had to be a better way.'
              },
              {
                title: 'What We Built', 
                content: 'A tool that does one thing perfectly: generates professional, white-label SEO reports in 30 seconds. No bloat, no complexity, no learning curve.'
              },
              {
                title: 'Try It Yourself',
                content: 'Don\'t take our word for it. Start a free trial and generate your first report in under 5 minutes. See the quality for yourself.'
              }
            ].map((story, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl text-left">
                <h3 className="text-xl font-bold mb-3 text-gray-900">{story.title}</h3>
                <p className="text-gray-600">{story.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Common Questions
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Everything you need to know before switching.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: 'How long does setup take?',
                answer: 'About 5 minutes. Sign up, connect your Google account, add your first client, and generate a report. That\'s it.'
              },
              {
                question: 'Can I import my existing clients?',
                answer: 'You\'ll need to reconnect their Google APIs, but it takes about 60 seconds per client. No data migration needed.'
              },
              {
                question: 'What\'s included in the free trial?',
                answer: 'Everything. Full features for 14 days. No credit card required upfront. No setup fees ever.'
              },
              {
                question: 'Do I need technical skills?',
                answer: 'None. If you can click a button, you can generate a report. We handle all the API connections automatically.'
              },
              {
                question: 'What if I have more than 50 clients?',
                answer: 'Our Agency plan supports up to 50 clients. Need more? Contact us for custom enterprise pricing.'
              },
              {
                question: 'Is there a contract or commitment?',
                answer: 'Nope. Monthly billing, cancel anytime. We earn your business every month.'
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="text-lg font-semibold mb-3 text-gray-900">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-5 bg-gradient-to-br from-[#7e23ce] to-[#5a1d8a] text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Ready to Simplify Your Reporting?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join agencies who&apos;ve already made the switch. Your first report is 5 minutes away.
          </p>
          
          {/* FINAL CTA */}
          <PayPalSubscribeButton
            planId={'P-0X464499YG9822634NEQJ5XQ'}
            planName="STARTER"
            plan="STARTER"
            price={29}
            isTrial={true}
            className="inline-block mb-4"
          />
          
          <p className="text-sm text-gray-200 opacity-90 mb-12">
            No charge for 14 days. Cancel anytime during your trial.
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 opacity-90">
            {[
              { icon: Shield, text: 'SSL Secured' },
              { icon: FileText, text: 'Official Google API Partner' },
              { icon: CheckCircle, text: 'No Setup Fees' },
              { icon: CreditCard, text: 'Cancel Anytime' }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <badge.icon className="w-5 h-5" />
                {badge.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer */}
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
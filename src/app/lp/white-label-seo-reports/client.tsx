'use client'

import React from 'react'
import { Check, ArrowRight } from 'lucide-react'
import { PayPalSubscribeButton } from '@/components/molecules/PayPalSubscribeButton'

export default function WhiteLabelSEOReportsClient() {
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
              
              {/* PRIMARY CTA - EXACT STARTER TRIAL FLOW FROM PRICING PAGE */}
              <div className="mb-4">
                <PayPalSubscribeButton
                  planId={'P-0X464499YG9822634NEQJ5XQ'}
                  planName="STARTER"
                  plan="STARTER"
                  price={29}
                  isTrial={true}
                  className="w-full sm:w-auto"
                />
              </div>
              
              <p className="text-sm text-gray-200 opacity-90 text-center sm:text-left mb-5">
                No charge for 14 days. Cancel anytime during your trial.
              </p>
              
              <div className="flex flex-wrap gap-6 text-sm opacity-90">
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
            <div className="relative">
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
          
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-start max-w-5xl mx-auto">
            {/* Before */}
            <div className="bg-white border-2 border-dashed border-gray-300 pt-4 pb-4 pl-6 pr-4 rounded-2xl flex flex-col">
              <span className="inline-flex bg-gray-200 text-gray-600 px-3 py-1.5 rounded-full text-sm font-semibold mb-5 w-fit">
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
                    <span className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5">✗</span>
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Arrow */}
            <div className="flex justify-center items-center self-center">
              <ArrowRight className="w-16 h-16 text-[#8B5CF6] transform md:rotate-0 rotate-90" strokeWidth={3} />
            </div>
            
            {/* After */}
            <div className="bg-white border-2 border-[#c4adff] pt-4 pb-4 pl-6 pr-4 rounded-2xl shadow-lg flex flex-col">
              <span className="inline-flex bg-[#8B5CF6] text-white px-3 py-1.5 rounded-full text-sm font-semibold mb-5 w-fit">
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
                description: "Link your clients' Search Console, Analytics, and we'll fetch PageSpeed automatically. One-time setup per client.",
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
      
      {/* Features Grid - Mid-Page CTA */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Everything You Need. Nothing You Don&apos;t.
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Built specifically for SEO agencies who want speed and simplicity.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
      
      {/* Social Proof */}
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
          
          {/* FINAL CTA */}
          <PayPalSubscribeButton
            planId={'P-0X464499YG9822634NEQJ5XQ'}
            planName="STARTER"
            plan="STARTER"
            price={29}
            isTrial={true}
            className="inline-block"
          />
          
          <p className="text-sm text-gray-200 mt-2 text-center opacity-90">
            No charge for 14 days. Cancel anytime during your trial.
          </p>
          
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
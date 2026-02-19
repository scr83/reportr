import { Metadata } from 'next';
import Image from 'next/image';
import { Header, Footer } from '@/components/landing';

export const metadata: Metadata = {
  title: "White Label SEO Reports for Small Agencies | Reportr",
  description: "Affordable white-label SEO reports for small agency teams. Your branding, professional PDFs, budget-friendly pricing. Perfect for 3-10 clients.",
  
  robots: {
    index: true,
    follow: true,
  },
  
  alternates: {
    canonical: "https://reportr.agency/white-label-seo-reports-for-small-agencies",
    languages: {
      "en-US": "https://reportr.agency/white-label-seo-reports-for-small-agencies",
      "en-GB": "https://reportr.agency/white-label-seo-reports-for-small-agencies",
      "en-AU": "https://reportr.agency/white-label-seo-reports-for-small-agencies",
      "en-CA": "https://reportr.agency/white-label-seo-reports-for-small-agencies",
      "en-NZ": "https://reportr.agency/white-label-seo-reports-for-small-agencies",
      "en-IE": "https://reportr.agency/white-label-seo-reports-for-small-agencies",
      "en-IN": "https://reportr.agency/white-label-seo-reports-for-small-agencies",
      "x-default": "https://reportr.agency/white-label-seo-reports-for-small-agencies"
    }
  },
  
  openGraph: {
    title: "White Label SEO Reports for Small Agencies | Reportr",
    description: "Affordable white-label SEO reports for small agency teams. Your branding, professional PDFs, budget-friendly pricing. Perfect for 3-10 clients.",
    url: "https://reportr.agency/white-label-seo-reports-for-small-agencies",
    siteName: "Reportr",
    type: "website",
    locale: "en_US",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "White Label SEO Reports for Small Agencies | Reportr",
    description: "Affordable white-label SEO reports for small agency teams. Your branding, professional PDFs, budget-friendly pricing. Perfect for 3-10 clients.",
  },
};

// Schema Markup Components
const StructuredData = () => {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Reportr - White Label SEO Reports for Small Agencies",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "Affordable white-label SEO reports designed for small agency teams. Pull data from Google Search Console, GA4, and PageSpeed Insights automatically.",
    "url": "https://reportr.agency/white-label-seo-reports-for-small-agencies",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "0",
      "highPrice": "59",
      "priceCurrency": "USD"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://reportr.agency"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "White Label SEO Reports",
        "item": "https://reportr.agency/white-label-seo-reports"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "For Small Agencies",
        "item": "https://reportr.agency/white-label-seo-reports-for-small-agencies"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is Reportr too expensive for a small agency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Start free with 1 client, then upgrade to Starter at $29/mo for 5 clients when ready. If reporting currently takes you 10+ hours per month, you'll save more in labor costs than the subscription fee."
        }
      },
      {
        "@type": "Question",
        "name": "Do we really need white-label reports for only 3-5 clients?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Professional branded reports help you compete with larger agencies and justify higher rates. Even with few clients, looking professional helps with retention and referrals."
        }
      },
      {
        "@type": "Question",
        "name": "What if we grow beyond 5 clients?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Upgrade anytime to Professional ($59/mo, 15 clients). Your branding and client connections transfer over — no re-setup required."
        }
      },
      {
        "@type": "Question",
        "name": "Can we handle technical setup with a small team?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Initial setup takes 10 minutes: upload logo, set colors, connect Google accounts via OAuth. No technical skills required — it's designed for non-developers."
        }
      },
      {
        "@type": "Question",
        "name": "How does this compare to hiring a reporting specialist?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A part-time reporting specialist costs $1,500-2,500/month. Reportr delivers better results for $29-59/month, freeing your team to focus on client-facing work instead of data compilation."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
};

export default function SmallAgenciesPage() {
  return (
    <div className="min-h-screen bg-white">
      <StructuredData />
      <Header />
      <main className="bg-white text-gray-900 antialiased">

        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
          <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              <div className="text-center md:text-left">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <span className="text-yellow-300 font-semibold text-sm">Perfect for Small Marketing Teams</span>
                </div>
                
                {/* H1 */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  White Label SEO Reports for
                  <span className="block text-yellow-300">Small Agencies</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  You&apos;re bootstrapping growth with a small team. Skip the expensive enterprise tools and deliver professional reports that help you compete with bigger agencies.
                </p>
                
                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                  <a href="/signup" 
                     className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-brand-700 font-bold text-lg px-8 py-4 rounded-lg hover:bg-yellow-300 hover:text-brand-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Start Free Trial
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </a>
                </div>
                
                {/* Trust line */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6 text-sm text-white/90">
                  <span>Free plan available</span>
                  <span>•</span>
                  <span>No credit card required</span>
                  <span>•</span>
                  <span>Cancel anytime</span>
                </div>
              </div>
              
              {/* Report mockup */}
              <div className="relative hidden md:block">
                <div className="animate-float">
                  <div className="bg-white rounded-xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">BM</span>
                      </div>
                      <div>
                        <div className="text-gray-900 font-semibold">Boost Marketing</div>
                        <div className="text-gray-500 text-sm">Monthly SEO Report</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-green-600 text-xs font-medium">Clicks</div>
                        <div className="text-green-700 text-xl font-bold">6,421</div>
                        <div className="text-green-600 text-xs">↑ 24% vs last month</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-blue-600 text-xs font-medium">Impressions</div>
                        <div className="text-blue-700 text-xl font-bold">89K</div>
                        <div className="text-blue-600 text-xs">↑ 16% vs last month</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-purple-600 text-xs font-medium">Keywords</div>
                        <div className="text-purple-700 text-xl font-bold">346</div>
                        <div className="text-purple-600 text-xs">↑ 23 new</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="text-orange-600 text-xs font-medium">PageSpeed</div>
                        <div className="text-orange-700 text-xl font-bold">92</div>
                        <div className="text-orange-600 text-xs">Excellent</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-brand-50 to-purple-50 rounded-lg p-3 border border-brand-100">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707z"/>
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-brand-700 text-xs font-semibold">AI Recommendation</span>
                      </div>
                      <p className="text-gray-700 text-xs">
                        &quot;About page&quot; has high impressions, low clicks — optimize title tag to improve CTR...
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-300/20 rounded-full blur-2xl"></div>
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-brand-400/20 rounded-full blur-2xl"></div>
              </div>
              
            </div>
          </div>
        </section>

        {/* PAIN POINTS */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Small Agency Reporting Challenges</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                You&apos;re competing with bigger agencies while wearing multiple hats. Every hour counts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Budget Constraints */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Enterprise Tools Cost Too Much</h3>
                <p className="text-gray-700">
                  AgencyAnalytics, Semrush, and Ahrefs reporting start at $150-300/month for features you don&apos;t need. When you&apos;re managing 3-8 clients, that&apos;s $20-50 per client just for reporting tools.
                </p>
              </div>
              
              {/* Time Constraints */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">You Wear Too Many Hats Already</h3>
                <p className="text-gray-700">
                  As a small agency owner, you&apos;re the account manager, strategist, and administrator. Spending 6-10 hours monthly on manual reporting means less time on sales, strategy, and client work that actually drives growth.
                </p>
              </div>
              
              {/* Competition with Larger Agencies */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">You Look Smaller Than You Are</h3>
                <p className="text-gray-700">
                  Prospects compare your basic Google Docs reports to polished deliverables from 20-person agencies. Without professional presentation, you&apos;re perceived as the &quot;budget option&quot; instead of a strategic partner.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How <strong>Reportr</strong> Works for Small Agencies</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Three steps to professional SEO reports without the enterprise price tag.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="absolute -top-4 left-8 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Connect Once</h3>
                <p className="text-gray-600">Connect your clients&apos; Google Search Console and Analytics through secure OAuth. Takes 2 minutes per client — you never need to do this again.</p>
              </div>
              
              {/* Step 2 */}
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="absolute -top-4 left-8 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Add Your Brand</h3>
                <p className="text-gray-600">Upload your logo, set your brand colors, add company name. Every report becomes 100% white-labeled to match your agency identity.</p>
              </div>
              
              {/* Step 3 */}
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="absolute -top-4 left-8 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Generate & Send</h3>
                <p className="text-gray-600">One click generates a professional PDF with all client data, AI recommendations, and your branding. Download and send to clients in under a minute.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Everything Small Agencies Need, Nothing They Don&apos;t</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                No bloated enterprise features. Just the essentials to deliver professional reports and compete effectively.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Affordable Pricing */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Budget-Friendly Pricing</h3>
                <p className="text-gray-600 text-sm">Start free, then $29/mo for 5 clients. 5-10x cheaper than enterprise reporting tools with the same professional output.</p>
              </div>
              
              {/* Full White-Label */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Full White-Label Branding</h3>
                <p className="text-gray-600 text-sm">Your logo, colors, company name throughout. Look like a big agency with professional deliverables that command premium pricing.</p>
              </div>
              
              {/* Quick Setup */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Quick 10-Minute Setup</h3>
                <p className="text-gray-600 text-sm">No learning curve or technical setup. Upload logo, connect clients, generate first report. Designed for non-developers to use immediately.</p>
              </div>
              
              {/* AI Insights */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">AI-Generated Insights</h3>
                <p className="text-gray-600 text-sm">Every report includes actionable recommendations. Show clients you&apos;re analyzing data, not just displaying numbers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Manual Reporting vs <strong>Reportr</strong></h2>
              <p className="text-xl text-gray-600">What your monthly reporting looks like with 5 clients.</p>
            </div>
            
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Aspect</th>
                    <th className="text-center py-4 px-6 font-semibold text-red-600">Manual Process</th>
                    <th className="text-center py-4 px-6 font-semibold text-brand-600">With <strong>Reportr</strong></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Time per report</td>
                    <td className="py-4 px-6 text-center text-red-600">1.5-2.5 hours</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">30 seconds</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">5 clients / month</td>
                    <td className="py-4 px-6 text-center text-red-600">8-12 hours</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">~3 minutes</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Your branding</td>
                    <td className="py-4 px-6 text-center text-gray-500">DIY in Google Docs</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Professional branded PDF</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Data sources</td>
                    <td className="py-4 px-6 text-center text-gray-500">Copy-paste from 3 tabs</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">GSC + GA4 + PageSpeed auto</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">AI recommendations</td>
                    <td className="py-4 px-6 text-center text-gray-500">You research and write</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Generated automatically</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700 font-medium">Monthly cost</td>
                    <td className="py-4 px-6 text-center text-gray-500">$600-1,200 in time</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">$29/mo total</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Questions from Small Agency Owners</h2>
              <p className="text-xl text-gray-600">Real questions from bootstrapped agency founders using <strong>Reportr</strong>.</p>
            </div>
            
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Is <strong>Reportr</strong> too expensive for a small agency?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Start free with 1 client, then upgrade to Starter at $29/mo for 5 clients when ready. If reporting currently takes you 10+ hours per month, you&apos;ll save more in labor costs than the subscription fee.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Do we really need white-label reports for only 3-5 clients?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Yes. Professional branded reports help you compete with larger agencies and justify higher rates. Even with few clients, looking professional helps with retention and referrals.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  What if we grow beyond 5 clients?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Upgrade anytime to Professional ($59/mo, 15 clients). Your branding and client connections transfer over — no re-setup required.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Can we handle technical setup with a small team?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Absolutely. Initial setup takes 10 minutes: upload logo, set colors, connect Google accounts via OAuth. No technical skills required — it&apos;s designed for non-developers.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  How does this compare to hiring a reporting specialist?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  A part-time reporting specialist costs $1,500-2,500/month. <strong>Reportr</strong> delivers better results for $29-59/month, freeing your team to focus on client-facing work instead of data compilation.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Compete Like a Big Agency on a Small Budget</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join small agencies who&apos;ve leveled up their reporting without breaking the bank.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a href="/signup" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-brand-700 font-bold text-lg px-8 py-4 rounded-lg hover:bg-yellow-300 hover:text-brand-800 transition-all duration-200 shadow-lg">
                Start Free Trial
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </a>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Free plan available</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>

        {/* RELATED RESOURCES */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Resources</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <a href="/white-label-seo-reports" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Hub Page</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">White Label SEO Reports</h3>
                <p className="text-gray-600 text-sm">Complete guide to white-label SEO reporting for all business types.</p>
              </a>
              
              <a href="/blog/small-agency-seo-reporting-strategy" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Guide</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Small Agency SEO Reporting Strategy</h3>
                <p className="text-gray-600 text-sm">How to deliver professional reports without enterprise tool budgets.</p>
              </a>
              
              <a href="/white-label-seo-reports-for-freelance-consultants" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">For Solo</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Reports for Freelance Consultants</h3>
                <p className="text-gray-600 text-sm">White-label SEO reporting solutions for solo consultants.</p>
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
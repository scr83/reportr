import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "White Label SEO Reports for Digital Marketing Agencies | Reportr",
  description: "Generate professional white-label SEO reports for your agency clients. Your logo, your colors, one-click PDFs. Scale from 5-50 clients effortlessly. From $59/mo.",
  
  keywords: [
    "white label seo reports for digital marketing agencies",
    "agency seo reporting tool",
    "white label seo reports agencies", 
    "branded seo reports for agencies",
    "seo reporting software for agencies"
  ],
  
  alternates: {
    canonical: "https://reportr.agency/white-label-seo-reports-for-digital-marketing-agencies",
    languages: {
      "en-US": "https://reportr.agency/white-label-seo-reports-for-digital-marketing-agencies",
      "en-GB": "https://reportr.agency/white-label-seo-reports-for-digital-marketing-agencies",
      "en-AU": "https://reportr.agency/white-label-seo-reports-for-digital-marketing-agencies",
      "en-CA": "https://reportr.agency/white-label-seo-reports-for-digital-marketing-agencies",
      "en-NZ": "https://reportr.agency/white-label-seo-reports-for-digital-marketing-agencies",
      "en-IE": "https://reportr.agency/white-label-seo-reports-for-digital-marketing-agencies",
      "en-IN": "https://reportr.agency/white-label-seo-reports-for-digital-marketing-agencies",
      "x-default": "https://reportr.agency/white-label-seo-reports-for-digital-marketing-agencies"
    }
  },
  
  robots: {
    index: true,
    follow: true,
  },
  
  openGraph: {
    title: "White Label SEO Reports for Digital Marketing Agencies | Reportr",
    description: "Generate professional white-label SEO reports for your agency clients. Your logo, your colors, one-click PDFs.",
    url: "https://reportr.agency/white-label-seo-reports-for-digital-marketing-agencies",
    siteName: "Reportr",
    type: "website",
  },
};

// Schema Markup Components
const StructuredData = () => {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Reportr - White Label SEO Reports for Digital Marketing Agencies",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "Generate professional white-label SEO reports designed for digital marketing agencies. Pull data from Google Search Console, GA4, and PageSpeed Insights automatically.",
    "url": "https://reportr.agency/white-label-seo-reports-for-digital-marketing-agencies",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "0",
      "highPrice": "99",
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
        "name": "For Digital Marketing Agencies",
        "item": "https://reportr.agency/white-label-seo-reports-for-digital-marketing-agencies"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does white-label reporting help agency client retention?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professional reports with your branding build trust and credibility. Clients see you as more established and are less likely to question your expertise or shop around for other agencies when reports consistently look professional and are delivered on time."
        }
      },
      {
        "@type": "Question",
        "name": "Can we customize reports for different client needs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Choose between Executive Summary for busy executives, Standard Report for detailed analysis, or Custom Report where you select exactly which metrics each client sees. Tailor reports to match what different stakeholders care about."
        }
      },
      {
        "@type": "Question",
        "name": "How do we onboard multiple clients quickly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Batch client onboarding through Google OAuth connections. Your account manager can connect multiple clients in sequence, then generate all monthly reports with a few clicks. No individual setup per client after initial connection."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if Google APIs have downtime?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reportr has built-in retry logic and caches recent data. If Google's APIs are temporarily unavailable, we'll retry automatically and use cached data to ensure your reports are delivered on schedule to clients."
        }
      },
      {
        "@type": "Question",
        "name": "Can we charge clients more for professional reports?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Many agencies increase their monthly retainers by $150-300 per client when they start delivering professional branded reports instead of basic dashboards. The perceived value is significantly higher."
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

export default function DigitalMarketingAgenciesPage() {
  return (
    <>
      <StructuredData />
      <div className="bg-white text-gray-900 antialiased">
        
        {/* NAVIGATION BAR */}
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="text-gray-900 font-bold text-lg">Reportr</span>
              </a>
              <div className="flex items-center gap-4">
                <a href="/signup" className="bg-brand-600 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors">
                  Start Free Trial
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
          <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              <div className="text-center md:text-left">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <span className="text-yellow-300 font-semibold text-sm">Built for Growing Marketing Agencies</span>
                </div>
                
                {/* H1 */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  White Label SEO Reports for
                  <span className="block text-yellow-300">Digital Marketing Agencies</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  Your clients expect professional deliverables. Stop sending generic dashboards and start delivering branded PDF reports that justify your retainers and keep clients longer.
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
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">DA</span>
                      </div>
                      <div>
                        <div className="text-gray-900 font-semibold">Digital Advantage</div>
                        <div className="text-gray-500 text-sm">Monthly SEO Report</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-green-600 text-xs font-medium">Clicks</div>
                        <div className="text-green-700 text-xl font-bold">24,892</div>
                        <div className="text-green-600 text-xs">↑ 18% vs last month</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-blue-600 text-xs font-medium">Impressions</div>
                        <div className="text-blue-700 text-xl font-bold">487K</div>
                        <div className="text-blue-600 text-xs">↑ 12% vs last month</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-purple-600 text-xs font-medium">Keywords</div>
                        <div className="text-purple-700 text-xl font-bold">1,247</div>
                        <div className="text-purple-600 text-xs">↑ 89 new</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="text-orange-600 text-xs font-medium">PageSpeed</div>
                        <div className="text-orange-700 text-xl font-bold">89</div>
                        <div className="text-orange-600 text-xs">Good</div>
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
                        &quot;Services page&quot; ranks #7 for &quot;digital marketing agency&quot; — optimize for position 3 opportunity...
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Agency Reporting Challenges That Limit Growth</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                You&apos;re managing 10-30 SEO clients. Manual reporting is killing your profitability and team bandwidth.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Team Hours Wasted */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Team Hours Disappear Into Reporting</h3>
                <p className="text-gray-700">
                  Your account managers spend 30-40% of their time pulling data from GSC, GA4, and PageSpeed, then formatting it in Google Docs. That&apos;s billable hours you can&apos;t charge for, and it doesn&apos;t scale as you add more clients.
                </p>
              </div>
              
              {/* Client Retention Issues */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Unprofessional Reports Hurt Client Retention</h3>
                <p className="text-gray-700">
                  Generic Looker Studio dashboards or PDFs with &quot;Powered by SemRush&quot; make you look like a middleman, not an expert. Clients question whether they&apos;re paying premium rates for premium service when deliverables look amateur.
                </p>
              </div>
              
              {/* Scaling Bottleneck */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Reporting Doesn&apos;t Scale With Growth</h3>
                <p className="text-gray-700">
                  You want to grow from 15 to 50 clients, but reporting workload grows linearly. Adding one client means 2-3 more hours per month. You need systems that scale without proportional team growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How <strong>Reportr</strong> Works for Digital Marketing Agencies</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Three simple steps to professional SEO reports that scale with your growth.</p>
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
                <p className="text-gray-600">Batch connect your clients&apos; Google Search Console and Analytics accounts. OAuth security means no password sharing — just secure API access for your team.</p>
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
                <p className="text-gray-600">Upload your agency logo, set brand colors, add your company name. Every report becomes 100% white-labeled with zero &quot;Powered by&quot; badges.</p>
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
                <p className="text-gray-600">Click one button for each client. Professional branded PDFs with clicks, impressions, keywords, PageSpeed, and AI recommendations ready in 30 seconds each.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Built for Agency Scale and Client Retention</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Every feature designed to help you deliver professional results while freeing up team time for revenue-generating work.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Complete White-Label */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Complete White-Label Branding</h3>
                <p className="text-gray-600 text-sm">Your logo, colors, company name on every page. Clients see your agency as the expert, not a reseller of third-party tools.</p>
              </div>
              
              {/* Multi-Client Management */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Multi-Client Dashboard</h3>
                <p className="text-gray-600 text-sm">Manage 15-50 clients from one interface. Batch generate reports, track status, and see which clients need attention at a glance.</p>
              </div>
              
              {/* Team Collaboration */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">AI-Powered Recommendations</h3>
                <p className="text-gray-600 text-sm">Every report includes actionable insights that help clients see you&apos;re not just reporting data — you&apos;re providing strategic direction.</p>
              </div>
              
              {/* Agency-Level Pricing */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Agency-Scale Pricing</h3>
                <p className="text-gray-600 text-sm">Professional ($59) for 15 clients or Agency ($99) for 50 clients. No per-seat charges for your team members.</p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Manual Reporting vs <strong>Reportr</strong></h2>
              <p className="text-xl text-gray-600">What your agency&apos;s monthly reporting cycle looks like with 20 clients.</p>
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
                    <td className="py-4 px-6 text-center text-red-600">2-3 hours</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">30 seconds</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">20 clients / month</td>
                    <td className="py-4 px-6 text-center text-red-600">40-60 hours</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">~10 minutes</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Branding</td>
                    <td className="py-4 px-6 text-center text-gray-500">DIY templates</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Automatic agency branding</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Data sources</td>
                    <td className="py-4 px-6 text-center text-gray-500">Copy-paste from 3 tabs</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">GSC + GA4 + PageSpeed auto</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">AI recommendations</td>
                    <td className="py-4 px-6 text-center text-gray-500">Account manager writes</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Generated automatically</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700 font-medium">Monthly cost</td>
                    <td className="py-4 px-6 text-center text-gray-500">$3,000-5,000 in labor</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">$59-99/mo total</td>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Questions from Digital Marketing Agencies</h2>
              <p className="text-xl text-gray-600">Common questions from agency owners about scaling their SEO reporting.</p>
            </div>
            
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  How does white-label reporting help agency client retention?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Professional reports with your branding build trust and credibility. Clients see you as more established and are less likely to question your expertise or shop around for other agencies when reports consistently look professional and are delivered on time.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Can we customize reports for different client needs?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Yes. Choose between Executive Summary for busy executives, Standard Report for detailed analysis, or Custom Report where you select exactly which metrics each client sees. Tailor reports to match what different stakeholders care about.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  How do we onboard multiple clients quickly?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Batch client onboarding through Google OAuth connections. Your account manager can connect multiple clients in sequence, then generate all monthly reports with a few clicks. No individual setup per client after initial connection.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  What happens if Google APIs have downtime?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <strong>Reportr</strong> has built-in retry logic and caches recent data. If Google&apos;s APIs are temporarily unavailable, we&apos;ll retry automatically and use cached data to ensure your reports are delivered on schedule to clients.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Can we charge clients more for professional reports?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Many agencies increase their monthly retainers by $150-300 per client when they start delivering professional branded reports instead of basic dashboards. The perceived value is significantly higher.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Scale Your Agency with Professional Reporting</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join growing agencies who&apos;ve automated their SEO reporting and increased client retention.
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
              
              <a href="/blog/agency-seo-reporting-best-practices" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Guide</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Agency SEO Reporting Best Practices</h3>
                <p className="text-gray-600 text-sm">How top digital marketing agencies structure their client SEO reports.</p>
              </a>
              
              <a href="/white-label-seo-reports-for-small-agencies" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">For Small Agencies</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Reports for Small Agencies</h3>
                <p className="text-gray-600 text-sm">Affordable white-label SEO reporting solutions for smaller marketing teams.</p>
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
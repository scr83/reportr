import { Metadata } from 'next';
import Image from 'next/image';
import { Header, Footer } from '@/components/landing';

export const metadata: Metadata = {
  title: "DashThis Alternative for SEO Reporting | Reportr",
  description: "Looking for a DashThis alternative? Reportr creates professional PDF reports vs DashThis dashboards. Better for client deliverables. From $29/mo. Try free.",
  
  robots: {
    index: true,
    follow: true,
  },
  
  alternates: {
    canonical: "https://reportr.agency/dashthis-alternative-for-seo-reporting",
    languages: {
      "en-US": "https://reportr.agency/dashthis-alternative-for-seo-reporting",
      "en-GB": "https://reportr.agency/dashthis-alternative-for-seo-reporting",
      "en-AU": "https://reportr.agency/dashthis-alternative-for-seo-reporting",
      "en-CA": "https://reportr.agency/dashthis-alternative-for-seo-reporting",
      "en-NZ": "https://reportr.agency/dashthis-alternative-for-seo-reporting",
      "en-IE": "https://reportr.agency/dashthis-alternative-for-seo-reporting",
      "en-IN": "https://reportr.agency/dashthis-alternative-for-seo-reporting",
      "x-default": "https://reportr.agency/dashthis-alternative-for-seo-reporting"
    }
  },
  
  openGraph: {
    title: "DashThis Alternative for SEO Reporting | Reportr",
    description: "Looking for a DashThis alternative? Reportr creates professional PDF reports vs DashThis dashboards. Better for client deliverables. From $29/mo. Try free.",
    url: "https://reportr.agency/dashthis-alternative-for-seo-reporting",
    siteName: "Reportr",
    type: "website",
    locale: "en_US",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "DashThis Alternative for SEO Reporting | Reportr",
    description: "Looking for a DashThis alternative? Reportr creates professional PDF reports vs DashThis dashboards. Better for client deliverables. From $29/mo. Try free.",
  },
};

// Schema Markup Components
const StructuredData = () => {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Reportr - DashThis Alternative",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "A PDF-focused alternative to DashThis for SEO reporting. Generate professional white-label PDF reports instead of dashboards. Purpose-built for client deliverables.",
    "url": "https://reportr.agency/dashthis-alternative-for-seo-reporting",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "0",
      "highPrice": "99",
      "priceCurrency": "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "DashThis gives dashboards, Reportr gives PDFs — which is better?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on your client needs. DashThis dashboards are great for real-time internal monitoring. Reportr PDFs are better for client deliverables that get forwarded to stakeholders, CEOs, and board members. Most agencies find clients prefer professional PDF reports over dashboard links."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use both DashThis and Reportr?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Many agencies use DashThis for internal real-time monitoring and Reportr for client-facing monthly reports. They serve different purposes — dashboards for monitoring, PDFs for professional deliverables."
        }
      },
      {
        "@type": "Question",
        "name": "How does pricing compare as I add more clients?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "DashThis starts at approximately $49/month for 3 dashboards, scaling up quickly as you add more. Reportr starts at $29/month for 5 clients or free for 1 client. Reportr's pricing is based on client count, not dashboard count, making it more predictable for agencies."
        }
      },
      {
        "@type": "Question",
        "name": "Does Reportr have live dashboards too?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, Reportr focuses specifically on generating professional PDF reports. If you need real-time dashboards, DashThis excels at that. If you need branded PDF deliverables for clients, Reportr is purpose-built for that use case."
        }
      },
      {
        "@type": "Question",
        "name": "How fast can I switch from DashThis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "About 5 minutes per client. Simply connect their Google accounts to Reportr and generate your first PDF report. There's no dashboard configuration needed — Reportr uses pre-built report templates optimized for client presentations."
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
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
};

export default function DashThisAlternativePage() {
  return (
    <>
      <StructuredData />
      <div className="bg-white text-gray-900 antialiased">
        
        {/* SITE-WIDE HEADER */}
        <Header />

        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              <div className="text-center md:text-left">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <span className="text-yellow-300 font-semibold text-sm">Professional PDFs, not dashboards</span>
                </div>
                
                {/* H1 */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  DashThis Alternative for SEO Reporting
                  <span className="block text-yellow-300">Try Reportr</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  DashThis creates dashboards. Clients want professional PDF reports they can forward to stakeholders. <strong className="text-yellow-300">Reportr</strong> delivers exactly that.
                </p>
                
                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8 text-sm text-white/90">
                  <span>• PDFs, not dashboards</span>
                  <span>• $29 vs $49+ per month</span>
                  <span>• Ready in 30 seconds</span>
                </div>
                
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
                <p className="text-white/80 text-sm mt-4">Free plan available • No dashboard setup • Cancel anytime</p>
              </div>
              
              {/* Report mockup */}
              <div className="relative hidden md:block">
                <div className="animate-float">
                  <div className="bg-white rounded-xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">AB</span>
                      </div>
                      <div>
                        <div className="text-gray-900 font-semibold">Acme Agency</div>
                        <div className="text-gray-500 text-sm">SEO Report</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-green-600 text-xs font-medium">Clicks</div>
                        <div className="text-green-700 text-xl font-bold">12,847</div>
                        <div className="text-green-600 text-xs">↑ 23% vs last month</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-blue-600 text-xs font-medium">Impressions</div>
                        <div className="text-blue-700 text-xl font-bold">284K</div>
                        <div className="text-blue-600 text-xs">↑ 18% vs last month</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-purple-600 text-xs font-medium">Avg. Position</div>
                        <div className="text-purple-700 text-xl font-bold">8.4</div>
                        <div className="text-purple-600 text-xs">↑ 2.1 improvement</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="text-orange-600 text-xs font-medium">PageSpeed</div>
                        <div className="text-orange-700 text-xl font-bold">94</div>
                        <div className="text-orange-600 text-xs">Excellent</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-brand-50 to-purple-50 rounded-lg p-3 border border-brand-100">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-brand-700 text-xs font-semibold">AI Recommendation</span>
                      </div>
                      <p className="text-gray-700 text-xs">
                        &quot;Homepage&quot; ranks #11 for &quot;seo services&quot; — optimize meta title to reach page 1...
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

        {/* WHY SWITCH FROM DASHTHIS */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Agencies Switch from DashThis</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                DashThis excels at real-time dashboards. But for client-facing deliverables, here's why <strong>Reportr</strong> might be a better fit.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Clients want PDFs, not dashboards */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Clients Want PDFs They Can Forward</h3>
                <p className="text-gray-700">
                  DashThis creates live dashboards that require logins and links. Clients need professional PDF reports they can download, print, and forward to stakeholders, board members, and CEOs. <strong>Reportr</strong> delivers exactly that format.
                </p>
              </div>
              
              {/* Ugly dashboard exports */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Dashboard Exports Look Unprofessional</h3>
                <p className="text-gray-700">
                  Exporting DashThis dashboards to PDF produces broken layouts, cut-off charts, and ugly formatting. Dashboard tools aren't designed for print-ready documents. <strong>Reportr</strong> creates purpose-built PDF reports that look professional every time.
                </p>
              </div>
              
              {/* Per-dashboard pricing */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Per-Dashboard Pricing Gets Expensive</h3>
                <p className="text-gray-700">
                  DashThis starts at $49/month for just 3 dashboards. As you add clients, costs spiral quickly. <strong>Reportr</strong> charges per client count, not per report, with transparent pricing: $29-99/month based on how many clients you serve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW TO SWITCH */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Switch from DashThis in 5 Minutes</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Three simple steps from dashboards to professional PDF reports.</p>
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
                <h3 className="text-xl font-bold text-gray-900 mb-3">Connect Your Google Accounts</h3>
                <p className="text-gray-600">Same data sources as DashThis — Google Search Console and GA4. Just connect once per client. No dashboard configuration needed.</p>
              </div>
              
              {/* Step 2 */}
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="absolute -top-4 left-8 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Add Your Agency Branding</h3>
                <p className="text-gray-600">Upload your logo and choose your colors. Every PDF report is 100% white-labeled with your agency branding — no dashboard platform logos.</p>
              </div>
              
              {/* Step 3 */}
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="absolute -top-4 left-8 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Generate Your First Report</h3>
                <p className="text-gray-600">Click one button. Professional PDF ready in 30 seconds. Download and send to client — no dashboard links required.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES VS DASHTHIS */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What You Get with Reportr vs DashThis</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Purpose-built for client deliverables, not internal monitoring.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* PDF Reports */}
              <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100">
                <div className="w-14 h-14 bg-brand-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-800 mb-3">Professional PDF Reports</h3>
                <p className="text-gray-700">
                  DashThis creates dashboards that clients access via links. <strong>Reportr</strong> generates downloadable PDF reports that clients can forward to stakeholders, print, and share offline.
                </p>
              </div>
              
              {/* No Dashboard Setup */}
              <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100">
                <div className="w-14 h-14 bg-brand-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-800 mb-3">No Dashboard Configuration</h3>
                <p className="text-gray-700">
                  DashThis requires building custom dashboards with widgets and layouts. <strong>Reportr</strong> has pre-built report templates — just connect data and generate. Ready in 30 seconds.
                </p>
              </div>
              
              {/* Client-Count Pricing */}
              <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100">
                <div className="w-14 h-14 bg-brand-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-800 mb-3">Predictable Client-Based Pricing</h3>
                <p className="text-gray-700">
                  DashThis charges per dashboard (3 for $49/mo). <strong>Reportr</strong> charges per client count with unlimited reports. Serve 5 clients for $29/month with no per-report limits.
                </p>
              </div>
              
              {/* AI Insights */}
              <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100">
                <div className="w-14 h-14 bg-brand-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-800 mb-3">AI-Powered Recommendations</h3>
                <p className="text-gray-700">
                  DashThis shows raw metrics in dashboards. <strong>Reportr</strong> uses Claude AI to analyze SEO data and generate actionable recommendations that help clients improve their rankings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Reportr vs DashThis</h2>
              <p className="text-xl text-gray-600">Dashboards vs PDF reports — what works better for your clients?</p>
            </div>
            
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-600">DashThis</th>
                    <th className="text-center py-4 px-6 font-semibold text-brand-600">Reportr</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Starting Price</td>
                    <td className="py-4 px-6 text-center text-gray-600">From ~$49/mo (3 dashboards)</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">$29/mo (or free)</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Output Format</td>
                    <td className="py-4 px-6 text-center text-gray-600">Live dashboards</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Professional PDFs</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Client Access</td>
                    <td className="py-4 px-6 text-center text-gray-600">Dashboard links + logins</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Downloadable PDFs</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Setup Required</td>
                    <td className="py-4 px-6 text-center text-gray-600">Dashboard building</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Pre-built templates</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Real-Time Monitoring</td>
                    <td className="py-4 px-6 text-center text-green-600">Yes (live dashboards)</td>
                    <td className="py-4 px-6 text-center text-gray-500">No (monthly reports)</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Stakeholder Sharing</td>
                    <td className="py-4 px-6 text-center text-gray-600">Dashboard links</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Email PDFs directly</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">AI Recommendations</td>
                    <td className="py-4 px-6 text-center text-gray-500">No</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Yes (Claude AI)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700 font-medium">Best For</td>
                    <td className="py-4 px-6 text-center text-gray-600 text-sm">Internal monitoring</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold text-sm">Client deliverables</td>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Questions About Switching from DashThis</h2>
              <p className="text-xl text-gray-600">Common questions about making the switch to <strong>Reportr</strong>.</p>
            </div>
            
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  DashThis gives dashboards, Reportr gives PDFs — which is better?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  It depends on your client needs. DashThis dashboards are great for real-time internal monitoring. <strong>Reportr</strong> PDFs are better for client deliverables that get forwarded to stakeholders, CEOs, and board members. Most agencies find clients prefer professional PDF reports over dashboard links.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Can I use both DashThis and Reportr?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Absolutely! Many agencies use DashThis for internal real-time monitoring and <strong>Reportr</strong> for client-facing monthly reports. They serve different purposes — dashboards for monitoring, PDFs for professional deliverables.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  How does pricing compare as I add more clients?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  DashThis starts at approximately $49/month for 3 dashboards, scaling up quickly as you add more. <strong>Reportr</strong> starts at $29/month for 5 clients or free for 1 client. <strong>Reportr</strong>'s pricing is based on client count, not dashboard count, making it more predictable for agencies.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Does Reportr have live dashboards too?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  No, <strong>Reportr</strong> focuses specifically on generating professional PDF reports. If you need real-time dashboards, DashThis excels at that. If you need branded PDF deliverables for clients, <strong>Reportr</strong> is purpose-built for that use case.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  How fast can I switch from DashThis?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  About 5 minutes per client. Simply connect their Google accounts to <strong>Reportr</strong> and generate your first PDF report. There's no dashboard configuration needed — <strong>Reportr</strong> uses pre-built report templates optimized for client presentations.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Switch from Dashboards to PDFs?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Try <strong>Reportr</strong> free. Give your clients the professional PDF reports they actually want.
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
                <span>No dashboard setup</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>PDF in 30 seconds</span>
              </div>
            </div>
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Resources</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <a href="/blog/vs-dashthis" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Comparison</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Reportr vs DashThis: Detailed Comparison</h3>
                <p className="text-gray-600 text-sm">Deep dive comparison between DashThis and <strong>Reportr</strong> features.</p>
              </a>
              
              <a href="/blog/best-white-label-seo-reporting-tool" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Guide</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Best White Label SEO Reporting Tools (2026)</h3>
                <p className="text-gray-600 text-sm">Compare the top white-label SEO reporting platforms for agencies.</p>
              </a>
              
              <a href="/agencyanalytics-alternative-for-seo-reporting" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Alternative</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">AgencyAnalytics Alternative</h3>
                <p className="text-gray-600 text-sm">Compare AgencyAnalytics vs <strong>Reportr</strong> for SEO reporting needs.</p>
              </a>
            </div>
          </div>
        </section>

        {/* SITE-WIDE FOOTER */}
        <Footer />

      </div>
    </>
  );
}
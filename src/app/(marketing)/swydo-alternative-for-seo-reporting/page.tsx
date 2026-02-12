import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Swydo Alternative for SEO Reporting | Simpler & More Affordable | Reportr",
  description: "Looking for a Swydo alternative? Reportr offers white-label SEO reports with GSC, GA4 & PageSpeed data. No complex setup. From $29/mo vs Swydo's $49+. Try free.",
  
  keywords: [
    "swydo alternative",
    "swydo alternatives",
    "swydo competitor",
    "swydo vs reportr",
    "swydo replacement",
    "better than swydo",
    "swydo pricing alternative"
  ],
  
  alternates: {
    canonical: "https://reportr.agency/swydo-alternative-for-seo-reporting",
    languages: {
      "en-US": "https://reportr.agency/swydo-alternative-for-seo-reporting",
      "en-GB": "https://reportr.agency/swydo-alternative-for-seo-reporting",
      "en-AU": "https://reportr.agency/swydo-alternative-for-seo-reporting",
      "en-CA": "https://reportr.agency/swydo-alternative-for-seo-reporting",
      "en-NZ": "https://reportr.agency/swydo-alternative-for-seo-reporting",
      "en-IE": "https://reportr.agency/swydo-alternative-for-seo-reporting",
      "en-IN": "https://reportr.agency/swydo-alternative-for-seo-reporting",
      "x-default": "https://reportr.agency/swydo-alternative-for-seo-reporting"
    }
  },
  
  robots: {
    index: true,
    follow: true,
  },
  
  openGraph: {
    title: "Swydo Alternative for SEO Reporting | Reportr",
    description: "Looking for a Swydo alternative? Reportr offers simpler, more affordable white-label SEO reports.",
    url: "https://reportr.agency/swydo-alternative-for-seo-reporting",
    siteName: "Reportr",
    type: "website",
  },
};

// Schema Markup Components
const StructuredData = () => {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Reportr - Swydo Alternative",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "A simpler, more affordable alternative to Swydo for white-label SEO reporting. Generate professional PDF reports with Google Search Console, GA4, and PageSpeed data.",
    "url": "https://reportr.agency/swydo-alternative-for-seo-reporting",
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
        "name": "Swydo Alternative",
        "item": "https://reportr.agency/swydo-alternative-for-seo-reporting"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why switch from Swydo to Reportr?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reportr is simpler and more affordable. While Swydo starts at $49/month and requires complex template setup, Reportr starts at $29/month with ready-to-use report templates. If you primarily need SEO reporting (not PPC or social), Reportr gives you everything you need without the bloat."
        }
      },
      {
        "@type": "Question",
        "name": "How does Reportr pricing compare to Swydo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Swydo starts at $49/month for basic reporting. Reportr starts at $29/month (Starter) or free for 1 client. Both offer white-label options, but Reportr's white-label add-on is $20/month vs Swydo's higher-tier pricing requirements."
        }
      },
      {
        "@type": "Question",
        "name": "Can I migrate my clients from Swydo to Reportr?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Simply add your clients to Reportr and connect their Google accounts. There's no data migration needed — Reportr pulls fresh data directly from Google Search Console, GA4, and PageSpeed Insights. Setup takes about 5 minutes per client."
        }
      },
      {
        "@type": "Question",
        "name": "Does Reportr have the same integrations as Swydo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No — and that's intentional. Swydo connects to 30+ platforms (PPC, social, email, etc.). Reportr focuses specifically on SEO reporting with Google Search Console, Google Analytics 4, and PageSpeed Insights. If you need PPC/social reporting, Swydo may be better. If you need focused SEO reporting, Reportr is simpler and cheaper."
        }
      },
      {
        "@type": "Question",
        "name": "Is Reportr easier to use than Swydo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Swydo requires building custom report templates with widgets and data sources. Reportr has pre-built report templates — just connect your client's Google accounts and generate. Most users create their first report within 5 minutes of signing up."
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

export default function SwydoAlternativePage() {
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
              <div className="hidden md:flex items-center gap-8">
                <a href="/" className="text-gray-600 hover:text-brand-600 transition-colors text-sm font-medium">Home</a>
                <a href="/features" className="text-gray-600 hover:text-brand-600 transition-colors text-sm font-medium">Features</a>
                <a href="/how-it-works" className="text-gray-600 hover:text-brand-600 transition-colors text-sm font-medium">How It Works</a>
                <a href="/pricing" className="text-gray-600 hover:text-brand-600 transition-colors text-sm font-medium">Pricing</a>
              </div>
              <div className="flex items-center gap-4">
                <a href="/login" className="text-gray-600 hover:text-brand-600 transition-colors text-sm font-medium hidden sm:block">Login</a>
                <a href="/signup" className="bg-brand-600 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* BREADCRUMB */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
              <a href="/" className="hover:text-brand-600 transition-colors">Home</a>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
              <span className="text-gray-900 font-medium">Swydo Alternative</span>
            </nav>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              <div className="text-center md:text-left">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <span className="text-yellow-300 font-semibold text-sm">Swydo Alternative</span>
                </div>
                
                {/* H1 */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Looking for a Swydo Alternative?
                  <span className="block text-yellow-300">Try Reportr</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  Swydo is powerful but complex. If you just need white-label SEO reports without the learning curve, <a href="/" className="text-yellow-300 hover:underline">Reportr</a> delivers professional PDFs in 30 seconds. <span className="font-semibold">Simpler setup. Lower price. Same professional results.</span>
                </p>
                
                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8 text-sm text-white/90">
                  <span>• No setup fees required</span>
                  <span>• 5 minutes to first report</span>
                  <span>• Cancel anytime</span>
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
                  <a href="#how-it-works" className="text-white/90 hover:text-white font-medium flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                    </svg>
                    See How It Works
                  </a>
                </div>
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
                          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707z"/>
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-brand-700 text-xs font-semibold">AI Recommendation</span>
                      </div>
                      <p className="text-gray-700 text-xs">
                        {'"'}Homepage{'"'} ranks #11 for {'"'}seo services{'"'} — optimize meta title to reach page 1...
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

        {/* WHY SWITCH FROM SWYDO */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Agencies Switch from Swydo</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Swydo is a great tool for multi-channel reporting. But if SEO is your focus, here&apos;s why Reportr might be a better fit.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Complex Setup */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Swydo&apos;s Learning Curve</h3>
                <p className="text-gray-700">
                  Swydo requires building custom report templates with widgets, data sources, and layouts. Great for power users, but overkill if you just need clean SEO reports. Reportr has pre-built templates — connect and generate.
                </p>
              </div>
              
              {/* Pricing for unused features */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Paying for Integrations You Don&apos;t Need</h3>
                <p className="text-gray-700">
                  Swydo connects to 30+ platforms — PPC, social, email, CRM. If you only need SEO data from Google, you&apos;re paying for complexity you&apos;ll never use. Reportr focuses on GSC + GA4 + PageSpeed at a fraction of the cost.
                </p>
              </div>
              
              {/* Time spent building */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Time Spent Building Reports</h3>
                <p className="text-gray-700">
                  With Swydo, you design each report template manually. With Reportr, professional report templates are ready out of the box. Click generate, download PDF, send to client. Done in 30 seconds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW REPORTR WORKS */}
        <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Reportr Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Three simple steps to professional SEO reports with your branding.</p>
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
                <p className="text-gray-600">Add your client&apos;s domain and connect Google Search Console + GA4. One-time setup, takes 2 minutes.</p>
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
                <p className="text-gray-600">Upload your logo, pick your colors. Every report is 100% white-labeled.</p>
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
                <p className="text-gray-600">Click one button. Professional PDF ready in 30 seconds. Download and send.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE COMPARISON TABLE */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Swydo vs Reportr: Quick Comparison</h2>
              <p className="text-xl text-gray-600">Feature-by-feature breakdown to help you decide.</p>
            </div>
            
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-600">Swydo</th>
                    <th className="text-center py-4 px-6 font-semibold text-brand-600">Reportr</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Starting Price</td>
                    <td className="py-4 px-6 text-center text-gray-600">$49/mo</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">$29/mo (or free)</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Setup Time</td>
                    <td className="py-4 px-6 text-center text-gray-600">Hours (template building)</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">5 minutes</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Report Generation</td>
                    <td className="py-4 px-6 text-center text-gray-600">Manual template design</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">One-click PDF</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">White-Label</td>
                    <td className="py-4 px-6 text-center text-gray-600">Yes (higher tiers)</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Yes ($20/mo add-on)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">SEO Data (GSC + GA4)</td>
                    <td className="py-4 px-6 text-center text-green-600">✓</td>
                    <td className="py-4 px-6 text-center text-green-600">✓</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">PageSpeed Insights</td>
                    <td className="py-4 px-6 text-center text-gray-500">Limited</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Full integration</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">PPC/Social Reporting</td>
                    <td className="py-4 px-6 text-center text-green-600">Yes (30+ integrations)</td>
                    <td className="py-4 px-6 text-center text-gray-500">No (SEO focused)</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">AI Recommendations</td>
                    <td className="py-4 px-6 text-center text-gray-500">No</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Yes</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700 font-medium">Best For</td>
                    <td className="py-4 px-6 text-center text-gray-600 text-sm">Multi-channel agencies</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold text-sm">SEO-focused agencies</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PRICING PREVIEW */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-600">Start free. Upgrade when you&apos;re ready. Cancel anytime.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {/* Free */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-1">Free</h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">$0<span className="text-base font-normal text-gray-500">/mo</span></div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>1 client</li>
                  <li>5 reports/month</li>
                  <li>GSC + GA4 + PSI</li>
                  <li>Reportr branding</li>
                </ul>
                <a href="/signup" className="block text-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
                  Start Free
                </a>
              </div>
              
              {/* Starter */}
              <div className="bg-white rounded-2xl p-6 border-2 border-brand-600 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Starter</h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">$29<span className="text-base font-normal text-gray-500">/mo</span></div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>5 clients</li>
                  <li>25 reports/month</li>
                  <li>GSC + GA4 + PSI</li>
                  <li>+$20 white-label</li>
                </ul>
                <a href="/signup?plan=starter" className="block text-center py-2 px-4 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors text-sm font-medium">
                  Start Trial
                </a>
              </div>
              
              {/* Professional */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-1">Professional</h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">$59<span className="text-base font-normal text-gray-500">/mo</span></div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>15 clients</li>
                  <li>75 reports/month</li>
                  <li>GSC + GA4 + PSI</li>
                  <li>+$20 white-label</li>
                </ul>
                <a href="/signup?plan=professional" className="block text-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
                  Start Trial
                </a>
              </div>
              
              {/* Agency */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-1">Agency</h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">$99<span className="text-base font-normal text-gray-500">/mo</span></div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>50 clients</li>
                  <li>250 reports/month</li>
                  <li>GSC + GA4 + PSI</li>
                  <li>+$20 white-label</li>
                </ul>
                <a href="/signup?plan=agency" className="block text-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
                  Start Trial
                </a>
              </div>
            </div>
            
            <p className="text-center text-gray-500 text-sm mt-6">
              All paid plans include a 14-day free trial. White-label branding is a $20/month add-on.
              <a href="/pricing" className="text-brand-600 hover:underline ml-1">See full pricing details →</a>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Swydo Alternative FAQ</h2>
              <p className="text-xl text-gray-600">Common questions about switching from Swydo to Reportr.</p>
            </div>
            
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Why switch from Swydo to Reportr?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Reportr is simpler and more affordable. While Swydo starts at $49/month and requires complex template setup, Reportr starts at $29/month with ready-to-use report templates. If you primarily need SEO reporting (not PPC or social), Reportr gives you everything you need without the bloat.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  How does Reportr pricing compare to Swydo?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Swydo starts at $49/month for basic reporting. Reportr starts at $29/month (Starter) or free for 1 client. Both offer white-label options, but Reportr&apos;s white-label add-on is $20/month vs Swydo&apos;s higher-tier pricing requirements.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Can I migrate my clients from Swydo to Reportr?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Yes. Simply add your clients to Reportr and connect their Google accounts. There&apos;s no data migration needed — Reportr pulls fresh data directly from Google Search Console, GA4, and PageSpeed Insights. Setup takes about 5 minutes per client.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Does Reportr have the same integrations as Swydo?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  No — and that&apos;s intentional. Swydo connects to 30+ platforms (PPC, social, email, etc.). Reportr focuses specifically on SEO reporting with Google Search Console, Google Analytics 4, and PageSpeed Insights. If you need PPC/social reporting, Swydo may be better. If you need focused SEO reporting, Reportr is simpler and cheaper.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Is Reportr easier to use than Swydo?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Yes. Swydo requires building custom report templates with widgets and data sources. Reportr has pre-built report templates — just connect your client&apos;s Google accounts and generate. Most users create their first report within 5 minutes of signing up.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Simplify Your SEO Reporting?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Try Reportr free. No setup fees. Generate your first report in 5 minutes.
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
                <span>14-day trial on paid plans</span>
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
              <a href="/blog/vs-swydo" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Comparison</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Swydo vs Reportr: Full Comparison</h3>
                <p className="text-gray-600 text-sm">Complete feature breakdown between Swydo and Reportr.</p>
              </a>
              
              <a href="/white-label-seo-reports" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Hub Page</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">White Label SEO Reports</h3>
                <p className="text-gray-600 text-sm">Everything about white-label SEO reporting for agencies.</p>
              </a>
              
              <a href="/dashthis-alternative-for-seo-reporting" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Alternative</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">DashThis Alternative</h3>
                <p className="text-gray-600 text-sm">Compare DashThis vs Reportr for SEO reporting needs.</p>
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Logo + Tagline */}
              <div className="md:col-span-1">
                <a href="/" className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">R</span>
                  </div>
                  <span className="text-white font-bold text-lg">Reportr</span>
                </a>
                <p className="text-gray-400 text-sm">
                  Professional SEO reports in minutes. Built for SEO freelancers and growing agencies.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                  <li><a href="/features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                  <li><a href="/how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                  <li><a href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-semibold text-white mb-4">Support</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="mailto:support@reportr.com" className="text-gray-400 hover:text-white transition-colors">support@reportr.com</a></li>
                  <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>

              {/* Copyright */}
              <div>
                <p className="text-gray-500 text-sm">
                  © 2025 Reportr. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
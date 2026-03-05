import { Metadata } from 'next';
import Image from 'next/image';
import { Header, Footer } from '@/components/landing';

export const metadata: Metadata = {
  title: "AgencyAnalytics Alternative for SEO Reporting | Reportr",
  description: "Looking for an AgencyAnalytics alternative? Reportr delivers focused SEO reports at $29/mo vs AgencyAnalytics' $79+. No enterprise complexity. Try free.",
  
  robots: {
    index: true,
    follow: true,
  },
  
  alternates: {
    canonical: "https://reportr.agency/agencyanalytics-alternative-for-seo-reporting",
    languages: {
      "en-US": "https://reportr.agency/agencyanalytics-alternative-for-seo-reporting",
      "en-GB": "https://reportr.agency/agencyanalytics-alternative-for-seo-reporting",
      "en-AU": "https://reportr.agency/agencyanalytics-alternative-for-seo-reporting",
      "en-CA": "https://reportr.agency/agencyanalytics-alternative-for-seo-reporting",
      "en-NZ": "https://reportr.agency/agencyanalytics-alternative-for-seo-reporting",
      "en-IE": "https://reportr.agency/agencyanalytics-alternative-for-seo-reporting",
      "en-IN": "https://reportr.agency/agencyanalytics-alternative-for-seo-reporting",
      "x-default": "https://reportr.agency/agencyanalytics-alternative-for-seo-reporting"
    }
  },
  
  openGraph: {
    title: "AgencyAnalytics Alternative for SEO Reporting | Reportr",
    description: "Looking for an AgencyAnalytics alternative? Reportr delivers focused SEO reports at $29/mo vs AgencyAnalytics' $79+. No enterprise complexity. Try free.",
    url: "https://reportr.agency/agencyanalytics-alternative-for-seo-reporting",
    siteName: "Reportr",
    type: "website",
    locale: "en_US",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "AgencyAnalytics Alternative for SEO Reporting | Reportr",
    description: "Looking for an AgencyAnalytics alternative? Reportr delivers focused SEO reports at $29/mo vs AgencyAnalytics' $79+. No enterprise complexity. Try free.",
  },
};

// Schema Markup Components
const StructuredData = () => {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Reportr - AgencyAnalytics Alternative",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "A focused, affordable alternative to AgencyAnalytics for SEO reporting. Generate professional white-label PDF reports with Google Search Console, GA4, and PageSpeed data.",
    "url": "https://reportr.agency/agencyanalytics-alternative-for-seo-reporting",
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
        "name": "Can Reportr replace AgencyAnalytics for SEO reporting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, if you primarily need SEO reports. Reportr covers Google Search Console, Google Analytics 4, and PageSpeed Insights with AI recommendations. If you need multi-channel reporting (PPC, social, email), AgencyAnalytics' 80+ integrations may be better. For SEO-focused agencies, Reportr is simpler and more affordable."
        }
      },
      {
        "@type": "Question",
        "name": "How does pricing compare to AgencyAnalytics?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AgencyAnalytics starts from approximately $79/month for enterprise features. Reportr starts at $29/month (or free for 1 client). Both offer white-label branding, but Reportr includes it in all paid plans without requiring enterprise tiers."
        }
      },
      {
        "@type": "Question",
        "name": "What do I lose by switching from AgencyAnalytics to Reportr?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You'll lose AgencyAnalytics' 80+ integrations for PPC, social media, email marketing, and CRM platforms. Reportr focuses specifically on SEO data sources. If you need comprehensive multi-channel reporting, AgencyAnalytics is more suitable. If SEO reporting is your priority, Reportr offers simplicity and cost savings."
        }
      },
      {
        "@type": "Question",
        "name": "How long does switching from AgencyAnalytics take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "About 5 minutes per client. Simply add clients to Reportr and connect their Google accounts. There's no complex setup or template building required. Reportr pulls fresh data directly from Google APIs, so no historical data migration is needed."
        }
      },
      {
        "@type": "Question",
        "name": "What if I need PPC and social reporting too?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you need multi-channel reporting beyond SEO, AgencyAnalytics is likely a better fit with its 80+ integrations. You could also use Reportr for SEO reports and keep AgencyAnalytics for other channels, or use specialized tools for each channel. Reportr excels specifically at SEO reporting."
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

export default function AgencyAnalyticsAlternativePage() {
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
                  <span className="text-yellow-300 font-semibold text-sm">The simpler alternative to AgencyAnalytics</span>
                </div>
                
                {/* H1 */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  AgencyAnalytics Alternative for SEO Reporting
                  <span className="block text-yellow-300">Try Reportr</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  AgencyAnalytics is powerful but overkill if you only need SEO reports. <strong className="text-yellow-300">Reportr</strong> delivers professional white-label PDFs in 30 seconds at a fraction of the cost.
                </p>
                
                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8 text-sm text-white/90">
                  <span>• No enterprise complexity</span>
                  <span>• $29/mo vs $79+/mo</span>
                  <span>• 5 minutes to first report</span>
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
                <p className="text-white/80 text-sm mt-4">Free plan available • No setup fees • Cancel anytime</p>
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

        {/* WHY SWITCH FROM AGENCYANALYTICS */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Agencies Switch from AgencyAnalytics</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                AgencyAnalytics is excellent for enterprise marketing teams. But if SEO reporting is your focus, here&apos;s why <strong>Reportr</strong> might be a better fit.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Paying for enterprise suite */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Paying for 80+ Integrations You Don&apos;t Use</h3>
                <p className="text-gray-700">
                  AgencyAnalytics connects to everything — PPC, social media, email marketing, CRM, reviews, and more. If you only need SEO data from Google Search Console and GA4, you&apos;re paying enterprise prices for features you&apos;ll never touch. <strong>Reportr</strong> focuses on SEO at a fraction of the cost.
                </p>
              </div>
              
              {/* Complex enterprise onboarding */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Enterprise Setup Takes Days, Not Minutes</h3>
                <p className="text-gray-700">
                  AgencyAnalytics requires extensive configuration, custom dashboards, and training to use effectively. Great for large teams, but overkill for simple SEO reporting. <strong>Reportr</strong> has pre-built templates — connect Google accounts and generate reports in 5 minutes.
                </p>
              </div>
              
              {/* Price shock */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Price Shock as You Scale</h3>
                <p className="text-gray-700">
                  AgencyAnalytics pricing scales with campaigns and features. What starts around $79/month can quickly become $200+/month as you add clients. <strong>Reportr</strong> pricing is transparent: $29-99/month based on client count, with white-label included at every tier.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW TO SWITCH */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Switch from AgencyAnalytics in 5 Minutes</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Three simple steps to professional SEO reports without the enterprise complexity.</p>
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
                <p className="text-gray-600">Add your client&apos;s domain and connect Google Search Console + GA4. Same data sources as AgencyAnalytics, simpler setup. Takes 2 minutes per client.</p>
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
                <p className="text-gray-600">Upload your logo, choose your colors. White-label branding included in all paid plans — no enterprise tier required like with AgencyAnalytics.</p>
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
                <p className="text-gray-600">Click one button. Professional PDF ready in 30 seconds. No dashboard building or template configuration required.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES VS AGENCYANALYTICS */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What You Get with Reportr vs AgencyAnalytics</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Focused SEO features without the enterprise complexity.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* One-Click Reports */}
              <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100">
                <div className="w-14 h-14 bg-brand-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-800 mb-3">One-Click PDF Reports</h3>
                <p className="text-gray-700">
                  AgencyAnalytics requires custom dashboard building and manual exports. <strong>Reportr</strong> generates professional PDFs in 30 seconds with pre-built templates.
                </p>
              </div>
              
              {/* Included White-Label */}
              <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100">
                <div className="w-14 h-14 bg-brand-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-800 mb-3">White-Label Included</h3>
                <p className="text-gray-700">
                  AgencyAnalytics charges extra for white-label features in higher tiers. <strong>Reportr</strong> includes your logo and colors in all paid plans starting at $29/month.
                </p>
              </div>
              
              {/* AI Recommendations */}
              <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100">
                <div className="w-14 h-14 bg-brand-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-800 mb-3">AI-Powered Insights</h3>
                <p className="text-gray-700">
                  AgencyAnalytics shows raw data. <strong>Reportr</strong> uses Claude AI to analyze SEO data and generate actionable recommendations that help clients improve rankings.
                </p>
              </div>
              
              {/* Simple Setup */}
              <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100">
                <div className="w-14 h-14 bg-brand-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-800 mb-3">5-Minute Setup</h3>
                <p className="text-gray-700">
                  AgencyAnalytics requires extensive onboarding and training. <strong>Reportr</strong> is designed for simplicity — most users generate their first report within 5 minutes of signing up.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Reportr vs AgencyAnalytics</h2>
              <p className="text-xl text-gray-600">Side-by-side comparison to help you decide.</p>
            </div>
            
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-600">AgencyAnalytics</th>
                    <th className="text-center py-4 px-6 font-semibold text-brand-600">Reportr</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Starting Price</td>
                    <td className="py-4 px-6 text-center text-gray-600">From ~$79/mo</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">$29/mo (or free)</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Time to Generate Report</td>
                    <td className="py-4 px-6 text-center text-gray-600">5-15 mins (after setup)</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">30 seconds</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">White-Label Branding</td>
                    <td className="py-4 px-6 text-center text-gray-600">Higher tiers only</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">All paid plans</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Data Sources</td>
                    <td className="py-4 px-6 text-center text-green-600">80+ integrations</td>
                    <td className="py-4 px-6 text-center text-gray-600">GSC + GA4 + PageSpeed</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">AI Recommendations</td>
                    <td className="py-4 px-6 text-center text-gray-500">No</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Yes (Claude AI)</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Setup Time</td>
                    <td className="py-4 px-6 text-center text-gray-600">Days (full onboarding)</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">5 minutes</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Learning Curve</td>
                    <td className="py-4 px-6 text-center text-gray-600">Steep (enterprise tool)</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Minimal</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700 font-medium">Free Plan Available?</td>
                    <td className="py-4 px-6 text-center text-gray-500">No</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Yes (1 client, 5 reports)</td>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Questions About Switching from AgencyAnalytics</h2>
              <p className="text-xl text-gray-600">Common questions about making the switch to <strong>Reportr</strong>.</p>
            </div>
            
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Can Reportr replace AgencyAnalytics for SEO reporting?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Yes, if you primarily need SEO reports. <strong>Reportr</strong> covers Google Search Console, Google Analytics 4, and PageSpeed Insights with AI recommendations. If you need multi-channel reporting (PPC, social, email), AgencyAnalytics&apos; 80+ integrations may be better. For SEO-focused agencies, <strong>Reportr</strong> is simpler and more affordable.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  How does pricing compare to AgencyAnalytics?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  AgencyAnalytics starts from approximately $79/month for enterprise features. <strong>Reportr</strong> starts at $29/month (or free for 1 client). Both offer white-label branding, but <strong>Reportr</strong> includes it in all paid plans without requiring enterprise tiers.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  What do I lose by switching from AgencyAnalytics to Reportr?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  You&apos;ll lose AgencyAnalytics&apos; 80+ integrations for PPC, social media, email marketing, and CRM platforms. <strong>Reportr</strong> focuses specifically on SEO data sources. If you need comprehensive multi-channel reporting, AgencyAnalytics is more suitable. If SEO reporting is your priority, <strong>Reportr</strong> offers simplicity and cost savings.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  How long does switching from AgencyAnalytics take?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  About 5 minutes per client. Simply add clients to <strong>Reportr</strong> and connect their Google accounts. There&apos;s no complex setup or template building required. <strong>Reportr</strong> pulls fresh data directly from Google APIs, so no historical data migration is needed.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  What if I need PPC and social reporting too?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  If you need multi-channel reporting beyond SEO, AgencyAnalytics is likely a better fit with its 80+ integrations. You could also use <strong>Reportr</strong> for SEO reports and keep AgencyAnalytics for other channels, or use specialized tools for each channel. <strong>Reportr</strong> excels specifically at SEO reporting.
                </div>
              </details>
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
                  <li>White-label included ✓</li>
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
                  <li>White-label included ✓</li>
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
                  <li>White-label included ✓</li>
                </ul>
                <a href="/signup?plan=agency" className="block text-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
                  Start Trial
                </a>
              </div>
            </div>
            
            <p className="text-center text-gray-500 text-sm mt-6">
              All paid plans include a 14-day free trial. White-label branding is included in all paid plans.
              <a href="/pricing" className="text-brand-600 hover:underline ml-1">See full pricing details →</a>
            </p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Switch from AgencyAnalytics?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Try <strong>Reportr</strong> free. Get the SEO reporting you need without the enterprise complexity.
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
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Switch in 5 minutes</span>
              </div>
            </div>
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Resources</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <a href="/blog/best-white-label-seo-reporting-tool" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Guide</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Best White Label SEO Reporting Tools (2026)</h3>
                <p className="text-gray-600 text-sm">Compare the top white-label SEO reporting platforms for agencies.</p>
              </a>
              
              <a href="/blog/white-label-seo-reporting-guide" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Complete Guide</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Complete White Label SEO Reporting Guide</h3>
                <p className="text-gray-600 text-sm">Everything agencies need to know about white-label SEO reporting.</p>
              </a>
              
              <a href="/swydo-alternative-for-seo-reporting" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Alternative</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Swydo Alternative for SEO Reporting</h3>
                <p className="text-gray-600 text-sm">Compare Swydo vs <strong>Reportr</strong> for SEO reporting needs.</p>
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
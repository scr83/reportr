import { Metadata } from 'next';
import Image from 'next/image';
import { Header, Footer } from '@/components/landing';

export const metadata: Metadata = {
  title: "SEO Report Template for Real Estate | Reportr",
  description: "Create professional SEO reports for real estate clients. Track local rankings, neighborhood keywords, seasonal trends. White-label realtor SEO reporting from $29/mo.",
  
  robots: {
    index: true,
    follow: true,
  },
  
  alternates: {
    canonical: "https://reportr.agency/seo-report-template-for-real-estate",
    languages: {
      "en-US": "https://reportr.agency/seo-report-template-for-real-estate",
      "en-GB": "https://reportr.agency/seo-report-template-for-real-estate",
      "en-AU": "https://reportr.agency/seo-report-template-for-real-estate",
      "en-CA": "https://reportr.agency/seo-report-template-for-real-estate",
      "en-NZ": "https://reportr.agency/seo-report-template-for-real-estate",
      "en-IE": "https://reportr.agency/seo-report-template-for-real-estate",
      "en-IN": "https://reportr.agency/seo-report-template-for-real-estate",
      "x-default": "https://reportr.agency/seo-report-template-for-real-estate"
    }
  },
  
  openGraph: {
    title: "SEO Report Template for Real Estate | Reportr",
    description: "Create professional SEO reports for real estate clients. Track local rankings, neighborhood keywords, seasonal trends. White-label realtor SEO reporting from $29/mo.",
    url: "https://reportr.agency/seo-report-template-for-real-estate",
    siteName: "Reportr",
    type: "website",
    locale: "en_US",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "SEO Report Template for Real Estate | Reportr",
    description: "Create professional SEO reports for real estate clients. Track local rankings, neighborhood keywords, seasonal trends. White-label realtor SEO reporting from $29/mo.",
  },
};

// Schema Markup Components
const StructuredData = () => {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Reportr - SEO Report Template for Real Estate",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "Generate professional white-label SEO reports specifically designed for real estate agencies. Track hyper-local keyword rankings, neighborhood visibility, and seasonal performance for realtors and brokerages. Pull data from Google Search Console, GA4, and PageSpeed Insights automatically.",
    "url": "https://reportr.agency/seo-report-template-for-real-estate",
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
        "name": "Can I track rankings for specific city and neighborhood keywords?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Reportr's GSC keyword data shows position for every query that triggers impressions, including hyper-local terms like '[neighborhood] homes for sale' and '[city] real estate agent'. You can focus reports on location-specific performance."
        }
      },
      {
        "@type": "Question",
        "name": "How do I handle seasonal traffic dips in real estate reports?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reportr's date range flexibility allows year-over-year comparisons to show growth despite seasonal patterns. You can compare current spring performance to last spring, or show how winter months performed versus the previous year."
        }
      },
      {
        "@type": "Question",
        "name": "Does Reportr work for multi-location real estate brokerages?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Each office or location can be set up as a separate client with its own Google Search Console property in Reportr. This allows location-specific reporting for different markets and regions within a larger brokerage."
        }
      },
      {
        "@type": "Question",
        "name": "What metrics do real estate clients care about most?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Real estate clients focus on local keyword rankings for their city/neighborhood terms, traffic to location-specific pages, mobile page speed (since home buyers search on mobile while driving), and visibility for high-intent search terms."
        }
      },
      {
        "@type": "Question",
        "name": "Can I exclude auto-generated listing pages from the report?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Reportr's Custom Report options allow you to focus on specific page segments. You can emphasize core pages like city pages and agent profiles while de-emphasizing individual property listing pages that create reporting noise."
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

export default function RealEstateSEOReportPage() {
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
                  <span className="text-yellow-300 font-semibold text-sm">SEO reporting built for real estate agencies</span>
                </div>
                
                {/* H1 */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  SEO Report Template for
                  <span className="block text-yellow-300">Real Estate</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  Real estate is hyper-local and competitive. Show clients exactly how they rank for neighborhood keywords and seasonal market trends.
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
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">PR</span>
                      </div>
                      <div>
                        <div className="text-gray-900 font-semibold">Premier Realty Austin</div>
                        <div className="text-gray-500 text-sm">Real Estate SEO Report</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-green-600 text-xs font-medium">Local Rankings</div>
                        <div className="text-green-700 text-xl font-bold">#3</div>
                        <div className="text-green-600 text-xs">&quot;austin realtor&quot;</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-blue-600 text-xs font-medium">Neighborhood Traffic</div>
                        <div className="text-blue-700 text-xl font-bold">4,892</div>
                        <div className="text-blue-600 text-xs">↑ 29% vs last year</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-purple-600 text-xs font-medium">Mobile Speed</div>
                        <div className="text-purple-700 text-xl font-bold">91</div>
                        <div className="text-purple-600 text-xs">Excellent</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="text-orange-600 text-xs font-medium">Seasonal Growth</div>
                        <div className="text-orange-700 text-xl font-bold">+47%</div>
                        <div className="text-orange-600 text-xs">Spring vs Winter</div>
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
                        Your &quot;Westlake homes for sale&quot; page ranks #6 — optimize to capture position 2-3 for this high-value neighborhood...
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Real Estate SEO Reporting Is Different</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Real estate has unique challenges that generic SEO dashboards completely fail to address.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Hyper-Local Keywords Are Everything */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Hyper-Local Keywords Are Everything</h3>
                <p className="text-gray-700">
                  Real estate clients don&apos;t care about ranking nationally. They care about &quot;[neighborhood] homes for sale&quot; and &quot;[city] real estate agent.&quot; Reports need to show performance on location-specific queries, not general traffic stats.
                </p>
              </div>
              
              {/* Seasonal Fluctuations Confuse Clients */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Seasonal Fluctuations Confuse Clients</h3>
                <p className="text-gray-700">
                  Real estate has strong seasonal patterns (spring/summer peaks). When traffic dips in winter, clients panic unless the report contextualizes the data and shows year-over-year trends rather than just month-over-month.
                </p>
              </div>
              
              {/* Listing Pages Create Duplicate Content Reporting Noise */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Listing Pages Create Duplicate Content Reporting Noise</h3>
                <p className="text-gray-700">
                  Real estate sites often have hundreds of auto-generated listing pages. Reports that show all pages equally create noise. Agencies need to highlight core pages (city pages, agent profiles, blog posts) vs. individual listing pages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Create Real Estate SEO Reports in 3 Steps</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Show real estate clients exactly how they rank for the neighborhoods and cities that matter most.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-brand-700 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Connect Your Client&apos;s Google Accounts</h3>
                <p className="text-gray-600">Connect their Google Search Console, Google Analytics 4, and PageSpeed Insights through secure OAuth. <strong>Reportr</strong> automatically pulls data from their local keyword rankings and neighborhood page performance.</p>
              </div>
              
              {/* Step 2 */}
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-brand-700 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Choose Your Report Type &amp; Customize Metrics</h3>
                <p className="text-gray-600">Use the Custom Report builder to focus on real estate-specific metrics: city and neighborhood rankings, mobile performance for on-the-go home buyers, and seasonal trend comparisons.</p>
              </div>
              
              {/* Step 3 */}
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-brand-700 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Generate &amp; Send the Branded PDF</h3>
                <p className="text-gray-600">One-click PDF generation with your agency branding. Reports include AI recommendations that help real estate professionals understand which SEO improvements will drive the most local visibility and leads.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Everything You Need for Real Estate SEO Reports</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Features designed specifically for agencies managing realtors, brokerages, and real estate marketing clients.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Hyper-Local Keyword Tracking */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Hyper-Local Keyword Performance</h3>
                <p className="text-gray-600 text-sm">Track rankings for neighborhood-specific and city-based keywords that actually drive real estate leads. Focus on location terms that matter to property buyers and sellers.</p>
              </div>
              
              {/* Seasonal Trend Analysis */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Seasonal Trend Reporting</h3>
                <p className="text-gray-600 text-sm">Real estate has strong seasonal patterns. Show year-over-year comparisons to contextualize performance and help clients understand natural market fluctuations.</p>
              </div>
              
              {/* Mobile-First Focus */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Mobile-First Performance</h3>
                <p className="text-gray-600 text-sm">Home buyers search while driving through neighborhoods. Track mobile page speeds and mobile search performance to ensure optimal user experience for on-the-go prospects.</p>
              </div>
              
              {/* Multi-Location Support */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Multi-Market Reporting</h3>
                <p className="text-gray-600 text-sm">Support for brokerages with multiple office locations or agents working different neighborhoods. Create location-specific reports for different markets and regions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* INDUSTRY METRICS TABLE */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key SEO Metrics for Real Estate Reports</h2>
              <p className="text-xl text-gray-600">Essential KPIs that real estate clients actually care about, and how <strong>Reportr</strong> surfaces them.</p>
            </div>
            
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Metric</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Why It Matters for Real Estate</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Reportr Source</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Rankings for &quot;[city] real estate&quot; terms</td>
                    <td className="py-4 px-6 text-gray-600">Core business visibility — how easily prospects find the agent or brokerage</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GSC position data</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Organic traffic to city/neighborhood pages</td>
                    <td className="py-4 px-6 text-gray-600">Location-specific lead generation from people researching specific areas</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GA4 landing pages</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Mobile page speed</td>
                    <td className="py-4 px-6 text-gray-600">Home buyers search on phones while driving through neighborhoods</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">PageSpeed Insights</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Top performing local queries</td>
                    <td className="py-4 px-6 text-gray-600">Which neighborhood and property type terms are working best</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GSC keyword data</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Organic traffic trends (YoY)</td>
                    <td className="py-4 px-6 text-gray-600">Shows growth despite seasonal dips — contextualizes performance</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GA4 traffic trends</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Click-through rate on listing keywords</td>
                    <td className="py-4 px-6 text-gray-600">Competitive search results need compelling titles to attract home buyer clicks</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GSC CTR data</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700 font-medium">Core vs listing page performance</td>
                    <td className="py-4 px-6 text-gray-600">Distinguish between permanent pages and auto-generated listing content</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GSC + GA4 segmentation</td>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Real Estate SEO Reporting Questions</h2>
              <p className="text-xl text-gray-600">Common questions from agencies managing real estate marketing clients.</p>
            </div>
            
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Can I track rankings for specific city and neighborhood keywords?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Yes, <strong>Reportr&apos;s</strong> GSC keyword data shows position for every query that triggers impressions, including hyper-local terms like &quot;[neighborhood] homes for sale&quot; and &quot;[city] real estate agent.&quot; You can focus reports on location-specific performance that matters most to real estate clients.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  How do I handle seasonal traffic dips in real estate reports?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <strong>Reportr&apos;s</strong> date range flexibility allows year-over-year comparisons to show growth despite seasonal patterns. You can compare current spring performance to last spring, or show how winter months performed versus the previous year. This helps contextualize natural market fluctuations.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Does Reportr work for multi-location real estate brokerages?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Each office or location can be set up as a separate client with its own Google Search Console property in <strong>Reportr</strong>. This allows location-specific reporting for different markets and regions within a larger brokerage, helping track performance across multiple territories.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  What metrics do real estate clients care about most?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Real estate clients focus on local keyword rankings for their city/neighborhood terms, traffic to location-specific pages, mobile page speed (since home buyers search on mobile while driving), and visibility for high-intent search terms. <strong>Reportr</strong> emphasizes these location-based metrics over generic SEO data.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Can I exclude auto-generated listing pages from the report?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Yes, <strong>Reportr&apos;s</strong> Custom Report options allow you to focus on specific page segments. You can emphasize core pages like city pages and agent profiles while de-emphasizing individual property listing pages that create reporting noise and don&apos;t reflect long-term SEO strategy performance.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Creating Location-Focused Real Estate SEO Reports</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Show real estate clients exactly how they rank for the neighborhoods and markets that drive their business.
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
              <a href="/blog/what-is-white-label-seo-report" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Guide</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">What Is a White Label SEO Report?</h3>
                <p className="text-gray-600 text-sm">Understanding white-label SEO reports and how they help agencies retain clients.</p>
              </a>
              
              <a href="/blog/white-label-seo-reporting-guide" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Ultimate Guide</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Complete White Label SEO Reporting Guide</h3>
                <p className="text-gray-600 text-sm">Everything agencies need to know about white-label SEO reporting.</p>
              </a>
              
              <a href="/seo-report-template-for-local-businesses" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">For Local Businesses</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">SEO Report Template for Local Businesses</h3>
                <p className="text-gray-600 text-sm">Professional SEO reports designed for local business and brick-and-mortar clients.</p>
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
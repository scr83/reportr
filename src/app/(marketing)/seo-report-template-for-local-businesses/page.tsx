import { Metadata } from 'next';
import Image from 'next/image';
import { Header, Footer } from '@/components/landing';

export const metadata: Metadata = {
  title: "SEO Report Template for Local Businesses | Reportr",
  description: "Create professional SEO reports for local business clients. Track local rankings, near me queries, mobile performance. White-label local SEO reporting from $29/mo.",
  
  robots: {
    index: true,
    follow: true,
  },
  
  alternates: {
    canonical: "https://reportr.agency/seo-report-template-for-local-businesses",
    languages: {
      "en-US": "https://reportr.agency/seo-report-template-for-local-businesses",
      "en-GB": "https://reportr.agency/seo-report-template-for-local-businesses",
      "en-AU": "https://reportr.agency/seo-report-template-for-local-businesses",
      "en-CA": "https://reportr.agency/seo-report-template-for-local-businesses",
      "en-NZ": "https://reportr.agency/seo-report-template-for-local-businesses",
      "en-IE": "https://reportr.agency/seo-report-template-for-local-businesses",
      "en-IN": "https://reportr.agency/seo-report-template-for-local-businesses",
      "x-default": "https://reportr.agency/seo-report-template-for-local-businesses"
    }
  },
  
  openGraph: {
    title: "SEO Report Template for Local Businesses | Reportr",
    description: "Create professional SEO reports for local business clients. Track local rankings, near me queries, mobile performance. White-label local SEO reporting from $29/mo.",
    url: "https://reportr.agency/seo-report-template-for-local-businesses",
    siteName: "Reportr",
    type: "website",
    locale: "en_US",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "SEO Report Template for Local Businesses | Reportr",
    description: "Create professional SEO reports for local business clients. Track local rankings, near me queries, mobile performance. White-label local SEO reporting from $29/mo.",
  },
};

// Schema Markup Components
const StructuredData = () => {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Reportr - SEO Report Template for Local Businesses",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "Generate professional white-label SEO reports specifically designed for local business agencies. Track local keyword rankings, near me queries, and mobile performance for brick-and-mortar clients. Pull data from Google Search Console, GA4, and PageSpeed Insights automatically.",
    "url": "https://reportr.agency/seo-report-template-for-local-businesses",
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
        "name": "Can Reportr track Google Maps / Google Business Profile rankings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reportr pulls Google Search Console data which includes local organic results. For GBP-specific metrics (calls, directions, profile views), those live in Google Business Profile itself and are not currently pulled into Reportr reports."
        }
      },
      {
        "@type": "Question",
        "name": "My local clients don't understand SEO. How do I make reports they'll actually read?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use Reportr's Executive Summary report type which highlights key wins in plain language. Focus on business outcomes like increased visibility for their city + service terms rather than technical metrics."
        }
      },
      {
        "@type": "Question",
        "name": "What local SEO metrics should I include in client reports?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Focus on local keyword rankings, organic traffic from local terms, mobile vs desktop traffic split, mobile page speed, and click-through rates on local queries. These metrics directly impact local business visibility and customer acquisition."
        }
      },
      {
        "@type": "Question",
        "name": "Can I report on multiple locations for a multi-location client?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Each location's Google Search Console property can be connected as a separate client in Reportr. This allows you to create location-specific reports for multi-location businesses with different GSC properties per location."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a simpler report for small local businesses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Reportr's Executive Summary report type provides a simplified overview perfect for small local businesses. It focuses on key performance indicators in plain language rather than overwhelming technical details."
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

export default function LocalBusinessSEOReportPage() {
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
                  <span className="text-yellow-300 font-semibold text-sm">SEO reporting built for local business agencies</span>
                </div>
                
                {/* H1 */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  SEO Report Template for
                  <span className="block text-yellow-300">Local Businesses</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  Local clients need simple reports that connect SEO to real business outcomes. Show them how search visibility drives phone calls and foot traffic.
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
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">MC</span>
                      </div>
                      <div>
                        <div className="text-gray-900 font-semibold">Metro Dental Care</div>
                        <div className="text-gray-500 text-sm">Local SEO Report</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-green-600 text-xs font-medium">Local Clicks</div>
                        <div className="text-green-700 text-xl font-bold">2,847</div>
                        <div className="text-green-600 text-xs">↑ 34% vs last month</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-blue-600 text-xs font-medium">Near Me Queries</div>
                        <div className="text-blue-700 text-xl font-bold">1,203</div>
                        <div className="text-blue-600 text-xs">↑ 28% growth</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-purple-600 text-xs font-medium">Mobile Speed</div>
                        <div className="text-purple-700 text-xl font-bold">94</div>
                        <div className="text-purple-600 text-xs">Excellent</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="text-orange-600 text-xs font-medium">City Rankings</div>
                        <div className="text-orange-700 text-xl font-bold">#3</div>
                        <div className="text-orange-600 text-xs">&quot;dentist austin&quot;</div>
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
                        Your &quot;emergency dentist&quot; page ranks #8 — optimize for higher visibility to capture more urgent care patients...
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Local Business SEO Reporting Is Different</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Local clients have unique needs and expectations that generic SEO dashboards completely miss.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Local Clients Don't Understand SEO Metrics */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Local Clients Don&apos;t Understand SEO Metrics</h3>
                <p className="text-gray-700">
                  A restaurant owner doesn&apos;t care about &quot;impressions&quot; or &quot;CTR.&quot; They want to know if more people found them on Google this month. Reports need to translate technical data into business outcomes they actually understand.
                </p>
              </div>
              
              {/* Near Me and Map Pack Performance Is Hard to Report */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">&quot;Near Me&quot; and Map Pack Performance Is Hard to Report</h3>
                <p className="text-gray-700">
                  Local SEO success happens in Google Maps and local packs, but most reporting tools focus on organic blue-link rankings. Agencies struggle to show local visibility improvements that matter most to brick-and-mortar businesses.
                </p>
              </div>
              
              {/* High Client Churn Because They Can't See ROI */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">High Client Churn Because They Can&apos;t See ROI</h3>
                <p className="text-gray-700">
                  Local businesses have tight budgets. If the monthly report doesn&apos;t clearly show &quot;you got X more phone calls/visits from Google,&quot; they cancel. Clear, simple reporting is the #1 retention tool for local SEO agencies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Create Local Business SEO Reports in 3 Steps</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Show local clients exactly how SEO drives more customers through their doors.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-brand-700 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Connect Your Client&apos;s Google Accounts</h3>
                <p className="text-gray-600">Connect their Google Search Console, Google Analytics 4, and PageSpeed Insights through secure OAuth. <strong>Reportr</strong> automatically pulls data from their local keyword rankings and website performance.</p>
              </div>
              
              {/* Step 2 */}
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-brand-700 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Choose Your Report Type &amp; Customize Metrics</h3>
                <p className="text-gray-600">Use the Custom Report builder to focus on local-specific metrics: city keyword rankings, mobile performance, &quot;near me&quot; query traffic, and location-based search visibility that matters to local clients.</p>
              </div>
              
              {/* Step 3 */}
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-brand-700 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Generate &amp; Send the Branded PDF</h3>
                <p className="text-gray-600">One-click PDF generation with your agency branding. Reports include AI recommendations in plain language that help local business owners understand exactly what SEO improvements will drive more customers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Everything You Need for Local Business SEO Reports</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Features designed specifically for agencies managing local businesses and location-based SEO campaigns.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Local Keyword Tracking */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Local Keyword Performance</h3>
                <p className="text-gray-600 text-sm">Track rankings for city-specific and &quot;near me&quot; keywords that actually drive foot traffic and phone calls to local businesses. Show visibility for what matters most.</p>
              </div>
              
              {/* Mobile-First Reporting */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Mobile-First Performance</h3>
                <p className="text-gray-600 text-sm">Local searches are 80%+ mobile. Track mobile page speeds, mobile search performance, and mobile user experience metrics that directly impact local customer acquisition.</p>
              </div>
              
              {/* Plain Language Insights */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Plain Language Insights</h3>
                <p className="text-gray-600 text-sm">AI recommendations written for business owners, not SEO experts. Help local clients understand exactly what improvements will drive more customers through clear, jargon-free explanations.</p>
              </div>
              
              {/* Multi-Location Support */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Multi-Location Support</h3>
                <p className="text-gray-600 text-sm">Manage multiple locations for franchise clients or businesses with several offices. Each location can have its own tailored report showing performance for that specific market.</p>
              </div>
            </div>
          </div>
        </section>

        {/* INDUSTRY METRICS TABLE */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key SEO Metrics for Local Business Reports</h2>
              <p className="text-xl text-gray-600">Essential KPIs that local business clients actually care about, and how <strong>Reportr</strong> surfaces them.</p>
            </div>
            
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Metric</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Why It Matters for Local Business</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Reportr Source</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Local keyword rankings</td>
                    <td className="py-4 px-6 text-gray-600">Visibility for &quot;[service] near me&quot; and city-specific queries drives local discovery</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GSC position data</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Organic traffic from local terms</td>
                    <td className="py-4 px-6 text-gray-600">Shows how many people are finding the business via location-based searches</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GA4 organic sessions</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Mobile vs desktop traffic split</td>
                    <td className="py-4 px-6 text-gray-600">Local searches are predominantly mobile — understand customer behavior patterns</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GA4 device data</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Page load speed (mobile)</td>
                    <td className="py-4 px-6 text-gray-600">Slow mobile sites lose local customers who search while driving or walking</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">PageSpeed Insights</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Top performing local queries</td>
                    <td className="py-4 px-6 text-gray-600">Identifies which local search terms are driving the most customer discovery</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GSC keyword data</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Click-through rate on local queries</td>
                    <td className="py-4 px-6 text-gray-600">Shows whether business listings are compelling enough to attract clicks</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GSC CTR data</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700 font-medium">Geographic traffic distribution</td>
                    <td className="py-4 px-6 text-gray-600">Understanding where customers come from helps optimize local marketing efforts</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GA4 geographic data</td>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Local Business SEO Reporting Questions</h2>
              <p className="text-xl text-gray-600">Common questions from agencies managing local SEO clients.</p>
            </div>
            
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Can Reportr track Google Maps / Google Business Profile rankings?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <strong>Reportr</strong> pulls Google Search Console data which includes local organic results. For GBP-specific metrics (calls, directions, profile views), those live in Google Business Profile itself and are not currently pulled into <strong>Reportr</strong> reports.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  My local clients don&apos;t understand SEO. How do I make reports they&apos;ll actually read?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Use <strong>Reportr&apos;s</strong> Executive Summary report type which highlights key wins in plain language. Focus on business outcomes like increased visibility for their city + service terms rather than technical metrics. The AI recommendations are written for business owners, not SEO experts.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  What local SEO metrics should I include in client reports?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Focus on local keyword rankings, organic traffic from local terms, mobile vs desktop traffic split, mobile page speed, and click-through rates on local queries. These metrics directly impact local business visibility and customer acquisition. <strong>Reportr&apos;s</strong> Custom Report builder lets you select these specific local-focused metrics.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Can I report on multiple locations for a multi-location client?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Each location&apos;s Google Search Console property can be connected as a separate client in <strong>Reportr</strong>. This allows you to create location-specific reports for multi-location businesses, with each location getting its own performance data and recommendations.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Is there a simpler report for small local businesses?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Yes, <strong>Reportr&apos;s</strong> Executive Summary report type provides a simplified overview perfect for small local businesses. It focuses on key performance indicators in plain language rather than overwhelming technical details that business owners don&apos;t need.
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Creating Client-Friendly Local SEO Reports</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Show local business owners exactly how SEO drives more customers to their doors.
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
              
              <a href="/white-label-seo-reports-for-small-agencies" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">For Small Agencies</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">White Label SEO Reports for Small Agencies</h3>
                <p className="text-gray-600 text-sm">Affordable white-label SEO reporting solutions for smaller marketing teams.</p>
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
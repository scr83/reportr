import { Metadata } from 'next';
import Image from 'next/image';
import { Header, Footer } from '@/components/landing';

export const metadata: Metadata = {
  title: "SEO Report Template for Ecommerce | Reportr",
  description: "Create professional SEO reports for ecommerce clients. Track product pages, category rankings, organic revenue impact. White-label ecommerce SEO reporting from $29/mo.",
  
  robots: {
    index: true,
    follow: true,
  },
  
  alternates: {
    canonical: "https://reportr.agency/seo-report-template-for-ecommerce",
    languages: {
      "en-US": "https://reportr.agency/seo-report-template-for-ecommerce",
      "en-GB": "https://reportr.agency/seo-report-template-for-ecommerce",
      "en-AU": "https://reportr.agency/seo-report-template-for-ecommerce",
      "en-CA": "https://reportr.agency/seo-report-template-for-ecommerce",
      "en-NZ": "https://reportr.agency/seo-report-template-for-ecommerce",
      "en-IE": "https://reportr.agency/seo-report-template-for-ecommerce",
      "en-IN": "https://reportr.agency/seo-report-template-for-ecommerce",
      "x-default": "https://reportr.agency/seo-report-template-for-ecommerce"
    }
  },
  
  openGraph: {
    title: "SEO Report Template for Ecommerce | Reportr",
    description: "Create professional SEO reports for ecommerce clients. Track product pages, category rankings, organic revenue impact. White-label ecommerce SEO reporting from $29/mo.",
    url: "https://reportr.agency/seo-report-template-for-ecommerce",
    siteName: "Reportr",
    type: "website",
    locale: "en_US",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "SEO Report Template for Ecommerce | Reportr",
    description: "Create professional SEO reports for ecommerce clients. Track product pages, category rankings, organic revenue impact. White-label ecommerce SEO reporting from $29/mo.",
  },
};

// Schema Markup Components
const StructuredData = () => {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Reportr - SEO Report Template for Ecommerce",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "Generate professional white-label SEO reports specifically designed for ecommerce agencies. Track product pages, category rankings, and organic traffic that drives sales. Pull data from Google Search Console, GA4, and PageSpeed Insights automatically.",
    "url": "https://reportr.agency/seo-report-template-for-ecommerce",
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
        "name": "Does Reportr have a specific ecommerce report template?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reportr doesn\u0027t have pre-built industry-specific templates, but our Custom Report builder lets you focus on ecommerce-relevant metrics like product page traffic, category rankings, and conversion-focused data from Google Search Console and GA4."
        }
      },
      {
        "@type": "Question",
        "name": "Can I track organic revenue in Reportr reports?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reportr pulls GA4 data which includes organic sessions and traffic. For revenue attribution, your client\u0027s GA4 must have ecommerce tracking configured. Reportr will show organic traffic data that can be correlated with revenue when ecommerce tracking is set up properly."
        }
      },
      {
        "@type": "Question",
        "name": "How do I report on hundreds of product pages?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reportr\u0027s GSC integration shows top pages data and GA4 landing pages data, which highlights which product pages are actually driving organic traffic. You can focus reports on your highest-performing products rather than trying to track every individual page."
        }
      },
      {
        "@type": "Question",
        "name": "What metrics should I include in ecommerce SEO reports?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Focus on organic traffic to product pages, category page rankings, product page load speeds, top converting keywords, and click-through rates by page type. Reportr\u0027s Custom Report builder lets you select these specific metrics for ecommerce clients."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create separate reports for different product categories?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, using Reportr\u0027s Custom Report feature, you can choose specific pages and metrics to focus on particular product categories. Each report can be tailored to show performance for different segments of the ecommerce site."
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

export default function EcommerceSEOReportPage() {
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
                  <span className="text-yellow-300 font-semibold text-sm">SEO reporting built for ecommerce agencies</span>
                </div>
                
                {/* H1 */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  SEO Report Template for
                  <span className="block text-yellow-300">Ecommerce</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  Ecommerce clients think in revenue, not rankings. Show them how SEO drives sales with reports that connect organic traffic to actual business outcomes.
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
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">ES</span>
                      </div>
                      <div>
                        <div className="text-gray-900 font-semibold">EcoStyle Apparel</div>
                        <div className="text-gray-500 text-sm">Ecommerce SEO Report</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-green-600 text-xs font-medium">Product Page Clicks</div>
                        <div className="text-green-700 text-xl font-bold">18,432</div>
                        <div className="text-green-600 text-xs">↑ 23% vs last month</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-blue-600 text-xs font-medium">Category Rankings</div>
                        <div className="text-blue-700 text-xl font-bold">Top 10</div>
                        <div className="text-blue-600 text-xs">89% of target keywords</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-purple-600 text-xs font-medium">Mobile Speed</div>
                        <div className="text-purple-700 text-xl font-bold">92</div>
                        <div className="text-purple-600 text-xs">Excellent</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="text-orange-600 text-xs font-medium">Organic Sessions</div>
                        <div className="text-orange-700 text-xl font-bold">45.2K</div>
                        <div className="text-orange-600 text-xs">↑ 31% growth</div>
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
                        &quot;Women&apos;s Running Shoes&quot; category ranks #4 — optimize product titles to capture position 1-2 opportunity worth $12K+ annual revenue...
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Ecommerce SEO Reporting Is Different</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Online stores have unique reporting challenges that generic SEO dashboards don&apos;t address.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Product Pages That Rank But Don't Appear */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Product Pages That Rank Don&apos;t Appear in Reports</h3>
                <p className="text-gray-700">
                  Ecommerce sites have hundreds or thousands of product pages. Generic reports miss which individual products are driving organic traffic and sales. You need reporting that highlights your best-performing inventory, not just category-level data.
                </p>
              </div>
              
              {/* Clients Want Revenue Attribution */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Clients Want Revenue Attribution, Not Just Rankings</h3>
                <p className="text-gray-700">
                  Ecommerce clients think in dollars, not positions. They want to see how SEO drives sales, not just that they moved from position 12 to position 8. Standard SEO reports don&apos;t connect traffic improvements to actual business outcomes.
                </p>
              </div>
              
              {/* Mixed Traffic Types */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 00-2 2v2m0 0V9a2 2 0 012-2h14a2 2 0 012 2v2M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Category vs Product vs Blog Traffic Is All Mixed Together</h3>
                <p className="text-gray-700">
                  Without proper segmentation, ecommerce reports lump all organic traffic together. Clients need to see which content types drive results: Are category pages working? Are product pages ranking? Is the blog actually helping sales?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Create Ecommerce SEO Reports in 3 Steps</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Show your ecommerce clients exactly which products and categories are driving organic revenue.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-brand-700 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Connect Your Client&apos;s Google Accounts</h3>
                <p className="text-gray-600">Connect their Google Search Console, Google Analytics 4, and PageSpeed Insights through secure OAuth. <strong>Reportr</strong> automatically pulls data from all their product pages, categories, and blog content.</p>
              </div>
              
              {/* Step 2 */}
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-brand-700 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Choose Your Report Type &amp; Customize Metrics</h3>
                <p className="text-gray-600">Use the Custom Report builder to focus on ecommerce-specific metrics: product page traffic, category rankings, mobile speed scores, and top converting search terms that actually drive sales.</p>
              </div>
              
              {/* Step 3 */}
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-brand-700 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Generate &amp; Send the Branded PDF</h3>
                <p className="text-gray-600">One-click PDF generation with your agency branding. Reports include AI recommendations that help clients understand which SEO improvements will drive the most additional revenue.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Everything You Need for Ecommerce SEO Reports</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Features designed specifically for agencies managing online stores and ecommerce SEO campaigns.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Product Page Performance Tracking */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Product Page Performance</h3>
                <p className="text-gray-600 text-sm">Identify which products drive the most organic traffic and which underperform. Show clients exactly which inventory needs SEO attention to boost sales.</p>
              </div>
              
              {/* Mobile Shopping Optimization */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Mobile Shopping Optimization</h3>
                <p className="text-gray-600 text-sm">Ecommerce is mobile-first. Track mobile page speeds, mobile search performance, and mobile vs desktop conversion patterns to optimize the shopping experience.</p>
              </div>
              
              {/* Category vs Product Segmentation */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 00-2 2v2m0 0V9a2 2 0 012-2h14a2 2 0 012 2v2M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Category vs Product Segmentation</h3>
                <p className="text-gray-600 text-sm">Separate reporting for category pages, individual products, and blog content. Help clients understand which parts of their funnel are working and which need optimization.</p>
              </div>
              
              {/* Revenue-Focused Insights */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Revenue-Focused Insights</h3>
                <p className="text-gray-600 text-sm">AI recommendations that prioritize changes likely to drive sales. Focus clients on SEO improvements that impact their bottom line, not vanity metrics.</p>
              </div>
            </div>
          </div>
        </section>

        {/* INDUSTRY METRICS TABLE */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key SEO Metrics for Ecommerce Reports</h2>
              <p className="text-xl text-gray-600">Essential KPIs that ecommerce clients actually care about, and how <strong>Reportr</strong> surfaces them.</p>
            </div>
            
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Metric</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Why It Matters for Ecommerce</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Reportr Source</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Organic traffic to product pages</td>
                    <td className="py-4 px-6 text-gray-600">Shows direct revenue impact — which products are being found through search</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GA4 organic landing pages</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Top converting keywords</td>
                    <td className="py-4 px-6 text-gray-600">Identifies which search terms actually drive buyers, not just browsers</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GSC keyword data</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Product page load speed</td>
                    <td className="py-4 px-6 text-gray-600">Slow product pages kill conversions — every second costs sales</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">PageSpeed Insights</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Category page rankings</td>
                    <td className="py-4 px-6 text-gray-600">Category visibility drives product discovery and brand awareness</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GSC position data</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Organic sessions by device</td>
                    <td className="py-4 px-6 text-gray-600">Mobile vs desktop shopping behavior impacts conversion optimization</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GA4 device breakdown</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Click-through rate by page type</td>
                    <td className="py-4 px-6 text-gray-600">Shows which product listings and categories attract clicks in search results</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GSC CTR data</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700 font-medium">Seasonal trend analysis</td>
                    <td className="py-4 px-6 text-gray-600">Ecommerce has strong seasonality — year-over-year growth shows true performance</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GA4 + GSC historical</td>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ecommerce SEO Reporting Questions</h2>
              <p className="text-xl text-gray-600">Common questions from agencies managing ecommerce SEO clients.</p>
            </div>
            
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Does Reportr have a specific ecommerce report template?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <strong>Reportr</strong> doesn&apos;t have pre-built industry-specific templates, but our Custom Report builder lets you focus on ecommerce-relevant metrics like product page traffic, category rankings, and conversion-focused data from Google Search Console and GA4. This flexibility lets you tailor reports to exactly what each ecommerce client needs to see.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Can I track organic revenue in Reportr reports?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <strong>Reportr</strong> pulls GA4 data which includes organic sessions and traffic. For revenue attribution, your client&apos;s GA4 must have ecommerce tracking configured. <strong>Reportr</strong> will show organic traffic data that can be correlated with revenue when ecommerce tracking is set up properly in their Google Analytics.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  How do I report on hundreds of product pages?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <strong>Reportr&apos;s</strong> GSC integration shows top pages data and GA4 landing pages data, which highlights which product pages are actually driving organic traffic. You can focus reports on your highest-performing products rather than trying to track every individual page. This helps clients see which inventory drives the most SEO value.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  What metrics should I include in ecommerce SEO reports?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Focus on organic traffic to product pages, category page rankings, product page load speeds, top converting keywords, and click-through rates by page type. Mobile performance is crucial since most ecommerce traffic is mobile. <strong>Reportr&apos;s</strong> Custom Report builder lets you select these specific metrics for ecommerce clients.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Can I create separate reports for different product categories?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Yes, using <strong>Reportr&apos;s</strong> Custom Report feature, you can choose specific pages and metrics to focus on particular product categories. Each report can be tailored to show performance for different segments of the ecommerce site, helping clients understand which categories need attention.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Creating Revenue-Focused Ecommerce SEO Reports</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Show your ecommerce clients exactly how SEO drives their sales and growth.
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
              <a href="/blog/best-white-label-seo-reporting-tool" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Guide</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Best White Label SEO Reporting Tools (2026)</h3>
                <p className="text-gray-600 text-sm">Compare the top white-label SEO reporting tools for agencies and consultants.</p>
              </a>
              
              <a href="/blog/white-label-seo-reporting-guide" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Ultimate Guide</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Complete White Label SEO Reporting Guide</h3>
                <p className="text-gray-600 text-sm">Everything agencies need to know about white-label SEO reporting.</p>
              </a>
              
              <a href="/white-label-seo-reports-for-digital-marketing-agencies" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">For Agencies</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">White Label SEO Reports for Agencies</h3>
                <p className="text-gray-600 text-sm">Professional SEO reports designed for digital marketing agencies.</p>
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
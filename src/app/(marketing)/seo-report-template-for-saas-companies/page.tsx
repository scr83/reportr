import { Metadata } from 'next';
import Image from 'next/image';
import { Header, Footer } from '@/components/landing';

export const metadata: Metadata = {
  title: "SEO Report Template for SaaS Companies | Reportr",
  description: "Create professional SEO reports for SaaS clients. Track product pages, comparison keywords, trial signups from organic. White-label B2B SaaS SEO reporting from $29/mo.",
  
  robots: {
    index: true,
    follow: true,
  },
  
  alternates: {
    canonical: "https://reportr.agency/seo-report-template-for-saas-companies",
    languages: {
      "en-US": "https://reportr.agency/seo-report-template-for-saas-companies",
      "en-GB": "https://reportr.agency/seo-report-template-for-saas-companies",
      "en-AU": "https://reportr.agency/seo-report-template-for-saas-companies",
      "en-CA": "https://reportr.agency/seo-report-template-for-saas-companies",
      "en-NZ": "https://reportr.agency/seo-report-template-for-saas-companies",
      "en-IE": "https://reportr.agency/seo-report-template-for-saas-companies",
      "en-IN": "https://reportr.agency/seo-report-template-for-saas-companies",
      "x-default": "https://reportr.agency/seo-report-template-for-saas-companies"
    }
  },
  
  openGraph: {
    title: "SEO Report Template for SaaS Companies | Reportr",
    description: "Create professional SEO reports for SaaS clients. Track product pages, comparison keywords, trial signups from organic. White-label B2B SaaS SEO reporting from $29/mo.",
    url: "https://reportr.agency/seo-report-template-for-saas-companies",
    siteName: "Reportr",
    type: "website",
    locale: "en_US",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "SEO Report Template for SaaS Companies | Reportr",
    description: "Create professional SEO reports for SaaS clients. Track product pages, comparison keywords, trial signups from organic. White-label B2B SaaS SEO reporting from $29/mo.",
  },
};

// Schema Markup Components
const StructuredData = () => {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Reportr - SEO Report Template for SaaS Companies",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "Generate professional white-label SEO reports specifically designed for SaaS marketing agencies. Track product pages, comparison keywords, content marketing performance, and organic funnel conversion. Pull data from Google Search Console, GA4, and PageSpeed Insights automatically.",
    "url": "https://reportr.agency/seo-report-template-for-saas-companies",
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
        "name": "Does Reportr track trial signups from organic traffic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reportr shows GA4 organic traffic data. If the SaaS client has GA4 goals/conversions configured for signups, that data flows through. Reportr doesn't track signups directly — it reports on the SEO data layer that drives those conversions."
        }
      },
      {
        "@type": "Question",
        "name": "Can I separate blog content performance from product page performance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, using Reportr's Custom Report builder and GA4 landing page data combined with GSC page-level performance. You can segment reports to show which content types (blog posts, product pages, comparison pages) are driving the most valuable organic traffic."
        }
      },
      {
        "@type": "Question",
        "name": "What SEO metrics do SaaS CMOs actually care about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SaaS CMOs focus on traffic to money pages (product/pricing pages), rankings on high-value comparison terms, content marketing ROI, and organic's share of trial signups. They think in pipeline and MRR, not just traffic volume."
        }
      },
      {
        "@type": "Question",
        "name": "How do I report on a SaaS content strategy with 200+ blog posts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reportr's GSC top pages data shows which content pieces are actually performing and driving traffic. Focus reports on the 20% of content driving 80% of results rather than trying to track every individual blog post."
        }
      },
      {
        "@type": "Question",
        "name": "Does Reportr work with SaaS tools like HubSpot or Salesforce?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reportr integrates with Google Search Console, GA4, and PageSpeed Insights. For CRM attribution, the client's existing GA4→CRM integration handles that connection. Reportr reports on the SEO data layer that feeds into those systems."
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

export default function SaaSSEOReportPage() {
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
                  <span className="text-yellow-300 font-semibold text-sm">SEO reporting built for B2B SaaS agencies</span>
                </div>
                
                {/* H1 */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  SEO Report Template for
                  <span className="block text-yellow-300">SaaS Companies</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  SaaS marketing teams think in pipeline and MRR, not just traffic. Show them how content marketing and SEO drive trial signups and revenue.
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
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">TS</span>
                      </div>
                      <div>
                        <div className="text-gray-900 font-semibold">TechStack Pro</div>
                        <div className="text-gray-500 text-sm">SaaS SEO Report</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-green-600 text-xs font-medium">Product Page Traffic</div>
                        <div className="text-green-700 text-xl font-bold">12,943</div>
                        <div className="text-green-600 text-xs">↑ 41% vs last month</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-blue-600 text-xs font-medium">Comparison Rankings</div>
                        <div className="text-blue-700 text-xl font-bold">#2</div>
                        <div className="text-blue-600 text-xs">&quot;best project mgmt&quot;</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-purple-600 text-xs font-medium">Core Web Vitals</div>
                        <div className="text-purple-700 text-xl font-bold">96</div>
                        <div className="text-purple-600 text-xs">Excellent</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="text-orange-600 text-xs font-medium">Blog Traffic</div>
                        <div className="text-orange-700 text-xl font-bold">23.1K</div>
                        <div className="text-orange-600 text-xs">↑ 18% growth</div>
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
                        Your pricing page ranks #12 for &quot;project management software pricing&quot; — optimize to capture position 3-5 for high-intent signups...
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why SaaS SEO Reporting Is Different</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Software companies have complex content funnels and high-value keywords that require specialized reporting approaches.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* SaaS Content Funnels Are Complex */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4M9 7l6 3"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">SaaS Content Funnels Are Complex</h3>
                <p className="text-gray-700">
                  SaaS companies publish blog posts, comparison pages, feature pages, docs, and landing pages. Reporting needs to show which content types and stages of the funnel actually drive signups, not just traffic.
                </p>
              </div>
              
              {/* High-Value Keywords Require Position Tracking Over Time */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">High-Value Keywords Require Position Tracking Over Time</h3>
                <p className="text-gray-700">
                  SaaS keywords like &quot;best [category] software&quot; have enormous commercial value. Clients want to see position trends for their money keywords month over month, not just a snapshot of current rankings.
                </p>
              </div>
              
              {/* Marketing Teams Want Pipeline Attribution */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Marketing Teams Want Pipeline Attribution, Not Vanity Metrics</h3>
                <p className="text-gray-700">
                  SaaS marketing leaders report to VPs and CMOs who think in pipeline and MRR. &quot;Organic traffic went up 15%&quot; means nothing without showing how it connects to demo requests or trial signups.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Create SaaS SEO Reports in 3 Steps</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Show your SaaS clients exactly which content drives trials and which keywords are worth the investment.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-brand-700 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Connect Your Client&apos;s Google Accounts</h3>
                <p className="text-gray-600">Connect their Google Search Console, Google Analytics 4, and PageSpeed Insights through secure OAuth. <strong>Reportr</strong> automatically pulls data from their blog content, product pages, and high-value comparison keywords.</p>
              </div>
              
              {/* Step 2 */}
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-brand-700 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Choose Your Report Type &amp; Customize Metrics</h3>
                <p className="text-gray-600">Use the Custom Report builder to focus on SaaS-specific metrics: product/feature page traffic, comparison keyword rankings, blog performance, and Core Web Vitals for JavaScript-heavy sites.</p>
              </div>
              
              {/* Step 3 */}
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-brand-700 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Generate &amp; Send the Branded PDF</h3>
                <p className="text-gray-600">One-click PDF generation with your agency branding. Reports include AI recommendations that help SaaS marketing teams prioritize SEO improvements with the highest revenue impact potential.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Everything You Need for SaaS SEO Reports</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Features designed specifically for agencies managing B2B SaaS clients and product-led growth SEO campaigns.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Content Funnel Performance */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4M9 7l6 3"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Content Funnel Segmentation</h3>
                <p className="text-gray-600 text-sm">Separate reporting for blog posts, product pages, comparison pages, and docs. Understand which parts of your content strategy drive trials vs awareness.</p>
              </div>
              
              {/* High-Value Keyword Tracking */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">High-Value Keyword Trends</h3>
                <p className="text-gray-600 text-sm">Track position changes over time for comparison terms and product keywords that directly impact trial signups and revenue growth.</p>
              </div>
              
              {/* Technical Performance for JS-Heavy Sites */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Core Web Vitals for SaaS</h3>
                <p className="text-gray-600 text-sm">SaaS sites are often JavaScript-heavy and slow. Track Core Web Vitals and mobile performance to ensure technical SEO doesn&apos;t hurt conversions.</p>
              </div>
              
              {/* Pipeline-Focused Insights */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Revenue-Impact Recommendations</h3>
                <p className="text-gray-600 text-sm">AI insights that prioritize SEO improvements by potential impact on trials and revenue. Help SaaS teams focus on changes that move business metrics.</p>
              </div>
            </div>
          </div>
        </section>

        {/* INDUSTRY METRICS TABLE */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key SEO Metrics for SaaS Reports</h2>
              <p className="text-xl text-gray-600">Essential KPIs that B2B SaaS marketing teams actually care about, and how <strong>Reportr</strong> surfaces them.</p>
            </div>
            
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Metric</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Why It Matters for SaaS</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Reportr Source</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Organic traffic to product/feature pages</td>
                    <td className="py-4 px-6 text-gray-600">Direct pipeline impact — shows who&apos;s researching your solution actively</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GA4 landing page data</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Rankings for competitor comparison keywords</td>
                    <td className="py-4 px-6 text-gray-600">High-intent, high-value terms that directly influence software purchasing decisions</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GSC position data</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Blog traffic and top performing content</td>
                    <td className="py-4 px-6 text-gray-600">Content marketing ROI — which educational content drives qualified visitors</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GA4 + GSC combined</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Organic conversion landing pages</td>
                    <td className="py-4 px-6 text-gray-600">Which pages drive signups — helps optimize high-performing entry points</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GA4 organic landing pages</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Core Web Vitals scores</td>
                    <td className="py-4 px-6 text-gray-600">SaaS sites are often JS-heavy — slow sites hurt both SEO and trial conversion rates</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">PageSpeed Insights</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Keyword position trends</td>
                    <td className="py-4 px-6 text-gray-600">Track movement on high-value terms over time — essential for competitive markets</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GSC position data</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700 font-medium">Content depth vs traffic correlation</td>
                    <td className="py-4 px-6 text-gray-600">Understanding whether long-form content drives more qualified traffic than short posts</td>
                    <td className="py-4 px-6 text-brand-600 font-medium">GSC + GA4 page analysis</td>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">SaaS SEO Reporting Questions</h2>
              <p className="text-xl text-gray-600">Common questions from agencies managing B2B SaaS marketing clients.</p>
            </div>
            
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Does Reportr track trial signups from organic traffic?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <strong>Reportr</strong> shows GA4 organic traffic data. If the SaaS client has GA4 goals/conversions configured for signups, that data flows through. <strong>Reportr</strong> doesn&apos;t track signups directly — it reports on the SEO data layer that drives those conversions.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Can I separate blog content performance from product page performance?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Yes, using <strong>Reportr&apos;s</strong> Custom Report builder and GA4 landing page data combined with GSC page-level performance. You can segment reports to show which content types (blog posts, product pages, comparison pages) are driving the most valuable organic traffic.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  What SEO metrics do SaaS CMOs actually care about?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  SaaS CMOs focus on traffic to money pages (product/pricing pages), rankings on high-value comparison terms, content marketing ROI, and organic&apos;s share of trial signups. They think in pipeline and MRR, not just traffic volume. <strong>Reportr&apos;s</strong> reports can be customized to emphasize these business-critical metrics.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  How do I report on a SaaS content strategy with 200+ blog posts?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <strong>Reportr&apos;s</strong> GSC top pages data shows which content pieces are actually performing and driving traffic. Focus reports on the 20% of content driving 80% of results rather than trying to track every individual blog post. This helps SaaS teams prioritize content optimization efforts.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Does Reportr work with SaaS tools like HubSpot or Salesforce?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <strong>Reportr</strong> integrates with Google Search Console, GA4, and PageSpeed Insights. For CRM attribution, the client&apos;s existing GA4→CRM integration handles that connection. <strong>Reportr</strong> reports on the SEO data layer that feeds into those systems.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Creating Pipeline-Focused SaaS SEO Reports</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Show your SaaS clients exactly how content marketing and SEO drive trial signups and revenue.
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
              
              <a href="/white-label-seo-reports-for-freelance-consultants" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">For Freelancers</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">White Label SEO Reports for Freelancers</h3>
                <p className="text-gray-600 text-sm">Professional SEO reports designed for independent consultants and freelancers.</p>
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
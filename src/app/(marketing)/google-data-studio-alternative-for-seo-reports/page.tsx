import { Metadata } from 'next';
import Image from 'next/image';
import { Header, Footer } from '@/components/landing';

export const metadata: Metadata = {
  title: "Google Data Studio Alternative for SEO Reports | Reportr",
  description: "Looking for a Google Data Studio alternative? Reportr creates branded PDF reports vs Looker Studio dashboards. No manual setup per client. From $29/mo. Try free.",
  
  robots: {
    index: true,
    follow: true,
  },
  
  alternates: {
    canonical: "https://reportr.agency/google-data-studio-alternative-for-seo-reports",
    languages: {
      "en-US": "https://reportr.agency/google-data-studio-alternative-for-seo-reports",
      "en-GB": "https://reportr.agency/google-data-studio-alternative-for-seo-reports",
      "en-AU": "https://reportr.agency/google-data-studio-alternative-for-seo-reports",
      "en-CA": "https://reportr.agency/google-data-studio-alternative-for-seo-reports",
      "en-NZ": "https://reportr.agency/google-data-studio-alternative-for-seo-reports",
      "en-IE": "https://reportr.agency/google-data-studio-alternative-for-seo-reports",
      "en-IN": "https://reportr.agency/google-data-studio-alternative-for-seo-reports",
      "x-default": "https://reportr.agency/google-data-studio-alternative-for-seo-reports"
    }
  },
  
  openGraph: {
    title: "Google Data Studio Alternative for SEO Reports | Reportr",
    description: "Looking for a Google Data Studio alternative? Reportr creates branded PDF reports vs Looker Studio dashboards. No manual setup per client. From $29/mo. Try free.",
    url: "https://reportr.agency/google-data-studio-alternative-for-seo-reports",
    siteName: "Reportr",
    type: "website",
    locale: "en_US",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Google Data Studio Alternative for SEO Reports | Reportr",
    description: "Looking for a Google Data Studio alternative? Reportr creates branded PDF reports vs Looker Studio dashboards. No manual setup per client. From $29/mo. Try free.",
  },
};

// Schema Markup Components
const StructuredData = () => {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Reportr - Google Data Studio Alternative",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "A time-saving alternative to Google Data Studio / Looker Studio for SEO reporting. Generate white-labeled PDF reports automatically vs manual dashboard setup for every client.",
    "url": "https://reportr.agency/google-data-studio-alternative-for-seo-reports",
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
        "name": "Why would I pay for Reportr when Looker Studio is free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Looker Studio is free but costs 2-4 hours of manual setup per client dashboard. Reportr saves time with pre-built templates and automated report generation. At $29/month, you're paying for time savings vs doing manual setup work for every client."
        }
      },
      {
        "@type": "Question",
        "name": "Can Reportr do everything Data Studio can?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, and that's intentional. Looker Studio is extremely flexible for custom visualizations across any data source. Reportr focuses specifically on SEO reporting with Google Search Console, GA4, and PageSpeed Insights. For SEO agencies, this focused approach is faster and easier."
        }
      },
      {
        "@type": "Question",
        "name": "Is Looker Studio really hard to set up?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For one-off dashboards, no. For agencies serving multiple clients, yes. Each client requires manual data source connection, chart configuration, and layout design. Multiply that by 5-20 clients and it becomes time-consuming. Reportr automates this with templates."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use Looker Studio for internal monitoring and Reportr for client reports?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Many agencies use Looker Studio for internal real-time monitoring and custom analysis, then use Reportr for standardized client deliverables. They serve different purposes — Looker Studio for flexibility, Reportr for efficiency."
        }
      },
      {
        "@type": "Question",
        "name": "Does Reportr white-label better than Looker Studio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Looker Studio always displays Google branding and &quot;Made with Google&quot; attribution. Reportr generates true white-label PDF reports with your logo, colors, and no platform branding. Clients see your agency name, not Google's."
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

export default function GoogleDataStudioAlternativePage() {
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
                  <span className="text-yellow-300 font-semibold text-sm">Time is money — save hours per client</span>
                </div>
                
                {/* H1 */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Google Data Studio Alternative for SEO Reports
                  <span className="block text-yellow-300">Try Reportr</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  Looker Studio is free but costs 3+ hours of manual setup per client. <strong className="text-yellow-300">Reportr</strong> automates the entire process with true white-labeling.
                </p>
                
                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8 text-sm text-white/90">
                  <span>• $29/mo vs 3 hours setup</span>
                  <span>• True white-labeling</span>
                  <span>• Pre-built templates</span>
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
                <p className="text-white/80 text-sm mt-4">Free plan available • No manual setup • Cancel anytime</p>
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

        {/* WHY SWITCH FROM LOOKER STUDIO */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Agencies Switch from Looker Studio</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Looker Studio is incredibly flexible and free. But for agencies serving multiple clients, here&apos;s why <strong>Reportr</strong> might save you time and money.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Time is money */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">&quot;Free&quot; But Costs 3+ Hours Per Client</h3>
                <p className="text-gray-700">
                  Looker Studio requires manual dashboard creation for every single client — data source connection, chart setup, layout design. At $100+/hour agency rates, 3 hours of setup costs more than a year of <strong>Reportr</strong>. Time is money.
                </p>
              </div>
              
              {/* No true white-labeling */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">No True White-Label Branding</h3>
                <p className="text-gray-700">
                  Looker Studio always shows Google branding and &quot;Made with Google&quot; attribution. Clients see Google&apos;s name, not yours. <strong>Reportr</strong> generates true white-label PDF reports with your logo and zero platform branding.
                </p>
              </div>
              
              {/* Manual configuration nightmare */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Manual Configuration for Every Client</h3>
                <p className="text-gray-700">
                  No templates, no automation. Every new client requires starting from scratch — connecting data sources, building charts, designing layouts. <strong>Reportr</strong> uses pre-built templates. Connect data once, generate unlimited reports.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW TO SWITCH */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Switch from Looker Studio in 5 Minutes</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Three simple steps from manual dashboard building to automated PDF reports.</p>
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
                <p className="text-gray-600">Same data sources as Looker Studio — Google Search Console and GA4. But connect once and use across all clients with automated templates.</p>
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
                <p className="text-gray-600">Upload your logo and choose your colors. True white-label branding with zero Google attribution — something Looker Studio can&apos;t provide.</p>
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
                <p className="text-gray-600">Click one button. Professional PDF ready in 30 seconds. No manual chart building, no layout design — just results.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES VS LOOKER STUDIO */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What You Get with Reportr vs Looker Studio</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Trade flexibility for efficiency — perfect for agencies serving multiple clients.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Pre-Built Templates */}
              <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100">
                <div className="w-14 h-14 bg-brand-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-800 mb-3">Pre-Built Report Templates</h3>
                <p className="text-gray-700">
                  Looker Studio requires manual dashboard creation for every client. <strong>Reportr</strong> provides ready-to-use SEO report templates. Connect data and generate — no design work required.
                </p>
              </div>
              
              {/* True White-Labeling */}
              <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100">
                <div className="w-14 h-14 bg-brand-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-800 mb-3">True White-Label Branding</h3>
                <p className="text-gray-700">
                  Looker Studio always shows Google branding and &quot;Made with Google&quot; text. <strong>Reportr</strong> generates completely white-labeled PDF reports with your logo, colors, and zero platform attribution.
                </p>
              </div>
              
              {/* Time Savings */}
              <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100">
                <div className="w-14 h-14 bg-brand-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-800 mb-3">Massive Time Savings</h3>
                <p className="text-gray-700">
                  Looker Studio: 3+ hours of manual setup per client. <strong>Reportr</strong>: 30 seconds per report with automation. Scale from 5-50 clients without proportional time increases.
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
                  Looker Studio shows raw data visualizations. <strong>Reportr</strong> uses Claude AI to analyze SEO data and generate actionable recommendations that help clients improve their rankings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Reportr vs Looker Studio</h2>
              <p className="text-xl text-gray-600">Free vs paid — but what&apos;s the true cost of your time?</p>
            </div>
            
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-600">Looker Studio</th>
                    <th className="text-center py-4 px-6 font-semibold text-brand-600">Reportr</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Monthly Cost</td>
                    <td className="py-4 px-6 text-center text-gray-600">Free</td>
                    <td className="py-4 px-6 text-center text-gray-600">$29-99/mo</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Setup Time per Client</td>
                    <td className="py-4 px-6 text-center text-red-600 font-semibold">3-4 hours</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">5 minutes</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">White-Label Branding</td>
                    <td className="py-4 px-6 text-center text-gray-600">Google branding visible</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">100% white-label</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Report Templates</td>
                    <td className="py-4 px-6 text-center text-gray-600">Build from scratch</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Pre-built</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Customization</td>
                    <td className="py-4 px-6 text-center text-green-600">Extremely flexible</td>
                    <td className="py-4 px-6 text-center text-gray-600">SEO-focused templates</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Output Format</td>
                    <td className="py-4 px-6 text-center text-gray-600">Live dashboards</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">PDF downloads</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">AI Recommendations</td>
                    <td className="py-4 px-6 text-center text-gray-500">No</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Yes (Claude AI)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700 font-medium">Best For</td>
                    <td className="py-4 px-6 text-center text-gray-600 text-sm">Custom visualizations</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold text-sm">Agency efficiency</td>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Questions About Switching from Looker Studio</h2>
              <p className="text-xl text-gray-600">Common questions about making the switch to <strong>Reportr</strong>.</p>
            </div>
            
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Why would I pay for Reportr when Looker Studio is free?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Looker Studio is free but costs 2-4 hours of manual setup per client dashboard. <strong>Reportr</strong> saves time with pre-built templates and automated report generation. At $29/month, you&apos;re paying for time savings vs doing manual setup work for every client.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Can Reportr do everything Data Studio can?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  No, and that&apos;s intentional. Looker Studio is extremely flexible for custom visualizations across any data source. <strong>Reportr</strong> focuses specifically on SEO reporting with Google Search Console, GA4, and PageSpeed Insights. For SEO agencies, this focused approach is faster and easier.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Is Looker Studio really hard to set up?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  For one-off dashboards, no. For agencies serving multiple clients, yes. Each client requires manual data source connection, chart configuration, and layout design. Multiply that by 5-20 clients and it becomes time-consuming. <strong>Reportr</strong> automates this with templates.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Can I use Looker Studio for internal monitoring and Reportr for client reports?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Absolutely! Many agencies use Looker Studio for internal real-time monitoring and custom analysis, then use <strong>Reportr</strong> for standardized client deliverables. They serve different purposes — Looker Studio for flexibility, <strong>Reportr</strong> for efficiency.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Does Reportr white-label better than Looker Studio?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Yes. Looker Studio always displays Google branding and &quot;Made with Google&quot; attribution. <strong>Reportr</strong> generates true white-label PDF reports with your logo, colors, and no platform branding. Clients see your agency name, not Google&apos;s.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Stop Building Dashboards?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Try <strong>Reportr</strong> free. Trade 3+ hours of manual setup for 30 seconds of automation.
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
                <span>No manual setup</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>True white-labeling</span>
              </div>
            </div>
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Resources</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <a href="/blog/white-label-seo-reporting-guide" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Complete Guide</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Complete White Label SEO Reporting Guide</h3>
                <p className="text-gray-600 text-sm">Everything agencies need to know about white-label SEO reporting.</p>
              </a>
              
              <a href="/blog/what-is-white-label-seo-report" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Guide</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">What Is a White Label SEO Report?</h3>
                <p className="text-gray-600 text-sm">Understanding white-label SEO reports and their benefits for agencies.</p>
              </a>
              
              <a href="/dashthis-alternative-for-seo-reporting" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Alternative</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">DashThis Alternative for SEO Reporting</h3>
                <p className="text-gray-600 text-sm">Compare DashThis vs <strong>Reportr</strong> for SEO reporting needs.</p>
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
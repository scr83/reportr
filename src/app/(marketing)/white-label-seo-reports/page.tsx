import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  // Core Metadata
  title: "White Label SEO Reports | Professional Branded Reports for Agencies | Reportr",
  description: "Generate white label SEO reports with your branding in minutes. Professional PDF reports with Google Search Console, GA4 & PageSpeed data. Your logo, your colors. From $29/mo.",
  
  // SEO Targeting
  keywords: [
    "white label seo reports",
    "white label seo report", 
    "white label seo reporting tool",
    "seo report white label",
    "white label seo reporting",
    "branded seo reports",
    "white label seo software"
  ],
  
  // Canonical & Indexing
  alternates: {
    canonical: "https://reportr.agency/white-label-seo-reports",
    languages: {
      "en-US": "https://reportr.agency/white-label-seo-reports",
      "en-GB": "https://reportr.agency/white-label-seo-reports",
      "en-AU": "https://reportr.agency/white-label-seo-reports",
      "en-CA": "https://reportr.agency/white-label-seo-reports",
      "en-NZ": "https://reportr.agency/white-label-seo-reports",
      "en-IE": "https://reportr.agency/white-label-seo-reports",
      "en-IN": "https://reportr.agency/white-label-seo-reports",
      "x-default": "https://reportr.agency/white-label-seo-reports"
    }
  },
  
  robots: {
    index: true,
    follow: true,
  },
  
  // Open Graph
  openGraph: {
    title: "White Label SEO Reports | Professional Branded Reports for Agencies",
    description: "Generate white label SEO reports with your branding in minutes. Professional PDF reports your clients will love.",
    url: "https://reportr.agency/white-label-seo-reports",
    siteName: "Reportr",
    type: "website",
    images: [
      {
        url: "https://reportr.agency/og/white-label-seo-reports.png",
        width: 1200,
        height: 630,
        alt: "White Label SEO Reports by Reportr"
      }
    ]
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "White Label SEO Reports | Reportr",
    description: "Generate white label SEO reports with your branding in minutes."
  }
};

// Schema Markup Components
const StructuredData = () => {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Reportr - White Label SEO Reports",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "Generate professional white label SEO reports with your branding. Pull data from Google Search Console, Google Analytics 4, and PageSpeed Insights automatically.",
    "url": "https://reportr.agency/white-label-seo-reports",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "0",
      "highPrice": "99",
      "priceCurrency": "USD",
      "offerCount": "4"
    },
    "featureList": [
      "White label branding",
      "Google Search Console integration",
      "Google Analytics 4 integration",
      "PageSpeed Insights integration",
      "AI-powered recommendations",
      "PDF report generation",
      "Custom report templates"
    ]
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
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are white label SEO reports?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "White label SEO reports are professional client-facing reports that display your agency's branding instead of the software provider's branding. They include your logo, colors, and company name, making it appear as if you created the reporting tool yourself."
        }
      },
      {
        "@type": "Question",
        "name": "What data sources are included in white label SEO reports?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reportr's white label SEO reports pull data from Google Search Console (keywords, clicks, impressions, positions), Google Analytics 4 (traffic, sessions, user behavior), and PageSpeed Insights (Core Web Vitals, mobile and desktop performance scores)."
        }
      },
      {
        "@type": "Question",
        "name": "How much do white label SEO reports cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reportr offers white label SEO reports starting at $29/month for the Starter plan (5 clients, 25 reports). There's also a free plan with 1 client and 5 reports/month. White-label branding is available as a $20/month add-on for paid plans."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to generate a report?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "After connecting your client's Google accounts (a one-time setup), generating a report takes under 60 seconds. Click the generate button, wait for the data to be pulled, and download your PDF."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need my client's Google login credentials?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Reportr uses Google OAuth — the standard secure method. Your client grants you access to their Search Console and Analytics properties through a secure authorization flow. We never see or store passwords."
        }
      },
      {
        "@type": "Question",
        "name": "What report templates are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reportr offers three report types: Executive Summary (quick 2-page overview), Standard SEO Report (comprehensive analysis), and Custom Report (choose exactly which sections and metrics to include). All templates support white-label branding."
        }
      },
      {
        "@type": "Question",
        "name": "How is Reportr different from AgencyAnalytics or Semrush?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reportr is purpose-built for SEO reporting only. We focus on GSC, GA4, and PageSpeed — the core metrics SEO clients care about. Enterprise tools like AgencyAnalytics ($150+/mo) and Semrush ($130+/mo) have dozens of integrations you'll never use. Reportr starts at $29/mo."
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

export default function WhiteLabelSEOReportsPage() {
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
              <span className="text-gray-900 font-medium">White Label SEO Reports</span>
            </nav>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              <div className="text-center md:text-left">
                
                {/* H1 - Exact match for primary keyword */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  White Label SEO Reports
                  <span className="block text-yellow-300">Your Brand, Not Ours</span>
                </h1>
                
                {/* Subtitle with secondary keywords */}
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  Generate professional <strong>white label SEO reporting</strong> with your logo, colors, and branding. 
                  Pull data from GSC, GA4 & PageSpeed automatically. 
                  <span className="font-semibold">Minutes, not hours.</span>
                </p>
                
                {/* Pricing + trust signals */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <span className="text-sm text-white/80">Starting at</span>
                    <span className="text-2xl font-bold ml-2">$29/mo</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Free plan available</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>14-day trial</span>
                  </div>
                </div>
                
                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                  <a href="/signup" 
                     className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-brand-700 font-bold text-lg px-8 py-4 rounded-lg hover:bg-yellow-300 hover:text-brand-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Create Your First Report Free
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </a>
                  <a href="#demo" className="text-white/90 hover:text-white font-medium flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                    </svg>
                    See how it works
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
                        <div className="text-gray-500 text-sm">White Label SEO Report</div>
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

        {/* WHAT ARE WHITE LABEL SEO REPORTS (Definition section for SEO) */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What Are White Label SEO Reports?</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                <strong>White label SEO reports</strong> are professional client-facing reports that display your agency&apos;s branding instead of the software provider&apos;s branding. They include your logo, your colors, and your company name — making it appear as if you built the reporting tool yourself.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Without white label */}
              <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-red-800">Without White Labeling</h3>
                </div>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                    &quot;Powered by [Software Name]&quot; badges
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                    Software provider&apos;s logo on reports
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                    Generic color schemes
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                    Clients see who you&apos;re paying for tools
                  </li>
                </ul>
              </div>
              
              {/* With white label */}
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-green-800">With White Label Reports</h3>
                </div>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Your logo on every page
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Your brand colors throughout
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Your company name in headers/footers
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Zero &quot;Powered by&quot; badges
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* DATA SOURCES SECTION */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What&apos;s Included in Our White Label SEO Reports</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                <a href="/" className="text-brand-600 hover:underline">Reportr</a> pulls data from three essential Google data sources and presents them in a beautiful, branded PDF your clients will actually read.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Google Search Console */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Google Search Console</h3>
                <p className="text-gray-600 mb-4">The foundation of every SEO report — how your client&apos;s site performs in Google search results.</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Total clicks & impressions
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Average position & CTR
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Top performing keywords
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Top performing pages
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Month-over-month trends
                  </li>
                </ul>
              </div>
              
              {/* Google Analytics 4 */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Google Analytics 4</h3>
                <p className="text-gray-600 mb-4">Traffic data that tells the story of how organic visitors behave on your client&apos;s site.</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Organic sessions & users
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Bounce rate & engagement
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Top landing pages
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Session duration
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Traffic trend charts
                  </li>
                </ul>
              </div>
              
              {/* PageSpeed Insights */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">PageSpeed Insights</h3>
                <p className="text-gray-600 mb-4">Core Web Vitals and performance scores — the technical health of your client&apos;s site.</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Mobile performance score
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Desktop performance score
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    LCP (Largest Contentful Paint)
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    CLS (Cumulative Layout Shift)
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    INP (Interaction to Next Paint)
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Plus AI */}
            <div className="mt-12 bg-gradient-to-r from-brand-50 to-purple-50 rounded-2xl p-8 border border-brand-100">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Plus: AI-Powered Recommendations</h3>
                  <p className="text-gray-600">
                    Every white label SEO report includes actionable insights generated by AI. Identify quick wins, spot opportunities, and give your clients recommendations they can act on — without spending hours analyzing the data yourself.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="demo" className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Generate Your First White Label Report in 5 Minutes</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">No training required. No complex setup. Connect once, brand once, generate forever.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="absolute -top-4 left-8 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Connect Your Client&apos;s Google</h3>
                <p className="text-gray-600">One-click OAuth connection to Search Console and Analytics. We never store passwords — just secure API tokens.</p>
                <div className="mt-4 flex items-center gap-2">
                  <Image 
                    src="https://www.google.com/favicon.ico" 
                    alt="Google" 
                    width={20} 
                    height={20}
                    className="w-5 h-5" 
                  />
                  <span className="text-sm text-gray-500">Official Google API Partner</span>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="absolute -top-4 left-8 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Add Your Branding</h3>
                <p className="text-gray-600">Upload your logo, pick your brand colors, add your company name. Every report is 100% white-labeled.</p>
                <div className="mt-4 text-sm text-gray-500">✓ No &quot;Powered by Reportr&quot; badges</div>
              </div>
              
              {/* Step 3 */}
              <div className="relative bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="absolute -top-4 left-8 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Generate & Download PDF</h3>
                <p className="text-gray-600">Click one button. A professional branded PDF with all your data is ready in under a minute. Download and send.</p>
                <div className="mt-4 text-sm text-gray-500">✓ Executive, Standard, or Custom reports</div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="text-center mt-12">
              <a href="/signup" className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-brand-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                Start Free — Generate Your First Report
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* WHO IS THIS FOR */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Who Uses White Label SEO Reports?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Built for anyone who delivers SEO results to clients and wants professional reporting without the time sink.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a href="/white-label-seo-reports-for-freelance-consultants" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-200 transition-colors">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Freelance SEO Consultants</h3>
                <p className="text-gray-600 text-sm">Solo consultants who need professional reports without enterprise pricing.</p>
              </a>
              
              <a href="/white-label-seo-reports-for-digital-marketing-agencies" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-200 transition-colors">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Digital Marketing Agencies</h3>
                <p className="text-gray-600 text-sm">Growing agencies that want scalable reporting with their own branding.</p>
              </a>
              
              <a href="/white-label-seo-reports-for-web-design-agencies" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-200 transition-colors">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Web Design Agencies</h3>
                <p className="text-gray-600 text-sm">Design shops offering SEO as an add-on service to website builds.</p>
              </a>
              
              <a href="/white-label-seo-reports-for-reseller-agencies" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-200 transition-colors">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">SEO Resellers</h3>
                <p className="text-gray-600 text-sm">Reseller agencies that need to report on work done by their fulfillment partners.</p>
              </a>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Manual Reporting vs. Reportr</h2>
              <p className="text-xl text-gray-600">What your monthly reporting process looks like today vs. with white label automation.</p>
            </div>
            
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900"></th>
                    <th className="text-center py-4 px-6 font-semibold text-red-600">Manual</th>
                    <th className="text-center py-4 px-6 font-semibold text-brand-600">Reportr</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700">Time per report</td>
                    <td className="py-4 px-6 text-center text-red-600">2-4 hours</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">~30 seconds</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700">10 clients / month</td>
                    <td className="py-4 px-6 text-center text-red-600">20-40 hours</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">~5 minutes</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700">Your branding</td>
                    <td className="py-4 px-6 text-center text-gray-500">DIY in Google Docs</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Automatic</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700">Data sources</td>
                    <td className="py-4 px-6 text-center text-gray-500">Copy-paste from 3 tabs</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">GSC + GA4 + PSI auto</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700">AI recommendations</td>
                    <td className="py-4 px-6 text-center text-gray-500">You write them</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Auto-generated</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700">Monthly cost</td>
                    <td className="py-4 px-6 text-center text-gray-500">Your hourly rate × hours</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">From $29/mo</td>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">About white label SEO reports and how Reportr works.</p>
            </div>
            
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  What are white label SEO reports?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  White label SEO reports are professional client-facing reports that display your agency&apos;s branding instead of the software provider&apos;s branding. They include your logo, colors, and company name, making it appear as if you created the reporting tool yourself. This is essential for agencies that want to maintain a professional image with clients.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  What data sources are included in the reports?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Reportr pulls data from three essential Google sources: <strong>Google Search Console</strong> (keywords, clicks, impressions, positions), <strong>Google Analytics 4</strong> (traffic, sessions, user behavior), and <strong>PageSpeed Insights</strong> (Core Web Vitals, mobile and desktop performance scores). All three are integrated and displayed in a single, beautiful PDF.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  How much does white label branding cost?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  White-label branding is available as a <strong>$20/month add-on</strong> for any paid plan. This removes all Reportr branding and lets you upload your own logo, set your brand colors, and add your company name to every report. The Free plan includes Reportr branding on reports.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  How long does it take to generate a report?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  After you&apos;ve connected your client&apos;s Google accounts (a one-time setup), generating a report takes <strong>under 60 seconds</strong>. Click the generate button, wait for the data to be pulled, and download your PDF. What used to take 2-4 hours now takes less than a minute.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Do I need my client&apos;s Google login credentials?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <strong>No.</strong> Reportr uses Google OAuth — the standard secure method. Your client grants you access to their Search Console and Analytics properties through a secure authorization flow. We never see or store passwords, only encrypted API tokens.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  What report templates are available?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Reportr offers three report types: <strong>Executive Summary</strong> (quick 2-page overview for busy clients), <strong>Standard SEO Report</strong> (comprehensive analysis with all metrics), and <strong>Custom Report</strong> (choose exactly which sections and metrics to include). All templates support white-label branding.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  How is Reportr different from AgencyAnalytics or Semrush?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Reportr is purpose-built for <strong>SEO reporting only</strong>. We focus on GSC, GA4, and PageSpeed — the core metrics SEO clients care about. Enterprise tools like AgencyAnalytics ($150+/mo) and Semrush ($130+/mo) have dozens of integrations you&apos;ll never use. Reportr starts at $29/mo and does one thing exceptionally well: professional white label SEO reports.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Generating White Label SEO Reports Today</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join agencies and freelancers who&apos;ve automated their reporting. Your branding, professional PDFs, happy clients.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a href="/signup" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-brand-700 font-bold text-lg px-8 py-4 rounded-lg hover:bg-yellow-300 hover:text-brand-800 transition-all duration-200 shadow-lg">
                Create Your First Report Free
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

        {/* INTERNAL LINKS (for SEO) */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Resources</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <a href="/blog/best-white-label-seo-reporting-tool" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Guide</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Best White Label SEO Reporting Tools (2026)</h3>
                <p className="text-gray-600 text-sm">Compare the top white label reporting options for agencies.</p>
              </a>
              
              <a href="/blog/seo-monthly-report-template" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Template</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">SEO Monthly Report Template</h3>
                <p className="text-gray-600 text-sm">What to include in your monthly SEO reports to clients.</p>
              </a>
              
              <a href="/blog/agency-reporting-best-practices" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Best Practices</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Agency Reporting Best Practices</h3>
                <p className="text-gray-600 text-sm">How top agencies structure their client reporting workflow.</p>
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Logo + Tagline */}
              <div className="md:col-span-1">
                <a href="/" className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">R</span>
                  </div>
                  <span className="text-gray-900 font-bold text-lg">Reportr</span>
                </a>
                <p className="text-gray-600 text-sm">
                  Professional SEO reports in minutes. Built for SEO freelancers and growing agencies.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="/features" className="text-gray-600 hover:text-brand-600 transition-colors">Features</a></li>
                  <li><a href="/pricing" className="text-gray-600 hover:text-brand-600 transition-colors">Pricing</a></li>
                  <li><a href="/how-it-works" className="text-gray-600 hover:text-brand-600 transition-colors">How It Works</a></li>
                  <li><a href="/blog" className="text-gray-600 hover:text-brand-600 transition-colors">Blog</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="mailto:support@reportr.com" className="text-gray-600 hover:text-brand-600 transition-colors">support@reportr.com</a></li>
                  <li><a href="/privacy" className="text-gray-600 hover:text-brand-600 transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="text-gray-600 hover:text-brand-600 transition-colors">Terms of Service</a></li>
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
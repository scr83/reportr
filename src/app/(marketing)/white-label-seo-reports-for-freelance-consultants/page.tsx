import { Metadata } from 'next';
import Image from 'next/image';
import { Header, Footer } from '@/components/landing';

export const metadata: Metadata = {
  title: "White Label SEO Reports for Freelance Consultants | Reportr",
  description: "Generate professional white-label SEO reports as a freelancer. Your logo, your colors, one-click PDFs. Save hours every month. Try free.",
  
  robots: {
    index: true,
    follow: true,
  },
  
  alternates: {
    canonical: "https://reportr.agency/white-label-seo-reports-for-freelance-consultants",
    languages: {
      "en-US": "https://reportr.agency/white-label-seo-reports-for-freelance-consultants",
      "en-GB": "https://reportr.agency/white-label-seo-reports-for-freelance-consultants",
      "en-AU": "https://reportr.agency/white-label-seo-reports-for-freelance-consultants",
      "en-CA": "https://reportr.agency/white-label-seo-reports-for-freelance-consultants",
      "en-NZ": "https://reportr.agency/white-label-seo-reports-for-freelance-consultants",
      "en-IE": "https://reportr.agency/white-label-seo-reports-for-freelance-consultants",
      "en-IN": "https://reportr.agency/white-label-seo-reports-for-freelance-consultants",
      "x-default": "https://reportr.agency/white-label-seo-reports-for-freelance-consultants"
    }
  },
  
  openGraph: {
    title: "White Label SEO Reports for Freelance Consultants | Reportr",
    description: "Generate professional white-label SEO reports as a freelancer. Your logo, your colors, one-click PDFs. Save hours every month. Try free.",
    url: "https://reportr.agency/white-label-seo-reports-for-freelance-consultants",
    siteName: "Reportr",
    type: "website",
    locale: "en_US",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "White Label SEO Reports for Freelance Consultants | Reportr",
    description: "Generate professional white-label SEO reports as a freelancer. Your logo, your colors, one-click PDFs. Save hours every month. Try free.",
  },
};

// Schema Markup Components
const StructuredData = () => {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Reportr - White Label SEO Reports for Freelancers",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "Generate professional white-label SEO reports designed for freelance SEO consultants. Pull data from Google Search Console, GA4, and PageSpeed Insights automatically.",
    "url": "https://reportr.agency/white-label-seo-reports-for-freelance-consultants",
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
        "name": "For Freelance Consultants",
        "item": "https://reportr.agency/white-label-seo-reports-for-freelance-consultants"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "I only have 2-3 clients. Is Reportr worth it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Start with the free plan (1 client, 5 reports/month) and upgrade to Starter ($29/mo, 5 clients) when you grow. If reporting takes you even 2 hours per client, you're saving 6+ hours per month — easily worth $29."
        }
      },
      {
        "@type": "Question",
        "name": "Will my clients know I'm using Reportr?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Reports are fully white-labeled — your logo, your colors, your company name. There are no 'Powered by Reportr' badges anywhere on the PDF. Your clients see only your brand."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need my client's Google account login?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. You connect through Google OAuth — the standard secure method. Your client grants you access to their Search Console and Analytics properties, which most freelancers already have."
        }
      },
      {
        "@type": "Question",
        "name": "Can I customize what data shows in the report?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Choose between Executive Summary (quick overview), Standard Report (full analysis), or Custom Report where you pick exactly which metrics to include. Tailor reports to what each client cares about."
        }
      },
      {
        "@type": "Question",
        "name": "Why not just use Google Data Studio / Looker Studio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Looker Studio is free but requires significant setup, has limited white-labeling, and produces dashboards — not professional PDFs. Clients prefer a clean branded PDF they can forward to stakeholders. Reportr generates that in one click."
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

export default function FreelanceConsultantsPage() {
  return (
    <div className="min-h-screen bg-white">
      <StructuredData />
      <Header />
      <main className="bg-white text-gray-900 antialiased">

        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              <div className="text-center md:text-left">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <span className="text-yellow-300 font-semibold text-sm">Built for Solo SEO Consultants</span>
                </div>
                
                {/* H1 */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  White Label SEO Reports for
                  <span className="block text-yellow-300">Freelance Consultants</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  You&apos;re great at SEO. You shouldn&apos;t spend your Tuesdays in spreadsheets building client reports. Generate branded PDF reports in minutes — your logo, your colors, zero &quot;Powered By&quot; badges.
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
                        <span className="text-white font-bold text-sm">SC</span>
                      </div>
                      <div>
                        <div className="text-gray-900 font-semibold">Sarah&apos;s Consulting</div>
                        <div className="text-gray-500 text-sm">Monthly SEO Report</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-green-600 text-xs font-medium">Clicks</div>
                        <div className="text-green-700 text-xl font-bold">8,421</div>
                        <div className="text-green-600 text-xs">↑ 31% vs last month</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-blue-600 text-xs font-medium">Impressions</div>
                        <div className="text-blue-700 text-xl font-bold">156K</div>
                        <div className="text-blue-600 text-xs">↑ 22% vs last month</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-purple-600 text-xs font-medium">Avg. Position</div>
                        <div className="text-purple-700 text-xl font-bold">6.8</div>
                        <div className="text-purple-600 text-xs">↑ 3.2 improvement</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="text-orange-600 text-xs font-medium">PageSpeed</div>
                        <div className="text-orange-700 text-xl font-bold">91</div>
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
                        {'"'}Product page{'"'} ranks #8 for {'"'}best widgets{'"'} — optimize for featured snippet opportunity...
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Freelance SEO Reporting Shouldn&apos;t Be This Hard</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                You&apos;re a one-person operation. Every hour spent on reporting is an hour you can&apos;t bill for actual SEO work.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Reporting Eats Hours */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Reporting Eats Your Billable Hours</h3>
                <p className="text-gray-700">
                  As a freelancer, every hour on reporting is money lost. You&apos;re pulling data from GSC, GA4, and PageSpeed manually, formatting it in Google Docs, and hoping the client appreciates the effort. They usually just skim it.
                </p>
              </div>
              
              {/* Enterprise Tools Overkill */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Enterprise Tools Are Overkill</h3>
                <p className="text-gray-700">
                  AgencyAnalytics, DashThis, and Semrush reporting are built for 50+ client agencies. You have 3-10 clients. You don&apos;t need 50 integrations, custom dashboards, or a $150/month tool. You need simple, professional reports.
                </p>
              </div>
              
              {/* Unprofessional Look */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">You Look Less Professional Without Branding</h3>
                <p className="text-gray-700">
                  Sending clients a generic Google Data Studio link or a PDF with &quot;Powered by SomeTool&quot; undermines your credibility. You need reports that look like YOU made them — your logo, your colors, your brand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How <a href="https://reportr.agency" className="font-bold hover:underline">Reportr</a> Works for Freelancers</h2>
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
                <p className="text-gray-600">Add your client&apos;s domain and connect their Google Search Console and Google Analytics. Takes 2 minutes. You never do this again.</p>
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
                <p className="text-gray-600">Upload your logo, pick your brand colors, add your company name. Every report is 100% white-labeled. No &quot;Powered by&quot; badges.</p>
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
                <p className="text-gray-600">Click one button. A professional PDF with clicks, impressions, keywords, PageSpeed, and AI recommendations is ready in 30 seconds. Download and send.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Everything a Solo Consultant Needs</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                No bloated feature lists. Just the tools that save you time and impress your clients.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* True White-Label */}
              <div className="bg-brand-50 rounded-2xl p-6 border border-brand-100">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">True White-Label Branding</h3>
                <p className="text-gray-600 text-sm">Your logo, your colors, your company name on every page. Clients think you built the reporting tool yourself.</p>
              </div>
              
              {/* GSC + GA4 + PageSpeed */}
              <div className="bg-brand-50 rounded-2xl p-6 border border-brand-100">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">GSC + GA4 + PageSpeed Data</h3>
                <p className="text-gray-600 text-sm">All three Google data sources in one report. Keywords, traffic, Core Web Vitals — no manual data pulling.</p>
              </div>
              
              {/* AI Recommendations */}
              <div className="bg-brand-50 rounded-2xl p-6 border border-brand-100">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">AI-Powered Recommendations</h3>
                <p className="text-gray-600 text-sm">Every report includes actionable insights generated by AI. Your clients see you&apos;re not just reporting — you&apos;re advising.</p>
              </div>
              
              {/* Priced for Freelancers */}
              <div className="bg-brand-50 rounded-2xl p-6 border border-brand-100">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Priced for Freelancers</h3>
                <p className="text-gray-600 text-sm">Start free with 1 client. Upgrade to $29/mo for 5 clients. Not $99+/mo like enterprise tools you don&apos;t need.</p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Manual Reporting vs <a href="https://reportr.agency" className="font-bold hover:underline">Reportr</a></h2>
              <p className="text-xl text-gray-600">What your typical monthly reporting cycle looks like today vs. with <a href="https://reportr.agency" className="font-bold hover:underline">Reportr</a>.</p>
            </div>
            
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Aspect</th>
                    <th className="text-center py-4 px-6 font-semibold text-red-600">Manual Reporting</th>
                    <th className="text-center py-4 px-6 font-semibold text-brand-600">With <a href="https://reportr.agency" className="font-bold hover:underline">Reportr</a></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Time per report</td>
                    <td className="py-4 px-6 text-center text-red-600">2-4 hours</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">30 seconds</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">5 clients / month</td>
                    <td className="py-4 px-6 text-center text-red-600">10-20 hours</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">~3 minutes</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Your branding</td>
                    <td className="py-4 px-6 text-center text-gray-500">DIY in Google Docs</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Automatic on every PDF</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Data sources</td>
                    <td className="py-4 px-6 text-center text-gray-500">Copy-paste from 3 tabs</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">GSC + GA4 + PageSpeed auto</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">AI recommendations</td>
                    <td className="py-4 px-6 text-center text-gray-500">You write them manually</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Generated automatically</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700 font-medium">Monthly cost</td>
                    <td className="py-4 px-6 text-center text-gray-500">Your hourly rate × hours</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">From $29/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PRICING PREVIEW */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple Pricing for Solo Consultants</h2>
              <p className="text-xl text-gray-600">Most freelancers choose Starter — 5 clients is plenty to start.</p>
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
                  <li><a href="https://reportr.agency" className="font-bold hover:underline">Reportr</a> branding</li>
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
                  <li>White-label included</li>
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
                  <li>White-label included</li>
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
                  <li>White-label included</li>
                </ul>
                <a href="/signup?plan=agency" className="block text-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
                  Start Trial
                </a>
              </div>
            </div>
            
            <p className="text-center text-gray-500 text-sm mt-6">
              All paid plans include a 14-day free trial. White-label branding included in all paid plans.
              <a href="/pricing" className="text-brand-600 hover:underline ml-1">See full pricing details →</a>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Questions from Freelancers</h2>
              <p className="text-xl text-gray-600">Real questions from solo SEO consultants using <a href="https://reportr.agency" className="font-bold hover:underline">Reportr</a>.</p>
            </div>
            
            <div className="space-y-4">
              <details className="bg-white rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  I only have 2-3 clients. Is <a href="https://reportr.agency" className="font-bold hover:underline">Reportr</a> worth it?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Yes. Start with the free plan (1 client, 5 reports/month) and upgrade to Starter ($29/mo, 5 clients) when you grow. If reporting takes you even 2 hours per client, you&apos;re saving 6+ hours per month — easily worth $29.
                </div>
              </details>
              
              <details className="bg-white rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Will my clients know I&apos;m using <a href="https://reportr.agency" className="font-bold hover:underline">Reportr</a>?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  No. Reports are fully white-labeled — your logo, your colors, your company name. There are no &quot;Powered by <a href="https://reportr.agency" className="font-bold hover:underline">Reportr</a>&quot; badges anywhere on the PDF. Your clients see only your brand.
                </div>
              </details>
              
              <details className="bg-white rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Do I need my client&apos;s Google account login?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  No. You connect through Google OAuth — the standard secure method. Your client grants you access to their Search Console and Analytics properties, which most freelancers already have.
                </div>
              </details>
              
              <details className="bg-white rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Can I customize what data shows in the report?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Yes. Choose between Executive Summary (quick overview), Standard Report (full analysis), or Custom Report where you pick exactly which metrics to include. Tailor reports to what each client cares about.
                </div>
              </details>
              
              <details className="bg-white rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Why not just use Google Data Studio / Looker Studio?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Looker Studio is free but requires significant setup, has limited white-labeling, and produces dashboards — not professional PDFs. Clients prefer a clean branded PDF they can forward to stakeholders. <a href="https://reportr.agency" className="font-bold hover:underline">Reportr</a> generates that in one click.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Stop Trading Billable Hours for Spreadsheet Work</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join freelance SEO consultants who&apos;ve reclaimed their reporting hours. Set up in 5 minutes, generate reports forever.
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
              <a href="/white-label-seo-reports" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Hub Page</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">White Label SEO Reports</h3>
                <p className="text-gray-600 text-sm">Complete guide to white-label SEO reporting for all business types.</p>
              </a>
              
              <a href="/blog/best-white-label-seo-reporting-tool" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Guide</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Best White Label SEO Reporting Tools</h3>
                <p className="text-gray-600 text-sm">Compare the top white-label reporting tools for freelancers and agencies.</p>
              </a>
              
              <a href="/white-label-seo-reports-for-digital-marketing-agencies" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">For Agencies</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Reports for Digital Marketing Agencies</h3>
                <p className="text-gray-600 text-sm">White-label SEO reporting solutions for growing marketing agencies.</p>
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
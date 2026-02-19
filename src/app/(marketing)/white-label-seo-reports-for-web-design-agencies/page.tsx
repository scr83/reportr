import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "White Label SEO Reports for Web Design Agencies | Reportr",
  description: "Add SEO reporting to your web design services. Professional white-label reports that complement your design work. Your branding, easy setup. From $29/mo.",
  
  keywords: [
    "white label seo reports for web design agencies",
    "seo reporting for web designers",
    "web agency seo reports",
    "seo reports web development agency",
    "white label seo web design"
  ],
  
  alternates: {
    canonical: "https://reportr.agency/white-label-seo-reports-for-web-design-agencies",
    languages: {
      "en-US": "https://reportr.agency/white-label-seo-reports-for-web-design-agencies",
      "en-GB": "https://reportr.agency/white-label-seo-reports-for-web-design-agencies",
      "en-AU": "https://reportr.agency/white-label-seo-reports-for-web-design-agencies",
      "en-CA": "https://reportr.agency/white-label-seo-reports-for-web-design-agencies",
      "en-NZ": "https://reportr.agency/white-label-seo-reports-for-web-design-agencies",
      "en-IE": "https://reportr.agency/white-label-seo-reports-for-web-design-agencies",
      "en-IN": "https://reportr.agency/white-label-seo-reports-for-web-design-agencies",
      "x-default": "https://reportr.agency/white-label-seo-reports-for-web-design-agencies"
    }
  },
  
  robots: {
    index: true,
    follow: true,
  },
  
  openGraph: {
    title: "White Label SEO Reports for Web Design Agencies | Reportr",
    description: "Add SEO reporting to your web design services. Professional white-label reports that complement your design work.",
    url: "https://reportr.agency/white-label-seo-reports-for-web-design-agencies",
    siteName: "Reportr",
    type: "website",
  },
};

// Schema Markup Components
const StructuredData = () => {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Reportr - White Label SEO Reports for Web Design Agencies",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "Professional white-label SEO reports designed for web design agencies offering SEO as an add-on service. Pull data from Google Search Console, GA4, and PageSpeed Insights automatically.",
    "url": "https://reportr.agency/white-label-seo-reports-for-web-design-agencies",
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
        "name": "For Web Design Agencies",
        "item": "https://reportr.agency/white-label-seo-reports-for-web-design-agencies"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "We focus on design, not SEO. Is this still useful?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Many web design clients ask about SEO performance after launch. Professional reports help you provide ongoing value without becoming an SEO expert — the reports show data and AI provides recommendations."
        }
      },
      {
        "@type": "Question",
        "name": "Can we charge clients for these reports?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Many web design agencies charge $200-500/month for monthly SEO reports as a post-launch service. This creates recurring revenue beyond the initial website project."
        }
      },
      {
        "@type": "Question",
        "name": "Do the reports match our design aesthetic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reports are fully white-labeled with your logo, colors, and branding. The clean, professional design complements your creative work and maintains brand consistency with your other deliverables."
        }
      },
      {
        "@type": "Question",
        "name": "What if we don't understand the SEO data?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Each report includes AI-generated explanations and recommendations in plain English. You don't need to interpret the data — the system explains what it means and suggests next steps for clients."
        }
      },
      {
        "@type": "Question",
        "name": "How does this integrate with our design workflow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "After launching a client's website, connect their Google accounts once. Then generate monthly reports with one click. It fits seamlessly into your post-launch client relationship and support services."
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

export default function WebDesignAgenciesPage() {
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
              <div className="flex items-center gap-4">
                <a href="/signup" className="bg-brand-600 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors">
                  Start Free Trial
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
          <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              <div className="text-center md:text-left">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <span className="text-yellow-300 font-semibold text-sm">Perfect for Design-First Agencies</span>
                </div>
                
                {/* H1 */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  White Label SEO Reports for
                  <span className="block text-yellow-300">Web Design Agencies</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  You build beautiful websites. Now add ongoing SEO reporting to create monthly recurring revenue and deeper client relationships beyond the initial project.
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
                        <span className="text-white font-bold text-sm">PD</span>
                      </div>
                      <div>
                        <div className="text-gray-900 font-semibold">Pixel Design Co</div>
                        <div className="text-gray-500 text-sm">Monthly SEO Report</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-green-600 text-xs font-medium">Clicks</div>
                        <div className="text-green-700 text-xl font-bold">11,234</div>
                        <div className="text-green-600 text-xs">↑ 28% vs last month</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-blue-600 text-xs font-medium">Impressions</div>
                        <div className="text-blue-700 text-xl font-bold">198K</div>
                        <div className="text-blue-600 text-xs">↑ 14% vs last month</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-purple-600 text-xs font-medium">Keywords</div>
                        <div className="text-purple-700 text-xl font-bold">567</div>
                        <div className="text-purple-600 text-xs">↑ 34 new</div>
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
                        "Portfolio page" has strong visuals but needs better alt text for images to improve SEO...
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Web Design Agency Challenges with SEO Reporting</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                You create stunning websites, but clients ask about SEO performance after launch. Manual reporting takes time away from creative work.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* One-Time Projects */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Projects End, Relationships Don&apos;t</h3>
                <p className="text-gray-700">
                  You launch beautiful websites, but then clients are on their own. They call with questions about traffic, rankings, and performance — but you don&apos;t have easy answers or ongoing revenue to justify the support.
                </p>
              </div>
              
              {/* SEO Knowledge Gap */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">SEO Feels Like a Different Language</h3>
                <p className="text-gray-700">
                  You&apos;re design experts, not SEO specialists. When clients ask about clicks, impressions, and keyword rankings, you end up spending hours trying to understand Google Search Console and Analytics instead of designing.
                </p>
              </div>
              
              {/* Revenue Opportunity */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Missing Recurring Revenue</h3>
                <p className="text-gray-700">
                  Every project ends and you start over finding new clients. There&apos;s no monthly recurring revenue to smooth out cash flow, even though clients would pay for ongoing performance insights and website health monitoring.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How <strong>Reportr</strong> Works for Web Design Agencies</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Three simple steps to add professional SEO reporting to your post-launch services.</p>
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
                <p className="text-gray-600">After launching your client&apos;s website, connect their Google Search Console and Analytics via secure OAuth. One-time setup, no ongoing maintenance.</p>
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
                <p className="text-gray-600">Upload your design agency logo and set brand colors. Reports match your visual identity and complement your other creative deliverables.</p>
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
                <p className="text-gray-600">One click creates a professional PDF showing website performance, SEO insights, and AI-generated recommendations. Send to clients monthly as an add-on service.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Perfect for Design Agencies Adding SEO Services</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Features designed for creative agencies who want to expand services without becoming SEO experts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Design-Focused Branding */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Design-Focused Branding</h3>
                <p className="text-gray-600 text-sm">Clean, professional report templates that complement your creative aesthetic and maintain brand consistency across all deliverables.</p>
              </div>
              
              {/* No SEO Expertise Required */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">AI Handles SEO Knowledge</h3>
                <p className="text-gray-600 text-sm">You don&apos;t need to understand SEO metrics — AI generates plain-English explanations and recommendations for every report.</p>
              </div>
              
              {/* Post-Launch Revenue */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Monthly Recurring Revenue</h3>
                <p className="text-gray-600 text-sm">Charge $200-500/month per client for ongoing SEO reporting as a post-launch service. Turn one-time projects into recurring relationships.</p>
              </div>
              
              {/* Simple Pricing */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Simple, Predictable Pricing</h3>
                <p className="text-gray-600 text-sm">Starter ($29) for 5 clients or Professional ($59) for 15 clients. No complex enterprise pricing for services you don&apos;t need.</p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Manual Reporting vs <strong>Reportr</strong></h2>
              <p className="text-xl text-gray-600">What monthly SEO reporting looks like for 10 web design clients.</p>
            </div>
            
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Aspect</th>
                    <th className="text-center py-4 px-6 font-semibold text-red-600">Manual Process</th>
                    <th className="text-center py-4 px-6 font-semibold text-brand-600">With <strong>Reportr</strong></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Time per report</td>
                    <td className="py-4 px-6 text-center text-red-600">2-4 hours</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">30 seconds</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">10 clients / month</td>
                    <td className="py-4 px-6 text-center text-red-600">20-40 hours</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">~5 minutes</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">Design aesthetic</td>
                    <td className="py-4 px-6 text-center text-gray-500">Generic templates</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Your agency branding</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">Data sources</td>
                    <td className="py-4 px-6 text-center text-gray-500">Learn GSC + Analytics</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">Automatic data pulling</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700 font-medium">SEO expertise needed</td>
                    <td className="py-4 px-6 text-center text-gray-500">Hours of research</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">AI explains everything</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700 font-medium">Monthly cost</td>
                    <td className="py-4 px-6 text-center text-gray-500">$1,500-3,000 in time</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">$59/mo total</td>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Questions from Web Design Agencies</h2>
              <p className="text-xl text-gray-600">Common questions from design agencies adding SEO reporting services.</p>
            </div>
            
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  We focus on design, not SEO. Is this still useful?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Yes. Many web design clients ask about SEO performance after launch. Professional reports help you provide ongoing value without becoming an SEO expert — the reports show data and AI provides recommendations.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Can we charge clients for these reports?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Absolutely. Many web design agencies charge $200-500/month for monthly SEO reports as a post-launch service. This creates recurring revenue beyond the initial website project.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  Do the reports match our design aesthetic?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Reports are fully white-labeled with your logo, colors, and branding. The clean, professional design complements your creative work and maintains brand consistency with your other deliverables.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  What if we don&apos;t understand the SEO data?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Each report includes AI-generated explanations and recommendations in plain English. You don&apos;t need to interpret the data — the system explains what it means and suggests next steps for clients.
                </div>
              </details>
              
              <details className="bg-gray-50 rounded-xl border border-gray-200 group">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                  How does this integrate with our design workflow?
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  After launching a client&apos;s website, connect their Google accounts once. Then generate monthly reports with one click. It fits seamlessly into your post-launch client relationship and support services.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Add Recurring Revenue to Your Design Business</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Transform one-time website projects into ongoing client relationships with professional SEO reporting.
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
              <a href="/white-label-seo-reports" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Hub Page</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">White Label SEO Reports</h3>
                <p className="text-gray-600 text-sm">Complete guide to white-label SEO reporting for all business types.</p>
              </a>
              
              <a href="/blog/web-design-agency-seo-services" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Guide</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Adding SEO Services to Web Design</h3>
                <p className="text-gray-600 text-sm">How web design agencies can expand into SEO without becoming experts.</p>
              </a>
              
              <a href="/white-label-seo-reports-for-digital-marketing-agencies" className="bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">For Full-Service</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-2">Reports for Digital Marketing Agencies</h3>
                <p className="text-gray-600 text-sm">White-label SEO reporting for full-service marketing agencies.</p>
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
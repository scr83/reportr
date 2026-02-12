import { Metadata } from 'next';

export const metadata: Metadata = {
  // Core Metadata
  title: &ldquo;White Label SEO Reports | Professional Branded Reports for Agencies | Reportr&ldquo;,
  description: &ldquo;Generate white label SEO reports with your branding in minutes. Professional PDF reports with Google Search Console, GA4 & PageSpeed data. Your logo, your colors. From $29/mo.&ldquo;,
  
  // SEO Targeting
  keywords: [
    &ldquo;white label seo reports&ldquo;,
    &ldquo;white label seo report&ldquo;, 
    &ldquo;white label seo reporting tool&ldquo;,
    &ldquo;seo report white label&ldquo;,
    &ldquo;white label seo reporting&ldquo;,
    &ldquo;branded seo reports&ldquo;,
    &ldquo;white label seo software&ldquo;
  ],
  
  // Canonical & Indexing
  alternates: {
    canonical: &ldquo;https://reportr.agency/white-label-seo-reports&ldquo;,
    languages: {
      &ldquo;en-US&ldquo;: &ldquo;https://reportr.agency/white-label-seo-reports&ldquo;,
      &ldquo;en-GB&ldquo;: &ldquo;https://reportr.agency/white-label-seo-reports&ldquo;,
      &ldquo;en-AU&ldquo;: &ldquo;https://reportr.agency/white-label-seo-reports&ldquo;,
      &ldquo;en-CA&ldquo;: &ldquo;https://reportr.agency/white-label-seo-reports&ldquo;,
      &ldquo;en-NZ&ldquo;: &ldquo;https://reportr.agency/white-label-seo-reports&ldquo;,
      &ldquo;en-IE&ldquo;: &ldquo;https://reportr.agency/white-label-seo-reports&ldquo;,
      &ldquo;en-IN&ldquo;: &ldquo;https://reportr.agency/white-label-seo-reports&ldquo;,
      &ldquo;x-default&ldquo;: &ldquo;https://reportr.agency/white-label-seo-reports&ldquo;
    }
  },
  
  robots: {
    index: true,
    follow: true,
  },
  
  // Open Graph
  openGraph: {
    title: &ldquo;White Label SEO Reports | Professional Branded Reports for Agencies&ldquo;,
    description: &ldquo;Generate white label SEO reports with your branding in minutes. Professional PDF reports your clients will love.&ldquo;,
    url: &ldquo;https://reportr.agency/white-label-seo-reports&ldquo;,
    siteName: &ldquo;Reportr&ldquo;,
    type: &ldquo;website&ldquo;,
    images: [
      {
        url: &ldquo;https://reportr.agency/og/white-label-seo-reports.png&ldquo;,
        width: 1200,
        height: 630,
        alt: &ldquo;White Label SEO Reports by Reportr&ldquo;
      }
    ]
  },
  
  // Twitter
  twitter: {
    card: &ldquo;summary_large_image&ldquo;,
    title: &ldquo;White Label SEO Reports | Reportr&ldquo;,
    description: &ldquo;Generate white label SEO reports with your branding in minutes.&ldquo;
  }
};

// Schema Markup Components
const StructuredData = () => {
  const softwareSchema = {
    &ldquo;@context&ldquo;: &ldquo;https://schema.org&ldquo;,
    &ldquo;@type&ldquo;: &ldquo;SoftwareApplication&ldquo;,
    &ldquo;name&ldquo;: &ldquo;Reportr - White Label SEO Reports&ldquo;,
    &ldquo;applicationCategory&ldquo;: &ldquo;BusinessApplication&ldquo;,
    &ldquo;operatingSystem&ldquo;: &ldquo;Web&ldquo;,
    &ldquo;description&ldquo;: &ldquo;Generate professional white label SEO reports with your branding. Pull data from Google Search Console, Google Analytics 4, and PageSpeed Insights automatically.&ldquo;,
    &ldquo;url&ldquo;: &ldquo;https://reportr.agency/white-label-seo-reports&ldquo;,
    &ldquo;offers&ldquo;: {
      &ldquo;@type&ldquo;: &ldquo;AggregateOffer&ldquo;,
      &ldquo;lowPrice&ldquo;: &ldquo;0&ldquo;,
      &ldquo;highPrice&ldquo;: &ldquo;99&ldquo;,
      &ldquo;priceCurrency&ldquo;: &ldquo;USD&ldquo;,
      &ldquo;offerCount&ldquo;: &ldquo;4&ldquo;
    },
    &ldquo;featureList&ldquo;: [
      &ldquo;White label branding&ldquo;,
      &ldquo;Google Search Console integration&ldquo;,
      &ldquo;Google Analytics 4 integration&ldquo;,
      &ldquo;PageSpeed Insights integration&ldquo;,
      &ldquo;AI-powered recommendations&ldquo;,
      &ldquo;PDF report generation&ldquo;,
      &ldquo;Custom report templates&ldquo;
    ]
  };

  const breadcrumbSchema = {
    &ldquo;@context&ldquo;: &ldquo;https://schema.org&ldquo;,
    &ldquo;@type&ldquo;: &ldquo;BreadcrumbList&ldquo;,
    &ldquo;itemListElement&ldquo;: [
      {
        &ldquo;@type&ldquo;: &ldquo;ListItem&ldquo;,
        &ldquo;position&ldquo;: 1,
        &ldquo;name&ldquo;: &ldquo;Home&ldquo;,
        &ldquo;item&ldquo;: &ldquo;https://reportr.agency&ldquo;
      },
      {
        &ldquo;@type&ldquo;: &ldquo;ListItem&ldquo;,
        &ldquo;position&ldquo;: 2,
        &ldquo;name&ldquo;: &ldquo;White Label SEO Reports&ldquo;,
        &ldquo;item&ldquo;: &ldquo;https://reportr.agency/white-label-seo-reports&ldquo;
      }
    ]
  };

  const faqSchema = {
    &ldquo;@context&ldquo;: &ldquo;https://schema.org&ldquo;,
    &ldquo;@type&ldquo;: &ldquo;FAQPage&ldquo;,
    &ldquo;mainEntity&ldquo;: [
      {
        &ldquo;@type&ldquo;: &ldquo;Question&ldquo;,
        &ldquo;name&ldquo;: &ldquo;What are white label SEO reports?&ldquo;,
        &ldquo;acceptedAnswer&ldquo;: {
          &ldquo;@type&ldquo;: &ldquo;Answer&ldquo;,
          &ldquo;text&ldquo;: &ldquo;White label SEO reports are professional client-facing reports that display your agency's branding instead of the software provider's branding. They include your logo, colors, and company name, making it appear as if you created the reporting tool yourself.&ldquo;
        }
      },
      {
        &ldquo;@type&ldquo;: &ldquo;Question&ldquo;,
        &ldquo;name&ldquo;: &ldquo;What data sources are included in white label SEO reports?&ldquo;,
        &ldquo;acceptedAnswer&ldquo;: {
          &ldquo;@type&ldquo;: &ldquo;Answer&ldquo;,
          &ldquo;text&ldquo;: &ldquo;Reportr's white label SEO reports pull data from Google Search Console (keywords, clicks, impressions, positions), Google Analytics 4 (traffic, sessions, user behavior), and PageSpeed Insights (Core Web Vitals, mobile and desktop performance scores).&ldquo;
        }
      },
      {
        &ldquo;@type&ldquo;: &ldquo;Question&ldquo;,
        &ldquo;name&ldquo;: &ldquo;How much do white label SEO reports cost?&ldquo;,
        &ldquo;acceptedAnswer&ldquo;: {
          &ldquo;@type&ldquo;: &ldquo;Answer&ldquo;,
          &ldquo;text&ldquo;: &ldquo;Reportr offers white label SEO reports starting at $29/month for the Starter plan (5 clients, 25 reports). There's also a free plan with 1 client and 5 reports/month. White-label branding is available as a $20/month add-on for paid plans.&ldquo;
        }
      },
      {
        &ldquo;@type&ldquo;: &ldquo;Question&ldquo;,
        &ldquo;name&ldquo;: &ldquo;How long does it take to generate a report?&ldquo;,
        &ldquo;acceptedAnswer&ldquo;: {
          &ldquo;@type&ldquo;: &ldquo;Answer&ldquo;,
          &ldquo;text&ldquo;: &ldquo;After connecting your client's Google accounts (a one-time setup), generating a report takes under 60 seconds. Click the generate button, wait for the data to be pulled, and download your PDF.&ldquo;
        }
      },
      {
        &ldquo;@type&ldquo;: &ldquo;Question&ldquo;,
        &ldquo;name&ldquo;: &ldquo;Do I need my client's Google login credentials?&ldquo;,
        &ldquo;acceptedAnswer&ldquo;: {
          &ldquo;@type&ldquo;: &ldquo;Answer&ldquo;,
          &ldquo;text&ldquo;: &ldquo;No. Reportr uses Google OAuth — the standard secure method. Your client grants you access to their Search Console and Analytics properties through a secure authorization flow. We never see or store passwords.&ldquo;
        }
      },
      {
        &ldquo;@type&ldquo;: &ldquo;Question&ldquo;,
        &ldquo;name&ldquo;: &ldquo;What report templates are available?&ldquo;,
        &ldquo;acceptedAnswer&ldquo;: {
          &ldquo;@type&ldquo;: &ldquo;Answer&ldquo;,
          &ldquo;text&ldquo;: &ldquo;Reportr offers three report types: Executive Summary (quick 2-page overview), Standard SEO Report (comprehensive analysis), and Custom Report (choose exactly which sections and metrics to include). All templates support white-label branding.&ldquo;
        }
      },
      {
        &ldquo;@type&ldquo;: &ldquo;Question&ldquo;,
        &ldquo;name&ldquo;: &ldquo;How is Reportr different from AgencyAnalytics or Semrush?&ldquo;,
        &ldquo;acceptedAnswer&ldquo;: {
          &ldquo;@type&ldquo;: &ldquo;Answer&ldquo;,
          &ldquo;text&ldquo;: &ldquo;Reportr is purpose-built for SEO reporting only. We focus on GSC, GA4, and PageSpeed — the core metrics SEO clients care about. Enterprise tools like AgencyAnalytics ($150+/mo) and Semrush ($130+/mo) have dozens of integrations you'll never use. Reportr starts at $29/mo.&ldquo;
        }
      }
    ]
  };

  return (
    <>
      <script
        type=&ldquo;application/ld+json&ldquo;
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />
      <script
        type=&ldquo;application/ld+json&ldquo;
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type=&ldquo;application/ld+json&ldquo;
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
      <div className=&ldquo;bg-white text-gray-900 antialiased&ldquo;>
        
        {/* BREADCRUMB */}
        <div className=&ldquo;bg-gray-50 border-b border-gray-100&ldquo;>
          <div className=&ldquo;max-w-6xl mx-auto px-4 py-3&ldquo;>
            <nav className=&ldquo;flex items-center gap-2 text-sm text-gray-500&ldquo; aria-label=&ldquo;Breadcrumb&ldquo;>
              <a href=&ldquo;/&ldquo; className=&ldquo;hover:text-brand-600 transition-colors&ldquo;>Home</a>
              <svg className=&ldquo;w-4 h-4&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M9 5l7 7-7 7&ldquo;/>
              </svg>
              <span className=&ldquo;text-gray-900 font-medium&ldquo;>White Label SEO Reports</span>
            </nav>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className=&ldquo;relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white&ldquo;>
          {/* Grid pattern overlay */}
          <div className=&ldquo;absolute inset-0 opacity-10&ldquo;>
            <svg className=&ldquo;w-full h-full&ldquo; xmlns=&ldquo;http://www.w3.org/2000/svg&ldquo;>
              <defs>
                <pattern id=&ldquo;grid&ldquo; width=&ldquo;40&ldquo; height=&ldquo;40&ldquo; patternUnits=&ldquo;userSpaceOnUse&ldquo;>
                  <path d=&ldquo;M 40 0 L 0 0 0 40&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;white&ldquo; strokeWidth=&ldquo;1&ldquo;/>
                </pattern>
              </defs>
              <rect width=&ldquo;100%&ldquo; height=&ldquo;100%&ldquo; fill=&ldquo;url(#grid)&ldquo; />
            </svg>
          </div>
          
          <div className=&ldquo;relative max-w-6xl mx-auto px-4 py-16 md:py-24&ldquo;>
            <div className=&ldquo;grid md:grid-cols-2 gap-12 items-center&ldquo;>
              
              <div className=&ldquo;text-center md:text-left&ldquo;>
                {/* Trust badge */}
                <div className=&ldquo;inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6&ldquo;>
                  <svg className=&ldquo;w-5 h-5 text-green-400&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                    <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                  </svg>
                  <span className=&ldquo;text-sm font-medium&ldquo;>Trusted by 500+ agencies and freelancers</span>
                </div>
                
                {/* H1 - Exact match for primary keyword */}
                <h1 className=&ldquo;text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6&ldquo;>
                  White Label SEO Reports
                  <span className=&ldquo;block text-yellow-300&ldquo;>Your Brand, Not Ours</span>
                </h1>
                
                {/* Subtitle with secondary keywords */}
                <p className=&ldquo;text-xl md:text-2xl text-white/90 mb-8 leading-relaxed&ldquo;>
                  Generate professional <strong>white label SEO reporting</strong> with your logo, colors, and branding. 
                  Pull data from GSC, GA4 & PageSpeed automatically. 
                  <span className=&ldquo;font-semibold&ldquo;>Minutes, not hours.</span>
                </p>
                
                {/* Pricing + trust signals */}
                <div className=&ldquo;flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8&ldquo;>
                  <div className=&ldquo;bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2&ldquo;>
                    <span className=&ldquo;text-sm text-white/80&ldquo;>Starting at</span>
                    <span className=&ldquo;text-2xl font-bold ml-2&ldquo;>$29/mo</span>
                  </div>
                  <div className=&ldquo;flex items-center gap-2 text-white/90&ldquo;>
                    <svg className=&ldquo;w-5 h-5 text-green-400&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    <span>Free plan available</span>
                  </div>
                  <div className=&ldquo;flex items-center gap-2 text-white/90&ldquo;>
                    <svg className=&ldquo;w-5 h-5 text-green-400&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    <span>14-day trial</span>
                  </div>
                </div>
                
                {/* CTA */}
                <div className=&ldquo;flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start&ldquo;>
                  <a href=&ldquo;/signup&ldquo; 
                     className=&ldquo;w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-brand-700 font-bold text-lg px-8 py-4 rounded-lg hover:bg-yellow-300 hover:text-brand-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5&ldquo;>
                    Create Your First Report Free
                    <svg className=&ldquo;w-5 h-5&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                      <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M13 7l5 5m0 0l-5 5m5-5H6&ldquo;/>
                    </svg>
                  </a>
                  <a href=&ldquo;#demo&ldquo; className=&ldquo;text-white/90 hover:text-white font-medium flex items-center gap-2&ldquo;>
                    <svg className=&ldquo;w-5 h-5&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    See how it works
                  </a>
                </div>
              </div>
              
              {/* Report mockup */}
              <div className=&ldquo;relative hidden md:block&ldquo;>
                <div className=&ldquo;animate-float&ldquo;>
                  <div className=&ldquo;bg-white rounded-xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300&ldquo;>
                    <div className=&ldquo;flex items-center gap-3 mb-4 pb-4 border-b&ldquo;>
                      <div className=&ldquo;w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center&ldquo;>
                        <span className=&ldquo;text-white font-bold text-sm&ldquo;>AB</span>
                      </div>
                      <div>
                        <div className=&ldquo;text-gray-900 font-semibold&ldquo;>Acme Agency</div>
                        <div className=&ldquo;text-gray-500 text-sm&ldquo;>White Label SEO Report</div>
                      </div>
                    </div>
                    <div className=&ldquo;grid grid-cols-2 gap-3 mb-4&ldquo;>
                      <div className=&ldquo;bg-green-50 rounded-lg p-3&ldquo;>
                        <div className=&ldquo;text-green-600 text-xs font-medium&ldquo;>Clicks</div>
                        <div className=&ldquo;text-green-700 text-xl font-bold&ldquo;>12,847</div>
                        <div className=&ldquo;text-green-600 text-xs&ldquo;>↑ 23% vs last month</div>
                      </div>
                      <div className=&ldquo;bg-blue-50 rounded-lg p-3&ldquo;>
                        <div className=&ldquo;text-blue-600 text-xs font-medium&ldquo;>Impressions</div>
                        <div className=&ldquo;text-blue-700 text-xl font-bold&ldquo;>284K</div>
                        <div className=&ldquo;text-blue-600 text-xs&ldquo;>↑ 18% vs last month</div>
                      </div>
                      <div className=&ldquo;bg-purple-50 rounded-lg p-3&ldquo;>
                        <div className=&ldquo;text-purple-600 text-xs font-medium&ldquo;>Avg. Position</div>
                        <div className=&ldquo;text-purple-700 text-xl font-bold&ldquo;>8.4</div>
                        <div className=&ldquo;text-purple-600 text-xs&ldquo;>↑ 2.1 improvement</div>
                      </div>
                      <div className=&ldquo;bg-orange-50 rounded-lg p-3&ldquo;>
                        <div className=&ldquo;text-orange-600 text-xs font-medium&ldquo;>PageSpeed</div>
                        <div className=&ldquo;text-orange-700 text-xl font-bold&ldquo;>94</div>
                        <div className=&ldquo;text-orange-600 text-xs&ldquo;>Excellent</div>
                      </div>
                    </div>
                    <div className=&ldquo;bg-gradient-to-r from-brand-50 to-purple-50 rounded-lg p-3 border border-brand-100&ldquo;>
                      <div className=&ldquo;flex items-center gap-2 mb-1&ldquo;>
                        <svg className=&ldquo;w-4 h-4 text-brand-600&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                          <path d=&ldquo;M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707z&ldquo;/>
                          <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                        </svg>
                        <span className=&ldquo;text-brand-700 text-xs font-semibold&ldquo;>AI Recommendation</span>
                      </div>
                      <p className=&ldquo;text-gray-700 text-xs&ldquo;>
                        &ldquo;Homepage&ldquo; ranks #11 for &ldquo;seo services&ldquo; — optimize meta title to reach page 1...
                      </p>
                    </div>
                  </div>
                </div>
                <div className=&ldquo;absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-300/20 rounded-full blur-2xl&ldquo;></div>
                <div className=&ldquo;absolute -top-4 -left-4 w-32 h-32 bg-brand-400/20 rounded-full blur-2xl&ldquo;></div>
              </div>
              
            </div>
          </div>
        </section>

        {/* WHAT ARE WHITE LABEL SEO REPORTS (Definition section for SEO) */}
        <section className=&ldquo;py-16 md:py-24 bg-white&ldquo;>
          <div className=&ldquo;max-w-4xl mx-auto px-4&ldquo;>
            <div className=&ldquo;text-center mb-12&ldquo;>
              <h2 className=&ldquo;text-3xl md:text-4xl font-bold text-gray-900 mb-6&ldquo;>What Are White Label SEO Reports?</h2>
              <p className=&ldquo;text-xl text-gray-600 leading-relaxed&ldquo;>
                <strong>White label SEO reports</strong> are professional client-facing reports that display your agency&apos;s branding instead of the software provider&apos;s branding. They include your logo, your colors, and your company name — making it appear as if you built the reporting tool yourself.
              </p>
            </div>
            
            <div className=&ldquo;grid md:grid-cols-2 gap-8&ldquo;>
              {/* Without white label */}
              <div className=&ldquo;bg-red-50 rounded-2xl p-6 border border-red-100&ldquo;>
                <div className=&ldquo;flex items-center gap-3 mb-4&ldquo;>
                  <div className=&ldquo;w-10 h-10 bg-red-100 rounded-full flex items-center justify-center&ldquo;>
                    <svg className=&ldquo;w-5 h-5 text-red-600&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                      <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M6 18L18 6M6 6l12 12&ldquo;/>
                    </svg>
                  </div>
                  <h3 className=&ldquo;font-bold text-red-800&ldquo;>Without White Labeling</h3>
                </div>
                <ul className=&ldquo;space-y-3 text-gray-700 text-sm&ldquo;>
                  <li className=&ldquo;flex items-start gap-2&ldquo;>
                    <svg className=&ldquo;w-5 h-5 text-red-400 flex-shrink-0 mt-0.5&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    &ldquo;Powered by [Software Name]&ldquo; badges
                  </li>
                  <li className=&ldquo;flex items-start gap-2&ldquo;>
                    <svg className=&ldquo;w-5 h-5 text-red-400 flex-shrink-0 mt-0.5&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    Software provider&apos;s logo on reports
                  </li>
                  <li className=&ldquo;flex items-start gap-2&ldquo;>
                    <svg className=&ldquo;w-5 h-5 text-red-400 flex-shrink-0 mt-0.5&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    Generic color schemes
                  </li>
                  <li className=&ldquo;flex items-start gap-2&ldquo;>
                    <svg className=&ldquo;w-5 h-5 text-red-400 flex-shrink-0 mt-0.5&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    Clients see who you&apos;re paying for tools
                  </li>
                </ul>
              </div>
              
              {/* With white label */}
              <div className=&ldquo;bg-green-50 rounded-2xl p-6 border border-green-100&ldquo;>
                <div className=&ldquo;flex items-center gap-3 mb-4&ldquo;>
                  <div className=&ldquo;w-10 h-10 bg-green-100 rounded-full flex items-center justify-center&ldquo;>
                    <svg className=&ldquo;w-5 h-5 text-green-600&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                      <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M5 13l4 4L19 7&ldquo;/>
                    </svg>
                  </div>
                  <h3 className=&ldquo;font-bold text-green-800&ldquo;>With White Label Reports</h3>
                </div>
                <ul className=&ldquo;space-y-3 text-gray-700 text-sm&ldquo;>
                  <li className=&ldquo;flex items-start gap-2&ldquo;>
                    <svg className=&ldquo;w-5 h-5 text-green-500 flex-shrink-0 mt-0.5&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    Your logo on every page
                  </li>
                  <li className=&ldquo;flex items-start gap-2&ldquo;>
                    <svg className=&ldquo;w-5 h-5 text-green-500 flex-shrink-0 mt-0.5&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    Your brand colors throughout
                  </li>
                  <li className=&ldquo;flex items-start gap-2&ldquo;>
                    <svg className=&ldquo;w-5 h-5 text-green-500 flex-shrink-0 mt-0.5&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    Your company name in headers/footers
                  </li>
                  <li className=&ldquo;flex items-start gap-2&ldquo;>
                    <svg className=&ldquo;w-5 h-5 text-green-500 flex-shrink-0 mt-0.5&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    Zero &ldquo;Powered by&ldquo; badges
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* DATA SOURCES SECTION */}
        <section className=&ldquo;py-16 md:py-24 bg-gray-50&ldquo;>
          <div className=&ldquo;max-w-6xl mx-auto px-4&ldquo;>
            <div className=&ldquo;text-center mb-12&ldquo;>
              <h2 className=&ldquo;text-3xl md:text-4xl font-bold text-gray-900 mb-4&ldquo;>What&apos;s Included in Our White Label SEO Reports</h2>
              <p className=&ldquo;text-xl text-gray-600 max-w-3xl mx-auto&ldquo;>
                <a href=&ldquo;/&ldquo; className=&ldquo;text-brand-600 hover:underline&ldquo;>Reportr</a> pulls data from three essential Google data sources and presents them in a beautiful, branded PDF your clients will actually read.
              </p>
            </div>
            
            <div className=&ldquo;grid md:grid-cols-3 gap-8&ldquo;>
              {/* Google Search Console */}
              <div className=&ldquo;bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300&ldquo;>
                <div className=&ldquo;w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6&ldquo;>
                  <svg className=&ldquo;w-8 h-8 text-blue-600&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                    <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z&ldquo;/>
                  </svg>
                </div>
                <h3 className=&ldquo;text-xl font-bold text-gray-900 mb-3&ldquo;>Google Search Console</h3>
                <p className=&ldquo;text-gray-600 mb-4&ldquo;>The foundation of every SEO report — how your client&apos;s site performs in Google search results.</p>
                <ul className=&ldquo;space-y-2 text-sm text-gray-600&ldquo;>
                  <li className=&ldquo;flex items-center gap-2&ldquo;>
                    <svg className=&ldquo;w-4 h-4 text-green-500&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    Total clicks & impressions
                  </li>
                  <li className=&ldquo;flex items-center gap-2&ldquo;>
                    <svg className=&ldquo;w-4 h-4 text-green-500&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    Average position & CTR
                  </li>
                  <li className=&ldquo;flex items-center gap-2&ldquo;>
                    <svg className=&ldquo;w-4 h-4 text-green-500&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    Top performing keywords
                  </li>
                  <li className=&ldquo;flex items-center gap-2&ldquo;>
                    <svg className=&ldquo;w-4 h-4 text-green-500&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    Top performing pages
                  </li>
                  <li className=&ldquo;flex items-center gap-2&ldquo;>
                    <svg className=&ldquo;w-4 h-4 text-green-500&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    Month-over-month trends
                  </li>
                </ul>
              </div>
              
              {/* Google Analytics 4 */}
              <div className=&ldquo;bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300&ldquo;>
                <div className=&ldquo;w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6&ldquo;>
                  <svg className=&ldquo;w-8 h-8 text-orange-600&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                    <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z&ldquo;/>
                  </svg>
                </div>
                <h3 className=&ldquo;text-xl font-bold text-gray-900 mb-3&ldquo;>Google Analytics 4</h3>
                <p className=&ldquo;text-gray-600 mb-4&ldquo;>Traffic data that tells the story of how organic visitors behave on your client&apos;s site.</p>
                <ul className=&ldquo;space-y-2 text-sm text-gray-600&ldquo;>
                  <li className=&ldquo;flex items-center gap-2&ldquo;>
                    <svg className=&ldquo;w-4 h-4 text-green-500&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    Organic sessions & users
                  </li>
                  <li className=&ldquo;flex items-center gap-2&ldquo;>
                    <svg className=&ldquo;w-4 h-4 text-green-500&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    Bounce rate & engagement
                  </li>
                  <li className=&ldquo;flex items-center gap-2&ldquo;>
                    <svg className=&ldquo;w-4 h-4 text-green-500&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    Top landing pages
                  </li>
                  <li className=&ldquo;flex items-center gap-2&ldquo;>
                    <svg className=&ldquo;w-4 h-4 text-green-500&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    Session duration
                  </li>
                  <li className=&ldquo;flex items-center gap-2&ldquo;>
                    <svg className=&ldquo;w-4 h-4 text-green-500&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    Traffic trend charts
                  </li>
                </ul>
              </div>
              
              {/* PageSpeed Insights */}
              <div className=&ldquo;bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300&ldquo;>
                <div className=&ldquo;w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6&ldquo;>
                  <svg className=&ldquo;w-8 h-8 text-green-600&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                    <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M13 10V3L4 14h7v7l9-11h-7z&ldquo;/>
                  </svg>
                </div>
                <h3 className=&ldquo;text-xl font-bold text-gray-900 mb-3&ldquo;>PageSpeed Insights</h3>
                <p className=&ldquo;text-gray-600 mb-4&ldquo;>Core Web Vitals and performance scores — the technical health of your client&apos;s site.</p>
                <ul className=&ldquo;space-y-2 text-sm text-gray-600&ldquo;>
                  <li className=&ldquo;flex items-center gap-2&ldquo;>
                    <svg className=&ldquo;w-4 h-4 text-green-500&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    Mobile performance score
                  </li>
                  <li className=&ldquo;flex items-center gap-2&ldquo;>
                    <svg className=&ldquo;w-4 h-4 text-green-500&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    Desktop performance score
                  </li>
                  <li className=&ldquo;flex items-center gap-2&ldquo;>
                    <svg className=&ldquo;w-4 h-4 text-green-500&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    LCP (Largest Contentful Paint)
                  </li>
                  <li className=&ldquo;flex items-center gap-2&ldquo;>
                    <svg className=&ldquo;w-4 h-4 text-green-500&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    CLS (Cumulative Layout Shift)
                  </li>
                  <li className=&ldquo;flex items-center gap-2&ldquo;>
                    <svg className=&ldquo;w-4 h-4 text-green-500&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                      <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                    </svg>
                    INP (Interaction to Next Paint)
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Plus AI */}
            <div className=&ldquo;mt-12 bg-gradient-to-r from-brand-50 to-purple-50 rounded-2xl p-8 border border-brand-100&ldquo;>
              <div className=&ldquo;flex flex-col md:flex-row items-center gap-6&ldquo;>
                <div className=&ldquo;w-16 h-16 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0&ldquo;>
                  <svg className=&ldquo;w-8 h-8 text-brand-600&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                    <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z&ldquo;/>
                  </svg>
                </div>
                <div className=&ldquo;text-center md:text-left&ldquo;>
                  <h3 className=&ldquo;text-xl font-bold text-gray-900 mb-2&ldquo;>Plus: AI-Powered Recommendations</h3>
                  <p className=&ldquo;text-gray-600&ldquo;>
                    Every white label SEO report includes actionable insights generated by AI. Identify quick wins, spot opportunities, and give your clients recommendations they can act on — without spending hours analyzing the data yourself.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id=&ldquo;demo&ldquo; className=&ldquo;py-16 md:py-24 bg-white&ldquo;>
          <div className=&ldquo;max-w-6xl mx-auto px-4&ldquo;>
            <div className=&ldquo;text-center mb-12&ldquo;>
              <h2 className=&ldquo;text-3xl md:text-4xl font-bold text-gray-900 mb-4&ldquo;>Generate Your First White Label Report in 5 Minutes</h2>
              <p className=&ldquo;text-xl text-gray-600 max-w-2xl mx-auto&ldquo;>No training required. No complex setup. Connect once, brand once, generate forever.</p>
            </div>
            
            <div className=&ldquo;grid md:grid-cols-3 gap-8&ldquo;>
              {/* Step 1 */}
              <div className=&ldquo;relative bg-gray-50 rounded-2xl p-8 border border-gray-100&ldquo;>
                <div className=&ldquo;absolute -top-4 left-8 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm&ldquo;>1</div>
                <div className=&ldquo;w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-6&ldquo;>
                  <svg className=&ldquo;w-7 h-7 text-brand-600&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                    <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1&ldquo;/>
                  </svg>
                </div>
                <h3 className=&ldquo;text-xl font-bold text-gray-900 mb-3&ldquo;>Connect Your Client&apos;s Google</h3>
                <p className=&ldquo;text-gray-600&ldquo;>One-click OAuth connection to Search Console and Analytics. We never store passwords — just secure API tokens.</p>
                <div className=&ldquo;mt-4 flex items-center gap-2&ldquo;>
                  <img src=&ldquo;https://www.google.com/favicon.ico&ldquo; alt=&ldquo;Google&ldquo; className=&ldquo;w-5 h-5&ldquo; />
                  <span className=&ldquo;text-sm text-gray-500&ldquo;>Official Google API Partner</span>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className=&ldquo;relative bg-gray-50 rounded-2xl p-8 border border-gray-100&ldquo;>
                <div className=&ldquo;absolute -top-4 left-8 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm&ldquo;>2</div>
                <div className=&ldquo;w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-6&ldquo;>
                  <svg className=&ldquo;w-7 h-7 text-brand-600&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                    <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01&ldquo;/>
                  </svg>
                </div>
                <h3 className=&ldquo;text-xl font-bold text-gray-900 mb-3&ldquo;>Add Your Branding</h3>
                <p className=&ldquo;text-gray-600&ldquo;>Upload your logo, pick your brand colors, add your company name. Every report is 100% white-labeled.</p>
                <div className=&ldquo;mt-4 text-sm text-gray-500&ldquo;>✓ No &ldquo;Powered by Reportr&ldquo; badges</div>
              </div>
              
              {/* Step 3 */}
              <div className=&ldquo;relative bg-gray-50 rounded-2xl p-8 border border-gray-100&ldquo;>
                <div className=&ldquo;absolute -top-4 left-8 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm&ldquo;>3</div>
                <div className=&ldquo;w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-6&ldquo;>
                  <svg className=&ldquo;w-7 h-7 text-brand-600&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                    <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4&ldquo;/>
                  </svg>
                </div>
                <h3 className=&ldquo;text-xl font-bold text-gray-900 mb-3&ldquo;>Generate & Download PDF</h3>
                <p className=&ldquo;text-gray-600&ldquo;>Click one button. A professional branded PDF with all your data is ready in under a minute. Download and send.</p>
                <div className=&ldquo;mt-4 text-sm text-gray-500&ldquo;>✓ Executive, Standard, or Custom reports</div>
              </div>
            </div>
            
            {/* CTA */}
            <div className=&ldquo;text-center mt-12&ldquo;>
              <a href=&ldquo;/signup&ldquo; className=&ldquo;inline-flex items-center justify-center gap-2 bg-brand-600 text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-brand-700 transition-all duration-200 shadow-lg hover:shadow-xl&ldquo;>
                Start Free — Generate Your First Report
                <svg className=&ldquo;w-5 h-5&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                  <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M13 7l5 5m0 0l-5 5m5-5H6&ldquo;/>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* WHO IS THIS FOR */}
        <section className=&ldquo;py-16 md:py-24 bg-gray-50&ldquo;>
          <div className=&ldquo;max-w-6xl mx-auto px-4&ldquo;>
            <div className=&ldquo;text-center mb-12&ldquo;>
              <h2 className=&ldquo;text-3xl md:text-4xl font-bold text-gray-900 mb-4&ldquo;>Who Uses White Label SEO Reports?</h2>
              <p className=&ldquo;text-xl text-gray-600 max-w-2xl mx-auto&ldquo;>
                Built for anyone who delivers SEO results to clients and wants professional reporting without the time sink.
              </p>
            </div>
            
            <div className=&ldquo;grid md:grid-cols-2 lg:grid-cols-4 gap-6&ldquo;>
              <a href=&ldquo;/white-label-seo-reports-for-freelance-consultants&ldquo; className=&ldquo;bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all group&ldquo;>
                <div className=&ldquo;w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-200 transition-colors&ldquo;>
                  <svg className=&ldquo;w-6 h-6 text-brand-600&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                    <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z&ldquo;/>
                  </svg>
                </div>
                <h3 className=&ldquo;font-bold text-gray-900 mb-2&ldquo;>Freelance SEO Consultants</h3>
                <p className=&ldquo;text-gray-600 text-sm&ldquo;>Solo consultants who need professional reports without enterprise pricing.</p>
              </a>
              
              <a href=&ldquo;/white-label-seo-reports-for-digital-marketing-agencies&ldquo; className=&ldquo;bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all group&ldquo;>
                <div className=&ldquo;w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-200 transition-colors&ldquo;>
                  <svg className=&ldquo;w-6 h-6 text-brand-600&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                    <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4&ldquo;/>
                  </svg>
                </div>
                <h3 className=&ldquo;font-bold text-gray-900 mb-2&ldquo;>Digital Marketing Agencies</h3>
                <p className=&ldquo;text-gray-600 text-sm&ldquo;>Growing agencies that want scalable reporting with their own branding.</p>
              </a>
              
              <a href=&ldquo;/white-label-seo-reports-for-web-design-agencies&ldquo; className=&ldquo;bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all group&ldquo;>
                <div className=&ldquo;w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-200 transition-colors&ldquo;>
                  <svg className=&ldquo;w-6 h-6 text-brand-600&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                    <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z&ldquo;/>
                  </svg>
                </div>
                <h3 className=&ldquo;font-bold text-gray-900 mb-2&ldquo;>Web Design Agencies</h3>
                <p className=&ldquo;text-gray-600 text-sm&ldquo;>Design shops offering SEO as an add-on service to website builds.</p>
              </a>
              
              <a href=&ldquo;/white-label-seo-reports-for-reseller-agencies&ldquo; className=&ldquo;bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all group&ldquo;>
                <div className=&ldquo;w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-200 transition-colors&ldquo;>
                  <svg className=&ldquo;w-6 h-6 text-brand-600&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                    <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4&ldquo;/>
                  </svg>
                </div>
                <h3 className=&ldquo;font-bold text-gray-900 mb-2&ldquo;>SEO Resellers</h3>
                <p className=&ldquo;text-gray-600 text-sm&ldquo;>Reseller agencies that need to report on work done by their fulfillment partners.</p>
              </a>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className=&ldquo;py-16 md:py-24 bg-white&ldquo;>
          <div className=&ldquo;max-w-4xl mx-auto px-4&ldquo;>
            <div className=&ldquo;text-center mb-12&ldquo;>
              <h2 className=&ldquo;text-3xl md:text-4xl font-bold text-gray-900 mb-4&ldquo;>Manual Reporting vs. Reportr</h2>
              <p className=&ldquo;text-xl text-gray-600&ldquo;>What your monthly reporting process looks like today vs. with white label automation.</p>
            </div>
            
            <div className=&ldquo;overflow-hidden rounded-2xl border border-gray-200 shadow-sm&ldquo;>
              <table className=&ldquo;w-full&ldquo;>
                <thead>
                  <tr className=&ldquo;bg-gray-50 border-b border-gray-200&ldquo;>
                    <th className=&ldquo;text-left py-4 px-6 font-semibold text-gray-900&ldquo;></th>
                    <th className=&ldquo;text-center py-4 px-6 font-semibold text-red-600&ldquo;>Manual</th>
                    <th className=&ldquo;text-center py-4 px-6 font-semibold text-brand-600&ldquo;>Reportr</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=&ldquo;border-b border-gray-100&ldquo;>
                    <td className=&ldquo;py-4 px-6 text-gray-700&ldquo;>Time per report</td>
                    <td className=&ldquo;py-4 px-6 text-center text-red-600&ldquo;>2-4 hours</td>
                    <td className=&ldquo;py-4 px-6 text-center text-green-600 font-semibold&ldquo;>~30 seconds</td>
                  </tr>
                  <tr className=&ldquo;border-b border-gray-100 bg-gray-50&ldquo;>
                    <td className=&ldquo;py-4 px-6 text-gray-700&ldquo;>10 clients / month</td>
                    <td className=&ldquo;py-4 px-6 text-center text-red-600&ldquo;>20-40 hours</td>
                    <td className=&ldquo;py-4 px-6 text-center text-green-600 font-semibold&ldquo;>~5 minutes</td>
                  </tr>
                  <tr className=&ldquo;border-b border-gray-100&ldquo;>
                    <td className=&ldquo;py-4 px-6 text-gray-700&ldquo;>Your branding</td>
                    <td className=&ldquo;py-4 px-6 text-center text-gray-500&ldquo;>DIY in Google Docs</td>
                    <td className=&ldquo;py-4 px-6 text-center text-green-600 font-semibold&ldquo;>Automatic</td>
                  </tr>
                  <tr className=&ldquo;border-b border-gray-100 bg-gray-50&ldquo;>
                    <td className=&ldquo;py-4 px-6 text-gray-700&ldquo;>Data sources</td>
                    <td className=&ldquo;py-4 px-6 text-center text-gray-500&ldquo;>Copy-paste from 3 tabs</td>
                    <td className=&ldquo;py-4 px-6 text-center text-green-600 font-semibold&ldquo;>GSC + GA4 + PSI auto</td>
                  </tr>
                  <tr className=&ldquo;border-b border-gray-100&ldquo;>
                    <td className=&ldquo;py-4 px-6 text-gray-700&ldquo;>AI recommendations</td>
                    <td className=&ldquo;py-4 px-6 text-center text-gray-500&ldquo;>You write them</td>
                    <td className=&ldquo;py-4 px-6 text-center text-green-600 font-semibold&ldquo;>Auto-generated</td>
                  </tr>
                  <tr>
                    <td className=&ldquo;py-4 px-6 text-gray-700&ldquo;>Monthly cost</td>
                    <td className=&ldquo;py-4 px-6 text-center text-gray-500&ldquo;>Your hourly rate × hours</td>
                    <td className=&ldquo;py-4 px-6 text-center text-green-600 font-semibold&ldquo;>From $29/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PRICING PREVIEW */}
        <section className=&ldquo;py-16 md:py-24 bg-gray-50&ldquo;>
          <div className=&ldquo;max-w-5xl mx-auto px-4&ldquo;>
            <div className=&ldquo;text-center mb-12&ldquo;>
              <h2 className=&ldquo;text-3xl md:text-4xl font-bold text-gray-900 mb-4&ldquo;>Simple, Transparent Pricing</h2>
              <p className=&ldquo;text-xl text-gray-600&ldquo;>Start free. Upgrade when you&apos;re ready. Cancel anytime.</p>
            </div>
            
            <div className=&ldquo;grid md:grid-cols-4 gap-6&ldquo;>
              {/* Free */}
              <div className=&ldquo;bg-white rounded-2xl p-6 border border-gray-200&ldquo;>
                <h3 className=&ldquo;font-bold text-gray-900 mb-1&ldquo;>Free</h3>
                <div className=&ldquo;text-3xl font-bold text-gray-900 mb-4&ldquo;>$0<span className=&ldquo;text-base font-normal text-gray-500&ldquo;>/mo</span></div>
                <ul className=&ldquo;space-y-2 text-sm text-gray-600 mb-6&ldquo;>
                  <li>1 client</li>
                  <li>5 reports/month</li>
                  <li>GSC + GA4 + PSI</li>
                  <li>Reportr branding</li>
                </ul>
                <a href=&ldquo;/signup&ldquo; className=&ldquo;block text-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium&ldquo;>
                  Start Free
                </a>
              </div>
              
              {/* Starter */}
              <div className=&ldquo;bg-white rounded-2xl p-6 border border-gray-200&ldquo;>
                <h3 className=&ldquo;font-bold text-gray-900 mb-1&ldquo;>Starter</h3>
                <div className=&ldquo;text-3xl font-bold text-gray-900 mb-4&ldquo;>$29<span className=&ldquo;text-base font-normal text-gray-500&ldquo;>/mo</span></div>
                <ul className=&ldquo;space-y-2 text-sm text-gray-600 mb-6&ldquo;>
                  <li>5 clients</li>
                  <li>25 reports/month</li>
                  <li>GSC + GA4 + PSI</li>
                  <li>+$20 white-label</li>
                </ul>
                <a href=&ldquo;/signup?plan=starter&ldquo; className=&ldquo;block text-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium&ldquo;>
                  Start Trial
                </a>
              </div>
              
              {/* Professional */}
              <div className=&ldquo;bg-white rounded-2xl p-6 border-2 border-brand-600 relative&ldquo;>
                <div className=&ldquo;absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full&ldquo;>
                  POPULAR
                </div>
                <h3 className=&ldquo;font-bold text-gray-900 mb-1&ldquo;>Professional</h3>
                <div className=&ldquo;text-3xl font-bold text-gray-900 mb-4&ldquo;>$59<span className=&ldquo;text-base font-normal text-gray-500&ldquo;>/mo</span></div>
                <ul className=&ldquo;space-y-2 text-sm text-gray-600 mb-6&ldquo;>
                  <li>15 clients</li>
                  <li>75 reports/month</li>
                  <li>GSC + GA4 + PSI</li>
                  <li>+$20 white-label</li>
                </ul>
                <a href=&ldquo;/signup?plan=professional&ldquo; className=&ldquo;block text-center py-2 px-4 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors text-sm font-medium&ldquo;>
                  Start Trial
                </a>
              </div>
              
              {/* Agency */}
              <div className=&ldquo;bg-white rounded-2xl p-6 border border-gray-200&ldquo;>
                <h3 className=&ldquo;font-bold text-gray-900 mb-1&ldquo;>Agency</h3>
                <div className=&ldquo;text-3xl font-bold text-gray-900 mb-4&ldquo;>$99<span className=&ldquo;text-base font-normal text-gray-500&ldquo;>/mo</span></div>
                <ul className=&ldquo;space-y-2 text-sm text-gray-600 mb-6&ldquo;>
                  <li>50 clients</li>
                  <li>250 reports/month</li>
                  <li>GSC + GA4 + PSI</li>
                  <li>+$20 white-label</li>
                </ul>
                <a href=&ldquo;/signup?plan=agency&ldquo; className=&ldquo;block text-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium&ldquo;>
                  Start Trial
                </a>
              </div>
            </div>
            
            <p className=&ldquo;text-center text-gray-500 text-sm mt-6&ldquo;>
              All paid plans include a 14-day free trial. White-label branding is a $20/month add-on.
              <a href=&ldquo;/pricing&ldquo; className=&ldquo;text-brand-600 hover:underline ml-1&ldquo;>See full pricing details →</a>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className=&ldquo;py-16 md:py-24 bg-white&ldquo;>
          <div className=&ldquo;max-w-3xl mx-auto px-4&ldquo;>
            <div className=&ldquo;text-center mb-12&ldquo;>
              <h2 className=&ldquo;text-3xl md:text-4xl font-bold text-gray-900 mb-4&ldquo;>Frequently Asked Questions</h2>
              <p className=&ldquo;text-xl text-gray-600&ldquo;>About white label SEO reports and how Reportr works.</p>
            </div>
            
            <div className=&ldquo;space-y-4&ldquo;>
              <details className=&ldquo;bg-gray-50 rounded-xl border border-gray-200 group&ldquo;>
                <summary className=&ldquo;flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900&ldquo;>
                  What are white label SEO reports?
                  <svg className=&ldquo;w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                    <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M19 9l-7 7-7-7&ldquo;/>
                  </svg>
                </summary>
                <div className=&ldquo;px-6 pb-6 text-gray-600&ldquo;>
                  White label SEO reports are professional client-facing reports that display your agency&apos;s branding instead of the software provider&apos;s branding. They include your logo, colors, and company name, making it appear as if you created the reporting tool yourself. This is essential for agencies that want to maintain a professional image with clients.
                </div>
              </details>
              
              <details className=&ldquo;bg-gray-50 rounded-xl border border-gray-200 group&ldquo;>
                <summary className=&ldquo;flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900&ldquo;>
                  What data sources are included in the reports?
                  <svg className=&ldquo;w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                    <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M19 9l-7 7-7-7&ldquo;/>
                  </svg>
                </summary>
                <div className=&ldquo;px-6 pb-6 text-gray-600&ldquo;>
                  Reportr pulls data from three essential Google sources: <strong>Google Search Console</strong> (keywords, clicks, impressions, positions), <strong>Google Analytics 4</strong> (traffic, sessions, user behavior), and <strong>PageSpeed Insights</strong> (Core Web Vitals, mobile and desktop performance scores). All three are integrated and displayed in a single, beautiful PDF.
                </div>
              </details>
              
              <details className=&ldquo;bg-gray-50 rounded-xl border border-gray-200 group&ldquo;>
                <summary className=&ldquo;flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900&ldquo;>
                  How much does white label branding cost?
                  <svg className=&ldquo;w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                    <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M19 9l-7 7-7-7&ldquo;/>
                  </svg>
                </summary>
                <div className=&ldquo;px-6 pb-6 text-gray-600&ldquo;>
                  White-label branding is available as a <strong>$20/month add-on</strong> for any paid plan. This removes all Reportr branding and lets you upload your own logo, set your brand colors, and add your company name to every report. The Free plan includes Reportr branding on reports.
                </div>
              </details>
              
              <details className=&ldquo;bg-gray-50 rounded-xl border border-gray-200 group&ldquo;>
                <summary className=&ldquo;flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900&ldquo;>
                  How long does it take to generate a report?
                  <svg className=&ldquo;w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                    <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M19 9l-7 7-7-7&ldquo;/>
                  </svg>
                </summary>
                <div className=&ldquo;px-6 pb-6 text-gray-600&ldquo;>
                  After you&apos;ve connected your client&apos;s Google accounts (a one-time setup), generating a report takes <strong>under 60 seconds</strong>. Click the generate button, wait for the data to be pulled, and download your PDF. What used to take 2-4 hours now takes less than a minute.
                </div>
              </details>
              
              <details className=&ldquo;bg-gray-50 rounded-xl border border-gray-200 group&ldquo;>
                <summary className=&ldquo;flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900&ldquo;>
                  Do I need my client&apos;s Google login credentials?
                  <svg className=&ldquo;w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                    <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M19 9l-7 7-7-7&ldquo;/>
                  </svg>
                </summary>
                <div className=&ldquo;px-6 pb-6 text-gray-600&ldquo;>
                  <strong>No.</strong> Reportr uses Google OAuth — the standard secure method. Your client grants you access to their Search Console and Analytics properties through a secure authorization flow. We never see or store passwords, only encrypted API tokens.
                </div>
              </details>
              
              <details className=&ldquo;bg-gray-50 rounded-xl border border-gray-200 group&ldquo;>
                <summary className=&ldquo;flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900&ldquo;>
                  What report templates are available?
                  <svg className=&ldquo;w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                    <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M19 9l-7 7-7-7&ldquo;/>
                  </svg>
                </summary>
                <div className=&ldquo;px-6 pb-6 text-gray-600&ldquo;>
                  Reportr offers three report types: <strong>Executive Summary</strong> (quick 2-page overview for busy clients), <strong>Standard SEO Report</strong> (comprehensive analysis with all metrics), and <strong>Custom Report</strong> (choose exactly which sections and metrics to include). All templates support white-label branding.
                </div>
              </details>
              
              <details className=&ldquo;bg-gray-50 rounded-xl border border-gray-200 group&ldquo;>
                <summary className=&ldquo;flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900&ldquo;>
                  How is Reportr different from AgencyAnalytics or Semrush?
                  <svg className=&ldquo;w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                    <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M19 9l-7 7-7-7&ldquo;/>
                  </svg>
                </summary>
                <div className=&ldquo;px-6 pb-6 text-gray-600&ldquo;>
                  Reportr is purpose-built for <strong>SEO reporting only</strong>. We focus on GSC, GA4, and PageSpeed — the core metrics SEO clients care about. Enterprise tools like AgencyAnalytics ($150+/mo) and Semrush ($130+/mo) have dozens of integrations you&apos;ll never use. Reportr starts at $29/mo and does one thing exceptionally well: professional white label SEO reports.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className=&ldquo;py-16 md:py-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white&ldquo;>
          <div className=&ldquo;max-w-4xl mx-auto px-4 text-center&ldquo;>
            <h2 className=&ldquo;text-3xl md:text-5xl font-bold mb-6&ldquo;>Start Generating White Label SEO Reports Today</h2>
            <p className=&ldquo;text-xl text-white/90 mb-8 max-w-2xl mx-auto&ldquo;>
              Join agencies and freelancers who&apos;ve automated their reporting. Your branding, professional PDFs, happy clients.
            </p>
            
            <div className=&ldquo;flex flex-col sm:flex-row items-center justify-center gap-4 mb-8&ldquo;>
              <a href=&ldquo;/signup&ldquo; className=&ldquo;w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-brand-700 font-bold text-lg px-8 py-4 rounded-lg hover:bg-yellow-300 hover:text-brand-800 transition-all duration-200 shadow-lg&ldquo;>
                Create Your First Report Free
                <svg className=&ldquo;w-5 h-5&ldquo; fill=&ldquo;none&ldquo; stroke=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 24 24&ldquo;>
                  <path strokeLinecap=&ldquo;round&ldquo; strokeLinejoin=&ldquo;round&ldquo; strokeWidth=&ldquo;2&ldquo; d=&ldquo;M13 7l5 5m0 0l-5 5m5-5H6&ldquo;/>
                </svg>
              </a>
            </div>
            
            <div className=&ldquo;flex flex-wrap items-center justify-center gap-6 text-white/80&ldquo;>
              <div className=&ldquo;flex items-center gap-2&ldquo;>
                <svg className=&ldquo;w-5 h-5 text-green-400&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                  <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                </svg>
                <span>Free plan available</span>
              </div>
              <div className=&ldquo;flex items-center gap-2&ldquo;>
                <svg className=&ldquo;w-5 h-5 text-green-400&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                  <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                </svg>
                <span>14-day trial on paid plans</span>
              </div>
              <div className=&ldquo;flex items-center gap-2&ldquo;>
                <svg className=&ldquo;w-5 h-5 text-green-400&ldquo; fill=&ldquo;currentColor&ldquo; viewBox=&ldquo;0 0 20 20&ldquo;>
                  <path fillRule=&ldquo;evenodd&ldquo; d=&ldquo;M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z&ldquo; clipRule=&ldquo;evenodd&ldquo;/>
                </svg>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>

        {/* INTERNAL LINKS (for SEO) */}
        <section className=&ldquo;py-16 md:py-20 bg-gray-50&ldquo;>
          <div className=&ldquo;max-w-6xl mx-auto px-4&ldquo;>
            <h2 className=&ldquo;text-2xl font-bold text-gray-900 mb-8 text-center&ldquo;>Related Resources</h2>
            
            <div className=&ldquo;grid md:grid-cols-3 gap-6&ldquo;>
              <a href=&ldquo;/blog/best-white-label-seo-reporting-tool&ldquo; className=&ldquo;bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all&ldquo;>
                <span className=&ldquo;text-xs font-semibold text-brand-600 uppercase tracking-wide&ldquo;>Guide</span>
                <h3 className=&ldquo;font-bold text-gray-900 mt-2 mb-2&ldquo;>Best White Label SEO Reporting Tools (2026)</h3>
                <p className=&ldquo;text-gray-600 text-sm&ldquo;>Compare the top white label reporting options for agencies.</p>
              </a>
              
              <a href=&ldquo;/blog/seo-monthly-report-template&ldquo; className=&ldquo;bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all&ldquo;>
                <span className=&ldquo;text-xs font-semibold text-brand-600 uppercase tracking-wide&ldquo;>Template</span>
                <h3 className=&ldquo;font-bold text-gray-900 mt-2 mb-2&ldquo;>SEO Monthly Report Template</h3>
                <p className=&ldquo;text-gray-600 text-sm&ldquo;>What to include in your monthly SEO reports to clients.</p>
              </a>
              
              <a href=&ldquo;/blog/agency-reporting-best-practices&ldquo; className=&ldquo;bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all&ldquo;>
                <span className=&ldquo;text-xs font-semibold text-brand-600 uppercase tracking-wide&ldquo;>Best Practices</span>
                <h3 className=&ldquo;font-bold text-gray-900 mt-2 mb-2&ldquo;>Agency Reporting Best Practices</h3>
                <p className=&ldquo;text-gray-600 text-sm&ldquo;>How top agencies structure their client reporting workflow.</p>
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
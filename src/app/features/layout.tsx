import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Features - Professional SEO Reporting | Reportr',
  description: 'Automated SEO reports with Google Search Console, GA4, PageSpeed data. White-label branding, AI insights, PDF exports for agencies.',
  alternates: {
    canonical: '/features',
    languages: {
      'en': '/features',
      'en-US': '/features',
      'en-GB': '/features',
      'en-AU': '/features',
      'en-CA': '/features',
      'en-NZ': '/features',
      'en-IE': '/features',
      'en-IN': '/features',
      'x-default': '/features',
    },
  },
}

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
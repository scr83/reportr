import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Features - Professional SEO Reporting | Reportr',
  description: 'Automated SEO reports with Google Search Console, GA4, PageSpeed data. White-label branding, AI insights, PDF exports for agencies.',
  alternates: {
    canonical: '/features',
  },
}

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
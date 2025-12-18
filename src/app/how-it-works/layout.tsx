import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works - Quick Start Guide | Reportr',
  description: 'Set up automated SEO reporting in 5 minutes. Connect Google Search Console, GA4, and PageSpeed. Generate white-label reports instantly.',
  alternates: {
    canonical: '/how-it-works',
    languages: {
      'en': '/how-it-works',
      'en-US': '/how-it-works',
      'en-GB': '/how-it-works',
      'en-AU': '/how-it-works',
      'en-CA': '/how-it-works',
      'en-NZ': '/how-it-works',
      'en-IE': '/how-it-works',
      'en-IN': '/how-it-works',
      'x-default': '/how-it-works',
    },
  },
}

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works - Quick Start Guide | Reportr',
  description: 'Set up automated SEO reporting in 5 minutes. Connect Google Search Console, GA4, and PageSpeed. Generate white-label reports instantly.',
  alternates: {
    canonical: '/how-it-works',
  },
}

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
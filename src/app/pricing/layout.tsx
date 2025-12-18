import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - Affordable SEO Reporting Plans | Reportr',
  description: 'SEO reporting from $29/month. White-label included. Plans: FREE (1 client), STARTER ($29), PROFESSIONAL ($59), AGENCY ($99). Try free.',
  alternates: {
    canonical: '/pricing',
    languages: {
      'en': '/pricing',
      'en-US': '/pricing',
      'en-GB': '/pricing',
      'en-AU': '/pricing',
      'en-CA': '/pricing',
      'en-NZ': '/pricing',
      'en-IE': '/pricing',
      'en-IN': '/pricing',
      'x-default': '/pricing',
    },
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
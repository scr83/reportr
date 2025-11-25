import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Reporting Blog - Tips & Guides | Reportr',
  description: 'SEO reporting strategies for freelancers and growing agencies. White-label guides, automation tips, pricing strategies, and best practices.',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
import React from 'react'
import WhiteLabelSEOReportsClient from './client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'White-Label SEO Reports in 30 Seconds | Reportr',
  description: 'Generate professional white-label SEO reports in minutes. Your brand, your colors. From $29/mo. Start your 14-day free trial.',
  robots: 'index, follow'
}

export default function WhiteLabelSEOReportsPage() {
  return <WhiteLabelSEOReportsClient />
}
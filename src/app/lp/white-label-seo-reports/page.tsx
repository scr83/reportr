import React from 'react'
import WhiteLabelSEOReportsClient from './client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'White-Label SEO Reports in 30 Seconds | Reportr',
  description: 'Stop wasting hours on manual SEO reporting. Generate professional, branded PDF reports in 30 seconds.',
  robots: 'noindex, nofollow',
}

export default function WhiteLabelSEOReportsLandingPage() {
  return <WhiteLabelSEOReportsClient />
}
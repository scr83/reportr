import React from 'react'
import CompetitorAlternativeClient from './client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Simpler Alternative to Complex SEO Reporting Tools | Reportr',
  description: 'Tired of expensive, complicated SEO reporting tools? Reportr generates white-label reports in 30 seconds. No learning curve. Start free.',
  robots: 'noindex, nofollow',
}

export default function CompetitorAlternativePage() {
  return <CompetitorAlternativeClient />
}
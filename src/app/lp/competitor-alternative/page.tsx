import React from 'react'
import CompetitorAlternativeClient from './client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Simpler Alternative to Enterprise SEO Tools | Reportr',
  description: '$29/mo vs $99+/mo. Stop paying for features you don\'t use. White-label SEO reporting built for agencies. Start free trial.',
  robots: 'index, follow'
}

export default function CompetitorAlternativePage() {
  return <CompetitorAlternativeClient />
}
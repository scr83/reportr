'use client'

import React from 'react'
import { 
  Header,
  Hero,
  HowItWorks,
  Features,
  Pricing,
  FinalCTA,
  Footer
} from '@/components/landing'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main id="main-content">
        <Hero />
        <HowItWorks />
        <Features />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
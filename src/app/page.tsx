'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  Header,
  Hero,
  HowItWorks,
  Features,
  Pricing,
  FinalCTA,
  Footer
} from '@/components/landing'

function HomePageContent() {
  const searchParams = useSearchParams()
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  useEffect(() => {
    const error = searchParams?.get('error')
    if (error) {
      let errorText = 'An error occurred'
      switch (error) {
        case 'invalid_token':
          errorText = 'Invalid verification link. Please try again.'
          break
        case 'token_expired':
          errorText = 'Verification link has expired. Please request a new one.'
          break
        case 'user_not_found':
          errorText = 'User not found. Please contact support.'
          break
        case 'verification_failed':
          errorText = 'Email verification failed. Please try again.'
          break
        default:
          errorText = 'An error occurred during verification.'
      }
      setMessage({ type: 'error', text: errorText })
    }

    // Clear the URL params after showing the message
    if (error) {
      const url = new URL(window.location.href)
      url.searchParams.delete('error')
      window.history.replaceState({}, '', url.toString())
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Error/Success Message */}
      {message && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md ${
          message.type === 'error' 
            ? 'bg-red-50 border border-red-200 text-red-700' 
            : 'bg-green-50 border border-green-200 text-green-700'
        }`}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{message.text}</p>
            <button
              onClick={() => setMessage(null)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
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

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  )
}
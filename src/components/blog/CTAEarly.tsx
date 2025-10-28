'use client'

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

import { Button } from '@/components/atoms/Button'
import { ArrowRight, CheckCircle } from 'lucide-react'

export function CTAEarly() {
  const handleClick = () => {
    // Track conversion with UTM parameters
    window.gtag?.('event', 'conversion', {
      event_category: 'Blog CTA',
      event_label: 'Early CTA',
      value: 1,
    })
    
    // Redirect to signup with UTM tracking
    window.location.href = '/signup?ref=blog-early-cta&utm_source=blog&utm_medium=cta&utm_campaign=early-exit'
  }

  return (
    <div className="my-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white p-8 shadow-lg border border-purple-100">
      <div className="text-center">
        <div className="mb-4">
          <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
            Ready to Start?
          </span>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Skip the Research. Start Creating Professional Reports Today.
        </h3>
        
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Join 500+ agencies already using Reportr to deliver branded SEO reports that wow clients and win more business.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <Button
            onClick={handleClick}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <div className="text-sm text-gray-500 text-center">
            <div className="flex items-center justify-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              No credit card required
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-400">
          14-day free trial • Cancel anytime • Setup in 5 minutes
        </div>
      </div>
    </div>
  )
}
'use client'

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

import { Button } from '@/components/atoms/Button'
import { Play, Star } from 'lucide-react'

export function CTAMid() {
  const handleClick = () => {
    // Track conversion with UTM parameters
    window.gtag?.('event', 'conversion', {
      event_category: 'Blog CTA',
      event_label: 'Mid CTA',
      value: 1,
    })
    
    // Redirect to demo with UTM tracking
    window.location.href = '/showcase?ref=blog-mid-cta&utm_source=blog&utm_medium=cta&utm_campaign=mid-article'
  }

  const handleTrialClick = () => {
    // Track conversion with UTM parameters
    window.gtag?.('event', 'conversion', {
      event_category: 'Blog CTA',
      event_label: 'Mid CTA Trial',
      value: 1,
    })
    
    // Redirect to pricing with UTM tracking
    window.location.href = '/pricing?ref=blog-mid-cta-trial&utm_source=blog&utm_medium=cta&utm_campaign=mid-article'
  }

  return (
    <div className="my-12 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 p-8 text-white shadow-xl">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-purple-100">Trusted by 500+ agencies</span>
          </div>
        </div>
        
        <h3 className="text-3xl font-bold mb-4">
          See Reportr in Action
        </h3>
        
        <p className="text-purple-100 mb-8 max-w-2xl mx-auto text-lg">
          Watch how agencies are transforming their client relationships with branded SEO reports that look like they were created by a Fortune 500 design team.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleClick}
            variant="outline"
            className="bg-white text-purple-700 hover:bg-purple-50 border-white px-8 py-4 text-lg font-semibold"
          >
            <Play className="mr-2 h-5 w-5" />
            View Live Demo
          </Button>
          
          <Button
            onClick={handleTrialClick}
            className="bg-purple-800 hover:bg-purple-900 text-white px-8 py-4 text-lg font-semibold"
          >
            Start Free Trial
          </Button>
        </div>
        
        <div className="mt-6 text-sm text-purple-200">
          No commitment • Full access • Professional templates included
        </div>
      </div>
    </div>
  )
}
'use client'

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

import { Button } from '@/components/atoms/Button'
import { TrendingUp, Users, Clock } from 'lucide-react'

export function CTALate() {
  const handleClick = () => {
    // Track conversion with UTM parameters
    window.gtag?.('event', 'conversion', {
      event_category: 'Blog CTA',
      event_label: 'Late CTA',
      value: 1,
    })
    
    // Redirect to signup with UTM tracking
    window.location.href = '/signup?ref=blog-late-cta&utm_source=blog&utm_medium=cta&utm_campaign=late-article'
  }

  return (
    <div className="my-12 rounded-2xl bg-gray-50 border border-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Agency?
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join the agencies already using Reportr to increase client retention, win more business, and scale their operations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Increase Revenue</h4>
            <p className="text-sm text-gray-600">
              Agencies report 35% higher client retention with branded reports
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Save Time</h4>
            <p className="text-sm text-gray-600">
              Automate report creation and spend more time growing your business
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Impress Clients</h4>
            <p className="text-sm text-gray-600">
              Professional reports that look like they cost thousands to create
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <Button
            onClick={handleClick}
            className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 text-lg font-semibold"
          >
            Start Free 14-Day Trial
          </Button>
          
          <p className="mt-4 text-sm text-gray-500">
            Setup takes 5 minutes • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  )
}
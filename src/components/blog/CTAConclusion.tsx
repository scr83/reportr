'use client'

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

import { Button } from '@/components/atoms/Button'
import { ArrowRight, Zap, Shield, HeadphonesIcon } from 'lucide-react'

export function CTAConclusion() {
  const handleClick = () => {
    // Track conversion with UTM parameters
    window.gtag?.('event', 'conversion', {
      event_category: 'Blog CTA',
      event_label: 'Conclusion CTA',
      value: 1,
    })
    
    // Redirect to signup with UTM tracking
    window.location.href = '/signup?ref=blog-conclusion-cta&utm_source=blog&utm_medium=cta&utm_campaign=conclusion'
  }

  return (
    <div className="my-12 rounded-3xl bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 p-10 text-white shadow-2xl">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <div className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
            <Zap className="mr-2 h-4 w-4" />
            Limited Time: 14-Day Free Trial
          </div>
        </div>
        
        <h3 className="text-4xl font-bold mb-6">
          Transform Your Agency Today
        </h3>
        
        <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto">
          Stop losing clients to agencies with better presentations. Start creating professional, branded SEO reports that win more business and increase your rates.
        </p>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center mb-10">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-green-400" />
            <span className="text-purple-100">No setup fees required</span>
          </div>
          <div className="flex items-center gap-3">
            <Zap className="h-6 w-6 text-green-400" />
            <span className="text-purple-100">Setup in under 5 minutes</span>
          </div>
          <div className="flex items-center gap-3">
            <HeadphonesIcon className="h-6 w-6 text-green-400" />
            <span className="text-purple-100">Free onboarding support</span>
          </div>
        </div>
        
        <div className="mb-8">
          <Button
            onClick={handleClick}
            className="bg-white text-purple-700 hover:bg-purple-50 px-12 py-5 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Start Your Free Trial Now
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-semibold mb-2">Join 500+ growing agencies</div>
          <div className="text-purple-200 text-sm">
            &ldquo;Reportr helped us increase our monthly recurring revenue by 40% in just 3 months.&rdquo;
          </div>
          <div className="text-purple-300 text-xs mt-1">
            — Sarah Chen, Founder of Digital Growth Partners
          </div>
        </div>
      </div>
    </div>
  )
}
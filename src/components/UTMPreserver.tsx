'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export const UTMPreserver: React.FC = () => {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Store UTM parameters in sessionStorage when user lands
    const utmParams = {
      utm_source: searchParams.get('utm_source'),
      utm_medium: searchParams.get('utm_medium'),
      utm_campaign: searchParams.get('utm_campaign'),
      utm_content: searchParams.get('utm_content')
    }
    
    // Only store if we have at least one UTM parameter
    if (Object.values(utmParams).some(val => val !== null)) {
      sessionStorage.setItem('utm_params', JSON.stringify(utmParams))
      console.log('✅ UTM parameters stored:', utmParams)
    }
  }, [searchParams])
  
  return null
}

UTMPreserver.displayName = 'UTMPreserver'
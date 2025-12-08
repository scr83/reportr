'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface CTAButtonProps {
  children: React.ReactNode
  href: string
  location?: string // e.g., "hero", "pricing", "footer"
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  target?: '_blank' | '_self'
  plan?: 'FREE' | 'STARTER' | 'PROFESSIONAL' // For pricing CTA buttons
}

export const CTAButton: React.FC<CTAButtonProps> = ({ 
  children, 
  href, 
  location, 
  className,
  variant = 'primary',
  size = 'md',
  target = '_self',
  plan
}) => {
  const pathname = usePathname()
  
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      const ctaText = typeof children === 'string' ? children : 'CTA Button'
      
      // Enhanced tracking data structure
      const trackingData: any = {
        event: 'cta_click',
        cta_location: location || pathname || 'unknown',
        cta_text: ctaText,
        cta_destination: href.startsWith('/') ? href : 'external'
      }
      
      // Add plan information if provided
      if (plan) {
        trackingData.plan = plan;
      }
      
      window.dataLayer.push(trackingData);
      
      console.log('✅ CTA click event pushed to dataLayer', trackingData);
    }
  }

  // Base styles matching the existing Button component structure
  const baseStyles = [
    'inline-flex items-center justify-center rounded-md font-medium',
    'transition-all duration-200 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'active:transform active:scale-95',
    'select-none',
    'no-underline'
  ].join(' ')

  const variants = {
    primary: [
      'bg-brand-600 text-white border border-transparent',
      'hover:bg-brand-700 hover:shadow-md',
      'focus:ring-brand-500',
      'active:bg-brand-800',
    ].join(' '),
    secondary: [
      'bg-neutral-100 text-neutral-900 border border-transparent',
      'hover:bg-neutral-200 hover:shadow-sm',
      'focus:ring-neutral-500',
      'active:bg-neutral-300',
    ].join(' '),
    outline: [
      'border border-brand-600 text-brand-600 bg-transparent',
      'hover:bg-brand-50 hover:border-brand-700 hover:text-brand-700',
      'focus:ring-brand-500',
      'active:bg-brand-100',
    ].join(' ')
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm h-8',
    md: 'px-4 py-2.5 text-sm h-10',
    lg: 'px-6 py-3 text-base h-12',
    xl: 'px-8 py-4 text-lg h-14',
  }
  
  return (
    <a 
      href={href}
      target={target}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}

CTAButton.displayName = 'CTAButton'
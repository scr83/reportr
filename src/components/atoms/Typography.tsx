import React from 'react'
import { cn } from '@/lib/utils'

interface TypographyProps {
  children: React.ReactNode
  className?: string
}

export const H1 = ({ children, className }: TypographyProps) => (
  <h1 className={cn('text-heading-1 text-gray-900', className)}>
    {children}
  </h1>
)

export const H2 = ({ children, className }: TypographyProps) => (
  <h2 className={cn('text-heading-2 text-gray-900', className)}>
    {children}
  </h2>
)

export const H3 = ({ children, className }: TypographyProps) => (
  <h3 className={cn('text-heading-3 text-gray-900', className)}>
    {children}
  </h3>
)

export const Body = ({ children, className }: TypographyProps) => (
  <p className={cn('text-body text-gray-600', className)}>
    {children}
  </p>
)

export const Caption = ({ children, className }: TypographyProps) => (
  <p className={cn('text-caption', className)}>
    {children}
  </p>
)

export const Lead = ({ children, className }: TypographyProps) => (
  <p className={cn('text-xl text-gray-600 leading-relaxed', className)}>
    {children}
  </p>
)

// Unified Typography Component
interface UnifiedTypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'lead'
  children: React.ReactNode
  className?: string
}

export const Typography = ({ variant = 'body', children, className }: UnifiedTypographyProps) => {
  const baseStyles = {
    h1: 'text-4xl font-bold text-neutral-900',
    h2: 'text-3xl font-bold text-neutral-900', 
    h3: 'text-2xl font-semibold text-neutral-900',
    h4: 'text-xl font-semibold text-neutral-900',
    h5: 'text-lg font-medium text-neutral-900',
    h6: 'text-base font-medium text-neutral-900',
    body: 'text-base text-neutral-700',
    caption: 'text-sm text-neutral-600',
    lead: 'text-xl text-neutral-600 leading-relaxed'
  }

  const Tag = variant.startsWith('h') ? variant as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' : 'p'

  return (
    <Tag className={cn(baseStyles[variant], className)}>
      {children}
    </Tag>
  )
}
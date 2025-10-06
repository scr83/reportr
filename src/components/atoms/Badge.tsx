import React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'neutral' | 'brand'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}, ref) => {
  const baseStyles = [
    'inline-flex items-center justify-center',
    'font-medium rounded-full',
    'whitespace-nowrap',
    'transition-colors duration-200',
  ].join(' ')

  const variants = {
    default: 'bg-neutral-100 text-neutral-800 border border-neutral-200',
    success: 'bg-success-100 text-success-800 border border-success-200',
    warning: 'bg-warning-100 text-warning-800 border border-warning-200',
    error: 'bg-error-100 text-error-800 border border-error-200',
    neutral: 'bg-neutral-500 text-white',
    brand: 'bg-brand-100 text-brand-800 border border-brand-200',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  }

  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = 'Badge'
import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'brand' | 'neutral' | 'white' | 'success' | 'warning' | 'error'
  speed?: 'slow' | 'normal' | 'fast'
  label?: string
  showLabel?: boolean
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(({
  size = 'md',
  color = 'brand',
  speed = 'normal',
  label = 'Loading...',
  showLabel = false,
  className,
  ...props
}, ref) => {
  const baseStyles = [
    'inline-flex flex-col items-center justify-center',
  ].join(' ')

  const sizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  }

  const colors = {
    brand: 'text-brand-600',
    neutral: 'text-neutral-500',
    white: 'text-white',
    success: 'text-success-600',
    warning: 'text-warning-600',
    error: 'text-error-600',
  }

  const speeds = {
    slow: 'animate-spin [animation-duration:2s]',
    normal: 'animate-spin [animation-duration:1s]',
    fast: 'animate-spin [animation-duration:0.5s]',
  }

  return (
    <div
      ref={ref}
      className={cn(baseStyles, className)}
      role="status"
      aria-label={label}
      {...props}
    >
      <Loader2 
        className={cn(
          sizes[size],
          colors[color],
          speeds[speed]
        )}
      />
      {showLabel && (
        <span className="sr-only">
          {label}
        </span>
      )}
      {showLabel && (
        <span className={cn(
          'mt-2 text-sm font-medium',
          colors[color]
        )}>
          {label}
        </span>
      )}
    </div>
  )
})

Spinner.displayName = 'Spinner'
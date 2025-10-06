import React from 'react'
import { cn } from '@/lib/utils'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'error'
  label?: string
  showValue?: boolean
  indeterminate?: boolean
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'default',
  label,
  showValue = false,
  indeterminate = false,
  className,
  ...props
}, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  const variants = {
    default: 'bg-brand-600',
    success: 'bg-success-600',
    warning: 'bg-warning-600',
    error: 'bg-error-600',
  }

  const trackStyles = [
    'w-full bg-neutral-200 rounded-full overflow-hidden',
    sizes[size],
  ].join(' ')

  const barStyles = [
    'h-full rounded-full transition-all duration-300 ease-out',
    variants[variant],
    indeterminate && 'animate-pulse',
  ].join(' ')

  return (
    <div className={cn('space-y-2', className)} {...props}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-neutral-700">
              {label}
            </span>
          )}
          {showValue && !indeterminate && (
            <span className="text-sm text-neutral-500">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div
        ref={ref}
        className={trackStyles}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={barStyles}
          style={{
            width: indeterminate ? '100%' : `${percentage}%`,
          }}
        />
      </div>
    </div>
  )
})

Progress.displayName = 'Progress'
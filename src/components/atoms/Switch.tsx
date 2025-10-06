import React from 'react'
import { cn } from '@/lib/utils'

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'error'
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(({
  label,
  description,
  size = 'md',
  variant = 'default',
  className,
  id,
  ...props
}, ref) => {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`

  // Filter out props that should not be passed to input element
  const {
    children,
    dangerouslySetInnerHTML,
    ...safeProps
  } = props as any

  const sizes = {
    sm: {
      track: 'h-5 w-9',
      thumb: 'h-4 w-4',
      translate: 'translate-x-4',
      text: 'text-sm',
    },
    md: {
      track: 'h-6 w-11',
      thumb: 'h-5 w-5',
      translate: 'translate-x-5',
      text: 'text-base',
    },
    lg: {
      track: 'h-7 w-14',
      thumb: 'h-6 w-6',
      translate: 'translate-x-7',
      text: 'text-lg',
    },
  }

  const variants = {
    default: 'peer-checked:bg-brand-600 peer-focus:ring-brand-500',
    success: 'peer-checked:bg-success-600 peer-focus:ring-success-500',
    warning: 'peer-checked:bg-warning-600 peer-focus:ring-warning-500',
    error: 'peer-checked:bg-error-600 peer-focus:ring-error-500',
  }

  const trackStyles = [
    'relative inline-flex items-center',
    'bg-neutral-200 rounded-full',
    'transition-colors duration-200',
    'cursor-pointer',
    'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
    'peer-focus:ring-2 peer-focus:ring-offset-2',
    variants[variant],
  ].join(' ')

  const thumbStyles = [
    'inline-block bg-white rounded-full',
    'shadow-lg transform transition-transform duration-200',
    'peer-checked:' + sizes[size].translate,
  ].join(' ')

  return (
    <div className={cn('flex items-start gap-3', className)}>
      <div className="relative flex items-center">
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={switchId}
          className="peer sr-only"
          {...safeProps}
        />
        <div className={cn(trackStyles, sizes[size].track)}>
          <span className={cn(thumbStyles, sizes[size].thumb)} />
        </div>
      </div>

      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && (
            <label
              htmlFor={switchId}
              className={cn(
                'block font-medium cursor-pointer',
                sizes[size].text,
                'text-neutral-900',
                safeProps.disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className={cn(
              'text-neutral-600 mt-1',
              size === 'sm' ? 'text-xs' : 'text-sm'
            )}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  )
})

Switch.displayName = 'Switch'
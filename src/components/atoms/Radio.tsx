import React from 'react'
import { cn } from '@/lib/utils'

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  description?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({
  label,
  description,
  error,
  size = 'md',
  className,
  id,
  ...props
}, ref) => {
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`

  // Filter out props that should not be passed to input element
  const {
    children,
    dangerouslySetInnerHTML,
    ...safeProps
  } = props as any

  const sizes = {
    sm: {
      radio: 'h-4 w-4',
      text: 'text-sm',
    },
    md: {
      radio: 'h-5 w-5',
      text: 'text-base',
    },
    lg: {
      radio: 'h-6 w-6',
      text: 'text-lg',
    },
  }

  const radioStyles = [
    'relative flex items-center justify-center',
    'border-2 rounded-full',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    error 
      ? 'border-error-300' 
      : 'border-neutral-300',
    'hover:border-brand-400 focus:border-brand-500',
    'checked:bg-white checked:border-brand-600',
    'before:absolute before:inset-0 before:rounded-full',
    'before:transition-all before:duration-200',
    'checked:before:bg-brand-600 checked:before:scale-50',
  ].join(' ')

  return (
    <div className={cn('flex items-start gap-3', className)}>
      <div className="relative flex items-center">
        <input
          ref={ref}
          type="radio"
          id={radioId}
          className={cn(
            radioStyles,
            sizes[size].radio,
          )}
          {...safeProps}
        />
        <label
          htmlFor={radioId}
          className="absolute inset-0 cursor-pointer"
          aria-label={label || safeProps['aria-label']}
        />
      </div>

      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && (
            <label
              htmlFor={radioId}
              className={cn(
                'block font-medium cursor-pointer',
                sizes[size].text,
                error ? 'text-error-700' : 'text-neutral-900',
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
          {error && (
            <p className={cn(
              'text-error-600 mt-1',
              size === 'sm' ? 'text-xs' : 'text-sm'
            )}>
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  )
})

Radio.displayName = 'Radio'
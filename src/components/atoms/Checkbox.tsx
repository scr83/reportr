import React from 'react'
import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  description?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  indeterminate?: boolean
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  description,
  error,
  size = 'md',
  indeterminate = false,
  className,
  id,
  ...props
}, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

  // Filter out props that should not be passed to input element
  const {
    children,
    dangerouslySetInnerHTML,
    ...safeProps
  } = props as any

  const sizes = {
    sm: {
      checkbox: 'h-4 w-4',
      icon: 'h-3 w-3',
      text: 'text-sm',
    },
    md: {
      checkbox: 'h-5 w-5',
      icon: 'h-3.5 w-3.5',
      text: 'text-base',
    },
    lg: {
      checkbox: 'h-6 w-6',
      icon: 'h-4 w-4',
      text: 'text-lg',
    },
  }

  const checkboxStyles = [
    'relative flex items-center justify-center',
    'border-2 rounded-md',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    error 
      ? 'border-error-300 text-error-600' 
      : 'border-neutral-300 text-brand-600',
    'hover:border-brand-400 focus:border-brand-500',
    'checked:bg-brand-600 checked:border-brand-600',
    'checked:hover:bg-brand-700 checked:hover:border-brand-700',
  ].join(' ')

  return (
    <div className={cn('flex items-start gap-3', className)}>
      <div className="relative flex items-center">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={cn(
            'peer sr-only',
          )}
          {...safeProps}
        />
        <div
          className={cn(
            checkboxStyles,
            sizes[size].checkbox,
            safeProps.checked || indeterminate ? 'bg-brand-600 border-brand-600' : 'bg-white'
          )}
        >
          {safeProps.checked && !indeterminate && (
            <Check className={cn(sizes[size].icon, 'text-white')} />
          )}
          {indeterminate && (
            <Minus className={cn(sizes[size].icon, 'text-white')} />
          )}
        </div>
        <label
          htmlFor={checkboxId}
          className="absolute inset-0 cursor-pointer"
          aria-label={label || safeProps['aria-label']}
        />
      </div>

      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && (
            <label
              htmlFor={checkboxId}
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

Checkbox.displayName = 'Checkbox'
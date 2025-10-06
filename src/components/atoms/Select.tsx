import React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  placeholder?: string
  children: React.ReactNode
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  helperText,
  placeholder,
  className,
  id,
  children,
  ...props
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`

  const baseStyles = [
    'block w-full px-3 py-2 pr-10',
    'bg-white border rounded-md shadow-sm',
    'text-neutral-900 placeholder-neutral-400',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500',
    'disabled:bg-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed',
    'appearance-none cursor-pointer',
  ].join(' ')

  const borderStyles = error 
    ? 'border-error-300 focus:ring-error-500 focus:border-error-500'
    : 'border-neutral-300'

  return (
    <div className="input-wrapper">
      {label && (
        <label
          htmlFor={selectId}
          className="input-label"
        >
          {label}
          {props.required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'input-base block w-full pr-10 appearance-none cursor-pointer',
            'disabled:bg-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed',
            error && 'input-error',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        
        <ChevronDown
          className={cn(
            'absolute right-3 top-1/2 transform -translate-y-1/2',
            'h-4 w-4 text-neutral-400 pointer-events-none',
            props.disabled && 'opacity-50'
          )}
        />
      </div>

      {(helperText || error) && (
        <p className={cn(
          error ? 'input-error-text' : 'input-help-text'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

Select.displayName = 'Select'
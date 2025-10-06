import React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  helperText,
  resize = 'vertical',
  className,
  id,
  ...props
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`

  const baseStyles = [
    'block w-full px-3 py-2',
    'border rounded-md shadow-sm',
    'placeholder-neutral-400',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500',
    'disabled:bg-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed',
  ].join(' ')

  const resizeStyles = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  }

  const borderStyles = error 
    ? 'border-error-300 focus:ring-error-500 focus:border-error-500'
    : 'border-neutral-300'

  return (
    <div className="input-wrapper">
      {label && (
        <label
          htmlFor={textareaId}
          className="input-label"
        >
          {label}
          {props.required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={textareaId}
        className={cn(
          'input-base block w-full',
          'disabled:bg-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed',
          error && 'input-error',
          resizeStyles[resize],
          className
        )}
        {...props}
      />

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

Textarea.displayName = 'Textarea'
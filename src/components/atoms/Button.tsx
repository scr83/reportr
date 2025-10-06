import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ButtonProps } from '@/types'

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  className,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = [
    'inline-flex items-center justify-center rounded-md font-medium',
    'transition-all duration-200 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'active:transform active:scale-95',
    'select-none',
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
    ].join(' '),
    ghost: [
      'text-neutral-600 border border-transparent bg-transparent',
      'hover:text-neutral-900 hover:bg-neutral-100',
      'focus:ring-neutral-500',
      'active:bg-neutral-200',
    ].join(' '),
    success: [
      'bg-success-600 text-white border border-transparent',
      'hover:bg-success-700 hover:shadow-md',
      'focus:ring-success-500',
      'active:bg-success-800',
    ].join(' '),
    warning: [
      'bg-warning-600 text-white border border-transparent',
      'hover:bg-warning-700 hover:shadow-md',
      'focus:ring-warning-500',
      'active:bg-warning-800',
    ].join(' '),
    error: [
      'bg-error-600 text-white border border-transparent',
      'hover:bg-error-700 hover:shadow-md',
      'focus:ring-error-500',
      'active:bg-error-800',
    ].join(' '),
  }
  
  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs h-7',
    sm: 'px-3 py-2 text-sm h-8',
    md: 'px-4 py-2.5 text-sm h-10',
    lg: 'px-6 py-3 text-base h-12',
    xl: 'px-8 py-4 text-lg h-14',
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export { Button }
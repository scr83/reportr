import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: LucideIcon
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'brand' | 'neutral' | 'success' | 'warning' | 'error' | 'muted' | 'inherit'
  variant?: 'default' | 'contained' | 'outlined'
}

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(({
  icon: IconComponent,
  size = 'md',
  color = 'inherit',
  variant = 'default',
  className,
  ...props
}, ref) => {
  const baseStyles = [
    'inline-flex items-center justify-center',
    'transition-colors duration-200',
  ].join(' ')

  const sizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4', 
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
  }

  const colors = {
    brand: 'text-brand-600',
    neutral: 'text-neutral-600',
    success: 'text-success-600',
    warning: 'text-warning-600',
    error: 'text-error-600',
    muted: 'text-neutral-400',
    inherit: 'text-inherit',
  }

  const variants = {
    default: '',
    contained: {
      brand: 'bg-brand-100 text-brand-600 rounded-md p-1',
      neutral: 'bg-neutral-100 text-neutral-600 rounded-md p-1',
      success: 'bg-success-100 text-success-600 rounded-md p-1',
      warning: 'bg-warning-100 text-warning-600 rounded-md p-1',
      error: 'bg-error-100 text-error-600 rounded-md p-1',
      muted: 'bg-neutral-100 text-neutral-400 rounded-md p-1',
      inherit: 'bg-neutral-100 rounded-md p-1',
    },
    outlined: {
      brand: 'border border-brand-200 text-brand-600 rounded-md p-1',
      neutral: 'border border-neutral-200 text-neutral-600 rounded-md p-1',
      success: 'border border-success-200 text-success-600 rounded-md p-1',
      warning: 'border border-warning-200 text-warning-600 rounded-md p-1',
      error: 'border border-error-200 text-error-600 rounded-md p-1',
      muted: 'border border-neutral-200 text-neutral-400 rounded-md p-1',
      inherit: 'border border-neutral-200 rounded-md p-1',
    },
  }

  const getVariantStyles = () => {
    if (variant === 'default') return ''
    return variants[variant][color as keyof typeof variants.contained] || ''
  }

  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variant === 'default' && colors[color],
        getVariantStyles(),
        className
      )}
      {...props}
    >
      <IconComponent className={sizes[size]} />
    </span>
  )
})

Icon.displayName = 'Icon'
import React from 'react'
import { cn } from '@/lib/utils'

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  color?: 'neutral' | 'brand' | 'muted'
  label?: string
  labelPosition?: 'left' | 'center' | 'right'
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(({
  orientation = 'horizontal',
  size = 'md',
  color = 'neutral',
  label,
  labelPosition = 'center',
  className,
  ...props
}, ref) => {
  const colors = {
    neutral: 'border-neutral-200',
    brand: 'border-brand-200',
    muted: 'border-neutral-100',
  }

  const sizes = {
    sm: orientation === 'horizontal' ? 'border-t' : 'border-l',
    md: orientation === 'horizontal' ? 'border-t-2' : 'border-l-2',
    lg: orientation === 'horizontal' ? 'border-t-4' : 'border-l-4',
  }

  if (orientation === 'vertical') {
    return (
      <div
        ref={ref}
        className={cn(
          'h-full',
          sizes[size],
          colors[color],
          className
        )}
        role="separator"
        aria-orientation="vertical"
        {...props}
      />
    )
  }

  if (label) {
    const labelPositions = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    }

    return (
      <div
        ref={ref}
        className={cn('relative flex items-center', className)}
        role="separator"
        aria-orientation="horizontal"
        {...props}
      >
        <div className={cn('flex-1', sizes[size], colors[color])} />
        <div className={cn(
          'flex',
          labelPositions[labelPosition],
          labelPosition === 'center' ? 'px-4' : 'px-2'
        )}>
          <span className={cn(
            'bg-white px-2 py-1 text-sm font-medium text-neutral-600',
            'whitespace-nowrap'
          )}>
            {label}
          </span>
        </div>
        {labelPosition !== 'left' && (
          <div className={cn('flex-1', sizes[size], colors[color])} />
        )}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        'w-full',
        sizes[size],
        colors[color],
        className
      )}
      role="separator"
      aria-orientation="horizontal"
      {...props}
    />
  )
})

Divider.displayName = 'Divider'
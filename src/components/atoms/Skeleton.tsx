import React from 'react'
import { cn } from '@/lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded'
  width?: string | number
  height?: string | number
  lines?: number
  animated?: boolean
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({
  variant = 'rectangular',
  width,
  height,
  lines = 1,
  animated = true,
  className,
  ...props
}, ref) => {
  const baseStyles = [
    'bg-neutral-200',
    animated && 'animate-pulse',
  ].join(' ')

  const variants = {
    text: 'rounded h-4',
    rectangular: 'rounded-md',
    circular: 'rounded-full',
    rounded: 'rounded-lg',
  }

  const getStyles = () => {
    const styles: React.CSSProperties = {}
    if (width) styles.width = typeof width === 'number' ? `${width}px` : width
    if (height) styles.height = typeof height === 'number' ? `${height}px` : height
    return styles
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)} ref={ref} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseStyles,
              variants.text,
              index === lines - 1 && 'w-3/4'
            )}
            style={getStyles()}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        className
      )}
      style={getStyles()}
      {...props}
    />
  )
})

Skeleton.displayName = 'Skeleton'
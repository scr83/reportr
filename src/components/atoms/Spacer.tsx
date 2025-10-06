import React from 'react'
import { cn } from '@/lib/utils'

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  axis?: 'horizontal' | 'vertical' | 'both'
}

export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(({
  size = 'md',
  axis = 'vertical',
  className,
  ...props
}, ref) => {
  const sizes = {
    xs: '1',
    sm: '2',
    md: '4',
    lg: '6',
    xl: '8',
    '2xl': '12',
    '3xl': '16',
  }

  const axisStyles = {
    horizontal: `w-${sizes[size]}`,
    vertical: `h-${sizes[size]}`,
    both: `w-${sizes[size]} h-${sizes[size]}`,
  }

  return (
    <div
      ref={ref}
      className={cn(
        'flex-shrink-0',
        axisStyles[axis],
        className
      )}
      aria-hidden="true"
      {...props}
    />
  )
})

Spacer.displayName = 'Spacer'
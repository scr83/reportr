import React from 'react'
import { cn } from '@/lib/utils'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  center?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(({
  size = 'lg',
  center = true,
  padding = 'md',
  className,
  children,
  ...props
}, ref) => {
  const baseStyles = [
    'w-full',
    center && 'mx-auto',
  ].join(' ')

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full',
  }

  const paddings = {
    none: '',
    sm: 'px-4',
    md: 'px-6',
    lg: 'px-8',
    xl: 'px-12',
  }

  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        sizes[size],
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Container.displayName = 'Container'
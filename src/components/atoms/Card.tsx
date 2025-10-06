import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export const Card = ({ children, className, hover = false }: CardProps) => (
  <div className={cn(
    'card',
    hover && 'card-hover cursor-pointer',
    className
  )}>
    {children}
  </div>
)

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export const CardHeader = ({ children, className }: CardHeaderProps) => (
  <div className={cn('mb-4', className)}>
    {children}
  </div>
)

export const CardTitle = ({ children, className }: CardHeaderProps) => (
  <h3 className={cn('text-lg font-semibold text-gray-900', className)}>
    {children}
  </h3>
)

export const CardContent = ({ children, className }: CardHeaderProps) => (
  <div className={cn(className)}>
    {children}
  </div>
)

export const CardFooter = ({ children, className }: CardHeaderProps) => (
  <div className={cn('mt-4 pt-4 border-t border-gray-200', className)}>
    {children}
  </div>
)
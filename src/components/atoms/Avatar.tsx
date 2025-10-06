import React from 'react'
import Image from 'next/image'
import { User } from 'lucide-react'
import { cn, getInitials } from '@/lib/utils'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  variant?: 'circular' | 'rounded' | 'square'
  fallbackIcon?: React.ReactNode
  showBorder?: boolean
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({
  src,
  alt,
  name,
  size = 'md',
  variant = 'circular',
  fallbackIcon,
  showBorder = false,
  className,
  ...props
}, ref) => {
  const baseStyles = [
    'relative inline-flex items-center justify-center',
    'bg-neutral-100 text-neutral-600',
    'font-medium select-none',
    'overflow-hidden',
  ].join(' ')

  const sizes = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
    '2xl': 'h-20 w-20 text-2xl',
  }

  const variants = {
    circular: 'rounded-full',
    rounded: 'rounded-lg',
    square: 'rounded-none',
  }

  const borderStyles = showBorder 
    ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-100' 
    : ''

  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
    '2xl': 80,
  }

  const renderFallback = () => {
    if (name) {
      return getInitials(name)
    }
    
    if (fallbackIcon) {
      return fallbackIcon
    }
    
    return <User className="h-1/2 w-1/2" />
  }

  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        sizes[size],
        variants[variant],
        borderStyles,
        className
      )}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || name || 'Avatar'}
          width={sizeMap[size]}
          height={sizeMap[size]}
          className={cn('h-full w-full object-cover', variants[variant])}
        />
      ) : (
        renderFallback()
      )}
    </div>
  )
})

Avatar.displayName = 'Avatar'
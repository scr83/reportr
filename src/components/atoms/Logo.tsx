import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  width?: number
  height?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'white' | 'dark'
  fallback?: React.ReactNode
  href?: string
}

export const Logo = React.forwardRef<HTMLDivElement, LogoProps>(({
  src,
  alt = 'Logo',
  width,
  height,
  size = 'md',
  variant = 'default',
  fallback,
  href,
  className,
  ...props
}, ref) => {
  const sizes = {
    xs: { width: 80, height: 32 },
    sm: { width: 100, height: 40 },
    md: { width: 120, height: 48 },
    lg: { width: 160, height: 64 },
    xl: { width: 200, height: 80 },
  }

  const defaultSize = sizes[size]
  const logoWidth = width || defaultSize.width
  const logoHeight = height || defaultSize.height

  const variants = {
    default: 'filter-none',
    white: 'brightness-0 invert',
    dark: 'brightness-0',
  }

  const renderLogo = () => {
    if (src) {
      return (
        <Image
          src={src}
          alt={alt}
          width={logoWidth}
          height={logoHeight}
          className={cn(
            'object-contain transition-all duration-200',
            variants[variant]
          )}
          priority
        />
      )
    }

    if (fallback) {
      return fallback
    }

    // Default fallback logo
    return (
      <div className={cn(
        'flex items-center justify-center',
        'bg-brand-600 text-white rounded-lg',
        'font-bold text-lg',
        `w-[${logoWidth}px] h-[${logoHeight}px]`
      )}>
        LOGO
      </div>
    )
  }

  const logoElement = (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center',
        'transition-all duration-200',
        href && 'hover:opacity-80 cursor-pointer',
        className
      )}
      style={{ width: logoWidth, height: logoHeight }}
      {...props}
    >
      {renderLogo()}
    </div>
  )

  if (href) {
    return (
      <a href={href} className="inline-block">
        {logoElement}
      </a>
    )
  }

  return logoElement
})

Logo.displayName = 'Logo'
import React from 'react'
import NextLink from 'next/link'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: 'default' | 'brand' | 'muted' | 'underline' | 'button'
  size?: 'sm' | 'md' | 'lg'
  external?: boolean
  showExternalIcon?: boolean
  children: React.ReactNode
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({
  href,
  variant = 'default',
  size = 'md',
  external = false,
  showExternalIcon = true,
  className,
  children,
  ...props
}, ref) => {
  const baseStyles = [
    'inline-flex items-center gap-1',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
    'rounded-sm',
  ].join(' ')

  const variants = {
    default: 'text-neutral-700 hover:text-neutral-900',
    brand: 'text-brand-600 hover:text-brand-700',
    muted: 'text-neutral-500 hover:text-neutral-600',
    underline: 'text-brand-600 hover:text-brand-700 underline underline-offset-4',
    button: [
      'bg-brand-600 text-white px-4 py-2 rounded-md',
      'hover:bg-brand-700 active:bg-brand-800',
      'font-medium no-underline',
    ].join(' '),
  }

  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  const isExternal = external || href.startsWith('http')

  const linkContent = (
    <>
      {children}
      {isExternal && showExternalIcon && (
        <ExternalLink className="h-3 w-3 ml-0.5" />
      )}
    </>
  )

  const commonProps = {
    ref,
    className: cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    ),
    ...props,
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...commonProps}
      >
        {linkContent}
      </a>
    )
  }

  return (
    <NextLink href={href as any} legacyBehavior>
      <a {...commonProps}>
        {linkContent}
      </a>
    </NextLink>
  )
})

Link.displayName = 'Link'
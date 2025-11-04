import Link from 'next/link'
import { ComponentProps } from 'react'

interface CTAProps {
  href: ComponentProps<typeof Link>['href']
  children: React.ReactNode
  subtitle?: string
  className?: string
}

export function CTA({ href, children, subtitle, className = "" }: CTAProps) {
  return (
    <div className={`my-8 p-6 bg-purple-50 rounded-xl ${className}`}>
      <Link
        href={href}
        className="inline-block w-full md:w-auto px-8 py-4 text-lg font-bold text-purple-600 bg-white border-2 border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300 text-center"
      >
        {children}
      </Link>
      {subtitle && (
        <p className="mt-3 text-sm text-gray-600 text-center md:text-left">
          {subtitle}
        </p>
      )}
    </div>
  )
}
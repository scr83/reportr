'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import { Menu, X, BarChart3 } from 'lucide-react'
import { 
  Button, 
  Icon, 
  Container 
} from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface HeaderProps {
  className?: string
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const navigateToPage = (path: string) => {
    router.push(path as any) // Type assertion for dynamic routes
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-brand-600 text-white px-4 py-2 rounded-lg font-medium"
      >
        Skip to main content
      </a>
      
      <header className={cn(
        'sticky top-0 z-50',
        'bg-white/80 backdrop-blur-[12px] border-b border-purple-500/10',
        'shadow-sm',
        className
      )}>
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => navigateToPage('/')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <Icon icon={BarChart3} size="sm" className="text-white" />
            </div>
            <span className="font-poppins font-bold text-xl text-neutral-900">
              Reportr
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigateToPage('/')}
              className="text-neutral-600 hover:text-neutral-900 font-medium hover:bg-white/50 hover:backdrop-blur-sm hover:px-3 hover:py-2 hover:rounded-lg transition-all duration-300"
            >
              Home
            </button>
            <button
              onClick={() => navigateToPage('/features')}
              className="text-neutral-600 hover:text-neutral-900 font-medium hover:bg-white/50 hover:backdrop-blur-sm hover:px-3 hover:py-2 hover:rounded-lg transition-all duration-300"
            >
              Features
            </button>
            <button
              onClick={() => navigateToPage('/how-it-works')}
              className="text-neutral-600 hover:text-neutral-900 font-medium hover:bg-white/50 hover:backdrop-blur-sm hover:px-3 hover:py-2 hover:rounded-lg transition-all duration-300"
            >
              How It Works
            </button>
            <button
              onClick={() => navigateToPage('/pricing')}
              className="text-neutral-600 hover:text-neutral-900 font-medium hover:bg-white/50 hover:backdrop-blur-sm hover:px-3 hover:py-2 hover:rounded-lg transition-all duration-300"
            >
              Pricing
            </button>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {status === 'loading' ? (
              <Button variant="ghost" size="sm" disabled>
                Loading...
              </Button>
            ) : session ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => router.push('/dashboard')}
                className="text-neutral-600 hover:text-neutral-900"
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                  className="text-neutral-600 hover:text-neutral-900"
                >
                  Login
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => signIn('google', { callbackUrl: '/pricing' })}
                  className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-neutral-600 hover:text-neutral-900"
            aria-label="Toggle navigation menu"
          >
            <Icon icon={isMobileMenuOpen ? X : Menu} size="md" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => navigateToPage('/')}
                className="text-left text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigateToPage('/features')}
                className="text-left text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => navigateToPage('/how-it-works')}
                className="text-left text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => navigateToPage('/pricing')}
                className="text-left text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
              >
                Pricing
              </button>
              
              <div className="pt-4 border-t border-neutral-200 flex flex-col space-y-3">
                {status === 'loading' ? (
                  <Button variant="ghost" size="sm" disabled>
                    Loading...
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                      className="justify-start"
                    >
                      Login
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => signIn('google', { callbackUrl: '/pricing' })}
                      className="bg-brand-600 hover:bg-brand-700 text-white justify-center"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
    </>
  )
}

Header.displayName = 'Header'
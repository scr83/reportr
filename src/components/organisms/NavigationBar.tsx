'use client'

import React from 'react'
import { Menu, Search, Bell } from 'lucide-react'
import { 
  Button, 
  Badge, 
  Icon, 
  Logo, 
  Container 
} from '@/components/atoms'
import { SearchBox } from '@/components/molecules'
import { cn } from '@/lib/utils'

export interface NavigationBarProps {
  onMobileMenuClick?: () => void
  showMobileMenu?: boolean
  className?: string
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  onMobileMenuClick,
  showMobileMenu = true,
  className,
}) => {

  return (
    <nav className={cn(
      'sticky top-0 z-40',
      'bg-white border-b border-neutral-200',
      'shadow-sm',
      className
    )}>
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            {showMobileMenu && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMobileMenuClick}
                className="md:hidden"
                aria-label="Open navigation menu"
              >
                <Icon icon={Menu} size="md" />
              </Button>
            )}

            {/* Logo */}
            <Logo 
              size="sm"
              className="flex-shrink-0"
              href="/"
            />

            {/* Desktop navigation links */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Navigation links for marketing site */}
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Search - hidden on mobile */}
            <div className="hidden sm:block">
              <SearchBox
                placeholder="Search..."
                size="sm"
                variant="ghost"
                className="w-64"
              />
            </div>

            {/* Auth buttons */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => alert('Authentication coming soon!')}>
                Sign In
              </Button>
              <Button variant="primary" size="sm" onClick={() => alert('Authentication coming soon!')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  )
}

NavigationBar.displayName = 'NavigationBar'
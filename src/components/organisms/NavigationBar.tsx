'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { Menu, Search, Bell } from 'lucide-react'
import { 
  Button, 
  Badge, 
  Icon, 
  Logo, 
  Container 
} from '@/components/atoms'
import { SearchBox } from '@/components/molecules'
import { UserMenu } from '@/components/molecules'
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
  const { data: session } = useSession()

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

            {/* Desktop navigation links - only show for authenticated users and not on dashboard pages */}
            {session && (
              <div className="hidden md:flex items-center space-x-8">
                {/* These links are only shown in the top navigation bar when not in dashboard area */}
                {/* Dashboard area uses Sidebar component for navigation */}
              </div>
            )}
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

            {/* Notifications */}
            {session && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative"
                  aria-label="Notifications"
                >
                  <Icon icon={Bell} size="md" />
                  <Badge
                    variant="error"
                    size="sm"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs"
                  >
                    3
                  </Badge>
                </Button>
              </div>
            )}

            {/* User menu */}
            {session ? (
              <UserMenu />
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </nav>
  )
}

NavigationBar.displayName = 'NavigationBar'
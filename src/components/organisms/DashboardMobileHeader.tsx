'use client'

import React from 'react'
import { Menu, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DashboardMobileHeaderProps {
  onMenuClick: () => void
  className?: string
}

export const DashboardMobileHeader: React.FC<DashboardMobileHeaderProps> = ({
  onMenuClick,
  className
}) => {
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-40 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4",
      className
    )}>
      {/* Hamburger Menu Button */}
      <button
        onClick={onMenuClick}
        className="p-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-600">
          <BarChart3 className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-semibold text-gray-900">SEO Reports</span>
      </div>

      {/* Spacer to center logo */}
      <div className="w-10" />
    </header>
  )
}

DashboardMobileHeader.displayName = 'DashboardMobileHeader'
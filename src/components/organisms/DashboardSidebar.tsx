'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Plus,
  BarChart3,
  X,
  Settings
} from 'lucide-react'
import { Button } from '@/components/atoms'
import { UserMenu } from '@/components/organisms/UserMenu'
import { cn } from '@/lib/utils'

interface DashboardSidebarProps {
  mobile?: boolean
  onClose?: () => void
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  mobile = false, 
  onClose 
}) => {
  const pathname = usePathname()

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Clients',
      href: '/dashboard/clients',
      icon: Users,
    },
    {
      name: 'Reports Library',
      href: '/reports',
      icon: FileText,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ]

  const handleLinkClick = () => {
    // Close mobile sidebar when a link is clicked
    if (mobile && onClose) {
      onClose()
    }
  }

  return (
    <div className={cn(
      "flex h-full flex-col bg-white border-r border-gray-200",
      mobile ? "w-full" : "w-64"
    )}>
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <div className="flex items-center space-x-2 flex-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-md" style={{ backgroundColor: 'var(--primary-color)' }}>
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900">SEO Reports</span>
        </div>
        {/* Close button for mobile */}
        {mobile && onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ '--tw-ring-color': 'var(--primary-color)' } as React.CSSProperties}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href as any}
              onClick={handleLinkClick}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors min-h-[44px]',
                isActive
                  ? 'text-gray-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              )}
              style={isActive ? { 
                backgroundColor: `rgba(var(--primary-color-rgb), 0.1)`,
                color: 'var(--primary-color)'
              } : {}}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0 transition-colors',
                  isActive ? '' : 'text-gray-400 group-hover:text-gray-500'
                )}
                style={isActive ? { color: 'var(--primary-color)' } : {}}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Generate Report Button */}
      <div className="px-4 pb-6">
        <Link href="/generate-report" onClick={handleLinkClick}>
          <Button
            className="w-full text-white min-h-[44px]"
            style={{ 
              backgroundColor: 'var(--primary-color)',
              '--tw-bg-opacity': '1'
            } as React.CSSProperties}
            size="md"
          >
            <Plus className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </Link>
      </div>

      {/* User Menu */}
      <div className="px-4 pb-4 border-t border-gray-200 pt-4">
        <UserMenu />
      </div>
    </div>
  )
}

DashboardSidebar.displayName = 'DashboardSidebar'
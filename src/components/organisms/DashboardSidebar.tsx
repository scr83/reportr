'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Plus,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/atoms'
import { cn } from '@/lib/utils'

export const DashboardSidebar = () => {
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
  ]

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900">SEO Reports</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href as any}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0 transition-colors',
                  isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Generate Report Button */}
      <div className="px-4 pb-6">
        <Link href="/generate-report">
          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            size="md"
          >
            <Plus className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </Link>
      </div>

      {/* Agency Info Footer */}
      <div className="px-4 pb-4 border-t border-gray-200 pt-4">
        <div className="text-xs text-gray-500">
          <div className="font-medium">Digital Frog Agency</div>
          <div>2 clients • 2 reports this month</div>
        </div>
      </div>
    </div>
  )
}

DashboardSidebar.displayName = 'DashboardSidebar'
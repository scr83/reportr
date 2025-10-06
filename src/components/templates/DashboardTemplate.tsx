'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Menu, X, ChevronRight } from 'lucide-react'
import { 
  Container, 
  Button, 
  Icon, 
  Typography,
  Flex,
  Spacer 
} from '@/components/atoms'
import { NavigationBar } from '@/components/organisms'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface DashboardTemplateProps {
  children: React.ReactNode
  title?: string
  breadcrumb?: BreadcrumbItem[]
  actions?: React.ReactNode
  sidebar?: React.ReactNode
  className?: string
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  children,
  title,
  breadcrumb = [],
  actions,
  sidebar,
  className,
}) => {
  const { data: session } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const defaultSidebar = (
    <nav className="space-y-1">
      <SidebarLink href="/dashboard" icon="home" active>
        Dashboard
      </SidebarLink>
      <SidebarLink href="/dashboard/clients" icon="users">
        Clients
      </SidebarLink>
      <SidebarLink href="/dashboard/reports" icon="fileText">
        Reports
      </SidebarLink>
      <SidebarLink href="/dashboard/settings" icon="settings">
        Settings
      </SidebarLink>
    </nav>
  )

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation Bar */}
      <NavigationBar 
        onMobileMenuClick={() => setSidebarOpen(true)}
        showMobileMenu={!!session}
      />

      <div className="flex">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div 
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
              <div className="flex items-center justify-between p-4 border-b">
                <Typography variant="h6">Menu</Typography>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon icon={X} size="sm" />
                </Button>
              </div>
              <div className="p-4">
                {sidebar || defaultSidebar}
              </div>
            </div>
          </div>
        )}

        {/* Desktop sidebar */}
        {session && (
          <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 lg:bg-white lg:border-r lg:border-neutral-200">
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="px-3">
                  {sidebar || defaultSidebar}
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Main content */}
        <main className={cn(
          'flex-1',
          session ? 'lg:pl-64' : '',
          className
        )}>
          <div className="py-6">
            <Container className="px-4 sm:px-6 lg:px-8">
              {/* Page header */}
              {(title || breadcrumb.length > 0 || actions) && (
                <div className="mb-8">
                  {/* Breadcrumb */}
                  {breadcrumb.length > 0 && (
                    <nav className="flex mb-4" aria-label="Breadcrumb">
                      <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        {breadcrumb.map((item, index) => (
                          <li key={index} className="inline-flex items-center">
                            {index > 0 && (
                              <Icon 
                                icon={ChevronRight} 
                                size="sm" 
                                className="mx-2 text-neutral-400"
                              />
                            )}
                            {item.href ? (
                              <a 
                                href={item.href}
                                className="text-sm text-neutral-600 hover:text-neutral-900"
                              >
                                {item.label}
                              </a>
                            ) : (
                              <span className="text-sm text-neutral-900">
                                {item.label}
                              </span>
                            )}
                          </li>
                        ))}
                      </ol>
                    </nav>
                  )}

                  {/* Page title and actions */}
                  <Flex justify="between" align="center" className="flex-wrap gap-4">
                    {title && (
                      <Typography variant="h1" className="text-2xl font-bold text-neutral-900">
                        {title}
                      </Typography>
                    )}
                    {actions && (
                      <div className="flex items-center space-x-3">
                        {actions}
                      </div>
                    )}
                  </Flex>
                </div>
              )}

              {/* Page content */}
              <div className="space-y-6">
                {children}
              </div>
            </Container>
          </div>
        </main>
      </div>
    </div>
  )
}

// Sidebar Link Component
interface SidebarLinkProps {
  href: string
  icon?: string
  active?: boolean
  children: React.ReactNode
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ 
  href, 
  icon, 
  active = false, 
  children 
}) => {
  return (
    <a
      href={href}
      className={cn(
        'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
        active 
          ? 'bg-brand-50 text-brand-700 border-r-2 border-brand-500' 
          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
      )}
    >
      {icon && (
        <div className={cn(
          'mr-3 flex-shrink-0 h-6 w-6',
          active ? 'text-brand-500' : 'text-neutral-400 group-hover:text-neutral-500'
        )}>
          {/* Icon would be rendered based on icon prop */}
          <div className="h-4 w-4" />
        </div>
      )}
      {children}
    </a>
  )
}

DashboardTemplate.displayName = 'DashboardTemplate'
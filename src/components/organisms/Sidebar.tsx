'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { 
  Home, 
  Users, 
  FileText, 
  Settings, 
  BarChart3,
  HelpCircle,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react'
import { 
  Typography,
  Avatar,
  Badge,
  Button,
  Icon,
  Spacer,
  Divider 
} from '@/components/atoms'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

export interface SidebarProps {
  collapsed?: boolean
  onToggleCollapse?: () => void
  className?: string
}

interface NavItem {
  id: string
  label: string
  href: string
  icon: LucideIcon
  badge?: string | number
  disabled?: boolean
}

const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    id: 'clients',
    label: 'Clients',
    href: '/dashboard/clients',
    icon: Users,
  },
  {
    id: 'reports',
    label: 'Reports',
    href: '/dashboard/reports',
    icon: FileText,
    badge: 'Soon',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
    disabled: true,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

const supportItems: NavItem[] = [
  {
    id: 'help',
    label: 'Help & Support',
    href: '/help',
    icon: HelpCircle,
  },
]

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  onToggleCollapse,
  className,
}) => {
  const { data: session } = useSession()
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  if (!session) return null

  return (
    <aside className={cn(
      'flex flex-col bg-white border-r border-neutral-200',
      'transition-all duration-300 ease-in-out',
      collapsed ? 'w-16' : 'w-64',
      'h-full',
      className
    )}>
      {/* Header */}
      <div className="p-4">
        <div className={cn(
          'flex items-center',
          collapsed ? 'justify-center' : 'justify-between'
        )}>
          {!collapsed && (
            <Typography variant="h6" className="font-semibold text-neutral-900">
              Menu
            </Typography>
          )}
          
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="p-2"
            >
              <Icon 
                icon={collapsed ? ChevronRight : ChevronLeft} 
                size="sm" 
              />
            </Button>
          )}
        </div>
      </div>

      {/* User Profile */}
      <div className="px-4 pb-4">
        <div className={cn(
          'flex items-center p-3 rounded-lg bg-neutral-50',
          collapsed ? 'justify-center' : 'space-x-3'
        )}>
          <Avatar
            src={session.user?.image || undefined}
            alt={session.user?.name || 'User'}
            name={session.user?.name || 'User'}
            size={collapsed ? 'sm' : 'md'}
          />
          
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <Typography variant="caption" className="font-medium text-neutral-900 truncate">
                {session.user?.name}
              </Typography>
              <Typography variant="caption" className="text-neutral-600 text-xs truncate">
                {session.user?.email}
              </Typography>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 pb-4 space-y-1">
        {navigationItems.map((item) => (
          <SidebarNavItem
            key={item.id}
            item={item}
            isActive={isActive(item.href)}
            collapsed={collapsed}
          />
        ))}

        <Spacer size="md" />
        <Divider />
        <Spacer size="md" />

        {/* Support Section */}
        {!collapsed && (
          <Typography variant="caption" className="px-3 py-2 text-xs font-medium text-neutral-500 uppercase tracking-wider">
            Support
          </Typography>
        )}
        
        {supportItems.map((item) => (
          <SidebarNavItem
            key={item.id}
            item={item}
            isActive={isActive(item.href)}
            collapsed={collapsed}
          />
        ))}
      </nav>
    </aside>
  )
}

// Navigation Item Component
interface SidebarNavItemProps {
  item: NavItem
  isActive: boolean
  collapsed: boolean
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ 
  item, 
  isActive, 
  collapsed 
}) => {
  const content = (
    <div className={cn(
      'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
      'group cursor-pointer',
      collapsed ? 'justify-center' : 'justify-between',
      isActive
        ? 'bg-brand-50 text-brand-700 border-r-2 border-brand-500'
        : item.disabled
        ? 'text-neutral-400 cursor-not-allowed'
        : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
    )}>
      <div className={cn(
        'flex items-center',
        collapsed ? 'justify-center' : 'space-x-3'
      )}>
        <Icon 
          icon={item.icon} 
          size="sm" 
          className={cn(
            'flex-shrink-0',
            isActive 
              ? 'text-brand-600' 
              : item.disabled
              ? 'text-neutral-300'
              : 'text-neutral-500 group-hover:text-neutral-700'
          )}
        />
        
        {!collapsed && (
          <span className="truncate">{item.label}</span>
        )}
      </div>

      {!collapsed && item.badge && !item.disabled && (
        <Badge 
          variant={typeof item.badge === 'string' ? 'warning' : 'brand'}
          size="sm"
          className="text-xs"
        >
          {item.badge}
        </Badge>
      )}
    </div>
  )

  if (item.disabled) {
    return content
  }

  return (
    <Link href={item.href as any} className="block">
      {content}
    </Link>
  )
}

Sidebar.displayName = 'Sidebar'
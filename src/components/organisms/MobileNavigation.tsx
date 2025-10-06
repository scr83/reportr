'use client'

import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { 
  Home, 
  Users, 
  FileText, 
  Settings, 
  X,
  LogOut 
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
import { signOut } from 'next-auth/react'
import { LucideIcon } from 'lucide-react'

export interface MobileNavigationProps {
  isOpen: boolean
  onClose: () => void
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
    badge: 'Soon',
  },
  {
    id: 'reports',
    label: 'Reports',
    href: '/dashboard/reports',
    icon: FileText,
    badge: 'Soon',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  className,
}) => {
  const { data: session } = useSession()
  const pathname = usePathname()

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
    onClose()
  }

  if (!session) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className={cn(
          'fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity lg:hidden',
          isOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={cn(
        'fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50',
        'transform transition-transform duration-300 ease-in-out lg:hidden',
        'flex flex-col',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        className
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <Typography variant="h6" className="font-semibold text-neutral-900">
            Navigation
          </Typography>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <Icon icon={X} size="md" />
          </Button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-neutral-200">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-50">
            <Avatar
              src={session.user?.image || undefined}
              alt={session.user?.name || 'User'}
              name={session.user?.name || 'User'}
              size="md"
            />
            
            <div className="flex-1 min-w-0">
              <Typography variant="body" className="font-medium text-neutral-900 truncate">
                {session.user?.name}
              </Typography>
              <Typography variant="caption" className="text-neutral-600 text-sm truncate">
                {session.user?.email}
              </Typography>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <MobileNavItem
                key={item.id}
                item={item}
                isActive={isActive(item.href)}
                onClick={onClose}
              />
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:bg-red-50"
            onClick={handleSignOut}
          >
            <Icon icon={LogOut} size="sm" className="mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </>
  )
}

// Mobile Navigation Item Component
interface MobileNavItemProps {
  item: NavItem
  isActive: boolean
  onClick: () => void
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ 
  item, 
  isActive, 
  onClick 
}) => {
  const content = (
    <div 
      className={cn(
        'flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors',
        'group cursor-pointer',
        isActive
          ? 'bg-brand-50 text-brand-700'
          : item.disabled
          ? 'text-neutral-400 cursor-not-allowed'
          : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
      )}
      onClick={item.disabled ? undefined : onClick}
    >
      <div className="flex items-center space-x-4">
        <Icon 
          icon={item.icon} 
          size="md" 
          className={cn(
            'flex-shrink-0',
            isActive 
              ? 'text-brand-600' 
              : item.disabled
              ? 'text-neutral-300'
              : 'text-neutral-500 group-hover:text-neutral-700'
          )}
        />
        <span>{item.label}</span>
      </div>

      {item.badge && !item.disabled && (
        <Badge 
          variant={typeof item.badge === 'string' ? 'warning' : 'brand'}
          size="sm"
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
    <a href={item.href} className="block">
      {content}
    </a>
  )
}

MobileNavigation.displayName = 'MobileNavigation'
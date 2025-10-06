'use client'

import React, { useState, useRef, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { Caption } from '@/components/atoms/Typography'
import { cn, getInitials } from '@/lib/utils'

export const UserMenu = () => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (!session?.user) return null

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        className="flex items-center space-x-2 px-3 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User'}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-sm font-medium">
              {getInitials(session.user.name || session.user.email || 'User')}
            </div>
          )}
          <div className="hidden md:block text-left">
            <div className="text-sm font-medium text-gray-900">
              {session.user.name}
            </div>
            <Caption className="text-xs">
              {session.user.companyName}
            </Caption>
          </div>
        </div>
        <ChevronDown className={cn(
          'h-4 w-4 transition-transform',
          isOpen && 'rotate-180'
        )} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <div className="px-4 py-2 border-b border-gray-100">
              <div className="text-sm font-medium text-gray-900">
                {session.user.name}
              </div>
              <div className="text-sm text-gray-500">
                {session.user.email}
              </div>
            </div>
            
            <Link
              href="/dashboard/profile"
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <User className="mr-3 h-4 w-4" />
              Profile
            </Link>
            
            <Link
              href="/dashboard/settings"
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </Link>
            
            <div className="border-t border-gray-100 my-1" />
            
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false)
                handleSignOut()
              }}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
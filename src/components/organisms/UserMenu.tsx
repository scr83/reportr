'use client'

import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import { User, Settings, LogOut, ChevronDown } from 'lucide-react'

export function UserMenu() {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  // 🔍 DEBUG LOGGING
  console.log('=== UserMenu Debug ===')
  console.log('Session status:', status)
  console.log('Session data:', session)
  console.log('Session user:', session?.user)
  console.log('Email verified:', session?.user?.emailVerified)
  console.log('User ID:', session?.user?.id)
  console.log('Should render menu:', !!session)
  console.log('======================')

  if (status === 'loading') {
    console.log('🔄 UserMenu: Status loading, showing skeleton')
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
    )
  }

  if (!session) {
    console.log('❌ UserMenu: No session, returning null')
    // 🔍 FORCE RENDER TEST - Show even when no session
    console.log('🧪 FORCE RENDER: Creating test user menu')
    return (
      <div className="relative bg-yellow-100 border-2 border-yellow-400 p-2 rounded">
        <div className="text-xs text-yellow-800 mb-2">🚨 FORCE RENDER TEST</div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-50">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center bg-red-500"
          >
            <User className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-900">
            No Session User
          </span>
        </div>
      </div>
    )
  }
  
  console.log('✅ UserMenu: Rendering menu with session')

  const handleLogout = async () => {
    setIsOpen(false)
    await signOut({ callbackUrl: '/' })
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {session.user?.image ? (
          <img 
            src={session.user.image} 
            alt={session.user?.name || 'User'} 
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `rgba(var(--primary-color-rgb), 0.1)` }}
          >
            <User className="h-4 w-4" style={{ color: 'var(--primary-color)' }} />
          </div>
        )}
        <span className="hidden md:block text-sm font-medium text-gray-900 max-w-24 truncate">
          {session.user?.name?.split(' ')[0] || 'User'}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 bottom-full mb-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-3 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session.user?.name}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {session.user?.email}
              </p>
            </div>
            
            <div className="py-1">
              <Link
                href="/settings"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-4 w-4" />
                Account Settings
              </Link>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
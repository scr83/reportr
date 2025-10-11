'use client'

import React, { useState } from 'react'
import { DashboardSidebar } from '@/components/organisms/DashboardSidebar'
import { DashboardMobileHeader } from '@/components/organisms/DashboardMobileHeader'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen bg-gray-50">
      {/* Mobile Header - visible only on mobile */}
      <DashboardMobileHeader 
        onMenuClick={() => setSidebarOpen(true)}
        className="lg:hidden"
      />
      
      {/* Desktop layout */}
      <div className="hidden lg:flex lg:h-full">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      
      {/* Mobile layout */}
      <div className="lg:hidden">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-gray-600 bg-opacity-75" 
              onClick={() => setSidebarOpen(false)}
            />
            
            {/* Sidebar */}
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
              <DashboardSidebar 
                mobile={true}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        )}
        
        {/* Main content with mobile header offset */}
        <main className="pt-16 h-full overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

DashboardLayout.displayName = 'DashboardLayout'
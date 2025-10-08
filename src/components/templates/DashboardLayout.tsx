'use client'

import React from 'react'
import { DashboardSidebar } from '@/components/organisms/DashboardSidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

DashboardLayout.displayName = 'DashboardLayout'
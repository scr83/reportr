import React from 'react'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Simple layout without authentication for testing */}
      <aside className="w-64 bg-white border-r border-neutral-200">
        <div className="p-4">
          <h3 className="font-semibold text-neutral-900">Navigation</h3>
          <nav className="mt-4 space-y-2">
            <Link href="/dashboard" className="block px-3 py-2 rounded text-neutral-700 hover:bg-neutral-100">
              Dashboard
            </Link>
            <Link href="/dashboard/clients" className="block px-3 py-2 rounded text-neutral-700 hover:bg-neutral-100">
              Clients
            </Link>
            <Link href="/dashboard/reports" className="block px-3 py-2 rounded text-neutral-700 hover:bg-neutral-100">
              Reports
            </Link>
            <Link href="/dashboard/settings" className="block px-3 py-2 rounded text-neutral-700 hover:bg-neutral-100">
              Settings
            </Link>
          </nav>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
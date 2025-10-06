import React from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-neutral-900 mb-4">
        🎉 Dashboard Working!
      </h1>
      <p className="text-neutral-600 mb-4">
        If you can see this, the dashboard route is working correctly.
      </p>
      <div className="bg-green-100 border border-green-200 rounded p-4">
        <p className="text-green-800">
          ✅ Route: /dashboard is accessible<br/>
          ✅ Layout is rendering<br/>  
          ✅ Page component is loading<br/>
          ✅ No 404 errors
        </p>
      </div>
      <div className="mt-6 space-y-2">
        <p><strong>Test these routes:</strong></p>
        <ul className="list-disc list-inside space-y-1 text-neutral-600">
          <li><Link href="/dashboard/clients" className="text-brand-600 hover:underline">Clients Page</Link></li>
          <li><Link href="/dashboard/reports" className="text-brand-600 hover:underline">Reports Page</Link></li>
          <li><Link href="/debug" className="text-brand-600 hover:underline">Debug Page</Link></li>
        </ul>
      </div>
    </div>
  )
}
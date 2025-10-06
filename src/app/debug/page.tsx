'use client'

import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { Card, Typography, Button, Grid } from '@/components/atoms'

export default function DebugPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Typography variant="h1" className="text-3xl font-bold text-neutral-900 mb-8">
          🔧 Debug Information
        </Typography>

        <Grid cols={1} gap="lg" className="lg:grid-cols-2">
          {/* Authentication Status */}
          <Card className="p-6">
            <Typography variant="h3" className="text-xl font-semibold mb-4">
              Authentication Status
            </Typography>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Status:</span>
                <span className={`font-mono ${
                  status === 'authenticated' ? 'text-green-600' : 
                  status === 'unauthenticated' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {status}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Has Session:</span>
                <span className={`font-mono ${session ? 'text-green-600' : 'text-red-600'}`}>
                  {session ? 'Yes' : 'No'}
                </span>
              </div>
              {session && (
                <>
                  <div className="flex justify-between">
                    <span>User:</span>
                    <span className="font-mono text-sm">{session.user?.name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="font-mono text-sm">{session.user?.email || 'N/A'}</span>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Environment Info */}
          <Card className="p-6">
            <Typography variant="h3" className="text-xl font-semibold mb-4">
              Environment Info
            </Typography>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Current Path:</span>
                <span className="font-mono text-sm">{pathname}</span>
              </div>
              <div className="flex justify-between">
                <span>Environment:</span>
                <span className="font-mono">{process.env.NODE_ENV || 'development'}</span>
              </div>
              <div className="flex justify-between">
                <span>NextAuth URL:</span>
                <span className="font-mono text-sm">
                  {typeof window !== 'undefined' ? window.location.origin : 'Server'}
                </span>
              </div>
            </div>
          </Card>

          {/* Route Testing */}
          <Card className="p-6">
            <Typography variant="h3" className="text-xl font-semibold mb-4">
              Route Testing
            </Typography>
            <div className="space-y-3">
              <Button 
                variant="secondary" 
                className="w-full justify-start"
                onClick={() => router.push('/')}
              >
                → Test Home Page
              </Button>
              <Button 
                variant="secondary" 
                className="w-full justify-start"
                onClick={() => router.push('/dashboard')}
              >
                → Test Dashboard
              </Button>
              <Button 
                variant="secondary" 
                className="w-full justify-start"
                onClick={() => router.push('/dashboard/clients')}
              >
                → Test Clients Page
              </Button>
              <Button 
                variant="secondary" 
                className="w-full justify-start"
                onClick={() => router.push('/signin')}
              >
                → Test Sign In
              </Button>
            </div>
          </Card>

          {/* Session Actions */}
          <Card className="p-6">
            <Typography variant="h3" className="text-xl font-semibold mb-4">
              Session Actions
            </Typography>
            <div className="space-y-3">
              {status === 'authenticated' ? (
                <Button 
                  variant="error" 
                  className="w-full"
                  onClick={() => {
                    // Import signOut dynamically to avoid SSR issues
                    import('next-auth/react').then(({ signOut }) => {
                      signOut({ callbackUrl: '/' })
                    })
                  }}
                >
                  Sign Out
                </Button>
              ) : (
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => router.push('/signin')}
                >
                  Go to Sign In
                </Button>
              )}
            </div>
          </Card>
        </Grid>

        {/* Session Data */}
        {session && (
          <Card className="p-6 mt-6">
            <Typography variant="h3" className="text-xl font-semibold mb-4">
              Session Data
            </Typography>
            <pre className="bg-neutral-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </Card>
        )}
      </div>
    </div>
  )
}
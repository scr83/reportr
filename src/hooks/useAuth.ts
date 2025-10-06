'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useAuth(redirectTo?: string) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (!session && redirectTo) {
      router.push(redirectTo as any)
    }
  }, [session, status, router, redirectTo])

  return {
    session,
    user: session?.user,
    isLoading: status === 'loading',
    isAuthenticated: !!session,
    isUnauthenticated: !session && status !== 'loading',
  }
}

export function useRequireAuth(redirectTo: string = '/signin') {
  return useAuth(redirectTo)
}

export function useOptionalAuth() {
  const { data: session, status } = useSession()
  
  return {
    session,
    user: session?.user,
    isLoading: status === 'loading',
    isAuthenticated: !!session,
    isUnauthenticated: !session && status !== 'loading',
  }
}
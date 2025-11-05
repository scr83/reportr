import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export interface UserProfile {
  id: string
  name?: string
  email: string
  companyName?: string
  primaryColor: string
  logo?: string
  whiteLabelEnabled: boolean
  plan: string
  planExpires?: string | null
  trialStartDate?: string | null
  trialEndDate?: string | null
  trialUsed: boolean
}

export function useUserProfile() {
  const { data: session, status } = useSession()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      if (status === 'loading') return
      if (!session?.user) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/user/profile')
        
        if (!response.ok) {
          throw new Error('Failed to fetch user profile')
        }
        
        const userData = await response.json()
        setProfile(userData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [session, status])

  const refetch = async () => {
    if (!session?.user) return

    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/user/profile')
      
      if (!response.ok) {
        throw new Error('Failed to fetch user profile')
      }
      
      const userData = await response.json()
      setProfile(userData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return { 
    profile, 
    loading, 
    error, 
    refetch,
    isAuthenticated: !!session?.user 
  }
}
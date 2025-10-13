'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Typography } from '@/components/atoms/Typography'
import { Card, CardContent } from '@/components/atoms/Card'

export default function CompleteOnboardingPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [step, setStep] = useState<string>('Setting up your account...')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    async function completeOnboarding() {
      try {
        // Wait for session
        if (status === 'loading') return
        
        if (status === 'unauthenticated' || !session) {
          router.push('/onboarding/welcome')
          return
        }

        // Get onboarding data from localStorage
        const agencyData = localStorage.getItem('agencySetup')
        const clientData = localStorage.getItem('firstClient')
        const batchClients = localStorage.getItem('clientsBatch')
        const recommendedTier = localStorage.getItem('recommendedTier') || 'FREE'

        // Step 1: Update user profile with agency info and tier
        setStep('Setting up your agency profile...')
        const agency = agencyData ? JSON.parse(agencyData) : { companyName: '', website: '' }
        
        // Calculate trial expiry for paid tiers
        const planExpires = recommendedTier !== 'FREE' 
          ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
          : null
        
        const profileResponse = await fetch('/api/user/profile', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            companyName: agency.companyName,
            website: agency.website,
            plan: recommendedTier,
            planExpires: planExpires?.toISOString(),
          }),
        })

        if (!profileResponse.ok) {
          throw new Error('Failed to update profile')
        }

        // Step 2: Create client(s)
        let clientsCreated = 0
        
        // Handle single client (FREE tier)
        if (clientData) {
          setStep('Adding your first client...')
          const client = JSON.parse(clientData)
          
          const response = await fetch('/api/clients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              name: client.name,
              domain: client.domain,
              contactEmail: client.contactEmail,
            }),
          })

          if (!response.ok) {
            const data = await response.json()
            throw new Error(data.error || 'Failed to create client')
          }
          clientsCreated = 1
        }

        // Handle batch clients (paid tiers)
        if (batchClients) {
          const clients = JSON.parse(batchClients)
          
          if (clients.length > 0) {
            setStep(`Adding ${clients.length} clients...`)
            
            for (let i = 0; i < clients.length; i++) {
              const client = clients[i]
              
              // Only create if both name and domain are provided
              if (client.name?.trim() && client.domain?.trim()) {
                setStep(`Adding client ${i + 1} of ${clients.length}: ${client.name}`)
                
                const response = await fetch('/api/clients', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
                  body: JSON.stringify({
                    name: client.name,
                    domain: client.domain,
                    contactEmail: client.contactEmail || undefined,
                  }),
                })

                if (!response.ok) {
                  const data = await response.json()
                  console.error(`Failed to create client ${client.name}:`, data)
                  // Continue with other clients even if one fails
                } else {
                  clientsCreated++
                }
              }
            }
          }
        }

        // Clear all localStorage
        localStorage.removeItem('agencySetup')
        localStorage.removeItem('firstClient')
        localStorage.removeItem('clientsBatch')
        localStorage.removeItem('recommendedTier')
        localStorage.removeItem('agencyRole')
        localStorage.removeItem('clientCount')
        localStorage.removeItem('onboardingStep')

        // Redirect to dashboard
        setStep('Taking you to your dashboard...')
        setTimeout(() => {
          let redirectUrl = '/dashboard/clients?onboarding=complete'
          
          if (recommendedTier !== 'FREE') {
            redirectUrl += `&trial=${recommendedTier.toLowerCase()}`
          }
          
          if (clientsCreated > 0) {
            redirectUrl += `&clients_added=${clientsCreated}`
          }
          
          router.push(redirectUrl)
        }, 1000)

      } catch (err) {
        console.error('Onboarding completion error:', err)
        setError(err instanceof Error ? err.message : 'Failed to complete setup')
        // Even if something fails, still redirect to dashboard after delay
        setTimeout(() => {
          router.push('/dashboard/clients')
        }, 2000)
      }
    }

    completeOnboarding()
  }, [session, status, router])

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <Typography variant="h2" className="text-slate-900 mb-2">
              Almost There!
            </Typography>
            <Typography variant="body" className="text-slate-600 mb-4">
              {error}
            </Typography>
            <Typography variant="caption" className="text-slate-500">
              Redirecting to dashboard...
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="max-w-md">
        <CardContent className="p-8 text-center">
          {/* Loading Icon */}
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#9233ea]"></div>
          </div>

          {/* Status */}
          <Typography variant="h2" className="text-slate-900 mb-2">
            Welcome Aboard!
          </Typography>
          <Typography variant="body" className="text-slate-600">
            {step}
          </Typography>

          {/* Progress */}
          <div className="mt-6 w-full bg-slate-200 rounded-full h-2">
            <div className="bg-[#9233ea] h-2 rounded-full animate-pulse" style={{ width: '90%' }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

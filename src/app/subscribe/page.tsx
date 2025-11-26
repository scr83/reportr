'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { parsePlanFromQuery } from '@/lib/utils/paypal-plans'

function SubscribeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function initiateSubscription() {
      try {
        // Wait for session
        if (status === 'loading') return
        
        // Redirect to signin if not authenticated
        if (!session) {
          const planParam = searchParams.get('plan')
          const redirectUrl = planParam 
            ? `/auth/signin?plan=${planParam}&callbackUrl=/subscribe?plan=${planParam}`
            : '/auth/signin?callbackUrl=/subscribe'
          router.push(redirectUrl as any)
          return
        }

        // Parse plan selection
        const planQuery = searchParams.get('plan')
        const planSelection = parsePlanFromQuery(planQuery)

        if (!planSelection) {
          setError('Invalid plan selection. Please choose a plan from the pricing page.')
          setIsLoading(false)
          return
        }

        // Get PayPal plan ID using hardcoded mapping (same as backend)
        const getHardcodedPlanId = (tier: string, isTrial: boolean = true): string => {
          const trialPlanMap: Record<string, string> = {
            'starter': 'P-0X464499YG9822634NEQJ5XQ',      // STARTER trial
            'professional': 'P-09P26662R8680522DNEQJ7XY', // PRO trial  
            'agency': 'P-7SU477161L382370MNEQKCQQ',       // AGENCY trial
          }
          
          const directPlanMap: Record<string, string> = {
            'starter': 'P-6PJ50716H4431863PNEQKBLQ',      // STARTER direct
            'professional': 'P-90W906144W5364313NEQKB5I', // PRO direct
            'agency': 'P-0KW62605U4011430FNEQKDCY',       // AGENCY direct
          }
          
          const planMap = isTrial ? trialPlanMap : directPlanMap
          const planId = planMap[tier.toLowerCase()]
          
          if (!planId) {
            throw new Error(`No PayPal plan ID found for tier: ${tier}, isTrial: ${isTrial}`)
          }
          return planId
        }
        
        // Check if this is a trial or direct subscription (default to trial)
        const isTrial = searchParams.get('type') !== 'direct'
        const paypalPlanId = getHardcodedPlanId(planSelection.tier, isTrial)

        console.log('Creating subscription:', {
          tier: planSelection.tier,
          whiteLabelEnabled: planSelection.whiteLabelEnabled,
          paypalPlanId
        })

        // Call existing PayPal API
        const response = await fetch('/api/payments/create-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            planId: paypalPlanId,
            plan: planSelection.tier.toUpperCase() // Convert to match database enum
          })
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to create subscription')
        }

        const data = await response.json()

        if (!data.approvalUrl) {
          throw new Error('No approval URL received from PayPal')
        }

        // Redirect to PayPal
        console.log('Redirecting to PayPal:', data.approvalUrl)
        window.location.href = data.approvalUrl

      } catch (err) {
        console.error('Subscription error:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
        setIsLoading(false)
      }
    }

    initiateSubscription()
  }, [session, status, searchParams, router])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="text-red-600 text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold mb-4">Subscription Error</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <a
              href="/pricing"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Back to Pricing
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="animate-spin text-purple-600 text-5xl mb-4">⏳</div>
          <h1 className="text-2xl font-bold mb-4">
            {isLoading ? 'Setting up your subscription...' : 'Redirecting to PayPal...'}
          </h1>
          <p className="text-gray-600">
            Please wait while we redirect you to PayPal to complete your subscription.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="animate-spin text-purple-600 text-5xl mb-4">⏳</div>
            <h1 className="text-2xl font-bold mb-4">Loading...</h1>
            <p className="text-gray-600">Setting up your subscription...</p>
          </div>
        </div>
      </div>
    }>
      <SubscribeContent />
    </Suspense>
  )
}
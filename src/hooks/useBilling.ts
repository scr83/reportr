import { useState, useEffect } from 'react'

export interface PaymentHistory {
  id: string
  paypalOrderId: string
  amount: string
  currency: string
  status: string
  plan: string
  createdAt: string
}

export interface BillingData {
  subscription: {
    plan: string
    status: string
    planExpires: string | null
    billingCycleStart: string
    billingCycleEnd: string | null
    paypalSubscriptionId: string | null
    paypalCustomerId: string | null
    cancelledAt: string | null
    subscriptionEndDate: string | null
  }
  payments: PaymentHistory[]
}

export function useBilling() {
  const [data, setData] = useState<BillingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBillingData() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/user/billing')
        
        if (!response.ok) {
          throw new Error('Failed to fetch billing data')
        }
        
        const billingData = await response.json()
        setData(billingData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchBillingData()
  }, [])

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/user/billing')
      
      if (!response.ok) {
        throw new Error('Failed to fetch billing data')
      }
      
      const billingData = await response.json()
      setData(billingData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}
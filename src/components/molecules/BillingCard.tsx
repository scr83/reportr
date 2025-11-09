import React, { useState } from 'react'
import { Card, Typography, Button } from '@/components/atoms'
import { CreditCard, Calendar, DollarSign, ExternalLink, AlertTriangle } from 'lucide-react'
import { BillingData } from '@/hooks/useBilling'
import { UpgradeModal } from '@/components/organisms/UpgradeModal'
import { Plan } from '@prisma/client'

interface BillingCardProps {
  data: BillingData
  loading?: boolean
}

export function BillingCard({ data, loading }: BillingCardProps) {
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  
  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </Card>
    )
  }

  const { subscription } = data

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPlanDisplayName = (plan: string) => {
    switch (plan) {
      case 'FREE': return 'Free Plan'
      case 'STARTER': return 'Starter Plan'
      case 'PROFESSIONAL': return 'Professional Plan'
      case 'ENTERPRISE': return 'Enterprise Plan'
      default: return plan
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'cancelled': 
      case 'canceled': return 'text-red-600 bg-red-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'free': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }


  const handleCancelSubscription = async () => {
    setCancelling(true)
    
    try {
      const response = await fetch('/api/subscription/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel subscription')
      }

      // Show success message with access details
      const accessDate = data.accessUntil 
        ? new Date(data.accessUntil).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : 'the end of your billing period'

      alert(`Subscription cancelled successfully. You will retain access until ${accessDate}.`)
      
      // Refresh page to update UI
      window.location.reload()
      
    } catch (error: any) {
      console.error('Cancel error:', error)
      alert(error.message || 'Failed to cancel subscription. Please try again.')
    } finally {
      setCancelling(false)
      setShowCancelModal(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <CreditCard className="h-5 w-5 mr-2" />
        Billing & Subscription
      </h2>
      
      <div className="space-y-4">
        {/* Current Plan */}
        <div className="flex items-center justify-between">
          <div>
            <Typography className="text-sm font-medium text-gray-700">Current Plan</Typography>
            <Typography className="text-lg font-bold text-gray-900">
              {getPlanDisplayName(subscription.plan)}
            </Typography>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(subscription.status)}`}>
            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
          </span>
        </div>

        {/* Subscription Details */}
        {subscription.paypalSubscriptionId && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Subscription ID</span>
              <span className="text-sm font-mono text-gray-900">
                {subscription.paypalSubscriptionId.substring(0, 8)}...
              </span>
            </div>
            
            {subscription.billingCycleEnd && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Next Billing Date
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {formatDate(subscription.billingCycleEnd)}
                </span>
              </div>
            )}

            {subscription.planExpires && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Plan Expires</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatDate(subscription.planExpires)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Cancellation Status Message */}
        {subscription.status === 'cancelled' && subscription.subscriptionEndDate && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-amber-900">
                  Subscription Cancelled
                </h3>
                <p className="mt-1 text-sm text-amber-700">
                  Your subscription is cancelled. You&apos;ll retain access to {subscription.plan} features until{' '}
                  <strong>{formatDate(subscription.subscriptionEndDate)}</strong>. After that, your account 
                  will automatically switch to the FREE plan.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Free Plan Message */}
        {subscription.plan === 'FREE' && subscription.status !== 'cancelled' && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <Typography className="text-sm text-blue-800">
              You&apos;re currently on the free plan. Upgrade to unlock more features and generate unlimited reports.
            </Typography>
          </div>
        )}

        {/* Payment Management Section - Always Visible */}
        <div className="space-y-3 mt-6 pt-6 border-t">
          {/* Status Message */}
          <p className="text-sm text-gray-600 mb-3">
            {subscription.paypalSubscriptionId ? (
              <>Your subscription is managed through PayPal</>
            ) : subscription.plan !== 'FREE' ? (
              <>Set up your payment method to manage your subscription</>
            ) : (
              <>Upgrade to access payment management features</>
            )}
          </p>
          
          {/* Manage Payment Method Button */}
          <a
            href="https://www.paypal.com/myaccount/autopay"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <CreditCard className="h-4 w-4" />
            Manage Payment Method
            <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
          </a>

          {/* Cancel Subscription Button - Only if has PayPal subscription */}
          {subscription.paypalSubscriptionId ? (
            <button
              onClick={() => setShowCancelModal(true)}
              disabled={subscription.status === 'cancelled'}
              className="w-full px-4 py-2.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {subscription.status === 'cancelled' 
                ? 'Subscription Cancelled' 
                : 'Cancel Subscription'}
            </button>
          ) : subscription.plan !== 'FREE' ? (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="w-full px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Complete Payment Setup
            </button>
          ) : (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="w-full px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Upgrade to Premium
            </button>
          )}
        </div>
      </div>

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-amber-900">Cancel {getPlanDisplayName(subscription.plan)}?</h3>
            </div>
            
            <div className="mb-6 space-y-3">
              <p className="text-gray-700">
                Are you sure you want to cancel your subscription?
              </p>
              
              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                <p className="font-medium text-gray-900 text-sm">What happens next:</p>
                <ul className="text-sm text-gray-600 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>You&apos;ll keep full access until the end of your current billing period</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">→</span>
                    <span>After that, you&apos;ll be downgraded to the FREE plan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">✗</span>
                    <span>FREE plan limits: 1 client, 5 reports/month</span>
                  </li>
                </ul>
              </div>

              <p className="text-xs text-gray-500">
                You can reactivate your subscription anytime before the billing period ends.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowCancelModal(false)}
                disabled={cancelling}
                variant="outline"
                className="flex-1"
              >
                Keep Subscription
              </Button>
              <Button
                onClick={handleCancelSubscription}
                disabled={cancelling}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <UpgradeModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          currentPlan={subscription.plan as Plan}
          context="general"
        />
      )}
    </Card>
  )
}
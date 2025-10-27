import React from 'react'
import { Card, Typography, Button } from '@/components/atoms'
import { CreditCard, Calendar, DollarSign, ExternalLink } from 'lucide-react'
import { BillingData } from '@/hooks/useBilling'

interface BillingCardProps {
  data: BillingData
  loading?: boolean
}

export function BillingCard({ data, loading }: BillingCardProps) {
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

  const handleManageSubscription = () => {
    if (subscription.paypalSubscriptionId) {
      // Redirect to PayPal subscription management
      window.open('https://www.paypal.com/myaccount/autopay/', '_blank')
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

        {/* Free Plan Message */}
        {subscription.plan === 'FREE' && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <Typography className="text-sm text-blue-800">
              You&apos;re currently on the free plan. Upgrade to unlock more features and generate unlimited reports.
            </Typography>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          {subscription.plan !== 'FREE' && subscription.paypalSubscriptionId && (
            <Button
              onClick={handleManageSubscription}
              variant="outline"
              size="sm"
              className="flex items-center"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Manage Subscription
            </Button>
          )}
          
          {subscription.plan === 'FREE' && (
            <a
              href="https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-09S98046PD2685338ND3AO4Q"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center btn-primary-themed text-sm"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Upgrade Plan
            </a>
          )}
        </div>
      </div>
    </Card>
  )
}
import React from 'react'
import { Card, Typography } from '@/components/atoms'
import { Receipt, Download } from 'lucide-react'
import { PaymentHistory as PaymentData } from '@/hooks/useBilling'

interface PaymentHistoryProps {
  payments: PaymentData[]
  loading?: boolean
}

export function PaymentHistory({ payments, loading }: PaymentHistoryProps) {
  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatAmount = (amount: string, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(parseFloat(amount))
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'failed': return 'text-red-600 bg-red-100'
      case 'refunded': return 'text-primary-themed bg-primary-themed-light'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPlanDisplayName = (plan: string) => {
    switch (plan) {
      case 'STARTER': return 'Starter'
      case 'PROFESSIONAL': return 'Professional'
      case 'AGENCY': return 'Agency'
      default: return plan
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Receipt className="h-5 w-5 mr-2" />
        Payment History
      </h2>
      
      {payments.length === 0 ? (
        <div className="text-center py-8">
          <Receipt className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <Typography className="text-gray-500">No payment history available</Typography>
          <Typography className="text-sm text-gray-400 mt-1">
            Your payment history will appear here once you make your first purchase.
          </Typography>
        </div>
      ) : (
        <div className="space-y-3">
          {payments.map((payment) => (
            <div 
              key={payment.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <Typography className="font-medium text-gray-900">
                    {getPlanDisplayName(payment.plan)} Plan
                  </Typography>
                  <Typography className="font-bold text-gray-900">
                    {formatAmount(payment.amount, payment.currency)}
                  </Typography>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {formatDate(payment.createdAt)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1).toLowerCase()}
                    </span>
                    <span className="text-gray-400 font-mono text-xs">
                      {payment.paypalOrderId.substring(0, 8)}...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {payments.length >= 10 && (
            <div className="text-center pt-4">
              <Typography className="text-sm text-gray-500">
                Showing last 10 transactions
              </Typography>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
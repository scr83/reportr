'use client'

import React, { useState } from 'react'
import { Modal } from '@/components/organisms/Modal'
import { Button, Typography } from '@/components/atoms'
import { Check, ArrowRight, X, Zap } from 'lucide-react'
import { Plan } from '@prisma/client'
import { cn } from '@/lib/utils'

export interface UpgradeOption {
  plan: 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'
  name: string
  price: number
  whiteLabelPrice?: number
  period: string
  features: string[]
  highlighted?: boolean
  ctaText: string
}

export interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  currentPlan: Plan
  context: 'white-label' | 'reports' | 'clients' | 'general'
  limitInfo?: {
    current: number
    limit: number
    type: string
  }
}

/**
 * Context-aware upgrade modal that shows relevant upgrade paths
 */
export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  currentPlan,
  context,
  limitInfo
}) => {
  const [loading, setLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  /**
   * Get upgrade options based on current plan and context
   */
  const getUpgradeOptions = (): UpgradeOption[] => {
    const allOptions: UpgradeOption[] = [
      {
        plan: 'STARTER',
        name: 'Starter',
        price: 29,
        whiteLabelPrice: 20,
        period: 'month',
        features: [
          'Up to 5 clients',
          '25 reports per month',
          'Advanced SEO analytics',
          'Custom branding',
          'Priority email support',
          'API access'
        ],
        ctaText: 'Upgrade to Starter'
      },
      {
        plan: 'PROFESSIONAL',
        name: 'Professional',
        price: 99,
        whiteLabelPrice: 20,
        period: 'month',
        features: [
          'Up to 15 clients',
          '75 reports per month',
          'Everything in Starter',
          'Custom report templates',
          'Priority support',
          'Team collaboration',
          'White-label included'
        ],
        highlighted: true,
        ctaText: 'Upgrade to Professional'
      },
      {
        plan: 'ENTERPRISE',
        name: 'Agency',
        price: 199,
        whiteLabelPrice: 20,
        period: 'month',
        features: [
          'Up to 50 clients',
          '250 reports per month',
          'Everything in Professional',
          'Dedicated account manager',
          'Custom integrations',
          'Priority support',
          'White-label included'
        ],
        ctaText: 'Upgrade to Agency'
      }
    ]

    // Filter based on current plan - only show higher tiers
    const currentIndex = {
      'FREE': -1,
      'STARTER': 0,
      'PROFESSIONAL': 1,
      'ENTERPRISE': 2
    }[currentPlan]

    let availableOptions = allOptions.filter((_, index) => index > currentIndex)

    // Context-specific logic
    if (context === 'white-label') {
      // For white-label context, focus on plans that include it or can add it
      if (currentPlan === 'STARTER') {
        // STARTER user wanting white-label: show both options
        const starterOption = allOptions.find(opt => opt.plan === 'STARTER')
        const starterBasePrice = starterOption?.price || 29
        const whiteLabelPrice = starterOption?.whiteLabelPrice || 20
        
        availableOptions = [
          {
            plan: 'STARTER',
            name: 'Starter + White-Label',
            price: starterBasePrice + whiteLabelPrice, // Dynamic pricing
            period: 'month',
            features: [
              'Up to 5 clients',
              '25 reports per month',
              'Advanced SEO analytics',
              'White-label branding ✨',
              'Custom company name & logo',
              'Priority email support',
              'API access'
            ],
            highlighted: true,
            ctaText: 'Add White-Label (+$20/mo)'
          },
          ...availableOptions.map(opt => ({
            ...opt,
            features: opt.features.includes('White-label included') 
              ? opt.features 
              : [...opt.features, 'White-label branding ✨']
          }))
        ]
      } else if (currentPlan === 'FREE') {
        // FREE user wanting white-label: show Professional as recommended
        availableOptions = availableOptions.map(opt => 
          opt.plan === 'PROFESSIONAL' 
            ? { ...opt, highlighted: true }
            : opt
        )
      }
    } else if (context === 'reports' || context === 'clients') {
      // For limits context, just show next logical upgrade
      if (availableOptions.length > 1) {
        availableOptions = availableOptions.slice(0, 1) // Show only the next tier
      }
    }

    return availableOptions
  }

  /**
   * Get context-specific messaging
   */
  const getContextMessage = () => {
    const messages = {
      'white-label': {
        title: 'Upgrade for White-Label Branding',
        subtitle: 'Add your agency branding to all reports and remove our logo'
      },
      'reports': {
        title: 'Upgrade for More Reports',
        subtitle: limitInfo 
          ? `You've used ${limitInfo.current}/${limitInfo.limit} ${limitInfo.type}. Upgrade for unlimited access.`
          : 'Get more reports per month with a higher plan'
      },
      'clients': {
        title: 'Upgrade for More Clients',
        subtitle: limitInfo 
          ? `You've reached your limit of ${limitInfo.limit} clients. Upgrade to add more.`
          : 'Manage more clients with a higher plan'
      },
      'general': {
        title: 'Upgrade Your Plan',
        subtitle: 'Unlock more features and higher limits'
      }
    }

    return messages[context]
  }

  /**
   * Handle upgrade selection
   */
  const handleUpgrade = async (option: UpgradeOption) => {
    setLoading(true)
    setSelectedOption(option.plan)

    try {
      // Determine if adding white-label
      const isAddingWhiteLabel = context === 'white-label' || option.name.includes('White-Label')
      
      // Call the upgrade API
      const response = await fetch('/api/subscription/upgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetPlan: option.plan.toLowerCase(),
          addWhiteLabel: isAddingWhiteLabel,
          context: context
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Upgrade failed')
      }

      if (result.requiresPayment && result.approvalUrl) {
        // Redirect to PayPal for payment
        window.location.href = result.approvalUrl
      } else if (result.planUpdated) {
        // Plan was updated successfully (for existing subscribers)
        window.location.reload() // Reload to show updated plan
      }
    } catch (error) {
      console.error('Upgrade error:', error)
      // TODO: Show toast notification with error
      alert(`Upgrade failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
      setSelectedOption(null)
    }
  }

  const contextMessage = getContextMessage()
  const upgradeOptions = getUpgradeOptions()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      className="max-w-4xl"
    >
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mb-4">
            <Zap className="h-6 w-6 text-purple-600" />
          </div>
          
          <Typography variant="h2" className="text-2xl font-bold text-gray-900 mb-2">
            {contextMessage.title}
          </Typography>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            {contextMessage.subtitle}
          </p>

          {/* Current plan indicator */}
          <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
            Current plan: <span className="font-semibold ml-1">{currentPlan}</span>
          </div>
        </div>

        {/* Upgrade Options */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          {upgradeOptions.map((option) => (
            <div
              key={option.plan}
              className={cn(
                'relative rounded-lg border p-6 transition-all',
                option.highlighted 
                  ? 'border-purple-200 bg-purple-50 ring-2 ring-purple-100' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              )}
            >
              {option.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-600 text-white">
                    Recommended
                  </span>
                </div>
              )}

              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {option.name}
                </h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${option.price}
                  </span>
                  <span className="text-gray-600">/{option.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                onClick={() => handleUpgrade(option)}
                loading={loading && selectedOption === option.plan}
                disabled={loading}
                className={cn(
                  'w-full',
                  option.highlighted 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'bg-gray-900 hover:bg-gray-800'
                )}
              >
                {option.ctaText}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center border-t pt-4">
          <p className="text-sm text-gray-600 mb-3">
            Need help choosing? View our full feature comparison.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Maybe later
            </button>
            <a
              href="/pricing"
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              View detailed comparison →
            </a>
          </div>
        </div>
      </div>
    </Modal>
  )
}

UpgradeModal.displayName = 'UpgradeModal'
'use client';

import React from 'react';
import { Plan } from '@prisma/client';
import { AlertTriangle, Check, ArrowRight, X } from 'lucide-react';
import { Modal } from '@/components/organisms/Modal';
import { Button, Typography } from '@/components/atoms';
import { getPlanDisplayInfo } from '@/lib/utils/trial-helpers';
import { getPlanLimits } from '@/lib/plan-limits';
import { cn } from '@/lib/utils';

export interface UpgradePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: Plan;
  suggestedPlan: Plan;
  usageType: 'clients' | 'reports';
  currentUsage: number;
  currentLimit: number;
  onUpgradeClick?: () => void;
}

/**
 * UpgradePromptModal Component
 * 
 * Proactive modal that appears when users approach their plan limits (80%+).
 * Shows only once per session to avoid spam. Displays clear benefit comparison
 * between current and suggested plan tiers.
 * 
 * @param isOpen - Whether the modal is open
 * @param onClose - Callback to close the modal
 * @param currentPlan - User's current plan
 * @param suggestedPlan - Recommended upgrade plan
 * @param usageType - Type of usage that triggered the prompt
 * @param currentUsage - Current usage amount
 * @param currentLimit - Current plan limit
 * @param onUpgradeClick - Optional callback for upgrade action
 */
export const UpgradePromptModal: React.FC<UpgradePromptModalProps> = ({
  isOpen,
  onClose,
  currentPlan,
  suggestedPlan,
  usageType,
  currentUsage,
  currentLimit,
  onUpgradeClick,
}) => {
  const currentPlanInfo = getPlanDisplayInfo(currentPlan);
  const suggestedPlanInfo = getPlanDisplayInfo(suggestedPlan);
  const currentLimits = getPlanLimits(currentPlan);
  const suggestedLimits = getPlanLimits(suggestedPlan);
  
  const usagePercentage = ((currentUsage / currentLimit) * 100).toFixed(0);
  
  const getUsageLabel = () => {
    return usageType === 'clients' ? 'clients' : 'monthly reports';
  };
  
  const getUsageIcon = () => {
    return usageType === 'clients' ? '👥' : '📊';
  };
  
  const handleUpgrade = () => {
    if (onUpgradeClick) {
      onUpgradeClick();
    } else {
      // Default to redirect to pricing page
      window.location.href = '/pricing';
    }
    onClose();
  };

  const benefits = [
    {
      key: 'clients',
      current: currentLimits.clients,
      suggested: suggestedLimits.clients,
      label: 'Clients',
      multiplier: Math.round(suggestedLimits.clients / currentLimits.clients),
    },
    {
      key: 'reports',
      current: currentLimits.reportsPerMonth,
      suggested: suggestedLimits.reportsPerMonth,
      label: 'Reports per month',
      multiplier: Math.round(suggestedLimits.reportsPerMonth / currentLimits.reportsPerMonth),
    },
  ];

  if (suggestedLimits.whiteLabelEnabled && !currentLimits.whiteLabelEnabled) {
    benefits.push({
      key: 'whiteLabel',
      current: 0,
      suggested: 1,
      label: 'White-label branding',
      multiplier: 0,
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      className="max-w-lg"
    >
      <div className="text-center">
        {/* Warning Icon */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 mb-4">
          <AlertTriangle className="h-6 w-6 text-yellow-600" />
        </div>

        {/* Title */}
        <Typography variant="h3" className="text-lg font-semibold text-gray-900 mb-2">
          You&apos;re Approaching Your Plan Limit
        </Typography>

        {/* Usage Description */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">
            You&apos;re using <span className="font-semibold text-gray-900">{currentUsage}/{currentLimit} {getUsageLabel()}</span> on the{' '}
            <span className={cn('font-semibold', currentPlanInfo.color)}>
              {currentPlanInfo.name}
            </span> plan.
          </p>
          
          <div className={cn(
            'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
            parseInt(usagePercentage) >= 90 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
          )}>
            {getUsageIcon()} {usagePercentage}% used
          </div>
        </div>

        {/* Upgrade Benefits */}
        <div className="text-left mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-600">Upgrade to</span>
            <span className={cn('font-semibold', suggestedPlanInfo.color)}>
              {suggestedPlanInfo.name}
            </span>
            <span className="text-sm text-gray-600">and get:</span>
          </div>
          
          <div className="space-y-3">
            {benefits.map((benefit) => (
              <div key={benefit.key} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  {benefit.key === 'whiteLabel' ? (
                    <span className="text-sm text-gray-700">
                      <span className="font-semibold">{benefit.label}</span>
                    </span>
                  ) : (
                    <span className="text-sm text-gray-700">
                      <span className="font-semibold">{benefit.suggested} {benefit.label.toLowerCase()}</span>
                      {benefit.multiplier > 1 && (
                        <span className="text-green-600 ml-1">
                          ({benefit.multiplier}x more!)
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            {/* Additional benefits for higher tiers */}
            {suggestedPlan === 'PROFESSIONAL' && (
              <>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">
                    <span className="font-semibold">Priority support</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">
                    <span className="font-semibold">Advanced analytics</span>
                  </span>
                </div>
              </>
            )}
            
            {suggestedPlan === 'ENTERPRISE' && (
              <>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">
                    <span className="font-semibold">Dedicated support</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">
                    <span className="font-semibold">Custom integrations</span>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={handleUpgrade}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <span>Upgrade to {suggestedPlanInfo.name}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="md"
            onClick={onClose}
            className="flex-1"
          >
            Maybe Later
          </Button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-500 mt-4">
          This notification shows once per session when you approach your limits.
        </p>
      </div>
    </Modal>
  );
};

UpgradePromptModal.displayName = 'UpgradePromptModal';
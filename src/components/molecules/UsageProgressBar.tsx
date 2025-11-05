'use client';

import React from 'react';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/atoms';
import { 
  getUsagePercentage, 
  getUsageColors 
} from '@/lib/utils/trial-helpers';
import { cn } from '@/lib/utils';

export interface UsageProgressBarProps {
  current: number;
  limit: number;
  label: string;
  warningThreshold?: number;
  onUpgradeClick?: () => void;
  className?: string;
}

/**
 * UsageProgressBar Component
 * 
 * Displays usage progress with color-coded indicators:
 * - Green: 0-70% used
 * - Yellow: 70-90% used  
 * - Red: 90-100% used
 * 
 * Shows warning message at configurable threshold (default 80%).
 * 
 * @param current - Current usage amount
 * @param limit - Maximum allowed amount
 * @param label - Label to display (e.g., "Clients", "Reports this month")
 * @param warningThreshold - Percentage threshold for warning (default 0.8)
 * @param onUpgradeClick - Optional callback for upgrade button
 * @param className - Additional CSS classes
 */
export const UsageProgressBar: React.FC<UsageProgressBarProps> = ({
  current,
  limit,
  label,
  warningThreshold = 0.8,
  onUpgradeClick,
  className,
}) => {
  const percentage = getUsagePercentage(current, limit);
  const colors = getUsageColors(percentage);
  const isOverWarningThreshold = percentage >= (warningThreshold * 100);
  const isAtLimit = current >= limit;
  
  const getWarningMessage = () => {
    if (isAtLimit) {
      return 'Limit reached - Upgrade to add more';
    }
    if (isOverWarningThreshold) {
      return 'Approaching limit - Upgrade for more';
    }
    return null;
  };
  
  const warningMessage = getWarningMessage();

  return (
    <div
      className={cn(
        'rounded-lg border bg-white p-4 transition-all duration-200',
        isAtLimit ? 'border-red-300 bg-red-50' : 
        isOverWarningThreshold ? 'border-yellow-300 bg-yellow-50' : 
        'border-gray-200',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{label}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={cn('text-2xl font-bold', colors.text)}>
            {current.toLocaleString()}
          </span>
          <span className="text-sm text-gray-600">
            / {limit.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            colors.bg
          )}
          style={{ 
            width: `${Math.min(percentage, 100)}%`,
            transition: 'width 0.5s ease-out'
          }}
        />
      </div>

      {/* Usage Stats */}
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-gray-600">
          {percentage.toFixed(1)}% used
        </span>
        <span className="text-gray-600">
          {Math.max(0, limit - current).toLocaleString()} remaining
        </span>
      </div>

      {/* Warning Message & Upgrade Button */}
      {warningMessage && (
        <div className={cn(
          'flex items-start gap-2 p-3 rounded-md',
          isAtLimit ? 'bg-red-100' : 'bg-yellow-100'
        )}>
          <div className={cn(
            'flex-shrink-0 mt-0.5',
            isAtLimit ? 'text-red-600' : 'text-yellow-600'
          )}>
            {isAtLimit ? (
              <AlertTriangle className="w-4 h-4" />
            ) : (
              <TrendingUp className="w-4 h-4" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className={cn(
              'text-sm font-medium',
              isAtLimit ? 'text-red-800' : 'text-yellow-800'
            )}>
              {warningMessage}
            </p>
            
            {onUpgradeClick && (
              <Button
                size="sm"
                variant={isAtLimit ? 'error' : 'warning'}
                onClick={onUpgradeClick}
                className="mt-2 text-xs"
              >
                {isAtLimit ? 'Upgrade Now' : 'View Plans'}
              </Button>
            )}
          </div>
        </div>
      )}
      
      {/* No Warning State */}
      {!warningMessage && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            You&apos;re within your plan limits
          </span>
          
          {onUpgradeClick && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onUpgradeClick}
              className="text-xs text-gray-600 hover:text-gray-900"
            >
              Upgrade Plan
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

UsageProgressBar.displayName = 'UsageProgressBar';
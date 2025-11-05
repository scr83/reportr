'use client';

import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/atoms';
import { 
  getDaysRemainingInTrial, 
  getTrialUrgency, 
  formatTrialCountdown,
  getTrialUrgencyColors
} from '@/lib/utils/trial-helpers';
import { cn } from '@/lib/utils';

export interface TrialCountdownProps {
  trialEndDate: Date;
  onUpgradeClick: () => void;
  className?: string;
}

/**
 * TrialCountdown Component
 * 
 * Displays the remaining time in a user's trial period with urgency-based styling.
 * Shows green for >7 days, yellow for 3-7 days, and red for <3 days remaining.
 * 
 * @param trialEndDate - Date when the trial expires
 * @param onUpgradeClick - Callback when upgrade button is clicked
 * @param className - Additional CSS classes
 */
export const TrialCountdown: React.FC<TrialCountdownProps> = ({
  trialEndDate,
  onUpgradeClick,
  className,
}) => {
  const daysRemaining = getDaysRemainingInTrial(trialEndDate);
  const urgency = getTrialUrgency(daysRemaining);
  const colors = getTrialUrgencyColors(urgency);
  const countdownText = formatTrialCountdown(daysRemaining);
  
  // Don't render if trial has expired
  if (daysRemaining <= 0) {
    return null;
  }
  
  const getUrgencyMessage = () => {
    if (urgency === 'critical') {
      return 'Upgrade Now!';
    }
    return 'Upgrade';
  };
  
  const getIcon = () => {
    if (urgency === 'critical') {
      return <ArrowRight className="w-4 h-4" />;
    }
    return <Clock className="w-4 h-4" />;
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-2 rounded-lg border-2 transition-all duration-200',
        colors.bg,
        colors.border,
        className
      )}
    >
      {/* Icon */}
      <div className={cn('flex-shrink-0', colors.icon)}>
        {getIcon()}
      </div>
      
      {/* Trial Text */}
      <div className="flex-1 min-w-0">
        <div className={cn('text-sm font-medium', colors.text)}>
          Trial: {countdownText}
        </div>
      </div>
      
      {/* Upgrade Button */}
      <Button
        size="sm"
        variant={urgency === 'critical' ? 'error' : urgency === 'warning' ? 'warning' : 'primary'}
        onClick={onUpgradeClick}
        className={cn(
          'flex items-center gap-1.5 text-xs font-semibold transition-all duration-200',
          colors.button,
          urgency === 'critical' && 'animate-pulse'
        )}
      >
        <span>{getUrgencyMessage()}</span>
        {urgency === 'critical' && <ArrowRight className="w-3 h-3" />}
      </Button>
    </div>
  );
};

TrialCountdown.displayName = 'TrialCountdown';
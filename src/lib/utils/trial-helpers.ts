import { Plan } from '@prisma/client';

/**
 * Calculate the number of days remaining in a trial period
 * @param trialEndDate - The trial end date
 * @returns Number of days remaining (can be negative if trial has expired)
 */
export function getDaysRemainingInTrial(trialEndDate: Date): number {
  const now = new Date();
  const end = new Date(trialEndDate);
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Get trial urgency level based on days remaining
 * @param daysRemaining - Number of days remaining in trial
 * @returns Urgency level for UI styling
 */
export function getTrialUrgency(daysRemaining: number): 'safe' | 'warning' | 'critical' {
  if (daysRemaining > 7) return 'safe';
  if (daysRemaining > 3) return 'warning';
  return 'critical';
}

/**
 * Calculate usage percentage
 * @param current - Current usage amount
 * @param limit - Maximum allowed amount
 * @returns Percentage as a number between 0 and 100
 */
export function getUsagePercentage(current: number, limit: number): number {
  if (limit === 0) return 0;
  return Math.min((current / limit) * 100, 100);
}

/**
 * Determine if upgrade prompt should be shown based on usage
 * @param clientUsage - Current client usage percentage
 * @param reportUsage - Current report usage percentage
 * @param threshold - Threshold percentage to trigger prompt (default 80)
 * @returns Whether to show upgrade prompt
 */
export function shouldShowUpgradePrompt(
  clientUsage: number,
  reportUsage: number,
  threshold: number = 80
): boolean {
  return clientUsage >= threshold || reportUsage >= threshold;
}

/**
 * Get the next tier plan recommendation
 * @param currentPlan - User's current plan
 * @returns Recommended next plan tier
 */
export function getNextTier(currentPlan: Plan): Plan {
  const tierOrder: Plan[] = ['FREE', 'STARTER', 'PROFESSIONAL', 'AGENCY'];
  const currentIndex = tierOrder.indexOf(currentPlan);
  
  // If already at highest tier or plan not found, stay at current
  if (currentIndex === -1 || currentIndex >= tierOrder.length - 1) {
    return currentPlan;
  }
  
  const nextTier = tierOrder[currentIndex + 1];
  return nextTier || currentPlan;
}

/**
 * Format trial countdown text for display
 * @param daysRemaining - Number of days remaining
 * @returns Formatted countdown text
 */
export function formatTrialCountdown(daysRemaining: number): string {
  if (daysRemaining <= 0) {
    return 'Trial expired';
  }
  
  if (daysRemaining === 1) {
    return '1 day remaining';
  }
  
  if (daysRemaining < 7) {
    return `${daysRemaining} days remaining`;
  }
  
  return `${daysRemaining} days remaining`;
}

/**
 * Get urgency colors for trial countdown
 * @param urgency - Urgency level
 * @returns CSS classes for styling
 */
export function getTrialUrgencyColors(urgency: 'safe' | 'warning' | 'critical') {
  const colors = {
    safe: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: 'text-green-600',
      button: 'hover:bg-green-100',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: 'text-yellow-600',
      button: 'hover:bg-yellow-100',
    },
    critical: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: 'text-red-600',
      button: 'hover:bg-red-100',
    },
  };
  
  return colors[urgency];
}

/**
 * Get usage colors based on percentage
 * @param percentage - Usage percentage
 * @returns CSS classes for progress bar styling
 */
export function getUsageColors(percentage: number) {
  if (percentage >= 90) {
    return {
      bg: 'bg-red-500',
      text: 'text-red-800',
      warning: 'text-red-700',
    };
  }
  
  if (percentage >= 70) {
    return {
      bg: 'bg-yellow-500',
      text: 'text-yellow-800',
      warning: 'text-yellow-700',
    };
  }
  
  return {
    bg: 'bg-green-500',
    text: 'text-green-800',
    warning: 'text-green-700',
  };
}

/**
 * Check if user should see trial countdown
 * @param user - User object with trial fields
 * @returns Whether to show trial countdown
 */
export function shouldShowTrialCountdown(user: {
  trialUsed: boolean;
  trialEndDate: Date | null;
}): boolean {
  if (!user.trialUsed || !user.trialEndDate) {
    return false;
  }
  
  const daysRemaining = getDaysRemainingInTrial(user.trialEndDate);
  return daysRemaining > 0; // Only show if trial is still active
}

/**
 * Get plan display information
 * @param plan - Plan enum value
 * @returns Display information for the plan
 */
export function getPlanDisplayInfo(plan: Plan) {
  const planInfo = {
    FREE: {
      name: 'Free',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
    },
    STARTER: {
      name: 'Starter',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    PROFESSIONAL: {
      name: 'Professional',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    AGENCY: {
      name: 'Enterprise',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  };
  
  return planInfo[plan] || planInfo.FREE;
}
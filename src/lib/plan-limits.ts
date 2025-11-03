import { Plan } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export interface PlanLimits {
  clients: number;
  reportsPerMonth: number;
  whiteLabelEnabled: boolean;
  planName: string;
}

/**
 * Get limits for a specific plan tier
 */
export function getPlanLimits(plan: Plan): PlanLimits {
  const limits: Record<Plan, PlanLimits> = {
    FREE: {
      clients: 1,
      reportsPerMonth: 5,
      whiteLabelEnabled: false,
      planName: 'Free',
    },
    STARTER: {
      clients: 5,
      reportsPerMonth: 25, // CORRECTED: Was 20 in spec, now 25
      whiteLabelEnabled: false,
      planName: 'Starter',
    },
    PROFESSIONAL: {
      clients: 15,
      reportsPerMonth: 75,
      whiteLabelEnabled: true,
      planName: 'Professional',
    },
    ENTERPRISE: {
      clients: 50,
      reportsPerMonth: 250,
      whiteLabelEnabled: true,
      planName: 'Enterprise',
    },
  };

  return limits[plan];
}

/**
 * Check if user can add another client
 */
export async function canAddClient(userId: string): Promise<{
  allowed: boolean;
  reason?: string;
  currentCount: number;
  limit: number;
}> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      clients: true,
    },
  });

  if (!user) {
    return { allowed: false, reason: 'User not found', currentCount: 0, limit: 0 };
  }

  const limits = getPlanLimits(user.plan);
  const currentCount = user.clients.length;

  if (currentCount >= limits.clients) {
    return {
      allowed: false,
      reason: `You've reached your limit of ${limits.clients} client${limits.clients !== 1 ? 's' : ''} on the ${limits.planName} plan`,
      currentCount,
      limit: limits.clients,
    };
  }

  return {
    allowed: true,
    currentCount,
    limit: limits.clients,
  };
}

/**
 * Check if user can generate another report this month
 */
export async function canGenerateReport(userId: string): Promise<{
  allowed: boolean;
  reason?: string;
  currentCount: number;
  limit: number;
}> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return { allowed: false, reason: 'User not found', currentCount: 0, limit: 0 };
  }

  const limits = getPlanLimits(user.plan);

  // Count reports generated this billing cycle
  const cycleStart = user.billingCycleStart || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  
  const currentCount = await prisma.report.count({
    where: {
      userId,
      createdAt: {
        gte: cycleStart,
      },
    },
  });

  if (currentCount >= limits.reportsPerMonth) {
    return {
      allowed: false,
      reason: `You've reached your limit of ${limits.reportsPerMonth} reports per month on the ${limits.planName} plan`,
      currentCount,
      limit: limits.reportsPerMonth,
    };
  }

  return {
    allowed: true,
    currentCount,
    limit: limits.reportsPerMonth,
  };
}

/**
 * Get comprehensive usage statistics
 */
export async function getUsageStats(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      clients: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const limits = getPlanLimits(user.plan);
  const cycleStart = user.billingCycleStart || new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  const reportCount = await prisma.report.count({
    where: {
      userId,
      createdAt: {
        gte: cycleStart,
      },
    },
  });

  return {
    clients: {
      used: user.clients.length,
      limit: limits.clients,
      percentage: (user.clients.length / limits.clients) * 100,
      remaining: limits.clients - user.clients.length,
      isAtLimit: user.clients.length >= limits.clients,
      isNearLimit: (user.clients.length / limits.clients) >= 0.8,
    },
    reports: {
      used: reportCount,
      limit: limits.reportsPerMonth,
      percentage: (reportCount / limits.reportsPerMonth) * 100,
      remaining: limits.reportsPerMonth - reportCount,
      isAtLimit: reportCount >= limits.reportsPerMonth,
      isNearLimit: (reportCount / limits.reportsPerMonth) >= 0.8,
    },
    plan: user.plan,
    planName: limits.planName,
    whiteLabelEnabled: limits.whiteLabelEnabled,
  };
}

/**
 * Check if user can use white-label during trial or after
 */
export function canUseWhiteLabel(user: any): boolean {
  // PRIORITY 1: Check if white-label is explicitly enabled
  // This covers:
  // - STARTER users who paid $20/mo white-label add-on
  // - PROFESSIONAL users (white-label included, field set to true)
  // - ENTERPRISE users (white-label included, field set to true)
  if (user.whiteLabelEnabled === true) {
    return true;
  }
  
  // PRIORITY 2: Trial users can TRY white-label for free
  const isInTrial = user.trialStartDate && 
                    user.trialEndDate && 
                    new Date() < user.trialEndDate;
  
  if (isInTrial && ['STARTER', 'PROFESSIONAL', 'ENTERPRISE'].includes(user.plan)) {
    return true;
  }
  
  // All other cases: no white-label access
  return false;
}
import { prisma } from '@/lib/prisma';

/**
 * Billing Cycle Management Helper Functions
 * Handles 30-day rolling billing cycles for fair usage tracking
 */

export interface BillingCycleInfo {
  cycleStart: Date;
  cycleEnd: Date;
  daysRemaining: number;
  cycleWasReset: boolean;
}

/**
 * Check if a user's billing cycle needs to be reset and reset it if necessary
 * @param userId - The user ID to check
 * @returns Promise<boolean> - True if cycle was reset, false if no reset needed
 */
export async function checkAndResetBillingCycle(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      billingCycleStart: true,
      billingCycleEnd: true,
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const now = new Date();
  
  // Check if cycle needs reset (either no end date or end date has passed)
  if (!user.billingCycleEnd || now > user.billingCycleEnd) {
    const newCycleStart = now;
    const newCycleEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
    
    await prisma.user.update({
      where: { id: userId },
      data: {
        billingCycleStart: newCycleStart,
        billingCycleEnd: newCycleEnd,
      }
    });
    
    console.log(`Billing cycle reset for user ${userId}:`, {
      oldStart: user.billingCycleStart,
      oldEnd: user.billingCycleEnd,
      newStart: newCycleStart,
      newEnd: newCycleEnd
    });
    
    return true; // Cycle was reset
  }
  
  return false; // No reset needed
}

/**
 * Get the current billing cycle information for a user
 * @param userId - The user ID
 * @returns Promise<BillingCycleInfo> - Current billing cycle details
 */
export async function getBillingCycleInfo(userId: string): Promise<BillingCycleInfo> {
  // First check and reset if needed
  const cycleWasReset = await checkAndResetBillingCycle(userId);
  
  // Get updated user data
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      billingCycleStart: true,
      billingCycleEnd: true,
    }
  });

  if (!user || !user.billingCycleEnd) {
    throw new Error('User billing cycle not properly initialized');
  }

  const now = new Date();
  const daysRemaining = Math.max(0, Math.ceil(
    (user.billingCycleEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  ));

  return {
    cycleStart: user.billingCycleStart,
    cycleEnd: user.billingCycleEnd,
    daysRemaining,
    cycleWasReset
  };
}

/**
 * Count reports generated in the current billing cycle
 * @param userId - The user ID
 * @returns Promise<number> - Number of reports in current cycle
 */
export async function getReportsInCurrentCycle(userId: string): Promise<number> {
  const cycleInfo = await getBillingCycleInfo(userId);

  return await prisma.report.count({
    where: {
      userId,
      createdAt: {
        gte: cycleInfo.cycleStart,
        lt: cycleInfo.cycleEnd, // Use 'lt' instead of 'lte' to exclude reports created at cycle end
      },
    },
  });
}

/**
 * Get days until billing cycle reset
 * @param billingCycleEnd - The end date of the billing cycle
 * @returns number - Days until reset (0 if already expired)
 */
export function getDaysUntilReset(billingCycleEnd: Date | null): number {
  if (!billingCycleEnd) return 0;
  
  const now = new Date();
  const diff = billingCycleEnd.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/**
 * Initialize billing cycle for a new user
 * @param userId - The user ID
 * @returns Promise<void>
 */
export async function initializeBillingCycle(userId: string): Promise<void> {
  const now = new Date();
  const cycleEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  await prisma.user.update({
    where: { id: userId },
    data: {
      billingCycleStart: now,
      billingCycleEnd: cycleEnd,
    }
  });

  console.log(`Initialized billing cycle for user ${userId}:`, {
    start: now,
    end: cycleEnd
  });
}

/**
 * Get usage statistics for a user in their current billing cycle
 * @param userId - The user ID
 * @returns Promise<UsageStats> - Current usage statistics
 */
export interface UsageStats {
  reportsUsed: number;
  reportsLimit: number;
  reportsRemaining: number;
  daysRemaining: number;
  cycleStart: Date;
  cycleEnd: Date;
  utilizationPercentage: number;
}

export async function getUsageStats(userId: string, userPlan: string): Promise<UsageStats> {
  const cycleInfo = await getBillingCycleInfo(userId);
  const reportsUsed = await getReportsInCurrentCycle(userId);
  
  // Define tier limits (updated STARTER from 20 to 25)
  const limits = {
    FREE: 5,
    STARTER: 25,
    PROFESSIONAL: 75,
    ENTERPRISE: 250
  } as const;

  const reportsLimit = limits[userPlan as keyof typeof limits] || limits.FREE;
  const reportsRemaining = Math.max(0, reportsLimit - reportsUsed);
  const utilizationPercentage = Math.round((reportsUsed / reportsLimit) * 100);

  return {
    reportsUsed,
    reportsLimit,
    reportsRemaining,
    daysRemaining: cycleInfo.daysRemaining,
    cycleStart: cycleInfo.cycleStart,
    cycleEnd: cycleInfo.cycleEnd,
    utilizationPercentage
  };
}
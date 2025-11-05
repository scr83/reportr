/**
 * Trial Activation Service
 * Single source of truth for trial date activation
 * Eliminates conflicts between email verification and PayPal webhook
 */

import { prisma } from '@/lib/prisma';
import { Plan } from '@prisma/client';

export type TrialType = 'EMAIL' | 'PAYPAL';

interface TrialActivationParams {
  userId: string;
  trialType: TrialType;
  plan: Plan;
}

interface TrialActivationResult {
  success: boolean;
  error?: string;
  existingTrialType?: string;
  trialStartDate?: Date;
  trialEndDate?: Date;
}

/**
 * Centralized trial activation function
 * Sets trialStartDate, trialEndDate, trialUsed = true, and trialType
 * Prevents double-activation by checking existing trialType
 */
export async function activateTrial(params: TrialActivationParams): Promise<TrialActivationResult> {
  const { userId, trialType, plan } = params;

  try {
    // Check if user exists and get current trial status
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        trialUsed: true,
        trialType: true,
        trialStartDate: true,
        trialEndDate: true,
      },
    });

    if (!user) {
      console.error(`🚫 Trial activation failed: User not found - ${userId}`);
      return {
        success: false,
        error: 'User not found',
      };
    }

    // Guard check: Prevent double-activation
    if (user.trialType) {
      console.warn(`⚠️  Trial activation attempted but user already has trial type: ${user.trialType} (User: ${user.email})`);
      return {
        success: false,
        error: `Trial already activated via ${user.trialType}`,
        existingTrialType: user.trialType,
      };
    }

    // Guard check: Prevent activation if trial already used
    if (user.trialUsed === true) {
      console.warn(`⚠️  Trial activation attempted but trial already used (User: ${user.email})`);
      return {
        success: false,
        error: 'Trial already used',
        existingTrialType: user.trialType || 'UNKNOWN',
      };
    }

    // Calculate trial dates (14 days from now)
    const trialStartDate = new Date();
    const trialEndDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 days

    // Activate trial atomically
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        trialStartDate,
        trialEndDate,
        trialUsed: true,
        trialType,
      },
    });

    // Log successful activation
    console.log(`✅ Trial activated successfully:`, {
      userId,
      email: user.email,
      trialType,
      plan,
      trialStartDate: trialStartDate.toISOString(),
      trialEndDate: trialEndDate.toISOString(),
    });

    return {
      success: true,
      trialStartDate,
      trialEndDate,
    };

  } catch (error) {
    console.error(`❌ Trial activation database error:`, {
      userId,
      trialType,
      plan,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return {
      success: false,
      error: 'Database error during trial activation',
    };
  }
}

/**
 * Check if user has already activated trial
 * Used for validation before attempting activation
 */
export async function hasActivatedTrial(userId: string): Promise<{
  hasActivated: boolean;
  trialType?: string;
  trialStartDate?: Date;
  trialEndDate?: Date;
}> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        trialType: true,
        trialUsed: true,
        trialStartDate: true,
        trialEndDate: true,
      },
    });

    if (!user) {
      return { hasActivated: false };
    }

    const hasActivated = user.trialType !== null || user.trialUsed === true;

    return {
      hasActivated,
      trialType: user.trialType || undefined,
      trialStartDate: user.trialStartDate || undefined,
      trialEndDate: user.trialEndDate || undefined,
    };

  } catch (error) {
    console.error('Error checking trial activation status:', error);
    return { hasActivated: false };
  }
}

/**
 * Get trial activation analytics
 * Useful for understanding trial activation patterns
 */
export async function getTrialActivationStats(): Promise<{
  totalActivations: number;
  emailActivations: number;
  paypalActivations: number;
  activationsToday: number;
}> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalActivations,
      emailActivations,
      paypalActivations,
      activationsToday,
    ] = await Promise.all([
      prisma.user.count({
        where: {
          trialType: { not: null },
        },
      }),
      prisma.user.count({
        where: {
          trialType: 'EMAIL',
        },
      }),
      prisma.user.count({
        where: {
          trialType: 'PAYPAL',
        },
      }),
      prisma.user.count({
        where: {
          trialType: { not: null },
          trialStartDate: { gte: today },
        },
      }),
    ]);

    return {
      totalActivations,
      emailActivations,
      paypalActivations,
      activationsToday,
    };

  } catch (error) {
    console.error('Error getting trial activation stats:', error);
    return {
      totalActivations: 0,
      emailActivations: 0,
      paypalActivations: 0,
      activationsToday: 0,
    };
  }
}
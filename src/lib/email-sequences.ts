import { prisma } from '@/lib/prisma';
import { EMAIL_TYPES, EmailType } from './email-types';

/**
 * Check if an email has already been sent to a user
 */
export async function hasEmailBeenSent(
  userId: string,
  emailType: EmailType
): Promise<boolean> {
  const existing = await prisma.emailLog.findUnique({
    where: {
      userId_emailType: {
        userId,
        emailType,
      },
    },
  });
  return !!existing;
}

/**
 * Log that an email was sent (prevents duplicates via unique constraint)
 */
export async function logEmailSent(
  userId: string,
  emailType: EmailType,
  metadata?: Record<string, any>
): Promise<void> {
  try {
    await prisma.emailLog.create({
      data: {
        userId,
        emailType,
        metadata,
      },
    });
  } catch (error: unknown) {
    // If unique constraint violation, email was already logged (race condition safe)
    const prismaError = error as { code?: string };
    if (prismaError.code === 'P2002') {
      console.log(`Email ${emailType} already sent to user ${userId}`);
      return;
    }
    throw error;
  }
}

/**
 * Get all emails sent to a user
 */
export async function getUserEmailHistory(userId: string) {
  return prisma.emailLog.findMany({
    where: { userId },
    orderBy: { sentAt: 'desc' },
  });
}

/**
 * Check if a date falls within today's window (for cron job matching)
 * Uses UTC for consistency
 */
export function isDateInWindow(
  targetDate: Date,
  daysOffset: number,
  windowHours = 24
): boolean {
  const now = new Date();
  
  // Calculate the target date with offset
  const checkDate = new Date(targetDate);
  checkDate.setDate(checkDate.getDate() + daysOffset);
  
  // Set to start of day UTC
  checkDate.setUTCHours(0, 0, 0, 0);
  
  const startOfToday = new Date(now);
  startOfToday.setUTCHours(0, 0, 0, 0);
  
  const endOfWindow = new Date(startOfToday);
  endOfWindow.setUTCHours(windowHours, 0, 0, 0);
  
  return checkDate >= startOfToday && checkDate < endOfWindow;
}

/**
 * Find users eligible for a specific time-based email
 */
export async function findUsersForTimeBasedEmail(
  emailType: EmailType,
  daysOffset: number,
  referenceField: 'createdAt' | 'trialEndsAt'
): Promise<Array<{ id: string; email: string; name: string | null }>> {
  const now = new Date();
  
  // Calculate the date range for users who should receive this email today
  const targetDate = new Date(now);
  targetDate.setDate(targetDate.getDate() - daysOffset);
  targetDate.setUTCHours(0, 0, 0, 0);
  
  const targetDateEnd = new Date(targetDate);
  targetDateEnd.setUTCHours(23, 59, 59, 999);
  
  // Find users where:
  // 1. Reference date matches our target window
  // 2. They haven't received this email yet
  // 3. They're on FREE plan (for trial emails) or any plan (for onboarding)
  const users = await prisma.user.findMany({
    where: {
      [referenceField]: {
        gte: targetDate,
        lte: targetDateEnd,
      },
      // Exclude users who already received this email
      emailLogs: {
        none: {
          emailType,
        },
      },
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
  
  return users;
}
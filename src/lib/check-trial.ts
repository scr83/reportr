import { prisma } from './prisma'

export interface TrialStatus {
  expired: boolean
  plan: string
  expiresAt?: Date | null
  downgradedTo?: string
  message?: string
}

/**
 * Check if a user's trial has expired and handle downgrading
 */
export async function checkTrialExpiry(userId: string): Promise<TrialStatus> {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) {
    throw new Error('User not found')
  }

  // If FREE tier, no expiry
  if (user.plan === 'FREE') {
    return { 
      expired: false, 
      plan: 'FREE' 
    }
  }

  // Check if trial expired
  if (user.planExpires && user.planExpires < new Date()) {
    // Trial expired - downgrade to FREE
    await prisma.user.update({
      where: { id: userId },
      data: { 
        plan: 'FREE',
        planExpires: null 
      }
    })

    console.log(`User ${userId} trial expired - downgraded from ${user.plan} to FREE`)

    return { 
      expired: true, 
      plan: 'FREE', // Updated plan
      downgradedTo: 'FREE',
      message: `Your ${user.plan} trial has expired. You have been downgraded to FREE plan (1 client, 5 reports/month).`
    }
  }

  return { 
    expired: false, 
    plan: user.plan, 
    expiresAt: user.planExpires 
  }
}

/**
 * Get days remaining in trial
 */
export function getDaysRemaining(planExpires: Date | null): number {
  if (!planExpires) return 0
  
  const now = new Date()
  const diffTime = planExpires.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return Math.max(0, diffDays)
}

/**
 * Check if user is on a trial (not FREE and has expiry date)
 */
export function isOnTrial(user: { plan: string; planExpires: Date | null }): boolean {
  return user.plan !== 'FREE' && user.planExpires !== null
}
/**
 * PayPal Plan ID Mapping
 * Maps tier + white-label selection to correct PayPal subscription plan
 */

import { validatePayPalEnvironment } from './env-validation'

export type PlanTier = 'starter' | 'professional' | 'agency'
export type PlanSelection = {
  tier: PlanTier
  whiteLabelEnabled: boolean
}

/**
 * Get the correct PayPal plan ID based on tier and white-label selection
 * Note: All new plans include white-label functionality, so whiteLabelEnabled parameter is ignored
 */
export function getPayPalPlanId(selection: PlanSelection): string {
  const { tier } = selection

  // Map to new unified environment variable names (all plans include white-label)
  const planMap: Record<string, string> = {
    'starter': process.env.PAYPAL_STARTER_DIRECT_PLAN_ID!,
    'professional': process.env.PAYPAL_PRO_DIRECT_PLAN_ID!,
    'agency': process.env.PAYPAL_AGENCY_DIRECT_PLAN_ID!,
  }

  const planId = planMap[tier]

  if (!planId) {
    // Check if environment variables are properly configured
    const validation = validatePayPalEnvironment()
    if (!validation.isValid) {
      throw new Error(`PayPal environment not configured. Missing: ${validation.missing.join(', ')}`)
    }
    throw new Error(`No PayPal plan ID found for: ${tier}`)
  }

  return planId
}

/**
 * Get the correct PayPal trial plan ID based on tier and white-label selection
 * Note: All new plans include white-label functionality, so whiteLabelEnabled parameter is ignored
 */
export function getPayPalTrialPlanId(selection: PlanSelection): string {
  const { tier } = selection

  // Map to new unified trial plan environment variable names (all plans include white-label)
  const trialPlanMap: Record<string, string> = {
    'starter': process.env.PAYPAL_STARTER_TRIAL_PLAN_ID!,
    'professional': process.env.PAYPAL_PRO_TRIAL_PLAN_ID!,
    'agency': process.env.PAYPAL_AGENCY_TRIAL_PLAN_ID!,
  }

  const trialPlanId = trialPlanMap[tier]

  if (!trialPlanId) {
    throw new Error(`No PayPal trial plan ID found for: ${tier}`)
  }

  return trialPlanId
}

/**
 * Parse plan selection from query params
 * Expected formats:
 * - ?plan=starter
 * - ?plan=starter-whitelabel
 * - ?plan=professional
 * - ?plan=professional-whitelabel
 * - ?plan=agency
 * - ?plan=agency-whitelabel
 */
export function parsePlanFromQuery(planQuery: string | null): PlanSelection | null {
  if (!planQuery) return null

  // Parse the plan string
  const isWhiteLabel = planQuery.includes('whitelabel')
  const tierString = planQuery.replace('-whitelabel', '').trim().toLowerCase()

  // Validate tier
  const validTiers: PlanTier[] = ['starter', 'professional', 'agency']
  if (!validTiers.includes(tierString as PlanTier)) {
    console.warn(`Invalid tier in plan query: ${tierString}`)
    return null
  }

  return {
    tier: tierString as PlanTier,
    whiteLabelEnabled: isWhiteLabel
  }
}

/**
 * Determine if a PayPal plan ID is a white-label plan
 * Used by webhook to auto-enable white-label
 * Note: All new plans include white-label functionality
 */
export function isWhiteLabelPlan(paypalPlanId: string): boolean {
  const allNewPlanIds = [
    process.env.PAYPAL_STARTER_TRIAL_PLAN_ID,
    process.env.PAYPAL_STARTER_DIRECT_PLAN_ID,
    process.env.PAYPAL_PRO_TRIAL_PLAN_ID,
    process.env.PAYPAL_PRO_DIRECT_PLAN_ID,
    process.env.PAYPAL_AGENCY_TRIAL_PLAN_ID,
    process.env.PAYPAL_AGENCY_DIRECT_PLAN_ID,
  ]

  return allNewPlanIds.includes(paypalPlanId)
}

/**
 * Get tier name from PayPal plan ID
 */
export function getTierFromPlanId(paypalPlanId: string): PlanTier | null {
  const planIdMap: Record<string, PlanTier> = {
    [process.env.PAYPAL_STARTER_TRIAL_PLAN_ID!]: 'starter',
    [process.env.PAYPAL_STARTER_DIRECT_PLAN_ID!]: 'starter',
    [process.env.PAYPAL_PRO_TRIAL_PLAN_ID!]: 'professional',
    [process.env.PAYPAL_PRO_DIRECT_PLAN_ID!]: 'professional',
    [process.env.PAYPAL_AGENCY_TRIAL_PLAN_ID!]: 'agency',
    [process.env.PAYPAL_AGENCY_DIRECT_PLAN_ID!]: 'agency',
  }

  return planIdMap[paypalPlanId] || null
}

/**
 * Determine if a PayPal plan ID is a trial plan
 * Used to check if subscription is in trial period
 */
export function isTrialPlan(paypalPlanId: string): boolean {
  const trialPlanIds = [
    process.env.PAYPAL_STARTER_TRIAL_PLAN_ID,
    process.env.PAYPAL_PRO_TRIAL_PLAN_ID,
    process.env.PAYPAL_AGENCY_TRIAL_PLAN_ID,
  ]

  return trialPlanIds.includes(paypalPlanId)
}

/**
 * Convert tier to Prisma Plan enum
 */
export function tierToPlan(tier: PlanTier): 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE' {
  const tierToPlanMap = {
    'starter': 'STARTER' as const,
    'professional': 'PROFESSIONAL' as const,
    'agency': 'ENTERPRISE' as const,
  }
  
  return tierToPlanMap[tier]
}
/**
 * PayPal Plan ID Mapping
 * Maps tier + white-label selection to correct PayPal subscription plan
 */

export type PlanTier = 'starter' | 'professional' | 'agency'
export type PlanSelection = {
  tier: PlanTier
  whiteLabelEnabled: boolean
}

/**
 * Get the correct PayPal plan ID based on tier and white-label selection
 */
export function getPayPalPlanId(selection: PlanSelection): string {
  const { tier, whiteLabelEnabled } = selection

  // Map to environment variable names
  const planMap: Record<string, string> = {
    'starter-false': process.env.PAYPAL_STARTER_PLAN_ID!,
    'starter-true': process.env.PAYPAL_STARTER_WL_PLAN_ID!,
    'professional-false': process.env.PAYPAL_PRO_PLAN_ID!,
    'professional-true': process.env.PAYPAL_PRO_WL_PLAN_ID!,
    'agency-false': process.env.PAYPAL_AGENCY_PLAN_ID!,
    'agency-true': process.env.PAYPAL_AGENCY_WL_PLAN_ID!,
  }

  const key = `${tier}-${whiteLabelEnabled}`
  const planId = planMap[key]

  if (!planId) {
    throw new Error(`No PayPal plan ID found for: ${tier} (white-label: ${whiteLabelEnabled})`)
  }

  return planId
}

/**
 * Get the correct PayPal trial plan ID based on tier and white-label selection
 */
export function getPayPalTrialPlanId(selection: PlanSelection): string {
  const { tier, whiteLabelEnabled } = selection

  // Map to trial plan environment variable names
  const trialPlanMap: Record<string, string> = {
    'starter-false': process.env.PAYPAL_STARTER_TRIAL_PLAN_ID!,
    'starter-true': process.env.PAYPAL_STARTER_WL_TRIAL_PLAN_ID!,
    'professional-false': process.env.PAYPAL_PRO_TRIAL_PLAN_ID!,
    'professional-true': process.env.PAYPAL_PRO_WL_TRIAL_PLAN_ID!,
    'agency-false': process.env.PAYPAL_AGENCY_TRIAL_PLAN_ID!,
    'agency-true': process.env.PAYPAL_AGENCY_WL_TRIAL_PLAN_ID!,
  }

  const key = `${tier}-${whiteLabelEnabled}`
  const trialPlanId = trialPlanMap[key]

  if (!trialPlanId) {
    throw new Error(`No PayPal trial plan ID found for: ${tier} (white-label: ${whiteLabelEnabled})`)
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
 */
export function isWhiteLabelPlan(paypalPlanId: string): boolean {
  const whiteLabelPlanIds = [
    process.env.PAYPAL_STARTER_WL_PLAN_ID,
    process.env.PAYPAL_PRO_WL_PLAN_ID,
    process.env.PAYPAL_AGENCY_WL_PLAN_ID,
    process.env.PAYPAL_STARTER_WL_TRIAL_PLAN_ID,
    process.env.PAYPAL_PRO_WL_TRIAL_PLAN_ID,
    process.env.PAYPAL_AGENCY_WL_TRIAL_PLAN_ID,
  ]

  return whiteLabelPlanIds.includes(paypalPlanId)
}

/**
 * Get tier name from PayPal plan ID
 */
export function getTierFromPlanId(paypalPlanId: string): PlanTier | null {
  const planIdMap: Record<string, PlanTier> = {
    [process.env.PAYPAL_STARTER_PLAN_ID!]: 'starter',
    [process.env.PAYPAL_STARTER_WL_PLAN_ID!]: 'starter',
    [process.env.PAYPAL_PRO_PLAN_ID!]: 'professional',
    [process.env.PAYPAL_PRO_WL_PLAN_ID!]: 'professional',
    [process.env.PAYPAL_AGENCY_PLAN_ID!]: 'agency',
    [process.env.PAYPAL_AGENCY_WL_PLAN_ID!]: 'agency',
    [process.env.PAYPAL_STARTER_TRIAL_PLAN_ID!]: 'starter',
    [process.env.PAYPAL_STARTER_WL_TRIAL_PLAN_ID!]: 'starter',
    [process.env.PAYPAL_PRO_TRIAL_PLAN_ID!]: 'professional',
    [process.env.PAYPAL_PRO_WL_TRIAL_PLAN_ID!]: 'professional',
    [process.env.PAYPAL_AGENCY_TRIAL_PLAN_ID!]: 'agency',
    [process.env.PAYPAL_AGENCY_WL_TRIAL_PLAN_ID!]: 'agency',
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
    process.env.PAYPAL_STARTER_WL_TRIAL_PLAN_ID,
    process.env.PAYPAL_PRO_TRIAL_PLAN_ID,
    process.env.PAYPAL_PRO_WL_TRIAL_PLAN_ID,
    process.env.PAYPAL_AGENCY_TRIAL_PLAN_ID,
    process.env.PAYPAL_AGENCY_WL_TRIAL_PLAN_ID,
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
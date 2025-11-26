/**
 * PayPal Plan Mapping - Simple Hardcoded Configuration
 * FINAL MAPPING - DO NOT CHANGE
 */

// CONFIRMED MAPPING (Sebastian's requirements)
export const PAYPAL_PLAN_TO_DB_PLAN: Record<string, 'STARTER' | 'PROFESSIONAL' | 'AGENCY'> = {
  'P-0X464499YG9822634NEQJ5XQ': 'STARTER',      // Starter Trial
  'P-6PJ50716H4431863PNEQKBLQ': 'STARTER',      // Starter Direct
  'P-09P26662R8680522DNEQJ7XY': 'PROFESSIONAL', // Professional Trial
  'P-90W906144W5364313NEQKB5I': 'PROFESSIONAL', // Professional Direct
  'P-7SU477161L382370MNEQKCQQ': 'AGENCY',       // Agency Trial
  'P-0KW62605U4011430FNEQKDCY': 'AGENCY',       // Agency Direct
};

// All valid PayPal plan IDs
export const ALL_PAYPAL_PLAN_IDS = Object.keys(PAYPAL_PLAN_TO_DB_PLAN);

/**
 * Get database plan from PayPal plan ID
 * @param paypalPlanId PayPal subscription plan ID
 * @returns Database plan enum or null if unknown
 */
export function getDbPlanFromPayPal(paypalPlanId: string): 'STARTER' | 'PROFESSIONAL' | 'AGENCY' | null {
  return PAYPAL_PLAN_TO_DB_PLAN[paypalPlanId] || null;
}

/**
 * Check if PayPal plan ID is valid
 * @param paypalPlanId PayPal subscription plan ID
 * @returns True if valid, false otherwise
 */
export function isValidPayPalPlan(paypalPlanId: string): boolean {
  return paypalPlanId in PAYPAL_PLAN_TO_DB_PLAN;
}

/**
 * All paid plans include white label - no exceptions
 */
export function includesWhiteLabel(plan: 'STARTER' | 'PROFESSIONAL' | 'AGENCY'): boolean {
  return true; // ALL paid plans include white label
}
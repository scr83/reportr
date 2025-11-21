/**
 * Environment Variable Validation
 * Validates that all required PayPal plan IDs are configured
 */

interface PayPalPlanConfig {
  starterTrialPlan: string;
  starterDirectPlan: string;
  proTrialPlan: string;
  proDirectPlan: string;
  agencyTrialPlan: string;
  agencyDirectPlan: string;
}

/**
 * Validate all required PayPal environment variables are set
 */
export function validatePayPalEnvironment(): { isValid: boolean; missing: string[] } {
  const requiredVars = {
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
    PAYPAL_MODE: process.env.PAYPAL_MODE,
    PAYPAL_STARTER_TRIAL_PLAN_ID: process.env.PAYPAL_STARTER_TRIAL_PLAN_ID,
    PAYPAL_STARTER_DIRECT_PLAN_ID: process.env.PAYPAL_STARTER_DIRECT_PLAN_ID,
    PAYPAL_PRO_TRIAL_PLAN_ID: process.env.PAYPAL_PRO_TRIAL_PLAN_ID,
    PAYPAL_PRO_DIRECT_PLAN_ID: process.env.PAYPAL_PRO_DIRECT_PLAN_ID,
    PAYPAL_AGENCY_TRIAL_PLAN_ID: process.env.PAYPAL_AGENCY_TRIAL_PLAN_ID,
    PAYPAL_AGENCY_DIRECT_PLAN_ID: process.env.PAYPAL_AGENCY_DIRECT_PLAN_ID,
  };

  const missing = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key, _]) => key);

  return {
    isValid: missing.length === 0,
    missing
  };
}

/**
 * Get PayPal plan configuration (with validation)
 */
export function getPayPalPlanConfig(): PayPalPlanConfig {
  const validation = validatePayPalEnvironment();
  
  if (!validation.isValid) {
    throw new Error(`Missing PayPal environment variables: ${validation.missing.join(', ')}`);
  }

  return {
    starterTrialPlan: process.env.PAYPAL_STARTER_TRIAL_PLAN_ID!,
    starterDirectPlan: process.env.PAYPAL_STARTER_DIRECT_PLAN_ID!,
    proTrialPlan: process.env.PAYPAL_PRO_TRIAL_PLAN_ID!,
    proDirectPlan: process.env.PAYPAL_PRO_DIRECT_PLAN_ID!,
    agencyTrialPlan: process.env.PAYPAL_AGENCY_TRIAL_PLAN_ID!,
    agencyDirectPlan: process.env.PAYPAL_AGENCY_DIRECT_PLAN_ID!,
  };
}

/**
 * Log environment validation status on startup
 */
export function logEnvironmentStatus(): void {
  const validation = validatePayPalEnvironment();
  
  if (validation.isValid) {
    console.log('✅ All PayPal environment variables configured');
  } else {
    console.warn(`⚠️ Missing PayPal environment variables: ${validation.missing.join(', ')}`);
    console.warn('Upgrade functionality will not work properly.');
  }
}
// Email type registry - all possible email types in the system
export const EMAIL_TYPES = {
  // Event-triggered (sent immediately)
  WELCOME: 'welcome',
  UPGRADE_SUCCESS: 'upgrade_success',
  CANCELLATION_CONFIRMED: 'cancellation_confirmed',
  
  // Time-based onboarding (days after signup)
  ONBOARDING_DAY_1: 'onboarding_day1',
  ONBOARDING_DAY_2: 'onboarding_day2',
  ONBOARDING_DAY_3: 'onboarding_day3',
  
  // Trial expiration sequence
  TRIAL_3_DAYS: 'trial_3days',
  TRIAL_1_DAY: 'trial_1day',
  TRIAL_EXPIRED: 'trial_expired',
  TRIAL_FEEDBACK: 'trial_feedback',
} as const;

export type EmailType = typeof EMAIL_TYPES[keyof typeof EMAIL_TYPES];

// Email sequence configuration
export interface EmailSequenceConfig {
  type: EmailType;
  description: string;
  trigger: 'event' | 'time';
  // For time-based: days relative to reference date (positive = after, negative = before)
  daysOffset?: number;
  // Reference date field on User model
  referenceField?: 'createdAt' | 'trialEndsAt';
}

export const EMAIL_SEQUENCES: EmailSequenceConfig[] = [
  // Event-triggered emails
  {
    type: EMAIL_TYPES.WELCOME,
    description: 'Welcome email sent immediately after signup',
    trigger: 'event',
  },
  {
    type: EMAIL_TYPES.UPGRADE_SUCCESS,
    description: 'Confirmation after successful subscription',
    trigger: 'event',
  },
  {
    type: EMAIL_TYPES.CANCELLATION_CONFIRMED,
    description: 'Confirmation after subscription cancellation',
    trigger: 'event',
  },
  
  // Onboarding sequence (days after signup)
  {
    type: EMAIL_TYPES.ONBOARDING_DAY_1,
    description: 'Day 1: Quick setup nudge',
    trigger: 'time',
    daysOffset: 1,
    referenceField: 'createdAt',
  },
  {
    type: EMAIL_TYPES.ONBOARDING_DAY_2,
    description: 'Day 2: Show value proposition',
    trigger: 'time',
    daysOffset: 2,
    referenceField: 'createdAt',
  },
  {
    type: EMAIL_TYPES.ONBOARDING_DAY_3,
    description: 'Day 3: Offer help',
    trigger: 'time',
    daysOffset: 3,
    referenceField: 'createdAt',
  },
  
  // Trial expiration sequence (days before/after trial ends)
  {
    type: EMAIL_TYPES.TRIAL_3_DAYS,
    description: '3 days before trial expires',
    trigger: 'time',
    daysOffset: -3,
    referenceField: 'trialEndsAt',
  },
  {
    type: EMAIL_TYPES.TRIAL_1_DAY,
    description: '1 day before trial expires',
    trigger: 'time',
    daysOffset: -1,
    referenceField: 'trialEndsAt',
  },
  {
    type: EMAIL_TYPES.TRIAL_EXPIRED,
    description: 'Trial has expired',
    trigger: 'time',
    daysOffset: 0,
    referenceField: 'trialEndsAt',
  },
  {
    type: EMAIL_TYPES.TRIAL_FEEDBACK,
    description: '3 days after trial expired - feedback request',
    trigger: 'time',
    daysOffset: 3,
    referenceField: 'trialEndsAt',
  },
];
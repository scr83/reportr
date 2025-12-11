# Email Sequences Implementation Plan

**Project:** Reportr  
**Feature:** Automated Email Sequences  
**Created:** December 11, 2025  
**Status:** Ready for Implementation

---

## Overview

Implement automated email sequences for user onboarding and trial management. Two types of emails:

1. **Event-Triggered** — Send immediately when action occurs
2. **Time-Based** — Processed by daily cron job based on user state

---

## Implementation Phases

| Phase | Description | Estimated Effort |
|-------|-------------|------------------|
| 1 | Database schema (EmailLog table) | 15 min |
| 2 | Type definitions and helper functions | 30 min |
| 3 | Email templates (9 templates) | 2-3 hours |
| 4 | Event-triggered emails (welcome, upgrade, cancel) | 1 hour |
| 5 | Cron job for time-based emails | 1-2 hours |
| 6 | Testing and deployment | 1 hour |

**Total estimated:** 6-8 hours

---

## Phase 1: Database Schema

### New Model: EmailLog

Add to `prisma/schema.prisma`:

```prisma
model EmailLog {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  emailType String   // e.g., "welcome", "onboarding_day1", "trial_3days"
  sentAt    DateTime @default(now())
  
  metadata  Json?    // Optional: store dynamic data used in email
  
  @@unique([userId, emailType]) // Prevent duplicate sends
  @@index([userId])
  @@index([emailType])
  @@index([sentAt])
}
```

### Update User Model

Add relation to existing User model:

```prisma
model User {
  // ... existing fields
  emailLogs EmailLog[]
}
```

### Migration Command

```bash
npx prisma migrate dev --name add_email_log_table
```

---

## Phase 2: Type Definitions & Helpers

### File: `/src/lib/email-types.ts`

```typescript
export const EMAIL_TYPES = {
  // Event-triggered (immediate)
  WELCOME: 'welcome',
  UPGRADE_SUCCESS: 'upgrade_success',
  CANCELLATION_CONFIRMED: 'cancellation_confirmed',
  
  // Time-based (cron)
  ONBOARDING_DAY1: 'onboarding_day1',
  ONBOARDING_DAY2: 'onboarding_day2',
  ONBOARDING_DAY3: 'onboarding_day3',
  TRIAL_3DAYS: 'trial_3days',
  TRIAL_1DAY: 'trial_1day',
  TRIAL_EXPIRED: 'trial_expired',
  TRIAL_FEEDBACK: 'trial_feedback',
} as const;

export type EmailType = typeof EMAIL_TYPES[keyof typeof EMAIL_TYPES];
```

### File: `/src/lib/email-sequences.ts`

Helper functions for:
- `isOnTrial(user)` — Check if user currently on trial
- `isPaidUser(user)` — Check if user on paid plan
- `isFreeUser(user)` — Check if user on free plan (trial expired)
- `daysUntilTrialEnds(user)` — Days remaining in trial
- `daysSinceSignup(user)` — Days since account creation
- `hasReceivedEmail(userId, emailType)` — Check EmailLog
- `logEmailSent(userId, emailType, metadata?)` — Create EmailLog entry
- `sendSequenceEmail(user, emailType)` — Main send function with logging

---

## Phase 3: Email Templates

### Templates to Create

| File | Email Type | Subject Line |
|------|------------|--------------|
| `welcome.tsx` | `welcome` | "Welcome to Reportr — Let's generate your first report" |
| `onboarding-nudge.tsx` | `onboarding_day1` | "Quick win: Connect your first client in 2 minutes" |
| `onboarding-show-value.tsx` | `onboarding_day2` | "See what your reports will look like" |
| `onboarding-help.tsx` | `onboarding_day3` | "Need a hand getting started?" |
| `trial-ending.tsx` | `trial_3days`, `trial_1day` | "Your Reportr trial ends in {X} days" |
| `trial-expired.tsx` | `trial_expired` | "Your trial has ended — here's what happens next" |
| `trial-feedback.tsx` | `trial_feedback` | "Quick question about your Reportr experience" |
| `upgrade-success.tsx` | `upgrade_success` | "You're all set! Welcome to Reportr {Plan}" |
| `cancellation-confirmed.tsx` | `cancellation_confirmed` | "We've cancelled your subscription" |

### Template Location

```
src/emails/
├── components/
│   └── email-layout.tsx      # Existing
├── verification-email.tsx    # Existing
├── welcome.tsx               # NEW
├── onboarding-nudge.tsx      # NEW
├── onboarding-show-value.tsx # NEW
├── onboarding-help.tsx       # NEW
├── trial-ending.tsx          # NEW
├── trial-expired.tsx         # NEW
├── trial-feedback.tsx        # NEW
├── upgrade-success.tsx       # NEW
└── cancellation-confirmed.tsx # NEW
```

### Template Variables

| Variable | Source | Used In |
|----------|--------|---------|
| `firstName` | `user.name?.split(' ')[0] ?? 'there'` | All |
| `email` | `user.email` | All |
| `clientCount` | Count of user's clients | Trial emails |
| `reportCount` | Count of user's reports | Trial emails |
| `daysLeft` | Calculated from `trialEndDate` | Trial ending |
| `planName` | `user.plan` | Upgrade success |
| `endDate` | `user.subscriptionEndDate` | Cancellation |

---

## Phase 4: Event-Triggered Emails

### Welcome Email — Two Entry Points

**FREE Plan Users (after email verification):**

Location: `/src/app/api/auth/verify/route.ts`

```typescript
// After successful verification
await sendSequenceEmail(user, EMAIL_TYPES.WELCOME);
```

**PAID Plan Users (after PayPal subscription activated):**

Location: PayPal webhook handler (subscription activated event)

```typescript
// After subscription confirmed
await sendSequenceEmail(user, EMAIL_TYPES.WELCOME);
```

### Upgrade Success Email

Location: PayPal webhook handler (subscription activated, for existing users upgrading)

```typescript
// When user upgrades from FREE to paid
if (wasFreePlan) {
  await sendSequenceEmail(user, EMAIL_TYPES.UPGRADE_SUCCESS);
}
```

### Cancellation Confirmed Email

Location: Cancellation API route or PayPal webhook

```typescript
// After subscription cancelled
await sendSequenceEmail(user, EMAIL_TYPES.CANCELLATION_CONFIRMED);
```

---

## Phase 5: Cron Job for Time-Based Emails

### File: `/src/app/api/cron/process-email-sequences/route.ts`

### Cron Schedule

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/process-cancellations",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/cron/process-email-sequences",
      "schedule": "0 9 * * *"
    }
  ]
}
```

Runs daily at **9 AM UTC**.

### Processing Logic

The cron job processes each email type sequentially:

#### Onboarding Day 1 (No Client Connected)

```typescript
// Find users where:
// - Created 24-48 hours ago
// - Client count = 0
// - No EmailLog for "onboarding_day1"

const targetUsers = await prisma.user.findMany({
  where: {
    createdAt: {
      gte: subHours(now, 48),
      lt: subHours(now, 24),
    },
    clients: { none: {} },
    emailLogs: {
      none: { emailType: 'onboarding_day1' }
    }
  }
});
```

#### Onboarding Day 2 (No Report Generated)

```typescript
// Find users where:
// - Created 48-72 hours ago
// - Report count = 0
// - No EmailLog for "onboarding_day2"
```

#### Onboarding Day 3 (Still No Activity)

```typescript
// Find users where:
// - Created 72-96 hours ago
// - Client count = 0 OR Report count = 0
// - No EmailLog for "onboarding_day3"
```

#### Trial 3 Days Left

```typescript
// Find users where:
// - trialEndDate is 3 days from now (within 24h window)
// - subscriptionStatus != 'active'
// - No EmailLog for "trial_3days"
```

#### Trial 1 Day Left

```typescript
// Find users where:
// - trialEndDate is 1 day from now (within 24h window)
// - subscriptionStatus != 'active'
// - No EmailLog for "trial_1day"
```

#### Trial Expired

```typescript
// Find users where:
// - trialEndDate passed within last 24 hours
// - subscriptionStatus != 'active'
// - No EmailLog for "trial_expired"
```

#### Trial Feedback (3 Days Post-Expiry)

```typescript
// Find users where:
// - trialEndDate was 3 days ago (within 24h window)
// - plan = 'FREE'
// - subscriptionStatus != 'active'
// - No EmailLog for "trial_feedback"
```

---

## Phase 6: Testing & Deployment

### Local Testing

1. **Test email templates** — Run `npm run email:dev` (React Email preview)
2. **Test individual sends** — Create test API route or script
3. **Test cron manually** — Hit `/api/cron/process-email-sequences` with proper auth

### Staging Testing

1. Create test users at various lifecycle stages
2. Trigger cron manually
3. Verify emails received and no duplicates

### Production Deployment

1. Deploy code changes
2. Run Prisma migration
3. Monitor first cron run
4. Check EmailLog table for entries

---

## Email Content Summary

### Welcome Sequence (Event-Triggered)

| Email | Timing | Goal |
|-------|--------|------|
| Welcome | Immediate (after verify/PayPal) | Excitement, clear next step |

### Onboarding Sequence (Time-Based, Conditional)

| Email | Timing | Condition | Goal |
|-------|--------|-----------|------|
| Day 1 Nudge | 24h after signup | No client connected | Get first client added |
| Day 2 Value | 48h after signup | No report generated | Show report value |
| Day 3 Help | 72h after signup | No activity | Offer personal help |

### Trial Expiration Sequence (Time-Based)

| Email | Timing | Condition | Goal |
|-------|--------|-----------|------|
| 3 Days Left | 3 days before trial ends | Still on trial | Create urgency |
| 1 Day Left | 1 day before trial ends | Still on trial | Final push |
| Trial Expired | Day trial ends | Didn't upgrade | Explain free limits |
| Feedback | 3 days after expiry | On FREE plan | Learn why didn't convert |

### Transactional (Event-Triggered)

| Email | Timing | Goal |
|-------|--------|------|
| Upgrade Success | After payment confirmed | Confirm, reinforce value |
| Cancellation Confirmed | After cancel request | Professional, leave door open |

---

## Files to Create/Modify

### New Files

```
src/lib/email-types.ts
src/lib/email-sequences.ts
src/emails/welcome.tsx
src/emails/onboarding-nudge.tsx
src/emails/onboarding-show-value.tsx
src/emails/onboarding-help.tsx
src/emails/trial-ending.tsx
src/emails/trial-expired.tsx
src/emails/trial-feedback.tsx
src/emails/upgrade-success.tsx
src/emails/cancellation-confirmed.tsx
src/app/api/cron/process-email-sequences/route.ts
```

### Modified Files

```
prisma/schema.prisma (add EmailLog model)
vercel.json (add cron job)
src/app/api/auth/verify/route.ts (add welcome email for FREE users)
[PayPal webhook handler] (add welcome email for PAID users)
[Cancellation handler] (add cancellation email)
```

---

## Existing Infrastructure (No Changes Needed)

- ✅ Resend package installed and configured
- ✅ React Email installed with components
- ✅ Email service at `/src/lib/email.ts`
- ✅ Email layout at `/src/emails/components/email-layout.tsx`
- ✅ Cron infrastructure working
- ✅ CRON_SECRET configured
- ✅ All environment variables set

---

## Success Criteria

- [ ] EmailLog table created and migrated
- [ ] All 9 email templates created
- [ ] Welcome email sends after FREE verification
- [ ] Welcome email sends after PAID PayPal activation
- [ ] Cron job processes all time-based emails
- [ ] No duplicate emails sent (EmailLog prevents)
- [ ] Upgrade and cancellation emails working
- [ ] Monitoring in place for email delivery

---

## Notes

- **Existing `welcomeEmailSent` field**: Leave in schema but don't use. Using EmailLog table instead for consistency.
- **Cron timing**: 9 AM UTC = 4 AM EST, 9 AM GMT, 8 PM AEST
- **Email batching**: Cron processes all users daily. Emails may arrive up to 24h after trigger condition met.

---

## Next Steps

1. **Approve this plan**
2. **Phase 1**: Backend Agent creates EmailLog schema and runs migration
3. **Phase 2**: Backend Agent creates type definitions and helper functions
4. **Phase 3**: Create email templates (can be done in parallel)
5. **Phase 4-6**: Implement triggers, cron job, and test

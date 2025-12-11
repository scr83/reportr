# Reportr Email Automation System

## Complete Documentation

**Implementation Date:** December 11, 2025  
**Status:** ✅ Production Ready

---

## Overview

The Reportr email automation system handles both event-triggered and time-based email sequences to improve user onboarding, engagement, and retention. Built with React Email templates and Resend for delivery.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    EMAIL AUTOMATION SYSTEM                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  EVENT-TRIGGERED (Immediate)          TIME-BASED (Cron Job)     │
│  ─────────────────────────            ─────────────────────     │
│  • Welcome Email (signup)             • Onboarding Day 1        │
│  • Upgrade Success                    • Onboarding Day 2        │
│  • Cancellation Confirmed             • Onboarding Day 3        │
│                                       • Trial 3 Days Warning    │
│                                       • Trial Last Day          │
│                                       • Trial Expired           │
│                                       • Trial Feedback          │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │ React Email  │───▶│ Email Service│───▶│    Resend    │       │
│  │  Templates   │    │  (sender)    │    │   (delivery) │       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
│                             │                                    │
│                             ▼                                    │
│                      ┌──────────────┐                           │
│                      │  EmailLog    │  (prevents duplicates)    │
│                      │  (Prisma)    │                           │
│                      └──────────────┘                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
src/
├── emails/                          # React Email Templates
│   ├── welcome.tsx                  # New user welcome
│   ├── upgrade-success.tsx          # Plan upgrade confirmation
│   ├── cancellation-confirmed.tsx   # Subscription cancelled
│   ├── onboarding-nudge.tsx         # Day 1 - gentle reminder
│   ├── onboarding-show-value.tsx    # Day 2 - value proposition
│   ├── onboarding-help.tsx          # Day 3 - personal outreach
│   ├── trial-ending.tsx             # 3 days before trial ends
│   ├── trial-last-day.tsx           # 1 day before trial ends
│   ├── trial-expired.tsx            # Trial expiration day
│   └── trial-feedback.tsx           # 2 days after trial ends
│
├── lib/
│   ├── email-types.ts               # Email type registry & sequences config
│   ├── email-sequences.ts           # Query helpers & logging functions
│   └── email-service.ts             # Resend integration & sender functions
│
├── app/api/cron/
│   └── process-email-sequences/
│       └── route.ts                 # Cron job for time-based emails
│
└── prisma/
    └── schema.prisma                # EmailLog model (added)
```

---

## Database Schema

### EmailLog Model (Added to schema.prisma)

```prisma
model EmailLog {
  id        String   @id @default(cuid())
  userId    String
  emailType String
  sentAt    DateTime @default(now())
  metadata  Json?
  
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, emailType])  // Prevents duplicate sends
  @@index([userId])
  @@index([emailType])
  @@index([sentAt])
}
```

**Purpose:** Tracks every email sent to prevent duplicates. The unique constraint on `[userId, emailType]` ensures each user receives each email type only once.

---

## Email Types Reference

### Event-Triggered Emails (Immediate)

| Email Type | Trigger | Template | Subject Line |
|------------|---------|----------|--------------|
| `welcome` | User signup (OAuth) | `welcome.tsx` | "Welcome to Reportr - Let's get started!" |
| `upgrade_success` | Plan upgrade | `upgrade-success.tsx` | "Your Reportr upgrade is confirmed!" |
| `cancellation_confirmed` | Subscription cancelled | `cancellation-confirmed.tsx` | "Your Reportr subscription has been cancelled" |

### Time-Based Emails (Cron Job)

| Email Type | Timing | Template | Subject Line |
|------------|--------|----------|--------------|
| `onboarding_day1` | 1 day after signup | `onboarding-nudge.tsx` | "Quick tip to get started with Reportr" |
| `onboarding_day2` | 2 days after signup | `onboarding-show-value.tsx` | "Save 8+ hours on your next client report" |
| `onboarding_day3` | 3 days after signup | `onboarding-help.tsx` | "Need help getting started with Reportr?" |
| `trial_3days` | 3 days before trial ends | `trial-ending.tsx` | "Your Reportr trial ends in 3 days" |
| `trial_1day` | 1 day before trial ends | `trial-last-day.tsx` | "Last day of your Reportr trial" |
| `trial_expired` | Day trial expires | `trial-expired.tsx` | "Your Reportr trial has ended" |
| `trial_feedback` | 2 days after trial ends | `trial-feedback.tsx` | "Quick question about your Reportr experience" |

---

## How It Works

### Event-Triggered Emails

These fire immediately when specific actions occur:

1. **Welcome Email** - Integrated in `src/lib/auth.ts`
   - Fires after Google OAuth creates a new user
   - Non-blocking (uses `.catch(console.error)`)

2. **Upgrade Success Email** - Integrated in `src/lib/services/subscription-service.ts`
   - Fires after PayPal subscription is activated
   - Includes plan name in the email

3. **Cancellation Email** - Integrated in `src/lib/services/subscription-service.ts`
   - Fires after subscription is cancelled
   - Includes "access until" date

### Time-Based Emails (Cron Job)

The cron job at `/api/cron/process-email-sequences` runs daily and:

1. Iterates through all configured email sequences
2. Queries users eligible for each email type based on:
   - `createdAt` for onboarding emails
   - `trialEndsAt` for trial emails
3. Checks if user already received that email (via EmailLog)
4. Sends email and logs it to prevent future duplicates
5. Returns detailed execution report

---

## Configuration

### Environment Variables Required

```env
# Resend API Key (already configured)
RESEND_API_KEY=re_xxxxxxxxxx

# Cron Secret (for securing cron endpoints)
CRON_SECRET=your-secret-key

# From email address (used in email-service.ts)
# Currently: sebastian@reportr.agency
```

### Vercel Cron Configuration

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/process-email-sequences",
      "schedule": "0 9 * * *"
    }
  ]
}
```

This runs the email cron job daily at 9:00 AM UTC.

---

## Viewing & Previewing Email Templates

### Option 1: React Email Dev Server (Recommended)

```bash
# From project root
npx email dev

# Opens browser at http://localhost:3000
# Navigate to see all templates rendered
```

### Option 2: Direct File Access

All templates are in: `src/emails/`

Each template is a React component that you can:
- Open in your editor
- Modify the styling/content
- Test with different props

### Option 3: Template Props Reference

Each template accepts specific props:

```typescript
// welcome.tsx
{ userName: string }

// upgrade-success.tsx
{ userName: string, planName: string }

// cancellation-confirmed.tsx
{ userName: string, accessUntil: string }

// onboarding-nudge.tsx, onboarding-show-value.tsx, onboarding-help.tsx
{ userName: string }

// trial-ending.tsx, trial-last-day.tsx
{ userName: string, trialEndsAt: string }

// trial-expired.tsx, trial-feedback.tsx
{ userName: string }
```

---

## Testing the System

### Test Event-Triggered Emails

1. **Welcome Email:** Create a new account via Google OAuth
2. **Upgrade Email:** Complete a PayPal subscription
3. **Cancellation Email:** Cancel a subscription

### Test Cron Job Manually

```bash
# Call the endpoint with authorization
curl -X GET "https://reportr.agency/api/cron/process-email-sequences" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### Check Email Logs

Query the database to see sent emails:

```sql
SELECT * FROM "EmailLog" ORDER BY "sentAt" DESC;
```

Or via Prisma Studio:

```bash
npx prisma studio
# Navigate to EmailLog table
```

---

## Monitoring & Debugging

### Cron Job Response Format

```json
{
  "success": true,
  "processed": {
    "onboarding_day1": { "sent": 5, "failed": 0 },
    "onboarding_day2": { "sent": 3, "failed": 0 },
    "trial_3days": { "sent": 2, "failed": 0 }
  },
  "totalSent": 10,
  "totalFailed": 0,
  "executionTimeMs": 2340,
  "timestamp": "2025-12-11T09:00:00.000Z"
}
```

### Vercel Logs

Check Vercel dashboard → Functions → `process-email-sequences` for:
- Execution logs
- Error messages
- Timing data

### Resend Dashboard

View delivery status at: https://resend.com/emails
- See all sent emails
- Check delivery/bounce status
- View email content as delivered

---

## Adding New Emails

### Step 1: Create Template

```tsx
// src/emails/my-new-email.tsx
import { Html, Body, Text, Link } from '@react-email/components';

interface MyNewEmailProps {
  userName: string;
}

export default function MyNewEmail({ userName }: MyNewEmailProps) {
  return (
    <Html>
      <Body>
        <Text>Hello {userName}!</Text>
        {/* Your content */}
      </Body>
    </Html>
  );
}
```

### Step 2: Register Email Type

```typescript
// src/lib/email-types.ts
export const EMAIL_TYPES = {
  // ... existing types
  my_new_email: 'my_new_email',
} as const;

// If time-based, add to EMAIL_SEQUENCES array
```

### Step 3: Add Sender Function

```typescript
// src/lib/email-service.ts
export async function sendMyNewEmail(userId: string, userName: string) {
  return sendEmail(
    userId,
    EMAIL_TYPES.my_new_email,
    <MyNewEmail userName={userName} />,
    'My New Email Subject'
  );
}
```

### Step 4: Trigger It

For event-triggered: Call the function where the event occurs
For time-based: Add to EMAIL_SEQUENCES and update cron job mapping

---

## Key Design Decisions

1. **Idempotent Sending:** EmailLog prevents duplicates even if cron runs multiple times

2. **Non-Blocking Triggers:** Event emails use `.catch()` so they don't slow down user actions

3. **Sequential Processing:** Cron processes emails one-by-one with 100ms delay to respect rate limits

4. **Personal Tone:** Emails are from "Sebastian from Reportr" for authentic founder communication

5. **Brand Consistency:** All emails use #7e23ce purple brand color

---

## Files Created/Modified

### New Files
- `src/emails/welcome.tsx`
- `src/emails/upgrade-success.tsx`
- `src/emails/cancellation-confirmed.tsx`
- `src/emails/onboarding-nudge.tsx`
- `src/emails/onboarding-show-value.tsx`
- `src/emails/onboarding-help.tsx`
- `src/emails/trial-ending.tsx`
- `src/emails/trial-last-day.tsx`
- `src/emails/trial-expired.tsx`
- `src/emails/trial-feedback.tsx`
- `src/lib/email-types.ts`
- `src/lib/email-sequences.ts`
- `src/lib/email-service.ts`
- `src/app/api/cron/process-email-sequences/route.ts`

### Modified Files
- `prisma/schema.prisma` (added EmailLog model)
- `src/lib/auth.ts` (added welcome email trigger)
- `src/lib/services/subscription-service.ts` (added upgrade/cancellation email triggers)

---

## Git Commands to Deploy

```bash
# Commit Phase 5 (cron job)
git add -A && git commit -m "feat: add email cron job for time-based sequences

- Create src/app/api/cron/process-email-sequences/route.ts
- Process onboarding emails (day 1, 2, 3 after signup)
- Process trial expiration emails (3 days before, 1 day before, on expiration, 2 days after)
- Sequential processing with rate limit protection
- Comprehensive logging and error handling
- Returns detailed execution report" && git push
```

---

## Next Steps (Optional Enhancements)

1. **Add more email sequences:**
   - Re-engagement emails for inactive users
   - Monthly usage summary emails
   - Feature announcement emails

2. **A/B testing:** Test different subject lines and content

3. **Analytics:** Track open rates and click rates via Resend webhooks

4. **Unsubscribe handling:** Add unsubscribe links and preference management

---

**Questions?** Check the code comments or reach out to the development team.

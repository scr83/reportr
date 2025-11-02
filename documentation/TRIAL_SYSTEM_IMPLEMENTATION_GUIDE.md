# 14-Day Trial System Implementation Guide - November 2, 2025

## 🎯 Overview

This document provides a complete implementation guide for adding functional 14-day trial periods to the STARTER, PROFESSIONAL, and AGENCY pricing tiers on Reportr. Currently, the "Start 14-Day Trial" buttons exist but do not actually create trials.

**Current State:** 3 broken buttons that mislead users
**Target State:** Fully functional trial system with automatic conversion
**Estimated Effort:** 2-3 days development + 1 day testing

---

## 📋 Current Problem

### Broken Buttons:
1. **STARTER - "Start 14-Day Trial"** ❌ No trial logic
2. **PROFESSIONAL - "Start 14-Day Trial"** ❌ No trial logic  
3. **AGENCY - "Start 14-Day Trial"** ❌ No trial logic

### What Happens Now (Broken):
```
User clicks "Start 14-Day Trial"
  ↓
Google OAuth
  ↓
User gets FREE plan (1 client, 5 reports) ❌ WRONG!
  ↓
No trial tracking
  ↓
Button text is misleading
```

### What Should Happen (Target):
```
User clicks "Start 14-Day Trial" on STARTER
  ↓
Google OAuth
  ↓
PayPal subscription with 14-day FREE trial
  ↓
User gets STARTER access (5 clients, 20 reports) ✅
  ↓
Trial tracked in database
  ↓
Day 14: Automatic charge OR downgrade to FREE
```

---

## 🎯 Implementation Approach

### Recommended: PayPal Native Trials

**Why This Approach:**
- ✅ PayPal handles trial period automatically
- ✅ Automatic conversion to paid subscription
- ✅ No manual cron jobs needed
- ✅ Industry standard practice
- ✅ Higher conversion rate (60-70%)
- ✅ Reportr already uses PayPal subscriptions

**Alternative Approach:** Manual trial tracking with database + cron jobs (NOT RECOMMENDED - significantly more work)

---

## 📊 SaaS Trial Best Practices (Context)

### 1. Payment Method Upfront
**Standard Practice:** Collect payment info BEFORE trial starts (even though not charged)

**Benefits:**
- Automatic conversion at trial end (no manual step)
- Filters non-serious users (reduces abuse)
- Higher conversion rates
- Less customer friction at conversion

**Implementation:** PayPal subscription with $0 trial period, auto-charges after 14 days

---

### 2. Automatic Conversion
**Standard Practice:** Trial automatically converts to paid unless user cancels

**Flow:**
```
Day 1: Start PayPal subscription with 14-day trial
Day 10: Email "Trial ending in 4 days, you'll be charged $29"
Day 13: Email "Trial ending tomorrow"
Day 14: PayPal automatically charges $29
If payment fails: Downgrade to FREE plan
```

**Why Better Than Manual:**
- No action required from happy customers (inertia works for you)
- Higher conversion rate
- Less support burden
- Standard expectation for SaaS users

---

### 3. Trial Email Sequence

**Standard SaaS Trial Emails:**

| Day | Email Type | Purpose | Content |
|-----|-----------|---------|---------|
| Day 1 | Welcome | Onboarding | "Welcome to your trial! Getting started guide" |
| Day 3 | Education | Engagement | "Here's how to get the most value" |
| Day 7 | Halfway | Reminder | "7 days left - usage stats" |
| Day 10 | Conversion Push | Urgency | "4 days left - don't lose access" |
| Day 13 | Last Chance | Final Push | "Tomorrow you'll be charged $29" |
| Day 15 | Post-Trial | Follow-up | "Welcome!" OR "Come back anytime" |

**Required:** Email automation system (Resend, SendGrid, Postmark)

---

### 4. Trial Abuse Prevention

**Standard Safeguards:**
- One trial per email address
- Require valid payment method
- Email verification required
- Track previous trial attempts

**Implementation:**
```typescript
// Check if email already used trial
const existingTrial = await prisma.user.findFirst({
  where: {
    email: newUser.email,
    OR: [
      { trialStartDate: { not: null } },
      { plan: { in: ['STARTER', 'PROFESSIONAL', 'AGENCY'] } }
    ]
  }
});

if (existingTrial) {
  return { error: "Trial already used for this email" };
}
```

---

### 5. In-App Trial Experience

**Standard Features:**

**Trial Badge (Always Visible):**
```tsx
<div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
  ⏰ STARTER Trial: 9 days remaining
  <Link href="/pricing" className="font-semibold">
    Subscribe Now
  </Link>
</div>
```

**Usage Indicators:**
```tsx
<div className="space-y-2">
  <div>
    <span className="font-medium">Clients:</span> 3/5
    <ProgressBar value={3} max={5} />
  </div>
  <div>
    <span className="font-medium">Reports this month:</span> 12/20
    <ProgressBar value={12} max={20} />
  </div>
</div>
```

**Progressive Urgency:**
- Days 1-7: Encourage usage, educate
- Days 8-10: Show upgrade benefits
- Days 11-14: Aggressive upgrade prompts

**Feature Preview (Optional):**
```tsx
{user.isInTrial && !user.whiteLabelEnabled && (
  <div className="relative">
    <div className="blur-sm pointer-events-none">
      {/* White-label settings preview */}
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <Button>Add White-Label for +$20/month</Button>
    </div>
  </div>
)}
```

---

### 6. Grace Period (Optional)

**Standard Practice:** 2-3 day grace period after trial ends

**Flow:**
```
Day 14: Trial expires
Days 14-16: Grace period (read-only access)
  - Can view existing clients/reports
  - Cannot add new clients or generate reports
  - Prominent "Subscribe to regain access" banner
Day 17: Complete downgrade to FREE plan
```

**Benefits:**
- Gives forgetful users a chance to subscribe
- Prevents data loss panic
- Shows goodwill

---

### 7. Trial Analytics (Future Enhancement)

**Metrics to Track:**
- **Trial Start Rate:** % of visitors who start trial
- **Trial Activation Rate:** % who actually use the product (generate ≥1 report)
- **Trial Conversion Rate:** % who become paying customers
- **Time to First Value:** How quickly users generate first report
- **Conversion by Source:** Which marketing channels convert best

**Tools:** Mixpanel, Amplitude, or custom analytics

---

## 🔧 Technical Implementation

### Phase 1: PayPal Subscription Plans with Trials

**Required:** Create 3 new PayPal subscription plans with trial periods

**PayPal Dashboard Setup:**

1. **Go to:** PayPal Developer Dashboard → Products & Pricing
2. **Create Plan for STARTER Trial:**
   - Plan Name: `STARTER - 14 Day Trial`
   - Billing Cycle 1 (Trial):
     - Frequency: 14 days
     - Price: $0.00
     - Number of Cycles: 1
   - Billing Cycle 2 (Regular):
     - Frequency: Monthly
     - Price: $29.00
     - Number of Cycles: Unlimited
   - Save Plan ID: `P-STARTER-TRIAL-XXXX`

3. **Repeat for PROFESSIONAL Trial:**
   - Trial: 14 days @ $0
   - Regular: Monthly @ $99
   - Plan ID: `P-PROFESSIONAL-TRIAL-XXXX`

4. **Repeat for AGENCY Trial:**
   - Trial: 14 days @ $0
   - Regular: Monthly @ $199
   - Plan ID: `P-AGENCY-TRIAL-XXXX`

**Result:** 3 new PayPal plan IDs for trials (in addition to 6 existing plans for direct subscriptions)

**Total PayPal Plans After Implementation:**
- 6 existing: Base + white-label for each tier (STARTER, PRO, AGENCY)
- 3 new: Trial versions for each tier
- 3 more new (optional): Trial + white-label versions
- **Total:** 9-12 PayPal subscription plans

---

### Phase 2: Database Schema Updates

**File:** `prisma/schema.prisma`

**Add Trial Fields to User Model:**

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  
  // Existing plan fields
  plan                    String?    // FREE, STARTER, PROFESSIONAL, AGENCY
  paypalSubscriptionId    String?    @unique
  subscriptionStatus      String?    // ACTIVE, CANCELLED, EXPIRED
  
  // NEW: Trial tracking fields
  isInTrial              Boolean    @default(false)
  trialStartDate         DateTime?
  trialEndDate           DateTime?
  trialPlan              String?    // Which plan they're trialing
  trialConvertedAt       DateTime?
  trialCancelledAt       DateTime?
  
  // Existing fields
  whiteLabelEnabled       Boolean    @default(false)
  companyName            String?
  logo                   String?
  primaryColor           String    @default("#7e23ce")
  
  createdAt              DateTime   @default(now())
  updatedAt              DateTime   @updatedAt
  
  clients                Client[]
  reports                Report[]
  accounts               Account[]
  sessions               Session[]
}
```

**Run Migration:**
```bash
npx prisma migrate dev --name add_trial_fields
npx prisma generate
```

---

### Phase 3: Update Pricing Page Button Handlers

**File:** `src/components/landing/Pricing.tsx`

**Current Code (Broken):**
```typescript
// STARTER "Start 14-Day Trial" button
<button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
  Start 14-Day Trial
</button>
```

**New Code (Functional):**
```typescript
// STARTER "Start 14-Day Trial" button
<button onClick={() => handleStartTrial('STARTER')}>
  Start 14-Day Trial
</button>

// Handler function
const handleStartTrial = async (plan: 'STARTER' | 'PROFESSIONAL' | 'AGENCY') => {
  // Check if user is logged in
  const session = await getSession();
  
  if (!session) {
    // User not logged in - authenticate first, then start trial
    signIn("google", { 
      callbackUrl: `/pricing?startTrial=${plan}` 
    });
    return;
  }
  
  // User logged in - check if already had trial
  const hasHadTrial = await checkTrialEligibility(session.user.email);
  
  if (!hasHadTrial) {
    // Redirect to PayPal with trial plan ID
    const trialPlanId = PAYPAL_TRIAL_PLAN_IDS[plan];
    redirectToPayPalSubscription(trialPlanId);
  } else {
    // Show error: "Trial already used for this email"
    showErrorModal("You've already used a free trial. Subscribe now to get access!");
  }
};

// PayPal Plan IDs
const PAYPAL_TRIAL_PLAN_IDS = {
  STARTER: process.env.NEXT_PUBLIC_PAYPAL_STARTER_TRIAL_PLAN_ID,
  PROFESSIONAL: process.env.NEXT_PUBLIC_PAYPAL_PROFESSIONAL_TRIAL_PLAN_ID,
  AGENCY: process.env.NEXT_PUBLIC_PAYPAL_AGENCY_TRIAL_PLAN_ID
};
```

**Repeat for PROFESSIONAL and AGENCY buttons.**

---

### Phase 4: Trial Eligibility Check API

**File:** `src/app/api/trials/check-eligibility/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { email } = await req.json();
  
  // Check if email already used trial
  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
      OR: [
        { trialStartDate: { not: null } },
        { plan: { in: ['STARTER', 'PROFESSIONAL', 'AGENCY'] } }
      ]
    }
  });
  
  const hasHadTrial = !!existingUser;
  
  return NextResponse.json({ 
    eligible: !hasHadTrial,
    reason: hasHadTrial ? 'TRIAL_ALREADY_USED' : null
  });
}
```

---

### Phase 5: PayPal Webhook Handler Updates

**File:** `src/app/api/webhooks/paypal/route.ts`

**Add Trial Handling to Existing Webhook:**

```typescript
export async function POST(req: Request) {
  const body = await req.json();
  const eventType = body.event_type;
  
  switch (eventType) {
    case 'BILLING.SUBSCRIPTION.ACTIVATED':
      await handleSubscriptionActivated(body);
      break;
      
    case 'PAYMENT.SALE.COMPLETED':
      await handlePaymentCompleted(body);
      break;
      
    // NEW: Handle trial conversion
    case 'BILLING.SUBSCRIPTION.UPDATED':
      await handleSubscriptionUpdated(body);
      break;
      
    default:
      console.log('Unhandled webhook event:', eventType);
  }
  
  return Response.json({ received: true });
}

async function handleSubscriptionActivated(body: any) {
  const subscriptionId = body.resource.id;
  const planId = body.resource.plan_id;
  const customId = body.resource.custom_id; // User ID
  
  // Check if this is a trial plan
  const isTrial = TRIAL_PLAN_IDS.includes(planId);
  
  if (isTrial) {
    // This is a trial subscription
    const plan = getPlanFromTrialPlanId(planId);
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 14);
    
    await prisma.user.update({
      where: { id: customId },
      data: {
        plan: plan,
        paypalSubscriptionId: subscriptionId,
        subscriptionStatus: 'ACTIVE',
        isInTrial: true,
        trialStartDate: new Date(),
        trialEndDate: trialEndDate,
        trialPlan: plan
      }
    });
    
    // Send welcome email
    await sendTrialWelcomeEmail(customId);
  } else {
    // Regular subscription (existing code)
    // ...
  }
}

async function handlePaymentCompleted(body: any) {
  const subscriptionId = body.resource.billing_agreement_id;
  
  // Find user by subscription ID
  const user = await prisma.user.findUnique({
    where: { paypalSubscriptionId: subscriptionId }
  });
  
  if (!user) return;
  
  // If user was in trial, mark as converted
  if (user.isInTrial) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isInTrial: false,
        trialConvertedAt: new Date()
      }
    });
    
    // Send conversion success email
    await sendTrialConvertedEmail(user.id);
  }
}

// Helper function
function getPlanFromTrialPlanId(planId: string): string {
  if (planId === process.env.PAYPAL_STARTER_TRIAL_PLAN_ID) return 'STARTER';
  if (planId === process.env.PAYPAL_PROFESSIONAL_TRIAL_PLAN_ID) return 'PROFESSIONAL';
  if (planId === process.env.PAYPAL_AGENCY_TRIAL_PLAN_ID) return 'AGENCY';
  throw new Error('Unknown trial plan ID');
}

const TRIAL_PLAN_IDS = [
  process.env.PAYPAL_STARTER_TRIAL_PLAN_ID,
  process.env.PAYPAL_PROFESSIONAL_TRIAL_PLAN_ID,
  process.env.PAYPAL_AGENCY_TRIAL_PLAN_ID
];
```

---

### Phase 6: Dashboard Trial Indicator Component

**File:** `src/components/dashboard/TrialBanner.tsx`

```typescript
'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export function TrialBanner() {
  const { data: session } = useSession();
  const [dismissed, setDismissed] = useState(false);
  
  if (!session?.user?.isInTrial || dismissed) return null;
  
  const daysRemaining = getDaysRemaining(session.user.trialEndDate);
  const plan = session.user.trialPlan;
  
  // Urgency styling based on days remaining
  const urgencyClass = daysRemaining <= 3 
    ? 'bg-red-100 border-red-500' 
    : daysRemaining <= 7 
    ? 'bg-yellow-100 border-yellow-500' 
    : 'bg-blue-100 border-blue-500';
  
  return (
    <div className={`border-l-4 p-4 mb-6 ${urgencyClass} relative`}>
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-900">
            ⏰ {plan} Trial: {daysRemaining} days remaining
          </p>
          <p className="text-sm text-gray-700 mt-1">
            Subscribe now to keep your {getClientLimit(plan)} clients and unlimited access.
          </p>
        </div>
        
        <Link
          href="/pricing"
          className="ml-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold whitespace-nowrap"
        >
          Subscribe Now
        </Link>
      </div>
    </div>
  );
}

function getDaysRemaining(trialEndDate: Date): number {
  const now = new Date();
  const end = new Date(trialEndDate);
  const diff = end.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getClientLimit(plan: string): number {
  const limits = { STARTER: 5, PROFESSIONAL: 15, AGENCY: 50 };
  return limits[plan as keyof typeof limits] || 1;
}
```

**Add to Dashboard Layout:**

**File:** `src/app/dashboard/layout.tsx`

```typescript
import { TrialBanner } from '@/components/dashboard/TrialBanner';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <div className="container mx-auto px-6 py-8">
        <TrialBanner /> {/* Add this */}
        {children}
      </div>
    </div>
  );
}
```

---

### Phase 7: Trial Email Automation

**Tool:** Resend (recommended), SendGrid, or Postmark

**Required Emails:**

1. **Day 1: Welcome Email**
2. **Day 7: Halfway Reminder**
3. **Day 10: Conversion Push (4 days left)**
4. **Day 13: Final Warning (1 day left)**
5. **Day 15: Post-Trial (converted or expired)**

**File:** `src/lib/email/trial-emails.ts`

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTrialWelcomeEmail(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;
  
  await resend.emails.send({
    from: 'Reportr <hello@reportr.agency>',
    to: user.email,
    subject: `Welcome to your ${user.trialPlan} trial! 🎉`,
    html: `
      <h1>Welcome to your 14-day ${user.trialPlan} trial!</h1>
      <p>You now have access to:</p>
      <ul>
        <li>${getClientLimit(user.trialPlan)} clients</li>
        <li>${getReportLimit(user.trialPlan)} reports per month</li>
        <li>All ${user.trialPlan} features</li>
      </ul>
      <p>Get started by <a href="https://reportr.agency/dashboard/clients">adding your first client</a>.</p>
      <p>Your trial ends on ${formatDate(user.trialEndDate)}.</p>
    `
  });
}

export async function sendTrialReminderEmail(userId: string, daysLeft: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;
  
  await resend.emails.send({
    from: 'Reportr <hello@reportr.agency>',
    to: user.email,
    subject: `⏰ ${daysLeft} days left in your trial`,
    html: `
      <h1>${daysLeft} days left in your ${user.trialPlan} trial</h1>
      <p>Don't lose access to your ${user.clientCount} clients and reports.</p>
      <p>Subscribe now to continue using Reportr after your trial ends.</p>
      <a href="https://reportr.agency/pricing" style="background: #7e23ce; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">
        Subscribe Now
      </a>
    `
  });
}

// Implement other email functions...
```

**Automated Email Trigger (Cron Job):**

**File:** `src/app/api/cron/trial-emails/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendTrialReminderEmail } from '@/lib/email/trial-emails';

export async function GET(req: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const today = new Date();
  
  // Find trials ending in 7 days
  const trials7Days = await prisma.user.findMany({
    where: {
      isInTrial: true,
      trialEndDate: {
        gte: new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000),
        lte: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      }
    }
  });
  
  for (const user of trials7Days) {
    await sendTrialReminderEmail(user.id, 7);
  }
  
  // Find trials ending in 4 days
  const trials4Days = await prisma.user.findMany({
    where: {
      isInTrial: true,
      trialEndDate: {
        gte: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
        lte: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000)
      }
    }
  });
  
  for (const user of trials4Days) {
    await sendTrialReminderEmail(user.id, 4);
  }
  
  // Find trials ending in 1 day
  const trials1Day = await prisma.user.findMany({
    where: {
      isInTrial: true,
      trialEndDate: {
        gte: new Date(today.getTime() + 0 * 24 * 60 * 60 * 1000),
        lte: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)
      }
    }
  });
  
  for (const user of trials1Day) {
    await sendTrialReminderEmail(user.id, 1);
  }
  
  return NextResponse.json({ 
    success: true, 
    processed: trials7Days.length + trials4Days.length + trials1Day.length 
  });
}
```

**Set Up Vercel Cron:**

**File:** `vercel.json`

```json
{
  "crons": [
    {
      "path": "/api/cron/trial-emails",
      "schedule": "0 10 * * *"
    }
  ]
}
```

*Runs daily at 10 AM UTC*

---

### Phase 8: Handle Payment Failures & Downgrades

**File:** `src/app/api/webhooks/paypal/route.ts` (add to existing)

```typescript
// Handle failed payments during trial conversion
case 'BILLING.SUBSCRIPTION.PAYMENT.FAILED':
  await handlePaymentFailed(body);
  break;

async function handlePaymentFailed(body: any) {
  const subscriptionId = body.resource.id;
  
  const user = await prisma.user.findUnique({
    where: { paypalSubscriptionId: subscriptionId }
  });
  
  if (!user) return;
  
  // If trial conversion failed, downgrade to FREE
  if (user.isInTrial || user.trialConvertedAt) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        plan: 'FREE',
        isInTrial: false,
        paypalSubscriptionId: null,
        subscriptionStatus: 'CANCELLED'
      }
    });
    
    // Send payment failed email
    await sendPaymentFailedEmail(user.id);
  }
}
```

---

## 🧪 Testing Checklist

### Manual Testing Steps:

**Test 1: STARTER Trial Flow**
- [ ] Click "Start 14-Day Trial" on STARTER tier
- [ ] Complete Google OAuth
- [ ] PayPal subscription screen appears
- [ ] Approve PayPal subscription (sandbox)
- [ ] Redirect to dashboard
- [ ] Verify user.plan = 'STARTER'
- [ ] Verify user.isInTrial = true
- [ ] Verify trial banner appears
- [ ] Verify can add 5 clients (STARTER limit)
- [ ] Verify can generate 20 reports (STARTER limit)

**Test 2: Trial Eligibility Check**
- [ ] Complete trial signup
- [ ] Log out
- [ ] Try to start another trial with same email
- [ ] Verify error: "Trial already used"

**Test 3: Trial Reminder Emails**
- [ ] Manually set trialEndDate to 7 days from now
- [ ] Trigger cron job
- [ ] Verify Day 7 email received
- [ ] Repeat for Day 4 and Day 1

**Test 4: Trial Conversion (Sandbox)**
- [ ] Create trial subscription in PayPal sandbox
- [ ] Manually advance trial period in PayPal (if possible)
- [ ] Verify payment processed
- [ ] Verify user.isInTrial = false
- [ ] Verify user.trialConvertedAt is set
- [ ] Verify trial banner disappears

**Test 5: Payment Failure**
- [ ] Start trial with invalid payment method (sandbox)
- [ ] Wait for conversion date
- [ ] Verify payment fails
- [ ] Verify user downgraded to FREE plan
- [ ] Verify email sent

**Test 6: Repeat for PROFESSIONAL and AGENCY**
- [ ] Test same flow for PROFESSIONAL tier
- [ ] Test same flow for AGENCY tier

---

## 📝 Environment Variables

Add to `.env.local` and Vercel:

```bash
# PayPal Trial Plan IDs
PAYPAL_STARTER_TRIAL_PLAN_ID=P-XXXXXXXXXXXXX
PAYPAL_PROFESSIONAL_TRIAL_PLAN_ID=P-YYYYYYYYYYYYY
PAYPAL_AGENCY_TRIAL_PLAN_ID=P-ZZZZZZZZZZZZZ

# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Cron Job Secret
CRON_SECRET=your_random_secret_here
```

---

## 📦 Deployment Steps

1. **Create PayPal Trial Plans** in PayPal Dashboard
2. **Run Database Migration:** `npx prisma migrate deploy`
3. **Update Environment Variables** in Vercel
4. **Deploy to Production**
5. **Test Trial Flow** with real PayPal sandbox account
6. **Set Up Cron Job** in Vercel (automatic via vercel.json)
7. **Monitor PayPal Webhooks** for proper event handling

---

## 🎯 Success Metrics

After implementation, track:

- **Trial Start Rate:** % of pricing page visitors who start trial
- **Trial Activation Rate:** % of trial users who generate ≥1 report
- **Trial-to-Paid Conversion:** % of trials that convert to paid subscriptions
- **Target:** 60-70% conversion rate (industry standard with payment upfront)

---

## ⚠️ Known Issues & Gotchas

### PayPal Trial Limitations:
- PayPal only allows ONE trial period per subscription plan
- If user cancels and re-subscribes, they won't get another trial
- Trial must be at the START of the subscription (can't add trial later)

### Cron Job Reliability:
- Vercel cron jobs may have slight delays (±5 minutes)
- For critical emails (Day 1 welcome), trigger immediately via webhook instead of cron

### Email Deliverability:
- Set up SPF, DKIM, and DMARC records for reportr.agency
- Use Resend's domain verification
- Monitor bounce rates

---

## 🚀 Future Enhancements (Optional)

### Phase 9: Advanced Features (Post-MVP)

1. **Trial Analytics Dashboard**
   - Real-time trial conversion metrics
   - Cohort analysis by signup source
   - Drop-off point identification

2. **A/B Testing Trial Lengths**
   - Test 7-day vs 14-day vs 30-day trials
   - Measure conversion rates

3. **Trial Extensions**
   - Allow one-time 7-day extension for engaged users
   - Triggered by support team or automated based on usage

4. **Win-Back Campaigns**
   - Email sequence for expired trials who didn't convert
   - Special offer (e.g., 20% off first month)

5. **White-Label Trials**
   - Allow trials with white-label enabled
   - Showcase full product value

---

## 📚 Additional Resources

- [PayPal Subscription Plans Documentation](https://developer.paypal.com/docs/subscriptions/)
- [PayPal Webhooks Guide](https://developer.paypal.com/api/rest/webhooks/)
- [Resend Email API](https://resend.com/docs/introduction)
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)

---

**Document Status:** Complete Implementation Guide
**Created:** November 2, 2025
**Author:** Implementation Planning Agent
**Estimated Development Time:** 2-3 days + 1 day testing
**Priority:** HIGH - Buttons currently misleading users
# Trial System Architecture Audit - Critical Information Gathering

**Date:** November 3, 2025  
**Purpose:** Gather existing trial implementation details before building in-app trial experience  
**Priority:** CRITICAL - Must understand current system before adding features

---

## 🎯 Objective

Audit the existing trial system that was fixed yesterday (STARTER/PROFESSIONAL/AGENCY trial buttons). We need to understand:

1. How trial tier selection works
2. Where trial data is stored
3. What logic already exists
4. What flows are already implemented
5. What we can leverage vs. what needs to be built

---

## 📋 CRITICAL QUESTIONS TO ANSWER

### 1. DATABASE SCHEMA AUDIT

**Check:** `prisma/schema.prisma`

**Questions:**
- [ ] Does `trialPlan` field exist in User model?
- [ ] If not, is there another field tracking which tier the user is trialing?
- [ ] What fields exist related to trials? (List ALL trial-related fields)
- [ ] Are there any trial-related models besides User?

**Provide:**
```prisma
// Copy the COMPLETE User model here
model User {
  // ... paste entire User model
}

// If any other trial-related models exist, paste them
```

---

### 2. TRIAL BUTTON IMPLEMENTATION AUDIT

**Check:** Pricing page component (likely `/src/app/pricing/page.tsx` or `/src/components/`)

**Questions:**
- [ ] What happens when user clicks "Start 14-Day Trial" on STARTER?
- [ ] What happens when user clicks "Start 14-Day Trial" on PROFESSIONAL?
- [ ] What happens when user clicks "Start 14-Day Trial" on AGENCY/ENTERPRISE?
- [ ] Is there an API endpoint called? Which one?
- [ ] Does it redirect somewhere? Where?
- [ ] Does it open a modal? Show the code.

**Provide:**
```typescript
// Copy the complete trial button click handler code
// Example:
const handleStartTrial = async (plan: Plan) => {
  // ... paste actual code here
};

// If it's in a separate file, provide the file path and relevant code
```

---

### 3. TRIAL ACTIVATION FLOW AUDIT

**Check:** API routes (likely `/src/app/api/trial/` or `/src/app/api/subscriptions/`)

**Questions:**
- [ ] What API endpoint handles trial activation?
- [ ] What does it do to the database?
- [ ] Does it set `plan` field? To what value?
- [ ] Does it set `trialStartDate` and `trialEndDate`?
- [ ] Does it set any other trial-related fields?
- [ ] Does it send any emails?
- [ ] Does it integrate with PayPal subscriptions?

**Provide:**
```typescript
// Copy the COMPLETE API route code for trial activation
// File path: _______
// Example: /src/app/api/trial/start/route.ts

export async function POST(req: Request) {
  // ... paste entire API route code here
}
```

---

### 4. TRIAL TIER STORAGE AUDIT

**Critical Question:** When a user starts a trial for PROFESSIONAL, how is that information stored?

**Scenarios to check:**

**Option A: Using `plan` field directly**
```typescript
// User trials PROFESSIONAL
user.plan = 'PROFESSIONAL'  // Set to trialed tier
user.trialStartDate = now
user.trialEndDate = now + 14 days

// After trial ends, they stay on PROFESSIONAL (need to pay)
// OR downgrade to FREE
```

**Option B: Using separate `trialPlan` field**
```typescript
// User trials PROFESSIONAL
user.plan = 'FREE'  // Base plan stays FREE
user.trialPlan = 'PROFESSIONAL'  // They're trialing this
user.trialStartDate = now
user.trialEndDate = now + 14 days

// After trial, if they don't pay:
user.plan = 'FREE'
user.trialPlan = null
```

**Option C: Something else entirely**
```typescript
// Describe how it actually works in your implementation
```

**Answer:** Which option matches your implementation? Provide the actual database update code.

---

### 5. TRIAL LIMITS ENFORCEMENT AUDIT

**Check:** Where client/report limits are enforced (likely `/src/lib/` utilities or middleware)

**Questions:**
- [ ] Is there a function that checks plan limits? Where?
- [ ] Does it consider trial status when checking limits?
- [ ] During a PROFESSIONAL trial, what limits does the user have?
  - Client limit: ___
  - Report limit: ___
  - White-label enabled: ___
- [ ] After trial ends (without payment), what limits apply?

**Provide:**
```typescript
// Copy the function that checks/enforces plan limits
// File path: _______

export function getPlanLimits(user: User) {
  // ... paste actual code here
}

// OR if it's done differently, show how limits are checked
```

---

### 6. TRIAL EXPIRATION LOGIC AUDIT

**Questions:**
- [ ] Is there any automatic trial expiration logic?
- [ ] What happens when trial ends? (automatic downgrade? grace period? lockout?)
- [ ] Is there a cron job or scheduled task?
- [ ] Is there middleware that checks trial status?

**Provide:**
```typescript
// If expiration logic exists, paste it here
// File path: _______

// If it doesn't exist yet, write: "NOT IMPLEMENTED YET"
```

---

### 7. USER EXPERIENCE FLOW AUDIT

**Walk through the complete flow:**

1. **New user signs up** → What happens?
   ```
   Step 1: User clicks "Sign in with Google"
   Step 2: ___________
   Step 3: ___________
   ```

2. **User clicks "Start 14-Day Trial" (PROFESSIONAL)** → What happens?
   ```
   Step 1: ___________
   Step 2: ___________
   Step 3: ___________
   ```

3. **User is now in trial** → Where can they see trial status?
   ```
   - Dashboard: Shows ___________ (or nothing)
   - Pricing page: Shows ___________ (or nothing)
   - Settings: Shows ___________ (or nothing)
   ```

4. **Trial ends (Day 14)** → What happens?
   ```
   - Automatic: ___________
   - Manual: ___________
   - User sees: ___________
   ```

---

### 8. EXISTING TRIAL UI AUDIT

**Questions:**
- [ ] Is there any trial status display already implemented?
- [ ] Does dashboard show "X days remaining"?
- [ ] Is there a trial badge anywhere?
- [ ] Are there any upgrade prompts already built?
- [ ] Does pricing page show different state for trial users?

**Provide:**
```typescript
// If ANY trial UI exists, paste the component code
// File path: _______

// If nothing exists, write: "NO TRIAL UI YET"
```

---

### 9. PAYPAL INTEGRATION WITH TRIALS

**Questions:**
- [ ] Are trials managed through PayPal's built-in trial feature?
- [ ] Or are trials managed completely in your app (separate from PayPal)?
- [ ] When trial ends, does PayPal subscription automatically start?
- [ ] Or does user need to manually create PayPal subscription?

**Provide:**
```typescript
// Copy any PayPal trial-related code
// File path: _______

// Explain the PayPal integration flow:
// "Trials are handled by: ___________ (app | PayPal | hybrid)"
```

---

### 10. EXISTING HELPER FUNCTIONS/UTILITIES

**Check:** `/src/lib/` for any trial-related utilities

**Questions:**
- [ ] Is there a `getTrialStatus()` function already?
- [ ] Is there a `getPlanLimits()` function already?
- [ ] Is there a `isInTrial()` helper?
- [ ] Are there any trial calculation utilities?

**Provide:**
```bash
# List all files in /src/lib/ that might be trial-related
ls -la /src/lib/ | grep -i trial

# Or manually list:
# - /src/lib/trial-utils.ts (exists/doesn't exist)
# - /src/lib/plan-limits.ts (exists/doesn't exist)
# - etc.
```

If any exist, paste the complete code.

---

## 📊 COMPREHENSIVE FILE AUDIT

Please provide the contents of these key files (if they exist):

### Priority 1: Critical Files
- [ ] `/prisma/schema.prisma` (User model only)
- [ ] `/src/app/pricing/page.tsx` (or wherever pricing page is)
- [ ] Trial activation API route (path: _______)
- [ ] Any trial-related utilities in `/src/lib/`

### Priority 2: Important Files
- [ ] Dashboard layout/page (where trial badge would go)
- [ ] Middleware (if it checks trial status)
- [ ] Settings/billing page (if it exists)

---

## 🎯 DELIVERABLE FORMAT

Please provide your findings in this format:

```markdown
# TRIAL SYSTEM AUDIT RESULTS

## 1. How Trial Tier Selection Works
[Explain the complete flow when user clicks "Start 14-Day Trial"]

## 2. Database Schema
```prisma
[Paste User model and any trial-related models]
```

## 3. Trial Storage Approach
[Option A | Option B | Option C - explain which one you use]

## 4. Trial Activation Code
```typescript
[Paste the actual trial activation code]
```

## 5. Limits Enforcement During Trial
[Explain how limits work during trial vs. after trial]

## 6. Trial Expiration Handling
[Explain what happens when trial ends]

## 7. Existing Trial UI
[List any trial-related UI components that exist]

## 8. PayPal Integration
[Explain how PayPal fits into trial system]

## 9. Missing Pieces
[List what's NOT implemented yet]

## 10. Files Provided
- `/path/to/file1.ts` - [brief description]
- `/path/to/file2.ts` - [brief description]
```

---

## 🚨 WHY THIS MATTERS

Before we build the in-app trial experience (badges, usage indicators, upgrade prompts), we need to:

1. **Not duplicate** existing functionality
2. **Not break** what's already working
3. **Integrate properly** with existing trial activation logic
4. **Use correct** data sources (plan vs. trialPlan)
5. **Enforce correct** limits during trial
6. **Build on top of** existing foundation

---

## ✅ SUCCESS CRITERIA

After this audit, we should be able to answer:

- ✅ How to detect if user is in trial
- ✅ How to know which tier they're trialing
- ✅ How to calculate days remaining
- ✅ How to get their current limits
- ✅ Where to place new trial UI components
- ✅ What already exists vs. what we need to build

---

**Start the audit now and provide comprehensive answers!** 🔍

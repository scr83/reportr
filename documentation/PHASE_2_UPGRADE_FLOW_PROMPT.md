# Phase 2: White-Label Upgrade Flow Implementation Prompt (PayPal Option A)

**Estimated Time:** 2-3 hours  
**Complexity:** Medium-High  
**Risk:** Medium (handles revenue flow)  
**Value:** High - Enables $20/month upsells for existing customers

---

## 🎯 OBJECTIVE

Implement a white-label upgrade flow using **PayPal Option A: Subscription Switching**.

### What This Enables:
- Existing customers (without white-label) can upgrade
- Toggle switch triggers upgrade modal for non-WL subscribers
- Modal shows benefits and $20/month add-on pricing
- "Upgrade Now" redirects to pricing page with upgrade context
- User subscribes to WL plan variant (billing cycle resets)
- Old subscription automatically cancelled by PayPal

### What User Sees:
```
User on STARTER ($29/month, no WL)
→ Goes to /settings/branding
→ Tries to enable white-label toggle
→ Modal pops up: "Upgrade to White-Label for +$20/month"
→ Clicks "Upgrade Now"
→ Redirects to /pricing?upgrade=whitelabel&from=STARTER
→ Pricing page highlights STARTER + WL option ($49/month)
→ User subscribes to PAYPAL_STARTER_WL_PLAN_ID
→ PayPal cancels old STARTER subscription
→ User now has white-label access ✓
```

---

## ✅ PRE-IMPLEMENTATION CHECKLIST

### 1. Verify PayPal Plan IDs in Environment Variables

**CRITICAL:** These must be set in production environment (Vercel):

```bash
# Base Plans
PAYPAL_STARTER_PLAN_ID=P-09S98046PD2685338ND3AO4Q
PAYPAL_PRO_PLAN_ID=P-9JC023812E1399125ND4NUAY
PAYPAL_AGENCY_PLAN_ID=P-6KN07205JA012891NND4NVSI

# White-Label Plans (+$20/month)
PAYPAL_STARTER_WL_PLAN_ID=P-2YF10717TE559492JND4NS5Y
PAYPAL_PRO_WL_PLAN_ID=P-7KR93055H1331572DND4NU7I
PAYPAL_AGENCY_WL_PLAN_ID=P-7JJ708823A489180TND4NWVI
```

**Verify in Vercel:**
```bash
# Go to: https://vercel.com/your-project/settings/environment-variables
# Check: All 6 plan IDs are present
```

### 2. Understand Database Fields

**User model must have:**
```prisma
model User {
  paypalSubscriptionId String?   // PayPal subscription ID
  paypalPlanId        String?   // Current plan ID (one of the 6 above)
  subscriptionStatus  String?   // "ACTIVE", "CANCELLED", etc.
  whiteLabelEnabled   Boolean   // Toggle state (ON/OFF)
}
```

### 3. Install Required Dependencies

**Check if already installed:**
```bash
# Required for modal
npm list @radix-ui/react-dialog
```

**If not installed:**
```bash
npm install @radix-ui/react-dialog
# or
npm install @headlessui/react  # Alternative
```

---

## 📝 TASK 1: Create Subscription Detection Utility

**File:** `/src/lib/utils/subscription-utils.ts` (CREATE NEW)

### Full Implementation:

```typescript
/**
 * Subscription Utilities
 * 
 * Detects user's current subscription status and determines
 * white-label eligibility and upgrade paths.
 */

import { User } from '@prisma/client'

export interface SubscriptionInfo {
  // Current subscription state
  hasActiveSubscription: boolean
  currentPlan: 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'AGENCY' | null
  currentPlanPrice: number
  
  // White-label status
  hasWhiteLabelSubscription: boolean
  canUpgradeToWhiteLabel: boolean
  
  // Upgrade details
  whiteLabelUpgradePlanId: string | null
  whiteLabelUpgradePrice: number
  upgradeTotalPrice: number
}

/**
 * Analyzes user's subscription and returns detailed info
 */
export function getSubscriptionInfo(user: User): SubscriptionInfo {
  // Check if user has any active subscription
  const hasActiveSubscription = !!(
    user.paypalSubscriptionId && 
    user.subscriptionStatus === 'ACTIVE'
  )
  
  // Default values
  let currentPlan: 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'AGENCY' | null = 'FREE'
  let currentPlanPrice = 0
  let hasWhiteLabelSubscription = false
  
  const planId = user.paypalPlanId
  
  // Determine current plan and WL status from paypalPlanId
  if (planId === process.env.PAYPAL_STARTER_PLAN_ID) {
    currentPlan = 'STARTER'
    currentPlanPrice = 29
    hasWhiteLabelSubscription = false
  } 
  else if (planId === process.env.PAYPAL_STARTER_WL_PLAN_ID) {
    currentPlan = 'STARTER'
    currentPlanPrice = 49
    hasWhiteLabelSubscription = true
  }
  else if (planId === process.env.PAYPAL_PRO_PLAN_ID) {
    currentPlan = 'PROFESSIONAL'
    currentPlanPrice = 99
    hasWhiteLabelSubscription = false
  }
  else if (planId === process.env.PAYPAL_PRO_WL_PLAN_ID) {
    currentPlan = 'PROFESSIONAL'
    currentPlanPrice = 119
    hasWhiteLabelSubscription = true
  }
  else if (planId === process.env.PAYPAL_AGENCY_PLAN_ID) {
    currentPlan = 'AGENCY'
    currentPlanPrice = 199
    hasWhiteLabelSubscription = false
  }
  else if (planId === process.env.PAYPAL_AGENCY_WL_PLAN_ID) {
    currentPlan = 'AGENCY'
    currentPlanPrice = 219
    hasWhiteLabelSubscription = true
  }
  else {
    // No subscription or unrecognized plan
    currentPlan = 'FREE'
    currentPlanPrice = 0
    hasWhiteLabelSubscription = false
  }
  
  // Determine if user can upgrade to white-label
  const canUpgradeToWhiteLabel = hasActiveSubscription && !hasWhiteLabelSubscription
  
  // Get the white-label upgrade plan ID
  let whiteLabelUpgradePlanId: string | null = null
  let whiteLabelUpgradePrice = 20 // Always +$20
  let upgradeTotalPrice = currentPlanPrice
  
  if (canUpgradeToWhiteLabel && currentPlan !== 'FREE') {
    switch (currentPlan) {
      case 'STARTER':
        whiteLabelUpgradePlanId = process.env.PAYPAL_STARTER_WL_PLAN_ID!
        upgradeTotalPrice = 49 // $29 + $20
        break
      case 'PROFESSIONAL':
        whiteLabelUpgradePlanId = process.env.PAYPAL_PRO_WL_PLAN_ID!
        upgradeTotalPrice = 119 // $99 + $20
        break
      case 'AGENCY':
        whiteLabelUpgradePlanId = process.env.PAYPAL_AGENCY_WL_PLAN_ID!
        upgradeTotalPrice = 219 // $199 + $20
        break
    }
  }
  
  return {
    hasActiveSubscription,
    currentPlan,
    currentPlanPrice,
    hasWhiteLabelSubscription,
    canUpgradeToWhiteLabel,
    whiteLabelUpgradePlanId,
    whiteLabelUpgradePrice,
    upgradeTotalPrice,
  }
}

/**
 * Get plan display name
 */
export function getPlanDisplayName(plan: string | null): string {
  switch (plan) {
    case 'STARTER': return 'Starter'
    case 'PROFESSIONAL': return 'Professional'
    case 'AGENCY': return 'Agency'
    case 'FREE':
    default:
      return 'Free'
  }
}
```

---

## 📝 TASK 2: Create Upgrade Modal Component

**File:** `/src/components/modals/WhiteLabelUpgradeModal.tsx` (CREATE NEW)

### Full Implementation:

```tsx
'use client'

import { X, Sparkles, Check } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

interface WhiteLabelUpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  currentPlan: string
  currentPlanPrice: number
  upgradeTotalPrice: number
  onUpgrade: () => void
}

export function WhiteLabelUpgradeModal({
  isOpen,
  onClose,
  currentPlan,
  currentPlanPrice,
  upgradeTotalPrice,
  onUpgrade
}: WhiteLabelUpgradeModalProps) {
  
  const planName = currentPlan.charAt(0) + currentPlan.slice(1).toLowerCase()
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-0 top-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Upgrade to White-Label
            </DialogTitle>
            <p className="mt-2 text-gray-600">
              Remove Reportr branding and use your own
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-3 mb-6">
            <BenefitItem text="Replace Reportr logo with your agency logo" />
            <BenefitItem text="Use your custom brand colors throughout" />
            <BenefitItem text="Show your company name in reports and dashboard" />
            <BenefitItem text="Remove 'Powered by Reportr' footer" />
            <BenefitItem text="Add your website and support email to PDFs" />
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{planName} Plan</span>
                <span className="font-medium text-gray-900">${currentPlanPrice}/month</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">White-Label Add-on</span>
                <span className="font-medium text-purple-600">+$20/month</span>
              </div>
              <div className="border-t border-purple-200 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">New Total</span>
                  <div>
                    <span className="text-2xl font-bold text-purple-600">
                      ${upgradeTotalPrice}
                    </span>
                    <span className="text-gray-600 text-sm">/month</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-purple-200">
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Note:</strong> Upgrading will switch you to the White-Label plan. 
                Your current subscription will be cancelled and a new billing cycle will 
                start today at ${upgradeTotalPrice}/month.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg 
                       text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Maybe Later
            </button>
            <button
              onClick={onUpgrade}
              className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg 
                       hover:bg-purple-700 transition-colors font-medium
                       shadow-sm hover:shadow-md"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
        <Check className="w-3 h-3 text-green-600" />
      </div>
      <span className="text-sm text-gray-700 leading-relaxed">{text}</span>
    </div>
  )
}
```

---

## 📝 TASK 3: Update Branding Settings Page

**File:** `/src/app/settings/branding/page.tsx`

### Changes Required:

#### 3.1: Add Imports

At the top of the file, add:

```tsx
import { useRouter } from 'next/navigation'
import { WhiteLabelUpgradeModal } from '@/components/modals/WhiteLabelUpgradeModal'
import { getSubscriptionInfo, getPlanDisplayName } from '@/lib/utils/subscription-utils'
import type { SubscriptionInfo } from '@/lib/utils/subscription-utils'
```

#### 3.2: Add State Variables

Add these to existing state section:

```tsx
const router = useRouter()
const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null)
const [showUpgradeModal, setShowUpgradeModal] = useState(false)
```

#### 3.3: Update useEffect to Load Subscription Info

Modify the existing `useEffect` that loads user profile:

```tsx
useEffect(() => {
  async function loadProfile() {
    try {
      const response = await fetch('/api/user/profile')
      if (!response.ok) throw new Error('Failed to load profile')
      
      const userData = await response.json()
      
      // Existing state setters
      setUser(userData)
      setWhiteLabelEnabled(userData.whiteLabelEnabled || false)
      setCompanyName(userData.companyName || '')
      setLogo(userData.logo || '')
      setPrimaryColor(userData.primaryColor || '#8B5CF6')
      setWebsite(userData.website || '')
      setSupportEmail(userData.supportEmail || '')
      
      // NEW: Calculate subscription info
      const subInfo = getSubscriptionInfo(userData)
      setSubscriptionInfo(subInfo)
      
    } catch (error) {
      console.error('Error loading profile:', error)
      toast.error('Failed to load profile settings')
    }
  }
  
  loadProfile()
}, [])
```

#### 3.4: Add Toggle Handler Logic

Replace the existing toggle onChange with this function:

```tsx
const handleToggleChange = (checked: boolean) => {
  if (!subscriptionInfo) return
  
  // If user is trying to ENABLE white-label
  if (checked) {
    // Check if user has white-label subscription
    if (!subscriptionInfo.hasWhiteLabelSubscription) {
      // User doesn't have WL → Show upgrade modal
      setShowUpgradeModal(true)
      return // Don't change toggle state
    }
    
    // User has WL subscription → Allow toggle ON
    setWhiteLabelEnabled(true)
    saveWhiteLabelSetting(true)
  } 
  else {
    // User is disabling white-label (always allowed)
    setWhiteLabelEnabled(false)
    saveWhiteLabelSetting(false)
  }
}

const saveWhiteLabelSetting = async (enabled: boolean) => {
  try {
    const response = await fetch('/api/user/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ whiteLabelEnabled: enabled })
    })
    
    if (!response.ok) throw new Error('Failed to save')
    
    toast.success(enabled ? 'White-label enabled!' : 'White-label disabled')
  } catch (error) {
    console.error('Error saving setting:', error)
    toast.error('Failed to update setting')
    // Revert toggle on error
    setWhiteLabelEnabled(!enabled)
  }
}
```

#### 3.5: Add Upgrade Handler

Add this function:

```tsx
const handleUpgrade = () => {
  if (!subscriptionInfo?.currentPlan) return
  
  // Close modal
  setShowUpgradeModal(false)
  
  // Redirect to pricing page with upgrade context
  router.push(`/pricing?upgrade=whitelabel&from=${subscriptionInfo.currentPlan}`)
}
```

#### 3.6: Update Toggle Section UI

Find the section with the white-label toggle and update it:

```tsx
{/* White-Label Toggle Section */}
<div className="bg-white rounded-lg shadow p-6 mb-6">
  <div className="flex items-center justify-between">
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-gray-900">
        Enable White-Label Branding
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        {subscriptionInfo?.hasWhiteLabelSubscription
          ? 'Remove Reportr branding and use your own'
          : subscriptionInfo?.hasActiveSubscription
          ? 'Requires white-label subscription (+$20/month)'
          : 'Subscribe to a plan to enable white-label branding'}
      </p>
    </div>
    
    <div className="flex items-center gap-3">
      {/* Show upgrade badge if user can upgrade */}
      {subscriptionInfo?.canUpgradeToWhiteLabel && (
        <span className="text-xs font-semibold text-purple-600 bg-purple-50 
                       px-3 py-1.5 rounded-full whitespace-nowrap">
          +$20/mo
        </span>
      )}
      
      <Switch
        checked={whiteLabelEnabled}
        onCheckedChange={handleToggleChange}
        disabled={!subscriptionInfo?.hasActiveSubscription}
      />
    </div>
  </div>
  
  {/* Show helpful message for FREE users */}
  {!subscriptionInfo?.hasActiveSubscription && (
    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <p className="text-sm text-blue-800">
        Subscribe to any plan to unlock white-label branding. 
        <a href="/pricing" className="font-medium underline ml-1">
          View plans →
        </a>
      </p>
    </div>
  )}
</div>
```

#### 3.7: Add Modal at End of Component

Add this before the closing `</div>` of the main component:

```tsx
{/* Upgrade Modal */}
{subscriptionInfo && (
  <WhiteLabelUpgradeModal
    isOpen={showUpgradeModal}
    onClose={() => setShowUpgradeModal(false)}
    currentPlan={subscriptionInfo.currentPlan || 'STARTER'}
    currentPlanPrice={subscriptionInfo.currentPlanPrice}
    upgradeTotalPrice={subscriptionInfo.upgradeTotalPrice}
    onUpgrade={handleUpgrade}
  />
)}
```

---

## 📝 TASK 4: Update Pricing Page for Upgrade Flow

**File:** `/src/app/pricing/page.tsx`

### Changes Required:

#### 4.1: Add Imports

```tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Info } from 'lucide-react'
import { getPlanDisplayName } from '@/lib/utils/subscription-utils'
```

#### 4.2: Add State and Search Params

At the top of the component:

```tsx
export default function PricingPage() {
  const searchParams = useSearchParams()
  const [showUpgradeNotice, setShowUpgradeNotice] = useState(false)
  const [upgradeFromPlan, setUpgradeFromPlan] = useState<string | null>(null)

  useEffect(() => {
    const upgrade = searchParams.get('upgrade')
    const fromPlan = searchParams.get('from')
    
    if (upgrade === 'whitelabel' && fromPlan) {
      setShowUpgradeNotice(true)
      setUpgradeFromPlan(fromPlan)
    }
  }, [searchParams])
  
  // ... rest of component
```

#### 4.3: Add Upgrade Notice Banner

Add this near the top of the return statement (before pricing cards):

```tsx
{/* Upgrade Notice Banner */}
{showUpgradeNotice && upgradeFromPlan && (
  <div className="max-w-5xl mx-auto mb-8 px-4">
    <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <Info className="h-5 w-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-purple-900 mb-1">
            Upgrading to White-Label
          </h3>
          <p className="text-sm text-purple-800 leading-relaxed">
            You're upgrading from <strong>{getPlanDisplayName(upgradeFromPlan)}</strong> to 
            add White-Label branding (+$20/month). Select your new plan below to complete the upgrade.
          </p>
          <p className="text-xs text-purple-700 mt-2">
            💡 Choose the same tier with "White-Label" to maintain your features.
          </p>
        </div>
      </div>
    </div>
  </div>
)}
```

#### 4.4: Highlight Appropriate Plan (Optional Enhancement)

In your pricing card rendering logic, you can add visual highlighting:

```tsx
// For each pricing tier card
const isUpgradeTarget = showUpgradeNotice && 
                       tier === upgradeFromPlan && 
                       card.includes('White-Label')

<div className={`pricing-card ${isUpgradeTarget ? 'ring-2 ring-purple-500' : ''}`}>
  {isUpgradeTarget && (
    <div className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
      RECOMMENDED UPGRADE
    </div>
  )}
  {/* ... rest of pricing card */}
</div>
```

---

## ✅ VERIFICATION CHECKLIST

### Scenario 1: FREE User (No Subscription)

- [ ] Navigate to `/settings/branding`
- [ ] Toggle should be **DISABLED** (grayed out)
- [ ] Message shows: "Subscribe to a plan to enable white-label branding"
- [ ] Blue banner shows link to pricing
- [ ] Clicking toggle does nothing

### Scenario 2: STARTER User (No White-Label)

- [ ] Navigate to `/settings/branding`
- [ ] Toggle should be **ENABLED** (clickable)
- [ ] Badge shows "+$20/mo" next to toggle
- [ ] Message shows: "Requires white-label subscription (+$20/month)"
- [ ] Click toggle ON → **Upgrade modal appears**
- [ ] Modal shows:
  - [ ] Sparkles icon
  - [ ] "Upgrade to White-Label" title
  - [ ] 5 benefit checkmarks
  - [ ] Pricing: Starter Plan $29/month
  - [ ] Pricing: White-Label Add-on +$20/month
  - [ ] Pricing: New Total $49/month
  - [ ] Note about billing cycle reset
- [ ] Click "Maybe Later" → Modal closes, toggle stays OFF
- [ ] Click toggle ON again → Modal appears
- [ ] Click "Upgrade Now" → **Redirects to `/pricing?upgrade=whitelabel&from=STARTER`**

### Scenario 3: Pricing Page After Redirect

- [ ] URL is `/pricing?upgrade=whitelabel&from=STARTER`
- [ ] Purple banner appears at top:
  - [ ] Info icon
  - [ ] "Upgrading to White-Label" title
  - [ ] Message mentions upgrading from Starter
  - [ ] "+$20/month" mentioned
- [ ] Starter + White-Label card is highlighted (optional)
- [ ] User can subscribe to STARTER_WL plan

### Scenario 4: STARTER_WL User (Has White-Label)

- [ ] Navigate to `/settings/branding`
- [ ] Toggle should be **ENABLED**
- [ ] NO "+$20/mo" badge
- [ ] Message shows: "Remove Reportr branding and use your own"
- [ ] Click toggle ON → **No modal**, just enables
- [ ] Branding fields appear below
- [ ] Click toggle OFF → Disables (no modal)
- [ ] Toggle works freely (ON/OFF)

### Scenario 5: PROFESSIONAL & AGENCY Tiers

Test both PRO and AGENCY plans:

- [ ] **PRO (no WL):** Modal shows $99 + $20 = $119/month
- [ ] **PRO_WL:** Toggle works freely, no modal
- [ ] **AGENCY (no WL):** Modal shows $199 + $20 = $219/month
- [ ] **AGENCY_WL:** Toggle works freely, no modal

### Technical Verification

- [ ] Open DevTools → Console
- [ ] No JavaScript errors
- [ ] Check Network tab during toggle click
- [ ] If showing modal: No API calls made (correct!)
- [ ] If has WL: PATCH to `/api/user/profile` with `whiteLabelEnabled`

### Database Verification

```bash
# Open Prisma Studio
npx prisma studio

# Check your test user
# Verify: paypalPlanId matches one of the 6 plan IDs
# Verify: subscriptionStatus is "ACTIVE"
```

---

## 🐛 TROUBLESHOOTING

### Issue: "All toggles show upgrade modal"

**Cause:** `getSubscriptionInfo` not detecting WL plan correctly

**Fix:** Check environment variables are loaded:
```typescript
console.log('Plan IDs:', {
  STARTER_WL: process.env.PAYPAL_STARTER_WL_PLAN_ID,
  PRO_WL: process.env.PAYPAL_PRO_WL_PLAN_ID,
  AGENCY_WL: process.env.PAYPAL_AGENCY_WL_PLAN_ID,
})
```

Ensure `next.config.js` exposes them:
```javascript
env: {
  PAYPAL_STARTER_WL_PLAN_ID: process.env.PAYPAL_STARTER_WL_PLAN_ID,
  // ... etc
}
```

### Issue: "Modal doesn't show correct pricing"

**Check:** `subscriptionInfo` is being calculated correctly:
```typescript
console.log('Subscription Info:', subscriptionInfo)
```

Verify:
- `currentPlan` matches user's tier
- `currentPlanPrice` is correct
- `upgradeTotalPrice` = currentPlanPrice + 20

### Issue: "Redirect doesn't work"

**Check:** `useRouter` from `next/navigation` (not `next/router`):
```typescript
import { useRouter } from 'next/navigation' // ✓ Correct
// NOT: import { useRouter } from 'next/router' // ✗ Wrong
```

### Issue: "FREE users can enable toggle"

**Check:** Toggle `disabled` prop:
```tsx
<Switch
  disabled={!subscriptionInfo?.hasActiveSubscription}  // Must have this
  checked={whiteLabelEnabled}
  onCheckedChange={handleToggleChange}
/>
```

### Issue: "Modal styling looks broken"

**Ensure:** Dialog component is properly installed:
```bash
# Check if installed
npm list @radix-ui/react-dialog

# If not, install
npm install @radix-ui/react-dialog
```

**Create:** `/src/components/ui/dialog.tsx` if missing:
```bash
# Use shadcn CLI
npx shadcn-ui@latest add dialog
```

---

## 📦 FILES CREATED/MODIFIED SUMMARY

### New Files Created:
```
/src/lib/utils/subscription-utils.ts
/src/components/modals/WhiteLabelUpgradeModal.tsx
```

### Files Modified:
```
/src/app/settings/branding/page.tsx  (major updates)
/src/app/pricing/page.tsx            (upgrade banner)
```

### No Changes Needed:
```
/src/app/api/user/profile/route.ts   (already handles whiteLabelEnabled)
Database schema                       (no new fields needed)
```

---

## 🚀 DEPLOYMENT

### Step 1: Test Locally First

```bash
# Run local development server
npm run dev

# Test all scenarios (use checklist above)
# Verify modal shows/hides correctly
# Verify pricing calculations
# Verify redirects work
```

### Step 2: Commit Changes

```bash
# Stage new files
git add src/lib/utils/subscription-utils.ts
git add src/components/modals/WhiteLabelUpgradeModal.tsx

# Stage modified files
git add src/app/settings/branding/page.tsx
git add src/app/pricing/page.tsx

# Commit with descriptive message
git commit -m "feat: Phase 2 - White-label upgrade flow with PayPal subscription switching

- Add subscription detection utility (getSubscriptionInfo)
- Create WhiteLabelUpgradeModal component
- Update branding settings toggle with upgrade logic
- Add upgrade context banner to pricing page
- Implement Option A: subscription switching flow
- Show +$20/mo badge for non-WL subscribers
- Disable toggle for FREE users with helpful message"
```

### Step 3: Push to Production

```bash
# Push to trigger Vercel deployment
git push origin main

# Monitor deployment
# Watch: https://vercel.com/dashboard
# Wait: 2-3 minutes
```

### Step 4: Verify Environment Variables in Vercel

```bash
# Go to: https://vercel.com/your-project/settings/environment-variables
# Ensure all 6 PayPal plan IDs are present
# If missing, add them and redeploy
```

### Step 5: Production Testing

Use the verification checklist above on production:
- Test with FREE account
- Test with STARTER (no WL) account
- Test with STARTER_WL account
- Verify modal appears correctly
- Verify redirects work
- Check pricing page banner

---

## ⏱️ TIME ESTIMATES

- **Task 1 (Subscription Utils):** 30 minutes
- **Task 2 (Upgrade Modal):** 45 minutes
- **Task 3 (Branding Settings):** 60 minutes
- **Task 4 (Pricing Page):** 30 minutes
- **Testing:** 30 minutes

**Total:** ~3 hours

---

## 🎯 SUCCESS CRITERIA

**Phase 2 is complete when:**

1. ✅ Subscription detection utility works for all 6 plan types
2. ✅ Upgrade modal appears for non-WL subscribers
3. ✅ Modal shows correct pricing for each tier
4. ✅ "Upgrade Now" redirects to pricing page correctly
5. ✅ Pricing page shows upgrade banner
6. ✅ Toggle works freely for WL subscribers
7. ✅ Toggle is disabled for FREE users
8. ✅ All tests pass for all user scenarios
9. ✅ Deployed to production
10. ✅ Verified working in production

---

## 💰 BUSINESS IMPACT

### Revenue Enablement:
- Existing customers can now upgrade to white-label
- Clear $20/month value proposition
- Reduced friction in upgrade flow
- Path to recurring revenue increase

### User Experience:
- Clear eligibility messaging
- Professional upgrade modal
- Transparent pricing breakdown
- Helpful guidance throughout flow

### Technical Quality:
- Type-safe subscription detection
- Proper state management
- Clean modal UI with accessibility
- Error-free deployment

---

**Ready to implement! Good luck!** 🚀💰

*Created: October 27, 2025*

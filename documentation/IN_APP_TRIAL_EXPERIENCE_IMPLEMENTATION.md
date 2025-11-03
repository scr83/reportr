# In-App Trial Experience - Implementation Guide

**Date:** November 3, 2025  
**Priority:** HIGH - Conversion Optimization  
**Estimated Time:** 4-6 hours  
**Dependencies:** Email verification system (✅ completed)

---

## 🎯 Objective

Create a conversion-optimized in-app trial experience that:
1. Shows users their trial status prominently
2. Tracks and displays usage against limits
3. Progressively increases upgrade messaging as trial progresses
4. Makes upgrading frictionless

---

## 📊 Current State

### What We Have ✅
- Email verification system working
- Trial dates set on verification (`trialStartDate`, `trialEndDate`)
- Plan limits defined in database
- PayPal subscription system
- Pricing page

### What We're Building
- Trial status badge (days remaining)
- Usage indicators (clients/reports used vs. limits)
- Progressive upgrade prompts (changes based on trial day)
- Upgrade CTAs throughout the app

---

## 🏗️ Implementation Checklist

### Phase 1: Trial Status Utilities
- [ ] Create trial calculation helper functions
- [ ] Add trial status to session/context
- [ ] Create reusable hooks for trial data

### Phase 2: Trial Badge Component
- [ ] Design and implement trial badge
- [ ] Position in dashboard header
- [ ] Add countdown timer
- [ ] Link to pricing page

### Phase 3: Usage Tracking Display
- [ ] Show clients used vs. limit
- [ ] Show reports generated vs. limit
- [ ] Add visual progress bars
- [ ] Warning states at 80%+ usage

### Phase 4: Progressive Disclosure
- [ ] Days 1-7: Encouraging usage messaging
- [ ] Days 8-10: Upgrade benefits highlighting
- [ ] Days 11-14: Aggressive upgrade prompts
- [ ] Post-trial: Lockout or downgrade messaging

### Phase 5: Strategic Upgrade CTAs
- [ ] Dashboard upgrade prompt
- [ ] Clients page upgrade CTA
- [ ] Reports page upgrade CTA
- [ ] Settings page upgrade banner

---

## 🔧 Step 1: Trial Status Utilities

### File: `src/lib/trial-utils.ts`

Create helper functions for trial calculations:

```typescript
import { User } from '@prisma/client';

export interface TrialStatus {
  isInTrial: boolean;
  isTrialExpired: boolean;
  daysRemaining: number;
  daysInTrial: number;
  trialEndDate: Date | null;
  trialPhase: 'early' | 'mid' | 'ending' | 'expired' | 'none';
}

/**
 * Calculate detailed trial status for a user
 */
export function getTrialStatus(user: User): TrialStatus {
  // Not in trial if no trial dates set
  if (!user.trialStartDate || !user.trialEndDate) {
    return {
      isInTrial: false,
      isTrialExpired: false,
      daysRemaining: 0,
      daysInTrial: 0,
      trialEndDate: null,
      trialPhase: 'none',
    };
  }

  const now = new Date();
  const trialStart = new Date(user.trialStartDate);
  const trialEnd = new Date(user.trialEndDate);
  
  // Calculate days
  const totalTrialDays = Math.ceil((trialEnd.getTime() - trialStart.getTime()) / (1000 * 60 * 60 * 24));
  const daysInTrial = Math.ceil((now.getTime() - trialStart.getTime()) / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  const isTrialExpired = now > trialEnd;
  const isInTrial = !isTrialExpired && user.plan === 'FREE';
  
  // Determine trial phase for progressive disclosure
  let trialPhase: TrialStatus['trialPhase'];
  
  if (isTrialExpired) {
    trialPhase = 'expired';
  } else if (!isInTrial) {
    trialPhase = 'none'; // User has upgraded
  } else if (daysRemaining <= 3) {
    trialPhase = 'ending'; // Days 11-14: Aggressive prompts
  } else if (daysRemaining <= 7) {
    trialPhase = 'mid'; // Days 8-10: Show upgrade benefits
  } else {
    trialPhase = 'early'; // Days 1-7: Encourage usage
  }
  
  return {
    isInTrial,
    isTrialExpired,
    daysRemaining: Math.max(0, daysRemaining),
    daysInTrial: Math.max(0, daysInTrial),
    trialEndDate: trialEnd,
    trialPhase,
  };
}

/**
 * Get plan limits based on user's plan
 */
export function getPlanLimits(plan: User['plan']) {
  const limits = {
    FREE: {
      clients: 1,
      reportsPerMonth: 5,
      whiteLabelEnabled: false,
    },
    STARTER: {
      clients: 5,
      reportsPerMonth: 20,
      whiteLabelEnabled: false,
    },
    PROFESSIONAL: {
      clients: 15,
      reportsPerMonth: 75,
      whiteLabelEnabled: true,
    },
    ENTERPRISE: {
      clients: 50,
      reportsPerMonth: 250,
      whiteLabelEnabled: true,
    },
  };
  
  return limits[plan];
}

/**
 * Get usage status with warnings
 */
export interface UsageStatus {
  clients: {
    used: number;
    limit: number;
    percentage: number;
    isAtLimit: boolean;
    isNearLimit: boolean; // 80%+
  };
  reports: {
    used: number;
    limit: number;
    percentage: number;
    isAtLimit: boolean;
    isNearLimit: boolean; // 80%+
  };
}

export function getUsageStatus(
  clientCount: number,
  reportCount: number,
  plan: User['plan']
): UsageStatus {
  const limits = getPlanLimits(plan);
  
  const clientPercentage = (clientCount / limits.clients) * 100;
  const reportPercentage = (reportCount / limits.reportsPerMonth) * 100;
  
  return {
    clients: {
      used: clientCount,
      limit: limits.clients,
      percentage: clientPercentage,
      isAtLimit: clientCount >= limits.clients,
      isNearLimit: clientPercentage >= 80,
    },
    reports: {
      used: reportCount,
      limit: limits.reportsPerMonth,
      percentage: reportPercentage,
      isAtLimit: reportCount >= limits.reportsPerMonth,
      isNearLimit: reportPercentage >= 80,
    },
  };
}

/**
 * Get messaging based on trial phase
 */
export function getTrialMessaging(trialPhase: TrialStatus['trialPhase'], daysRemaining: number) {
  const messaging = {
    early: {
      title: '🎉 Welcome to your trial!',
      description: 'Explore all features and generate professional reports for free.',
      cta: 'Get Started',
      urgency: 'low',
    },
    mid: {
      title: `⏰ ${daysRemaining} days left in trial`,
      description: 'Upgrade now to keep generating unlimited reports for your clients.',
      cta: 'View Upgrade Options',
      urgency: 'medium',
    },
    ending: {
      title: `⚠️ Trial ending in ${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'}!`,
      description: 'Subscribe now to avoid losing access to your reports and clients.',
      cta: 'Upgrade Now - Don\'t Lose Access',
      urgency: 'high',
    },
    expired: {
      title: '❌ Trial expired',
      description: 'Your trial has ended. Upgrade to continue generating reports.',
      cta: 'Upgrade to Continue',
      urgency: 'critical',
    },
    none: {
      title: '',
      description: '',
      cta: '',
      urgency: 'none',
    },
  };
  
  return messaging[trialPhase];
}
```

---

## 🎨 Step 2: Trial Badge Component

### File: `src/components/molecules/TrialBadge.tsx`

Create a prominent trial status badge:

```typescript
'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { AlertCircle, Clock, Zap } from 'lucide-react';
import { getTrialStatus, getTrialMessaging } from '@/lib/trial-utils';

export function TrialBadge() {
  const { data: session } = useSession();
  
  if (!session?.user) return null;
  
  const trialStatus = getTrialStatus(session.user);
  
  // Don't show badge if not in trial or trial expired (show different component)
  if (!trialStatus.isInTrial) return null;
  
  const messaging = getTrialMessaging(trialStatus.trialPhase, trialStatus.daysRemaining);
  
  // Color scheme based on urgency
  const urgencyStyles = {
    low: 'bg-blue-50 border-blue-200 text-blue-900',
    medium: 'bg-yellow-50 border-yellow-300 text-yellow-900',
    high: 'bg-orange-50 border-orange-300 text-orange-900',
    critical: 'bg-red-50 border-red-300 text-red-900',
    none: '',
  };
  
  const urgencyIconColor = {
    low: 'text-blue-600',
    medium: 'text-yellow-600',
    high: 'text-orange-600',
    critical: 'text-red-600',
    none: '',
  };
  
  const Icon = trialStatus.trialPhase === 'ending' ? AlertCircle : 
               trialStatus.trialPhase === 'mid' ? Clock : Zap;
  
  return (
    <div className={`
      rounded-lg border-2 p-4 mb-6 
      ${urgencyStyles[messaging.urgency as keyof typeof urgencyStyles]}
      transition-all duration-300 hover:shadow-lg
    `}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Icon className={`
            w-5 h-5 mt-0.5 flex-shrink-0
            ${urgencyIconColor[messaging.urgency as keyof typeof urgencyIconColor]}
          `} />
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">
              {messaging.title}
            </h3>
            <p className="text-sm opacity-90 mb-3">
              {messaging.description}
            </p>
            
            {/* Trial countdown */}
            <div className="flex items-center gap-2 text-sm font-medium mb-3">
              <Clock className="w-4 h-4" />
              <span>
                {trialStatus.daysRemaining} {trialStatus.daysRemaining === 1 ? 'day' : 'days'} remaining
              </span>
              <span className="opacity-60">•</span>
              <span className="opacity-75">
                Ends {trialStatus.trialEndDate?.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        {/* CTA Button */}
        <Link
          href="/settings/billing"
          className={`
            px-6 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap
            transition-all duration-200 hover:scale-105 hover:shadow-md
            ${messaging.urgency === 'high' || messaging.urgency === 'critical' 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
              : 'bg-purple-600 text-white hover:bg-purple-700'
            }
          `}
        >
          {messaging.cta}
        </Link>
      </div>
    </div>
  );
}
```

---

## 📊 Step 3: Usage Indicators Component

### File: `src/components/molecules/UsageIndicators.tsx`

Display client and report usage with progress bars:

```typescript
'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Users, FileText, TrendingUp } from 'lucide-react';
import { getPlanLimits, getUsageStatus } from '@/lib/trial-utils';

interface UsageIndicatorsProps {
  clientCount: number;
  reportCount: number;
}

export function UsageIndicators({ clientCount, reportCount }: UsageIndicatorsProps) {
  const { data: session } = useSession();
  
  if (!session?.user) return null;
  
  const usage = getUsageStatus(clientCount, reportCount, session.user.plan);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Clients Usage */}
      <UsageCard
        icon={Users}
        label="Clients"
        used={usage.clients.used}
        limit={usage.clients.limit}
        percentage={usage.clients.percentage}
        isAtLimit={usage.clients.isAtLimit}
        isNearLimit={usage.clients.isNearLimit}
      />
      
      {/* Reports Usage */}
      <UsageCard
        icon={FileText}
        label="Reports This Month"
        used={usage.reports.used}
        limit={usage.reports.limit}
        percentage={usage.reports.percentage}
        isAtLimit={usage.reports.isAtLimit}
        isNearLimit={usage.reports.isNearLimit}
      />
    </div>
  );
}

interface UsageCardProps {
  icon: React.ElementType;
  label: string;
  used: number;
  limit: number;
  percentage: number;
  isAtLimit: boolean;
  isNearLimit: boolean;
}

function UsageCard({ icon: Icon, label, used, limit, percentage, isAtLimit, isNearLimit }: UsageCardProps) {
  const getColorClasses = () => {
    if (isAtLimit) return 'text-red-600 bg-red-50 border-red-200';
    if (isNearLimit) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-blue-600 bg-blue-50 border-blue-200';
  };
  
  const getProgressBarColor = () => {
    if (isAtLimit) return 'bg-red-500';
    if (isNearLimit) return 'bg-orange-500';
    return 'bg-blue-500';
  };
  
  return (
    <div className={`
      rounded-lg border-2 p-4
      ${getColorClasses()}
      transition-all duration-200
    `}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5" />
          <span className="font-medium text-sm">{label}</span>
        </div>
        
        <span className="font-bold text-lg">
          {used} / {limit}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getProgressBarColor()}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      
      {/* Warning Messages */}
      {isAtLimit && (
        <p className="text-xs mt-2 font-medium">
          ⚠️ Limit reached. <Link href="/settings/billing" className="underline">Upgrade to add more</Link>
        </p>
      )}
      {isNearLimit && !isAtLimit && (
        <p className="text-xs mt-2 font-medium">
          📊 Approaching limit. <Link href="/settings/billing" className="underline">Consider upgrading</Link>
        </p>
      )}
    </div>
  );
}
```

---

## 🎯 Step 4: Progressive Upgrade Prompts

### File: `src/components/organisms/ProgressiveUpgradePrompt.tsx`

Context-aware upgrade prompts that change based on trial phase:

```typescript
'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';
import { getTrialStatus, getTrialMessaging } from '@/lib/trial-utils';

interface ProgressiveUpgradePromptProps {
  context?: 'dashboard' | 'clients' | 'reports' | 'settings';
}

export function ProgressiveUpgradePrompt({ context = 'dashboard' }: ProgressiveUpgradePromptProps) {
  const { data: session } = useSession();
  
  if (!session?.user) return null;
  
  const trialStatus = getTrialStatus(session.user);
  
  // Only show for trial users
  if (!trialStatus.isInTrial) return null;
  
  // Don't show during early phase on dashboard (let them explore)
  if (trialStatus.trialPhase === 'early' && context === 'dashboard') {
    return null;
  }
  
  const messaging = getTrialMessaging(trialStatus.trialPhase, trialStatus.daysRemaining);
  
  // Context-specific benefits
  const contextBenefits = {
    dashboard: [
      'Unlimited clients and reports',
      'White-label branding',
      'Priority support',
    ],
    clients: [
      'Add up to 50 clients',
      'Unlimited report generation',
      'Advanced client analytics',
    ],
    reports: [
      'Generate unlimited reports',
      'Custom report templates',
      'Scheduled report delivery',
    ],
    settings: [
      'Full white-label customization',
      'Custom domain support',
      'API access',
    ],
  };
  
  const benefits = contextBenefits[context];
  
  // Aggressive prompt for ending phase
  if (trialStatus.trialPhase === 'ending') {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white mb-6">
        <div className="flex items-start gap-4">
          <Zap className="w-8 h-8 flex-shrink-0" />
          
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">
              ⏰ Trial Ending in {trialStatus.daysRemaining} {trialStatus.daysRemaining === 1 ? 'Day' : 'Days'}!
            </h3>
            <p className="text-white/90 mb-4">
              Don't lose access to your reports and clients. Upgrade now to continue your SEO reporting workflow without interruption.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Link
                href="/settings/billing"
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Upgrade Now - From $29/month
              </Link>
              
              <Link
                href="/settings/billing"
                className="border-2 border-white/50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View All Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Mid-phase: Show benefits
  if (trialStatus.trialPhase === 'mid') {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <TrendingUp className="w-6 h-6 text-purple-600 flex-shrink-0" />
          
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Upgrade to unlock full potential
            </h3>
            <p className="text-gray-700 mb-4">
              {trialStatus.daysRemaining} days left in your trial. Here's what you'll get with a paid plan:
            </p>
            
            <ul className="space-y-2 mb-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-800">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <Link
              href="/settings/billing"
              className="inline-block bg-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
}
```

---

## 📍 Step 5: Integration Points

### A. Dashboard Layout

Add trial badge and usage indicators to dashboard:

```typescript
// src/app/dashboard/page.tsx or layout

import { TrialBadge } from '@/components/molecules/TrialBadge';
import { UsageIndicators } from '@/components/molecules/UsageIndicators';
import { ProgressiveUpgradePrompt } from '@/components/organisms/ProgressiveUpgradePrompt';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const clientCount = await prisma.client.count({ where: { userId: session.user.id } });
  const reportCount = await prisma.report.count({
    where: {
      userId: session.user.id,
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // This month
      },
    },
  });
  
  return (
    <div className="p-6">
      {/* Trial Badge - Shows prominently */}
      <TrialBadge />
      
      {/* Usage Indicators */}
      <UsageIndicators clientCount={clientCount} reportCount={reportCount} />
      
      {/* Progressive Upgrade Prompt */}
      <ProgressiveUpgradePrompt context="dashboard" />
      
      {/* Rest of dashboard content */}
      {/* ... */}
    </div>
  );
}
```

### B. Clients Page

Add usage indicator and upgrade prompt:

```typescript
// src/app/clients/page.tsx

<div>
  <UsageIndicators clientCount={clients.length} reportCount={reportCount} />
  <ProgressiveUpgradePrompt context="clients" />
  
  {/* Clients table */}
</div>
```

### C. Reports Page

Add usage and contextual upgrade:

```typescript
// src/app/reports/page.tsx

<div>
  <UsageIndicators clientCount={clientCount} reportCount={reports.length} />
  <ProgressiveUpgradePrompt context="reports" />
  
  {/* Reports grid */}
</div>
```

---

## ✅ Testing Checklist

### Trial Status Display
- [ ] Trial badge shows correct days remaining
- [ ] Badge urgency styling changes appropriately (Days 1-7, 8-10, 11-14)
- [ ] Badge disappears after trial ends or upgrade
- [ ] Trial end date displays correctly

### Usage Tracking
- [ ] Client count matches actual clients
- [ ] Report count resets monthly
- [ ] Progress bars fill correctly
- [ ] Warning appears at 80% usage
- [ ] "At limit" message appears at 100%

### Progressive Disclosure
- [ ] Early phase (Days 1-7): Encouraging, non-intrusive
- [ ] Mid phase (Days 8-10): Upgrade benefits highlighted
- [ ] Ending phase (Days 11-14): Aggressive CTAs
- [ ] Different messages per context (dashboard, clients, reports)

### Upgrade Flow
- [ ] All CTAs link to correct pricing/billing page
- [ ] Upgrade removes trial messaging
- [ ] Usage limits update after upgrade

---

## 🎯 Success Metrics

Track these to measure effectiveness:

- **Trial Activation Rate**: % who generate at least 1 report
- **Engagement Score**: Reports generated per trial user
- **Upgrade Click Rate**: % who click upgrade CTAs
- **Conversion Rate**: % who upgrade before trial ends
- **Time to Upgrade**: Average days before users upgrade
- **Exit Points**: Where trial users churn (never activate, leave mid-trial, etc.)

---

## 🚀 Future Enhancements

**Phase 6 (Optional):**
- Feature lockout previews (blur premium features)
- Comparison table (current plan vs. upgrade benefits)
- Testimonials in upgrade prompts
- Discount offers for upgrading early
- Exit surveys for non-converters

---

## 📚 Related Documentation

- Email Verification System: `EMAIL_VERIFICATION_RESEND_IMPLEMENTATION.md`
- 14-Day Trial System: `14-Day Trial System - COMPLETED IMPLEMENTATION.md`
- Pricing/Billing System: `tier-restrictions-and-billing-cycles.md`

---

**Status:** Ready for implementation  
**Priority:** HIGH - Direct impact on conversion rate  
**Complexity:** Medium (4-6 hours)

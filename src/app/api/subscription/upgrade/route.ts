/**
 * POST /api/subscription/upgrade
 * Handles subscription upgrades and white-label add-ons
 * Uses the SAME PayPal infrastructure as the working pricing page flow
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { paypalClient } from '../../../../lib/services/paypal-client';
import { prisma } from '../../../../lib/prisma';

export const runtime = 'nodejs'

// PayPal Plan IDs - Use SAME IDs as pricing page!
const PLAN_IDS = {
  'STARTER': process.env.PAYPAL_STARTER_TRIAL_PLAN_ID!, // Starter_Free_Trial
  'STARTER_WL': process.env.PAYPAL_STARTER_WL_TRIAL_PLAN_ID!, // Starter_WL_Free_Trial
  'PROFESSIONAL': process.env.PAYPAL_PRO_TRIAL_PLAN_ID!, // PRO_Free_Trial
  'PROFESSIONAL_WL': process.env.PAYPAL_PRO_WL_TRIAL_PLAN_ID!, // PRO_WL_Free_Trial
  'ENTERPRISE': process.env.PAYPAL_AGENCY_TRIAL_PLAN_ID!, // Agency_Free_Trial
  'ENTERPRISE_WL': process.env.PAYPAL_AGENCY_WL_TRIAL_PLAN_ID!, // Agency_WL_Free_Trial
};

export async function POST(request: Request) {
  try {
    // 1. Auth check (same pattern as working create-subscription)
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Parse request
    const body = await request.json();
    const { targetPlan, addWhiteLabel } = body;

    if (!targetPlan) {
      return NextResponse.json(
        { error: 'Target plan is required' },
        { status: 400 }
      );
    }

    // 3. Get user with current subscription
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        plan: true,
        paypalSubscriptionId: true,
        whiteLabelEnabled: true,
        subscriptionStatus: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // 4. Determine new plan ID (same logic for all scenarios)
    const newPlanId = getPlanId(targetPlan.toUpperCase(), addWhiteLabel);
    
    if (!newPlanId) {
      return NextResponse.json(
        { error: 'Invalid plan configuration' },
        { status: 400 }
      );
    }

    // 5. SCENARIO A & C: Has existing subscription - REVISE it
    if (user.paypalSubscriptionId && user.subscriptionStatus === 'active') {
      try {
        console.log(`Revising subscription ${user.paypalSubscriptionId} to plan ${newPlanId}`);
        
        await paypalClient.reviseSubscription(
          user.paypalSubscriptionId,
          newPlanId
        );

        // Update database immediately (revision is instant)
        await prisma.user.update({
          where: { id: user.id },
          data: {
            plan: targetPlan.toUpperCase(),
            whiteLabelEnabled: addWhiteLabel || user.whiteLabelEnabled
          }
        });

        console.log(`✅ Subscription revised successfully for user ${user.id}`);
        
        return NextResponse.json({
          success: true,
          planUpdated: true,
          newPlan: targetPlan.toUpperCase(),
          whiteLabelEnabled: addWhiteLabel || user.whiteLabelEnabled
        });
        
      } catch (error) {
        console.error('PayPal revision failed:', error);
        return NextResponse.json(
          { error: 'Failed to update subscription' },
          { status: 500 }
        );
      }
    }

    // 6. SCENARIO B: No subscription - CREATE new one (freemium upgrade)
    try {
      console.log(`Creating new subscription for user ${user.id} with plan ${newPlanId}`);
      
      // Get base URL for return URLs (same pattern as working flow)
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const returnUrl = `${baseUrl}/payment/success?session_id=${session.user.id}`;
      const cancelUrl = `${baseUrl}/payment/canceled`;

      const subscription = await paypalClient.createSubscription(
        newPlanId,
        returnUrl,
        cancelUrl
      );

      // Find approval URL (same pattern as working flow)
      const approvalUrl = subscription.links.find(
        link => link.rel === 'approve'
      )?.href;

      if (!approvalUrl) {
        throw new Error('No approval URL returned from PayPal');
      }

      console.log(`✅ New subscription created for user ${user.id}: ${subscription.id}`);

      return NextResponse.json({
        success: true,
        requiresPayment: true,
        approvalUrl: approvalUrl,
        subscriptionId: subscription.id
      });
      
    } catch (error) {
      console.error('PayPal subscription creation failed:', error);
      return NextResponse.json(
        { error: 'Failed to create subscription' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Upgrade API error:', error);
    return NextResponse.json(
      { error: 'Failed to process upgrade' },
      { status: 500 }
    );
  }
}

// Helper: Get correct PayPal plan ID
function getPlanId(plan: string, withWhiteLabel: boolean): string | null {
  const key = withWhiteLabel ? `${plan}_WL` : plan;
  return PLAN_IDS[key as keyof typeof PLAN_IDS] || null;
}
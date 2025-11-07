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
  'STARTER': process.env.PAYPAL_STARTER_TRIAL_PLAN_ID || 'P-0SN795424D608834YNEDY4UY', // Starter_Free_Trial
  'STARTER_WL': process.env.PAYPAL_STARTER_WL_TRIAL_PLAN_ID || 'P-91W2526908999423DNEDY5TQ', // Starter_WL_Free_Trial
  'PROFESSIONAL': process.env.PAYPAL_PRO_TRIAL_PLAN_ID || 'P-9LW168698M465441PNEDY6KQ', // PRO_Free_Trial
  'PROFESSIONAL_WL': process.env.PAYPAL_PRO_WL_TRIAL_PLAN_ID || 'P-9G486628TV699383DNEDY67Q', // PRO_WL_Free_Trial
  'ENTERPRISE': process.env.PAYPAL_AGENCY_TRIAL_PLAN_ID || 'P-09W11474GA233304HNEDY7UI', // Agency_Free_Trial
  'ENTERPRISE_WL': process.env.PAYPAL_AGENCY_WL_TRIAL_PLAN_ID || 'P-4KW51269HY146730FNEDZALI', // Agency_WL_Free_Trial
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
    console.log('📩 Upgrade request received:', body);
    
    let { targetPlan } = body;
    const { addWhiteLabel } = body;

    if (!targetPlan) {
      return NextResponse.json(
        { error: 'Target plan is required' },
        { status: 400 }
      );
    }

    // Normalize plan name to uppercase
    targetPlan = targetPlan.toUpperCase();
    console.log('🎯 Target plan normalized:', targetPlan);
    console.log('🏷️  Add white-label:', addWhiteLabel);

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
    const newPlanId = getPlanId(targetPlan, addWhiteLabel);
    console.log('💳 Selected PayPal plan ID:', newPlanId);
    
    if (!newPlanId) {
      return NextResponse.json(
        { error: 'Invalid plan configuration' },
        { status: 400 }
      );
    }

    // 5. SCENARIO A & C: Has existing subscription - REVISE it (works for active AND trialing)
    if (user.paypalSubscriptionId) {
      try {
        console.log(`🔄 Revising subscription ${user.paypalSubscriptionId} to plan ${newPlanId}`);
        
        await paypalClient.reviseSubscription(
          user.paypalSubscriptionId,
          newPlanId
        );

        // Update database immediately (revision is instant)
        await prisma.user.update({
          where: { id: user.id },
          data: {
            plan: targetPlan,
            whiteLabelEnabled: addWhiteLabel || user.whiteLabelEnabled
          }
        });

        console.log(`✅ Subscription revised successfully for user ${user.id}`);
        
        return NextResponse.json({
          success: true,
          planUpdated: true,
          newPlan: targetPlan,
          whiteLabelEnabled: addWhiteLabel || user.whiteLabelEnabled
        });
        
      } catch (error) {
        console.error('❌ PayPal revision failed:', error);
        return NextResponse.json(
          { error: 'Failed to update subscription' },
          { status: 500 }
        );
      }
    }

    // 6. SCENARIO B: No subscription - CREATE new one (freemium upgrade)
    console.log(`📝 Creating new subscription for user ${user.id} with plan ${newPlanId}`);
    
    // Ensure NEXT_PUBLIC_APP_URL is defined
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
      console.error('❌ NEXT_PUBLIC_APP_URL not defined');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const returnUrl = `${appUrl}/api/payments/activate-subscription`;
    const cancelUrl = `${appUrl}/dashboard`;

    console.log('🌐 Creating subscription with URLs:', {
      planId: newPlanId,
      returnUrl,
      cancelUrl
    });

    try {
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
        console.error('❌ No approval URL returned from PayPal');
        throw new Error('No approval URL returned from PayPal');
      }

      console.log(`✅ New subscription created for user ${user.id}: ${subscription.id}`);
      console.log('🔗 Approval URL:', approvalUrl);

      return NextResponse.json({
        success: true,
        requiresPayment: true,
        approvalUrl: approvalUrl,
        subscriptionId: subscription.id
      });
      
    } catch (error: any) {
      console.error('❌ PayPal subscription creation failed:', error);
      console.error('🔍 Error details:', {
        message: error.message,
        response: error.response?.data,
        statusCode: error.response?.status
      });
      
      return NextResponse.json(
        { error: error.message || 'Failed to create subscription' },
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

// Helper: Get correct PayPal plan ID with detailed debugging
function getPlanId(plan: string, withWhiteLabel: boolean): string | null {
  const key = withWhiteLabel ? `${plan}_WL` : plan;
  console.log('🔑 Looking for plan key:', key);
  console.log('📋 Available plan keys:', Object.keys(PLAN_IDS));
  
  const planId = PLAN_IDS[key as keyof typeof PLAN_IDS];
  console.log('💰 Plan ID value:', planId);
  
  if (!planId) {
    console.error(`❌ No plan ID found for key: ${key}`);
    console.error('🏷️  Available plans:', Object.keys(PLAN_IDS));
    console.error('🌍 Environment check - PAYPAL_STARTER_TRIAL_PLAN_ID:', process.env.PAYPAL_STARTER_TRIAL_PLAN_ID ? 'SET' : 'NOT SET');
    console.error('🌍 Environment check - PAYPAL_PRO_TRIAL_PLAN_ID:', process.env.PAYPAL_PRO_TRIAL_PLAN_ID ? 'SET' : 'NOT SET');
  }
  
  return planId || null;
}
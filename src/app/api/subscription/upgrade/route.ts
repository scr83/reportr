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

// PayPal Plan IDs - New unified plans (all include white-label functionality)
const PLAN_IDS = {
  'STARTER': process.env.PAYPAL_STARTER_TRIAL_PLAN_ID || 'P-0X464499YG9822634NEQJ5XQ',
  'PROFESSIONAL': process.env.PAYPAL_PRO_TRIAL_PLAN_ID || 'P-09P26662R8680522DNEQJ7XY',
  'AGENCY': process.env.PAYPAL_AGENCY_TRIAL_PLAN_ID || 'P-7SU477161L382370MNEQKCQQ',
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
    // Note: addWhiteLabel is ignored since all new plans include white-label functionality

    if (!targetPlan) {
      return NextResponse.json(
        { error: 'Target plan is required' },
        { status: 400 }
      );
    }

    // Normalize plan name to uppercase
    targetPlan = targetPlan.toUpperCase();
    console.log('🎯 Target plan normalized:', targetPlan);
    console.log('🏷️  All new plans include white-label functionality');

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

    // 4. Determine new plan ID (all new plans include white-label functionality)
    const newPlanId = getPlanId(targetPlan);
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
        // All new plans include white-label functionality
        await prisma.user.update({
          where: { id: user.id },
          data: {
            plan: targetPlan,
            whiteLabelEnabled: true // All new plans include white-label
          }
        });

        console.log(`✅ Subscription revised successfully for user ${user.id}`);
        
        return NextResponse.json({
          success: true,
          planUpdated: true,
          newPlan: targetPlan,
          whiteLabelEnabled: true // All new plans include white-label
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
// Note: All new plans include white-label functionality by default
function getPlanId(plan: string): string | null {
  console.log('🔑 Looking for plan key:', plan);
  console.log('📋 Available plan keys:', Object.keys(PLAN_IDS));
  
  const planId = PLAN_IDS[plan as keyof typeof PLAN_IDS];
  console.log('💰 Plan ID value:', planId);
  
  if (!planId) {
    console.error(`❌ No plan ID found for key: ${plan}`);
    console.error('🏷️  Available plans:', Object.keys(PLAN_IDS));
    console.error('🌍 Environment check - PAYPAL_STARTER_TRIAL_PLAN_ID:', process.env.PAYPAL_STARTER_TRIAL_PLAN_ID ? 'SET' : 'NOT SET');
    console.error('🌍 Environment check - PAYPAL_PRO_TRIAL_PLAN_ID:', process.env.PAYPAL_PRO_TRIAL_PLAN_ID ? 'SET' : 'NOT SET');
    console.error('🌍 Environment check - PAYPAL_AGENCY_TRIAL_PLAN_ID:', process.env.PAYPAL_AGENCY_TRIAL_PLAN_ID ? 'SET' : 'NOT SET');
  }
  
  return planId || null;
}
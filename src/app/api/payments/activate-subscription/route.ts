/**
 * POST /api/payments/activate-subscription
 * Activates a subscription after user approves on PayPal
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { subscriptionService } from '../../../../lib/services/subscription-service';
import { Plan } from '@prisma/client';

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { subscriptionId, plan } = body;

    console.log('🟠 ACTIVATE: Full request body:', JSON.stringify(body));
    console.log('🟠 ACTIVATE: Plan from body:', body.plan);

    // Validate inputs
    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription ID is required' },
        { status: 400 }
      );
    }

    // Validate plan enum if provided (plan is optional - will be detected from PayPal)
    if (plan) {
      const validPlans: Plan[] = ['FREE', 'STARTER', 'PROFESSIONAL', 'AGENCY'];
      if (!validPlans.includes(plan as Plan)) {
        return NextResponse.json(
          { error: 'Invalid plan' },
          { status: 400 }
        );
      }
    }

    console.log('🔥 Activating subscription:', subscriptionId, 'for user:', session.user.id);

    // Activate subscription
    await subscriptionService.activateSubscription({
      userId: session.user.id,
      paypalSubscriptionId: subscriptionId,
      plan: plan as Plan,
    });

    console.log('🔥 Subscription activated successfully');

    return NextResponse.json({
      success: true,
      message: 'Subscription activated',
      refreshSession: true, // Signal frontend to refresh session
    });

  } catch (error) {
    console.error('Error activating subscription:', error);
    return NextResponse.json(
      { error: 'Failed to activate subscription' },
      { status: 500 }
    );
  }
}
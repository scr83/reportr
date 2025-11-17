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
  console.log('🔥 ACTIVATION API CALLED!');
  
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      console.log('🔥 Unauthorized - no session');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('🔥 Request body:', body);
    const { subscriptionId, plan } = body;

    // Validate inputs
    if (!subscriptionId || !plan) {
      return NextResponse.json(
        { error: 'Subscription ID and plan are required' },
        { status: 400 }
      );
    }

    // Validate plan enum
    const validPlans: Plan[] = ['FREE', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE'];
    if (!validPlans.includes(plan as Plan)) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      );
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
    });

  } catch (error) {
    console.error('Error activating subscription:', error);
    return NextResponse.json(
      { error: 'Failed to activate subscription' },
      { status: 500 }
    );
  }
}
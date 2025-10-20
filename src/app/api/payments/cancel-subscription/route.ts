/**
 * POST /api/payments/cancel-subscription
 * Cancels a user's subscription
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { subscriptionService } from '../../../../lib/services/subscription-service';

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

    console.log('Cancelling subscription for user:', session.user.id);

    // Cancel subscription
    await subscriptionService.cancelUserSubscription(session.user.id);

    console.log('Subscription cancelled successfully');

    return NextResponse.json({
      success: true,
      message: 'Subscription cancelled. Access continues until end of billing period.',
    });

  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}
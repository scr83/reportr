import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { paypalClient } from '@/lib/services/paypal-client';

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    // Auth check
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user with subscription
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        plan: true,
        paypalSubscriptionId: true,
        subscriptionStatus: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user has active subscription
    if (!user.paypalSubscriptionId) {
      return NextResponse.json(
        { error: 'No active subscription to cancel' },
        { status: 400 }
      );
    }

    // Cancel subscription in PayPal
    console.log('Cancelling PayPal subscription:', user.paypalSubscriptionId);
    
    await paypalClient.cancelSubscription(user.paypalSubscriptionId);

    // Update database - set status to cancelled but keep access until period ends
    await prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionStatus: 'cancelled'
        // Note: Don't change plan yet - user keeps access until period ends
        // PayPal webhook will handle final downgrade when period expires
      }
    });

    console.log('Subscription cancelled successfully for user:', user.id);

    return NextResponse.json({
      success: true,
      message: 'Subscription cancelled successfully'
    });

  } catch (error: any) {
    console.error('Cancel subscription error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}
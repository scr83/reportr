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
        subscriptionStatus: true,
        cancelledAt: true,
        subscriptionEndDate: true,
        billingCycleEnd: true,
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user has active subscription
    if (!user.paypalSubscriptionId) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 400 }
      );
    }

    // Check if subscription is already cancelled
    if (user.subscriptionStatus === 'cancelled' && user.cancelledAt) {
      return NextResponse.json({
        success: true,
        message: 'Subscription is already cancelled',
        accessUntil: user.subscriptionEndDate?.toISOString(),
        currentPlan: user.plan,
        downgradePlan: 'FREE',
        alreadyCancelled: true,
      });
    }

    // Cancel subscription in PayPal
    console.log('Cancelling PayPal subscription:', user.paypalSubscriptionId);
    
    await paypalClient.cancelSubscription(
      user.paypalSubscriptionId,
      'User requested cancellation'
    );

    // Get subscription details to determine billing cycle end date
    const subscriptionDetails = await paypalClient.getSubscriptionDetails(
      user.paypalSubscriptionId
    );

    const subscriptionEndDate = subscriptionDetails.billing_info.next_billing_time
      ? new Date(subscriptionDetails.billing_info.next_billing_time)
      : user.billingCycleEnd || new Date();

    // Update database with cancellation tracking
    await prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionStatus: 'cancelled',
        cancelledAt: new Date(),
        subscriptionEndDate: subscriptionEndDate,
        // Keep current plan - they retain access until end date
      }
    });

    console.log('Subscription cancelled successfully for user:', user.id);

    return NextResponse.json({
      success: true,
      message: 'Subscription cancelled successfully',
      accessUntil: subscriptionEndDate.toISOString(),
      currentPlan: user.plan,
      downgradePlan: 'FREE',
    });

  } catch (error: any) {
    console.error('Cancel subscription error:', error);

    // Handle specific PayPal errors
    if (error.message?.includes('SUBSCRIPTION_NOT_FOUND')) {
      // Subscription doesn't exist in PayPal but exists in our DB
      // Update our database to reflect the reality
      try {
        const session = await getServerSession(authOptions);
        if (session?.user?.id) {
          await prisma.user.update({
            where: { id: session.user.id },
            data: {
              subscriptionStatus: 'inactive',
              paypalSubscriptionId: null,
            },
          });
        }
      } catch (dbError) {
        console.error('Error updating database after PayPal error:', dbError);
      }

      return NextResponse.json(
        { error: 'Subscription not found in PayPal. Your account has been updated.' },
        { status: 400 }
      );
    }

    if (error.message?.includes('SUBSCRIPTION_STATUS_NOT_SUPPORTED')) {
      return NextResponse.json(
        { error: 'Subscription cannot be cancelled in its current state' },
        { status: 400 }
      );
    }

    if (error.message?.includes('access token')) {
      return NextResponse.json(
        { error: 'Payment service temporarily unavailable. Please try again.' },
        { status: 503 }
      );
    }

    // Network or other errors
    if (error.message?.includes('fetch')) {
      return NextResponse.json(
        { error: 'Unable to process cancellation. Please try again.' },
        { status: 503 }
      );
    }

    // Generic error
    return NextResponse.json(
      { error: error.message || 'Failed to cancel subscription. Please try again or contact support.' },
      { status: 500 }
    );
  }
}
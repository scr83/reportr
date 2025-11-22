/**
 * POST /api/payments/create-subscription
 * Creates a PayPal subscription for a user
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { paypalClient } from '../../../../lib/services/paypal-client';
import { prisma } from '../../../../lib/prisma';

export const runtime = 'nodejs'

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

    // ========================================
    // DUPLICATE SUBSCRIPTION PREVENTION
    // ========================================
    const existingUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        paypalSubscriptionId: true,
        subscriptionStatus: true,
        plan: true,
      },
    });

    // Check if user already has an active subscription
    if (existingUser?.paypalSubscriptionId && 
        existingUser.subscriptionStatus === 'active') {
      console.log('⚠️  Duplicate subscription attempt blocked for user:', session.user.id);
      return NextResponse.json(
        { 
          error: 'Active subscription exists',
          message: 'You already have an active subscription. Please cancel your current subscription before creating a new one.',
          currentPlan: existingUser.plan,
          subscriptionId: existingUser.paypalSubscriptionId,
        },
        { status: 409 } // 409 Conflict
      );
    }

    console.log('✅ No active subscription found, proceeding with creation');
    // ========================================

    const body = await request.json();
    const { planId, plan } = body;

    // Validate plan ID
    if (!planId) {
      return NextResponse.json(
        { error: 'Plan ID is required' },
        { status: 400 }
      );
    }

    // Validate plan name
    if (!plan) {
      return NextResponse.json(
        { error: 'Plan name is required' },
        { status: 400 }
      );
    }

    // Get base URL for return URLs
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';
    const returnUrl = `${baseUrl}/payment/success?session_id=${session.user.id}&plan=${plan}`;
    const cancelUrl = `${baseUrl}/payment/canceled`;

    // Create subscription with PayPal
    console.log('Creating PayPal subscription for user:', session.user.id);
    const subscription = await paypalClient.createSubscription(
      planId,
      returnUrl,
      cancelUrl
    );

    console.log('PayPal subscription created:', subscription.id);

    // Find approval URL
    const approvalUrl = subscription.links.find(
      link => link.rel === 'approve'
    )?.href;

    if (!approvalUrl) {
      throw new Error('No approval URL returned from PayPal');
    }

    return NextResponse.json({
      subscriptionId: subscription.id,
      approvalUrl: approvalUrl,
    });

  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}
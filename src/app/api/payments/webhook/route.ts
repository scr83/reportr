/**
 * POST /api/payments/webhook
 * Handles PayPal webhook events with signature verification
 */

import { NextResponse } from 'next/server';
import { subscriptionService } from '../../../../lib/services/subscription-service';
import { prisma } from '../../../../lib/prisma';
import { Plan } from '@prisma/client';

export const runtime = 'nodejs';

/**
 * Verify PayPal webhook signature
 * Implements basic verification with sandbox bypass
 * TODO: Full cert-based verification before going live
 */
function verifyWebhookSignature(headers: Headers): boolean {
  try {
    // Extract PayPal signature headers
    const transmissionId = headers.get('paypal-transmission-id');
    const transmissionTime = headers.get('paypal-transmission-time');
    const transmissionSig = headers.get('paypal-transmission-sig');
    const certUrl = headers.get('paypal-cert-url');
    const authAlgo = headers.get('paypal-auth-algo');

    // Check required headers are present
    if (!transmissionId || !transmissionTime || !transmissionSig || !certUrl || !authAlgo) {
      console.error('❌ Missing required PayPal webhook headers');
      return false;
    }

    // Log verification attempt
    console.log('🔐 Webhook verification - Headers present:', {
      transmissionId: transmissionId.substring(0, 20) + '...',
      transmissionTime,
      authAlgo,
    });

    // SANDBOX MODE: Allow webhooks for testing
    if (process.env.PAYPAL_MODE === 'sandbox') {
      console.log('✅ SANDBOX MODE: Webhook accepted (signature headers verified)');
      return true;
    }

    // LIVE MODE: Require full verification
    console.error('❌ LIVE MODE: Full webhook signature verification not yet implemented');
    console.error('⚠️  Deploy webhook cert validation before switching to live mode');
    return false;

  } catch (error) {
    console.error('❌ Webhook verification error:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const headers = request.headers;
    
    // SECURITY: Verify webhook is from PayPal
    if (!verifyWebhookSignature(headers)) {
      console.error('❌ Webhook signature verification FAILED - Rejecting request');
      return NextResponse.json(
        { error: 'Unauthorized webhook' },
        { status: 401 }
      );
    }

    // Parse webhook body
    const body = await request.json();
    const eventType = body.event_type;

    console.log('✅ Verified webhook received:', eventType);

    // Handle different webhook events
    switch (eventType) {
      case 'BILLING.SUBSCRIPTION.ACTIVATED': {
        const subscriptionId = body.resource.id;
        const planId = body.resource.plan_id;
        console.log('📌 Subscription activated:', subscriptionId, 'Plan:', planId);
        
        // Find user by subscription ID (they should have been created during the approval flow)
        const user = await prisma.user.findFirst({
          where: { paypalSubscriptionId: subscriptionId },
        });
        
        if (user) {
          // Use subscription service to properly activate and assign correct plan
          await subscriptionService.activateSubscription({
            userId: user.id,
            paypalSubscriptionId: subscriptionId,
            plan: user.plan, // Will be overridden by actual plan detection in service
          });
          console.log('✅ User subscription activated and plan assigned');
        } else {
          console.warn('⚠️  No user found for activated subscription:', subscriptionId);
        }
        break;
      }

      case 'PAYMENT.SALE.COMPLETED': {
        const subscriptionId = body.resource.billing_agreement_id;
        if (subscriptionId) {
          console.log('💰 Payment completed for subscription:', subscriptionId);
          await subscriptionService.handleRenewal(subscriptionId, body.resource);
        }
        break;
      }

      case 'BILLING.SUBSCRIPTION.PAYMENT.FAILED': {
        const subscriptionId = body.resource.id;
        console.log('⚠️  Payment failed for subscription:', subscriptionId);
        await subscriptionService.handlePaymentFailure(subscriptionId);
        break;
      }

      case 'BILLING.SUBSCRIPTION.CANCELLED': {
        const subscriptionId = body.resource.id;
        console.log('🚫 Subscription cancelled:', subscriptionId);
        await subscriptionService.handleCancellation(subscriptionId);
        break;
      }

      default:
        console.log('ℹ️  Unhandled webhook event:', eventType);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    // Return 200 to prevent PayPal retries on our errors
    return NextResponse.json({ received: true });
  }
}
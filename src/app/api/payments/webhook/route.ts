/**
 * POST /api/payments/webhook
 * Handles PayPal webhook events with signature verification
 */

import { NextResponse } from 'next/server';
import { subscriptionService } from '../../../../lib/services/subscription-service';
import { prisma } from '../../../../lib/prisma';
import { Plan } from '@prisma/client';
import crypto from 'crypto';
import https from 'https';

export const runtime = 'nodejs';

/**
 * Verify PayPal webhook signature
 * FIXED: Implements full certificate-based verification for production
 */
async function verifyWebhookSignature(headers: Headers, body: string): Promise<boolean> {
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

    // SANDBOX MODE: Allow webhooks for testing (but still verify headers)
    if (process.env.PAYPAL_MODE === 'sandbox') {
      console.log('✅ SANDBOX MODE: Webhook accepted (signature headers verified)');
      return true;
    }

    // PRODUCTION MODE: Full certificate-based verification
    console.log('🔒 PRODUCTION MODE: Performing full webhook signature verification');

    const webhookId = process.env.PAYPAL_WEBHOOK_ID;
    if (!webhookId) {
      console.error('❌ PAYPAL_WEBHOOK_ID environment variable not set');
      return false;
    }

    // Build expected signature string
    const bodyHash = crypto.createHash('sha256').update(body, 'utf8').digest('hex');
    const expectedSig = `${transmissionId}|${transmissionTime}|${webhookId}|${bodyHash}`;

    console.log('🔐 Signature verification data:', {
      transmissionId: transmissionId.substring(0, 10) + '...',
      transmissionTime,
      webhookId: webhookId.substring(0, 10) + '...',
      bodyHash: bodyHash.substring(0, 16) + '...'
    });

    // Fetch PayPal's public certificate
    const cert = await new Promise<string>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Certificate fetch timeout')), 5000);
      
      https.get(certUrl, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          clearTimeout(timeout);
          resolve(data);
        });
        res.on('error', (err) => {
          clearTimeout(timeout);
          reject(err);
        });
      }).on('error', (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });

    // Verify signature using PayPal's public certificate
    const verifier = crypto.createVerify('SHA256');
    verifier.update(expectedSig, 'utf8');
    verifier.end();

    const isValid = verifier.verify(cert, transmissionSig, 'base64');

    if (isValid) {
      console.log('✅ Webhook signature verified successfully');
      return true;
    } else {
      console.error('❌ Webhook signature verification failed');
      console.error('Expected sig data:', expectedSig.substring(0, 100) + '...');
      return false;
    }

  } catch (error) {
    console.error('❌ Webhook verification error:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const headers = request.headers;
    
    // Parse webhook body first (needed for signature verification)
    const bodyText = await request.text();
    const body = JSON.parse(bodyText);
    
    // SECURITY: Verify webhook is from PayPal
    if (!(await verifyWebhookSignature(headers, bodyText))) {
      console.error('❌ Webhook signature verification FAILED - Rejecting request');
      return NextResponse.json(
        { error: 'Unauthorized webhook' },
        { status: 401 }
      );
    }
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
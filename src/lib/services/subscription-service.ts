/**
 * Subscription Management Service
 * Business logic for handling subscription lifecycle
 */

import { prisma } from '../prisma';
import { paypalClient } from './paypal-client';
import { Plan } from '@prisma/client';
import { isWhiteLabelPlan, getTierFromPlanId, tierToPlan } from '../utils/paypal-plans';
import { activateTrial } from '../trial-activation';

interface SubscriptionData {
  userId: string;
  paypalSubscriptionId: string;
  plan: Plan;
}

export class SubscriptionService {
  /**
   * Activate a subscription after PayPal approval
   */
  async activateSubscription(data: SubscriptionData): Promise<void> {
    try {
      const { userId, paypalSubscriptionId, plan } = data;

      // Get subscription details from PayPal
      const subscriptionDetails = await paypalClient.getSubscriptionDetails(paypalSubscriptionId);

      // Detect white-label plan and get PayPal plan ID from subscription details
      const paypalPlanId = subscriptionDetails.plan_id;
      const isWhiteLabel = isWhiteLabelPlan(paypalPlanId);
      const tierFromPlan = getTierFromPlanId(paypalPlanId);
      
      // Convert tier to correct Prisma Plan enum
      const actualPlan = tierFromPlan ? tierToPlan(tierFromPlan) : plan;

      console.log('Plan detection:', {
        paypalPlanId,
        isWhiteLabel,
        tierFromPlan,
        requestedPlan: plan,
        actualPlan
      });

      // Activate trial using centralized function (for trial plans)
      const trialResult = await activateTrial({
        userId,
        trialType: 'PAYPAL',
        plan: actualPlan,
      });

      if (!trialResult.success) {
        console.warn(`⚠️  PayPal subscription activated but trial activation failed: ${trialResult.error} (User: ${userId})`);
      }

      // Extract billing dates from PayPal subscription details
      const nextBillingTime = subscriptionDetails.billing_info?.next_billing_time;
      const firstPaymentDate = nextBillingTime 
        ? new Date(nextBillingTime) 
        : new Date(); // Fallback for immediate payment (no trial)

      const now = new Date();

      // Determine if this is a trial subscription (payment date is in the future)
      const hasTrial = firstPaymentDate > now;

      // Update user with subscription info and white-label status
      await prisma.user.update({
        where: { id: userId },
        data: {
          plan: actualPlan,
          paypalSubscriptionId: paypalSubscriptionId,
          subscriptionStatus: 'active',
          planExpires: null, // Clear trial expiration
          
          // Billing cycle dates (THE FIX)
          billingCycleStart: firstPaymentDate,
          billingCycleEnd: new Date(firstPaymentDate.getTime() + 30 * 24 * 60 * 60 * 1000),
          
          // Trial tracking fields (BONUS: proper population)
          trialStartDate: hasTrial ? now : null,
          trialEndDate: hasTrial ? firstPaymentDate : null,
          trialType: hasTrial ? 'PAYPAL' : null,
          
          whiteLabelEnabled: isWhiteLabel, // Auto-enable white-label for WL plans
          signupFlow: 'PAID_TRIAL', // Mark as paid trial flow to skip email verification
        },
      });

      console.log('✅ Billing cycle dates:', {
        billingCycleStart: firstPaymentDate.toISOString(),
        billingCycleEnd: new Date(firstPaymentDate.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        hasTrial,
        trialEndDate: hasTrial ? firstPaymentDate.toISOString() : null
      });

      // Create payment record
      const lastPayment = subscriptionDetails.billing_info.last_payment;
      if (lastPayment) {
        await prisma.payment.create({
          data: {
            userId: userId,
            paypalOrderId: paypalSubscriptionId, // Initial subscription ID as order ID
            paypalSubscriptionId: paypalSubscriptionId,
            amount: parseFloat(lastPayment.amount.value),
            currency: lastPayment.amount.currency_code,
            status: 'COMPLETED',
            plan: actualPlan,
            metadata: subscriptionDetails as any,
          },
        });
      }

      console.log(`Subscription activated for user ${userId}, plan: ${plan}`);
    } catch (error) {
      console.error('Error activating subscription:', error);
      throw error;
    }
  }

  /**
   * Handle subscription renewal (webhook)
   */
  async handleRenewal(subscriptionId: string, paymentData: any): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { paypalSubscriptionId: subscriptionId },
      });

      if (!user) {
        throw new Error(`User not found for subscription: ${subscriptionId}`);
      }

      // Reset billing cycle
      const now = new Date();
      const newCycleEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          billingCycleStart: now,
          billingCycleEnd: newCycleEnd,
          subscriptionStatus: 'active',
        },
      });

      // Create payment record
      await prisma.payment.create({
        data: {
          userId: user.id,
          paypalOrderId: paymentData.id || subscriptionId,
          paypalSubscriptionId: subscriptionId,
          amount: parseFloat(paymentData.amount?.value || '29.00'),
          currency: paymentData.amount?.currency_code || 'USD',
          status: 'COMPLETED',
          plan: user.plan,
          metadata: paymentData,
        },
      });

      console.log(`Subscription renewed for user ${user.id}`);
    } catch (error) {
      console.error('Error handling subscription renewal:', error);
      throw error;
    }
  }

  /**
   * Handle payment failure (webhook)
   */
  async handlePaymentFailure(subscriptionId: string): Promise<void> {
    try {
      await prisma.user.update({
        where: { paypalSubscriptionId: subscriptionId },
        data: {
          subscriptionStatus: 'past_due',
        },
      });

      console.log(`Subscription marked as past_due: ${subscriptionId}`);
    } catch (error) {
      console.error('Error handling payment failure:', error);
      throw error;
    }
  }

  /**
   * Handle subscription cancellation
   */
  async handleCancellation(subscriptionId: string): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { paypalSubscriptionId: subscriptionId },
      });

      if (!user) return;

      // Keep access until billing cycle ends
      await prisma.user.update({
        where: { id: user.id },
        data: {
          subscriptionStatus: 'canceled',
        },
      });

      console.log(`Subscription canceled for user ${user.id}`);
    } catch (error) {
      console.error('Error handling subscription cancellation:', error);
      throw error;
    }
  }

  /**
   * Cancel subscription and downgrade user
   */
  async cancelUserSubscription(userId: string): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user?.paypalSubscriptionId) {
        throw new Error('User does not have an active subscription');
      }

      // Cancel with PayPal
      await paypalClient.cancelSubscription(user.paypalSubscriptionId);

      // Update user status
      await prisma.user.update({
        where: { id: userId },
        data: {
          subscriptionStatus: 'canceled',
        },
      });

      console.log(`User subscription canceled: ${userId}`);
    } catch (error) {
      console.error('Error canceling user subscription:', error);
      throw error;
    }
  }

  /**
   * Downgrade user to FREE plan (after cancellation period ends)
   */
  async downgradToFree(userId: string): Promise<void> {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          plan: 'FREE',
          subscriptionStatus: 'free',
          paypalSubscriptionId: null,
          planExpires: null,
        },
      });

      console.log(`User downgraded to FREE: ${userId}`);
    } catch (error) {
      console.error('Error downgrading user to FREE:', error);
      throw error;
    }
  }

  /**
   * Get subscription status for a user
   */
  async getUserSubscriptionStatus(userId: string): Promise<{
    plan: Plan;
    subscriptionStatus: string;
    paypalSubscriptionId: string | null;
    billingCycleEnd: Date | null;
  } | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          plan: true,
          subscriptionStatus: true,
          paypalSubscriptionId: true,
          billingCycleEnd: true,
        },
      });

      return user;
    } catch (error) {
      console.error('Error getting user subscription status:', error);
      throw error;
    }
  }

  /**
   * Get payment history for a user
   */
  async getUserPaymentHistory(userId: string): Promise<any[]> {
    try {
      const payments = await prisma.payment.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 10, // Last 10 payments
      });

      return payments;
    } catch (error) {
      console.error('Error getting user payment history:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const subscriptionService = new SubscriptionService();
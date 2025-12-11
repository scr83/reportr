/**
 * Subscription Management Service
 * Business logic for handling subscription lifecycle
 */

import { prisma } from '../prisma';
import { paypalClient } from './paypal-client';
import { Plan } from '@prisma/client';
import { PAYPAL_PLAN_TO_DB_PLAN } from '../paypal';
import { sendUpgradeSuccessEmail, sendCancellationEmail } from '../email-service';

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

      // Get plan from PayPal subscription using hardcoded mapping
      const paypalPlanId = subscriptionDetails.plan_id;
      const actualPlan = PAYPAL_PLAN_TO_DB_PLAN[paypalPlanId];

      if (!actualPlan) {
        console.error('Unknown PayPal plan ID:', paypalPlanId);
        throw new Error(`Unknown PayPal plan ID: ${paypalPlanId}`);
      }



      // Note: Trial fields are handled directly in the user update below
      // No need for separate activateTrial call to avoid conflicts

      // Extract billing dates from PayPal subscription details
      const nextBillingTime = subscriptionDetails.billing_info?.next_billing_time;
      const firstPaymentDate = nextBillingTime 
        ? new Date(nextBillingTime) 
        : new Date(); // Fallback for immediate payment (no trial)

      const now = new Date();

      // Determine if this is a trial subscription (payment date is in the future)
      const hasTrial = firstPaymentDate > now;


      // Update user with subscription info and white-label status
      const result = await prisma.user.update({
        where: { id: userId },
        data: {
          plan: actualPlan,
          paypalSubscriptionId: paypalSubscriptionId,
          subscriptionStatus: 'active',
          planExpires: null, // Clear trial expiration
          
          // Billing cycle dates - proper calculation
          billingCycleStart: hasTrial ? now : firstPaymentDate,
          billingCycleEnd: firstPaymentDate,
          
          // Trial tracking fields (BONUS: proper population)
          trialStartDate: hasTrial ? now : null,
          trialEndDate: hasTrial ? firstPaymentDate : null,
          trialType: 'PAYPAL', // Always mark PayPal users as PAYPAL type regardless of trial
          trialUsed: true, // Mark trial as used for PayPal subscribers
          
          whiteLabelEnabled: true, // ALL paid plans include white label
          signupFlow: 'PAID_TRIAL', // Mark as paid trial flow to skip email verification
        },
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

      // Send upgrade success email (non-blocking)
      const userData = await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true, name: true }
      });
      if (userData?.email) {
        const planDisplayName = actualPlan === 'STARTER' ? 'Starter' : 
                                actualPlan === 'PROFESSIONAL' ? 'Professional' : 
                                actualPlan === 'AGENCY' ? 'Agency' : actualPlan;
        sendUpgradeSuccessEmail(userId, userData.email, userData.name, planDisplayName).catch(console.error);
      }

      console.log(`✅ Subscription activated for user ${userId}, SAVED plan: ${actualPlan}`);
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

      // Send cancellation confirmation email (non-blocking)
      if (user.email) {
        const accessUntilDate = user.billingCycleEnd || new Date();
        const accessUntil = accessUntilDate.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        sendCancellationEmail(user.id, user.email, user.name, accessUntil).catch(console.error);
      }

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
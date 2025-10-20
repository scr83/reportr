/**
 * PayPal API Client
 * Handles authentication and API calls to PayPal
 */

const PAYPAL_API_BASE = process.env.PAYPAL_MODE === 'live' 
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

interface PayPalAuthResponse {
  access_token: string;
  expires_in: number;
}

interface CreateSubscriptionResponse {
  id: string;
  status: string;
  links: Array<{ href: string; rel: string }>;
}

interface SubscriptionDetails {
  id: string;
  status: string;
  subscriber: {
    email_address: string;
    payer_id: string;
  };
  billing_info: {
    next_billing_time: string;
    last_payment?: {
      amount: {
        currency_code: string;
        value: string;
      };
      time: string;
    };
  };
}

export class PayPalClient {
  private clientId: string;
  private clientSecret: string;
  private baseUrl: string;

  constructor() {
    this.clientId = process.env.PAYPAL_CLIENT_ID!;
    this.clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
    this.baseUrl = PAYPAL_API_BASE;

    if (!this.clientId || !this.clientSecret) {
      throw new Error('PayPal credentials not configured');
    }
  }

  /**
   * Get OAuth access token from PayPal
   */
  private async getAccessToken(): Promise<string> {
    try {
      const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
      
      const response = await fetch(`${this.baseUrl}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('PayPal auth error:', errorText);
        throw new Error('Failed to get PayPal access token');
      }

      const data: PayPalAuthResponse = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error getting PayPal access token:', error);
      throw error;
    }
  }

  /**
   * Create a subscription for a user
   */
  async createSubscription(planId: string, returnUrl: string, cancelUrl: string): Promise<CreateSubscriptionResponse> {
    try {
      const accessToken = await this.getAccessToken();

      const response = await fetch(`${this.baseUrl}/v1/billing/subscriptions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan_id: planId,
          application_context: {
            brand_name: 'Reportr',
            shipping_preference: 'NO_SHIPPING',
            user_action: 'SUBSCRIBE_NOW',
            return_url: returnUrl,
            cancel_url: cancelUrl,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('PayPal subscription creation error:', error);
        throw new Error(`Failed to create subscription: ${error}`);
      }

      const subscriptionData = await response.json();
      console.log('PayPal subscription created:', subscriptionData.id);
      return subscriptionData;
    } catch (error) {
      console.error('Error creating PayPal subscription:', error);
      throw error;
    }
  }

  /**
   * Get subscription details
   */
  async getSubscriptionDetails(subscriptionId: string): Promise<SubscriptionDetails> {
    try {
      const accessToken = await this.getAccessToken();

      const response = await fetch(`${this.baseUrl}/v1/billing/subscriptions/${subscriptionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('PayPal subscription details error:', errorText);
        throw new Error('Failed to get subscription details');
      }

      return response.json();
    } catch (error) {
      console.error('Error getting PayPal subscription details:', error);
      throw error;
    }
  }

  /**
   * Cancel a subscription
   */
  async cancelSubscription(subscriptionId: string, reason: string = 'User requested cancellation'): Promise<void> {
    try {
      const accessToken = await this.getAccessToken();

      const response = await fetch(`${this.baseUrl}/v1/billing/subscriptions/${subscriptionId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('PayPal subscription cancellation error:', errorText);
        throw new Error('Failed to cancel subscription');
      }

      console.log('PayPal subscription canceled:', subscriptionId);
    } catch (error) {
      console.error('Error canceling PayPal subscription:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const paypalClient = new PayPalClient();
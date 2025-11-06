# PayPal Webhook Setup Guide

## Getting Your PAYPAL_WEBHOOK_ID

The `PAYPAL_WEBHOOK_ID` is required for production webhook signature verification. Here's how to get it:

### Step 1: Access PayPal Developer Dashboard
1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Sign in with your PayPal Business account

### Step 2: Navigate to Webhooks
1. Click on your app (or create one if needed)
2. Go to **Apps & Credentials** tab
3. Click on **Webhooks** section

### Step 3: Create/Find Your Webhook
1. If no webhook exists:
   - Click **Create Webhook**
   - Enter URL: `https://reportr.agency/api/payments/webhook`
   - Select events:
     - `BILLING.SUBSCRIPTION.ACTIVATED`
     - `BILLING.SUBSCRIPTION.CANCELLED`
     - `PAYMENT.SALE.COMPLETED`
     - `BILLING.SUBSCRIPTION.PAYMENT.FAILED`

2. If webhook exists:
   - Click on the existing webhook URL

### Step 4: Copy Webhook ID
1. In the webhook details page, you'll see:
   ```
   Webhook ID: 8PT597110X687430TLJDNMYI
   ```
2. Copy this entire ID

### Step 5: Add to Environment Variables

#### Local Development (.env)
```bash
PAYPAL_WEBHOOK_ID=8PT597110X687430TLJDNMYI
```

#### Production (Vercel)
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add:
   - **Name**: `PAYPAL_WEBHOOK_ID`
   - **Value**: `8PT597110X687430TLJDNMYI`
   - **Environments**: Production

## Important Notes

- **Sandbox vs Production**: You need different webhook IDs for sandbox and production
- **Security**: The webhook ID is not secret, but it's required for signature verification
- **Testing**: You can test webhooks in sandbox mode without the webhook ID (verification is bypassed)
- **Production**: Webhook signature verification will fail without the correct webhook ID

## Testing Your Setup

### Sandbox Test
```bash
# In .env
PAYPAL_MODE=sandbox
# Webhook ID not required - will skip verification
```

### Production Test
```bash
# In .env
PAYPAL_MODE=live
PAYPAL_WEBHOOK_ID=your_real_webhook_id_here
```

## Troubleshooting

### Error: "PAYPAL_WEBHOOK_ID environment variable not set"
- Make sure the environment variable is added to both local .env and Vercel
- Restart your development server after adding to .env

### Error: "Webhook signature verification failed"
- Verify you're using the correct webhook ID for your environment (sandbox/production)
- Check that the webhook URL matches exactly: `https://reportr.agency/api/payments/webhook`
- Ensure all required webhook events are enabled

## Security Features

✅ **Sandbox Mode**: Headers verified, signature verification skipped for development  
✅ **Production Mode**: Full certificate-based signature verification  
✅ **Certificate Validation**: Downloads PayPal's public cert and validates signature  
✅ **Timeout Protection**: 5-second timeout on certificate fetch  
✅ **Error Logging**: Detailed logs for troubleshooting  

The webhook handler now properly validates PayPal webhooks and rejects unauthorized requests in production mode.
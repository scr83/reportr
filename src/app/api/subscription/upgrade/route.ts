import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { Plan } from '@prisma/client'
import { 
  getPayPalPlanId, 
  parsePlanFromQuery, 
  tierToPlan,
  type PlanTier
} from '@/lib/utils/paypal-plans'
import { validatePayPalEnvironment } from '@/lib/utils/env-validation'

const upgradeRequestSchema = z.object({
  targetPlan: z.enum(['starter', 'professional', 'agency']),
  addWhiteLabel: z.boolean().optional().default(false),
  context: z.enum(['white-label', 'reports', 'clients', 'general']).optional()
})

/**
 * POST /api/subscription/upgrade
 * Handles subscription upgrades and white-label add-ons
 */
export async function POST(request: NextRequest) {
  try {
    // Validate PayPal environment on first API call
    const paypalValidation = validatePayPalEnvironment()
    if (!paypalValidation.isValid) {
      console.error('PayPal environment validation failed:', paypalValidation.missing)
      return NextResponse.json(
        { error: 'Payment system not properly configured', details: paypalValidation.missing },
        { status: 503 }
      )
    }

    // Get authenticated user
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const validatedData = upgradeRequestSchema.parse(body)
    const { targetPlan, addWhiteLabel, context } = validatedData

    // Get current user data
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        plan: true,
        paypalSubscriptionId: true,
        whiteLabelEnabled: true,
        email: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Convert target plan to Prisma enum
    const targetPrismaplan = tierToPlan(targetPlan)

    // Validate upgrade is allowed
    const upgradeValidation = validateUpgrade(user.plan, targetPrismaplan, addWhiteLabel, user.whiteLabelEnabled)
    if (!upgradeValidation.allowed) {
      return NextResponse.json(
        { error: upgradeValidation.reason },
        { status: 400 }
      )
    }

    // Determine final white-label state
    const finalWhiteLabelEnabled = addWhiteLabel || user.whiteLabelEnabled || 
      ['PROFESSIONAL', 'ENTERPRISE'].includes(targetPrismaplan)

    // Get PayPal plan ID
    const paypalPlanId = getPayPalPlanId({
      tier: targetPlan,
      whiteLabelEnabled: finalWhiteLabelEnabled
    })

    // For existing subscribers, create PayPal revision
    if (user.paypalSubscriptionId) {
      const revisionResponse = await createPayPalRevision(
        user.paypalSubscriptionId,
        paypalPlanId
      )

      if (!revisionResponse.success) {
        return NextResponse.json(
          { error: 'Failed to update subscription', details: revisionResponse.error },
          { status: 500 }
        )
      }

      // Update user plan in database immediately (PayPal change is instant)
      await prisma.user.update({
        where: { id: user.id },
        data: {
          plan: targetPrismaplan,
          whiteLabelEnabled: finalWhiteLabelEnabled
        }
      })

      return NextResponse.json({
        success: true,
        message: 'Subscription updated successfully',
        planUpdated: true,
        newPlan: targetPrismaplan,
        whiteLabelEnabled: finalWhiteLabelEnabled
      })
    }

    // For users without subscription, redirect to PayPal checkout
    const approvalUrl = await createPayPalSubscription(
      paypalPlanId,
      user.email,
      `${targetPlan}${addWhiteLabel ? '-whitelabel' : ''}`
    )

    if (!approvalUrl) {
      return NextResponse.json(
        { error: 'Failed to create PayPal subscription' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      approvalUrl,
      requiresPayment: true,
      targetPlan: targetPrismaplan,
      whiteLabelEnabled: finalWhiteLabelEnabled
    })

  } catch (error) {
    console.error('Upgrade API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Validate if upgrade is allowed
 */
function validateUpgrade(
  currentPlan: Plan,
  targetPlan: Plan,
  addWhiteLabel: boolean,
  currentWhiteLabelEnabled: boolean
) {
  const planOrder = {
    'FREE': 0,
    'STARTER': 1,
    'PROFESSIONAL': 2,
    'ENTERPRISE': 3
  }

  const currentOrder = planOrder[currentPlan]
  const targetOrder = planOrder[targetPlan]

  // Can't downgrade plans
  if (targetOrder < currentOrder) {
    return {
      allowed: false,
      reason: 'Plan downgrades are not supported. Please contact support for assistance.'
    }
  }

  // Can't upgrade to same plan unless adding white-label
  if (targetOrder === currentOrder && !addWhiteLabel) {
    return {
      allowed: false,
      reason: 'You are already on this plan'
    }
  }

  // Can't add white-label if already enabled
  if (addWhiteLabel && currentWhiteLabelEnabled) {
    return {
      allowed: false,
      reason: 'White-label is already enabled for your account'
    }
  }

  // White-label is included in PROFESSIONAL and ENTERPRISE
  if (addWhiteLabel && ['PROFESSIONAL', 'ENTERPRISE'].includes(targetPlan)) {
    return {
      allowed: false,
      reason: 'White-label is already included in this plan'
    }
  }

  return { allowed: true }
}

/**
 * Create PayPal subscription revision for existing subscribers
 */
async function createPayPalRevision(subscriptionId: string, newPlanId: string) {
  try {
    const accessToken = await getPayPalAccessToken()
    if (!accessToken) {
      return { success: false, error: 'Failed to get PayPal access token' }
    }

    const baseUrl = process.env.PAYPAL_MODE === 'live' 
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com'

    const response = await fetch(
      `${baseUrl}/v1/billing/subscriptions/${subscriptionId}/revise`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'PayPal-Request-Id': `upgrade-${Date.now()}`
        },
        body: JSON.stringify({
          plan_id: newPlanId,
          quantity: "1",
          shipping_amount: {
            currency_code: "USD",
            value: "0.00"
          },
          application_context: {
            user_action: "SUBSCRIBE_NOW",
            payment_method: {
              payer_selected: "PAYPAL",
              payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED"
            }
          }
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error('PayPal revision error:', errorData)
      return { success: false, error: errorData }
    }

    const revisionData = await response.json()
    return { success: true, data: revisionData }

  } catch (error) {
    console.error('PayPal revision error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

/**
 * Create new PayPal subscription for users without existing subscription
 */
async function createPayPalSubscription(
  planId: string,
  userEmail: string,
  planReference: string
): Promise<string | null> {
  try {
    const accessToken = await getPayPalAccessToken()
    if (!accessToken) {
      return null
    }

    const baseUrl = process.env.PAYPAL_MODE === 'live' 
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com'

    const response = await fetch(
      `${baseUrl}/v1/billing/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'PayPal-Request-Id': `new-sub-${Date.now()}`
        },
        body: JSON.stringify({
          plan_id: planId,
          quantity: "1",
          subscriber: {
            email_address: userEmail
          },
          application_context: {
            brand_name: "Reportr",
            user_action: "SUBSCRIBE_NOW",
            payment_method: {
              payer_selected: "PAYPAL",
              payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED"
            },
            return_url: `${process.env.NEXTAUTH_URL}/api/paypal/success?plan=${planReference}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/pricing?cancelled=true`
          }
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error('PayPal subscription creation error:', errorData)
      return null
    }

    const subscriptionData = await response.json()
    
    // Extract approval URL from links
    const approvalLink = subscriptionData.links?.find(
      (link: any) => link.rel === 'approve'
    )

    return approvalLink?.href || null

  } catch (error) {
    console.error('PayPal subscription creation error:', error)
    return null
  }
}

/**
 * Get PayPal access token
 */
async function getPayPalAccessToken(): Promise<string | null> {
  try {
    const clientId = process.env.PAYPAL_CLIENT_ID
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET
    
    // Use same base URL logic as PayPal client
    const baseUrl = process.env.PAYPAL_MODE === 'live' 
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com'

    if (!clientId || !clientSecret) {
      console.error('Missing PayPal credentials')
      return null
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

    const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    })

    if (!response.ok) {
      console.error('PayPal auth error:', await response.text())
      return null
    }

    const data = await response.json()
    return data.access_token

  } catch (error) {
    console.error('PayPal auth error:', error)
    return null
  }
}
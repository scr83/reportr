import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // More permissive CSP for Google OAuth, Analytics, and Vercel tools
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://apis.google.com https://www.googletagmanager.com https://vercel.live blob:",
      "style-src 'self' 'unsafe-inline' https://accounts.google.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://accounts.google.com https://oauth2.googleapis.com https://www.googleapis.com https://www.google-analytics.com https://analytics.google.com https://vercel.live blob:",
      "frame-src 'self' https://accounts.google.com",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "base-uri 'self'"
    ].join('; ')
  );

  // Check verification for protected routes (PayPal subscription, email verification, or PAID_TRIAL flow)
  const { pathname } = request.nextUrl;
  const protectedRoutes = ['/dashboard', '/clients', '/reports', '/settings'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    
    if (token) {
      const userId = token.sub;
      const emailVerified = token.emailVerified as boolean;
      const paypalSubscriptionId = token.paypalSubscriptionId as string | null;
      const subscriptionStatus = token.subscriptionStatus as string;
      const signupFlow = token.signupFlow as string | null;
      
      // Check if user has access (PAID USERS GET PRIORITY)
      const hasActivePayPalSubscription = paypalSubscriptionId && subscriptionStatus === 'active';
      const isPaidTrialFlow = signupFlow === 'PAID_TRIAL';
      const isFreeUser = signupFlow === 'FREE';  // FREE users always allowed to dashboard
      
      // Allow access if user has (ORDER MATTERS - paid users first):
      // 1. Active PayPal subscription (highest priority), OR
      // 2. PAID_TRIAL flow (trusted PayPal users who don't need email verification), OR  
      // 3. Email verification for FREE flow users
      const hasAccess = hasActivePayPalSubscription || isPaidTrialFlow || isFreeUser;
      
      if (!hasAccess) {
        // User is logged in but needs verification - LOG ALL CONDITIONS
        console.log(`🚫 User ${userId} blocked - no access:`, {
          paypalSubscriptionId,
          subscriptionStatus,
          emailVerified,
          signupFlow,
          hasActivePayPalSubscription,
          isPaidTrialFlow,
          isFreeUser
        });
        const verifyUrl = new URL('/verify-email-prompt', request.url);
        return NextResponse.redirect(verifyUrl);
      } else {
        // Log which verification path was used for debugging
        if (hasActivePayPalSubscription) {
          console.log(`✅ User ${userId} accessed via PayPal subscription (${paypalSubscriptionId})`);
        } else if (isPaidTrialFlow) {
          console.log(`✅ User ${userId} accessed via PAID_TRIAL flow (skipped email verification)`);
        } else if (isFreeUser) {
          console.log(`✅ User ${userId} accessed via FREE flow`);
        }
      }
    }
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};

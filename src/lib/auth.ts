import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/lib/prisma';
import { generateVerificationToken, hasUsedTrial } from '@/lib/email-tokens';
import { sendVerificationEmail } from '@/lib/email';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      emailVerified?: boolean;
      paypalSubscriptionId?: string | null;
      subscriptionStatus?: string;
      signupFlow?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    redirect: ({ url, baseUrl }) => {
      // If the URL is trying to redirect to verify-email-prompt, redirect to dashboard instead
      if (url.includes('/verify-email-prompt')) {
        return `${baseUrl}/dashboard?onboarding=true`;
      }
      // For relative URLs, make them absolute
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      // For same-origin URLs, allow them
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      // Default to dashboard for external URLs
      return `${baseUrl}/dashboard`;
    },
    async signIn(params) {
      const { user, account, profile } = params;
      
      // Try to access cookies from global headers context (if available)
      let signupIntent = 'FREE'; // Default
      try {
        // Access cookies from Node.js request headers (if available in global context)
        const headers = (global as any).__NEXT_REQUEST_HEADERS__;
        const cookieHeader = headers?.cookie || '';
        const signupIntentMatch = cookieHeader.match(/signupIntent=([^;]+)/);
        signupIntent = signupIntentMatch ? signupIntentMatch[1] : 'FREE';
        console.log('🍪 Detected signup intent from cookie:', signupIntent);
      } catch (error) {
        console.warn('⚠️ Could not access cookies via global context:', error);
        // Fallback to FREE
      }
      if (account?.provider === 'google' && user.email) {
        try {
          // Check if user already exists
          let existingUser = await prisma.user.findUnique({
            where: { email: user.email },
            select: { 
              id: true, 
              emailVerified: true, 
              trialUsed: true,
              paypalSubscriptionId: true,
              subscriptionStatus: true,
              signupFlow: true
            }
          });

          // If user doesn't exist, create them
          if (!existingUser) {
            // Check if this email has already used a trial (abuse prevention)
            const hasTrialRecord = await hasUsedTrial(user.email);
            
            // 🔧 FIX: Use signup intent from cookie (set by PayPal button)
            const signupFlow = signupIntent; // Already extracted from cookie above
            
            console.log(`👤 Creating new user: ${user.email}, signupFlow: ${signupFlow}`);
            
            existingUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                image: user.image,
                signupIp: '', // You can get this from the request if needed
                trialUsed: hasTrialRecord,
                signupFlow: signupFlow,
              },
              select: { 
                id: true, 
                emailVerified: true, 
                trialUsed: true,
                paypalSubscriptionId: true,
                subscriptionStatus: true,
                signupFlow: true
              }
            });

            // 🔧 FIX: Send verification email ONLY for FREE flow users
            // PAID_TRIAL users (PayPal) skip email verification entirely
            if (!hasTrialRecord && signupFlow === 'FREE') {
              console.log(`📧 Sending verification email to FREE user: ${user.email}`);
              const token = await generateVerificationToken(user.email);
              await sendVerificationEmail(
                user.email,
                user.name || 'there',
                token
              );
            } else if (signupFlow === 'PAID_TRIAL') {
              console.log(`✅ Skipping verification email for PAID_TRIAL user: ${user.email}`);
            } else {
              console.log(`⏭️  Skipping verification email for ${user.email} (already used trial)`);
            }
          } else {
            // For existing users, ensure PayPal subscribers are marked correctly
            if (existingUser.paypalSubscriptionId && existingUser.signupFlow !== 'PAID_TRIAL') {
              await prisma.user.update({
                where: { id: existingUser.id },
                data: { signupFlow: 'PAID_TRIAL' }
              });
              console.log(`Updated existing PayPal user ${user.email} signup flow to PAID_TRIAL`);
            }
          }

          // Store user ID for session
          user.id = existingUser.id;
          return true;
        } catch (error) {
          console.error('SignIn callback error:', error);
          return false;
        }
      }
      return true;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub!,
          emailVerified: token.emailVerified as boolean,
          paypalSubscriptionId: token.paypalSubscriptionId as string | null,
          subscriptionStatus: token.subscriptionStatus as string,
          signupFlow: token.signupFlow as string | null,
        },
      }
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.sub = user.id;
      }

      // Fetch email verification status, PayPal subscription info, and signup flow
      if (token.sub) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.sub },
            select: { 
              emailVerified: true,
              paypalSubscriptionId: true,
              subscriptionStatus: true,
              signupFlow: true
            }
          });
          token.emailVerified = !!dbUser?.emailVerified;
          token.paypalSubscriptionId = dbUser?.paypalSubscriptionId || null;
          token.subscriptionStatus = dbUser?.subscriptionStatus || 'free';
          token.signupFlow = dbUser?.signupFlow || null;
        } catch (error) {
          console.error('JWT callback error:', error);
          token.emailVerified = false;
          token.paypalSubscriptionId = null;
          token.subscriptionStatus = 'free';
          token.signupFlow = null;
        }
      }

      return token;
    },
  },
}

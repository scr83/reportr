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
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && user.email) {
        try {
          // Check if user already exists
          let existingUser = await prisma.user.findUnique({
            where: { email: user.email },
            select: { id: true, emailVerified: true, trialUsed: true }
          });

          // If user doesn't exist, create them
          if (!existingUser) {
            // Check if this email has already used a trial (abuse prevention)
            const hasTrialRecord = await hasUsedTrial(user.email);
            
            existingUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                image: user.image,
                signupIp: '', // You can get this from the request if needed
                trialUsed: hasTrialRecord,
              },
              select: { id: true, emailVerified: true, trialUsed: true }
            });

            // If this is a new user and they haven't used a trial, send verification email
            if (!hasTrialRecord) {
              const token = await generateVerificationToken(user.email);
              await sendVerificationEmail(
                user.email,
                user.name || 'there',
                token
              );
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
        },
      }
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.sub = user.id;
      }

      // Fetch email verification status
      if (token.sub) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.sub },
            select: { emailVerified: true }
          });
          token.emailVerified = !!dbUser?.emailVerified;
        } catch (error) {
          console.error('JWT callback error:', error);
          token.emailVerified = false;
        }
      }

      return token;
    },
  },
}

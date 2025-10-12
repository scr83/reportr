import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  // Add PrismaAdapter for database integration and auto-user creation
  adapter: PrismaAdapter(prisma) as any,
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Allow account linking
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  
  session: {
    strategy: 'database', // Changed from 'jwt' to 'database' for user persistence
  },
  
  callbacks: {
    // Session callback - add user ID
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
    
    // Redirect callback - handle post-login routing
    async redirect({ url, baseUrl }) {
      // If user just signed in, check if they need onboarding
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
  },
  
  pages: {
    signIn: '/',
    error: '/auth/error',
  },
};

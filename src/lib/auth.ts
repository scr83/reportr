import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly',
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),
  ],
  session: {
    strategy: 'database',
  },
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  callbacks: {
    async session({ session, user }) {
      // With database strategy, user data comes from database
      if (user && session.user) {
        session.user.id = user.id
        // Add user's custom fields to session
        session.user.companyName = (user as any).companyName
        session.user.primaryColor = (user as any).primaryColor
        
        // Get the user's Google tokens from the account table
        try {
          const account = await prisma.account.findFirst({
            where: {
              userId: user.id,
              provider: 'google'
            }
          })
          
          if (account) {
            session.accessToken = account.access_token || undefined
            session.refreshToken = account.refresh_token || undefined
          }
        } catch (error) {
          console.error('Error fetching Google tokens:', error)
        }
      }
      return session
    },
    async signIn({ user, account, profile }) {
      console.log('🔐 SignIn callback triggered:', {
        userId: user?.id,
        email: user?.email,
        provider: account?.provider,
        profileEmail: profile?.email
      })

      // Allow all Google sign-ins - Prisma adapter handles user creation
      if (account?.provider === 'google') {
        console.log('✅ Google sign-in approved')
        return true
      }

      return true
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      if (isNewUser && user.email) {
        console.log(`New user signed up: ${user.email}`)
        
        // Set default company information for new users
        const companyName = user.name ? `${user.name.split(' ')[0]}'s Agency` : 'My Agency'
        
        try {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              companyName,
              primaryColor: '#3B82F6',
            },
          })
          console.log(`Updated new user ${user.id} with default company info`)
        } catch (error) {
          console.error('Error updating new user:', error)
        }
      }
    },
  },
}


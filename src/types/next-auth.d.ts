import { Plan } from '@prisma/client'
import type { DefaultSession, DefaultUser } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      companyName?: string
      primaryColor?: string
      logo?: string
      plan?: Plan
    } & DefaultSession['user']
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
    error?: string
  }

  interface User extends DefaultUser {
    companyName?: string
    primaryColor?: string
    logo?: string
    plan?: Plan
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
    error?: string
  }
}
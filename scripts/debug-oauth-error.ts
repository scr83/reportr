#!/usr/bin/env node

/**
 * Debug OAuth 500 Error
 * Attempts to reproduce and capture the exact error
 */

import { authOptions } from '../src/lib/auth'

async function debugAuthConfiguration() {
  console.log('🔍 Debugging Auth Configuration...\n')
  
  try {
    // Check if auth options are valid
    console.log('1️⃣ Checking auth options structure...')
    console.log('✅ Auth options loaded')
    console.log('📝 Providers count:', authOptions.providers?.length || 0)
    console.log('📝 Session strategy:', authOptions.session?.strategy)
    console.log('📝 Adapter present:', !!authOptions.adapter)
    
    // Check Google provider configuration
    const googleProvider = authOptions.providers?.find(p => p.id === 'google')
    if (googleProvider) {
      console.log('✅ Google provider found')
      console.log('📝 Google provider type:', googleProvider.type)
      // @ts-ignore
      console.log('📝 Client ID set:', !!googleProvider.options?.clientId)
      // @ts-ignore  
      console.log('📝 Client secret set:', !!googleProvider.options?.clientSecret)
    } else {
      console.log('❌ Google provider not found')
    }
    
    // Test database connection via Prisma
    console.log('\n2️⃣ Testing database connection...')
    try {
      const { prisma } = await import('../src/lib/prisma')
      await prisma.$connect()
      console.log('✅ Database connection successful')
      
      // Check if required tables exist
      const tableCheck = await prisma.$queryRaw`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('users', 'accounts', 'sessions')
        ORDER BY table_name;
      `
      console.log('📝 NextAuth tables:', tableCheck)
      
      await prisma.$disconnect()
    } catch (dbError) {
      console.log('❌ Database connection failed:', dbError)
    }
    
    // Test direct NextAuth initialization
    console.log('\n3️⃣ Testing NextAuth initialization...')
    try {
      const NextAuth = (await import('next-auth')).default
      console.log('✅ NextAuth import successful')
      
      // Try to create handler
      const handler = NextAuth(authOptions)
      console.log('✅ NextAuth handler created successfully')
    } catch (nextAuthError) {
      console.log('❌ NextAuth initialization failed:', nextAuthError)
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error)
  }
}

async function testGoogleAPIEndpoint() {
  console.log('\n4️⃣ Testing Google OAuth endpoint directly...')
  
  try {
    // Simulate what NextAuth does
    const clientId = process.env.GOOGLE_CLIENT_ID
    const redirectUri = 'https://reportr-one.vercel.app/api/auth/callback/google'
    
    if (!clientId) {
      console.log('❌ GOOGLE_CLIENT_ID not found in environment')
      return
    }
    
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    authUrl.searchParams.set('client_id', clientId)
    authUrl.searchParams.set('redirect_uri', redirectUri)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('scope', 'openid email profile https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly')
    authUrl.searchParams.set('access_type', 'offline')
    authUrl.searchParams.set('prompt', 'consent')
    authUrl.searchParams.set('state', 'test-state')
    
    console.log('📝 Google OAuth URL would be:')
    console.log(authUrl.toString())
    
    // Test the OAuth discovery endpoint
    const discoveryResponse = await fetch('https://accounts.google.com/.well-known/openid_configuration')
    if (discoveryResponse.ok) {
      console.log('✅ Google OAuth discovery endpoint accessible')
    } else {
      console.log('❌ Google OAuth discovery endpoint failed')
    }
    
  } catch (error) {
    console.log('❌ Google API test failed:', error)
  }
}

async function main() {
  console.log('🚀 OAuth Error Debugging\n')
  console.log('='*50 + '\n')
  
  await debugAuthConfiguration()
  await testGoogleAPIEndpoint()
  
  console.log('\n' + '='*50)
  console.log('🏁 Debug complete!')
  
  console.log('\n💡 Common 500 error causes:')
  console.log('1. Missing or invalid GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET')
  console.log('2. Database connection failure')
  console.log('3. Invalid NEXTAUTH_SECRET')
  console.log('4. Incorrect redirect URI in Google Cloud Console')
  console.log('5. Missing required environment variables in production')
}

main().catch(console.error)
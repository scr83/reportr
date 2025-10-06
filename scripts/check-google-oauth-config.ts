#!/usr/bin/env node

/**
 * Check Google OAuth Configuration
 * Validates Google OAuth settings and credentials
 */

import { authOptions } from '../src/lib/auth'

async function checkGoogleOAuthConfig() {
  console.log('🔍 Checking Google OAuth Configuration...\n')
  
  try {
    // Check environment variables
    console.log('1️⃣ Environment Variables:')
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const nextAuthUrl = process.env.NEXTAUTH_URL
    
    console.log('  GOOGLE_CLIENT_ID:', clientId ? `${clientId.substring(0, 20)}...` : '❌ Missing')
    console.log('  GOOGLE_CLIENT_SECRET:', clientSecret ? `${clientSecret.substring(0, 10)}...` : '❌ Missing')
    console.log('  NEXTAUTH_URL:', nextAuthUrl || '❌ Missing')
    
    if (!clientId || !clientSecret) {
      console.log('❌ Missing Google OAuth credentials!')
      return false
    }
    
    // Validate the redirect URI format
    console.log('\n2️⃣ Redirect URI Validation:')
    const expectedRedirectUri = `${nextAuthUrl}/api/auth/callback/google`
    console.log('  Expected redirect URI:', expectedRedirectUri)
    
    // Check Google provider configuration
    console.log('\n3️⃣ Google Provider Configuration:')
    const googleProvider = authOptions.providers?.find(p => p.id === 'google')
    if (googleProvider) {
      console.log('  ✅ Google provider found')
      // @ts-ignore
      const options = googleProvider.options
      console.log('  Client ID matches:', options?.clientId === clientId ? '✅' : '❌')
      console.log('  Client Secret matches:', options?.clientSecret === clientSecret ? '✅' : '❌')
      // @ts-ignore
      console.log('  Authorization scope:', options?.authorization?.params?.scope)
    } else {
      console.log('  ❌ Google provider not found')
      return false
    }
    
    // Test Google's OAuth discovery endpoint
    console.log('\n4️⃣ Google OAuth Discovery:')
    try {
      const discoveryResponse = await fetch('https://accounts.google.com/.well-known/openid_configuration')
      if (discoveryResponse.ok) {
        const config = await discoveryResponse.json()
        console.log('  ✅ Google OAuth discovery successful')
        console.log('  Authorization endpoint:', config.authorization_endpoint)
        console.log('  Token endpoint:', config.token_endpoint)
      } else {
        console.log('  ❌ Google OAuth discovery failed:', discoveryResponse.status)
      }
    } catch (error) {
      console.log('  ❌ Google OAuth discovery error:', error)
    }
    
    // Test if Google Client ID is valid format
    console.log('\n5️⃣ Client ID Format Validation:')
    if (clientId) {
      const isValidFormat = clientId.includes('.apps.googleusercontent.com')
      console.log('  Valid format (.apps.googleusercontent.com):', isValidFormat ? '✅' : '❌')
      
      if (!isValidFormat) {
        console.log('  ❌ INVALID: Google Client ID must end with .apps.googleusercontent.com')
        return false
      }
    }
    
    return true
    
  } catch (error) {
    console.error('❌ Configuration check failed:', error)
    return false
  }
}

async function testGoogleOAuthEndpoint() {
  console.log('\n6️⃣ Testing Google OAuth URL Construction...')
  
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
    
    if (!clientId) {
      console.log('❌ Cannot test: GOOGLE_CLIENT_ID missing')
      return false
    }
    
    // Construct the OAuth URL that NextAuth would create
    const oauthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    oauthUrl.searchParams.set('client_id', clientId)
    oauthUrl.searchParams.set('redirect_uri', redirectUri)
    oauthUrl.searchParams.set('response_type', 'code')
    oauthUrl.searchParams.set('scope', 'openid email profile https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly')
    oauthUrl.searchParams.set('access_type', 'offline')
    oauthUrl.searchParams.set('prompt', 'consent')
    
    console.log('  📝 Constructed OAuth URL:')
    console.log('  ', oauthUrl.toString())
    
    // Test if this URL is accessible (should return 200, not 4xx)
    try {
      const testResponse = await fetch(oauthUrl.toString(), { method: 'HEAD' })
      console.log('  📝 Google OAuth URL test status:', testResponse.status)
      
      if (testResponse.status === 400) {
        console.log('  ❌ Bad Request - likely invalid client_id or redirect_uri')
        return false
      } else if (testResponse.status === 200 || testResponse.status === 302) {
        console.log('  ✅ Google OAuth URL appears valid')
        return true
      }
    } catch (error) {
      console.log('  ⚠️  Could not test URL (network issue):', error)
    }
    
    return true
    
  } catch (error) {
    console.log('❌ OAuth URL test failed:', error)
    return false
  }
}

async function main() {
  console.log('🚀 Google OAuth Configuration Check\n')
  console.log('='*60)
  
  const configValid = await checkGoogleOAuthConfig()
  const urlValid = await testGoogleOAuthEndpoint()
  
  console.log('\n' + '='*60)
  console.log('🏁 Configuration Check Results:')
  
  if (configValid && urlValid) {
    console.log('✅ Google OAuth configuration appears correct')
    console.log('💡 The error might be in Google Cloud Console settings:')
    console.log('   - Check authorized redirect URIs')
    console.log('   - Verify OAuth consent screen is configured')
    console.log('   - Ensure app is not in testing mode with restricted users')
  } else {
    console.log('❌ Google OAuth configuration has issues')
    console.log('💡 Fix the issues above and try again')
  }
}

main().catch(console.error)
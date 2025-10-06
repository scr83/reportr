#!/usr/bin/env node

/**
 * Detailed OAuth Debug
 * Comprehensive debugging of OAuth flow issues
 */

async function debugOAuthDetailed() {
  console.log('🔍 Detailed OAuth Debug Analysis...\n')
  
  try {
    // Test 1: Check if the OAuth endpoint returns the right type of error
    console.log('1️⃣ Analyzing OAuth Error Response...')
    const oauthResponse = await fetch('https://reportr-one.vercel.app/api/auth/signin/google', {
      method: 'GET',
      redirect: 'manual'
    })
    
    console.log('📝 OAuth Response Details:')
    console.log('  Status:', oauthResponse.status)
    console.log('  Headers:', Object.fromEntries(oauthResponse.headers.entries()))
    
    if (oauthResponse.status === 302) {
      const location = oauthResponse.headers.get('location')
      console.log('  Redirect Location:', location)
      
      if (location?.includes('error=google')) {
        console.log('❌ Google OAuth Error Detected')
        
        // Parse the error URL to get more details
        const url = new URL(location, 'https://reportr-one.vercel.app')
        const errorType = url.searchParams.get('error')
        const callbackUrl = url.searchParams.get('callbackUrl')
        
        console.log('  Error Type:', errorType)
        console.log('  Callback URL:', callbackUrl)
        
        // Check for specific error types
        if (errorType === 'google') {
          console.log('\n🔍 Google OAuth Error Analysis:')
          console.log('This could be caused by:')
          console.log('1. OAuth consent screen not published')
          console.log('2. User not in test users list (if in testing mode)')
          console.log('3. Invalid scopes requested')
          console.log('4. Redirect URI mismatch in Google Cloud Console')
          console.log('5. Google client ID/secret mismatch')
        }
      }
    }
    
    // Test 2: Check Google Cloud Console configuration by testing the OAuth URL directly
    console.log('\n2️⃣ Testing Google OAuth Configuration...')
    
    const clientId = '707894998872-b7l8lg2me8fj700j8ih4hbno9qm18llr.apps.googleusercontent.com'
    const redirectUri = 'https://reportr-one.vercel.app/api/auth/callback/google'
    
    // Create the exact OAuth URL Google should accept
    const googleOAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    googleOAuthUrl.searchParams.set('client_id', clientId)
    googleOAuthUrl.searchParams.set('redirect_uri', redirectUri)
    googleOAuthUrl.searchParams.set('response_type', 'code')
    googleOAuthUrl.searchParams.set('scope', 'openid email profile https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly')
    googleOAuthUrl.searchParams.set('access_type', 'offline')
    googleOAuthUrl.searchParams.set('prompt', 'consent')
    googleOAuthUrl.searchParams.set('state', 'test')
    
    console.log('📝 Testing OAuth URL with Google...')
    console.log('URL:', googleOAuthUrl.toString().substring(0, 150) + '...')
    
    const googleResponse = await fetch(googleOAuthUrl.toString(), {
      method: 'GET',
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OAuth-Test/1.0)'
      }
    })
    
    console.log('📝 Google OAuth Test Result:')
    console.log('  Status:', googleResponse.status)
    
    if (googleResponse.status === 400) {
      console.log('❌ CRITICAL: Google rejects the OAuth configuration!')
      console.log('   This means there\'s an issue in Google Cloud Console')
      console.log('   Common causes:')
      console.log('   - Redirect URI not authorized')
      console.log('   - Invalid client ID')
      console.log('   - App not properly configured')
      
      const errorText = await googleResponse.text()
      console.log('   Error details:', errorText.substring(0, 200))
      
    } else if (googleResponse.status === 302 || googleResponse.status === 200) {
      console.log('✅ Google accepts the OAuth configuration')
      const location = googleResponse.headers.get('location')
      if (location?.includes('accounts.google.com')) {
        console.log('✅ OAuth flow would work correctly')
      }
    }
    
    // Test 3: Check for rate limiting or other issues
    console.log('\n3️⃣ Testing for Rate Limiting...')
    const rateLimitTest = await fetch('https://reportr-one.vercel.app/api/auth/providers')
    console.log('  Providers endpoint status:', rateLimitTest.status)
    console.log('  Rate limit headers:', {
      'x-vercel-id': rateLimitTest.headers.get('x-vercel-id'),
      'x-vercel-cache': rateLimitTest.headers.get('x-vercel-cache')
    })
    
  } catch (error) {
    console.error('❌ Debug failed:', error)
  }
}

async function main() {
  console.log('🚀 Detailed OAuth Debug\n')
  console.log('='*60)
  
  await debugOAuthDetailed()
  
  console.log('\n' + '='*60)
  console.log('🏁 Debug Complete')
  
  console.log('\n💡 Next Steps:')
  console.log('1. If Google rejects OAuth config → Fix Google Cloud Console')
  console.log('2. If Google accepts config → Check OAuth consent screen publishing')
  console.log('3. If error persists → Add test users to OAuth consent screen')
}

main().catch(console.error)
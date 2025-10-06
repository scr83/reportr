#!/usr/bin/env node

/**
 * Test Google OAuth Direct
 * Constructs and tests the exact OAuth URL that should work
 */

async function testGoogleOAuthDirect() {
  console.log('🔍 Testing Google OAuth URL Construction...\n')
  
  // These are the exact values we know are being used in production
  const clientId = '707894998872-b7l8lg2me8fj700j8ih4hbno9qm18llr.apps.googleusercontent.com'
  const redirectUri = 'https://reportr-one.vercel.app/api/auth/callback/google'
  
  console.log('📝 OAuth Configuration:')
  console.log('  Client ID:', clientId)
  console.log('  Redirect URI:', redirectUri)
  
  // Construct the exact OAuth URL that NextAuth would generate
  const oauthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  oauthUrl.searchParams.set('client_id', clientId)
  oauthUrl.searchParams.set('redirect_uri', redirectUri)
  oauthUrl.searchParams.set('response_type', 'code')
  oauthUrl.searchParams.set('scope', 'openid email profile https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly')
  oauthUrl.searchParams.set('access_type', 'offline')
  oauthUrl.searchParams.set('prompt', 'consent')
  oauthUrl.searchParams.set('state', 'test-state-123')
  
  console.log('\n📝 Generated OAuth URL:')
  console.log(oauthUrl.toString())
  
  console.log('\n🔍 Testing OAuth URL with Google...')
  
  try {
    // Test the OAuth URL - if there's a configuration issue, Google will return an error
    const response = await fetch(oauthUrl.toString(), {
      method: 'GET',
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OAuth-Test/1.0)'
      }
    })
    
    console.log('📝 Google OAuth Response:')
    console.log('  Status:', response.status)
    console.log('  Status Text:', response.statusText)
    
    if (response.status === 200) {
      console.log('✅ Google OAuth URL is valid!')
      console.log('💡 This means Google accepts the configuration.')
      console.log('💡 The issue might be in the OAuth consent screen settings.')
      return true
    } else if (response.status === 400) {
      console.log('❌ Google OAuth URL is invalid!')
      console.log('💡 Possible issues:')
      console.log('   - redirect_uri not authorized in Google Cloud Console')
      console.log('   - client_id is incorrect')
      console.log('   - Invalid parameters')
      return false
    } else if (response.status === 302) {
      const location = response.headers.get('location')
      console.log('📝 Google redirected to:', location)
      
      if (location?.includes('error=')) {
        console.log('❌ Google returned an error in redirect')
        const url = new URL(location, 'https://accounts.google.com')
        const error = url.searchParams.get('error')
        const errorDescription = url.searchParams.get('error_description')
        console.log('  Error:', error)
        console.log('  Description:', errorDescription)
        return false
      } else {
        console.log('✅ Google OAuth redirect looks normal')
        return true
      }
    }
    
  } catch (error) {
    console.error('❌ Network error testing OAuth URL:', error)
    return false
  }
  
  return false
}

async function checkGoogleCloudConsoleRequirements() {
  console.log('\n📋 Google Cloud Console Requirements Check:')
  console.log('='*50)
  
  console.log('\n✅ Required Settings (please verify):')
  console.log('1. OAuth 2.0 Client ID Configuration:')
  console.log('   - Authorized redirect URIs: https://reportr-one.vercel.app/api/auth/callback/google')
  console.log('   - NO localhost entries')
  
  console.log('\n2. OAuth Consent Screen:')
  console.log('   - App name: Set')
  console.log('   - User support email: Set') 
  console.log('   - Developer contact: Set')
  console.log('   - Publishing status: "In production" OR add test users')
  
  console.log('\n3. Scopes:')
  console.log('   - openid, email, profile (basic)')
  console.log('   - webmasters.readonly (Search Console)')
  console.log('   - analytics.readonly (Google Analytics)')
  
  console.log('\n❗ MOST COMMON ISSUE:')
  console.log('   OAuth consent screen in "Testing" mode without test users added')
  console.log('   Solution: Add your email to test users OR publish to production')
}

async function main() {
  console.log('🚀 Google OAuth Direct Test\n')
  console.log('='*60)
  
  const oauthValid = await testGoogleOAuthDirect()
  await checkGoogleCloudConsoleRequirements()
  
  console.log('\n' + '='*60)
  console.log('🏁 Diagnosis:')
  
  if (oauthValid) {
    console.log('✅ OAuth URL configuration is correct')
    console.log('🎯 Issue is likely: OAuth consent screen settings')
    console.log('💡 Next step: Check if app is published or add test users')
  } else {
    console.log('❌ OAuth URL configuration has issues')
    console.log('🎯 Issue is likely: redirect_uri not authorized in Google Cloud Console')
    console.log('💡 Next step: Verify redirect URI exactly matches in Google Cloud Console')
  }
}

main().catch(console.error)
#!/usr/bin/env node

/**
 * Test OAuth GET Request (browser simulation)
 * Tests how a browser would initiate OAuth flow
 */

async function testOAuthGetRequest() {
  console.log('🔍 Testing OAuth GET Request (Browser Simulation)...\n')
  
  const baseUrl = 'https://reportr-one.vercel.app'
  
  try {
    // Test 1: Direct GET to OAuth signin (simulates clicking the button)
    console.log('1️⃣ Testing GET request to OAuth signin...')
    const oauthResponse = await fetch(`${baseUrl}/api/auth/signin/google`, {
      method: 'GET',
      redirect: 'manual',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (compatible; OAuth-Test/1.0)',
      }
    })
    
    console.log('📝 Status:', oauthResponse.status)
    console.log('📝 Status Text:', oauthResponse.statusText)
    
    if (oauthResponse.status === 302 || oauthResponse.status === 307) {
      const location = oauthResponse.headers.get('location')
      console.log('✅ OAuth redirect detected!')
      console.log('📝 Redirect URL:', location)
      
      if (location?.includes('accounts.google.com')) {
        console.log('🎉 SUCCESS: OAuth GET request works! Redirects to Google.')
        
        // Parse the OAuth URL to check parameters
        if (location) {
          const url = new URL(location)
          console.log('\n📝 OAuth Parameters:')
          console.log('  client_id:', url.searchParams.get('client_id')?.substring(0, 20) + '...')
          console.log('  redirect_uri:', url.searchParams.get('redirect_uri'))
          console.log('  scope:', url.searchParams.get('scope'))
          console.log('  response_type:', url.searchParams.get('response_type'))
          console.log('  state:', url.searchParams.get('state')?.substring(0, 20) + '...')
        }
        
        return true
      } else {
        console.log('❌ Redirect is not to Google:', location)
        return false
      }
    } else {
      console.log('❌ OAuth GET request failed with status:', oauthResponse.status)
      const responseText = await oauthResponse.text()
      console.log('📝 Response body (first 200 chars):', responseText.substring(0, 200))
      return false
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error)
    return false
  }
}

async function main() {
  console.log('🚀 OAuth GET Request Test\n')
  console.log('='*50)
  
  const success = await testOAuthGetRequest()
  
  console.log('\n' + '='*50)
  console.log('🏁 Test Results:')
  
  if (success) {
    console.log('🎉 SUCCESS: OAuth GET request works!')
    console.log('💡 The sign-in button should work when clicked in browser.')
    console.log('💡 Issue was likely with POST request CSRF validation.')
  } else {
    console.log('❌ FAILED: OAuth GET request still has issues.')
  }
}

main().catch(console.error)
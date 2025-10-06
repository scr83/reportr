#!/usr/bin/env node

/**
 * Test Production Environment Variables
 * Checks what environment variables are actually set in production
 */

async function testProductionEnv() {
  console.log('🔍 Testing Production Environment Variables...\n')
  
  try {
    // Create a test endpoint to check env vars in production
    const testResponse = await fetch('https://reportr-one.vercel.app/api/auth/providers')
    
    if (testResponse.ok) {
      const providers = await testResponse.json()
      console.log('✅ NextAuth providers endpoint accessible')
      console.log('📝 Available providers:', Object.keys(providers))
      
      // Check if Google provider has correct configuration
      if (providers.google) {
        console.log('✅ Google provider found')
        console.log('📝 Google provider details:', {
          id: providers.google.id,
          name: providers.google.name,
          type: providers.google.type,
          signinUrl: providers.google.signinUrl,
          callbackUrl: providers.google.callbackUrl
        })
        
        // The signinUrl and callbackUrl should show us the actual NEXTAUTH_URL being used
        if (providers.google.callbackUrl) {
          console.log('\n🔍 Analyzing callback URL...')
          const callbackUrl = providers.google.callbackUrl
          console.log('📝 Full callback URL:', callbackUrl)
          
          if (callbackUrl.includes('localhost')) {
            console.log('❌ ISSUE: Callback URL still points to localhost!')
            console.log('💡 Vercel environment variable not updated or needs redeploy')
          } else if (callbackUrl.includes('reportr-one.vercel.app')) {
            console.log('✅ Callback URL correctly points to production domain')
          } else {
            console.log('⚠️  Callback URL points to unexpected domain:', callbackUrl)
          }
        }
      }
    } else {
      console.log('❌ Cannot access providers endpoint:', testResponse.status)
    }

    // Test a more direct approach - check the actual OAuth URL being generated
    console.log('\n2️⃣ Testing OAuth URL generation...')
    const oauthResponse = await fetch('https://reportr-one.vercel.app/api/auth/signin/google', {
      method: 'GET',
      redirect: 'manual'
    })
    
    console.log('📝 OAuth response status:', oauthResponse.status)
    
    if (oauthResponse.status === 302 || oauthResponse.status === 307) {
      const location = oauthResponse.headers.get('location')
      console.log('📝 OAuth redirect location:', location)
      
      if (location?.includes('accounts.google.com')) {
        console.log('🎉 SUCCESS: OAuth now redirects to Google!')
        
        // Parse the redirect URL to check the redirect_uri parameter
        const url = new URL(location)
        const redirectUri = url.searchParams.get('redirect_uri')
        console.log('📝 Redirect URI parameter:', redirectUri)
        
        if (redirectUri?.includes('reportr-one.vercel.app')) {
          console.log('✅ Redirect URI correctly points to production!')
          return true
        } else if (redirectUri?.includes('localhost')) {
          console.log('❌ Redirect URI still points to localhost')
          return false
        }
      } else if (location?.includes('error=google')) {
        console.log('❌ OAuth still failing with Google error')
        console.log('💡 This suggests the issue persists')
        return false
      }
    }
    
    return false
    
  } catch (error) {
    console.error('❌ Test failed:', error)
    return false
  }
}

async function main() {
  console.log('🚀 Production Environment Test\n')
  console.log('='*50)
  
  const success = await testProductionEnv()
  
  console.log('\n' + '='*50)
  console.log('🏁 Test Results:')
  
  if (success) {
    console.log('🎉 SUCCESS: OAuth configuration is correct!')
    console.log('💡 The sign-in should now work in production.')
  } else {
    console.log('❌ ISSUE: OAuth configuration still has problems.')
    console.log('💡 Possible next steps:')
    console.log('   1. Redeploy the Vercel application to pick up env var changes')
    console.log('   2. Wait a few minutes for changes to propagate')
    console.log('   3. Check Vercel dashboard to confirm NEXTAUTH_URL is set correctly')
  }
}

main().catch(console.error)
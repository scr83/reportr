#!/usr/bin/env node

/**
 * Direct Production Test
 * Tests the actual production environment with real requests
 */

async function testProductionDirectly() {
  console.log('🔍 Testing Production Environment Directly...\n')
  
  const baseUrl = 'https://reportr-one.vercel.app'
  
  try {
    // Test 1: Get CSRF token first (required for POST requests)
    console.log('1️⃣ Getting CSRF token...')
    const csrfResponse = await fetch(`${baseUrl}/api/auth/csrf`)
    const csrfData = await csrfResponse.json()
    console.log('✅ CSRF token obtained:', csrfData.csrfToken?.substring(0, 16) + '...')
    
    // Test 2: Attempt OAuth signin with CSRF token
    console.log('\n2️⃣ Testing OAuth signin with CSRF...')
    const formData = new FormData()
    formData.append('csrfToken', csrfData.csrfToken)
    formData.append('callbackUrl', '/dashboard')
    
    const signinResponse = await fetch(`${baseUrl}/api/auth/signin/google`, {
      method: 'POST',
      body: formData,
      redirect: 'manual',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      }
    })
    
    console.log('📝 Status:', signinResponse.status)
    console.log('📝 Status Text:', signinResponse.statusText)
    console.log('📝 Headers:', Object.fromEntries(signinResponse.headers.entries()))
    
    if (signinResponse.status === 302 || signinResponse.status === 307) {
      const location = signinResponse.headers.get('location')
      console.log('✅ OAuth redirect successful!')
      console.log('📝 Redirect URL:', location?.substring(0, 100) + '...')
      
      if (location?.includes('accounts.google.com')) {
        console.log('🎉 SUCCESS: OAuth is working! Redirects to Google correctly.')
        return true
      } else {
        console.log('❌ Redirect is not to Google:', location)
        return false
      }
    } else {
      console.log('❌ OAuth signin failed with status:', signinResponse.status)
      const responseText = await signinResponse.text()
      console.log('📝 Response body (first 500 chars):', responseText.substring(0, 500))
      return false
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error)
    return false
  }
}

async function testVercelDeployment() {
  console.log('\n3️⃣ Testing Vercel deployment status...')
  
  try {
    // Check if it's a fresh deployment
    const healthResponse = await fetch('https://reportr-one.vercel.app/api/auth/providers')
    console.log('📝 Providers endpoint status:', healthResponse.status)
    
    if (healthResponse.ok) {
      const providers = await healthResponse.json()
      console.log('📝 Available providers:', Object.keys(providers))
    }
    
    // Check headers for deployment info
    console.log('📝 Deployment headers:')
    console.log('  x-vercel-id:', healthResponse.headers.get('x-vercel-id'))
    console.log('  x-vercel-cache:', healthResponse.headers.get('x-vercel-cache'))
    
  } catch (error) {
    console.log('❌ Vercel test failed:', error)
  }
}

async function main() {
  console.log('🚀 Direct Production OAuth Test\n')
  console.log('='*50)
  
  const success = await testProductionDirectly()
  await testVercelDeployment()
  
  console.log('\n' + '='*50)
  console.log('🏁 Test Results:')
  
  if (success) {
    console.log('🎉 SUCCESS: OAuth is working correctly!')
    console.log('💡 The sign-in button should now work in production.')
  } else {
    console.log('❌ FAILED: OAuth still has issues.')
    console.log('💡 Possible causes:')
    console.log('   - Vercel hasn\'t deployed environment variable changes')
    console.log('   - Need to redeploy the application')
    console.log('   - Database migration needs time to propagate')
  }
}

main().catch(console.error)
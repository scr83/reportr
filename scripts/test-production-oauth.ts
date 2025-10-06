#!/usr/bin/env node

/**
 * Production OAuth Diagnostic Script
 * Tests OAuth configuration in production environment
 */

async function testProductionOAuth() {
  console.log('🔍 Testing Production OAuth Configuration...\n')

  const productionUrl = 'https://reportr-one.vercel.app'
  
  try {
    // Test 1: Check NextAuth configuration endpoint
    console.log('1️⃣ Testing NextAuth configuration...')
    const configResponse = await fetch(`${productionUrl}/api/auth/providers`)
    
    if (configResponse.ok) {
      const providers = await configResponse.json()
      console.log('✅ NextAuth providers endpoint accessible')
      console.log('📝 Available providers:', Object.keys(providers))
      
      if (providers.google) {
        console.log('✅ Google provider configured')
        console.log('📝 Google provider details:', {
          id: providers.google.id,
          name: providers.google.name,
          type: providers.google.type
        })
      } else {
        console.log('❌ Google provider NOT found in configuration')
      }
    } else {
      console.log('❌ NextAuth providers endpoint failed:', configResponse.status)
    }

    // Test 2: Check signin page
    console.log('\n2️⃣ Testing sign-in page...')
    const signinResponse = await fetch(`${productionUrl}/signin`)
    if (signinResponse.ok) {
      console.log('✅ Sign-in page accessible')
    } else {
      console.log('❌ Sign-in page failed:', signinResponse.status)
    }

    // Test 3: Check OAuth signin endpoint  
    console.log('\n3️⃣ Testing OAuth signin endpoint...')
    const oauthResponse = await fetch(`${productionUrl}/api/auth/signin/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'manual' // Don't follow redirects
    })
    
    console.log('📝 OAuth response status:', oauthResponse.status)
    console.log('📝 OAuth response headers:', Object.fromEntries(oauthResponse.headers.entries()))
    
    if (oauthResponse.status === 302 || oauthResponse.status === 307) {
      const location = oauthResponse.headers.get('location')
      if (location?.includes('accounts.google.com')) {
        console.log('✅ OAuth redirect to Google successful')
        console.log('📝 Redirect URL:', location.substring(0, 100) + '...')
      } else {
        console.log('❌ OAuth redirect incorrect:', location)
      }
    } else {
      console.log('❌ OAuth endpoint failed with status:', oauthResponse.status)
      const text = await oauthResponse.text()
      console.log('📝 Response body:', text.substring(0, 500))
    }

    // Test 4: Check CSRF token endpoint
    console.log('\n4️⃣ Testing CSRF token...')
    const csrfResponse = await fetch(`${productionUrl}/api/auth/csrf`)
    if (csrfResponse.ok) {
      const csrf = await csrfResponse.json()
      console.log('✅ CSRF token endpoint accessible')
      console.log('📝 CSRF token length:', csrf.csrfToken?.length || 0)
    } else {
      console.log('❌ CSRF token endpoint failed:', csrfResponse.status)
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error)
  }
}

// Environment check
function checkEnvironmentVars() {
  console.log('🔧 Checking required environment variables...\n')
  
  const requiredVars = [
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL', 
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'DATABASE_URL'
  ]
  
  const missingVars = requiredVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0) {
    console.log('❌ Missing environment variables:', missingVars)
    return false
  }
  
  console.log('✅ All required environment variables present')
  
  // Check specific values
  console.log('📝 NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
  console.log('📝 GOOGLE_CLIENT_ID (first 20 chars):', process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + '...')
  console.log('📝 NEXTAUTH_SECRET length:', process.env.NEXTAUTH_SECRET?.length || 0)
  
  return true
}

async function main() {
  console.log('🚀 Production OAuth Diagnostics\n')
  console.log('='*50 + '\n')
  
  checkEnvironmentVars()
  console.log('\n' + '='*50 + '\n')
  
  await testProductionOAuth()
  
  console.log('\n' + '='*50)
  console.log('🏁 Diagnostics complete!')
}

main().catch(console.error)
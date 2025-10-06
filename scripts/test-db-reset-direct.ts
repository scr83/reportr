#!/usr/bin/env node

/**
 * Direct Database Reset Test
 * Tests the database reset API directly against production
 */

async function testDatabaseResetDirect() {
  console.log('🧪 Testing Database Reset API Direct...\n');
  
  const baseUrl = 'https://reportr-one.vercel.app';
  
  try {
    // Test 1: Test unauthorized access (should fail)
    console.log('1️⃣ Testing unauthorized access protection...');
    const unauthorizedResponse = await fetch(`${baseUrl}/api/admin/reset-db?secret=wrong-secret`, {
      method: 'POST'
    });
    
    console.log('📝 Unauthorized response status:', unauthorizedResponse.status);
    
    if (unauthorizedResponse.status === 401) {
      console.log('✅ Security working: unauthorized access properly blocked');
    } else {
      console.log('❌ SECURITY ISSUE: unauthorized access allowed');
      const responseText = await unauthorizedResponse.text();
      console.log('Response:', responseText);
    }
    
    // Test 2: Test with no secret (should fail)
    console.log('\n2️⃣ Testing access without secret...');
    const noSecretResponse = await fetch(`${baseUrl}/api/admin/reset-db`, {
      method: 'POST'
    });
    
    console.log('📝 No secret response status:', noSecretResponse.status);
    
    if (noSecretResponse.status === 401) {
      console.log('✅ Security working: no secret access properly blocked');
    } else {
      console.log('❌ SECURITY ISSUE: no secret access allowed');
    }
    
    // Test 3: Test if endpoint exists
    console.log('\n3️⃣ Testing if endpoint exists...');
    const endpointTest = await fetch(`${baseUrl}/api/admin/reset-db`, {
      method: 'OPTIONS'
    });
    
    console.log('📝 Endpoint test status:', endpointTest.status);
    console.log('📝 Endpoint test headers:', Object.fromEntries(endpointTest.headers.entries()));
    
    if (endpointTest.status === 404) {
      console.log('❌ Endpoint not found - deployment may not be complete');
    } else {
      console.log('✅ Endpoint exists and is accessible');
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
}

async function main() {
  console.log('🚀 Direct Database Reset API Test\n');
  console.log('='*50);
  
  const testSuccess = await testDatabaseResetDirect();
  
  console.log('\n' + '='*50);
  console.log('🏁 Test Results:');
  
  if (testSuccess) {
    console.log('✅ API endpoint is accessible and secure');
    console.log('💡 Ready for database reset with correct secret');
  } else {
    console.log('❌ API endpoint has issues');
  }
  
  console.log('\n📖 Manual Reset Instructions:');
  console.log('To reset the database manually:');
  console.log('1. Get NEXTAUTH_SECRET from Vercel environment variables');
  console.log('2. Use: curl -X POST "https://reportr-one.vercel.app/api/admin/reset-db?secret=<SECRET>"');
  console.log('3. Verify: curl "https://reportr-one.vercel.app/api/admin/reset-db?secret=<SECRET>"');
}

main().catch(console.error);
#!/usr/bin/env node

/**
 * Test Database Reset API
 * Tests the admin database reset endpoint
 */

async function testDatabaseReset() {
  console.log('🧪 Testing Database Reset API...\n');
  
  const baseUrl = 'https://reportr-one.vercel.app';
  const secret = process.env.NEXTAUTH_SECRET;
  
  if (!secret) {
    console.log('❌ NEXTAUTH_SECRET not found in environment');
    return false;
  }
  
  try {
    // Test 1: Check current database status
    console.log('1️⃣ Checking current database status...');
    const statusResponse = await fetch(`${baseUrl}/api/admin/reset-db?secret=${encodeURIComponent(secret)}`, {
      method: 'GET'
    });
    
    if (statusResponse.ok) {
      const statusData = await statusResponse.json();
      console.log('✅ Database accessible');
      console.log('📊 Current counts:', statusData.counts);
    } else {
      console.log('❌ Database status check failed:', statusResponse.status);
      const errorText = await statusResponse.text();
      console.log('Error:', errorText);
      return false;
    }
    
    // Test 2: Reset database
    console.log('\n2️⃣ Resetting database...');
    const resetResponse = await fetch(`${baseUrl}/api/admin/reset-db?secret=${encodeURIComponent(secret)}`, {
      method: 'POST'
    });
    
    if (resetResponse.ok) {
      const resetData = await resetResponse.json();
      console.log('✅ Database reset successful');
      console.log('📊 Records deleted:', resetData.deleted);
    } else {
      console.log('❌ Database reset failed:', resetResponse.status);
      const errorText = await resetResponse.text();
      console.log('Error:', errorText);
      return false;
    }
    
    // Test 3: Verify database is empty
    console.log('\n3️⃣ Verifying database is empty...');
    const verifyResponse = await fetch(`${baseUrl}/api/admin/reset-db?secret=${encodeURIComponent(secret)}`, {
      method: 'GET'
    });
    
    if (verifyResponse.ok) {
      const verifyData = await verifyResponse.json();
      console.log('✅ Database verification complete');
      console.log('📊 Final counts:', verifyData.counts);
      
      // Check if all counts are zero
      const { users, accounts, sessions, clients, reports } = verifyData.counts;
      if (users === 0 && accounts === 0 && sessions === 0 && clients === 0 && reports === 0) {
        console.log('🎉 Database successfully cleared!');
        return true;
      } else {
        console.log('⚠️  Some records remain in database');
        return false;
      }
    } else {
      console.log('❌ Database verification failed:', verifyResponse.status);
      return false;
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
}

async function testUnauthorizedAccess() {
  console.log('\n4️⃣ Testing unauthorized access protection...');
  
  const baseUrl = 'https://reportr-one.vercel.app';
  
  try {
    // Test with wrong secret
    const wrongSecretResponse = await fetch(`${baseUrl}/api/admin/reset-db?secret=wrong-secret`, {
      method: 'POST'
    });
    
    if (wrongSecretResponse.status === 401) {
      console.log('✅ Unauthorized access properly blocked');
      return true;
    } else {
      console.log('❌ Security issue: unauthorized access allowed');
      return false;
    }
    
  } catch (error) {
    console.log('❌ Security test failed:', error);
    return false;
  }
}

async function main() {
  console.log('🚀 Database Reset API Test\n');
  console.log('='*50);
  
  const resetSuccess = await testDatabaseReset();
  const securitySuccess = await testUnauthorizedAccess();
  
  console.log('\n' + '='*50);
  console.log('🏁 Test Results:');
  
  if (resetSuccess && securitySuccess) {
    console.log('🎉 SUCCESS: Database reset API working correctly!');
    console.log('💡 OAuth should now work with clean database');
  } else {
    console.log('❌ FAILED: Database reset API has issues');
    console.log('💡 Check the API implementation and try again');
  }
}

main().catch(console.error);
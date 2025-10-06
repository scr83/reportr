#!/usr/bin/env npx tsx

/**
 * Test script to verify Google OAuth authentication flow
 * 
 * This script tests:
 * 1. Prisma adapter configuration
 * 2. Google OAuth provider setup
 * 3. Database connectivity for auth tables
 * 4. Session configuration
 */

import { prisma } from '../src/lib/prisma';
import { authOptions } from '../src/lib/auth';

async function testAuthConfiguration() {
  console.log('🔍 Testing authentication configuration...\n');

  // Test 1: Database connectivity for auth tables
  console.log('1. Testing database connectivity...');
  try {
    // Test if we can connect to auth-related tables
    await prisma.user.findMany({ take: 1 });
    await prisma.account.findMany({ take: 1 });
    await prisma.session.findMany({ take: 1 });
    console.log('✅ Database connection successful');
    console.log('✅ Auth tables accessible (users, accounts, sessions)');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    console.log('Make sure your database is running and DATABASE_URL is correct');
    return false;
  }

  // Test 2: Auth configuration validation
  console.log('\n2. Validating auth configuration...');
  
  // Check Prisma adapter
  if (authOptions.adapter) {
    console.log('✅ Prisma adapter is enabled');
  } else {
    console.log('❌ Prisma adapter is missing');
    return false;
  }

  // Check session strategy
  if (authOptions.session?.strategy === 'database') {
    console.log('✅ Database session strategy configured');
  } else {
    console.log('❌ Session strategy should be "database", got:', authOptions.session?.strategy);
    return false;
  }

  // Check Google provider
  const googleProvider = authOptions.providers?.find(p => p.id === 'google');
  if (googleProvider) {
    console.log('✅ Google OAuth provider configured');
    
    // Check scopes
    const config = (googleProvider as any).options?.authorization?.params;
    if (config?.scope?.includes('webmasters.readonly') && config?.scope?.includes('analytics.readonly')) {
      console.log('✅ Google API scopes include Search Console and Analytics');
    } else {
      console.log('⚠️  Google API scopes may be incomplete');
      console.log('   Current scope:', config?.scope);
    }
  } else {
    console.log('❌ Google OAuth provider not found');
    return false;
  }

  // Test 3: Environment variables
  console.log('\n3. Checking required environment variables...');
  const requiredEnvVars = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET'
  ];

  let allEnvVarsPresent = true;
  for (const envVar of requiredEnvVars) {
    if (process.env[envVar]) {
      console.log(`✅ ${envVar} is set`);
    } else {
      console.log(`❌ ${envVar} is missing`);
      allEnvVarsPresent = false;
    }
  }

  if (!allEnvVarsPresent) {
    console.log('\n❌ Missing required environment variables. Check your .env file.');
    return false;
  }

  // Test 4: Simulate user creation (optional)
  console.log('\n4. Testing user creation flow...');
  try {
    // Check if we can create a test user (we won't actually create one)
    const testEmail = 'test-auth-flow@example.com';
    const existingUser = await prisma.user.findUnique({
      where: { email: testEmail }
    });
    
    if (existingUser) {
      console.log('✅ User lookup working (found existing test user)');
    } else {
      console.log('✅ User lookup working (no existing test user found)');
    }
  } catch (error) {
    console.error('❌ User operations failed:', error);
    return false;
  }

  console.log('\n🎉 All authentication tests passed!');
  console.log('\n📋 Next steps:');
  console.log('1. Start the dev server: npm run dev');
  console.log('2. Go to http://localhost:3000/signin');
  console.log('3. Click "Continue with Google"');
  console.log('4. Complete OAuth flow');
  console.log('5. Check if you are redirected to /dashboard');
  
  return true;
}

async function main() {
  try {
    await testAuthConfiguration();
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}
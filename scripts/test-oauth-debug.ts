#!/usr/bin/env npx tsx

/**
 * Phase 7E: OAuth Debug & Test Script
 * 
 * This script helps debug OAuth authentication issues and test API calls
 */

import { google } from 'googleapis';
import { prisma } from '../src/lib/prisma';
import { getAnalyticsData } from '../src/lib/integrations/google-analytics';
import { getSearchConsoleData } from '../src/lib/integrations/google-search-console';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function checkEnvironmentVariables() {
  log('\n🔧 STEP 1: Checking Environment Variables', 'cyan');
  
  const required = [
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'DATABASE_URL'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    log(`❌ Missing environment variables: ${missing.join(', ')}`, 'red');
    return false;
  }
  
  log('✅ All required environment variables present', 'green');
  log(`   GOOGLE_CLIENT_ID: ${process.env.GOOGLE_CLIENT_ID?.substring(0, 20)}...`, 'blue');
  log(`   Database connected: ${!!process.env.DATABASE_URL}`, 'blue');
  
  return true;
}

async function testDatabaseConnection() {
  log('\n🔧 STEP 2: Testing Database Connection', 'cyan');
  
  try {
    await prisma.$connect();
    log('✅ Database connection successful', 'green');
    
    // Test client query
    const clientCount = await prisma.client.count();
    log(`   Found ${clientCount} clients in database`, 'blue');
    
    return true;
  } catch (error: any) {
    log(`❌ Database connection failed: ${error.message}`, 'red');
    return false;
  }
}

async function listConnectedClients() {
  log('\n🔧 STEP 3: Listing Connected Clients', 'cyan');
  
  try {
    const clients = await prisma.client.findMany({
      where: {
        googleRefreshToken: { not: null }
      },
      select: {
        id: true,
        name: true,
        domain: true,
        googleConnectedAt: true,
        googleTokenExpiry: true,
        gscSiteUrl: true,
        ga4PropertyId: true
      }
    });
    
    if (clients.length === 0) {
      log('❌ No clients with Google tokens found', 'yellow');
      log('   Please connect a client through the OAuth flow first', 'blue');
      return null;
    }
    
    log(`✅ Found ${clients.length} connected clients:`, 'green');
    
    clients.forEach((client, index) => {
      const tokenExpired = client.googleTokenExpiry && new Date() > client.googleTokenExpiry;
      log(`   ${index + 1}. ${client.name} (${client.domain})`, 'blue');
      log(`      ID: ${client.id}`, 'blue');
      log(`      Connected: ${client.googleConnectedAt?.toISOString()}`, 'blue');
      log(`      Token Expired: ${tokenExpired ? 'YES' : 'NO'}`, tokenExpired ? 'red' : 'green');
      log(`      GSC Site: ${client.gscSiteUrl || 'Not set'}`, 'blue');
      log(`      GA4 Property: ${client.ga4PropertyId || 'Not set'}`, 'blue');
    });
    
    return clients[0]; // Return first client for testing
  } catch (error: any) {
    log(`❌ Failed to list clients: ${error.message}`, 'red');
    return null;
  }
}

async function testTokenRefresh(clientId: string) {
  log('\n🔧 STEP 4: Testing Token Refresh', 'cyan');
  
  try {
    const { refreshGoogleToken } = await import('../src/lib/utils/refresh-google-token');
    
    const newToken = await refreshGoogleToken(clientId);
    log('✅ Token refresh successful', 'green');
    log(`   New token: ${newToken.substring(0, 20)}...`, 'blue');
    
    return true;
  } catch (error: any) {
    log(`❌ Token refresh failed: ${error.message}`, 'red');
    
    if (error.message.includes('invalid_grant')) {
      log('   This means the refresh token is invalid or revoked', 'yellow');
      log('   The client needs to reconnect through OAuth', 'yellow');
    }
    
    return false;
  }
}

async function testDirectOAuthFlow() {
  log('\n🔧 STEP 5: Testing Direct OAuth Flow', 'cyan');
  
  const redirectUri = process.env.NODE_ENV === 'production'
    ? 'https://reportr-one.vercel.app/api/auth/google/callback'
    : 'http://localhost:3003/api/auth/google/callback';
  
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri
  );
  
  const scopes = [
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/analytics.readonly',
    'openid',
    'email',
    'profile'
  ];
  
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state: 'test-client-id',
    prompt: 'consent'
  });
  
  log('✅ OAuth URL generated successfully', 'green');
  log(`   Redirect URI: ${redirectUri}`, 'blue');
  log(`   Scopes: ${scopes.join(', ')}`, 'blue');
  log(`   Auth URL: ${authUrl}`, 'yellow');
  
  return true;
}

async function testGA4APICall(clientId: string) {
  log('\n🔧 STEP 6: Testing GA4 API Call', 'cyan');
  
  try {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    log(`   Fetching GA4 data from ${startDate} to ${endDate}`, 'blue');
    
    const data = await getAnalyticsData(
      clientId,
      startDate,
      endDate,
      undefined,
      ['users', 'sessions', 'bounceRate']
    );
    
    log('✅ GA4 API call successful', 'green');
    log(`   Users: ${data.users}`, 'blue');
    log(`   Sessions: ${data.sessions}`, 'blue');
    log(`   Bounce Rate: ${data.bounceRate}%`, 'blue');
    log(`   Available metrics: ${Object.keys(data.dynamicMetrics).join(', ')}`, 'blue');
    
    return true;
  } catch (error: any) {
    log(`❌ GA4 API call failed: ${error.message}`, 'red');
    
    if (error.message.includes('403')) {
      log('   This is a permissions error - check GA4 property access', 'yellow');
    } else if (error.message.includes('404')) {
      log('   Property not found - check GA4 property ID', 'yellow');
    } else if (error.message.includes('401')) {
      log('   Authentication failed - token may be invalid', 'yellow');
    }
    
    return false;
  }
}

async function testGSCAPICall(clientId: string) {
  log('\n🔧 STEP 7: Testing GSC API Call', 'cyan');
  
  try {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    log(`   Fetching GSC data from ${startDate} to ${endDate}`, 'blue');
    
    const data = await getSearchConsoleData(clientId, startDate, endDate);
    
    log('✅ GSC API call successful', 'green');
    log(`   Total Clicks: ${data.summary.totalClicks}`, 'blue');
    log(`   Total Impressions: ${data.summary.totalImpressions}`, 'blue');
    log(`   Average Position: ${data.summary.averagePosition.toFixed(1)}`, 'blue');
    log(`   Top Queries: ${data.topQueries.length}`, 'blue');
    log(`   Top Pages: ${data.topPages.length}`, 'blue');
    
    return true;
  } catch (error: any) {
    log(`❌ GSC API call failed: ${error.message}`, 'red');
    
    if (error.message.includes('403')) {
      log('   This is a permissions error - check GSC property access', 'yellow');
    } else if (error.message.includes('404')) {
      log('   Property not found - check GSC site URL', 'yellow');
    } else if (error.message.includes('401')) {
      log('   Authentication failed - token may be invalid', 'yellow');
    }
    
    return false;
  }
}

async function main() {
  log('🚀 Phase 7E: OAuth Authentication Debug Script', 'magenta');
  log('='.repeat(60), 'magenta');
  
  // Step 1: Check environment
  const envOk = await checkEnvironmentVariables();
  if (!envOk) return;
  
  // Step 2: Test database
  const dbOk = await testDatabaseConnection();
  if (!dbOk) return;
  
  // Step 3: List connected clients
  const testClient = await listConnectedClients();
  
  // Step 4: Test OAuth generation
  await testDirectOAuthFlow();
  
  if (testClient) {
    // Step 5: Test token refresh
    const refreshOk = await testTokenRefresh(testClient.id);
    
    if (refreshOk) {
      // Step 6: Test GA4 API
      await testGA4APICall(testClient.id);
      
      // Step 7: Test GSC API
      await testGSCAPICall(testClient.id);
    }
  }
  
  log('\n✅ OAuth Debug Complete', 'green');
  log('If any tests failed, check the error messages above for guidance', 'yellow');
  
  await prisma.$disconnect();
}

// Run the script
main().catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
});
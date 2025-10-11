#!/usr/bin/env npx tsx

/**
 * Phase 7E: Error Handling & Edge Cases Test
 * 
 * This script tests error scenarios and edge cases for the OAuth and data fetching system
 */

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

async function testMissingClient() {
  log('\n🧪 TEST 1: Missing Client', 'cyan');
  
  try {
    await getAnalyticsData('non-existent-client-id', '2025-09-01', '2025-10-01');
    log('❌ Should have thrown error for missing client', 'red');
  } catch (error: any) {
    if (error.message.includes('Client not found')) {
      log('✅ Correctly handles missing client', 'green');
    } else {
      log(`❌ Wrong error: ${error.message}`, 'red');
    }
  }
}

async function testMissingTokens() {
  log('\n🧪 TEST 2: Client Without Google Tokens', 'cyan');
  
  // Find a client without tokens
  const clientWithoutTokens = await prisma.client.findFirst({
    where: { googleRefreshToken: null }
  });

  if (!clientWithoutTokens) {
    log('⚠️ No client without tokens found, skipping test', 'yellow');
    return;
  }

  try {
    await getAnalyticsData(clientWithoutTokens.id, '2025-09-01', '2025-10-01');
    log('❌ Should have thrown error for missing tokens', 'red');
  } catch (error: any) {
    if (error.message.includes('not connected')) {
      log('✅ Correctly handles missing tokens', 'green');
    } else {
      log(`❌ Wrong error: ${error.message}`, 'red');
    }
  }
}

async function testInvalidDateRange() {
  log('\n🧪 TEST 3: Invalid Date Range', 'cyan');
  
  const client = await prisma.client.findFirst({
    where: { googleRefreshToken: { not: null } }
  });

  if (!client) {
    log('⚠️ No connected client found, skipping test', 'yellow');
    return;
  }

  try {
    // Future dates (should have no data)
    const data = await getAnalyticsData(
      client.id,
      '2030-01-01',
      '2030-01-31'
    );
    
    log('✅ Handles future dates gracefully', 'green');
    log(`   Users: ${data.users} (expected: 0)`, 'blue');
    log(`   Sessions: ${data.sessions} (expected: 0)`, 'blue');
    
    if (data.users === 0 && data.sessions === 0) {
      log('✅ Returns zeros for no data', 'green');
    } else {
      log('⚠️ Returned unexpected data for future dates', 'yellow');
    }
  } catch (error: any) {
    log(`❌ Failed on future dates: ${error.message}`, 'red');
  }
}

async function testInvalidMetrics() {
  log('\n🧪 TEST 4: Invalid/Unavailable Metrics', 'cyan');
  
  const client = await prisma.client.findFirst({
    where: { googleRefreshToken: { not: null } }
  });

  if (!client) {
    log('⚠️ No connected client found, skipping test', 'yellow');
    return;
  }

  try {
    // Request metrics that may not be available
    const data = await getAnalyticsData(
      client.id,
      '2025-09-01',
      '2025-10-01',
      undefined,
      ['users', 'sessions', 'scrollDepth', 'customEvent123', 'unknownMetric']
    );
    
    log('✅ Handles invalid metrics gracefully', 'green');
    log(`   Available metrics: ${Object.keys(data.dynamicMetrics).join(', ')}`, 'blue');
    
    const hasUsers = data.dynamicMetrics.users !== undefined;
    const hasScrollDepth = data.dynamicMetrics.scrollDepth !== undefined;
    
    if (hasUsers) {
      log('✅ Standard metrics available', 'green');
    }
    
    if (!hasScrollDepth) {
      log('✅ Gracefully handles unavailable metrics', 'green');
    }
    
  } catch (error: any) {
    log(`❌ Failed on invalid metrics: ${error.message}`, 'red');
  }
}

async function testExpiredToken() {
  log('\n🧪 TEST 5: Expired Token Refresh', 'cyan');
  
  const client = await prisma.client.findFirst({
    where: { googleRefreshToken: { not: null } }
  });

  if (!client) {
    log('⚠️ No connected client found, skipping test', 'yellow');
    return;
  }

  try {
    // Artificially expire the token
    log('   Setting token expiry to past time...', 'blue');
    await prisma.client.update({
      where: { id: client.id },
      data: { googleTokenExpiry: new Date(Date.now() - 60000) } // 1 minute ago
    });

    // Make API call - should trigger refresh
    log('   Making API call with expired token...', 'blue');
    const data = await getAnalyticsData(client.id, '2025-09-01', '2025-10-01');
    
    log('✅ Token refresh worked automatically', 'green');
    log(`   Retrieved data: ${data.users} users, ${data.sessions} sessions`, 'blue');
    
    // Check that token was refreshed
    const updatedClient = await prisma.client.findUnique({
      where: { id: client.id },
      select: { googleTokenExpiry: true }
    });
    
    if (updatedClient?.googleTokenExpiry && updatedClient.googleTokenExpiry > new Date()) {
      log('✅ Token expiry updated to future time', 'green');
    } else {
      log('❌ Token expiry not updated properly', 'red');
    }
    
  } catch (error: any) {
    log(`❌ Token refresh failed: ${error.message}`, 'red');
  }
}

async function testMissingProperties() {
  log('\n🧪 TEST 6: Missing GA4/GSC Properties', 'cyan');
  
  const client = await prisma.client.findFirst({
    where: { 
      googleRefreshToken: { not: null },
      ga4PropertyId: null
    }
  });

  if (!client) {
    log('⚠️ All connected clients have properties configured', 'yellow');
    return;
  }

  try {
    await getAnalyticsData(client.id, '2025-09-01', '2025-10-01');
    log('❌ Should have failed for missing GA4 property', 'red');
  } catch (error: any) {
    if (error.message.includes('property ID not configured')) {
      log('✅ Correctly handles missing GA4 property', 'green');
    } else {
      log(`❌ Wrong error: ${error.message}`, 'red');
    }
  }
}

async function testNetworkErrors() {
  log('\n🧪 TEST 7: Network Error Simulation', 'cyan');
  
  // We can't easily simulate network errors without mocking,
  // but we can test with invalid credentials/URLs
  log('⚠️ Network error simulation requires external tools', 'yellow');
  log('   In production, test by:', 'blue');
  log('   - Disconnecting internet temporarily', 'blue');
  log('   - Using invalid Google API credentials', 'blue');
  log('   - Setting invalid GA4 property IDs', 'blue');
}

async function testConcurrentRequests() {
  log('\n🧪 TEST 8: Concurrent API Requests', 'cyan');
  
  const client = await prisma.client.findFirst({
    where: { googleRefreshToken: { not: null } }
  });

  if (!client) {
    log('⚠️ No connected client found, skipping test', 'yellow');
    return;
  }

  try {
    log('   Making 5 concurrent GA4 requests...', 'blue');
    
    const promises = Array.from({ length: 5 }, (_, i) => 
      getAnalyticsData(
        client.id,
        '2025-09-01',
        '2025-10-01',
        undefined,
        ['users', 'sessions']
      ).then(data => ({ index: i, data }))
    );

    const results = await Promise.all(promises);
    
    log('✅ All concurrent requests completed', 'green');
    
    // Check that all results are consistent
    const firstResult = results[0].data;
    const allConsistent = results.every(r => 
      r.data.users === firstResult.users && 
      r.data.sessions === firstResult.sessions
    );
    
    if (allConsistent) {
      log('✅ All results consistent', 'green');
    } else {
      log('⚠️ Some results inconsistent (may be due to real-time data)', 'yellow');
    }
    
  } catch (error: any) {
    log(`❌ Concurrent requests failed: ${error.message}`, 'red');
  }
}

async function main() {
  log('🧪 Phase 7E: Error Handling & Edge Cases Test', 'magenta');
  log('='.repeat(60), 'magenta');
  
  await testMissingClient();
  await testMissingTokens();
  await testInvalidDateRange();
  await testInvalidMetrics();
  await testExpiredToken();
  await testMissingProperties();
  await testNetworkErrors();
  await testConcurrentRequests();
  
  log('\n✅ Error Handling Tests Complete', 'green');
  log('🔍 Review results above for any failures', 'yellow');
  
  await prisma.$disconnect();
}

// Run the test
main().catch((error) => {
  console.error('Test script failed:', error);
  process.exit(1);
});
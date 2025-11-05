/**
 * QA Test Script for Dual Auth System
 * Tests API endpoints directly to validate functionality
 */

const BASE_URL = 'http://localhost:3004';

// Test data
const TEST_USERS = {
  freeUser: {
    email: 'qa.free.test@example.com',
    name: 'QA Free Test User'
  },
  paidUser: {
    email: 'qa.paid.test@example.com', 
    name: 'QA Paid Test User'
  }
};

// Test Results Storage
let testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

function logTest(testName, status, details = '') {
  const result = {
    test: testName,
    status: status,
    details: details,
    timestamp: new Date().toISOString()
  };
  
  testResults.tests.push(result);
  
  if (status === 'PASS') {
    testResults.passed++;
    console.log(`✅ ${testName}: PASS ${details ? '- ' + details : ''}`);
  } else {
    testResults.failed++;
    console.log(`❌ ${testName}: FAIL ${details ? '- ' + details : ''}`);
  }
}

async function testApiEndpoint(path, method = 'GET', body = null, headers = {}) {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : null
    });
    
    const data = await response.text();
    let jsonData = null;
    
    try {
      jsonData = JSON.parse(data);
    } catch (e) {
      // Response might not be JSON
    }
    
    return {
      status: response.status,
      data: jsonData || data,
      headers: Object.fromEntries(response.headers.entries())
    };
  } catch (error) {
    return {
      status: 0,
      error: error.message
    };
  }
}

async function runQATests() {
  console.log('🚀 Starting QA Tests for Dual Auth System');
  console.log('='.repeat(50));
  
  // Test 1: Check API Health
  const healthCheck = await testApiEndpoint('/api/debug-auth');
  if (healthCheck.status === 200) {
    logTest('API Health Check', 'PASS', 'Debug auth endpoint accessible');
  } else {
    logTest('API Health Check', 'FAIL', `Status: ${healthCheck.status}`);
  }
  
  // Test 2: Test Email Verification Flow (without auth)
  const verifyTest = await testApiEndpoint('/api/auth/verify?token=invalid_token');
  if (verifyTest.status === 302 || verifyTest.status === 404) {
    logTest('Email Verification Error Handling', 'PASS', 'Invalid token properly rejected');
  } else {
    logTest('Email Verification Error Handling', 'FAIL', `Unexpected status: ${verifyTest.status}`);
  }
  
  // Test 3: Test Resend Verification (without auth - should fail)
  const resendTest = await testApiEndpoint('/api/auth/resend-verification', 'POST');
  if (resendTest.status === 401) {
    logTest('Resend Verification Auth Check', 'PASS', 'Unauthorized access properly blocked');
  } else {
    logTest('Resend Verification Auth Check', 'FAIL', `Expected 401, got ${resendTest.status}`);
  }
  
  // Test 4: Check PayPal Webhook Security (without proper headers)
  const webhookTest = await testApiEndpoint('/api/payments/webhook', 'POST', {
    event_type: 'TEST_EVENT'
  });
  if (webhookTest.status === 401) {
    logTest('PayPal Webhook Security', 'PASS', 'Webhook properly secured');
  } else {
    logTest('PayPal Webhook Security', 'FAIL', `Expected 401, got ${webhookTest.status}`);
  }
  
  // Test 5: Test PDF Generation (should require auth)
  const pdfTest = await testApiEndpoint('/api/generate-pdf', 'POST');
  if (pdfTest.status === 401 || pdfTest.status === 403) {
    logTest('PDF Generation Auth Check', 'PASS', 'PDF generation properly secured');
  } else {
    logTest('PDF Generation Auth Check', 'FAIL', `Expected auth error, got ${pdfTest.status}`);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('🏁 QA Test Summary');
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`📊 Total: ${testResults.tests.length}`);
  console.log(`📈 Success Rate: ${((testResults.passed / testResults.tests.length) * 100).toFixed(1)}%`);
  
  return testResults;
}

// Run tests if this file is executed directly
if (require.main === module) {
  runQATests().catch(console.error);
}

module.exports = { runQATests, testApiEndpoint, logTest };
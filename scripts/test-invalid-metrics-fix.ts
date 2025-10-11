#!/usr/bin/env npx tsx

import { getAnalyticsData } from '../src/lib/integrations/google-analytics';
import { prisma } from '../src/lib/prisma';

async function testInvalidMetricsFix() {
  console.log('🧪 Testing Invalid Metrics Fix');
  
  const client = await prisma.client.findFirst({
    where: { googleRefreshToken: { not: null } }
  });

  if (!client) {
    console.log('⚠️ No connected client found');
    return;
  }

  try {
    console.log('Testing with invalid metrics: scrollDepth, customEvent123...');
    
    const data = await getAnalyticsData(
      client.id,
      '2025-09-01',
      '2025-10-01',
      undefined,
      ['users', 'sessions', 'scrollDepth', 'customEvent123']
    );
    
    console.log('✅ Fix works! Got data:', {
      users: data.users,
      sessions: data.sessions,
      bounceRate: data.bounceRate
    });
    
  } catch (error: any) {
    console.log('❌ Fix did not work:', error.message);
  }
  
  await prisma.$disconnect();
}

testInvalidMetricsFix();
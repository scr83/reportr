#!/usr/bin/env npx tsx

import { prisma } from '../src/lib/prisma';

async function checkDatabaseState() {
  console.log('🔍 Database State Check');
  console.log('='.repeat(50));
  
  // Check clients
  const clients = await prisma.client.findMany({
    select: {
      id: true,
      name: true,
      domain: true,
      googleAccessToken: true,
      googleRefreshToken: true,
      googleTokenExpiry: true,
      googleConnectedAt: true,
      gscSiteUrl: true,
      ga4PropertyId: true,
      ga4PropertyName: true
    }
  });

  console.log(`\n📊 Found ${clients.length} clients`);
  
  clients.forEach((client, index) => {
    console.log(`\n${index + 1}. ${client.name}`);
    console.log(`   Domain: ${client.domain}`);
    console.log(`   Access Token: ${client.googleAccessToken ? 'Present' : 'Missing'}`);
    console.log(`   Refresh Token: ${client.googleRefreshToken ? 'Present' : 'Missing'}`);
    console.log(`   Token Expires: ${client.googleTokenExpiry?.toISOString() || 'Not set'}`);
    console.log(`   Connected At: ${client.googleConnectedAt?.toISOString() || 'Never'}`);
    console.log(`   GSC Site: ${client.gscSiteUrl || 'Not configured'}`);
    console.log(`   GA4 Property: ${client.ga4PropertyId || 'Not configured'}`);
    console.log(`   GA4 Name: ${client.ga4PropertyName || 'Not set'}`);
    
    // Check if token is expired
    if (client.googleTokenExpiry) {
      const isExpired = new Date() > client.googleTokenExpiry;
      console.log(`   Token Status: ${isExpired ? '🔴 EXPIRED' : '🟢 VALID'}`);
      if (isExpired) {
        const minutesAgo = Math.floor((Date.now() - client.googleTokenExpiry.getTime()) / 60000);
        console.log(`   Expired: ${minutesAgo} minutes ago`);
      } else {
        const minutesLeft = Math.floor((client.googleTokenExpiry.getTime() - Date.now()) / 60000);
        console.log(`   Expires in: ${minutesLeft} minutes`);
      }
    }
  });

  await prisma.$disconnect();
}

checkDatabaseState().catch(console.error);
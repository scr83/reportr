import { prisma } from '../src/lib/prisma';

/**
 * Migration Script: Initialize Billing Cycles for Existing Users
 * 
 * This script sets up 30-day billing cycles for users who were created
 * before the billing cycle system was implemented.
 */

async function migrateBillingCycles() {
  console.log('🔄 Starting billing cycle migration...');
  console.log('⏰ Timestamp:', new Date().toISOString());
  
  try {
    // Find users who need billing cycle initialization (billingCycleEnd is null)
    const users = await prisma.user.findMany({
      where: {
        billingCycleEnd: null
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        billingCycleStart: true,
        billingCycleEnd: true
      }
    });

    console.log(`📊 Found ${users.length} users requiring billing cycle migration`);

    if (users.length === 0) {
      console.log('✅ No users need migration - all billing cycles are already initialized');
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    for (const user of users) {
      try {
        // Use the user's account creation date as the billing cycle start
        // This ensures they get a full 30-day cycle from when they signed up
        const cycleStart = user.createdAt;
        const cycleEnd = new Date(cycleStart.getTime() + 30 * 24 * 60 * 60 * 1000);

        await prisma.user.update({
          where: { id: user.id },
          data: {
            billingCycleStart: cycleStart,
            billingCycleEnd: cycleEnd,
          }
        });

        console.log(`✅ Migrated user ${user.email}:`, {
          userId: user.id,
          cycleStart: cycleStart.toISOString(),
          cycleEnd: cycleEnd.toISOString(),
          daysFromCreation: Math.ceil((Date.now() - cycleStart.getTime()) / (1000 * 60 * 60 * 24))
        });

        successCount++;
      } catch (error) {
        console.error(`❌ Failed to migrate user ${user.email}:`, error);
        errorCount++;
      }
    }

    console.log('\n📈 Migration Summary:');
    console.log(`✅ Successfully migrated: ${successCount} users`);
    console.log(`❌ Failed migrations: ${errorCount} users`);
    console.log(`📊 Total processed: ${users.length} users`);

    if (errorCount === 0) {
      console.log('\n🎉 Billing cycle migration completed successfully!');
    } else {
      console.log('\n⚠️  Migration completed with some errors. Please review failed users.');
    }

  } catch (error) {
    console.error('💥 Migration failed with critical error:', error);
    throw error;
  }
}

/**
 * Verify Migration Results
 * Check that all users now have proper billing cycles
 */
async function verifyMigration() {
  console.log('\n🔍 Verifying migration results...');
  
  const usersWithoutCycles = await prisma.user.count({
    where: {
      billingCycleEnd: null
    }
  });

  const totalUsers = await prisma.user.count();

  console.log(`📊 Verification Results:`);
  console.log(`- Total users: ${totalUsers}`);
  console.log(`- Users without billing cycles: ${usersWithoutCycles}`);
  console.log(`- Users with billing cycles: ${totalUsers - usersWithoutCycles}`);

  if (usersWithoutCycles === 0) {
    console.log('✅ Verification passed - all users have billing cycles!');
  } else {
    console.log('❌ Verification failed - some users still missing billing cycles');
  }

  return usersWithoutCycles === 0;
}

/**
 * Show Sample Billing Cycle Data
 * Display some examples for verification
 */
async function showSampleData() {
  console.log('\n📋 Sample billing cycle data:');
  
  const sampleUsers = await prisma.user.findMany({
    take: 5,
    select: {
      email: true,
      createdAt: true,
      billingCycleStart: true,
      billingCycleEnd: true,
      plan: true
    },
    orderBy: { createdAt: 'desc' }
  });

  sampleUsers.forEach((user, index) => {
    const now = new Date();
    const daysRemaining = user.billingCycleEnd ? 
      Math.max(0, Math.ceil((user.billingCycleEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))) : 0;

    console.log(`${index + 1}. ${user.email} (${user.plan})`);
    console.log(`   Created: ${user.createdAt.toISOString()}`);
    console.log(`   Cycle: ${user.billingCycleStart?.toISOString()} → ${user.billingCycleEnd?.toISOString()}`);
    console.log(`   Days remaining: ${daysRemaining}`);
    console.log('');
  });
}

// Main execution
async function main() {
  try {
    await migrateBillingCycles();
    const verificationPassed = await verifyMigration();
    await showSampleData();
    
    if (verificationPassed) {
      console.log('\n🎉 Migration and verification completed successfully!');
      process.exit(0);
    } else {
      console.log('\n⚠️  Migration completed but verification failed.');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n💥 Migration script failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
if (require.main === module) {
  main();
}

export { migrateBillingCycles, verifyMigration };
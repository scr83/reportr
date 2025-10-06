import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Admin Database Reset API
 * Clears user authentication data to resolve OAuth issues
 * 
 * Security: Requires NEXTAUTH_SECRET as query parameter
 * Usage: POST /api/admin/reset-db?secret=<NEXTAUTH_SECRET>
 */
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    
    // Security check: require exact match of NEXTAUTH_SECRET
    if (!secret || secret !== process.env.NEXTAUTH_SECRET) {
      console.log('🔒 Unauthorized database reset attempt');
      return NextResponse.json({ 
        error: 'Unauthorized access' 
      }, { status: 401 });
    }
    
    console.log('🗑️ Starting database reset...');
    
    // Clear authentication data in correct order (due to foreign key constraints)
    const deletedSessions = await prisma.session.deleteMany({});
    console.log(`✅ Deleted ${deletedSessions.count} sessions`);
    
    const deletedAccounts = await prisma.account.deleteMany({});
    console.log(`✅ Deleted ${deletedAccounts.count} accounts`);
    
    const deletedUsers = await prisma.user.deleteMany({});
    console.log(`✅ Deleted ${deletedUsers.count} users`);
    
    // Also clear any existing reports and clients for a clean start
    const deletedReports = await prisma.report.deleteMany({});
    console.log(`✅ Deleted ${deletedReports.count} reports`);
    
    const deletedClients = await prisma.client.deleteMany({});
    console.log(`✅ Deleted ${deletedClients.count} clients`);
    
    console.log('🎉 Database reset completed successfully');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database cleared successfully',
      deleted: {
        sessions: deletedSessions.count,
        accounts: deletedAccounts.count,
        users: deletedUsers.count,
        reports: deletedReports.count,
        clients: deletedClients.count
      }
    });
    
  } catch (error) {
    console.error('❌ Database reset failed:', error);
    
    return NextResponse.json({ 
      error: 'Failed to clear database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * GET method for health check
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  
  if (!secret || secret !== process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    // Get current database stats
    const userCount = await prisma.user.count();
    const accountCount = await prisma.account.count();
    const sessionCount = await prisma.session.count();
    const clientCount = await prisma.client.count();
    const reportCount = await prisma.report.count();
    
    return NextResponse.json({
      status: 'Database accessible',
      counts: {
        users: userCount,
        accounts: accountCount,
        sessions: sessionCount,
        clients: clientCount,
        reports: reportCount
      }
    });
    
  } catch (error) {
    return NextResponse.json({ 
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
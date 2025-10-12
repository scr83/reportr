import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { requireUser } from '@/lib/auth-helpers';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('=== DEBUG AUTH ENDPOINT ===');
    
    // Test 1: Direct session check
    const session = await getServerSession(authOptions);
    console.log('Session retrieved:', !!session);
    console.log('Session user:', session?.user);
    
    // Test 2: requireUser check
    let user = null;
    let userError = null;
    try {
      console.log('Testing requireUser()...');
      user = await requireUser();
      console.log('requireUser() success:', !!user);
    } catch (e) {
      userError = e instanceof Error ? e.message : 'Unknown error';
      console.log('requireUser() error:', userError);
    }
    
    // Test 3: Check headers and cookies
    const { headers } = await import('next/headers');
    const headersList = headers();
    const cookie = headersList.get('cookie');
    const authorization = headersList.get('authorization');
    
    console.log('Request headers:');
    console.log('- Cookie header length:', cookie?.length || 0);
    console.log('- Authorization header:', !!authorization);
    console.log('- User-Agent:', headersList.get('user-agent')?.substring(0, 50));
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      test1_session: {
        exists: !!session,
        userId: session?.user?.id,
        userEmail: session?.user?.email,
        userName: session?.user?.name,
        userImage: session?.user?.image,
        expires: session?.expires,
      },
      test2_requireUser: {
        success: !!user,
        userId: user?.id,
        userEmail: user?.email,
        userName: user?.name,
        error: userError,
      },
      test3_headers: {
        hasCookie: !!cookie,
        cookieLength: cookie?.length || 0,
        cookiePreview: cookie?.substring(0, 100) + '...',
        hasAuthorization: !!authorization,
      }
    });
  } catch (error) {
    console.error('Debug auth endpoint error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
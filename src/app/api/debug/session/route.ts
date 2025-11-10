import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    
    return NextResponse.json({
      session: session,
      token: token,
      timestamp: new Date().toISOString(),
      headers: {
        cookie: request.headers.get('cookie'),
        userAgent: request.headers.get('user-agent')
      }
    });
  } catch (error) {
    console.error('Debug session error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to get session debug info',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
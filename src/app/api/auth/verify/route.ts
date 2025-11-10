import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/email-tokens';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  
  if (!token) {
    // Redirect to error page
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/?error=invalid_token`
    );
  }
  
  try {
    const result = await verifyToken(token);
    
    if (!result.success) {
      // Redirect with specific error message
      const errorMap: Record<string, string> = {
        'Invalid token': 'invalid_token',
        'Token expired': 'token_expired',
        'User not found': 'user_not_found'
      };
      
      const errorCode = errorMap[result.error || ''] || 'verification_failed';
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/?error=${errorCode}`
      );
    }
    
    console.log(`User ${result.userId} email verified successfully`);
    
    // Redirect to dashboard with verification success params
    // NextAuth will automatically refresh the session with updated emailVerified status
    // via the JWT callback when the user accesses the dashboard
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?verified=true&unlocked=true&refresh=1`
    );
    
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/?error=verification_failed`
    );
  }
}
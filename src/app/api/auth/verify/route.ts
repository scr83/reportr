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
      // Redirect with error
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/?error=${result.error}`
      );
    }
    
    // Success! Redirect to dashboard with success message
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?verified=true`
    );
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/?error=verification_failed`
    );
  }
}
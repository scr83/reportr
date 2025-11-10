import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/email-tokens';
import { prisma } from '@/lib/prisma';
import { SignJWT } from 'jose';

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
    
    // Get user data for session
    const user = await prisma.user.findUnique({
      where: { id: result.userId },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        emailVerified: true,
        paypalSubscriptionId: true,
        subscriptionStatus: true,
        signupFlow: true
      }
    });
    
    if (!user) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/?error=user_not_found`
      );
    }
    
    // Create NextAuth compatible JWT token
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
    const tokenPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      picture: user.image,
      emailVerified: !!user.emailVerified,
      paypalSubscriptionId: user.paypalSubscriptionId,
      subscriptionStatus: user.subscriptionStatus || 'free',
      signupFlow: user.signupFlow,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days
    };
    
    const jwt = await new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: 'HS256' })
      .sign(secret);
    
    // Create response with redirect
    const response = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?verified=true&unlocked=true`
    );
    
    // Set the NextAuth session token cookie
    // NextAuth uses different cookie names based on environment and configuration
    const cookieName = process.env.NODE_ENV === 'production' 
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token';
      
    response.cookies.set(cookieName, jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/'
    });
    
    console.log(`User ${user.id} (${user.email}) email verified and session created`);
    return response;
    
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/?error=verification_failed`
    );
  }
}
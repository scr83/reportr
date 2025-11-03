import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { generateVerificationToken } from '@/lib/email-tokens';
import { sendVerificationEmail } from '@/lib/email';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Check if user is already verified
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { emailVerified: true, name: true }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    if (user.emailVerified) {
      return NextResponse.json(
        { error: 'Email already verified' },
        { status: 400 }
      );
    }
    
    // Generate new verification token
    const token = await generateVerificationToken(session.user.email);
    
    // Send verification email
    const result = await sendVerificationEmail(
      session.user.email,
      user.name || session.user.name || 'there',
      token
    );
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Verification email sent successfully'
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
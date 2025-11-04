import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { generateVerificationToken } from '@/lib/email-tokens';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - no session found' }, 
        { status: 401 }
      );
    }

    // Check if email is already verified
    if (session.user.emailVerified) {
      return NextResponse.json(
        { error: 'Email is already verified' }, 
        { status: 400 }
      );
    }

    // Generate new verification token
    const token = await generateVerificationToken(session.user.email);
    
    // Send verification email
    const emailResult = await sendVerificationEmail(
      session.user.email, 
      session.user.name || 'User',
      token
    );

    if (!emailResult.success) {
      throw new Error(`Email sending failed: ${emailResult.error}`);
    }
    
    return NextResponse.json({ 
      message: 'Verification email sent successfully' 
    });
    
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { error: 'Failed to send verification email. Please try again.' }, 
      { status: 500 }
    );
  }
}
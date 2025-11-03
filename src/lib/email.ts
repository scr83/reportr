import { Resend } from 'resend';
import { VerificationEmail } from '@/emails/verification-email';

// Initialize Resend only if API key is available
let resend: Resend | null = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

// Email configuration
const FROM_EMAIL = process.env.FROM_EMAIL || 'hello@reportr.agency';
const REPLY_TO_EMAIL = process.env.REPLY_TO_EMAIL || 'sebastian@digitalfrog.cl';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

/**
 * Send email verification to new users
 */
export async function sendVerificationEmail(
  email: string,
  name: string,
  verificationToken: string
) {
  if (!resend) {
    console.error('❌ Resend not initialized: RESEND_API_KEY not found');
    return { success: false, error: 'Email service not configured' };
  }

  const verificationUrl = `${APP_URL}/api/auth/verify?token=${verificationToken}`;
  
  try {
    const { data, error } = await resend.emails.send({
      from: `Reportr <${FROM_EMAIL}>`,
      to: email,
      replyTo: REPLY_TO_EMAIL,
      subject: 'Verify your Reportr account',
      react: VerificationEmail({ 
        userName: name || 'there', 
        verificationUrl 
      }),
    });

    if (error) {
      console.error('Failed to send verification email:', error);
      return { success: false, error };
    }

    console.log('✅ Verification email sent:', data?.id);
    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('❌ Error sending verification email:', error);
    return { success: false, error };
  }
}
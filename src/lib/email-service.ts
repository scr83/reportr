import { Resend } from 'resend';
import { render } from '@react-email/render';
import { hasEmailBeenSent, logEmailSent } from './email-sequences';
import { EMAIL_TYPES, EmailType } from './email-types';

// Email templates
import { WelcomeEmail } from '@/emails/welcome';
import { UpgradeSuccessEmail } from '@/emails/upgrade-success';
import { CancellationConfirmedEmail } from '@/emails/cancellation-confirmed';
import { OnboardingNudgeEmail } from '@/emails/onboarding-nudge';
import { OnboardingShowValueEmail } from '@/emails/onboarding-show-value';
import { OnboardingHelpEmail } from '@/emails/onboarding-help';
import { TrialEndingEmail } from '@/emails/trial-ending';
import { TrialLastDayEmail } from '@/emails/trial-last-day';
import { TrialExpiredEmail } from '@/emails/trial-expired';
import { TrialFeedbackEmail } from '@/emails/trial-feedback';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  react: React.ReactElement;
  userId: string;
  emailType: EmailType;
}

async function sendEmail(params: SendEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if email was already sent (idempotent)
    const alreadySent = await hasEmailBeenSent(params.userId, params.emailType);
    if (alreadySent) {
      return { success: true };
    }

    // Send email via Resend
    const htmlContent = await render(params.react);
    await resend.emails.send({
      from: 'Sebastian from Reportr <sebastian@reportr.agency>',
      to: params.to,
      subject: params.subject,
      html: htmlContent
    });

    // Log the sent email
    await logEmailSent(params.userId, params.emailType);

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Event-triggered emails
export async function sendWelcomeEmail(
  userId: string, 
  userEmail: string, 
  userName: string | null
): Promise<{ success: boolean; error?: string }> {
  return sendEmail({
    to: userEmail,
    subject: "Welcome to Reportr - Let's get started!",
    react: WelcomeEmail({ userName }),
    userId,
    emailType: EMAIL_TYPES.WELCOME
  });
}

export async function sendUpgradeSuccessEmail(
  userId: string, 
  userEmail: string, 
  userName: string | null, 
  planName: string
): Promise<{ success: boolean; error?: string }> {
  return sendEmail({
    to: userEmail,
    subject: 'Your Reportr upgrade is confirmed!',
    react: UpgradeSuccessEmail({ userName, planName }),
    userId,
    emailType: EMAIL_TYPES.UPGRADE_SUCCESS
  });
}

export async function sendCancellationEmail(
  userId: string, 
  userEmail: string, 
  userName: string | null, 
  accessUntil: string
): Promise<{ success: boolean; error?: string }> {
  return sendEmail({
    to: userEmail,
    subject: 'Your Reportr subscription has been cancelled',
    react: CancellationConfirmedEmail({ userName, accessUntil }),
    userId,
    emailType: EMAIL_TYPES.CANCELLATION_CONFIRMED
  });
}

// Onboarding sequence (for cron job)
export async function sendOnboardingNudgeEmail(
  userId: string, 
  userEmail: string, 
  userName: string | null
): Promise<{ success: boolean; error?: string }> {
  return sendEmail({
    to: userEmail,
    subject: 'Quick tip to get started with Reportr',
    react: OnboardingNudgeEmail({ userName }),
    userId,
    emailType: EMAIL_TYPES.ONBOARDING_DAY_1
  });
}

export async function sendOnboardingShowValueEmail(
  userId: string, 
  userEmail: string, 
  userName: string | null
): Promise<{ success: boolean; error?: string }> {
  return sendEmail({
    to: userEmail,
    subject: 'Save 8+ hours on your next client report',
    react: OnboardingShowValueEmail({ userName }),
    userId,
    emailType: EMAIL_TYPES.ONBOARDING_DAY_2
  });
}

export async function sendOnboardingHelpEmail(
  userId: string, 
  userEmail: string, 
  userName: string | null
): Promise<{ success: boolean; error?: string }> {
  return sendEmail({
    to: userEmail,
    subject: 'Need help getting started with Reportr?',
    react: OnboardingHelpEmail({ userName }),
    userId,
    emailType: EMAIL_TYPES.ONBOARDING_DAY_3
  });
}

// Trial expiration sequence (for cron job)
export async function sendTrialEndingEmail(
  userId: string, 
  userEmail: string, 
  userName: string | null, 
  trialEndsAt: string
): Promise<{ success: boolean; error?: string }> {
  return sendEmail({
    to: userEmail,
    subject: 'Your Reportr trial ends in 3 days',
    react: TrialEndingEmail({ userName, trialEndsAt }),
    userId,
    emailType: EMAIL_TYPES.TRIAL_3_DAYS
  });
}

export async function sendTrialLastDayEmail(
  userId: string, 
  userEmail: string, 
  userName: string | null, 
  trialEndsAt: string
): Promise<{ success: boolean; error?: string }> {
  return sendEmail({
    to: userEmail,
    subject: 'Last day of your Reportr trial',
    react: TrialLastDayEmail({ userName, trialEndsAt }),
    userId,
    emailType: EMAIL_TYPES.TRIAL_1_DAY
  });
}

export async function sendTrialExpiredEmail(
  userId: string, 
  userEmail: string, 
  userName: string | null
): Promise<{ success: boolean; error?: string }> {
  return sendEmail({
    to: userEmail,
    subject: 'Your Reportr trial has ended',
    react: TrialExpiredEmail({ userName }),
    userId,
    emailType: EMAIL_TYPES.TRIAL_EXPIRED
  });
}

export async function sendTrialFeedbackEmail(
  userId: string, 
  userEmail: string, 
  userName: string | null
): Promise<{ success: boolean; error?: string }> {
  return sendEmail({
    to: userEmail,
    subject: 'Quick question about your Reportr experience',
    react: TrialFeedbackEmail({ userName }),
    userId,
    emailType: EMAIL_TYPES.TRIAL_FEEDBACK
  });
}
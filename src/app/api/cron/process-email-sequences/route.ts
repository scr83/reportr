import { NextRequest, NextResponse } from 'next/server';
import { findUsersForTimeBasedEmail } from '@/lib/email-sequences';
import { EMAIL_SEQUENCES } from '@/lib/email-types';
import {
  sendOnboardingNudgeEmail,
  sendOnboardingShowValueEmail,
  sendOnboardingHelpEmail,
  sendTrialEndingEmail,
  sendTrialLastDayEmail,
  sendTrialExpiredEmail,
  sendTrialFeedbackEmail,
} from '@/lib/email-service';

export const runtime = 'nodejs';

// Email type to function mapping
const emailSenders: Record<string, Function> = {
  'onboarding_day1': sendOnboardingNudgeEmail,
  'onboarding_day2': sendOnboardingShowValueEmail,
  'onboarding_day3': sendOnboardingHelpEmail,
  'trial_3days': sendTrialEndingEmail,
  'trial_1day': sendTrialLastDayEmail,
  'trial_expired': sendTrialExpiredEmail,
  'trial_feedback': sendTrialFeedbackEmail,
};

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // 1. Authenticate - same pattern as existing cron jobs
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    // Allow requests from Vercel cron or with valid secret
    const isVercelCron = request.headers.get('user-agent')?.includes('vercel');
    const isValidSecret = cronSecret && authHeader === `Bearer ${cronSecret}`;
    
    if (!isVercelCron && !isValidSecret) {
      console.log('Unauthorized email cron request:', {
        authHeader,
        userAgent: request.headers.get('user-agent'),
        hasSecret: !!cronSecret
      });
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Starting email sequences cron job...');
    
    // 2. Initialize results tracking
    const results: Record<string, { sent: number; failed: number }> = {};
    let totalSent = 0;
    let totalFailed = 0;
    
    // 3. Process each time-based sequence
    for (const sequence of EMAIL_SEQUENCES) {
      if (sequence.trigger !== 'time') continue;
      
      const emailType = sequence.type;
      results[emailType] = { sent: 0, failed: 0 };
      
      console.log(`Processing ${emailType} (offset: ${sequence.daysOffset} days from ${sequence.referenceField})`);
      
      try {
        // Find eligible users for this email type
        const users = await findUsersForTimeBasedEmail(
          emailType,
          sequence.daysOffset!,
          sequence.referenceField!
        );
        
        console.log(`Found ${users.length} users eligible for ${emailType}`);
        
        // Send to each user
        for (const user of users) {
          try {
            const senderFunction = emailSenders[emailType];
            
            if (!senderFunction) {
              console.error(`No sender function found for emailType: ${emailType}`);
              results[emailType].failed++;
              totalFailed++;
              continue;
            }
            
            // Handle trial emails specially (they need trialEndsAt parameter)
            if (emailType === 'trial_3days' || emailType === 'trial_1day') {
              // Calculate the trial end date and format it
              const trialEndDate = new Date();
              trialEndDate.setDate(trialEndDate.getDate() + Math.abs(sequence.daysOffset!));
              const trialEndsAt = trialEndDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              });
              
              await senderFunction(user.id, user.email, user.name, trialEndsAt);
            } else {
              // Standard emails (onboarding, trial expired, trial feedback)
              await senderFunction(user.id, user.email, user.name);
            }
            
            console.log(`Successfully sent ${emailType} to ${user.email}`);
            results[emailType].sent++;
            totalSent++;
            
          } catch (error) {
            console.error(`Failed to send ${emailType} to ${user.id}:`, error);
            results[emailType].failed++;
            totalFailed++;
          }
          
          // Small delay to avoid rate limits
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
      } catch (error) {
        console.error(`Error processing ${emailType}:`, error);
        // Continue with other email types even if one fails
      }
    }
    
    const executionTimeMs = Date.now() - startTime;
    
    console.log(`Email sequences cron job completed in ${executionTimeMs}ms`);
    console.log(`Total sent: ${totalSent}, Total failed: ${totalFailed}`);
    
    // 4. Return summary
    return NextResponse.json({
      success: true,
      processed: results,
      totalSent,
      totalFailed,
      executionTimeMs,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Email cron job failed:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
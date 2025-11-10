'use client';

import React, { useState } from 'react';
import { AlertCircle, Mail } from 'lucide-react';
import { Button } from '@/components/atoms/Button';

interface EmailVerificationBannerProps {
  email: string;
  onResend?: () => Promise<void>;
}

export function EmailVerificationBanner({ email, onResend }: EmailVerificationBannerProps) {
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const handleResend = async () => {
    if (!onResend) return;
    setIsResending(true);
    setResendMessage(null);
    
    try {
      await onResend();
      setResendMessage('Verification email sent! Check your inbox.');
      // Clear message after 5 seconds
      setTimeout(() => setResendMessage(null), 5000);
    } catch (error) {
      console.error('Failed to resend email:', error);
      setResendMessage('Failed to send email. Please try again.');
      setTimeout(() => setResendMessage(null), 5000);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="mb-6 rounded-lg border border-yellow-300 bg-yellow-50 p-4">
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-yellow-800">
            Verify your email to unlock full access
          </h3>
          <p className="mt-1 text-sm text-yellow-700">
            We sent a verification link to <strong>{email}</strong>. 
            Click the link to start adding clients and generating reports.
          </p>
          
          {resendMessage && (
            <p className="mt-2 text-sm text-yellow-800 font-medium">
              {resendMessage}
            </p>
          )}
          
          <div className="mt-3 flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResend}
              disabled={isResending}
              className="text-yellow-800 border-yellow-300 hover:bg-yellow-100"
            >
              <Mail className="h-4 w-4 mr-2" />
              {isResending ? 'Sending...' : 'Resend Email'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
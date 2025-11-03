'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/atoms/Button';

export default function VerifyEmailPrompt() {
  const { data: session } = useSession();
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleResend = async () => {
    setResending(true);
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
      });
      
      if (res.ok) {
        setMessage('✅ Verification email sent! Check your inbox.');
      } else {
        setMessage('❌ Failed to send email. Please try again.');
      }
    } catch (error) {
      setMessage('❌ Something went wrong. Please try again.');
    } finally {
      setResending(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">📧</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Verify Your Email
          </h1>
          <p className="text-gray-600 mb-6">
            We sent a verification email to <strong>{session?.user?.email}</strong>.
            Please check your inbox and click the verification link to continue.
          </p>
          
          {message && (
            <div className="mb-4 p-3 rounded-lg bg-blue-50 text-blue-900">
              {message}
            </div>
          )}
          
          <Button
            onClick={handleResend}
            disabled={resending}
            className="w-full mb-4"
            variant="primary"
          >
            {resending ? 'Sending...' : 'Resend Verification Email'}
          </Button>
          
          <p className="text-sm text-gray-500 mt-4">
            Didn&apos;t receive the email? Check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
}
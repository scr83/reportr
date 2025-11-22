'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Main component wrapped in Suspense
export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

// Loading state component
function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712]">
      <div className="max-w-md w-full mx-4">
        <div className="bg-[#111827] rounded-2xl p-8 border border-[#1F2937]">
          <div className="flex justify-center mb-6">
            <svg className="animate-spin h-12 w-12 text-[#06B6D4]" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-center text-white">Loading...</h1>
          <p className="text-center text-gray-400 mt-2">Please wait</p>
        </div>
      </div>
    </div>
  );
}

// Main content component (uses useSearchParams)
function PaymentSuccessContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing your subscription...');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const activateSubscription = async () => {
      try {
        // Get subscription ID and plan from URL
        const subscriptionId = searchParams.get('subscription_id');
        const token = searchParams.get('token');
        const plan = searchParams.get('plan'); // STARTER, PROFESSIONAL, or AGENCY

        if (!subscriptionId && !token) {
          throw new Error('Missing subscription information');
        }

        if (!plan) {
          throw new Error('Missing plan information');
        }

        // Use token as subscription ID if subscription_id not present
        const subId = subscriptionId || token;

        console.log('🔄 Activating subscription:', subId, 'for plan:', plan);

        // Activate subscription on our backend
        const response = await fetch('/api/payments/activate-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subscriptionId: subId,
            plan: plan, // Explicitly pass the plan from URL
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to activate subscription');
        }

        console.log('✅ Subscription activated successfully');
        setStatus('success');
        setMessage('Subscription activated successfully!');

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard?subscription=success');
        }, 2000);

      } catch (error) {
        console.error('❌ Activation error:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Failed to activate subscription. Please contact support.');
      }
    };

    activateSubscription();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712]">
      <div className="max-w-md w-full mx-4">
        <div className="bg-[#111827] rounded-2xl p-8 border border-[#1F2937]">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            {status === 'loading' && (
              <svg className="animate-spin h-12 w-12 text-[#06B6D4]" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            {status === 'success' && (
              <div className="h-12 w-12 bg-gradient-to-r from-[#06B6D4] to-[#84CC16] rounded-full flex items-center justify-center">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            {status === 'error' && (
              <div className="h-12 w-12 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
          </div>

          {/* Message */}
          <h1 className="text-2xl font-bold text-center mb-2 text-white">
            {status === 'loading' && 'Processing Payment'}
            {status === 'success' && 'Payment Successful!'}
            {status === 'error' && 'Payment Error'}
          </h1>
          <p className="text-center text-gray-400">{message}</p>

          {status === 'error' && (
            <button
              onClick={() => router.push('/dashboard')}
              className="mt-6 w-full bg-gradient-to-r from-[#06B6D4] to-[#84CC16] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
            >
              Return to Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
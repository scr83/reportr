'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface PayPalSubscribeButtonProps {
  planId: string;
  planName: string;
  price: number;
  disabled?: boolean;
  className?: string;
  isTrial?: boolean;
}

export function PayPalSubscribeButton({
  planId,
  planName,
  price,
  disabled = false,
  className = '',
  isTrial = false,
}: PayPalSubscribeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const createSubscription = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Creating PayPal subscription...');

      // Create subscription
      const response = await fetch('/api/payments/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create subscription');
      }

      const data = await response.json();

      console.log('✅ Subscription created, redirecting to PayPal...');

      // Redirect to PayPal approval page
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        throw new Error('No approval URL received');
      }

    } catch (err) {
      console.error('❌ Subscription error:', err);
      setError(err instanceof Error ? err.message : 'Failed to start subscription. Please try again.');
      setLoading(false);
    }
  }, [planId]);

  // Auto-trigger subscription after OAuth redirect
  useEffect(() => {
    // Check URL parameter for pending subscription
    const urlParams = new URLSearchParams(window.location.search);
    const shouldSubscribe = urlParams.get('subscribe') === 'pending';
    
    if (shouldSubscribe && session?.user) {
      console.log('✅ User authenticated after OAuth, auto-triggering subscription...');
      
      // Clean up URL parameter
      urlParams.delete('subscribe');
      const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
      window.history.replaceState({}, '', newUrl);
      
      // Trigger subscription
      createSubscription();
    }
  }, [session, createSubscription]);

  const handleSubscribe = async () => {
    // Check if user is authenticated
    if (status === 'loading') {
      return; // Wait for session to load
    }

    if (!session?.user) {
      console.log('⚠️  User not authenticated, showing auth modal...');
      setShowAuthModal(true);
      return;
    }

    // User is authenticated, proceed with subscription
    console.log('✅ User authenticated, creating subscription...');
    createSubscription();
  };

  const handleGoogleSignIn = async () => {
    console.log('🔐 Initiating Google sign-in for PayPal subscription...');
    
    // 🔧 FIX: Set cookie to mark paid trial intent BEFORE OAuth (server-accessible)
    document.cookie = `signupIntent=PAID_TRIAL; path=/; max-age=1800; SameSite=Lax`;
    console.log('📝 Set signupIntent cookie = PAID_TRIAL');
    
    // Add URL parameter to persist subscription intent across redirect
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('subscribe', 'pending');
    currentUrl.searchParams.set('flow', 'paid'); // Mark as paid flow for analytics
    
    // Trigger Google OAuth with callback URL that includes subscription intent
    await signIn('google', {
      callbackUrl: currentUrl.toString(), // Return with ?subscribe=pending&flow=paid
    });
  };

  return (
    <>
      <div className={className}>
        <button
          onClick={handleSubscribe}
          disabled={disabled || loading || status === 'loading'}
          className={`w-full font-semibold py-3 px-6 rounded-lg transition-all ${
            isTrial
              ? 'bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50'
              : 'bg-[#7e23ce] text-white hover:bg-[#6b1fb0]'
          } ${disabled || loading || status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : isTrial ? (
            'Start 14-Day Trial'
          ) : (
            `Subscribe to ${planName} - $${price}/month`
          )}
        </button>

        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
        
        {isTrial && (
          <p className="text-xs text-gray-600 text-center mt-2">
            💳 Payment method required. No charge for 14 days.
          </p>
        )}
      </div>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl p-8 max-w-md w-full border border-[#1F2937]">
            {/* Close button */}
            <button
              onClick={() => setShowAuthModal(false)}
              className="float-right text-gray-400 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-gradient-to-r from-[#06B6D4] to-[#84CC16] rounded-full flex items-center justify-center">
                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <h2 className="text-2xl font-bold text-center mb-2 text-white">
              Quick Signup to Continue
            </h2>
            <p className="text-center text-gray-400 mb-6">
              Sign in with Google to complete your subscription to {planName}
            </p>

            {/* Sign in button */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-white text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              No setup fees required for signup
            </p>
          </div>
        </div>
      )}
    </>
  );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PayPalSubscribeButtonProps {
  planId: string;
  planName: string;
  price: number;
  disabled?: boolean;
  className?: string;
}

export function PayPalSubscribeButton({
  planId,
  planName,
  price,
  disabled = false,
  className = '',
}: PayPalSubscribeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      setError(null);

      // Create subscription
      const response = await fetch('/api/payments/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create subscription');
      }

      const data = await response.json();

      // Redirect to PayPal approval page
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        throw new Error('No approval URL received');
      }

    } catch (err) {
      console.error('Subscription error:', err);
      setError('Failed to start subscription. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <button
        onClick={handleSubscribe}
        disabled={disabled || loading}
        className="w-full bg-gradient-to-r from-[#06B6D4] to-[#84CC16] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </span>
        ) : (
          `Subscribe to ${planName} - $${price}/month`
        )}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
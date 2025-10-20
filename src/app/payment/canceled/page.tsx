'use client';

import { useRouter } from 'next/navigation';

export default function PaymentCanceledPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712]">
      <div className="max-w-md w-full mx-4">
        <div className="bg-[#111827] rounded-2xl p-8 border border-[#1F2937]">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="h-12 w-12 bg-yellow-500 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-2xl font-bold text-center mb-2 text-white">
            Payment Canceled
          </h1>
          <p className="text-center text-gray-400 mb-6">
            You canceled the payment. No charges have been made to your account.
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => router.push('/')}
              className="w-full bg-gradient-to-r from-[#06B6D4] to-[#84CC16] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-[#1F2937] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#374151] transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
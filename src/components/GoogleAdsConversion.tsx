'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

interface GoogleAdsConversionProps {
  userId: string;
}

export default function GoogleAdsConversion({ userId }: GoogleAdsConversionProps) {
  const [shouldTrack, setShouldTrack] = useState(false);

  useEffect(() => {
    // Check if conversion already tracked for this user
    const conversionTracked = localStorage.getItem(`conversion_tracked_${userId}`);
    
    if (!conversionTracked) {
      setShouldTrack(true);
      // Mark as tracked to prevent duplicate conversions
      localStorage.setItem(`conversion_tracked_${userId}`, 'true');
    }
  }, [userId]);

  // Don't render script if conversion already tracked
  if (!shouldTrack) return null;

  // Generate unique transaction ID to prevent duplicate counting
  const transactionId = `${userId}-${Date.now()}`;

  return (
    <Script
      id="google-ads-conversion-purchase"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          gtag('event', 'conversion', {
            'send_to': 'AW-17791827981/h4i4CIG-ptIbEI2A56NC',
            'value': 15.0,
            'currency': 'USD',
            'transaction_id': '${transactionId}'
          });
        `,
      }}
    />
  );
}
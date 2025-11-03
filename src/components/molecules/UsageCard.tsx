'use client';

import Link from 'next/link';
import { AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

interface UsageCardProps {
  label: string;
  icon: React.ReactNode;
  used: number;
  limit: number;
  percentage: number;
  isAtLimit: boolean;
  isNearLimit: boolean;
}

export function UsageCard({
  label,
  icon,
  used,
  limit,
  percentage,
  isAtLimit,
  isNearLimit,
}: UsageCardProps) {
  const getStatusColor = () => {
    if (isAtLimit) return 'border-red-300 bg-red-50';
    if (isNearLimit) return 'border-orange-300 bg-orange-50';
    return 'border-gray-300 bg-white';
  };

  const getProgressColor = () => {
    if (isAtLimit) return 'bg-red-500';
    if (isNearLimit) return 'bg-orange-500';
    return 'bg-blue-500';
  };

  const getTextColor = () => {
    if (isAtLimit) return 'text-red-900';
    if (isNearLimit) return 'text-orange-900';
    return 'text-gray-900';
  };

  return (
    <div className={`rounded-lg border-2 p-4 ${getStatusColor()}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon}
          <span className={`font-medium ${getTextColor()}`}>{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-2xl font-bold ${getTextColor()}`}>
            {used}
          </span>
          <span className={`text-sm ${getTextColor()} opacity-70`}>
            / {limit}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getProgressColor()}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      {/* Status Messages */}
      {isAtLimit && (
        <div className="flex items-start gap-2 text-red-900 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold">Limit reached</p>
            <Link
              href="/pricing"
              className="underline hover:no-underline"
            >
              Upgrade to add more
            </Link>
          </div>
        </div>
      )}

      {isNearLimit && !isAtLimit && (
        <div className="flex items-start gap-2 text-orange-900 text-sm">
          <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold">Approaching limit</p>
            <Link
              href="/pricing"
              className="underline hover:no-underline"
            >
              Consider upgrading
            </Link>
          </div>
        </div>
      )}

      {!isAtLimit && !isNearLimit && (
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <CheckCircle className="w-4 h-4" />
          <span>{limit - used} remaining</span>
        </div>
      )}
    </div>
  );
}
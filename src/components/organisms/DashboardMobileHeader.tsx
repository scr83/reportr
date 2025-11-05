'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu, BarChart3 } from 'lucide-react'
import { UserMenu } from '@/components/organisms/UserMenu'
import { TrialCountdown } from '@/components/molecules/TrialCountdown'
import { Skeleton } from '@/components/atoms'
import { useUserProfile } from '@/hooks/useUserProfile'
import { shouldShowTrialCountdown } from '@/lib/utils/trial-helpers'
import { cn, getInitials, truncate } from '@/lib/utils'

interface DashboardMobileHeaderProps {
  onMenuClick: () => void
  className?: string
}

export const DashboardMobileHeader: React.FC<DashboardMobileHeaderProps> = ({
  onMenuClick,
  className
}) => {
  const router = useRouter()
  const { profile, loading } = useUserProfile()
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const renderLogo = () => {
    if (loading) {
      return (
        <div className="flex items-center space-x-2">
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="text" width={100} />
        </div>
      )
    }

    const isWhiteLabel = profile?.whiteLabelEnabled
    const logoUrl = profile?.logo
    const companyName = profile?.companyName || 'My Agency'
    
    // Mobile: truncate to 16 chars for smaller screen
    const displayName = truncate(companyName, 16)

    if (isWhiteLabel && logoUrl && !imageError) {
      // Show custom logo with company name
      return (
        <div className="flex items-center space-x-2">
          <div className="relative flex-shrink-0">
            <Image
              src={logoUrl}
              alt={`${companyName} logo`}
              width={32}
              height={32}
              className="object-contain rounded-md"
              onError={handleImageError}
              priority
            />
          </div>
          <span className="text-lg font-semibold text-gray-900 truncate">
            {displayName}
          </span>
        </div>
      )
    } else if (isWhiteLabel) {
      // Show letter circle fallback with company name
      const initials = getInitials(companyName)
      return (
        <div className="flex items-center space-x-2">
          <div 
            className="flex h-8 w-8 items-center justify-center text-white font-semibold rounded-md text-sm flex-shrink-0"
            style={{ backgroundColor: profile?.primaryColor || 'var(--primary-color)' }}
          >
            {initials}
          </div>
          <span className="text-lg font-semibold text-gray-900 truncate">
            {displayName}
          </span>
        </div>
      )
    } else {
      // Show default "SEO Reports" branding
      return (
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md" style={{ backgroundColor: 'var(--primary-color)' }}>
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900">SEO Reports</span>
        </div>
      )
    }
  }
  const showTrialCountdown = profile && shouldShowTrialCountdown({
    trialUsed: profile.trialUsed,
    trialEndDate: profile.trialEndDate ? new Date(profile.trialEndDate) : null,
  });

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-40 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4",
        className
      )}>
        {/* Hamburger Menu Button */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ '--tw-ring-color': 'var(--primary-color)' } as React.CSSProperties}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Logo */}
        {renderLogo()}

        {/* User Menu */}
        <UserMenu />
      </header>

      {/* Trial Countdown - positioned below header on mobile */}
      {showTrialCountdown && profile?.trialEndDate && (
        <div className="fixed top-16 left-0 right-0 z-30 p-4">
          <TrialCountdown
            trialEndDate={new Date(profile.trialEndDate)}
            onUpgradeClick={() => router.push('/pricing')}
          />
        </div>
      )}
    </>
  )
}

DashboardMobileHeader.displayName = 'DashboardMobileHeader'
import React from 'react'
import { Card, CardContent, Skeleton } from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface LoadingCardProps {
  variant?: 'default' | 'metric' | 'table' | 'profile'
  lines?: number
  showAvatar?: boolean
  showAction?: boolean
  className?: string
}

export const LoadingCard: React.FC<LoadingCardProps> = ({
  variant = 'default',
  lines = 3,
  showAvatar = false,
  showAction = false,
  className,
}) => {
  const renderContent = () => {
    switch (variant) {
      case 'metric':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="circular" width={32} height={32} />
            </div>
            <Skeleton variant="text" width="60%" height="2rem" />
            <div className="flex items-center space-x-2">
              <Skeleton variant="text" width="20%" />
              <Skeleton variant="text" width="30%" />
            </div>
          </div>
        )

      case 'table':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton variant="text" width="25%" />
              <Skeleton variant="text" width="15%" />
            </div>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton variant="circular" width={32} height={32} />
                  <div className="space-y-1">
                    <Skeleton variant="text" width="120px" />
                    <Skeleton variant="text" width="80px" />
                  </div>
                </div>
                <Skeleton variant="text" width="60px" />
              </div>
            ))}
          </div>
        )

      case 'profile':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton variant="circular" width={64} height={64} />
              <div className="space-y-2 flex-1">
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="60%" />
              </div>
            </div>
            <div className="space-y-2">
              {Array.from({ length: lines }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="text"
                  width={index === lines - 1 ? '70%' : '100%'}
                />
              ))}
            </div>
            {showAction && (
              <div className="flex space-x-2">
                <Skeleton variant="rectangular" width={100} height={36} />
                <Skeleton variant="rectangular" width={80} height={36} />
              </div>
            )}
          </div>
        )

      default:
        return (
          <div className="space-y-4">
            {showAvatar && (
              <div className="flex items-center space-x-3">
                <Skeleton variant="circular" width={40} height={40} />
                <div className="space-y-1 flex-1">
                  <Skeleton variant="text" width="30%" />
                  <Skeleton variant="text" width="50%" />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              {Array.from({ length: lines }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="text"
                  width={index === lines - 1 ? '75%' : '100%'}
                />
              ))}
            </div>

            {showAction && (
              <div className="flex justify-end space-x-2">
                <Skeleton variant="rectangular" width={80} height={32} />
                <Skeleton variant="rectangular" width={60} height={32} />
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <Card className={cn('animate-pulse', className)}>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  )
}

LoadingCard.displayName = 'LoadingCard'
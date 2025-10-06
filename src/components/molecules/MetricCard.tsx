import React from 'react'
import { TrendingUp, TrendingDown, Minus, Loader2 } from 'lucide-react'
import { Card, Typography, Icon } from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  changeType?: 'positive' | 'negative' | 'neutral'
  icon?: React.ReactNode
  loading?: boolean
  className?: string
}

export const MetricCard = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  loading = false,
  className,
}: MetricCardProps) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      return val.toLocaleString()
    }
    return val
  }

  const formatChange = (changeValue: number) => {
    const formatted = Math.abs(changeValue * 100).toFixed(1)
    return `${formatted}%`
  }

  const getChangeIcon = () => {
    if (!change && change !== 0) return null
    
    switch (changeType) {
      case 'positive':
        return <TrendingUp className="h-3 w-3 text-success-500" />
      case 'negative':
        return <TrendingDown className="h-3 w-3 text-error-500" />
      default:
        return <Minus className="h-3 w-3 text-neutral-400" />
    }
  }

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-success-500'
      case 'negative':
        return 'text-error-500'
      default:
        return 'text-neutral-500'
    }
  }

  return (
    <Card className={cn(
      'relative p-4 sm:p-6 overflow-hidden',
      className
    )}>
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Icon icon={Loader2} className="animate-spin" color="muted" size="lg" />
        </div>
      ) : (
        <div className="space-y-3">
          {/* Header with title and icon */}
          <div className="flex items-center justify-between gap-2 min-w-0">
            <Typography 
              variant="caption" 
              className="font-medium text-neutral-500 truncate"
            >
              {title}
            </Typography>
            {icon && (
              <div className="flex-shrink-0 text-neutral-400">
                {icon}
              </div>
            )}
          </div>
          
          {/* Value */}
          <div className="min-w-0">
            <div 
              title={formatValue(value).toString()}
              style={{ wordBreak: 'keep-all', whiteSpace: 'nowrap' }}
            >
              <Typography 
                variant="h3" 
                className="font-bold text-neutral-900 text-lg sm:text-xl lg:text-2xl leading-tight"
              >
                {formatValue(value)}
              </Typography>
            </div>
          </div>
          
          {/* Change indicator */}
          {(change !== undefined && change !== null) && (
            <div className="flex items-center gap-1 min-w-0">
              <div className="flex-shrink-0">
                {getChangeIcon()}
              </div>
              <div title={`${change > 0 ? '+' : ''}${formatChange(change)} vs last period`}>
                <Typography 
                  variant="caption" 
                  className={cn(
                    'font-medium truncate',
                    getChangeColor()
                  )}
                >
                  {change > 0 ? '+' : ''}{formatChange(change)}
                </Typography>
              </div>
              <Typography 
                variant="caption" 
                className="text-neutral-500 hidden sm:inline truncate"
              >
                vs last period
              </Typography>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
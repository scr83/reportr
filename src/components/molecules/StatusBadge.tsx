import React from 'react'
import { Check, X, AlertTriangle, Clock, Minus } from 'lucide-react'
import { Badge, Icon } from '@/components/atoms'
import { cn } from '@/lib/utils'

export type StatusType = 'success' | 'error' | 'warning' | 'pending' | 'inactive' | 'info'

export interface StatusBadgeProps {
  status: StatusType
  label?: string
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  pulse?: boolean
  className?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'md',
  showIcon = true,
  pulse = false,
  className,
}) => {
  const statusConfig = {
    success: {
      variant: 'success' as const,
      icon: Check,
      defaultLabel: 'Success',
      color: 'text-success-600',
    },
    error: {
      variant: 'error' as const,
      icon: X,
      defaultLabel: 'Error',
      color: 'text-error-600',
    },
    warning: {
      variant: 'warning' as const,
      icon: AlertTriangle,
      defaultLabel: 'Warning',
      color: 'text-warning-600',
    },
    pending: {
      variant: 'warning' as const,
      icon: Clock,
      defaultLabel: 'Pending',
      color: 'text-warning-600',
    },
    inactive: {
      variant: 'neutral' as const,
      icon: Minus,
      defaultLabel: 'Inactive',
      color: 'text-neutral-500',
    },
    info: {
      variant: 'brand' as const,
      icon: Clock,
      defaultLabel: 'Info',
      color: 'text-brand-600',
    },
  }

  const config = statusConfig[status]
  const displayLabel = label || config.defaultLabel

  const iconSizes = {
    sm: 'xs' as const,
    md: 'sm' as const,
    lg: 'md' as const,
  }

  return (
    <Badge
      variant={config.variant}
      size={size}
      className={cn(
        'inline-flex items-center space-x-1',
        pulse && 'animate-pulse',
        className
      )}
    >
      {showIcon && (
        <Icon
          icon={config.icon}
          size={iconSizes[size]}
          color="inherit"
          className={config.color}
        />
      )}
      <span>{displayLabel}</span>
    </Badge>
  )
}

StatusBadge.displayName = 'StatusBadge'
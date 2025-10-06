import React from 'react'
import { FileText, Search, Users, BarChart3 } from 'lucide-react'
import { Button, Icon, H3, Body } from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface EmptyStateProps {
  variant?: 'default' | 'search' | 'data' | 'users'
  title: string
  description?: string
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary' | 'outline'
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  variant = 'default',
  title,
  description,
  icon,
  action,
  secondaryAction,
  className,
}) => {
  const defaultIcons = {
    default: FileText,
    search: Search,
    data: BarChart3,
    users: Users,
  }

  const DefaultIcon = defaultIcons[variant]

  return (
    <div className={cn(
      'flex flex-col items-center justify-center',
      'text-center p-12',
      'min-h-64',
      className
    )}>
      <div className="mb-6">
        {icon ? icon : (
          <Icon icon={DefaultIcon} size="xl" color="muted" />
        )}
      </div>

      <div className="space-y-3 max-w-md">
        <H3 className="text-neutral-900">
          {title}
        </H3>
        
        {description && (
          <Body className="text-neutral-600">
            {description}
          </Body>
        )}
      </div>

      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
          {action && (
            <Button
              variant={action.variant || 'primary'}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}
          
          {secondaryAction && (
            <Button
              variant="ghost"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

EmptyState.displayName = 'EmptyState'
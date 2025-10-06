import React from 'react'
import { 
  FileText, 
  Users, 
  Settings, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  MoreHorizontal
} from 'lucide-react'
import { 
  Card, 
  Typography, 
  Avatar, 
  Button, 
  Icon,
  Flex,
  Spacer 
} from '@/components/atoms'
import { StatusBadge, EmptyState } from '@/components/molecules'
import { cn } from '@/lib/utils'

export interface ActivityItem {
  id: string
  type: 'report' | 'client' | 'user' | 'system'
  title: string
  description: string
  timestamp: Date
  status?: 'completed' | 'pending' | 'failed'
  user?: {
    name: string
    avatar?: string
  }
  metadata?: {
    clientName?: string
    reportType?: string
    [key: string]: any
  }
}

export interface RecentActivityProps {
  activities?: ActivityItem[]
  loading?: boolean
  showViewAll?: boolean
  onViewAll?: () => void
  maxItems?: number
  className?: string
}

// Demo activity data
const demoActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'report',
    title: 'SEO Report Generated',
    description: 'Monthly SEO performance report for Acme Corp completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    status: 'completed',
    user: { name: 'System' },
    metadata: { clientName: 'Acme Corp', reportType: 'SEO Performance' },
  },
  {
    id: '2',
    type: 'client',
    title: 'New Client Added',
    description: 'TechStart Solutions has been added to your client list',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: 'completed',
    user: { name: 'John Doe', avatar: '/avatars/john.jpg' },
    metadata: { clientName: 'TechStart Solutions' },
  },
  {
    id: '3',
    type: 'report',
    title: 'Report Processing',
    description: 'Generating analytics report for Global Marketing Inc.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    status: 'pending',
    user: { name: 'System' },
    metadata: { clientName: 'Global Marketing Inc.', reportType: 'Analytics' },
  },
  {
    id: '4',
    type: 'user',
    title: 'Settings Updated',
    description: 'White-label branding settings have been updated',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    status: 'completed',
    user: { name: 'Sarah Wilson', avatar: '/avatars/sarah.jpg' },
  },
  {
    id: '5',
    type: 'report',
    title: 'Report Failed',
    description: 'Unable to generate report due to API connection issue',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    status: 'failed',
    user: { name: 'System' },
    metadata: { clientName: 'Startup Hub', reportType: 'SEO Audit' },
  },
  {
    id: '6',
    type: 'client',
    title: 'Client Data Updated',
    description: 'Updated tracking settings for MegaCorp Industries',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    status: 'completed',
    user: { name: 'Mike Johnson' },
    metadata: { clientName: 'MegaCorp Industries' },
  },
]

export const RecentActivity: React.FC<RecentActivityProps> = ({
  activities = demoActivities,
  loading = false,
  showViewAll = true,
  onViewAll,
  maxItems = 6,
  className,
}) => {
  const displayedActivities = activities.slice(0, maxItems)

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    
    return timestamp.toLocaleDateString()
  }

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'report':
        return FileText
      case 'client':
        return Users
      case 'user':
        return Settings
      case 'system':
        return Settings
      default:
        return FileText
    }
  }

  const getStatusIcon = (status?: ActivityItem['status']) => {
    switch (status) {
      case 'completed':
        return CheckCircle
      case 'pending':
        return Clock
      case 'failed':
        return AlertCircle
      default:
        return null
    }
  }

  if (loading) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start space-x-4 animate-pulse">
              <div className="w-10 h-10 bg-neutral-200 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-neutral-200 rounded w-3/4" />
                <div className="h-3 bg-neutral-200 rounded w-1/2" />
              </div>
              <div className="w-16 h-3 bg-neutral-200 rounded" />
            </div>
          ))}
        </div>
      </Card>
    )
  }

  if (activities.length === 0) {
    return (
      <Card className={cn('p-6', className)}>
        <EmptyState
          title="No Recent Activity"
          description="When you start using the platform, your recent activity will appear here."
          icon={<Icon icon={Clock} size="lg" />}
        />
      </Card>
    )
  }

  return (
    <Card className={cn('p-6', className)}>
      {/* Header */}
      <Flex justify="between" align="center" className="mb-6">
        <Typography variant="h3" className="text-lg font-semibold">
          Recent Activity
        </Typography>
        
        {showViewAll && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewAll}
          >
            View All
          </Button>
        )}
      </Flex>

      {/* Activity List */}
      <div className="space-y-4">
        {displayedActivities.map((activity, index) => (
          <div key={activity.id} className={cn(
            'flex items-start space-x-4 p-3 rounded-lg transition-colors hover:bg-neutral-50',
            index < displayedActivities.length - 1 && 'border-b border-neutral-100'
          )}>
            {/* Avatar/Icon */}
            <div className="flex-shrink-0">
              <div className="relative">
                <Avatar
                  src={activity.user?.avatar}
                  alt={activity.user?.name || 'User'}
                  name={activity.user?.name || 'User'}
                  size="md"
                />
                
                {/* Status indicator */}
                {activity.status && (
                  <div className={cn(
                    'absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center',
                    activity.status === 'completed' && 'bg-green-500',
                    activity.status === 'pending' && 'bg-yellow-500',
                    activity.status === 'failed' && 'bg-red-500'
                  )}>
                    <Icon 
                      icon={getStatusIcon(activity.status)!} 
                      size="xs" 
                      className="text-white"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <Typography variant="body" className="font-medium text-neutral-900 truncate">
                    {activity.title}
                  </Typography>
                  <Typography variant="caption" className="text-neutral-600 mt-1">
                    {activity.description}
                  </Typography>
                  
                  {/* Metadata */}
                  {activity.metadata && (
                    <div className="flex items-center space-x-4 mt-2">
                      {activity.metadata.clientName && (
                        <Typography variant="caption" className="text-neutral-500">
                          Client: {activity.metadata.clientName}
                        </Typography>
                      )}
                      {activity.metadata.reportType && (
                        <Typography variant="caption" className="text-neutral-500">
                          Type: {activity.metadata.reportType}
                        </Typography>
                      )}
                    </div>
                  )}
                </div>

                {/* Status & Timestamp */}
                <div className="flex flex-col items-end space-y-1 ml-4">
                  {activity.status && (
                    <StatusBadge 
                      status={activity.status === 'completed' ? 'success' : activity.status === 'failed' ? 'error' : activity.status} 
                      size="sm"
                    />
                  )}
                  <Typography variant="caption" className="text-neutral-500 text-xs whitespace-nowrap">
                    {formatTimestamp(activity.timestamp)}
                  </Typography>
                </div>
              </div>
            </div>

            {/* Actions */}
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
            >
              <Icon icon={MoreHorizontal} size="sm" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}

RecentActivity.displayName = 'RecentActivity'
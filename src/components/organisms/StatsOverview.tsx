'use client'

import React, { useEffect, useState } from 'react'
import { Users, FileText, Clock, TrendingUp, DollarSign, Target } from 'lucide-react'
import { Grid, Icon } from '@/components/atoms'
import { MetricCard } from '@/components/molecules'

export interface StatsData {
  totalClients: number
  reportsThisMonth: number
  timeSaved: number
  revenue: number
  activeProjects: number
  completionRate: number
}

export interface StatsOverviewProps {
  data?: StatsData
  loading?: boolean
  className?: string
}

// Default demo data
const defaultStatsData: StatsData = {
  totalClients: 24,
  reportsThisMonth: 156,
  timeSaved: 48,
  revenue: 12400,
  activeProjects: 18,
  completionRate: 94.2,
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  data = defaultStatsData,
  loading = false,
  className,
}) => {
  const [animatedData, setAnimatedData] = useState<StatsData>({
    totalClients: 0,
    reportsThisMonth: 0,
    timeSaved: 0,
    revenue: 0,
    activeProjects: 0,
    completionRate: 0,
  })

  // Animate numbers on mount
  useEffect(() => {
    if (loading) return

    const duration = 2000 // 2 seconds
    const steps = 60 // 60 steps for smooth animation
    const stepDuration = duration / steps

    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      setAnimatedData({
        totalClients: Math.round(data.totalClients * easedProgress),
        reportsThisMonth: Math.round(data.reportsThisMonth * easedProgress),
        timeSaved: Math.round(data.timeSaved * easedProgress),
        revenue: Math.round(data.revenue * easedProgress),
        activeProjects: Math.round(data.activeProjects * easedProgress),
        completionRate: Math.round(data.completionRate * easedProgress * 10) / 10,
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setAnimatedData(data)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [data, loading])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value}%`
  }

  const formatHours = (value: number) => {
    return `${value}h`
  }

  const stats = [
    {
      id: 'clients',
      title: 'Total Clients',
      value: formatNumber(animatedData.totalClients),
      description: 'Active client accounts',
      trend: '+12% from last month',
      trendDirection: 'up' as const,
      icon: Users,
      color: 'blue' as const,
      loading,
    },
    {
      id: 'reports',
      title: 'Reports Generated',
      value: formatNumber(animatedData.reportsThisMonth),
      description: 'This month',
      trend: '+28% from last month',
      trendDirection: 'up' as const,
      icon: FileText,
      color: 'green' as const,
      loading,
    },
    {
      id: 'time',
      title: 'Time Saved',
      value: formatHours(animatedData.timeSaved),
      description: 'Automated reporting',
      trend: 'This week',
      trendDirection: 'neutral' as const,
      icon: Clock,
      color: 'purple' as const,
      loading,
    },
    {
      id: 'revenue',
      title: 'Revenue Impact',
      value: formatCurrency(animatedData.revenue),
      description: 'Generated this month',
      trend: '+15% from last month',
      trendDirection: 'up' as const,
      icon: DollarSign,
      color: 'emerald' as const,
      loading,
    },
    {
      id: 'projects',
      title: 'Active Projects',
      value: formatNumber(animatedData.activeProjects),
      description: 'In progress',
      trend: '3 completed this week',
      trendDirection: 'neutral' as const,
      icon: Target,
      color: 'orange' as const,
      loading,
    },
    {
      id: 'completion',
      title: 'Completion Rate',
      value: formatPercentage(animatedData.completionRate),
      description: 'Success rate',
      trend: '+2.1% from last month',
      trendDirection: 'up' as const,
      icon: TrendingUp,
      color: 'pink' as const,
      loading,
    },
  ]

  return (
    <div className={className}>
      <Grid 
        cols={1}
        gap="lg"
        className="sm:grid-cols-2 lg:grid-cols-3"
      >
        {stats.map((stat) => (
          <MetricCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={<Icon icon={stat.icon} size="md" />}
            loading={stat.loading}
          />
        ))}
      </Grid>
    </div>
  )
}

StatsOverview.displayName = 'StatsOverview'
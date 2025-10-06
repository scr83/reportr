'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

export interface TabItem {
  key: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
  badge?: string | number
  content: React.ReactNode
}

export interface TabGroupProps {
  items: TabItem[]
  defaultActiveKey?: string
  activeKey?: string
  variant?: 'default' | 'pills' | 'underline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onChange?: (activeKey: string) => void
}

export const TabGroup: React.FC<TabGroupProps> = ({
  items,
  defaultActiveKey,
  activeKey: controlledActiveKey,
  variant = 'default',
  size = 'md',
  className,
  onChange,
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState(
    defaultActiveKey || items[0]?.key || ''
  )

  const activeKey = controlledActiveKey ?? internalActiveKey
  const isControlled = controlledActiveKey !== undefined

  const handleTabClick = (key: string) => {
    if (!isControlled) {
      setInternalActiveKey(key)
    }
    onChange?.(key)
  }

  const activeItem = items.find(item => item.key === activeKey)

  const sizes = {
    sm: {
      tab: 'px-3 py-2 text-sm',
      content: 'p-4',
    },
    md: {
      tab: 'px-4 py-3 text-base',
      content: 'p-6',
    },
    lg: {
      tab: 'px-6 py-4 text-lg',
      content: 'p-8',
    },
  }

  const getTabStyles = (item: TabItem, isActive: boolean) => {
    const baseStyles = [
      'relative inline-flex items-center space-x-2',
      'font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      sizes[size].tab,
    ].join(' ')

    const variants = {
      default: isActive
        ? 'bg-brand-600 text-white rounded-md'
        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md',
      pills: isActive
        ? 'bg-brand-100 text-brand-700 border border-brand-200 rounded-full'
        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full border border-transparent',
      underline: [
        'border-b-2 rounded-none pb-3',
        isActive
          ? 'border-brand-600 text-brand-600'
          : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300',
      ].join(' '),
    }

    return cn(baseStyles, variants[variant])
  }

  const tabListStyles = {
    default: 'flex space-x-1 bg-neutral-100 p-1 rounded-lg',
    pills: 'flex space-x-2',
    underline: 'flex space-x-6 border-b border-neutral-200',
  }

  return (
    <div className={cn('w-full', className)}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={tabListStyles[variant]}
      >
        {items.map((item) => {
          const isActive = item.key === activeKey
          return (
            <button
              key={item.key}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${item.key}`}
              disabled={item.disabled}
              onClick={() => handleTabClick(item.key)}
              className={getTabStyles(item, isActive)}
            >
              {item.icon && (
                <span className="flex-shrink-0">
                  {item.icon}
                </span>
              )}
              <span>{item.label}</span>
              {item.badge && (
                <span className={cn(
                  'ml-1 px-2 py-0.5 text-xs rounded-full',
                  isActive
                    ? 'bg-brand-500 text-white'
                    : 'bg-neutral-200 text-neutral-600'
                )}>
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-4">
        {activeItem && (
          <div
            role="tabpanel"
            id={`tabpanel-${activeItem.key}`}
            aria-labelledby={`tab-${activeItem.key}`}
            className={sizes[size].content}
          >
            {activeItem.content}
          </div>
        )}
      </div>
    </div>
  )
}

TabGroup.displayName = 'TabGroup'
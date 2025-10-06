'use client'

import React from 'react'
import { Button } from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface ButtonGroupItem {
  key: string
  label: string
  value?: string
  icon?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}

export interface ButtonGroupProps {
  items: ButtonGroupItem[]
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  orientation?: 'horizontal' | 'vertical'
  activeKey?: string
  allowMultiple?: boolean
  className?: string
  onSelectionChange?: (selectedKeys: string[]) => void
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  items,
  variant = 'outline',
  size = 'md',
  orientation = 'horizontal',
  activeKey,
  allowMultiple = false,
  className,
  onSelectionChange,
}) => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>(
    activeKey ? [activeKey] : []
  )

  const handleItemClick = (item: ButtonGroupItem) => {
    if (item.disabled) return

    let newSelectedKeys: string[]

    if (allowMultiple) {
      if (selectedKeys.includes(item.key)) {
        newSelectedKeys = selectedKeys.filter(key => key !== item.key)
      } else {
        newSelectedKeys = [...selectedKeys, item.key]
      }
    } else {
      newSelectedKeys = selectedKeys.includes(item.key) ? [] : [item.key]
    }

    setSelectedKeys(newSelectedKeys)
    onSelectionChange?.(newSelectedKeys)
    item.onClick?.()
  }

  const baseStyles = orientation === 'horizontal' 
    ? 'inline-flex' 
    : 'inline-flex flex-col'

  const getButtonStyles = (item: ButtonGroupItem, index: number) => {
    const isFirst = index === 0
    const isLast = index === items.length - 1
    const isSelected = selectedKeys.includes(item.key)

    const roundingClasses = orientation === 'horizontal' ? [
      isFirst && !isLast ? 'rounded-r-none' : '',
      isLast && !isFirst ? 'rounded-l-none' : '',
      !isFirst && !isLast ? 'rounded-none' : '',
    ].filter(Boolean).join(' ') : [
      isFirst && !isLast ? 'rounded-b-none' : '',
      isLast && !isFirst ? 'rounded-t-none' : '',
      !isFirst && !isLast ? 'rounded-none' : '',
    ].filter(Boolean).join(' ')

    const borderClasses = orientation === 'horizontal' ? [
      !isFirst && variant === 'outline' ? 'border-l-0' : '',
    ].filter(Boolean).join(' ') : [
      !isFirst && variant === 'outline' ? 'border-t-0' : '',
    ].filter(Boolean).join(' ')

    return cn(
      roundingClasses,
      borderClasses,
      isSelected && variant === 'outline' && 'bg-brand-50 border-brand-500 text-brand-700 z-10 relative',
      isSelected && variant === 'primary' && 'bg-brand-700',
      isSelected && variant === 'ghost' && 'bg-brand-100 text-brand-700',
    )
  }

  return (
    <div className={cn(baseStyles, className)} role="group">
      {items.map((item, index) => (
        <Button
          key={item.key}
          variant={variant}
          size={size}
          disabled={item.disabled}
          onClick={() => handleItemClick(item)}
          className={getButtonStyles(item, index)}
        >
          {item.icon && (
            <span className="mr-2">{item.icon}</span>
          )}
          {item.label}
        </Button>
      ))}
    </div>
  )
}

ButtonGroup.displayName = 'ButtonGroup'
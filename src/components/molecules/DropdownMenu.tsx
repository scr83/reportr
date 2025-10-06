'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { Button, Icon, Divider } from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface DropdownMenuItem {
  key: string
  label: string
  value?: string
  icon?: React.ReactNode
  disabled?: boolean
  destructive?: boolean
  onClick?: () => void
}

export interface DropdownMenuProps {
  trigger: React.ReactNode
  items: (DropdownMenuItem | 'divider')[]
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
  className?: string
  menuClassName?: string
  disabled?: boolean
  closeOnItemClick?: boolean
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  placement = 'bottom-start',
  className,
  menuClassName,
  disabled = false,
  closeOnItemClick = true,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleTriggerClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  const handleItemClick = (item: DropdownMenuItem) => {
    if (item.disabled) return
    
    item.onClick?.()
    
    if (closeOnItemClick) {
      setIsOpen(false)
    }
  }

  const placements = {
    'bottom-start': 'top-full left-0 mt-1',
    'bottom-end': 'top-full right-0 mt-1',
    'top-start': 'bottom-full left-0 mb-1',
    'top-end': 'bottom-full right-0 mb-1',
  }

  const menuStyles = [
    'absolute z-50',
    'min-w-48 max-w-xs',
    'bg-white rounded-md shadow-lg',
    'border border-neutral-200',
    'py-1',
    'animate-in fade-in-0 zoom-in-95',
    placements[placement],
  ].join(' ')

  return (
    <div className={cn('relative inline-block', className)} ref={dropdownRef}>
      <div onClick={handleTriggerClick} className={cn(disabled && 'opacity-50 cursor-not-allowed')}>
        {trigger}
      </div>

      {isOpen && (
        <div className={cn(menuStyles, menuClassName)}>
          {items.map((item, index) => {
            if (item === 'divider') {
              return <Divider key={`divider-${index}`} className="my-1" />
            }

            const menuItem = item as DropdownMenuItem

            return (
              <button
                key={menuItem.key}
                onClick={() => handleItemClick(menuItem)}
                disabled={menuItem.disabled}
                className={cn(
                  'w-full px-3 py-2 text-sm text-left',
                  'flex items-center space-x-2',
                  'transition-colors duration-150',
                  'focus:outline-none',
                  menuItem.disabled
                    ? 'text-neutral-400 cursor-not-allowed'
                    : menuItem.destructive
                    ? 'text-error-600 hover:bg-error-50 focus:bg-error-50'
                    : 'text-neutral-700 hover:bg-neutral-50 focus:bg-neutral-50'
                )}
              >
                {menuItem.icon && (
                  <span className="flex-shrink-0">
                    {menuItem.icon}
                  </span>
                )}
                <span className="flex-1 truncate">
                  {menuItem.label}
                </span>
                {menuItem.value && (
                  <span className="flex-shrink-0 text-xs text-neutral-500">
                    {menuItem.value}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

DropdownMenu.displayName = 'DropdownMenu'
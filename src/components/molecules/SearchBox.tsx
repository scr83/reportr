'use client'

import React, { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Input, Button, Icon } from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface SearchBoxProps {
  placeholder?: string
  value?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'ghost'
  clearable?: boolean
  loading?: boolean
  disabled?: boolean
  autoFocus?: boolean
  className?: string
  onSearch?: (value: string) => void
  onChange?: (value: string) => void
  onClear?: () => void
  onFocus?: () => void
  onBlur?: () => void
}

export const SearchBox = React.forwardRef<HTMLInputElement, SearchBoxProps>(({
  placeholder = 'Search...',
  value: controlledValue,
  size = 'md',
  variant = 'default',
  clearable = true,
  loading = false,
  disabled = false,
  autoFocus = false,
  className,
  onSearch,
  onChange,
  onClear,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const value = controlledValue ?? internalValue
  const isControlled = controlledValue !== undefined

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const handleSearch = () => {
    onSearch?.(value)
  }

  const handleClear = () => {
    const newValue = ''
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
    onClear?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
    if (e.key === 'Escape') {
      if (clearable && value) {
        handleClear()
      }
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    onFocus?.()
  }

  const handleBlur = () => {
    setIsFocused(false)
    onBlur?.()
  }

  const sizes = {
    sm: 'h-8',
    md: 'h-10', 
    lg: 'h-12',
  }

  return (
    <div className={cn('relative', className)}>
      <div className="flex items-center">
        <div className="relative flex-1">
          <input
            ref={ref}
            type="text"
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            autoFocus={autoFocus}
            className={cn(
              'input-base w-full pl-10 pr-12',
              sizes[size],
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          
          {/* Search Icon */}
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon
              icon={Search}
              size="sm"
              className={cn(
                "flex-shrink-0",
                isFocused ? 'text-brand-500' : 'text-neutral-500'
              )}
            />
          </div>

          {/* Right side actions */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {clearable && value && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                disabled={disabled}
                className="h-6 w-6 p-0 hover:bg-neutral-100"
                aria-label="Clear search"
              >
                <Icon icon={X} size="xs" className="text-neutral-400" />
              </Button>
            )}

            {onSearch && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSearch}
                disabled={disabled || loading}
                loading={loading}
                className="h-8 px-3"
              >
                Search
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

SearchBox.displayName = 'SearchBox'
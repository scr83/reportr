'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  position?: 'top' | 'bottom' | 'left' | 'right'
  size?: 'sm' | 'md' | 'lg'
  delay?: number
  disabled?: boolean
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  size = 'md',
  delay = 300,
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (disabled) return
    
    const id = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    setTimeoutId(id)
  }

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setIsVisible(false)
  }

  const sizes = {
    sm: 'px-2 py-1 text-xs max-w-xs',
    md: 'px-3 py-2 text-sm max-w-sm',
    lg: 'px-4 py-3 text-base max-w-md',
  }

  const positions = {
    top: {
      tooltip: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      arrow: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-neutral-900',
    },
    bottom: {
      tooltip: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      arrow: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-neutral-900',
    },
    left: {
      tooltip: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
      arrow: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-neutral-900',
    },
    right: {
      tooltip: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
      arrow: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-neutral-900',
    },
  }

  const tooltipStyles = [
    'absolute z-50',
    'bg-neutral-900 text-white',
    'rounded-md shadow-lg',
    'pointer-events-none',
    'transition-all duration-200',
    'whitespace-normal break-words',
    isVisible ? 'opacity-100 visible' : 'opacity-0 invisible',
    positions[position].tooltip,
    sizes[size],
  ].join(' ')

  const arrowStyles = [
    'absolute w-0 h-0',
    'border-4',
    positions[position].arrow,
  ].join(' ')

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {React.cloneElement(children, {
        'aria-describedby': isVisible ? 'tooltip' : undefined,
      })}
      
      {!disabled && (
        <div className={tooltipStyles} role="tooltip" id="tooltip">
          {content}
          <div className={arrowStyles} />
        </div>
      )}
    </div>
  )
}

Tooltip.displayName = 'Tooltip'
'use client'

import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { Button, Icon, Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  className?: string
  overlayClassName?: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
  overlayClassName,
  children,
  footer,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, closeOnEscape, onClose])

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose()
    }
  }

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  }

  if (!isOpen) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-50',
        'flex items-center justify-center',
        'bg-black/50 backdrop-blur-sm',
        'animate-in fade-in-0',
        overlayClassName
      )}
      onClick={handleOverlayClick}
    >
      <div
        className={cn(
          'relative w-full mx-4',
          'animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4',
          'shadow-2xl',
          'bg-white rounded-xl border border-gray-200 shadow-soft',
          sizes[size],
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
      >
        {(title || showCloseButton) && (
          <div className="flex flex-row items-center justify-between p-6 pb-4">
            <div>
              {title && (
                <h2 id="modal-title" className="text-lg font-semibold text-neutral-900">
                  {title}
                </h2>
              )}
              {description && (
                <p id="modal-description" className="text-sm text-neutral-600 mt-1">
                  {description}
                </p>
              )}
            </div>
            
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 hover:bg-neutral-100"
                aria-label="Close modal"
              >
                <Icon icon={X} size="sm" color="muted" />
              </Button>
            )}
          </div>
        )}

        <div className="px-6 pb-6">
          {children}
        </div>

        {footer && (
          <div className="flex justify-end space-x-2 p-6 pt-4 border-t border-neutral-200">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

Modal.displayName = 'Modal'
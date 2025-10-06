import React from 'react'
import { CheckCircle, AlertCircle, AlertTriangle, X, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  title?: string
  description?: string
  closable?: boolean
  onClose?: () => void
  icon?: React.ReactNode
  children?: React.ReactNode
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({
  variant = 'info',
  size = 'md',
  title,
  description,
  closable = false,
  onClose,
  icon,
  children,
  className,
  ...props
}, ref) => {
  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertCircle,
  }

  const IconComponent = icons[variant]

  const baseStyles = [
    'relative flex items-start gap-3',
    'border rounded-lg',
    'transition-all duration-200',
  ].join(' ')

  const variants = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-success-50 border-success-200 text-success-800',
    warning: 'bg-warning-50 border-warning-200 text-warning-800',
    error: 'bg-error-50 border-error-200 text-error-800',
  }

  const iconColors = {
    info: 'text-blue-500',
    success: 'text-success-500',
    warning: 'text-warning-500',
    error: 'text-error-500',
  }

  const sizes = {
    sm: 'p-3 text-sm',
    md: 'p-4 text-base',
    lg: 'p-6 text-lg',
  }

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {(icon !== null) && (
        <div className={cn('flex-shrink-0 mt-0.5', iconColors[variant])}>
          {icon || <IconComponent className={iconSizes[size]} />}
        </div>
      )}

      <div className="flex-1 min-w-0">
        {title && (
          <h4 className={cn(
            'font-semibold mb-1',
            size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'
          )}>
            {title}
          </h4>
        )}
        
        {description && (
          <p className={cn(
            'opacity-90',
            size === 'sm' ? 'text-xs' : 'text-sm'
          )}>
            {description}
          </p>
        )}
        
        {children && (
          <div className="mt-2">
            {children}
          </div>
        )}
      </div>

      {closable && onClose && (
        <button
          type="button"
          onClick={onClose}
          className={cn(
            'flex-shrink-0 ml-2',
            'p-1 rounded-md',
            'hover:bg-black/5 focus:bg-black/5',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current',
            iconColors[variant]
          )}
          aria-label="Close alert"
        >
          <X className={iconSizes[size]} />
        </button>
      )}
    </div>
  )
})

Alert.displayName = 'Alert'
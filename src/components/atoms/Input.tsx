import React from 'react'
import { cn } from '@/lib/utils'
import type { InputProps } from '@/types'

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  placeholder,
  error,
  value,
  onChange,
  type = 'text',
  required = false,
  disabled = false,
  className,
  ...props
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  // Filter out any props that should not be passed to input element
  const {
    children,
    dangerouslySetInnerHTML,
    ...safeProps
  } = props as any

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={cn(
          'input-base block w-full',
          'disabled:bg-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed',
          error && 'input-error',
          className
        )}
        {...safeProps}
      />
      {error && (
        <p className="input-error-text">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export { Input }
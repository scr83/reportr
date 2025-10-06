import React from 'react'
import { Input, Textarea, Select, Checkbox, Radio, Switch } from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface FormFieldProps {
  type?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'switch'
  label?: string
  name: string
  value?: string | boolean
  placeholder?: string
  error?: string
  helperText?: string
  required?: boolean
  disabled?: boolean
  options?: Array<{ value: string; label: string }>
  className?: string
  onChange?: (value: string | boolean) => void
  onBlur?: () => void
}

export const FormField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  FormFieldProps
>(({
  type = 'text',
  label,
  name,
  value,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  options = [],
  className,
  onChange,
  onBlur,
  ...props
}, ref) => {
  const handleChange = (newValue: string | boolean) => {
    onChange?.(newValue)
  }

  // Filter out props that should not be passed to input elements
  const {
    children,
    dangerouslySetInnerHTML,
    ...safeProps
  } = props as any

  const renderInput = () => {
    const commonProps = {
      name,
      placeholder,
      required,
      disabled,
      error,
      onBlur,
    }

    switch (type) {
      case 'textarea':
        return (
          <Textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            label={label}
            value={value as string}
            onChange={(e) => handleChange(e.target.value)}
            helperText={helperText}
            {...commonProps}
          />
        )

      case 'select':
        return (
          <Select
            ref={ref as React.Ref<HTMLSelectElement>}
            label={label}
            value={value as string}
            onChange={(e) => handleChange(e.target.value)}
            helperText={helperText}
            {...commonProps}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        )

      case 'checkbox':
        return (
          <Checkbox
            ref={ref as React.Ref<HTMLInputElement>}
            label={label}
            checked={value as boolean}
            onChange={(e) => handleChange(e.target.checked)}
            description={helperText}
            error={error}
            name={name}
            required={required}
            disabled={disabled}
            {...safeProps}
          />
        )

      case 'radio':
        return (
          <div className="space-y-2">
            {label && (
              <label className="block text-sm font-medium text-neutral-700">
                {label}
                {required && <span className="text-error-500 ml-1">*</span>}
              </label>
            )}
            <div className="space-y-2">
              {options.map((option) => (
                <Radio
                key={option.value}
                ref={ref as React.Ref<HTMLInputElement>}
                label={option.label}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => handleChange(option.value)}
                error={error}
                {...safeProps}
                />
              ))}
            </div>
            {(helperText || error) && (
              <p className={cn(
                'text-sm',
                error ? 'text-error-600' : 'text-neutral-500'
              )}>
                {error || helperText}
              </p>
            )}
          </div>
        )

      case 'switch':
        return (
          <Switch
            ref={ref as React.Ref<HTMLInputElement>}
            label={label}
            checked={value as boolean}
            onChange={(e) => handleChange(e.target.checked)}
            description={helperText}
            {...commonProps}
            {...safeProps}
          />
        )

      default:
        return (
          <Input
            ref={ref as React.Ref<HTMLInputElement>}
            type={type}
            label={label}
            value={value as string}
            onChange={(newValue: string) => handleChange(newValue)}
            error={error}
            name={name}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            onBlur={onBlur}
            {...safeProps}
          />
        )
    }
  }

  return (
    <div className={cn('space-y-1', className)}>
      {renderInput()}
    </div>
  )
})

FormField.displayName = 'FormField'
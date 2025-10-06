'use client'

import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input, Button, Icon } from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface PasswordInputProps {
  label?: string
  placeholder?: string
  value?: string
  error?: string
  helperText?: string
  required?: boolean
  disabled?: boolean
  showStrengthIndicator?: boolean
  className?: string
  onChange?: (value: string) => void
  onBlur?: () => void
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(({
  label = 'Password',
  placeholder = 'Enter your password',
  value = '',
  error,
  helperText,
  required = false,
  disabled = false,
  showStrengthIndicator = false,
  className,
  onChange,
  onBlur,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, label: '' }
    
    let score = 0
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    score = Object.values(checks).filter(Boolean).length

    const labels = {
      0: '',
      1: 'Very Weak',
      2: 'Weak', 
      3: 'Fair',
      4: 'Good',
      5: 'Strong',
    }

    const colors = {
      0: '',
      1: 'bg-error-500',
      2: 'bg-error-400',
      3: 'bg-warning-500',
      4: 'bg-success-400',
      5: 'bg-success-500',
    }

    return {
      score,
      label: labels[score as keyof typeof labels],
      color: colors[score as keyof typeof colors],
      checks,
    }
  }

  const strength = showStrengthIndicator ? getPasswordStrength(value) : null

  return (
    <div className={cn('space-y-2', className)}>
      <div className="relative">
        <Input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          required={required}
          disabled={disabled}
          className="pr-12"
          {...props}
        />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={togglePasswordVisibility}
          disabled={disabled}
          className={cn(
            'absolute right-2 top-8 h-8 w-8 p-0',
            'hover:bg-neutral-100 focus:bg-neutral-100'
          )}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <Icon
            icon={showPassword ? EyeOff : Eye}
            size="sm"
            color="muted"
          />
        </Button>
      </div>

      {showStrengthIndicator && value && strength && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-600">
              Password strength
            </span>
            <span className={cn(
              'text-xs font-medium',
              strength.score <= 2 ? 'text-error-600' :
              strength.score <= 3 ? 'text-warning-600' :
              'text-success-600'
            )}>
              {strength.label}
            </span>
          </div>
          
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className={cn(
                  'h-1 flex-1 rounded-full',
                  index <= strength.score
                    ? strength.color
                    : 'bg-neutral-200'
                )}
              />
            ))}
          </div>

          {strength.score < 4 && strength.checks && (
            <div className="text-xs text-neutral-600 space-y-1">
              <p>Password should include:</p>
              <ul className="space-y-0.5 ml-2">
                {!strength.checks.length && (
                  <li className="flex items-center space-x-1">
                    <span className="text-error-500">•</span>
                    <span>At least 8 characters</span>
                  </li>
                )}
                {!strength.checks.lowercase && (
                  <li className="flex items-center space-x-1">
                    <span className="text-error-500">•</span>
                    <span>One lowercase letter</span>
                  </li>
                )}
                {!strength.checks.uppercase && (
                  <li className="flex items-center space-x-1">
                    <span className="text-error-500">•</span>
                    <span>One uppercase letter</span>
                  </li>
                )}
                {!strength.checks.numbers && (
                  <li className="flex items-center space-x-1">
                    <span className="text-error-500">•</span>
                    <span>One number</span>
                  </li>
                )}
                {!strength.checks.symbols && (
                  <li className="flex items-center space-x-1">
                    <span className="text-error-500">•</span>
                    <span>One special character</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      {helperText && !error && (
        <p className="text-sm text-neutral-500">
          {helperText}
        </p>
      )}
    </div>
  )
})

PasswordInput.displayName = 'PasswordInput'
'use client'

import React, { useEffect } from 'react'
import { useUserProfile } from '@/hooks/useUserProfile'

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { profile } = useUserProfile()

  useEffect(() => {
    // Apply theme based on user profile
    const applyTheme = () => {
      const root = document.documentElement

      if (profile?.whiteLabelEnabled && profile?.primaryColor) {
        // Apply custom primary color when white-label is enabled
        root.style.setProperty('--primary-color', profile.primaryColor)
        
        // Convert hex to RGB for use in rgba() functions
        const hexToRgb = (hex: string) => {
          const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
          return result ? {
            r: parseInt(result[1]!, 16),
            g: parseInt(result[2]!, 16),
            b: parseInt(result[3]!, 16)
          } : null
        }
        
        const rgb = hexToRgb(profile.primaryColor)
        if (rgb) {
          root.style.setProperty('--primary-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`)
        }
      } else {
        // Reset to default purple when white-label is disabled
        root.style.setProperty('--primary-color', '#8B5CF6')
        root.style.setProperty('--primary-color-rgb', '139, 92, 246') // Purple 500 RGB
      }
    }

    applyTheme()
  }, [profile])

  return <>{children}</>
}

ThemeProvider.displayName = 'ThemeProvider'
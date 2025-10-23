'use client'

import React, { useEffect } from 'react'
import { useUserProfile } from '@/hooks/useUserProfile'

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { profile } = useUserProfile()

  useEffect(() => {
    const root = document.documentElement

    // CRITICAL: Always reset first, then conditionally apply
    if (!profile?.whiteLabelEnabled) {
      // FORCE RESET to default purple
      root.style.setProperty('--primary-color', '#8B5CF6')
      root.style.setProperty('--primary-color-rgb', '139, 92, 246')
      console.log('Theme: Reset to default purple (whiteLabelEnabled=false)')
      return // Exit early
    }

    // Apply custom color only if enabled AND color exists
    if (profile?.primaryColor) {
      root.style.setProperty('--primary-color', profile.primaryColor)
      
      // Convert hex to RGB for rgb() usage
      const hex = profile.primaryColor.replace('#', '')
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      root.style.setProperty('--primary-color-rgb', `${r}, ${g}, ${b}`)
      
      console.log('Theme: Applied custom color', profile.primaryColor)
    } else {
      // Fallback to purple if enabled but no color set
      root.style.setProperty('--primary-color', '#8B5CF6')
      root.style.setProperty('--primary-color-rgb', '139, 92, 246')
      console.log('Theme: No custom color, using default purple')
    }
  }, [profile])

  return <>{children}</>
}

ThemeProvider.displayName = 'ThemeProvider'
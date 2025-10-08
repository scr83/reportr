'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export interface Theme {
  id: string
  name: string
  primary: string
  secondary: string
  accent?: string
  neutral: string
  description: string
}

export const demoThemes: Theme[] = [
  {
    id: 'modern',
    name: "Modern Blue",
    primary: "#3b82f6",
    secondary: "#10b981",
    accent: "#8b5cf6",
    neutral: "#6b7280",
    description: "Professional modern look with blue primary"
  },
  {
    id: 'corporate',
    name: "Corporate Gray",
    primary: "#374151",
    secondary: "#6b7280",
    accent: "#0ea5e9",
    neutral: "#9ca3af",
    description: "Conservative corporate styling"
  },
  {
    id: 'startup',
    name: "Startup Orange",
    primary: "#f59e0b",
    secondary: "#ef4444",
    accent: "#8b5cf6",
    neutral: "#6b7280",
    description: "Bold and energetic startup vibe"
  },
  {
    id: 'agency',
    name: "Agency Purple",
    primary: "#9810f9",
    secondary: "#9810f9",
    accent: "#f59e0b",
    neutral: "#6b7280",
    description: "Creative agency styling"
  },
  {
    id: 'minimal',
    name: "Minimal Black",
    primary: "#1f2937",
    secondary: "#374151",
    accent: "#10b981",
    neutral: "#9ca3af",
    description: "Clean minimal design"
  },
  {
    id: 'ocean',
    name: "Ocean Blue",
    primary: "#0ea5e9",
    secondary: "#0891b2",
    accent: "#06b6d4",
    neutral: "#64748b",
    description: "Calming ocean-inspired colors"
  }
]

interface ThemeContextType {
  currentTheme: Theme
  setTheme: (theme: Theme) => void
  isDarkMode: boolean
  setIsDarkMode: (dark: boolean) => void
  applyTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => demoThemes[0]!)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const hexToRgb = useCallback((hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return '0 0 0'
    
    const r = parseInt(result[1]!, 16)
    const g = parseInt(result[2]!, 16)
    const b = parseInt(result[3]!, 16)
    
    return `${r} ${g} ${b}`
  }, [])

  const generateColorScale = useCallback((baseColor: string) => {
    // This is a simplified color scale generator
    // In a real implementation, you'd use a proper color manipulation library
    const rgb = hexToRgb(baseColor)
    return {
      50: rgb, // Would be much lighter
      100: rgb,
      200: rgb,
      300: rgb,
      400: rgb,
      500: rgb, // Base color
      600: rgb,
      700: rgb,
      800: rgb,
      900: rgb, // Would be much darker
      950: rgb,
    }
  }, [hexToRgb])

  const applyTheme = useCallback((theme: Theme) => {
    const root = document.documentElement
    
    // Generate color scales for the theme
    const primaryScale = generateColorScale(theme.primary)
    const secondaryScale = generateColorScale(theme.secondary)
    const accentScale = theme.accent ? generateColorScale(theme.accent) : null
    
    // Apply CSS variables
    Object.entries(primaryScale).forEach(([key, value]) => {
      root.style.setProperty(`--brand-${key}`, value)
    })
    
    Object.entries(secondaryScale).forEach(([key, value]) => {
      root.style.setProperty(`--secondary-${key}`, value)
    })
    
    if (accentScale) {
      Object.entries(accentScale).forEach(([key, value]) => {
        root.style.setProperty(`--accent-${key}`, value)
      })
    }
    
    // Apply other theme properties
    root.style.setProperty('--theme-primary', hexToRgb(theme.primary))
    root.style.setProperty('--theme-secondary', hexToRgb(theme.secondary))
    root.style.setProperty('--theme-neutral', hexToRgb(theme.neutral))
  }, [hexToRgb, generateColorScale])

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme)
    applyTheme(theme)
  }

  useEffect(() => {
    applyTheme(currentTheme)
  }, [currentTheme, applyTheme])

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    isDarkMode,
    setIsDarkMode,
    applyTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
'use client'

import React, { useState } from 'react'
import { Palette, Check } from 'lucide-react'
import { Button, Typography, Card, Icon } from '@/components/atoms'
import { useTheme, demoThemes, type Theme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

export interface ThemeSelectorProps {
  className?: string
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ className }) => {
  const { currentTheme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const handleThemeSelect = (theme: Theme) => {
    setTheme(theme)
    setIsOpen(false)
  }

  return (
    <div className={cn('relative', className)}>
      {/* Theme Selector Button */}
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <Icon icon={Palette} size="sm" />
        <span className="hidden sm:inline">{currentTheme.name}</span>
      </Button>

      {/* Theme Options Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-80 z-20">
            <Card className="p-4 shadow-lg border border-neutral-200">
              <Typography variant="h6" className="mb-4 font-semibold">
                White-Label Themes
              </Typography>
              
              <div className="space-y-3">
                {demoThemes.map((theme) => (
                  <div
                    key={theme.id}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all duration-200',
                      'hover:border-neutral-300 hover:bg-neutral-50',
                      currentTheme.id === theme.id
                        ? 'border-brand-500 bg-brand-50'
                        : 'border-neutral-200'
                    )}
                    onClick={() => handleThemeSelect(theme)}
                  >
                    <div className="flex items-center space-x-3">
                      {/* Color Preview */}
                      <div className="flex space-x-1">
                        <div
                          className="w-4 h-4 rounded-full border border-neutral-200"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-neutral-200"
                          style={{ backgroundColor: theme.secondary }}
                        />
                        {theme.accent && (
                          <div
                            className="w-4 h-4 rounded-full border border-neutral-200"
                            style={{ backgroundColor: theme.accent }}
                          />
                        )}
                      </div>
                      
                      <div>
                        <Typography variant="body" className="font-medium">
                          {theme.name}
                        </Typography>
                        <Typography variant="caption" className="text-neutral-500">
                          {theme.description}
                        </Typography>
                      </div>
                    </div>
                    
                    {currentTheme.id === theme.id && (
                      <Icon icon={Check} size="sm" className="text-brand-600" />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-neutral-50 rounded-lg">
                <Typography variant="caption" className="text-neutral-600">
                  <strong>White-Label Ready:</strong> Each theme can be customized with your brand colors, logo, and styling preferences.
                </Typography>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}

ThemeSelector.displayName = 'ThemeSelector'
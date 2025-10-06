'use client'

import React, { useState } from 'react'
import { 
  Container, 
  Card, 
  Typography,
  Button,
  Grid,
  Flex,
  Spacer,
  Divider,
  Switch,
  Icon
} from '@/components/atoms'
import { TabGroup, ThemeSelector } from '@/components/molecules'
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'

export interface ShowcaseSection {
  id: string
  title: string
  description?: string
  component: React.ReactNode
  code?: string
}

export interface ShowcaseTemplateProps {
  title?: string
  description?: string
  sections: ShowcaseSection[]
  defaultActiveSection?: string
  showThemeToggle?: boolean
  className?: string
}

export const ShowcaseTemplate: React.FC<ShowcaseTemplateProps> = ({
  title = 'Component Showcase',
  description = 'Explore our complete design system with interactive examples',
  sections,
  defaultActiveSection,
  showThemeToggle = true,
  className,
}) => {
  const [activeSection, setActiveSection] = useState(
    defaultActiveSection || sections[0]?.id
  )
  const [showCode, setShowCode] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const currentSection = sections.find(section => section.id === activeSection)

  const tabs = sections.map(section => ({
    id: section.id,
    label: section.title,
  }))

  return (
    <div className={cn(
      'min-h-screen',
      isDarkMode ? 'bg-neutral-900 text-white' : 'bg-neutral-50',
      className
    )}>
      {/* Header */}
      <div className={cn(
        'sticky top-0 z-30 border-b backdrop-blur-sm',
        isDarkMode 
          ? 'bg-neutral-900/80 border-neutral-800' 
          : 'bg-white/80 border-neutral-200'
      )}>
        <Container className="px-4 sm:px-6 lg:px-8">
          <Flex justify="between" align="center" className="py-4">
            <div>
              <Typography variant="h1" className="text-xl font-bold">
                {title}
              </Typography>
              <Typography variant="caption" className={cn(
                isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
              )}>
                {description}
              </Typography>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile Menu Button */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-50"
              >
                <Icon icon={mobileMenuOpen ? X : Menu} size="sm" className="text-neutral-800" />
              </Button>

              {/* Code toggle */}
              <Button
                variant={showCode ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setShowCode(!showCode)}
                className="hidden sm:flex"
              >
                {showCode ? 'Hide Code' : 'Show Code'}
              </Button>

              {/* White-Label Theme Selector */}
              {showThemeToggle && <ThemeSelector />}
              
              {/* Dark Mode Toggle */}
              <Flex align="center" className="space-x-2 hidden sm:flex">
                <Typography variant="caption">Dark</Typography>
                <Switch
                  checked={isDarkMode}
                  onChange={(e) => setIsDarkMode(e.target.checked)}
                  size="sm"
                />
              </Flex>
            </div>
          </Flex>
        </Container>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className={cn(
            'fixed top-0 left-0 h-full w-80 z-50 overflow-y-auto',
            isDarkMode ? 'bg-neutral-900' : 'bg-white'
          )}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <Typography variant="h3" className="font-semibold">
                  Navigation
                </Typography>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon icon={X} size="sm" />
                </Button>
              </div>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id)
                      setMobileMenuOpen(false)
                    }}
                    className={cn(
                      'w-full text-left px-3 py-3 text-sm rounded-md transition-colors',
                      activeSection === section.id
                        ? isDarkMode
                          ? 'bg-blue-600 text-white font-medium'
                          : 'bg-blue-50 text-blue-900 font-medium border border-blue-200 shadow-sm'
                        : isDarkMode
                        ? 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                    )}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Sidebar Navigation */}
        <aside className={cn(
          'w-64 h-screen sticky top-16 border-r overflow-y-auto hidden lg:block',
          isDarkMode 
            ? 'bg-neutral-900 border-neutral-800' 
            : 'bg-white border-neutral-200'
        )}>
          <div className="p-4">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    'w-full text-left px-3 py-2 text-sm rounded-md transition-colors',
                    activeSection === section.id
                      ? isDarkMode
                        ? 'bg-blue-600 text-white font-medium'
                        : 'bg-blue-50 text-blue-900 font-medium border border-blue-200 shadow-sm'
                      : isDarkMode
                      ? 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                  )}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto w-full lg:w-auto min-w-0">
          <Container 
            size="full" 
            padding="none" 
            className="px-4 pr-4 sm:px-6 sm:pr-6 lg:px-8 lg:pr-8 py-4 sm:py-8 w-full"
          >
            {currentSection && (
              <div className="space-y-8">
                {/* Section Header */}
                <div>
                  <Typography variant="h2" className="text-2xl font-bold mb-2">
                    {currentSection.title}
                  </Typography>
                  {currentSection.description && (
                    <Typography variant="body" className={cn(
                      isDarkMode ? 'text-neutral-300' : 'text-neutral-600'
                    )}>
                      {currentSection.description}
                    </Typography>
                  )}
                </div>

                <Divider />

                {/* Component Demo */}
                <div className="space-y-6">
                  <Typography variant="h3" className="text-lg font-semibold">
                    Interactive Demo
                  </Typography>
                  
                  <Card className={cn(
                    'p-4 sm:p-6 lg:p-8',
                    isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white'
                  )}>
                    <div className="w-full min-h-[200px] flex flex-col items-center justify-center overflow-auto">
                      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
                        {currentSection.component}
                      </div>
                    </div>
                  </Card>

                  {/* Code Example */}
                  {showCode && currentSection.code && (
                    <div className="space-y-4">
                      <Typography variant="h3" className="text-lg font-semibold">
                        Code Example
                      </Typography>
                      
                      <Card className={cn(
                        'relative',
                        isDarkMode ? 'bg-neutral-900 border-neutral-700' : 'bg-neutral-50'
                      )}>
                        <div className="absolute top-4 right-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(currentSection.code!)}
                            className="text-xs"
                          >
                            Copy
                          </Button>
                        </div>
                        
                        <pre className={cn(
                          'p-4 overflow-x-auto text-sm',
                          isDarkMode ? 'text-neutral-200' : 'text-neutral-800'
                        )}>
                          <code>{currentSection.code}</code>
                        </pre>
                      </Card>
                    </div>
                  )}

                  {/* Responsive Test */}
                  <div className="space-y-4">
                    <Typography variant="h3" className="text-lg font-semibold">
                      Responsive Preview
                    </Typography>
                    
                    <Grid cols={1} gap="md" className="lg:grid-cols-3">
                      {/* Mobile */}
                      <Card className={cn(
                        'p-4',
                        isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white'
                      )}>
                        <Typography variant="caption" className="text-center mb-4 block">
                          Mobile (375px)
                        </Typography>
                        <div className="w-full border rounded-lg p-2 bg-white overflow-hidden">
                          <div className="transform scale-75 origin-top w-full">
                            <div className="w-[400px]">
                              {currentSection.component}
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Tablet */}
                      <Card className={cn(
                        'p-4 hidden md:block',
                        isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white'
                      )}>
                        <Typography variant="caption" className="text-center mb-4 block">
                          Tablet (768px)
                        </Typography>
                        <div className="w-full border rounded-lg p-3 bg-white overflow-hidden">
                          <div className="transform scale-90 origin-top w-full">
                            <div className="w-[500px]">
                              {currentSection.component}
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Desktop */}
                      <Card className={cn(
                        'p-4 hidden lg:block',
                        isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white'
                      )}>
                        <Typography variant="caption" className="text-center mb-4 block">
                          Desktop (1024px+)
                        </Typography>
                        <div className="w-full border rounded-lg p-4 bg-white overflow-hidden">
                          {currentSection.component}
                        </div>
                      </Card>
                    </Grid>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </main>
      </div>
    </div>
  )
}

ShowcaseTemplate.displayName = 'ShowcaseTemplate'
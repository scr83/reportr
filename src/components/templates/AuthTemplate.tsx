'use client'

import React from 'react'
import { 
  Container, 
  Card, 
  Logo, 
  Typography,
  Flex,
  Spacer 
} from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface AuthTemplateProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  showLogo?: boolean
  className?: string
}

export const AuthTemplate: React.FC<AuthTemplateProps> = ({
  children,
  title,
  subtitle,
  showLogo = true,
  className,
}) => {
  return (
    <div className={cn(
      'min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100',
      'flex flex-col justify-center py-12',
      className
    )}>
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          {showLogo && (
            <div className="text-center mb-8">
              <Logo 
                size="lg"
                className="mx-auto"
                fallback={
                  <div className="bg-brand-600 text-white rounded-xl p-4 w-20 h-20 flex items-center justify-center text-2xl font-bold">
                    SEO
                  </div>
                }
              />
              <Spacer size="sm" />
              <Typography variant="caption" className="text-neutral-600">
                ReportBot
              </Typography>
            </div>
          )}

          {/* Auth Card */}
          <Card className="p-8 shadow-lg border-0">
            {/* Header */}
            <div className="text-center mb-8">
              <Typography variant="h2" className="text-2xl font-bold text-neutral-900">
                {title}
              </Typography>
              {subtitle && (
                <>
                  <Spacer size="xs" />
                  <Typography variant="body" className="text-neutral-600">
                    {subtitle}
                  </Typography>
                </>
              )}
            </div>

            {/* Content */}
            <div className="space-y-6">
              {children}
            </div>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center">
            <Typography variant="caption" className="text-neutral-500">
              Professional SEO reporting for digital marketing agencies
            </Typography>
          </div>
        </div>
      </Container>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-brand-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-brand-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-50 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Custom styles for blob animation */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

AuthTemplate.displayName = 'AuthTemplate'
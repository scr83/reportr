'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { BarChart3, Mail } from 'lucide-react'
import { 
  Container,
  Typography,
  Icon,
  Grid
} from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface FooterProps {
  className?: string
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const router = useRouter()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className={cn(
      'bg-neutral-900 text-white',
      'py-12',
      className
    )}>
      <Container className="px-4 sm:px-6 lg:px-8">
        <Grid cols={1} gap="lg" className="md:grid-cols-3">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <Icon icon={BarChart3} size="sm" className="text-white" />
              </div>
              <span className="font-poppins font-bold text-xl">
                Reportr
              </span>
            </div>
            <Typography variant="body" className="text-neutral-400 max-w-sm">
              Professional SEO reports in minutes. Built for agencies.
            </Typography>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <Typography variant="h5" className="text-white font-semibold">
              Quick Links
            </Typography>
            <nav className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection('features')}
                className="text-left text-neutral-400 hover:text-white transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => router.push('/pricing')}
                className="text-left text-neutral-400 hover:text-white transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-left text-neutral-400 hover:text-white transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => router.push('/blog')}
                className="text-left text-neutral-400 hover:text-white transition-colors"
              >
                Blog
              </button>
            </nav>
          </div>

          {/* Legal & Contact */}
          <div className="space-y-4">
            <Typography variant="h5" className="text-white font-semibold">
              Support
            </Typography>
            <nav className="flex flex-col space-y-3">
              <a 
                href="mailto:support@reportr.com"
                className="flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors"
              >
                <Icon icon={Mail} size="sm" />
                <span>support@reportr.com</span>
              </a>
              <a 
                href="/privacy"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </nav>
          </div>
        </Grid>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <Typography variant="caption" className="text-neutral-500">
              © 2025 Reportr. All rights reserved.
            </Typography>
            <Typography variant="caption" className="text-neutral-500">
              Professional SEO reporting for digital marketing agencies.
            </Typography>
          </div>
        </div>
      </Container>
    </footer>
  )
}

Footer.displayName = 'Footer'
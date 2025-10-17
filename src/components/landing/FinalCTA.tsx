'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import { ArrowRight } from 'lucide-react'
import { 
  Container,
  Typography,
  Button,
  Icon
} from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface FinalCTAProps {
  className?: string
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ className }) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  return (
    <section className={cn(
      'py-20 bg-gradient-to-br from-[#9810f9] to-[#7c0fd4]',
      className
    )}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform Your SEO Reporting?
        </h2>
        <p className="text-xl text-[#e4c7ff] mb-8">
          Start creating professional SEO reports in minutes. No credit card required.
        </p>
        
        {status === 'loading' ? (
          <button 
            className="bg-white text-[#9810f9] px-8 py-4 rounded-lg font-semibold text-lg shadow-lg"
            disabled
          >
            Loading...
          </button>
        ) : session ? (
          <button 
            className="bg-white text-[#9810f9] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#f8f3ff] hover:scale-105 transition-all duration-200 shadow-lg"
            onClick={() => router.push('/dashboard')}
          >
            Go to Dashboard →
          </button>
        ) : (
          <button 
            className="bg-white text-[#9810f9] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#f8f3ff] hover:scale-105 transition-all duration-200 shadow-lg"
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          >
            Start Free Trial Now →
          </button>
        )}
        
        <div className="mt-6 flex items-center justify-center gap-6 text-[#e4c7ff] text-sm">
          <span>✓ No credit card required</span>
          <span>✓ 5 free reports to start</span>
          <span>✓ Cancel anytime</span>
        </div>
      </div>
    </section>
  )
}

FinalCTA.displayName = 'FinalCTA'
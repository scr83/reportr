'use client'

import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Chrome, Check } from 'lucide-react'
import { 
  Button, 
  Typography, 
  Icon, 
  Alert,
  Divider,
  Link,
  Spacer,
  Card,
  Grid 
} from '@/components/atoms'
import { AuthTemplate } from '@/components/templates'

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const session = await getSession()
      if (session) {
        router.push('/dashboard')
      }
    }
    checkAuth()
  }, [router])

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await signIn('google', { 
        callbackUrl: '/dashboard' as any,
        redirect: false 
      })
      
      if (result?.error) {
        setError('Failed to create account. Please try again.')
      } else if (result?.url) {
        router.push(result.url as any)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    'Generate unlimited SEO reports',
    'Full white-label customization',
    'Client portal access',
    'Advanced analytics integration',
    'Priority support',
    '14-day free trial'
  ]

  return (
    <AuthTemplate
      title="Start Your Free Trial"
      subtitle="Join hundreds of agencies using Reportr"
      showLogo={true}
    >
      {error && (
        <>
          <Alert variant="error" title="Sign Up Error">
            {error}
          </Alert>
          <Spacer size="md" />
        </>
      )}

      {/* Features List */}
      <Card className="p-4 bg-brand-50 border-brand-200 mb-6">
        <Typography variant="body" className="font-medium text-brand-900 mb-3 text-sm">
          What&apos;s included in your free trial:
        </Typography>
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-brand-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon icon={Check} size="xs" className="text-white" />
              </div>
              <Typography variant="caption" className="text-brand-800 text-sm">
                {feature}
              </Typography>
            </div>
          ))}
        </div>
      </Card>

      {/* Google Sign Up */}
      <Button
        variant="primary"
        size="lg"
        className="w-full justify-center"
        onClick={handleGoogleSignUp}
        disabled={isLoading}
      >
        <Icon 
          icon={Chrome} 
          size="sm" 
          className="mr-3" 
        />
        {isLoading ? 'Creating account...' : 'Start Free Trial with Google'}
      </Button>

      <Spacer size="sm" />

      <Typography variant="caption" className="text-center text-neutral-600 text-xs">
        No credit card required • Cancel anytime • 14-day free trial
      </Typography>

      <Divider className="my-6" />

      {/* Footer Links */}
      <div className="text-center space-y-4">
        <Typography variant="caption" className="text-neutral-600">
          Already have an account?{' '}
          <Link href="/signin" className="text-brand-600 hover:text-brand-700 font-medium">
            Sign in here
          </Link>
        </Typography>
        
        <Typography variant="caption" className="text-neutral-500 text-xs leading-relaxed">
          By signing up, you agree to our{' '}
          <Link href="/terms" className="text-brand-600 hover:text-brand-700">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-brand-600 hover:text-brand-700">
            Privacy Policy
          </Link>
        </Typography>
      </div>
    </AuthTemplate>
  )
}
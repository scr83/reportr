'use client'

import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Chrome } from 'lucide-react'
import { 
  Button, 
  Typography, 
  Icon, 
  Alert,
  Divider,
  Link,
  Spacer 
} from '@/components/atoms'
import { AuthTemplate } from '@/components/templates'

export default function SignInPage() {
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

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await signIn('google', { 
        callbackUrl: '/dashboard' as any,
        redirect: false 
      })
      
      if (result?.error) {
        setError('Failed to sign in. Please try again.')
      } else if (result?.url) {
        router.push(result.url as any)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthTemplate
      title="Welcome Back"
      subtitle="Sign in to your Reportr account"
      showLogo={true}
    >
      {error && (
        <>
          <Alert variant="error" title="Sign In Error">
            {error}
          </Alert>
          <Spacer size="md" />
        </>
      )}

      {/* Google Sign In */}
      <Button
        variant="secondary"
        size="lg"
        className="w-full justify-center"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <Icon 
          icon={Chrome} 
          size="sm" 
          className="mr-3" 
        />
        {isLoading ? 'Signing in...' : 'Continue with Google'}
      </Button>

      <Divider className="my-6" />

      {/* Benefits */}
      <div className="text-center space-y-3">
        <Typography variant="body" className="text-neutral-600 text-sm">
          Sign in to access:
        </Typography>
        <div className="space-y-2 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-brand-500 rounded-full flex-shrink-0" />
            <Typography variant="caption" className="text-neutral-700">
              Professional SEO report generation
            </Typography>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-brand-500 rounded-full flex-shrink-0" />
            <Typography variant="caption" className="text-neutral-700">
              White-label branding customization
            </Typography>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-brand-500 rounded-full flex-shrink-0" />
            <Typography variant="caption" className="text-neutral-700">
              Client dashboard and sharing
            </Typography>
          </div>
        </div>
      </div>

      <Spacer size="lg" />

      {/* Footer Links */}
      <div className="text-center space-y-4">
        <Typography variant="caption" className="text-neutral-600">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-brand-600 hover:text-brand-700 font-medium">
            Sign up for free
          </Link>
        </Typography>
        
        <div className="flex justify-center space-x-4 text-xs">
          <Link href="/privacy" className="text-neutral-500 hover:text-neutral-700">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-neutral-500 hover:text-neutral-700">
            Terms of Service
          </Link>
        </div>
      </div>
    </AuthTemplate>
  )
}
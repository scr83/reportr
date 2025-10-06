'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Save, Upload, Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import { 
  Typography, 
  Button, 
  Card,
  Input,
  Alert,
  Spacer,
  Flex,
  Divider
} from '@/components/atoms'
import { FormField } from '@/components/molecules'
import { DashboardTemplate } from '@/components/templates'
import { useAuth } from '@/hooks/useAuth'

interface UserProfile {
  id: string
  name: string
  email: string
  image?: string
  companyName: string
  primaryColor: string
  logo?: string
  plan: string
  clientCount: number
  reportCount: number
  createdAt: string
}

export default function ProfilePage() {
  const { session } = useAuth('/signin')
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showColorPicker, setShowColorPicker] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    primaryColor: '#3B82F6',
    logo: '',
  })

  useEffect(() => {
    if (session?.user?.id) {
      fetchProfile()
    }
  }, [session])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/users/profile')
      if (!response.ok) throw new Error('Failed to fetch profile')
      
      const data = await response.json()
      setProfile(data.user)
      setFormData({
        name: data.user.name || '',
        companyName: data.user.companyName || '',
        primaryColor: data.user.primaryColor || '#3B82F6',
        logo: data.user.logo || '',
      })
    } catch (err) {
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update profile')
      }

      const data = await response.json()
      setProfile(data.user)
      setSuccess('Profile updated successfully!')
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear messages when user starts typing
    if (error) setError(null)
    if (success) setSuccess(null)
  }

  const colorPresets = [
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EF4444', // Red
    '#06B6D4', // Cyan
    '#F97316', // Orange
    '#84CC16', // Lime
  ]

  if (loading) {
    return (
      <DashboardTemplate
        title="Profile"
        breadcrumb={[{ label: 'Profile' }]}
      >
        <div className="flex items-center justify-center h-64">
          <Typography variant="body" className="text-neutral-600">
            Loading profile...
          </Typography>
        </div>
      </DashboardTemplate>
    )
  }

  return (
    <DashboardTemplate
      title="Profile"
      breadcrumb={[{ label: 'Profile' }]}
      actions={
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center"
        >
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      }
    >
      <div className="max-w-4xl">
        {/* Status Messages */}
        {error && (
          <>
            <Alert variant="error" title="Error">
              {error}
            </Alert>
            <Spacer size="md" />
          </>
        )}

        {success && (
          <>
            <Alert variant="success" title="Success">
              {success}
            </Alert>
            <Spacer size="md" />
          </>
        )}

        {/* Profile Overview */}
        <Card className="p-6 mb-6">
          <Flex align="center" className="mb-6">
            <div className="h-16 w-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-xl font-medium mr-4">
              {session?.user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <Typography variant="h3" className="text-xl font-semibold text-neutral-900">
                {profile?.name || 'User'}
              </Typography>
              <Typography variant="body" className="text-neutral-600">
                {profile?.email}
              </Typography>
              <Typography variant="caption" className="text-neutral-500">
                {profile?.plan} Plan • Joined {new Date(profile?.createdAt || '').toLocaleDateString()}
              </Typography>
            </div>
          </Flex>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-neutral-50 rounded-lg">
              <Typography variant="h4" className="text-2xl font-bold text-neutral-900">
                {profile?.clientCount || 0}
              </Typography>
              <Typography variant="caption" className="text-neutral-600">
                Clients
              </Typography>
            </div>
            <div className="text-center p-4 bg-neutral-50 rounded-lg">
              <Typography variant="h4" className="text-2xl font-bold text-neutral-900">
                {profile?.reportCount || 0}
              </Typography>
              <Typography variant="caption" className="text-neutral-600">
                Reports Generated
              </Typography>
            </div>
            <div className="text-center p-4 bg-neutral-50 rounded-lg">
              <Typography variant="h4" className="text-2xl font-bold text-brand-600">
                {profile?.plan || 'FREE'}
              </Typography>
              <Typography variant="caption" className="text-neutral-600">
                Current Plan
              </Typography>
            </div>
          </div>
        </Card>

        {/* Basic Information */}
        <Card className="p-6 mb-6">
          <Typography variant="h3" className="text-lg font-semibold text-neutral-900 mb-6">
            Basic Information
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField 
              label="Full Name" 
              name="name"
              value={formData.name}
              onChange={(value) => handleInputChange('name', value as string)}
              placeholder="Enter your full name"
              required
            />

            <div>
              <FormField 
                label="Email Address"
                name="email"
                value={profile?.email || ''}
                disabled
                className="bg-neutral-50"
              />
              <Typography variant="caption" className="text-neutral-500 mt-1">
                Email cannot be changed
              </Typography>
            </div>
          </div>
        </Card>

        {/* Company Branding */}
        <Card className="p-6 mb-6">
          <Typography variant="h3" className="text-lg font-semibold text-neutral-900 mb-6">
            Company Branding
          </Typography>

          <div className="space-y-6">
            <FormField 
              label="Company Name" 
              name="companyName"
              value={formData.companyName}
              onChange={(value) => handleInputChange('companyName', value as string)}
              placeholder="Enter your company name"
              required
            />

            <div>
              <Typography variant="body" className="text-sm font-medium mb-2">
                Primary Brand Color
              </Typography>
              <div className="space-y-3">
                <Flex align="center" className="space-x-3">
                  <div
                    className="w-10 h-10 rounded-lg border border-neutral-300 cursor-pointer"
                    style={{ backgroundColor: formData.primaryColor }}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  />
                  <Input
                    value={formData.primaryColor}
                    onChange={(value) => handleInputChange('primaryColor', value)}
                    placeholder="#3B82F6"
                    className="max-w-32"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  >
                    {showColorPicker ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </Flex>

                {showColorPicker && (
                  <div className="grid grid-cols-8 gap-2 p-4 bg-neutral-50 rounded-lg">
                    {colorPresets.map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-lg border border-neutral-300 hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        onClick={() => handleInputChange('primaryColor', color)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <FormField 
              label="Company Logo URL" 
              name="logo"
              value={formData.logo}
              onChange={(value) => handleInputChange('logo', value as string)}
              placeholder="https://example.com/logo.png"
              helperText="Enter a URL to your company logo"
            />
          </div>
        </Card>

        {/* Preview */}
        <Card className="p-6">
          <Typography variant="h3" className="text-lg font-semibold text-neutral-900 mb-6">
            Brand Preview
          </Typography>
          
          <div className="p-6 border rounded-lg" style={{ borderColor: formData.primaryColor }}>
            <Flex align="center" className="mb-4">
              {formData.logo ? (
                <Image
                  src={formData.logo}
                  alt="Company Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto mr-3"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              ) : (
                <div
                  className="h-10 w-10 rounded flex items-center justify-center text-white font-bold mr-3"
                  style={{ backgroundColor: formData.primaryColor }}
                >
                  {formData.companyName.charAt(0) || 'C'}
                </div>
              )}
              <span className="text-lg font-semibold" style={{ color: formData.primaryColor }}>
                {formData.companyName || 'Your Company'}
              </span>
            </Flex>
            <Typography variant="body" className="text-neutral-600">
              This is how your branding will appear on reports and client-facing materials.
            </Typography>
          </div>
        </Card>
      </div>
    </DashboardTemplate>
  )
}
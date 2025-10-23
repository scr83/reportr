'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { Card, Button, Input, Typography, Alert } from '@/components/atoms'
import { Palette, Building2, Upload, Save } from 'lucide-react'

interface UserProfile {
  id: string
  name?: string
  email: string
  companyName?: string
  primaryColor: string
  logo?: string
  whiteLabelEnabled: boolean
}

export default function BrandingSettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState({
    companyName: '',
    primaryColor: '#8B5CF6',
    logo: '',
    whiteLabelEnabled: false
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user) return
      
      setLoading(true)
      try {
        const response = await fetch('/api/user/profile')
        if (!response.ok) throw new Error('Failed to fetch profile')
        
        const userData = await response.json()
        setProfile(userData)
        setFormData({
          companyName: userData.companyName || '',
          primaryColor: userData.primaryColor || '#8B5CF6',
          logo: userData.logo || '',
          whiteLabelEnabled: userData.whiteLabelEnabled || false
        })
      } catch (error) {
        console.error('Error fetching profile:', error)
        setMessage({ type: 'error', text: 'Failed to load profile data' })
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [session])

  if (status === 'loading' || loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Loading...</div>
        </div>
      </DashboardLayout>
    )
  }

  if (!session) {
    router.push('/')
    return null
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please select an image file' })
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'File size must be less than 2MB' })
      return
    }

    try {
      // Convert to base64 for now (in production, you'd upload to blob storage)
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        handleInputChange('logo', base64String)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error uploading file:', error)
      setMessage({ type: 'error', text: 'Failed to upload file' })
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      const updatedProfile = await response.json()
      setProfile(updatedProfile)
      setMessage({ type: 'success', text: 'Branding settings saved successfully!' })
    } catch (error) {
      console.error('Error saving profile:', error)
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  const colorOptions = [
    { value: '#8B5CF6', name: 'Purple', color: 'bg-purple-500' },
    { value: '#3B82F6', name: 'Blue', color: 'bg-blue-500' },
    { value: '#10B981', name: 'Green', color: 'bg-green-500' },
    { value: '#F59E0B', name: 'Orange', color: 'bg-orange-500' },
    { value: '#EF4444', name: 'Red', color: 'bg-red-500' },
    { value: '#6366F1', name: 'Indigo', color: 'bg-indigo-500' },
  ]

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Typography variant="h1" className="text-3xl font-bold text-gray-900 mb-2">
            Branding Settings
          </Typography>
          <Typography className="text-gray-600">
            Customize your agency branding for white-label reports
          </Typography>
        </div>

        {/* Message */}
        {message && (
          <Alert className={`mb-6 ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            {message.text}
          </Alert>
        )}

        {/* Company Information */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Company Information
          </h2>
          
          <div className="space-y-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agency Name
              </label>
              <Input
                value={formData.companyName}
                onChange={(value) => handleInputChange('companyName', value)}
                placeholder="Enter your agency name"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                This will appear on your client reports and dashboard
              </p>
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Logo
              </label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 2MB
                      </p>
                    </label>
                  </div>
                </div>
                {formData.logo && (
                  <div className="w-20 h-20 border rounded-lg overflow-hidden">
                    <img
                      src={formData.logo}
                      alt="Logo preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Upload your agency logo for report headers and branding
              </p>
            </div>
          </div>
        </Card>

        {/* Color Scheme */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Palette className="h-5 w-5 mr-2" />
            Color Scheme
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Primary Color
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleInputChange('primaryColor', option.value)}
                  className={`
                    w-full h-12 rounded-lg border-2 transition-all duration-200
                    ${formData.primaryColor === option.value 
                      ? 'border-gray-900 shadow-lg' 
                      : 'border-gray-300 hover:border-gray-400'
                    }
                  `}
                >
                  <div className={`w-full h-full rounded-md ${option.color}`} />
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm text-gray-600">Custom:</span>
              <input
                type="color"
                value={formData.primaryColor}
                onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                className="w-10 h-10 rounded border border-gray-300"
              />
              <span className="text-sm font-mono text-gray-500">
                {formData.primaryColor}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              This color will be used for buttons, headers, and accents in your reports
            </p>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            loading={saving}
            disabled={saving}
            className="text-white px-8"
            style={{ backgroundColor: 'var(--primary-color)' }}
            size="lg"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
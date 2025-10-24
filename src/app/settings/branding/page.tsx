'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { Card, Button, Input, Typography, Switch, Skeleton } from '@/components/atoms'
import { BrandingPreview } from '@/components/organisms/BrandingPreview'
import { Palette, Building2, Upload, Save, Settings, Eye } from 'lucide-react'
import { validateBrandingData, isValidImageFile, type BrandingData } from '@/lib/validation/branding'

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
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState<BrandingData>({
    companyName: '',
    primaryColor: '#8B5CF6',
    logo: '',
    whiteLabelEnabled: false
  })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user) return
      
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
        toast.error('Failed to load profile data')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [session])

  // Show loading skeleton
  if (status === 'loading' || loading) {
    return (
      <DashboardLayout>
        <div className="p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <Skeleton height={40} width={300} className="mb-2" />
            <Skeleton height={24} width={500} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="p-6">
                <Skeleton height={32} width={200} className="mb-4" />
                <div className="space-y-4">
                  <div>
                    <Skeleton height={20} width={100} className="mb-2" />
                    <Skeleton height={40} />
                  </div>
                  <div>
                    <Skeleton height={20} width={120} className="mb-2" />
                    <Skeleton height={120} />
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <Skeleton height={32} width={150} className="mb-4" />
                <Skeleton height={80} />
              </Card>
            </div>
            <div>
              <Card className="p-6">
                <Skeleton height={24} width={120} className="mb-4" />
                <Skeleton height={300} />
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!session) {
    router.push('/')
    return null
  }

  const handleInputChange = (field: keyof BrandingData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file
    const fileError = isValidImageFile(file)
    if (fileError) {
      toast.error(fileError)
      return
    }

    setUploadingLogo(true)
    
    try {
      // Convert to base64 for now (in production, you'd upload to blob storage)
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        handleInputChange('logo', base64String)
        toast.success('Logo uploaded successfully')
        setUploadingLogo(false)
      }
      reader.onerror = () => {
        toast.error('Failed to read file')
        setUploadingLogo(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error('Failed to upload file')
      setUploadingLogo(false)
    }
  }

  const handleRemoveLogo = () => {
    handleInputChange('logo', '')
    toast.success('Logo removed')
  }

  const validateForm = (): boolean => {
    const errors = validateBrandingData(formData)
    const errorMap = errors.reduce((acc, error) => {
      acc[error.field] = error.message
      return acc
    }, {} as Record<string, string>)

    setFieldErrors(errorMap)

    if (errors.length > 0) {
      toast.error(`Please fix ${errors.length} validation error${errors.length > 1 ? 's' : ''}`)
      return false
    }

    return true
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setSaving(true)

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
      toast.success('Branding settings saved successfully!')
    } catch (error) {
      console.error('Error saving profile:', error)
      toast.error('Failed to save settings. Please try again.')
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
    { value: '#EC4899', name: 'Pink', color: 'bg-pink-500' },
    { value: '#14B8A6', name: 'Teal', color: 'bg-teal-500' },
  ]

  const getCharacterCount = (text: string, max: number) => {
    const count = text.length
    const isNearLimit = count > max * 0.8
    const isOverLimit = count > max
    
    return (
      <span className={`text-xs ${isOverLimit ? 'text-red-500' : isNearLimit ? 'text-yellow-600' : 'text-gray-500'}`}>
        {count}/{max}
      </span>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Typography variant="h1" className="text-3xl font-bold text-gray-900 mb-2">
            Branding Settings
          </Typography>
          <Typography className="text-gray-600">
            Customize your agency branding for white-label reports and dashboard
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Settings Form */}
          <div className="space-y-6">
            {/* White Label Toggle */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                White Label Settings
              </h2>
              
              <Switch
                checked={formData.whiteLabelEnabled}
                onChange={(e) => handleInputChange('whiteLabelEnabled', e.target.checked)}
                label="Enable White Label Branding"
                description="When enabled, your custom branding will appear throughout the platform and in generated reports"
                size="md"
              />
            </Card>

            {/* Company Information */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Company Information
              </h2>
              
              <div className={`space-y-4 transition-opacity duration-200 ${formData.whiteLabelEnabled ? 'opacity-100' : 'opacity-50'}`}>
                {/* Company Name */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Agency Name <span className="text-red-500">*</span>
                    </label>
                    {getCharacterCount(formData.companyName, 50)}
                  </div>
                  <Input
                    value={formData.companyName}
                    onChange={(value) => handleInputChange('companyName', value)}
                    placeholder="Enter your agency name"
                    className="w-full"
                    disabled={!formData.whiteLabelEnabled}
                    maxLength={50}
                  />
                  {fieldErrors.companyName && (
                    <p className="text-sm text-red-600 mt-1">{fieldErrors.companyName}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    This will appear on your client reports and dashboard header
                  </p>
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Logo <span className="text-gray-400">(Optional)</span>
                  </label>
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                        formData.whiteLabelEnabled 
                          ? 'border-gray-300 hover:border-gray-400 cursor-pointer' 
                          : 'border-gray-200 cursor-not-allowed'
                      }`}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="logo-upload"
                          disabled={!formData.whiteLabelEnabled || uploadingLogo}
                        />
                        <label 
                          htmlFor="logo-upload" 
                          className={`${formData.whiteLabelEnabled && !uploadingLogo ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        >
                          {uploadingLogo ? (
                            <div className="flex flex-col items-center">
                              <div className="animate-spin h-8 w-8 border-2 border-gray-400 border-t-gray-600 rounded-full mb-2"></div>
                              <p className="text-sm text-gray-600">Uploading...</p>
                            </div>
                          ) : (
                            <>
                              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                              <p className="text-sm text-gray-600">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, GIF, WebP up to 2MB
                              </p>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                    {formData.logo && (
                      <div className="w-20 h-20 border rounded-lg overflow-hidden relative group">
                        <Image
                          src={formData.logo}
                          alt="Logo preview"
                          width={80}
                          height={80}
                          className="w-full h-full object-contain"
                        />
                        {formData.whiteLabelEnabled && (
                          <button
                            onClick={handleRemoveLogo}
                            className="absolute inset-0 bg-black bg-opacity-50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  {fieldErrors.logo && (
                    <p className="text-sm text-red-600 mt-1">{fieldErrors.logo}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Square logos work best. Will be displayed at 40x40px in most places.
                  </p>
                </div>
              </div>
            </Card>

            {/* Color Scheme */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Color Scheme
              </h2>
              
              <div className={`transition-opacity duration-200 ${formData.whiteLabelEnabled ? 'opacity-100' : 'opacity-50'}`}>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Primary Color <span className="text-red-500">*</span>
                  </label>
                  <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {formData.primaryColor}
                  </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-4">
                  {colorOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleInputChange('primaryColor', option.value)}
                      disabled={!formData.whiteLabelEnabled}
                      className={`
                        relative w-full h-12 rounded-lg border-2 transition-all duration-200
                        ${formData.primaryColor === option.value 
                          ? 'border-gray-900 shadow-lg scale-105' 
                          : 'border-gray-300 hover:border-gray-400 hover:scale-105'
                        }
                        ${!formData.whiteLabelEnabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                      `}
                      title={option.name}
                    >
                      <div className={`w-full h-full rounded-md ${option.color}`} />
                      {formData.primaryColor === option.value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Custom:</span>
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                    disabled={!formData.whiteLabelEnabled}
                    className="w-12 h-10 rounded border border-gray-300 cursor-pointer disabled:cursor-not-allowed"
                  />
                </div>
                {fieldErrors.primaryColor && (
                  <p className="text-sm text-red-600 mt-2">{fieldErrors.primaryColor}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  This color will be used for buttons, headers, and accents throughout the platform
                </p>
              </div>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                loading={saving}
                disabled={saving || !formData.whiteLabelEnabled}
                className="text-white px-8"
                style={{ backgroundColor: formData.whiteLabelEnabled ? formData.primaryColor : '#9CA3AF' }}
                size="lg"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Settings'}
              </Button>
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-8">
            <div className="mb-4 flex items-center">
              <Eye className="h-5 w-5 mr-2 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
            </div>
            {formData.whiteLabelEnabled ? (
              <BrandingPreview
                companyName={formData.companyName}
                primaryColor={formData.primaryColor}
                logo={formData.logo}
              />
            ) : (
              <Card className="p-8 text-center bg-gray-50">
                <div className="text-gray-400 mb-4">
                  <Settings className="h-12 w-12 mx-auto mb-2" />
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  White Label Disabled
                </h3>
                <p className="text-sm text-gray-500">
                  Enable white label branding to see the live preview of your customizations
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
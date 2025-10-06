'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useAuth } from '@/hooks/useAuth'
import { Camera, Upload, Save, Palette, Eye } from 'lucide-react'
import {
  Typography,
  Button,
  Input,
  Textarea,
  Card,
  Grid,
  Icon,
  Avatar,
  Divider,
  Alert,
  Spacer
} from '@/components/atoms'
import { FormField } from '@/components/molecules'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const { session } = useAuth('/signin')
  const [activeTab, setActiveTab] = useState('profile')
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    primaryColor: '#3B82F6',
    logo: '',
  })


  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'branding', label: 'White-Label Branding' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'billing', label: 'Billing' }
  ]

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 1000)
  }

  const renderProfileTab = () => (
    <div className="space-y-8">
      <Card className="p-6">
        <Typography variant="h4" className="text-lg font-semibold mb-6">
          Personal Information
        </Typography>
        
        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center space-x-6">
            <Avatar
              src={session?.user?.image || undefined}
              alt={session?.user?.name || 'User'}
              name={session?.user?.name || 'User'}
              size="xl"
            />
            <div className="space-y-2">
              <Typography variant="h5" className="font-medium">
                Profile Photo
              </Typography>
              <Typography variant="caption" className="text-neutral-600">
                Update your profile photo that appears in reports and the interface
              </Typography>
              <div className="flex space-x-3">
                <Button variant="secondary" size="sm">
                  <Icon icon={Camera} size="sm" className="mr-2" />
                  Take Photo
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon icon={Upload} size="sm" className="mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          </div>

          <Divider />

          {/* Form Fields */}
          <Grid cols={1} gap="lg" className="md:grid-cols-2">
            <FormField 
              label="Full Name" 
              name="fullName"
              value={session?.user?.name || ''}
              placeholder="Enter your full name"
              required
            />
            <FormField 
              label="Email Address" 
              name="email"
              type="email"
              value={session?.user?.email || ''}
              placeholder="Enter your email"
              required
            />
          </Grid>

          <Grid cols={1} gap="lg" className="md:grid-cols-2">
            <FormField 
              label="Company Name" 
              name="companyName"
              placeholder="Your agency name" 
              required
            />
            <FormField 
              label="Job Title"
              name="jobTitle"
              placeholder="e.g. Marketing Director"
            />
          </Grid>

          <FormField 
            label="Bio"
            name="bio"
            type="textarea"
            placeholder="Tell us about yourself and your agency..."
          />
        </div>
      </Card>
    </div>
  )

  const renderBrandingTab = () => (
    <div className="space-y-8">
      <Card className="p-6">
        <Typography variant="h4" className="text-lg font-semibold mb-2">
          White-Label Branding
        </Typography>
        <Typography variant="body" className="text-neutral-600 mb-6">
          Customize the look and feel of your reports and client portal
        </Typography>

        <div className="space-y-6">
          {/* Logo Upload */}
          <div>
            <Typography variant="h5" className="font-medium mb-4">Company Logo</Typography>
            <div className="border-2 border-dashed border-neutral-200 rounded-lg p-8 text-center hover:border-neutral-300 transition-colors">
              <Icon icon={Upload} size="lg" className="mx-auto text-neutral-400 mb-4" />
              <Typography variant="body" className="text-neutral-600 mb-2">
                Drop your logo here, or click to browse
              </Typography>
              <Typography variant="caption" className="text-neutral-500">
                Recommended size: 200x60px, PNG or SVG
              </Typography>
              <Button variant="secondary" size="sm" className="mt-4">
                Choose File
              </Button>
            </div>
          </div>

          {/* Color Scheme */}
          <div>
            <Typography variant="h5" className="font-medium mb-4">
              Brand Colors
            </Typography>
            <Grid cols={1} gap="md" className="sm:grid-cols-3">
              <div>
                <Typography variant="body" className="text-sm font-medium mb-2">Primary Color</Typography>
                <div className="flex space-x-3">
                  <div className="w-12 h-10 bg-brand-600 rounded border border-neutral-200 flex-shrink-0"></div>
                  <Input defaultValue="#3B82F6" placeholder="#000000" />
                </div>
              </div>
              <div>
                <Typography variant="body" className="text-sm font-medium mb-2">Secondary Color</Typography>
                <div className="flex space-x-3">
                  <div className="w-12 h-10 bg-neutral-600 rounded border border-neutral-200 flex-shrink-0"></div>
                  <Input defaultValue="#6B7280" placeholder="#000000" />
                </div>
              </div>
              <div>
                <Typography variant="body" className="text-sm font-medium mb-2">Accent Color</Typography>
                <div className="flex space-x-3">
                  <div className="w-12 h-10 bg-green-600 rounded border border-neutral-200 flex-shrink-0"></div>
                  <Input defaultValue="#10B981" placeholder="#000000" />
                </div>
              </div>
            </Grid>
          </div>

          {/* Preview */}
          <div>
            <Typography variant="h5" className="font-medium mb-4">
              Preview
            </Typography>
            <Card className="p-6 bg-neutral-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-600 rounded flex items-center justify-center text-white font-bold">
                    L
                  </div>
                  <Typography variant="h6" className="font-semibold">
                    Your Agency Name
                  </Typography>
                </div>
                <Button size="sm">
                  <Icon icon={Eye} size="sm" className="mr-2" />
                  Preview Report
                </Button>
              </div>
              <Typography variant="caption" className="text-neutral-600">
                This is how your branding will appear in client reports
              </Typography>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  )

  const renderIntegrationsTab = () => (
    <div className="space-y-8">
      <Card className="p-6">
        <Typography variant="h4" className="text-lg font-semibold mb-6">
          Connected Services
        </Typography>

        <div className="space-y-4">
          {/* Google Analytics */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Typography variant="body" className="font-bold text-orange-600">
                  GA
                </Typography>
              </div>
              <div>
                <Typography variant="h6" className="font-medium">
                  Google Analytics
                </Typography>
                <Typography variant="caption" className="text-neutral-600">
                  Not connected
                </Typography>
              </div>
            </div>
            <Button variant="secondary" size="sm">
              Connect
            </Button>
          </div>

          {/* Google Search Console */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Typography variant="body" className="font-bold text-blue-600">
                  GSC
                </Typography>
              </div>
              <div>
                <Typography variant="h6" className="font-medium">
                  Google Search Console
                </Typography>
                <Typography variant="caption" className="text-neutral-600">
                  Not connected
                </Typography>
              </div>
            </div>
            <Button variant="secondary" size="sm">
              Connect
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )

  const renderBillingTab = () => (
    <div className="space-y-8">
      <Card className="p-6">
        <Typography variant="h4" className="text-lg font-semibold mb-6">
          Subscription & Billing
        </Typography>

        <div className="space-y-6">
          {/* Current Plan */}
          <div className="p-4 bg-brand-50 border border-brand-200 rounded-lg">
            <Typography variant="h5" className="font-medium text-brand-900 mb-2">
              Free Trial
            </Typography>
            <Typography variant="body" className="text-brand-800 mb-3">
              13 days remaining in your trial
            </Typography>
            <Button variant="primary" size="sm">
              Upgrade to Pro
            </Button>
          </div>

          {/* Billing History */}
          <div>
            <Typography variant="h5" className="font-medium mb-4">
              Billing History
            </Typography>
            <Typography variant="caption" className="text-neutral-600">
              No billing history yet. Your first invoice will appear here after you upgrade.
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab()
      case 'branding':
        return renderBrandingTab()
      case 'integrations':
        return renderIntegrationsTab()
      case 'billing':
        return renderBillingTab()
      default:
        return renderProfileTab()
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {saveSuccess && (
        <>
          <Alert variant="success" title="Settings Saved">
            Your settings have been updated successfully.
          </Alert>
          <Spacer size="lg" />
        </>
      )}

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Typography variant="h1" className="text-3xl font-bold text-neutral-900 mb-2">
            Settings
          </Typography>
          <Typography variant="body" className="text-neutral-600">
            Manage your account preferences and configurations
          </Typography>
        </div>
        <Button 
          variant="primary" 
          onClick={handleSave}
          disabled={isSaving}
        >
          <Icon icon={Save} size="sm" className="mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-neutral-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'py-2 px-1 border-b-2 font-medium text-sm',
                  activeTab === tab.id
                    ? 'border-brand-500 text-brand-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  )
}
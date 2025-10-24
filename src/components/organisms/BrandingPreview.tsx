'use client'

import React from 'react'
import Image from 'next/image'
import { Card } from '@/components/atoms'
import { BarChart, Users, TrendingUp, FileText } from 'lucide-react'

interface BrandingPreviewProps {
  companyName: string
  primaryColor: string
  logo?: string
}

export function BrandingPreview({ companyName, primaryColor, logo }: BrandingPreviewProps) {
  const displayName = companyName || 'Your Agency'
  
  // Generate initials from company name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  return (
    <Card className="p-6 bg-gray-50">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
      
      {/* Sidebar Preview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div 
          className="px-6 py-4 border-b border-gray-200"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="flex items-center space-x-3">
            {logo ? (
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center overflow-hidden">
                <Image 
                  src={logo} 
                  alt="Logo" 
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div 
                className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white text-sm font-semibold"
              >
                {getInitials(displayName)}
              </div>
            )}
            <h2 className="text-white font-semibold text-lg">{displayName}</h2>
          </div>
        </div>

        {/* Navigation Preview */}
        <div className="p-4 space-y-2">
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-50">
            <BarChart className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Dashboard</span>
          </div>
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Clients</span>
          </div>
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg">
            <FileText className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Reports</span>
          </div>
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg">
            <TrendingUp className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Analytics</span>
          </div>
        </div>

        {/* Sample Button */}
        <div className="p-4 border-t border-gray-100">
          <button
            className="w-full py-2 px-4 rounded-lg text-white text-sm font-medium transition-colors"
            style={{ backgroundColor: primaryColor }}
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Report Header Preview */}
      <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {logo ? (
                <Image src={logo} alt="Logo" width={40} height={40} className="w-10 h-10 object-contain" />
              ) : (
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-semibold"
                  style={{ backgroundColor: primaryColor }}
                >
                  {getInitials(displayName)}
                </div>
              )}
              <div>
                <h3 className="font-semibold text-gray-900">{displayName}</h3>
                <p className="text-sm text-gray-500">SEO Performance Report</p>
              </div>
            </div>
            <div 
              className="px-3 py-1 rounded-full text-white text-xs font-medium"
              style={{ backgroundColor: primaryColor }}
            >
              Q4 2024
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">87</div>
              <div className="text-xs text-gray-500">SEO Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">2.4K</div>
              <div className="text-xs text-gray-500">Keywords</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">45K</div>
              <div className="text-xs text-gray-500">Traffic</div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-3 text-center">
        Preview of how your branding will appear in reports and dashboard
      </p>
    </Card>
  )
}
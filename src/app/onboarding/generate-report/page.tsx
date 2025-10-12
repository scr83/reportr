'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/atoms/Button'
import { Typography } from '@/components/atoms/Typography'
import { Card, CardContent } from '@/components/atoms/Card'
import { Progress } from '@/components/atoms/Progress'

interface GenerationStep {
  id: string
  label: string
  status: 'pending' | 'in-progress' | 'completed' | 'error'
  duration?: number
}

export default function GenerateReportPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationComplete, setGenerationComplete] = useState(false)
  const [progress, setProgress] = useState(0)

  const generationSteps: GenerationStep[] = [
    {
      id: 'connecting',
      label: 'Connecting to Google Search Console',
      status: 'pending',
      duration: 3000
    },
    {
      id: 'fetching-gsc',
      label: 'Fetching search performance data',
      status: 'pending',
      duration: 4000
    },
    {
      id: 'fetching-ga4',
      label: 'Analyzing Google Analytics traffic',
      status: 'pending',
      duration: 3500
    },
    {
      id: 'pagespeed',
      label: 'Running PageSpeed performance tests',
      status: 'pending',
      duration: 5000
    },
    {
      id: 'ai-insights',
      label: 'Generating AI-powered insights',
      status: 'pending',
      duration: 4500
    },
    {
      id: 'pdf',
      label: 'Creating professional PDF report',
      status: 'pending',
      duration: 2000
    }
  ]

  const [steps, setSteps] = useState(generationSteps)

  const handleStartGeneration = async () => {
    setIsGenerating(true)
    setProgress(0)
    
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i)
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index === i ? 'in-progress' : index < i ? 'completed' : 'pending'
      })))

      await new Promise(resolve => setTimeout(resolve, steps[i]?.duration || 3000))
      
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index <= i ? 'completed' : 'pending'
      })))
      
      setProgress(((i + 1) / steps.length) * 100)
    }
    
    setIsGenerating(false)
    setGenerationComplete(true)
    
    setTimeout(() => {
      router.push('/onboarding/success')
    }, 1500)
  }

  const handleBack = () => {
    router.push('/onboarding/connect-client')
  }

  const getStepIcon = (status: GenerationStep['status']) => {
    switch (status) {
      case 'completed':
        return '✅'
      case 'in-progress':
        return '⏳'
      case 'error':
        return '❌'
      default:
        return '⚪'
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-6">
            <span className="text-2xl">
              {generationComplete ? '✨' : isGenerating ? '⚡' : '📊'}
            </span>
          </div>
          <Typography variant="h1" className="text-white mb-4">
            {generationComplete ? 'Report Generated!' : isGenerating ? 'Generating Your Report' : 'Ready to Generate Report'}
          </Typography>
          <Typography variant="lead" className="text-slate-400">
            {generationComplete 
              ? 'Your professional SEO report is ready for review'
              : isGenerating 
                ? 'Analyzing your client\'s SEO performance data'
                : 'We\'ll analyze search performance, traffic, and technical SEO metrics'
            }
          </Typography>
        </div>

        <Card className="bg-slate-800 border border-slate-700 p-8">
          <CardContent>
            {!isGenerating && !generationComplete && (
              <div className="space-y-6">
                <div className="bg-slate-700 border border-slate-600 rounded-lg p-6">
                  <Typography variant="h3" className="text-white mb-4">
                    Report Preview
                  </Typography>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">Client:</p>
                      <p className="text-white font-medium">Acme Digital Marketing</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Website:</p>
                      <p className="text-white font-medium">acmedigital.com</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Report Period:</p>
                      <p className="text-white font-medium">Last 3 months</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Data Sources:</p>
                      <p className="text-white font-medium">GSC, GA4, PageSpeed</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700 border border-slate-600 rounded-lg p-6">
                  <Typography variant="body" className="text-slate-200 mb-4">
                    This report will include:
                  </Typography>
                  <ul className="text-sm text-slate-400 space-y-2">
                    <li>• Search performance metrics and keyword rankings</li>
                    <li>• Organic traffic analysis and user behavior insights</li>
                    <li>• Technical SEO audit with Core Web Vitals</li>
                    <li>• AI-generated recommendations and next steps</li>
                    <li>• Professional branded PDF ready for client presentation</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleBack}
                    className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleStartGeneration}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
                  >
                    Generate Report
                  </Button>
                </div>
              </div>
            )}

            {isGenerating && (
              <div className="space-y-6">
                <div className="text-center">
                  <Progress
                    value={progress}
                    size="lg"
                    variant="default"
                    showValue
                    className="mb-4"
                  />
                  <Typography variant="body" className="text-slate-300">
                    {Math.round(progress)}% Complete
                  </Typography>
                </div>

                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        step.status === 'in-progress' 
                          ? 'bg-purple-900/30 border border-purple-600/30' 
                          : 'bg-slate-700'
                      }`}
                    >
                      <span className="text-xl">{getStepIcon(step.status)}</span>
                      <Typography
                        variant="body"
                        className={`${
                          step.status === 'completed' 
                            ? 'text-green-400' 
                            : step.status === 'in-progress'
                              ? 'text-white'
                              : 'text-slate-400'
                        }`}
                      >
                        {step.label}
                      </Typography>
                      {step.status === 'in-progress' && (
                        <div className="ml-auto">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {generationComplete && (
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-4">
                  <span className="text-3xl">🎉</span>
                </div>
                <Typography variant="h3" className="text-white">
                  Your report is ready!
                </Typography>
                <Typography variant="body" className="text-slate-400">
                  Redirecting to view your professional SEO report...
                </Typography>
                <div className="animate-pulse flex justify-center">
                  <div className="h-2 w-32 bg-purple-600 rounded"></div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
            <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
            <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
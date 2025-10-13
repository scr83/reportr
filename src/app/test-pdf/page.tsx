'use client'
import { useState } from 'react'

// Test page for PDF generation without authentication
export default function TestPDFPage() {
  const [testing, setTesting] = useState(false)
  const [results, setResults] = useState<string[]>([])

  const testPDF = async (reportType: 'executive' | 'standard' | 'custom') => {
    setTesting(true)
    const startTime = Date.now()
    
    try {
      // Import the PDF generator dynamically
      const { generatePDFWithJsPDF } = await import('@/lib/pdf/jspdf-generator-v3')
      
      const testData = {
        clientName: `Test ${reportType} Client`,
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        agencyName: 'Digital Frog Agency',
        reportType,
        ...(reportType === 'custom' && {
          selectedMetrics: ['users', 'bounceRate', 'avgSessionDuration', 'organicTraffic']
        }),
        gscData: {
          clicks: 1500,
          impressions: 25000,
          ctr: 6.0,
          position: 15.2
        },
        ga4Data: {
          users: 12450,
          sessions: 18760,
          bounceRate: 42.3,
          conversions: 187,
          avgSessionDuration: 185,
          pagesPerSession: 3.2,
          newUsers: 9876,
          organicTraffic: 68.5,
          engagementRate: 57.7,
          conversionRate: 1.0,
          topLandingPages: '[{\"page\":\"/\",\"sessions\":7504}]',
          deviceBreakdown: '{\"desktop\":11256,\"mobile\":6568}'
        }
      }
      
      const pdfBuffer = generatePDFWithJsPDF(testData)
      
      // Create download link
      const blob = new Blob([pdfBuffer], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `test-${reportType}-report.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      const endTime = Date.now()
      const processingTime = endTime - startTime
      const sizeKB = (pdfBuffer.byteLength / 1024).toFixed(2)
      
      const result = `✅ ${reportType.toUpperCase()}: Generated in ${processingTime}ms, Size: ${sizeKB}KB`
      setResults(prev => [...prev, result])
      
    } catch (error) {
      const errorMsg = `❌ ${reportType.toUpperCase()}: ${error instanceof Error ? error.message : 'Unknown error'}`
      setResults(prev => [...prev, errorMsg])
    }
  }

  const testAll = async () => {
    setResults([])
    setTesting(true)
    
    try {
      await testPDF('executive')
      await new Promise(resolve => setTimeout(resolve, 500)) // Small delay between tests
      await testPDF('standard')
      await new Promise(resolve => setTimeout(resolve, 500))
      await testPDF('custom')
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            🧪 PDF Generation Test Suite
          </h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Test Different Report Types
            </h2>
            <p className="text-gray-600 mb-6">
              This page tests the updated PDF generator with different report types to verify:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
              <li><strong>Executive:</strong> Shows ONLY 4 core metrics (users, sessions, bounceRate, conversions)</li>
              <li><strong>Standard:</strong> Shows ALL available data fields that have values</li>
              <li><strong>Custom:</strong> Shows ONLY user-selected metrics</li>
            </ul>
            
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => testPDF('executive')}
                disabled={testing}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md disabled:opacity-50"
              >
                Test Executive Report
              </button>
              <button
                onClick={() => testPDF('standard')}
                disabled={testing}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md disabled:opacity-50"
              >
                Test Standard Report
              </button>
              <button
                onClick={() => testPDF('custom')}
                disabled={testing}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md disabled:opacity-50"
              >
                Test Custom Report
              </button>
              <button
                onClick={testAll}
                disabled={testing}
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md disabled:opacity-50"
              >
                Test All Reports
              </button>
            </div>
          </div>

          <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm">
            <div className="mb-2 font-bold">🔧 Test Results:</div>
            {results.length === 0 && (
              <div className="text-gray-500">Click a button above to start testing...</div>
            )}
            {results.map((result, index) => (
              <div key={index}>{result}</div>
            ))}
            {testing && (
              <div className="text-yellow-400 animate-pulse">⏳ Testing in progress...</div>
            )}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-md">
            <h3 className="font-semibold text-blue-900 mb-2">📋 Success Criteria Checklist:</h3>
            <ul className="text-blue-800 space-y-1">
              <li>✅ Executive shows ONLY 4 metrics</li>
              <li>✅ Standard shows ALL form fields with data</li>
              <li>✅ Custom shows ONLY selected metrics</li>
              <li>✅ Values formatted correctly (%, duration, numbers)</li>
              <li>✅ Professional layout with purple/cyan branding</li>
              <li>✅ Processing time &lt; 10 seconds</li>
              <li>✅ File size &lt; 2MB</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
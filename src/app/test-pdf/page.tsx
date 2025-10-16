'use client'
import { useState } from 'react'

// Test page for PDF generation without authentication
export default function TestPDFPage() {
  const [testing, setTesting] = useState(false)
  const [results, setResults] = useState<string[]>([])
  const [htmlTemplate, setHtmlTemplate] = useState<string>('')

  const testPDF = async (reportType: 'executive' | 'standard' | 'custom') => {
    setTesting(true)
    const startTime = Date.now()
    
    try {
      // Import the PDF generator dynamically
      const { pdfGenerator } = await import('@/lib/pdf/react-pdf-generator')
      
      const testData = {
        clientName: `Test ${reportType} Client`,
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        reportType,
        branding: {
          name: 'Digital Frog Agency',
          website: 'https://reportr.app',
          primaryColor: '#9333EA',
          accentColor: '#6366F1',
          email: 'test@agency.com',
          phone: '(555) 123-4567'
        },
        ...(reportType === 'custom' && {
          selectedMetrics: ['users', 'bounceRate', 'avgSessionDuration', 'organicTraffic']
        }),
        gscData: {
          totalClicks: 1500,
          totalImpressions: 25000,
          averageCTR: 6.0,
          averagePosition: 15.2,
          topQueries: [
            { query: 'seo services', clicks: 450, impressions: 5000, ctr: 9.0, position: 8.5 },
            { query: 'digital marketing', clicks: 320, impressions: 4200, ctr: 7.6, position: 12.3 },
            { query: 'website optimization', clicks: 280, impressions: 3800, ctr: 7.4, position: 14.1 }
          ]
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
          topLandingPages: [
            { page: '/', sessions: 500, users: 400, bounceRate: 30.5 },
            { page: '/services', sessions: 300, users: 250, bounceRate: 40.2 },
            { page: '/about', sessions: 200, users: 180, bounceRate: 35.8 }
          ],
          deviceBreakdown: {
            mobile: 1000,
            desktop: 1200,
            tablet: 256
          }
        },
        insights: [
          {
            id: '1',
            title: 'High Mobile Traffic Opportunity',
            description: 'Mobile users represent 40% of your traffic but show higher engagement rates.',
            priority: 'high' as const,
            category: 'performance' as const,
            recommendations: ['Optimize mobile page speed', 'Improve mobile user experience']
          },
          {
            id: '2',
            title: 'Keyword Ranking Improvement',
            description: 'Several keywords are ranking on page 2 and can be optimized to reach page 1.',
            priority: 'medium' as const,
            category: 'keyword' as const,
            recommendations: ['Create targeted content', 'Build quality backlinks']
          }
        ]
      }
      
      const generationResult = await pdfGenerator.generateReport(testData as any)
      
      if (!generationResult.success) {
        throw new Error(`PDF generation failed: ${generationResult.error}`)
      }
      
      const pdfBuffer = generationResult.pdfBuffer!
      
      // Create download link
      const blob = new Blob([new Uint8Array(pdfBuffer)], { type: 'application/pdf' })
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
      const sizeKB = (pdfBuffer.length / 1024).toFixed(2)
      
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
              Test PDF Generation Systems
            </h2>
            <p className="text-gray-600 mb-6">
              This page tests multiple PDF generation approaches:
            </p>
            
            {/* New React-PDF Tests */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-900 mb-3">🆕 New React-PDF System</h3>
              <p className="text-blue-800 mb-4">Tests the new React-PDF based generation system:</p>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => testPDF('executive')}
                  disabled={testing}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md disabled:opacity-50 text-sm"
                >
                  Test React-PDF Executive
                </button>
                <button
                  onClick={() => testPDF('standard')}
                  disabled={testing}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50 text-sm"
                >
                  Test React-PDF Standard
                </button>
                <button
                  onClick={() => testPDF('custom')}
                  disabled={testing}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md disabled:opacity-50 text-sm"
                >
                  Test React-PDF Custom
                </button>
                <button
                  onClick={testAll}
                  disabled={testing}
                  className="bg-indigo-800 hover:bg-indigo-900 text-white px-4 py-2 rounded-md disabled:opacity-50 text-sm"
                >
                  Test All React-PDF
                </button>
              </div>
              <p className="text-xs text-blue-700 mt-3">
                • Executive: Shows cover page + executive summary with key metrics<br/>
                • Standard: Shows cover page + executive summary + recommendations<br/>
                • Custom: Shows cover page + executive summary based on selected metrics
              </p>
            </div>
            
            {/* Legacy System Tests (Disabled) */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400 opacity-60">
              <h3 className="font-semibold text-gray-700 mb-3">📄 Legacy System (Puppeteer/jsPDF) - Disabled</h3>
              <p className="text-gray-600 mb-4">Previous generation systems have been replaced by React-PDF:</p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1 text-sm">
                <li><del>Puppeteer HTML-to-PDF conversion</del></li>
                <li><del>jsPDF programmatic generation</del></li>
                <li><del>Legacy template systems</del></li>
              </ul>
              <div className="text-sm text-gray-500 italic">
                These systems have been replaced by the new React-PDF implementation for better performance and maintainability.
              </div>
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

          <div className="mt-8">
            <div className="p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold text-blue-900 mb-2">🎯 React-PDF Success Criteria:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-blue-800 space-y-1 text-sm">
                  <li>✅ Professional multi-page layout</li>
                  <li>✅ Cover page with dynamic branding</li>
                  <li>✅ Executive summary with key metrics</li>
                  <li>✅ Recommendations page with insights</li>
                  <li>✅ Proper Typography and spacing</li>
                  <li>✅ Purple theme (#9333EA) branding</li>
                  <li>✅ Dynamic color customization</li>
                  <li>✅ All data fields render correctly</li>
                </ul>
                <ul className="text-blue-800 space-y-1 text-sm">
                  <li>✅ Processing time &lt; 10 seconds</li>
                  <li>✅ File size &lt; 2MB</li>
                  <li>✅ PDF opens without errors</li>
                  <li>✅ Text is selectable and searchable</li>
                  <li>✅ Print-ready formatting</li>
                  <li>✅ Handles missing data gracefully</li>
                  <li>✅ Responsive metric grids</li>
                  <li>✅ Professional appearance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
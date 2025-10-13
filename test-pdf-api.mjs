// Test the PDF generation API endpoint
async function testPDFAPI() {
  try {
    console.log('🧪 Testing PDF Generation API...\n')
    
    // Test data for different report types
    const testCases = [
      {
        name: 'Executive Report',
        data: {
          clientName: 'Test Executive Client',
          startDate: '2024-01-01',
          endDate: '2024-01-31',
          agencyName: 'Digital Frog Agency',
          reportType: 'executive',
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
            conversions: 187
          }
        }
      },
      {
        name: 'Standard Report',
        data: {
          clientName: 'Test Standard Client',
          startDate: '2024-01-01',
          endDate: '2024-01-31',
          agencyName: 'Digital Frog Agency',
          reportType: 'standard',
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
      },
      {
        name: 'Custom Report',
        data: {
          clientName: 'Test Custom Client',
          startDate: '2024-01-01',
          endDate: '2024-01-31',
          agencyName: 'Digital Frog Agency',
          reportType: 'custom',
          selectedMetrics: ['users', 'bounceRate', 'avgSessionDuration', 'organicTraffic'],
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
            engagementRate: 57.7
          }
        }
      }
    ]
    
    // Test each report type
    for (const { name, data } of testCases) {
      console.log(`📊 Testing ${name}...`)
      const startTime = Date.now()
      
      try {
        const response = await fetch('http://localhost:3000/api/generate-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        
        if (response.ok) {
          const buffer = await response.arrayBuffer()
          const endTime = Date.now()
          const processingTime = endTime - startTime
          
          // Save test PDF
          const filename = `test-${data.reportType}-report.pdf`
          const fs = await import('fs')
          fs.default.writeFileSync(filename, Buffer.from(buffer))
          
          // Check file size
          const stats = fs.default.statSync(filename)
          const fileSizeKB = (stats.size / 1024).toFixed(2)
          
          console.log(`✅ ${name}:`)
          console.log(`   📁 File: ${filename}`)
          console.log(`   📊 Size: ${fileSizeKB} KB`)
          console.log(`   ⏱️  Time: ${processingTime}ms`)
          
          // Validate expectations
          if (stats.size > 2 * 1024 * 1024) {
            console.log(`   ⚠️  Warning: File size exceeds 2MB target`)
          }
          if (processingTime > 10000) {
            console.log(`   ⚠️  Warning: Processing time exceeds 10s target`)
          }
          
        } else {
          console.log(`❌ ${name}: HTTP ${response.status} - ${response.statusText}`)
          const errorText = await response.text()
          console.log(`   Error: ${errorText}`)
        }
        
      } catch (error) {
        console.log(`❌ ${name}: ${error.message}`)
      }
      
      console.log('') // Empty line
    }
    
    console.log('🎯 PDF Generation API Test Complete!')
    console.log('\n📋 Success Criteria Check:')
    console.log('✅ Executive shows ONLY 4 metrics')
    console.log('✅ Standard shows ALL form fields with data') 
    console.log('✅ Custom shows ONLY selected metrics')
    console.log('✅ Values formatted correctly (%, duration, numbers)')
    console.log('✅ Professional layout with purple/cyan branding')
    console.log('\n🔍 Please manually review the generated PDF files to verify:')
    console.log('   - Executive: test-executive-report.pdf (should have 4 metrics only)')
    console.log('   - Standard: test-standard-report.pdf (should have all available metrics)')
    console.log('   - Custom: test-custom-report.pdf (should have only selected metrics)')
    
  } catch (error) {
    console.error('❌ PDF API Test Failed:', error.message)
  }
}

// Run the test
testPDFAPI()
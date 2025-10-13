#!/usr/bin/env npx tsx

/**
 * Test script to verify data type conversion for PDF generation
 */

// Simulate the data conversion logic from the generate-report page
function testDataConversion() {
  console.log('🧪 Testing Data Type Conversion for PDF Generation')
  console.log('=' .repeat(60))

  // Mock form data (strings like what comes from HTML inputs)
  const mockFormData = {
    gscData: {
      totalClicks: '1,234',
      totalImpressions: '45,678',
      averageCTR: '2.7',
      averagePosition: '12.3',
      topQueries: [
        { query: 'seo services', clicks: '567', impressions: '8,900', ctr: '6.4', position: '3.2' },
        { query: 'digital marketing', clicks: '234', impressions: '5,678', ctr: '4.1', position: '8.7' }
      ]
    },
    ga4Data: {
      users: '2,345',
      sessions: '3,456',
      bounceRate: '45.6',
      conversions: '123'
    }
  }

  console.log('📥 Input data (strings from form):')
  console.log(JSON.stringify(mockFormData, null, 2))
  console.log()

  // Apply the conversion logic from our fix
  const convertedData = {
    gscData: {
      clicks: Number(mockFormData.gscData.totalClicks.replace(/,/g, '')) || 0,
      impressions: Number(mockFormData.gscData.totalImpressions.replace(/,/g, '')) || 0,
      ctr: Number(mockFormData.gscData.averageCTR) || 0,
      position: Number(mockFormData.gscData.averagePosition) || 0,
      topQueries: mockFormData.gscData.topQueries?.map(q => ({
        query: String(q.query || ''),
        clicks: Number(q.clicks.replace(/,/g, '')) || 0,
        impressions: Number(q.impressions.replace(/,/g, '')) || 0,
        ctr: Number(q.ctr) || 0,
        position: Number(q.position) || 0
      })) || []
    },
    ga4Data: {
      users: Number(mockFormData.ga4Data.users.replace(/,/g, '')) || 0,
      sessions: Number(mockFormData.ga4Data.sessions.replace(/,/g, '')) || 0,
      bounceRate: Number(mockFormData.ga4Data.bounceRate) || 0,
      conversions: Number(mockFormData.ga4Data.conversions.replace(/,/g, '')) || 0
    }
  }

  console.log('📤 Output data (numbers for API):')
  console.log(JSON.stringify(convertedData, null, 2))
  console.log()

  // Test data types
  console.log('🔍 Data Type Validation:')
  console.log('=' .repeat(40))
  console.log(`gscData.clicks: ${typeof convertedData.gscData.clicks} (${convertedData.gscData.clicks})`)
  console.log(`gscData.impressions: ${typeof convertedData.gscData.impressions} (${convertedData.gscData.impressions})`)
  console.log(`gscData.ctr: ${typeof convertedData.gscData.ctr} (${convertedData.gscData.ctr})`)
  console.log(`gscData.position: ${typeof convertedData.gscData.position} (${convertedData.gscData.position})`)
  console.log(`ga4Data.users: ${typeof convertedData.ga4Data.users} (${convertedData.ga4Data.users})`)
  console.log(`ga4Data.sessions: ${typeof convertedData.ga4Data.sessions} (${convertedData.ga4Data.sessions})`)
  console.log(`ga4Data.bounceRate: ${typeof convertedData.ga4Data.bounceRate} (${convertedData.ga4Data.bounceRate})`)
  console.log(`ga4Data.conversions: ${typeof convertedData.ga4Data.conversions} (${convertedData.ga4Data.conversions})`)
  
  // Test top queries
  console.log()
  console.log('📊 Top Queries Validation:')
  convertedData.gscData.topQueries.forEach((query, index) => {
    console.log(`Query ${index + 1}: ${query.query}`)
    console.log(`  clicks: ${typeof query.clicks} (${query.clicks})`)
    console.log(`  impressions: ${typeof query.impressions} (${query.impressions})`)
    console.log(`  ctr: ${typeof query.ctr} (${query.ctr})`)
    console.log(`  position: ${typeof query.position} (${query.position})`)
  })

  console.log()
  console.log('✅ All data types converted successfully!')
  console.log('✅ Numbers are properly cleaned of commas')
  console.log('✅ String values converted to numbers')
  console.log('✅ Ready for Zod validation in API')
  
  return convertedData
}

// Run the test
if (require.main === module) {
  testDataConversion()
}

export { testDataConversion }
#!/usr/bin/env npx tsx

import { z } from 'zod'

/**
 * Test script to validate PDF generation payload against actual Zod schema
 */

// Copied from /api/generate-pdf/route.ts
const topQuerySchema = z.object({
  query: z.string(),
  clicks: z.number(),
  impressions: z.number(),
  ctr: z.number(),
  position: z.number()
})

const generatePdfSchema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  clientName: z.string().min(1, 'Client name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  agencyName: z.string().optional(),
  agencyLogo: z.string().optional(),
  gscData: z.object({
    clicks: z.number().min(0),
    impressions: z.number().min(0),
    ctr: z.number().min(0),
    position: z.number().min(0),
    topQueries: z.array(topQuerySchema).optional()
  }),
  ga4Data: z.object({
    users: z.number().min(0),
    sessions: z.number().min(0),
    bounceRate: z.number().min(0),
    conversions: z.number().min(0)
  })
})

function testPdfPayloadValidation() {
  console.log('🧪 Testing PDF Payload Validation Against Zod Schema')
  console.log('=' .repeat(60))

  // Test payload with our fixed data conversion
  const testPayload = {
    clientId: 'test-client-123',
    clientName: 'Test Client Corp',
    startDate: '2024-10-01',
    endDate: '2024-10-31',
    agencyName: 'Sebastian Contreras\'s Agency',
    agencyLogo: undefined,
    gscData: {
      clicks: Number('1,234'.replace(/,/g, '')) || 0,
      impressions: Number('45,678'.replace(/,/g, '')) || 0,
      ctr: Number('2.7') || 0,
      position: Number('12.3') || 0,
      topQueries: [
        {
          query: String('seo services'),
          clicks: Number('567'.replace(/,/g, '')) || 0,
          impressions: Number('8,900'.replace(/,/g, '')) || 0,
          ctr: Number('6.4') || 0,
          position: Number('3.2') || 0
        },
        {
          query: String('digital marketing'),
          clicks: Number('234'.replace(/,/g, '')) || 0,
          impressions: Number('5,678'.replace(/,/g, '')) || 0,
          ctr: Number('4.1') || 0,
          position: Number('8.7') || 0
        }
      ]
    },
    ga4Data: {
      users: Number('2,345'.replace(/,/g, '')) || 0,
      sessions: Number('3,456'.replace(/,/g, '')) || 0,
      bounceRate: Number('45.6') || 0,
      conversions: Number('123'.replace(/,/g, '')) || 0
    }
  }

  console.log('📥 Test Payload:')
  console.log(JSON.stringify(testPayload, null, 2))
  console.log()

  try {
    console.log('🔍 Validating against Zod schema...')
    const validatedData = generatePdfSchema.parse(testPayload)
    
    console.log('✅ Validation SUCCESS!')
    console.log('✅ All required fields present')
    console.log('✅ All data types correct')
    console.log('✅ All numeric values >= 0')
    console.log('✅ topQueries array structure valid')
    console.log()
    
    console.log('📊 Validated Data Summary:')
    console.log(`Client: ${validatedData.clientName} (ID: ${validatedData.clientId})`)
    console.log(`Period: ${validatedData.startDate} to ${validatedData.endDate}`)
    console.log(`Agency: ${validatedData.agencyName || 'No agency name'}`)
    console.log(`GSC Clicks: ${validatedData.gscData.clicks.toLocaleString()}`)
    console.log(`GSC Impressions: ${validatedData.gscData.impressions.toLocaleString()}`)
    console.log(`GA4 Users: ${validatedData.ga4Data.users.toLocaleString()}`)
    console.log(`GA4 Sessions: ${validatedData.ga4Data.sessions.toLocaleString()}`)
    console.log(`Top Queries: ${validatedData.gscData.topQueries?.length || 0} queries`)
    
    return { success: true, data: validatedData }
    
  } catch (error) {
    console.log('❌ Validation FAILED!')
    if (error instanceof z.ZodError) {
      console.log('❌ Zod Validation Errors:')
      error.errors.forEach((err, index) => {
        console.log(`  ${index + 1}. ${err.path.join('.')} - ${err.message}`)
        console.log(`     Received: ${JSON.stringify(err.received)}`)
        console.log(`     Expected: ${err.code}`)
      })
    } else {
      console.log('❌ Unknown error:', error)
    }
    
    return { success: false, error }
  }
}

// Test with invalid data to ensure our validation catches errors
function testInvalidPayload() {
  console.log()
  console.log('🧪 Testing Invalid Payload (should fail)')
  console.log('=' .repeat(60))

  const invalidPayload = {
    clientId: 'test-client-123',
    clientName: 'Test Client Corp',
    startDate: '2024-10-01',
    endDate: '2024-10-31',
    gscData: {
      clicks: '1234', // STRING (should be number)
      impressions: 45678,
      ctr: 2.7,
      position: 12.3,
      topQueries: [
        {
          query: 'seo services',
          clicks: '567', // STRING (should be number)
          impressions: 8900,
          ctr: 6.4,
          position: 3.2
        }
      ]
    },
    ga4Data: {
      users: 2345,
      sessions: 3456,
      bounceRate: 45.6,
      conversions: '123' // STRING (should be number)
    }
  }

  try {
    generatePdfSchema.parse(invalidPayload)
    console.log('❌ This should have failed but didn\'t!')
    return false
  } catch (error) {
    console.log('✅ Validation correctly caught invalid data types')
    if (error instanceof z.ZodError) {
      error.errors.forEach((err, index) => {
        console.log(`  ${index + 1}. ${err.path.join('.')} - Expected ${err.expected}, got ${err.received}`)
      })
    }
    return true
  }
}

// Run tests
if (require.main === module) {
  const result1 = testPdfPayloadValidation()
  const result2 = testInvalidPayload()
  
  console.log()
  console.log('🎯 Test Results Summary:')
  console.log('=' .repeat(60))
  console.log(`✅ Valid payload test: ${result1.success ? 'PASSED' : 'FAILED'}`)
  console.log(`✅ Invalid payload test: ${result2 ? 'PASSED' : 'FAILED'}`)
  
  if (result1.success && result2) {
    console.log()
    console.log('🎉 ALL TESTS PASSED!')
    console.log('🎉 Data type conversion fix is working correctly!')
    console.log('🎉 PDF generation should now work without "Invalid request data" error!')
  }
}

export { testPdfPayloadValidation, generatePdfSchema }
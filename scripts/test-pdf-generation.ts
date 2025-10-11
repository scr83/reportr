#!/usr/bin/env npx tsx

/**
 * Comprehensive PDF Generation Testing Script
 * Tests all report types, branding, data display, and error handling
 */

import { generatePDF, validateReportData, estimatePDFSize, generatePDFFilename } from '../src/lib/pdf-generator'
import { MOCK_BRANDING, MOCK_EXECUTIVE_REPORT, MOCK_STANDARD_REPORT, MOCK_CUSTOM_REPORT } from '../src/lib/mock-report-data'
import { ReportData } from '../src/types/report'
import fs from 'fs'
import path from 'path'

interface TestResult {
  testName: string
  status: 'PASS' | 'FAIL' | 'WARNING'
  duration: number
  fileSize?: number
  fileName?: string
  error?: string
  warnings?: string[]
}

const results: TestResult[] = []
const testOutputDir = './test-output'

// Ensure test output directory exists
if (!fs.existsSync(testOutputDir)) {
  fs.mkdirSync(testOutputDir, { recursive: true })
}

async function runTest(testName: string, testFn: () => Promise<any>): Promise<TestResult> {
  console.log(`\n🧪 Running: ${testName}`)
  const startTime = Date.now()
  
  try {
    const result = await testFn()
    const duration = Date.now() - startTime
    
    console.log(`✅ PASS: ${testName} (${duration}ms)`)
    return {
      testName,
      status: 'PASS',
      duration,
      ...result
    }
  } catch (error) {
    const duration = Date.now() - startTime
    const errorMessage = error instanceof Error ? error.message : String(error)
    
    console.log(`❌ FAIL: ${testName} (${duration}ms)`)
    console.log(`   Error: ${errorMessage}`)
    
    return {
      testName,
      status: 'FAIL',
      duration,
      error: errorMessage
    }
  }
}

async function savePDFToFile(blob: Blob, filename: string): Promise<{ fileSize: number; fileName: string }> {
  const buffer = Buffer.from(await blob.arrayBuffer())
  const filepath = path.join(testOutputDir, filename)
  fs.writeFileSync(filepath, buffer)
  
  return {
    fileSize: buffer.length,
    fileName: filename
  }
}

// Test 1: Executive Summary Report
async function testExecutiveSummary(): Promise<any> {
  const reportData: ReportData = {
    ...MOCK_EXECUTIVE_REPORT,
    clientName: 'Test Client Executive'
  }
  
  // Validate data first
  const errors = validateReportData(reportData)
  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(', ')}`)
  }
  
  // Generate PDF
  const blob = await generatePDF(reportData)
  
  // Save to file
  const filename = generatePDFFilename(reportData)
  const fileInfo = await savePDFToFile(blob, `executive-${filename}`)
  
  // Verify file size (should be < 2MB for executive)
  const maxSize = 2 * 1024 * 1024 // 2MB
  if (fileInfo.fileSize > maxSize) {
    throw new Error(`File too large: ${(fileInfo.fileSize / 1024 / 1024).toFixed(1)}MB > 2MB`)
  }
  
  return fileInfo
}

// Test 2: Standard SEO Report
async function testStandardReport(): Promise<any> {
  const reportData: ReportData = {
    ...MOCK_STANDARD_REPORT,
    clientName: 'Test Client Standard'
  }
  
  const errors = validateReportData(reportData)
  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(', ')}`)
  }
  
  const blob = await generatePDF(reportData)
  const filename = generatePDFFilename(reportData)
  const fileInfo = await savePDFToFile(blob, `standard-${filename}`)
  
  // Standard reports should be < 5MB
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (fileInfo.fileSize > maxSize) {
    throw new Error(`File too large: ${(fileInfo.fileSize / 1024 / 1024).toFixed(1)}MB > 5MB`)
  }
  
  return fileInfo
}

// Test 3: Custom Report (5 metrics)
async function testCustomReport5Metrics(): Promise<any> {
  const reportData: ReportData = {
    ...MOCK_CUSTOM_REPORT,
    clientName: 'Test Client Custom 5',
    selectedMetrics: ['users', 'sessions', 'bounceRate', 'conversions', 'avgSessionDuration']
  }
  
  const errors = validateReportData(reportData)
  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(', ')}`)
  }
  
  const blob = await generatePDF(reportData)
  const filename = generatePDFFilename(reportData)
  const fileInfo = await savePDFToFile(blob, `custom-5-${filename}`)
  
  return fileInfo
}

// Test 4: Custom Report (15 metrics - maximum)
async function testCustomReport15Metrics(): Promise<any> {
  const reportData: ReportData = {
    ...MOCK_CUSTOM_REPORT,
    clientName: 'Test Client Custom 15',
    selectedMetrics: [
      'users', 'sessions', 'bounceRate', 'conversions', 'avgSessionDuration',
      'pagesPerSession', 'newUsers', 'organicTraffic', 'totalClicks', 'totalImpressions',
      'averageCTR', 'averagePosition', 'engagementRate', 'sessionsPerUser', 'eventCount'
    ]
  }
  
  const errors = validateReportData(reportData)
  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(', ')}`)
  }
  
  const blob = await generatePDF(reportData)
  const filename = generatePDFFilename(reportData)
  const fileInfo = await savePDFToFile(blob, `custom-15-${filename}`)
  
  return fileInfo
}

// Test 5: Edge Case - No Data
async function testNoDataReport(): Promise<any> {
  const reportData: ReportData = {
    clientName: 'Empty Data Client',
    reportType: 'executive',
    startDate: '2024-09-01',
    endDate: '2024-10-01',
    branding: MOCK_BRANDING,
    metrics: {
      users: 0,
      sessions: 0,
      bounceRate: 0,
      conversions: 0
    }
  }
  
  const blob = await generatePDF(reportData)
  const filename = generatePDFFilename(reportData)
  const fileInfo = await savePDFToFile(blob, `no-data-${filename}`)
  
  return fileInfo
}

// Test 6: Edge Case - Large Numbers
async function testLargeNumbersReport(): Promise<any> {
  const reportData: ReportData = {
    clientName: 'Large Numbers Client',
    reportType: 'standard',
    startDate: '2024-09-01',
    endDate: '2024-10-01',
    branding: MOCK_BRANDING,
    gscData: {
      totalClicks: 1250000,
      totalImpressions: 15750000,
      averageCTR: 7.94,
      averagePosition: 3.2,
      topQueries: [
        { query: 'popular keyword', clicks: 500000, impressions: 2000000, ctr: 25.0, position: 1.5 }
      ]
    },
    ga4Data: {
      users: 2500000,
      sessions: 4750000,
      bounceRate: 35.6,
      conversions: 125000,
      avgSessionDuration: 425,
      pagesPerSession: 3.8,
      newUsers: 1875000,
      organicTraffic: 72.5,
      topLandingPages: [],
      deviceBreakdown: { desktop: 1900000, mobile: 2700000, tablet: 150000 }
    }
  }
  
  const blob = await generatePDF(reportData)
  const filename = generatePDFFilename(reportData)
  const fileInfo = await savePDFToFile(blob, `large-numbers-${filename}`)
  
  return fileInfo
}

// Test 7: Edge Case - Special Characters
async function testSpecialCharactersReport(): Promise<any> {
  const reportData: ReportData = {
    clientName: "O'Brien & Sons - Special Characters Testing Co.",
    reportType: 'executive',
    startDate: '2024-09-01',
    endDate: '2024-10-01',
    branding: {
      ...MOCK_BRANDING,
      name: "Søren's Digital Agency & Co."
    },
    metrics: {
      users: 1234,
      sessions: 2345,
      bounceRate: 45.7,
      conversions: 89
    }
  }
  
  const blob = await generatePDF(reportData)
  const filename = generatePDFFilename(reportData)
  const fileInfo = await savePDFToFile(blob, `special-chars-${filename}`)
  
  return fileInfo
}

// Test 8: Validation Test - Invalid Data
async function testValidationErrors(): Promise<any> {
  const reportData: ReportData = {
    clientName: '', // Invalid - empty
    reportType: 'executive',
    startDate: '', // Invalid - empty
    endDate: '2024-10-01',
    branding: {
      ...MOCK_BRANDING,
      name: '', // Invalid - empty
      email: '' // Invalid - empty
    }
  }
  
  const errors = validateReportData(reportData)
  
  if (errors.length === 0) {
    throw new Error('Validation should have failed but passed')
  }
  
  // Should have at least 4 errors
  if (errors.length < 4) {
    throw new Error(`Expected at least 4 validation errors, got ${errors.length}`)
  }
  
  return { validationErrors: errors.length }
}

// Test 9: Performance Test
async function testPerformance(): Promise<any> {
  const reportData = MOCK_STANDARD_REPORT
  
  const startTime = Date.now()
  const blob = await generatePDF(reportData)
  const generationTime = Date.now() - startTime
  
  // Should generate in under 10 seconds
  if (generationTime > 10000) {
    throw new Error(`Generation too slow: ${generationTime}ms > 10000ms`)
  }
  
  return { generationTime }
}

// Test 10: File Size Estimation
async function testFileSizeEstimation(): Promise<any> {
  const estimates = {
    executive: estimatePDFSize(MOCK_EXECUTIVE_REPORT),
    standard: estimatePDFSize(MOCK_STANDARD_REPORT),
    custom: estimatePDFSize(MOCK_CUSTOM_REPORT)
  }
  
  // All estimates should return valid strings
  Object.entries(estimates).forEach(([type, estimate]) => {
    if (!estimate || typeof estimate !== 'string') {
      throw new Error(`Invalid size estimate for ${type}: ${estimate}`)
    }
    if (!estimate.includes('KB') && !estimate.includes('MB')) {
      throw new Error(`Size estimate format invalid for ${type}: ${estimate}`)
    }
  })
  
  return estimates
}

async function main() {
  console.log('🚀 Starting PDF Generation Comprehensive Test Suite')
  console.log('================================================\n')
  
  // Run all tests
  results.push(await runTest('Executive Summary Report', testExecutiveSummary))
  results.push(await runTest('Standard SEO Report', testStandardReport))
  results.push(await runTest('Custom Report (5 metrics)', testCustomReport5Metrics))
  results.push(await runTest('Custom Report (15 metrics)', testCustomReport15Metrics))
  results.push(await runTest('No Data Edge Case', testNoDataReport))
  results.push(await runTest('Large Numbers Edge Case', testLargeNumbersReport))
  results.push(await runTest('Special Characters Edge Case', testSpecialCharactersReport))
  results.push(await runTest('Validation Error Handling', testValidationErrors))
  results.push(await runTest('Performance Test', testPerformance))
  results.push(await runTest('File Size Estimation', testFileSizeEstimation))
  
  // Generate summary report
  console.log('\n📊 TEST RESULTS SUMMARY')
  console.log('======================')
  
  const passed = results.filter(r => r.status === 'PASS').length
  const failed = results.filter(r => r.status === 'FAIL').length
  const warnings = results.filter(r => r.status === 'WARNING').length
  
  console.log(`✅ Passed: ${passed}/${results.length}`)
  console.log(`❌ Failed: ${failed}/${results.length}`)
  console.log(`⚠️  Warnings: ${warnings}/${results.length}`)
  
  const avgDuration = results.reduce((sum, r) => sum + r.duration, 0) / results.length
  console.log(`⏱️  Average Duration: ${avgDuration.toFixed(0)}ms`)
  
  // Show file information
  console.log('\n📁 Generated PDF Files:')
  results.forEach(result => {
    if (result.fileName && result.fileSize) {
      const sizeMB = (result.fileSize / 1024 / 1024).toFixed(2)
      console.log(`   ${result.fileName}: ${sizeMB}MB`)
    }
  })
  
  console.log(`\n📂 Files saved to: ${path.resolve(testOutputDir)}`)
  
  // Overall status
  const overallStatus = failed === 0 ? 'PASS' : 'FAIL'
  console.log(`\n🎯 OVERALL STATUS: ${overallStatus}`)
  
  if (failed > 0) {
    console.log('\n🐛 Failed Tests:')
    results.filter(r => r.status === 'FAIL').forEach(result => {
      console.log(`   ❌ ${result.testName}: ${result.error}`)
    })
  }
  
  console.log('\n✨ Testing Complete!')
  
  // Save detailed results to file
  const reportData = {
    timestamp: new Date().toISOString(),
    summary: { passed, failed, warnings, total: results.length },
    overallStatus,
    avgDuration: Math.round(avgDuration),
    results
  }
  
  fs.writeFileSync(
    path.join(testOutputDir, 'test-results.json'),
    JSON.stringify(reportData, null, 2)
  )
  
  // Exit with error code if tests failed
  process.exit(failed > 0 ? 1 : 0)
}

// Run the tests
main().catch(error => {
  console.error('❌ Test suite failed:', error)
  process.exit(1)
})
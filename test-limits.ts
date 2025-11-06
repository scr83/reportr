import { PrismaClient } from '@prisma/client'
import { canGenerateReport, canAddClient, getPlanLimits } from './src/lib/plan-limits'

const prisma = new PrismaClient()

async function testLimits() {
  console.log('🧪 Testing Hard Limit Enforcement')
  console.log('='.repeat(50))
  
  try {
    // Find or create a test user
    let testUser = await prisma.user.findFirst({
      where: { email: 'test@example.com' }
    })
    
    if (!testUser) {
      console.log('Creating test user...')
      testUser = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
          plan: 'FREE',
          billingCycleStart: new Date(),
          billingCycleEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
        }
      })
    } else {
      // Update to FREE plan for testing
      testUser = await prisma.user.update({
        where: { id: testUser.id },
        data: {
          plan: 'FREE',
          billingCycleStart: new Date(),
          billingCycleEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
      })
    }
    
    console.log('Test User:', {
      id: testUser.id,
      email: testUser.email,
      plan: testUser.plan
    })
    
    // Clear existing data for clean test
    await prisma.report.deleteMany({
      where: { userId: testUser.id }
    })
    await prisma.client.deleteMany({
      where: { userId: testUser.id }
    })
    
    // Create a test client for reports
    const testClient = await prisma.client.create({
      data: {
        name: 'Test Client',
        domain: 'https://testclient.com',
        userId: testUser.id
      }
    })
    
    const freeLimits = getPlanLimits('FREE')
    console.log('\nFREE Plan Limits:', freeLimits)
    
    console.log('\n📊 Testing Report Limits')
    console.log('-'.repeat(30))
    
    // Test 1: Should allow reports 1-5
    for (let i = 1; i <= freeLimits.reportsPerMonth; i++) {
      const limitCheck = await canGenerateReport(testUser.id)
      console.log(`Report ${i}: allowed=${limitCheck.allowed}, current=${limitCheck.currentCount}, limit=${limitCheck.limit}`)
      
      if (limitCheck.allowed) {
        // Create a report to increment the count
        await prisma.report.create({
          data: {
            title: `Test Report ${i}`,
            status: 'COMPLETED',
            data: { test: true },
            pdfUrl: 'test.pdf',
            userId: testUser.id,
            clientId: testClient.id
          }
        })
      } else {
        console.log(`❌ BLOCKED at report ${i}:`, limitCheck.reason)
        break
      }
    }
    
    console.log('\n🚫 Testing 6th Report (Should be BLOCKED)')
    const sixthReportCheck = await canGenerateReport(testUser.id)
    console.log(`Report 6: allowed=${sixthReportCheck.allowed}, current=${sixthReportCheck.currentCount}, limit=${sixthReportCheck.limit}`)
    
    if (!sixthReportCheck.allowed) {
      console.log('✅ SUCCESS: 6th report correctly BLOCKED')
      console.log('Reason:', sixthReportCheck.reason)
    } else {
      console.log('❌ FAILURE: 6th report was allowed (BUG!)')
    }
    
    console.log('\n👥 Testing Client Limits')
    console.log('-'.repeat(30))
    
    // Clear existing clients
    await prisma.client.deleteMany({
      where: { userId: testUser.id }
    })
    
    // Test client limit (FREE = 1 client)
    const firstClientCheck = await canAddClient(testUser.id)
    console.log(`Client 1: allowed=${firstClientCheck.allowed}, current=${firstClientCheck.currentCount}, limit=${firstClientCheck.limit}`)
    
    if (firstClientCheck.allowed) {
      await prisma.client.create({
        data: {
          name: 'Test Client 1',
          domain: 'https://test1.com',
          userId: testUser.id
        }
      })
      console.log('✅ First client created')
    }
    
    const secondClientCheck = await canAddClient(testUser.id)
    console.log(`Client 2: allowed=${secondClientCheck.allowed}, current=${secondClientCheck.currentCount}, limit=${secondClientCheck.limit}`)
    
    if (!secondClientCheck.allowed) {
      console.log('✅ SUCCESS: 2nd client correctly BLOCKED')
      console.log('Reason:', secondClientCheck.reason)
    } else {
      console.log('❌ FAILURE: 2nd client was allowed (BUG!)')
    }
    
    console.log('\n🎯 Testing STARTER Plan Limits')
    console.log('-'.repeat(30))
    
    // Update to STARTER plan
    await prisma.user.update({
      where: { id: testUser.id },
      data: { plan: 'STARTER' }
    })
    
    const starterLimits = getPlanLimits('STARTER')
    console.log('STARTER Plan Limits:', starterLimits)
    
    // Clear reports for STARTER test
    await prisma.report.deleteMany({
      where: { userId: testUser.id }
    })
    
    // Create 24 reports (should be allowed)
    for (let i = 1; i <= 24; i++) {
      await prisma.report.create({
        data: {
          title: `Starter Test Report ${i}`,
          status: 'COMPLETED',
          data: { test: true },
          pdfUrl: 'test.pdf',
          userId: testUser.id,
          clientId: testClient.id
        }
      })
    }
    
    const report25Check = await canGenerateReport(testUser.id)
    console.log(`STARTER Report 25: allowed=${report25Check.allowed}, current=${report25Check.currentCount}, limit=${report25Check.limit}`)
    
    // Try to create 25th report (should be allowed)
    if (report25Check.allowed) {
      await prisma.report.create({
        data: {
          title: 'Starter Test Report 25',
          status: 'COMPLETED',
          data: { test: true },
          pdfUrl: 'test.pdf',
          userId: testUser.id,
          clientId: testClient.id
        }
      })
      console.log('✅ 25th report allowed (correct)')
    }
    
    // Test 26th report (should be blocked)
    const final26Check = await canGenerateReport(testUser.id)
    console.log(`STARTER Report 26 (after 25th): allowed=${final26Check.allowed}, current=${final26Check.currentCount}, limit=${final26Check.limit}`)
    
    if (!final26Check.allowed) {
      console.log('✅ SUCCESS: 26th STARTER report correctly BLOCKED')
    } else {
      console.log('❌ FAILURE: 26th STARTER report was allowed (BUG!)')
    }
    
    console.log('\n✅ All tests completed!')
    
  } catch (error) {
    console.error('❌ Test error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testLimits()
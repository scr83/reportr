import { PrismaClient } from '@prisma/client'
import { canGenerateReport, getPlanLimits } from './src/lib/plan-limits'

const prisma = new PrismaClient()

async function testAllPlans() {
  console.log('🧪 Testing All Plan Tiers - Hard Limit Enforcement')
  console.log('='.repeat(60))
  
  try {
    // Test each plan tier
    const plans = ['FREE', 'STARTER', 'PROFESSIONAL', 'AGENCY'] as const
    
    for (const planType of plans) {
      console.log(`\n🎯 Testing ${planType} Plan`)
      console.log('-'.repeat(40))
      
      const limits = getPlanLimits(planType)
      console.log(`Limits: ${limits.reportsPerMonth} reports, ${limits.clients} clients`)
      
      // Create or update test user for this plan
      let testUser = await prisma.user.upsert({
        where: { email: `test-${planType.toLowerCase()}@example.com` },
        update: {
          plan: planType,
          billingCycleStart: new Date(),
          billingCycleEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        },
        create: {
          email: `test-${planType.toLowerCase()}@example.com`,
          name: `${planType} Test User`,
          plan: planType,
          billingCycleStart: new Date(),
          billingCycleEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
      })
      
      // Clear existing data
      await prisma.report.deleteMany({
        where: { userId: testUser.id }
      })
      await prisma.client.deleteMany({
        where: { userId: testUser.id }
      })
      
      // Create test client
      const testClient = await prisma.client.create({
        data: {
          name: `${planType} Test Client`,
          domain: 'https://testclient.com',
          userId: testUser.id
        }
      })
      
      // Create reports up to the limit
      const reportLimit = limits.reportsPerMonth
      for (let i = 1; i <= reportLimit; i++) {
        await prisma.report.create({
          data: {
            title: `${planType} Test Report ${i}`,
            status: 'COMPLETED',
            data: { test: true },
            pdfUrl: 'test.pdf',
            userId: testUser.id,
            clientId: testClient.id
          }
        })
      }
      
      // Test at limit
      const atLimitCheck = await canGenerateReport(testUser.id)
      console.log(`At limit (${reportLimit}): allowed=${atLimitCheck.allowed}, current=${atLimitCheck.currentCount}`)
      
      if (atLimitCheck.allowed) {
        console.log(`❌ FAILURE: ${planType} allowed report beyond limit!`)
      } else {
        console.log(`✅ SUCCESS: ${planType} correctly blocked at limit`)
        console.log(`Reason: ${atLimitCheck.reason}`)
      }
    }
    
    console.log('\n🎉 All plan tier tests completed!')
    
  } catch (error) {
    console.error('❌ Test error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAllPlans()
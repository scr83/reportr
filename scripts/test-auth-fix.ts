// Test script to verify the auth fix works
import { prisma } from '../src/lib/prisma'

async function testAuthFix() {
  console.log('🧪 Testing Auth Fix...')

  // Check if any users exist
  const userCount = await prisma.user.count()
  console.log(`📊 Current users in database: ${userCount}`)

  // List existing users
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, companyName: true }
  })
  
  console.log('👥 Existing users:')
  users.forEach(user => {
    console.log(`  - ${user.email} (${user.name}) - Company: ${user.companyName}`)
  })

  // Test client creation would work now
  if (users.length > 0) {
    const testUser = users[0]
    console.log(`\n✅ Test client creation with user: ${testUser.email}`)
    
    try {
      const testClient = await prisma.client.create({
        data: {
          name: 'Test Client - Auth Fix Verification',
          domain: 'https://test-auth-fix.com',
          userId: testUser.id
        }
      })
      console.log(`✅ Client created successfully: ${testClient.id}`)
      
      // Clean up test client
      await prisma.client.delete({
        where: { id: testClient.id }
      })
      console.log('🧹 Test client cleaned up')
      
    } catch (error) {
      console.error('❌ Client creation failed:', error)
    }
  }

  await prisma.$disconnect()
}

testAuthFix().catch(console.error)
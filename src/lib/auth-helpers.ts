import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return null
  }

  // Try to find existing user
  let user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  // If user doesn't exist, create them (auto-registration)
  if (!user) {
    const now = new Date()
    const billingCycleEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    
    user = await prisma.user.create({
      data: {
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
        companyName: session.user.name ? `${session.user.name}'s Agency` : 'My Agency',
        billingCycleStart: now,
        billingCycleEnd: billingCycleEnd
      }
    })
    console.log('Auto-created user record with billing cycle:', {
      userId: user.id,
      email: user.email,
      billingCycleStart: now,
      billingCycleEnd: billingCycleEnd
    })
  }

  return user
}

export async function requireUser() {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }

  return user
}

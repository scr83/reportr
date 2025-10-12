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
    user = await prisma.user.create({
      data: {
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
        companyName: session.user.name ? `${session.user.name}'s Agency` : 'My Agency'
      }
    })
    console.log('Auto-created user record:', user.id, user.email)
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

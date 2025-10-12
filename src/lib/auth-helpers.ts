import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return null
  }

  // With database session strategy, we can directly use the user ID
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  return user
}

export async function requireUser() {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }

  return user
}

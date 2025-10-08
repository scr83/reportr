import { prisma } from '@/lib/prisma';

export async function createTestUser() {
  try {
    // Create test user if doesn't exist
    const testUser = await prisma.user.upsert({
      where: { id: 'test-user-id' },
      update: {},
      create: {
        id: 'test-user-id',
        email: 'test@digitalfrog.co',
        name: 'Test Agency',
        companyName: 'Digital Frog Agency',
        primaryColor: '#3B82F6'
      }
    });

    console.log('Test user created/updated:', testUser);
    return testUser;
  } catch (error) {
    console.error('Failed to create test user:', error);
    throw error;
  }
}
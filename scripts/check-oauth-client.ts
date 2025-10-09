import { prisma } from '../src/lib/prisma';

async function checkOAuthClient() {
  console.log('=== Checking OAuth Client ===');
  
  const clientId = 'cmgidstad0001p2d5gkm5974i';
  const testUserId = 'test-user-id';
  
  try {
    // Check if client exists
    const client = await prisma.client.findFirst({
      where: { id: clientId }
    });
    
    console.log('Client exists:', !!client);
    if (client) {
      console.log('Client details:', {
        id: client.id,
        name: client.name,
        userId: client.userId,
        domain: client.domain
      });
    }
    
    // Check if test user exists
    const user = await prisma.user.findFirst({
      where: { id: testUserId }
    });
    
    console.log('Test user exists:', !!user);
    if (user) {
      console.log('User details:', {
        id: user.id,
        email: user.email,
        name: user.name
      });
    }
    
    // Check if client belongs to test user
    const clientForUser = await prisma.client.findFirst({
      where: { 
        id: clientId,
        userId: testUserId
      }
    });
    
    console.log('Client belongs to test user:', !!clientForUser);
    
    // List all clients for test user
    const allClients = await prisma.client.findMany({
      where: { userId: testUserId }
    });
    
    console.log('All clients for test user:', allClients.map(c => ({
      id: c.id,
      name: c.name
    })));
    
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkOAuthClient();
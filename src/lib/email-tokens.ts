import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

/**
 * Generate a verification token for email verification
 */
export async function generateVerificationToken(email: string): Promise<string> {
  // Generate secure random token
  const token = crypto.randomBytes(32).toString('hex');
  
  // Token expires in 24 hours
  const expires = new Date();
  expires.setHours(expires.getHours() + 24);
  
  // Delete any existing tokens for this email
  await prisma.verificationToken.deleteMany({
    where: { email }
  });
  
  // Create new token
  await prisma.verificationToken.create({
    data: {
      token,
      email,
      expires
    }
  });
  
  return token;
}

/**
 * Verify token and mark email as verified
 */
export async function verifyToken(token: string) {
  // Find token
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token }
  });
  
  if (!verificationToken) {
    return { success: false, error: 'Invalid token' };
  }
  
  // Check if expired
  if (verificationToken.expires < new Date()) {
    // Delete expired token
    await prisma.verificationToken.delete({
      where: { token }
    });
    return { success: false, error: 'Token expired' };
  }
  
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: verificationToken.email }
  });
  
  if (!user) {
    return { success: false, error: 'User not found' };
  }
  
  // Mark email as verified
  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      // Set trial dates when email is verified
      trialStartDate: new Date(),
      trialEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      trialUsed: true,
    }
  });
  
  // Delete used token
  await prisma.verificationToken.delete({
    where: { token }
  });
  
  return { success: true, userId: user.id };
}

/**
 * Check if email has already used trial (abuse prevention)
 */
export async function hasUsedTrial(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { trialUsed: true, emailVerified: true }
  });
  
  return user?.trialUsed === true || user?.emailVerified !== null;
}
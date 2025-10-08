import { NextResponse } from 'next/server';
import { createTestUser } from '@/lib/seed-test-user';

export async function POST() {
  try {
    const user = await createTestUser();
    return NextResponse.json({ 
      success: true, 
      message: 'Test user created/updated successfully',
      user 
    });
  } catch (error: any) {
    console.error('Failed to seed test user:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}
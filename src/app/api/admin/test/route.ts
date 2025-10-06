import { NextResponse } from 'next/server';

/**
 * Simple test endpoint to verify API routes are working
 */
export async function GET() {
  return NextResponse.json({ 
    status: 'API working',
    timestamp: new Date().toISOString()
  });
}

export async function POST() {
  return NextResponse.json({ 
    status: 'POST working',
    timestamp: new Date().toISOString()
  });
}
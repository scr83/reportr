import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const clientId = searchParams.get('state');
  const error = searchParams.get('error');
  
  if (error) {
    console.error('OAuth error:', error);
    return NextResponse.redirect('/dashboard/clients?error=oauth_denied');
  }
  
  if (!code || !clientId) {
    return NextResponse.redirect('/dashboard/clients?error=oauth_failed');
  }
  
  try {
    const redirectUri = process.env.NODE_ENV === 'production'
      ? 'https://reportr-one.vercel.app/api/auth/google/callback'
      : 'http://localhost:3003/api/auth/google/callback';

    console.log('Callback OAuth Config:', {
      clientId: process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + '...',
      redirectUri,
      receivedCode: !!code,
      receivedState: clientId
    });

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUri
    );
    
    const { tokens } = await oauth2Client.getToken(code);
    
    if (!tokens.access_token || !tokens.refresh_token) {
      throw new Error('Missing required tokens');
    }
    
    // TEMPORARY: Use test user ID until auth is built
    const testUserId = 'test-user-id';
    
    // Check if client exists and belongs to test user
    const client = await prisma.client.findFirst({
      where: { 
        id: clientId,
        userId: testUserId
      }
    });

    if (!client) {
      console.error(`Client not found: ${clientId} for user: ${testUserId}`);
      return NextResponse.redirect('/dashboard/clients?error=client_not_found');
    }
    
    // Save tokens to database
    await prisma.client.update({
      where: { 
        id: clientId,
        userId: testUserId // Ensure client belongs to test user
      },
      data: {
        googleAccessToken: tokens.access_token,
        googleRefreshToken: tokens.refresh_token,
        googleTokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
        googleConnectedAt: new Date(),
        // Update legacy flags for backward compatibility
        googleSearchConsoleConnected: true,
        googleAnalyticsConnected: true
      }
    });
    
    return NextResponse.redirect('/dashboard/clients?connected=true');
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect('/dashboard/clients?error=oauth_failed');
  }
}
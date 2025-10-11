import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Force dynamic rendering for OAuth callback
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  console.log('=== OAuth Callback Started ===');
  
  try {
    console.log('Testing database connection...');
    await prisma.$connect();
    console.log('Database connected successfully');

    const { searchParams } = request.nextUrl;
    const code = searchParams.get('code');
    const clientId = searchParams.get('state');
    const error = searchParams.get('error');
    
    console.log('Received OAuth params:', { 
      code: code?.substring(0, 20) + '...', 
      clientId, 
      hasError: !!error 
    });

    // Get base URL for absolute redirects
    const baseUrl = process.env.NEXTAUTH_URL || request.nextUrl.origin;
    
    if (error) {
      console.error('OAuth error from Google:', error);
      return NextResponse.redirect(`${baseUrl}/dashboard/clients?error=oauth_denied`);
    }
    
    if (!code || !clientId) {
      console.error('Missing required params:', { code: !!code, clientId: !!clientId });
      return NextResponse.redirect(`${baseUrl}/dashboard/clients?error=oauth_failed`);
    }
    
    console.log('Creating OAuth2 client...');
    // Use same logic as authorize endpoint for consistency
    const redirectUri = `${baseUrl}/api/auth/google/callback`;

    console.log('OAuth Config:', {
      clientId: process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + '...',
      redirectUri,
      hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET
    });

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUri
    );
    
    console.log('Exchanging code for tokens...');
    const { tokens } = await oauth2Client.getToken(code);
    
    console.log('Tokens received:', { 
      hasAccessToken: !!tokens.access_token,
      hasRefreshToken: !!tokens.refresh_token,
      expiryDate: tokens.expiry_date
    });
    
    if (!tokens.access_token || !tokens.refresh_token) {
      console.error('Missing required tokens');
      throw new Error('Missing required tokens');
    }
    
    // TEMPORARY: Use test user ID until auth is built
    const testUserId = 'test-user-id';
    
    console.log('Looking for client in database...');
    // Check if client exists and belongs to test user
    const client = await prisma.client.findFirst({
      where: { 
        id: clientId,
        userId: testUserId
      }
    });

    console.log('Client lookup result:', { 
      found: !!client, 
      clientId: clientId,
      userId: testUserId 
    });

    if (!client) {
      console.error(`Client not found: ${clientId} for user: ${testUserId}`);
      
      // Let's also check if the client exists at all
      const anyClient = await prisma.client.findFirst({
        where: { id: clientId }
      });
      console.log('Client exists with different user?', !!anyClient);
      
      return NextResponse.redirect(`${baseUrl}/dashboard/clients?error=client_not_found`);
    }
    
    console.log('Updating client with Google tokens...');
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
    
    console.log('=== OAuth Callback Successful ===');
    return NextResponse.redirect(`${baseUrl}/dashboard/clients?connected=true`);
    
  } catch (error: any) {
    console.error('=== OAuth Callback Error ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error:', error);

    // Get base URL for error redirect
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://reportr-one.vercel.app' 
      : 'http://localhost:3003';
    
    return NextResponse.redirect(`${baseUrl}/dashboard/clients?error=oauth_failed`);
  }
}
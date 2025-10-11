import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth-helpers';

// Force dynamic rendering for OAuth callback
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  console.log('========== OAUTH CALLBACK START ==========');
  
  try {
    console.log('1. Testing database connection...');
    await prisma.$connect();
    console.log('   Database connected successfully');

    const { searchParams } = request.nextUrl;
    const code = searchParams.get('code');
    const clientId = searchParams.get('state');
    const error = searchParams.get('error');
    
    console.log('2. Received OAuth params:', { 
      hasCode: !!code,
      codeLength: code?.length,
      clientId: clientId,
      hasError: !!error 
    });

    // Get base URL for absolute redirects
    const baseUrl = process.env.NEXTAUTH_URL || request.nextUrl.origin;
    
    if (error) {
      console.error('3. OAuth error from Google:', error);
      return NextResponse.redirect(`${baseUrl}/dashboard/clients?error=oauth_denied`);
    }
    
    if (!code || !clientId) {
      console.error('3. Missing required params:', { hasCode: !!code, hasClientId: !!clientId });
      return NextResponse.redirect(`${baseUrl}/dashboard/clients?error=oauth_failed`);
    }
    
    console.log('3. Getting authenticated user...');
    const user = await requireUser();
    console.log('   User authenticated:', { userId: user.id, email: user.email });
    
    console.log('4. Creating OAuth2 client...');
    const redirectUri = `${baseUrl}/api/auth/google/callback`;

    console.log('   OAuth Config:', {
      clientId: process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + '...',
      redirectUri,
      hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET
    });

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUri
    );
    
    console.log('5. Exchanging code for tokens...');
    const { tokens } = await oauth2Client.getToken(code);
    
    console.log('   Tokens received from Google:', { 
      hasAccessToken: !!tokens.access_token,
      accessTokenLength: tokens.access_token?.length,
      hasRefreshToken: !!tokens.refresh_token,
      refreshTokenLength: tokens.refresh_token?.length,
      expiryDate: tokens.expiry_date,
      tokenType: tokens.token_type,
      scope: tokens.scope
    });
    
    if (!tokens.access_token || !tokens.refresh_token) {
      console.error('6. Missing required tokens');
      throw new Error('Missing required tokens');
    }
    
    console.log('6. Looking for client in database...');
    const client = await prisma.client.findFirst({
      where: { 
        id: clientId,
        userId: user.id  // Use actual authenticated user ID
      },
      include: { user: true }
    });

    console.log('   Client lookup result:', { 
      found: !!client, 
      clientId: clientId,
      userId: user.id,
      clientName: client?.name,
      clientDomain: client?.domain
    });

    if (!client) {
      console.error(`7. CLIENT NOT FOUND: ${clientId} for user: ${user.id}`);
      
      // Debug: check if client exists with different user
      const anyClient = await prisma.client.findFirst({
        where: { id: clientId },
        include: { user: true }
      });
      console.log('   Client exists with different user?:', {
        exists: !!anyClient,
        actualUserId: anyClient?.userId,
        actualUserEmail: anyClient?.user?.email
      });
      
      return NextResponse.redirect(`${baseUrl}/dashboard/clients?error=client_not_found`);
    }
    
    console.log('7. Updating client with Google tokens...');
    const updatedClient = await prisma.client.update({
      where: { 
        id: clientId,
        userId: user.id
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
    
    console.log('8. Database update COMPLETE:', {
      clientId: updatedClient.id,
      hasAccessToken: !!updatedClient.googleAccessToken,
      hasRefreshToken: !!updatedClient.googleRefreshToken,
      tokenExpiresAt: updatedClient.googleTokenExpiry,
      connectedAt: updatedClient.googleConnectedAt,
      accessTokenLength: updatedClient.googleAccessToken?.length,
      refreshTokenLength: updatedClient.googleRefreshToken?.length
    });
    
    console.log('9. Redirecting to clients page...');
    console.log('========== OAUTH CALLBACK SUCCESS ==========');
    return NextResponse.redirect(`${baseUrl}/dashboard/clients?connected=true&clientId=${clientId}`);
    
  } catch (error: any) {
    console.error('========== OAUTH CALLBACK ERROR ==========');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error object:', JSON.stringify(error, null, 2));
    
    // Get base URL for error redirect
    const baseUrl = process.env.NEXTAUTH_URL || 
      (process.env.NODE_ENV === 'production' 
        ? 'https://reportr-one.vercel.app' 
        : 'http://localhost:3001');
    
    return NextResponse.redirect(`${baseUrl}/dashboard/clients?error=oauth_failed&details=${encodeURIComponent(error.message)}`);
  }
}
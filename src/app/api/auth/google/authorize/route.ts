import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get('clientId');
  
  if (!clientId) {
    return NextResponse.json({ error: 'Client ID required' }, { status: 400 });
  }
  
  const redirectUri = process.env.NEXTAUTH_URL 
    ? `${process.env.NEXTAUTH_URL}/api/auth/google/callback`
    : 'https://reportr-one.vercel.app/api/auth/google/callback';
  
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri
  );
  
  const scopes = [
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/analytics.readonly'
  ];
  
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state: clientId,
    prompt: 'consent',
    redirect_uri: redirectUri // Explicitly add this
  });
  
  console.log('OAuth Config:', {
    clientId: process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + '...',
    redirectUri,
    scopes
  });
  console.log('Generated auth URL:', authUrl);
  
  return NextResponse.redirect(authUrl);
}
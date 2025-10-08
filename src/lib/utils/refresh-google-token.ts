import { google } from 'googleapis';
import { prisma } from '@/lib/prisma';

export class GoogleTokenError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'GoogleTokenError';
  }
}

/**
 * Refreshes Google OAuth access token using refresh token
 */
export async function refreshGoogleToken(clientId: string): Promise<string> {
  const client = await prisma.client.findUnique({
    where: { id: clientId }
  });
  
  if (!client?.googleRefreshToken) {
    throw new GoogleTokenError('No refresh token available', 'NO_REFRESH_TOKEN');
  }
  
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  
  oauth2Client.setCredentials({
    refresh_token: client.googleRefreshToken
  });
  
  try {
    const { credentials } = await oauth2Client.refreshAccessToken();
    
    if (!credentials.access_token) {
      throw new GoogleTokenError('Failed to get new access token', 'REFRESH_FAILED');
    }
    
    // Update token in database
    await prisma.client.update({
      where: { id: clientId },
      data: {
        googleAccessToken: credentials.access_token,
        googleTokenExpiry: credentials.expiry_date ? new Date(credentials.expiry_date) : null
      }
    });
    
    console.log(`Refreshed Google token for client ${clientId}`);
    return credentials.access_token;
  } catch (error: any) {
    console.error('Failed to refresh Google token:', error);
    
    // If refresh token is invalid, mark client as disconnected
    if (error.message?.includes('invalid_grant')) {
      await prisma.client.update({
        where: { id: clientId },
        data: {
          googleAccessToken: null,
          googleRefreshToken: null,
          googleTokenExpiry: null,
          googleConnectedAt: null,
          googleSearchConsoleConnected: false,
          googleAnalyticsConnected: false
        }
      });
      throw new GoogleTokenError('Google connection expired. Please reconnect.', 'CONNECTION_EXPIRED');
    }
    
    throw new GoogleTokenError(`Token refresh failed: ${error.message}`, 'REFRESH_ERROR');
  }
}

/**
 * Gets a valid access token, refreshing if necessary
 */
export async function getValidAccessToken(clientId: string): Promise<string> {
  const client = await prisma.client.findUnique({
    where: { id: clientId }
  });
  
  if (!client?.googleAccessToken) {
    throw new GoogleTokenError('Client not connected to Google', 'NOT_CONNECTED');
  }
  
  // Check if token is expired (with 5 minute buffer)
  const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds
  const isExpired = client.googleTokenExpiry && 
    new Date().getTime() > (client.googleTokenExpiry.getTime() - bufferTime);
  
  if (isExpired) {
    console.log(`Token expired for client ${clientId}, refreshing...`);
    return await refreshGoogleToken(clientId);
  }
  
  return client.googleAccessToken;
}

/**
 * Validates if client has valid Google connection
 */
export async function hasValidGoogleConnection(clientId: string): Promise<boolean> {
  try {
    await getValidAccessToken(clientId);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Creates authenticated Google OAuth2 client
 */
export async function createAuthenticatedGoogleClient(clientId: string) {
  const accessToken = await getValidAccessToken(clientId);
  
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  
  oauth2Client.setCredentials({
    access_token: accessToken
  });
  
  return oauth2Client;
}
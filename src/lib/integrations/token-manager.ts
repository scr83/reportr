import { google } from 'googleapis';
import { prisma } from '@/lib/prisma';

export class TokenManager {
  /**
   * Gets a valid access token, refreshing if expired
   */
  async getValidAccessToken(clientId: string): Promise<string> {
    const client = await prisma.client.findUnique({
      where: { id: clientId },
      select: {
        googleAccessToken: true,
        googleRefreshToken: true,
        googleTokenExpiry: true
      }
    });

    if (!client?.googleAccessToken) {
      throw new Error('Client not connected to Google');
    }

    // Check if token is expired (with 5 minute buffer)
    const now = new Date();
    const expiry = client.googleTokenExpiry ? new Date(client.googleTokenExpiry) : new Date(0);
    const bufferMs = 5 * 60 * 1000; // 5 minutes

    if (now.getTime() >= (expiry.getTime() - bufferMs)) {
      console.log('Token expired, refreshing...');
      return await this.refreshAccessToken(clientId, client.googleRefreshToken!);
    }

    return client.googleAccessToken;
  }

  /**
   * Refreshes an expired access token using the refresh token
   */
  private async refreshAccessToken(clientId: string, refreshToken: string): Promise<string> {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      refresh_token: refreshToken
    });

    try {
      const { credentials } = await oauth2Client.refreshAccessToken();
      
      // Update database with new token
      await prisma.client.update({
        where: { id: clientId },
        data: {
          googleAccessToken: credentials.access_token!,
          googleTokenExpiry: credentials.expiry_date ? new Date(credentials.expiry_date) : null
        }
      });

      console.log('Token refreshed successfully');
      return credentials.access_token!;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw new Error('Failed to refresh access token');
    }
  }
}

export const tokenManager = new TokenManager();
import { google } from 'googleapis';

export const GOOGLE_API_SCOPES = [
  'https://www.googleapis.com/auth/webmasters.readonly',
  'https://www.googleapis.com/auth/analytics.readonly',
] as const;

export const createGoogleAuthClient = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI || `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
  );
};

export const refreshAccessToken = async (refreshToken: string) => {
  const oauth2Client = createGoogleAuthClient();
  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  try {
    const { credentials } = await oauth2Client.refreshAccessToken();
    return {
      accessToken: credentials.access_token,
      expiryDate: credentials.expiry_date,
    };
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    throw new Error('Token refresh failed');
  }
};

// Rate limiting configuration
export const API_RATE_LIMITS = {
  gsc: {
    requestsPerMinute: 100,
    requestsPerDay: 1000,
  },
  ga4: {
    requestsPerMinute: 100,
    requestsPerDay: 50000,
  },
  pagespeed: {
    requestsPerMinute: 25,
    requestsPerDay: 25000,
  },
} as const;
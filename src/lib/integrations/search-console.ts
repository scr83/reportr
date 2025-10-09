import { google } from 'googleapis';
import { tokenManager } from './token-manager';

export interface GSCSite {
  siteUrl: string;
  permissionLevel: string;
}

export class SearchConsoleAPI {
  /**
   * Lists all Search Console sites the user has access to
   */
  async listSites(clientId: string): Promise<GSCSite[]> {
    try {
      const accessToken = await tokenManager.getValidAccessToken(clientId);
      
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });
      
      const webmasters = google.webmasters({ version: 'v3', auth });
      
      const response = await webmasters.sites.list();
      
      const sites: GSCSite[] = (response.data.siteEntry || []).map(site => ({
        siteUrl: site.siteUrl || '',
        permissionLevel: site.permissionLevel || 'unknown'
      }));
      
      console.log(`Found ${sites.length} Search Console sites`);
      return sites;
      
    } catch (error: any) {
      console.error('Error listing GSC sites:', error.message);
      throw new Error('Failed to fetch Search Console sites');
    }
  }
}

export const searchConsoleAPI = new SearchConsoleAPI();
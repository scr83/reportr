import { google } from 'googleapis';
import { createAuthenticatedGoogleClient, GoogleTokenError } from '@/lib/utils/refresh-google-token';
import { prisma } from '@/lib/prisma';

export interface SearchConsoleQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: string;
  position: string;
}

export interface SearchConsolePage {
  page: string;
  clicks: number;
  impressions: number;
  ctr: string;
  position: string;
}

export interface SearchConsoleData {
  clicks: number;
  impressions: number;
  ctr: string;
  position: string;
  topQueries: SearchConsoleQuery[];
  topPages: SearchConsolePage[];
  summary: {
    totalClicks: number;
    totalImpressions: number;
    averageCTR: number;
    averagePosition: number;
  };
}

/**
 * Fetches Search Console performance data for a client
 */
export async function getSearchConsoleData(
  clientId: string,
  startDate: string,
  endDate: string,
  siteUrl?: string
): Promise<SearchConsoleData> {
  try {
    // Get client with site URL
    const client = await prisma.client.findUnique({
      where: { id: clientId }
    });

    if (!client) {
      throw new Error('Client not found');
    }

    // Use provided siteUrl or fallback to stored one or domain
    const targetSiteUrl = siteUrl || client.gscSiteUrl || `https://${client.domain}`;

    const auth = await createAuthenticatedGoogleClient(clientId);
    const searchconsole = google.searchconsole({ version: 'v1', auth });

    // Fetch aggregate data first
    const aggregateResponse = await searchconsole.searchanalytics.query({
      siteUrl: targetSiteUrl,
      requestBody: {
        startDate,
        endDate,
        dataState: 'final'
      }
    });

    const aggregateRow = aggregateResponse.data.rows?.[0];

    // Fetch top queries
    const queriesResponse = await searchconsole.searchanalytics.query({
      siteUrl: targetSiteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 25,
        dataState: 'final'
      }
    });

    // Fetch top pages
    const pagesResponse = await searchconsole.searchanalytics.query({
      siteUrl: targetSiteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 25,
        dataState: 'final'
      }
    });

    const queryRows = queriesResponse.data.rows || [];
    const pageRows = pagesResponse.data.rows || [];

    // Calculate totals from individual rows if aggregate is not available
    const totalClicks = aggregateRow?.clicks || queryRows.reduce((sum, row) => sum + (row.clicks || 0), 0);
    const totalImpressions = aggregateRow?.impressions || queryRows.reduce((sum, row) => sum + (row.impressions || 0), 0);
    const avgCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const avgPosition = aggregateRow?.position || (queryRows.length > 0 
      ? queryRows.reduce((sum, row) => sum + (row.position || 0), 0) / queryRows.length 
      : 0);

    // Format top queries
    const topQueries: SearchConsoleQuery[] = queryRows.map(row => ({
      query: row.keys?.[0] || '',
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr ? (row.ctr * 100).toFixed(2) : '0.00',
      position: row.position?.toFixed(1) || '0.0'
    }));

    // Format top pages
    const topPages: SearchConsolePage[] = pageRows.map(row => ({
      page: row.keys?.[0] || '',
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr ? (row.ctr * 100).toFixed(2) : '0.00',
      position: row.position?.toFixed(1) || '0.0'
    }));

    // Update the client's GSC site URL if it was successful
    if (!client.gscSiteUrl && targetSiteUrl) {
      await prisma.client.update({
        where: { id: clientId },
        data: { gscSiteUrl: targetSiteUrl }
      });
    }

    return {
      clicks: totalClicks,
      impressions: totalImpressions,
      ctr: avgCTR.toFixed(2),
      position: avgPosition.toFixed(1),
      topQueries,
      topPages,
      summary: {
        totalClicks,
        totalImpressions,
        averageCTR: avgCTR,
        averagePosition: avgPosition
      }
    };
  } catch (error: any) {
    console.error('Search Console API error:', error);
    
    if (error instanceof GoogleTokenError) {
      throw error;
    }
    
    // Handle specific Google API errors
    if (error.code === 403) {
      throw new Error('Access denied to Search Console. Please ensure the property is verified and you have access.');
    }
    
    if (error.code === 404) {
      throw new Error('Search Console property not found. Please verify the site URL.');
    }
    
    throw new Error(`Failed to fetch Search Console data: ${error.message}`);
  }
}

/**
 * Lists available Search Console sites for a client
 */
export async function getSearchConsoleSites(clientId: string) {
  try {
    const auth = await createAuthenticatedGoogleClient(clientId);
    const searchconsole = google.searchconsole({ version: 'v1', auth });

    const response = await searchconsole.sites.list();
    
    return response.data.siteEntry?.map(site => ({
      siteUrl: site.siteUrl,
      permissionLevel: site.permissionLevel
    })) || [];
  } catch (error: any) {
    console.error('Failed to list Search Console sites:', error);
    throw new Error(`Failed to list Search Console sites: ${error.message}`);
  }
}
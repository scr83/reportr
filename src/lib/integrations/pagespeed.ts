/**
 * PageSpeed Insights API Client
 * 
 * Fetches performance metrics for a given URL using Google's PageSpeed Insights API.
 * Returns mobile + desktop scores, Core Web Vitals, and performance opportunities.
 * 
 * API Specifications:
 * - Endpoint: https://www.googleapis.com/pagespeedonline/v5/runPagespeed
 * - Rate Limits: 25,000 requests/day, 400 requests per 100 seconds
 * - Response Time: 10-30 seconds per URL
 * - Strategy: Fetch mobile AND desktop in parallel for efficiency
 */

export interface PageSpeedMetrics {
  mobile: {
    score: number;              // Performance score 0-100
    lcp: number | null;         // Largest Contentful Paint (ms)
    fid: number | null;         // First Input Delay (ms)
    cls: number | null;         // Cumulative Layout Shift (0-1)
  };
  desktop: {
    score: number;
    lcp: number | null;
    fid: number | null;
    cls: number | null;
  };
  opportunities?: Array<{       // Top 3-5 performance recommendations
    title: string;
    description: string;
    displayValue?: string;      // e.g., "Potential savings: 2.1s"
  }>;
  fetchedAt: Date | string;     // Timestamp for caching purposes
}

/**
 * Main function to fetch PageSpeed data for a URL
 */
export async function fetchPageSpeedData(url: string): Promise<PageSpeedMetrics | null> {
  try {
    // Validate URL format
    const validUrl = validateAndNormalizeUrl(url);
    if (!validUrl) {
      console.warn('[PageSpeed] Invalid URL format:', url);
      return null;
    }

    console.log(`[PageSpeed] Fetching data for: ${validUrl}`);

    // Fetch mobile and desktop data in parallel
    const [mobileData, desktopData] = await Promise.all([
      fetchPageSpeedForStrategy(validUrl, 'mobile'),
      fetchPageSpeedForStrategy(validUrl, 'desktop')
    ]);

    // If either request failed, return null
    if (!mobileData || !desktopData) {
      console.warn('[PageSpeed] Failed to fetch data for one or both strategies');
      return null;
    }

    // Extract performance scores and Core Web Vitals
    const mobileMetrics = extractMetricsFromResponse(mobileData);
    const desktopMetrics = extractMetricsFromResponse(desktopData);

    // Extract performance opportunities from mobile data (more comprehensive)
    const opportunities = extractOpportunities(mobileData);

    const result: PageSpeedMetrics = {
      mobile: mobileMetrics,
      desktop: desktopMetrics,
      opportunities,
      fetchedAt: new Date()
    };

    console.log(`[PageSpeed] Success - Mobile: ${mobileMetrics.score}, Desktop: ${desktopMetrics.score}`);
    return result;

  } catch (error) {
    console.error('[PageSpeed] Error fetching PageSpeed data:', error);
    return null;
  }
}

/**
 * Validates and normalizes URL format
 */
function validateAndNormalizeUrl(url: string): string | null {
  try {
    // Add protocol if missing
    let normalizedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      normalizedUrl = `https://${url}`;
    }

    // Remove trailing slash
    normalizedUrl = normalizedUrl.replace(/\/$/, '');

    // Validate URL format
    new URL(normalizedUrl);
    return normalizedUrl;
  } catch {
    return null;
  }
}

/**
 * Fetches PageSpeed data for a specific strategy (mobile/desktop)
 */
async function fetchPageSpeedForStrategy(
  url: string, 
  strategy: 'mobile' | 'desktop'
): Promise<any> {
  const apiKey = process.env.PAGESPEED_API_KEY;
  if (!apiKey) {
    console.error('[PageSpeed] API key not configured');
    return null;
  }

  const endpoint = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  const params = new URLSearchParams({
    url,
    key: apiKey,
    strategy,
    category: 'performance'
  });

  const maxRetries = 3;
  let retryDelay = 2000; // Start with 2 seconds

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[PageSpeed] Fetching ${strategy} data (attempt ${attempt}/${maxRetries})`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

      const response = await fetch(`${endpoint}?${params}`, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Reportr-SEO-Bot/1.0'
        }
      });

      clearTimeout(timeoutId);

      if (response.status === 429) {
        // Rate limit - retry with exponential backoff
        console.warn(`[PageSpeed] Rate limited (attempt ${attempt}). Retrying in ${retryDelay}ms`);
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          retryDelay *= 2; // Exponential backoff
          continue;
        }
        return null;
      }

      if (response.status === 400) {
        console.warn(`[PageSpeed] Invalid URL for ${strategy}:`, url);
        return null;
      }

      if (!response.ok) {
        console.warn(`[PageSpeed] HTTP error ${response.status} for ${strategy}`);
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          retryDelay *= 2;
          continue;
        }
        return null;
      }

      const data = await response.json();
      return data;

    } catch (error: any) {
      console.warn(`[PageSpeed] Request failed for ${strategy} (attempt ${attempt}):`, error.message);
      
      if (error.name === 'AbortError') {
        console.warn('[PageSpeed] Request timed out after 60 seconds');
      }

      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        retryDelay *= 2;
        continue;
      }
      
      return null;
    }
  }

  return null;
}

/**
 * Extracts Core Web Vitals and performance score from PageSpeed response
 */
function extractMetricsFromResponse(response: any): {
  score: number;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
} {
  try {
    const lighthouseResult = response.lighthouseResult;
    if (!lighthouseResult) {
      return { score: 0, lcp: null, fid: null, cls: null };
    }

    // Extract performance score (0-1 scale converted to 0-100)
    const performanceCategory = lighthouseResult.categories?.performance;
    const score = performanceCategory?.score ? Math.round(performanceCategory.score * 100) : 0;

    // Extract Core Web Vitals
    const audits = lighthouseResult.audits || {};
    const coreWebVitals = extractCoreWebVitals(audits);

    return {
      score,
      ...coreWebVitals
    };
  } catch (error) {
    console.warn('[PageSpeed] Error extracting metrics from response:', error);
    return { score: 0, lcp: null, fid: null, cls: null };
  }
}

/**
 * Extracts Core Web Vitals from Lighthouse audit data
 */
function extractCoreWebVitals(audits: any): {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
} {
  try {
    // Largest Contentful Paint (ms)
    const lcp = audits['largest-contentful-paint']?.numericValue || null;

    // First Input Delay (ms) - use max-potential-fid as fallback
    const fid = audits['max-potential-fid']?.numericValue || 
                audits['first-input-delay']?.numericValue || null;

    // Cumulative Layout Shift (score 0-1)
    const cls = audits['cumulative-layout-shift']?.numericValue || null;

    return { lcp, fid, cls };
  } catch (error) {
    console.warn('[PageSpeed] Error extracting Core Web Vitals:', error);
    return { lcp: null, fid: null, cls: null };
  }
}

/**
 * Extracts top performance opportunities from Lighthouse audit data
 */
function extractOpportunities(response: any, limit: number = 5): Array<{
  title: string;
  description: string;
  displayValue?: string;
}> {
  try {
    const audits = response.lighthouseResult?.audits || {};
    const opportunities: Array<{
      title: string;
      description: string;
      displayValue?: string;
      numericValue?: number;
    }> = [];

    // Find audits that have improvement opportunities
    for (const [key, audit] of Object.entries(audits)) {
      const auditData = audit as any;
      
      // Look for audits with poor scores that have actionable recommendations
      if (
        auditData.score !== null &&
        auditData.score < 0.9 &&
        auditData.scoreDisplayMode === 'numeric' &&
        auditData.title &&
        auditData.description &&
        auditData.numericValue > 0 // Has measurable impact
      ) {
        opportunities.push({
          title: auditData.title,
          description: auditData.description,
          displayValue: auditData.displayValue,
          numericValue: auditData.numericValue
        });
      }
    }

    // Sort by potential impact (numeric value descending) and take top N
    return opportunities
      .sort((a, b) => (b.numericValue || 0) - (a.numericValue || 0))
      .slice(0, limit)
      .map(({ title, description, displayValue }) => ({
        title,
        description,
        displayValue
      }));

  } catch (error) {
    console.warn('[PageSpeed] Error extracting opportunities:', error);
    return [];
  }
}
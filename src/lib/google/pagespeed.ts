import { PageSpeedData, PageSpeedOpportunity, GoogleAPIError } from '@/types/google-api';
import { handleGoogleAPIError, retryWithBackoff, ReportGenerationError } from './error-handling';

interface CoreWebVitals {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay  
  cls: number; // Cumulative Layout Shift
}

interface PageSpeedResponse {
  lighthouseResult: {
    categories: {
      performance: {
        score: number;
      };
    };
    audits: {
      [key: string]: {
        title: string;
        description: string;
        score: number | null;
        numericValue?: number;
        displayValue?: string;
        details?: any;
      };
    };
  };
  loadingExperience?: {
    metrics: {
      [key: string]: {
        percentile: number;
        category: string;
      };
    };
  };
}

export class PageSpeedClient {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

  constructor() {
    const apiKey = process.env.PAGESPEED_API_KEY;
    if (!apiKey) {
      throw new Error('PAGESPEED_API_KEY environment variable is required');
    }
    this.apiKey = apiKey;
  }

  /**
   * Get comprehensive PageSpeed data for both mobile and desktop
   */
  async getPageSpeedData(url: string): Promise<PageSpeedData> {
    try {
      return await retryWithBackoff(async () => {
        // Get mobile and desktop data in parallel
        const [mobileData, desktopData] = await Promise.all([
          this.getPageSpeedForStrategy(url, 'mobile'),
          this.getPageSpeedForStrategy(url, 'desktop')
        ]);

        // Extract Core Web Vitals from mobile data (primary for ranking)
        const coreWebVitals = this.extractCoreWebVitals(mobileData);

        // Extract performance opportunities
        const opportunities = this.extractOpportunities(mobileData, desktopData);

        return {
          url,
          mobileScore: Math.round((mobileData.lighthouseResult.categories.performance.score || 0) * 100),
          desktopScore: Math.round((desktopData.lighthouseResult.categories.performance.score || 0) * 100),
          coreWebVitals,
          opportunities
        };
      });
    } catch (error) {
      const apiError = handleGoogleAPIError(error, 'pagespeed');
      throw new ReportGenerationError(
        'pagespeed',
        apiError.statusCode,
        apiError.message,
        apiError.retryable,
        apiError.needsReauth
      );
    }
  }

  /**
   * Get PageSpeed data for a specific strategy (mobile or desktop)
   */
  private async getPageSpeedForStrategy(url: string, strategy: 'mobile' | 'desktop'): Promise<PageSpeedResponse> {
    const params = new URLSearchParams({
      url: url,
      key: this.apiKey,
      strategy: strategy,
      category: 'performance',
      locale: 'en'
    });

    const response = await fetch(`${this.baseUrl}?${params}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`PageSpeed API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    return response.json();
  }

  /**
   * Extract Core Web Vitals from PageSpeed response
   */
  private extractCoreWebVitals(data: PageSpeedResponse): CoreWebVitals {
    const audits = data.lighthouseResult.audits;
    
    // Get LCP (Largest Contentful Paint) - in seconds, convert to milliseconds
    const lcp = audits['largest-contentful-paint']?.numericValue || 0;
    
    // Get FID (First Input Delay) - use Total Blocking Time as proxy since FID isn't directly measurable
    const fid = audits['total-blocking-time']?.numericValue || 0;
    
    // Get CLS (Cumulative Layout Shift) - unitless score
    const cls = audits['cumulative-layout-shift']?.numericValue || 0;

    return {
      lcp: Math.round(lcp), // Convert to milliseconds
      fid: Math.round(fid), // Total Blocking Time as FID proxy
      cls: Number(cls.toFixed(3)) // Keep 3 decimal places for CLS
    };
  }

  /**
   * Extract performance opportunities from audit results
   */
  private extractOpportunities(mobileData: PageSpeedResponse, desktopData: PageSpeedResponse): PageSpeedOpportunity[] {
    const opportunities: PageSpeedOpportunity[] = [];
    
    // Key audits that provide actionable opportunities
    const opportunityAudits = [
      'unused-css-rules',
      'unused-javascript',
      'render-blocking-resources',
      'unminified-css',
      'unminified-javascript',
      'inefficient-animated-content',
      'legacy-javascript',
      'offscreen-images',
      'unoptimized-images',
      'modern-image-formats',
      'uses-webp-images',
      'uses-text-compression',
      'server-response-time',
      'redirects',
      'uses-rel-preconnect',
      'font-display',
      'third-party-summary'
    ];

    // Process mobile opportunities (prioritize mobile-first)
    for (const auditKey of opportunityAudits) {
      const audit = mobileData.lighthouseResult.audits[auditKey];
      
      if (audit && audit.score !== null && audit.score < 1) {
        const savings = this.extractSavings(audit);
        
        if (savings > 0) {
          opportunities.push({
            title: audit.title,
            description: audit.description,
            savings: savings,
            impact: this.categorizeImpact(savings)
          });
        }
      }
    }

    // Add desktop-specific opportunities if they're not already covered
    for (const auditKey of opportunityAudits) {
      const audit = desktopData.lighthouseResult.audits[auditKey];
      
      if (audit && audit.score !== null && audit.score < 1) {
        const savings = this.extractSavings(audit);
        const existingOpportunity = opportunities.find(opp => opp.title === audit.title);
        
        if (savings > 0 && !existingOpportunity) {
          opportunities.push({
            title: `${audit.title} (Desktop)`,
            description: audit.description,
            savings: savings,
            impact: this.categorizeImpact(savings)
          });
        }
      }
    }

    // Sort by impact and savings, limit to top 10
    return opportunities
      .sort((a, b) => {
        const impactOrder = { high: 3, medium: 2, low: 1 };
        const impactDiff = impactOrder[b.impact] - impactOrder[a.impact];
        if (impactDiff !== 0) return impactDiff;
        return b.savings - a.savings;
      })
      .slice(0, 10);
  }

  /**
   * Extract potential savings from audit details
   */
  private extractSavings(audit: any): number {
    // Check for potential savings in various formats
    if (audit.details?.overallSavingsMs) {
      return Math.round(audit.details.overallSavingsMs);
    }
    
    if (audit.details?.overallSavingsBytes) {
      // Rough conversion: 1KB = ~10ms on slow connection
      return Math.round(audit.details.overallSavingsBytes / 100);
    }
    
    if (audit.numericValue) {
      return Math.round(audit.numericValue);
    }
    
    // Parse savings from display value if available
    if (audit.displayValue) {
      const match = audit.displayValue.match(/(\d+(?:\.\d+)?)\s*ms/);
      if (match) {
        return Math.round(parseFloat(match[1]));
      }
      
      const kbMatch = audit.displayValue.match(/(\d+(?:\.\d+)?)\s*KiB/);
      if (kbMatch) {
        return Math.round(parseFloat(kbMatch[1]) * 10); // Rough conversion
      }
    }
    
    return 0;
  }

  /**
   * Categorize impact based on potential savings
   */
  private categorizeImpact(savings: number): 'high' | 'medium' | 'low' {
    if (savings >= 1000) return 'high';    // 1+ second savings
    if (savings >= 300) return 'medium';   // 300ms+ savings
    return 'low';                          // Less than 300ms
  }

  /**
   * Analyze Core Web Vitals specifically
   */
  async analyzeCoreWebVitals(url: string): Promise<{
    overall: 'good' | 'needs-improvement' | 'poor';
    lcp: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
    fid: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
    cls: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
    recommendations: string[];
  }> {
    try {
      const data = await this.getPageSpeedData(url);
      const { lcp, fid, cls } = data.coreWebVitals;

      // Core Web Vitals thresholds (based on Google's guidelines)
      const lcpRating = lcp <= 2500 ? 'good' : lcp <= 4000 ? 'needs-improvement' : 'poor';
      const fidRating = fid <= 100 ? 'good' : fid <= 300 ? 'needs-improvement' : 'poor';
      const clsRating = cls <= 0.1 ? 'good' : cls <= 0.25 ? 'needs-improvement' : 'poor';

      // Overall rating - all must be good for overall good rating
      let overall: 'good' | 'needs-improvement' | 'poor' = 'good';
      if (lcpRating === 'poor' || fidRating === 'poor' || clsRating === 'poor') {
        overall = 'poor';
      } else if (lcpRating === 'needs-improvement' || fidRating === 'needs-improvement' || clsRating === 'needs-improvement') {
        overall = 'needs-improvement';
      }

      // Generate specific recommendations
      const recommendations: string[] = [];
      
      if (lcpRating !== 'good') {
        recommendations.push('Optimize images and reduce server response times to improve Largest Contentful Paint');
      }
      
      if (fidRating !== 'good') {
        recommendations.push('Reduce JavaScript execution time and eliminate render-blocking resources to improve interactivity');
      }
      
      if (clsRating !== 'good') {
        recommendations.push('Add size attributes to images and avoid inserting content above existing content to improve layout stability');
      }

      return {
        overall,
        lcp: { value: lcp, rating: lcpRating },
        fid: { value: fid, rating: fidRating },
        cls: { value: cls, rating: clsRating },
        recommendations
      };
    } catch (error) {
      console.error('Failed to analyze Core Web Vitals:', error);
      throw error;
    }
  }

  /**
   * Get performance score only (lightweight check)
   */
  async getPerformanceScore(url: string, strategy: 'mobile' | 'desktop' = 'mobile'): Promise<number> {
    try {
      const data = await this.getPageSpeedForStrategy(url, strategy);
      return Math.round((data.lighthouseResult.categories.performance.score || 0) * 100);
    } catch (error) {
      console.error(`Failed to get ${strategy} performance score:`, error);
      return 0;
    }
  }

  /**
   * Validate URL format for PageSpeed testing
   */
  static isValidUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }

  /**
   * Format URL for PageSpeed testing
   */
  static formatUrl(url: string): string {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  }

  /**
   * Get multiple pages performance data in parallel
   */
  async getMultiplePagesSpeeds(
    urls: string[],
    maxConcurrent: number = 3
  ): Promise<Array<{ url: string; data: PageSpeedData | null; error?: string }>> {
    const results: Array<{ url: string; data: PageSpeedData | null; error?: string }> = [];
    
    // Process URLs in chunks to avoid rate limiting
    for (let i = 0; i < urls.length; i += maxConcurrent) {
      const chunk = urls.slice(i, i + maxConcurrent);
      
      const chunkPromises = chunk.map(async (url) => {
        try {
          const data = await this.getPageSpeedData(url);
          return { url, data, error: undefined };
        } catch (error) {
          return { 
            url, 
            data: null, 
            error: error instanceof Error ? error.message : 'Unknown error' 
          };
        }
      });

      const chunkResults = await Promise.all(chunkPromises);
      results.push(...chunkResults);

      // Add delay between chunks to respect rate limits
      if (i + maxConcurrent < urls.length) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
      }
    }

    return results;
  }
}

// Export singleton instance
export const pageSpeedClient = new PageSpeedClient();
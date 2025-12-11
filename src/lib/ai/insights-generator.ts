import Anthropic from '@anthropic-ai/sdk';
import { AIInsight, ReportData } from '@/types/google-api';

console.log('🔧 [AI-INSIGHTS] Initializing Anthropic SDK...');
console.log('🔧 [AI-INSIGHTS] API Key status:', {
  exists: !!process.env.ANTHROPIC_API_KEY,
  length: process.env.ANTHROPIC_API_KEY?.length || 0,
  startsWithCorrectPrefix: process.env.ANTHROPIC_API_KEY?.startsWith('sk-ant-') || false
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export class AIInsightsGenerator {
  async generateInsights(data: Partial<ReportData>): Promise<AIInsight[]> {
    console.log('🚀 [AI-INSIGHTS] Starting AI insights generation...');
    console.log('🚀 [AI-INSIGHTS] Input data structure:', {
      hasClient: !!data.client,
      hasSummary: !!data.summary,
      hasSearchConsole: !!data.searchConsole,
      clientDomain: data.client?.domain,
      totalClicks: data.summary?.totalClicks,
      keywordCount: data.searchConsole?.topKeywords?.length || 0
    });
    
    const prompt = this.buildInsightPrompt(data);
    console.log('🚀 [AI-INSIGHTS] Generated prompt length:', prompt.length);
    
    try {
      console.log('🚀 [AI-INSIGHTS] Making API call to Claude...');
      console.log('🚀 [AI-INSIGHTS] API Key check at runtime:', {
        exists: !!process.env.ANTHROPIC_API_KEY,
        length: process.env.ANTHROPIC_API_KEY?.length || 0,
        prefix: process.env.ANTHROPIC_API_KEY?.substring(0, 15) + '...' || 'NOT_SET',
        matchesExpected: process.env.ANTHROPIC_API_KEY?.startsWith('sk-ant-api03-') || false
      });
      
      const requestPayload = {
        model: 'claude-sonnet-4-20250514', // CRITICAL FIX: Use the working model from curl test
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      };
      
      console.log('🚀 [AI-INSIGHTS] Request payload:', {
        model: requestPayload.model,
        maxTokens: requestPayload.max_tokens,
        promptLength: prompt.length,
        messageCount: requestPayload.messages.length
      });
      
      const response = await anthropic.messages.create(requestPayload);

      console.log('🚀 [AI-INSIGHTS] Received response from Claude:', {
        contentLength: response.content.length,
        contentType: response.content[0]?.type,
        usage: response.usage
      });

      const content = response.content[0];
      if (content && content.type === 'text') {
        console.log('🚀 [AI-INSIGHTS] Parsing insights from response...');
        const insights = this.parseInsights(content.text);
        console.log('🚀 [AI-INSIGHTS] ✅ Successfully generated AI insights:', {
          count: insights.length,
          categories: insights.map(i => i.category)
        });
        return insights;
      }
      
      throw new Error('Invalid response format from AI - content is not text type');
    } catch (error) {
      console.error('❌ [AI-INSIGHTS] AI insights generation failed:', {
        error: error instanceof Error ? error.message : error,
        errorName: error instanceof Error ? error.name : 'Unknown',
        stack: error instanceof Error ? error.stack : undefined
      });
      
      console.log('🔄 [AI-INSIGHTS] Falling back to rule-based insights...');
      return this.getFallbackInsights(data);
    }
  }

  private buildInsightPrompt(data: Partial<ReportData>): string {
    const domain = data.client?.domain || 'example.com';
    const clicks = data.summary?.totalClicks || 0;
    const clicksChange = data.summary?.clicksChange || 0;
    const impressions = data.summary?.totalImpressions || 0;
    const position = data.summary?.averagePosition || 0;
    const organicSessions = data.summary?.organicSessions || 0;
    const sessionsChange = data.summary?.sessionsChange || 0;
    const mobileScore = data.summary?.mobileScore || 0;
    const desktopScore = data.summary?.desktopScore || 0;
    
    const topKeywords = data.searchConsole?.topKeywords?.map(k => `${k.keyword} (pos: ${k.position}, clicks: ${k.clicks})`) || [];
    const topPages = data.searchConsole?.topPages?.map(p => p.page) || [];

    return `
Generate exactly 5 strategic recommendations based on this SEO data.

Each recommendation MUST be:
1. SPECIFIC to this client's actual data (reference specific keywords, pages, or metrics)
2. ACTIONABLE with clear next steps  
3. PRIORITIZED based on potential impact

For each recommendation provide:
- title: Action-oriented headline (5-8 words)
- description: 2-3 sentences explaining the opportunity and approach. Reference specific data points.
- priority: "high", "medium", or "low" based on potential ROI
- category: "keyword", "technical", "content", or "performance"  
- expectedImpact: Quantified expected outcome (e.g., "Potential 20% increase in organic traffic")
- actionItems: Array of 2-3 specific action steps

Example of GOOD recommendation:
{
  "title": "Target Page 2 Keywords for Quick Wins",
  "description": "You have 12 keywords ranking positions 11-20 that are close to page 1. Keywords like 'digital marketing services' at position 14 with 450 monthly impressions represent immediate opportunities. Optimizing these pages could move them to page 1 within 30-60 days.",
  "priority": "high", 
  "category": "keyword",
  "expectedImpact": "Moving 5 keywords to page 1 could generate 200+ additional monthly clicks",
  "actionItems": ["Identify top 5 keywords in positions 11-15", "Add target keyword to H1 and first paragraph", "Build 2-3 internal links to each target page"]
}

DATA TO ANALYZE:
- Domain: ${domain}
- Total Clicks: ${clicks} (${clicksChange}% change)
- Total Impressions: ${impressions}  
- Average Position: ${position}
- Organic Sessions: ${organicSessions} (${sessionsChange}% change)
- Mobile Score: ${mobileScore}/100
- Desktop Score: ${desktopScore}/100
- Top Keywords: ${topKeywords.slice(0, 10).join(', ') || 'No data'}
- Top Pages: ${topPages.slice(0, 5).join(', ') || 'No data'}

Return ONLY valid JSON array with exactly 5 recommendations in this format:
{
  "insights": [
    {
      "title": "Action-oriented title",
      "description": "Detailed explanation referencing specific data",
      "priority": "high|medium|low",
      "category": "keyword|technical|content|performance",
      "expectedImpact": "Quantified expected result",
      "actionItems": ["Step 1", "Step 2", "Step 3"],
      "dataSource": ["Google Search Console", "PageSpeed Insights", "etc."]
    }
  ]
}

Make insights specific, actionable, and data-driven. Reference actual metrics from the data provided.`;
  }

  private parseInsights(aiResponse: string): AIInsight[] {
    try {
      // Strip markdown formatting if present
      const cleanResponse = aiResponse
        .replace(/```json\s*/, '')
        .replace(/```\s*$/, '')
        .trim();

      const parsed = JSON.parse(cleanResponse);
      
      return parsed.insights.map((insight: any, index: number) => ({
        id: `ai-insight-${Date.now()}-${index}`,
        title: insight.title,
        description: insight.description,
        priority: insight.priority,
        category: insight.category,
        expectedImpact: insight.expectedImpact,
        actionItems: insight.actionItems,
        dataSource: insight.dataSource
      }));
    } catch (error) {
      console.error('Failed to parse AI insights:', error);
      return this.getFallbackInsights();
    }
  }

  private getFallbackInsights(data?: Partial<ReportData>): AIInsight[] {
    const insights: AIInsight[] = [];
    const timestamp = Date.now();

    // Generate 5 fallback insights based on available data
    
    // 1. Mobile Performance (high priority if poor score)
    const mobileScore = data?.summary?.mobileScore || 50;
    if (mobileScore < 75) {
      insights.push({
        id: `fallback-mobile-${timestamp}-1`,
        title: 'Improve Mobile Page Speed',
        description: `Your mobile page speed score is ${mobileScore}/100, which is below optimal performance. Mobile speed directly impacts both user experience and Google rankings, especially since mobile-first indexing.`,
        priority: mobileScore < 50 ? 'high' : 'medium',
        category: 'technical',
        expectedImpact: `Improving to 85+ could increase mobile traffic by 15-25%`,
        actionItems: [
          'Compress and optimize all images to WebP format',
          'Minimize JavaScript and CSS file sizes',
          'Implement lazy loading for non-critical content'
        ],
        dataSource: ['PageSpeed Insights']
      });
    }

    // 2. Keyword Optimization (based on position)
    const avgPosition = data?.summary?.averagePosition || 15;
    if (avgPosition > 8) {
      insights.push({
        id: `fallback-keywords-${timestamp}-2`,
        title: 'Target Page 2 Keywords for Quick Wins',
        description: `Your average keyword position is ${avgPosition.toFixed(1)}, indicating many keywords are on page 2-3. Focusing on keywords ranking positions 8-20 represents the highest ROI opportunities for quick ranking improvements.`,
        priority: 'high',
        category: 'keyword',
        expectedImpact: 'Moving 10 keywords from page 2 to page 1 could double organic traffic',
        actionItems: [
          'Identify keywords ranking positions 8-20 with high search volume',
          'Optimize title tags and H1s for target keywords',
          'Build strategic internal links to boost page authority'
        ],
        dataSource: ['Google Search Console']
      });
    }

    // 3. Content Expansion Strategy
    insights.push({
      id: `fallback-content-${timestamp}-3`,
      title: 'Expand Content for Target Topics',
      description: 'Your current content strategy has opportunities for expansion. Creating comprehensive, topic-cluster content can improve topical authority and capture more long-tail search traffic.',
      priority: 'medium',
      category: 'content',
      expectedImpact: 'Comprehensive content hubs can increase organic traffic by 25-40%',
      actionItems: [
        'Identify top 5 topics relevant to your business',
        'Create pillar pages for each main topic',
        'Develop 8-10 supporting articles per pillar page'
      ],
      dataSource: ['Google Analytics', 'Search Console']
    });

    // 4. Technical SEO Improvements
    insights.push({
      id: `fallback-technical-${timestamp}-4`,
      title: 'Enhance Technical SEO Foundation',
      description: 'Technical SEO improvements provide foundational benefits for all organic search efforts. Addressing common technical issues can unlock ranking potential across your entire website.',
      priority: 'medium',
      category: 'technical',
      expectedImpact: 'Technical optimizations typically improve rankings by 10-20%',
      actionItems: [
        'Conduct comprehensive site audit for crawl errors',
        'Optimize XML sitemaps and robots.txt',
        'Implement structured data markup for key pages'
      ],
      dataSource: ['Google Search Console', 'PageSpeed Insights']
    });

    // 5. Performance Tracking & Optimization
    const clicksChange = data?.summary?.clicksChange || 0;
    insights.push({
      id: `fallback-tracking-${timestamp}-5`,
      title: 'Implement Advanced Performance Tracking',
      description: `With ${clicksChange >= 0 ? 'positive' : 'declining'} traffic trends, enhanced tracking will help identify the highest-impact optimization opportunities. Better data leads to better decision-making.`,
      priority: 'low',
      category: 'performance',
      expectedImpact: 'Improved tracking leads to 30% better optimization ROI',
      actionItems: [
        'Set up conversion tracking for all business goals',
        'Implement heat map tracking on key landing pages',
        'Create custom dashboards for performance monitoring'
      ],
      dataSource: ['Google Analytics', 'Google Search Console']
    });

    return insights.slice(0, 5); // Return exactly 5 insights
  }

  // Cost estimation for AI usage
  estimateInsightCost(dataSize: number): number {
    // Rough estimate: ~1500 tokens input + 500 tokens output
    // Claude pricing: ~$0.003 per 1K tokens
    const estimatedTokens = 2000;
    return (estimatedTokens / 1000) * 0.003;
  }
}
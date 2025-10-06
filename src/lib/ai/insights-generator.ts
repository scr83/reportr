import Anthropic from '@anthropic-ai/sdk';
import { AIInsight, ReportData } from '@/types/google-api';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export class AIInsightsGenerator {
  async generateInsights(data: Partial<ReportData>): Promise<AIInsight[]> {
    const prompt = this.buildInsightPrompt(data);
    
    try {
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      const content = response.content[0];
      if (content && content.type === 'text') {
        return this.parseInsights(content.text);
      }
      
      throw new Error('Invalid response format from AI');
    } catch (error) {
      console.error('AI insights generation failed:', error);
      return this.getFallbackInsights(data);
    }
  }

  private buildInsightPrompt(data: Partial<ReportData>): string {
    return `
Analyze this SEO data and provide exactly 3 actionable insights in JSON format.

Data Summary:
- Domain: ${data.client?.domain || 'example.com'}
- Total Clicks: ${data.summary?.totalClicks || 0} (${data.summary?.clicksChange || 0}% change)
- Average Position: ${data.summary?.averagePosition || 0}
- Organic Sessions: ${data.summary?.organicSessions || 0} (${data.summary?.sessionsChange || 0}% change)
- Mobile Score: ${data.summary?.mobileScore || 0}/100
- Desktop Score: ${data.summary?.desktopScore || 0}/100

Top Keywords: ${data.searchConsole?.topKeywords?.map(k => `${k.keyword} (pos: ${k.position})`).join(', ') || 'No data'}
Top Pages: ${data.searchConsole?.topPages?.map(p => p.page).join(', ') || 'No data'}

Provide response in this exact JSON format:
{
  "insights": [
    {
      "title": "Specific actionable title",
      "description": "Detailed explanation with data backing",
      "priority": "high|medium|low",
      "category": "keyword|technical|content|performance",
      "expectedImpact": "Quantified expected result with timeframe",
      "actionItems": ["Step 1", "Step 2", "Step 3"],
      "dataSource": ["source of insight"]
    }
  ]
}

Make insights specific, actionable, and data-driven. Avoid generic advice.`;
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

    // Generate basic insights based on available data
    if (data?.summary?.mobileScore && data.summary.mobileScore < 60) {
      insights.push({
        id: `fallback-mobile-${Date.now()}`,
        title: 'Improve Mobile Page Speed',
        description: `Mobile page speed score is ${data.summary.mobileScore}/100, which may impact search rankings and user experience.`,
        priority: 'high',
        category: 'technical',
        expectedImpact: '15-25% improvement in mobile rankings within 30 days',
        actionItems: [
          'Optimize image sizes and formats',
          'Minimize JavaScript and CSS',
          'Enable browser caching'
        ],
        dataSource: ['PageSpeed Insights']
      });
    }

    if (data?.summary?.averagePosition && data.summary.averagePosition > 10) {
      insights.push({
        id: `fallback-keywords-${Date.now()}`,
        title: 'Target Lower Competition Keywords',
        description: `Average keyword position is ${data.summary.averagePosition}, indicating opportunity to target more specific, long-tail keywords.`,
        priority: 'medium',
        category: 'keyword',
        expectedImpact: '20-30% increase in organic traffic within 60 days',
        actionItems: [
          'Research long-tail keyword variations',
          'Create content targeting specific user intent',
          'Optimize existing pages for secondary keywords'
        ],
        dataSource: ['Google Search Console']
      });
    }

    // Always provide at least one insight
    if (insights.length === 0) {
      insights.push({
        id: `fallback-general-${Date.now()}`,
        title: 'Expand Content Strategy',
        description: 'Based on current performance, there are opportunities to improve organic visibility through strategic content expansion.',
        priority: 'medium',
        category: 'content',
        expectedImpact: '10-20% increase in organic traffic within 90 days',
        actionItems: [
          'Analyze competitor content gaps',
          'Create comprehensive topic clusters',
          'Improve internal linking structure'
        ],
        dataSource: ['Google Analytics', 'Search Console']
      });
    }

    return insights.slice(0, 3); // Limit to 3 insights
  }

  // Cost estimation for AI usage
  estimateInsightCost(dataSize: number): number {
    // Rough estimate: ~1500 tokens input + 500 tokens output
    // Claude pricing: ~$0.003 per 1K tokens
    const estimatedTokens = 2000;
    return (estimatedTokens / 1000) * 0.003;
  }
}
import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Configure route for serverless function
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * TEST ENDPOINT: Anthropic API Integration Debug
 * 
 * This endpoint tests the Anthropic API integration in isolation
 * to debug why AI insights are not being generated in PDF reports.
 */
export async function GET() {
  const testId = `test-${Date.now()}`;
  
  console.log(`🧪 [ANTHROPIC-TEST-${testId}] ========== STARTING ANTHROPIC API TEST ==========`);
  
  try {
    // Step 1: Environment Variable Check
    console.log(`🧪 [ANTHROPIC-TEST-${testId}] Step 1: Checking environment variables...`);
    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    const envCheck = {
      exists: !!apiKey,
      length: apiKey?.length || 0,
      prefix: apiKey?.substring(0, 15) + '...' || 'NOT_SET',
      isValidPrefix: apiKey?.startsWith('sk-ant-') || false,
      // Check if it's the expected key (first few chars for security)
      matchesExpected: apiKey?.startsWith('sk-ant-api03-') || false
    };
    
    console.log(`🧪 [ANTHROPIC-TEST-${testId}] Environment check:`, envCheck);
    
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY not found in environment variables');
    }
    
    if (!apiKey.startsWith('sk-ant-')) {
      throw new Error(`Invalid API key format. Expected 'sk-ant-' prefix, got: '${apiKey.substring(0, 10)}...'`);
    }
    
    // Step 2: Anthropic Client Initialization
    console.log(`🧪 [ANTHROPIC-TEST-${testId}] Step 2: Initializing Anthropic client...`);
    
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });
    
    console.log(`🧪 [ANTHROPIC-TEST-${testId}] ✅ Anthropic client initialized successfully`);
    
    // Step 3: Test API Call - Simple Hello
    console.log(`🧪 [ANTHROPIC-TEST-${testId}] Step 3: Making test API call...`);
    
    const testStartTime = Date.now();
    
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514', // Updated to the working model from curl
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: `Hello! This is a test from testId: ${testId}. Please respond with a simple confirmation that you received this message.`
      }]
    });
    
    const testDuration = Date.now() - testStartTime;
    
    console.log(`🧪 [ANTHROPIC-TEST-${testId}] ✅ API call successful in ${testDuration}ms`);
    console.log(`🧪 [ANTHROPIC-TEST-${testId}] Response details:`, {
      contentLength: response.content?.length || 0,
      contentType: response.content?.[0]?.type,
      usage: response.usage,
      model: response.model
    });
    
    const responseText = response.content[0]?.type === 'text' ? response.content[0].text : 'No text content';
    
    // Step 4: Test AI Insights Generation (same as production)
    console.log(`🧪 [ANTHROPIC-TEST-${testId}] Step 4: Testing AI insights generation...`);
    
    const insightsStartTime = Date.now();
    
    const insightsResponse = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022', // Production model
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `Generate exactly 5 strategic SEO recommendations for this test data:
        
Domain: test-company.com
Total Clicks: 1250 (+15.3% change)
Total Impressions: 45000
Average Position: 8.2
Organic Sessions: 2100 (+12.1% change)
Mobile Score: 85/100
Desktop Score: 92/100
Top Keywords: digital marketing (pos: 6.2, clicks: 150), online strategy (pos: 8.1, clicks: 89)

Return ONLY valid JSON array with exactly 5 recommendations in this format:
{
  "insights": [
    {
      "title": "Action-oriented title",
      "description": "Detailed explanation",
      "priority": "high|medium|low",
      "category": "keyword|technical|content|performance",
      "expectedImpact": "Quantified result",
      "actionItems": ["Step 1", "Step 2", "Step 3"]
    }
  ]
}`
      }]
    });
    
    const insightsDuration = Date.now() - insightsStartTime;
    
    console.log(`🧪 [ANTHROPIC-TEST-${testId}] ✅ Insights API call successful in ${insightsDuration}ms`);
    
    const insightsText = insightsResponse.content[0]?.type === 'text' ? insightsResponse.content[0].text : 'No text content';
    
    // Step 5: Parse insights (same logic as production)
    let parsedInsights = null;
    let parseError = null;
    
    try {
      const cleanResponse = insightsText
        .replace(/```json\\s*/, '')
        .replace(/```\\s*$/, '')
        .trim();
      
      parsedInsights = JSON.parse(cleanResponse);
      console.log(`🧪 [ANTHROPIC-TEST-${testId}] ✅ Insights parsed successfully:`, {
        insightCount: parsedInsights.insights?.length || 0,
        categories: parsedInsights.insights?.map((i: any) => i.category) || []
      });
    } catch (error) {
      parseError = error instanceof Error ? error.message : String(error);
      console.log(`🧪 [ANTHROPIC-TEST-${testId}] ❌ Failed to parse insights:`, parseError);
    }
    
    console.log(`🧪 [ANTHROPIC-TEST-${testId}] ========== ANTHROPIC API TEST COMPLETE ==========`);
    
    return NextResponse.json({
      success: true,
      testId,
      timestamp: new Date().toISOString(),
      environment: envCheck,
      simpleTest: {
        success: true,
        duration: testDuration,
        responseText: responseText.substring(0, 200) + (responseText.length > 200 ? '...' : ''),
        model: response.model,
        usage: response.usage
      },
      insightsTest: {
        success: true,
        duration: insightsDuration,
        model: insightsResponse.model,
        usage: insightsResponse.usage,
        rawResponse: insightsText.substring(0, 500) + (insightsText.length > 500 ? '...' : ''),
        parsed: {
          success: !!parsedInsights,
          error: parseError,
          insightCount: parsedInsights?.insights?.length || 0,
          insights: parsedInsights?.insights || null
        }
      }
    });
    
  } catch (error) {
    console.error(`🧪 [ANTHROPIC-TEST-${testId}] ❌ Anthropic API test failed:`, {
      error: error instanceof Error ? error.message : error,
      errorName: error instanceof Error ? error.name : 'Unknown',
      stack: error instanceof Error ? error.stack?.substring(0, 1000) : undefined
    });
    
    console.log(`🧪 [ANTHROPIC-TEST-${testId}] ========== ANTHROPIC API TEST FAILED ==========`);
    
    return NextResponse.json({
      success: false,
      testId,
      timestamp: new Date().toISOString(),
      error: {
        message: error instanceof Error ? error.message : String(error),
        name: error instanceof Error ? error.name : 'Unknown',
        type: typeof error
      },
      environment: {
        exists: !!process.env.ANTHROPIC_API_KEY,
        length: process.env.ANTHROPIC_API_KEY?.length || 0,
        prefix: process.env.ANTHROPIC_API_KEY?.substring(0, 15) + '...' || 'NOT_SET'
      }
    }, { 
      status: 500 
    });
  }
}
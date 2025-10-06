# 🔧 Agent 1: Backend Services & API Integration Specialist

## ROLE & IDENTITY
You are a **Senior Backend Engineer** specializing in Node.js/TypeScript, API integrations, and distributed systems. Your expertise includes:
- Google APIs (Search Console, Analytics 4, PageSpeed Insights)
- OAuth 2.0 authentication flows
- Background job processing with Redis
- RESTful API design
- Error handling and retry logic
- Database operations with Prisma ORM

## PROJECT CONTEXT
**Project:** SEO ReportBot - White-label SaaS for digital marketing agencies
**Your Mission:** Build the complete backend infrastructure that powers automated SEO report generation
**Current State:** 35% complete - database schema exists, basic auth works, API clients need implementation
**Priority:** HIGH - This is critical path for revenue generation

## YOUR RESPONSIBILITIES

### 1. Google API Integration (PRIORITY: CRITICAL)
Complete the implementation of three Google API clients:

#### A. Search Console API Client
**File:** `src/lib/google/search-console.ts`
**Status:** 40% complete - class structure exists, methods need implementation

**Tasks:**
- [ ] Implement `getPerformanceData()` method
  - Fetch total clicks, impressions, CTR, average position
  - Get top 50 keywords with performance metrics
  - Get top 50 pages with performance metrics
  - Date range: configurable start/end dates
  - Include proper error handling and retries

- [ ] Implement `getTopKeywords()` method
  - Return keyword, clicks, impressions, CTR, position
  - Sort by clicks descending
  - Limit: configurable (default 50)

- [ ] Implement `getTopPages()` method
  - Return page URL, clicks, impressions, CTR, position
  - Sort by clicks descending
  - Limit: configurable (default 50)

- [ ] Add retry logic for rate limit errors (429)
- [ ] Add proper TypeScript types for all responses
- [ ] Test with real Search Console data

**Expected Output Format:**
```typescript
interface SearchConsoleData {
  totalClicks: number;
  totalImpressions: number;
  averagePosition: number;
  averageCTR: number;
  clicksChange: number; // vs previous period
  impressionsChange: number;
  topKeywords: KeywordPerformance[];
  topPages: PagePerformance[];
}
```

#### B. Google Analytics 4 API Client
**File:** `src/lib/google/analytics.ts`
**Status:** 30% complete - needs full implementation

**Tasks:**
- [ ] Implement `getOrganicTrafficData()` method
  - Fetch organic sessions, users, bounce rate, avg session duration
  - Filter for organic traffic only (source/medium = google/organic)
  - Get top 30 landing pages from organic traffic
  - Include engagement metrics per page
  - Date range: configurable

- [ ] Implement `getTrafficTrend()` method
  - Daily traffic data for charts
  - Return date, sessions, users
  - 30-day or 90-day periods

- [ ] Add proper OAuth token handling
- [ ] Implement error handling for GA4 API errors
- [ ] Test with real GA4 property

**Expected Output Format:**
```typescript
interface AnalyticsData {
  totalSessions: number;
  totalUsers: number;
  bounceRate: number;
  avgSessionDuration: number;
  sessionsChange: number; // vs previous period
  topLandingPages: LandingPagePerformance[];
  trafficTrend: TrafficDataPoint[];
}
```

#### C. PageSpeed Insights API Client
**File:** `src/lib/google/pagespeed.ts`
**Status:** 50% complete - basic structure exists

**Tasks:**
- [ ] Implement `getPageSpeedData()` method
  - Fetch both mobile and desktop scores
  - Get Core Web Vitals (LCP, FID, CLS)
  - Include performance opportunities
  - Test with real URLs

- [ ] Add caching (PageSpeed API is rate-limited)
- [ ] Handle errors gracefully
- [ ] Return simplified, actionable data

**Expected Output Format:**
```typescript
interface PageSpeedData {
  mobileScore: number;
  desktopScore: number;
  coreWebVitals: {
    lcp: number;
    fid: number;
    cls: number;
  };
  opportunities: string[]; // Top 3-5 recommendations
}
```

#### D. OAuth Token Management
**File:** `src/lib/google/config.ts`
**Status:** Incomplete - needs refresh token logic

**Tasks:**
- [ ] Implement `refreshAccessToken()` function
  - Use refresh token to get new access token
  - Update token in database
  - Handle expired refresh tokens
  - Return new access token

- [ ] Implement `validateToken()` function
  - Check if token is expired
  - Trigger refresh if needed
  - Return valid token

- [ ] Add token encryption/decryption helpers
- [ ] Test token refresh flow

---

### 2. Report Generation Service (PRIORITY: CRITICAL)

#### A. Data Aggregation Pipeline
**File:** `src/lib/reports/data-aggregator.ts` (CREATE NEW)

**Tasks:**
- [ ] Create `aggregateReportData()` function
  - Accept clientId and date range
  - Fetch data from all 3 Google APIs in parallel
  - Cross-reference keywords with landing pages
  - Calculate period-over-period changes
  - Handle missing or incomplete data gracefully

**Implementation Guide:**
```typescript
export async function aggregateReportData(
  clientId: string,
  dateRange: { start: string; end: string }
): Promise<AggregatedReportData> {
  // 1. Fetch client from database with API tokens
  const client = await prisma.client.findUnique({
    where: { id: clientId },
    include: { user: true }
  });

  // 2. Validate tokens and refresh if needed
  // 3. Fetch data from all APIs in parallel
  const [gscData, ga4Data, pageSpeedData] = await Promise.all([
    searchConsoleClient.getPerformanceData(...),
    analyticsClient.getOrganicTrafficData(...),
    pageSpeedClient.getPageSpeedData(...)
  ]);

  // 4. Cross-reference data (keywords + pages + analytics)
  const keywordPageMapping = correlateKeywordsWithPages(
    gscData.topKeywords,
    gscData.topPages,
    ga4Data.topLandingPages
  );

  // 5. Calculate insights and recommendations
  const insights = generateInsights(gscData, ga4Data, pageSpeedData);

  // 6. Return aggregated data
  return {
    summary: { ... },
    keywords: gscData.topKeywords,
    pages: gscData.topPages,
    keywordPageMapping,
    trafficTrend: ga4Data.trafficTrend,
    pageSpeed: pageSpeedData,
    insights,
    generatedAt: new Date()
  };
}
```

#### B. Keyword-Page Correlation
**File:** `src/lib/reports/correlations.ts` (CREATE NEW)

**Tasks:**
- [ ] Create `correlateKeywordsWithPages()` function
  - Match keywords to their ranking pages
  - Include analytics data (sessions, bounce rate) for those pages
  - Return enriched keyword-page mappings

**Expected Output:**
```typescript
interface KeywordPageMapping {
  keyword: string;
  position: number;
  clicks: number;
  impressions: number;
  ctr: number;
  landingPage: string;
  pageTitle: string;
  sessions: number;
  bounceRate: number;
  engagementRate: number;
}
```

#### C. Report Generation Orchestrator
**File:** `src/lib/reports/generator.ts` (CREATE NEW)

**Tasks:**
- [ ] Create `ReportGenerator` class
- [ ] Implement `generateReport()` method
  - Create report record in database (status: PROCESSING)
  - Queue background job for data collection
  - Return report ID immediately
  - Handle errors and update status

**Implementation:**
```typescript
export class ReportGenerator {
  async generateReport(
    clientId: string,
    userId: string,
    dateRange?: { start: string; end: string }
  ): Promise<string> {
    // 1. Create report record
    const report = await prisma.report.create({
      data: {
        clientId,
        userId,
        title: `SEO Report - ${new Date().toLocaleDateString()}`,
        status: 'PROCESSING',
        processingStartedAt: new Date()
      }
    });

    // 2. Queue background job
    await reportQueue.enqueue({
      reportId: report.id,
      clientId,
      userId,
      dateRange
    });

    return report.id;
  }

  async processReport(reportId: string): Promise<void> {
    // This runs in background worker
    // 1. Aggregate data
    // 2. Generate AI insights
    // 3. Create PDF
    // 4. Upload PDF
    // 5. Update database
  }
}
```

---

### 3. AI Insights Generation (PRIORITY: HIGH)

**File:** `src/lib/ai/insights-generator.ts` (CREATE NEW)

**Tasks:**
- [ ] Set up Anthropic Claude API client
- [ ] Create `generateInsights()` function
  - Analyze aggregated SEO data
  - Generate actionable recommendations
  - Identify top opportunities
  - Highlight concerning trends

**Implementation Guide:**
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!
});

export async function generateInsights(
  reportData: AggregatedReportData
): Promise<ReportInsights> {
  const prompt = `
You are an expert SEO analyst. Analyze this data and provide:
1. Top 3 wins (positive trends)
2. Top 3 concerns (negative trends or issues)
3. Top 5 actionable recommendations

Data:
- Total Clicks: ${reportData.summary.totalClicks} (${reportData.summary.clicksChange > 0 ? '+' : ''}${reportData.summary.clicksChange}%)
- Average Position: ${reportData.summary.averagePosition}
- Bounce Rate: ${reportData.summary.bounceRate}%
- Page Speed (Mobile): ${reportData.pageSpeed.mobileScore}/100

Top Keywords: ${JSON.stringify(reportData.keywords.slice(0, 10))}
Top Pages: ${JSON.stringify(reportData.pages.slice(0, 10))}

Provide insights in JSON format:
{
  "wins": ["win1", "win2", "win3"],
  "concerns": ["concern1", "concern2", "concern3"],
  "recommendations": ["rec1", "rec2", "rec3", "rec4", "rec5"]
}
`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    messages: [{ role: 'user', content: prompt }]
  });

  // Parse response and return structured insights
  const content = message.content[0];
  if (content.type === 'text') {
    return JSON.parse(content.text);
  }
  
  throw new Error('Failed to generate insights');
}
```

---

### 4. Background Job Queue (PRIORITY: HIGH)

**File:** `src/lib/queue/report-queue.ts` (CREATE NEW)

**Tasks:**
- [ ] Set up Upstash Redis client
- [ ] Create queue system for report generation
- [ ] Implement job processor
- [ ] Add retry logic for failed jobs

**Implementation:**
```typescript
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!
});

export class ReportQueue {
  private queueKey = 'report-generation-queue';

  async enqueue(job: ReportJob): Promise<void> {
    await redis.lpush(this.queueKey, JSON.stringify(job));
    console.log(`Queued report generation job: ${job.reportId}`);
  }

  async processNext(): Promise<void> {
    const jobData = await redis.rpop(this.queueKey);
    if (!jobData) return;

    const job: ReportJob = JSON.parse(jobData as string);
    
    try {
      await this.processJob(job);
    } catch (error) {
      console.error(`Job failed: ${job.reportId}`, error);
      // Update report status to FAILED
      await prisma.report.update({
        where: { id: job.reportId },
        data: { 
          status: 'FAILED',
          errorMessage: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    }
  }

  private async processJob(job: ReportJob): Promise<void> {
    // 1. Aggregate data
    const reportData = await aggregateReportData(job.clientId, job.dateRange);
    
    // 2. Generate insights
    const insights = await generateInsights(reportData);
    
    // 3. Generate PDF
    const pdfBuffer = await generatePDF({ ...reportData, insights }, job.userId);
    
    // 4. Upload PDF
    const pdfUrl = await uploadPDF(pdfBuffer, job.reportId);
    
    // 5. Update database
    await prisma.report.update({
      where: { id: job.reportId },
      data: {
        status: 'COMPLETED',
        pdfUrl,
        data: reportData as any,
        processingCompletedAt: new Date()
      }
    });
  }
}

// Worker process (run separately or in API route)
export async function startWorker(): Promise<void> {
  const queue = new ReportQueue();
  
  while (true) {
    await queue.processNext();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Poll every second
  }
}
```

---

### 5. API Routes Implementation (PRIORITY: HIGH)

#### A. Client Management API
**File:** `src/app/api/clients/route.ts`

**Tasks:**
- [ ] GET `/api/clients` - List all clients for user
- [ ] POST `/api/clients` - Create new client

**File:** `src/app/api/clients/[id]/route.ts`

**Tasks:**
- [ ] GET `/api/clients/[id]` - Get client details
- [ ] PUT `/api/clients/[id]` - Update client
- [ ] DELETE `/api/clients/[id]` - Delete client

**Example Implementation:**
```typescript
// src/app/api/clients/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createClientSchema = z.object({
  name: z.string().min(1),
  domain: z.string().url(),
  contactEmail: z.string().email().optional(),
  contactName: z.string().optional()
});

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const clients = await prisma.client.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { reports: true } }
    }
  });

  return NextResponse.json(clients);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validData = createClientSchema.parse(body);

    const client = await prisma.client.create({
      data: {
        ...validData,
        userId: session.user.id
      }
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
  }
}
```

#### B. Report Generation API
**File:** `src/app/api/clients/[id]/reports/route.ts`

**Tasks:**
- [ ] POST `/api/clients/[id]/reports` - Generate new report

**Implementation:**
```typescript
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const clientId = params.id;

  // Verify client belongs to user
  const client = await prisma.client.findFirst({
    where: { id: clientId, userId: session.user.id }
  });

  if (!client) {
    return NextResponse.json({ error: 'Client not found' }, { status: 404 });
  }

  // Generate report
  const generator = new ReportGenerator();
  const reportId = await generator.generateReport(clientId, session.user.id);

  return NextResponse.json({ reportId, status: 'PROCESSING' }, { status: 202 });
}
```

#### C. Report Status API
**File:** `src/app/api/reports/[id]/route.ts`

**Tasks:**
- [ ] GET `/api/reports/[id]` - Get report status and download URL

#### D. Google OAuth Flow
**File:** `src/app/api/google/connect/route.ts`

**Tasks:**
- [ ] Initiate Google OAuth flow for Search Console + Analytics
- [ ] Store tokens securely in database

**File:** `src/app/api/google/callback/route.ts`

**Tasks:**
- [ ] Handle OAuth callback
- [ ] Exchange code for tokens
- [ ] Store refresh token (encrypted)

---

### 6. Error Handling & Logging (PRIORITY: MEDIUM)

**File:** `src/lib/google/error-handling.ts`

**Tasks:**
- [ ] Implement comprehensive error types
- [ ] Add retry logic with exponential backoff
- [ ] Create error logging system
- [ ] Add user-friendly error messages

**Implementation:**
```typescript
export class ReportGenerationError extends Error {
  constructor(
    message: string,
    public code: string,
    public retryable: boolean = false
  ) {
    super(message);
    this.name = 'ReportGenerationError';
  }
}

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = Math.pow(2, i) * 1000; // Exponential backoff
      console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error('Max retries exceeded');
}
```

---

## TESTING REQUIREMENTS

### Unit Tests (Optional but Recommended)
Create test files for critical functions:
- `src/lib/google/__tests__/search-console.test.ts`
- `src/lib/google/__tests__/analytics.test.ts`
- `src/lib/reports/__tests__/data-aggregator.test.ts`

### Manual Testing Checklist
- [ ] Test Search Console API with real account
- [ ] Test Analytics API with real property
- [ ] Test PageSpeed API with various URLs
- [ ] Test report generation end-to-end
- [ ] Test error scenarios (invalid tokens, rate limits)
- [ ] Test background job processing
- [ ] Test API routes with Postman/Thunder Client

---

## ENVIRONMENT VARIABLES NEEDED

Add to `.env`:
```bash
# Google APIs
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
PAGESPEED_API_KEY=your_pagespeed_key

# Anthropic Claude
ANTHROPIC_API_KEY=your_anthropic_key

# Upstash Redis
UPSTASH_REDIS_URL=your_redis_url
UPSTASH_REDIS_TOKEN=your_redis_token

# Vercel Blob
BLOB_READ_WRITE_TOKEN=your_blob_token
```

---

## SUCCESS CRITERIA

Your work is complete when:
1. ✅ All 3 Google API clients fully functional with real data
2. ✅ Report generation pipeline works end-to-end
3. ✅ Background jobs process reliably
4. ✅ All API routes return correct responses
5. ✅ Error handling covers edge cases
6. ✅ Token refresh works automatically
7. ✅ AI insights generate correctly
8. ✅ Manual testing passes all scenarios

---

## CODE QUALITY STANDARDS

- **TypeScript:** Strict mode, no `any` types
- **Error Handling:** Try-catch blocks with specific error types
- **Logging:** Console logs for debugging (will add proper logging later)
- **Documentation:** JSDoc comments for all public functions
- **Validation:** Zod schemas for all external data
- **Security:** Never log sensitive tokens or API keys

---

## DELIVERY TIMELINE

**Estimated:** 5-7 days of focused development

**Milestones:**
- Day 1-2: Complete Google API integrations
- Day 3-4: Build report generation pipeline
- Day 5: Implement background jobs
- Day 6: Create API routes
- Day 7: Testing and refinement

---

## SUPPORT & RESOURCES

**Google API Documentation:**
- Search Console: https://developers.google.com/webmaster-tools/search-console-api-original
- Analytics 4: https://developers.google.com/analytics/devguides/reporting/data/v1
- PageSpeed: https://developers.google.com/speed/docs/insights/v5/get-started

**Libraries:**
- googleapis: https://github.com/googleapis/google-api-nodejs-client
- @anthropic-ai/sdk: https://docs.anthropic.com/claude/reference/client-sdks
- @upstash/redis: https://docs.upstash.com/redis/sdks/ts/overview

**Questions?** Review `CLAUDE.md` and `documentation/` folder for additional context.

---

## FINAL NOTES

You are the **critical path** for this project. Without your backend services, the entire product cannot function. Focus on:
1. **Reliability** - Handle errors gracefully
2. **Performance** - Use parallel requests where possible
3. **Security** - Never expose API tokens
4. **Testing** - Validate with real data before marking complete

**Your success = Product revenue readiness. Let's build something amazing! 🚀**

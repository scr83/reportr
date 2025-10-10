# Technical Architecture Documentation

## Database Schema

### Current Models (Implemented)
- **User**: Agency owners with white-label branding settings
- **Client**: Agency clients with Google API connection tracking
- **Report**: Generated reports with PDF storage and processing metadata
- **Account/Session**: NextAuth.js authentication tables

### Planned Extensions
```sql
-- Add to Client model
googleConnectedAt     DateTime?
lastDataFetch         DateTime?
dataFetchErrors       Int @default(0)
gscAccessToken        String? // encrypted
gscRefreshToken       String? // encrypted
ga4AccessToken        String? // encrypted
ga4RefreshToken       String? // encrypted
gscStatus            ConnectionStatus @default(DISCONNECTED)
ga4Status            ConnectionStatus @default(CONNECTED)
averageReportTime     Int? // milliseconds
```

## API Integration Strategy

### Google APIs Required
1. **Search Console API**
   - Endpoint: `https://searchconsole.googleapis.com/webmasters/v3/`
   - Data: Keywords, clicks, impressions, positions, pages
   - Rate Limit: 100 requests/minute, 1,000/day

2. **Google Analytics 4 API**
   - Endpoint: `https://analyticsdata.googleapis.com/v1beta/`
   - Data: Organic sessions, users, bounce rate, landing pages
   - Rate Limit: 100 requests/minute, 50,000/day

3. **PageSpeed Insights API**
   - Endpoint: `https://pagespeedonline.googleapis.com/pagespeedonline/v5/`
   - Data: Core Web Vitals, performance scores, opportunities
   - Rate Limit: 25 requests/minute, 25,000/day

### Authentication Flow
1. User connects Google account via NextAuth.js OAuth
2. Store access/refresh tokens in database (encrypted)
3. Use refresh token to maintain API access
4. Handle token expiration with automatic refresh
5. Provide clear reconnection flow when auth fails

## Data Processing Pipeline

### Report Generation Flow
1. **Trigger**: User requests report generation
2. **Queue**: Add job to Redis queue for async processing
3. **Fetch**: Collect data from all Google APIs in parallel
4. **Process**: Aggregate and cross-reference data
5. **AI**: Generate insights using Claude API
6. **PDF**: Create branded PDF with all data and insights
7. **Store**: Upload PDF to Vercel Blob storage
8. **Notify**: Update database and notify user

### Data Aggregation Logic
```typescript
// Cross-reference keywords with landing pages
const keywordPageMapping = searchConsoleKeywords.map(keyword => ({
  keyword: keyword.query,
  position: keyword.position,
  clicks: keyword.clicks,
  landingPage: findLandingPage(keyword.query, analyticsPages),
  sessions: getSessionsForPage(landingPage, analyticsData),
  bounceRate: getBounceRateForPage(landingPage, analyticsData)
}));
```

## AI Insights System

### Claude API Integration
- **Model**: claude-3-5-sonnet-20241022
- **Cost**: ~$0.30-0.50 per report (2000 tokens avg)
- **Timeout**: 30 seconds max
- **Fallback**: Rule-based insights if AI fails

### Insight Categories
- **Keyword**: Opportunities to improve search rankings
- **Technical**: Page speed, Core Web Vitals issues
- **Content**: Content gaps and optimization opportunities
- **Performance**: Traffic and conversion improvements

### Quality Controls
- Validate AI response format with Zod schemas
- Implement fallback insights for common scenarios
- Track insight accuracy and user feedback
- Cost monitoring and rate limiting

## PDF Generation System

### React-PDF Implementation
- **Library**: @react-pdf/renderer (chosen over Puppeteer for performance)
- **Template**: Modular component system for different report sections
- **Branding**: Dynamic logo, colors, and fonts per agency
- **Performance**: Stream generation, asset caching, compression

### Template Structure
```typescript
<ReportTemplate>
  <ReportHeader agency={agency} client={client} />
  <ExecutiveSummary metrics={summary} />
  <TrafficSection data={analytics} />
  <KeywordSection data={searchConsole} />
  <TechnicalSection data={pageSpeed} />
  <InsightsSection insights={aiInsights} />
  <ReportFooter agency={agency} />
</ReportTemplate>
```

## Performance Requirements

### Target Metrics
- **Report Generation**: < 3 minutes end-to-end
- **API Response**: < 2 seconds for data fetching
- **PDF Creation**: < 30 seconds
- **File Upload**: < 10 seconds
- **UI Response**: < 500ms for all interactions

### Scaling Considerations
- **Current Capacity**: 50 users, 500 reports/month
- **Target Capacity**: 1000+ agencies, 50K+ reports/month
- **Bottlenecks**: Google API rate limits, PDF generation, file storage costs
- **Solutions**: Background processing, caching, CDN for PDFs

## Security Implementation

### Data Protection
- Encrypt all API tokens in database
- Use environment variables for API keys
- Implement proper CORS and CSP headers
- Rate limiting on all API endpoints
- Input validation with Zod schemas

### Authentication
- NextAuth.js with Google OAuth
- Secure session management
- Proper token refresh mechanisms
- Clear error handling for auth failures

## Error Handling Strategy

### Error Categories
- **Retryable**: Rate limits, temporary server errors
- **Auth Errors**: Require user reconnection
- **Client Errors**: Invalid requests, missing permissions
- **System Errors**: Database failures, service outages

### User Experience
- Clear error messages with actionable steps
- Retry mechanisms with exponential backoff
- Graceful degradation when services fail
- Comprehensive logging for debugging

## Development Workflow

### Code Organization
- Atomic design for components
- Service layer for business logic
- Proper TypeScript typing throughout
- Consistent error handling patterns

### Testing Strategy
- Unit tests for core business logic
- Integration tests for API endpoints
- End-to-end tests for critical user flows
- Performance testing under load

### Deployment
- Vercel for hosting and serverless functions
- Environment-specific configurations
- Database migrations with Prisma
- Monitoring and alerting setup
# Claude Code Implementation Prompt

## Project Context & Current Status

You are Claude Code, an AI coding assistant working on **Reportr**, a white-label SEO reporting SaaS tool for digital marketing agencies. This tool generates professional, AI-powered PDF reports in under 3 minutes, replacing the typical 8+ hour manual process.

### Project Overview
- **Parent Company**: Digital Frog (AI automation agency)
- **Target Market**: Digital agencies managing 5-200+ clients  
- **Business Model**: $5-12 per client per month
- **Tech Stack**: Next.js 14 + TypeScript + PostgreSQL + Prisma + NextAuth

### Current Development Status
The project foundation has been completed by the architecture team:

#### ✅ Completed Foundation Work
1. **Project Structure**: Complete atomic design system, database schema, authentication
2. **Package Dependencies**: All required packages added (googleapis, @anthropic-ai/sdk, @react-pdf/renderer, @upstash/redis, @vercel/blob)
3. **Type Definitions**: Complete TypeScript interfaces in `src/types/google-api.ts`
4. **Error Handling**: Robust system in `src/lib/google/error-handling.ts` with retry logic
5. **Google API Config**: OAuth and rate limiting setup in `src/lib/google/config.ts`
6. **AI Insights Foundation**: Claude API integration in `src/lib/ai/insights-generator.ts`

### Your Mission: Implement Core Business Logic

You need to build the actual implementation that will make Reportr functional. The foundation team has provided all the types, error handling, and configuration - you now need to build the services that use them.

## Immediate Implementation Tasks

### Priority 1: Google API Clients (Week 1, Days 1-3)
Build these service files using the foundation types and error handling:

1. **Search Console API Client** (`src/lib/google/search-console.ts`)
   - Implement data fetching for keywords, clicks, impressions, positions
   - Use `SearchConsoleData` type from foundation
   - Implement proper error handling with `handleGoogleAPIError`
   - Include rate limiting and token refresh

2. **Google Analytics 4 API Client** (`src/lib/google/analytics.ts`)
   - Fetch organic traffic data, sessions, bounce rate
   - Use `AnalyticsData` type from foundation
   - Cross-reference with Search Console data for landing pages
   - Handle API quotas and errors properly

3. **PageSpeed Insights API Client** (`src/lib/google/pagespeed.ts`)
   - Get Core Web Vitals and performance scores
   - Use `PageSpeedData` type from foundation
   - Handle mobile and desktop score collection
   - Extract actionable opportunities

### Priority 2: Client Management System (Week 1, Days 4-5)

4. **Client API Routes** (`src/app/api/clients/`)
   - Implement full CRUD operations for client management
   - Add Google API connection tracking
   - Include connection status monitoring
   - Proper validation with existing Prisma schema

5. **Client Management UI** (build upon existing components)
   - Create client table using existing atoms/molecules
   - Add/edit client forms with Google API connection flow
   - Status indicators for API connections
   - Error handling and user feedback

### Priority 3: Report Generation Pipeline (Week 2)

6. **Background Job System** (`src/lib/queue/`)
   - Implement Upstash Redis queue for async report generation
   - Job status tracking and progress updates
   - Error handling and retry mechanisms
   - Real-time status updates for UI

7. **Data Processing Service** (`src/lib/reports/`)
   - Aggregate data from all Google APIs
   - Cross-reference keywords with landing pages
   - Calculate deltas and trends
   - Prepare data for AI insights and PDF generation

## Technical Requirements & Constraints

### Use Foundation Components
- **Types**: Use all interfaces from `src/types/google-api.ts`
- **Error Handling**: Use `handleGoogleAPIError` and `retryWithBackoff` from foundation
- **Google Config**: Use `createGoogleAuthClient` and rate limiting from `src/lib/google/config.ts`
- **AI Integration**: Extend the `AIInsightsGenerator` class as needed

### Database Integration
- Use existing Prisma schema and models
- Extend Client model as needed for API token storage
- Maintain proper relations and indexing
- Handle sensitive data encryption

### Performance Standards
- Report generation: < 3 minutes end-to-end
- API responses: < 2 seconds
- Handle concurrent users without blocking
- Implement proper caching strategies

### Security Requirements
- Encrypt all API tokens in database
- Proper input validation with Zod schemas
- Rate limiting on all endpoints
- Secure token refresh mechanisms

## Code Style & Standards

### Follow Existing Patterns
- Use atomic design component structure
- TypeScript strict mode (no `any` types)
- Consistent error handling throughout
- Proper logging for debugging

### Component Integration
- Build upon existing UI components in `src/components/`
- Use existing hooks and utilities
- Maintain consistent styling with Tailwind
- Follow established naming conventions

### API Design
- RESTful endpoints following existing patterns
- Consistent error response format
- Proper HTTP status codes
- Documentation-ready responses

## Implementation Strategy

### Week 1 Focus
1. Get Google APIs working with real data
2. Build client management system
3. Test with multiple clients and domains
4. Ensure authentication and token management works

### Success Criteria Week 1
- Successfully fetch data from Search Console, GA4, and PageSpeed
- Create, read, update, delete clients through UI
- Handle API errors gracefully with user feedback
- Store and refresh Google API tokens properly

### Development Notes
- The human developer will handle environment setup and API keys
- Architecture team provides code review and guidance
- Focus on functionality first, optimization second
- Document any architectural decisions or changes needed

## Context Files to Reference

Key foundation files you should examine and build upon:
- `src/types/google-api.ts` - All type definitions
- `src/lib/google/error-handling.ts` - Error handling patterns
- `src/lib/google/config.ts` - Google API configuration
- `src/lib/ai/insights-generator.ts` - AI integration example
- `prisma/schema.prisma` - Database models and relationships
- `src/components/` - Existing UI component library

## Questions to Address During Implementation

1. Do the existing types cover all Google API responses needed?
2. Are there any missing database fields for proper token management?
3. Should background jobs include more granular progress tracking?
4. Are there additional error scenarios not covered by foundation?

## Getting Started

Begin with the Google Search Console API client, as it's the most critical data source. Use the foundation types and error handling, and test thoroughly with real Google accounts and domains.

The foundation is solid - your job is to bring it to life with working implementations that agencies will love using.

---

**Ready to build the core functionality that makes Reportr work!**
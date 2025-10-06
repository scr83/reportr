# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Reportr" - a white-label SEO reporting SaaS for digital marketing agencies. The application generates AI-powered PDF reports by collecting data from Google Search Console, Google Analytics 4, and PageSpeed Insights APIs, then uses Claude API to generate insights and creates branded PDF reports.

**Current Status**: 35% complete - foundation is built, core business logic needs implementation.

## Development Commands

### Database Operations
- `npm run db:migrate` - Run Prisma database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio for database management

### Development
- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 with App Router and TypeScript (strict mode)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **Styling**: Tailwind CSS with atomic design components
- **AI**: Anthropic Claude API for report insights
- **PDF Generation**: React-PDF
- **Storage**: Vercel Blob for PDF files
- **Queue**: Upstash Redis for background processing

### Component Architecture (Atomic Design)
- `src/components/atoms/` - Basic elements (Button, Input, Typography)
- `src/components/molecules/` - Simple combinations (UserMenu, MetricCard)
- `src/components/organisms/` - Complex components (ReportCard, ClientTable)
- `src/components/templates/` - Page layouts (DashboardTemplate)
- `src/components/pages/` - Complete pages

### Core Business Logic Areas
- `src/lib/google/` - Google API integrations (Search Console, Analytics 4, PageSpeed)
- `src/lib/reports/` - Data processing and aggregation pipeline
- `src/lib/ai/` - Claude API integration for insight generation
- `src/lib/pdf/` - PDF template system using React-PDF
- `src/lib/queue/` - Background job processing with Redis

### Database Models
Key models in `prisma/schema.prisma`:
- **User** - Agency owners with white-label branding settings (companyName, primaryColor, logo)
- **Client** - Agency clients with Google API connection tracking
- **Report** - Generated reports with processing metadata and PDF URLs
- **Account/Session** - NextAuth.js authentication
- **ApiUsage** - API usage tracking for billing

## Path Aliases
```typescript
"@/*": ["./src/*"]
"@/components/*": ["./src/components/*"]
"@/lib/*": ["./src/lib/*"]
"@/types/*": ["./src/types/*"]
"@/hooks/*": ["./src/hooks/*"]
```

## Environment Setup

Copy `.env.example` to `.env` and configure:
- `DATABASE_URL` - PostgreSQL connection
- `NEXTAUTH_SECRET` & `NEXTAUTH_URL` - Authentication
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - OAuth
- `ANTHROPIC_API_KEY` - Claude API for insights
- `PAGESPEED_API_KEY` - PageSpeed Insights
- `UPSTASH_REDIS_*` - Queue system
- `BLOB_READ_WRITE_TOKEN` - File storage

## TypeScript Configuration

Strict mode enabled with comprehensive type checking:
- `noImplicitAny: true`
- `strictNullChecks: true`
- `noUncheckedIndexedAccess: true`
- Target: ES2020 with DOM libraries

## Key Implementation Areas

### Authentication Flow
Uses NextAuth.js with Google OAuth. The `src/lib/auth.ts` configures JWT strategy with Google token storage for API access. Prisma adapter is temporarily disabled - needs to be re-enabled for production.

### White-Label Branding
Users can customize:
- Company name (defaults to "{firstName}'s Agency")
- Primary color (defaults to #3B82F6)
- Logo upload
- PDF report branding

### Report Generation Pipeline (Planned)
1. User triggers report → Redis queue job
2. Fetch data from Google APIs in parallel
3. Process and cross-reference data
4. Generate AI insights with Claude API
5. Create branded PDF with React-PDF
6. Upload to Vercel Blob storage
7. Update database and notify user

### Performance Targets
- Report generation: < 3 minutes end-to-end
- API responses: < 2 seconds
- PDF creation: < 30 seconds
- UI interactions: < 500ms

## Development Notes

- Follow atomic design principles for all new components
- Use Zod schemas for API validation (see `src/lib/validations.ts`)
- Implement proper error handling with retries for Google API rate limits
- All API tokens must be encrypted in database
- Maintain strict TypeScript typing throughout
- Use CSS custom properties for white-label theming support
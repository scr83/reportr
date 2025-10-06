# Reportr - SEO Reporting SaaS Project Overview

## Project Vision
Reportr is a white-label SEO reporting tool that generates professional, AI-powered PDF reports for digital marketing agencies in under 3 minutes, replacing the typical 8+ hour manual process.

## Business Context
- **Parent Company**: Digital Frog (digitalfrog.co) - AI automation agency
- **Target Market**: Digital marketing agencies managing 5-200+ clients
- **Pricing Model**: $5-12 per client per month (volume discounts)
- **Launch Strategy**: Soft launch via digitalfrog.co/reportr, eventual separate domain

## Market Validation
- **TAM**: $465B MarTech market, 50K+ agencies in North America
- **Key Pain Points**: Manual reporting (8+ hours), unreliable connectors, lack of AI insights
- **Competitive Advantage**: Speed + reliability + AI recommendations + transparent pricing
- **Market Research**: Comprehensive competitor analysis shows gap in "fast + reliable + AI" segment

## Technical Architecture

### Core Tech Stack
- **Frontend**: Next.js 14 + TypeScript + React 18
- **Styling**: Tailwind CSS + Atomic Design System
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js with Google OAuth
- **APIs**: Google Search Console, Analytics 4, PageSpeed Insights
- **AI**: Anthropic Claude API for insights
- **PDF**: React-PDF for document generation
- **Storage**: Vercel Blob for PDFs and assets
- **Queue**: Upstash Redis for background jobs
- **Deploy**: Vercel

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
├── components/             # Atomic design components
│   ├── atoms/             # Basic elements (Button, Input, etc.)
│   ├── molecules/         # Simple combinations (UserMenu, MetricCard)
│   ├── organisms/         # Complex components (ClientTable, ReportGrid)
│   ├── templates/         # Page layouts
│   └── pages/             # Complete pages
├── lib/                   # Core business logic
│   ├── google/            # Google API integrations
│   ├── reports/           # Data processing pipeline
│   ├── ai/                # AI insights generation
│   ├── pdf/               # PDF generation
│   └── queue/             # Background job processing
├── types/                 # TypeScript definitions
└── hooks/                 # Custom React hooks
```

## Development Status (Current)
- **Overall Progress**: 35% complete
- **Foundation**: Complete (database, auth, UI components)
- **Core Features**: 0% complete (all business logic missing)
- **Estimated Timeline**: 4-5 weeks to MVP with AI assistance

## Team Structure
- **Lead Developer**: Human developer (project owner)
- **AI Architecture**: Claude (strategy, planning, code review)
- **AI Implementation**: Claude Code (actual code generation)
- **Coordination**: All three work in parallel with defined responsibilities

## Success Metrics
- **Week 1**: Successfully fetch data from Google APIs
- **Week 2**: Generate basic report data for multiple clients
- **Week 3**: Create complete branded PDF with AI insights
- **Week 4**: End-to-end report generation under 3 minutes
- **Launch**: 50+ signups = strong product-market fit validation
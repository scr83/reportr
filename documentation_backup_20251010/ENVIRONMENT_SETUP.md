# Environment Setup Guide

## Prerequisites

1. **Node.js**: Version 18+ required
2. **PostgreSQL**: Database server running locally or cloud instance
3. **Google Cloud Console**: Project with APIs enabled
4. **API Keys**: Various service accounts and keys

## Step-by-Step Setup

### 1. Install Dependencies
```bash
cd /Users/scr/WHITE-LABEL-SEO
npm install
```

### 2. Database Setup
```bash
# Copy environment template
cp .env.example .env.local

# Update DATABASE_URL in .env.local
# Run initial migration
npx prisma db push
# (Optional) Seed with test data
npm run db:seed
```

### 3. Google Cloud Console Setup

#### Create Project & Enable APIs
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project: "Reportr SEO Tool"
3. Enable these APIs:
   - Google Search Console API
   - Google Analytics Reporting API
   - PageSpeed Insights API

#### Create OAuth 2.0 Credentials
1. Go to Credentials → Create Credentials → OAuth 2.0 Client
2. Application type: Web application
3. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-domain.com/api/auth/callback/google`
4. Save Client ID and Client Secret

### 4. Required API Keys

Add these to your `.env.local` file:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/reportr"

# NextAuth
NEXTAUTH_SECRET="generate-random-string-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth & APIs
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
PAGESPEED_API_KEY="your-pagespeed-api-key"

# AI Services
ANTHROPIC_API_KEY="sk-ant-your-key-here"

# Queue System (Upstash Redis)
UPSTASH_REDIS_REST_URL="https://your-redis-url"
UPSTASH_REDIS_REST_TOKEN="your-redis-token"

# File Storage (Vercel Blob)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_your-token"
```

### 5. Service Account Setup

#### Anthropic API Key
1. Go to [Anthropic Console](https://console.anthropic.com)
2. Create API key
3. Add to `.env.local` as `ANTHROPIC_API_KEY`

#### Upstash Redis
1. Go to [Upstash Console](https://console.upstash.com)
2. Create Redis database
3. Get REST URL and token
4. Add to `.env.local`

#### Vercel Blob Storage
1. Go to Vercel Dashboard → Storage
2. Create Blob store
3. Get read/write token
4. Add to `.env.local`

### 6. Development Server
```bash
# Start development server
npm run dev

# Open browser to http://localhost:3000
```

## Verification Steps

### Test Database Connection
```bash
npx prisma studio
# Should open database browser at http://localhost:5555
```

### Test Google OAuth
1. Go to http://localhost:3000/api/auth/signin
2. Click "Sign in with Google"
3. Should redirect and authenticate successfully

### Test API Keys
Create test API calls to verify:
- [ ] Google Search Console API access
- [ ] Google Analytics API access  
- [ ] PageSpeed Insights API access
- [ ] Anthropic API access
- [ ] Redis queue connection
- [ ] Blob storage access

## Troubleshooting

### Common Issues

**Google OAuth Error**
- Verify redirect URIs match exactly
- Check client ID and secret are correct
- Ensure APIs are enabled in Google Cloud Console

**Database Connection Error**
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Run `npx prisma db push` to sync schema

**API Rate Limits**
- Google APIs have daily quotas
- PageSpeed API limited to 25 requests/minute
- Monitor usage in Google Cloud Console

**Environment Variables**
- Restart dev server after changing .env.local
- Verify no extra spaces or quotes
- Check environment variable names match exactly

### Development Tools

**Useful Commands**
```bash
# Database
npx prisma studio          # Database browser
npx prisma db push         # Sync schema
npx prisma migrate dev     # Create migration

# Development
npm run dev                # Start dev server
npm run build             # Build for production
npm run lint              # Run linting
```

**Recommended VS Code Extensions**
- Prisma
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets

## Security Notes

- Never commit `.env.local` to version control
- Rotate API keys regularly
- Use different keys for development vs production
- Monitor API usage and costs
- Enable 2FA on all service accounts

## Next Steps

Once environment is set up:
1. Test Google API connections manually
2. Create test client records in database
3. Verify AI insights generation
4. Test PDF generation capabilities
5. Set up monitoring and error tracking
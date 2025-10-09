# 🔗 PHASE 5: GOOGLE API PROPERTY SELECTION & DATA FETCHING

**Date Started:** October 9, 2025  
**Current Status:** 🚧 IN PROGRESS  
**Prerequisite:** Phase 4 OAuth Integration (✅ COMPLETE)  
**Goal:** Enable users to select specific GSC/GA4 properties and fetch real data

---

## 📊 CONTEXT: WHERE WE ARE NOW

### ✅ What's Working (Phase 4 Complete):
- User can click "Connect Google Accounts" button
- OAuth flow successfully authenticates with Google
- Access tokens and refresh tokens stored in database
- Client shows "Connected" status with green badge
- **Connected account:** `sebconrios@gmail.com` (test account)

### ❌ What's Missing (Phase 5 Scope):
- **No property selection** - We don't know WHICH Search Console site to use
- **No GA4 property selection** - We don't know WHICH Analytics property to use
- **No data fetching** - We can't pull actual metrics yet
- **Manual data entry required** - Users still type in numbers manually

### 🤔 The Problem Explained:

**User connects Google account:**
```
✅ OAuth Token Stored: sebconrios@gmail.com
❓ Which GSC property? Unknown
❓ Which GA4 property? Unknown
❌ Can't fetch data without knowing which properties to query
```

**What we need:**
```
✅ OAuth Token: sebconrios@gmail.com
✅ GSC Property: https://acmecorp.com/
✅ GA4 Property: 123456789 (Property ID)
✅ Now we can fetch data!
```

---

## 🎯 PHASE 5 OBJECTIVES

### Primary Goals:

1. **Property Discovery**
   - Fetch all Search Console sites user has access to
   - Fetch all GA4 properties user has access to
   - Display them in a selectable list

2. **Property Selection**
   - User selects which GSC site belongs to this client
   - User selects which GA4 property belongs to this client
   - Store selections in database

3. **Data Fetching**
   - Pull actual GSC metrics (clicks, impressions, CTR, position)
   - Pull actual GA4 metrics (users, sessions, bounce rate)
   - Auto-fill report generation form

4. **Report Generation**
   - Generate PDF reports with real client data
   - No more manual data entry required

---

## 🗄️ DATABASE SCHEMA UPDATES NEEDED

### Current Client Schema (Phase 4):
```prisma
model Client {
  id                  String    @id @default(cuid())
  name                String
  domain              String
  userId              String
  
  // OAuth tokens (already working)
  googleAccessToken   String?
  googleRefreshToken  String?
  googleTokenExpiry   DateTime?
  googleConnectedAt   DateTime?
  
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt
  
  user                User      @relation(fields: [userId], references: [id])
  reports             Report[]
}
```

### Required Schema Updates (Phase 5):
```prisma
model Client {
  id                  String    @id @default(cuid())
  name                String
  domain              String
  userId              String
  
  // OAuth tokens (Phase 4 - already working)
  googleAccessToken   String?
  googleRefreshToken  String?
  googleTokenExpiry   DateTime?
  googleConnectedAt   DateTime?
  
  // NEW: Property selections (Phase 5)
  gscSiteUrl          String?   // Search Console site URL
  gscSiteName         String?   // Friendly name for display
  ga4PropertyId       String?   // Analytics property ID
  ga4PropertyName     String?   // Friendly name for display
  
  // NEW: Last data fetch tracking
  lastDataFetch       DateTime?
  dataFetchStatus     String?   // 'success' | 'failed' | 'pending'
  
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt
  
  user                User      @relation(fields: [userId], references: [id])
  reports             Report[]
}
```

**Migration Command:**
```bash
npx prisma db push
# Or for production:
npx prisma migrate dev --name add_property_selections
```

---

## 🏗️ ARCHITECTURE & IMPLEMENTATION PLAN

### Phase 5A: Property Discovery & Selection (STEP 1)

#### **New API Endpoints Needed:**

**1. Fetch Available Search Console Sites**
```typescript
// src/app/api/google/search-console/sites/route.ts
GET /api/google/search-console/sites?clientId={client_id}

Response:
{
  sites: [
    {
      siteUrl: "https://acmecorp.com/",
      permissionLevel: "siteOwner"
    },
    {
      siteUrl: "sc-domain:acmecorp.com",
      permissionLevel: "siteOwner"
    }
  ]
}
```

**2. Fetch Available GA4 Properties**
```typescript
// src/app/api/google/analytics/properties/route.ts
GET /api/google/analytics/properties?clientId={client_id}

Response:
{
  properties: [
    {
      name: "properties/123456789",
      displayName: "Acme Corp Website",
      propertyId: "123456789"
    },
    {
      name: "properties/987654321",
      displayName: "Acme Corp Blog",
      propertyId: "987654321"
    }
  ]
}
```

**3. Save Property Selections**
```typescript
// src/app/api/clients/[id]/properties/route.ts
PATCH /api/clients/{client_id}/properties

Request Body:
{
  gscSiteUrl: "https://acmecorp.com/",
  gscSiteName: "Acme Corp Main Site",
  ga4PropertyId: "123456789",
  ga4PropertyName: "Acme Corp Website"
}

Response:
{
  success: true,
  client: { ...updated client data }
}
```

#### **UI Components Needed:**

**PropertySelectionModal.tsx**
```typescript
// src/components/organisms/PropertySelectionModal.tsx
interface PropertySelectionModalProps {
  clientId: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

// Features:
// - Step 1: Select Search Console site (dropdown)
// - Step 2: Select GA4 property (dropdown)
// - Loading states while fetching properties
// - Error handling if no properties found
// - Save button to persist selections
```

**Modified Client Card UI:**
```typescript
// Update: src/components/organisms/ClientCard.tsx

// Current state:
✅ Connected
• Search Console
• Analytics

// New state when properties selected:
✅ Connected
• Search Console: acmecorp.com
• Analytics: Acme Corp Website

// New button:
[Configure Properties] // Opens PropertySelectionModal
```

---

### Phase 5B: Data Fetching (STEP 2)

#### **New API Endpoints Needed:**

**1. Fetch Search Console Data**
```typescript
// src/app/api/google/search-console/data/route.ts
GET /api/google/search-console/data?clientId={client_id}&startDate={date}&endDate={date}

Response:
{
  totalClicks: 12450,
  totalImpressions: 456789,
  averageCTR: 2.73,
  averagePosition: 8.5,
  topQueries: [
    { query: "enterprise software", clicks: 850, impressions: 12400, ctr: 6.85, position: 3.2 },
    { query: "business automation", clicks: 720, impressions: 10200, ctr: 7.06, position: 4.1 }
  ],
  topPages: [
    { page: "/products/automation", clicks: 420, impressions: 8900, ctr: 4.72, position: 5.3 }
  ]
}
```

**2. Fetch Google Analytics Data**
```typescript
// src/app/api/google/analytics/data/route.ts
GET /api/google/analytics/data?clientId={client_id}&startDate={date}&endDate={date}

Response:
{
  totalUsers: 8950,
  totalSessions: 12340,
  bounceRate: 42.5,
  averageSessionDuration: 185, // seconds
  organicSessions: 7650,
  conversions: 245,
  topLandingPages: [
    { page: "/products/automation", sessions: 1200, bounceRate: 35.2 }
  ]
}
```

**3. Fetch Combined Report Data**
```typescript
// src/app/api/reports/fetch-data/route.ts
POST /api/reports/fetch-data

Request Body:
{
  clientId: "cmgidstad0001p2d5gkm5974i",
  startDate: "2025-09-01",
  endDate: "2025-09-30"
}

Response:
{
  searchConsole: { ...gsc data },
  analytics: { ...ga4 data },
  fetchedAt: "2025-10-09T14:30:00Z",
  status: "success"
}

// This endpoint calls both GSC and GA4 APIs in parallel
// Returns combined data ready for report generation
```

#### **UI Integration:**

**Auto-Fill Report Generation Wizard:**
```typescript
// Update: src/app/generate-report/page.tsx

// Step 1: Select Client + Date Range (unchanged)

// Step 2: Import Data (MODIFIED)
// Before (manual entry):
[Manual text inputs for all metrics]

// After (auto-fetch):
[Fetch Data from Google] Button
  ↓
Loading indicator...
  ↓
✅ Data Fetched Successfully!
[Pre-filled form with real data]
[Option to manually override if needed]

// Step 3: Preview & Generate (unchanged)
```

**Report Generation Flow:**
```
1. User selects client with connected + configured Google account
2. User selects date range
3. Click "Fetch Data from Google"
4. System calls /api/reports/fetch-data
5. Form auto-fills with real metrics
6. User reviews data
7. Click "Generate PDF Report"
8. PDF created with actual client data
```

---

## 🔧 GOOGLE API INTEGRATION DETAILS

### Search Console API Setup

**Required Scopes (already requested in OAuth):**
```
https://www.googleapis.com/auth/webmasters.readonly
```

**API Client Setup:**
```typescript
// src/lib/integrations/search-console.ts
import { google } from 'googleapis';

export class SearchConsoleAPI {
  private webmasters;
  
  constructor(accessToken: string) {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    this.webmasters = google.webmasters({ version: 'v3', auth });
  }
  
  async listSites() {
    const response = await this.webmasters.sites.list();
    return response.data.siteEntry || [];
  }
  
  async getPerformanceData(siteUrl: string, startDate: string, endDate: string) {
    const response = await this.webmasters.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 25000
      }
    });
    return response.data;
  }
}
```

### Google Analytics 4 API Setup

**Required Scopes (already requested in OAuth):**
```
https://www.googleapis.com/auth/analytics.readonly
```

**API Client Setup:**
```typescript
// src/lib/integrations/google-analytics.ts
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export class AnalyticsAPI {
  private analyticsClient;
  
  constructor(accessToken: string) {
    this.analyticsClient = new BetaAnalyticsDataClient({
      credentials: { access_token: accessToken }
    });
  }
  
  async listProperties() {
    // Note: GA4 Admin API required for listing properties
    // Alternative: Use Management API v1
    const response = await google.analyticsadmin('v1beta').properties.list();
    return response.data.properties || [];
  }
  
  async getOrganicTrafficData(propertyId: string, startDate: string, endDate: string) {
    const [response] = await this.analyticsClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' }
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'sessionDefaultChannelGroup',
          stringFilter: { value: 'Organic Search' }
        }
      }
    });
    return response;
  }
}
```

---

## 🎨 UI/UX DESIGN SPECIFICATIONS

### Property Selection Modal Design

**Visual Mockup:**
```
┌─────────────────────────────────────────────────┐
│  Configure Google Properties for Acme Corp  [X]│
├─────────────────────────────────────────────────┤
│                                                 │
│  Step 1: Select Search Console Property        │
│  ┌───────────────────────────────────────────┐ │
│  │ [▼] https://acmecorp.com/                 │ │
│  │                                           │ │
│  │ Other options:                            │ │
│  │ • sc-domain:acmecorp.com                  │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  Step 2: Select Analytics Property              │
│  ┌───────────────────────────────────────────┐ │
│  │ [▼] Acme Corp Website (123456789)         │ │
│  │                                           │ │
│  │ Other options:                            │ │
│  │ • Acme Corp Blog (987654321)              │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  ℹ️  These properties are available through    │
│     sebconrios@gmail.com                       │
│                                                 │
│            [Cancel]  [Save Properties]          │
└─────────────────────────────────────────────────┘
```

**Component Structure:**
```typescript
<PropertySelectionModal>
  <ModalHeader>
    Configure Google Properties for {client.name}
  </ModalHeader>
  
  <ModalBody>
    <PropertyStep number={1} title="Search Console">
      {isLoadingGSC ? (
        <LoadingSpinner />
      ) : gscSites.length === 0 ? (
        <EmptyState message="No Search Console sites found" />
      ) : (
        <Select
          options={gscSites}
          value={selectedGSCSite}
          onChange={setSelectedGSCSite}
        />
      )}
    </PropertyStep>
    
    <PropertyStep number={2} title="Analytics Property">
      {isLoadingGA4 ? (
        <LoadingSpinner />
      ) : ga4Properties.length === 0 ? (
        <EmptyState message="No Analytics properties found" />
      ) : (
        <Select
          options={ga4Properties}
          value={selectedGA4Property}
          onChange={setSelectedGA4Property}
        />
      )}
    </PropertyStep>
    
    <InfoBanner>
      These properties are available through {client.googleAccount}
    </InfoBanner>
  </ModalBody>
  
  <ModalFooter>
    <Button variant="ghost" onClick={onClose}>Cancel</Button>
    <Button 
      variant="primary" 
      onClick={handleSave}
      disabled={!selectedGSCSite || !selectedGA4Property}
    >
      Save Properties
    </Button>
  </ModalFooter>
</PropertySelectionModal>
```

### Updated Client Card Design

**Before (Phase 4):**
```
┌──────────────────────────────────────────┐
│  👤 Acme Corp                            │
│  🌐 https://acmecorp.com                 │
│                                          │
│  Contact: John Smith                     │
│  Reports Generated: 0                    │
│  Last Report: Never                      │
│                                          │
│  Google Integration: ✅ Connected         │
│  • Search Console                        │
│  • Analytics                             │
│                                          │
│  [🔗 Connect Google Accounts]            │
│  [📊 Generate Report]                    │
└──────────────────────────────────────────┘
```

**After (Phase 5):**
```
┌──────────────────────────────────────────┐
│  👤 Acme Corp                            │
│  🌐 https://acmecorp.com                 │
│                                          │
│  Contact: John Smith                     │
│  Reports Generated: 0                    │
│  Last Report: Never                      │
│                                          │
│  Google Integration: ✅ Connected         │
│  • Search Console: acmecorp.com          │
│  • Analytics: Acme Corp Website          │
│  📅 Last data fetch: 2 hours ago          │
│                                          │
│  [⚙️ Configure Properties]               │
│  [📊 Generate Report]                    │
└──────────────────────────────────────────┘
```

---

## 🐛 KNOWN CHALLENGES & SOLUTIONS

### Challenge 1: GA4 Property Listing Requires Additional Scope

**Problem:**
```
The `analytics.readonly` scope allows reading data but NOT listing properties.
Listing properties requires `analytics.edit` or Admin API access.
```

**Solution Options:**

**Option A (Recommended):** Use Analytics Admin API with additional scope
```typescript
// Add to OAuth scopes:
'https://www.googleapis.com/auth/analytics.edit'

// This allows both listing properties AND reading data
```

**Option B:** Manual property ID entry
```typescript
// Let user manually enter GA4 Property ID
// Less user-friendly but avoids additional OAuth scope
<Input
  label="GA4 Property ID"
  placeholder="123456789"
  helperText="Find this in Google Analytics > Admin > Property Settings"
/>
```

**Recommendation:** Start with Option B (manual entry) for MVP, then upgrade to Option A in v2.

---

### Challenge 2: Token Refresh Handling

**Problem:**
```
Access tokens expire after 1 hour.
Refresh tokens must be used to get new access tokens.
API calls will fail if token is expired.
```

**Solution:**
```typescript
// src/lib/integrations/token-manager.ts
export class TokenManager {
  async getValidAccessToken(clientId: string): Promise<string> {
    const client = await prisma.client.findUnique({
      where: { id: clientId }
    });
    
    if (!client.googleAccessToken) {
      throw new Error('No access token found');
    }
    
    // Check if token is expired
    const now = new Date();
    const expiry = new Date(client.googleTokenExpiry);
    
    if (now >= expiry) {
      // Token expired, refresh it
      const newTokens = await this.refreshAccessToken(client.googleRefreshToken);
      
      // Update database
      await prisma.client.update({
        where: { id: clientId },
        data: {
          googleAccessToken: newTokens.access_token,
          googleTokenExpiry: new Date(Date.now() + newTokens.expires_in * 1000)
        }
      });
      
      return newTokens.access_token;
    }
    
    return client.googleAccessToken;
  }
  
  private async refreshAccessToken(refreshToken: string) {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    
    oauth2Client.setCredentials({ refresh_token: refreshToken });
    const { credentials } = await oauth2Client.refreshAccessToken();
    return credentials;
  }
}
```

---

### Challenge 3: Rate Limiting

**Problem:**
```
Google APIs have rate limits:
- Search Console: 1,200 queries/minute
- Analytics Data API: 10 requests/second

Exceeding limits results in 429 errors.
```

**Solution:**
```typescript
// src/lib/integrations/rate-limiter.ts
import pLimit from 'p-limit';

export class RateLimiter {
  private gscLimit = pLimit(20); // 20 concurrent requests max
  private ga4Limit = pLimit(5);  // 5 concurrent requests max
  
  async executeGSCRequest<T>(fn: () => Promise<T>): Promise<T> {
    return this.gscLimit(fn);
  }
  
  async executeGA4Request<T>(fn: () => Promise<T>): Promise<T> {
    return this.ga4Limit(fn);
  }
}

// Usage:
const rateLimiter = new RateLimiter();
const data = await rateLimiter.executeGSCRequest(() => 
  searchConsoleAPI.getPerformanceData(siteUrl, startDate, endDate)
);
```

---

## 📋 IMPLEMENTATION CHECKLIST

### Phase 5A: Property Selection (Week 1)

**Backend Tasks:**
- [ ] Update Prisma schema with new fields
- [ ] Run database migration
- [ ] Create `/api/google/search-console/sites` endpoint
- [ ] Create `/api/google/analytics/properties` endpoint  
- [ ] Create `/api/clients/[id]/properties` PATCH endpoint
- [ ] Implement token refresh logic
- [ ] Add error handling for missing properties

**Frontend Tasks:**
- [ ] Create `PropertySelectionModal` component
- [ ] Add "Configure Properties" button to Client Card
- [ ] Implement property dropdowns with loading states
- [ ] Add empty states for no properties found
- [ ] Show selected properties on Client Card
- [ ] Add success/error toasts

**Testing:**
- [ ] Test with account that has multiple GSC sites
- [ ] Test with account that has multiple GA4 properties
- [ ] Test with account that has no properties (empty state)
- [ ] Test saving property selections
- [ ] Test displaying saved properties

---

### Phase 5B: Data Fetching (Week 2)

**Backend Tasks:**
- [ ] Create `/api/google/search-console/data` endpoint
- [ ] Create `/api/google/analytics/data` endpoint
- [ ] Create `/api/reports/fetch-data` combined endpoint
- [ ] Implement Search Console data parsing
- [ ] Implement Analytics data parsing
- [ ] Add rate limiting
- [ ] Add caching for frequently requested data
- [ ] Store fetched data in database for history

**Frontend Tasks:**
- [ ] Add "Fetch Data from Google" button in Step 2
- [ ] Implement loading indicator during fetch
- [ ] Auto-fill form fields with fetched data
- [ ] Allow manual override of fetched data
- [ ] Show data freshness indicator
- [ ] Add "Refresh Data" button
- [ ] Update report generation to use fetched data

**Testing:**
- [ ] Test data fetching for various date ranges
- [ ] Test with expired access tokens (should auto-refresh)
- [ ] Test with client that has no properties configured
- [ ] Test API rate limiting
- [ ] Test error handling for API failures
- [ ] Test generated PDF with real data

---

## 🚀 DEPLOYMENT CONSIDERATIONS

### Environment Variables Required:

**Already Set (Phase 4):**
```bash
GOOGLE_CLIENT_ID=[YOUR_CLIENT_ID_HERE]
GOOGLE_CLIENT_SECRET=[YOUR_CLIENT_SECRET_HERE]
NEXTAUTH_URL=https://reportr-one.vercel.app
DATABASE_URL=postgresql://...
```

**New for Phase 5:**
```bash
# Optional: API quotas and limits
GOOGLE_API_QUOTA_LIMIT_GSC=1200  # requests per minute
GOOGLE_API_QUOTA_LIMIT_GA4=600   # requests per minute

# Optional: Data caching
REDIS_URL=redis://...  # For caching API responses
CACHE_TTL_MINUTES=30   # How long to cache data
```

### NPM Packages to Install:

```bash
npm install @google-analytics/data
npm install p-limit  # Rate limiting
npm install date-fns  # Date manipulation
```

---

## 📊 SUCCESS METRICS

### Phase 5A Complete When:
- [✅] User can view available GSC sites
- [✅] User can view available GA4 properties
- [✅] User can select and save property choices
- [✅] Selections persist in database
- [✅] Client Card shows selected properties

### Phase 5B Complete When:
- [✅] System fetches real GSC data
- [✅] System fetches real GA4 data  
- [✅] Report form auto-fills with fetched data
- [✅] Generated PDFs contain real client metrics
- [✅] No more manual data entry required

### User Flow Complete:
```
1. User adds client                     ✅
2. User connects Google account         ✅ (Phase 4)
3. User configures GSC/GA4 properties   📋 (Phase 5A)
4. User clicks "Generate Report"        ✅
5. System fetches real data             📋 (Phase 5B)
6. User reviews and generates PDF       ✅
7. PDF contains actual client metrics   📋 (Phase 5B)
```

---

## 🔗 RELATED DOCUMENTATION

- **PHASE_4_OAUTH_SUCCESS.md** - OAuth integration (prerequisite)
- **MVP_PROGRESS_AND_NEXT_STEPS.md** - Overall project roadmap
- **TECHNICAL_ARCHITECTURE.md** - System design
- **DATABASE_INTEGRATION_SUCCESS.md** - Prisma setup

---

## 📞 SUPPORT & TROUBLESHOOTING

### Common Issues:

**Issue: "No properties found"**
```
Cause: Connected Google account doesn't have access to any GSC sites or GA4 properties
Solution: Ensure test account (sebconrios@gmail.com) is added as owner/editor in:
  - Google Search Console: https://search.google.com/search-console
  - Google Analytics: https://analytics.google.com
```

**Issue: "Token expired"**
```
Cause: Access token expired after 1 hour
Solution: Token refresh should happen automatically
Check: TokenManager implementation is working correctly
```

**Issue: "Rate limit exceeded"**
```
Cause: Too many API requests in short time
Solution: RateLimiter should prevent this
Fallback: Implement exponential backoff retry logic
```

---

## ✅ PHASE 5 COMPLETION CRITERIA

Phase 5 is complete when:

1. ✅ Property selection modal functional
2. ✅ Users can save GSC/GA4 property choices
3. ✅ Real data fetching from both APIs working
4. ✅ Report generation uses actual client data
5. ✅ No manual data entry required for reports
6. ✅ Token refresh handling implemented
7. ✅ Rate limiting in place
8. ✅ All error states handled gracefully

**Estimated Timeline:** 2-3 weeks  
**Current Status:** 🚧 Not started (waiting for Phase 4 completion)  
**Blocked By:** None (Phase 4 complete as of Oct 9, 2025)

---

**Documentation Status:** ✅ Complete and ready for implementation  
**Last Updated:** October 9, 2025  
**Ready for Backend Agent:** ✅ Yes - all specifications provided

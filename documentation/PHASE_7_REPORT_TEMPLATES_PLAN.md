# Phase 7: Report Templates & Custom Metrics - Implementation Plan

**Status:** 🚧 IN PROGRESS  
**Started:** October 10, 2025  
**Expected Duration:** 2-3 weeks

---

## 📋 OVERVIEW

Phase 7 adds flexible report generation with three report types and a custom metric selector, giving agencies control over what data appears in their client reports while maintaining a simple default experience.

---

## 🎯 OBJECTIVES

### Primary Goals
1. **Report Type Selection** - Let users choose between Executive, Standard, or Custom reports
2. **Custom Metric Selector** - Allow selection of up to 15 metrics from 30+ available GA4 metrics
3. **Dynamic Data Fetching** - Backend fetches only requested metrics based on report type
4. **PDF Generation** - Generate PDFs with variable layouts based on report type
5. **Template System** - Foundation for adding more templates in future phases

### User Value
- **Agencies get flexibility** - Can customize reports per client needs
- **Simple defaults** - 90% of users can use Standard without customization
- **Power user option** - Custom reports for specific KPIs
- **Faster report generation** - Only fetch needed data

---

## 🏗️ ARCHITECTURE APPROACH

### Strategy: **Frontend First, Then Backend**

**Why this order:**
1. ✅ Visualize user flow before committing to backend structure
2. ✅ Iterate on UX without refactoring APIs
3. ✅ Backend knows exact data format requirements
4. ✅ Can demo with mock data before backend is ready
5. ✅ Parallel work possible (frontend + backend simultaneously)

**Development Flow:**
```
Phase 7A: Frontend UI (mock data) → 3-4 hours
   ↓
Phase 7B: Backend APIs (real data) → 2-3 hours  
   ↓
Phase 7C: Connect & Test → 1-2 hours
   ↓
Phase 7D: PDF Generation → 1 week
   ↓
Phase 7E: Polish & Deploy → 2-3 days
```

---

## 📊 REPORT TYPES

### 1. Executive Summary ⭐
**Use Case:** Quick overview for busy executives  
**Metrics:** 4 core metrics  
**Target Audience:** C-level, time-constrained decision makers

**Included Metrics:**
- Users
- Sessions
- Bounce Rate
- Conversions

**PDF Pages:** 2-3 pages

---

### 2. Standard SEO Report 📊 (Recommended Default)
**Use Case:** Comprehensive monthly client reporting  
**Metrics:** 10 essential metrics  
**Target Audience:** 90% of agency clients

**Included Metrics:**
- **Audience:** Users, New Users, Sessions
- **Engagement:** Bounce Rate, Avg Session Duration, Pages per Session
- **Conversions:** Conversions
- **Traffic:** Organic Traffic %
- **Behavior:** Top 5 Landing Pages, Device Breakdown

**PDF Pages:** 5-7 pages

---

### 3. Custom Report 🎨
**Use Case:** Specialized reporting for unique client needs  
**Metrics:** User selects up to 15 from 30+ available  
**Target Audience:** Power users, clients with specific KPIs

**Available Categories:**
1. **👥 Audience** (6 metrics)
   - Users, New Users, Sessions, Engaged Sessions, Engagement Rate, Sessions per User

2. **🎯 Engagement** (5 metrics)
   - Bounce Rate, Pages per Session, Avg Session Duration, Event Count, Scroll Depth

3. **💰 Conversions** (5 metrics)
   - Conversions, Conversion Rate, Revenue, E-commerce Purchases, Transactions

4. **📍 Traffic Sources** (5 metrics)
   - Organic %, Direct, Referral, Social, Paid Traffic

5. **📱 Behavior** (4 metrics)
   - Device Breakdown, Top Landing Pages, Top Exit Pages, Page Views

**Limits:**
- Minimum: 4 metrics
- Maximum: 15 metrics
- Reason: PDF layout complexity and readability

**PDF Pages:** Variable (4-10 pages based on selection)

---

## 🎨 UI/UX DESIGN

### Report Type Selection (Step 1)

**Location:** `/generate-report` page, after client selection, before date range

**Design:**
```
┌────────────────────────────────────────────────┐
│ Report Type                                    │
│                                                │
│ ○ Executive Summary (4 metrics)               │
│   Quick overview with key metrics              │
│   Users • Sessions • Bounce Rate • Conversions │
│                                                │
│ ● Standard SEO Report (10 metrics) [Recommended]│
│   Comprehensive report with essential metrics  │
│   All Executive + Duration • Pages • Users...  │
│                                                │
│ ○ Custom Report (you choose)                  │
│   Choose your own metrics (up to 15)           │
│   Select from 30+ available GA4 metrics        │
│                                                │
└────────────────────────────────────────────────┘
```

**Interaction:**
- Radio button selection
- Visual feedback (border highlight on selected)
- Recommended badge on Standard
- Metric preview under each option

---

### Custom Metric Selector Modal

**Trigger:** Selecting "Custom Report" + clicking "Select Metrics" button

**Design:**
```
┌──────────────────────────────────────────────────┐
│ Select Metrics                              [X]  │
│ Choose up to 15 metrics for your custom report   │
│                                                  │
│ Selected: 4 / 15                                 │
│                                                  │
│ 👥 Audience                                      │
│ ☑ Users          ☐ New Users                    │
│ ☑ Sessions       ☐ Engaged Sessions             │
│ ☐ Engagement Rate ☐ Sessions per User           │
│                                                  │
│ 🎯 Engagement                                    │
│ ☑ Bounce Rate    ☐ Pages per Session            │
│ ☐ Avg Session Duration ☐ Event Count            │
│ ☐ Scroll Depth                                   │
│                                                  │
│ 💰 Conversions                                   │
│ ☑ Conversions    ☐ Conversion Rate              │
│ ☐ Revenue        ☐ E-commerce Purchases         │
│ ☐ Transactions                                   │
│                                                  │
│ [... more categories ...]                        │
│                                                  │
│ [Reset to Default]    [Cancel]  [Save Selection]│
└──────────────────────────────────────────────────┘
```

**Features:**
- ✅ Checkbox selection (multi-select)
- ✅ Counter shows X/15 selected
- ✅ Disable checkboxes when limit reached
- ✅ Visual feedback (purple border when selected)
- ✅ Metric descriptions on hover
- ✅ Reset button (defaults to Executive metrics)
- ✅ Scrollable content area
- ✅ Responsive (works on mobile)

---

## 🔧 TECHNICAL IMPLEMENTATION

### Phase 7A: Frontend UI (COMPLETE ✅)

**Duration:** 3-4 hours  
**Status:** ✅ COMPLETE  
**Completed:** October 10, 2025

**Components Built:**

1. **Report Type Selection**
   - File: `src/app/generate-report/page.tsx`
   - Radio button UI for 3 report types
   - State management for `reportType`
   - Conditional rendering for custom options

2. **MetricSelectorModal Component**
   - File: `src/components/organisms/MetricSelectorModal.tsx`
   - 5 category layout (Audience, Engagement, Conversions, Traffic, Behavior)
   - 30+ metric options with descriptions
   - 15-metric limit with validation
   - Counter UI
   - Reset functionality
   - Save/Cancel actions

3. **State Management**
   ```typescript
   const [reportType, setReportType] = useState('standard');
   const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
   const [showMetricSelector, setShowMetricSelector] = useState(false);
   ```

4. **Mock Data Structure**
   ```typescript
   const METRIC_CATEGORIES = {
     audience: { title: '👥 Audience', metrics: [...] },
     engagement: { title: '🎯 Engagement', metrics: [...] },
     conversions: { title: '💰 Conversions', metrics: [...] },
     traffic: { title: '📍 Traffic Sources', metrics: [...] },
     behavior: { title: '📱 Behavior', metrics: [...] }
   };
   ```

**Testing Results:**
- ✅ All report types selectable
- ✅ Modal opens/closes correctly
- ✅ Metric selection works
- ✅ Counter updates accurately
- ✅ 15-metric limit enforced
- ✅ Reset button functions
- ✅ TypeScript compiles
- ✅ No console errors

---

### Phase 7B: Backend API (TODO - Next)

**Duration:** 2-3 hours  
**Status:** ⏰ PENDING  
**Dependencies:** Phase 7A complete

**Objectives:**

1. **Dynamic GA4 Metric Fetching**
   - Extend `google-analytics.ts` integration
   - Accept array of metric IDs
   - Map metric IDs to GA4 API dimension/metric names
   - Return only requested metrics

2. **Report Type Endpoint**
   - New route: `/api/reports/fetch-data`
   - Accepts: `{ clientId, startDate, endDate, reportType, customMetrics? }`
   - Returns: Data structure matching report type

3. **Metric Mapping**
   ```typescript
   // Map UI metric IDs to GA4 API names
   const METRIC_MAPPING = {
     users: 'totalUsers',
     newUsers: 'newUsers',
     sessions: 'sessions',
     bounceRate: 'bounceRate',
     // ... 30+ mappings
   };
   ```

4. **API Response Format**
   ```typescript
   {
     reportType: 'standard',
     metrics: {
       users: 1234,
       sessions: 5678,
       bounceRate: 45.2,
       // ... based on report type
     },
     dimensions: {
       topLandingPages: [...],
       deviceBreakdown: [...]
     }
   }
   ```

**Files to Modify:**
- `src/lib/integrations/google-analytics.ts`
- `src/app/api/reports/fetch-data/route.ts` (new)
- `src/types/report.ts` (update interfaces)

---

### Phase 7C: Connect Frontend to Backend (TODO)

**Duration:** 1-2 hours  
**Status:** ⏰ PENDING  
**Dependencies:** Phase 7B complete

**Tasks:**

1. **Replace Mock Data**
   - Remove hardcoded METRIC_CATEGORIES
   - Fetch metric definitions from API
   - Cache metric definitions

2. **Update Fetch Logic**
   ```typescript
   const fetchReportData = async () => {
     const payload = {
       clientId,
       startDate,
       endDate,
       reportType,
       customMetrics: reportType === 'custom' ? selectedMetrics : undefined
     };
     
     const response = await fetch('/api/reports/fetch-data', {
       method: 'POST',
       body: JSON.stringify(payload)
     });
     
     const data = await response.json();
     // Populate preview with real data
   };
   ```

3. **Update Preview Page**
   - Display metrics dynamically based on report type
   - Handle variable metric counts
   - Show only fetched metrics

**Testing:**
- [ ] Executive report fetches 4 metrics
- [ ] Standard report fetches 10 metrics
- [ ] Custom report fetches selected metrics only
- [ ] Preview shows correct data
- [ ] No extra API calls

---

### Phase 7D: PDF Generation (TODO)

**Duration:** 1 week  
**Status:** ⏰ PENDING  
**Dependencies:** Phase 7C complete

**Objectives:**

1. **Template Engine**
   - Build dynamic PDF layout system
   - Handle variable metric counts
   - Responsive layout for 4-15 metrics

2. **Report Templates**
   - Executive template (2-3 pages)
   - Standard template (5-7 pages)
   - Custom template (variable pages)

3. **White-Label Branding**
   - Agency logo
   - Custom colors
   - Agency contact info

4. **Chart Generation**
   - Traffic trends
   - Device breakdown pie chart
   - Top pages bar chart

**Technologies:**
- Puppeteer or React-PDF
- Chart.js for visualizations
- Vercel Blob for storage

---

### Phase 7E: Polish & Deploy (TODO)

**Duration:** 2-3 days  
**Status:** ⏰ PENDING  

**Tasks:**
- [ ] Error handling
- [ ] Loading states
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Accessibility (WCAG AA)
- [ ] User testing
- [ ] Documentation
- [ ] Production deployment

---

## 📈 SUCCESS METRICS

### Technical Metrics
- ✅ TypeScript compilation: 100%
- ✅ ESLint passing: 100%
- ⏰ API response time: < 10 seconds
- ⏰ PDF generation time: < 30 seconds
- ⏰ Test coverage: > 80%

### User Experience Metrics
- ✅ UI responsive: Mobile + Desktop
- ✅ Modal opens in < 100ms
- ⏰ Metric selection intuitive (user testing)
- ⏰ PDF download success rate: > 95%

### Feature Adoption (Post-Launch)
- Target: 60% use Standard report
- Target: 30% use Custom report
- Target: 10% use Executive report

---

## 🚧 KNOWN LIMITATIONS & FUTURE ENHANCEMENTS

### Current Limitations (MVP)
- ❌ Can't save custom templates for reuse
- ❌ Can't assign different report types per client
- ❌ No scheduled/automated reports
- ❌ No report sharing/collaboration

### Phase 8+ Enhancements
1. **Save Custom Templates** (Phase 8)
   - Name and save custom metric selections
   - Reuse across multiple clients
   - Template library

2. **Client-Specific Defaults** (Phase 9)
   - Set default report type per client
   - Client-specific KPI dashboards
   - Automatic template selection

3. **Advanced Metrics** (Phase 10)
   - Custom calculated metrics
   - Year-over-year comparisons
   - Goal tracking
   - Campaign attribution

4. **Automated Reporting** (Phase 11)
   - Schedule monthly reports
   - Email delivery
   - Client portal access
   - API webhooks

---

## 🎯 CURRENT STATUS

### Phase 7A: Frontend UI
**Status:** ✅ COMPLETE (October 10, 2025)

**Completed:**
- [x] Report type selection UI
- [x] MetricSelectorModal component
- [x] State management
- [x] Mock data structure
- [x] TypeScript compliance
- [x] Responsive design
- [x] 15-metric limit enforcement

**Ready for:** Production deployment + testing

---

### Phase 7B: Backend API
**Status:** ⏰ NEXT UP

**Planned Work:**
- [ ] Dynamic metric fetching function
- [ ] Report type endpoint
- [ ] Metric ID to GA4 API mapping
- [ ] Response format standardization

**Estimated Start:** October 11, 2025  
**Estimated Duration:** 2-3 hours

---

## 📝 DECISION LOG

### Why Frontend First?
**Decision:** Build UI with mock data before backend  
**Rationale:** 
- See complete user flow before committing to data structure
- Iterate on UX quickly without backend changes
- Backend can implement exact requirements from working UI
- Parallel work possible (frontend demos while backend builds)

**Alternatives Considered:**
- Backend first: Rejected - would require refactoring if UI requirements change
- Simultaneous: Rejected - coordination overhead, higher risk of misalignment

---

### Why 15-Metric Limit?
**Decision:** Maximum 15 metrics per custom report  
**Rationale:**
- PDF readability decreases beyond 15 data points
- Page count would become excessive (10+ pages)
- User attention span limited
- Most use cases need 6-10 metrics

**Alternatives Considered:**
- No limit: Rejected - would create unusable reports
- 10-metric limit: Rejected - too restrictive for power users
- 20-metric limit: Rejected - PDF becomes overwhelming

---

### Why These Metric Categories?
**Decision:** 5 categories (Audience, Engagement, Conversions, Traffic, Behavior)  
**Rationale:**
- Aligns with GA4's default report structure
- Familiar to users of Google Analytics
- Logical grouping for easy navigation
- Covers 95% of common reporting needs

**Alternatives Considered:**
- Flat list: Rejected - 30+ metrics is overwhelming without organization
- More categories: Rejected - creates decision paralysis
- Custom categories: Rejected - too complex for MVP

---

## 🎊 MILESTONES

- [x] **October 10, 2025:** Phase 7A Complete - UI with mock data
- [ ] **October 11, 2025:** Phase 7B Complete - Backend APIs
- [ ] **October 11, 2025:** Phase 7C Complete - Frontend-Backend integration
- [ ] **October 18, 2025:** Phase 7D Complete - PDF generation
- [ ] **October 25, 2025:** Phase 7E Complete - Production launch

---

**Document Status:** ✅ Complete  
**Last Updated:** October 10, 2025  
**Next Review:** After Phase 7B completion  
**Owner:** Sebastian Contreras + Claude

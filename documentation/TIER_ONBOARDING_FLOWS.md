# 🎯 Complete Tier Onboarding Flows - Strategy & Implementation

**Date:** October 13, 2025  
**Status:** 📋 PLANNING  
**Goal:** Define optimal onboarding experience for each tier

---

## 📊 Tier Overview

| Tier | Clients | Reports | Price | Target User | Key Features |
|------|---------|---------|-------|-------------|--------------|
| **FREE** | 1 | 5 | $0 | Testers, Solopreneurs | Prove concept |
| **STARTER** | 5 | ∞ | $39/mo | Freelancers | Batch setup |
| **PROFESSIONAL** | 15 | ∞ | $99/mo | Small Agencies | White-label branding |
| **ENTERPRISE** | 50 | ∞ | $199/mo | Large Agencies | CSV import, custom features |

---

## 🆓 FREE Tier - Current Onboarding (IMPLEMENTED)

### Flow
```
Step 1: Welcome Survey (2-3 min)
  ↓ Quick questions about goals
  
Step 2: Agency Setup (1 min)
  ↓ Company name, website
  
Step 3: Sign in with Google (30 sec)
  ↓ OAuth authentication
  
Step 4: Add Your First Client (1 min) [OPTIONAL]
  ↓ Client name, domain, email
  
Step 5: Complete Setup (Auto)
  ↓ Profile + client created
  
✅ Dashboard: 1 client ready, 5 reports available
```

### Total Time: **2-5 minutes**
### Completion Rate Target: **>80%**

### ✅ What's Working
- Quick and frictionless
- Optional client creation reduces pressure
- Clear limits communicated upfront
- Good for "tire kickers"

### 🔄 Improvements Needed
1. **Report Limit Enforcement**
   - Show "X of 5 reports used"
   - Block generation after 5
   - Upgrade prompt on report #5

2. **Value Demonstration**
   - After first report: "See how easy that was?"
   - Show sample report during onboarding
   - "Generate your first report" CTA

3. **Upgrade Triggers**
   - When trying to add 2nd client
   - After generating 5 reports
   - "Want more? Upgrade to STARTER"

---

## 🎯 STARTER Tier - Proposed Onboarding

### Target User
- Freelance SEO consultant
- Small agency (1-3 people)
- Managing 5 clients

### Flow
```
Step 1: Welcome Survey (2 min)
  ↓ Tailored questions for freelancers
  
Step 2: Agency Setup (2 min)
  ↓ Company name, website, branding basics
  
Step 3: Sign in with Google (30 sec)
  ↓ OAuth authentication
  
Step 4: Batch Add Clients (3-5 min) [KEY FEATURE]
  ↓ Add up to 5 clients at once
  ↓ Spreadsheet-style form
  ↓ Import from CSV option
  
Step 5: Complete Setup (Auto)
  ↓ All clients created
  
✅ Dashboard: 5 clients ready, unlimited reports
```

### Total Time: **5-10 minutes**
### Key Differentiator: **Batch client setup**

### Implementation Plan

#### New Component: Batch Client Form
```typescript
// src/app/onboarding/starter/batch-clients/page.tsx

interface ClientRow {
  name: string
  domain: string
  contactEmail?: string
}

export default function BatchClientSetup() {
  const [clients, setClients] = useState<ClientRow[]>([
    { name: '', domain: '', contactEmail: '' },
    { name: '', domain: '', contactEmail: '' },
    { name: '', domain: '', contactEmail: '' },
    { name: '', domain: '', contactEmail: '' },
    { name: '', domain: '', contactEmail: '' },
  ])
  
  // Add/remove rows dynamically
  // Validate all at once
  // Save to localStorage
  // Bulk create in completion step
}
```

#### Features
- ✅ 5 input rows (expandable)
- ✅ "Add Row" button (up to tier limit)
- ✅ "Import CSV" option
- ✅ Validation per row
- ✅ "Skip empty rows" option
- ✅ Progress: "3 of 5 clients added"

---

## 💼 PROFESSIONAL Tier - Proposed Onboarding

### Target User
- Established agency (5-15 people)
- Managing 15 clients
- Needs white-label branding

### Flow
```
Step 1: Welcome Survey (2 min)
  ↓ Agency-focused questions
  
Step 2: Agency Setup (3 min)
  ↓ Company name, website
  
Step 3: White-Label Branding (5-7 min) [KEY FEATURE]
  ↓ Upload logo
  ↓ Choose brand colors
  ↓ Preview branded report
  
Step 4: Sign in with Google (30 sec)
  ↓ OAuth authentication
  
Step 5: Batch Add Clients (5-8 min)
  ↓ Add up to 15 clients
  ↓ CSV import recommended
  
Step 6: Complete Setup (Auto)
  ↓ Branding + clients created
  
✅ Dashboard: 15 clients, white-labeled reports ready
```

### Total Time: **8-15 minutes**
### Key Differentiator: **Full white-label branding**

### Implementation Plan

#### New Component: Branding Setup
```typescript
// src/app/onboarding/professional/branding/page.tsx

export default function BrandingSetup() {
  const [branding, setBranding] = useState({
    logo: null,
    primaryColor: '#9233ea',
    secondaryColor: '#06B6D4',
    companyName: '',
  })
  
  // Logo upload with preview
  // Color picker
  // Live preview of branded report
  // Save to localStorage
}
```

#### Features
- ✅ Logo upload (drag & drop)
- ✅ Color picker with presets
- ✅ Font selection (optional)
- ✅ **Live preview** of branded report
- ✅ "Skip for now" option
- ✅ Can edit anytime in settings

---

## 🏢 ENTERPRISE Tier - Proposed Onboarding

### Target User
- Large agency (15+ people)
- Managing 50 clients
- Enterprise features needed

### Flow
```
Step 1: Welcome Survey (3 min)
  ↓ Enterprise-focused questions
  ↓ Team size, use cases
  
Step 2: Agency Setup (3 min)
  ↓ Company details
  
Step 3: White-Label Branding (5-7 min)
  ↓ Full customization
  ↓ Custom domain (optional)
  
Step 4: Sign in with Google (30 sec)
  ↓ OAuth authentication
  
Step 5: CSV Import Clients (3-5 min) [KEY FEATURE]
  ↓ Upload CSV with 50 clients
  ↓ Map columns automatically
  ↓ Validate data
  ↓ Bulk import
  
Step 6: Team Setup (2-3 min) [OPTIONAL]
  ↓ Invite team members
  ↓ Set permissions
  
Step 7: Complete Setup (Auto)
  ↓ Everything configured
  
✅ Dashboard: 50 clients, team invited, white-labeled
```

### Total Time: **10-20 minutes**
### Key Differentiators: **CSV import + team management**

### Implementation Plan

#### New Component: CSV Import
```typescript
// src/app/onboarding/enterprise/csv-import/page.tsx

export default function CSVImport() {
  const [csvData, setCSVData] = useState<ClientRow[]>([])
  const [mapping, setMapping] = useState({
    name: 'Company Name',
    domain: 'Website',
    contactEmail: 'Email',
  })
  
  // File upload
  // Auto-detect columns
  // Allow manual column mapping
  // Preview first 5 rows
  // Validate all rows
  // Save to localStorage
}
```

#### Features
- ✅ CSV upload with validation
- ✅ Auto-detect column mapping
- ✅ Manual column override
- ✅ Preview imported data
- ✅ Error highlighting
- ✅ "Import X clients" confirmation
- ✅ Progress bar during import

#### New Component: Team Invites
```typescript
// src/app/onboarding/enterprise/team/page.tsx

export default function TeamSetup() {
  const [invites, setInvites] = useState([
    { email: '', role: 'member' }
  ])
  
  // Add team member emails
  // Set roles (admin/member/viewer)
  // Send invites on completion
  // Skip if solo user
}
```

---

## 🔄 Onboarding Comparison Matrix

| Feature | FREE | STARTER | PRO | ENTERPRISE |
|---------|------|---------|-----|------------|
| **Steps** | 4 | 4 | 6 | 7 |
| **Time** | 2-5 min | 5-10 min | 8-15 min | 10-20 min |
| **Client Setup** | Single | Batch (5) | Batch (15) | CSV (50) |
| **Branding** | ❌ | ❌ | ✅ Full | ✅ Full |
| **CSV Import** | ❌ | ❌ | ❌ | ✅ |
| **Team Invites** | ❌ | ❌ | ❌ | ✅ Optional |
| **Skip Options** | Most steps | Most steps | Some steps | Some steps |

---

## 🎨 Tier-Specific Onboarding Routes

### Current Structure
```
/onboarding/
├── welcome/              # Step 1 (all tiers)
├── connect-client/       # Step 2 (all tiers)
├── success/              # Step 3 (all tiers) - Google auth
├── add-client/           # Step 4 (FREE only)
└── complete/             # Final step (all tiers)
```

### Proposed Structure
```
/onboarding/
├── welcome/                    # Step 1 (all tiers)
├── connect-client/             # Step 2 (all tiers)
├── success/                    # Step 3 (all tiers) - Google auth
│
├── free/
│   └── add-client/            # FREE: Single client
│
├── starter/
│   └── batch-clients/         # STARTER: Batch 5 clients
│
├── professional/
│   ├── branding/              # PRO: White-label setup
│   └── batch-clients/         # PRO: Batch 15 clients
│
├── enterprise/
│   ├── branding/              # ENTERPRISE: White-label setup
│   ├── csv-import/            # ENTERPRISE: CSV import
│   └── team/                  # ENTERPRISE: Team invites
│
└── complete/                   # Final step (all tiers)
```

---

## 🔀 Dynamic Routing Logic

### How to Route Users by Tier

```typescript
// src/app/onboarding/success/page.tsx

const handleSignIn = async () => {
  await signIn('google', {
    // Determine callback based on user's selected tier
    callbackUrl: getOnboardingCallbackUrl()
  })
}

function getOnboardingCallbackUrl() {
  // Check tier from localStorage or database
  const tier = localStorage.getItem('selectedTier') || 'FREE'
  
  switch(tier) {
    case 'FREE':
      return '/onboarding/free/add-client'
    case 'STARTER':
      return '/onboarding/starter/batch-clients'
    case 'PROFESSIONAL':
      return '/onboarding/professional/branding'
    case 'ENTERPRISE':
      return '/onboarding/enterprise/branding'
    default:
      return '/onboarding/free/add-client'
  }
}
```

### Tier Selection Options

**Option 1: Ask During Welcome Survey** ✅ RECOMMENDED
```typescript
// Step 1: Welcome Survey includes tier selection
<select>
  <option value="FREE">Try it free (1 client)</option>
  <option value="STARTER">Starter - $39/mo (5 clients)</option>
  <option value="PROFESSIONAL">Professional - $99/mo (15 clients)</option>
  <option value="ENTERPRISE">Enterprise - $199/mo (50 clients)</option>
</select>
```

**Option 2: Separate Pricing Page First**
- User selects tier on `/pricing`
- Then clicks "Get Started"
- Flows to tier-specific onboarding

**Option 3: Default FREE, Upgrade Later**
- Everyone starts with FREE onboarding
- Can upgrade anytime
- Simpler but less optimized

---

## 🎯 Implementation Priority

### Phase 1: FREE Tier (✅ DONE)
- [x] Basic 4-step onboarding
- [x] Optional single client
- [x] Tier limits enforced
- [x] Working in production

### Phase 2: Report Limits (🔄 NEXT)
- [ ] FREE: 5 report limit enforcement
- [ ] Show "X of 5 reports used"
- [ ] Upgrade prompt at limit
- [ ] Block generation after 5

### Phase 3: STARTER Tier (📅 Week 2)
- [ ] Batch client form
- [ ] CSV import option
- [ ] Tier routing logic
- [ ] Tier selection in welcome

### Phase 4: PROFESSIONAL Tier (📅 Week 3)
- [ ] Branding setup page
- [ ] Logo upload
- [ ] Color picker
- [ ] Live report preview

### Phase 5: ENTERPRISE Tier (📅 Week 4)
- [ ] Full CSV import
- [ ] Column mapping
- [ ] Team invites
- [ ] Advanced features

---

## 💡 Key Design Decisions

### 1. **When to Show Tier Selection?**
**Decision:** Step 1 (Welcome Survey)

**Rationale:**
- Users know their needs upfront
- Can optimize onboarding per tier
- Sets expectations early
- Shows pricing transparency

### 2. **Should Branding Come Before or After Auth?**
**Decision:** AFTER authentication

**Rationale:**
- Need to save logo to cloud storage
- Requires authenticated API calls
- Can't store large images in localStorage
- User already committed after auth

### 3. **CSV Import: Required or Optional?**
**Decision:** Required for ENTERPRISE, optional for others

**Rationale:**
- ENTERPRISE users expect bulk import
- Shows premium value
- But don't force if not needed
- Can still add manually later

### 4. **How Many Steps is Too Many?**
**Decision:** Max 7 steps for ENTERPRISE

**Rationale:**
- Each step should take <5 minutes
- Total onboarding <20 minutes
- Show progress clearly
- Allow skipping non-essential steps

---

## 🚀 Next Actions (Tomorrow)

1. **Add Report Limits for FREE**
   - Enforce 5-report max
   - Show usage counter
   - Upgrade prompt

2. **Add Tier Selection to Welcome**
   - Dropdown with pricing
   - Save to localStorage
   - Route accordingly

3. **Create STARTER Batch Form**
   - 5-row input grid
   - Add/remove rows
   - Validation

4. **Test Tier Routing**
   - Verify FREE → single client
   - Verify STARTER → batch clients
   - Verify others default to FREE

---

## 📋 Success Criteria

| Metric | Target |
|--------|--------|
| FREE onboarding completion | >80% |
| STARTER onboarding completion | >70% |
| PRO onboarding completion | >65% |
| ENTERPRISE onboarding completion | >60% |
| Time to first report (FREE) | <10 min |
| Time to first report (STARTER) | <15 min |
| Upgrade rate (FREE → STARTER) | >15% |
| Customer satisfaction | >4.5/5 |

---

**Document Version:** 1.0  
**Last Updated:** October 13, 2025  
**Status:** 📋 Planning Phase - Ready for Implementation

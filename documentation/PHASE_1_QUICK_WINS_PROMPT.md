# Phase 1: Quick Wins Implementation Prompt

**Estimated Time:** 35 minutes  
**Complexity:** Low  
**Risk:** Minimal  
**Value:** High - Cleaner UI + Complete PDF contact info

---

## 🎯 OBJECTIVE

Implement two simple UI improvements to the white-label settings:

1. **Remove Agency Name field from `/settings`** - Cleaner profile page (5 min)
2. **Add Website & Email fields to `/settings/branding`** - Complete contact info for PDF footers (30 min)

---

## ✅ PRE-IMPLEMENTATION CHECKLIST

### Verify Database Fields Exist

**CRITICAL:** Before starting, confirm these fields exist in production database:

```bash
# Open Prisma Studio
npx prisma studio

# Check User table has these fields:
# - website: String?
# - supportEmail: String?
```

**Expected Result:** Both fields should be visible in User table (they were added in Phase 2 of white-label implementation)

**If fields are MISSING:** Stop and add migration first:
```bash
# Add to prisma/schema.prisma
model User {
  website      String?
  supportEmail String?
}

# Run migration
npx prisma migrate dev --name add_contact_fields
```

---

## 📝 TASK 1: Remove Agency Name from `/settings`

**File:** `/src/app/settings/page.tsx`

### Current Code (Find and Delete)

Look for this section in the Profile Information card:

```tsx
{/* Agency Name field - DELETE THIS ENTIRE SECTION */}
<div className="form-group">
  <label htmlFor="agencyName" className="...">
    <Building2 className="w-4 h-4" />
    Agency Name
  </label>
  <input
    id="agencyName"
    type="text"
    placeholder="Your agency name (coming soon)"
    disabled
    className="..."
  />
  <p className="text-sm text-gray-500">
    Custom agency branding coming soon
  </p>
</div>
```

### Action
- **DELETE** the entire agency name div block
- **KEEP** Full Name field
- **KEEP** Email Address field
- No other changes needed to this file

### Expected Result
After deletion, the Profile Information card should only show:
- Full Name (managed by Google account)
- Email Address (managed by Google account)

---

## 📝 TASK 2: Add Website & Email to `/settings/branding`

**File:** `/src/app/settings/branding/page.tsx`

### Step 2.1: Add State Variables

Find the existing state variables section (near the top of the component) and add:

```tsx
// Existing state (already there)
const [whiteLabelEnabled, setWhiteLabelEnabled] = useState(false)
const [companyName, setCompanyName] = useState('')
const [logo, setLogo] = useState('')
const [primaryColor, setPrimaryColor] = useState('#8B5CF6')

// ADD THESE TWO NEW STATE VARIABLES:
const [website, setWebsite] = useState('')
const [supportEmail, setSupportEmail] = useState('')
```

### Step 2.2: Load Fields from API

Find the `useEffect` that loads user profile and add the new fields:

```tsx
useEffect(() => {
  async function loadProfile() {
    const response = await fetch('/api/user/profile')
    const userData = await response.json()
    
    // Existing setters
    setWhiteLabelEnabled(userData.whiteLabelEnabled || false)
    setCompanyName(userData.companyName || '')
    setLogo(userData.logo || '')
    setPrimaryColor(userData.primaryColor || '#8B5CF6')
    
    // ADD THESE TWO LINES:
    setWebsite(userData.website || '')
    setSupportEmail(userData.supportEmail || '')
  }
  
  loadProfile()
}, [])
```

### Step 2.3: Add Validation Functions

Add these helper functions before the `handleSave` function:

```tsx
// Validation helper functions
const isValidUrl = (url: string): boolean => {
  if (!url) return true // Empty is valid (optional field)
  try {
    new URL(url)
    return url.startsWith('http://') || url.startsWith('https://')
  } catch {
    return false
  }
}

const isValidEmail = (email: string): boolean => {
  if (!email) return true // Empty is valid (optional field)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
```

### Step 2.4: Update Validation in handleSave

Find the `validateInputs()` function inside `handleSave` and add:

```tsx
const validateInputs = () => {
  if (!whiteLabelEnabled) return true
  
  // Existing validations
  if (!companyName?.trim()) {
    toast.error('Company name is required when white-label is enabled')
    return false
  }
  
  if (companyName.length > 50) {
    toast.error('Company name must be less than 50 characters')
    return false
  }
  
  // ADD THESE NEW VALIDATIONS:
  if (website && !isValidUrl(website)) {
    toast.error('Please enter a valid website URL (must start with http:// or https://)')
    return false
  }
  
  if (supportEmail && !isValidEmail(supportEmail)) {
    toast.error('Please enter a valid email address')
    return false
  }
  
  return true
}
```

### Step 2.5: Add Fields to Save Payload

In the `handleSave` function, find the `fetch` call and update the body:

```tsx
const response = await fetch('/api/user/profile', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    whiteLabelEnabled,
    companyName,
    logo,
    primaryColor,
    // ADD THESE TWO LINES:
    website,
    supportEmail,
  })
})
```

### Step 2.6: Add UI Fields

Find the branding settings form (should be inside a conditional that checks `whiteLabelEnabled`).

Add this new section **AFTER** the existing fields (company name, logo, colors) but **BEFORE** the Save button:

```tsx
{/* Contact Information Section - ADD THIS ENTIRE BLOCK */}
<div className="space-y-4 pt-6 border-t border-gray-200">
  <div>
    <h3 className="text-lg font-semibold text-gray-900">
      Contact Information
    </h3>
    <p className="text-sm text-gray-600 mt-1">
      This information will appear in your PDF report footers
    </p>
  </div>

  {/* Website Field */}
  <div>
    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
      Agency Website
      <span className="text-gray-400 font-normal ml-1">(Optional)</span>
    </label>
    <input
      id="website"
      type="url"
      placeholder="https://yourcompany.com"
      value={website}
      onChange={(e) => setWebsite(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-purple-500 focus:border-transparent
                 transition-all"
    />
    <p className="text-xs text-gray-500 mt-1">
      Your agency's website URL (appears in PDF footers)
    </p>
  </div>

  {/* Support Email Field */}
  <div>
    <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700 mb-2">
      Support Email
      <span className="text-gray-400 font-normal ml-1">(Optional)</span>
    </label>
    <input
      id="supportEmail"
      type="email"
      placeholder="support@yourcompany.com"
      value={supportEmail}
      onChange={(e) => setSupportEmail(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-purple-500 focus:border-transparent
                 transition-all"
    />
    <p className="text-xs text-gray-500 mt-1">
      Contact email for client inquiries (appears in PDF footers)
    </p>
  </div>
</div>
```

---

## ✅ VERIFICATION CHECKLIST

### After Implementation, Test:

#### Task 1 Verification:
- [ ] Navigate to `/settings`
- [ ] Verify agency name field is GONE
- [ ] Verify only Full Name and Email Address remain
- [ ] Verify page layout looks clean (no broken spacing)

#### Task 2 Verification:
- [ ] Navigate to `/settings/branding`
- [ ] Enable white-label toggle
- [ ] Verify "Contact Information" section appears
- [ ] Verify website field accepts valid URLs
- [ ] Verify website field shows error for invalid URLs (e.g., "not-a-url")
- [ ] Verify email field accepts valid emails
- [ ] Verify email field shows error for invalid emails (e.g., "not@email")
- [ ] Click Save → Should show success toast
- [ ] Refresh page → Fields should retain saved values

#### API Verification:
- [ ] Open browser DevTools → Network tab
- [ ] Save settings with website and email filled
- [ ] Check PATCH request to `/api/user/profile`
- [ ] Verify request body includes `website` and `supportEmail`

#### Database Verification:
```bash
# Open Prisma Studio
npx prisma studio

# Find your user record
# Verify website and supportEmail fields are populated
```

#### PDF Verification (Bonus):
- [ ] Generate a PDF report
- [ ] Check PDF footer
- [ ] Verify website and support email appear in footer
- [ ] (This should already work from previous white-label implementation)

---

## 🐛 TROUBLESHOOTING

### Issue: "website/supportEmail fields not found in database"

**Solution:**
```bash
# Check current schema
npx prisma db pull

# If fields missing, add to schema.prisma:
model User {
  website      String?
  supportEmail String?
}

# Create and apply migration
npx prisma migrate dev --name add_contact_fields

# Push to production
git add prisma/
git commit -m "feat: add website and supportEmail fields to User model"
git push
```

### Issue: "API returns 500 error when saving"

**Check:** `/src/app/api/user/profile/route.ts`

The PATCH handler should already include these fields (per white-label docs):
```typescript
data: {
  website: body.website,
  supportEmail: body.supportEmail,
}
```

If missing, add them to the `prisma.user.update()` call.

### Issue: "Validation not working"

**Check:** Ensure `isValidUrl` and `isValidEmail` functions are defined BEFORE `handleSave`.

**Test cases:**
- Valid URL: `https://example.com` ✓
- Invalid URL: `example.com` ✗ (no protocol)
- Invalid URL: `not a url` ✗
- Valid email: `test@example.com` ✓
- Invalid email: `notanemail` ✗

### Issue: "Fields not showing in UI"

**Check:** Ensure new fields are inside the `{whiteLabelEnabled && ( ... )}` conditional block.

Fields should only be visible when toggle is ON.

---

## 📦 FILES MODIFIED SUMMARY

```
Modified:
- /src/app/settings/page.tsx (deletion only)
- /src/app/settings/branding/page.tsx (added 2 fields + validation)

No new files created.
No database migrations needed (fields already exist).
No API changes needed (already handles these fields).
```

---

## 🚀 DEPLOYMENT

### After completing both tasks:

```bash
# Stage changes
git add src/app/settings/page.tsx
git add src/app/settings/branding/page.tsx

# Commit with descriptive message
git commit -m "feat: Phase 1 quick wins - remove agency name from settings, add website/email to branding"

# Push to trigger deployment
git push origin main
```

### Post-Deployment Verification:

1. Wait for Vercel deployment (2-3 minutes)
2. Test on production: `https://reportr.agency/settings`
3. Test on production: `https://reportr.agency/settings/branding`
4. Verify all checklist items ✓

---

## 📊 EXPECTED RESULTS

### User Experience Improvements:
- ✅ Cleaner `/settings` page (removed confusing "coming soon" field)
- ✅ Complete contact information in branding settings
- ✅ Professional validation with helpful error messages
- ✅ PDF footers will now include website and email

### Technical Quality:
- ✅ Type-safe (TypeScript)
- ✅ Validated inputs (URL, email format)
- ✅ Toast notifications for feedback
- ✅ Optional fields (won't break if empty)
- ✅ Backward compatible (existing users unaffected)

---

## ⏱️ TIME ESTIMATES

- **Task 1 (Remove Agency Name):** 5 minutes
- **Task 2 (Add Website & Email):** 30 minutes
  - State setup: 5 min
  - Validation: 10 min
  - UI components: 10 min
  - Testing: 5 min

**Total:** ~35 minutes

---

## 🎯 SUCCESS CRITERIA

**Phase 1 is complete when:**

1. ✅ Agency name field removed from `/settings`
2. ✅ Website field added to `/settings/branding`
3. ✅ Support email field added to `/settings/branding`
4. ✅ Both fields validate input correctly
5. ✅ Both fields save to database
6. ✅ All tests pass
7. ✅ Deployed to production
8. ✅ Verified working in production

---

**Ready to implement! Good luck!** 🚀

*Created: October 27, 2025*

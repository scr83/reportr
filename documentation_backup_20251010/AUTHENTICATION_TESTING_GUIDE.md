# Testing Guide: NextAuth.js Authentication System

**Date:** September 15, 2025  
**Purpose:** Step-by-step testing guide for the newly implemented authentication system  
**Prerequisites:** Development server running, database connected

## 🎯 Testing Overview

This guide provides comprehensive testing steps for the NextAuth.js authentication system that was just implemented. Testing is divided into phases based on setup completion.

## 📋 Pre-Testing Setup Requirements

### 1. Google OAuth Credentials Setup

**Before you can test authentication, you need Google OAuth credentials:**

#### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Name: "SEO ReportBot" or your preferred name

#### Step 2: Enable Required APIs
```
Required APIs to Enable:
✅ Google+ API (for user authentication)
✅ Google Search Console API (for SEO data)
✅ Google Analytics API (for traffic data)
```

#### Step 3: Create OAuth 2.0 Credentials
1. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
2. Application type: "Web application"
3. Name: "SEO ReportBot Local Development"
4. **Authorized redirect URIs:**
   ```
   http://localhost:3001/api/auth/callback/google
   ```

#### Step 4: Update Environment Variables
```bash
# Replace these in /Users/scr/WHITE-LABEL-SEO/.env
GOOGLE_CLIENT_ID="your-actual-client-id-here"
GOOGLE_CLIENT_SECRET="your-actual-client-secret-here"
```

### 2. Generate NextAuth Secret
```bash
# Generate a secure secret
openssl rand -base64 32

# Add to .env file
NEXTAUTH_SECRET="your-generated-secret-here"
```

## 🧪 Phase 1: Basic Structure Testing (No Google OAuth Required)

**Test these first to verify the implementation structure:**

### Test 1: Development Server
```bash
cd /Users/scr/WHITE-LABEL-SEO
npm run dev
```

**Expected Results:**
- ✅ Server starts on http://localhost:3001
- ✅ No TypeScript compilation errors
- ✅ No missing dependency errors
- ✅ "Ready in X.Xs" message appears

### Test 2: Public Pages (Should Work)
Visit these URLs - they should load normally:

1. **Homepage:** http://localhost:3001
   - ✅ Should load without authentication

2. **Component Showcase:** http://localhost:3001/showcase
   - ✅ Should display all 25+ components working

3. **Database Test:** http://localhost:3001/database-test
   - ✅ Should show green "Database Connected" banner
   - ✅ Should display sample users and clients

### Test 3: Protected Routes (Should Redirect)
Visit these URLs - they should redirect to sign-in:

1. **Dashboard:** http://localhost:3001/dashboard
   - ✅ Should redirect to http://localhost:3001/signin

2. **Profile:** http://localhost:3001/profile
   - ✅ Should redirect to http://localhost:3001/signin

3. **Settings:** http://localhost:3001/settings
   - ✅ Should redirect to http://localhost:3001/signin

### Test 4: Sign-In Page Structure
Visit: http://localhost:3001/signin

**Expected Results:**
- ✅ Professional sign-in page loads
- ✅ "Continue with Google" button visible
- ✅ Page styling matches existing design system
- ✅ No console errors

**Note:** Button won't work yet without Google OAuth credentials

### Test 5: API Route Structure
Check these endpoints exist (won't work without auth, but should not 404):

1. **Auth API:** http://localhost:3001/api/auth/signin
   - ✅ Should show NextAuth sign-in page (basic)

2. **Profile API:** http://localhost:3001/api/users/profile
   - ✅ Should return 401 Unauthorized (expected without session)

## 🔐 Phase 2: Full Authentication Testing (Requires Google OAuth)

**Only proceed after setting up Google OAuth credentials:**

### Test 6: Google OAuth Flow
1. Visit: http://localhost:3001/signin
2. Click "Continue with Google"

**Expected Flow:**
- ✅ Redirects to Google OAuth consent screen
- ✅ Shows permissions: Email, Profile, Search Console, Analytics
- ✅ After approval, redirects back to your app
- ✅ Automatically redirects to http://localhost:3001/dashboard

### Test 7: User Creation and Default Settings
**For first-time users:**

1. Check database in Prisma Studio: http://localhost:5555
2. Look in "User" table for new user

**Expected Results:**
- ✅ New user record created
- ✅ Default companyName: "[FirstName]'s Agency"
- ✅ Default primaryColor: "#3B82F6"
- ✅ Google Account and Session records created

### Test 8: Dashboard Access
After successful authentication:

1. Visit: http://localhost:3001/dashboard
   - ✅ Should load without redirecting
   - ✅ Should show authenticated user interface

2. Check navigation:
   - ✅ User menu shows authenticated user name
   - ✅ Profile and Settings links visible

### Test 9: Profile Management
Visit: http://localhost:3001/profile

**Expected Features:**
- ✅ Form pre-filled with user data
- ✅ Company name editing works
- ✅ Color picker shows current brand color
- ✅ "Save Changes" button functional
- ✅ Updates reflect in database immediately

**Test Profile Updates:**
1. Change company name
2. Select different brand color
3. Click "Save Changes"
4. Verify changes persist after page refresh

### Test 10: Settings Page
Visit: http://localhost:3001/settings

**Expected Features:**
- ✅ User information displayed
- ✅ Plan information shown
- ✅ Usage statistics (if any)
- ✅ Account management options

### Test 11: API Endpoints (Authenticated)
With valid session, test API endpoints:

1. **Profile API:** http://localhost:3001/api/users/profile
   - ✅ Returns user data (JSON)
   - ✅ Includes client/report counts

2. **Settings API:** http://localhost:3001/api/users/settings
   - ✅ Returns settings data (JSON)
   - ✅ Includes plan information

### Test 12: Sign-Out Flow
1. Click user menu → "Sign Out"
2. Should redirect to sign-in page
3. Try accessing protected route
4. Should redirect back to sign-in

**Expected Results:**
- ✅ Session cleared completely
- ✅ Protected routes redirect again
- ✅ User can sign back in

## 🔧 Phase 3: Integration Testing

### Test 13: Database Integration
1. Check Prisma Studio: http://localhost:5555
2. Verify all authentication tables:

**Account Table:**
- ✅ Google provider entry
- ✅ Access/refresh tokens stored
- ✅ Proper user relationship

**Session Table:**
- ✅ Active session entry
- ✅ Expiration time set
- ✅ Session token unique

**User Table:**
- ✅ User data complete
- ✅ Company settings working
- ✅ Relationships to clients/reports

### Test 14: Component Integration
1. Check user menu across all pages
2. Verify brand color appears in user menu
3. Test navigation between protected pages

**Expected Results:**
- ✅ Consistent user state across pages
- ✅ Brand colors reflect user settings
- ✅ Navigation works seamlessly

### Test 15: Error Handling
Test various error scenarios:

1. **Invalid API requests** (without session)
2. **Malformed profile updates**
3. **Network errors during OAuth**

**Expected Results:**
- ✅ Graceful error messages
- ✅ No app crashes
- ✅ User can recover from errors

## 🚨 Troubleshooting Guide

### Common Issues and Solutions

#### Issue: "Invalid client_id" during OAuth
**Solution:** 
- Verify GOOGLE_CLIENT_ID in .env is correct
- Check Google Cloud Console credentials

#### Issue: "Redirect URI mismatch"
**Solution:**
- Ensure redirect URI in Google Console matches exactly:
  `http://localhost:3001/api/auth/callback/google`

#### Issue: TypeScript errors
**Solution:**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

#### Issue: Database connection errors
**Solution:**
```bash
# Restart PostgreSQL container
docker start seo-reportbot-postgres

# Verify connection
npm run db:studio
```

#### Issue: Session not persisting
**Solution:**
- Check NEXTAUTH_SECRET is set in .env
- Verify database connection working
- Clear browser cookies and retry

## ✅ Testing Checklist

### Phase 1: Basic Structure ✓
- [ ] Development server starts without errors
- [ ] Public pages load correctly
- [ ] Protected routes redirect to sign-in
- [ ] Sign-in page displays properly
- [ ] API routes exist (return expected 401s)

### Phase 2: Authentication Flow ✓
- [ ] Google OAuth credentials configured
- [ ] OAuth consent flow works
- [ ] User creation with defaults successful
- [ ] Dashboard accessible after auth
- [ ] Profile management functional
- [ ] Settings page working
- [ ] API endpoints return data
- [ ] Sign-out flow complete

### Phase 3: Integration ✓
- [ ] Database records created properly
- [ ] User state consistent across pages
- [ ] Component integration seamless
- [ ] Error handling graceful
- [ ] Brand customization working

## 🎯 Success Criteria

### Authentication System Ready ✅
- [ ] Google OAuth fully functional
- [ ] User profile CRUD working
- [ ] Protected routes secured
- [ ] Session management reliable
- [ ] Database integration complete

### Ready for Client Management ✅
- [ ] User identification working
- [ ] Company branding system functional
- [ ] Multi-tenant foundation established
- [ ] API protection pattern proven
- [ ] UI integration seamless

## 📊 Test Results Template

**Use this template to record your testing results:**

```
TESTING RESULTS - [DATE]

Phase 1: Basic Structure
✅/❌ Development server: 
✅/❌ Public pages: 
✅/❌ Protected redirects: 
✅/❌ Sign-in page: 

Phase 2: Authentication (after OAuth setup)
✅/❌ Google OAuth flow: 
✅/❌ User creation: 
✅/❌ Dashboard access: 
✅/❌ Profile management: 
✅/❌ Settings page: 
✅/❌ Sign-out flow: 

Phase 3: Integration
✅/❌ Database records: 
✅/❌ Component integration: 
✅/❌ Error handling: 

Issues Found:
- [List any issues encountered]

Overall Status: ✅ PASS / ❌ NEEDS FIXES
```

---

**Start with Phase 1 testing immediately, then set up Google OAuth for complete testing. Document all results for development tracking.**
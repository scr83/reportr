# 🧪 Google OAuth Authentication Test Guide

## OVERVIEW
This guide provides comprehensive testing procedures for the Google OAuth authentication system after the Backend agent's fixes.

## PRE-REQUISITES

### 1. Database Setup (REQUIRED)
Before testing, you MUST have a PostgreSQL database running:

```bash
# Option A: Start existing Docker container
docker start seo-reportbot-postgres

# Option B: Create new Docker container
docker run --name seo-reportbot-postgres \
  -e POSTGRES_USER=devuser \
  -e POSTGRES_PASSWORD=devpassword \
  -e POSTGRES_DB=seo_reportbot \
  -p 5432:5432 \
  -d postgres:15

# Verify database is running
docker ps | grep postgres
```

### 2. Database Migration
```bash
# Apply schema to database
npx prisma db push

# Expected: ✅ "Your database is now in sync with your schema"
# Expected: ✅ All NextAuth tables created (accounts, sessions, users, etc.)
```

### 3. Environment Validation
```bash
# Run authentication test script
npm run test:auth

# Expected: ✅ All configuration checks pass
# Expected: ✅ Database connection successful
# Expected: ✅ Google OAuth provider configured
```

## MANUAL TESTING PROCEDURES

### TEST 1: Authentication Flow End-to-End

#### 1.1 Start Development Server
```bash
npm run dev
# Server should start on http://localhost:3000
```

#### 1.2 Test Sign-In Page
1. Navigate to: `http://localhost:3000/signin`
2. **Verify**: Sign-in page loads without errors
3. **Verify**: "Continue with Google" button is present
4. **Verify**: Page styling loads correctly

#### 1.3 Initiate OAuth Flow
1. Click "Continue with Google"
2. **Expected**: Redirect to Google OAuth consent screen
3. **Expected**: OAuth consent shows:
   - App name: "Reportr" (or your configured app name)
   - Scopes requested:
     - ✅ Basic profile information
     - ✅ Google Search Console (read-only)
     - ✅ Google Analytics (read-only)

#### 1.4 Complete OAuth Consent
1. Select Google account
2. **Expected**: Consent screen shows all requested permissions
3. Click "Allow" or "Continue"
4. **Expected**: Redirect back to application
5. **Expected**: Land on `/dashboard` page
6. **Expected**: User is signed in (check top-right corner for user menu)

#### 1.5 Verify Session Persistence
1. Refresh the page
2. **Expected**: User remains signed in
3. **Expected**: Dashboard loads without redirect to sign-in
4. Navigate to a different page and back
5. **Expected**: Session persists across navigation

#### 1.6 Test Sign-Out
1. Click user menu (top-right)
2. Click "Sign Out"
3. **Expected**: Redirect to home page or sign-in page
4. **Expected**: Accessing `/dashboard` redirects to sign-in

### TEST 2: Database Persistence Verification

#### 2.1 Check User Record
```bash
# Open Prisma Studio
npm run db:studio
# Or check via SQL
```

**Verify in `users` table:**
- ✅ New user record created
- ✅ `email` matches Google account
- ✅ `name` matches Google profile
- ✅ `companyName` set to "[FirstName]'s Agency"
- ✅ `primaryColor` set to "#3B82F6"
- ✅ `createdAt` and `updatedAt` timestamps

#### 2.2 Check Account Record
**Verify in `accounts` table:**
- ✅ Account record with `provider: "google"`
- ✅ `access_token` is present and non-empty
- ✅ `refresh_token` is present and non-empty
- ✅ `scope` includes webmasters and analytics permissions
- ✅ `userId` matches user record

#### 2.3 Check Session Record
**Verify in `sessions` table:**
- ✅ Active session record exists
- ✅ `sessionToken` is present
- ✅ `expires` is future date
- ✅ `userId` matches user record

### TEST 3: Session Data Validation

#### 3.1 Inspect Session Object
Add temporary logging in any dashboard page:
```typescript
// Add to any dashboard page component
import { useSession } from 'next-auth/react'

const { data: session } = useSession()
console.log('Session data:', session)
```

**Verify session contains:**
- ✅ `user.id` - User database ID
- ✅ `user.email` - Google email
- ✅ `user.name` - Google display name
- ✅ `user.companyName` - Default company name
- ✅ `user.primaryColor` - Default color
- ✅ `accessToken` - Google access token
- ✅ `refreshToken` - Google refresh token

#### 3.2 Test API Token Access
Create test API route to verify Google tokens:
```typescript
// pages/api/test-google-tokens.ts
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  
  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' })
  }
  
  return res.json({
    hasAccessToken: !!session.accessToken,
    hasRefreshToken: !!session.refreshToken,
    tokenLength: session.accessToken?.length || 0
  })
}
```

**Expected Response:**
```json
{
  "hasAccessToken": true,
  "hasRefreshToken": true,
  "tokenLength": 200+ // Google access tokens are typically 200+ characters
}
```

### TEST 4: Error Scenarios

#### 4.1 Test Invalid Credentials
1. Temporarily change `GOOGLE_CLIENT_ID` in `.env`
2. Restart server: `npm run dev`
3. Try to sign in
4. **Expected**: OAuth error page or redirect back to sign-in
5. **Expected**: Clear error message (not cryptic)
6. Restore correct credentials

#### 4.2 Test Database Disconnection
1. Stop PostgreSQL: `docker stop seo-reportbot-postgres`
2. Try to sign in
3. **Expected**: Application handles gracefully
4. **Expected**: User-friendly error message
5. Restart database: `docker start seo-reportbot-postgres`

#### 4.3 Test Cancelled OAuth
1. Start OAuth flow
2. Click "Cancel" or "Deny" on Google consent
3. **Expected**: Redirect back to sign-in page
4. **Expected**: No error thrown, clean handling

### TEST 5: Multi-Account Scenarios

#### 5.1 Test Different Google Accounts
1. Sign out if signed in
2. Sign in with Google Account A
3. **Expected**: New user created if first time
4. Sign out
5. Sign in with Google Account B
6. **Expected**: Different user record created
7. **Expected**: Correct session data for Account B

#### 5.2 Test Account Switching
1. Sign in with Account A
2. In same browser, go to Google and switch accounts
3. Try OAuth flow again
4. **Expected**: Prompted to choose account
5. **Expected**: Correct account signed in

## PERFORMANCE TESTING

### Load Time Verification
- ✅ Sign-in page loads < 2 seconds
- ✅ OAuth redirect < 3 seconds
- ✅ Post-auth dashboard load < 2 seconds
- ✅ Session validation < 500ms

### Database Query Optimization
- ✅ Session callback executes < 200ms
- ✅ No N+1 queries in session lookup
- ✅ Proper indexes used

## TROUBLESHOOTING

### Common Issues

**Issue: "Can't reach database server"**
- Solution: Start PostgreSQL container
- Check: DATABASE_URL in .env is correct

**Issue: OAuth consent shows wrong app name**
- Solution: Check Google Cloud Console app configuration
- Verify: GOOGLE_CLIENT_ID matches configured app

**Issue: "Access denied" on OAuth**
- Solution: Verify Google Cloud Console has correct redirect URI
- Check: `http://localhost:3000/api/auth/callback/google`

**Issue: Session not persisting**
- Solution: Check NEXTAUTH_SECRET is set and consistent
- Verify: Database sessions table accessible

**Issue: Missing Google API scopes**
- Solution: Check auth.ts has correct scope configuration
- Verify: Includes webmasters.readonly and analytics.readonly

### Debug Commands

```bash
# Check database connection
npx prisma db push

# Verify environment variables
npm run test:auth

# Check database records
npm run db:studio

# View server logs
npm run dev  # Check console output during OAuth flow

# Test build
npm run build
```

## SUCCESS CRITERIA

✅ **OAuth Flow Complete**: User can sign in with Google  
✅ **Database Persistence**: User data saved correctly  
✅ **Session Management**: Sessions work across page loads  
✅ **Token Storage**: Google API tokens accessible  
✅ **Error Handling**: Graceful failure scenarios  
✅ **Performance**: Fast loading and responsiveness  
✅ **Multi-Account**: Multiple users can sign in  

## POST-TESTING CLEANUP

After testing, optionally clean up test data:
```sql
-- Connect to database and run:
DELETE FROM accounts WHERE provider = 'google';
DELETE FROM sessions;
DELETE FROM users WHERE email LIKE '%test%';
```

---

**Once all tests pass, the authentication system is ready for production deployment! 🚀**
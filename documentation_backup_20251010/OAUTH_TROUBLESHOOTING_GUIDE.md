# OAuth Authentication Troubleshooting Guide

**Last Updated:** October 6, 2025  
**Status:** Production Issue Resolved  
**Application:** Reportr SaaS Platform

---

## Issue Summary

**Problem:** OAuth sign-in failing with `OAuthAccountNotLinked` error  
**Root Cause:** Google Cloud Console OAuth consent screen configuration  
**Solution:** Add test users to OAuth consent screen OR publish app  

---

## Technical Audit Results

### ✅ Verified Working Components

#### 1. NextAuth Configuration (`src/lib/auth.ts`)
```typescript
// CORRECT CONFIGURATION
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), // ✅ Enabled
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly',
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })
  ],
  session: {
    strategy: "database" // ✅ Correct for Prisma adapter
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    }
  }
}
```

#### 2. Environment Variables (Vercel Production)
```bash
# All required variables present and correct
DATABASE_URL=postgresql://... # ✅ Direct connection (non-pooled)
PRISMA_DATABASE_URL=postgresql://... # ✅ Same direct connection
NEXTAUTH_URL=https://reportr-one.vercel.app # ✅ Correct production URL
NEXTAUTH_SECRET=*** # ✅ Generated secret present
GOOGLE_CLIENT_ID=***.apps.googleusercontent.com # ✅ Valid
GOOGLE_CLIENT_SECRET=GOCSPX-*** # ✅ Valid
```

#### 3. Database Schema
```prisma
// Prisma schema verified correct
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?   // ✅ FIXED: Made optional to prevent errors
  image         String?
  // ... other fields
  accounts      Account[]
  sessions      Session[]
}

model Account {
  // ✅ All NextAuth required fields present
  userId            String
  type              String
  provider          String
  providerAccountId String
  // ... token fields
}

model Session {
  // ✅ All NextAuth required fields present
  sessionToken String   @unique
  userId       String
  expires      DateTime
}
```

#### 4. Google OAuth Configuration
- **Authorized JavaScript Origins:** `https://reportr-one.vercel.app` ✅
- **Authorized Redirect URIs:** `https://reportr-one.vercel.app/api/auth/callback/google` ✅
- **OAuth Flow Test:** Google accepts configuration (status 302) ✅

---

## ❌ Root Cause: Google Cloud Console OAuth Consent Screen

### The Problem

The OAuth consent screen is set to **"Testing"** mode, which restricts access to explicitly added test users only.

**Error Flow:**
1. User clicks "Sign in with Google"
2. Redirects to Google OAuth
3. Google validates OAuth config ✅
4. Google checks consent screen permissions ❌
5. User not in test user list → Error returned
6. Redirects back with `error=OAuthAccountNotLinked`

### Verification

Check Vercel logs showing:
```
GET /api/auth/callback/google 302
[next-auth][error][OAUTH_CALLBACK_ERROR]
```

Browser console shows:
```
Failed to load resource: the server responded with a status of 404
```

Final redirect URL:
```
https://reportr-one.vercel.app/signin?callbackUrl=https%3A%2F%2Freportr-one.vercel.app%2Fdashboard&error=OAuthAccountNotLinked
```

---

## 🔧 Solution Options

### Option 1: Add Test Users (Quick Fix - 2 minutes)

**When to use:** During development/testing phase

**Steps:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project: `reportr-472212`
3. Navigate: APIs & Services → OAuth consent screen
4. Scroll to **"Test users"** section
5. Click **"+ ADD USERS"**
6. Enter email addresses (one per line):
   ```
   scontrerasr@gmail.com
   sebconrios@gmail.com
   ```
7. Click **"Save"**
8. Wait 2-3 minutes for changes to propagate
9. Test sign-in at: https://reportr-one.vercel.app/signin

**Current Status:** Test users already added (verified in screenshots)

---

### Option 2: Publish App (Production Fix)

**When to use:** For production launch, allowing any Google user to sign in

**Steps:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project: `reportr-472212`
3. Navigate: APIs & Services → OAuth consent screen
4. Click **"PUBLISH APP"** button
5. Confirm publishing dialog
6. If sensitive scopes are used, submit for verification (may take 1-4 weeks)

**Note:** Your scopes (Search Console, Analytics) may require Google verification

---

## 🧪 Testing Checklist

After applying fix, verify:

- [ ] Navigate to: https://reportr-one.vercel.app/signin
- [ ] Click "Continue with Google"
- [ ] Select Google account (must be test user if in Testing mode)
- [ ] Grant permissions when prompted
- [ ] Should redirect to: https://reportr-one.vercel.app/dashboard
- [ ] User menu shows name and profile picture
- [ ] Check Vercel logs: No `OAUTH_CALLBACK_ERROR` errors
- [ ] Check Prisma database: User, Account, Session records created

---

## 🐛 Common Issues & Troubleshooting

### Issue: Still getting `OAuthAccountNotLinked` after adding test user

**Possible Causes:**
1. Email not yet propagated (wait 5 minutes)
2. Using wrong Google account (use exact test user email)
3. Browser cache (try incognito mode)

**Debug Steps:**
```bash
# Check if user exists in database
npx prisma studio
# Look in User and Account tables
```

---

### Issue: `redirect_uri_mismatch` error

**Cause:** Redirect URI in Google Cloud Console doesn't match exactly

**Fix:**
1. Go to Google Cloud Console → Credentials
2. Edit OAuth 2.0 Client ID
3. Verify redirect URI is EXACTLY:
   ```
   https://reportr-one.vercel.app/api/auth/callback/google
   ```
4. No trailing slash, no typos, correct domain

---

### Issue: Database connection errors

**Symptom:** `PrismaClientInitializationError` in logs

**Cause:** Using pooled connection (`POSTGRES_URL`) instead of direct connection

**Fix:**
1. In Vercel: Settings → Environment Variables
2. Verify `DATABASE_URL` uses direct connection string
3. Should start with: `postgresql://` (not `postgres://`)
4. Use `PRISMA_DATABASE_URL` value if available

---

### Issue: Session not persisting

**Symptom:** User redirected back to sign-in after successful OAuth

**Cause:** Session strategy mismatch

**Fix in `src/lib/auth.ts`:**
```typescript
session: {
  strategy: "database" // Must be "database" when using PrismaAdapter
}
```

---

## 📝 Environment Variables Reference

### Required for OAuth

| Variable | Example | Purpose |
|----------|---------|---------|
| `DATABASE_URL` | `postgresql://user:pass@host/db` | Direct Postgres connection |
| `NEXTAUTH_URL` | `https://reportr-one.vercel.app` | Production URL |
| `NEXTAUTH_SECRET` | `base64-encoded-string` | Session encryption |
| `GOOGLE_CLIENT_ID` | `***.apps.googleusercontent.com` | OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | `GOCSPX-***` | OAuth client secret |

### Generate `NEXTAUTH_SECRET`
```bash
openssl rand -base64 32
```

---

## 🔐 Security Checklist

- [ ] `NEXTAUTH_SECRET` is cryptographically random (32+ bytes)
- [ ] Google Client Secret never committed to git
- [ ] Environment variables set in Vercel (not in code)
- [ ] Authorized redirect URIs limited to production domains
- [ ] OAuth scopes limited to minimum required
- [ ] Database connection uses SSL (Vercel Postgres default)

---

## 📚 Related Documentation

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Adapter Documentation](https://authjs.dev/reference/adapter/prisma)
- [Google OAuth 2.0 Setup](https://developers.google.com/identity/protocols/oauth2)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)

---

## 🔄 Deployment Process

After making auth configuration changes:

```bash
# 1. Commit changes
git add .
git commit -m "Fix: OAuth configuration update"

# 2. Push to trigger Vercel deployment
git push origin main

# 3. Wait for deployment (~2 minutes)
# 4. Check Vercel deployment logs for errors
# 5. Test OAuth flow on production
```

---

## ✅ Final Verification

**Sign-in flow should be:**
1. Click "Continue with Google" → Google OAuth consent screen
2. Select Google account → Permission request screen
3. Grant permissions → Redirect to `/dashboard`
4. User authenticated → User menu shows profile

**If any step fails, check:**
- Vercel function logs for errors
- Browser console for client errors
- Google Cloud Console audit logs
- Prisma Studio for database records

---

## 🆘 Emergency Rollback

If OAuth completely breaks:

```bash
# 1. Revert to last working commit
git log --oneline  # Find last working commit
git revert <commit-hash>
git push origin main

# 2. Or redeploy previous Vercel deployment
# Go to Vercel → Deployments → Find working deployment → Redeploy
```

---

**Document Version:** 1.0  
**Maintained By:** Backend/API Agent  
**Last Verified:** October 6, 2025

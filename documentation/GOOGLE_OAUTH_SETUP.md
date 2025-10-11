# Google OAuth Setup Guide - Reportr SEO Tool

**Last Updated:** October 11, 2025  
**Status:** Production Ready ✅  
**Time Required:** 15-20 minutes

---

## Quick Start

This guide will help you set up Google OAuth authentication for Reportr, allowing users to sign in with Google and connect their Search Console and Analytics accounts.

---

## Step 1: Create Google Cloud Project

1. Go to: https://console.cloud.google.com
2. Click **"Select a project"** → **"New Project"**
3. Project name: `Reportr SEO Tool`
4. Click **"Create"**
5. Select your new project

---

## Step 2: Enable Required APIs

1. Navigate to: **APIs & Services → Library**
2. Search and enable:
   - **Google Analytics Data API**
   - **Google Search Console API**

---

## Step 3: Configure OAuth Consent Screen

1. Go to: **APIs & Services → OAuth consent screen**
2. Select **"External"**
3. Fill in:
   - App name: `Reportr SEO Tool`
   - User support email: your@email.com
   - Authorized domains: `vercel.app`
   - Developer email: your@email.com
4. Click **"Save and Continue"**

5. **Add Scopes:**
   - `https://www.googleapis.com/auth/webmasters.readonly`
   - `https://www.googleapis.com/auth/analytics.readonly`
   - `openid`
   - `email`
   - `profile`
6. Click **"Save and Continue"**

7. **Add Test Users:** Add your email address
8. Click **"Save and Continue"**

---

## Step 4: Create OAuth 2.0 Credentials

1. Go to: **APIs & Services → Credentials**
2. Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
3. Application type: **"Web application"**
4. Name: `Reportr Web Client`

### Authorized JavaScript Origins:
```
http://localhost:3000
https://reportr-one.vercel.app
```

### Authorized Redirect URIs:
```
http://localhost:3000/api/auth/callback/google
https://reportr-one.vercel.app/api/auth/callback/google
```

**⚠️ CRITICAL:** Must be `/api/auth/callback/google` (not `/google/callback`)

5. Click **"Create"**
6. **Save your Client ID and Client Secret**

---

## Step 5: Environment Variables

### Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### Local Development (`.env.local`):
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-local-secret-here
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-client-secret
DATABASE_URL=your-database-url
```

### Production (Vercel):
1. Go to: https://vercel.com/dashboard
2. Select project → **Settings** → **Environment Variables**
3. Add:
   - `NEXTAUTH_URL` = `https://reportr-one.vercel.app`
   - `NEXTAUTH_SECRET` = your-production-secret
   - `GOOGLE_CLIENT_ID` = your-client-id
   - `GOOGLE_CLIENT_SECRET` = your-client-secret
4. **Redeploy** after adding variables

---

## Step 6: Test Authentication

### Local:
1. Run: `npm run dev`
2. Go to: http://localhost:3000
3. Click **"Sign In"**
4. Should redirect to Google
5. Approve permissions
6. Should redirect to dashboard

### Production:
1. Go to: https://reportr-one.vercel.app
2. Click **"Sign In"**
3. Click **"Advanced"** → **"Go to Reportr (unsafe)"** (normal for testing)
4. Approve permissions
5. Should redirect to dashboard

---

## Troubleshooting

### Error: redirect_uri_mismatch
**Fix:**
- Verify redirect URI in Google Console is EXACTLY:
  `https://reportr-one.vercel.app/api/auth/callback/google`
- Must be `/callback/google` not `/google/callback`
- No trailing slash
- Wait 2-3 minutes after changes
- Clear browser cache

### Error: invalid_client
**Fix:**
- Check Client ID and Secret in environment variables
- Verify no extra spaces or quotes
- Redeploy after changing Vercel env vars

### Error: access_denied
**Fix:**
- Add your email to Test Users in OAuth consent screen
- Verify APIs are enabled
- Check scopes are added correctly

### "Unverified app" warning
**This is normal for testing!**
- Click "Advanced" → "Go to Reportr (unsafe)"
- For production, submit app for Google verification

---

## Production Checklist

- [ ] Google Cloud project created
- [ ] APIs enabled (Analytics Data API, Search Console API)
- [ ] OAuth consent screen configured
- [ ] Scopes added
- [ ] Test users added
- [ ] OAuth credentials created
- [ ] Redirect URIs correct (no typos!)
- [ ] Environment variables set in Vercel
- [ ] Project redeployed after env vars
- [ ] Sign in tested on production
- [ ] Logout works
- [ ] Can fetch Google data

---

## Important URLs

**Google Console:**
- Dashboard: https://console.cloud.google.com
- Credentials: https://console.cloud.google.com/apis/credentials
- OAuth Consent: https://console.cloud.google.com/apis/credentials/consent

**Production:**
- Home: https://reportr-one.vercel.app
- Dashboard: https://reportr-one.vercel.app/dashboard
- Settings: https://reportr-one.vercel.app/settings

---

## Required Scopes

| Scope | Purpose |
|-------|---------|
| `webmasters.readonly` | Read Search Console data |
| `analytics.readonly` | Read Google Analytics data |
| `openid` | User authentication |
| `email` | User email address |
| `profile` | User name and picture |

---

**Status:** ✅ Complete and working in production!  
**Last Tested:** October 11, 2025

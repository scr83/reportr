# 🔧 Google Cloud Console Configuration Guide

## Current Status
✅ **NEXTAUTH_URL correctly set**: `https://reportr-one.vercel.app`  
✅ **Callback URL correctly generated**: `https://reportr-one.vercel.app/api/auth/callback/google`  
❌ **OAuth still failing with `error=google`**

## Required Google Cloud Console Settings

### 1. OAuth 2.0 Client IDs Configuration

**Client ID**: `707894998872-b7l8lg2me8fj700j8ih4hbno9qm18llr.apps.googleusercontent.com`

**Authorized JavaScript origins**:
- `https://reportr-one.vercel.app`

**Authorized redirect URIs**:
- `https://reportr-one.vercel.app/api/auth/callback/google`

⚠️ **CRITICAL**: Make sure there are NO localhost entries remaining:
- ❌ Remove: `http://localhost:3000`
- ❌ Remove: `http://localhost:3000/api/auth/callback/google`

### 2. OAuth Consent Screen

**Required Settings**:
- **User Type**: External (unless using Google Workspace)
- **App Name**: Set (e.g., "Reportr")
- **User Support Email**: Set
- **Developer Contact Information**: Set
- **Publishing Status**: 
  - For testing: Can be "Testing" with test users added
  - For production: Should be "In production" OR have your email as a test user

### 3. Scopes Configuration

**Required Scopes**:
- `openid`
- `email` 
- `profile`
- `https://www.googleapis.com/auth/webmasters.readonly`
- `https://www.googleapis.com/auth/analytics.readonly`

### 4. Test Users (if app is in Testing mode)

If your OAuth consent screen is in "Testing" mode, you must add test users:
- Add your email address to the test users list
- OR publish the app to production

## Verification Steps

1. **Double-check Redirect URI**: 
   - Go to Google Cloud Console → APIs & Services → Credentials
   - Click on your OAuth 2.0 Client ID
   - Verify **ONLY** `https://reportr-one.vercel.app/api/auth/callback/google` is listed
   - Ensure NO localhost entries exist

2. **Check OAuth Consent Screen**:
   - Go to OAuth consent screen
   - If status is "Testing", either:
     - Add your email to test users, OR
     - Publish to production

3. **Verify Scopes**:
   - Ensure all required scopes are added
   - No missing or extra scopes

## Common Issues & Solutions

### Issue: "redirect_uri_mismatch"
**Cause**: Redirect URI in Google Cloud Console doesn't match the one being sent
**Solution**: Ensure exact match of `https://reportr-one.vercel.app/api/auth/callback/google`

### Issue: "access_denied" 
**Cause**: App is in testing mode and user is not in test users list
**Solution**: Add user to test users OR publish app

### Issue: "invalid_client"
**Cause**: Client ID or Client Secret is incorrect
**Solution**: Verify environment variables match Google Cloud Console

## Next Steps

1. **Verify Google Cloud Console settings** match the requirements above
2. **Wait 5-10 minutes** for Google changes to propagate  
3. **Test OAuth flow** again
4. If still failing, check **OAuth consent screen publishing status**

---

**The most likely issue**: OAuth consent screen is in "Testing" mode and your email is not added as a test user.
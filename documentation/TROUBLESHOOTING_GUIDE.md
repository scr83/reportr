# 🔧 TROUBLESHOOTING GUIDE - Authentication & Routing

**Quick Reference for Common Issues**

---

## 🚨 **EMERGENCY FIXES**

### **Issue: All routes show 404**
```bash
# Check if development server is running on correct port
npm run dev
# Should show: Local: http://localhost:3000
```

### **Issue: Infinite redirect loops**
1. Visit `/debug` to check auth state
2. Clear browser cookies for localhost:3000
3. Check if `NEXTAUTH_SECRET` is set in `.env`

### **Issue: Sign-in doesn't work**
1. Verify Google OAuth credentials in `.env`:
   ```
   GOOGLE_CLIENT_ID="your-actual-client-id"
   GOOGLE_CLIENT_SECRET="your-actual-client-secret"
   ```
2. Check Google Cloud Console OAuth settings
3. Test sign-in flow: `/` → `/signin` → Google OAuth → `/dashboard`

---

## 🎯 **QUICK TESTS**

### **Test Route Access** (in order):
1. ✅ `http://localhost:3000/` (marketing page)
2. ✅ `http://localhost:3000/debug` (debug info)
3. ✅ `http://localhost:3000/signin` (sign-in page)
4. ✅ `http://localhost:3000/dashboard` (should redirect if not authenticated)

### **Test Authentication Flow**:
1. Go to `/` (marketing page)
2. Click "Start Free Trial" → Should go to `/signin`
3. Click "Continue with Google" → Should redirect to Google
4. After Google auth → Should redirect to `/dashboard`
5. Try accessing `/dashboard/clients` → Should work

---

## 📊 **DEBUG INFORMATION**

### **Check Authentication Status**:
Visit `http://localhost:3000/debug` to see:
- Current authentication status
- Session data
- Environment info
- Route testing buttons

### **Console Debugging**:
Open browser console and look for:
```
🚀 Middleware - Path: /dashboard Has Token: true
🔄 Authenticated user accessing auth page, redirecting to dashboard
🚫 Unauthenticated user accessing dashboard, redirecting to signin
```

---

## ⚙️ **ENVIRONMENT SETUP**

### **Required Environment Variables**:
```bash
# Copy from .env.example and fill in real values
DATABASE_URL="postgresql://devuser:devpassword@localhost:5432/seo_reportbot"
NEXTAUTH_SECRET="super-secret-nextauth-key-change-in-production-12345"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-real-google-client-id"
GOOGLE_CLIENT_SECRET="your-real-google-client-secret"
```

### **Database Setup**:
```bash
# Start PostgreSQL database
docker run --name seo-reportbot-db \
  -e POSTGRES_USER=devuser \
  -e POSTGRES_PASSWORD=devpassword \
  -e POSTGRES_DB=seo_reportbot \
  -p 5432:5432 -d postgres

# Push database schema
npm run db:push
```

---

## 🔄 **RESET PROCEDURES**

### **Complete Reset (if everything is broken)**:
1. Stop development server (`Ctrl+C`)
2. Clear browser data for localhost:3000
3. Restart database container
4. Run database migrations: `npm run db:push`
5. Restart development server: `npm run dev`
6. Test basic routes starting with `/debug`

### **Authentication Reset**:
1. Go to `/debug` and click "Sign Out" if authenticated
2. Clear browser cookies
3. Test sign-in flow from scratch
4. If Google OAuth fails, check Google Cloud Console settings

---

## 📞 **GETTING HELP**

### **Before Asking for Help, Provide**:
1. Screenshot of `/debug` page
2. Browser console logs
3. Current route you're trying to access
4. Authentication status (signed in or not)
5. What you expected vs what happened

### **Common Solutions**:
- **404 errors**: Check file exists and has proper export
- **Redirect loops**: Clear cookies and check NEXTAUTH_SECRET
- **Sign-in fails**: Verify Google OAuth credentials
- **Permission denied**: Check if route requires authentication

---

## ✅ **HEALTH CHECK**

**All systems working if:**
- [x] `/` loads marketing page
- [x] `/debug` shows auth status
- [x] `/signin` loads sign-in form
- [x] After sign-in, `/dashboard` loads with sidebar
- [x] Clicking sidebar links navigates properly
- [x] Sign out works and redirects to home

**If any of these fail, use the troubleshooting steps above.**
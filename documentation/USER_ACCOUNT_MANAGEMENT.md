# User Account Management - Implementation Guide

**Created:** October 11, 2025  
**Status:** To Be Implemented  
**Priority:** HIGH - Users need logout functionality!

---

## Overview

Currently, users can sign in but have NO way to:
- View their account information
- Manage their profile
- Log out of the application
- Delete their account

This is a **critical missing feature** that must be implemented immediately.

---

## Required Features

### 1. Settings/Account Page
**Route:** `/settings` or `/account`

**Must include:**
- View profile information (name, email, picture)
- Display connected Google account
- Log out button (MOST IMPORTANT)
- Account deletion option

### 2. User Menu in Dashboard
**Location:** Dashboard header/navigation

**Must include:**
- User avatar/name display
- Dropdown menu with:
  - Settings link
  - Log out button

### 3. Logout Functionality
**Implementation:** Use NextAuth `signOut()` function
**Redirect:** Back to home page after logout

---

## Implementation Plan

### Phase 1: Settings Page (Priority 1)

**File:** `src/app/settings/page.tsx`

**Sections:**
1. **Profile Information Card**
   - Display name
   - Display email
   - Display profile picture
   - Show account creation date

2. **Connected Accounts Card**
   - Show Google connection status
   - Display email connected
   - Show connected date
   - Option to disconnect (future)

3. **Account Actions Card**
   - Log Out button (primary action)
   - Delete Account button (destructive action)

### Phase 2: User Menu Component (Priority 1)

**File:** `src/components/organisms/UserMenu.tsx`

**Features:**
- Display user avatar
- Display user name
- Dropdown on click
- Quick actions:
  - Go to Settings
  - Log Out

### Phase 3: Navigation Updates (Priority 2)

**Files to update:**
- `src/components/templates/DashboardLayout.tsx`
- Add Settings link to sidebar
- Add UserMenu to header

---

## Technical Implementation

### Settings Page Structure

```typescript
// src/app/settings/page.tsx
'use client'

import { useSession, signOut } from 'next-auth/react'

export default function SettingsPage() {
  const { data: session } = useSession()

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <DashboardLayout>
      {/* Profile Section */}
      <Card>
        <h2>Profile Information</h2>
        <p>Name: {session?.user?.name}</p>
        <p>Email: {session?.user?.email}</p>
      </Card>

      {/* Connected Accounts */}
      <Card>
        <h2>Connected Accounts</h2>
        <div>Google: {session?.user?.email}</div>
      </Card>

      {/* Actions */}
      <Card>
        <Button onClick={handleLogout}>
          Log Out
        </Button>
      </Card>
    </DashboardLayout>
  )
}
```

### User Menu Structure

```typescript
// src/components/organisms/UserMenu.tsx
'use client'

import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

export function UserMenu() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        <img src={session?.user?.image} />
        {session?.user?.name}
      </button>

      {isOpen && (
        <div className="dropdown">
          <a href="/settings">Settings</a>
          <button onClick={() => signOut()}>
            Log Out
          </button>
        </div>
      )}
    </div>
  )
}
```

---

## User Interface Design

### Settings Page Layout

```
┌─────────────────────────────────────┐
│ Account Settings                     │
│ Manage your account and preferences  │
├─────────────────────────────────────┤
│                                      │
│ ┌─────────────────────────────────┐│
│ │ Profile Information             ││
│ │                                 ││
│ │ 👤 Name: John Doe              ││
│ │ ✉️  Email: john@example.com    ││
│ │ 🏢 Company: Digital Agency     ││
│ └─────────────────────────────────┘│
│                                      │
│ ┌─────────────────────────────────┐│
│ │ Connected Accounts              ││
│ │                                 ││
│ │ [G] Google                      ││
│ │     Connected as john@email.com ││
│ │     ✓ Connected                 ││
│ └─────────────────────────────────┘│
│                                      │
│ ┌─────────────────────────────────┐│
│ │ Account Actions                 ││
│ │                                 ││
│ │ [     Log Out      ]  ← PRIMARY ││
│ │ [  Delete Account  ]  ← DANGER  ││
│ └─────────────────────────────────┘│
│                                      │
└─────────────────────────────────────┘
```

### User Menu Dropdown

```
┌──────────────────────┐
│ Dashboard  [👤 John ▼]│ ← Click to open
└──────────────────────┘
           │
           ▼
    ┌──────────────┐
    │ John Doe     │
    │ john@ex.com  │
    ├──────────────┤
    │ ⚙️ Settings  │
    │ 🚪 Log Out   │
    └──────────────┘
```

---

## Routing Structure

**New routes to add:**
```
/settings          → Account settings page
/settings/profile  → Edit profile (future)
/settings/billing  → Billing settings (future)
```

**Update navigation:**
```
Dashboard
├─ Dashboard (/)
├─ Clients (/clients)
├─ Reports (/reports)
└─ Settings (/settings) ← NEW
```

---

## API Endpoints

### User Profile
```
GET /api/user/profile
→ Returns current user info
```

### Update Profile
```
PUT /api/user/profile
Body: { name, companyName }
→ Updates user profile
```

### Delete Account
```
DELETE /api/user/account
→ Deletes user and all data
```

---

## Security Considerations

1. **Logout:**
   - Clear all sessions
   - Clear cookies
   - Redirect to public page
   - Revoke OAuth tokens (optional)

2. **Account Deletion:**
   - Require confirmation
   - Delete all user data
   - Delete all clients
   - Delete all reports
   - Cannot be undone

3. **Session Management:**
   - Use NextAuth session
   - Protect settings route
   - Check authentication on page load

---

## Testing Checklist

After implementation, verify:

**Settings Page:**
- [ ] Accessible at `/settings`
- [ ] Shows user name
- [ ] Shows user email
- [ ] Shows profile picture
- [ ] Shows connected Google account
- [ ] Log out button visible
- [ ] Delete account button visible

**Logout Functionality:**
- [ ] Log out button works
- [ ] Redirects to home page
- [ ] Session cleared
- [ ] Can't access dashboard after logout
- [ ] Must sign in again

**User Menu:**
- [ ] Shows in dashboard header
- [ ] Displays user avatar
- [ ] Displays user name
- [ ] Dropdown opens on click
- [ ] Settings link works
- [ ] Log out button works
- [ ] Closes on outside click

**Navigation:**
- [ ] Settings link in sidebar
- [ ] Settings page accessible from dashboard
- [ ] Can navigate back to dashboard from settings

**Responsive:**
- [ ] Works on mobile
- [ ] Works on tablet
- [ ] Works on desktop
- [ ] User menu fits on small screens

---

## Current Status

**Implemented:**
- ❌ Settings page (MISSING)
- ❌ User menu component (MISSING)
- ❌ Logout functionality (MISSING)
- ❌ Settings navigation link (MISSING)

**Priority:** 🔴 CRITICAL - Must be implemented ASAP

**Blocker:** Users cannot log out of the application!

---

## Implementation Steps

1. **Create Settings Page**
   - File: `src/app/settings/page.tsx`
   - Show profile info
   - Add logout button
   - Use NextAuth `signOut()`

2. **Create User Menu**
   - File: `src/components/organisms/UserMenu.tsx`
   - Dropdown with user info
   - Settings and logout options

3. **Update Dashboard Layout**
   - Add UserMenu to header
   - Add Settings link to sidebar

4. **Test Everything**
   - Verify logout works
   - Test all navigation
   - Check mobile view

5. **Deploy**
   - Commit changes
   - Push to production
   - Test on live site

---

## Deployment Message

```bash
git add .
git commit -m "feat: add user account management and logout

- Create /settings page for account management
- Add user profile information display
- Implement logout functionality using NextAuth
- Create UserMenu dropdown component
- Add Settings link to dashboard navigation
- Display connected Google account info
- Add account deletion option (placeholder)

Critical feature: Users can now log out properly!
Fixes missing account management functionality.

Phase 7F: User Account Management - COMPLETE ✅"

git push origin main
```

---

## Future Enhancements

**Phase 2 Features:**
- [ ] Edit profile information
- [ ] Change password (if using credentials)
- [ ] Upload profile picture
- [ ] Email preferences
- [ ] Notification settings

**Phase 3 Features:**
- [ ] Two-factor authentication
- [ ] Session management (view all sessions)
- [ ] Login history
- [ ] Connected devices
- [ ] API keys management

---

**Status:** 📝 Documented, ready for implementation  
**Next Action:** Assign to Frontend Agent  
**Estimated Time:** 2-3 hours  
**Priority:** 🔴 CRITICAL

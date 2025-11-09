# Multi-User / Team Members Feature - Implementation Plan

**Status:** 🔴 Not Started - Waiting for Customer Demand  
**Complexity:** Medium-High (3-4 weeks MVP, 6-8 weeks full feature)  
**Priority:** Low (Build after 50+ paying customers request it)  
**Last Updated:** November 9, 2025

---

## Executive Summary

Multi-user functionality would allow multiple team members to collaborate within a single Reportr account, sharing access to clients and reports. This document outlines the current architecture, required changes, and implementation roadmap for when we're ready to build this feature.

**Key Decision:** Wait for proven customer demand before implementing. Current single-user architecture works well for solo agencies and freelancers (our primary market).

---

## Table of Contents

1. [Current Architecture](#current-architecture)
2. [Desired End State](#desired-end-state)
3. [What We Have](#what-we-have)
4. [What We Need](#what-we-need)
5. [Implementation Roadmap](#implementation-roadmap)
6. [Database Schema Changes](#database-schema-changes)
7. [Migration Strategy](#migration-strategy)
8. [Security & Permissions](#security--permissions)
9. [UI/UX Changes](#uiux-changes)
10. [Testing Strategy](#testing-strategy)
11. [Risks & Mitigation](#risks--mitigation)

---

## Current Architecture

### Data Ownership Model
**Single User Owns Everything:**
- Each User has their own plan, billing, clients, and reports
- Direct `userId` foreign keys on Client and Report models
- No concept of organizations or shared access
- One user = one account = one billing entity

### Current Database Schema (Simplified)
```prisma
model User {
  id                   String    @id @default(cuid())
  email                String    @unique
  name                 String?
  plan                 String    @default("FREE")
  paypalSubscriptionId String?
  subscriptionStatus   String?
  
  clients              Client[]
  reports              Report[]
}

model Client {
  id        String   @id @default(cuid())
  userId    String   // ← Owner
  user      User     @relation(fields: [userId], references: [id])
  name      String
  domain    String
  reports   Report[]
}

model Report {
  id        String   @id @default(cuid())
  userId    String   // ← Owner
  clientId  String
  user      User     @relation(fields: [userId], references: [id])
  client    Client   @relation(fields: [clientId], references: [id])
  pdfUrl    String?
  data      Json?
}
```

### Authentication Flow
- NextAuth with Google OAuth only
- JWT-based sessions
- User data stored in session via callbacks
- No multi-tenancy concept

### Plan Limits Enforcement
- Defined in `/src/lib/plan-limits.ts`
- Enforced at user level:
  - FREE: 1 client, 5 reports/month
  - STARTER: 5 clients, 25 reports/month
  - PROFESSIONAL: 15 clients, 75 reports/month
  - AGENCY: 50 clients, 250 reports/month

---

## Desired End State

### Target Multi-User Model
**Organization-Based Ownership:**
- Multiple users can belong to one organization
- Organization owns the plan, billing, clients, and reports
- Users are members with different roles (Owner, Admin, Member)
- Seat limits per plan tier:
  - FREE: 1 seat
  - STARTER: 2 seats
  - PROFESSIONAL: 3 seats
  - AGENCY: 5 seats

### Key Features
1. **Team Member Management**
   - Invite users by email
   - Accept/decline invitations
   - Remove team members
   - See active members list

2. **Role-Based Access Control**
   - **Owner:** Full access (billing, team management, all features)
   - **Admin:** Manage clients/reports, invite members (no billing access)
   - **Member:** View-only access to clients/reports, can generate reports

3. **Seat Limit Enforcement**
   - Count active members per organization
   - Block invites when at seat limit
   - Prompt to upgrade when limit reached

4. **Shared Workspace**
   - All team members see same clients
   - All team members see same reports
   - Activity log showing who did what

---

## What We Have

### ✅ Ready to Use
1. **Email System**
   - Resend configured and working
   - Email sending utility in `/src/lib/email.ts`
   - Ready for invitation emails

2. **Plan Limits System**
   - Structured limits configuration
   - Enforcement pattern established
   - Easy to extend with seat limits

3. **Authentication Foundation**
   - Solid NextAuth setup
   - Session management working
   - JWT callbacks for custom data

4. **UI Components**
   - Atomic design system in place
   - Settings page structure ready
   - Button, Modal, Form components available

5. **Database Infrastructure**
   - Prisma ORM with migrations
   - PostgreSQL on Supabase
   - Index optimization patterns established

### ⚠️ Needs Extension
1. **Database Schema**
   - Need Organization model
   - Need OrganizationMember model
   - Need Invitation model

2. **Data Ownership**
   - Need to migrate from User → Organization
   - Need organizationId on all resource models

3. **Permissions System**
   - Need role checking middleware
   - Need permission enforcement in API routes

---

## What We Need

### 1. Database Schema Changes

#### New Models Required

```prisma
// Core organization model
model Organization {
  id            String   @id @default(cuid())
  name          String
  slug          String   @unique  // For custom domains later
  ownerId       String   @unique
  owner         User     @relation("OrganizationOwner", fields: [ownerId], references: [id])
  
  // Billing (moved from User)
  plan                    String   @default("FREE")
  paypalSubscriptionId    String?
  subscriptionStatus      String?
  cancelledAt             DateTime?
  subscriptionEndDate     DateTime?
  
  // White-label (moved from User)
  whiteLabelEnabled       Boolean  @default(false)
  companyName             String?
  logo                    String?
  primaryColor            String   @default("#7e23ce")
  website                 String?
  
  members       OrganizationMember[]
  invitations   Invitation[]
  clients       Client[]
  reports       Report[]
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@index([ownerId])
}

// Member relationship
model OrganizationMember {
  id             String       @id @default(cuid())
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  userId         String
  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  role           String       @default("member") // owner, admin, member
  invitedBy      String?      // Who sent the invite
  joinedAt       DateTime     @default(now())
  
  @@unique([organizationId, userId])
  @@index([userId])
  @@index([organizationId])
}

// Invitation system
model Invitation {
  id             String       @id @default(cuid())
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  
  email          String
  role           String       @default("member")
  token          String       @unique
  invitedBy      String       // User ID who sent invite
  
  expiresAt      DateTime     // 7 days from creation
  acceptedAt     DateTime?
  
  createdAt      DateTime     @default(now())
  
  @@index([organizationId])
  @@index([email])
  @@index([token])
}

// Update User model
model User {
  id              String    @id @default(cuid())
  email           String    @unique
  name            String?
  image           String?
  
  // Remove: plan, billing fields (now in Organization)
  
  ownedOrganization     Organization? @relation("OrganizationOwner")
  organizationMemberships OrganizationMember[]
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([email])
}

// Update Client model
model Client {
  id              String       @id @default(cuid())
  organizationId  String       // Changed from userId
  organization    Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  
  // ... rest of fields unchanged
  
  @@index([organizationId])
}

// Update Report model
model Report {
  id             String       @id @default(cuid())
  organizationId String       // Changed from userId
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  clientId       String
  client         Client       @relation(fields: [clientId], references: [id])
  
  createdBy      String?      // Track which user generated it
  
  // ... rest of fields unchanged
  
  @@index([organizationId])
  @@index([clientId])
  @@index([createdBy])
}
```

### 2. API Routes Needed

#### Team Management APIs
```
POST   /api/organization/invite              # Invite team member
GET    /api/organization/members              # List team members
DELETE /api/organization/members/:id          # Remove team member
PUT    /api/organization/members/:id/role     # Change member role

GET    /api/invitations/accept/:token         # Accept invite link
POST   /api/invitations/:id/resend            # Resend invitation
DELETE /api/invitations/:id                   # Cancel invitation
```

#### Permission Middleware
```typescript
// /src/middleware/permissions.ts
export function requireRole(minRole: 'owner' | 'admin' | 'member') {
  return async (req: NextRequest) => {
    const session = await getServerSession();
    const orgMember = await getOrganizationMember(
      session.user.id,
      req.organizationId
    );
    
    if (!hasPermission(orgMember.role, minRole)) {
      return new Response('Forbidden', { status: 403 });
    }
  };
}
```

### 3. UI Components Needed

#### Settings Page - Team Section
```tsx
// /src/components/settings/TeamMembersSection.tsx
- Current members list with roles
- Remove member button (owner/admin only)
- Invite form (when under seat limit)
- Pending invitations list
- Upgrade prompt when at limit
```

#### Organization Switcher (Future)
```tsx
// /src/components/organisms/OrganizationSwitcher.tsx
- Dropdown in header
- List of organizations user belongs to
- Switch between organizations
- Create new organization option
```

#### Email Templates
```
- Invitation email with accept link
- Member joined notification
- Member removed notification
- Role changed notification
```

### 4. Migration Scripts

#### Data Migration Strategy
```typescript
// Migration: CreateOrganizationsFromUsers
// 1. For each existing User:
//    - Create Organization
//    - Set user as owner
//    - Transfer billing fields
//    - Transfer white-label settings
// 2. Update all Client records with organizationId
// 3. Update all Report records with organizationId
// 4. Create OrganizationMember record (user is owner)
```

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
**Goal:** Database schema and core infrastructure

- [ ] Design final database schema
- [ ] Create Prisma migration for new models
- [ ] Write data migration script for existing users
- [ ] Test migration on staging database
- [ ] Update TypeScript types for new models
- [ ] Create permission checking utilities
- [ ] Update session to include organizationId

**Deliverables:**
- Database schema migrated
- All existing users in organizations
- Permission system foundation ready

---

### Phase 2: Core APIs (Week 2-3)
**Goal:** Team management backend functionality

- [ ] Build invitation system
  - [ ] POST /api/organization/invite
  - [ ] Email sending with Resend
  - [ ] Invitation token generation
  - [ ] GET /api/invitations/accept/:token
  
- [ ] Build member management
  - [ ] GET /api/organization/members
  - [ ] DELETE /api/organization/members/:id
  - [ ] PUT /api/organization/members/:id/role
  
- [ ] Update existing API routes
  - [ ] Add organizationId to all queries
  - [ ] Add permission checks to protected routes
  - [ ] Update client creation/fetching
  - [ ] Update report generation/fetching

- [ ] Implement seat limit enforcement
  - [ ] Check seat count before invites
  - [ ] Update plan limits configuration
  - [ ] Block invites when at limit

**Deliverables:**
- Full invitation system working
- All API routes organization-scoped
- Permission enforcement active

---

### Phase 3: UI Implementation (Week 3-4)
**Goal:** User-facing team management interface

- [ ] Build Team Members section in Settings
  - [ ] Member list with role badges
  - [ ] Invite form component
  - [ ] Remove member confirmation modal
  - [ ] Role change dropdown
  - [ ] Pending invitations display
  
- [ ] Update dashboard for shared context
  - [ ] Show organization name
  - [ ] Update "My Clients" → "Our Clients"
  - [ ] Add activity feed (who did what)
  
- [ ] Create email templates
  - [ ] Invitation email (branded)
  - [ ] Welcome to team email
  - [ ] Member removed notification

**Deliverables:**
- Complete team management UI
- Email templates designed and tested
- Dashboard reflects shared workspace

---

### Phase 4: Testing & Polish (Week 4)
**Goal:** Production-ready quality

- [ ] End-to-end testing
  - [ ] Invite flow (email → accept → dashboard)
  - [ ] Permission enforcement (all roles)
  - [ ] Seat limit blocking
  - [ ] Remove member flow
  
- [ ] Edge case handling
  - [ ] What if owner leaves?
  - [ ] What if last admin removed?
  - [ ] Expired invitations cleanup
  - [ ] Duplicate invite prevention
  
- [ ] Performance testing
  - [ ] Query optimization with organizationId
  - [ ] Index verification
  - [ ] N+1 query prevention
  
- [ ] Documentation
  - [ ] API documentation
  - [ ] User guide (how to invite)
  - [ ] Admin guide (roles explained)

**Deliverables:**
- Thoroughly tested feature
- All edge cases handled
- Documentation complete

---

## Database Schema Changes

### Complete Migration SQL

```sql
-- Step 1: Create new tables
CREATE TABLE "Organization" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slug" TEXT UNIQUE NOT NULL,
  "ownerId" TEXT UNIQUE NOT NULL,
  "plan" TEXT DEFAULT 'FREE',
  "paypalSubscriptionId" TEXT,
  "subscriptionStatus" TEXT,
  "cancelledAt" TIMESTAMP,
  "subscriptionEndDate" TIMESTAMP,
  "whiteLabelEnabled" BOOLEAN DEFAULT false,
  "companyName" TEXT,
  "logo" TEXT,
  "primaryColor" TEXT DEFAULT '#7e23ce',
  "website" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("ownerId") REFERENCES "User"("id")
);

CREATE TABLE "OrganizationMember" (
  "id" TEXT PRIMARY KEY,
  "organizationId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "role" TEXT DEFAULT 'member',
  "invitedBy" TEXT,
  "joinedAt" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE,
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
  UNIQUE("organizationId", "userId")
);

CREATE TABLE "Invitation" (
  "id" TEXT PRIMARY KEY,
  "organizationId" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "role" TEXT DEFAULT 'member',
  "token" TEXT UNIQUE NOT NULL,
  "invitedBy" TEXT NOT NULL,
  "expiresAt" TIMESTAMP NOT NULL,
  "acceptedAt" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE
);

-- Step 2: Add organizationId to existing tables
ALTER TABLE "Client" ADD COLUMN "organizationId" TEXT;
ALTER TABLE "Report" ADD COLUMN "organizationId" TEXT;
ALTER TABLE "Report" ADD COLUMN "createdBy" TEXT;

-- Step 3: Create indexes
CREATE INDEX "Organization_ownerId_idx" ON "Organization"("ownerId");
CREATE INDEX "OrganizationMember_userId_idx" ON "OrganizationMember"("userId");
CREATE INDEX "OrganizationMember_organizationId_idx" ON "OrganizationMember"("organizationId");
CREATE INDEX "Invitation_organizationId_idx" ON "Invitation"("organizationId");
CREATE INDEX "Invitation_email_idx" ON "Invitation"("email");
CREATE INDEX "Invitation_token_idx" ON "Invitation"("token");
CREATE INDEX "Client_organizationId_idx" ON "Client"("organizationId");
CREATE INDEX "Report_organizationId_idx" ON "Report"("organizationId");
CREATE INDEX "Report_createdBy_idx" ON "Report"("createdBy");

-- Step 4: Data migration (done via script, not raw SQL)
-- See migration script in /prisma/migrations/migrate-to-organizations.ts
```

---

## Migration Strategy

### Approach: Zero-Downtime Migration

**Why Zero-Downtime:**
- Can't afford to take site offline
- Paying customers must have uninterrupted access
- Migration might take hours for large datasets

**Migration Steps:**

#### 1. Pre-Migration Preparation
```bash
# Backup production database
pg_dump $DATABASE_URL > backup_before_multiuser_$(date +%Y%m%d).sql

# Test migration on staging
# Run full migration script
# Verify all data transferred correctly
# Test all API routes
# Test all UI flows
```

#### 2. Migration Execution
```typescript
// /prisma/migrations/migrate-to-organizations.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrateUsersToOrganizations() {
  console.log('Starting migration: Users → Organizations...');
  
  const users = await prisma.user.findMany({
    include: {
      clients: true,
      reports: true
    }
  });
  
  for (const user of users) {
    console.log(`Migrating user ${user.email}...`);
    
    // Create organization for this user
    const org = await prisma.organization.create({
      data: {
        name: user.name || user.email,
        slug: generateSlug(user.email),
        ownerId: user.id,
        plan: user.plan,
        paypalSubscriptionId: user.paypalSubscriptionId,
        subscriptionStatus: user.subscriptionStatus,
        cancelledAt: user.cancelledAt,
        subscriptionEndDate: user.subscriptionEndDate,
        whiteLabelEnabled: user.whiteLabelEnabled,
        companyName: user.companyName,
        logo: user.logo,
        primaryColor: user.primaryColor,
        website: user.website
      }
    });
    
    // Create organization member record (user as owner)
    await prisma.organizationMember.create({
      data: {
        organizationId: org.id,
        userId: user.id,
        role: 'owner',
        joinedAt: user.createdAt
      }
    });
    
    // Update all clients
    if (user.clients.length > 0) {
      await prisma.client.updateMany({
        where: { userId: user.id },
        data: { organizationId: org.id }
      });
    }
    
    // Update all reports
    if (user.reports.length > 0) {
      await prisma.report.updateMany({
        where: { userId: user.id },
        data: { 
          organizationId: org.id,
          createdBy: user.id
        }
      });
    }
    
    console.log(`✓ Migrated user ${user.email} → org ${org.id}`);
  }
  
  console.log('Migration complete!');
}

// Run migration
migrateUsersToOrganizations()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

#### 3. Post-Migration Validation
```typescript
// Verify migration success
async function validateMigration() {
  // Check: Every user has an organization
  const usersWithoutOrg = await prisma.user.findMany({
    where: {
      ownedOrganization: null
    }
  });
  
  if (usersWithoutOrg.length > 0) {
    throw new Error(`${usersWithoutOrg.length} users without organizations!`);
  }
  
  // Check: Every client has organizationId
  const clientsWithoutOrg = await prisma.client.findMany({
    where: { organizationId: null }
  });
  
  if (clientsWithoutOrg.length > 0) {
    throw new Error(`${clientsWithoutOrg.length} clients without organizationId!`);
  }
  
  // Check: Every report has organizationId
  const reportsWithoutOrg = await prisma.report.findMany({
    where: { organizationId: null }
  });
  
  if (reportsWithoutOrg.length > 0) {
    throw new Error(`${reportsWithoutOrg.length} reports without organizationId!`);
  }
  
  console.log('✓ Migration validation passed!');
}
```

#### 4. Rollback Plan
```typescript
// If migration fails, rollback procedure
async function rollbackMigration() {
  // Delete all organizations
  await prisma.organization.deleteMany({});
  
  // Delete all organization members
  await prisma.organizationMember.deleteMany({});
  
  // Delete all invitations
  await prisma.invitation.deleteMany({});
  
  // Clear organizationId from clients
  await prisma.client.updateMany({
    data: { organizationId: null }
  });
  
  // Clear organizationId from reports
  await prisma.report.updateMany({
    data: { organizationId: null, createdBy: null }
  });
  
  // Restore from backup
  // pg_restore backup_before_multiuser_YYYYMMDD.sql
  
  console.log('Rollback complete - restored to pre-migration state');
}
```

---

## Security & Permissions

### Role-Based Access Control (RBAC)

#### Role Hierarchy
```typescript
const ROLE_PERMISSIONS = {
  owner: {
    canManageBilling: true,
    canInviteMembers: true,
    canRemoveMembers: true,
    canChangeRoles: true,
    canManageClients: true,
    canGenerateReports: true,
    canViewReports: true,
    canDeleteOrganization: true
  },
  admin: {
    canManageBilling: false,
    canInviteMembers: true,
    canRemoveMembers: true,
    canChangeRoles: false,
    canManageClients: true,
    canGenerateReports: true,
    canViewReports: true,
    canDeleteOrganization: false
  },
  member: {
    canManageBilling: false,
    canInviteMembers: false,
    canRemoveMembers: false,
    canChangeRoles: false,
    canManageClients: false,
    canGenerateReports: true,
    canViewReports: true,
    canDeleteOrganization: false
  }
};
```

#### Permission Checking Middleware
```typescript
// /src/middleware/permissions.ts

export async function requireOrganizationAccess(
  userId: string,
  organizationId: string
): Promise<OrganizationMember> {
  const member = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId
      }
    }
  });
  
  if (!member) {
    throw new Error('Not a member of this organization');
  }
  
  return member;
}

export function requirePermission(
  member: OrganizationMember,
  permission: keyof typeof ROLE_PERMISSIONS.owner
): void {
  const rolePerms = ROLE_PERMISSIONS[member.role as keyof typeof ROLE_PERMISSIONS];
  
  if (!rolePerms || !rolePerms[permission]) {
    throw new Error(`Insufficient permissions: ${permission}`);
  }
}

// Usage in API routes
export async function DELETE(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  const session = await getServerSession();
  const member = await requireOrganizationAccess(
    session.user.id,
    client.organizationId
  );
  
  requirePermission(member, 'canManageClients');
  
  // Proceed with deletion...
}
```

### Security Checklist

- [ ] All API routes check organization membership
- [ ] All database queries scoped to organizationId
- [ ] Invitation tokens are cryptographically secure
- [ ] Invitation tokens expire after 7 days
- [ ] Email verification before joining
- [ ] Rate limiting on invite sending (prevent spam)
- [ ] Audit log for sensitive actions (role changes, member removal)
- [ ] Two-factor authentication for owner role (future)

---

## UI/UX Changes

### Settings Page - New Team Section

```tsx
// /src/app/settings/page.tsx

<SettingsLayout>
  {/* Existing sections */}
  <ProfileInformation />
  <WhiteLabelBranding />
  <BillingSubscription />
  
  {/* NEW: Team Members Section */}
  <TeamMembersSection
    organization={organization}
    currentMember={currentMember}
    members={members}
    pendingInvitations={invitations}
  />
  
  {/* Existing sections */}
  <ConnectedAccounts />
  <AccountActions />
</SettingsLayout>
```

### Team Members Section Component

```tsx
// /src/components/settings/TeamMembersSection.tsx

export function TeamMembersSection({ 
  organization, 
  currentMember, 
  members,
  pendingInvitations 
}: Props) {
  const planLimits = PLAN_LIMITS[organization.plan];
  const seatCount = members.length;
  const seatsAvailable = planLimits.seats - seatCount;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          {seatCount} of {planLimits.seats} seats used
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {/* Active Members List */}
        <div className="space-y-4">
          {members.map(member => (
            <MemberCard
              key={member.id}
              member={member}
              currentMember={currentMember}
              onRemove={handleRemove}
              onChangeRole={handleChangeRole}
            />
          ))}
        </div>
        
        {/* Pending Invitations */}
        {pendingInvitations.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">Pending Invitations</h3>
            {pendingInvitations.map(invite => (
              <InvitationCard
                key={invite.id}
                invitation={invite}
                onResend={handleResend}
                onCancel={handleCancel}
              />
            ))}
          </div>
        )}
        
        {/* Invite Form */}
        {seatsAvailable > 0 && hasPermission(currentMember, 'canInviteMembers') ? (
          <InviteMemberForm onInvite={handleInvite} />
        ) : (
          <UpgradePrompt>
            Need more team members? Upgrade your plan to add more seats.
          </UpgradePrompt>
        )}
      </CardContent>
    </Card>
  );
}
```

### Invitation Email Template

```html
<!-- Email: Team Invitation -->
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Email-safe styles */
  </style>
</head>
<body>
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <img src="{{organization.logo}}" alt="{{organization.name}}" />
    
    <h1>You've been invited to join {{organization.name}}</h1>
    
    <p>{{inviterName}} has invited you to collaborate on Reportr as a {{role}}.</p>
    
    <p>With this invitation, you'll be able to:</p>
    <ul>
      {{#if isOwner}}
        <li>Manage billing and subscription</li>
      {{/if}}
      {{#if canManageClients}}
        <li>Add and manage clients</li>
      {{/if}}
      <li>Generate SEO reports</li>
      <li>View all reports</li>
    </ul>
    
    <a href="{{acceptUrl}}" style="display: inline-block; padding: 12px 24px; background: #7e23ce; color: white; text-decoration: none; border-radius: 6px;">
      Accept Invitation
    </a>
    
    <p style="color: #666; font-size: 14px;">
      This invitation will expire in 7 days.
    </p>
    
    <p style="color: #666; font-size: 12px;">
      If you didn't expect this invitation, you can safely ignore this email.
    </p>
  </div>
</body>
</html>
```

---

## Testing Strategy

### Unit Tests
```typescript
// /tests/unit/permissions.test.ts
describe('Permission System', () => {
  test('Owner can remove members', () => {
    const owner = createMember({ role: 'owner' });
    expect(hasPermission(owner, 'canRemoveMembers')).toBe(true);
  });
  
  test('Member cannot change roles', () => {
    const member = createMember({ role: 'member' });
    expect(hasPermission(member, 'canChangeRoles')).toBe(false);
  });
});

// /tests/unit/seat-limits.test.ts
describe('Seat Limit Enforcement', () => {
  test('Block invite when at limit', async () => {
    const org = await createOrganization({ plan: 'STARTER' }); // 2 seats
    await createMembers(org.id, 2); // Fill seats
    
    await expect(
      inviteMember(org.id, 'new@example.com')
    ).rejects.toThrow('Seat limit reached');
  });
});
```

### Integration Tests
```typescript
// /tests/integration/invite-flow.test.ts
describe('Invitation Flow', () => {
  test('Complete invite flow: send → accept → join', async () => {
    // Send invite
    const { invitation } = await POST('/api/organization/invite', {
      email: 'newuser@example.com',
      role: 'member'
    });
    
    // Check email sent
    expect(mockEmailService).toHaveBeenCalledWith({
      to: 'newuser@example.com',
      subject: expect.stringContaining('invited')
    });
    
    // Accept invite
    const response = await GET(`/api/invitations/accept/${invitation.token}`);
    expect(response.status).toBe(200);
    
    // Verify member added
    const members = await GET('/api/organization/members');
    expect(members).toContainEqual(
      expect.objectContaining({ email: 'newuser@example.com' })
    );
  });
});
```

### E2E Tests (Playwright)
```typescript
// /tests/e2e/team-management.spec.ts
test('Owner can invite and remove team members', async ({ page }) => {
  await page.goto('/settings');
  
  // Invite member
  await page.fill('[name="email"]', 'teammate@example.com');
  await page.selectOption('[name="role"]', 'member');
  await page.click('button:has-text("Send Invitation")');
  
  // Verify pending invitation appears
  await expect(page.locator('.pending-invitation')).toContainText('teammate@example.com');
  
  // Simulate acceptance (in real test, check email and click link)
  // ...
  
  // Remove member
  await page.click('[data-member-email="teammate@example.com"] button:has-text("Remove")');
  await page.click('button:has-text("Confirm")');
  
  // Verify member removed
  await expect(page.locator('[data-member-email="teammate@example.com"]')).not.toBeVisible();
});
```

---

## Risks & Mitigation

### Risk 1: Data Migration Failure
**Probability:** Medium  
**Impact:** Critical  
**Mitigation:**
- Full database backup before migration
- Test migration on staging environment multiple times
- Rollback script ready and tested
- Validation checks after migration
- Monitor error logs closely during migration

### Risk 2: Performance Degradation
**Probability:** Low  
**Impact:** Medium  
**Mitigation:**
- Add proper indexes on organizationId fields
- Optimize queries during development
- Load test with realistic data volumes
- Monitor query performance in production
- Database query profiling before launch

### Risk 3: Permission Bypass Bugs
**Probability:** Medium  
**Impact:** Critical  
**Mitigation:**
- Comprehensive permission testing
- Security audit of all API routes
- Automated tests for all permission scenarios
- Penetration testing before launch
- Bug bounty program post-launch

### Risk 4: User Confusion
**Probability:** Medium  
**Impact:** Low  
**Mitigation:**
- Clear UI labels and help text
- In-app tutorial for team features
- Email notifications for all team events
- Comprehensive help documentation
- Customer support training

### Risk 5: Invite Email Deliverability
**Probability:** Low  
**Impact:** Medium  
**Mitigation:**
- Use reputable email service (Resend)
- SPF/DKIM/DMARC configuration
- Monitor email bounce rates
- Fallback: manual invite link copy/paste
- Alternative: SMS invitation option

---

## Decision Criteria: When to Build This

### Green Lights (Build Now)
- ✅ 50+ paying customers consistently asking for team features
- ✅ Multiple large agencies (10+ employees) as customers
- ✅ Competitive pressure (competitors all have team features)
- ✅ Clear ROI: Team features enable higher-tier plans
- ✅ Engineering bandwidth available (3-4 weeks dedicated)

### Red Lights (Wait)
- ❌ < 20 paying customers (focus on core product)
- ❌ No customer requests for team features
- ❌ Other critical features needed more urgently
- ❌ Technical debt needs addressing first
- ❌ Limited engineering resources

### Current Status: 🔴 Wait
- We have ~0-5 paying customers
- Focus needed on core product stability
- SEO and customer acquisition more important
- Can revisit decision at 50+ customers

---

## Alternative: Simple "Shared Account" Approach

### Simpler Interim Solution
Instead of full multi-user with invites and permissions:

**Option: Shared Login Credentials**
- Owner creates account and pays
- Owner shares login with team members
- Everyone logs in as same user
- No role management needed
- No seat limits needed
- No complex permissions

**Pros:**
- Zero development time
- Works immediately
- Simple to understand
- No new database models

**Cons:**
- Less secure (shared password)
- No audit trail (who did what?)
- Violates some TOS policies
- Less professional

**Verdict:** This works fine for very small teams (2-3 people) and buys time before building proper multi-user.

---

## Notes for Future Development

### Technologies to Consider
- **Casl** or **Permify** for permission management
- **WorkOS** for enterprise SSO (when we get there)
- **Segment** for activity tracking
- **LogRocket** for debugging team interactions

### Questions to Answer Before Building
1. Do we want organization switching? (user in multiple orgs)
2. Should we allow external guests (view-only, no account)?
3. How do we handle ownership transfer?
4. What happens to org data when owner cancels?
5. Do we need an activity/audit log from day one?

### Feature Additions (Post-MVP)
- [ ] Organization switching (if user in multiple orgs)
- [ ] Granular permissions (custom roles)
- [ ] Activity log (audit trail)
- [ ] Team analytics (who generates most reports)
- [ ] Notification preferences per member
- [ ] SSO for enterprise customers
- [ ] API keys per member (for future API access)

---

## Conclusion

Multi-user functionality is a **valuable but complex feature** that should be built when there's clear customer demand. The current single-user architecture works well for our target market (solo agencies and small freelancers). 

**Build this when:**
- We have 50+ paying customers
- Multiple customers are requesting team features
- We have engineering bandwidth (3-4 weeks minimum)

**Until then:**
- Focus on core product excellence
- Drive customer acquisition via SEO
- Monitor customer feedback for team feature requests
- Keep this document updated as architecture evolves

---

**Document Version:** 1.0  
**Last Updated:** November 9, 2025  
**Next Review:** When we reach 50 paying customers or receive 10+ team feature requests

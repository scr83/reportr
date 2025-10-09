# 🚀 PHASE 5A IMPLEMENTATION: PROPERTY SELECTION SYSTEM

**Task:** Build Google property selection functionality  
**Timeline:** 1 week  
**Prerequisites:** Phase 4 OAuth complete ✅  
**Agents:** Backend + Frontend working together

---

## 🎯 WHAT WE'RE BUILDING

Enable users to select which specific Search Console site and GA4 property to use for each client, so the system knows where to fetch data from.

---

## 📋 BACKEND AGENT TASKS

### TASK 1: Update Database Schema (30 minutes)

**File:** `prisma/schema.prisma`

**Add these fields to the Client model:**
```prisma
model Client {
  id                  String    @id @default(cuid())
  name                String
  domain              String
  userId              String
  
  // OAuth tokens (Phase 4 - already exists)
  googleAccessToken   String?
  googleRefreshToken  String?
  googleTokenExpiry   DateTime?
  googleConnectedAt   DateTime?
  
  // NEW: Property selections (Phase 5A)
  gscSiteUrl          String?   // e.g., "https://acmecorp.com/"
  gscSiteName         String?   // e.g., "acmecorp.com"
  ga4PropertyId       String?   // e.g., "123456789"
  ga4PropertyName     String?   // e.g., "Acme Corp Website"
  
  // NEW: Data fetch tracking
  lastDataFetch       DateTime?
  dataFetchStatus     String?   // 'success' | 'failed' | 'pending'
  
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt
  
  user                User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  reports             Report[]
}
```

**Run migration:**
```bash
npx prisma db push
npx prisma generate
```

**Verify:**
- Open Prisma Studio: `npx prisma studio`
- Check Client model has new fields
- Screenshot for documentation

---

### TASK 2: Create Token Manager Utility (1 hour)

**File:** `src/lib/integrations/token-manager.ts`

```typescript
import { google } from 'googleapis';
import { prisma } from '@/lib/prisma';

export class TokenManager {
  /**
   * Gets a valid access token, refreshing if expired
   */
  async getValidAccessToken(clientId: string): Promise<string> {
    const client = await prisma.client.findUnique({
      where: { id: clientId },
      select: {
        googleAccessToken: true,
        googleRefreshToken: true,
        googleTokenExpiry: true
      }
    });

    if (!client?.googleAccessToken) {
      throw new Error('Client not connected to Google');
    }

    // Check if token is expired (with 5 minute buffer)
    const now = new Date();
    const expiry = client.googleTokenExpiry ? new Date(client.googleTokenExpiry) : new Date(0);
    const bufferMs = 5 * 60 * 1000; // 5 minutes

    if (now.getTime() >= (expiry.getTime() - bufferMs)) {
      console.log('Token expired, refreshing...');
      return await this.refreshAccessToken(clientId, client.googleRefreshToken!);
    }

    return client.googleAccessToken;
  }

  /**
   * Refreshes an expired access token using the refresh token
   */
  private async refreshAccessToken(clientId: string, refreshToken: string): Promise<string> {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      refresh_token: refreshToken
    });

    try {
      const { credentials } = await oauth2Client.refreshAccessToken();
      
      // Update database with new token
      await prisma.client.update({
        where: { id: clientId },
        data: {
          googleAccessToken: credentials.access_token!,
          googleTokenExpiry: credentials.expiry_date ? new Date(credentials.expiry_date) : null
        }
      });

      console.log('Token refreshed successfully');
      return credentials.access_token!;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw new Error('Failed to refresh access token');
    }
  }
}

export const tokenManager = new TokenManager();
```

---

### TASK 3: Create Search Console API Integration (2 hours)

**File:** `src/lib/integrations/search-console.ts`

```typescript
import { google } from 'googleapis';
import { tokenManager } from './token-manager';

export interface GSCSite {
  siteUrl: string;
  permissionLevel: string;
}

export class SearchConsoleAPI {
  /**
   * Lists all Search Console sites the user has access to
   */
  async listSites(clientId: string): Promise<GSCSite[]> {
    try {
      const accessToken = await tokenManager.getValidAccessToken(clientId);
      
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });
      
      const webmasters = google.webmasters({ version: 'v3', auth });
      
      const response = await webmasters.sites.list();
      
      const sites: GSCSite[] = (response.data.siteEntry || []).map(site => ({
        siteUrl: site.siteUrl || '',
        permissionLevel: site.permissionLevel || 'unknown'
      }));
      
      console.log(`Found ${sites.length} Search Console sites`);
      return sites;
      
    } catch (error: any) {
      console.error('Error listing GSC sites:', error.message);
      throw new Error('Failed to fetch Search Console sites');
    }
  }
}

export const searchConsoleAPI = new SearchConsoleAPI();
```

---

### TASK 4: Create Analytics API Integration (2 hours)

**File:** `src/lib/integrations/google-analytics.ts`

```typescript
import { google } from 'googleapis';
import { tokenManager } from './token-manager';

export interface GA4Property {
  name: string;        // e.g., "properties/123456789"
  propertyId: string;  // e.g., "123456789"
  displayName: string; // e.g., "Acme Corp Website"
}

export class AnalyticsAPI {
  /**
   * Lists all GA4 properties the user has access to
   * Note: This requires analytics.edit scope or Admin API access
   * For MVP, we'll return an error and let users manually enter property ID
   */
  async listProperties(clientId: string): Promise<GA4Property[]> {
    try {
      const accessToken = await tokenManager.getValidAccessToken(clientId);
      
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });
      
      const analyticsadmin = google.analyticsadmin({ version: 'v1beta', auth });
      
      const response = await analyticsadmin.properties.list();
      
      const properties: GA4Property[] = (response.data.properties || []).map(prop => {
        // Extract property ID from name (format: "properties/123456789")
        const propertyId = prop.name?.split('/')[1] || '';
        
        return {
          name: prop.name || '',
          propertyId: propertyId,
          displayName: prop.displayName || prop.name || ''
        };
      });
      
      console.log(`Found ${properties.length} Analytics properties`);
      return properties;
      
    } catch (error: any) {
      console.error('Error listing GA4 properties:', error.message);
      
      // If error is about insufficient permissions, return empty array
      // User will manually enter property ID instead
      if (error.message?.includes('403') || error.message?.includes('permission')) {
        console.log('Insufficient permissions to list properties, manual entry required');
        return [];
      }
      
      throw new Error('Failed to fetch Analytics properties');
    }
  }
}

export const analyticsAPI = new AnalyticsAPI();
```

---

### TASK 5: Create API Endpoints

**File:** `src/app/api/google/search-console/sites/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { searchConsoleAPI } from '@/lib/integrations/search-console';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const clientId = searchParams.get('clientId');

    if (!clientId) {
      return NextResponse.json(
        { error: 'Client ID is required' },
        { status: 400 }
      );
    }

    console.log(`Fetching GSC sites for client: ${clientId}`);
    
    const sites = await searchConsoleAPI.listSites(clientId);
    
    return NextResponse.json({ sites });
    
  } catch (error: any) {
    console.error('Error in GSC sites endpoint:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch Search Console sites' },
      { status: 500 }
    );
  }
}
```

**File:** `src/app/api/google/analytics/properties/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { analyticsAPI } from '@/lib/integrations/google-analytics';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const clientId = searchParams.get('clientId');

    if (!clientId) {
      return NextResponse.json(
        { error: 'Client ID is required' },
        { status: 400 }
      );
    }

    console.log(`Fetching GA4 properties for client: ${clientId}`);
    
    const properties = await analyticsAPI.listProperties(clientId);
    
    return NextResponse.json({ properties });
    
  } catch (error: any) {
    console.error('Error in GA4 properties endpoint:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch Analytics properties' },
      { status: 500 }
    );
  }
}
```

**File:** `src/app/api/clients/[id]/properties/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface PropertyUpdateBody {
  gscSiteUrl?: string;
  gscSiteName?: string;
  ga4PropertyId?: string;
  ga4PropertyName?: string;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const clientId = params.id;
    const body: PropertyUpdateBody = await request.json();

    console.log(`Updating properties for client: ${clientId}`, body);

    // Validate client exists
    const client = await prisma.client.findUnique({
      where: { id: clientId }
    });

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    // Update client with property selections
    const updatedClient = await prisma.client.update({
      where: { id: clientId },
      data: {
        gscSiteUrl: body.gscSiteUrl,
        gscSiteName: body.gscSiteName,
        ga4PropertyId: body.ga4PropertyId,
        ga4PropertyName: body.ga4PropertyName,
        updatedAt: new Date()
      }
    });

    console.log('Properties updated successfully');

    return NextResponse.json({
      success: true,
      client: updatedClient
    });
    
  } catch (error: any) {
    console.error('Error updating properties:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update properties' },
      { status: 500 }
    );
  }
}
```

---

## 🎨 FRONTEND AGENT TASKS

### TASK 1: Property Selection Modal Component (4 hours)

**File:** `src/components/organisms/PropertySelectionModal.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { X, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface GSCSite {
  siteUrl: string;
  permissionLevel: string;
}

interface GA4Property {
  propertyId: string;
  displayName: string;
}

interface PropertySelectionModalProps {
  clientId: string;
  clientName: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export function PropertySelectionModal({
  clientId,
  clientName,
  isOpen,
  onClose,
  onSave
}: PropertySelectionModalProps) {
  const [gscSites, setGscSites] = useState<GSCSite[]>([]);
  const [ga4Properties, setGa4Properties] = useState<GA4Property[]>([]);
  
  const [selectedGSC, setSelectedGSC] = useState('');
  const [selectedGA4, setSelectedGA4] = useState('');
  const [manualGA4, setManualGA4] = useState('');
  const [useManualGA4, setUseManualGA4] = useState(false);
  
  const [loadingGSC, setLoadingGSC] = useState(false);
  const [loadingGA4, setLoadingGA4] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [errorGSC, setErrorGSC] = useState('');
  const [errorGA4, setErrorGA4] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchGSCSites();
      fetchGA4Properties();
    }
  }, [isOpen, clientId]);

  async function fetchGSCSites() {
    setLoadingGSC(true);
    setErrorGSC('');
    
    try {
      const response = await fetch(`/api/google/search-console/sites?clientId=${clientId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch sites');
      }
      
      setGscSites(data.sites || []);
      
      if (data.sites.length === 0) {
        setErrorGSC('No Search Console sites found for this account');
      }
    } catch (error: any) {
      setErrorGSC(error.message);
    } finally {
      setLoadingGSC(false);
    }
  }

  async function fetchGA4Properties() {
    setLoadingGA4(true);
    setErrorGA4('');
    
    try {
      const response = await fetch(`/api/google/analytics/properties?clientId=${clientId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch properties');
      }
      
      setGa4Properties(data.properties || []);
      
      if (data.properties.length === 0) {
        setErrorGA4('No Analytics properties found. You can manually enter a property ID below.');
        setUseManualGA4(true);
      }
    } catch (error: any) {
      setErrorGA4(error.message);
      setUseManualGA4(true);
    } finally {
      setLoadingGA4(false);
    }
  }

  async function handleSave() {
    if (!selectedGSC) {
      alert('Please select a Search Console property');
      return;
    }

    const ga4Id = useManualGA4 ? manualGA4 : selectedGA4;
    if (!ga4Id) {
      alert('Please select or enter a Google Analytics property');
      return;
    }

    setSaving(true);
    setSaveSuccess(false);
    
    try {
      // Find friendly names
      const gscSite = gscSites.find(s => s.siteUrl === selectedGSC);
      const ga4Prop = ga4Properties.find(p => p.propertyId === ga4Id);
      
      const response = await fetch(`/api/clients/${clientId}/properties`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          gscSiteUrl: selectedGSC,
          gscSiteName: gscSite?.siteUrl.replace(/https?:\/\//g, '').replace(/\//g, '') || selectedGSC,
          ga4PropertyId: ga4Id,
          ga4PropertyName: ga4Prop?.displayName || `Property ${ga4Id}`
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save properties');
      }

      setSaveSuccess(true);
      
      // Wait a moment to show success message
      setTimeout(() => {
        onSave();
        onClose();
      }, 1500);
      
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setSaving(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Configure Google Properties
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select which properties to track for {clientName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            disabled={saving}
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Search Console Section */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Step 1: Select Search Console Property
            </label>
            
            {loadingGSC ? (
              <div className="flex items-center justify-center p-8 bg-slate-800/50 rounded-lg">
                <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
                <span className="ml-2 text-slate-400">Loading properties...</span>
              </div>
            ) : errorGSC ? (
              <div className="flex items-start gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-400 font-medium">Error</p>
                  <p className="text-sm text-red-300 mt-1">{errorGSC}</p>
                </div>
              </div>
            ) : gscSites.length === 0 ? (
              <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
                <p className="text-sm text-slate-400">
                  No Search Console properties found for this account.
                </p>
              </div>
            ) : (
              <select
                value={selectedGSC}
                onChange={(e) => setSelectedGSC(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">-- Select a property --</option>
                {gscSites.map((site) => (
                  <option key={site.siteUrl} value={site.siteUrl}>
                    {site.siteUrl} ({site.permissionLevel})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Analytics Section */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Step 2: Select Google Analytics Property
            </label>
            
            {loadingGA4 ? (
              <div className="flex items-center justify-center p-8 bg-slate-800/50 rounded-lg">
                <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
                <span className="ml-2 text-slate-400">Loading properties...</span>
              </div>
            ) : useManualGA4 || ga4Properties.length === 0 ? (
              <div className="space-y-3">
                {errorGA4 && (
                  <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-yellow-400 font-medium">Manual Entry Required</p>
                      <p className="text-sm text-yellow-300 mt-1">{errorGA4}</p>
                    </div>
                  </div>
                )}
                <input
                  type="text"
                  value={manualGA4}
                  onChange={(e) => setManualGA4(e.target.value)}
                  placeholder="Enter GA4 Property ID (e.g., 123456789)"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-slate-400">
                  Find your property ID in Google Analytics → Admin → Property Settings
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <select
                  value={selectedGA4}
                  onChange={(e) => setSelectedGA4(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">-- Select a property --</option>
                  {ga4Properties.map((prop) => (
                    <option key={prop.propertyId} value={prop.propertyId}>
                      {prop.displayName} ({prop.propertyId})
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setUseManualGA4(true)}
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Or enter property ID manually →
                </button>
              </div>
            )}
          </div>

          {/* Success Message */}
          {saveSuccess && (
            <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="text-sm text-green-400 font-medium">
                Properties saved successfully!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || saveSuccess || !selectedGSC || (!selectedGA4 && !manualGA4)}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Saved!
              </>
            ) : (
              'Save Properties'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

### TASK 2: Update Client Card Component (2 hours)

**File:** Update your existing `ClientCard` component to add:

1. **"Configure Properties" button** when client is connected
2. **Display selected properties** (if configured)
3. **Show last data fetch** timestamp (for Phase 5B)
4. **Open PropertySelectionModal** when button clicked

**Example additions:**

```typescript
import { useState } from 'react';
import { PropertySelectionModal } from './PropertySelectionModal';
import { Settings } from 'lucide-react';

// Inside your ClientCard component:

const [showPropertyModal, setShowPropertyModal] = useState(false);

// Add this button (when client.googleConnectedAt exists):
{client.googleConnectedAt && (
  <button
    onClick={() => setShowPropertyModal(true)}
    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
  >
    <Settings className="w-4 h-4" />
    {client.gscSiteUrl ? 'Update Properties' : 'Configure Properties'}
  </button>
)}

// Show selected properties:
{client.gscSiteUrl && (
  <div className="mt-2 space-y-1 text-sm">
    <p className="text-slate-400">
      <span className="text-green-500">•</span> Search Console: {client.gscSiteName}
    </p>
    {client.ga4PropertyId && (
      <p className="text-slate-400">
        <span className="text-green-500">•</span> Analytics: {client.ga4PropertyName}
      </p>
    )}
  </div>
)}

// Add modal at bottom of component:
<PropertySelectionModal
  clientId={client.id}
  clientName={client.name}
  isOpen={showPropertyModal}
  onClose={() => setShowPropertyModal(false)}
  onSave={() => {
    // Refresh client data
    window.location.reload(); // Or use your state management
  }}
/>
```

---

## ✅ TESTING CHECKLIST

### Backend Tests:

- [ ] Database migration successful (new fields added)
- [ ] Token manager can refresh expired tokens
- [ ] Search Console API lists sites correctly
- [ ] Analytics API handles permission errors gracefully
- [ ] API endpoints return proper error messages
- [ ] Property save endpoint updates database correctly

### Frontend Tests:

- [ ] Modal opens when "Configure Properties" clicked
- [ ] Loading indicators show while fetching properties
- [ ] GSC sites dropdown populates correctly
- [ ] GA4 properties dropdown (or manual entry) works
- [ ] Save button disabled until both properties selected
- [ ] Success message shows after saving
- [ ] Client card displays saved properties
- [ ] Modal closes after successful save

### Integration Tests:

- [ ] Test with account that has multiple GSC sites
- [ ] Test with account that has multiple GA4 properties
- [ ] Test with account that has NO GA4 properties (manual entry)
- [ ] Test with expired access token (should auto-refresh)
- [ ] Test saving properties for multiple clients
- [ ] Test updating properties (changing selections)

---

## 🚀 DEPLOYMENT STEPS

1. **Merge code to main branch**
2. **Vercel will auto-deploy**
3. **Verify migration ran:** Check Prisma Studio on production
4. **Test with real Google account:** Connect and configure properties
5. **Monitor Vercel logs:** Check for any API errors

---

## 📊 SUCCESS CRITERIA

Phase 5A is complete when:

- [✅] Users can click "Configure Properties" button
- [✅] Modal fetches and displays available GSC sites
- [✅] Modal fetches GA4 properties (or allows manual entry)
- [✅] Users can save property selections
- [✅] Selected properties display on client card
- [✅] Properties persist in database
- [✅] Token refresh works automatically

---

## 🐛 TROUBLESHOOTING

**Issue: "No Search Console sites found"**
- **Cause:** Connected Google account has no GSC properties
- **Solution:** Add test account as owner in Google Search Console

**Issue: "Failed to fetch Analytics properties"**
- **Cause:** Missing permissions or scope
- **Solution:** Use manual entry fallback (already implemented)

**Issue: "Token expired"**
- **Cause:** Access token expired
- **Solution:** Token manager should auto-refresh (check implementation)

**Issue: Modal doesn't open**
- **Cause:** State management issue
- **Solution:** Check `showPropertyModal` state and button onClick handler

---

**Ready to start implementation?** Follow the tasks in order and test each piece before moving to the next! 🚀

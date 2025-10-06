# 🎨 Agent 2: Frontend Dashboard & UI Specialist

## ROLE & IDENTITY
You are a **Senior Frontend Engineer** specializing in React, Next.js, and modern UI/UX design. Your expertise includes:
- React 18 with hooks and modern patterns
- Next.js 14 App Router
- TypeScript for type-safe UIs
- Tailwind CSS for styling
- Form handling and validation
- State management and data fetching
- Responsive design and accessibility

## PROJECT CONTEXT
**Project:** SEO ReportBot - White-label SaaS for digital marketing agencies
**Your Mission:** Build the complete user interface and dashboard experience
**Current State:** Component library exists (atoms/molecules), pages need to be built
**Priority:** HIGH - Users need UI to generate and view reports

## YOUR RESPONSIBILITIES

### 1. Dashboard Homepage (PRIORITY: CRITICAL)

**File:** `src/app/dashboard/page.tsx`

**Requirements:**
Create an engaging dashboard homepage with:
- Welcome message with user's agency name
- Key metrics in stat cards (clients, reports generated, time saved)
- Recent activity feed
- Quick action buttons (Add Client, Generate Report)
- Helpful getting started tips for new users

**Implementation Guide:**
```typescript
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, Button } from '@/components/atoms';
import { MetricCard, ActivityFeed } from '@/components/molecules';
import { StatsOverview } from '@/components/organisms';

interface DashboardStats {
  totalClients: number;
  totalReports: number;
  timeSavedHours: number;
  costSavings: number;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  async function fetchDashboardStats() {
    try {
      const response = await fetch('/api/dashboard/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <div className="mb-8">
        <Typography variant="h1">
          Welcome back, {session?.user?.name?.split(' ')[0] || 'there'}! 👋
        </Typography>
        <Typography variant="subtitle" className="text-gray-600">
          Here's what's happening with your SEO reports today
        </Typography>
      </div>

      {/* Stats Overview */}
      <StatsOverview stats={stats} loading={loading} />

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6">
          <Typography variant="h3" className="mb-4">
            Quick Actions
          </Typography>
          <div className="space-y-3">
            <Button href="/dashboard/clients/new" fullWidth>
              + Add New Client
            </Button>
            <Button href="/dashboard/reports/generate" variant="secondary" fullWidth>
              📊 Generate Report
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <Typography variant="h3" className="mb-4">
            Recent Activity
          </Typography>
          <ActivityFeed />
        </Card>
      </div>

      {/* Getting Started (show only for new users) */}
      {stats?.totalClients === 0 && (
        <Card className="mt-8 p-6 bg-blue-50">
          <Typography variant="h3" className="mb-4">
            🚀 Getting Started
          </Typography>
          <ol className="space-y-2 list-decimal list-inside">
            <li>Add your first client</li>
            <li>Connect their Google Search Console and Analytics</li>
            <li>Generate your first report in 30 seconds</li>
          </ol>
          <Button href="/dashboard/clients/new" className="mt-4">
            Add Your First Client →
          </Button>
        </Card>
      )}
    </Container>
  );
}
```

**Additional Components Needed:**
- `src/components/organisms/StatsOverview.tsx` - Stats grid with metric cards
- `src/components/molecules/ActivityFeed.tsx` - Recent reports and activity
- `src/app/api/dashboard/stats/route.ts` - API endpoint for dashboard stats

---

### 2. Client Management Pages (PRIORITY: CRITICAL)

#### A. Clients List Page
**File:** `src/app/dashboard/clients/page.tsx`

**Requirements:**
- Table/grid view of all clients
- Search and filter functionality
- Sort by name, date added, reports generated
- Quick actions (Edit, Delete, Generate Report)
- Empty state for no clients
- Add Client button

**Implementation:**
```typescript
'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Button, Input } from '@/components/atoms';
import { ClientTable, EmptyState } from '@/components/organisms';
import { SearchBar } from '@/components/molecules';

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    const response = await fetch('/api/clients');
    const data = await response.json();
    setClients(data);
    setLoading(false);
  }

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <div className="flex justify-between items-center mb-8">
        <div>
          <Typography variant="h1">Clients</Typography>
          <Typography variant="subtitle" className="text-gray-600">
            Manage your client websites and reports
          </Typography>
        </div>
        <Button href="/dashboard/clients/new">
          + Add Client
        </Button>
      </div>

      {clients.length > 0 ? (
        <>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search clients..."
            className="mb-6"
          />
          <ClientTable
            clients={filteredClients}
            onDelete={handleDeleteClient}
            onGenerateReport={handleGenerateReport}
          />
        </>
      ) : (
        <EmptyState
          icon="📊"
          title="No clients yet"
          description="Add your first client to start generating SEO reports"
          actionLabel="Add Client"
          actionHref="/dashboard/clients/new"
        />
      )}
    </Container>
  );

  async function handleDeleteClient(clientId: string) {
    if (!confirm('Are you sure you want to delete this client?')) return;
    
    await fetch(`/api/clients/${clientId}`, { method: 'DELETE' });
    fetchClients(); // Refresh list
  }

  async function handleGenerateReport(clientId: string) {
    // Redirect to report generation or trigger inline
    window.location.href = `/dashboard/clients/${clientId}/generate-report`;
  }
}
```

**Components to Build:**
- `src/components/organisms/ClientTable.tsx` - Data table with actions
- `src/components/organisms/EmptyState.tsx` - Empty state component
- `src/components/molecules/SearchBar.tsx` - Search input with icon

---

#### B. Add/Edit Client Page
**File:** `src/app/dashboard/clients/new/page.tsx`
**File:** `src/app/dashboard/clients/[id]/edit/page.tsx`

**Requirements:**
- Form with client details (name, domain, contact info)
- Google API connection buttons
- Form validation
- Success/error notifications
- Loading states

**Implementation:**
```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Button, Input, Card } from '@/components/atoms';
import { z } from 'zod';

const clientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  domain: z.string().url('Must be a valid URL'),
  contactName: z.string().optional(),
  contactEmail: z.string().email('Must be a valid email').optional().or(z.literal(''))
});

type ClientFormData = z.infer<typeof clientSchema>;

export default function NewClientPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    domain: '',
    contactName: '',
    contactEmail: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Validate
    try {
      clientSchema.parse(formData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            errorMap[err.path[0].toString()] = err.message;
          }
        });
        setErrors(errorMap);
        return;
      }
    }

    // Submit
    setLoading(true);
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const client = await response.json();
        router.push(`/dashboard/clients/${client.id}`);
      } else {
        alert('Failed to create client');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h1" className="mb-8">
        Add New Client
      </Typography>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Client Name *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Acme Corporation"
              error={errors.name}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Website URL *
            </label>
            <Input
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              placeholder="https://acme.com"
              error={errors.domain}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Contact Name (Optional)
            </label>
            <Input
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              placeholder="John Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Contact Email (Optional)
            </label>
            <Input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              placeholder="john@acme.com"
              error={errors.contactEmail}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" loading={loading} fullWidth>
              Create Client
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>

      <Card className="mt-6 p-6 bg-blue-50">
        <Typography variant="h3" className="mb-2">
          📊 Next Steps
        </Typography>
        <Typography className="text-sm text-gray-700">
          After creating the client, you'll be able to connect their Google Search Console
          and Analytics accounts to start generating reports.
        </Typography>
      </Card>
    </Container>
  );
}
```

---

#### C. Client Detail Page
**File:** `src/app/dashboard/clients/[id]/page.tsx`

**Requirements:**
- Client information display
- Google API connection status
- Recent reports for this client
- Actions: Edit, Delete, Generate Report, Connect APIs
- Connection instructions modal

**Implementation:**
```typescript
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Typography, Button, Card, Badge } from '@/components/atoms';
import { ReportGrid } from '@/components/organisms';

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;
  
  const [client, setClient] = useState<any>(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientData();
  }, [clientId]);

  async function fetchClientData() {
    const [clientRes, reportsRes] = await Promise.all([
      fetch(`/api/clients/${clientId}`),
      fetch(`/api/clients/${clientId}/reports`)
    ]);

    setClient(await clientRes.json());
    setReports(await reportsRes.json());
    setLoading(false);
  }

  async function handleGenerateReport() {
    const response = await fetch(`/api/clients/${clientId}/reports`, {
      method: 'POST'
    });

    const { reportId } = await response.json();
    router.push(`/dashboard/reports/${reportId}`);
  }

  if (loading) return <div>Loading...</div>;
  if (!client) return <div>Client not found</div>;

  return (
    <Container>
      <div className="flex justify-between items-start mb-8">
        <div>
          <Typography variant="h1">{client.name}</Typography>
          <Typography variant="subtitle" className="text-gray-600">
            {client.domain}
          </Typography>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleGenerateReport}>
            Generate Report
          </Button>
          <Button variant="secondary" href={`/dashboard/clients/${clientId}/edit`}>
            Edit
          </Button>
        </div>
      </div>

      {/* Connection Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Typography variant="h3">Google Search Console</Typography>
            <Badge variant={client.googleSearchConsoleConnected ? 'success' : 'warning'}>
              {client.googleSearchConsoleConnected ? 'Connected' : 'Not Connected'}
            </Badge>
          </div>
          {!client.googleSearchConsoleConnected && (
            <Button size="sm" className="mt-4">
              Connect Search Console
            </Button>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Typography variant="h3">Google Analytics</Typography>
            <Badge variant={client.googleAnalyticsConnected ? 'success' : 'warning'}>
              {client.googleAnalyticsConnected ? 'Connected' : 'Not Connected'}
            </Badge>
          </div>
          {!client.googleAnalyticsConnected && (
            <Button size="sm" className="mt-4">
              Connect Analytics
            </Button>
          )}
        </Card>
      </div>

      {/* Recent Reports */}
      <Typography variant="h2" className="mb-4">
        Recent Reports
      </Typography>
      {reports.length > 0 ? (
        <ReportGrid reports={reports} />
      ) : (
        <Card className="p-12 text-center">
          <Typography className="text-gray-600 mb-4">
            No reports generated yet for this client
          </Typography>
          <Button onClick={handleGenerateReport}>
            Generate First Report
          </Button>
        </Card>
      )}
    </Container>
  );
}
```

---

### 3. Reports Pages (PRIORITY: CRITICAL)

#### A. Reports List Page
**File:** `src/app/dashboard/reports/page.tsx`

**Requirements:**
- List all reports across all clients
- Filter by client, status, date
- Status indicators (pending, processing, completed, failed)
- Download PDF action
- Regenerate option for failed reports

**Implementation:**
```typescript
'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Button, Select } from '@/components/atoms';
import { ReportGrid, FilterBar } from '@/components/organisms';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [clients, setClients] = useState([]);
  const [filters, setFilters] = useState({
    clientId: 'all',
    status: 'all',
    dateRange: '30days'
  });

  useEffect(() => {
    fetchReports();
    fetchClients();
  }, [filters]);

  async function fetchReports() {
    const params = new URLSearchParams();
    if (filters.clientId !== 'all') params.set('clientId', filters.clientId);
    if (filters.status !== 'all') params.set('status', filters.status);

    const response = await fetch(`/api/reports?${params}`);
    const data = await response.json();
    setReports(data);
  }

  async function fetchClients() {
    const response = await fetch('/api/clients');
    const data = await response.json();
    setClients(data);
  }

  return (
    <Container>
      <div className="flex justify-between items-center mb-8">
        <div>
          <Typography variant="h1">Reports</Typography>
          <Typography variant="subtitle" className="text-gray-600">
            View and download all generated reports
          </Typography>
        </div>
        <Button href="/dashboard/reports/generate">
          Generate New Report
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Select
          value={filters.clientId}
          onChange={(e) => setFilters({ ...filters, clientId: e.target.value })}
        >
          <option value="all">All Clients</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </Select>

        <Select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="all">All Statuses</option>
          <option value="COMPLETED">Completed</option>
          <option value="PROCESSING">Processing</option>
          <option value="FAILED">Failed</option>
        </Select>
      </div>

      {/* Reports Grid */}
      <ReportGrid reports={reports} onDownload={handleDownload} />
    </Container>
  );

  async function handleDownload(reportId: string) {
    window.open(`/api/reports/${reportId}/download`, '_blank');
  }
}
```

---

#### B. Report Detail/Preview Page
**File:** `src/app/dashboard/reports/[id]/page.tsx`

**Requirements:**
- Show report status and metadata
- If completed: Display PDF preview and download button
- If processing: Show progress indicator with polling
- If failed: Show error message and retry button
- Client information
- Generation timestamp

**Implementation:**
```typescript
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Typography, Button, Card, Badge } from '@/components/atoms';
import { Spinner } from '@/components/atoms';

export default function ReportDetailPage() {
  const params = useParams();
  const reportId = params.id as string;
  
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
    
    // Poll for updates if processing
    const interval = setInterval(() => {
      if (report?.status === 'PROCESSING') {
        fetchReport();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [reportId, report?.status]);

  async function fetchReport() {
    const response = await fetch(`/api/reports/${reportId}`);
    const data = await response.json();
    setReport(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      </Container>
    );
  }

  const statusColors = {
    COMPLETED: 'success',
    PROCESSING: 'warning',
    FAILED: 'error',
    PENDING: 'default'
  };

  return (
    <Container>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Typography variant="h1">{report.title}</Typography>
          <Badge variant={statusColors[report.status]}>
            {report.status}
          </Badge>
        </div>
        <Typography variant="subtitle" className="text-gray-600">
          Generated {new Date(report.createdAt).toLocaleDateString()}
        </Typography>
      </div>

      {/* Processing State */}
      {report.status === 'PROCESSING' && (
        <Card className="p-12 text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <Typography variant="h3" className="mb-2">
            Generating Your Report...
          </Typography>
          <Typography className="text-gray-600">
            This usually takes 30-60 seconds. We're collecting data from Google Search Console,
            Analytics, and PageSpeed Insights.
          </Typography>
        </Card>
      )}

      {/* Completed State */}
      {report.status === 'COMPLETED' && (
        <>
          <Card className="p-8 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <Typography variant="h3" className="mb-2">
                  Report Ready!
                </Typography>
                <Typography className="text-gray-600">
                  Your SEO report has been generated successfully
                </Typography>
              </div>
              <Button onClick={() => window.open(report.pdfUrl, '_blank')}>
                📥 Download PDF
              </Button>
            </div>
          </Card>

          {/* PDF Preview (iframe) */}
          <Card className="p-4">
            <iframe
              src={report.pdfUrl}
              className="w-full h-[800px] border-0"
              title="Report Preview"
            />
          </Card>
        </>
      )}

      {/* Failed State */}
      {report.status === 'FAILED' && (
        <Card className="p-12 text-center bg-red-50">
          <Typography variant="h3" className="mb-2 text-red-600">
            Report Generation Failed
          </Typography>
          <Typography className="text-gray-700 mb-4">
            {report.errorMessage || 'An error occurred while generating the report'}
          </Typography>
          <Button onClick={handleRetry}>
            🔄 Retry Generation
          </Button>
        </Card>
      )}
    </Container>
  );

  async function handleRetry() {
    // Trigger regeneration
    await fetch(`/api/reports/${reportId}/retry`, { method: 'POST' });
    fetchReport();
  }
}
```

---

### 4. Settings Pages (PRIORITY: HIGH)

#### A. Branding Settings
**File:** `src/app/dashboard/settings/branding/page.tsx`

**Requirements:**
- Upload logo
- Choose primary color (color picker)
- Edit company name
- Preview how reports will look
- Save changes

**Implementation:**
```typescript
'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Button, Input, Card } from '@/components/atoms';
import { FileUpload, ColorPicker } from '@/components/molecules';

export default function BrandingSettingsPage() {
  const [settings, setSettings] = useState({
    companyName: '',
    primaryColor: '#3B82F6',
    logo: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    const response = await fetch('/api/settings/branding');
    const data = await response.json();
    setSettings(data);
  }

  async function handleSave() {
    setLoading(true);
    try {
      await fetch('/api/settings/branding', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Failed to save settings');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h1" className="mb-8">
        Branding Settings
      </Typography>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Settings Form */}
        <div className="space-y-6">
          <Card className="p-6">
            <Typography variant="h3" className="mb-4">
              Company Information
            </Typography>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Company Name
                </label>
                <Input
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  placeholder="Your Agency Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Logo
                </label>
                <FileUpload
                  accept="image/*"
                  onUpload={(url) => setSettings({ ...settings, logo: url })}
                  currentFile={settings.logo}
                />
                <p className="text-sm text-gray-600 mt-1">
                  Recommended: 200x200px PNG with transparent background
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Primary Color
                </label>
                <ColorPicker
                  value={settings.primaryColor}
                  onChange={(color) => setSettings({ ...settings, primaryColor: color })}
                />
              </div>
            </div>

            <Button onClick={handleSave} loading={loading} className="mt-6" fullWidth>
              Save Changes
            </Button>
          </Card>
        </div>

        {/* Preview */}
        <div>
          <Card className="p-6">
            <Typography variant="h3" className="mb-4">
              Preview
            </Typography>
            <div className="border rounded-lg p-6" style={{
              borderColor: settings.primaryColor
            }}>
              {settings.logo && (
                <img src={settings.logo} alt="Logo" className="h-12 mb-4" />
              )}
              <Typography variant="h2" style={{ color: settings.primaryColor }}>
                {settings.companyName || 'Your Agency Name'}
              </Typography>
              <Typography className="text-gray-600 mt-2">
                SEO Performance Report
              </Typography>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}
```

---

### 5. Component Development (PRIORITY: MEDIUM)

Build these reusable components:

#### Key Organisms to Build:
```typescript
// src/components/organisms/ClientTable.tsx
// Data table with sorting, actions, and responsive design

// src/components/organisms/ReportGrid.tsx
// Grid of report cards with status, client name, download action

// src/components/organisms/StatsOverview.tsx
// Dashboard stats in metric cards

// src/components/organisms/EmptyState.tsx
// Empty state with icon, message, and CTA

// src/components/organisms/FilterBar.tsx
// Filter controls for lists
```

#### Key Molecules to Build:
```typescript
// src/components/molecules/MetricCard.tsx
// Stat card with icon, number, label, change indicator

// src/components/molecules/ActivityFeed.tsx
// List of recent activities with timestamps

// src/components/molecules/SearchBar.tsx
// Search input with icon and clear button

// src/components/molecules/FileUpload.tsx
// File upload with drag-drop and preview

// src/components/molecules/ColorPicker.tsx
// Color picker input
```

---

## UI/UX DESIGN PRINCIPLES

### Visual Style
- **Modern & Clean:** Use whitespace generously
- **Card-based Layout:** Everything in cards with subtle shadows
- **Hover Effects:** Transform and shadow on card hover
- **Color System:** Use brand colors consistently
- **Icons:** Use Lucide React icons throughout
- **Typography:** Clear hierarchy with Inter font

### Responsive Design
- **Mobile First:** Design for mobile, enhance for desktop
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Targets:** Minimum 44x44px for buttons
- **Navigation:** Responsive sidebar/hamburger menu

### Accessibility
- **Semantic HTML:** Use proper heading levels
- **ARIA Labels:** Add where needed
- **Keyboard Navigation:** Tab through all interactive elements
- **Color Contrast:** Ensure WCAG AA compliance

### Loading States
- **Skeleton Screens:** Show layout while loading
- **Spinners:** For inline operations
- **Progress Indicators:** For multi-step processes
- **Optimistic UI:** Update UI before API confirms

### Error Handling
- **Toast Notifications:** For success/error messages
- **Inline Errors:** Show validation errors near inputs
- **Error Boundaries:** Catch React errors gracefully
- **Helpful Messages:** Tell user what went wrong and how to fix

---

## TESTING CHECKLIST

- [ ] All pages render without errors
- [ ] Forms validate correctly
- [ ] API calls handle errors gracefully
- [ ] Loading states display properly
- [ ] Responsive on mobile, tablet, desktop
- [ ] Keyboard navigation works
- [ ] Color contrast passes WCAG AA
- [ ] Empty states show correctly
- [ ] Success/error messages appear
- [ ] Filters and search work

---

## SUCCESS CRITERIA

Your work is complete when:
1. ✅ Dashboard homepage shows stats and quick actions
2. ✅ Clients can be added, edited, deleted via UI
3. ✅ Reports list shows all reports with filtering
4. ✅ Report detail page shows status and PDF preview
5. ✅ Settings page allows branding customization
6. ✅ All pages are responsive and accessible
7. ✅ Loading and error states handled everywhere
8. ✅ Navigation works seamlessly

---

## CODE QUALITY STANDARDS

- **TypeScript:** Use proper types, avoid `any`
- **Components:** Small, focused, reusable
- **Naming:** Clear, descriptive names
- **Comments:** Explain complex logic
- **Styling:** Use Tailwind utility classes
- **Accessibility:** Semantic HTML, ARIA labels
- **Error Handling:** Try-catch for async operations

---

## DELIVERY TIMELINE

**Estimated:** 5-7 days of focused development

**Milestones:**
- Day 1-2: Dashboard and client management pages
- Day 3-4: Reports pages and detail views
- Day 5: Settings pages
- Day 6-7: Component refinement and testing

---

**Let's create an amazing user experience! 🎨**

# Custom Metrics Feature - Technical Implementation Guide

**Version**: 1.0  
**Last Updated**: November 9, 2025  
**Status**: Phase 1 - Ready for Implementation

---

## 📋 Executive Summary

This document provides complete technical specifications for implementing user-defined custom GA4 metrics in Reportr's Custom Report type. The feature allows users to supplement our curated metrics with their own GA4 custom metrics while maintaining our core value proposition of automated, fast report generation.

### Key Principles
- ✅ Keep existing Executive and Standard reports unchanged
- ✅ Add custom metrics capability ONLY to Custom Reports
- ✅ Maintain "auto-fetch from Google" workflow (no manual data entry)
- ✅ Simple implementation - users deal with their own metric quality
- ✅ Zero displayed for metrics with no data (acceptable behavior)
- ✅ Follow existing UI patterns for consistency

### Business Context
- **Target Users**: All tiers (restriction possible later via feature flags)
- **Use Case**: Agencies tracking custom GA4 events/metrics specific to their clients
- **Value Proposition**: "Track ANY GA4 metric that matters to your clients"
- **Positioning**: Maintains "SEO Expert" focus with power-user flexibility

---

## 🎯 Current System Architecture

### What We Have (Confirmed Working)

#### 1. GA4 Integration Foundation
```
Location: /src/lib/integrations/analytics.ts
Status: ✅ READY - Already supports dynamic metrics

Key Components:
- GA4 Data API v1beta client
- OAuth with analytics.readonly scope (sufficient for all metrics)
- Dynamic metric requests via METRIC_MAPPING system
- Robust token refresh and error handling
```

#### 2. Report Generation Pipeline
```
Location: /src/lib/services/report-generator.ts
Status: ✅ READY - Accepts variable metric arrays

Flow:
User Selection → API Route → Metric Mapping → GA4 Fetch → PDF Generation
                                    ↓
              [METRIC_MAPPING] → [Dynamic GA4 Request]
```

#### 3. PDF Rendering System
```
Location: /src/components/pdf/templates/CustomReportTemplate.tsx
Status: ✅ READY - Already renders metrics dynamically

Capabilities:
- Programmatic metric rendering based on selectedMetrics array
- Automatic layout adaptation (up to 15 metrics)
- Graceful handling of missing/invalid data
- Multi-source data support (GA4, GSC, PageSpeed)
```

#### 4. Database Schema
```
Location: /prisma/schema.prisma
Status: ✅ READY - Flexible JSON storage

Report Model:
- reportData: Json (accommodates any metric structure)
- selectedMetrics: Array stored in JSON
- No migration needed
```

#### 5. UI Component
```
Location: /src/components/organisms/MetricSelectorModal.tsx (or similar)
Status: ✅ READY - Modal with category-based selection

Current Categories:
- Audience (Users, Sessions, etc.)
- Engagement (Bounce Rate, Pages per Session, etc.)
- Conversions (Conversions, Revenue, etc.)
- Traffic Sources (Organic %, Paid Traffic, etc.)
- Behavior (Device Breakdown, Top Landing Pages, etc.)

UI Pattern:
- Icon per category
- Checkbox cards with title + description
- "Selected: X / 15" counter
- "Reset to Default" button
```

---

## 🚀 What Needs to Be Built

### Phase 1: MVP Implementation (Estimated: 3-5 days)

#### Feature Scope
Add "Custom Metrics" category to the metric selector that allows users to:
1. Enter GA4 metric API names manually
2. Fetch and display these metrics in Custom Reports
3. Save selections for future reports

#### Technical Requirements

### 1. GA4 Metadata API Integration
**Purpose**: Discover all available metrics from user's GA4 property

**New File**: `/src/lib/integrations/ga4-metadata.ts`

```typescript
import { google } from 'googleapis';

/**
 * Fetches all available metrics from a GA4 property
 * including both standard and custom metrics
 */
export async function fetchAvailableMetrics(
  accessToken: string,
  propertyId: string
): Promise<GA4Metric[]> {
  const analyticsadmin = google.analyticsadmin('v1beta');
  
  try {
    // Get property metadata
    const response = await analyticsadmin.properties.getMetadata({
      name: `properties/${propertyId}/metadata`,
      auth: accessToken
    });
    
    const metrics: GA4Metric[] = [];
    
    // Parse standard metrics
    if (response.data.metrics) {
      for (const metric of response.data.metrics) {
        metrics.push({
          apiName: metric.apiName,
          uiName: metric.uiName || metric.apiName,
          description: metric.description || '',
          category: metric.category || 'custom',
          type: metric.type || 'standard',
          dataType: metric.dataType || 'number'
        });
      }
    }
    
    return metrics;
  } catch (error) {
    console.error('Error fetching GA4 metadata:', error);
    
    // Fallback: Return empty array
    // Let user proceed with manual entry if metadata fetch fails
    return [];
  }
}

/**
 * Validates a metric name against GA4 property
 * Returns true if metric exists and is accessible
 */
export async function validateMetric(
  accessToken: string,
  propertyId: string,
  metricName: string
): Promise<boolean> {
  const analyticsdata = google.analyticsdata('v1beta');
  
  try {
    // Test query with single metric
    const response = await analyticsdata.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        metrics: [{ name: metricName }],
        dateRanges: [{ 
          startDate: '7daysAgo', 
          endDate: 'today' 
        }]
      }
    });
    
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

export interface GA4Metric {
  apiName: string;        // e.g., "customEvent:newsletter_signup"
  uiName: string;         // e.g., "Newsletter Signups"
  description: string;    // e.g., "Total newsletter signups"
  category: string;       // e.g., "custom", "audience", "engagement"
  type: 'standard' | 'custom' | 'calculated';
  dataType: 'number' | 'currency' | 'time' | 'percent';
}
```

**Key Points**:
- Uses GA4 Admin API metadata endpoint
- Fetches ALL metrics (standard + custom)
- Graceful fallback if metadata fetch fails
- Validation function for user-entered metrics

---

### 2. Update Metric Mapping System
**Purpose**: Support both predefined and custom metrics

**File to Modify**: `/src/lib/integrations/analytics.ts` (or wherever METRIC_MAPPING exists)

```typescript
// Existing METRIC_MAPPING structure
export const METRIC_MAPPING = {
  users: {
    apiName: 'activeUsers',
    displayName: 'Users',
    description: 'Total number of users',
    category: 'audience',
    format: 'number'
  },
  sessions: {
    apiName: 'sessions',
    displayName: 'Sessions',
    description: 'Total sessions',
    category: 'audience',
    format: 'number'
  },
  // ... 28 more predefined metrics
};

// NEW: Support for custom metrics
export interface CustomMetric {
  id: string;              // User-generated ID (e.g., "custom_1")
  apiName: string;         // GA4 API name (e.g., "customEvent:newsletter_signup")
  displayName: string;     // User-provided name (e.g., "Newsletter Signups")
  category: 'custom';      // Always 'custom' category
  format: 'number';        // Default to number for simplicity
  isCustom: true;          // Flag to identify custom metrics
}

// NEW: Combined metric lookup
export function getMetricConfig(
  metricId: string, 
  customMetrics: CustomMetric[] = []
): MetricConfig | CustomMetric | null {
  // Check predefined metrics first
  if (METRIC_MAPPING[metricId]) {
    return METRIC_MAPPING[metricId];
  }
  
  // Check custom metrics
  const customMetric = customMetrics.find(m => m.id === metricId);
  if (customMetric) {
    return customMetric;
  }
  
  return null;
}

// NEW: Build GA4 API request with mixed metrics
export function buildGA4Request(
  selectedMetrics: string[],
  customMetrics: CustomMetric[],
  dateRange: { startDate: string; endDate: string }
) {
  const metrics = selectedMetrics.map(metricId => {
    const config = getMetricConfig(metricId, customMetrics);
    if (!config) {
      throw new Error(`Unknown metric: ${metricId}`);
    }
    
    return {
      name: config.apiName
    };
  });
  
  return {
    property: `properties/${propertyId}`,
    dateRanges: [dateRange],
    metrics: metrics,
    // ... other request parameters
  };
}
```

**Key Changes**:
- Add `CustomMetric` interface
- Support lookup in both predefined and custom metrics
- Build GA4 requests with mixed metric types

---

### 3. Database Schema Extension
**Purpose**: Store user's custom metrics

**File to Modify**: `/prisma/schema.prisma`

```prisma
model Client {
  id              String    @id @default(cuid())
  name            String
  domain          String
  userId          String
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Google API tokens
  gscSiteUrl      String?
  gaPropertyId    String?
  accessToken     String?
  refreshToken    String?
  
  // NEW: Custom metrics configuration
  customMetrics   Json?     // Array of CustomMetric objects
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  reports         Report[]
}

model Report {
  id          String    @id @default(cuid())
  clientId    String
  client      Client    @relation(fields: [clientId], references: [id], onDelete: Cascade)
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  pdfUrl      String?
  status      String    @default("pending")
  
  // Existing: Already flexible enough
  reportData  Json?     // Contains selectedMetrics array + fetched data
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  @@index([userId])
  @@index([clientId])
}
```

**Migration Command**:
```bash
npx prisma migrate dev --name add_custom_metrics_to_client
```

**Example Data Structure**:
```json
// Client.customMetrics
[
  {
    "id": "custom_1",
    "apiName": "customEvent:newsletter_signup",
    "displayName": "Newsletter Signups",
    "category": "custom",
    "format": "number",
    "isCustom": true
  },
  {
    "id": "custom_2",
    "apiName": "customEvent:video_completion",
    "displayName": "Video Completions",
    "category": "custom",
    "format": "number",
    "isCustom": true
  }
]
```

---

### 4. API Routes
**Purpose**: Handle custom metric management

**New File**: `/src/app/api/clients/[id]/custom-metrics/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { fetchAvailableMetrics, validateMetric } from '@/lib/integrations/ga4-metadata';

/**
 * GET /api/clients/[id]/custom-metrics
 * Fetch available metrics from client's GA4 property
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const client = await prisma.client.findUnique({
      where: { 
        id: params.id,
        userId: session.user.id // Ensure ownership
      }
    });
    
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }
    
    if (!client.gaPropertyId || !client.accessToken) {
      return NextResponse.json(
        { error: 'GA4 not connected' }, 
        { status: 400 }
      );
    }
    
    // Fetch available metrics from GA4
    const availableMetrics = await fetchAvailableMetrics(
      client.accessToken,
      client.gaPropertyId
    );
    
    // Return only custom metrics (filter out standard ones)
    const customMetrics = availableMetrics.filter(m => 
      m.type === 'custom' || m.apiName.startsWith('customEvent:')
    );
    
    return NextResponse.json({
      success: true,
      metrics: customMetrics
    });
    
  } catch (error) {
    console.error('Error fetching custom metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/clients/[id]/custom-metrics
 * Save custom metrics for a client
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const body = await req.json();
    const { customMetrics } = body;
    
    // Validate input
    if (!Array.isArray(customMetrics)) {
      return NextResponse.json(
        { error: 'Invalid metrics format' },
        { status: 400 }
      );
    }
    
    // Limit to 10 custom metrics per client
    if (customMetrics.length > 10) {
      return NextResponse.json(
        { error: 'Maximum 10 custom metrics allowed' },
        { status: 400 }
      );
    }
    
    // Update client with custom metrics
    const client = await prisma.client.update({
      where: {
        id: params.id,
        userId: session.user.id
      },
      data: {
        customMetrics: customMetrics
      }
    });
    
    return NextResponse.json({
      success: true,
      customMetrics: client.customMetrics
    });
    
  } catch (error) {
    console.error('Error saving custom metrics:', error);
    return NextResponse.json(
      { error: 'Failed to save metrics' },
      { status: 500 }
    );
  }
}
```

---

### 5. UI Component Updates
**Purpose**: Add "Custom Metrics" category to selector modal

**File to Modify**: `/src/components/organisms/MetricSelectorModal.tsx` (or similar)

```tsx
// Add to existing categories
const METRIC_CATEGORIES = [
  {
    id: 'audience',
    name: 'Audience',
    icon: '👥',
    metrics: [ /* existing metrics */ ]
  },
  {
    id: 'engagement',
    name: 'Engagement',
    icon: '🎯',
    metrics: [ /* existing metrics */ ]
  },
  // ... other existing categories
  
  // NEW: Custom Metrics Category
  {
    id: 'custom',
    name: 'Custom Metrics',
    icon: '⚙️',
    description: 'Your GA4 custom metrics',
    metrics: [] // Populated dynamically from client.customMetrics
  }
];

export function MetricSelectorModal({ 
  clientId, 
  selectedMetrics,
  onSave 
}: MetricSelectorModalProps) {
  const [customMetrics, setCustomMetrics] = useState<CustomMetric[]>([]);
  const [isLoadingCustom, setIsLoadingCustom] = useState(false);
  const [showAddCustomModal, setShowAddCustomModal] = useState(false);
  
  // Fetch client's custom metrics on mount
  useEffect(() => {
    async function loadCustomMetrics() {
      try {
        const response = await fetch(`/api/clients/${clientId}/custom-metrics`);
        const data = await response.json();
        
        if (data.success) {
          setCustomMetrics(data.metrics);
        }
      } catch (error) {
        console.error('Failed to load custom metrics:', error);
      }
    }
    
    loadCustomMetrics();
  }, [clientId]);
  
  // Render custom metrics category
  function renderCustomMetricsCategory() {
    return (
      <div className="metric-category">
        <div className="category-header">
          <span className="icon">⚙️</span>
          <h3>Custom Metrics</h3>
          <button 
            onClick={() => setShowAddCustomModal(true)}
            className="text-sm text-brand-600 hover:text-brand-700"
          >
            + Add Custom Metric
          </button>
        </div>
        
        {customMetrics.length === 0 ? (
          <div className="empty-state">
            <p className="text-gray-500">
              No custom metrics configured yet.
            </p>
            <button 
              onClick={() => setShowAddCustomModal(true)}
              className="btn-secondary mt-2"
            >
              Add Your First Custom Metric
            </button>
          </div>
        ) : (
          <div className="metrics-grid">
            {customMetrics.map(metric => (
              <MetricCard
                key={metric.id}
                metric={metric}
                selected={selectedMetrics.includes(metric.id)}
                onToggle={() => handleMetricToggle(metric.id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <Modal>
      {/* Existing categories */}
      {METRIC_CATEGORIES.map(renderCategory)}
      
      {/* NEW: Custom metrics category */}
      {renderCustomMetricsCategory()}
      
      {/* NEW: Add custom metric modal */}
      {showAddCustomModal && (
        <AddCustomMetricModal
          clientId={clientId}
          onSave={(newMetric) => {
            setCustomMetrics([...customMetrics, newMetric]);
            setShowAddCustomModal(false);
          }}
          onCancel={() => setShowAddCustomModal(false)}
        />
      )}
    </Modal>
  );
}
```

---

### 6. Add Custom Metric Modal
**Purpose**: UI for users to add custom metrics

**New File**: `/src/components/organisms/AddCustomMetricModal.tsx`

```tsx
'use client';

import { useState } from 'react';
import { validateMetric } from '@/lib/integrations/ga4-metadata';

interface AddCustomMetricModalProps {
  clientId: string;
  onSave: (metric: CustomMetric) => void;
  onCancel: () => void;
}

export function AddCustomMetricModal({ 
  clientId, 
  onSave, 
  onCancel 
}: AddCustomMetricModalProps) {
  const [apiName, setApiName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  async function handleSave() {
    // Basic validation
    if (!apiName.trim() || !displayName.trim()) {
      setValidationError('Both fields are required');
      return;
    }
    
    setIsValidating(true);
    setValidationError(null);
    
    try {
      // Validate metric exists in GA4
      const response = await fetch(
        `/api/clients/${clientId}/custom-metrics/validate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ metricName: apiName })
        }
      );
      
      const data = await response.json();
      
      if (!data.valid) {
        setValidationError(
          'Metric not found in GA4 property. Please check the API name.'
        );
        setIsValidating(false);
        return;
      }
      
      // Save custom metric
      const newMetric: CustomMetric = {
        id: `custom_${Date.now()}`,
        apiName: apiName.trim(),
        displayName: displayName.trim(),
        category: 'custom',
        format: 'number',
        isCustom: true
      };
      
      const saveResponse = await fetch(
        `/api/clients/${clientId}/custom-metrics`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            customMetrics: [newMetric] // Backend will merge with existing
          })
        }
      );
      
      if (saveResponse.ok) {
        onSave(newMetric);
      } else {
        throw new Error('Failed to save metric');
      }
      
    } catch (error) {
      setValidationError('Error saving metric. Please try again.');
      console.error('Save custom metric error:', error);
    } finally {
      setIsValidating(false);
    }
  }
  
  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Custom Metric</h2>
        
        <div className="space-y-4">
          {/* Display Name Input */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g., Newsletter Signups"
              className="input w-full"
              disabled={isValidating}
            />
            <p className="text-xs text-gray-500 mt-1">
              How this metric will appear in your reports
            </p>
          </div>
          
          {/* GA4 API Name Input */}
          <div>
            <label className="block text-sm font-medium mb-1">
              GA4 Metric API Name
            </label>
            <input
              type="text"
              value={apiName}
              onChange={(e) => setApiName(e.target.value)}
              placeholder="e.g., customEvent:newsletter_signup"
              className="input w-full font-mono text-sm"
              disabled={isValidating}
            />
            <p className="text-xs text-gray-500 mt-1">
              The exact metric name from your GA4 property
            </p>
          </div>
          
          {/* Help Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-900">
              <strong>How to find your GA4 metric names:</strong>
            </p>
            <ol className="text-xs text-blue-800 mt-2 ml-4 list-decimal space-y-1">
              <li>Go to your GA4 property</li>
              <li>Navigate to Admin → Custom definitions</li>
              <li>Find your custom metric and copy the API name</li>
            </ol>
          </div>
          
          {/* Validation Error */}
          {validationError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-900">{validationError}</p>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="btn-secondary flex-1"
            disabled={isValidating}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary flex-1"
            disabled={isValidating}
          >
            {isValidating ? 'Validating...' : 'Add Metric'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

### 7. Update Report Generation Logic
**Purpose**: Include custom metrics in data fetching

**File to Modify**: `/src/lib/services/report-generator.ts`

```typescript
export async function generateCustomReport(
  clientId: string,
  selectedMetrics: string[],
  dateRange: { startDate: string; endDate: string }
): Promise<Report> {
  
  // Fetch client with custom metrics
  const client = await prisma.client.findUnique({
    where: { id: clientId },
    include: { user: true }
  });
  
  if (!client) {
    throw new Error('Client not found');
  }
  
  // Get custom metrics configuration
  const customMetrics = (client.customMetrics as CustomMetric[]) || [];
  
  // Separate predefined and custom metric IDs
  const predefinedMetrics = selectedMetrics.filter(id => 
    METRIC_MAPPING[id]
  );
  const customMetricIds = selectedMetrics.filter(id => 
    id.startsWith('custom_')
  );
  
  // Fetch GA4 data for all selected metrics
  const ga4Data = await fetchGA4Data(
    client.gaPropertyId,
    client.accessToken,
    [...predefinedMetrics, ...customMetricIds],
    customMetrics,
    dateRange
  );
  
  // Fetch other data sources (GSC, PageSpeed) as normal
  // ...
  
  // Generate PDF with mixed metrics
  const reportData = {
    selectedMetrics,
    customMetrics, // Include custom metric configs for PDF rendering
    ga4Data,
    gscData,
    pageSpeedData,
    // ...
  };
  
  const pdfBuffer = await generatePDF(reportData, client, client.user);
  const pdfUrl = await uploadPDF(pdfBuffer);
  
  // Save report
  return await prisma.report.create({
    data: {
      clientId,
      userId: client.userId,
      status: 'COMPLETED',
      pdfUrl,
      reportData
    }
  });
}

// Updated GA4 fetch function
async function fetchGA4Data(
  propertyId: string,
  accessToken: string,
  selectedMetrics: string[],
  customMetrics: CustomMetric[],
  dateRange: { startDate: string; endDate: string }
) {
  const metrics = selectedMetrics.map(metricId => {
    const config = getMetricConfig(metricId, customMetrics);
    
    if (!config) {
      console.warn(`Unknown metric ${metricId}, skipping`);
      return null;
    }
    
    return { name: config.apiName };
  }).filter(Boolean);
  
  const analyticsdata = google.analyticsdata('v1beta');
  
  const response = await analyticsdata.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      metrics,
      dateRanges: [dateRange],
      // ... other parameters
    }
  });
  
  // Parse response and map back to metric IDs
  const data = {};
  selectedMetrics.forEach((metricId, index) => {
    const metricData = response.data.rows?.[0]?.metricValues?.[index];
    data[metricId] = metricData?.value || '0'; // Zero for no data
  });
  
  return data;
}
```

---

### 8. Update PDF Template
**Purpose**: Render custom metrics alongside predefined ones

**File to Modify**: `/src/components/pdf/templates/CustomReportTemplate.tsx`

```tsx
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

interface CustomReportTemplateProps {
  data: {
    selectedMetrics: string[];
    customMetrics: CustomMetric[];
    ga4Data: Record<string, any>;
    client: Client;
    user: User;
    // ... other data
  };
}

export function CustomReportTemplate({ data }: CustomReportTemplateProps) {
  // Get display config for each metric (predefined or custom)
  function getMetricDisplay(metricId: string) {
    const config = getMetricConfig(metricId, data.customMetrics);
    
    if (!config) {
      return {
        displayName: metricId,
        value: data.ga4Data[metricId] || '0',
        format: 'number'
      };
    }
    
    return {
      displayName: config.displayName || config.uiName,
      value: data.ga4Data[metricId] || '0',
      format: config.format || 'number',
      isCustom: config.isCustom || false
    };
  }
  
  // Group metrics by category
  const metricsByCategory = data.selectedMetrics.reduce((acc, metricId) => {
    const config = getMetricConfig(metricId, data.customMetrics);
    const category = config?.category || 'other';
    
    if (!acc[category]) {
      acc[category] = [];
    }
    
    acc[category].push(metricId);
    return acc;
  }, {} as Record<string, string[]>);
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Cover Page */}
        <ReportCoverPage client={data.client} user={data.user} />
        
        {/* Metrics Section - Render by Category */}
        {Object.entries(metricsByCategory).map(([category, metricIds]) => (
          <View key={category} style={styles.section}>
            <Text style={styles.categoryHeader}>
              {getCategoryName(category)}
            </Text>
            
            <View style={styles.metricsGrid}>
              {metricIds.map(metricId => {
                const display = getMetricDisplay(metricId);
                
                return (
                  <View key={metricId} style={styles.metricCard}>
                    <Text style={styles.metricName}>
                      {display.displayName}
                      {display.isCustom && (
                        <Text style={styles.customBadge}> (Custom)</Text>
                      )}
                    </Text>
                    <Text style={styles.metricValue}>
                      {formatMetricValue(display.value, display.format)}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
        
        {/* Footer */}
        <ReportFooter branding={data.user} />
      </Page>
    </Document>
  );
}

// Helper function to format metric values
function formatMetricValue(value: string | number, format: string): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  switch (format) {
    case 'percent':
      return `${(numValue * 100).toFixed(2)}%`;
    case 'currency':
      return `$${numValue.toLocaleString()}`;
    case 'time':
      return `${numValue.toFixed(2)}s`;
    default:
      return numValue.toLocaleString();
  }
}

// Helper function to get category display name
function getCategoryName(category: string): string {
  const names = {
    'audience': 'Audience Metrics',
    'engagement': 'Engagement Metrics',
    'conversions': 'Conversion Metrics',
    'traffic': 'Traffic Source Metrics',
    'behavior': 'Behavior Metrics',
    'custom': 'Your Custom Metrics'
  };
  
  return names[category] || 'Other Metrics';
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff'
  },
  section: {
    marginBottom: 30
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1f2937'
  },
  metricsGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15
  },
  metricCard: {
    width: '48%',
    padding: 15,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    border: '1px solid #e5e7eb'
  },
  metricName: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8
  },
  customBadge: {
    fontSize: 10,
    color: '#7e23ce', // Brand purple
    fontWeight: 'bold'
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937'
  }
});
```

---

## 📝 Implementation Checklist

### Development Environment Setup
- [ ] Pull latest code from main branch
- [ ] Install dependencies (`npm install`)
- [ ] Set up local PostgreSQL database
- [ ] Configure environment variables

### Phase 1: Backend (Day 1-2)
- [ ] Create `/src/lib/integrations/ga4-metadata.ts`
- [ ] Implement `fetchAvailableMetrics()` function
- [ ] Implement `validateMetric()` function
- [ ] Update METRIC_MAPPING to support custom metrics
- [ ] Add `customMetrics` field to Prisma schema
- [ ] Run migration: `npx prisma migrate dev --name add_custom_metrics_to_client`
- [ ] Create API route: `/src/app/api/clients/[id]/custom-metrics/route.ts`
- [ ] Test API endpoints with Postman/Thunder Client

### Phase 2: Frontend (Day 2-3)
- [ ] Create `AddCustomMetricModal.tsx` component
- [ ] Update `MetricSelectorModal.tsx` to include custom category
- [ ] Add "fetch custom metrics" on component mount
- [ ] Implement save/delete custom metric UI actions
- [ ] Test UI flow: Add → Validate → Save → Display

### Phase 3: Report Generation (Day 3-4)
- [ ] Update `report-generator.ts` to handle custom metrics
- [ ] Modify `fetchGA4Data()` to include custom metric API names
- [ ] Update `CustomReportTemplate.tsx` PDF rendering
- [ ] Add custom metric badge/indicator in PDF
- [ ] Test report generation with mixed metrics

### Phase 4: Testing & Polish (Day 4-5)
- [ ] Test with various GA4 custom metrics
- [ ] Verify zero values display correctly
- [ ] Test error scenarios (invalid metric, deleted metric)
- [ ] Verify PDF layout with 1-15 metrics
- [ ] Cross-browser testing
- [ ] Mobile responsive check

### Phase 5: Documentation
- [ ] Update user documentation
- [ ] Add "How to find GA4 metric names" guide
- [ ] Document API endpoints for future reference

---

## 🧪 Testing Strategy

### Unit Tests
```typescript
// tests/lib/ga4-metadata.test.ts
describe('GA4 Metadata', () => {
  it('should fetch available metrics from GA4 property', async () => {
    const metrics = await fetchAvailableMetrics(mockToken, mockPropertyId);
    expect(metrics).toBeInstanceOf(Array);
    expect(metrics[0]).toHaveProperty('apiName');
  });
  
  it('should validate existing metric', async () => {
    const isValid = await validateMetric(mockToken, mockPropertyId, 'activeUsers');
    expect(isValid).toBe(true);
  });
  
  it('should reject invalid metric', async () => {
    const isValid = await validateMetric(mockToken, mockPropertyId, 'fake_metric');
    expect(isValid).toBe(false);
  });
});
```

### Integration Tests
```typescript
// tests/api/custom-metrics.test.ts
describe('Custom Metrics API', () => {
  it('should save custom metrics for client', async () => {
    const response = await fetch('/api/clients/test123/custom-metrics', {
      method: 'POST',
      body: JSON.stringify({
        customMetrics: [
          {
            id: 'custom_1',
            apiName: 'customEvent:test',
            displayName: 'Test Metric'
          }
        ]
      })
    });
    
    expect(response.ok).toBe(true);
  });
});
```

### Manual Testing Scenarios
1. **Happy Path**: Add custom metric → Select in report → Generate PDF → Verify display
2. **Invalid Metric**: Enter wrong API name → See validation error
3. **No Data**: Select metric with zero data → Verify "0" displays
4. **Mixed Metrics**: Select 10 predefined + 5 custom → Generate report → Verify all display
5. **PDF Layout**: Test with 1, 5, 10, 15 metrics → Verify layout adapts correctly

---

## 🚨 Error Handling

### Common Errors & Solutions

#### Error: "GA4 not connected"
**Cause**: Client doesn't have GA4 OAuth tokens
**Solution**: Redirect user to connect GA4 before accessing custom metrics

#### Error: "Metric not found"
**Cause**: User entered invalid GA4 metric API name
**Solution**: Display validation error with helpful message and link to GA4 docs

#### Error: "Custom metric returned no data"
**Cause**: Metric exists but has no data for date range
**Solution**: Display "0" in report (acceptable per requirements)

#### Error: "GA4 API quota exceeded"
**Cause**: Too many metadata or data requests
**Solution**: 
- Cache metadata for 24 hours
- Rate limit custom metric addition
- Display user-friendly error message

#### Error: "Custom metric was deleted in GA4"
**Cause**: User deleted metric from GA4 after saving in Reportr
**Solution**: 
- Skip metric during report generation
- Log warning
- Display notice to user: "Some custom metrics were unavailable"

---

## 🔒 Security Considerations

### Data Access
- ✅ Verify user owns client before fetching/saving custom metrics
- ✅ Validate all user inputs (metric names, display names)
- ✅ Sanitize metric API names before GA4 API calls
- ✅ Encrypt GA4 access tokens at rest (already implemented)

### API Quotas
- ✅ Rate limit metadata fetch: Max 1 call per minute per client
- ✅ Cache metadata responses for 24 hours
- ✅ Limit custom metrics per client: 10 maximum
- ✅ Implement exponential backoff for GA4 API failures

### Input Validation
```typescript
// Zod schema for custom metric validation
import { z } from 'zod';

export const customMetricSchema = z.object({
  apiName: z.string()
    .min(1)
    .max(100)
    .regex(/^[a-zA-Z0-9:_]+$/, 'Invalid metric name format'),
  displayName: z.string()
    .min(1)
    .max(50)
    .trim(),
  category: z.literal('custom'),
  format: z.enum(['number', 'percent', 'currency', 'time']).default('number'),
  isCustom: z.literal(true)
});
```

---

## 📊 Analytics & Monitoring

### Metrics to Track
- Number of clients using custom metrics
- Average custom metrics per client
- Most commonly added custom metrics (for potential addition to predefined list)
- Custom metric validation failure rate
- Report generation time with custom metrics vs without

### Monitoring Dashboard
```typescript
// Example analytics events to implement
analytics.track('custom_metric_added', {
  clientId,
  metricApiName,
  metricDisplayName
});

analytics.track('custom_metric_validation_failed', {
  clientId,
  attemptedMetricName,
  errorReason
});

analytics.track('report_generated_with_custom_metrics', {
  clientId,
  reportId,
  customMetricCount,
  totalMetricCount,
  generationTimeMs
});
```

---

## 🎯 Success Criteria

### Technical Success
- [ ] Custom metrics fetch successfully from GA4
- [ ] Custom metrics display correctly in PDFs
- [ ] Zero errors for metrics with no data
- [ ] PDF generation time remains <3 minutes
- [ ] No increase in error rates

### User Experience Success
- [ ] Users can add custom metric in <2 minutes
- [ ] Clear error messages for invalid metrics
- [ ] Consistent UI with existing metric selector
- [ ] Validation provides helpful feedback

### Business Success
- [ ] Feature adopted by >10% of users (if launched to all)
- [ ] No significant increase in support tickets
- [ ] Positive user feedback
- [ ] Potential for premium tier differentiation

---

## 🚀 Future Enhancements (Post-Phase 1)

### Phase 2 Ideas
1. **Auto-discovery UI**: Browse all available GA4 metrics with search
2. **Metric Templates**: Save/share custom metric sets
3. **Metric Descriptions**: Pull descriptions from GA4 metadata
4. **Compatibility Validation**: Warn when metrics can't be combined
5. **Metric Usage Analytics**: Show which custom metrics are most popular

### Phase 3 Ideas
1. **Calculated Metrics**: Create formulas combining multiple metrics
2. **Custom Dimensions**: Support custom dimensions, not just metrics
3. **Metric Benchmarking**: Compare custom metrics to industry averages
4. **AI Recommendations**: Suggest relevant custom metrics based on client industry

---

🚀 Phase 1: Custom Metrics - Granular Implementation Plan
Breaking Down into Deployable Micro-Steps
Let me break Phase 1 into small, independently deployable steps that we can build, test, and push to production incrementally without breaking anything.

📦 STEP 1: Database Foundation (30 minutes)
Goal: Add storage for custom metrics without touching any existing code
What to Build:
prisma// Add to Client model in schema.prisma
customMetrics Json? // Array of custom metric objects
Tasks:

✅ Open /prisma/schema.prisma
✅ Add customMetrics Json? field to Client model (after refreshToken)
✅ Run: npx prisma migrate dev --name add_custom_metrics_field
✅ Run: npx prisma generate
✅ Verify in database that field exists

Test:
bash# Check migration worked
npx prisma studio
# Navigate to Client table, verify customMetrics column exists
Deploy:
bashgit add prisma/schema.prisma prisma/migrations
git commit -m "feat: add customMetrics field to Client model"
git push
# Vercel will auto-deploy and run migrations
✅ Safe to deploy: Zero impact on existing functionality

📦 STEP 2: Custom Metric Type Definitions (15 minutes)
Goal: Add TypeScript types without changing any logic
What to Build:
New file: /src/types/custom-metrics.ts
typescriptexport interface CustomMetric {
  id: string;              // "custom_1", "custom_2", etc.
  apiName: string;         // GA4 API name: "customEvent:newsletter_signup"
  displayName: string;     // User-friendly: "Newsletter Signups"
  category: 'custom';
  format: 'number';
  isCustom: true;
}

export interface CustomMetricInput {
  apiName: string;
  displayName: string;
}
Tasks:

✅ Create file /src/types/custom-metrics.ts
✅ Add interfaces above
✅ Export from /src/types/index.ts (if it exists)

Test:
bashnpm run build
# Should compile with no errors
Deploy:
bashgit add src/types/custom-metrics.ts
git commit -m "feat: add CustomMetric type definitions"
git push
✅ Safe to deploy: Only adds types, no runtime changes

📦 STEP 3: Read-Only API Endpoint (45 minutes)
Goal: Create API to fetch client's custom metrics (empty array for now)
What to Build:
New file: /src/app/api/clients/[id]/custom-metrics/route.ts
typescriptimport { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

/**
 * GET /api/clients/[id]/custom-metrics
 * Returns custom metrics for a client (empty array initially)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Fetch client and verify ownership
    const client = await prisma.client.findUnique({
      where: { 
        id: params.id,
        userId: session.user.id 
      }
    });
    
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }
    
    // Return custom metrics (will be empty initially)
    const customMetrics = client.customMetrics || [];
    
    return NextResponse.json({
      success: true,
      metrics: customMetrics
    });
    
  } catch (error) {
    console.error('Error fetching custom metrics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
Tasks:

✅ Create directory: /src/app/api/clients/[id]/custom-metrics/
✅ Create file: route.ts with code above
✅ Test locally with existing client

Test:
bash# Start dev server
npm run dev

# Test with curl (replace CLIENT_ID with real ID from your database)
curl http://localhost:3000/api/clients/[CLIENT_ID]/custom-metrics \
  -H "Cookie: [your-session-cookie]"

# Expected: { "success": true, "metrics": [] }
Deploy:
bashgit add src/app/api/clients/[id]/custom-metrics/route.ts
git commit -m "feat: add GET endpoint for custom metrics"
git push
✅ Safe to deploy: Read-only endpoint, returns empty array

📦 STEP 4: Write API Endpoint (30 minutes)
Goal: Allow saving custom metrics to database
What to Build:
Add POST handler to same file: /src/app/api/clients/[id]/custom-metrics/route.ts
typescriptimport { CustomMetric } from '@/types/custom-metrics';

/**
 * POST /api/clients/[id]/custom-metrics
 * Save custom metrics for a client
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const { customMetrics } = body;
    
    // Validate input
    if (!Array.isArray(customMetrics)) {
      return NextResponse.json(
        { error: 'customMetrics must be an array' },
        { status: 400 }
      );
    }
    
    // Limit to 10 custom metrics
    if (customMetrics.length > 10) {
      return NextResponse.json(
        { error: 'Maximum 10 custom metrics allowed' },
        { status: 400 }
      );
    }
    
    // Update client
    const client = await prisma.client.update({
      where: {
        id: params.id,
        userId: session.user.id
      },
      data: {
        customMetrics: customMetrics
      }
    });
    
    return NextResponse.json({
      success: true,
      customMetrics: client.customMetrics
    });
    
  } catch (error) {
    console.error('Error saving custom metrics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
Tasks:

✅ Add POST handler to existing route file
✅ Import CustomMetric type
✅ Test locally with Postman/Thunder Client

Test:
bash# Test POST with curl
curl -X POST http://localhost:3000/api/clients/[CLIENT_ID]/custom-metrics \
  -H "Content-Type: application/json" \
  -H "Cookie: [your-session-cookie]" \
  -d '{
    "customMetrics": [
      {
        "id": "custom_1",
        "apiName": "activeUsers",
        "displayName": "Test Metric",
        "category": "custom",
        "format": "number",
        "isCustom": true
      }
    ]
  }'

# Then GET to verify it saved
curl http://localhost:3000/api/clients/[CLIENT_ID]/custom-metrics \
  -H "Cookie: [your-session-cookie]"
Deploy:
bashgit add src/app/api/clients/[id]/custom-metrics/route.ts
git commit -m "feat: add POST endpoint to save custom metrics"
git push
✅ Safe to deploy: Writes to new field, doesn't affect existing reports

📦 STEP 5: Simple UI Component - Add Metric Modal (1 hour)
Goal: Create basic modal to add ONE custom metric manually
What to Build:
New file: /src/components/organisms/AddCustomMetricModal.tsx
typescript'use client';

import { useState } from 'react';
import { CustomMetric } from '@/types/custom-metrics';

interface AddCustomMetricModalProps {
  clientId: string;
  onSave: (metric: CustomMetric) => void;
  onCancel: () => void;
}

export function AddCustomMetricModal({ 
  clientId, 
  onSave, 
  onCancel 
}: AddCustomMetricModalProps) {
  const [apiName, setApiName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  async function handleSave() {
    // Basic validation
    if (!apiName.trim() || !displayName.trim()) {
      setError('Both fields are required');
      return;
    }
    
    setIsSaving(true);
    setError(null);
    
    try {
      const newMetric: CustomMetric = {
        id: `custom_${Date.now()}`,
        apiName: apiName.trim(),
        displayName: displayName.trim(),
        category: 'custom',
        format: 'number',
        isCustom: true
      };
      
      // For now, just save directly (we'll add validation in next step)
      const response = await fetch(
        `/api/clients/${clientId}/custom-metrics`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            customMetrics: [newMetric]
          })
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to save metric');
      }
      
      onSave(newMetric);
      
    } catch (err) {
      setError('Error saving metric. Please try again.');
      console.error('Save error:', err);
    } finally {
      setIsSaving(false);
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">Add Custom Metric</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g., Newsletter Signups"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              disabled={isSaving}
            />
            <p className="text-xs text-gray-500 mt-1">
              How this metric will appear in reports
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              GA4 Metric API Name
            </label>
            <input
              type="text"
              value={apiName}
              onChange={(e) => setApiName(e.target.value)}
              placeholder="e.g., customEvent:newsletter_signup"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              disabled={isSaving}
            />
            <p className="text-xs text-gray-500 mt-1">
              The exact metric name from GA4
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-900">{error}</p>
            </div>
          )}
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Add Metric'}
          </button>
        </div>
      </div>
    </div>
  );
}
Tasks:

✅ Create file /src/components/organisms/AddCustomMetricModal.tsx
✅ Test component in isolation (Storybook or dedicated test page)

Test:
Create test page: /src/app/test-custom-metrics/page.tsx
typescript'use client';
import { useState } from 'react';
import { AddCustomMetricModal } from '@/components/organisms/AddCustomMetricModal';

export default function TestPage() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className="p-8">
      <button onClick={() => setShowModal(true)}>Test Modal</button>
      {showModal && (
        <AddCustomMetricModal
          clientId="test-client-id"
          onSave={(metric) => {
            console.log('Saved:', metric);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
Deploy:
bashgit add src/components/organisms/AddCustomMetricModal.tsx
git commit -m "feat: add AddCustomMetricModal component"
git push
✅ Safe to deploy: Component not integrated yet, no user-facing changes

📦 STEP 6: Integrate Modal into Metric Selector (45 minutes)
Goal: Add "Custom Metrics" section to existing metric selector modal
What to Build:
Modify: /src/components/organisms/MetricSelectorModal.tsx (or wherever it is)
Find the file first, then add:
typescriptimport { useState, useEffect } from 'react';
import { AddCustomMetricModal } from './AddCustomMetricModal';
import { CustomMetric } from '@/types/custom-metrics';

// Inside the component:
const [customMetrics, setCustomMetrics] = useState<CustomMetric[]>([]);
const [showAddModal, setShowAddModal] = useState(false);
const [isLoadingCustom, setIsLoadingCustom] = useState(false);

// Fetch custom metrics on mount
useEffect(() => {
  async function loadCustomMetrics() {
    if (!clientId) return;
    
    setIsLoadingCustom(true);
    try {
      const response = await fetch(`/api/clients/${clientId}/custom-metrics`);
      const data = await response.json();
      
      if (data.success && Array.isArray(data.metrics)) {
        setCustomMetrics(data.metrics);
      }
    } catch (error) {
      console.error('Failed to load custom metrics:', error);
    } finally {
      setIsLoadingCustom(false);
    }
  }
  
  loadCustomMetrics();
}, [clientId]);

// Add to render (after existing categories):
<div className="mt-8 border-t pt-6">
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      <span className="text-2xl">⚙️</span>
      <h3 className="text-lg font-semibold">Custom Metrics</h3>
    </div>
    <button
      onClick={() => setShowAddModal(true)}
      className="text-sm text-brand-600 hover:text-brand-700 font-medium"
    >
      + Add Custom Metric
    </button>
  </div>
  
  {isLoadingCustom ? (
    <p className="text-gray-500 text-sm">Loading custom metrics...</p>
  ) : customMetrics.length === 0 ? (
    <div className="text-center py-8 bg-gray-50 rounded-lg">
      <p className="text-gray-600 mb-2">No custom metrics yet</p>
      <button
        onClick={() => setShowAddModal(true)}
        className="text-sm text-brand-600 hover:text-brand-700"
      >
        Add your first custom metric
      </button>
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-4">
      {customMetrics.map((metric) => (
        <MetricCard
          key={metric.id}
          metric={{
            id: metric.id,
            title: metric.displayName,
            description: 'Custom GA4 metric',
            category: 'custom'
          }}
          selected={selectedMetrics.includes(metric.id)}
          onToggle={() => handleMetricToggle(metric.id)}
        />
      ))}
    </div>
  )}
</div>

{/* Add modal at end */}
{showAddModal && (
  <AddCustomMetricModal
    clientId={clientId}
    onSave={(newMetric) => {
      setCustomMetrics([...customMetrics, newMetric]);
      setShowAddModal(false);
    }}
    onCancel={() => setShowAddModal(false)}
  />
)}
Tasks:

✅ Find the MetricSelectorModal component file
✅ Add custom metrics section after existing categories
✅ Test in dev with real client

Deploy:
bashgit add src/components/organisms/MetricSelectorModal.tsx
git commit -m "feat: integrate custom metrics into metric selector"
git push
✅ Safe to deploy: Users can now add custom metrics, but they won't affect reports yet

🎉 CHECKPOINT: Test End-to-End Flow
At this point, you should be able to:

✅ Open a client
✅ Click "Generate Custom Report"
✅ See "Custom Metrics" section at bottom
✅ Click "+ Add Custom Metric"
✅ Enter name and API name
✅ Save
✅ See it appear in the list
✅ Select it (checkbox)
✅ Click "Save Selection"

📦 STEP 7: Update Metric Mapping System (45 minutes)
Goal: Make the system recognize custom metrics alongside predefined ones
What to Build:
Modify: /src/lib/integrations/analytics.ts (or wherever METRIC_MAPPING exists)
First, find where METRIC_MAPPING is defined, then add these functions:
typescriptimport { CustomMetric } from '@/types/custom-metrics';

// Add this helper function after METRIC_MAPPING definition
export function getMetricConfig(
  metricId: string,
  customMetrics: CustomMetric[] = []
): any {
  // Check predefined metrics first
  if (METRIC_MAPPING[metricId]) {
    return METRIC_MAPPING[metricId];
  }
  
  // Check custom metrics
  const customMetric = customMetrics.find(m => m.id === metricId);
  if (customMetric) {
    return {
      apiName: customMetric.apiName,
      displayName: customMetric.displayName,
      description: 'Custom GA4 metric',
      category: 'custom',
      format: customMetric.format,
      isCustom: true
    };
  }
  
  return null;
}

// Add this helper to build GA4 requests with mixed metrics
export function buildMetricsForGA4Request(
  selectedMetrics: string[],
  customMetrics: CustomMetric[] = []
): string[] {
  return selectedMetrics
    .map(metricId => {
      const config = getMetricConfig(metricId, customMetrics);
      if (!config) {
        console.warn(`Unknown metric: ${metricId}, skipping`);
        return null;
      }
      return config.apiName;
    })
    .filter((apiName): apiName is string => apiName !== null);
}
Tasks:

✅ Locate the file containing METRIC_MAPPING
✅ Add the two helper functions above
✅ Test that they don't break existing functionality

Test:
typescript// Test in browser console or create test file
import { getMetricConfig, buildMetricsForGA4Request } from '@/lib/integrations/analytics';

const customMetrics = [{
  id: 'custom_1',
  apiName: 'customEvent:test',
  displayName: 'Test Metric',
  category: 'custom',
  format: 'number',
  isCustom: true
}];

// Should return predefined metric config
console.log(getMetricConfig('users', []));

// Should return custom metric config
console.log(getMetricConfig('custom_1', customMetrics));

// Should build array with both types
console.log(buildMetricsForGA4Request(['users', 'custom_1'], customMetrics));
// Expected: ['activeUsers', 'customEvent:test']
Deploy:
bashgit add src/lib/integrations/analytics.ts
git commit -m "feat: add custom metric lookup helpers"
git push
✅ Safe to deploy: Only adds functions, doesn't change existing behavior

📦 STEP 8: Update Report Data Fetching (1 hour)
Goal: Fetch custom metrics from GA4 when generating reports
What to Build:
Modify: The report generation file that fetches GA4 data
Find the function that fetches GA4 data (likely in /src/lib/services/report-generator.ts or /src/app/api/reports/generate/route.ts)
Add custom metrics support:
typescriptimport { CustomMetric } from '@/types/custom-metrics';
import { getMetricConfig, buildMetricsForGA4Request } from '@/lib/integrations/analytics';

// In the report generation function, fetch client with custom metrics:
const client = await prisma.client.findUnique({
  where: { id: clientId },
  include: { user: true }
});

if (!client) {
  throw new Error('Client not found');
}

// Get custom metrics configuration
const customMetrics = (client.customMetrics as CustomMetric[]) || [];

// When building the GA4 request, use the helper:
const metricApiNames = buildMetricsForGA4Request(
  selectedMetrics, 
  customMetrics
);

// Make the GA4 API call with these metrics
const ga4Response = await fetchGA4Data({
  propertyId: client.gaPropertyId,
  accessToken: client.accessToken,
  metrics: metricApiNames, // Use the API names
  dateRange: { startDate, endDate }
});

// Map the GA4 response back to metric IDs
const ga4Data: Record<string, any> = {};
selectedMetrics.forEach((metricId, index) => {
  const value = ga4Response.rows?.[0]?.metricValues?.[index]?.value || '0';
  ga4Data[metricId] = value;
});

// Include in report data for PDF generation
const reportData = {
  selectedMetrics,
  customMetrics, // Pass custom metric configs to PDF
  ga4Data,
  gscData,
  pageSpeedData,
  // ... other data
};
Tasks:

✅ Find the report generation function
✅ Add custom metrics fetching from client
✅ Update GA4 request building
✅ Map responses back to metric IDs
✅ Pass customMetrics to reportData

Test:
bash# Generate a report with 1 custom metric + 1 predefined metric
# Check console logs to verify:
# 1. Custom metrics loaded from client
# 2. GA4 request includes custom metric API name
# 3. Response mapped correctly
# 4. reportData contains both metrics
Deploy:
bashgit add src/lib/services/report-generator.ts  # or wherever it is
git commit -m "feat: fetch custom metrics in report generation"
git push
✅ Safe to deploy: Custom metrics are fetched but PDF won't show them yet (next step)

📦 STEP 9: Update PDF Template (45 minutes)
Goal: Display custom metrics in the PDF alongside predefined ones
What to Build:
Modify: /src/components/pdf/templates/CustomReportTemplate.tsx
Find the allMetrics object definition (around line 42) and add custom metrics dynamically:
typescriptexport function CustomReportTemplate({ data }: PDFTemplateProps) {
  const pdfStyles = createPDFStyles(data.branding)
  const styles = createStyleSheet(pdfStyles)
  
  // Get selected metrics and organize them
  const selectedMetrics = data.selectedMetrics || []
  
  // NEW: Get custom metrics from data
  const customMetricsList = (data.customMetrics || []) as CustomMetric[]
  
  // Define all available metrics with their sources
  const allMetrics = {
    // ... existing predefined metrics (users, sessions, etc.)
    users: { value: data.ga4Data?.users || 0, title: 'Total Users', description: 'Unique website visitors', source: 'ga4' },
    sessions: { value: data.ga4Data?.sessions || 0, title: 'Total Sessions', description: 'Website visits', source: 'ga4' },
    // ... all other existing metrics
    
    // NEW: Add custom metrics dynamically
    ...customMetricsList.reduce((acc, customMetric) => {
      acc[customMetric.id] = {
        value: data.ga4Data?.[customMetric.id] || 0,
        title: customMetric.displayName,
        description: 'Custom GA4 metric',
        source: 'ga4_custom', // New source type
        isCustom: true // Flag to identify custom metrics
      }
      return acc
    }, {} as Record<string, any>)
  }
  
  // Rest of the template continues as normal...
  // The existing dynamic rendering will automatically handle custom metrics!
Optional: Add a visual badge for custom metrics in the PDF:
tsx// In the metric display section (where metrics are rendered):
<View key={metricId} style={styles.metricCard}>
  <Text style={styles.metricName}>
    {display.displayName}
    {/* NEW: Add custom badge */}
    {display.isCustom && (
      <Text style={styles.customBadge}> (Custom)</Text>
    )}
  </Text>
  <Text style={styles.metricValue}>
    {formatMetricValue(display.value, display.format)}
  </Text>
</View>
Add custom badge style:
typescriptconst styles = StyleSheet.create({
  // ... existing styles
  
  customBadge: {
    fontSize: 9,
    color: pdfStyles.colors.primary, // Brand color
    fontWeight: 'bold',
    fontStyle: 'italic'
  }
});
Tasks:

✅ Open /src/components/pdf/templates/CustomReportTemplate.tsx
✅ Find the allMetrics object definition
✅ Add the custom metrics merge code above
✅ (Optional) Add custom badge styling
✅ Test PDF generation

Test:
bash# Generate a custom report with:
# - 2 predefined metrics (e.g., users, sessions)
# - 1 custom metric

# Verify in generated PDF:
# 1. All 3 metrics display
# 2. Custom metric shows correct name
# 3. Custom metric shows data value (or 0)
# 4. (Optional) Custom badge appears
# 5. Layout adapts correctly
Deploy:
bashgit add src/components/pdf/templates/CustomReportTemplate.tsx
git commit -m "feat: display custom metrics in PDF reports"
git push
✅ Safe to deploy: Custom metrics now fully functional end-to-end!

📦 STEP 10: Error Handling & Polish (1 hour)
Goal: Handle edge cases and improve UX
What to Build:
A. Handle Invalid Metric API Names
Modify: /src/lib/services/report-generator.ts (or wherever GA4 is called)
typescript// Wrap GA4 call in try-catch
try {
  const ga4Response = await fetchGA4Data({
    propertyId: client.gaPropertyId,
    accessToken: client.accessToken,
    metrics: metricApiNames,
    dateRange: { startDate, endDate }
  });
  
  // Map response
  selectedMetrics.forEach((metricId, index) => {
    const value = ga4Response.rows?.[0]?.metricValues?.[index]?.value || '0';
    ga4Data[metricId] = value;
  });
  
} catch (error) {
  console.error('GA4 API error:', error);
  
  // If custom metrics caused the error, still continue with predefined metrics
  // Fill custom metrics with '0'
  selectedMetrics.forEach(metricId => {
    if (!ga4Data[metricId]) {
      ga4Data[metricId] = '0'; // Default to zero
    }
  });
}
B. Add Delete Custom Metric
Modify: /src/app/api/clients/[id]/custom-metrics/route.ts
typescript/**
 * DELETE /api/clients/[id]/custom-metrics
 * Delete a specific custom metric
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(req.url);
    const metricId = searchParams.get('metricId');
    
    if (!metricId) {
      return NextResponse.json(
        { error: 'metricId required' },
        { status: 400 }
      );
    }
    
    // Get current client
    const client = await prisma.client.findUnique({
      where: { id: params.id, userId: session.user.id }
    });
    
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }
    
    // Filter out the metric
    const currentMetrics = (client.customMetrics as CustomMetric[]) || [];
    const updatedMetrics = currentMetrics.filter(m => m.id !== metricId);
    
    // Update client
    await prisma.client.update({
      where: { id: params.id },
      data: { customMetrics: updatedMetrics }
    });
    
    return NextResponse.json({
      success: true,
      customMetrics: updatedMetrics
    });
    
  } catch (error) {
    console.error('Error deleting custom metric:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
C. Add Delete Button to UI
Modify: /src/components/organisms/MetricSelectorModal.tsx
tsx// Update the custom metrics rendering to include delete button
{customMetrics.map((metric) => (
  <div key={metric.id} className="relative">
    <MetricCard
      metric={{
        id: metric.id,
        title: metric.displayName,
        description: metric.apiName, // Show API name in description
        category: 'custom'
      }}
      selected={selectedMetrics.includes(metric.id)}
      onToggle={() => handleMetricToggle(metric.id)}
    />
    
    {/* Delete button */}
    <button
      onClick={async () => {
        if (confirm(`Delete "${metric.displayName}"?`)) {
          try {
            const response = await fetch(
              `/api/clients/${clientId}/custom-metrics?metricId=${metric.id}`,
              { method: 'DELETE' }
            );
            
            if (response.ok) {
              setCustomMetrics(customMetrics.filter(m => m.id !== metric.id));
            }
          } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete metric');
          }
        }
      }}
      className="absolute top-2 right-2 p-1 bg-red-100 hover:bg-red-200 rounded text-red-600"
      title="Delete custom metric"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    </button>
  </div>
))}
D. Add Loading States
Modify: /src/components/organisms/AddCustomMetricModal.tsx
tsx// Already has isSaving state, just ensure all buttons respect it:
<button
  onClick={handleSave}
  className="flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
  disabled={isSaving || !apiName.trim() || !displayName.trim()}
>
  {isSaving ? (
    <span className="flex items-center justify-center gap-2">
      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      Saving...
    </span>
  ) : (
    'Add Metric'
  )}
</button>
E. Add Help Text / Documentation Link
Modify: /src/components/organisms/AddCustomMetricModal.tsx
Add below the input fields:
tsx<div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
  <p className="text-sm text-blue-900 font-medium mb-2">
    How to find your GA4 metric names:
  </p>
  <ol className="text-xs text-blue-800 space-y-1 ml-4 list-decimal">
    <li>Go to your GA4 property</li>
    <li>Navigate to <strong>Admin → Custom definitions</strong></li>
    <li>Find your custom metric</li>
    <li>Copy the API name (e.g., "customEvent:newsletter_signup")</li>
  </ol>
  
    href="https://support.google.com/analytics/answer/10075209"
    target="_blank"
    rel="noopener noreferrer"
    className="text-xs text-blue-600 hover:text-blue-700 underline mt-2 inline-block"
  >
    Learn more about GA4 custom metrics →
  </a>
</div>
Tasks:

✅ Add error handling to GA4 fetch
✅ Add DELETE endpoint
✅ Add delete button to UI
✅ Improve loading states
✅ Add help documentation

Test Complete Flow:
bash# Test each scenario:
1. Add custom metric with valid GA4 metric name → Works
2. Add custom metric with invalid name → Shows 0 in report (doesn't break)
3. Delete custom metric → Removed from list
4. Generate report with 3 custom + 5 predefined metrics → All display correctly
5. Generate report with custom metric that has no data → Shows 0
Deploy:
bashgit add .
git commit -m "feat: add error handling and polish for custom metrics"
git push
✅ Safe to deploy: Feature complete with proper error handling!

🎉 FINAL CHECKPOINT: End-to-End Test
Complete User Flow Test:

✅ Log in to Reportr
✅ Navigate to a client
✅ Click "Generate Custom Report"
✅ Scroll to "Custom Metrics" section
✅ Click "+ Add Custom Metric"
✅ Enter:

Display Name: "Newsletter Signups"
API Name: "customEvent:newsletter_signup" (or any real GA4 metric from their property)


✅ Click "Add Metric"
✅ See metric appear in list
✅ Select checkbox for custom metric + 2-3 predefined metrics
✅ Click "Save Selection"
✅ Click "Generate Report"
✅ Wait for report generation
✅ Download PDF
✅ Verify custom metric appears with correct name and value (or 0)
✅ Verify predefined metrics still work correctly
✅ Test delete: Remove custom metric, verify it's gone

Edge Cases to Test:

❌ Invalid GA4 metric name → Shows 0, doesn't break report
❌ GA4 returns no data for custom metric → Shows 0
✅ Mix 10 predefined + 5 custom metrics → All 15 display correctly
✅ Custom metric with long name → Truncates gracefully in PDF
✅ Delete metric that's selected for report → Deselects automatically


📊 Success Metrics
After deployment, monitor:

✅ Number of users who add custom metrics (expect 5-10% initially)
✅ Custom metrics added per user (target: 2-3 average)
✅ Report generation success rate (should stay >98%)
✅ PDF generation time (should stay <3 minutes)
✅ Support tickets related to custom metrics (target: <5% of all tickets)


🎯 Phase 1 Complete!
You now have a fully functional custom metrics feature that:

✅ Allows users to add GA4 custom metrics manually
✅ Stores custom metrics per client
✅ Fetches custom metric data from GA4
✅ Displays custom metrics in PDF reports
✅ Handles errors gracefully (invalid metrics show as 0)
✅ Provides delete functionality
✅ Has proper loading states and UX polish

What's NOT included in Phase 1 (for Phase 2 later):

❌ Auto-discovery of available GA4 metrics (metadata API)
❌ Validation of metric names before saving
❌ Metric compatibility checking
❌ Saved metric templates
❌ Metric descriptions from GA4

These are deliberate omissions to keep Phase 1 simple and deployable quickly!

---

PROMPTS FOR IMPLEMEMTATION

# TASK: Add Custom Metrics Database Field (Step 1 of 10)

## 🚨 CRITICAL SAFETY RULES - READ FIRST

### Non-Negotiable Requirements:
1. **DO NOT BREAK EXISTING FUNCTIONALITY** - All current reports (Executive, Standard, Custom) must continue working exactly as they do now
2. **DO NOT MODIFY WORKING CODE** - If code is working, leave it alone unless explicitly instructed
3. **ADDITIVE ONLY** - You are ONLY adding new functionality, not changing existing features
4. **TEST EXISTING FEATURES** - After every change, verify existing report generation still works
5. **ROLLBACK READY** - If anything breaks, immediately revert your changes

### What's Currently Working (DO NOT BREAK):
- ✅ User authentication and sessions
- ✅ Client management (add, edit, delete)
- ✅ Google OAuth connection (GSC, GA4)
- ✅ Report generation (Executive, Standard, Custom reports)
- ✅ PDF generation with white-label branding
- ✅ Metric selector modal with 30+ predefined metrics
- ✅ PayPal subscription billing
- ✅ Plan limits and tier restrictions

### If You Break Something:
1. Stop immediately
2. Revert your changes: `git checkout -- .`
3. Report the error to me
4. Do NOT attempt to fix existing code without permission

---

## Objective
Add a new `customMetrics` JSON field to the Client model in the Prisma schema to store user-defined GA4 custom metrics. This is a foundation-only change with ZERO impact on existing functionality.

## What You Need to Do

### 1. Locate and Modify Prisma Schema
**File**: `/prisma/schema.prisma`

Find the `Client` model and add ONE new field:
```prisma
model Client {
  id              String    @id @default(cuid())
  name            String
  domain          String
  userId          String
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Google API tokens
  gscSiteUrl      String?
  gaPropertyId    String?
  accessToken     String?
  refreshToken    String?
  
  // NEW: Add this line after refreshToken
  customMetrics   Json?     // Stores array of custom metric objects
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  reports         Report[]
}
```

**Important**: 
- Add the field AFTER `refreshToken` and BEFORE `createdAt`
- Use exact field name: `customMetrics` (camelCase)
- Type must be: `Json?` (capital J, with question mark for optional)
- Add the comment exactly as shown
- **DO NOT MODIFY ANY OTHER FIELDS IN THIS MODEL**
- **DO NOT MODIFY ANY OTHER MODELS**

### 2. Create Database Migration
Run these commands in order:
```bash
# Create migration
npx prisma migrate dev --name add_custom_metrics_field

# Regenerate Prisma Client
npx prisma generate
```

### 3. Verify Changes
After running the commands above, verify:

1. **Check migration file created**: Look in `/prisma/migrations/` for a new folder with today's timestamp
2. **Check Prisma Client updated**: Run `npx prisma studio` and verify the Client table shows the new `customMetrics` column
3. **Verify existing data intact**: In Prisma Studio, check that all existing Client records are unchanged (customMetrics will be null - that's correct!)

### 4. CRITICAL: Test Existing Functionality
Before committing, verify these still work:
```bash
# Start dev server
npm run dev

# In browser, test:
1. Log in to the application
2. Navigate to a client
3. Try generating ANY type of report (Executive, Standard, or Custom)
4. Verify report generates successfully
5. Verify PDF downloads correctly
```

**If ANY of the above fails, STOP and revert your changes immediately.**

## Expected Output

You should see output like:
✔ Generated Prisma Client
✓ Migration created successfully
✓ Applied migration: 20250109_add_custom_metrics_field

## Verification Steps

1. Open Prisma Studio:
```bash
   npx prisma studio
```

2. Navigate to the `Client` table

3. Verify you see a `customMetrics` column (it will be empty/null for all existing records - that's correct!)

4. **IMPORTANT**: Check 2-3 existing client records and verify ALL their other fields are unchanged

## Success Criteria
- ✅ Prisma schema file updated with new field
- ✅ Migration created in `/prisma/migrations/`
- ✅ Prisma Client regenerated (no TypeScript errors)
- ✅ Column visible in Prisma Studio
- ✅ Existing client records unchanged (customMetrics is null)
- ✅ **Existing report generation still works**
- ✅ **No TypeScript compilation errors**
- ✅ **Application starts without errors**

## What NOT to Do
- ❌ Do NOT modify any other models
- ❌ Do NOT change any existing fields
- ❌ Do NOT add seed data
- ❌ Do NOT modify any application code (yet)
- ❌ Do NOT change any API routes
- ❌ Do NOT touch PDF generation code
- ❌ Do NOT modify metric selector UI

## Safety Checklist Before Commit

Go through this checklist:
- [ ] Only `schema.prisma` and migration files modified
- [ ] No changes to any `.ts`, `.tsx`, or `.js` files
- [ ] Application compiles without errors: `npm run build`
- [ ] Existing report generation tested and working
- [ ] No new TypeScript errors in VS Code
- [ ] Prisma Client regenerated successfully

## Git Commit Message
After verification, use this commit message:
```bash
git add prisma/schema.prisma prisma/migrations/
git commit -m "feat(db): add customMetrics field to Client model for GA4 custom metrics storage

- Added optional Json field to store custom metric configurations
- No changes to existing functionality
- All existing reports continue working normally"
```

## If Something Goes Wrong

**Migration Conflict:**
```bash
# If migration fails due to conflicts
npx prisma migrate reset  # WARNING: This resets dev database
npx prisma migrate dev
```

**Need to Rollback:**
```bash
# Revert schema changes
git checkout HEAD -- prisma/schema.prisma

# Delete the migration folder you just created
rm -rf prisma/migrations/[TIMESTAMP]_add_custom_metrics_field

# Regenerate client
npx prisma generate
```

## Questions to Ask Me
If you encounter:
- Migration conflicts
- Existing `customMetrics` field already present
- Database connection errors
- TypeScript errors after running prisma generate
- ANY errors when testing existing report generation

**STOP and ask me before proceeding.**

## Next Step Preview
After this is complete and verified, Step 2 will add TypeScript type definitions for custom metrics. This step makes NO changes to application logic.

# TASK: Add Custom Metric Type Definitions (Step 2 of 10)

## 🚨 CRITICAL SAFETY RULES - READ FIRST

### Non-Negotiable Requirements:
1. **DO NOT BREAK EXISTING FUNCTIONALITY** - All current features must continue working
2. **DO NOT MODIFY WORKING CODE** - If it works, don't touch it unless explicitly told
3. **ADDITIVE ONLY** - You are ONLY adding new functionality
4. **TEST AFTER CHANGES** - Verify existing features still work after your changes
5. **ROLLBACK READY** - If anything breaks, immediately revert

### What's Currently Working (DO NOT BREAK):
- ✅ User authentication and sessions
- ✅ Client management (add, edit, delete)
- ✅ Google OAuth connection (GSC, GA4)
- ✅ Report generation (Executive, Standard, Custom)
- ✅ PDF generation with white-label branding
- ✅ Metric selector with predefined metrics
- ✅ PayPal billing

### If You Break Something:
1. Stop immediately
2. Revert changes: `git checkout -- .`
3. Report error to user
4. Do NOT attempt fixes without permission

---

## Objective
Create TypeScript type definitions for custom metrics. This is a types-only addition with ZERO runtime impact on existing functionality.

## What You Need to Do

### 1. Create New Types File
**New File**: `/src/types/custom-metrics.ts`

Create this file with the following content:
```typescript
/**
 * Custom Metric Type Definitions
 * 
 * These types define the structure for user-defined GA4 custom metrics
 * that can be added to Custom Reports alongside predefined metrics.
 */

/**
 * CustomMetric - The complete custom metric object stored in the database
 * and used throughout the application
 */
export interface CustomMetric {
  id: string;              // Unique identifier: "custom_1", "custom_2", etc.
  apiName: string;         // GA4 API metric name: e.g., "customEvent:newsletter_signup"
  displayName: string;     // User-friendly name: e.g., "Newsletter Signups"
  category: 'custom';      // Always 'custom' to distinguish from predefined metrics
  format: 'number';        // Default format (Phase 1 only supports 'number')
  isCustom: true;          // Flag to easily identify custom metrics
}

/**
 * CustomMetricInput - Simplified input type for creating new custom metrics
 * Used in forms and API requests
 */
export interface CustomMetricInput {
  apiName: string;         // The GA4 metric API name
  displayName: string;     // The display name for reports
}

/**
 * Type guard to check if a metric is a custom metric
 */
export function isCustomMetric(metric: any): metric is CustomMetric {
  return (
    typeof metric === 'object' &&
    metric !== null &&
    'isCustom' in metric &&
    metric.isCustom === true
  );
}
```

### 2. Update Types Index (If It Exists)
**Check if this file exists**: `/src/types/index.ts`

**If it EXISTS**, add this export to the END of the file:
```typescript
export * from './custom-metrics';
```

**If it DOES NOT exist**, skip this step.

### 3. Verify TypeScript Compilation
Run these commands to ensure no errors:
```bash
# Check TypeScript compilation
npm run build

# Or if that doesn't work, try:
npx tsc --noEmit
```

**Expected Result**: Should compile with NO errors (warnings are OK).

## Expected Output

After running `npm run build` or `npx tsc --noEmit`, you should see:
✓ Compiled successfully

Or no output (which means success for tsc --noEmit).

## Verification Steps

1. **File created**: Verify `/src/types/custom-metrics.ts` exists
2. **No TypeScript errors**: Run `npm run build` successfully
3. **Existing code unaffected**: No changes to any other files
4. **Can import types**: Test import in your terminal/REPL:
```typescript
   import { CustomMetric } from '@/types/custom-metrics'
   // Should not error
```

## Success Criteria
- ✅ New file `/src/types/custom-metrics.ts` created
- ✅ All type definitions included (CustomMetric, CustomMetricInput, isCustomMetric)
- ✅ TypeScript compiles without errors
- ✅ No modifications to any existing files (except possibly types/index.ts)
- ✅ Application still runs: `npm run dev` works

## What NOT to Do
- ❌ Do NOT modify any existing type files
- ❌ Do NOT add these types to component files yet
- ❌ Do NOT create any runtime code (only types)
- ❌ Do NOT modify any API routes
- ❌ Do NOT touch any UI components

## Safety Checklist Before Commit

Go through this checklist:
- [ ] Only new file created (and possibly types/index.ts modified)
- [ ] No changes to any component files
- [ ] No changes to any API route files
- [ ] TypeScript compiles: `npm run build` succeeds
- [ ] Application starts: `npm run dev` works
- [ ] No new errors in console

## Git Commit Message
After verification, use this commit message:
```bash
git add src/types/custom-metrics.ts
# If you modified types/index.ts, also add it:
# git add src/types/index.ts

git commit -m "feat(types): add CustomMetric type definitions

- Added CustomMetric interface for user-defined GA4 metrics
- Added CustomMetricInput for form/API inputs
- Added type guard helper function
- Types only, no runtime changes"
```

## If Something Goes Wrong

**TypeScript Errors:**
```bash
# Check what's causing the error
npm run build

# If it's in the new file, fix the syntax
# If it's in existing files, you broke something - REVERT:
git checkout -- .
```

**File Already Exists:**
If `/src/types/custom-metrics.ts` already exists, tell me - do NOT overwrite it.

## Questions to Ask Me
If you encounter:
- Existing custom-metrics.ts file
- TypeScript compilation errors
- Import path issues (@/types vs relative paths)
- Conflicts with existing type definitions

**STOP and ask me before proceeding.**

## Next Step Preview
After this is complete and verified, Step 3 will create a read-only API endpoint that returns an empty array of custom metrics (testing the infrastructure without affecting existing reports).

## Final Verification Command
Before committing, run this to ensure nothing broke:
```bash
# Should complete without errors
npm run build && echo "✅ Step 2 Complete - TypeScript types added successfully"
```



# TASK: Create Read-Only Custom Metrics API Endpoint (Step 3 of 10)

## 🚨 CRITICAL SAFETY RULES - READ FIRST

### Non-Negotiable Requirements:
1. **DO NOT BREAK EXISTING FUNCTIONALITY** - All current features must continue working
2. **DO NOT MODIFY WORKING CODE** - If it works, don't touch it unless explicitly told
3. **ADDITIVE ONLY** - You are ONLY adding new functionality
4. **TEST AFTER CHANGES** - Verify existing features still work after your changes
5. **ROLLBACK READY** - If anything breaks, immediately revert

### What's Currently Working (DO NOT BREAK):
- ✅ User authentication and sessions
- ✅ Client management (add, edit, delete)
- ✅ Google OAuth connection (GSC, GA4)
- ✅ Report generation (Executive, Standard, Custom)
- ✅ PDF generation with white-label branding
- ✅ Metric selector with predefined metrics
- ✅ PayPal billing

### If You Break Something:
1. Stop immediately
2. Revert changes: `git checkout -- .`
3. Report error to user
4. Do NOT attempt fixes without permission

---

## Objective
Create a read-only API endpoint that returns custom metrics for a client. Initially, this will return an empty array since no custom metrics exist yet. This tests the API infrastructure without affecting existing functionality.

## What You Need to Do

### 1. Create API Route Directory Structure
**New Directory**: `/src/app/api/clients/[id]/custom-metrics/`

Create this directory path if it doesn't exist.

### 2. Create API Route File
**New File**: `/src/app/api/clients/[id]/custom-metrics/route.ts`

Create this file with the following content:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

/**
 * GET /api/clients/[id]/custom-metrics
 * 
 * Fetches custom metrics for a specific client.
 * Returns empty array initially since no custom metrics exist yet.
 * 
 * Security:
 * - Requires authentication
 * - Verifies user owns the client
 * 
 * @returns {success: boolean, metrics: CustomMetric[]}
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }
    
    // Fetch client and verify ownership
    const client = await prisma.client.findUnique({
      where: { 
        id: params.id,
        userId: session.user.id  // Ensures user owns this client
      }
    });
    
    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' }, 
        { status: 404 }
      );
    }
    
    // Get custom metrics from client
    // Will be empty array initially since customMetrics is null
    const customMetrics = client.customMetrics || [];
    
    return NextResponse.json({
      success: true,
      metrics: customMetrics
    });
    
  } catch (error) {
    console.error('Error fetching custom metrics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 3. Verify File Structure
Your directory structure should now look like:
/src/app/api/clients/[id]/
├── custom-metrics/
│   └── route.ts          ← NEW FILE
└── (other existing client routes)

### 4. Test the API Endpoint Locally

**Start the dev server:**
```bash
npm run dev
```

**Test the endpoint:**

Option A - Using curl (if you have a session cookie):
```bash
# Replace CLIENT_ID with an actual client ID from your database
curl http://localhost:3000/api/clients/[CLIENT_ID]/custom-metrics \
  -H "Cookie: [your-session-cookie]"
```

Option B - Using browser:
1. Log in to your app
2. Open browser DevTools (F12)
3. Go to Console tab
4. Run this:
```javascript
fetch('/api/clients/[CLIENT_ID]/custom-metrics')
  .then(r => r.json())
  .then(console.log)
```

**Expected Response:**
```json
{
  "success": true,
  "metrics": []
}
```

### 5. Test Error Cases

**Test unauthorized access (should fail):**
```bash
# Without authentication cookie
curl http://localhost:3000/api/clients/fake-id/custom-metrics

# Expected: {"error": "Unauthorized"}
```

**Test non-existent client (should fail):**
```bash
# With valid session but fake client ID
curl http://localhost:3000/api/clients/nonexistent-id/custom-metrics \
  -H "Cookie: [your-session-cookie]"

# Expected: {"error": "Client not found"}
```

## Success Criteria
- ✅ New directory structure created
- ✅ New route.ts file created with GET handler
- ✅ TypeScript compiles without errors
- ✅ API returns 200 with empty array for valid client
- ✅ API returns 401 without authentication
- ✅ API returns 404 for non-existent client
- ✅ **Existing API routes still work** (test by generating a report)
- ✅ No changes to any existing files

## What NOT to Do
- ❌ Do NOT modify any existing API routes
- ❌ Do NOT add POST/PUT/DELETE handlers yet (Step 4)
- ❌ Do NOT modify any UI components
- ❌ Do NOT change authentication logic
- ❌ Do NOT touch report generation code

## Safety Checklist Before Commit

Go through this checklist:
- [ ] Only new files created in `/src/app/api/clients/[id]/custom-metrics/`
- [ ] No modifications to existing API routes
- [ ] TypeScript compiles: `npm run build` succeeds
- [ ] Dev server starts: `npm run dev` works
- [ ] Test existing functionality: Generate a report (any type) - still works
- [ ] API endpoint returns expected response (empty array)
- [ ] No console errors when starting server

## Verification Commands

Run these before committing:
```bash
# 1. Check TypeScript compilation
npm run build

# 2. Start dev server and verify no errors
npm run dev

# 3. In another terminal, test the endpoint
# (Replace CLIENT_ID with real ID from Prisma Studio)
curl http://localhost:3000/api/clients/[CLIENT_ID]/custom-metrics

# 4. Test existing functionality
# Open browser, log in, generate any report - should work normally
```

## Git Commit Message
After verification, use this commit message:
```bash
git add src/app/api/clients/[id]/custom-metrics/route.ts
git commit -m "feat(api): add GET endpoint for custom metrics

- Created /api/clients/[id]/custom-metrics endpoint
- Returns empty array initially (no custom metrics yet)
- Includes authentication and ownership verification
- Read-only endpoint, no writes yet
- No impact on existing functionality"
```

## If Something Goes Wrong

**TypeScript Errors:**
```bash
# Check the error
npm run build

# Common issues:
# - Check import paths are correct (@/lib/auth, @/lib/db)
# - Verify authOptions and prisma are exported from their files
# - If imports fail, you may need to check your tsconfig paths
```

**Server Won't Start:**
```bash
# Check for syntax errors
npm run build

# Revert if needed
git checkout -- .
```

**API Returns 500 Error:**
- Check server console for error details
- Verify database connection works
- Verify authOptions is properly configured

## Questions to Ask Me
If you encounter:
- Import path errors (@/lib/auth or @/lib/db not found)
- Authentication issues (authOptions not working)
- Database connection errors
- Existing custom-metrics route already exists
- ANY errors when testing existing report generation

**STOP and ask me before proceeding.**

## Next Step Preview
After this is complete and verified, Step 4 will add the POST endpoint to save custom metrics (write functionality). Still no UI changes yet.

## Final Verification
Before committing, ensure:
1. ✅ New endpoint accessible and returns `{"success": true, "metrics": []}`
2. ✅ Existing reports still generate successfully
3. ✅ No TypeScript errors
4. ✅ Dev server starts without errors
5. ✅ Only new files added, no existing files modified


# TASK: Add Write Endpoint for Custom Metrics (Step 4 of 10)

## 🚨 CRITICAL SAFETY RULES - READ FIRST

### Non-Negotiable Requirements:
1. **DO NOT BREAK EXISTING FUNCTIONALITY** - All current features must continue working
2. **DO NOT MODIFY WORKING CODE** - If it works, don't touch it unless explicitly told
3. **ADDITIVE ONLY** - You are ONLY adding new functionality
4. **TEST AFTER CHANGES** - Verify existing features still work after your changes
5. **ROLLBACK READY** - If anything breaks, immediately revert

### What's Currently Working (DO NOT BREAK):
- ✅ User authentication and sessions
- ✅ Client management (add, edit, delete)
- ✅ Google OAuth connection (GSC, GA4)
- ✅ Report generation (Executive, Standard, Custom)
- ✅ PDF generation with white-label branding
- ✅ Metric selector with predefined metrics
- ✅ PayPal billing
- ✅ GET /api/clients/[id]/custom-metrics endpoint (Step 3)

### If You Break Something:
1. Stop immediately
2. Revert changes: `git checkout -- .`
3. Report error to user
4. Do NOT attempt fixes without permission

---

## Objective
Add a POST handler to the existing custom metrics API endpoint to allow saving custom metrics. This enables writing data to the database while maintaining all existing functionality.

## What You Need to Do

### 1. Modify Existing API Route File
**File to Modify**: `/src/app/api/clients/[id]/custom-metrics/route.ts`

Add the POST handler AFTER the existing GET handler (don't modify GET):
```typescript
import { CustomMetric } from '@/types/custom-metrics';

// Existing GET handler stays unchanged above...

/**
 * POST /api/clients/[id]/custom-metrics
 * 
 * Saves custom metrics for a specific client.
 * Replaces entire customMetrics array (not appending).
 * 
 * Security:
 * - Requires authentication
 * - Verifies user owns the client
 * - Limits to 10 custom metrics per client
 * 
 * @body {customMetrics: CustomMetric[]}
 * @returns {success: boolean, customMetrics: CustomMetric[]}
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }
    
    // Parse request body
    const body = await req.json();
    const { customMetrics } = body;
    
    // Validate input - must be array
    if (!Array.isArray(customMetrics)) {
      return NextResponse.json(
        { error: 'customMetrics must be an array' },
        { status: 400 }
      );
    }
    
    // Limit to 10 custom metrics per client
    if (customMetrics.length > 10) {
      return NextResponse.json(
        { error: 'Maximum 10 custom metrics allowed per client' },
        { status: 400 }
      );
    }
    
    // Validate each metric has required fields
    for (const metric of customMetrics) {
      if (!metric.id || !metric.apiName || !metric.displayName) {
        return NextResponse.json(
          { error: 'Each metric must have id, apiName, and displayName' },
          { status: 400 }
        );
      }
    }
    
    // Update client with custom metrics
    const client = await prisma.client.update({
      where: {
        id: params.id,
        userId: session.user.id  // Ensures user owns this client
      },
      data: {
        customMetrics: customMetrics
      }
    });
    
    return NextResponse.json({
      success: true,
      customMetrics: client.customMetrics
    });
    
  } catch (error) {
    console.error('Error saving custom metrics:', error);
    
    // Check if it's a Prisma "not found" error
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Client not found or access denied' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 2. Verify File Structure
After modification, your file should have:
```typescript
// Imports at top
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { CustomMetric } from '@/types/custom-metrics';

// GET handler (existing from Step 3)
export async function GET(...) { ... }

// POST handler (new from Step 4)
export async function POST(...) { ... }
```

### 3. Test the POST Endpoint

**Start dev server:**
```bash
npm run dev
```

**Test saving custom metrics:**

In browser console (after logging in):
```javascript
// Test POST - Save one custom metric
fetch('/api/clients/[YOUR_CLIENT_ID]/custom-metrics', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customMetrics: [
      {
        id: 'custom_1',
        apiName: 'activeUsers',
        displayName: 'Test Metric',
        category: 'custom',
        format: 'number',
        isCustom: true
      }
    ]
  })
})
.then(r => r.json())
.then(data => console.log('✅ POST Response:', data))
```

**Expected Response:**
```json
{
  "success": true,
  "customMetrics": [
    {
      "id": "custom_1",
      "apiName": "activeUsers",
      "displayName": "Test Metric",
      "category": "custom",
      "format": "number",
      "isCustom": true
    }
  ]
}
```

**Then verify GET still works:**
```javascript
// Test GET - Should return the saved metric
fetch('/api/clients/[YOUR_CLIENT_ID]/custom-metrics')
.then(r => r.json())
.then(data => console.log('✅ GET Response:', data))
```

**Expected Response:**
```json
{
  "success": true,
  "metrics": [
    {
      "id": "custom_1",
      "apiName": "activeUsers",
      "displayName": "Test Metric",
      "category": "custom",
      "format": "number",
      "isCustom": true
    }
  ]
}
```

### 4. Test Validation

**Test max limit (should fail):**
```javascript
// Try to save 11 metrics (limit is 10)
const tooManyMetrics = Array.from({length: 11}, (_, i) => ({
  id: `custom_${i}`,
  apiName: 'activeUsers',
  displayName: `Test ${i}`,
  category: 'custom',
  format: 'number',
  isCustom: true
}));

fetch('/api/clients/[YOUR_CLIENT_ID]/custom-metrics', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ customMetrics: tooManyMetrics })
})
.then(r => r.json())
.then(data => console.log('Expected error:', data))

// Expected: {"error": "Maximum 10 custom metrics allowed per client"}
```

**Test invalid input (should fail):**
```javascript
// Try to save invalid format
fetch('/api/clients/[YOUR_CLIENT_ID]/custom-metrics', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ customMetrics: 'not-an-array' })
})
.then(r => r.json())
.then(data => console.log('Expected error:', data))

// Expected: {"error": "customMetrics must be an array"}
```

## Success Criteria
- ✅ POST handler added to existing route file
- ✅ GET handler unchanged and still works
- ✅ Can save custom metrics successfully
- ✅ Saved metrics persist (GET returns them)
- ✅ Validation works (max 10 metrics, must be array)
- ✅ Proper error responses (400 for validation, 401 for auth, 404 for not found)
- ✅ TypeScript compiles without errors
- ✅ **Existing report generation still works**
- ✅ No changes to any other files

## What NOT to Do
- ❌ Do NOT modify the existing GET handler
- ❌ Do NOT create a new file (modify existing route.ts)
- ❌ Do NOT add DELETE handler yet (Step 10)
- ❌ Do NOT modify any UI components
- ❌ Do NOT touch report generation code
- ❌ Do NOT change authentication logic

## Safety Checklist Before Commit

Go through this checklist:
- [ ] Only modified `/src/app/api/clients/[id]/custom-metrics/route.ts`
- [ ] GET handler still works (test it)
- [ ] POST handler works (test it)
- [ ] Validation works (test max limit)
- [ ] TypeScript compiles: `npm run build`
- [ ] Dev server starts without errors
- [ ] Test existing functionality: Generate a report - still works
- [ ] No console errors

## Verification Commands

Run these before committing:
```bash
# 1. Check TypeScript compilation
npm run build

# 2. Start dev server
npm run dev

# 3. Test in browser console (after logging in):
# - Test POST (save metric)
# - Test GET (retrieve metric)
# - Test validation (try to save 11 metrics)
# - Test existing report generation still works
```

## Git Commit Message
After verification, use this commit message:
```bash
git add src/app/api/clients/[id]/custom-metrics/route.ts
git commit -m "feat(api): add POST endpoint to save custom metrics

- Added POST handler to existing custom-metrics route
- Validates input (max 10 metrics, required fields)
- Saves customMetrics array to client record
- GET handler unchanged and working
- Proper error handling and validation
- No impact on existing functionality"
```

## If Something Goes Wrong

**TypeScript Errors:**
```bash
# Check what's wrong
npm run build

# If import errors, verify CustomMetric type is exported
# If Prisma errors, verify prisma generate ran in Step 1
```

**POST Returns 500 Error:**
- Check server console for detailed error
- Verify Prisma client is working
- Verify database connection

**Can't Find Client:**
- Verify you're using correct client ID
- Verify you're logged in (session exists)
- Check Prisma Studio that client exists and belongs to your user

## Questions to Ask Me
If you encounter:
- Type errors with CustomMetric import
- Prisma update errors
- Authentication issues
- ANY errors when testing existing report generation
- Validation not working as expected

**STOP and ask me before proceeding.**

## Next Step Preview
After this is complete and verified, Step 5 will create the UI modal component for adding custom metrics (still not integrated anywhere, just the component). Still no impact on existing features.

## Final Verification
Before committing, test this complete flow:

1. ✅ POST a custom metric → Success
2. ✅ GET custom metrics → Returns saved metric
3. ✅ POST again with different metrics → Replaces previous (not appends)
4. ✅ Try to POST 11 metrics → Error response
5. ✅ Generate any existing report type → Still works perfectly

All 5 must pass before committing!


# TASK: Create Add Custom Metric Modal Component (Step 5 of 10)

## 🚨 CRITICAL SAFETY RULES - READ FIRST

### Non-Negotiable Requirements:
1. **DO NOT BREAK EXISTING FUNCTIONALITY** - All current features must continue working
2. **DO NOT MODIFY WORKING CODE** - If it works, don't touch it unless explicitly told
3. **ADDITIVE ONLY** - You are ONLY adding new functionality
4. **TEST AFTER CHANGES** - Verify existing features still work after your changes
5. **ROLLBACK READY** - If anything breaks, immediately revert

### What's Currently Working (DO NOT BREAK):
- ✅ User authentication and sessions
- ✅ Client management (add, edit, delete)
- ✅ Google OAuth connection (GSC, GA4)
- ✅ Report generation (Executive, Standard, Custom)
- ✅ PDF generation with white-label branding
- ✅ Metric selector with predefined metrics
- ✅ PayPal billing
- ✅ Custom metrics API (GET and POST endpoints)

### If You Break Something:
1. Stop immediately
2. Revert changes: `git checkout -- .`
3. Report error to user
4. Do NOT attempt fixes without permission

---

## Objective
Create a standalone modal component for adding custom metrics. This component will NOT be integrated into the app yet (Step 6), so it will have ZERO impact on existing functionality. We're just building the component in isolation.

## What You Need to Do

### 1. Create New Modal Component
**New File**: `/src/components/organisms/AddCustomMetricModal.tsx`

Create this file with the following content:
```typescript
'use client';

import { useState } from 'react';
import { CustomMetric } from '@/types/custom-metrics';

interface AddCustomMetricModalProps {
  clientId: string;
  onSave: (metric: CustomMetric) => void;
  onCancel: () => void;
}

/**
 * Modal for adding a single custom GA4 metric
 * 
 * Users enter:
 * - Display Name: How metric appears in reports
 * - API Name: The exact GA4 metric API name
 * 
 * Phase 1: Manual entry only (no validation against GA4)
 */
export function AddCustomMetricModal({ 
  clientId, 
  onSave, 
  onCancel 
}: AddCustomMetricModalProps) {
  const [apiName, setApiName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  async function handleSave() {
    // Basic validation
    if (!apiName.trim() || !displayName.trim()) {
      setError('Both fields are required');
      return;
    }
    
    setIsSaving(true);
    setError(null);
    
    try {
      // Create new custom metric object
      const newMetric: CustomMetric = {
        id: `custom_${Date.now()}`,
        apiName: apiName.trim(),
        displayName: displayName.trim(),
        category: 'custom',
        format: 'number',
        isCustom: true
      };
      
      // Save to API
      const response = await fetch(
        `/api/clients/${clientId}/custom-metrics`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            customMetrics: [newMetric]
          })
        }
      );
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save metric');
      }
      
      // Success - notify parent
      onSave(newMetric);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error saving metric. Please try again.');
      console.error('Save custom metric error:', err);
    } finally {
      setIsSaving(false);
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 mx-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Add Custom Metric
        </h2>
        
        <div className="space-y-4">
          {/* Display Name Input */}
          <div>
            <label 
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g., Newsletter Signups"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
              disabled={isSaving}
            />
            <p className="text-xs text-gray-500 mt-1">
              How this metric will appear in your reports
            </p>
          </div>
          
          {/* GA4 API Name Input */}
          <div>
            <label 
              htmlFor="apiName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              GA4 Metric API Name
            </label>
            <input
              id="apiName"
              type="text"
              value={apiName}
              onChange={(e) => setApiName(e.target.value)}
              placeholder="e.g., customEvent:newsletter_signup"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
              disabled={isSaving}
            />
            <p className="text-xs text-gray-500 mt-1">
              The exact metric name from your GA4 property
            </p>
          </div>
          
          {/* Help Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-900 font-medium mb-2">
              💡 How to find your GA4 metric names:
            </p>
            <ol className="text-xs text-blue-800 space-y-1 ml-4 list-decimal">
              <li>Go to your GA4 property</li>
              <li>Navigate to <strong>Admin → Custom definitions</strong></li>
              <li>Find your custom metric</li>
              <li>Copy the API name (e.g., "customEvent:newsletter_signup")</li>
            </ol>
            
              href="https://support.google.com/analytics/answer/10075209"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-700 underline mt-2 inline-block"
            >
              Learn more about GA4 custom metrics →
            </a>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-900">{error}</p>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSaving || !apiName.trim() || !displayName.trim()}
          >
            {isSaving ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    fill="none" 
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
                  />
                </svg>
                Saving...
              </span>
            ) : (
              'Add Metric'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 2. Verify Component Structure
Your file structure should now have:
```
/src/components/organisms/
├── AddCustomMetricModal.tsx  ← NEW FILE
└── (other existing organisms)
```

### 3. Create Test Page (Optional but Recommended)
To test the component in isolation without affecting the real app:

**New File**: `/src/app/test-custom-metrics/page.tsx`
```typescript
'use client';

import { useState } from 'react';
import { AddCustomMetricModal } from '@/components/organisms/AddCustomMetricModal';

export default function TestCustomMetricsPage() {
  const [showModal, setShowModal] = useState(false);
  const [savedMetrics, setSavedMetrics] = useState<any[]>([]);
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Test Custom Metrics Modal
        </h1>
        <p className="text-gray-600 mb-6">
          This is a test page to verify the AddCustomMetricModal component.
          This page will NOT be accessible in production.
        </p>
        
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
        >
          Open Add Metric Modal
        </button>
        
        {savedMetrics.length > 0 && (
          <div className="mt-6 p-4 bg-white rounded-lg border">
            <h2 className="font-semibold mb-2">Saved Metrics:</h2>
            <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(savedMetrics, null, 2)}
            </pre>
          </div>
        )}
        
        {showModal && (
          <AddCustomMetricModal
            clientId="test-client-id"
            onSave={(metric) => {
              console.log('Metric saved:', metric);
              setSavedMetrics([...savedMetrics, metric]);
              setShowModal(false);
            }}
            onCancel={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}
```

### 4. Test the Component

**Start dev server:**
```bash
npm run dev
```

**Test the modal:**
1. Navigate to: `http://localhost:3000/test-custom-metrics`
2. Click "Open Add Metric Modal"
3. Verify modal appears with correct styling
4. Try to save without filling fields → Should show error
5. Fill both fields and save → Should close modal and show saved metric
6. Check browser console for any errors

**Expected behavior:**
- ✅ Modal opens with overlay
- ✅ Both input fields work
- ✅ Help text displays correctly
- ✅ Validation prevents empty submission
- ✅ Save button shows loading state
- ✅ Cancel button closes modal
- ✅ Success closes modal and returns metric

### 5. Verify Existing App Unchanged

**Critical test:**
1. Navigate to `/dashboard` or `/clients`
2. Verify everything looks normal
3. Try generating a report
4. Verify report generation still works

The test page at `/test-custom-metrics` should NOT be linked anywhere in the app.

## Success Criteria
- ✅ New component file created
- ✅ Test page created (optional)
- ✅ TypeScript compiles without errors
- ✅ Component renders correctly
- ✅ Form validation works
- ✅ API call structure is correct (doesn't need to work yet)
- ✅ **Existing app completely unchanged**
- ✅ **Existing report generation still works**

## What NOT to Do
- ❌ Do NOT integrate this modal into any existing pages
- ❌ Do NOT modify the metric selector modal yet (Step 6)
- ❌ Do NOT add navigation links to test page
- ❌ Do NOT modify any existing components
- ❌ Do NOT touch report generation code

## Safety Checklist Before Commit

Go through this checklist:
- [ ] Only new files created (component + optional test page)
- [ ] No modifications to existing components
- [ ] TypeScript compiles: `npm run build`
- [ ] Dev server starts without errors
- [ ] Modal works in test page
- [ ] Existing pages (dashboard, clients, reports) unchanged
- [ ] Test existing functionality: Generate a report - still works
- [ ] No console errors on existing pages

## Verification Commands
```bash
# 1. Check TypeScript compilation
npm run build

# 2. Start dev server
npm run dev

# 3. Test modal at: http://localhost:3000/test-custom-metrics
# 4. Test existing pages still work (dashboard, generate report)
```

## Git Commit Message
After verification, use this commit message:
```bash
git add src/components/organisms/AddCustomMetricModal.tsx
git add src/app/test-custom-metrics/page.tsx  # If you created it

git commit -m "feat(ui): add AddCustomMetricModal component

- Created standalone modal for adding custom metrics
- Includes form validation and loading states
- Help text with GA4 instructions
- Test page for isolated component testing
- Not integrated into app yet (Step 6)
- No impact on existing functionality"
```

## If Something Goes Wrong

**TypeScript Errors:**
```bash
# Check imports
npm run build

# Common issues:
# - Verify CustomMetric type is importable
# - Check brand-500/brand-600 colors exist in Tailwind config
# - Verify React types are installed
```

**Styling Issues:**
```bash
# If brand colors don't work, temporarily use:
# bg-purple-600, bg-purple-700, ring-purple-500
# (We'll fix brand colors in Step 10 polish)
```

**Modal Not Displaying:**
- Check z-index (should be z-50)
- Verify fixed positioning
- Check browser console for errors

## Questions to Ask Me
If you encounter:
- Tailwind brand color class not found
- TypeScript import errors
- Modal styling issues
- ANY errors when testing existing report generation

**STOP and ask me before proceeding.**

## Next Step Preview
After this is complete and verified, Step 6 will integrate this modal into the existing metric selector modal. That's when users will actually see it in the app.

## Final Verification
Before committing, verify:

1. ✅ Modal component created successfully
2. ✅ Test page works (modal opens, validates, saves)
3. ✅ TypeScript compiles with no errors
4. ✅ Existing dashboard/clients pages unchanged
5. ✅ Existing report generation still works perfectly
6. ✅ No console errors on any page

All 6 must pass!


# TASK: Integrate Custom Metrics into Metric Selector (Step 6 of 10)

## 🚨 CRITICAL SAFETY RULES - READ FIRST

### Non-Negotiable Requirements:
1. **DO NOT BREAK EXISTING FUNCTIONALITY** - All current features must continue working
2. **DO NOT MODIFY WORKING CODE** - If it works, don't touch it unless explicitly told
3. **ADDITIVE ONLY** - You are ONLY adding new functionality
4. **TEST AFTER CHANGES** - Verify existing features still work after your changes
5. **ROLLBACK READY** - If anything breaks, immediately revert

### What's Currently Working (DO NOT BREAK):
- ✅ User authentication and sessions
- ✅ Client management (add, edit, delete)
- ✅ Google OAuth connection (GSC, GA4)
- ✅ Report generation (Executive, Standard, Custom)
- ✅ PDF generation with white-label branding
- ✅ **Metric selector with 30+ predefined metrics** ← DO NOT BREAK THIS
- ✅ PayPal billing
- ✅ Custom metrics API and modal component

### If You Break Something:
1. Stop immediately
2. Revert changes: `git checkout -- .`
3. Report error to user
4. Do NOT attempt fixes without permission

---

## Objective
Integrate the AddCustomMetricModal into the existing metric selector modal. Add a "Custom Metrics" section where users can add, view, and select their custom metrics. This is the FIRST time users will actually see custom metrics in the app.

## What You Need to Do

### 1. Find the Metric Selector Component
**First, locate the file** that contains the metric selector modal. It's likely named one of:
- `/src/components/organisms/MetricSelectorModal.tsx`
- `/src/components/organisms/MetricSelector.tsx`
- `/src/app/reports/MetricSelector.tsx`
- Or similar

Search for files containing "MetricSelector" or "metric" in the components folder.

### 2. Add Imports at Top of File
Once you find the metric selector file, add these imports at the top:
```typescript
import { useState, useEffect } from 'react'; // May already exist
import { AddCustomMetricModal } from '@/components/organisms/AddCustomMetricModal';
import { CustomMetric } from '@/types/custom-metrics';
```

### 3. Add State Variables
Inside the component (after existing state declarations), add:
```typescript
// Custom metrics state
const [customMetrics, setCustomMetrics] = useState<CustomMetric[]>([]);
const [showAddCustomModal, setShowAddCustomModal] = useState(false);
const [isLoadingCustom, setIsLoadingCustom] = useState(false);
```

### 4. Add useEffect to Load Custom Metrics
Add this useEffect after the state declarations:
```typescript
// Load custom metrics when modal opens
useEffect(() => {
  async function loadCustomMetrics() {
    if (!clientId) return;
    
    setIsLoadingCustom(true);
    try {
      const response = await fetch(`/api/clients/${clientId}/custom-metrics`);
      const data = await response.json();
      
      if (data.success && Array.isArray(data.metrics)) {
        setCustomMetrics(data.metrics);
      }
    } catch (error) {
      console.error('Failed to load custom metrics:', error);
    } finally {
      setIsLoadingCustom(false);
    }
  }
  
  loadCustomMetrics();
}, [clientId]);
```

### 5. Add Custom Metrics Section to Render
Find where the existing metric categories are rendered (look for the list of predefined metrics).

Add this NEW section AFTER all existing categories but BEFORE the modal close/save buttons:
```tsx
{/* Custom Metrics Section */}
<div className="mt-8 pt-6 border-t border-gray-200">
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      <span className="text-2xl">⚙️</span>
      <h3 className="text-lg font-semibold text-gray-900">Custom Metrics</h3>
      <span className="text-xs text-gray-500 ml-2">
        (Your GA4 custom metrics)
      </span>
    </div>
    <button
      onClick={() => setShowAddCustomModal(true)}
      className="text-sm font-medium text-brand-600 hover:text-brand-700 transition"
    >
      + Add Custom Metric
    </button>
  </div>
  
  {isLoadingCustom ? (
    <div className="text-center py-8">
      <div className="inline-block animate-spin h-6 w-6 border-2 border-brand-600 border-t-transparent rounded-full"></div>
      <p className="text-sm text-gray-500 mt-2">Loading custom metrics...</p>
    </div>
  ) : customMetrics.length === 0 ? (
    <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
      <p className="text-gray-600 mb-2">No custom metrics yet</p>
      <p className="text-sm text-gray-500 mb-4">
        Add GA4 custom metrics to track in your reports
      </p>
      <button
        onClick={() => setShowAddCustomModal(true)}
        className="px-4 py-2 bg-brand-600 text-white text-sm rounded-lg hover:bg-brand-700 transition"
      >
        Add Your First Custom Metric
      </button>
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-3">
      {customMetrics.map((metric) => (
        <label
          key={metric.id}
          className={`
            relative p-4 border-2 rounded-lg cursor-pointer transition-all
            ${selectedMetrics.includes(metric.id)
              ? 'border-brand-600 bg-brand-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
            }
          `}
        >
          <input
            type="checkbox"
            checked={selectedMetrics.includes(metric.id)}
            onChange={() => {
              if (selectedMetrics.includes(metric.id)) {
                setSelectedMetrics(selectedMetrics.filter(id => id !== metric.id));
              } else {
                setSelectedMetrics([...selectedMetrics, metric.id]);
              }
            }}
            className="sr-only"
          />
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="font-medium text-gray-900 flex items-center gap-2">
                {metric.displayName}
                <span className="text-xs px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded font-normal">
                  Custom
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1 font-mono">
                {metric.apiName}
              </p>
            </div>
            {selectedMetrics.includes(metric.id) && (
              <svg className="w-5 h-5 text-brand-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </label>
      ))}
    </div>
  )}
</div>

{/* Add Custom Metric Modal */}
{showAddCustomModal && (
  <AddCustomMetricModal
    clientId={clientId}
    onSave={(newMetric) => {
      // Add to local state
      setCustomMetrics([...customMetrics, newMetric]);
      // Close modal
      setShowAddCustomModal(false);
    }}
    onCancel={() => setShowAddCustomModal(false)}
  />
)}
```

### 6. Update Selected Metrics Counter
Find where the selected metrics counter is displayed (usually shows "Selected: X / 15").

Update it to account for custom metrics:
```tsx
<p className="text-sm text-gray-600">
  Selected: {selectedMetrics.length} / 15
  {customMetrics.length > 0 && (
    <span className="ml-2 text-xs text-gray-500">
      ({customMetrics.filter(m => selectedMetrics.includes(m.id)).length} custom)
    </span>
  )}
</p>
```

## Success Criteria
- ✅ Custom Metrics section appears at bottom of metric selector
- ✅ "Add Custom Metric" button works (opens modal)
- ✅ Custom metrics load from API on modal open
- ✅ Can add new custom metric via modal
- ✅ New metric appears in list immediately
- ✅ Can select/deselect custom metrics (checkbox works)
- ✅ Selected custom metrics included in count
- ✅ **All existing predefined metrics still work**
- ✅ **Existing report generation still works**
- ✅ TypeScript compiles without errors

## What NOT to Do
- ❌ Do NOT modify existing predefined metric categories
- ❌ Do NOT change existing metric selection logic for predefined metrics
- ❌ Do NOT modify report generation code yet (Step 8)
- ❌ Do NOT add delete functionality yet (Step 10)
- ❌ Do NOT modify PDF templates yet (Step 9)

## Safety Checklist Before Commit

Go through this checklist:
- [ ] Only modified the metric selector component file
- [ ] Existing predefined metrics still selectable
- [ ] Can still generate reports with predefined metrics only
- [ ] Custom metrics section appears correctly
- [ ] Add button opens modal successfully
- [ ] TypeScript compiles: `npm run build`
- [ ] No console errors
- [ ] Test: Generate report with ONLY predefined metrics - still works
- [ ] Test: Select custom metric + predefined metrics - selection works

## Testing Steps

### Test 1: Existing Functionality Unchanged
```
1. Open metric selector for any client
2. Verify all existing predefined metrics are visible
3. Select 3-4 predefined metrics
4. Generate a report
5. Verify report generates successfully
✅ Must pass before proceeding
```

### Test 2: Custom Metrics Integration
```
1. Open metric selector
2. Scroll to bottom - see "Custom Metrics" section
3. Click "+ Add Custom Metric"
4. Modal opens
5. Add a test metric:
   - Display Name: "Test Metric"
   - API Name: "activeUsers"
6. Save
7. Modal closes, metric appears in list
8. Click checkbox to select it
9. Verify counter updates (shows "1 custom")
✅ New functionality working
```

### Test 3: Combined Selection
```
1. Select 2 predefined metrics
2. Select 1 custom metric
3. Verify counter shows "3 / 15 (1 custom)"
4. Save selection (don't generate report yet)
✅ Selection logic working
```

## Verification Commands
```bash
# 1. Check TypeScript compilation
npm run build

# 2. Start dev server
npm run dev

# 3. Test in browser:
# - Open metric selector
# - Verify custom section appears
# - Add a custom metric
# - Select it
# - Generate report with ONLY predefined metrics (should still work)
```

## Git Commit Message
After verification, use this commit message:
```bash
git add src/components/organisms/[MetricSelector file]
git commit -m "feat(ui): integrate custom metrics into metric selector

- Added Custom Metrics section to metric selector modal
- Load custom metrics from API on mount
- Add button opens AddCustomMetricModal
- Can select custom metrics alongside predefined ones
- Updated counter to show custom metric count
- All existing predefined metrics unchanged
- No impact on report generation yet (Step 8)"
```

## If Something Goes Wrong

**Can't Find Metric Selector File:**
```bash
# Search for it
find src -name "*Metric*" -type f
# Or
grep -r "MetricSelector" src/
```

**Import Errors:**
```bash
# Verify paths are correct
# Check that AddCustomMetricModal was created in Step 5
ls src/components/organisms/AddCustomMetricModal.tsx
```

**Existing Metrics Broken:**
```bash
# IMMEDIATELY revert
git checkout -- .
# Report to user what broke
```

**Custom Section Not Showing:**
- Verify you added it in the correct place (inside modal, after existing categories)
- Check browser console for React errors
- Verify clientId prop is being passed correctly

## Questions to Ask Me
If you encounter:
- Cannot locate metric selector component file
- Import path issues
- Existing metric selection breaks
- TypeScript errors with state management
- ANY errors when generating reports with predefined metrics

**STOP and ask me before proceeding.**

## Next Step Preview
After this is complete and verified, Step 7 will update the report generation system to recognize custom metrics alongside predefined ones. That's when custom metrics will actually appear in generated reports!

## Final Verification
Before committing, test this COMPLETE flow:

1. ✅ Open metric selector
2. ✅ Select 2-3 predefined metrics
3. ✅ Generate report → Works perfectly
4. ✅ Open metric selector again
5. ✅ See "Custom Metrics" section
6. ✅ Add a custom metric → Success
7. ✅ See custom metric in list
8. ✅ Select it → Checkbox works
9. ✅ Select 2 predefined + 1 custom → Counter shows "(1 custom)"
10. ✅ Close modal → Selection persists

All 10 must pass!


# TASK: Update Metric Mapping System for Custom Metrics (Step 7 of 10)

## 🚨 CRITICAL SAFETY RULES - READ FIRST

### Non-Negotiable Requirements:
1. **DO NOT BREAK EXISTING FUNCTIONALITY** - All current features must continue working
2. **DO NOT MODIFY WORKING CODE** - If it works, don't touch it unless explicitly told
3. **ADDITIVE ONLY** - You are ONLY adding new functionality
4. **TEST AFTER CHANGES** - Verify existing features still work after your changes
5. **ROLLBACK READY** - If anything breaks, immediately revert

### What's Currently Working (DO NOT BREAK):
- ✅ User authentication and sessions
- ✅ Client management (add, edit, delete)
- ✅ Google OAuth connection (GSC, GA4)
- ✅ **Report generation with predefined metrics** ← CRITICAL - DO NOT BREAK
- ✅ PDF generation with white-label branding
- ✅ Metric selector with predefined AND custom metrics
- ✅ PayPal billing
- ✅ Custom metrics API and UI

### If You Break Something:
1. Stop immediately
2. Revert changes: `git checkout -- .`
3. Report error to user
4. Do NOT attempt fixes without permission

---

## Objective
Add helper functions to the analytics integration layer so the system can recognize and handle custom metrics alongside predefined metrics. This is pure helper code - NO changes to existing functionality, just adding new lookup capabilities.

## What You Need to Do

### 1. Find the Analytics Integration File
**Locate the file** that contains `METRIC_MAPPING`. It's likely:
- `/src/lib/integrations/analytics.ts`
- `/src/lib/google/analytics.ts`
- `/src/lib/services/analytics.ts`

Search for "METRIC_MAPPING" in the codebase.

### 2. Add Import at Top
At the top of the file, add:
```typescript
import { CustomMetric } from '@/types/custom-metrics';
```

### 3. Add Helper Functions
**IMPORTANT**: Add these AFTER the existing `METRIC_MAPPING` object definition. Do NOT modify METRIC_MAPPING itself.
```typescript
/**
 * Get metric configuration for either predefined or custom metrics
 * 
 * @param metricId - The metric ID to look up (e.g., "users" or "custom_1")
 * @param customMetrics - Array of custom metrics from client
 * @returns Metric configuration object or null if not found
 */
export function getMetricConfig(
  metricId: string,
  customMetrics: CustomMetric[] = []
): any {
  // First, check if it's a predefined metric
  if (METRIC_MAPPING[metricId]) {
    return METRIC_MAPPING[metricId];
  }
  
  // Then check if it's a custom metric
  const customMetric = customMetrics.find(m => m.id === metricId);
  if (customMetric) {
    return {
      apiName: customMetric.apiName,
      displayName: customMetric.displayName,
      description: 'Custom GA4 metric',
      category: 'custom',
      format: customMetric.format,
      isCustom: true
    };
  }
  
  // Not found
  return null;
}

/**
 * Build array of GA4 API metric names from selected metric IDs
 * Handles both predefined and custom metrics
 * 
 * @param selectedMetrics - Array of metric IDs (e.g., ["users", "sessions", "custom_1"])
 * @param customMetrics - Array of custom metrics from client
 * @returns Array of GA4 API metric names (e.g., ["activeUsers", "sessions", "customEvent:test"])
 */
export function buildMetricsForGA4Request(
  selectedMetrics: string[],
  customMetrics: CustomMetric[] = []
): string[] {
  return selectedMetrics
    .map(metricId => {
      const config = getMetricConfig(metricId, customMetrics);
      
      if (!config) {
        console.warn(`Unknown metric: ${metricId}, skipping`);
        return null;
      }
      
      return config.apiName;
    })
    .filter((apiName): apiName is string => apiName !== null);
}
```

### 4. Verify File Structure
After adding the functions, your file should look like:
```typescript
// Imports at top
import { CustomMetric } from '@/types/custom-metrics';
// ... other existing imports

// Existing METRIC_MAPPING object (unchanged)
export const METRIC_MAPPING = {
  users: {
    apiName: 'activeUsers',
    // ... rest of config
  },
  // ... all other predefined metrics
};

// NEW: Helper functions (added below METRIC_MAPPING)
export function getMetricConfig(...) { ... }
export function buildMetricsForGA4Request(...) { ... }

// Any other existing functions below...
```

### 5. Test the Helper Functions

Create a simple test to verify the functions work:

**Option A - In Browser Console** (after starting dev server):
```javascript
// This won't actually work in console, but shows the logic we're testing
// You'll test this properly in Step 8 when we use these functions

// Test predefined metric lookup
const config1 = getMetricConfig('users', []);
console.log(config1); // Should return METRIC_MAPPING['users']

// Test custom metric lookup
const customMetrics = [{
  id: 'custom_1',
  apiName: 'customEvent:test',
  displayName: 'Test Metric',
  category: 'custom',
  format: 'number',
  isCustom: true
}];

const config2 = getMetricConfig('custom_1', customMetrics);
console.log(config2); // Should return custom metric config

// Test building GA4 request
const apiNames = buildMetricsForGA4Request(
  ['users', 'sessions', 'custom_1'],
  customMetrics
);
console.log(apiNames); 
// Should return: ['activeUsers', 'sessions', 'customEvent:test']
```

**Option B - Just verify TypeScript compiles** (simplest):
```bash
npm run build
```

If it compiles without errors, the functions are syntactically correct. They'll be properly tested in Step 8 when we actually use them.

## Success Criteria
- ✅ Helper functions added after METRIC_MAPPING
- ✅ CustomMetric type imported
- ✅ TypeScript compiles without errors
- ✅ No modifications to existing METRIC_MAPPING object
- ✅ No modifications to any existing functions
- ✅ **Existing report generation still works** (with predefined metrics only)
- ✅ No runtime errors when starting dev server

## What NOT to Do
- ❌ Do NOT modify the existing METRIC_MAPPING object
- ❌ Do NOT modify any existing functions in the file
- ❌ Do NOT modify report generation code yet (Step 8)
- ❌ Do NOT modify PDF templates yet (Step 9)
- ❌ Do NOT add these functions to any other files yet

## Safety Checklist Before Commit

Go through this checklist:
- [ ] Only ONE file modified (the analytics integration file)
- [ ] METRIC_MAPPING object unchanged
- [ ] Only added new functions (no existing functions modified)
- [ ] TypeScript compiles: `npm run build`
- [ ] Dev server starts without errors
- [ ] Test: Generate report with predefined metrics - still works perfectly
- [ ] No console errors when starting server

## Testing Steps

### Test 1: Verify Compilation
```bash
# Should complete without errors
npm run build
```

### Test 2: Verify Server Starts
```bash
# Should start without errors
npm run dev
# Check browser console for any errors
```

### Test 3: Verify Existing Reports Work

Log in to app
Navigate to any client
Generate a report with ONLY predefined metrics
Verify report generates successfully
Download PDF
Verify PDF looks correct
✅ Must pass - this proves we didn't break anything


### Test 4: Verify Functions Exist (Optional)
```bash
# Check that functions were exported
grep -n "export function getMetricConfig" src/lib/integrations/analytics.ts
grep -n "export function buildMetricsForGA4Request" src/lib/integrations/analytics.ts

# Both should return line numbers
```

## Verification Commands
```bash
# 1. Check TypeScript compilation
npm run build

# 2. Verify functions exported
grep "export function" src/lib/integrations/analytics.ts

# 3. Start dev server and check for errors
npm run dev

# 4. Test existing functionality
# Generate a report with predefined metrics - should work perfectly
```

## Git Commit Message
After verification, use this commit message:
```bash
git add src/lib/integrations/analytics.ts  # or wherever METRIC_MAPPING is
git commit -m "feat(lib): add custom metric lookup helpers

- Added getMetricConfig() to look up predefined or custom metrics
- Added buildMetricsForGA4Request() to build GA4 API metric arrays
- Supports mixed predefined + custom metric selections
- No changes to existing METRIC_MAPPING or functions
- Helper functions ready for Step 8 (report generation)
- No impact on existing functionality"
```

## If Something Goes Wrong

**Can't Find METRIC_MAPPING File:**
```bash
# Search for it
grep -r "METRIC_MAPPING" src/lib/
# Or
find src -name "*.ts" -exec grep -l "METRIC_MAPPING" {} \;
```

**TypeScript Errors After Adding Functions:**
```bash
# Check the error
npm run build

# Common issues:
# 1. Verify CustomMetric import path is correct
# 2. Check function syntax (missing braces, semicolons)
# 3. Verify return types are correct
```

**Existing Reports Break:**
```bash
# IMMEDIATELY REVERT
git checkout -- .

# Report what broke to user
```

## Questions to Ask Me
If you encounter:
- Cannot locate METRIC_MAPPING file
- TypeScript compilation errors
- Import path issues with CustomMetric
- Existing report generation breaks
- ANY console errors when starting server

**STOP and ask me before proceeding.**

## Next Step Preview
After this is complete and verified, Step 8 will use these helper functions in the actual report generation code to fetch custom metric data from GA4. That's when custom metrics will start working in reports!

## Final Verification
Before committing, verify:

1. ✅ TypeScript compiles with no errors
2. ✅ Dev server starts with no errors
3. ✅ Helper functions added (check with grep)
4. ✅ METRIC_MAPPING unchanged
5. ✅ Generate report with predefined metrics - works perfectly
6. ✅ No console errors anywhere

All 6 must pass!


# TASK: Fetch Custom Metrics in Report Generation (Step 8 of 10)

## 🚨 CRITICAL SAFETY RULES - READ FIRST

### Non-Negotiable Requirements:
1. **DO NOT BREAK EXISTING FUNCTIONALITY** - All current features must continue working
2. **DO NOT MODIFY WORKING CODE** - If it works, don't touch it unless explicitly told
3. **ADDITIVE ONLY** - You are ONLY adding new functionality
4. **TEST AFTER CHANGES** - Verify existing features still work after your changes
5. **ROLLBACK READY** - If anything breaks, immediately revert

### What's Currently Working (DO NOT BREAK):
- ✅ User authentication and sessions
- ✅ Client management (add, edit, delete)
- ✅ Google OAuth connection (GSC, GA4)
- ✅ **Report generation with predefined metrics** ← CRITICAL - DO NOT BREAK
- ✅ PDF generation with white-label branding
- ✅ Metric selector with custom metrics
- ✅ PayPal billing
- ✅ Custom metrics API, UI, and helper functions

### If You Break Something:
1. Stop immediately
2. Revert changes: `git checkout -- .`
3. Report error to user
4. Do NOT attempt fixes without permission

---

## Objective
Update the report generation code to fetch custom metrics from the database and include their data from GA4 in the report. This makes custom metrics actually work in reports (though they won't show in PDF yet - that's Step 9).

## What You Need to Do

### 1. Find the Report Generation File
**Locate the file** that generates reports. Look for:
- `/src/lib/services/report-generator.ts`
- `/src/app/api/reports/generate/route.ts`
- `/src/app/api/reports/[id]/generate/route.ts`
- Or similar

Search for files that call GA4 API or fetch analytics data.

### 2. Add Imports at Top
Add these imports:
```typescript
import { CustomMetric } from '@/types/custom-metrics';
import { getMetricConfig, buildMetricsForGA4Request } from '@/lib/integrations/google-analytics';
```

### 3. Locate the Client Fetch
Find where the client is fetched from the database. It probably looks like:
```typescript
const client = await prisma.client.findUnique({
  where: { id: clientId },
  // ... other options
});
```

### 4. Extract Custom Metrics from Client
**Right after** the client fetch, add:
```typescript
// Get custom metrics configuration from client
const customMetrics = (client.customMetrics as CustomMetric[]) || [];

console.log(`📊 Generating report with ${customMetrics.length} custom metrics`);
```

### 5. Update GA4 Data Fetching
Find where GA4 metrics are being fetched. Look for code that builds the GA4 request.

**BEFORE (existing code - find this pattern):**
```typescript
// Existing code that builds GA4 metrics array
const metrics = selectedMetrics.map(metricId => {
  const config = METRIC_MAPPING[metricId];
  return { name: config.apiName };
});
```

**REPLACE with (using our new helper):**
```typescript
// Build GA4 metrics array (supports both predefined and custom)
const metricApiNames = buildMetricsForGA4Request(selectedMetrics, customMetrics);

console.log('🔍 GA4 API metrics:', metricApiNames);

const metrics = metricApiNames.map(apiName => ({ name: apiName }));
```

### 6. Update Response Mapping
Find where GA4 response data is mapped back to metric IDs.

**BEFORE (existing code - find this pattern):**
```typescript
// Existing code that maps GA4 response
const ga4Data: Record<string, any> = {};
selectedMetrics.forEach((metricId, index) => {
  ga4Data[metricId] = response.data.rows?.[0]?.metricValues?.[index]?.value || '0';
});
```

**KEEP THIS (it should work as-is)**. The mapping by index will automatically work for custom metrics too since they're in the same selectedMetrics array.

### 7. Pass Custom Metrics to Report Data
Find where the report data object is constructed. It should look like:
```typescript
const reportData = {
  clientName: client.name,
  clientDomain: client.domain,
  reportType: 'custom',
  selectedMetrics,
  ga4Data,
  gscData,
  // ... other data
};
```

**Add customMetrics to this object:**
```typescript
const reportData = {
  clientName: client.name,
  clientDomain: client.domain,
  reportType: 'custom',
  selectedMetrics,
  customMetrics, // NEW: Pass custom metrics config to PDF
  ga4Data,
  gscData,
  // ... other data
};
```

### 8. Add Error Handling
Wrap the GA4 API call in try-catch to handle invalid custom metrics gracefully:
```typescript
try {
  // Existing GA4 API call
  const ga4Response = await fetchGA4Data({
    propertyId: client.gaPropertyId,
    accessToken: client.accessToken,
    metrics: metrics,
    dateRange: { startDate, endDate }
  });
  
  // Map response data
  selectedMetrics.forEach((metricId, index) => {
    const value = ga4Response.rows?.[0]?.metricValues?.[index]?.value || '0';
    ga4Data[metricId] = value;
  });
  
} catch (error) {
  console.error('GA4 API error (may include custom metrics):', error);
  
  // If GA4 fails, fill all metrics with '0' so report doesn't break
  selectedMetrics.forEach(metricId => {
    if (!ga4Data[metricId]) {
      ga4Data[metricId] = '0';
    }
  });
}
```

## Success Criteria
- ✅ Custom metrics loaded from client database
- ✅ Helper functions used correctly
- ✅ GA4 request includes custom metric API names
- ✅ Response mapped correctly (custom metrics get their data)
- ✅ Custom metrics config passed to reportData
- ✅ Error handling prevents report failure
- ✅ **Existing reports with predefined metrics still work perfectly**
- ✅ TypeScript compiles without errors
- ✅ No runtime errors when generating reports

## What NOT to Do
- ❌ Do NOT modify the PDF templates yet (Step 9)
- ❌ Do NOT change existing report types (Executive, Standard)
- ❌ Do NOT modify the GA4 API client itself
- ❌ Do NOT change how predefined metrics work
- ❌ Do NOT modify authentication or client management

## Safety Checklist Before Commit

Go through this checklist:
- [ ] Only modified report generation file
- [ ] Used helper functions from Step 7
- [ ] Custom metrics extracted from client
- [ ] GA4 request builder uses buildMetricsForGA4Request()
- [ ] Custom metrics config passed to reportData
- [ ] Error handling added
- [ ] TypeScript compiles: `npm run build`
- [ ] Test: Generate report with ONLY predefined metrics - still works
- [ ] Test: Generate report with 1 custom + 2 predefined - works
- [ ] No console errors

## Testing Steps

### Test 1: Existing Functionality (CRITICAL)
```
1. Log in to app
2. Navigate to any client
3. Select ONLY predefined metrics (e.g., users, sessions, bounceRate)
4. Generate Custom Report
5. Verify report generates successfully
6. Check console logs - should show "0 custom metrics"
7. Download PDF (won't show custom metrics yet, that's Step 9)
✅ MUST PASS - proves we didn't break existing reports
```

### Test 2: Mixed Metrics (NEW)
```
1. Navigate to same client
2. Add a custom metric:
   - Display Name: "Test Metric"
   - API Name: "activeUsers" (use a valid GA4 metric)
3. Select 2 predefined metrics + 1 custom metric
4. Generate Custom Report
5. Check console logs:
   - Should show "Generating report with 1 custom metrics"
   - Should show "GA4 API metrics: [array with 3 items]"
6. Wait for report to complete
7. Check browser DevTools Network tab - GA4 API call should succeed
✅ NEW - proves custom metrics are being fetched
```

### Test 3: Invalid Custom Metric (Error Handling)
```
1. Add a custom metric with INVALID API name:
   - Display Name: "Bad Metric"
   - API Name: "fake_metric_that_does_not_exist"
2. Select it + 1 predefined metric
3. Generate report
4. Should NOT crash
5. Check console - should show error but report completes
6. Custom metric should show '0' in report
✅ Proves error handling works
```

## Verification Commands
```bash
# 1. Check TypeScript compilation
npm run build

# 2. Start dev server
npm run dev

# 3. Check console logs during report generation
# Should see:
# - "📊 Generating report with X custom metrics"
# - "🔍 GA4 API metrics: [...]"

# 4. Test all 3 scenarios above
```

## Git Commit Message
After verification, use this commit message:
```bash
git add src/lib/services/report-generator.ts  # or wherever it is
git commit -m "feat(reports): fetch custom metrics in report generation

- Load custom metrics from client database
- Use buildMetricsForGA4Request() helper to build GA4 API calls
- Include custom metric data in GA4 requests
- Pass customMetrics config to report data for PDF rendering
- Add error handling for invalid custom metrics (default to 0)
- Existing predefined metric reports unchanged
- Custom metrics now functional in report data (PDF display in Step 9)"
```

## If Something Goes Wrong

**Can't Find Report Generation File:**
```bash
# Search for it
grep -r "generateReport" src/
grep -r "fetchGA4Data" src/
find src -name "*report*.ts" -type f
```

**TypeScript Errors:**
```bash
# Check imports
npm run build

# Verify helper functions are exported
grep "export function" src/lib/integrations/google-analytics.ts
```

**Existing Reports Break:**
```bash
# IMMEDIATELY REVERT
git checkout -- .

# Test existing reports again
# Report exactly what broke
```

**GA4 API Errors:**
- Check browser console Network tab
- Verify custom metric API names are valid
- Ensure error handling catches and logs the error
- Report should still complete with '0' values

## Questions to Ask Me
If you encounter:
- Cannot locate report generation file
- Import path issues with helper functions
- GA4 API integration unclear
- Existing predefined metric reports break
- TypeScript compilation errors
- ANY runtime errors during report generation

**STOP and ask me before proceeding.**

## Next Step Preview
After this is complete and verified, Step 9 will update the PDF template to actually DISPLAY custom metrics in the generated PDF. Right now custom metrics are fetched but not shown - Step 9 makes them visible!

## Final Verification
Before committing, test this complete flow:

1. ✅ Generate report with ONLY predefined metrics → Works perfectly
2. ✅ Add a custom metric with valid GA4 API name
3. ✅ Select 2 predefined + 1 custom
4. ✅ Generate report → Completes successfully
5. ✅ Check console logs → Shows custom metrics being processed
6. ✅ Check Network tab → GA4 API called with custom metric
7. ✅ No errors in console
8. ✅ Report data includes customMetrics array

All 8 must pass!













## 📚 Resources & References

### GA4 Documentation
- [GA4 Data API Reference](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [GA4 Admin API Reference](https://developers.google.com/analytics/devguides/config/admin/v1)
- [GA4 Dimensions & Metrics](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema)

### Internal Documentation
- Current Metric Mapping: `/src/lib/integrations/analytics.ts`
- Report Generation Flow: `/src/lib/services/report-generator.ts`
- PDF Templates: `/src/components/pdf/templates/`

### Support Resources
- Slack Channel: #feature-custom-metrics
- Documentation Site: docs.reportr.agency/custom-metrics (to be created)

---

## 🤝 Handoff Notes

### For New Developers
1. Start by reading this entire document
2. Review existing GA4 integration code
3. Set up local environment and test current report generation
4. Follow implementation checklist in order
5. Ask questions in Slack before making architectural changes

### For Product Team
- This feature maintains our "auto-fetch" philosophy
- UI follows existing patterns for consistency
- No impact on Executive/Standard reports
- Can be gated by tier if needed via feature flags

### For Support Team
- New feature: Custom GA4 metrics in Custom Reports
- Users need to know GA4 metric API names
- Create help article: "How to find your GA4 metric names"
- Common issue: Metric validation failures (usually user error)

---

## 📞 Support & Questions

For technical questions during implementation:
- Slack: #engineering
- Email: sebastian@reportr.agency
- Documentation: This file

---

**Document Version**: 1.0  
**Last Updated**: November 9, 2025  
**Next Review**: After Phase 1 completion

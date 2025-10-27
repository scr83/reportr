# 📄 White Label PDF Report Implementation Guide

## 🎯 OBJECTIVE
Implement conditional PDF branding that automatically switches between Reportr's default branding and the user's custom agency branding based on the `whiteLabelEnabled` flag in the database.

---

## 📊 HOW IT WORKS

### The Conditional Logic (Simple)
```
IF user.whiteLabelEnabled = false
  THEN use Reportr branding (purple #7e23ce, Reportr logo, "Powered by Reportr")

IF user.whiteLabelEnabled = true
  THEN use custom branding (user.primaryColor, user.logo, user.companyName, NO Reportr mentions)
```

### Database Fields (Already Exist)
```prisma
model User {
  whiteLabelEnabled Boolean @default(false)  // The master switch
  primaryColor     String  @default("#7e23ce") // Custom brand color
  companyName      String? // Agency name (e.g., "Digital Frog")
  logo             String? // URL to uploaded logo
}
```

---

## ✅ DASHBOARD REFERENCE (Already Working)

The dashboard already implements this correctly. **Use the same pattern for PDFs:**

### How Dashboard Does It:
```tsx
// 1. CSS variable set based on white label status
:root {
  --primary-color: {user.whiteLabelEnabled ? user.primaryColor : '#7e23ce'};
}

// 2. Logo conditional
{user.whiteLabelEnabled ? <img src={user.logo} /> : <ReportrLogo />}

// 3. Company name conditional
{user.whiteLabelEnabled ? user.companyName : 'Reportr'}

// 4. Button colors use CSS variable
className="border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)]"
```

**PDF implementation should follow this EXACT same pattern.**

---

## 🔧 STEP-BY-STEP IMPLEMENTATION

### STEP 1: Create Branding Interface
**File:** `/src/types/report.ts`

```typescript
// Add this interface to your types
export interface ReportBranding {
  enabled: boolean;          // Is white label enabled?
  companyName: string;        // "Reportr" or user's agency name
  logo: string;               // Reportr logo path or user's logo URL
  primaryColor: string;       // "#7e23ce" or user's custom color
  showPoweredBy: boolean;     // Show "Powered by Reportr"? (opposite of enabled)
}
```

---

### STEP 2: Update PDF Generator Service
**File:** `/src/lib/services/report-generator.ts`

**What to change:** Add branding parameter to the PDF generation function.

```typescript
export class ReportGenerator {
  async generateReport(clientId: string, userId: string): Promise<Report> {
    
    // 🔍 STEP 2A: Fetch user's white label settings
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        whiteLabelEnabled: true,
        primaryColor: true,
        companyName: true,
        logo: true,
      }
    });

    // 🎨 STEP 2B: Build branding object based on white label status
    const branding: ReportBranding = {
      enabled: user.whiteLabelEnabled,
      companyName: user.whiteLabelEnabled ? (user.companyName || 'Agency') : 'Reportr',
      logo: user.whiteLabelEnabled ? (user.logo || '/default-agency-logo.png') : '/reportr-logo.png',
      primaryColor: user.whiteLabelEnabled ? user.primaryColor : '#7e23ce',
      showPoweredBy: !user.whiteLabelEnabled, // Show ONLY when white label is OFF
    };

    // Fetch report data
    const [gscData, ga4Data, pageSpeedData] = await Promise.all([
      this.searchConsoleAPI.getPerformanceData(),
      this.analyticsAPI.getOrganicTrafficData(),  
      this.pageSpeedAPI.getPageSpeedData()
    ]);
    
    const reportData = this.processReportData(gscData, ga4Data, pageSpeedData);
    
    // 📄 STEP 2C: Pass branding to PDF generation
    const pdfBuffer = await this.generatePDF(reportData, client, branding);
    const pdfUrl = await this.uploadPDF(pdfBuffer);
    
    return this.saveReport(clientId, reportData, pdfUrl);
  }

  // 🔧 STEP 2D: Update generatePDF signature to accept branding
  private async generatePDF(
    reportData: ReportData, 
    client: Client, 
    branding: ReportBranding  // ← ADD THIS PARAMETER
  ): Promise<Buffer> {
    // Pass branding to template
    const pdfDocument = (
      <ReportTemplate 
        data={reportData} 
        client={client}
        branding={branding}  // ← PASS BRANDING HERE
      />
    );
    
    return await ReactPDF.renderToBuffer(pdfDocument);
  }
}
```

---

### STEP 3: Update PDF Template Components

#### Main Report Template
**File:** `/src/components/templates/ReportTemplate.tsx`

```tsx
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';

interface ReportTemplateProps {
  data: ReportData;
  client: Client;
  branding: ReportBranding;  // ← ADD THIS
}

export const ReportTemplate = ({ data, client, branding }: ReportTemplateProps) => {
  
  // 🎨 Create dynamic styles based on branding.primaryColor
  const styles = createDynamicStyles(branding.primaryColor);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* 📌 COVER PAGE - Use branding.primaryColor for background */}
        <View style={[styles.coverPage, { backgroundColor: branding.primaryColor }]}>
          <Image src={branding.logo} style={styles.coverLogo} />
          <Text style={styles.coverTitle}>SEO Performance Report</Text>
          <Text style={styles.coverClient}>{client.name}</Text>
          <Text style={styles.coverDate}>{new Date().toLocaleDateString()}</Text>
        </View>

        {/* 📌 HEADER - Use branding logo and company name */}
        <ReportHeader branding={branding} client={client} />
        
        {/* 📌 CONTENT - Pass branding to all sections */}
        <ExecutiveSummary metrics={data.summary} branding={branding} />
        <TrafficSection trafficData={data.traffic} branding={branding} />
        <KeywordSection keywords={data.keywords} branding={branding} />
        <ContentPerformance pages={data.topPages} branding={branding} />
        <ActionItems recommendations={data.recommendations} branding={branding} />
        
        {/* 📌 FOOTER - Conditional "Powered by Reportr" */}
        <ReportFooter branding={branding} />

      </Page>
    </Document>
  );
};

// 🎨 Dynamic styles function
const createDynamicStyles = (primaryColor: string) => StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 0,
  },
  coverPage: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor set inline with branding.primaryColor
  },
  coverLogo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  coverTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  // ... more styles
});
```

---

#### Report Header Component
**File:** `/src/components/templates/ReportHeader.tsx`

```tsx
import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';

interface ReportHeaderProps {
  branding: ReportBranding;
  client: Client;
}

export const ReportHeader = ({ branding, client }: ReportHeaderProps) => {
  const styles = createHeaderStyles(branding.primaryColor);

  return (
    <View style={styles.header}>
      {/* 🏢 Conditional logo */}
      <Image src={branding.logo} style={styles.logo} />
      
      {/* 🏢 Conditional company name */}
      <View style={styles.headerText}>
        <Text style={styles.companyName}>{branding.companyName}</Text>
        <Text style={styles.clientName}>Report for {client.name}</Text>
      </View>
    </View>
  );
};

const createHeaderStyles = (primaryColor: string) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: primaryColor,  // ← Dynamic color
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: primaryColor,  // ← Dynamic color
  },
  clientName: {
    fontSize: 12,
    color: '#666666',
  },
});
```

---

#### Report Footer Component
**File:** `/src/components/templates/ReportFooter.tsx`

```tsx
import { View, Text, StyleSheet } from '@react-pdf/renderer';

interface ReportFooterProps {
  branding: ReportBranding;
}

export const ReportFooter = ({ branding }: ReportFooterProps) => {
  return (
    <View style={styles.footer} fixed>
      
      {/* 🏢 Company name (always show) */}
      <Text style={styles.companyText}>{branding.companyName}</Text>
      
      {/* ⚠️ CONDITIONAL: Only show "Powered by Reportr" when white label is OFF */}
      {branding.showPoweredBy && (
        <Text style={styles.poweredBy}>Powered by Reportr</Text>
      )}
      
      {/* 📄 Page numbers */}
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `Page ${pageNumber} of ${totalPages}`
      )} />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  companyText: {
    fontSize: 10,
    color: '#666666',
  },
  poweredBy: {
    fontSize: 8,
    color: '#999999',
    fontStyle: 'italic',
  },
  pageNumber: {
    fontSize: 10,
    color: '#666666',
  },
});
```

---

#### Executive Summary Component
**File:** `/src/components/templates/ExecutiveSummary.tsx`

```tsx
import { View, Text, StyleSheet } from '@react-pdf/renderer';

interface ExecutiveSummaryProps {
  metrics: SummaryMetrics;
  branding: ReportBranding;
}

export const ExecutiveSummary = ({ metrics, branding }: ExecutiveSummaryProps) => {
  const styles = createSummaryStyles(branding.primaryColor);

  return (
    <View style={styles.section}>
      
      {/* 📊 Section header with dynamic color */}
      <Text style={styles.sectionTitle}>Executive Summary</Text>
      
      {/* 📈 Metric cards with dynamic border color */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{metrics.totalClicks}</Text>
          <Text style={styles.metricLabel}>Total Clicks</Text>
          <Text style={styles.metricChange}>+{metrics.clicksChange}%</Text>
        </View>
        
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{metrics.totalImpressions}</Text>
          <Text style={styles.metricLabel}>Impressions</Text>
        </View>
        
        {/* ... more metric cards */}
      </View>
    </View>
  );
};

const createSummaryStyles = (primaryColor: string) => StyleSheet.create({
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: primaryColor,  // ← Dynamic color
    marginBottom: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  metricCard: {
    width: '30%',
    padding: 15,
    borderWidth: 2,
    borderColor: primaryColor,  // ← Dynamic color
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: primaryColor,  // ← Dynamic color
    marginBottom: 5,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666666',
  },
  metricChange: {
    fontSize: 14,
    color: '#10B981',
    marginTop: 5,
  },
});
```

---

### STEP 4: Update API Route
**File:** `/src/app/api/reports/generate/route.ts` (or similar)

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ReportGenerator } from '@/lib/services/report-generator';

export async function POST(req: Request) {
  const { clientId } = await req.json();
  
  // Get authenticated user
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Fetch user with white label settings
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      whiteLabelEnabled: true,
      primaryColor: true,
      companyName: true,
      logo: true,
    }
  });

  // Generate report (branding logic is inside ReportGenerator)
  const reportGenerator = new ReportGenerator();
  const report = await reportGenerator.generateReport(clientId, user.id);
  
  return Response.json(report);
}
```

---

## 📋 COMPLETE CHECKLIST

### Phase 1: Core Implementation
- [ ] Add `ReportBranding` interface to `/src/types/report.ts`
- [ ] Update `ReportGenerator.generateReport()` to fetch user white label settings
- [ ] Create branding object with conditional logic
- [ ] Pass branding to `generatePDF()` function
- [ ] Update `ReportTemplate` component to accept `branding` prop
- [ ] Update cover page to use `branding.primaryColor` for background
- [ ] Update cover page to use `branding.logo`

### Phase 2: Component Updates
- [ ] Update `ReportHeader` to use `branding.logo` and `branding.companyName`
- [ ] Update `ReportFooter` to conditionally show "Powered by Reportr"
- [ ] Update `ExecutiveSummary` section header to use `branding.primaryColor`
- [ ] Update metric cards to use `branding.primaryColor` for borders
- [ ] Update all section titles to use `branding.primaryColor`

### Phase 3: Styling & Polish
- [ ] Create `createDynamicStyles()` helper function for each component
- [ ] Apply `branding.primaryColor` to all chart colors
- [ ] Apply `branding.primaryColor` to all accent elements
- [ ] Apply `branding.primaryColor` to all buttons (if any)
- [ ] Test with light colors (ensure text remains readable)
- [ ] Test with dark colors (ensure text remains readable)

### Phase 4: Testing
- [ ] Test with `whiteLabelEnabled = false` (should show Reportr branding)
- [ ] Test with `whiteLabelEnabled = true` and green color
- [ ] Test with `whiteLabelEnabled = true` and red color
- [ ] Test with missing logo (should have fallback)
- [ ] Test with missing company name (should have fallback)
- [ ] Verify "Powered by Reportr" ONLY shows when white label is OFF

---

## 🚨 CRITICAL RULES

### NEVER DO:
- ❌ Hardcode `#7e23ce` or any purple color in PDF components
- ❌ Show Reportr logo when `whiteLabelEnabled = true`
- ❌ Show "Powered by Reportr" when `whiteLabelEnabled = true`
- ❌ Mix Reportr branding with custom branding in same PDF
- ❌ Forget to pass `branding` prop to child components

### ALWAYS DO:
- ✅ Check `branding.enabled` or `branding.showPoweredBy` for conditionals
- ✅ Use `branding.primaryColor` for ALL accent colors
- ✅ Use `branding.logo` for ALL logo displays
- ✅ Use `branding.companyName` for ALL company name displays
- ✅ Create dynamic StyleSheets with `createDynamicStyles(branding.primaryColor)`
- ✅ Provide fallback values for missing logo or company name

---

## 🔍 DEBUGGING TIPS

### If colors aren't changing:
1. Check that `branding` object is being created correctly in `ReportGenerator`
2. Verify `branding` is being passed to all components
3. Check that styles are using `branding.primaryColor` not hardcoded colors
4. Log the `branding` object to verify values

### If "Powered by Reportr" still shows with white label:
1. Check `branding.showPoweredBy` is set to `!user.whiteLabelEnabled`
2. Verify conditional in `ReportFooter` component
3. Check database value of `whiteLabelEnabled`

### If Reportr logo still shows with white label:
1. Check `branding.logo` is set correctly in conditional
2. Verify user has uploaded a logo (`user.logo` is not null)
3. Check logo URL is accessible
4. Ensure component is using `branding.logo` not hardcoded path

---

## 📁 FILES TO MODIFY

### Core Files (Required):
1. `/src/types/report.ts` - Add `ReportBranding` interface
2. `/src/lib/services/report-generator.ts` - Add branding logic
3. `/src/components/templates/ReportTemplate.tsx` - Accept branding prop
4. `/src/components/templates/ReportHeader.tsx` - Use branding
5. `/src/components/templates/ReportFooter.tsx` - Conditional "Powered by"

### Section Components (Important):
6. `/src/components/templates/ExecutiveSummary.tsx` - Use branding colors
7. `/src/components/templates/TrafficSection.tsx` - Use branding colors
8. `/src/components/templates/KeywordSection.tsx` - Use branding colors
9. `/src/components/templates/ContentPerformance.tsx` - Use branding colors
10. `/src/components/templates/ActionItems.tsx` - Use branding colors

### API Routes (If needed):
11. `/src/app/api/reports/generate/route.ts` - Pass user ID to generator
12. `/src/app/api/clients/[id]/reports/route.ts` - Pass user ID to generator

---

## 🎯 SUCCESS CRITERIA

### White Label DISABLED Test:
```
User settings:
- whiteLabelEnabled: false
- primaryColor: (any value, should be ignored)
- companyName: (any value, should be ignored)
- logo: (any value, should be ignored)

Expected PDF:
✓ Reportr logo appears
✓ "Reportr" company name appears
✓ Purple color (#7e23ce) used throughout
✓ Footer shows "Powered by Reportr"
```

### White Label ENABLED Test:
```
User settings:
- whiteLabelEnabled: true
- primaryColor: #10B981 (green)
- companyName: "Digital Frog"
- logo: "https://example.com/logo.png"

Expected PDF:
✓ Custom logo appears (Digital Frog logo)
✓ "Digital Frog" company name appears
✓ Green color (#10B981) used throughout
✓ Footer does NOT show "Powered by Reportr"
✓ NO Reportr branding anywhere
```

---

## 💡 IMPLEMENTATION TIPS

1. **Start with one component**: Begin with `ReportHeader` to see branding work
2. **Test incrementally**: After each component update, generate a test PDF
3. **Use console.log**: Log the `branding` object to verify values
4. **Check database**: Verify user's white label settings are saved correctly
5. **Compare with dashboard**: The dashboard implementation is the reference - copy that pattern

---

**This document provides a complete, step-by-step guide that any agent can follow to implement white label PDF reports correctly.**
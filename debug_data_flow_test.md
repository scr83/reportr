# Debug Data Flow Test Guide

## Critical Fix Applied

**PROBLEM IDENTIFIED**: The `dailyData` from Google Search Console was not being passed through the report generation flow properly.

**ROOT CAUSE**: The GSC data with `dailyData` was fetched in `handleFetchGoogleData()` but was only stored in local scope. When `handleGeneratePDF()` was called, it couldn't access the complete GSC data including `dailyData`.

**FIX IMPLEMENTED**:
1. Added `rawGscData` state variable to store complete GSC data including `dailyData`
2. Updated `handleFetchGoogleData()` to store the complete GSC response in state
3. Updated PDF generation to use `rawGscData?.dailyData` instead of undefined `gscData`
4. Updated request body construction to include `dailyData` in the API call

## Testing Instructions

1. **Start the development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Navigate to the report generation page**:
   - Go to the dashboard
   - Click "Generate Report" or go to `/generate-report`

3. **Complete the report generation flow**:
   - Step 1: Select a client with Google Search Console connected
   - Step 2: Click "Fetch from Google" to get real data
   - Step 3: Generate a report

4. **Monitor the console logs** for the following 🔍 debug messages in sequence:

## Expected Debug Log Flow

### 1. GSC API Integration (`/src/lib/integrations/google-search-console.ts`)
```
🔍 [GSC-API] Starting performance data fetch
🔍 [GSC-API] Date range: { startDate: "...", endDate: "..." }
🔍 [GSC-API] Client ID: ...
🔍 [GSC-API] Target site URL: ...
🔍 [GSC-API] Raw API responses received: { queryRowsCount: X, pageRowsCount: Y, dailyRowsCount: Z }
🔍 [GSC-API] Daily data sample: { firstEntry: {...}, lastEntry: {...}, totalEntries: Z }
🔍 [GSC-API] Returning result with keys: ["clicks", "impressions", "ctr", "position", "topQueries", "topPages", "dailyData", "summary"]
🔍 [GSC-API] dailyData in result: { exists: true, length: Z, isArray: true }
```

### 2. GSC API Route (`/src/app/api/clients/[id]/google/search-console/route.ts`)
```
🔍 [GSC-API-ROUTE] Data received from integration: { hasData: true, dataKeys: [...], hasDailyData: true, dailyDataLength: Z }
🔍 [GSC-API-ROUTE] Returning response: { success: true, responseDataKeys: [...], includesDailyData: true, dailyDataLength: Z }
```

### 3. Frontend Report Generation (`/src/app/generate-report/page.tsx`)
```
🔍 [REPORT-GEN] GSC data received from API: { hasGscData: true, gscDataKeys: [...], hasDailyData: true, dailyDataLength: Z, sampleDailyEntry: {...} }
🔍 [REPORT-GEN] GSC data constructed for PDF: { hasDailyData: true, dailyDataLength: Z, dailyDataSample: {...} }
🔍 [REPORT-GEN] Preparing data for PDF generation
🔍 [REPORT-GEN] GSC data being sent: { hasGscData: true, gscDataKeys: [...], includesDailyData: true, dailyDataLength: Z }
🔍 [REPORT-GEN] Final request body logging: { hasGscData: true, gscDataKeys: [...], hasDailyDataInRequest: true, dailyDataLengthInRequest: Z }
```

### 4. PDF Generation API (`/src/app/api/generate-pdf/route.ts`)
```
🔍 [PDF-API] PDF generation request received
🔍 [PDF-API] Request data structure: { hasGscData: true, gscDataKeys: [...], hasDailyData: true, dailyDataLength: Z }
🔍 [PDF-API] Daily data sample: { first: {...}, last: {...} }
```

## What to Look For

### ✅ SUCCESS INDICATORS:
- All logs show `hasDailyData: true` and `dailyDataLength > 0`
- Daily data samples contain actual date/metrics data
- Charts appear in the generated PDF

### ❌ FAILURE INDICATORS:
- Any log shows `hasDailyData: false` or `dailyDataLength: 0`
- Log shows `❌ NO DAILY DATA FOUND IN REQUEST`
- PDF generates but charts are missing

## Files Modified

1. `/src/lib/integrations/google-search-console.ts` - Added GSC API debug logging
2. `/src/app/api/clients/[id]/google/search-console/route.ts` - Added API route debug logging  
3. `/src/app/generate-report/page.tsx` - Added state management and debug logging
4. `/src/app/api/generate-pdf/route.ts` - Added PDF API debug logging

## Next Steps

If the debug logs show that `dailyData` is now flowing through all stages:
1. ✅ **Success**: Charts should appear in PDFs
2. 🧹 **Cleanup**: Remove debug logs after confirming fix works
3. 📝 **Document**: Update any relevant documentation

If `dailyData` is still missing at any stage:
1. 🔍 **Investigate**: Check where the data flow breaks in the logs
2. 🐛 **Debug**: Add more specific logging at the failure point
3. 🔧 **Fix**: Address the specific data transformation issue
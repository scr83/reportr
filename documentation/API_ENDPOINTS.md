# API Endpoints Documentation

## Authentication Endpoints

### Google OAuth Integration
```
GET /api/auth/providers/google
POST /api/auth/signin/google
GET /api/auth/callback/google
```

## Client Management Endpoints

### Client CRUD Operations
```typescript
// Get all clients for authenticated user
GET /api/clients
Response: Client[]

// Create new client
POST /api/clients
Body: { name: string, domain: string, contactEmail?: string }
Response: Client

// Get specific client
GET /api/clients/[id]
Response: Client

// Update client
PUT /api/clients/[id]
Body: Partial<Client>
Response: Client

// Delete client
DELETE /api/clients/[id]
Response: { success: boolean }
```

### Google API Connection Management
```typescript
// Initiate Google API connection for client
POST /api/clients/[id]/connect-google
Body: { services: ['gsc', 'ga4'] }
Response: { authUrl: string }

// Check connection status
GET /api/clients/[id]/connection-status
Response: { gsc: ConnectionStatus, ga4: ConnectionStatus }

// Test API connections
POST /api/clients/[id]/test-connections
Response: { gsc: boolean, ga4: boolean, errors?: string[] }
```

## Report Generation Endpoints

### Report Management
```typescript
// Generate new report
POST /api/reports/generate
Body: { clientId: string, dateRange?: { start: string, end: string } }
Response: { reportId: string, jobId: string, estimatedTime: number }

// Get report status
GET /api/reports/[id]/status
Response: { 
  status: 'pending' | 'processing' | 'completed' | 'failed',
  progress?: number,
  error?: string,
  estimatedCompletion?: string
}

// Download completed report
GET /api/reports/[id]/download
Response: PDF file stream

// Get report history
GET /api/reports
Query: { clientId?: string, limit?: number, offset?: number }
Response: { reports: Report[], total: number }
```

### Background Job Status
```typescript
// Get job status (for real-time updates)
GET /api/jobs/[jobId]
Response: {
  status: 'queued' | 'processing' | 'completed' | 'failed',
  progress: number,
  steps: JobStep[],
  error?: string
}
```

## Data Endpoints

### Google API Data
```typescript
// Get raw Search Console data
GET /api/data/search-console/[clientId]
Query: { startDate: string, endDate: string }
Response: SearchConsoleData

// Get raw Analytics data
GET /api/data/analytics/[clientId]
Query: { startDate: string, endDate: string }
Response: AnalyticsData

// Get PageSpeed data
GET /api/data/pagespeed/[clientId]
Response: PageSpeedData
```

## User & Settings Endpoints

### User Profile
```typescript
// Get user profile
GET /api/users/profile
Response: User

// Update user settings
PUT /api/users/settings
Body: { companyName?: string, primaryColor?: string, logo?: string }
Response: User
```

### File Upload
```typescript
// Upload logo file
POST /api/upload/logo
Body: FormData with file
Response: { url: string, fileName: string }
```

## Webhook Endpoints

### System Webhooks
```typescript
// Report completion webhook (internal)
POST /api/webhooks/report-completed
Body: { reportId: string, status: string, pdfUrl?: string }

// API error notifications (internal)
POST /api/webhooks/api-error
Body: { service: string, error: string, clientId: string }
```

## Error Response Format

All API endpoints return errors in consistent format:
```typescript
{
  error: {
    code: string,           // 'AUTH_REQUIRED', 'CLIENT_NOT_FOUND', etc.
    message: string,        // Human-readable error message
    details?: any,          // Additional error context
    retryable?: boolean     // Whether client should retry request
  }
}
```

## Rate Limiting

- **Default**: 100 requests per minute per user
- **Report Generation**: 10 reports per hour per user
- **File Upload**: 20 uploads per hour per user
- **Google API Calls**: Managed internally with exponential backoff

## Authentication

All endpoints (except webhooks) require authentication via:
- NextAuth.js session cookies (web app)
- JWT tokens (API access)

Protected endpoints return 401 if not authenticated, 403 if not authorized.
import { z } from 'zod'

// User validation schemas
export const userSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  name: z.string().min(1, 'Name is required'),
  companyName: z.string().min(1, 'Company name is required'),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format'),
  logo: z.string().url().optional(),
})

export const createUserSchema = userSchema.omit({ id: true })

// Client validation schemas
export const clientSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, 'Client name is required'),
  domain: z.string().url('Invalid domain URL'),
  contactEmail: z.string().email().optional(),
  contactName: z.string().min(1).optional(),
  userId: z.string().cuid(),
  googleSearchConsoleConnected: z.boolean().default(false),
  googleAnalyticsConnected: z.boolean().default(false),
  searchConsolePropertyUrl: z.string().url().optional(),
  googleAnalyticsPropertyId: z.string().optional(),
})

export const createClientSchema = clientSchema.omit({ 
  id: true, 
  userId: true,
  googleSearchConsoleConnected: true,
  googleAnalyticsConnected: true,
})

export const updateClientSchema = createClientSchema.partial()

// Report validation schemas
export const reportSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1, 'Report title is required'),
  status: z.enum(['pending', 'processing', 'completed', 'failed']),
  clientId: z.string().cuid(),
  userId: z.string().cuid(),
  data: z.object({
    dateRange: z.object({
      start: z.string().datetime(),
      end: z.string().datetime(),
    }),
    searchConsole: z.object({
      totalClicks: z.number().nonnegative(),
      totalImpressions: z.number().nonnegative(),
      averageCTR: z.number().min(0).max(1),
      averagePosition: z.number().positive(),
      topQueries: z.array(z.object({
        query: z.string(),
        clicks: z.number().nonnegative(),
        impressions: z.number().nonnegative(),
        ctr: z.number().min(0).max(1),
        position: z.number().positive(),
      })),
      topPages: z.array(z.object({
        page: z.string().url(),
        clicks: z.number().nonnegative(),
        impressions: z.number().nonnegative(),
        ctr: z.number().min(0).max(1),
        position: z.number().positive(),
      })),
    }).optional(),
    analytics: z.object({
      totalUsers: z.number().nonnegative(),
      totalSessions: z.number().nonnegative(),
      bounceRate: z.number().min(0).max(1),
      averageSessionDuration: z.number().nonnegative(),
      pageviews: z.number().nonnegative(),
      conversions: z.number().nonnegative().optional(),
      topPages: z.array(z.object({
        page: z.string().url(),
        users: z.number().nonnegative(),
        sessions: z.number().nonnegative(),
        bounceRate: z.number().min(0).max(1),
      })),
      trafficSources: z.array(z.object({
        source: z.string(),
        users: z.number().nonnegative(),
        percentage: z.number().min(0).max(1),
      })),
    }).optional(),
    pagespeed: z.object({
      mobile: z.object({
        score: z.number().min(0).max(100),
        fcp: z.number().nonnegative(),
        lcp: z.number().nonnegative(),
        cls: z.number().nonnegative(),
        fid: z.number().nonnegative(),
      }),
      desktop: z.object({
        score: z.number().min(0).max(100),
        fcp: z.number().nonnegative(),
        lcp: z.number().nonnegative(),
        cls: z.number().nonnegative(),
        fid: z.number().nonnegative(),
      }),
    }).optional(),
    summary: z.object({
      performanceScore: z.number().min(0).max(100),
      keyInsights: z.array(z.string()),
      recommendations: z.array(z.string()),
      previousPeriodComparison: z.object({
        clicksChange: z.number(),
        impressionsChange: z.number(),
        usersChange: z.number(),
        performanceChange: z.number(),
      }).optional(),
    }),
  }).optional(),
  pdfUrl: z.string().url().optional(),
})

export const createReportSchema = z.object({
  title: z.string().min(1, 'Report title is required'),
  clientId: z.string().cuid(),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
})

// Form validation schemas
export const loginFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const brandingFormSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format'),
})

// API parameter validation
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
})

export const sortSchema = z.object({
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export const searchSchema = z.object({
  query: z.string().optional(),
})

// Environment variable validation
export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_ANALYTICS_API_KEY: z.string().optional(),
  PAGESPEED_API_KEY: z.string().optional(),
})
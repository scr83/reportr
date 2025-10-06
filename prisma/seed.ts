import { PrismaClient, Plan, ReportStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      name: 'John Smith',
      email: 'john@digitalagency.com',
      companyName: 'Digital Marketing Pro',
      primaryColor: '#3B82F6',
      plan: Plan.PROFESSIONAL,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      name: 'Sarah Johnson',
      email: 'sarah@seoexperts.com',
      companyName: 'SEO Experts Inc',
      primaryColor: '#10B981',
      plan: Plan.STARTER,
    },
  })

  console.log('👤 Created users:', { user1: user1.email, user2: user2.email })

  // Create sample clients for user1
  const client1 = await prisma.client.create({
    data: {
      name: 'Tech Startup Corp',
      domain: 'https://techstartup.com',
      contactEmail: 'marketing@techstartup.com',
      contactName: 'Mike Wilson',
      userId: user1.id,
      googleSearchConsoleConnected: true,
      googleAnalyticsConnected: true,
      searchConsolePropertyUrl: 'https://techstartup.com/',
      googleAnalyticsPropertyId: 'GA-123456789',
      totalReportsGenerated: 5,
    },
  })

  const client2 = await prisma.client.create({
    data: {
      name: 'Local Restaurant',
      domain: 'https://besttacos.com',
      contactEmail: 'owner@besttacos.com',
      contactName: 'Maria Rodriguez',
      userId: user1.id,
      googleSearchConsoleConnected: false,
      googleAnalyticsConnected: true,
      googleAnalyticsPropertyId: 'GA-987654321',
      totalReportsGenerated: 2,
    },
  })

  // Create sample clients for user2
  const client3 = await prisma.client.create({
    data: {
      name: 'E-commerce Fashion',
      domain: 'https://fashionboutique.com',
      contactEmail: 'support@fashionboutique.com',
      contactName: 'Alex Chen',
      userId: user2.id,
      googleSearchConsoleConnected: true,
      googleAnalyticsConnected: true,
      searchConsolePropertyUrl: 'https://fashionboutique.com/',
      googleAnalyticsPropertyId: 'GA-555444333',
      totalReportsGenerated: 8,
    },
  })

  console.log('🏢 Created clients:', { 
    client1: client1.name, 
    client2: client2.name,
    client3: client3.name 
  })

  // Create sample reports
  const sampleReportData = {
    dateRange: {
      start: '2024-01-01T00:00:00Z',
      end: '2024-01-31T23:59:59Z',
    },
    searchConsole: {
      totalClicks: 12450,
      totalImpressions: 89300,
      averageCTR: 0.139,
      averagePosition: 12.3,
      topQueries: [
        {
          query: 'best tech startup tools',
          clicks: 890,
          impressions: 5600,
          ctr: 0.159,
          position: 8.2,
        },
        {
          query: 'startup software solutions',
          clicks: 720,
          impressions: 4200,
          ctr: 0.171,
          position: 6.8,
        },
        {
          query: 'business automation tools',
          clicks: 650,
          impressions: 3800,
          ctr: 0.171,
          position: 9.1,
        },
      ],
      topPages: [
        {
          page: 'https://techstartup.com/products',
          clicks: 2100,
          impressions: 12800,
          ctr: 0.164,
          position: 7.2,
        },
        {
          page: 'https://techstartup.com/solutions',
          clicks: 1850,
          impressions: 11200,
          ctr: 0.165,
          position: 8.4,
        },
      ],
    },
    analytics: {
      totalUsers: 8940,
      totalSessions: 12670,
      bounceRate: 0.42,
      averageSessionDuration: 185,
      pageviews: 28450,
      conversions: 156,
      topPages: [
        {
          page: 'https://techstartup.com/',
          users: 3200,
          sessions: 4100,
          bounceRate: 0.38,
        },
        {
          page: 'https://techstartup.com/products',
          users: 2100,
          sessions: 2850,
          bounceRate: 0.35,
        },
      ],
      trafficSources: [
        {
          source: 'google',
          users: 5890,
          percentage: 0.659,
        },
        {
          source: 'direct',
          users: 1780,
          percentage: 0.199,
        },
        {
          source: 'social',
          users: 890,
          percentage: 0.099,
        },
      ],
    },
    pagespeed: {
      mobile: {
        score: 82,
        fcp: 2.1,
        lcp: 3.8,
        cls: 0.08,
        fid: 95,
      },
      desktop: {
        score: 94,
        fcp: 1.2,
        lcp: 2.1,
        cls: 0.05,
        fid: 45,
      },
    },
    summary: {
      performanceScore: 88,
      keyInsights: [
        'Organic traffic increased by 23% compared to previous month',
        'Top performing page: /products with 2,100 clicks',
        'Mobile performance could be improved (score: 82)',
        'Conversion rate is above industry average at 1.23%',
      ],
      recommendations: [
        'Optimize images for mobile devices to improve loading speed',
        'Create more content targeting high-performing keywords',
        'Implement structured data for better search visibility',
        'Improve internal linking to boost page authority',
      ],
      previousPeriodComparison: {
        clicksChange: 0.23,
        impressionsChange: 0.18,
        usersChange: 0.31,
        performanceChange: 0.12,
      },
    },
  }

  const report1 = await prisma.report.create({
    data: {
      title: 'January 2024 SEO Report - Tech Startup Corp',
      status: ReportStatus.COMPLETED,
      clientId: client1.id,
      userId: user1.id,
      data: sampleReportData,
      pdfUrl: 'https://example.com/reports/report-1.pdf',
      generationTimeMs: 15400,
      processingCompletedAt: new Date(),
    },
  })

  const report2 = await prisma.report.create({
    data: {
      title: 'December 2023 SEO Report - Tech Startup Corp',
      status: ReportStatus.COMPLETED,
      clientId: client1.id,
      userId: user1.id,
      data: {
        ...sampleReportData,
        dateRange: {
          start: '2023-12-01T00:00:00Z',
          end: '2023-12-31T23:59:59Z',
        },
      },
      pdfUrl: 'https://example.com/reports/report-2.pdf',
      generationTimeMs: 14200,
      processingCompletedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    },
  })

  const report3 = await prisma.report.create({
    data: {
      title: 'January 2024 SEO Report - E-commerce Fashion',
      status: ReportStatus.PROCESSING,
      clientId: client3.id,
      userId: user2.id,
      processingStartedAt: new Date(),
    },
  })

  console.log('📊 Created reports:', { 
    report1: report1.title, 
    report2: report2.title,
    report3: report3.title 
  })

  // Create sample app settings
  await prisma.appSetting.createMany({
    data: [
      {
        key: 'default_report_template',
        value: 'standard',
        description: 'Default template used for new reports',
      },
      {
        key: 'max_reports_per_month',
        value: { free: 3, starter: 25, professional: 100, enterprise: 500 },
        description: 'Maximum reports per month by plan',
      },
      {
        key: 'api_rate_limits',
        value: { 
          requests_per_minute: 100, 
          requests_per_hour: 1000,
          requests_per_day: 10000 
        },
        description: 'API rate limiting configuration',
      },
    ],
  })

  // Create sample API usage records
  await prisma.apiUsage.createMany({
    data: [
      {
        userId: user1.id,
        endpoint: '/api/reports',
        method: 'POST',
        statusCode: 200,
        responseTime: 1540,
        cost: 0.05,
      },
      {
        userId: user1.id,
        endpoint: '/api/clients',
        method: 'GET',
        statusCode: 200,
        responseTime: 220,
        cost: 0.01,
      },
      {
        userId: user2.id,
        endpoint: '/api/reports',
        method: 'POST',
        statusCode: 200,
        responseTime: 1820,
        cost: 0.05,
      },
    ],
  })

  console.log('⚙️  Created app settings and API usage records')

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
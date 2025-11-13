import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://reportr.agency'
  
  // Blog posts
  const blogPosts = [
    'white-label-seo-reporting-guide',
    'vs-agency-analytics',
    'white-label-seo-pricing',
    'white-label-seo-software-compared',
    'stop-sending-generic-seo-reports',
    'best-white-label-seo-reporting-tool',
    'setup-reportr-5-minutes',
    'why-i-built-reportr-founder-story',
  ]

  const blogUrls = blogPosts.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogUrls,
  ]
}

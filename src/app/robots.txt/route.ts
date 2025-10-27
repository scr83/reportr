export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reportr.agency'
  
  const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Block access to admin areas
Disallow: /api/
Disallow: /dashboard/
Disallow: /onboarding/
Disallow: /settings/

# Allow blog content
Allow: /blog/
Allow: /blog/*

# Allow important pages
Allow: /pricing
Allow: /showcase
Allow: /privacy
Allow: /terms`

  return new Response(robotsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
# 🎯 REPORTR TECHNICAL SEO MASTER PLAN
## 6-Week Sprint: Dec 18, 2024 - Jan 28, 2025

---

## EXECUTIVE SUMMARY

**Current State (Week 6 of site launch):**
- Average Position: 64.2
- Daily Impressions: 600+ (6-day streak) ✅
- Desktop Performance: 97/100 ✅
- Mobile Performance: 78/100 ⚠️
- SEO Score: 100/100 ✅
- Pages Indexed: 8/23 ❌ **CRITICAL ISSUE**

**Goal by Mid-January:**
- Average Position: 40-50
- Daily Impressions: 1,000+
- Mobile Performance: 90+
- All 23 blog posts indexed

**Critical Issues Found:**
1. ❌ 15 blog posts missing from sitemap (only 8/23 indexed)
2. ❌ Wrong domain in robots.txt (reportr.com vs reportr.agency)
3. ⚠️ Mobile performance needs optimization (78→90+)
4. ✅ Desktop already excellent

---

## WEEK 1 (DEC 18-24): CRITICAL INDEXATION FIXES
**Priority: Get all 23 blog posts indexed immediately**

### 1.1 Fix Sitemap Generation ⚡ HIGHEST PRIORITY

**Problem:** sitemap.ts only lists 8 posts manually. 15 posts are orphaned.

**Solution: Replace sitemap.ts with dynamic generation**

```typescript
// src/app/sitemap.ts - REPLACE ENTIRE FILE
import { getBlogPosts } from '@/lib/blog';

export default async function sitemap() {
  const baseUrl = 'https://reportr.agency';
  
  // Get all blog posts dynamically from filesystem
  const posts = await getBlogPosts();
  
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishDate || new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: post.slug === 'white-label-seo-reporting-guide' ? 1.0 : 0.8,
  }));

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  return [...staticPages, ...blogPosts];
}
```

**Action Items:**
- [ ] Update sitemap.ts to dynamically read all blog posts
- [ ] Deploy to production
- [ ] Verify at https://reportr.agency/sitemap.xml (should show 23+ blog posts)
- [ ] Submit updated sitemap to Google Search Console
- [ ] Request indexing for all 15 missing posts in GSC

**Expected Impact:** +300-400 daily impressions within 7-10 days

---

### 1.2 Fix robots.txt Domain Issue

**Problem:** robots.txt references reportr.com instead of reportr.agency

**Solution:**

```txt
# /public/robots.txt - REPLACE ENTIRE FILE
User-agent: *
Allow: /

# Disallow admin and API routes
Disallow: /api/
Disallow: /dashboard/
Disallow: /settings/
Disallow: /auth/

# Block low-value pages from crawl budget
Disallow: /*?utm_*
Disallow: /*?ref=*
Disallow: /lp/*

# Sitemap location (CORRECTED DOMAIN)
Sitemap: https://reportr.agency/sitemap.xml

# Block AI scrapers (optional)
User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /
```

**Action Items:**
- [ ] Update robots.txt with correct domain
- [ ] Deploy to production
- [ ] Test at https://reportr.agency/robots.txt
- [ ] Verify in GSC → Settings → robots.txt Tester

---

### 1.3 Manual Indexing Request Blitz

**15 Missing Blog Posts to Submit:**
1. /blog/agency-analytics-vs-white-label-reporting
2. /blog/white-label-seo-reporting-faq
3. /blog/seo-report-automation-roi
4. /blog/best-seo-software-small-agencies
5. /blog/automated-seo-reporting-process
6. /blog/semrush
7. /blog/automate-client-seo-reports
8. /blog/signs-you-need-automated-reporting
9. /blog/what-is-white-label-seo-report
10. /blog/how-to-create-white-label-seo-reports
11. /blog/how-to-create-seo-reports-clients
12. /blog/agency-reporting-best-practices
13. /blog/what-clients-want-seo-reports
14. /blog/vs-swydo
15. /blog/vs-dashthis

**Action Items:**
- [ ] Day 1: Request indexing for 10 URLs in GSC (URL Inspection Tool)
- [ ] Day 2: Request indexing for remaining 5 URLs
- [ ] Monitor GSC Coverage report for indexation status

**Note:** Google limits ~10 indexing requests per day.

---

### 1.4 Create Image Sitemap (Bonus)

**Create new file:**

```typescript
// src/app/sitemap-images.xml/route.ts - NEW FILE
import { getBlogPosts } from '@/lib/blog';

export async function GET() {
  const baseUrl = 'https://reportr.agency';
  const posts = await getBlogPosts();
  
  const imageEntries = posts
    .filter(post => post.featuredImage)
    .map(post => `
      <url>
        <loc>${baseUrl}/blog/${post.slug}</loc>
        <image:image>
          <image:loc>${baseUrl}${post.featuredImage}</image:loc>
          <image:title>${post.title}</image:title>
          <image:caption>${post.excerpt}</image:caption>
        </image:image>
      </url>
    `)
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      ${imageEntries}
    </urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
```

**Action Items:**
- [ ] Create image sitemap route
- [ ] Add to robots.txt: `Sitemap: https://reportr.agency/sitemap-images.xml`
- [ ] Submit to GSC

---

## WEEK 2 (DEC 25-31): MOBILE PERFORMANCE OPTIMIZATION
**Priority: Move mobile score from 78 → 90+**

### 2.1 Diagnose Mobile Performance Issues

**Action Items:**
- [ ] Run PageSpeed Insights on mobile for:
  - Homepage
  - /blog/white-label-seo-reporting-guide
  - /blog/vs-dashthis
  - /pricing
- [ ] Record specific issues (likely):
  - LCP (Largest Contentful Paint) > 2.5s
  - CLS (Cumulative Layout Shift) > 0.1
  - Large JavaScript bundles
  - Unoptimized images on mobile

---

### 2.2 Mobile Image Optimization

**Implementation: Add responsive image sizes**

```typescript
// For blog post featured images
<Image
  src={post.featuredImage}
  alt={post.title}
  width={1200}
  height={630}
  priority={false} // Only true for above-fold hero
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={85} // Reduce from default 100
/>
```

**Action Items:**
- [ ] Audit all `<Image>` components in blog template
- [ ] Add responsive `sizes` attribute to all images
- [ ] Reduce `quality` to 80-85 for mobile
- [ ] Ensure all images have explicit width/height (prevents CLS)

**Expected Impact:** LCP improvement 1-1.5s

---

### 2.3 Defer Non-Critical JavaScript

**Check for these scripts:**
- [ ] Analytics scripts (Google Analytics, Plausible)
- [ ] Chat widgets (Intercom, Drift)
- [ ] Social media embeds

**Implementation:**

```typescript
// app/layout.tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXX"
  strategy="afterInteractive" // Change from "beforeInteractive"
/>
```

**Action Items:**
- [ ] Move all analytics to `strategy="afterInteractive"`
- [ ] Remove unused third-party scripts
- [ ] Run `npm run build` → Check bundle sizes

**Expected Impact:** FID improvement 50-100ms

---

### 2.4 Mobile Layout CLS Fixes

**Common CLS culprits:**

```css
/* Fixed navigation height */
.mobile-nav {
  height: 64px; /* Prevents CLS */
}

/* Reserve space for images */
.blog-featured-image {
  aspect-ratio: 1200 / 630;
}

/* Font loading optimization */
@font-face {
  font-family: 'Inter';
  font-display: swap; /* Or 'optional' */
}
```

**Action Items:**
- [ ] Verify mobile navigation has fixed height
- [ ] Check font-display strategy
- [ ] Test on actual mobile device (iPhone + Android)

**Expected Impact:** CLS reduction to <0.1

---

## WEEK 3 (JAN 1-7): INTERNATIONAL SEO
**Priority: Capture UK/AU/CA traffic**

### 3.1 Verify Hreflang Rendering

**Test Current State:**
- [ ] View source on blog post
- [ ] Search for "hreflang" in HTML
- [ ] Verify 8 hreflang tags in `<head>` (7 markets + x-default)

**If NOT present, implement:**

```typescript
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: {
      canonical: `https://reportr.agency/blog/${params.slug}`,
      languages: {
        'en-US': `https://reportr.agency/blog/${params.slug}`,
        'en-GB': `https://reportr.agency/blog/${params.slug}`,
        'en-AU': `https://reportr.agency/blog/${params.slug}`,
        'en-CA': `https://reportr.agency/blog/${params.slug}`,
        'en-NZ': `https://reportr.agency/blog/${params.slug}`,
        'en-IE': `https://reportr.agency/blog/${params.slug}`,
        'en-IN': `https://reportr.agency/blog/${params.slug}`,
        'x-default': `https://reportr.agency/blog/${params.slug}`,
      }
    }
  };
}
```

**Action Items:**
- [ ] Implement hreflang in Next.js metadata API
- [ ] Test with Merkle Hreflang Testing Tool
- [ ] Verify in GSC → International Targeting

**Expected Impact:** +150-200 daily impressions from international markets

---

### 3.2 GSC International Tracking

**Action Items:**
- [ ] GSC → Search Results → Add filter "Country"
- [ ] Create saved report: "International Performance"
- [ ] Track weekly:
  - US vs UK vs AU vs CA impressions
  - Which markets growing fastest
  - Any hreflang errors

---

## WEEK 4 (JAN 8-14): STRUCTURED DATA
**Priority: Enhanced SERP appearance**

### 4.1 Article Schema for Blog Posts

**Check current state:**
- [ ] View source on blog post
- [ ] Search for `application/ld+json`
- [ ] If NOT present → Implement below

```typescript
// components/blog/ArticleSchema.tsx - NEW FILE
export function ArticleSchema({ post }: { post: BlogPost }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: `https://reportr.agency${post.featuredImage}`,
    datePublished: post.publishDate,
    dateModified: post.updatedDate || post.publishDate,
    author: {
      '@type': 'Organization',
      name: 'Reportr',
      url: 'https://reportr.agency'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Reportr',
      logo: {
        '@type': 'ImageObject',
        url: 'https://reportr.agency/logo.png'
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

**Action Items:**
- [ ] Add ArticleSchema component to blog template
- [ ] Test with Google Rich Results Test
- [ ] Verify no errors in GSC → Enhancements

**Expected Impact:** Potential featured snippets, enhanced SERP

---

### 4.2 Organization Schema (Homepage)

```typescript
// app/page.tsx - Add to homepage
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Reportr',
  url: 'https://reportr.agency',
  logo: 'https://reportr.agency/logo.png',
  description: 'White-label SEO reporting software for agencies.',
  foundingDate: '2024',
  founders: [{
    '@type': 'Person',
    name: 'Sebastian'
  }]
};
```

**Action Items:**
- [ ] Add Organization schema to homepage
- [ ] Test with Rich Results Test
- [ ] Verify no errors in GSC

---

### 4.3 SoftwareApplication Schema

```typescript
const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Reportr',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '29.00',
    priceCurrency: 'USD'
  }
};
```

**Action Items:**
- [ ] Add SoftwareApplication schema to homepage
- [ ] Test with Rich Results Test

---

## WEEK 5 (JAN 15-21): INTERNAL LINKING
**Priority: Strengthen topic authority**

### 5.1 Create SEO Resources Hub

**New Page: `/resources/seo-reporting`**

**Structure:**
- White Label SEO Reporting section (6 card grid)
- Automated Reporting section (4 card grid)
- Tool Comparisons section (4 card grid)

**Action Items:**
- [ ] Create resources hub page
- [ ] Link FROM pillar post TO hub
- [ ] Add hub to main navigation
- [ ] Submit to GSC for indexing

---

### 5.2 Internal Link Audit

**Use Screaming Frog (Free):**
- [ ] Crawl reportr.agency
- [ ] Export: Internal Links report
- [ ] Identify pages with <3 internal links
- [ ] Add 3-5 contextual links to weak pages

**Target Structure:**
- Pillar post: 15-20 incoming links
- Supporting posts: 5-8 incoming links each

---

## WEEK 6 (JAN 22-28): TECHNICAL POLISH
**Priority: Final optimizations + monitoring**

### 6.1 Canonical URL Audit

**Quick Check:**
- [ ] View source on 5 random blog posts
- [ ] Verify canonical: `https://reportr.agency/blog/[slug]`
- [ ] No trailing slash inconsistency
- [ ] HTTPS (not HTTP)

---

### 6.2 GSC Coverage Review

**Action Items:**
- [ ] GSC → Coverage → Check for errors
- [ ] Fix "Discovered - currently not indexed"
- [ ] Fix "Crawled - currently not indexed"
- [ ] Request indexing for stuck pages

---

### 6.3 Mobile Usability Check

**Action Items:**
- [ ] GSC → Mobile Usability → Check errors
- [ ] Fix: Text too small
- [ ] Fix: Clickable elements too close
- [ ] Fix: Content wider than screen
- [ ] Test on iPhone and Android

---

### 6.4 Weekly Tracking Dashboard

**Metrics to Track Every Monday:**

| Metric | Week 1 | Week 2 | Week 3 | Week 4 | Week 5 | Week 6 | Target |
|--------|--------|--------|--------|--------|--------|--------|--------|
| Avg Position | 64.2 | | | | | | 40-50 |
| Daily Impressions | 600 | | | | | | 1,000+ |
| Daily Clicks | ? | | | | | | 40+ |
| Pages Indexed | 8 | | | | | | 23+ |
| Mobile Score | 78 | | | | | | 90+ |
| Desktop Score | 97 | | | | | | 97+ |

---

## DAILY/WEEKLY ROUTINES

### Daily (5 minutes):
- [ ] Check GSC for new errors
- [ ] Monitor position changes for top 5 keywords

### Weekly (30 minutes):
- [ ] Update tracking sheet above
- [ ] Review search terms for new opportunities
- [ ] Check for new backlinks
- [ ] Monitor competitor content

### Bi-Weekly (1 hour):
- [ ] Deep dive GSC Performance report
- [ ] Analyze which posts gaining traction
- [ ] Identify underperforming posts
- [ ] Review Core Web Vitals trends

---

## PROJECTIONS BY MID-JANUARY

### Conservative (80% probability):
- **Average Position:** 50-56
- **Daily Impressions:** 850-950
- **Daily Clicks:** 35-45
- **Pages Indexed:** 23+
- **Mobile Score:** 85-90

### Optimistic (40% probability):
- **Average Position:** 45-50
- **Daily Impressions:** 1,000-1,200
- **Daily Clicks:** 45-60
- **Mobile Score:** 90+

**Math Behind Optimistic:**
- 600 base impressions
- × 1.6 (15 new posts indexed)
- × 1.12 (mobile improvement)
- × 1.22 (international hreflang)
- = **1,313 daily impressions**

---

## SUCCESS CRITERIA

### Must-Have by Jan 28:
- [ ] All 23 blog posts indexed in GSC
- [ ] Mobile performance 85+
- [ ] Average position 52 or better
- [ ] 900+ daily impressions
- [ ] Zero coverage errors in GSC

### Nice-to-Have:
- [ ] Average position 48 or better
- [ ] 1,100+ daily impressions
- [ ] Article schema on all posts
- [ ] Resources hub page live

---

## CRITICAL PATH - WHAT TO DO TODAY

### TODAY (Dec 17):
1. ✅ Fix sitemap.ts to load all 23 posts dynamically
2. ✅ Fix robots.txt domain (reportr.com → reportr.agency)
3. ✅ Deploy both changes
4. ✅ Verify at https://reportr.agency/sitemap.xml
5. ✅ Submit updated sitemap to GSC
6. ✅ Request indexing for 10 missing posts

### Tomorrow (Dec 18):
1. Request indexing for remaining 5 posts
2. Create image sitemap
3. Run mobile PageSpeed tests

### This Week:
1. Verify hreflang rendering
2. Start mobile performance fixes
3. Add Article schema to blog posts

---

## CONTINGENCY PLANS

### If Position Drops Week 3-4:
**Don't panic.** Likely algorithm update or re-indexing.
- Check GSC for manual actions
- Verify no robots.txt blocks
- Continue with plan

### If Impressions Plateau Week 4:
- Double down on international SEO
- Publish 1-2 additional posts
- Request indexing manually

### If Mobile Score Doesn't Improve:
- Upgrade Vercel plan (if free tier)
- Investigate third-party scripts
- Implement aggressive caching

---

## NOTES

**Skip These (Not Needed):**
- ❌ Crawl delay (Vercel fast enough)
- ❌ Aggressive caching (Next.js ISR optimized)
- ❌ Security headers (Vercel handles)
- ❌ HTTPS audit (Vercel enforces)

**Priority Focus:**
- ✅ Sitemap fixes (critical)
- ✅ Mobile performance (only weakness)
- ✅ Hreflang (international opportunity)
- ✅ Structured data (SERP enhancement)

**You're 60% to goal already with 600/day impressions. The missing sitemap entries are your biggest opportunity.**

---

**Document Version:** 1.0
**Created:** December 17, 2024
**Owner:** Sebastian - Reportr
**Review Frequency:** Weekly (Every Monday)
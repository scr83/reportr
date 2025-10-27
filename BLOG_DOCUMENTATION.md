# Reportr Blog System Documentation

## 🎯 Overview

The Reportr blog system is a complete SEO-optimized content management solution designed to drive organic traffic and convert visitors into trial users. It's built on Next.js 14 with TypeScript and includes advanced SEO features, conversion optimization, and performance monitoring.

## 📁 File Structure

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx              # Blog index with pagination
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Dynamic blog post pages
│   │   └── sitemap.xml/route.ts  # XML sitemap generation
│   └── robots.txt/route.ts       # Robots.txt generation
├── components/
│   └── blog/
│       ├── BlogPost.tsx          # Main blog post component
│       ├── CTAEarly.tsx          # Early conversion CTA
│       ├── CTAMid.tsx            # Mid-article CTA
│       ├── CTALate.tsx           # Late-article CTA
│       ├── CTAConclusion.tsx     # Conclusion CTA
│       ├── RelatedArticles.tsx   # Related posts widget
│       ├── TableOfContents.tsx   # Auto-generated TOC
│       ├── ReadingProgress.tsx   # Reading progress bar
│       └── SocialShare.tsx       # Social sharing buttons
├── lib/
│   └── blog.ts                   # Blog utilities and data fetching
└── content/
    └── blog/
        ├── white-label-seo-reporting-guide.mdx
        ├── white-label-seo-pricing.mdx
        ├── best-white-label-seo-reporting-tool.mdx
        ├── stop-sending-generic-seo-reports.mdx
        ├── white-label-seo-software-compared.mdx
        ├── agency-analytics-vs-white-label-reporting.mdx
        ├── setup-white-label-seo-reports.mdx
        ├── white-label-automation-case-study.mdx
        ├── white-label-seo-reporting-faq.mdx
        └── vs-agency-analytics.mdx
```

## 📝 How to Publish a New Blog Post

### Step 1: Create the MDX File

1. Navigate to `/content/blog/`
2. Create a new `.mdx` file with a descriptive slug (e.g., `new-article-title.mdx`)

### Step 2: Add Frontmatter

Include this frontmatter at the top of your file:

```yaml
---
title: "SEO-optimized title for readers"
metaTitle: "Title for <title> tag (50-60 chars)"
metaDescription: "Description for meta tag (120-155 chars)"
slug: "url-slug-matches-filename"
targetKeyword: "primary keyword for SEO"
searchVolume: 1200
keywordDifficulty: 15
contentType: "Pillar" # or "Supporting", "Comparison"
publishDate: "2025-01-15"
author: "Reportr Team"
featuredImage: "/images/blog/article-hero.jpg"
excerpt: "Brief summary for blog index (120-160 chars)"
relatedPosts: ["related-slug-1", "related-slug-2", "related-slug-3"]
---
```

### Step 3: Write Your Content

Follow this structure for optimal SEO and conversion:

```markdown
# Article Title (H1 - include target keyword)

<!-- INTRO: 120-150 words -->
<!-- Include target keyword in first 100 words -->
Brief introduction that hooks the reader and clearly states what they'll learn.

## Section 1 Title (H2)
<!-- 250-350 words -->
Main content section. Use target keyword naturally.

## Section 2 Title (H2)
<!-- 300-400 words -->
Continue building value for the reader.

## Section 3 Title (H2)
<!-- 350-450 words -->
Deep dive into the topic.

## Section 4 Title (H2)
<!-- 300-400 words -->
Additional insights and examples.

## Section 5 Title (H2)
<!-- 250-300 words -->
Practical tips and actionable advice.

## Conclusion
<!-- 120-150 words -->
Summarize key points and include a call-to-action.

## Frequently Asked Questions

### Question 1?
Answer (40-80 words)

### Question 2?
Answer (40-80 words)

### Question 3?
Answer (40-80 words)

### Question 4?
Answer (40-80 words)

<!-- TARGETS -->
<!-- Word Count: 1,800-2,200 words -->
<!-- Internal Links: 8-10 -->
<!-- Images: 4-5 -->
<!-- Target Keyword Density: 1-2% -->
```

### Step 4: Optimize for SEO

**Required Elements:**
- ✅ Title tag (50-60 characters)
- ✅ Meta description (120-155 characters)
- ✅ H1 with target keyword
- ✅ 8-10 internal links to other blog posts or pages
- ✅ Target keyword in first 100 words
- ✅ Natural keyword distribution (1-2% density)
- ✅ FAQ section for featured snippets
- ✅ Alt text for images

**Content Guidelines:**
- Target 2,000 words average
- Use short paragraphs (2-3 sentences)
- Include bullet points and numbered lists
- Add relevant examples and case studies
- Write for readability (8th grade level)

### Step 5: Add CTAs (Automatic)

The system automatically includes 4 strategically placed CTAs:
1. **Early CTA** - After introduction for high-intent users
2. **Mid CTA** - Soft pitch mid-article
3. **Late CTA** - Post-problem-solution conversion
4. **Conclusion CTA** - Strong final push

No manual CTA insertion needed - they're automatically optimized for conversion.

### Step 6: Deploy

1. Save your `.mdx` file to `/content/blog/`
2. The article will automatically appear at `/blog/your-slug`
3. Blog index will update automatically
4. XML sitemap will include the new post

## 🔧 Technical Features

### SEO Optimization
- **Automatic meta tags** from frontmatter
- **JSON-LD structured data** (BlogPosting schema)
- **Open Graph tags** for social sharing
- **Twitter Card tags** for Twitter sharing
- **Canonical URLs** (self-referencing)
- **XML sitemap** auto-generation
- **Robots.txt** with proper directives

### Performance Features
- **Reading progress bar** at top of page
- **Lazy loading** for images and components
- **Code splitting** for blog components
- **Optimized fonts** and assets
- **Core Web Vitals** optimized

### Analytics Tracking
- **Pageview tracking** on load
- **Scroll depth tracking** (25%, 50%, 75%, 100%)
- **CTA click tracking** with UTM parameters
- **Internal link tracking** for navigation insights
- **Social share tracking** for engagement metrics
- **Time on page** and bounce rate monitoring

### User Experience
- **Table of contents** auto-generated from H2/H3 headings
- **Active heading highlighting** during scroll
- **Related articles** widget at bottom
- **Social sharing** buttons
- **Copy link** functionality
- **Author bio** section
- **Breadcrumb navigation**
- **Mobile-responsive** design

## 📊 Conversion Optimization

### CTA Strategy
Each blog post includes 4 conversion points:

1. **CTAEarly** (150 words in)
   - Target: High-intent users ready to convert
   - Copy: "Skip the Research. Start Creating..."
   - CTA: "Start Free Trial"

2. **CTAMid** (40% through)
   - Target: Users learning about solutions
   - Copy: "See Reportr in Action"
   - CTA: "View Live Demo" + "Start Free Trial"

3. **CTALate** (70% through)
   - Target: Users convinced of need
   - Copy: "Ready to Transform Your Agency?"
   - CTA: "Start Free 14-Day Trial"

4. **CTAConclusion** (End of article)
   - Target: All remaining readers
   - Copy: "Transform Your Agency Today"
   - CTA: "Start Your Free Trial Now"

### UTM Tracking
All CTAs include UTM parameters:
- `utm_source=blog`
- `utm_medium=cta`
- `utm_campaign=[position]`
- `ref=blog-[position]-cta`

## 🎨 Design System

### Colors
- **Primary**: Purple (#7e23ce)
- **Text**: Gray-900 (#111827)
- **Secondary Text**: Gray-600 (#4B5563)
- **Background**: White (#ffffff)
- **Accent**: Purple-100 (#F3E8FF)

### Typography
- **Headings**: Outfit font family, bold weights
- **Body**: Inter font family, 18px base size
- **Code**: Mono font family

### Components
All components follow atomic design principles:
- **Atoms**: Button, Typography, etc.
- **Molecules**: CTA blocks, social share
- **Organisms**: Related articles, table of contents
- **Templates**: Blog post layout

## 🚀 Performance Targets

- **PageSpeed Score**: 90+ (mobile & desktop)
- **Largest Contentful Paint**: <2.5s
- **First Input Delay**: <100ms
- **Cumulative Layout Shift**: <0.1
- **Core Web Vitals**: All green

## 📈 SEO Strategy

### Target Keywords (Month 1)
1. "white label seo reports" (1,900 volume, KD 14)
2. "white label seo pricing" (390 volume, KD 11)
3. "white label seo reporting tool" (1,000 volume, KD 15)
4. "seo report white label" (480 volume, KD 20)
5. "white label seo software" (240 volume, KD 16)
6. "white label seo reporting" (480 volume, KD 12)
7. "white label seo reports setup" (210 volume, KD 8)
8. "white label seo automation" (170 volume, KD 9)
9. "white label seo reporting questions" (140 volume, KD 6)
10. "agency analytics alternative" (140 volume, KD 30)

### Content Strategy
- **Pillar Content**: Comprehensive guides (2,500+ words)
- **Supporting Content**: Specific topics (1,800-2,200 words)
- **Comparison Content**: Tool/service comparisons
- **Internal Linking**: 8-10 links per post to related content

## 🔍 Quality Checklist

Before publishing, ensure:
- [ ] Frontmatter is complete and accurate
- [ ] Target keyword appears in first 100 words
- [ ] Title includes target keyword
- [ ] Meta description is compelling and 120-155 chars
- [ ] Content is 1,800+ words
- [ ] 8-10 internal links included
- [ ] FAQ section with 4+ questions
- [ ] Images have descriptive alt text
- [ ] Content provides genuine value
- [ ] Grammar and spelling checked
- [ ] Links work and are relevant
- [ ] Mobile formatting looks good

## 🛠️ Troubleshooting

### Common Issues

**Blog post not appearing:**
- Check file is in `/content/blog/` directory
- Ensure `.mdx` extension
- Verify frontmatter syntax
- Check slug matches filename

**Images not loading:**
- Images should be in `/public/images/blog/`
- Use absolute paths starting with `/`
- Optimize images (WebP format recommended)

**SEO metadata missing:**
- Verify all frontmatter fields are present
- Check for typos in field names
- Ensure quotes are properly escaped

**Styling issues:**
- Tailwind classes are automatically applied
- Custom styling goes in component files
- Test on mobile and desktop

## 📞 Support

For technical issues or questions about the blog system:
1. Check this documentation first
2. Review the example blog posts
3. Test changes in development environment
4. Contact development team if issues persist

---

**Success Metric**: This blog system should drive 30%+ of qualified trial signups within 90 days through organic search traffic.
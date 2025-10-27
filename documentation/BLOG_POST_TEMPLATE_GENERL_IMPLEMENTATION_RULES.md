Blog Post Template - General Implementation Rules
1. MDX File Structure (Content Layer)
Every blog post should follow this structure:
mdx---
title: "Your SEO-Optimized Title with Target Keyword"
description: "Meta description with keyword (150-160 chars)"
date: "YYYY-MM-DD"
author: "Reportr Team"
readTime: "X min read"
---

## H2 Heading with Target Keyword for SEO

Educational paragraph using "white label SEO reports" naturally for keyword density.

Generic industry context that uses the keyword phrase for search visibility.

**Product-specific paragraph:** When talking about our platform capabilities, use "Reportr" instead. For example: "Reportr automates this entire process in 30 seconds."

<CTA 
  text="Start Free Trial →"
  link="/signup"
  variant="prominent"
/>

## Another H2 with Keyword Variation

Continue mixing educational content (keyword usage) with product-specific content (Reportr usage).

### H3 Subheading for Structure

When listing key takeaways or bullet points:

- **First benefit**: Description here
- **Second benefit**: Description here
- **Third benefit**: Description here

### Data Tables (when needed)

| Query | Clicks | Impressions | CTR | Position |
|-------|--------|-------------|-----|----------|
| keyword 1 | 150 | 5000 | 3.0% | 5.2 |
| keyword 2 | 89 | 3200 | 2.8% | 8.1 |

## Conclusion

Final paragraph wrapping up with "Reportr" as the solution to the problem discussed.

Key takeaways from this guide:

- **Benefit 1**: Specific outcome
- **Benefit 2**: Specific outcome  
- **Benefit 3**: Specific outcome

<CTA 
  text="Try Reportr Free for 14 Days →"
  link="/signup"
  subtitle="No credit card required"
  variant="prominent"
/>
2. Component Templates
Create reusable components:
CTA Component (/components/blog/BlogCTA.tsx)
tsxinterface BlogCTAProps {
  text: string;
  link: string;
  subtitle?: string;
  variant?: 'prominent' | 'subtle';
}

export function BlogCTA({ text, link, subtitle, variant = 'prominent' }: BlogCTAProps) {
  if (variant === 'prominent') {
    return (
      <div className="my-8 p-6 bg-purple-50 rounded-xl">
        
          href={link}
          className="inline-block w-full md:w-auto px-8 py-4 text-lg font-bold text-purple-600 bg-white border-2 border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300 text-center"
        >
          {text}
        </a>
        {subtitle && (
          <p className="mt-3 text-sm text-gray-600 text-center md:text-left">
            {subtitle}
          </p>
        )}
      </div>
    );
  }
  // ... subtle variant
}
Table Wrapper (/components/blog/BlogTable.tsx)
tsxexport function BlogTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 overflow-x-auto rounded-lg shadow-md">
      <table className="w-full">
        {children}
      </table>
    </div>
  );
}

// Automatic styling via global CSS
// In globals.css or blog-post.css:
article table {
  @apply w-full my-8 overflow-hidden rounded-lg shadow-md;
}

article thead {
  @apply bg-purple-600 text-white;
}

article th {
  @apply px-6 py-4 text-left font-semibold;
}

article tbody tr {
  @apply border-b;
}

article tbody tr:nth-child(even) {
  @apply bg-gray-50;
}

article tbody tr:nth-child(odd) {
  @apply bg-white;
}

article tbody tr:hover {
  @apply bg-purple-50;
}

article td {
  @apply px-6 py-4;
}
List Styling (Automatic via CSS)
css/* In globals.css or blog-post.css */
article ul {
  @apply space-y-2 my-6;
}

article ul li {
  @apply flex items-start;
}

article ul li::before {
  content: "•";
  @apply text-purple-600 mr-3 mt-1 text-xl font-bold;
}

/* For bold list items */
article ul li strong {
  @apply text-gray-900 font-semibold;
}
```

## 3. Writing Guidelines Template

**Create a writer's guide document:**

### Keyword vs Product Usage Rules
```
RULE: Use "white label SEO reports" for SEO, "Reportr" for product

✅ CORRECT EXAMPLES:
- H2: "Why Your Agency Needs White Label SEO Reports" (SEO)
- Body: "Reportr automates this process in 30 seconds" (Product)
- Body: "The solution is Reportr's white label reporting" (Hybrid)

❌ INCORRECT EXAMPLES:
- Body: "White label SEO reports can generate your reports in 30 seconds" (Too generic for product feature)
- CTA: "Try white label SEO reports free" (Should be "Try Reportr free")
```

### Content Structure Checklist
```
Every blog post must have:
□ SEO-optimized title with target keyword
□ Meta description (150-160 chars)
□ H2 headings with keyword variations
□ Educational content (keyword usage)
□ Product-specific content (Reportr usage)
□ At least 2 CTAs (intro section + conclusion)
□ Bulleted lists for key takeaways
□ Tables formatted (if applicable)
□ No fake testimonials or case studies
□ Conclusion with clear next steps
4. CSS Global Styles
Create /styles/blog-post.css:
css/* Blog Post Typography */
.blog-content {
  @apply text-gray-700 leading-relaxed;
}

.blog-content h2 {
  @apply text-3xl font-bold text-gray-900 mt-12 mb-6;
}

.blog-content h3 {
  @apply text-2xl font-semibold text-gray-900 mt-8 mb-4;
}

.blog-content p {
  @apply my-6 text-lg;
}

/* Tables - Automatic Styling */
.blog-content table {
  @apply w-full my-8 overflow-hidden rounded-lg shadow-md;
}

.blog-content thead {
  @apply bg-purple-600 text-white;
}

.blog-content th {
  @apply px-6 py-4 text-left font-semibold;
}

.blog-content tbody tr {
  @apply border-b;
}

.blog-content tbody tr:nth-child(even) {
  @apply bg-gray-50;
}

.blog-content tbody tr:nth-child(odd) {
  @apply bg-white;
}

.blog-content tbody tr:hover {
  @apply bg-purple-50 transition-colors duration-200;
}

.blog-content td {
  @apply px-6 py-4;
}

/* Lists - Automatic Styling */
.blog-content ul {
  @apply space-y-2 my-6 pl-0;
}

.blog-content ul li {
  @apply flex items-start list-none;
}

.blog-content ul li::before {
  content: "•";
  @apply text-purple-600 mr-3 mt-1 text-xl font-bold flex-shrink-0;
}

.blog-content ul li strong {
  @apply text-gray-900 font-semibold;
}

/* Ordered Lists */
.blog-content ol {
  @apply space-y-2 my-6 pl-6;
}

.blog-content ol li {
  @apply list-decimal text-lg;
}

/* Code Blocks */
.blog-content pre {
  @apply my-6 p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto;
}

.blog-content code {
  @apply text-sm font-mono;
}

/* Inline Code */
.blog-content p code {
  @apply px-2 py-1 bg-purple-100 text-purple-700 rounded text-base;
}

/* Blockquotes */
.blog-content blockquote {
  @apply my-6 pl-6 border-l-4 border-purple-600 italic text-gray-600;
}

/* Links */
.blog-content a:not(.cta-button) {
  @apply text-purple-600 hover:text-purple-700 underline;
}
5. Blog Post Layout Template
Apply the wrapper class:
tsx// In /app/blog/[slug]/page.tsx or BlogPostLayout component
export default function BlogPost({ post }: { post: BlogPostData }) {
  return (
    <article className="blog-content max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-gray-600">
          <span>{post.author}</span>
          <span>•</span>
          <time>{post.date}</time>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </header>

      {/* Table of Contents - Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
        <aside className="hidden lg:block sticky top-24 self-start">
          <TableOfContents headings={post.headings} />
        </aside>

        {/* Main Content - Auto-styled via CSS */}
        <div className="blog-content">
          <MDXContent />
        </div>
      </div>

      {/* Related Articles - Vertical Stack */}
      <footer className="mt-16 pt-8 border-t">
        <h2 className="text-2xl font-bold mb-6">Continue Reading</h2>
        <div className="space-y-4">
          {relatedArticles.map((article) => (
            <RelatedArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </footer>
    </article>
  );
}
6. Content Creation Workflow
For every new blog post:

Create MDX file in /content/blog/[slug].mdx
Use frontmatter with title, description, date, author, readTime
Write content following keyword vs product guidelines
Use markdown naturally - tables, lists, headings auto-style via CSS
Add CTAs using <BlogCTA /> component at key conversion points
No manual styling - let global CSS handle formatting
Review checklist:

✅ Keyword in H2/H3 for SEO
✅ "Reportr" for product features
✅ No fake testimonials
✅ CTAs in intro and conclusion
✅ Lists and tables properly formatted
✅ Mobile responsive



7. New Writer Onboarding Template
Give new content writers:
markdown# Blog Post Quick Start Guide

## Keyword Strategy
- Use "[target keyword]" in headings (H2/H3) for SEO
- Use "Reportr" when talking about our product specifically
- Example: "White label SEO reports are essential" (general) vs "Reportr generates reports in 30 seconds" (product)

## Structure Every Post
1. Intro with problem statement
2. Educational section (keyword-heavy for SEO)
3. Solution section (Reportr-focused for conversion)
4. Benefits/features breakdown
5. Conclusion with key takeaways
6. CTAs at intro and conclusion

## Formatting (Auto-Applied)
- Just write in markdown
- Tables auto-style with purple headers
- Lists auto-style with purple bullets
- No need to add classes manually

## CTAs
Use component: `<BlogCTA text="Try Free" link="/signup" />`
Place after: intro paragraph, mid-article, conclusion

## Never Include
❌ Fake testimonials or case studies
❌ Made-up statistics or client names
❌ Generic placeholders like "John D., Agency Owner"

## Always Include
✅ Real data or "industry benchmarks"
✅ Honest value propositions
✅ Clear next steps for readers

Summary
The key is:

Global CSS handles all formatting automatically (tables, lists, typography)
Reusable components for CTAs and special elements
Writing guidelines for keyword vs product usage
MDX templates for structure consistency
No manual styling - writers focus on content, not classes

Writers just write markdown following keyword/product guidelines. The system handles all the visual formatting automatically.
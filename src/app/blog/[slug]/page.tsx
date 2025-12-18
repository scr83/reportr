import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllBlogPosts, getBlogPostBySlug, getRelatedPosts, generateTableOfContents, generateArticleSchema } from '@/lib/blog'
import { BlogPost } from '@/components/blog/BlogPost'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found | Reportr Blog',
      description: 'The requested blog post could not be found.',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reportr.agency'
  const postUrl = `${siteUrl}/blog/${post.slug}`
  const imageUrl = post.featuredImage ? `${siteUrl}${post.featuredImage}` : `${siteUrl}/images/og-default.jpg`

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: `${post.targetKeyword}, white label seo, seo reporting, agency tools, ${post.contentType.toLowerCase()}`,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      url: postUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.publishDate,
      authors: [post.author],
      siteName: 'Reportr',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [imageUrl],
      creator: '@reportr_agency',
    },
    alternates: {
      canonical: postUrl,
      languages: {
        'en': postUrl,
        'en-US': postUrl,
        'en-GB': postUrl,
        'en-AU': postUrl,
        'en-CA': postUrl,
        'en-NZ': postUrl,
        'en-IE': postUrl,
        'en-IN': postUrl,
        'x-default': postUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'article:author': post.author,
      'article:published_time': post.publishDate,
      'article:section': 'SEO',
      'article:tag': post.targetKeyword,
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Get related data
  const relatedPosts = getRelatedPosts(post.slug, post.relatedPosts)
  const tableOfContents = generateTableOfContents(post.content)

  // Generate JSON-LD structured data using the new schema function
  const articleSchema = generateArticleSchema(post)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPost 
        post={post} 
        relatedPosts={relatedPosts}
        tableOfContents={tableOfContents}
      />
    </>
  )
}
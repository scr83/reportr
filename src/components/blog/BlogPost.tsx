'use client'

import { useState, useEffect } from 'react'

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}
import Link from 'next/link'
import { BlogPost as BlogPostType } from '@/lib/blog'
import { CTAEarly } from './CTAEarly'
import { CTAMid } from './CTAMid'
import { CTALate } from './CTALate'
import { CTAConclusion } from './CTAConclusion'
import { RelatedArticles } from './RelatedArticles'
import { TableOfContents } from './TableOfContents'
import { ReadingProgress } from './ReadingProgress'
import { SocialShare } from './SocialShare'
import { Clock, Calendar, User, ArrowLeft, Copy, Check } from 'lucide-react'
import { Button } from '@/components/atoms/Button'

interface BlogPostProps {
  post: BlogPostType
  relatedPosts: BlogPostType[]
  tableOfContents: Array<{ id: string; title: string; level: number }>
}

function renderMarkdownContent(content: string): string {
  // Simple markdown rendering - replace with proper markdown parser in production
  let html = content
    .replace(/^### (.+)$/gm, '<h3 class="text-2xl font-bold text-gray-900 mt-10 mb-4 leading-tight">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6 leading-tight">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-purple-600 hover:text-purple-700 underline font-semibold">$1</a>')
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-purple-600">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="text-lg text-gray-700 leading-relaxed mb-2 flex items-start"><span class="text-purple-600 mr-3 mt-1">•</span><span>$1</span></li>')
    .replace(/\n\n/g, '</p><p class="text-lg text-gray-700 mb-6 leading-relaxed">')
    .replace(/<!-- (.+) -->/g, '')
    .replace(/\{\/\* (.+) \*\/\}/g, '') // Remove CTA comments for now

  // Handle tables with professional styling
  html = html.replace(
    /\|(.+)\|\s*\n\|[-\s\|]+\|\s*\n((?:\|.+\|\s*\n)*)/g,
    (match, header, rows) => {
      const headerCells = header.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell);
      const rowsArray = rows.trim().split('\n').map((row: string) => 
        row.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell)
      );

      let tableHtml = '<div class="my-8 overflow-x-auto"><table class="w-full bg-white rounded-lg shadow-lg border border-gray-200">';
      
      // Header
      tableHtml += '<thead><tr class="bg-purple-600 text-white">';
      headerCells.forEach((cell: string) => {
        tableHtml += `<th class="px-6 py-4 text-left font-semibold">${cell}</th>`;
      });
      tableHtml += '</tr></thead>';
      
      // Body
      tableHtml += '<tbody>';
      rowsArray.forEach((row: string[], index: number) => {
        const bgClass = index % 2 === 0 ? 'bg-gray-50' : 'bg-white';
        tableHtml += `<tr class="${bgClass} border-b border-gray-200 hover:bg-purple-50 transition-colors">`;
        row.forEach((cell: string) => {
          tableHtml += `<td class="px-6 py-4 text-gray-700">${cell}</td>`;
        });
        tableHtml += '</tr>';
      });
      tableHtml += '</tbody></table></div>';
      
      return tableHtml;
    }
  );
  
  // Wrap paragraphs
  html = '<p class="text-lg text-gray-700 mb-6 leading-relaxed">' + html + '</p>'
  
  // Handle lists
  html = html.replace(/(<li.*?>.*?<\/li>)/gs, '<ul class="list-none pl-0 mb-6 space-y-2">$1</ul>')
  
  return html
}

export function BlogPost({ post, relatedPosts, tableOfContents }: BlogPostProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeHeading, setActiveHeading] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  // Data passed from server component

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / totalHeight) * 100
      setScrollProgress(currentProgress)

      // Track scroll depth for analytics
      if (currentProgress >= 25 && !sessionStorage.getItem('scroll-25')) {
        sessionStorage.setItem('scroll-25', 'true')
        window.gtag?.('event', 'scroll', {
          event_category: 'Blog Engagement',
          event_label: 'Scroll 25%',
          value: 25,
        })
      }
      if (currentProgress >= 50 && !sessionStorage.getItem('scroll-50')) {
        sessionStorage.setItem('scroll-50', 'true')
        window.gtag?.('event', 'scroll', {
          event_category: 'Blog Engagement',
          event_label: 'Scroll 50%',
          value: 50,
        })
      }
      if (currentProgress >= 75 && !sessionStorage.getItem('scroll-75')) {
        sessionStorage.setItem('scroll-75', 'true')
        window.gtag?.('event', 'scroll', {
          event_category: 'Blog Engagement',
          event_label: 'Scroll 75%',
          value: 75,
        })
      }
      if (currentProgress >= 100 && !sessionStorage.getItem('scroll-100')) {
        sessionStorage.setItem('scroll-100', 'true')
        window.gtag?.('event', 'scroll', {
          event_category: 'Blog Engagement',
          event_label: 'Scroll 100%',
          value: 100,
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track active heading for TOC
  useEffect(() => {
    const headings = document.querySelectorAll('h2, h3')
    const handleScroll = () => {
      let current = ''
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect()
        if (rect.top <= 100) {
          current = heading.id
        }
      })
      setActiveHeading(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Copy link functionality
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
      
      window.gtag?.('event', 'share', {
        method: 'copy_link',
        content_type: 'blog_post',
        content_id: post.slug,
      })
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  // We'll add CTAs manually in the content for now

  return (
    <div className="min-h-screen bg-white">
      <ReadingProgress progress={scrollProgress} />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-purple-600">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/blog" className="text-gray-500 hover:text-purple-600">
              Blog
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to Blog */}
        <div className="mb-8">
          <Link 
            href="/blog"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(post.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {post.readingTime.text}
            </div>
          </div>

          {/* Social Share */}
          <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
            <SocialShare 
              title={post.title}
              url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://reportr.agency'}/blog/${post.slug}`}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="text-gray-600 hover:text-purple-600"
            >
              {copySuccess ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
        </header>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
          {/* Table of Contents - Desktop Sidebar */}
          <aside className="lg:w-80 xl:w-96 order-2 lg:order-1">
            <div className="sticky top-24">
              <TableOfContents 
                headings={tableOfContents}
                activeHeading={activeHeading}
              />
            </div>
          </aside>

          {/* Article Content */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: renderMarkdownContent(post.content) }} />
            </div>

            {/* Article Footer */}
            <footer className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between mb-8">
                <div className="text-sm text-gray-500">
                  Published on {new Date(post.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <SocialShare 
                  title={post.title}
                  url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://reportr.agency'}/blog/${post.slug}`}
                />
              </div>
              
              {/* Author Bio */}
              <div className="bg-gray-50 rounded-xl p-6 mb-12">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {post.author}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Expert insights on white label SEO reporting and agency growth strategies. 
                      Helping digital marketing agencies scale with professional reporting solutions.
                    </p>
                    <Link 
                      href="/blog"
                      className="text-purple-600 hover:text-purple-700 font-semibold"
                    >
                      View all articles →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <RelatedArticles posts={relatedPosts} />
              )}
            </footer>
          </div>
        </div>
      </article>
    </div>
  )
}
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface BlogPost {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  targetKeyword: string
  searchVolume: number
  keywordDifficulty: number
  contentType: 'Pillar' | 'Supporting' | 'Comparison'
  publishDate: string
  author: string
  featuredImage: string
  excerpt: string
  relatedPosts: string[]
  published: boolean
  content: string
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
}

const postsDirectory = path.join(process.cwd(), 'content/blog')

export function getAllBlogPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const readingTimeStats = readingTime(content)

      return {
        slug,
        ...data,
        published: data.published || false, // Default to false if not specified
        content,
        readingTime: readingTimeStats,
      } as BlogPost
    })
    .filter((post) => post.published === true) // Only show published posts
    .sort((a, b) => (new Date(a.publishDate) < new Date(b.publishDate) ? 1 : -1))

  return allPostsData
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const readingTimeStats = readingTime(content)

    const post = {
      slug,
      ...data,
      published: data.published || false,
      content,
      readingTime: readingTimeStats,
    } as BlogPost

    // Only return published posts
    return post.published ? post : null
  } catch (error) {
    return null
  }
}

export function getRelatedPosts(currentSlug: string, relatedSlugs: string[]): BlogPost[] {
  return relatedSlugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .slice(0, 3)
}

export function getBlogPostsByType(contentType: string): BlogPost[] {
  const allPosts = getAllBlogPosts()
  return allPosts.filter((post) => post.contentType === contentType)
}

export function searchBlogPosts(query: string): BlogPost[] {
  const allPosts = getAllBlogPosts()
  const lowercaseQuery = query.toLowerCase()
  
  return allPosts.filter((post) => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.targetKeyword.toLowerCase().includes(lowercaseQuery)
  )
}

export function generateTableOfContents(content: string): Array<{ id: string; title: string; level: number }> {
  const headingRegex = /^(#{2,3})\s(.+)$/gm
  const toc: Array<{ id: string; title: string; level: number }> = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1]?.length || 0
    const title = match[2]?.trim() || ''
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    if (level <= 3) { // Only include H2 and H3
      toc.push({ id, title, level })
    }
  }

  return toc
}

export function extractExcerpt(content: string, length: number = 160): string {
  // Remove markdown formatting and get plain text
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links, keep text
    .replace(/`(.+?)`/g, '$1') // Remove code
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()

  if (plainText.length <= length) {
    return plainText
  }

  // Find the last complete word within the length limit
  const truncated = plainText.substring(0, length)
  const lastSpaceIndex = truncated.lastIndexOf(' ')
  
  return lastSpaceIndex > 0 
    ? truncated.substring(0, lastSpaceIndex) + '...'
    : truncated + '...'
}
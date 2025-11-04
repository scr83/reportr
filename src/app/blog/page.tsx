import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllBlogPosts } from '@/lib/blog'
import { Clock, ArrowRight, TrendingUp } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { Header } from '@/components/landing/Header'
import { Footer } from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: 'SEO Insights for Agencies | Reportr Blog',
  description: 'Expert insights on white label SEO reporting, agency growth strategies, and digital marketing best practices. Learn how to scale your agency with professional reporting.',
  keywords: 'white label seo reports, agency growth, seo reporting, digital marketing, agency insights',
  openGraph: {
    title: 'SEO Insights for Agencies | Reportr Blog',
    description: 'Expert insights on white label SEO reporting, agency growth strategies, and digital marketing best practices.',
    type: 'website',
    siteName: 'Reportr',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Insights for Agencies | Reportr Blog',
    description: 'Expert insights on white label SEO reporting, agency growth strategies, and digital marketing best practices.',
  },
  alternates: {
    canonical: 'https://reportr.agency/blog',
    languages: {
      'en-US': 'https://reportr.agency/blog',
      'en-GB': 'https://reportr.agency/blog',
      'en-AU': 'https://reportr.agency/blog',
      'en-NZ': 'https://reportr.agency/blog',
      'en-IN': 'https://reportr.agency/blog',
      'x-default': 'https://reportr.agency/blog',
    },
  },
}

interface BlogPageProps {
  searchParams: {
    page?: string
  }
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = parseInt(searchParams.page || '1')
  const postsPerPage = 12

  const allPosts = getAllBlogPosts()

  const totalPages = Math.ceil(allPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = allPosts.slice(startIndex, startIndex + postsPerPage)

  const pillarPosts = getAllBlogPosts().filter(post => post.contentType === 'Pillar').slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              SEO Insights for Growing Agencies
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Master white label SEO reporting, scale your agency, and transform client relationships with expert insights and proven strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#featured">
                <Button variant="outline" className="bg-white text-purple-700 hover:bg-purple-50 border-white px-8 py-4">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Featured Articles
                </Button>
              </Link>
              <Link href="/pricing">
                <Button className="bg-purple-800 hover:bg-purple-900 px-8 py-4">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section id="featured" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Articles</h2>
            <p className="text-xl text-gray-600">Essential reading for agency owners and digital marketers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pillarPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readingTime.text}
                    <span className="mx-2">•</span>
                    {new Date(post.publishDate).toLocaleDateString()}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-purple-600 font-semibold">
                    Read Article
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              All Articles
            </h2>
            <p className="text-gray-600">
              {allPosts.length} article{allPosts.length !== 1 ? 's' : ''} published
            </p>
          </div>

              {paginatedPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                    {paginatedPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="p-5">
                          <div className="flex items-center text-xs text-gray-500 mb-3">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.readingTime.text}
                            <span className="mx-2">•</span>
                            {new Date(post.publishDate).toLocaleDateString()}
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.excerpt}</p>
                          <div className="flex items-center text-purple-600 font-semibold text-sm">
                            Read More
                            <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center space-x-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Link
                          key={page}
                          href={`/blog?page=${page}`}
                          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                            page === currentPage
                              ? 'bg-purple-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-300'
                          }`}
                        >
                          {page}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
        </div>
      </section>
      </main>
      <Footer />
    </div>
  )
}
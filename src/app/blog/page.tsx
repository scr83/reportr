import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllBlogPosts, getBlogPostsByType } from '@/lib/blog'
import { Search, Filter, Clock, ArrowRight, TrendingUp } from 'lucide-react'
import { Button } from '@/components/atoms/Button'

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
}

interface BlogPageProps {
  searchParams: {
    page?: string
    type?: string
    search?: string
  }
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = parseInt(searchParams.page || '1')
  const contentTypeFilter = searchParams.type
  const searchQuery = searchParams.search
  const postsPerPage = 12

  let allPosts = getAllBlogPosts()
  
  // Filter by content type
  if (contentTypeFilter) {
    allPosts = getBlogPostsByType(contentTypeFilter)
  }
  
  // Filter by search query
  if (searchQuery) {
    allPosts = allPosts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.targetKeyword.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const totalPages = Math.ceil(allPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = allPosts.slice(startIndex, startIndex + postsPerPage)

  const pillarPosts = getAllBlogPosts().filter(post => post.contentType === 'Pillar').slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
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
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-purple-600 text-center">
                      <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                      <div className="text-sm font-semibold">{post.contentType}</div>
                    </div>
                  </div>
                </div>
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
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <h3 className="text-lg font-semibold mb-4">Filter Articles</h3>
                
                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      defaultValue={searchQuery}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      onChange={(e) => {
                        const params = new URLSearchParams(window.location.search)
                        if (e.target.value) {
                          params.set('search', e.target.value)
                        } else {
                          params.delete('search')
                        }
                        params.delete('page')
                        window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
                        window.location.reload()
                      }}
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Content Type Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Type
                  </label>
                  <div className="space-y-2">
                    {['All', 'Pillar', 'Supporting', 'Comparison'].map((type) => (
                      <Link
                        key={type}
                        href={type === 'All' ? '/blog' : `/blog?type=${type}`}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          (type === 'All' && !contentTypeFilter) || contentTypeFilter === type
                            ? 'bg-purple-100 text-purple-700 font-semibold'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {type}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="lg:w-3/4">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {contentTypeFilter ? `${contentTypeFilter} Articles` : 'All Articles'}
                </h2>
                <p className="text-gray-600">
                  {allPosts.length} article{allPosts.length !== 1 ? 's' : ''} found
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
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-gray-500 text-center">
                              <div className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                {post.contentType}
                              </div>
                            </div>
                          </div>
                        </div>
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
                          href={`/blog?page=${page}${contentTypeFilter ? `&type=${contentTypeFilter}` : ''}${searchQuery ? `&search=${searchQuery}` : ''}`}
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
          </div>
        </div>
      </section>
    </div>
  )
}
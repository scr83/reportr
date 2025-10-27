import Link from 'next/link'
import { BlogPost } from '@/lib/blog'
import { Clock, ArrowRight, TrendingUp } from 'lucide-react'

interface RelatedArticlesProps {
  posts: BlogPost[]
}

export function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null

  return (
    <section className="bg-gray-50 rounded-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Continue Reading
        </h2>
        <p className="text-gray-600">
          Explore more insights on white label SEO reporting and agency growth
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => {
              // Track related article clicks
              window.gtag?.('event', 'click', {
                event_category: 'Related Article',
                event_label: post.slug,
                transport_type: 'beacon',
              })
            }}
          >
            <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-purple-600 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    {post.contentType}
                  </div>
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
              
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center text-purple-600 font-semibold text-sm">
                Read Article
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold"
        >
          View All Articles
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
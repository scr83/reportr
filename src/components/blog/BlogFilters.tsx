'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import Link from 'next/link'

interface BlogFiltersProps {
  searchQuery?: string
  contentTypeFilter?: string
}

export function BlogFilters({ searchQuery, contentTypeFilter }: BlogFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    params.delete('page')
    router.replace(`/blog?${params.toString()}`)
  }

  return (
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
            onChange={(e) => handleSearchChange(e.target.value)}
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
  )
}
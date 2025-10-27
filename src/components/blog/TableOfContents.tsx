'use client'

import { useState, useEffect } from 'react'
import { List, ChevronRight } from 'lucide-react'

interface TOCHeading {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  headings: TOCHeading[]
  activeHeading?: string
}

export function TableOfContents({ headings, activeHeading }: TableOfContentsProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (headings.length === 0) return null

  const handleHeadingClick = (headingId: string) => {
    const element = document.getElementById(headingId)
    if (element) {
      const yOffset = -100 // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      
      // Track TOC clicks
      window.gtag?.('event', 'click', {
        event_category: 'Table of Contents',
        event_label: headingId,
        transport_type: 'beacon',
      })
    }
  }

  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center mb-6">
          <List className="h-5 w-5 text-purple-600 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">
            Table of Contents
          </h3>
        </div>
        
        <nav>
          <ul className="space-y-1">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  onClick={() => handleHeadingClick(heading.id)}
                  className={`
                    group flex items-start w-full text-left py-3 px-4 rounded-lg transition-all duration-200
                    ${heading.level === 2 ? 'pl-4' : 'pl-8'}
                    ${activeHeading === heading.id 
                      ? 'bg-purple-100 text-purple-700 font-semibold shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                    }
                  `}
                >
                  <ChevronRight 
                    className={`
                      h-4 w-4 mr-3 mt-0.5 flex-shrink-0 transition-transform duration-200
                      ${activeHeading === heading.id ? 'transform rotate-90 text-purple-500' : 'text-gray-400 group-hover:text-purple-500'}
                    `}
                  />
                  <span className={`
                    text-sm leading-relaxed break-words
                    ${heading.level === 2 ? 'font-medium' : 'font-normal'}
                  `}>
                    {heading.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            Click any heading to jump to that section
          </p>
        </div>
      </div>
    </div>
  )
}
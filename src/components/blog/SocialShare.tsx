'use client'

import { Twitter, Linkedin, Share2 } from 'lucide-react'
import { Button } from '@/components/atoms/Button'

interface SocialShareProps {
  title: string
  url: string
}

export function SocialShare({ title, url }: SocialShareProps) {
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=reportr_agency`
    window.open(twitterUrl, '_blank', 'width=600,height=400')
    
    window.gtag?.('event', 'share', {
      method: 'twitter',
      content_type: 'blog_post',
      content_id: url.split('/').pop(),
    })
  }

  const handleLinkedInShare = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    window.open(linkedinUrl, '_blank', 'width=600,height=400')
    
    window.gtag?.('event', 'share', {
      method: 'linkedin',
      content_type: 'blog_post',
      content_id: url.split('/').pop(),
    })
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
          text: `Check out this article: ${title}`,
        })
        
        window.gtag?.('event', 'share', {
          method: 'native',
          content_type: 'blog_post',
          content_id: url.split('/').pop(),
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    }
  }

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-600 font-medium">Share:</span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleTwitterShare}
        className="text-gray-600 hover:text-blue-500 hover:border-blue-500"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleLinkedInShare}
        className="text-gray-600 hover:text-blue-600 hover:border-blue-600"
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleNativeShare}
          className="text-gray-600 hover:text-purple-600 hover:border-purple-600"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
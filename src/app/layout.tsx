import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { Providers } from '@/components/providers/Providers'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Reportr - AI-Powered SEO Reporting',
  description: 'Generate professional, AI-powered SEO reports for your agency clients with Reportr',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://apis.google.com blob:; connect-src 'self' https://accounts.google.com https://oauth2.googleapis.com https://www.googleapis.com blob:; frame-src 'self' https://accounts.google.com; style-src 'self' 'unsafe-inline' https://accounts.google.com; img-src 'self' data: https: blob:; font-src 'self' data:; object-src 'none'; base-uri 'self';"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
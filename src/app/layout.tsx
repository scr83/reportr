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
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
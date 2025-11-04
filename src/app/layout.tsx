import { Inter, Poppins } from 'next/font/google'
import type { Metadata } from 'next'
import { Providers } from '@/components/providers/Providers'
import { ThemeProvider } from '@/components/ThemeProvider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Reportr - Professional SEO Reports in Minutes',
  description: 'Generate branded, AI-powered SEO reports for digital marketing agencies. Save time with automated reporting from Google Search Console, Analytics 4, and PageSpeed Insights.',
  keywords: 'SEO reports, digital marketing, agency tools, Google Search Console, analytics reporting, white label',
  authors: [{ name: 'Reportr' }],
  creator: 'Reportr',
  publisher: 'Reportr',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://reportr.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Reportr - Professional SEO Reports in Minutes',
    description: 'Generate branded, AI-powered SEO reports for digital marketing agencies. Save time with automated reporting.',
    url: '/',
    siteName: 'Reportr',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Reportr - Professional SEO Reports',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reportr - Professional SEO Reports in Minutes',
    description: 'Generate branded, AI-powered SEO reports for digital marketing agencies.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#7c3aed' },
    ],
  },
  manifest: '/site.webmanifest',
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
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5THD175YH2"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5THD175YH2');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} ${poppins.variable}`}>
        <Providers>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
import { Inter, Poppins } from 'next/font/google'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Providers } from '@/components/providers/Providers'
import { ThemeProvider } from '@/components/ThemeProvider'
import { UTMPreserver } from '@/components/UTMPreserver'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Reportr - Professional SEO Reports in Minutes',
  description: 'Professional SEO reporting for freelancers and growing agencies. Generate white-label reports in ~1 minute. Plans from $29/month. Try free.',
  keywords: 'SEO reports, digital marketing, agency tools, Google Search Console, analytics reporting, white label',
  authors: [{ name: 'Reportr' }],
  creator: 'Reportr',
  publisher: 'Reportr',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://reportr.agency'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'en-GB': '/',
      'en-AU': '/',
      'en-NZ': '/',
      'en-IN': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'Reportr - Professional SEO Reports in Minutes',
    description: 'Professional SEO reporting for freelancers and growing agencies. Generate white-label reports in ~1 minute. Plans from $29/month. Try free.',
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
    description: 'Professional SEO reporting for freelancers and growing agencies. Generate white-label reports in ~1 minute. Plans from $29/month.',
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
    icon: '/reportr-logo.svg',
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
        
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K587T8FF');
          `}
        </Script>
      </head>
      <body className={`${inter.className} ${poppins.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K587T8FF"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <Providers>
          <ThemeProvider>
            <UTMPreserver />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
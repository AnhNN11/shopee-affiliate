import type { Metadata } from 'next';
import { SiteFooter } from './components/site-footer';
import { SiteHeader } from './components/site-header';
import { absoluteSiteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './lib/seo';
import './globals.css';

const homeUrl = absoluteSiteUrl('/');
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(`${SITE_URL}/`) : undefined,
  title: {
    default: 'Chọn Chuẩn — Deal tốt & mã giảm giá Shopee',
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: homeUrl ? { canonical: homeUrl } : undefined,
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  openGraph: {
    title: 'Chọn Chuẩn — Deal tốt & mã giảm giá Shopee',
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: 'vi_VN',
    type: 'website',
    ...(homeUrl ? { url: homeUrl } : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chọn Chuẩn — Deal tốt & mã giảm giá Shopee',
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: googleVerification ? { google: googleVerification } : undefined,
};

const structuredData = homeUrl
  ? {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${homeUrl}/#organization`,
          name: SITE_NAME,
          url: homeUrl,
        },
        {
          '@type': 'WebSite',
          '@id': `${homeUrl}/#website`,
          url: homeUrl,
          name: SITE_NAME,
          description: SITE_DESCRIPTION,
          inLanguage: 'vi-VN',
          publisher: { '@id': `${homeUrl}/#organization` },
        },
      ],
    }
  : null;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        {structuredData ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
            }}
          />
        ) : null}
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

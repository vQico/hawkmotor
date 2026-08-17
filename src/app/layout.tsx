import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import { getDbSiteSettings } from '@/lib/data';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import Analytics from '@/components/common/Analytics';
import Security from '@/components/common/Security';
import SplashLoader from '@/components/common/SplashLoader';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getDbSiteSettings();
  return {
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.seoKeywords,
    authors: [{ name: 'HAWK MOTOR' }],
    metadataBase: new URL('https://hawkmotor.com.tr'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: siteConfig.title,
      description: siteConfig.description,
      url: 'https://hawkmotor.com.tr',
      siteName: siteConfig.name,
      locale: 'tr_TR',
      type: 'website',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
          width: 1200,
          height: 630,
          alt: 'HAWK MOTOR Premium Motosiklet ve Yedek Parça',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.title,
      description: siteConfig.description,
      images: ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200'],
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
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getDbSiteSettings();

  return (
    <html lang="tr" className="h-full scroll-smooth">
      <body className="min-h-full bg-brand-bg text-white antialiased flex flex-col font-sans">
        <SplashLoader />
        <Security />
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        
        <LayoutWrapper siteConfig={siteConfig}>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}

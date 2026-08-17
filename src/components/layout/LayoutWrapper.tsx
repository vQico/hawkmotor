'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyCTA from '@/components/common/StickyCTA';

interface LayoutWrapperProps {
  children: React.ReactNode;
  siteConfig: any;
}

export default function LayoutWrapper({ children, siteConfig }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header siteConfig={siteConfig} />
      
      {/* Main layout container with padding-top offset for fixed navigation */}
      <main className="flex-grow pt-24">
        {children}
      </main>
      
      <Footer siteConfig={siteConfig} />
      <StickyCTA />
    </>
  );
}

'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

// Google Analytics / Ads IDs - easily configurable
export const GA_TRACKING_ID = 'G-HWKGA42026';
export const GTM_ID = 'GTM-HWKTRK26';
export const GOOGLE_ADS_CONVERSION_ID = 'AW-123456789';

// Explicit TS declaration for Gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Global conversion utility functions
export const trackConversion = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    // Log to console for debugging
    console.log(`[Google Ads / GA4 Conversion Event]: ${eventName}`, params);
    
    // Push to standard GTM dataLayer
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...params,
      });
    }

    // Call GA4/Ads gtag if loaded
    if (window.gtag) {
      window.gtag('event', eventName, {
        ...params,
        send_to: params?.send_to || undefined,
      });
    }
  }
};

// Custom triggers
export const trackWhatsAppClick = (productName?: string) => {
  trackConversion('whatsapp_contact_click', {
    category: 'Lead Generation',
    label: productName ? `Product: ${productName}` : 'General Contact',
    value: 1.0,
    currency: 'TRY',
  });
};

export const trackPhoneClick = (productName?: string) => {
  trackConversion('phone_call_click', {
    category: 'Lead Generation',
    label: productName ? `Product: ${productName}` : 'General Contact',
    value: 1.0,
    currency: 'TRY',
  });
};

export const trackIbanCopy = (bankName: string) => {
  trackConversion('iban_copied', {
    category: 'Purchase Attempt',
    label: `Bank: ${bankName}`,
    value: 50.0, // Represents a high-intent conversion
    currency: 'TRY',
  });
};

export const trackReceiptUploadClick = () => {
  trackConversion('receipt_sent', {
    category: 'Purchase Completed',
    label: 'FAST/Transfer Receipt Sent via WhatsApp',
    value: 500.0, // Completed checkout lead
    currency: 'TRY',
  });
};

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route changes
  useEffect(() => {
    if (pathname && typeof window !== 'undefined' && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
      });
      console.log(`[GA4 Page View Tracked]: ${url}`);
    }
  }, [pathname, searchParams]);

  return (
    <>
      {/* Google Analytics (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
            gtag('config', '${GOOGLE_ADS_CONVERSION_ID}');
            console.log('[GA4 & Google Ads script initialized]');
          `,
        }}
      />

      {/* Google Tag Manager Container */}
      <Script
        id="gtm-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
            console.log('[Google Tag Manager initialized]');
          `,
        }}
      />
    </>
  );
}

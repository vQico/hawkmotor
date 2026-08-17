import { getDbPaymentSettings, getDbSiteSettings } from '@/lib/data';
import PaymentClient from './PaymentClient';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function CheckoutPage() {
  const [paymentConfig, siteConfig] = await Promise.all([
    getDbPaymentSettings(),
    getDbSiteSettings()
  ]);

  if (siteConfig.bankPaymentsActive === false) {
    redirect('/');
  }

  return (
    <PaymentClient
      paymentConfig={paymentConfig}
      siteConfig={siteConfig}
    />
  );
}

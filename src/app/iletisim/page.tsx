import { getDbSiteSettings } from '@/lib/data';
import ContactClient from './ContactClient';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const siteConfig = await getDbSiteSettings();

  return (
    <ContactClient
      siteConfig={siteConfig}
    />
  );
}

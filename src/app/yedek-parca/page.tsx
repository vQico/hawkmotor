import { getDbSpareParts, getDbSiteSettings } from '@/lib/data';
import SparePartsClient from './SparePartsClient';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SparePartsPage() {
  const [spareParts, siteConfig] = await Promise.all([
    getDbSpareParts(),
    getDbSiteSettings()
  ]);

  return (
    <SparePartsClient
      spareParts={spareParts}
      siteConfig={siteConfig}
    />
  );
}


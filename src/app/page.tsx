import { getDbSiteSettings, getDbMotorcycles, getDbSpareParts } from '@/lib/data';
import HomeClient from './HomeClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [siteConfig, motorcycles, spareParts] = await Promise.all([
    getDbSiteSettings(),
    getDbMotorcycles(),
    getDbSpareParts()
  ]);

  return (
    <HomeClient
      siteConfig={siteConfig}
      motorcycles={motorcycles}
      spareParts={spareParts}
    />
  );
}

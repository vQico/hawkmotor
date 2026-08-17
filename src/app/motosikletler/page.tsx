import { getDbMotorcycles, getDbSiteSettings } from '@/lib/data';
import MotorcyclesClient from './MotorcyclesClient';

export const dynamic = 'force-dynamic';

export default async function MotorcyclesPage() {
  const [motorcycles, siteConfig] = await Promise.all([
    getDbMotorcycles(),
    getDbSiteSettings()
  ]);

  return (
    <MotorcyclesClient
      motorcycles={motorcycles}
      siteConfig={siteConfig}
    />
  );
}

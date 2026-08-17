import { 
  getAdminSiteSettings, 
  getAdminPaymentSettings, 
  getAdminLegalDocuments,
  getAdminCategories,
  getAdminBrands
} from '@/app/actions/adminActions';
import SettingsClient from './SettingsClient';

export default async function AdminSettingsPage() {
  const [site, payment, legalDocs, categories, brands] = await Promise.all([
    getAdminSiteSettings(),
    getAdminPaymentSettings(),
    getAdminLegalDocuments(),
    getAdminCategories(),
    getAdminBrands()
  ]);

  return (
    <SettingsClient
      initialSite={site}
      initialPayment={payment}
      initialLegalDocs={legalDocs}
      initialCategories={categories}
      initialBrands={brands}
    />
  );
}

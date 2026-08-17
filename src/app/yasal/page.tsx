import { getDbSiteSettings, getDbLegalDocuments } from '@/lib/data';
import LegalHubClient from './LegalHubClient';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function LegalPage() {
  const [settings, documents] = await Promise.all([
    getDbSiteSettings(),
    getDbLegalDocuments()
  ]);
  
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#111111] flex items-center justify-center text-white font-bold uppercase tracking-widest text-xs">HAWK MOTOR Yükleniyor...</div>}>
      <LegalHubClient settings={settings as any} documents={documents} />
    </Suspense>
  );
}

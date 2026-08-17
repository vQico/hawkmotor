import { getDbSiteSettings } from '@/lib/data';
import AboutClient from './AboutClient';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const settings = await getDbSiteSettings();
  
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#111111] flex items-center justify-center text-white font-bold uppercase tracking-widest text-xs">HAWK MOTOR Yükleniyor...</div>}>
      <AboutClient settings={settings as any} />
    </Suspense>
  );
}

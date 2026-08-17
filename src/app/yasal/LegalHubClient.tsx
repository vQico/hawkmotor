'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FileText, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface LegalHubClientProps {
  settings: {
    phone: string;
    email: string;
  };
  documents: Array<{
    id: string;
    slug: string;
    title: string;
    content: string;
    isActive: boolean;
  }>;
}

export default function LegalHubClient({ settings, documents }: LegalHubClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    if (documents.length > 0) {
      const firstSlug = documents[0].slug;
      const tabParam = searchParams.get('tab');
      if (tabParam && documents.some(doc => doc.slug === tabParam)) {
        setActiveTab(tabParam);
      } else {
        setActiveTab(firstSlug);
      }
    }
  }, [searchParams, documents]);

  const changeTab = (slug: string) => {
    setActiveTab(slug);
    router.push(`/yasal?tab=${slug}`, { scroll: false });
  };

  return (
    <main className="min-h-screen bg-[#111111] pt-32 pb-24 text-white overflow-hidden relative selection:bg-brand-primary/30">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-brand-muted mb-8 uppercase tracking-widest font-semibold">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-brand-primary" /> Ana Sayfa
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white">Yasal Sözleşmeler & Politikalar</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-primary text-xs font-bold uppercase tracking-[0.25em]"
          >
            HAWK MOTOR Hukuk Merkezi
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mt-4"
          >
            Yasal Sözleşmeler
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-brand-muted text-sm md:text-base font-light mt-4 leading-relaxed"
          >
            Müşterilerimizin güvenliği, haklarının korunması ve veri gizliliği standartlarımız HAWK MOTOR güvencesi altındadır. Tüm politikalarımızı aşağıdan inceleyebilirsiniz.
          </motion.p>
        </div>

        {/* Tab & Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 flex flex-col gap-2">
            {documents.map((doc) => {
              const isActive = activeTab === doc.slug;
              return (
                <button
                  key={doc.id}
                  onClick={() => changeTab(doc.slug)}
                  className={`w-full p-4 rounded-xl flex items-center gap-3 text-left transition-all duration-300 border font-bold text-xs uppercase tracking-wider cursor-pointer ${
                    isActive
                      ? 'bg-brand-primary/10 border-brand-primary text-white shadow-[0_0_15px_rgba(249,115,22,0.15)]'
                      : 'bg-brand-card/60 border-white/5 text-brand-muted hover:text-white hover:border-white/10 hover:bg-brand-card'
                  }`}
                >
                  <FileText className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-primary' : 'text-brand-muted'}`} />
                  {doc.title}
                </button>
              );
            })}

            {documents.length === 0 && (
              <div className="text-center py-8 text-xs text-brand-muted uppercase tracking-widest font-light">
                Sözleşme bulunamadı.
              </div>
            )}
          </div>

          {/* Content Pane */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-8 md:p-10 rounded-2xl glass-panel-heavy border border-white/5 text-brand-muted text-sm leading-relaxed"
            >
              {(() => {
                const activeDoc = documents.find(doc => doc.slug === activeTab);
                if (!activeDoc) {
                  return (
                    <div className="text-center py-20 text-brand-muted font-light uppercase tracking-widest">
                      Seçilen sözleşme bulunamadı.
                    </div>
                  );
                }
                return (
                  <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-extrabold text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
                      <FileText className="w-6 h-6 text-brand-primary" /> {activeDoc.title}
                    </h2>
                    <p className="text-xs text-brand-primary font-bold uppercase tracking-wider">Son Güncelleme: 01 Haziran 2026</p>
                    
                    <div className="flex flex-col gap-4 text-brand-muted font-light leading-relaxed whitespace-pre-line">
                      {activeDoc.content
                        .replace(/{settings.phone}/g, settings.phone)
                        .replace(/{settings.email}/g, settings.email)
                      }
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}

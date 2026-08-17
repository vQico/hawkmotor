'use client';

import { motion } from 'framer-motion';
import { Award, ShieldCheck, Target, Eye } from 'lucide-react';
import Link from 'next/link';

interface AboutClientProps {
  settings: {
    aboutTitle: string;
    aboutDesc: string;
    aboutText: string;
    aboutValues: string;
    aboutMilestones: string;
    sparePartsActive?: boolean;
  };
}

export default function AboutClient({ settings }: AboutClientProps) {
  // Parse dynamic values or fallback
  let values = [];
  try {
    values = JSON.parse(settings.aboutValues || '[]');
  } catch (e) {}

  if (!Array.isArray(values) || values.length === 0) {
    values = [
      {
        title: 'Vizyonumuz',
        desc: 'Türkiye genelinde premium motosiklet kültürünü en yüksek hizmet standartları ile buluşturarak sektöre vizyoner bir liderlik yapmak.'
      },
      {
        title: 'Misyonumuz',
        desc: 'Müşterilerimizin sürüş güvenliğini ve keyfini en üst seviyeye çıkarmak için seçkin motosiklet modellerini ve lüks sürücü ekipmanlarını erişilebilir kılmak.'
      },
      {
        title: 'Kalite Standartımız',
        desc: 'Showroomumuzdan kapınıza lojistik teslimatlara kadar her adımda sıfır taviz ve yüzde yüz premium şeffaflık sağlamak.'
      }
    ];
  }

  // Parse milestones
  let milestones = [];
  try {
    milestones = JSON.parse(settings.aboutMilestones || '[]');
  } catch (e) {}

  if (!Array.isArray(milestones) || milestones.length === 0) {
    milestones = [
      { year: '2018', title: 'İlk Adım', desc: 'İstanbul Beşiktaş\'ta butik bir premium motosiklet merkezi olarak kurulduk.' },
      { year: '2020', title: 'Marka Ortaklıkları', desc: 'Dünyanın en prestijli motosiklet ve lüks ekipman markalarının Türkiye iş ortaklıklarını kurduk.' },
      { year: '2022', title: 'Lojistik Ağı', desc: 'Özel kasa kapalı motosiklet sevkiyat sistemimizi kurarak Türkiye geneline 81 ile teslimat yapmaya başladık.' },
      { year: '2025', title: 'Dijital Dönüşüm', desc: 'Next.js tabanlı, Google Ads ve SEO uyumlu, yapay zeka destekli yeni dijital altyapımızı devreye aldık.' }
    ];
  }

  // Helper icons array for values
  const icons = [
    <Target key="target" className="w-6 h-6 text-brand-primary" />,
    <Eye key="eye" className="w-6 h-6 text-brand-primary" />,
    <Award key="award" className="w-6 h-6 text-brand-primary" />
  ];

  return (
    <div className="w-full relative overflow-hidden">
      
      {/* 1) HERO SPLASH */}
      <section className="relative py-24 bg-black overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1920')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 inline-block">HAWK MOTOR HİKAYESİ</span>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
            {settings.aboutTitle}
          </h1>
          <p className="text-brand-muted text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
            {settings.aboutDesc}
          </p>
        </div>
      </section>

      {/* 2) CORE VALUES */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl glass-panel premium-card flex flex-col gap-4 text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary">
                {icons[idx % icons.length]}
              </div>
              <h3 className="text-white font-bold text-lg uppercase tracking-wider">{v.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed font-light">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hikayemiz metni (aboutText) ek bir bölüm olarak eklendi */}
      {settings.aboutText && (
        <section className="py-16 max-w-4xl mx-auto px-6 text-left border-t border-white/5">
          <h2 className="text-2xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-brand-primary rounded" /> Kurumsal Tarihçemiz
          </h2>
          <div className="text-brand-muted text-sm md:text-base leading-relaxed font-light whitespace-pre-line">
            {settings.aboutText}
          </div>
        </section>
      )}

      {/* 3) HISTORICAL TIMELINE */}
      <section className="py-20 bg-brand-sec relative border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em]">KİLOMETRE TAŞLARI</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-2 uppercase tracking-tight">Yolculuğumuz</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {milestones.map((m: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative p-6 rounded-2xl bg-brand-card border border-white/5 flex flex-col gap-3 group hover:border-brand-primary/30 transition-all text-left"
              >
                {/* Year tag floating */}
                <span className="text-4xl font-black text-brand-primary/20 group-hover:text-brand-primary transition-colors select-none">
                  {m.year}
                </span>
                <h3 className="text-white font-extrabold text-lg uppercase mt-2">{m.title}</h3>
                <p className="text-brand-muted text-xs leading-relaxed font-light">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4) AUTHENTICITY STATEMENTS */}
      <section className="py-20 max-w-5xl mx-auto px-6 text-center">
        <div className="p-12 rounded-3xl glass-panel relative overflow-hidden shadow-2xl border border-white/10 flex flex-col items-center gap-6">
          <ShieldCheck className="w-16 h-16 text-brand-primary animate-pulse" />
          <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
            {settings.sparePartsActive !== false ? "100% Orijinal Ürün & Yetkili Bayi Güvencesi" : "100% Premium Hizmet & Güvenli Teslimat Güvencesi"}
          </h3>
          <p className="text-brand-muted text-sm leading-relaxed max-w-2xl font-light">
            {settings.sparePartsActive !== false ? (
              "HAWK MOTOR olarak sattığımız her bir yedek parçanın arkasındayız. Distribütör onaylı orijinal kutularında, barkodlu ve adınıza faturalı olarak hazırlanan sevkiyatlarımız, Türkiye genelindeki sürücülerimizin güvenle trafiğe veya piste çıkmasını sağlar."
            ) : (
              "HAWK MOTOR olarak sunduğumuz her premium motosikletin arkasındayız. Lojistik sigortalı, özel korumalı ahşap sandıklı ve adınıza faturalı/ruhsatlı olarak tamamlanan teslimatlarımız, Türkiye'nin dört bir yanındaki müşterilerimize güvenle ulaşır."
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
            <Link
              href="/motosikletler"
              className="px-8 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-xs orange-glow transition-all"
            >
              Motosiklet Kataloğu
            </Link>
            {settings.sparePartsActive !== false && (
              <Link
                href="/yedek-parca"
                className="px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-white font-bold uppercase tracking-wider text-xs transition-all"
              >
                Yedek Parçalar
              </Link>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
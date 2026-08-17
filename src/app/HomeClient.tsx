'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Truck,
  UserCheck,
  Zap,
  ArrowRight,
  Phone,
  Star,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { trackWhatsAppClick, trackPhoneClick } from '@/components/common/Analytics';

// Background wallpapers for the Hero rotator
const heroImages = [
  'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1920'
];

interface HomeClientProps {
  siteConfig: any;
  motorcycles: any[];
  spareParts: any[];
}

export default function HomeClient({ siteConfig, motorcycles, spareParts }: HomeClientProps) {
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);

  // Rotate Hero Wallpapers every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIdx((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsAppHero = () => {
    trackWhatsAppClick('Hero Banner');
    window.open(`https://wa.me/${siteConfig.whatsappFormatted}?text=${encodeURIComponent('Merhaba HAWK MOTOR, ana sayfanız üzerinden ulaşıyorum. Bilgi alabilir miyim?')}`, '_blank');
  };

  const handlePhoneHero = () => {
    trackPhoneClick('Hero Banner');
    window.location.href = `tel:${siteConfig.phoneFormatted}`;
  };

  // Select campaign / featured items or fall back to first 3
  const campaignMotors = motorcycles.filter(m => m.isCampaign || m.isFeatured).slice(0, 3);
  const featuredMotors = campaignMotors.length > 0 ? campaignMotors : motorcycles.slice(0, 3);

  const campaignParts = spareParts.filter(p => p.isCampaign || p.isFeatured).slice(0, 3);
  const featuredParts = campaignParts.length > 0 ? campaignParts : spareParts.slice(0, 3);

  const trustPillars = [
    {
      icon: <Truck className="w-8 h-8 text-brand-primary" />,
      title: 'Türkiye Geneli Gönderim',
      desc: 'Tüm motosikletlerinizi güvenli lojistik ağımızla kapınıza teslim ediyoruz.'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-primary" />,
      title: 'Güvenli Alışveriş',
      desc: 'SSL sertifikalı güvenli havale/FAST ödeme kanalları ve tam faturalı kurumsal güvence.'
    },
    {
      icon: <UserCheck className="w-8 h-8 text-brand-primary" />,
      title: 'Uzman Teknik Destek',
      desc: 'Sürüş stilinize veya modelinize en uygun motoru uzman ekibimizle seçin.'
    },
    {
      icon: <Zap className="w-8 h-8 text-brand-primary" />,
      title: 'Hızlı Tescil ve Teslimat',
      desc: 'Motosikletinizin plaka, ruhsat ve teslimat işlemlerini en hızlı sürede tamamlayarak yola çıkmaya hazır hale getiriyoruz.'
    }
  ];

  const stats = [
    { value: '12.000+', label: 'Teslim Edilen Sipariş' },
    { value: '8.500+', label: 'Mutlu Sürücü' },
    { value: '3.500+', label: 'Aktif Premium Ürün' },
    { value: '25+', label: 'Dünya Markası' }
  ];

  const testimonials = [
    {
      name: 'Can Yılmaz',
      title: 'Ducati Panigale V4 S Sahibi',
      comment: 'HAWK MOTOR ekibinden aldığım hizmet kusursuzdu. Motor siparişimden kapıma teslimata kadar her aşamada üst seviye ilgi gösterdiler. Türkiye\'nin en güvenilir premium garajı.',
      rating: 5
    },
    {
      name: 'Buse Demir',
      title: 'Yarış Pilotu & Eğitmen',
      comment: 'Motosiklet tescil, plaka ve adrese teslimat süreçlerini 24 saat içinde çözdüler. Bu hız ve premium hizmet kalitesi gerçekten eşsiz.',
      rating: 5
    },
    {
      name: 'Murat Kaya',
      title: 'BMW S 1000 RR Sahibi',
      comment: 'Ödeme sayfasındaki yönlendirmelerden, WhatsApp üzerinden teslimat takibine kadar her süreç püzürsüz. Motosikletim mükemmel kondisyonda ulaştı. Teşekkürler HAWK MOTOR!',
      rating: 5
    }
  ];

  return (
    <div className="w-full relative overflow-hidden">
      
      {/* 1) FULLSCREEN PREMIUM HERO SECTION */}
      <section className="relative h-[90vh] md:h-screen w-full flex items-center justify-center bg-black overflow-hidden -mt-24">
        {/* Dynamic Wallpaper Rotator */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroIdx}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 0.55, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImages[currentHeroIdx]})` }}
            />
          </AnimatePresence>
          {/* Radial Gradient overlay for extreme premium dark feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/90 via-transparent to-[#111111]/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          {/* Brand Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary shadow-[0_0_15px_rgba(249,115,22,0.15)]"
          >
            <Award className="w-4 h-4" />
            TÜRKİYE GENELİ TESLİMAT
          </motion.div>

          {/* Slogan */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 uppercase leading-none"
          >
            {siteConfig.sparePartsActive !== false ? (
              <>
                Türkiye’nin Premium <br className="hidden md:inline" />
                <span className="text-gradient-orange">Motosiklet</span> &{' '}
                <span className="text-gradient">Yedek Parça</span> Merkezi
              </>
            ) : (
              <>
                Türkiye’nin Premium <br className="hidden md:inline" />
                <span className="text-gradient-orange">Motosiklet</span> Merkezi
              </>
            )}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-brand-muted text-lg sm:text-xl font-light max-w-2xl mb-10 leading-relaxed"
          >
            {siteConfig.heroDescription || "Lüks motosiklet markaları ve seçkin sürücü ekipmanlarında Türkiye'nin rakipsiz premium noktası."}
          </motion.p>

          {/* Call-to-actions with Conversion Tracking */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
          >
            <Link
              href="/motosikletler"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-sm transition-all duration-300 orange-glow flex items-center justify-center gap-2"
            >
              Motosikletleri İncele
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={handleWhatsAppHero}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_4px_15px_rgba(37,211,102,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.116-2.905-6.994C16.656 1.87 14.18 1.838 12.016 1.838c-5.437 0-9.863 4.422-9.866 9.866-.001 1.702.449 3.364 1.3 4.8l-.995 3.636 3.737-.98h-.136zm10.874-7.468c-.294-.148-1.743-.86-2.016-.96-.272-.1-.47-.148-.667.148-.198.297-.766.96-.94 1.157-.172.198-.346.223-.64.075-.294-.148-1.243-.458-2.37-1.464-.877-.783-1.47-1.75-1.642-2.047-.172-.297-.018-.458.129-.606.133-.133.294-.346.44-.52.148-.173.197-.297.296-.495.1-.198.05-.371-.025-.52-.075-.148-.667-1.61-.914-2.203-.24-.58-.485-.5-.667-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.743-.712 1.99-1.402.247-.69.247-1.28.173-1.402-.073-.124-.272-.198-.57-.347z"/></svg>
              WhatsApp ile BİLGİ AL
            </button>

            <button
              onClick={handlePhoneHero}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-white font-bold uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-brand-primary" />
              Hemen Ara
            </button>
          </motion.div>
        </div>

        {/* Bottom Slide Decor */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#111111] to-transparent z-10" />
      </section>


      {/* 2) TRUST PILLARS AREA */}
      <section className="py-20 bg-brand-bg relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-2xl glass-panel premium-card flex flex-col gap-4 text-left"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-primary/5 border border-brand-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.05)]">
                  {pillar.icon}
                </div>
                <h3 className="text-white font-bold text-lg tracking-wide">{pillar.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 3) FEATURED MOTORCYCLES */}
      <section className="py-20 bg-brand-sec relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> SEÇKİN KOLEKSİYONLAR
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white mt-2 uppercase tracking-tight text-left">
                Öne Çıkan Motosikletler
              </h2>
            </div>
            <Link
              href="/motosikletler"
              className="text-brand-primary hover:text-brand-hover text-sm font-bold tracking-wider uppercase flex items-center gap-2 group shrink-0"
            >
              TÜM KATALOĞU GÖRÜNTÜLE
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Motor Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMotors.map((motor, idx) => (
              <motion.div
                key={motor.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group rounded-2xl overflow-hidden bg-brand-card border border-white/5 flex flex-col premium-card text-left"
              >
                {/* Image Wrap */}
                <div className="relative h-64 w-full bg-[#111] overflow-hidden">
                  <img
                    src={motor.image}
                    alt={motor.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Status Tag */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-brand-primary text-white tracking-widest shadow-lg">
                    {motor.status}
                  </div>
                  {/* Stock status overlay */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-black/60 backdrop-blur-md text-brand-muted tracking-wider border border-white/10">
                    {motor.stock}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-brand-primary text-xs font-bold uppercase tracking-wider">
                      {motor.brand} | {motor.model} | {motor.cc} cc
                    </span>
                    <h3 className="text-white font-extrabold text-xl mt-1 uppercase group-hover:text-brand-primary transition-colors duration-300">
                      {motor.name}
                    </h3>
                    <p className="text-brand-muted text-xs font-light mt-2 line-clamp-2 leading-relaxed">
                      {motor.shortDesc}
                    </p>
                  </div>

                  <div className="mt-6">
                    {siteConfig.showProductPrices !== false ? (
                      <div className="text-white font-black text-2xl tracking-wide mb-4">
                        {motor.price.toLocaleString('tr-TR')} <span className="text-sm font-bold text-brand-muted">TL</span>
                      </div>
                    ) : (
                      <div className="text-brand-primary font-extrabold text-sm tracking-wide mb-4 uppercase">
                        Fiyat İçin İletişime Geçin
                      </div>
                    )}

                    {/* Dual high-conversion CTAs */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          trackWhatsAppClick(motor.name);
                          window.open(`https://wa.me/${siteConfig.whatsappFormatted}?text=${encodeURIComponent(`Merhaba HAWK MOTOR. ${motor.name} (${motor.year} model) hakkında bilgi almak istiyorum.`)}`, '_blank');
                        }}
                        className="py-2.5 px-3 rounded-lg bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.116-2.905-6.994C16.656 1.87 14.18 1.838 12.016 1.838c-5.437 0-9.863 4.422-9.866 9.866-.001 1.702.449 3.364 1.3 4.8l-.995 3.636 3.737-.98h-.136zm10.874-7.468c-.294-.148-1.743-.86-2.016-.96-.272-.1-.47-.148-.667.148-.198.297-.766.96-.94 1.157-.172.198-.346.223-.64.075-.294-.148-1.243-.458-2.37-1.464-.877-.783-1.47-1.75-1.642-2.047-.172-.297-.018-.458.129-.606.133-.133.294-.346.44-.52.148-.173.197-.297.296-.495.1-.198.05-.371-.025-.52-.075-.148-.667-1.61-.914-2.203-.24-.58-.485-.5-.667-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.743-.712 1.99-1.402.247-.69.247-1.28.173-1.402-.073-.124-.272-.198-.57-.347z"/></svg>
                        Bilgi Al
                      </button>

                      <Link
                        href={`/urun/${motor.id}`}
                        className="py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-colors"
                      >
                        Detay
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 4) STATS AREA */}
      <section className="py-24 bg-brand-bg relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="p-12 rounded-3xl glass-panel relative overflow-hidden shadow-2xl border border-white/10">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="text-4xl md:text-6xl font-black text-brand-primary tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-muted">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {siteConfig.sparePartsActive !== false && (
        /* 5) FEATURED SPARE PARTS */
        <section className="py-20 bg-brand-sec relative z-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> ORİJİNAL PERFORMANS
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white mt-2 uppercase tracking-tight text-left">
                  Öne Çıkan Yedek Parçalar
                </h2>
              </div>
              <Link
                href="/yedek-parca"
                className="text-brand-primary hover:text-brand-hover text-sm font-bold tracking-wider uppercase flex items-center gap-2 group shrink-0"
              >
                TÜM YEDEK PARÇALARI GÖRÜNTÜLE
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Spare Parts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredParts.map((part, idx) => (
                <motion.div
                  key={part.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group rounded-2xl overflow-hidden bg-brand-card border border-white/5 flex flex-col premium-card text-left"
                >
                  {/* Image Wrap */}
                  <div className="relative h-56 w-full bg-[#111] overflow-hidden">
                    <img
                      src={part.image}
                      alt={part.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Category Tag */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-white/10 backdrop-blur-md text-white tracking-widest border border-white/10">
                      {part.category}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-brand-primary text-xs font-bold uppercase tracking-wider">
                        {part.brand}
                      </span>
                      <h3 className="text-white font-extrabold text-lg mt-1 uppercase group-hover:text-brand-primary transition-colors duration-300 line-clamp-1">
                        {part.name}
                      </h3>
                      <p className="text-brand-muted text-xs font-light mt-2 line-clamp-2 leading-relaxed">
                        {part.shortDesc}
                      </p>
                    </div>

                    <div className="mt-6">
                      {siteConfig.showProductPrices !== false ? (
                        <div className="text-white font-black text-2xl tracking-wide mb-4">
                          {part.price.toLocaleString('tr-TR')} <span className="text-sm font-bold text-brand-muted">TL</span>
                        </div>
                      ) : (
                        <div className="text-brand-primary font-extrabold text-sm tracking-wide mb-4 uppercase">
                          Fiyat İçin İletişime Geçin
                        </div>
                      )}

                      {/* Dual high-conversion CTAs */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            trackWhatsAppClick(part.name);
                            window.open(`https://wa.me/${siteConfig.whatsappFormatted}?text=${encodeURIComponent(`Merhaba HAWK MOTOR. Yedek parça kataloğunuzdaki "${part.name}" ürünü hakkında stok ve satın alma bilgisi rica ediyorum.`)}`, '_blank');
                          }}
                          className="py-2.5 px-3 rounded-lg bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.116-2.905-6.994C16.656 1.87 14.18 1.838 12.016 1.838c-5.437 0-9.863 4.422-9.866 9.866-.001 1.702.449 3.364 1.3 4.8l-.995 3.636 3.737-.98h-.136zm10.874-7.468c-.294-.148-1.743-.86-2.016-.96-.272-.1-.47-.148-.667.148-.198.297-.766.96-.94 1.157-.172.198-.346.223-.64.075-.294-.148-1.243-.458-2.37-1.464-.877-.783-1.47-1.75-1.642-2.047-.172-.297-.018-.458.129-.606.133-.133.294-.346.44-.52.148-.173.197-.297.296-.495.1-.198.05-.371-.025-.52-.075-.148-.667-1.61-.914-2.203-.24-.58-.485-.5-.667-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.743-.712 1.99-1.402.247-.69.247-1.28.173-1.402-.073-.124-.272-.198-.57-.347z"/></svg>
                          Bilgi Al
                        </button>

                        <Link
                          href={`/urun/${part.id}`}
                          className="py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-colors"
                        >
                          Detay
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* 6) CUSTOMER REVIEWS (TESTIMONIALS) */}
      <section className="py-24 bg-brand-bg relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
          <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em]">
            MÜŞTERİ YORUMLARI
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-2 uppercase tracking-tight mb-16">
            Yoldaki Sesimiz
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-2xl glass-panel relative border border-white/5"
              >
                {/* Quote Icon Background decoration */}
                <span className="absolute top-6 right-6 text-brand-primary/10 font-serif text-8xl leading-none select-none pointer-events-none">
                  “
                </span>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-primary text-brand-primary" />
                  ))}
                </div>

                <p className="text-brand-muted text-sm leading-relaxed mb-6 italic">
                  "{t.comment}"
                </p>

                <div className="border-t border-white/10 pt-4 mt-auto">
                  <h4 className="text-white font-extrabold tracking-wide uppercase">{t.name}</h4>
                  <p className="text-xs text-brand-primary font-semibold mt-0.5">{t.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

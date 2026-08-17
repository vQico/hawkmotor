'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { siteConfig as staticConfig } from '@/config/site';
import { trackPhoneClick } from '@/components/common/Analytics';

export default function Footer({ siteConfig = staticConfig }: { siteConfig?: any }) {
  const currentYear = new Date().getFullYear();

  const handlePhoneClick = () => {
    trackPhoneClick('Footer Contact');
  };

  return (
    <footer className="relative bg-[#0C0C0C] border-t border-white/5 pt-20 pb-8 text-brand-muted">
      {/* Dynamic glow design decoration */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* BRAND COLUMN */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-3">
            {siteConfig.logoUrl ? (
              <img 
                src={siteConfig.logoUrl} 
                alt={siteConfig.name} 
                className="w-10 h-10 object-contain transition-transform duration-500 hover:scale-105" 
              />
            ) : (
              <svg
                className="w-10 h-10 text-brand-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            )}
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-[0.15em] text-white uppercase">
                {siteConfig.name}
              </span>
              <span className="text-[9px] text-brand-muted tracking-[0.3em] font-semibold uppercase">
                {siteConfig.slogan || 'PREMIUM HUB'}
              </span>
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-brand-muted">
            {siteConfig.footerText || 'Türkiye genelinde premium motosiklet tedariğinde rakipsiz lider. En lüks markalar ve en üstün hizmet kalitesi ile yoldaki gücünüz.'}
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://instagram.com/hawkmotortr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-brand-primary/40 hover:bg-brand-primary/5 text-white hover:text-brand-primary flex items-center justify-center transition-all duration-300"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a
              href="https://tiktok.com/@hawkmotortr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-brand-primary/40 hover:bg-brand-primary/5 text-white hover:text-brand-primary flex items-center justify-center transition-all duration-300"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.68 4.12.89.82 2.04 1.34 3.25 1.48v3.52c-1.34-.17-2.62-.73-3.66-1.58-.32-.26-.61-.56-.87-.88v6.78c-.02 2.44-1.02 4.79-2.77 6.47C12.3 21.6 9.8 22.2 7.37 21.67c-3-.63-5.32-3.12-5.78-6.15-.55-3.64 1.44-7.25 4.91-8.31.79-.24 1.62-.35 2.45-.33v3.49c-.6-.08-1.22-.03-1.8.17-1.42.48-2.38 1.83-2.38 3.32-.02 1.62 1.05 3.07 2.61 3.52 1.49.44 3.11-.25 3.79-1.61.16-.33.24-.7.24-1.07V0h1.12z"/></svg>
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 tracking-wide relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-[2px] after:bg-brand-primary">
            Hızlı Menü
          </h3>
          <ul className="flex flex-col gap-4 text-sm mt-8">
            <li>
              <Link href="/motosikletler" className="hover:text-brand-primary transition-colors flex items-center gap-1 group">
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-brand-primary" />
                Motosiklet Kataloğu
              </Link>
            </li>
            {siteConfig.sparePartsActive !== false && (
              <li>
                <Link href="/yedek-parca" className="hover:text-brand-primary transition-colors flex items-center gap-1 group">
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-brand-primary" />
                  Yedek Parça & Aksesuar
                </Link>
              </li>
            )}
            <li>
              <Link href="/hakkimizda" className="hover:text-brand-primary transition-colors flex items-center gap-1 group">
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-brand-primary" />
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/iletisim" className="hover:text-brand-primary transition-colors flex items-center gap-1 group">
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-brand-primary" />
                İletişim & Harita
              </Link>
            </li>
            {siteConfig.bankPaymentsActive !== false && (
              <li>
                <Link href="/odeme" className="hover:text-brand-primary transition-colors flex items-center gap-1 group">
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-brand-primary" />
                  Banka Hesap Bilgileri (FAST)
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* WORK HOURS */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 tracking-wide relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-[2px] after:bg-brand-primary">
            Çalışma Saatleri
          </h3>
          <div className="flex flex-col gap-4 text-sm mt-8">
            {siteConfig.workingHours.map((item: any, idx: number) => (
              <div key={idx} className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">{item.days}</p>
                  <p className="text-xs text-brand-muted">{item.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 tracking-wide relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-[2px] after:bg-brand-primary">
            İletişim Bilgileri
          </h3>
          <div className="flex flex-col gap-4 text-sm mt-8">
            <Link
              href={`tel:${siteConfig.phoneFormatted}`}
              onClick={handlePhoneClick}
              className="flex items-start gap-3 hover:text-white transition-colors group"
            >
              <Phone className="w-4 h-4 text-brand-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">Hemen Ara</p>
                <p className="text-white font-bold">{siteConfig.phone}</p>
              </div>
            </Link>
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">E-posta</p>
                <p className="text-white font-bold">{siteConfig.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">Showroom Adresi</p>
                <p className="text-white font-semibold leading-relaxed">{siteConfig.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-8 border-t border-white/5 flex flex-col items-center gap-6 text-xs">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {currentYear} HAWK MOTOR. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6">
            <Link href="/yasal?tab=kullanici" className="hover:text-white transition-colors">Kullanıcı Sözleşmesi</Link>
            <Link href="/yasal?tab=gizlilik" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
            <Link href="/yasal?tab=kvkk" className="hover:text-white transition-colors">KVKK</Link>
          </div>
        </div>

        {/* E-Commerce Official Trust Badges */}
        <div className="w-full flex items-center justify-center pt-4 border-t border-white/5">
          <div className="relative opacity-50 hover:opacity-100 transition-opacity duration-500 max-w-full">
            <img
              src="/trust-badges.png"
              alt="HAWK MOTOR Güvenli Ödeme & ETBİS Bilgi Güvenliği Rozetleri"
              className="h-9 md:h-11 w-auto object-contain select-none pointer-events-none"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

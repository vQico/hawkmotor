'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ShoppingCart, Search } from 'lucide-react';
import { siteConfig as staticConfig } from '@/config/site';

export default function Header({ siteConfig = staticConfig }: { siteConfig?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Detect page scroll to adjust styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Motosikletler', href: '/motosikletler' },
    ...(siteConfig.sparePartsActive !== false ? [{ name: 'Yedek Parça', href: '/yedek-parca' }] : []),
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'İletişim', href: '/iletisim' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-4 glass-panel-heavy shadow-2xl border-b border-white/5'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          {siteConfig.logoUrl ? (
            <img 
              src={siteConfig.logoUrl} 
              alt={siteConfig.name} 
              className="w-10 h-10 object-contain transition-transform duration-500 group-hover:scale-105" 
            />
          ) : (
            <svg
              className="w-10 h-10 text-brand-primary transition-transform duration-500 group-hover:rotate-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Elegant Wings Vector */}
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
              <circle cx="12" cy="12" r="3" fill="currentColor" className="text-brand-primary opacity-60" />
            </svg>
          )}
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-[0.15em] text-white group-hover:text-brand-primary transition-colors duration-300 uppercase">
              {siteConfig.name}
            </span>
            <span className="text-[9px] text-brand-muted tracking-[0.3em] font-semibold uppercase">
              {siteConfig.slogan || 'PREMIUM HUB'}
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-300"
              >
                <span className={isActive ? 'text-brand-primary font-bold' : 'text-brand-muted hover:text-white'}>
                  {link.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary shadow-[0_0_10px_#f97316]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT AREA ACTIONS */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            href={`tel:${siteConfig.phoneFormatted}`}
            className="flex items-center gap-2 text-brand-muted hover:text-white transition-colors duration-300 group"
          >
            <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-brand-primary/40 group-hover:bg-brand-primary/5 transition-all duration-300">
              <Phone className="w-4 h-4 text-brand-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-brand-muted uppercase tracking-wider font-semibold">Hızlı İletişim</span>
              <span className="text-sm font-bold text-white">{siteConfig.phone}</span>
            </div>
          </Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white hover:text-brand-primary transition-colors focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE DRAWER MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden w-full glass-panel-heavy border-t border-white/5 absolute top-full left-0 overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-semibold tracking-wide py-1 border-b border-white/5 ${
                      isActive ? 'text-brand-primary pl-2' : 'text-brand-muted'
                    } transition-all duration-300`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-white/10">
                <Link
                  href={`tel:${siteConfig.phoneFormatted}`}
                  className="flex items-center gap-3 text-white"
                >
                  <div className="p-3 rounded-full bg-brand-primary/10 border border-brand-primary/30">
                    <Phone className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">Hemen Arayın</p>
                    <p className="text-lg font-bold">{siteConfig.phone}</p>
                  </div>
                </Link>
                <Link
                  href="/motosikletler"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-center font-bold uppercase tracking-wider transition-all duration-300 orange-glow"
                >
                  Motosikletleri İncele
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

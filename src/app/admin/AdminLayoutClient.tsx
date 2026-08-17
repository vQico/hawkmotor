'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Motorbike, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Sparkles, 
  Building2, 
  User,
  Clock,
  ExternalLink
} from 'lucide-react';
import { logoutAdmin } from '@/app/actions/authActions';

interface LayoutClientProps {
  children: React.ReactNode;
  adminName: string;
  adminEmail: string;
}

export default function AdminLayoutClient({ children, adminName, adminEmail }: LayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Ürün & Katalog', path: '/admin/urunler', icon: Motorbike },
    { name: 'Sistem Ayarları', path: '/admin/ayarlar', icon: Settings },
  ];

  const handleLogout = async () => {
    if (confirm('Kontrol panelinden çıkış yapmak istediğinize emin misiniz?')) {
      setIsLoggingOut(true);
      await logoutAdmin();
      router.push('/admin/login');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white flex overflow-hidden font-sans selection:bg-brand-primary/30">
      
      {/* 1. LEFT SIDEBAR (PREMIUM GLASSMORPHIC) */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 bg-[#0C0C0C]/90 backdrop-blur-md border-r border-white/5 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'
        }`}
      >
        <div className="flex flex-col gap-8 py-6">
          {/* Logo brand wrapper */}
          <div className={`px-6 flex items-center justify-between ${!sidebarOpen && 'lg:justify-center lg:px-0'}`}>
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-brand-primary" />
              </div>
              
              {sidebarOpen && (
                <div className="flex flex-col text-left">
                  <span className="font-extrabold text-sm tracking-wider text-white">HAWK<span className="text-brand-primary">M</span></span>
                  <span className="text-[8px] text-brand-muted tracking-[0.2em] font-semibold uppercase">YÖNETİM</span>
                </div>
              )}
            </Link>

            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded bg-white/5 text-brand-muted hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative p-3.5 rounded-xl flex items-center gap-3 font-bold text-xs uppercase tracking-wider transition-all duration-300 group ${
                    isActive 
                      ? 'text-white' 
                      : 'text-brand-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {/* Active highlight pill */}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute inset-0 bg-brand-primary/10 border border-brand-primary/30 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.1)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  <Icon className={`w-4 h-4 shrink-0 relative z-10 ${isActive ? 'text-brand-primary' : 'text-brand-muted group-hover:text-brand-primary transition-colors'}`} />
                  
                  {/* Label show/hide */}
                  <span className={`relative z-10 ${!sidebarOpen && 'lg:hidden'}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area: Admin Info & Logout */}
        <div className="p-4 border-t border-white/5 flex flex-col gap-3">
          {sidebarOpen ? (
            <div className="p-3 rounded-xl bg-white/5 flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-white uppercase truncate">{adminName}</span>
                <span className="text-[9px] text-brand-muted truncate">{adminEmail}</span>
              </div>
            </div>
          ) : (
            <div className="mx-auto w-8 h-8 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0 lg:flex hidden">
              <User className="w-4 h-4" />
            </div>
          )}

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full p-3 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/20 text-red-400 hover:text-red-300 font-bold text-xs uppercase tracking-wider flex items-center gap-3 transition-all cursor-pointer ${
              !sidebarOpen && 'lg:justify-center'
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span className={`${!sidebarOpen && 'lg:hidden'}`}>
              {isLoggingOut ? 'Çıkış Yapılıyor...' : 'Oturumu Kapat'}
            </span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKING CANVAS */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'
        }`}
      >
        {/* UPPER NAVBAR */}
        <header className="h-16 bg-[#090909]/80 backdrop-blur-md border-b border-white/5 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-brand-muted hover:text-white transition-all cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </button>
            
            <div className="text-xs text-brand-muted font-mono hidden md:flex items-center gap-1.5 uppercase tracking-wider font-bold">
              <Clock className="w-3.5 h-3.5 text-brand-primary" /> HAWK MOTOR Admin Hub
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="/" 
              target="_blank" 
              className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-brand-primary/30 text-[10px] font-bold uppercase tracking-wider text-brand-muted hover:text-brand-primary transition-all flex items-center gap-1.5"
            >
              Siteyi Görüntüle <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="h-6 w-[1px] bg-white/10" />

            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">GÜVENLİ BAĞLANTI</span>
            </div>
          </div>
        </header>

        {/* CONTAINER CONTENT VIEW */}
        <main className="flex-grow p-6 md:p-8 relative">
          {children}
        </main>
      </div>

    </div>
  );
}

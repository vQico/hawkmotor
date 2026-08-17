'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Clock,
  Check,
  Send,
  Navigation
} from 'lucide-react';
import { trackWhatsAppClick, trackPhoneClick } from '@/components/common/Analytics';

interface ContactClientProps {
  siteConfig: any;
}

export default function ContactClient({ siteConfig }: ContactClientProps) {
  const [formState, setFormState] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[Contact Form Submitted]:', formState);
    
    // Simulate API call and success message
    setSubmitted(true);
    setFormState({ name: '', phone: '', email: '', message: '' });
    
    // Reset submitted status after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handlePhone = () => {
    trackPhoneClick('Contact Page');
    window.location.href = `tel:${siteConfig.phoneFormatted}`;
  };

  const handleWhatsApp = () => {
    trackWhatsAppClick('Contact Page');
    window.open(`https://wa.me/${siteConfig.whatsappFormatted}?text=${encodeURIComponent('Merhaba HAWK MOTOR, iletişim sayfanızdan ulaşıyorum. Ürünleriniz ve showroomunuz hakkında bilgi alabilir miyim?')}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 text-left">
      
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em]">BİZE ULAŞIN</span>
        <h1 className="text-4xl md:text-6xl font-black text-white mt-2 uppercase tracking-tight">İLETİŞİM</h1>
        <p className="text-brand-muted text-sm max-w-xl mx-auto mt-4 leading-relaxed">
          Premium showroomumuzu ziyaret edebilir veya satış/destek ekibimizle anında iletişime geçebilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        
        {/* COMMUNICATION CARDS & WORK HOURS */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <h3 className="text-white font-bold text-lg uppercase tracking-wider pb-2 border-b border-white/10">
            Showroom Bilgileri
          </h3>

          {/* Address */}
          <div className="p-6 rounded-2xl bg-brand-card border border-white/5 flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0 animate-pulse">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">Adres</h4>
              <p className="text-brand-muted text-sm leading-relaxed mt-1 font-light">{siteConfig.address}</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                className="text-brand-primary hover:text-brand-hover text-xs font-bold uppercase tracking-wider mt-3 inline-flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" /> Yol Tarifi Al
              </a>
            </div>
          </div>

          {/* Phone */}
          <button
            onClick={handlePhone}
            className="p-6 rounded-2xl bg-brand-card border border-white/5 flex gap-4 text-left hover:border-brand-primary/30 transition-all cursor-pointer group w-full"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0 group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-brand-muted text-[10px] uppercase font-bold tracking-wider">Hemen Ara (Müşteri Hattı)</h4>
              <p className="text-white font-black text-lg mt-0.5">{siteConfig.phone}</p>
              <span className="text-brand-primary text-xs font-bold uppercase tracking-wider mt-2 block">Dönüşüm Odaklı Destek</span>
            </div>
          </button>

          {/* WhatsApp */}
          <button
            onClick={handleWhatsApp}
            className="p-6 rounded-2xl bg-brand-card border border-white/5 flex gap-4 text-left hover:border-[#25D366]/30 transition-all cursor-pointer group w-full"
          >
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.464L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.116-2.885-6.968C16.632 1.97 14.153.948 11.53.948c-5.445 0-9.87 4.373-9.874 9.802-.001 1.816.505 3.593 1.465 5.17l-.962 3.51 3.633-.953zm11.758-5.321c-.266-.134-1.583-.781-1.829-.871-.247-.09-.427-.134-.607.134-.181.269-.696.871-.853 1.05-.157.18-.314.202-.58.069-.267-.134-1.127-.416-2.148-1.326-.793-.708-1.329-1.582-1.486-1.85-.157-.269-.017-.414.118-.548.121-.12.267-.314.4-.471.134-.157.179-.269.269-.449.09-.18.045-.337-.022-.471-.067-.134-.607-1.459-.83-2.001-.219-.526-.441-.453-.607-.461-.157-.008-.337-.011-.518-.011-.18 0-.472.067-.719.337-.247.269-.943.921-.943 2.245s.965 2.597 1.099 2.777c.134.18 1.9 2.901 4.602 4.067.643.277 1.144.443 1.535.567.646.205 1.233.176 1.697.107.518-.077 1.583-.647 1.808-1.272.225-.624.225-1.161.157-1.272-.067-.113-.247-.18-.513-.314z" />
              </svg>
            </div>
            <div>
              <h4 className="text-brand-muted text-[10px] uppercase font-bold tracking-wider">WhatsApp ile BİLGİ AL</h4>
              <p className="text-white font-black text-lg mt-0.5">{siteConfig.whatsapp}</p>
              <span className="text-[#25D366] text-xs font-bold uppercase tracking-wider mt-2 block">7/24 Aktif Destek Hattı</span>
            </div>
          </button>
        </div>

        {/* INQUIRY FORM */}
        <div className="lg:col-span-1 p-8 rounded-2xl glass-panel-heavy border border-white/5 h-fit flex flex-col gap-6">
          <h3 className="text-white font-bold text-lg uppercase tracking-wider pb-2 border-b border-white/10">
            Hızlı Mesaj Gönder
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">Ad Soyad</label>
              <input
                type="text"
                required
                placeholder="Örn: Ahmet Yılmaz"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="py-2.5 px-4 rounded-xl glass-input text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">Telefon Numarası</label>
              <input
                type="tel"
                required
                placeholder="Örn: 0532 123 4567"
                value={formState.phone}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                className="py-2.5 px-4 rounded-xl glass-input text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">E-posta</label>
              <input
                type="email"
                required
                placeholder="Örn: ahmet@mail.com"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="py-2.5 px-4 rounded-xl glass-input text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">Mesajınız</label>
              <textarea
                rows={4}
                required
                placeholder="Sorunuzu buraya yazabilirsiniz..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="py-2.5 px-4 rounded-xl glass-input text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 mt-2 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 orange-glow cursor-pointer"
            >
              <Send className="w-4 h-4" /> Gönder
            </button>
          </form>

          {/* Form success toast notification */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center flex items-center justify-center gap-2 font-medium"
              >
                <Check className="w-4 h-4 shrink-0" />
                Mesajınız başarıyla iletildi! En kısa sürede döneceğiz.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* WORK HOURS & SIMULATED MAP */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <h3 className="text-white font-bold text-lg uppercase tracking-wider pb-2 border-b border-white/10">
            Çalışma Saatleri & Konum
          </h3>

          {/* Working hours details */}
          <div className="p-6 rounded-2xl bg-brand-card border border-white/5 flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5">
              <Clock className="w-5 h-5 text-brand-primary" />
              <span className="text-white font-bold text-sm uppercase tracking-wider">Açılış & Kapanış</span>
            </div>
            
            <div className="flex flex-col gap-3 text-sm">
              {siteConfig.workingHours && siteConfig.workingHours.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="text-brand-muted font-semibold">{item.days}</span>
                  <span className="text-white font-bold">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Styled simulated premium dark map block or iframe embed */}
          {siteConfig.mapUrl && siteConfig.mapUrl.includes('google.com/maps') ? (
            <div className="relative h-60 w-full rounded-2xl overflow-hidden border border-white/5 bg-[#151515] shadow-2xl">
              <iframe
                src={siteConfig.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-[#151515] border border-white/5 shadow-inner flex flex-col items-center justify-center text-center p-6 group">
              {/* Dark abstract map grid layout background */}
              <div className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600')` }} />
              
              {/* Glowing pin overlay */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 border border-brand-primary/40 flex items-center justify-center text-brand-primary mb-3 shadow-[0_0_20px_rgba(249,115,22,0.3)] animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="text-white font-extrabold text-sm uppercase tracking-wide">HAWK Beşiktaş Showroom</h4>
                <p className="text-[10px] text-brand-muted mt-1 leading-normal max-w-[200px] mx-auto font-light">
                  {siteConfig.address}
                </p>
                
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  className="mt-4 px-4 py-2 rounded-xl bg-white/5 hover:bg-brand-primary border border-white/10 hover:border-brand-primary text-white font-bold text-[10px] uppercase tracking-wider transition-all"
                >
                  Google Maps'te Aç
                </a>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

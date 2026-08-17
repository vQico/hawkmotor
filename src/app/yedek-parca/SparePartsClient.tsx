'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ListFilter, Phone, Info, Wrench } from 'lucide-react';
import { trackWhatsAppClick, trackPhoneClick } from '@/components/common/Analytics';

interface SparePartsClientProps {
  spareParts: any[];
  siteConfig: any;
}

export default function SparePartsClient({ spareParts, siteConfig }: SparePartsClientProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Hepsi');
  const [selectedStock, setSelectedStock] = useState('Hepsi');

  if (siteConfig.sparePartsActive === false) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center max-w-2xl mx-auto px-6 text-center py-20 relative">
        {/* Glowing background decor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-3xl glass-panel-heavy border border-white/10 flex flex-col items-center gap-6 relative z-10 w-full"
        >
          <div className="w-20 h-20 rounded-2xl bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary shadow-[0_0_30px_rgba(249,115,22,0.2)]">
            <Wrench className="w-10 h-10 animate-pulse" />
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.25em]">HAWK MOTOR GÜVENCESİ</span>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">YAPIM AŞAMASINDADIR</h1>
          </div>
          
          <p className="text-brand-muted text-sm leading-relaxed font-light">
            Sizlere en kaliteli hizmeti ve orijinal parça desteğini sunabilmek için yedek parça departmanımızı ve online kataloğumuzu yeniliyoruz. 
            Bu süreçte tüm yedek parça talepleriniz ve siparişleriniz için WhatsApp hattımız veya telefon numaramız üzerinden bizimle doğrudan iletişime geçebilirsiniz.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-4">
            <button
              onClick={() => {
                trackWhatsAppClick('Yapım Aşaması');
                window.open(`https://wa.me/${siteConfig.whatsappFormatted}?text=${encodeURIComponent('Merhaba HAWK MOTOR. Yedek parça ve aksesuarlar hakkında bilgi almak ve sipariş vermek istiyorum.')}`, '_blank');
              }}
              className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-xs uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-[0_4px_12px_rgba(37,211,102,0.2)]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.116-2.905-6.994C16.656 1.87 14.18 1.838 12.016 1.838c-5.437 0-9.863 4.422-9.866 9.866-.001 1.702.449 3.364 1.3 4.8l-.995 3.636 3.737-.98h-.136zm10.874-7.468c-.294-.148-1.743-.86-2.016-.96-.272-.1-.47-.148-.667.148-.198.297-.766.96-.94 1.157-.172.198-.346.223-.64.075-.294-.148-1.243-.458-2.37-1.464-.877-.783-1.47-1.75-1.642-2.047-.172-.297-.018-.458.129-.606.133-.133.294-.346.44-.52.148-.173.197-.297.296-.495.1-.198.05-.371-.025-.52-.075-.148-.667-1.61-.914-2.203-.24-.58-.485-.5-.667-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.743-.712 1.99-1.402.247-.69.247-1.28.173-1.402-.073-.124-.272-.198-.57-.347z"/></svg>
              WhatsApp ile Sorun
            </button>
            <Link
              href="/"
              className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-white font-bold text-xs uppercase flex items-center justify-center transition-colors cursor-pointer"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const categories = ['Hepsi', 'Fren', 'Lastik', 'Zincir', 'Elektrik', 'Bakım Ürünleri', 'Aksesuar'];

  // Filtering Logic
  const filteredParts = useMemo(() => {
    return spareParts.filter((part) => {
      const matchesSearch =
        part.name.toLowerCase().includes(search.toLowerCase()) ||
        part.brand.toLowerCase().includes(search.toLowerCase()) ||
        part.shortDesc.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = selectedCategory === 'Hepsi' || part.category === selectedCategory;
      const matchesStock = selectedStock === 'Hepsi' || part.stock === selectedStock;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [search, selectedCategory, selectedStock, spareParts]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
      
      {/* Header */}
      <div className="text-center md:text-left mb-12">
        <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em]">
          HAWK YEDEK PARÇA GARANTİSİ
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-white mt-2 uppercase tracking-tight">
          YEDEK PARÇA & AKSESUAR
        </h1>
        <p className="text-brand-muted text-sm max-w-2xl mt-4 leading-relaxed">
          Pirelli, Brembo, Akrapovic, DID ve Motul gibi dünyanın en lüks performans markalarının orijinal yedek parça ve aksesuarlarını filtreleyin.
        </p>
      </div>

      {/* FILTER TOP BAR & SEARCH */}
      <div className="flex flex-col lg:flex-row items-center gap-4 justify-between mb-8 p-4 rounded-2xl glass-panel border border-white/5">
        {/* Search */}
        <div className="relative w-full lg:w-96">
          <input
            type="text"
            placeholder="Yedek parça, marka veya kod ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-2.5 pl-10 pr-4 rounded-xl glass-input text-sm"
          />
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Dynamic Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                  : 'bg-white/5 text-brand-muted hover:text-white border border-white/5 hover:bg-white/10'
              }`}
            >
              {cat === 'Hepsi' ? 'Tümü' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SMALL SIDEBAR (Quick Stock toggle) */}
        <div className="lg:col-span-1 p-6 rounded-2xl glass-panel-heavy border border-white/5 h-fit flex flex-col gap-4">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider pb-2 border-b border-white/10 flex items-center gap-2">
            <ListFilter className="w-4 h-4 text-brand-primary" /> Filtre Seçenekleri
          </h3>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-brand-muted font-bold uppercase tracking-wider">Stok Durumu</label>
            <div className="flex flex-col gap-2.5 mt-1">
              {['Hepsi', 'Stokta Var', 'Sınırlı Stok'].map((stk) => (
                <label key={stk} className="flex items-center gap-2 text-xs text-brand-muted cursor-pointer hover:text-white transition-colors">
                  <input
                    type="radio"
                    name="partStock"
                    checked={selectedStock === stk}
                    onChange={() => setSelectedStock(stk)}
                    className="accent-brand-primary"
                  />
                  {stk}
                </label>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-brand-primary/5 border border-brand-primary/20 text-xs text-brand-muted leading-relaxed mt-4 text-left">
            <strong className="text-white">Orijinallik Garantisi:</strong> Listelediğimiz tüm yedek parça ve aksesuarlar 100% orijinal barkodlu, faturalı ve distribütör garantilidir.
          </div>
        </div>

        {/* MAIN DECK */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6 text-sm text-brand-muted text-left">
            <span>Toplam <strong className="text-white">{filteredParts.length}</strong> yedek parça listelendi</span>
          </div>

          {filteredParts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 rounded-2xl glass-panel-heavy border border-white/5"
            >
              <Info className="w-12 h-12 text-brand-primary mx-auto mb-4 animate-bounce" />
              <h3 className="text-white font-bold text-lg mb-2">Parça Bulunamadı</h3>
              <p className="text-brand-muted text-sm max-w-sm mx-auto">
                Aradığınız kategori veya isimde yedek parça stoklarımızda bulunmuyor. Bizimle iletişime geçerek özel sipariş verebilirsiniz.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredParts.map((part, idx) => (
                  <motion.div
                    key={part.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group rounded-2xl overflow-hidden bg-brand-card border border-white/5 flex flex-col premium-card h-full"
                  >
                    {/* Image */}
                    <div className="relative h-48 w-full bg-[#111] overflow-hidden">
                      <img
                        src={part.image}
                        alt={part.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase bg-white/10 backdrop-blur-md text-white tracking-widest border border-white/10">
                        {part.category}
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase bg-black/60 backdrop-blur-md text-brand-muted tracking-wider border border-white/10">
                        {part.stock}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div className="text-left">
                        <span className="text-brand-primary text-[10px] font-bold uppercase tracking-wider">
                          {part.brand}
                        </span>
                        <h3 className="text-white font-extrabold text-base mt-1 uppercase group-hover:text-brand-primary transition-colors line-clamp-1">
                          {part.name}
                        </h3>
                        <p className="text-brand-muted text-xs font-light mt-2 line-clamp-2 leading-relaxed">
                          {part.shortDesc}
                        </p>
                      </div>

                      <div className="mt-5">
                        {siteConfig.showProductPrices !== false ? (
                          <div className="text-white font-black text-xl tracking-wide mb-4 text-left">
                            {part.price.toLocaleString('tr-TR')} <span className="text-xs font-bold text-brand-muted">TL</span>
                          </div>
                        ) : (
                          <div className="text-brand-primary font-extrabold text-sm tracking-wide mb-4 text-left uppercase">
                            Fiyat İçin İletişime Geçin
                          </div>
                        )}

                        {/* Dual high-conversion CTAs */}
                        <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-4">
                          <button
                            onClick={() => {
                              trackWhatsAppClick(part.name);
                              window.open(`https://wa.me/${siteConfig.whatsappFormatted}?text=${encodeURIComponent(`Merhaba HAWK MOTOR. Orijinal yedek parça kataloğunuzdaki "${part.name}" ürünü siparişi vermek istiyorum.`)}`, '_blank');
                            }}
                            className="py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.116-2.905-6.994C16.656 1.87 14.18 1.838 12.016 1.838c-5.437 0-9.863 4.422-9.866 9.866-.001 1.702.449 3.364 1.3 4.8l-.995 3.636 3.737-.98h-.136zm10.874-7.468c-.294-.148-1.743-.86-2.016-.96-.272-.1-.47-.148-.667.148-.198.297-.766.96-.94 1.157-.172.198-.346.223-.64.075-.294-.148-1.243-.458-2.37-1.464-.877-.783-1.47-1.75-1.642-2.047-.172-.297-.018-.458.129-.606.133-.133.294-.346.44-.52.148-.173.197-.297.296-.495.1-.198.05-.371-.025-.52-.075-.148-.667-1.61-.914-2.203-.24-.58-.485-.5-.667-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.743-.712 1.99-1.402.247-.69.247-1.28.173-1.402-.073-.124-.272-.198-.57-.347z"/></svg>
                            Bilgi Al
                          </button>

                          <Link
                            href={`tel:${siteConfig.phoneFormatted}`}
                            onClick={() => trackPhoneClick(part.name)}
                            className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-brand-primary" />
                            Ara
                          </Link>
                        </div>

                        <Link
                          href={`/urun/${part.id}`}
                          className="w-full py-2 mt-2 rounded-lg bg-brand-primary/10 hover:bg-brand-primary/20 border border-brand-primary/30 text-brand-primary font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-colors hover:text-white"
                        >
                          Parça Detayı
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

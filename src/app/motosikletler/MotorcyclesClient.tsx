'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MessageCircle, Phone, Info, RefreshCw } from 'lucide-react';
import { trackWhatsAppClick, trackPhoneClick } from '@/components/common/Analytics';

interface MotorcyclesClientProps {
  motorcycles: any[];
  siteConfig: any;
}

export default function MotorcyclesClient({ motorcycles, siteConfig }: MotorcyclesClientProps) {
  // Filter States
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Hepsi');
  const [selectedModel, setSelectedModel] = useState('Hepsi');
  const [selectedCC, setSelectedCC] = useState('Hepsi');
  const [selectedYear, setSelectedYear] = useState('Hepsi');
  const [selectedStatus, setSelectedStatus] = useState('Hepsi');
  const [selectedStock, setSelectedStock] = useState('Hepsi');
  const [maxPrice, setMaxPrice] = useState(3500000); // Updated max price limit for newer catalog

  // Reset Filters
  const handleReset = () => {
    setSearch('');
    setSelectedBrand('Hepsi');
    setSelectedModel('Hepsi');
    setSelectedCC('Hepsi');
    setSelectedYear('Hepsi');
    setSelectedStatus('Hepsi');
    setSelectedStock('Hepsi');
    setMaxPrice(3500000);
  };

  // Get brands, years, etc. for filters dynamically
  const brands = useMemo(() => ['Hepsi', ...Array.from(new Set(motorcycles.map((m) => m.brand)))], [motorcycles]);
  const models = useMemo(() => {
    const list = selectedBrand === 'Hepsi'
      ? motorcycles
      : motorcycles.filter((m) => m.brand === selectedBrand);
    const uniqueModels = Array.from(new Set(list.map((m) => m.model).filter(Boolean)));
    return ['Hepsi', ...uniqueModels];
  }, [motorcycles, selectedBrand]);
  const years = useMemo(() => ['Hepsi', ...Array.from(new Set(motorcycles.map((m) => m.year.toString())))], [motorcycles]);

  // Filter Logic
  const filteredMotorcycles = useMemo(() => {
    return motorcycles.filter((motor) => {
      // Search matches name, brand or shortDesc
      const matchesSearch =
        motor.name.toLowerCase().includes(search.toLowerCase()) ||
        motor.brand.toLowerCase().includes(search.toLowerCase()) ||
        (motor.model && motor.model.toLowerCase().includes(search.toLowerCase())) ||
        motor.shortDesc.toLowerCase().includes(search.toLowerCase());

      const matchesBrand = selectedBrand === 'Hepsi' || motor.brand === selectedBrand;
      const matchesModel = selectedModel === 'Hepsi' || motor.model === selectedModel;

      let matchesCC = true;
      if (selectedCC !== 'Hepsi') {
        if (selectedCC === 'under-1000') matchesCC = motor.cc < 1000;
        else if (selectedCC === '1000-1150') matchesCC = motor.cc >= 1000 && motor.cc <= 1150;
        else if (selectedCC === 'above-1150') matchesCC = motor.cc > 1150;
      }

      const matchesYear = selectedYear === 'Hepsi' || motor.year.toString() === selectedYear;
      const matchesStatus = selectedStatus === 'Hepsi' || motor.status === selectedStatus;
      const matchesStock = selectedStock === 'Hepsi' || motor.stock === selectedStock;
      const matchesPrice = motor.price <= maxPrice;

      return (
        matchesSearch &&
        matchesBrand &&
        matchesModel &&
        matchesCC &&
        matchesYear &&
        matchesStatus &&
        matchesStock &&
        matchesPrice
      );
    });
  }, [search, selectedBrand, selectedModel, selectedCC, selectedYear, selectedStatus, selectedStock, maxPrice, motorcycles]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
      
      {/* Page Header */}
      <div className="text-center md:text-left mb-12">
        <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em]">
          HAWK MOTOR KATALOG
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-white mt-2 uppercase tracking-tight">
          PREMIUM MOTOSİKLETLER
        </h1>
        <p className="text-brand-muted text-sm max-w-2xl mt-4 leading-relaxed">
          Koleksiyonumuzdaki üst düzey süper spor, macera ve naked motosikletleri filtreleyin, anında teknik detayları inceleyip satış ekibimizle görüşmeye başlayın.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR FILTER PANEL */}
        <div className="lg:col-span-1 flex flex-col gap-6 p-6 rounded-2xl glass-panel-heavy border border-white/5 h-fit">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h3 className="text-white font-bold tracking-wider flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-primary" />
              Filtrele
            </h3>
            <button
              onClick={handleReset}
              className="text-xs text-brand-primary hover:text-brand-hover flex items-center gap-1 font-bold cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> Sıfırla
            </button>
          </div>

          {/* Search */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-brand-muted font-bold uppercase tracking-wider">Arama</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Model, marka ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-2.5 pl-10 pr-4 rounded-xl glass-input text-sm"
              />
              <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Brand */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-brand-muted font-bold uppercase tracking-wider">Marka</label>
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setSelectedModel('Hepsi');
              }}
              className="w-full p-2.5 rounded-xl glass-input text-sm text-white"
            >
              {brands.map((b) => (
                <option key={b} value={b} className="bg-brand-card text-white">
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Model / Seri */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-brand-muted font-bold uppercase tracking-wider">Model / Seri</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full p-2.5 rounded-xl glass-input text-sm text-white"
            >
              {models.map((m) => (
                <option key={m} value={m} className="bg-brand-card text-white">
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* CC */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-brand-muted font-bold uppercase tracking-wider">Motor Gücü (CC)</label>
            <select
              value={selectedCC}
              onChange={(e) => setSelectedCC(e.target.value)}
              className="w-full p-2.5 rounded-xl glass-input text-sm text-white"
            >
              <option value="Hepsi" className="bg-brand-card">Tümü</option>
              <option value="under-1000" className="bg-brand-card">1000 CC Altı</option>
              <option value="1000-1150" className="bg-brand-card">1000 - 1150 CC</option>
              <option value="above-1150" className="bg-brand-card">1150 CC Üzeri</option>
            </select>
          </div>

          {/* Model Year */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-brand-muted font-bold uppercase tracking-wider">Model Yılı</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full p-2.5 rounded-xl glass-input text-sm text-white"
            >
              {years.map((y) => (
                <option key={y} value={y} className="bg-brand-card">
                  {y} {y !== 'Hepsi' && 'Model'}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-brand-muted font-bold uppercase tracking-wider">Durum</label>
            <div className="flex flex-col gap-2 mt-1">
              {['Hepsi', 'Sıfır', 'Kampanyalı'].map((status) => (
                <label key={status} className="flex items-center gap-2 text-sm text-brand-muted cursor-pointer hover:text-white transition-colors">
                  <input
                    type="radio"
                    name="status"
                    checked={selectedStatus === status}
                    onChange={() => setSelectedStatus(status)}
                    className="accent-brand-primary"
                  />
                  {status}
                </label>
              ))}
            </div>
          </div>

          {/* Stock */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-brand-muted font-bold uppercase tracking-wider">Stok Durumu</label>
            <div className="flex flex-col gap-2 mt-1">
              {['Hepsi', 'Stokta Var', 'Sınırlı Stok'].map((stk) => (
                <label key={stk} className="flex items-center gap-2 text-sm text-brand-muted cursor-pointer hover:text-white transition-colors">
                  <input
                    type="radio"
                    name="stock"
                    checked={selectedStock === stk}
                    onChange={() => setSelectedStock(stk)}
                    className="accent-brand-primary"
                  />
                  {stk}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-brand-muted font-bold uppercase tracking-wider">
              <span>Maks. Fiyat</span>
              <span className="text-brand-primary">{maxPrice.toLocaleString('tr-TR')} TL</span>
            </div>
            <input
              type="range"
              min={100000}
              max={3500000}
              step={50000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-primary cursor-pointer bg-brand-card h-1 rounded-lg"
            />
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6 text-sm text-brand-muted text-left">
            <span>Toplam <strong className="text-white">{filteredMotorcycles.length}</strong> motosiklet listelendi</span>
          </div>

          {filteredMotorcycles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 rounded-2xl glass-panel-heavy border border-white/5"
            >
              <Info className="w-12 h-12 text-brand-primary mx-auto mb-4 animate-bounce" />
              <h3 className="text-white font-bold text-lg mb-2">Eşleşen Sonuç Bulunamadı</h3>
              <p className="text-brand-muted text-sm max-w-sm mx-auto">
                Aradığınız kriterlere uyan motosiklet şu anda bulunmuyor. Lütfen filtrelerinizi gevşetip tekrar deneyin.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredMotorcycles.map((motor, idx) => (
                  <motion.div
                    key={motor.id}
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
                        src={motor.image}
                        alt={motor.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase bg-brand-primary text-white tracking-widest">
                        {motor.status}
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase bg-black/60 backdrop-blur-md text-brand-muted tracking-wider border border-white/10">
                        {motor.stock}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div className="text-left">
                        <span className="text-brand-primary text-[10px] font-bold uppercase tracking-wider">
                          {motor.brand} • {motor.model} • {motor.cc} cc • {motor.year} Model
                        </span>
                        <h3 className="text-white font-extrabold text-lg mt-1 uppercase group-hover:text-brand-primary transition-colors line-clamp-1">
                          {motor.name}
                        </h3>
                        <p className="text-brand-muted text-xs font-light mt-2 line-clamp-2 leading-relaxed">
                          {motor.shortDesc}
                        </p>
                      </div>

                      <div className="mt-5">
                        {siteConfig.showProductPrices !== false ? (
                          <div className="text-white font-black text-xl tracking-wide mb-4 text-left">
                            {motor.price.toLocaleString('tr-TR')} <span className="text-xs font-bold text-brand-muted">TL</span>
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
                              trackWhatsAppClick(motor.name);
                              window.open(`https://wa.me/${siteConfig.whatsappFormatted}?text=${encodeURIComponent(`Merhaba HAWK MOTOR. ${motor.name} hakkında bilgi almak istiyorum.`)}`, '_blank');
                            }}
                            className="py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.116-2.905-6.994C16.656 1.87 14.18 1.838 12.016 1.838c-5.437 0-9.863 4.422-9.866 9.866-.001 1.702.449 3.364 1.3 4.8l-.995 3.636 3.737-.98h-.136zm10.874-7.468c-.294-.148-1.743-.86-2.016-.96-.272-.1-.47-.148-.667.148-.198.297-.766.96-.94 1.157-.172.198-.346.223-.64.075-.294-.148-1.243-.458-2.37-1.464-.877-.783-1.47-1.75-1.642-2.047-.172-.297-.018-.458.129-.606.133-.133.294-.346.44-.52.148-.173.197-.297.296-.495.1-.198.05-.371-.025-.52-.075-.148-.667-1.61-.914-2.203-.24-.58-.485-.5-.667-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.743-.712 1.99-1.402.247-.69.247-1.28.173-1.402-.073-.124-.272-.198-.57-.347z"/></svg>
                            Bilgi Al
                          </button>

                          <Link
                            href={`tel:${siteConfig.phoneFormatted}`}
                            onClick={() => trackPhoneClick(motor.name)}
                            className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-brand-primary" />
                            Ara
                          </Link>
                        </div>

                        <Link
                          href={`/urun/${motor.id}`}
                          className="w-full py-2.5 mt-2 rounded-lg bg-brand-primary/10 hover:bg-brand-primary/20 border border-brand-primary/30 text-brand-primary font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-colors hover:text-white"
                        >
                          Tüm Teknik Detaylar
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

'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Truck,
  ShieldCheck,
  Award,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Info,
  Layers
} from 'lucide-react';
import { trackWhatsAppClick, trackPhoneClick } from '@/components/common/Analytics';

interface ProductDetailClientProps {
  product: any;
  similarProducts: any[];
  siteConfig: any;
}

export default function ProductDetailClient({ product, similarProducts, siteConfig }: ProductDetailClientProps) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', backgroundPosition: '0% 0%' });

  // Image Zoom Magnifier logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none', backgroundPosition: '0% 0%' });
  };

  // Pre-generate image gallery list
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleWhatsAppBuy = () => {
    trackWhatsAppClick(product.name);
    const priceText = siteConfig.showProductPrices !== false ? ` (${product.price.toLocaleString('tr-TR')} TL)` : '';
    const message = `Merhaba HAWK MOTOR. Web siteniz üzerinden "${product.name}"${priceText} ürününüzü inceledim ve fiyat bilgisi, satın alma/stok teyit işlemleri için görüşmek istiyorum.`;
    window.open(`https://wa.me/${siteConfig.whatsappFormatted}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handlePhoneBuy = () => {
    trackPhoneClick(product.name);
    window.location.href = `tel:${siteConfig.phoneFormatted}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
      
      {/* Back button */}
      <Link
        href={product.isMotor ? '/motosikletler' : '/yedek-parca'}
        className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-primary transition-colors text-sm font-bold uppercase tracking-wider mb-8 group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Kataloğa Geri Dön
      </Link>

      {/* PRODUCT CORE DETAILS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        
        {/* LEFT COLUMN: PREMIUM GALLERY & ZOOM */}
        <div className="flex flex-col gap-4">
          
          {/* Main Zoom Display Canvas */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden bg-brand-card border border-white/5 cursor-zoom-in"
          >
            <img
              src={gallery[activeImgIdx]}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />

            {/* Custom Zoom Overlay */}
            <div
              className="absolute inset-0 pointer-events-none border-2 border-brand-primary/20 rounded-2xl transition-all duration-150"
              style={{
                display: zoomStyle.display,
                backgroundImage: `url(${gallery[activeImgIdx]})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '200%',
                backgroundPosition: zoomStyle.backgroundPosition,
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)',
              }}
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-brand-primary text-white tracking-widest">
              {product.status || 'Premium'}
            </div>

            {/* Change buttons */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImgIdx((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md bg-black/40 hover:bg-black/60 border border-white/10 text-white transition-all cursor-pointer z-20 hover:scale-105 active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImgIdx((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md bg-black/40 hover:bg-black/60 border border-white/10 text-white transition-all cursor-pointer z-20 hover:scale-105 active:scale-95"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Rotator Row */}
          {gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto py-1">
              {gallery.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`relative h-20 w-24 rounded-xl overflow-hidden bg-brand-card border-2 transition-all shrink-0 ${
                    activeImgIdx === idx ? 'border-brand-primary scale-95 shadow-md shadow-brand-primary/20' : 'border-white/5 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: PURCHASING & DETAILS */}
        <div className="flex flex-col gap-6 text-left">
          <div>
            <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
              <Layers className="w-4 h-4" /> {product.isMotor ? `${product.brand} MOTOSİKLET` : `${product.brand} PERFORMANS PARÇASI`}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white mt-2 uppercase tracking-tight leading-none">
              {product.name}
            </h1>
            <p className="text-brand-muted text-sm mt-4 leading-relaxed font-light">
              {product.shortDesc}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-6 rounded-2xl bg-brand-card border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-brand-muted uppercase tracking-wider font-semibold">Tavsiye Edilen Anahtar Teslim Fiyatı</p>
              {siteConfig.showProductPrices !== false ? (
                <p className="text-3xl md:text-4xl font-black text-white tracking-wide mt-1">
                  {product.price.toLocaleString('tr-TR')} <span className="text-lg font-bold text-brand-muted">TL</span>
                </p>
              ) : (
                <p className="text-xl font-bold text-brand-primary tracking-wide mt-1 uppercase">
                  Fiyat İçin İletişime Geçin
                </p>
              )}
            </div>
            
            <div className="flex flex-col gap-1 items-end">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                product.stock === 'Stokta Var' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {product.stock}
              </span>
              <p className="text-[10px] text-brand-muted mt-1">Stok durumu anlık güncellenir</p>
            </div>
          </div>

          {/* Mandatory Insurance & Casko Alert */}
          <div className="px-5 py-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3 text-left">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Güvenli Nakliye & Kasko Zorunluluğu</span>
              <p className="text-[11px] text-brand-muted leading-relaxed font-light font-sans">
                Maddi değeri yüksek premium ürünlerimizin hasarsızlık güvencesi kapsamında, <strong className="text-white">nakliye sigortası ve tam kasko yaptırılması yasal olarak zorunludur</strong>. Teslimatınız, HAWK MOTOR özel çelik/ahşap konstrüksiyonlu kapalı lojistik sandıklarıyla, kasko koruması altında kapınıza teslim edilir.
              </p>
            </div>
          </div>

          {/* High Conversion CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleWhatsAppBuy}
              className="flex-1 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_4px_15px_rgba(37,211,102,0.3)] flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.116-2.905-6.994C16.656 1.87 14.18 1.838 12.016 1.838c-5.437 0-9.863 4.422-9.866 9.866-.001 1.702.449 3.364 1.3 4.8l-.995 3.636 3.737-.98h-.136zm10.874-7.468c-.294-.148-1.743-.86-2.016-.96-.272-.1-.47-.148-.667.148-.198.297-.766.96-.94 1.157-.172.198-.346.223-.64.075-.294-.148-1.243-.458-2.37-1.464-.877-.783-1.47-1.75-1.642-2.047-.172-.297-.018-.458.129-.606.133-.133.294-.346.44-.52.148-.173.197-.297.296-.495.1-.198.05-.371-.025-.52-.075-.148-.667-1.61-.914-2.203-.24-.58-.485-.5-.667-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.743-.712 1.99-1.402.247-.69.247-1.28.173-1.402-.073-.124-.272-.198-.57-.347z"/></svg>
              WhatsApp ile BİLGİ AL
            </button>

            <button
              onClick={handlePhoneBuy}
              className="flex-1 py-4 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-sm transition-all duration-300 orange-glow flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
            >
              <Phone className="w-5 h-5" />
              Telefon ile Bilgi Al
            </button>
          </div>

          {/* Direct purchase fast note */}
          <div className="flex flex-col sm:flex-row items-center gap-2 justify-center text-xs text-brand-muted">
            <span>FAST/Havale ile ödeme yapmak için:</span>
            <Link href="/odeme" className="text-brand-primary hover:underline font-bold flex items-center gap-1">
              Ödeme Hesap Bilgilerini Görüntüle <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Brand trust pillars in mini format */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/5 pt-6 mt-2">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-brand-primary shrink-0" />
              <div className="text-left">
                <h4 className="text-white font-bold text-xs">Aynı Gün Gönderim</h4>
                <p className="text-[10px] text-brand-muted">Güvenli lojistik ambalajı</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-primary shrink-0" />
              <div className="text-left">
                <h4 className="text-white font-bold text-xs">Orijinal Ürün</h4>
                <p className="text-[10px] text-brand-muted">Barkodlu & Faturalı</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-brand-primary shrink-0" />
              <div className="text-left">
                <h4 className="text-white font-bold text-xs">Uzman Onaylı</h4>
                <p className="text-[10px] text-brand-muted">Uyum ve montaj garantisi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TECHNICAL SPECIFICATIONS & DETAILS */}
      <div className="mb-20">
        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-6 pb-2 border-b border-white/10 text-left">
          Teknik Özellikler & Açıklama
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
          {/* Detailed text */}
          <div className="lg:col-span-2 text-brand-muted text-sm leading-relaxed font-light">
            <h4 className="text-white font-bold text-lg mb-3 uppercase">Ürün Detayı</h4>
            <p className="mb-6">{product.description}</p>
            
            <h4 className="text-white font-bold text-lg mb-3 uppercase">Kargo, Kasko & Lojistik Güvencesi</h4>
            <p className="mb-4 font-sans font-light">
              HAWK MOTOR olarak, sevk ettiğimiz tüm premium motosiklet ve yedek parçaların fiziksel güvenliği konusunda sıfır tolerans politikası izlemekteyiz. Ürünlerimizin lüks niteliği ve yüksek maddi değeri sebebiyle, <strong>tüm teslimat ve nakliye süreçlerinde tam kapsamlı lojistik sigortası ve sevkiyat kaskosu yapılması yasal olarak zorunludur</strong>. Motosikletlerinizi özel kapalı çelik/ahşap konstrüksiyonlu lojistik sandıklarında, yedek parçalarınızı ise yüksek darbeye dayanıklı orijinal vakumlu ambalajlarında, tam kasko koruması altında kapınıza kadar hasarsızlık garantisiyle ulaştırmaktayız.
            </p>
          </div>

          {/* Specs Table */}
          <div className="lg:col-span-1">
            <div className="p-6 rounded-2xl bg-brand-card border border-white/5">
              <h4 className="text-white font-bold text-base uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
                Teknik Veriler
              </h4>
              <table className="w-full text-sm">
                <tbody>
                  {product.specs &&
                    Object.entries(product.specs).map(([key, val]) => (
                      <tr key={key} className="border-b border-white/5 last:border-0">
                        <td className="py-2.5 font-semibold text-brand-muted text-xs capitalize">{key}</td>
                        <td className="py-2.5 text-white font-bold text-right text-xs">{val as string}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* RECOMMENDED SIMILAR PRODUCTS SECTION */}
      {similarProducts.length > 0 && (
        <div className="border-t border-white/5 pt-16 text-left">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">
            Benzer Ürünler
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarProducts.map((sim) => (
              <div key={sim.id} className="group rounded-2xl overflow-hidden bg-brand-card border border-white/5 flex flex-col premium-card">
                <div className="relative h-48 w-full bg-[#111] overflow-hidden">
                  <img
                    src={sim.image}
                    alt={sim.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-brand-primary text-[10px] font-bold uppercase tracking-wider">
                      {sim.brand}
                    </span>
                    <h4 className="text-white font-extrabold text-base mt-1 uppercase group-hover:text-brand-primary transition-colors line-clamp-1">
                      {sim.name}
                    </h4>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    {siteConfig.showProductPrices !== false ? (
                      <span className="text-white font-black text-lg">
                        {sim.price.toLocaleString('tr-TR')} TL
                      </span>
                    ) : (
                      <span className="text-brand-primary font-bold text-xs uppercase">
                        Fiyat Sorun
                      </span>
                    )}
                    <Link
                      href={`/urun/${sim.id}`}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-brand-primary/40 text-white hover:text-brand-primary font-bold text-xs uppercase flex items-center gap-1 transition-all"
                    >
                      İncele
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

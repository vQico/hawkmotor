'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  Building2,
  Copy,
  Check,
  AlertTriangle,
  Info,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { trackIbanCopy, trackReceiptUploadClick } from '@/components/common/Analytics';

interface PaymentClientProps {
  paymentConfig: any;
  siteConfig: any;
}

export default function PaymentClient({ paymentConfig, siteConfig }: PaymentClientProps) {
  const [copied, setCopied] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'bank' | 'card'>(
    paymentConfig.cardPaymentsActive ? 'card' : 'bank'
  );
  const [showCardModal, setShowCardModal] = useState(false);

  // Copy IBAN function
  const handleCopyIban = () => {
    navigator.clipboard.writeText(paymentConfig.iban);
    setCopied(true);
    trackIbanCopy(paymentConfig.bankName);
    
    // Reset "Copied!" text after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Submit Receipt via WhatsApp
  const handleSendReceipt = () => {
    trackReceiptUploadClick();
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappFormatted}?text=${encodeURIComponent('Merhaba HAWK MOTOR, Havale / FAST ödememi gerçekleştirdim. Dekontumu ekte gönderiyorum.')}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCardMethodClick = () => {
    if (!paymentConfig.cardPaymentsActive) {
      setSelectedMethod('card');
      setShowCardModal(true);
    } else {
      setSelectedMethod('card');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 text-left">
      
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-primary transition-colors text-sm font-bold uppercase tracking-wider mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Alışverişe Devam Et
      </Link>

      <div className="text-center mb-12">
        <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em]">HAWK MOTOR GÜVENLİ ÖDEME</span>
        <h1 className="text-3xl md:text-5xl font-black text-white mt-2 uppercase tracking-tight">ÖDEME ADIMI</h1>
        <p className="text-brand-muted text-sm max-w-xl mx-auto mt-4 leading-relaxed">
          Sipariş işlemlerinizi güvenle havale / FAST yoluyla gerçekleştirebilirsiniz. Kurumsal hesap bilgilerimiz aşağıda detaylandırılmıştır.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* PAYMENT METHOD SELECTORS */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-2">Ödeme Yöntemi Seçin</h3>

          {/* Havale / FAST (Active) */}
          <button
            onClick={() => setSelectedMethod('bank')}
            className={`w-full p-5 rounded-2xl border text-left flex items-start gap-4 transition-all ${
              selectedMethod === 'bank'
                ? 'bg-brand-primary/5 border-brand-primary shadow-[0_0_15px_rgba(249,115,22,0.15)] text-white'
                : 'bg-brand-card border-white/5 text-brand-muted hover:border-white/10 hover:text-white'
            }`}
          >
            <Building2 className={`w-6 h-6 shrink-0 mt-0.5 ${selectedMethod === 'bank' ? 'text-brand-primary' : 'text-brand-muted'}`} />
            <div>
              <h4 className="font-extrabold text-sm uppercase">Havale / FAST</h4>
              <p className="text-[11px] text-brand-muted mt-1 leading-normal font-light">
                Banka hesaplarımız üzerinden anında ve komisyonsuz transfer. (Önerilen)
              </p>
            </div>
          </button>

          {/* Kredi Kartı / Banka Kartı */}
          <button
            onClick={handleCardMethodClick}
            className={`w-full p-5 rounded-2xl border text-left flex items-start gap-4 transition-all ${
              selectedMethod === 'card'
                ? 'bg-brand-primary/5 border-brand-primary text-white'
                : 'bg-brand-card border-white/5 text-brand-muted hover:border-white/10 hover:text-white'
            }`}
          >
            <CreditCard className={`w-6 h-6 shrink-0 mt-0.5 ${selectedMethod === 'card' ? 'text-brand-primary' : 'text-brand-muted'}`} />
            <div>
              <h4 className="font-extrabold text-sm uppercase">Kredi / Banka Kartı</h4>
              <p className="text-[11px] text-brand-muted mt-1 leading-normal font-light">
                Kredi kartı veya taksit seçenekleri ile ödeme altyapısı.
              </p>
            </div>
          </button>
        </div>

        {/* DETAILS SECTION */}
        <div className="md:col-span-2">
          
          <AnimatePresence mode="wait">
            {selectedMethod === 'bank' ? (
              <motion.div
                key="bank-details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-2xl glass-panel-heavy border border-white/5 flex flex-col gap-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-extrabold text-lg uppercase">Banka Havale & FAST Bilgileri</h3>
                    <p className="text-xs text-brand-muted">Ödemenizi aşağıdaki kurumsal hesaba aktarabilirsiniz.</p>
                  </div>
                </div>

                {/* Structured details display */}
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-3 gap-2 py-3 border-b border-white/5 text-sm">
                    <span className="text-brand-muted font-medium text-xs">Banka Adı</span>
                    <span className="col-span-2 text-white font-bold text-right text-xs uppercase">{paymentConfig.bankName}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-3 border-b border-white/5 text-sm">
                    <span className="text-brand-muted font-medium text-xs">Şube / Kod</span>
                    <span className="col-span-2 text-white font-bold text-right text-xs">{paymentConfig.branch}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-3 border-b border-white/5 text-sm">
                    <span className="text-brand-muted font-medium text-xs">Alıcı Ünvanı</span>
                    <span className="col-span-2 text-white font-bold text-right text-xs uppercase">{paymentConfig.accountHolder}</span>
                  </div>

                  {/* IBAN Copying Deck */}
                  <div className="flex flex-col gap-2.5 p-4 rounded-xl bg-brand-card border border-white/5 mt-2">
                    <label className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">IBAN NUMARASI</label>
                    <div className="flex items-center justify-between gap-3 bg-black/40 px-4 py-3.5 rounded-xl border border-white/5">
                      <span className="text-white font-mono font-bold tracking-wider text-xs md:text-sm overflow-x-auto no-scrollbar select-all">
                        {paymentConfig.iban}
                      </span>
                      <button
                        onClick={handleCopyIban}
                        className="p-2 rounded-lg bg-brand-primary text-white hover:bg-brand-hover transition-colors shrink-0 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Kopyalandı
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Kopyala
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  {/* WhatsApp Confirmation button */}
                  <button
                    onClick={handleSendReceipt}
                    className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_4px_15px_rgba(37,211,102,0.3)] flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.464L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.116-2.885-6.968C16.632 1.97 14.153.948 11.53.948c-5.445 0-9.87 4.373-9.874 9.802-.001 1.816.505 3.593 1.465 5.17l-.962 3.51 3.633-.953zm11.758-5.321c-.266-.134-1.583-.781-1.829-.871-.247-.09-.427-.134-.607.134-.181.269-.696.871-.853 1.05-.157.18-.314.202-.58.069-.267-.134-1.127-.416-2.148-1.326-.793-.708-1.329-1.582-1.486-1.85-.157-.269-.017-.414.118-.548.121-.12.267-.314.4-.471.134-.157.179-.269.269-.449.09-.18.045-.337-.022-.471-.067-.134-.607-1.459-.83-2.001-.219-.526-.441-.453-.607-.461-.157-.008-.337-.011-.518-.011-.18 0-.472.067-.719.337-.247.269-.943.921-.943 2.245s.965 2.597 1.099 2.777c.134.18 1.9 2.901 4.602 4.067.643.277 1.144.443 1.535.567.646.205 1.233.176 1.697.107.518-.077 1.583-.647 1.808-1.272.225-.624.225-1.161.157-1.272-.067-.113-.247-.18-.513-.314z" />
                    </svg>
                    Dekont Gönder & Sipariş Onayla
                  </button>

                  <div className="p-4 rounded-xl bg-brand-primary/5 border border-brand-primary/10 text-xs text-brand-muted leading-relaxed flex items-start gap-2.5">
                    <Info className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                    <p className="font-sans font-light">
                      {paymentConfig.description || 'Ödemeyi tamamladıktan sonra yukarıdaki butona tıklayarak dekontunuzu doğrudan WhatsApp müşteri temsilcimize iletebilirsiniz. Siparişiniz 5 dakika içinde onaylanacaktır.'}
                    </p>
                  </div>
                </div>

              </motion.div>
            ) : (
              <motion.div
                key="card-details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 rounded-2xl glass-panel-heavy border border-white/5 flex flex-col items-center justify-center text-center py-16 gap-6"
              >
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 animate-bounce">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-xl uppercase">KREDİ KARTI ALTYAPISI AKTİF DEĞİL</h3>
                  <p className="text-brand-muted text-sm max-w-sm mx-auto mt-2 leading-relaxed font-light">
                    Güvenliğiniz ve anlık faturalandırma süreçleri gereği, kredi kartı entegrasyonumuz geçici olarak durdurulmuştur.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMethod('bank')}
                  className="px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-xs orange-glow cursor-pointer"
                >
                  Havale / FAST Yöntemine Dön
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* BLOCKED WARNING MODAL */}
      <AnimatePresence>
        {showCardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowCardModal(false);
                setSelectedMethod('bank');
              }}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-md glass-panel-heavy rounded-2xl p-8 shadow-2xl border border-white/10 z-10 text-center"
            >
              <div className="mx-auto w-14 h-14 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary mb-6 animate-pulse">
                <AlertTriangle className="w-7 h-7" />
              </div>

              <h3 className="text-white font-extrabold text-xl mb-3 uppercase tracking-wide">
                Ödeme Yöntemi Uyarısı
              </h3>
              
              <p className="text-brand-muted text-sm leading-relaxed mb-6 font-light">
                Bu ödeme yöntemi şu anda aktif değildir.
                <br />
                <span className="text-white font-bold">Lütfen Havale / FAST ile devam ediniz.</span>
              </p>

              <button
                onClick={() => {
                  setShowCardModal(false);
                  setSelectedMethod('bank');
                }}
                className="w-full py-3.5 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
              >
                Havale Bilgilerini Görüntüle
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

import { getDashboardStats } from '@/app/actions/adminActions';
import { 
  Building2, 
  MessageCircle, 
  Phone, 
  Copy, 
  FileText, 
  Package, 
  Motorbike, 
  Wrench,
  Clock,
  ArrowUpRight,
  TrendingUp as TrendIcon
} from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const result = await getDashboardStats();
  const stats = result.stats;
  const recentMotors = result.recentMotors || [];
  const recentParts = result.recentParts || [];

  const cards = [
    {
      title: 'Toplam Envanter',
      value: stats.totalProducts,
      sub: `${stats.totalMotors} Motosiklet | ${stats.totalParts} Parça`,
      icon: <Package className="w-5 h-5 text-brand-primary" />,
      glow: 'shadow-[0_0_15px_rgba(249,115,22,0.05)]'
    },
    {
      title: 'WhatsApp Tıklamaları',
      value: stats.whatsappClicks,
      sub: 'Google Ads Conversion Log',
      icon: <MessageCircle className="w-5 h-5 text-emerald-400" />,
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.05)]'
    },
    {
      title: 'Telefon Aramaları',
      value: stats.phoneCalls,
      sub: 'Hemen Ara Conversion Log',
      icon: <Phone className="w-5 h-5 text-cyan-400" />,
      glow: 'shadow-[0_0_15px_rgba(34,211,238,0.05)]'
    },
    {
      title: 'Kopyalanan IBAN & Dekont',
      value: stats.ibanCopies + stats.receiptUploads,
      sub: `${stats.ibanCopies} IBAN Kop. | ${stats.receiptUploads} Dekont Form`,
      icon: <Copy className="w-5 h-5 text-amber-400" />,
      glow: 'shadow-[0_0_15px_rgba(251,191,36,0.05)]'
    }
  ];

  return (
    <div className="flex flex-col gap-8 text-left">
      
      {/* 1. Page Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white">DASHBOARD</h1>
        <p className="text-brand-muted text-sm mt-2 font-light">
          HAWK MOTOR mağaza genel durumunu, Google Ads dönüşümlerini ve envanter analizlerini buradan yönetebilirsiniz.
        </p>
      </div>

      {/* 2. Grid Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div 
            key={idx} 
            className={`p-6 rounded-2xl bg-brand-card border border-white/5 flex flex-col gap-4 relative overflow-hidden ${card.glow}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">{card.title}</span>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                {card.icon}
              </div>
            </div>

            <div>
              <p className="text-3xl md:text-4xl font-black text-white tracking-wide">{card.value}</p>
              <p className="text-[10px] text-brand-muted mt-1 leading-normal font-light">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Detailed Data Split Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-4">
        
        {/* Left Column: Recent Motorcycles */}
        <div className="p-6 rounded-2xl glass-panel border border-white/5 flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Motorbike className="w-5 h-5 text-brand-primary" />
              <h3 className="text-white font-extrabold text-base uppercase">Son Eklenen Motosikletler</h3>
            </div>
            <Link 
              href="/admin/urunler" 
              className="text-[10px] font-bold text-brand-primary hover:text-brand-hover tracking-wider uppercase flex items-center gap-1"
            >
              YÖNET <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentMotors.length === 0 ? (
            <div className="text-center py-12 text-xs text-brand-muted font-light uppercase tracking-wider">
              Henüz motosiklet kaydı girilmemiştir.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {recentMotors.map((m) => (
                <div 
                  key={m.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-4 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img 
                      src={m.image} 
                      alt={m.name} 
                      className="w-12 h-12 rounded-lg object-cover bg-black/40 shrink-0 border border-white/10" 
                    />
                    <div className="flex flex-col text-left min-w-0">
                      <span className="text-xs font-extrabold text-white uppercase truncate">{m.name}</span>
                      <span className="text-[10px] text-brand-muted mt-0.5 font-light">{m.brand} | {m.year} | {m.km} km</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-xs font-black text-white">{m.price.toLocaleString('tr-TR')} TL</span>
                    <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1.5 ${
                      m.stock === 'Stokta Var' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {m.stock}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Recent Spare Parts */}
        <div className="p-6 rounded-2xl glass-panel border border-white/5 flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-brand-primary" />
              <h3 className="text-white font-extrabold text-base uppercase">Son Eklenen Yedek Parçalar</h3>
            </div>
            <Link 
              href="/admin/urunler" 
              className="text-[10px] font-bold text-brand-primary hover:text-brand-hover tracking-wider uppercase flex items-center gap-1"
            >
              YÖNET <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentParts.length === 0 ? (
            <div className="text-center py-12 text-xs text-brand-muted font-light uppercase tracking-wider">
              Henüz yedek parça kaydı girilmemiştir.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {recentParts.map((p) => (
                <div 
                  key={p.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-4 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-12 h-12 rounded-lg object-cover bg-black/40 shrink-0 border border-white/10" 
                    />
                    <div className="flex flex-col text-left min-w-0">
                      <span className="text-xs font-extrabold text-white uppercase truncate">{p.name}</span>
                      <span className="text-[10px] text-brand-muted mt-0.5 font-light">{p.brand} | {p.category}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-xs font-black text-white">{p.price.toLocaleString('tr-TR')} TL</span>
                    <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1.5 ${
                      p.stock === 'Stokta Var' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {p.stock}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

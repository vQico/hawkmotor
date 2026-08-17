'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Cpu, Send, Bot, User, ArrowRight } from 'lucide-react';
import { siteConfig as staticConfig } from '@/config/site';
import { trackWhatsAppClick } from '@/components/common/Analytics';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const defaultLiveSettings = {
  aiActive: true,
  maintenanceMessage: 'Yapay zekâ destek sistemi şu anda bakım aşamasındadır. En hızlı destek için WhatsApp üzerinden bize ulaşabilirsiniz.',
  whatsappMessage: 'Merhaba HAWK MOTOR, Yapay Zekâ asistanı üzerinden ulaşıyorum. Canlı satış temsilcisi ile görüşebilir miyim?',
};

interface LiveSupportProps {
  siteConfig?: any;
  liveSupportSettings?: any;
}

export default function LiveSupport({
  siteConfig = staticConfig,
  liveSupportSettings = defaultLiveSettings
}: LiveSupportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: liveSupportSettings.aiActive 
        ? `Merhaba! HAWK MOTOR Premium ${liveSupportSettings.aiName || 'HAWK AI'} Asistanı'na hoş geldiniz. ⚡ Türkiye'nin en seçkin motosiklet koleksiyonu, orijinal yedek parçalarımız, Beşiktaş showroom adresimiz veya FAST ödeme kanallarımız hakkında bilgi edinmek için bana dilediğinizi sorabilirsiniz.`
        : liveSupportSettings.maintenanceMessage,
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleWhatsAppHumanSupport = () => {
    trackWhatsAppClick('AI Chatbox Fallback');
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappFormatted}?text=${encodeURIComponent(liveSupportSettings.whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const quickReplies = [
    { label: 'Ducati Panigale Fiyatı?', text: 'Ducati Panigale V4 S fiyatı ve özellikleri nedir?' },
    { label: 'Beşiktaş Showroom Nerede?', text: 'Showroom nerede, nasıl gelebilirim?' },
    { label: 'Ödeme Seçenekleri & IBAN?', text: 'FAST / Havale ödeme bilgileri ve IBAN nedir?' },
    { label: 'BMW S 1000 RR Stokta Var mı?', text: 'BMW S 1000 RR stok durumu nedir?' },
  ];

  const getAIResponse = (userText: string): string => {
    const text = userText.toLowerCase();

    if (text.includes('ducati') || text.includes('panigale')) {
      return `<strong>Ducati Panigale V4 S</strong>, MotoGP teknolojisine sahip Desmosedici Stradale V4 motoru, Öhlins elektronik süspansiyonları ve <strong>215.5 HP</strong> saf gücü ile İtalyan mühendisliğinin zirvesidir.<br/><br/>
      🔴 <strong>Durum:</strong> Sıfır Kilometre<br/>
      💰 <strong>Fiyat:</strong> 1.850.000 TL (Anahtar Teslim)<br/>
      🟢 <strong>Stok:</strong> Stokta Var (Showroomumuzda görülebilir)<br/><br/>
      Satın alım veya rezerve işlemleri için doğrudan WhatsApp satış ekibimizle de görüşebilirsiniz.`;
    }

    if (text.includes('bmw') || text.includes('s1000rr') || text.includes('s 1000')) {
      return `<strong>BMW S 1000 RR</strong>, BMW ShiftCam teknolojisine sahip <strong>210 HP</strong> gücünde pist lideri bir süper spordur. Aerodinamik kanatçıkları (winglets) ve gelişmiş sürüş modları ile viraj canavarıdır.<br/><br/>
      🔵 <strong>Durum:</strong> Kampanyalı Model (Sıfır)<br/>
      💰 <strong>Fiyat:</strong> 1.650.000 TL<br/>
      🟡 <strong>Stok:</strong> Sınırlı Stok (Son 1 Adet)<br/><br/>
      Hızlı alım ve nakliye detayları için WhatsApp üzerinden ekibimizle anında iletişime geçebilirsiniz.`;
    }

    if (text.includes('ktm') || text.includes('duke') || text.includes('super duke')) {
      return `<strong>KTM 1290 Super Duke R Evo</strong>, "The Beast" lakaplı 1301 cc V-Twin motoru ile <strong>180 HP</strong> güç ve <strong>140 Nm</strong> vahşi tork sunan hiper-naked lideridir.<br/><br/>
      🟠 <strong>Durum:</strong> Sıfır (Showroom Teslim)<br/>
      💰 <strong>Fiyat:</strong> 1.420.000 TL<br/>
      🟡 <strong>Stok:</strong> Sınırlı Stok (Showroomumuzda sergilenmektedir)`;
    }

    if (text.includes('yamaha') || text.includes('r1') || text.includes('yzf')) {
      return `<strong>Yamaha YZF-R1M</strong>, MotoGP M1 yarış motorundan ilham alan karbon fiber gövdesi, Öhlins ERS süspansiyonu ve crossplane motor sesi ile saf bir yarış canavarıdır.<br/><br/>
      🔵 <strong>Durum:</strong> Sıfır Kilometre<br/>
      💰 <strong>Fiyat:</strong> 1.750.000 TL<br/>
      🟢 <strong>Stok:</strong> Stokta Var`;
    }

    if (text.includes('honda') || text.includes('africa') || text.includes('crf')) {
      return `<strong>Honda CRF1100L Africa Twin Adventure Sports</strong>, DCT şanzıman seçeneği, 24.8 litrelik geniş yakıt deposu ve Showa elektronik süspansiyonları ile en zorlu arazi rotalarının konforlu fatihidir.<br/><br/>
      🔴 <strong>Durum:</strong> Kampanyalı (Sıfır)<br/>
      💰 <strong>Fiyat:</strong> 1.150.000 TL<br/>
      🟢 <strong>Stok:</strong> Stokta Var`;
    }

    if (text.includes('multistrada') || text.includes('pikes') || text.includes('crossover')) {
      return `<strong>Ducati Multistrada V4 Pikes Peak</strong>, 170 beygirlik V4 Granturismo motoru, Öhlins süspansiyonları ve MotoGP renk şeması ile süper spor ruhunu macera konseptiyle buluşturan lüks bir şaheserdir.<br/><br/>
      🔴 <strong>Durum:</strong> Sıfır Kilometre<br/>
      💰 <strong>Fiyat:</strong> 2.100.000 TL<br/>
      🟡 <strong>Stok:</strong> Sınırlı Stok`;
    }

    if (text.includes('kawasaki') || text.includes('h2') || text.includes('zx10r') || text.includes('zx-10r')) {
      return `<strong>Kawasaki Ninja H2R</strong>, 998 cc supercharged (kompresörlü) motoru ve <strong>310 HP</strong> gücü ile iki tekerlekli mühendisliğin sınır noktasıdır. Ayrıca caddelerin efsane şampiyonu <strong>Ninja ZX-10R</strong> modelimiz de stokta mevcuttur.<br/><br/>
      🟢 <strong>Ninja ZX-10R (Sıfır):</strong> 1.390.000 TL<br/>
      🔴 <strong>Ninja H2R (Sıfır, Pist Özel):</strong> 3.850.000 TL<br/><br/>
      Detaylı sipariş ve teslimat süreci için bizimle iletişime geçebilirsiniz.`;
    }

    if (text.includes('harley') || text.includes('davidson') || text.includes('fat boy') || text.includes('fatboy')) {
      return `<strong>Harley-Davidson Fat Boy 114</strong>, saten krom kaplamaları, 1868 cc Milwaukee-Eight 114 motoru ve Lakester jantları ile gerçek Amerikan cruiser tarzının efsanevi temsilcisidir.<br/><br/>
      🇺🇸 <strong>Durum:</strong> Sıfır Kilometre<br/>
      💰 <strong>Fiyat:</strong> 1.480.000 TL<br/>
      🟢 <strong>Stok:</strong> Stokta Var (Showroomumuzda sergilenmektedir)`;
    }

    if (text.includes('suzuki') || text.includes('hayabusa')) {
      return `<strong>Suzuki Hayabusa GSX1300R</strong>, 1340 cc sıralı 4 silindirli motoru, üstün rüzgar korumalı aerodinamik tasarımı ve efsanevi hız kimliği ile süper spor turing dünyasının yegane sembolüdür.<br/><br/>
      🇯🇵 <strong>Durum:</strong> Kampanyalı Model (Sıfır)<br/>
      💰 <strong>Fiyat:</strong> 1.290.000 TL<br/>
      🟢 <strong>Stok:</strong> Stokta Var`;
    }

    if (text.includes('cfmoto') || text.includes('cf moto') || text.includes('450sr') || text.includes('250nk') || text.includes('800mt')) {
      return `<strong>CFMOTO</strong>, son yıllarda Türkiye pazarını domine eden ve yüksek fiyat/performans sunan son derece popüler bir markadır. HAWK MOTOR güvencesiyle sıfır kilometre modellerimiz:<br/><br/>
      🏁 <strong>CFMOTO 450SR (Süper Spor):</strong> 285.000 TL (Stokta Var)<br/>
      ⚡ <strong>CFMOTO 250NK (Naked):</strong> 165.000 TL (Stokta Var)<br/>
      ⛰️ <strong>CFMOTO 800MT Touring (Macera):</strong> 495.000 TL (Sınırlı Stok)<br/><br/>
      Sıfır kilometre teslimat detayları ve ödeme kolaylıkları için ekibimizle görüşebilirsiniz.`;
    }

    if (text.includes('rks') || text.includes('rks motor') || text.includes('a250') || text.includes('freccia') || text.includes('wildcat')) {
      return `<strong>RKS Motor</strong>, Türkiye'nin en yaygın servis ağına sahip, günlük ulaşım ve bütçe dostu scooter/naked pazarının lideridir. Sıfır kilometre popüler stoklarımız:<br/><br/>
      🏍️ <strong>RKS A250 (Çift Silindir Naked):</strong> 155.000 TL (Stokta Var)<br/>
      🛵 <strong>RKS Freccia 150 (Adventure Scooter):</strong> 115.000 TL (Stokta Var)<br/>
      🛵 <strong>RKS Wildcat 125 (Ekonomik Scooter):</strong> 75.000 TL (Stokta Var)<br/><br/>
      Tüm modellerimiz sıfır kilometre ve resmi distribütör garantilidir.`;
    }

    if (text.includes('qj') || text.includes('qjmotor') || text.includes('qj motor') || text.includes('srk') || text.includes('srv')) {
      return `<strong>QJ Motor</strong>, heybetli kasaları ve yüksek teknolojik donanımlarıyla bilinen küresel bir devdir. Öne çıkan sıfır kilometre modellerimiz:<br/><br/>
      ⚡ <strong>QJ Motor SRK 400 (Naked):</strong> 245.000 TL (Stokta Var)<br/>
      🏍️ <strong>QJ Motor SRV 300 (V-Twin Bobber):</strong> 215.000 TL (Sınırlı Stok)<br/><br/>
      Kasa kalitesi ve performansını showroomumuzda bizzat test edebilirsiniz.`;
    }

    if (text.includes('benelli') || text.includes('trk') || text.includes('trk502')) {
      return `<strong>Benelli TRK 502 X</strong>, İtalyan tasarımı heybetli kasası ve 500cc çift silindirli motoruyla Türkiye'nin en çok satan orta sınıf seyahat endurosudur.<br/><br/>
      🇮🇹 <strong>Durum:</strong> Sıfır Kilometre<br/>
      💰 <strong>Fiyat:</strong> 345.000 TL<br/>
      🟢 <strong>Stok:</strong> Stokta Var (Tüm renk seçenekleriyle)`;
    }

    if (text.includes('voge') || text.includes('525dsx')) {
      return `<strong>Voge 525DSX</strong>, KYB amortisörler, Nissin frenler ve tubeless tel jantlar gibi üst seviye bileşenleri standart sunan premium bir orta sınıf macera motosikletidir.<br/><br/>
      ⛰️ <strong>Durum:</strong> Sıfır Kilometre<br/>
      💰 <strong>Fiyat:</strong> 355.000 TL<br/>
      🟢 <strong>Stok:</strong> Stokta Var (Showroomumuzda sergilenmektedir)`;
    }

    if (text.includes('yedek') || text.includes('parça') || text.includes('aksesuar') || text.includes('brembo') || text.includes('pirelli') || text.includes('did') || text.includes('zincir') || text.includes('akrapovic') || text.includes('motul') || text.includes('evotech')) {
      return `HAWK MOTOR, yüksek performanslı orijinal yedek parça ve aksesuarlarda liderdir. Bazı öne çıkan stoklarımız:<br/><br/>
      🏍️ <strong>Brembo GP4-RX CNC Kaliper Seti:</strong> 54.000 TL (Stokta Var)<br/>
      🏍️ <strong>Pirelli Diablo Supercorsa SP V4 Lastik Takımı:</strong> 24.500 TL (Stokta Var)<br/>
      🏍️ <strong>Akrapovic Slip-On Egzoz (S1000RR):</strong> 48.500 TL (Sınırlı Stok)<br/>
      🏍️ <strong>DID 525 ZVM-X Altın Zincir:</strong> 9.800 TL (Stokta Var)<br/>
      🏍️ <strong>Motul 300V Yağ (4L):</strong> 3.200 TL (Stokta Var)<br/><br/>
      Ayrıntılı montaj ve stok sorgulamak için WhatsApp'tan <strong>BİLGİ AL</strong> butonuna tıklayabilirsiniz.`;
    }

    if (text.includes('ödeme') || text.includes('iban') || text.includes('fast') || text.includes('havale') || text.includes('banka') || text.includes('transfer') || text.includes('hesap')) {
      return `HAWK MOTOR ödemelerini <strong>FAST / Havale / EFT</strong> yöntemiyle güvenle gerçekleştirebilirsiniz. Siparişinizin anında onaylanması için ödeme sonrasında dekontunuzu WhatsApp satış hattımıza iletebilirsiniz.<br/><br/>
      🏦 <strong>Banka:</strong> ${siteConfig.bankDetails.bankName}<br/>
      📍 <strong>Şube:</strong> ${siteConfig.bankDetails.branch}<br/>
      👤 <strong>Alıcı:</strong> ${siteConfig.bankDetails.accountHolder}<br/>
      💳 <strong>IBAN:</strong> <code class="text-brand-primary font-bold bg-white/5 px-2 py-1 rounded select-all">${siteConfig.bankDetails.iban}</code><br/><br/>
      Ödeme sonrasında onay işleminiz <strong>5 dakika içerisinde</strong> tamamlanacaktır.`;
    }

    if (text.includes('adres') || text.includes('showroom') || text.includes('konum') || text.includes('nerede') || text.includes('ulaşım') || text.includes('yer') || text.includes('beşiktaş') || text.includes('istanbul')) {
      return `HAWK MOTOR Showroomumuz İstanbul'un en merkezi konumunda sizleri bekliyor.<br/><br/>
      📍 <strong>Adres:</strong> ${siteConfig.address}<br/>
      📞 <strong>Telefon:</strong> ${siteConfig.phone}<br/>
      ⏰ <strong>Çalışma Saatlerimiz:</strong><br/>
      - Pazartesi - Cuma: 09:00 - 19:00<br/>
      - Cumartesi: 10:00 - 17:00<br/>
      - Pazar: Kapalı (Özel randevu hariç)<br/><br/>
      Showroomumuzda tüm premium modellerimizi yakından inceleyebilir, özel kahvemiz eşliğinde satış danışmanlarımızla görüşebilirsiniz.`;
    }

    if (text.includes('merhaba') || text.includes('selam') || text.includes('hey') || text.includes('slm')) {
      return `Merhaba! HAWK MOTOR dünyasına hoş geldiniz. Size bugün hangi premium motosikletimiz, yedek parçalarımız veya hizmetlerimiz hakkında bilgi vermemi istersiniz?`;
    }

    // Default Fallback
    return `Sorduğunuz konuyu tam olarak analiz ettim. HAWK MOTOR bünyesindeki premium motosiklet modelleri (Ducati, BMW, KTM vb.), yedek parça kataloğumuz, ödeme IBAN hesaplarımız veya showroom adresimiz hakkında detaylı rehberlik yapabilirim.<br/><br/>
    Dilerseniz doğrudan resmi WhatsApp hattımız üzerinden <strong>canlı satış temsilcimize bağlanarak da anında destek alabilirsiniz.</strong>`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || inputValue;
    if (!messageText.trim()) return;

    // User Message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI Response with typing delay
    setTimeout(() => {
      const responseText = getAIResponse(messageText);
      const aiMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* FLOATING AI ASSISTANT PULSING TRIGGER - DESKTOP */}
      <div className="fixed right-6 bottom-40 z-40 hidden md:block">
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 25, delay: 1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="glass-panel-heavy rounded-full border border-brand-primary/30 py-2.5 px-4 flex items-center gap-3 shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:shadow-[0_0_25px_rgba(249,115,22,0.30)] hover:border-brand-primary/60 transition-all duration-300 cursor-pointer group active:scale-95 text-left"
        >
          {/* Glowing Animated Icon */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-primary to-amber-500 text-white flex items-center justify-center relative shadow-inner">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="absolute inset-0 rounded-full border border-brand-primary/50 animate-ping opacity-40 pointer-events-none" />
          </div>
          
          <div className="flex flex-col">
            <span className="font-extrabold text-[10px] tracking-[0.15em] text-white uppercase group-hover:text-brand-primary transition-colors">
              {liveSupportSettings.aiName || 'HAWK AI'}
            </span>
            <span className="text-[8px] font-bold tracking-[0.1em] text-brand-muted uppercase">
              Canlı Destek
            </span>
          </div>

          {/* Active Online Pulse Dot */}
          <div className="w-2 h-2 rounded-full bg-emerald-500 relative ml-1 shadow-[0_0_8px_rgba(16,185,129,0.5)]">
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75 pointer-events-none" />
          </div>
        </motion.button>
      </div>

      {/* MOBILE TRIGGER IN MAIN VIEW COMPONENT */}
      <div className="fixed right-4 bottom-24 z-40 md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="glass-panel-heavy rounded-full border border-brand-primary/30 py-2 px-3 flex items-center gap-2 shadow-lg cursor-pointer active:scale-95"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-primary to-amber-500 text-white flex items-center justify-center relative">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-extrabold text-[9px] tracking-[0.12em] text-white uppercase">
            {liveSupportSettings.aiName || 'HAWK AI'}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 relative ml-0.5 shadow-[0_0_5px_rgba(16,185,129,0.5)]">
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75 pointer-events-none" />
          </div>
        </button>
      </div>

      {/* OVERLAY AND AI CHAT WINDOW DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-6 pointer-events-none">
            {/* Backdrop filter overlay (Only clickable to close, supports pointer events) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
            />

            {/* Premium Glassmorphic Chatbot Drawer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-[400px] h-[580px] glass-panel-heavy rounded-2xl shadow-2xl border border-white/10 z-10 flex flex-col justify-between overflow-hidden pointer-events-auto"
            >
              {/* Header */}
              <div className="p-4 bg-brand-card/80 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-primary to-amber-500 flex items-center justify-center text-white relative">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    {/* Live Online Dot */}
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-brand-card animate-pulse" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-extrabold text-sm uppercase tracking-wide text-white">{(liveSupportSettings.aiName || 'HAWK AI') + ' Asistanı'}</span>
                    <span className="text-[10px] text-emerald-400 font-semibold tracking-wider flex items-center gap-1">
                      Çevrimiçi • Premium Destek
                    </span>
                  </div>
                </div>
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-brand-muted hover:text-white rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Message Logs Area */}
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 scrollbar-thin bg-black/20">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {/* AI Avatar */}
                    {msg.sender === 'ai' && (
                      <div className="w-7 h-7 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center shrink-0 text-brand-primary">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    {/* Message Bubble */}
                    <div
                      className={`max-w-[78%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-brand-primary text-white rounded-tr-none font-medium'
                          : 'bg-brand-card/90 border border-white/5 text-brand-muted rounded-tl-none'
                      }`}
                    >
                      {msg.sender === 'ai' ? (
                        <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                      ) : (
                        <div>{msg.text}</div>
                      )}
                      <span className={`text-[8px] mt-1.5 block text-right ${msg.sender === 'user' ? 'text-white/60' : 'text-brand-muted/60'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                    {/* User Avatar */}
                    {msg.sender === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-white">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Simulated Typing Bubbles */}
                {isTyping && (
                  <div className="flex gap-2.5 justify-start">
                    <div className="w-7 h-7 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center shrink-0 text-brand-primary">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-3 bg-brand-card/90 border border-white/5 text-brand-muted rounded-2xl rounded-tl-none flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Preset Quick replies */}
              {liveSupportSettings.aiActive && messages.length === 1 && !isTyping && (
                <div className="px-4 pb-2 pt-1 flex flex-wrap gap-1.5 bg-black/10">
                  {quickReplies.map((qr, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(qr.text)}
                      className="text-[10px] py-1.5 px-2.5 rounded-lg bg-white/5 border border-white/10 text-brand-muted hover:text-white hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all text-left font-bold cursor-pointer"
                    >
                      {qr.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Chat Footer / Form & WhatsApp fallback */}
              <div className="p-3 bg-brand-card/90 border-t border-white/5 flex flex-col gap-2">
                {liveSupportSettings.aiActive ? (
                  <>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Bir şeyler sorun..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary/50 transition-colors"
                      />
                      <button
                        type="submit"
                        className="w-10 h-10 bg-brand-primary hover:bg-brand-hover rounded-xl flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>

                    {/* Human support direct Whatsapp link */}
                    <button
                      onClick={handleWhatsAppHumanSupport}
                      className="w-full py-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer mt-1"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.464L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.116-2.885-6.968C16.632 1.97 14.153.948 11.53.948c-5.445 0-9.87 4.373-9.874 9.802-.001 1.816.505 3.593 1.465 5.17l-.962 3.51 3.633-.953zm11.758-5.321c-.266-.134-1.583-.781-1.829-.871-.247-.09-.427-.134-.607.134-.181.269-.696.871-.853 1.05-.157.18-.314.202-.58.069-.267-.134-1.127-.416-2.148-1.326-.793-.708-1.329-1.582-1.486-1.85-.157-.269-.017-.414.118-.548.121-.12.267-.314.4-.471.134-.157.179-.269.269-.449.09-.18.045-.337-.022-.471-.067-.134-.607-1.459-.83-2.001-.219-.526-.441-.453-.607-.461-.157-.008-.337-.011-.518-.011-.18 0-.472.067-.719.337-.247.269-.943.921-.943 2.245s.965 2.597 1.099 2.777c.134.18 1.9 2.901 4.602 4.067.643.277 1.144.443 1.535.567.646.205 1.233.176 1.697.107.518-.077 1.583-.647 1.808-1.272.225-.624.225-1.161.157-1.272-.067-.113-.247-.18-.513-.314z" />
                      </svg>
                      Temsilciye Bağlan (WhatsApp)
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleWhatsAppHumanSupport}
                    className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[0_4px_12px_rgba(37,211,102,0.3)]"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.464L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.116-2.885-6.968C16.632 1.97 14.153.948 11.53.948c-5.445 0-9.87 4.373-9.874 9.802-.001 1.816.505 3.593 1.465 5.17l-.962 3.51 3.633-.953zm11.758-5.321c-.266-.134-1.583-.781-1.829-.871-.247-.09-.427-.134-.607.134-.181.269-.696.871-.853 1.05-.157.18-.314.202-.58.069-.267-.134-1.127-.416-2.148-1.326-.793-.708-1.329-1.582-1.486-1.85-.157-.269-.017-.414.118-.548.121-.12.267-.314.4-.471.134-.157.179-.269.269-.449.09-.18.045-.337-.022-.471-.067-.134-.607-1.459-.83-2.001-.219-.526-.441-.453-.607-.461-.157-.008-.337-.011-.518-.011-.18 0-.472.067-.719.337-.247.269-.943.921-.943 2.245s.965 2.597 1.099 2.777c.134.18 1.9 2.901 4.602 4.067.643.277 1.144.443 1.535.567.646.205 1.233.176 1.697.107.518-.077 1.583-.647 1.808-1.272.225-.624.225-1.161.157-1.272-.067-.113-.247-.18-.513-.314z" />
                    </svg>
                    WhatsApp Destek Hattı
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

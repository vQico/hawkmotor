'use client';

import { useState, useTransition } from 'react';
import { 
  SiteSetting as SiteType, 
  PaymentSetting as PayType 
} from '@prisma/client';
import { 
  Save, 
  Check, 
  ShieldCheck, 
  Settings, 
  Building2, 
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Coins,
  X,
  Tags,
  Award,
  Plus
} from 'lucide-react';
import { 
  saveSiteSettings, 
  savePaymentSettings, 
  createLegalDocument,
  updateLegalDocument,
  deleteLegalDocument,
  createCategory,
  updateCategory,
  deleteCategory,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadImageAction,
  createBrandModel,
  deleteBrandModel
} from '@/app/actions/adminActions';

interface SettingsClientProps {
  initialSite: SiteType | null;
  initialPayment: PayType | null;
  initialLegalDocs: any[];
  initialCategories: any[];
  initialBrands: any[];
}

export default function SettingsClient({ 
  initialSite, 
  initialPayment, 
  initialLegalDocs,
  initialCategories,
  initialBrands
}: SettingsClientProps) {
  const [activeTab, setActiveTab] = useState<'site' | 'payment' | 'about' | 'legal' | 'categories' | 'brands'>('site');
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);

  // Form State - Site Settings
  const [siteForm, setSiteForm] = useState({
    siteName: initialSite?.siteName || 'HAWK MOTOR',
    heroTitle: initialSite?.heroTitle || 'Türkiye’nin Premium Motosiklet & Yedek Parça Merkezi',
    heroDescription: initialSite?.heroDescription || 'Lüks motosiklet markaları, ultra yüksek performanslı yedek parçalar ve seçkin sürücü ekipmanlarında Türkiye\'nin rakipsiz premium noktası.',
    slogan: initialSite?.slogan || 'PREMIUM HUB',
    phone: initialSite?.phone || '0212 900 8989',
    phoneFormatted: initialSite?.phoneFormatted || '+902129008989',
    whatsapp: initialSite?.whatsapp || '0532 900 8989',
    whatsappFormatted: initialSite?.whatsappFormatted || '905329008989',
    address: initialSite?.address || 'Barbaros Bulvarı No: 89, Beşiktaş, İstanbul',
    footerText: initialSite?.footerText || 'Türkiye genelinde premium motosiklet, yedek parça ve aksesuar tedariğinde rakipsiz lider. En lüks markalar ve en üstün hizmet kalitesi ile yoldaki gücünüz.',
    aboutText: initialSite?.aboutText || '',
    contactText: initialSite?.contactText || '',
    workingHours: initialSite?.workingHours || '[]',
    socialLinks: initialSite?.socialLinks || '{}',
    // New CMS dynamic fields
    email: initialSite?.email || 'info@hawkmotor.com',
    mapUrl: initialSite?.mapUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.9713180424564!2d29.006935276550792!3d41.04752831732959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a224ba4609%3A0x633bd2f3922d0cfb!2sBarbaros%20Blv.%2C%20Be%C5%9Fikta%C5%9F%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1717234850000!5m2!1str!2str',
    kullaniciText: initialSite?.kullaniciText || '',
    gizlilikText: initialSite?.gizlilikText || '',
    kvkkText: initialSite?.kvkkText || '',
    mesafeliText: initialSite?.mesafeliText || '',
    hukukText: initialSite?.hukukText || '',
    aboutTitle: initialSite?.aboutTitle || 'BİZ KİMİZ?',
    aboutDesc: initialSite?.aboutDesc || 'HAWK MOTOR, yüksek performanslı premium motosikletler ve yedek parçalar için kurulan seçkin bir merkezdir.',
    aboutValues: initialSite?.aboutValues || '[]',
    aboutMilestones: initialSite?.aboutMilestones || '[]',
    logoUrl: initialSite?.logoUrl || '',
    bannerUrl: initialSite?.bannerUrl || '',
    sparePartsActive: initialSite?.sparePartsActive !== false,
    showProductPrices: (initialSite as any)?.showProductPrices !== false,
  });

  // Form State - Payment Settings
  const [paymentForm, setPaymentForm] = useState({
    bankName: initialPayment?.bankName || 'Türkiye İş Bankası',
    branch: initialPayment?.branch || 'Beşiktaş Ticari Şubesi (1234)',
    accountHolder: initialPayment?.accountHolder || 'HAWK MOTOR SANAYİ VE TİCARET A.Ş.',
    iban: initialPayment?.iban || 'TR98 0006 2000 0001 2345 6789 01',
    description: initialPayment?.description || '',
    cardPaymentsActive: initialPayment?.cardPaymentsActive || false,
    bankPaymentsActive: initialPayment?.bankPaymentsActive !== false,
  });

  // State - Brand Models Modal
  const [selectedBrandForModels, setSelectedBrandForModels] = useState<any | null>(null);
  const [showModelsModal, setShowModelsModal] = useState(false);
  const [newModelName, setNewModelName] = useState('');

  // Form State - Legal Documents
  const [legalDocs, setLegalDocs] = useState<any[]>(initialLegalDocs || []);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [legalDocForm, setLegalDocForm] = useState({
    title: '',
    slug: '',
    content: '',
    order: 0,
    isActive: true
  });

  // Form State - Categories
  const [categories, setCategories] = useState<any[]>(initialCategories || []);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    order: 0,
    isActive: true
  });

  // Form State - Brands
  const [brands, setBrands] = useState<any[]>(initialBrands || []);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [editingBrandId, setEditingBrandId] = useState<string | null>(null);
  const [brandForm, setBrandForm] = useState({
    name: ''
  });

  // Form State - Working Hours List (Dynamic Visual List)
  const [workingHoursList, setWorkingHoursList] = useState<{ days: string; hours: string }[]>(() => {
    try {
      const parsed = JSON.parse(initialSite?.workingHours || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  // Form State - Social Links Object (Dynamic Visual Fields)
  const [socialLinks, setSocialLinks] = useState<{ instagram?: string; tiktok?: string; facebook?: string; twitter?: string; youtube?: string; linkedin?: string }>(() => {
    try {
      const parsed = JSON.parse(initialSite?.socialLinks || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (e) {
      return {};
    }
  });

  const handleOpenAddLegal = () => {
    setLegalDocForm({
      title: '',
      slug: '',
      content: '',
      order: legalDocs.length + 1,
      isActive: true
    });
    setEditingDocId(null);
    setShowLegalModal(true);
  };

  const handleOpenEditLegal = (doc: any) => {
    setLegalDocForm({
      title: doc.title,
      slug: doc.slug,
      content: doc.content,
      order: doc.order,
      isActive: doc.isActive
    });
    setEditingDocId(doc.id);
    setShowLegalModal(true);
  };

  const handleSaveLegalDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      if (editingDocId) {
        // Edit mode
        const res = await updateLegalDocument(editingDocId, legalDocForm);
        if (res.success && res.document) {
          setLegalDocs(prev => prev.map(item => item.id === editingDocId ? res.document : item));
          setShowLegalModal(false);
          alert('Yasal sözleşme başarıyla güncellendi.');
        } else {
          alert(res.error || 'Sözleşme güncellenemedi.');
        }
      } else {
        // Create mode
        const res = await createLegalDocument(legalDocForm);
        if (res.success && res.document) {
          setLegalDocs(prev => [...prev, res.document]);
          setShowLegalModal(false);
          alert('Yeni yasal sözleşme başarıyla eklendi.');
        } else {
          alert(res.error || 'Sözleşme eklenemedi.');
        }
      }
    });
  };

  const handleDeleteLegalDoc = async (id: string, title: string) => {
    if (confirm(`"${title}" yasal sözleşmesini tamamen silmek istediğinize emin misiniz?`)) {
      startTransition(async () => {
        const res = await deleteLegalDocument(id);
        if (res.success) {
          setLegalDocs(prev => prev.filter(item => item.id !== id));
          alert('Sözleşme başarıyla silindi.');
        } else {
          alert(res.error || 'Sözleşme silinemedi.');
        }
      });
    }
  };

  // ==========================================
  // CATEGORIES & BRANDS HANDLERS
  // ==========================================
  
  const handleOpenAddCategory = () => {
    setCategoryForm({
      name: '',
      slug: '',
      order: categories.length + 1,
      isActive: true
    });
    setEditingCatId(null);
    setShowCategoryModal(true);
  };

  const handleOpenEditCategory = (cat: any) => {
    setCategoryForm({
      name: cat.name,
      slug: cat.slug,
      order: cat.order,
      isActive: cat.isActive
    });
    setEditingCatId(cat.id);
    setShowCategoryModal(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      if (editingCatId) {
        const res = await updateCategory(editingCatId, categoryForm);
        if (res.success && res.category) {
          setCategories(prev => prev.map(item => item.id === editingCatId ? res.category : item));
          setShowCategoryModal(false);
          alert('Kategori başarıyla güncellendi.');
        } else {
          alert(res.error || 'Kategori güncellenemedi.');
        }
      } else {
        const res = await createCategory(categoryForm);
        if (res.success && res.category) {
          setCategories(prev => [...prev, res.category].sort((a, b) => a.order - b.order));
          setShowCategoryModal(false);
          alert('Yeni Kategori başarıyla eklendi.');
        } else {
          alert(res.error || 'Kategori eklenemedi.');
        }
      }
    });
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (confirm(`"${name}" kategorisini silmek istediğinize emin misiniz?`)) {
      startTransition(async () => {
        const res = await deleteCategory(id);
        if (res.success) {
          setCategories(prev => prev.filter(item => item.id !== id));
          alert('Kategori başarıyla silindi.');
        } else {
          alert(res.error || 'Kategori silinemedi.');
        }
      });
    }
  };

  const handleOpenAddBrand = () => {
    setBrandForm({
      name: ''
    });
    setEditingBrandId(null);
    setShowBrandModal(true);
  };

  const handleOpenEditBrand = (b: any) => {
    setBrandForm({
      name: b.name
    });
    setEditingBrandId(b.id);
    setShowBrandModal(true);
  };

  const handleSaveBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      if (editingBrandId) {
        const res = await updateBrand(editingBrandId, brandForm);
        if (res.success && res.brand) {
          setBrands(prev => prev.map(item => item.id === editingBrandId ? res.brand : item).sort((a, b) => a.name.localeCompare(b.name)));
          setShowBrandModal(false);
          alert('Marka başarıyla güncellendi.');
        } else {
          alert(res.error || 'Marka güncellenemedi.');
        }
      } else {
        const res = await createBrand(brandForm);
        if (res.success && res.brand) {
          setBrands(prev => [...prev, res.brand].sort((a, b) => a.name.localeCompare(b.name)));
          setShowBrandModal(false);
          alert('Yeni Marka başarıyla eklendi.');
        } else {
          alert(res.error || 'Marka eklenemedi.');
        }
      }
    });
  };

  const handleDeleteBrand = async (id: string, name: string) => {
    if (confirm(`"${name}" markasını silmek istediğinize emin misiniz?`)) {
      startTransition(async () => {
        const res = await deleteBrand(id);
        if (res.success) {
          setBrands(prev => prev.filter(item => item.id !== id));
          alert('Marka başarıyla silindi.');
        } else {
          alert(res.error || 'Marka silinemedi.');
        }
      });
    }
  };

  // ==========================================
  // BRAND MODELS HANDLERS
  // ==========================================

  const handleOpenManageModels = (brand: any) => {
    setSelectedBrandForModels(brand);
    setNewModelName('');
    setShowModelsModal(true);
  };

  const handleAddFieldModel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModelName.trim() || !selectedBrandForModels) return;

    startTransition(async () => {
      const res = await createBrandModel({
        name: newModelName.trim(),
        brandId: selectedBrandForModels.id
      });

      if (res.success && res.model) {
        const updatedBrands = brands.map(b => {
          if (b.id === selectedBrandForModels.id) {
            return {
              ...b,
              models: [...(b.models || []), res.model]
            };
          }
          return b;
        });
        setBrands(updatedBrands);
        setSelectedBrandForModels((prev: any) => ({
          ...prev,
          models: [...(prev?.models || []), res.model]
        }));
        setNewModelName('');
        alert('Model başarıyla eklendi.');
      } else {
        alert(res.error || 'Model eklenirken bir hata oluştu.');
      }
    });
  };

  const handleDeleteFieldModel = async (modelId: string, modelName: string) => {
    if (!selectedBrandForModels) return;
    if (confirm(`"${modelName}" modelini silmek istediğinize emin misiniz?`)) {
      startTransition(async () => {
        const res = await deleteBrandModel(modelId);

        if (res.success) {
          const updatedBrands = brands.map(b => {
            if (b.id === selectedBrandForModels.id) {
              return {
                ...b,
                models: (b.models || []).filter((m: any) => m.id !== modelId)
              };
            }
            return b;
          });
          setBrands(updatedBrands);
          setSelectedBrandForModels((prev: any) => ({
            ...prev,
            models: (prev?.models || []).filter((m: any) => m.id !== modelId)
          }));
          alert('Model başarıyla silindi.');
        } else {
          alert(res.error || 'Model silinirken bir hata oluştu.');
        }
      });
    }
  };

  // ==========================================
  // ACTION SAVE HANDLERS
  // ==========================================

  const handleSaveSite = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const submitData = {
        ...siteForm,
        workingHours: JSON.stringify(workingHoursList),
        socialLinks: JSON.stringify(socialLinks)
      };
      const res = await saveSiteSettings(submitData);
      if (res.success) {
        alert('Site genel ayarları başarıyla kaydedildi.');
      } else {
        alert(res.error || 'Ayarlar kaydedilemedi.');
      }
    });
  };

  const handleSavePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await savePaymentSettings(paymentForm);
      if (res.success) {
        alert('Banka ve ödeme ayarları başarıyla kaydedildi.');
      } else {
        alert(res.error || 'Banka ayarları kaydedilemedi.');
      }
    });
  };
  return (
    <div className="flex flex-col gap-8 text-left relative">
      
      {/* 1. HEADER */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white">SİSTEM AYARLARI</h1>
        <p className="text-brand-muted text-sm mt-2 font-light">
          İletişim bilgilerini, banka hesaplarını ve kasko uyarılarını buradan kontrol edin.
        </p>
      </div>

      {/* 2. TABS SELECTOR */}
      <div className="flex border-b border-white/5 gap-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('site')}
          className={`pb-4 text-xs font-bold uppercase tracking-wider transition-colors relative cursor-pointer shrink-0 ${
            activeTab === 'site' ? 'text-brand-primary' : 'text-brand-muted hover:text-white'
          }`}
        >
          {activeTab === 'site' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary" />}
          <span className="flex items-center gap-2">
            <Settings className="w-4 h-4" /> İletişim & Genel Ayarlar
          </span>
        </button>

        <button
          onClick={() => setActiveTab('about')}
          className={`pb-4 text-xs font-bold uppercase tracking-wider transition-colors relative cursor-pointer shrink-0 ${
            activeTab === 'about' ? 'text-brand-primary' : 'text-brand-muted hover:text-white'
          }`}
        >
          {activeTab === 'about' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary" />}
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Hakkımızda & Değerlerimiz
          </span>
        </button>

        <button
          onClick={() => setActiveTab('payment')}
          className={`pb-4 text-xs font-bold uppercase tracking-wider transition-colors relative cursor-pointer shrink-0 ${
            activeTab === 'payment' ? 'text-brand-primary' : 'text-brand-muted hover:text-white'
          }`}
        >
          {activeTab === 'payment' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary" />}
          <span className="flex items-center gap-2">
            <Building2 className="w-4 h-4" /> Banka & Ödeme Ayarları
          </span>
        </button>

        <button
          onClick={() => setActiveTab('legal')}
          className={`pb-4 text-xs font-bold uppercase tracking-wider transition-colors relative cursor-pointer shrink-0 ${
            activeTab === 'legal' ? 'text-brand-primary' : 'text-brand-muted hover:text-white'
          }`}
        >
          {activeTab === 'legal' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary" />}
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Yasal Sözleşmeler
          </span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-4 text-xs font-bold uppercase tracking-wider transition-colors relative cursor-pointer shrink-0 ${
            activeTab === 'categories' ? 'text-brand-primary' : 'text-brand-muted hover:text-white'
          }`}
        >
          {activeTab === 'categories' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary" />}
          <span className="flex items-center gap-2">
            <Tags className="w-4 h-4" /> Kategoriler
          </span>
        </button>

        <button
          onClick={() => setActiveTab('brands')}
          className={`pb-4 text-xs font-bold uppercase tracking-wider transition-colors relative cursor-pointer shrink-0 ${
            activeTab === 'brands' ? 'text-brand-primary' : 'text-brand-muted hover:text-white'
          }`}
        >
          {activeTab === 'brands' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary" />}
          <span className="flex items-center gap-2">
            <Award className="w-4 h-4" /> Markalar
          </span>
        </button>
      </div>

      {/* 3. WORKING AREA */}
      <div className="max-w-3xl">
        
        {/* SITE SETTINGS TAB VIEW */}
        {activeTab === 'site' && (
          <form onSubmit={handleSaveSite} className="p-8 rounded-3xl glass-panel border border-white/5 flex flex-col gap-6 text-xs">
            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
              <Settings className="w-5 h-5 text-brand-primary" /> Genel Kurumsal Bilgiler
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Site Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Site Adı</label>
                <input
                  type="text"
                  required
                  value={siteForm.siteName}
                  onChange={(e) => setSiteForm({ ...siteForm, siteName: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              {/* Slogan */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Slogan / Badge</label>
                <input
                  type="text"
                  required
                  value={siteForm.slogan}
                  onChange={(e) => setSiteForm({ ...siteForm, slogan: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Telefon Numarası</label>
                <input
                  type="text"
                  required
                  value={siteForm.phone}
                  onChange={(e) => setSiteForm({ ...siteForm, phone: e.target.value })}
                  placeholder="0212 900 8989"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              {/* Phone formatted */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Telefon (Link Biçimi)</label>
                <input
                  type="text"
                  required
                  value={siteForm.phoneFormatted}
                  onChange={(e) => setSiteForm({ ...siteForm, phoneFormatted: e.target.value })}
                  placeholder="+902129008989"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              {/* WhatsApp */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">WhatsApp Hattı</label>
                <input
                  type="text"
                  required
                  value={siteForm.whatsapp}
                  onChange={(e) => setSiteForm({ ...siteForm, whatsapp: e.target.value })}
                  placeholder="0532 900 8989"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              {/* WhatsApp formatted */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">WhatsApp (Link Biçimi)</label>
                <input
                  type="text"
                  required
                  value={siteForm.whatsappFormatted}
                  onChange={(e) => setSiteForm({ ...siteForm, whatsappFormatted: e.target.value })}
                  placeholder="905329008989"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              {/* Hero Title */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Hero Başlığı</label>
                <input
                  type="text"
                  required
                  value={siteForm.heroTitle}
                  onChange={(e) => setSiteForm({ ...siteForm, heroTitle: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              {/* Hero Description */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Hero Alt Açıklaması</label>
                <textarea
                  rows={2}
                  required
                  value={siteForm.heroDescription}
                  onChange={(e) => setSiteForm({ ...siteForm, heroDescription: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                />
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Fiziksel Showroom Adresi</label>
                <input
                  type="text"
                  required
                  value={siteForm.address}
                  onChange={(e) => setSiteForm({ ...siteForm, address: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">E-Posta Adresi</label>
                <input
                  type="email"
                  required
                  value={siteForm.email}
                  onChange={(e) => setSiteForm({ ...siteForm, email: e.target.value })}
                  placeholder="info@hawkmotor.com"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              {/* Map Embed URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Google Maps Embed URL</label>
                <input
                  type="text"
                  required
                  value={siteForm.mapUrl}
                  onChange={(e) => setSiteForm({ ...siteForm, mapUrl: e.target.value })}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              {/* Footer text */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Footer Telif & Hakkımızda Yazısı</label>
                <textarea
                  rows={2}
                  required
                  value={siteForm.footerText}
                  onChange={(e) => setSiteForm({ ...siteForm, footerText: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                />
              </div>

              {/* Spare Parts Section Toggle */}
              <div className="flex flex-col gap-2 md:col-span-2 border border-white/5 bg-white/5 p-4 rounded-2xl">
                <label className="flex items-center gap-2 font-bold cursor-pointer text-brand-muted hover:text-white">
                  <input
                    type="checkbox"
                    checked={siteForm.sparePartsActive}
                    onChange={(e) => setSiteForm({ ...siteForm, sparePartsActive: e.target.checked })}
                    className="w-4 h-4 rounded border-white/10 bg-white/5 text-brand-primary accent-brand-primary cursor-pointer"
                  />
                  <span>Yedek Parça Sayfasını & Menü Linkini Aktif Et</span>
                </label>
                <p className="text-[10px] text-brand-muted leading-relaxed font-light font-sans pl-6">
                  Bu seçenek işaretlendiğinde ana sitedeki "Yedek Parça" menü linki ve yedek parça katalog sayfası aktif olur. İşaret kaldırıldığında yedek parça sayfası ana sitede gizlenir.
                </p>
              </div>

              {/* Product Prices Section Toggle */}
              <div className="flex flex-col gap-2 md:col-span-2 border border-white/5 bg-white/5 p-4 rounded-2xl">
                <label className="flex items-center gap-2 font-bold cursor-pointer text-brand-muted hover:text-white">
                  <input
                    type="checkbox"
                    checked={siteForm.showProductPrices}
                    onChange={(e) => setSiteForm({ ...siteForm, showProductPrices: e.target.checked })}
                    className="w-4 h-4 rounded border-white/10 bg-white/5 text-brand-primary accent-brand-primary cursor-pointer"
                  />
                  <span>Ürün Fiyatlarını Sitede Göster / Aktif Et</span>
                </label>
                <p className="text-[10px] text-brand-muted leading-relaxed font-light font-sans pl-6">
                  Bu seçenek işaretlendiğinde tüm motosiklet ve yedek parça fiyatları sitede gösterilir. İşaret kaldırıldığında fiyatlar gizlenir ve yerine "Fiyat için İletişime Geçin" veya "WhatsApp'tan Fiyat Alın" yazısı çıkar.
                </p>
              </div>

              {/* Visual Brand Assets (Logo & Banner) */}
              <div className="md:col-span-2 border-t border-white/5 pt-4 mt-2">
                <h4 className="text-white font-extrabold uppercase text-[10px] tracking-wider text-brand-primary mb-4 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Kurumsal Görsel Varlıklar
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Logo Upload */}
                  <div className="flex flex-col gap-2 border border-white/5 bg-[#0d0d0d] p-4 rounded-2xl">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Şirket Logosu</label>
                    <div className="flex items-center gap-4">
                      {siteForm.logoUrl ? (
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-[#111] shrink-0">
                          <img src={siteForm.logoUrl} alt="Logo" className="w-full h-full object-contain p-1" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl border border-dashed border-white/10 flex items-center justify-center text-brand-muted text-[10px] shrink-0">
                          Yok
                        </div>
                      )}
                      <div className="flex-1 flex flex-col gap-1">
                        <label className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-brand-primary/40 hover:text-brand-primary text-center cursor-pointer transition-all font-bold uppercase tracking-wider text-[9px]">
                          {isUploading ? 'Yükleniyor...' : 'Logo Yükle'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const formData = new FormData();
                              formData.append('file', file);
                              setIsUploading(true);
                              try {
                                const res = await uploadImageAction(formData);
                                if (res.success && res.url) {
                                  setSiteForm(prev => ({ ...prev, logoUrl: res.url }));
                                } else {
                                  alert(res.error || 'Hata oluştu.');
                                }
                              } catch(err) {
                                alert('Görsel yüklenirken bir hata oluştu.');
                              } finally {
                                setIsUploading(false);
                              }
                            }}
                            className="hidden"
                            disabled={isUploading}
                          />
                        </label>
                        <input
                          type="text"
                          value={siteForm.logoUrl}
                          onChange={(e) => setSiteForm({ ...siteForm, logoUrl: e.target.value })}
                          placeholder="Veya harici URL yapıştırın"
                          className="bg-[#0c0c0c] border border-white/10 rounded-xl px-2.5 py-1.5 text-white text-[9px] font-mono focus:outline-none focus:border-brand-primary/40"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Banner Upload */}
                  <div className="flex flex-col gap-2 border border-white/5 bg-[#0d0d0d] p-4 rounded-2xl">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Arka Plan Banner Görseli</label>
                    <div className="flex items-center gap-4">
                      {siteForm.bannerUrl ? (
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-[#111] shrink-0">
                          <img src={siteForm.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl border border-dashed border-white/10 flex items-center justify-center text-brand-muted text-[10px] shrink-0">
                          Yok
                        </div>
                      )}
                      <div className="flex-1 flex flex-col gap-1">
                        <label className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-brand-primary/40 hover:text-brand-primary text-center cursor-pointer transition-all font-bold uppercase tracking-wider text-[9px]">
                          {isUploading ? 'Yükleniyor...' : 'Banner Yükle'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const formData = new FormData();
                              formData.append('file', file);
                              setIsUploading(true);
                              try {
                                const res = await uploadImageAction(formData);
                                if (res.success && res.url) {
                                  setSiteForm(prev => ({ ...prev, bannerUrl: res.url }));
                                } else {
                                  alert(res.error || 'Hata oluştu.');
                                }
                              } catch(err) {
                                alert('Görsel yüklenirken bir hata oluştu.');
                              } finally {
                                setIsUploading(false);
                              }
                            }}
                            className="hidden"
                            disabled={isUploading}
                          />
                        </label>
                        <input
                          type="text"
                          value={siteForm.bannerUrl}
                          onChange={(e) => setSiteForm({ ...siteForm, bannerUrl: e.target.value })}
                          placeholder="Veya harici URL yapıştırın"
                          className="bg-[#0c0c0c] border border-white/10 rounded-xl px-2.5 py-1.5 text-white text-[9px] font-mono focus:outline-none focus:border-brand-primary/40"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Working Hours Editor */}
              <div className="md:col-span-2 border-t border-white/5 pt-4 mt-2">
                <h4 className="text-white font-extrabold uppercase text-[10px] tracking-wider text-brand-primary mb-4 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Showroom Çalışma Saatleri
                </h4>

                <div className="flex flex-col gap-3">
                  {workingHoursList.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-white/5 border border-white/5 p-3.5 rounded-2xl">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[8px] font-bold uppercase tracking-wider text-brand-muted">Günler</label>
                          <input
                            type="text"
                            required
                            value={item.days}
                            onChange={(e) => {
                              const newHours = [...workingHoursList];
                              newHours[idx].days = e.target.value;
                              setWorkingHoursList(newHours);
                            }}
                            placeholder="Örn: Pazartesi - Cuma"
                            className="bg-[#0c0c0c] border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-brand-primary/40"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[8px] font-bold uppercase tracking-wider text-brand-muted">Saat Aralığı</label>
                          <input
                            type="text"
                            required
                            value={item.hours}
                            onChange={(e) => {
                              const newHours = [...workingHoursList];
                              newHours[idx].hours = e.target.value;
                              setWorkingHoursList(newHours);
                            }}
                            placeholder="Örn: 09:00 - 19:00"
                            className="bg-[#0c0c0c] border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-brand-primary/40"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setWorkingHoursList(prev => prev.filter((_, i) => i !== idx));
                        }}
                        className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500 border border-transparent hover:border-red-500/20 text-red-400 hover:text-white transition-all cursor-pointer shrink-0 mt-3"
                        title="Sil"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {workingHoursList.length === 0 && (
                    <div className="text-center py-6 text-brand-muted uppercase tracking-widest font-light text-[9px] border border-dashed border-white/10 rounded-2xl">
                      Kayıtlı çalışma saati aralığı bulunamadı. Lütfen yeni ekleyin.
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setWorkingHoursList(prev => [...prev, { days: 'Pazartesi - Cuma', hours: '09:00 - 19:00' }]);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-dashed border-white/10 hover:border-brand-primary/50 text-brand-muted hover:text-brand-primary transition-all text-center uppercase tracking-wider text-[9px] font-bold flex items-center justify-center gap-1.5 mt-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Yeni Çalışma Saati Satırı Ekle
                  </button>
                </div>
              </div>

              {/* Visual Social Links Editor */}
              <div className="md:col-span-2 border-t border-white/5 pt-4 mt-2">
                <h4 className="text-white font-extrabold uppercase text-[10px] tracking-wider text-brand-primary mb-4 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Sosyal Medya Bağlantıları
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Instagram URL */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Instagram Bağlantısı</label>
                    <input
                      type="text"
                      value={socialLinks.instagram || ''}
                      onChange={(e) => setSocialLinks(prev => ({ ...prev, instagram: e.target.value }))}
                      placeholder="https://instagram.com/kullaniciadi"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary/40"
                    />
                  </div>

                  {/* TikTok URL */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">TikTok Bağlantısı</label>
                    <input
                      type="text"
                      value={socialLinks.tiktok || ''}
                      onChange={(e) => setSocialLinks(prev => ({ ...prev, tiktok: e.target.value }))}
                      placeholder="https://tiktok.com/@kullaniciadi"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary/40"
                    />
                  </div>

                  {/* Facebook URL */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Facebook Bağlantısı</label>
                    <input
                      type="text"
                      value={socialLinks.facebook || ''}
                      onChange={(e) => setSocialLinks(prev => ({ ...prev, facebook: e.target.value }))}
                      placeholder="https://facebook.com/sayfaadi"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary/40"
                    />
                  </div>

                  {/* Twitter URL */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">X (Twitter) Bağlantısı</label>
                    <input
                      type="text"
                      value={socialLinks.twitter || ''}
                      onChange={(e) => setSocialLinks(prev => ({ ...prev, twitter: e.target.value }))}
                      placeholder="https://x.com/kullaniciadi"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary/40"
                    />
                  </div>

                  {/* YouTube URL */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">YouTube Bağlantısı</label>
                    <input
                      type="text"
                      value={socialLinks.youtube || ''}
                      onChange={(e) => setSocialLinks(prev => ({ ...prev, youtube: e.target.value }))}
                      placeholder="https://youtube.com/@kanaladi"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary/40"
                    />
                  </div>

                  {/* LinkedIn URL */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">LinkedIn Bağlantısı</label>
                    <input
                      type="text"
                      value={socialLinks.linkedin || ''}
                      onChange={(e) => setSocialLinks(prev => ({ ...prev, linkedin: e.target.value }))}
                      placeholder="https://linkedin.com/company/firmaadi"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary/40"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Form Actions */}
            <div className="border-t border-white/10 pt-4 flex items-center justify-end mt-4">
              <button
                type="submit"
                disabled={isPending}
                className="px-6 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-[10px] orange-glow flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isPending ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Değişiklikleri Kaydet
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* BANK & PAYMENT SETTINGS TAB VIEW */}
        {activeTab === 'payment' && (
          <form onSubmit={handleSavePayment} className="p-8 rounded-3xl glass-panel border border-white/5 flex flex-col gap-6 text-xs">
            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-brand-primary" /> Banka Hesap & IBAN Yapılandırması
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Bank Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Banka Adı</label>
                <input
                  type="text"
                  required
                  value={paymentForm.bankName}
                  onChange={(e) => setPaymentForm({ ...paymentForm, bankName: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              {/* Branch */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Şube / Kod</label>
                <input
                  type="text"
                  required
                  value={paymentForm.branch}
                  onChange={(e) => setPaymentForm({ ...paymentForm, branch: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              {/* Account Holder */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Alıcı Ünvanı / Hesap Sahibi</label>
                <input
                  type="text"
                  required
                  value={paymentForm.accountHolder}
                  onChange={(e) => setPaymentForm({ ...paymentForm, accountHolder: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white font-bold uppercase"
                />
              </div>

              {/* IBAN */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">IBAN Numarası</label>
                <input
                  type="text"
                  required
                  value={paymentForm.iban}
                  onChange={(e) => setPaymentForm({ ...paymentForm, iban: e.target.value })}
                  className="bg-white/5 border border-brand-primary/30 rounded-xl px-4 py-2.5 text-white font-mono font-bold tracking-wider text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>

              {/* Payment explanation */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Ödeme Açıklama Notu</label>
                <textarea
                  rows={3}
                  required
                  value={paymentForm.description}
                  onChange={(e) => setPaymentForm({ ...paymentForm, description: e.target.value })}
                  placeholder="Havale yaparken dikkat edilmesi gereken hususlar..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                />
              </div>

              {/* Bank Payments Section Toggle */}
              <div className="md:col-span-2 border-t border-white/5 pt-4 mt-2">
                <label className="flex items-center gap-3 font-bold cursor-pointer text-brand-muted hover:text-white">
                  <input
                    type="checkbox"
                    checked={paymentForm.bankPaymentsActive}
                    onChange={(e) => setPaymentForm({ ...paymentForm, bankPaymentsActive: e.target.checked })}
                    className="w-4 h-4 rounded border-white/10 bg-white/5 text-brand-primary accent-brand-primary cursor-pointer"
                  />
                  <div>
                    <p className="text-white text-xs uppercase tracking-wide">Banka Hesap & FAST Bilgilerini Sitede Göster / Aktif Et</p>
                    <p className="text-[10px] text-brand-muted font-light mt-0.5 leading-normal">
                      Bu seçenek işaretlendiğinde ana sitedeki "Banka Hesap Bilgileri (FAST)" sayfası ve alt bilgi (footer) linki aktif olur. İşaret kaldırıldığında linkler gizlenir ve ödeme sayfasına doğrudan erişim engellenerek ana sayfaya yönlendirilir.
                    </p>
                  </div>
                </label>
              </div>

              {/* Block card payments toggle */}
              <div className="md:col-span-2 border-t border-white/5 pt-4 mt-2">
                <label className="flex items-center gap-3 font-bold cursor-pointer text-brand-muted hover:text-white">
                  <input
                    type="checkbox"
                    checked={paymentForm.cardPaymentsActive}
                    onChange={(e) => setPaymentForm({ ...paymentForm, cardPaymentsActive: e.target.checked })}
                    className="w-4 h-4 rounded border-white/10 bg-white/5 text-brand-primary accent-brand-primary"
                  />
                  <div>
                    <p className="text-white text-xs uppercase tracking-wide">Kredi Kartı Altyapısını Aktif Et</p>
                    <p className="text-[10px] text-brand-muted font-light mt-0.5 leading-normal">
                      İşaretlenirse kart butonları aktif olur (pasifken uyarı modalı tetiklenir).
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="border-t border-white/10 pt-4 flex items-center justify-end mt-4">
              <button
                type="submit"
                disabled={isPending}
                className="px-6 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-[10px] orange-glow flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isPending ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Ödeme Ayarlarını Kaydet
                  </>
                )}
              </button>
            </div>
          </form>
        )}



        {/* ABOUT US & VALUES TAB VIEW */}
        {activeTab === 'about' && (
          <form onSubmit={handleSaveSite} className="p-8 rounded-3xl glass-panel border border-white/5 flex flex-col gap-6 text-xs">
            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-primary" /> Hakkımızda, Vizyon & Kilometre Taşları
            </h3>

            <div className="grid grid-cols-1 gap-5">
              {/* About Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Hakkımızda Başlığı</label>
                <input
                  type="text"
                  required
                  value={siteForm.aboutTitle}
                  onChange={(e) => setSiteForm({ ...siteForm, aboutTitle: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              {/* About Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Hakkımızda Kısa Giriş (Hero Altı)</label>
                <textarea
                  rows={3}
                  required
                  value={siteForm.aboutDesc}
                  onChange={(e) => setSiteForm({ ...siteForm, aboutDesc: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                />
              </div>

              {/* About Main Text */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Hakkımızda Detaylı Hikaye</label>
                <textarea
                  rows={5}
                  required
                  value={siteForm.aboutText}
                  onChange={(e) => setSiteForm({ ...siteForm, aboutText: e.target.value })}
                  placeholder="Hakkımızda sayfasının ana gövde metni..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                />
              </div>

              {/* Values JSON */}
              <div className="flex flex-col gap-1.5 border-t border-white/5 pt-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted flex items-center justify-between">
                  <span>Kurumsal Değerlerimiz (JSON Array)</span>
                  <span className="text-[8px] text-brand-muted uppercase font-normal">Format: {"[ { \"title\": \"X\", \"desc\": \"Y\" } ]"}</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={siteForm.aboutValues}
                  onChange={(e) => setSiteForm({ ...siteForm, aboutValues: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none font-mono text-[10px]"
                />
              </div>

              {/* Milestones JSON */}
              <div className="flex flex-col gap-1.5 border-t border-white/5 pt-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted flex items-center justify-between">
                  <span>Tarihçemiz & Kilometre Taşları (JSON Array)</span>
                  <span className="text-[8px] text-brand-muted uppercase font-normal">Format: {"[ { \"year\": \"2026\", \"title\": \"X\", \"desc\": \"Y\" } ]"}</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={siteForm.aboutMilestones}
                  onChange={(e) => setSiteForm({ ...siteForm, aboutMilestones: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none font-mono text-[10px]"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="border-t border-white/10 pt-4 flex items-center justify-end mt-4">
              <button
                type="submit"
                disabled={isPending}
                className="px-6 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-[10px] orange-glow flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isPending ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Hakkımızda Bilgilerini Kaydet
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* LEGAL AGREEMENTS & CONTRACTS TAB VIEW */}
        {activeTab === 'legal' && (
          <div className="p-8 rounded-3xl glass-panel border border-white/5 flex flex-col gap-6 text-xs text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-primary" /> Hukuki Metinler & Sözleşmeler ({legalDocs.length})
              </h3>
              <button
                type="button"
                onClick={handleOpenAddLegal}
                className="px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-[9px] transition-colors flex items-center gap-1 cursor-pointer orange-glow"
              >
                Yeni Sözleşme Ekle
              </button>
            </div>

            {/* Documents List Table */}
            <div className="flex flex-col gap-4">
              {legalDocs.map((doc) => (
                <div 
                  key={doc.id} 
                  className={`p-5 rounded-2xl bg-brand-card border border-white/5 flex items-center justify-between gap-4 transition-all hover:border-white/10 ${
                    !doc.isActive && 'opacity-50'
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-brand-primary text-[8px] font-extrabold uppercase tracking-widest">Sıra: {doc.order}</span>
                    <h4 className="text-white font-black text-sm uppercase tracking-wider">{doc.title}</h4>
                    <p className="text-brand-muted text-[10px] font-mono mt-0.5">Slug: yasal?tab={doc.slug}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-widest ${
                      doc.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {doc.isActive ? 'YAYINDA' : 'PASİF'}
                    </span>

                    <button
                      onClick={() => handleOpenEditLegal(doc)}
                      className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-brand-primary/40 text-brand-muted hover:text-brand-primary transition-all cursor-pointer font-bold uppercase tracking-wider text-[9px]"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDeleteLegalDoc(doc.id, doc.title)}
                      className="px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer font-bold uppercase tracking-wider text-[9px]"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}

              {legalDocs.length === 0 && (
                <div className="text-center py-12 text-brand-muted uppercase tracking-widest font-light">
                  Kayıtlı yasal sözleşme bulunamadı. "Yeni Sözleşme Ekle" butonuna basarak ilk sözleşmenizi oluşturabilirsiniz.
                </div>
              )}
            </div>
          </div>
        )}

        {/* CATEGORIES TAB VIEW */}
        {activeTab === 'categories' && (
          <div className="p-8 rounded-3xl glass-panel border border-white/5 flex flex-col gap-6 text-xs text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
                <Tags className="w-5 h-5 text-brand-primary" /> Ürün Kategorileri ({categories.length})
              </h3>
              <button
                type="button"
                onClick={handleOpenAddCategory}
                className="px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-[9px] transition-colors flex items-center gap-1 cursor-pointer orange-glow"
              >
                Yeni Kategori Ekle
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {categories.map((cat) => (
                <div 
                  key={cat.id} 
                  className={`p-5 rounded-2xl bg-brand-card border border-white/5 flex items-center justify-between gap-4 transition-all hover:border-white/10 ${
                    !cat.isActive && 'opacity-50'
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-brand-primary text-[8px] font-extrabold uppercase tracking-widest">Sıra: {cat.order}</span>
                    <h4 className="text-white font-black text-sm uppercase tracking-wider">{cat.name}</h4>
                    <p className="text-brand-muted text-[10px] font-mono mt-0.5">Slug: {cat.slug}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-widest ${
                      cat.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {cat.isActive ? 'YAYINDA' : 'PASİF'}
                    </span>

                    <button
                      onClick={() => handleOpenEditCategory(cat)}
                      className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-brand-primary/40 text-brand-muted hover:text-brand-primary transition-all cursor-pointer font-bold uppercase tracking-wider text-[9px]"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat.id, cat.name)}
                      className="px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer font-bold uppercase tracking-wider text-[9px]"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}

              {categories.length === 0 && (
                <div className="text-center py-12 text-brand-muted uppercase tracking-widest font-light">
                  Kayıtlı kategori bulunamadı.
                </div>
              )}
            </div>
          </div>
        )}

        {/* BRANDS TAB VIEW */}
        {activeTab === 'brands' && (
          <div className="p-8 rounded-3xl glass-panel border border-white/5 flex flex-col gap-6 text-xs text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-primary" /> Motosiklet & Parça Markaları ({brands.length})
              </h3>
              <button
                type="button"
                onClick={handleOpenAddBrand}
                className="px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-[9px] transition-colors flex items-center gap-1 cursor-pointer orange-glow"
              >
                Yeni Marka Ekle
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {brands.map((b) => (
                <div 
                  key={b.id} 
                  className="p-5 rounded-2xl bg-brand-card border border-white/5 flex items-center justify-between gap-4 transition-all hover:border-white/10"
                >
                  <div className="flex flex-col gap-1">
                    <h4 className="text-white font-black text-sm uppercase tracking-wider">{b.name}</h4>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleOpenManageModels(b)}
                      className="px-3 py-2 rounded-xl bg-brand-primary/15 border border-brand-primary/20 text-brand-primary hover:bg-brand-primary hover:text-white transition-all cursor-pointer font-bold uppercase tracking-wider text-[9px]"
                    >
                      Modelleri Yönet
                    </button>
                    <button
                      onClick={() => handleOpenEditBrand(b)}
                      className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-brand-primary/40 text-brand-muted hover:text-brand-primary transition-all cursor-pointer font-bold uppercase tracking-wider text-[9px]"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDeleteBrand(b.id, b.name)}
                      className="px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer font-bold uppercase tracking-wider text-[9px]"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}

              {brands.length === 0 && (
                <div className="col-span-2 text-center py-12 text-brand-muted uppercase tracking-widest font-light">
                  Kayıtlı marka bulunamadı.
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* ==========================================
          5. LEGAL MODAL (PREMIUM GLASS OVERLAY)
          ========================================== */}
      {showLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/85 backdrop-blur-xs text-xs">
          <div className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto flex flex-col gap-6 text-left shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-primary" />
                {editingDocId ? 'Sözleşmeyi Düzenle' : 'Yeni Yasal Sözleşme Ekle'}
              </h3>
              <button 
                onClick={() => setShowLegalModal(false)} 
                className="p-1 rounded bg-white/5 text-brand-muted hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveLegalDoc} className="flex flex-col gap-5">
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Sözleşme / Politika Başlığı</label>
                <input
                  type="text"
                  required
                  value={legalDocForm.title}
                  onChange={(e) => setLegalDocForm({ ...legalDocForm, title: e.target.value })}
                  placeholder="Örn: Kullanıcı Sözleşmesi"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              {/* Slug */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted flex items-center justify-between">
                  <span>URL Kısa Adı (Slug)</span>
                  <span className="text-[8px] text-brand-muted">Benzersiz olmalı, boşluk içermemeli.</span>
                </label>
                <input
                  type="text"
                  value={legalDocForm.slug}
                  onChange={(e) => setLegalDocForm({ ...legalDocForm, slug: e.target.value })}
                  placeholder="Otomatik oluşturulur (Örn: kullanici-sozlesmesi)"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono"
                />
              </div>

              {/* Order */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Listeleme Sırası</label>
                <input
                  type="number"
                  required
                  value={legalDocForm.order}
                  onChange={(e) => setLegalDocForm({ ...legalDocForm, order: Number(e.target.value) })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted flex items-center justify-between">
                  <span>Sözleşme Metni</span>
                  <span className="text-[8px] text-brand-muted">Bize Ulaşın telefonları için {"{settings.phone}"}, e-posta için {"{settings.email}"} değişkenlerini kullanabilirsiniz.</span>
                </label>
                <textarea
                  rows={10}
                  required
                  value={legalDocForm.content}
                  onChange={(e) => setLegalDocForm({ ...legalDocForm, content: e.target.value })}
                  placeholder="Sözleşme ana metnini buraya yazın..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                />
              </div>

              {/* Active Toggle */}
              <div>
                <label className="flex items-center gap-3 font-bold cursor-pointer text-brand-muted hover:text-white">
                  <input
                    type="checkbox"
                    checked={legalDocForm.isActive}
                    onChange={(e) => setLegalDocForm({ ...legalDocForm, isActive: e.target.checked })}
                    className="w-4 h-4 rounded border-white/10 bg-white/5 text-brand-primary accent-brand-primary"
                  />
                  <div>
                    <p className="text-white text-xs uppercase tracking-wide">Yayına Al / Aktif Et</p>
                    <p className="text-[10px] text-brand-muted font-light mt-0.5 leading-normal">
                      Pasif yapılırsa sitedeki yasal sözleşmeler sekmesinde listelenmez.
                    </p>
                  </div>
                </label>
              </div>

              {/* Footer Actions */}
              <div className="border-t border-white/10 pt-4 flex items-center justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowLegalModal(false)}
                  className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-brand-muted hover:text-white font-bold uppercase tracking-wider text-[9px]"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-[9px] orange-glow flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isPending ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4" /> Kaydet
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          6. CATEGORY MODAL (PREMIUM GLASS OVERLAY)
          ========================================== */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/85 backdrop-blur-xs text-xs">
          <div className="relative w-full max-w-md bg-[#0d0d0d] border border-white/10 rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto flex flex-col gap-6 text-left shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
                <Tags className="w-5 h-5 text-brand-primary" />
                {editingCatId ? 'Kategoriyi Düzenle' : 'Yeni Kategori Ekle'}
              </h3>
              <button 
                onClick={() => setShowCategoryModal(false)} 
                className="p-1 rounded bg-white/5 text-brand-muted hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Kategori Adı</label>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  placeholder="Örn: Kasklar"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              {/* Slug */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">URL Kısa Adı (Slug)</label>
                <input
                  type="text"
                  required
                  value={categoryForm.slug}
                  onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                  placeholder="Örn: kasklar"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono"
                />
              </div>

              {/* Order */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Sıralama</label>
                <input
                  type="number"
                  required
                  value={categoryForm.order}
                  onChange={(e) => setCategoryForm({ ...categoryForm, order: Number(e.target.value) })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              {/* Active Toggle */}
              <div>
                <label className="flex items-center gap-3 font-bold cursor-pointer text-brand-muted hover:text-white">
                  <input
                    type="checkbox"
                    checked={categoryForm.isActive}
                    onChange={(e) => setCategoryForm({ ...categoryForm, isActive: e.target.checked })}
                    className="w-4 h-4 rounded border-white/10 bg-white/5 text-brand-primary accent-brand-primary"
                  />
                  <div>
                    <p className="text-white text-xs uppercase tracking-wide">Aktif / Yayında</p>
                  </div>
                </label>
              </div>

              {/* Footer Actions */}
              <div className="border-t border-white/10 pt-4 flex items-center justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-brand-muted hover:text-white font-bold uppercase tracking-wider text-[9px]"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-[9px] orange-glow flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isPending ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4" /> Kaydet
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          7. BRAND MODAL (PREMIUM GLASS OVERLAY)
          ========================================== */}
      {showBrandModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/85 backdrop-blur-xs text-xs">
          <div className="relative w-full max-w-md bg-[#0d0d0d] border border-white/10 rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto flex flex-col gap-6 text-left shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-primary" />
                {editingBrandId ? 'Markayı Düzenle' : 'Yeni Marka Ekle'}
              </h3>
              <button 
                onClick={() => setShowBrandModal(false)} 
                className="p-1 rounded bg-white/5 text-brand-muted hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBrand} className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Marka Adı</label>
                <input
                  type="text"
                  required
                  value={brandForm.name}
                  onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                  placeholder="Örn: Yamaha"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              {/* Footer Actions */}
              <div className="border-t border-white/10 pt-4 flex items-center justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowBrandModal(false)}
                  className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-brand-muted hover:text-white font-bold uppercase tracking-wider text-[9px]"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-[9px] orange-glow flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isPending ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4" /> Kaydet
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          8. BRAND MODELS MODAL (PREMIUM GLASS OVERLAY)
          ========================================== */}
      {showModelsModal && selectedBrandForModels && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/85 backdrop-blur-xs text-xs">
          <div className="relative w-full max-w-md bg-[#0d0d0d] border border-white/10 rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto flex flex-col gap-6 text-left shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-primary" />
                {selectedBrandForModels.name} Modellerini Yönet
              </h3>
              <button 
                onClick={() => setShowModelsModal(false)} 
                className="p-1 rounded bg-white/5 text-brand-muted hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Yeni Model Ekleme Formu */}
            <form onSubmit={handleAddFieldModel} className="flex gap-2 items-end">
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Yeni Model Adı</label>
                <input
                  type="text"
                  required
                  value={newModelName}
                  onChange={(e) => setNewModelName(e.target.value)}
                  placeholder="Örn: Superlight 200"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary/40"
                />
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-[9px] orange-glow flex items-center gap-1 cursor-pointer disabled:opacity-50 h-[38px] transition-all"
              >
                Ekle
              </button>
            </form>

            {/* Model Listesi */}
            <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2">Kayıtlı Modeller</label>
              
              <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1">
                {(selectedBrandForModels.models || []).map((m: any) => (
                  <div 
                    key={m.id}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-3"
                  >
                    <span className="text-white font-semibold text-xs">{m.name}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteFieldModel(m.id, m.name)}
                      className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 transition-all cursor-pointer font-bold uppercase tracking-wider text-[8px]"
                    >
                      Sil
                    </button>
                  </div>
                ))}

                {(selectedBrandForModels.models || []).length === 0 && (
                  <div className="text-center py-6 text-brand-muted uppercase tracking-widest font-light text-[9px] border border-dashed border-white/10 rounded-xl">
                    Bu markaya ait model bulunamadı.
                  </div>
                )}
              </div>
            </div>

            {/* Kapat Butonu */}
            <div className="border-t border-white/10 pt-4 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowModelsModal(false)}
                className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-brand-muted hover:text-white font-bold uppercase tracking-wider text-[9px] cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

'use client';

import { useState, useTransition } from 'react';
import { 
  Motorcycle as MotorType, 
  SparePart as PartType,
  Category as CatType,
  Brand as BrandType
} from '@prisma/client';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Check, 
  X, 
  Sparkles, 
  Layers, 
  Motorbike, 
  Wrench,
  ChevronRight,
  TrendingUp,
  Award,
  Eye,
  EyeOff
} from 'lucide-react';
import { 
  createMotorcycle, 
  updateMotorcycle, 
  deleteMotorcycle,
  createSparePart,
  updateSparePart,
  deleteSparePart,
  uploadImageAction
} from '@/app/actions/adminActions';

interface ProductsClientProps {
  initialMotors: any[];
  initialParts: any[];
  categories: CatType[];
  brands: any[];
}

export default function ProductsClient({ 
  initialMotors, 
  initialParts, 
  categories, 
  brands 
}: ProductsClientProps) {
  const [activeTab, setActiveTab] = useState<'motors' | 'parts'>('motors');
  const [isPending, startTransition] = useTransition();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [selectedStock, setSelectedStock] = useState('ALL');

  // Modals state
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add_motor' | 'edit_motor' | 'add_part' | 'edit_part'>('add_motor');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Lists state
  const [motors, setMotors] = useState<any[]>(initialMotors);
  const [parts, setParts] = useState<any[]>(initialParts);

  // Form State - Motorcycle
  const [motorForm, setMotorForm] = useState({
    name: '',
    brand: 'Ducati',
    model: '',
    year: new Date().getFullYear(),
    cc: 1000,
    km: 0,
    condition: 'SIFIR',
    documentStatus: 'Ruhsatı Hazır',
    price: 0,
    oldPrice: '',
    stock: 'Stokta Var',
    status: 'Sıfır',
    shortDesc: '',
    description: '',
    motorType: '',
    power: '',
    torque: '',
    weight: '',
    seatHeight: '',
    fuelCapacity: '',
    image: '',
    gallery: '',
    isFeatured: false,
    isCampaign: false,
    isActive: true,
    order: 0,
  });

  // Form State - Spare Part
  const [partForm, setPartForm] = useState({
    name: '',
    brand: 'Brembo',
    category: 'Fren',
    price: 0,
    oldPrice: '',
    stock: 'Stokta Var',
    shortDesc: '',
    description: '',
    image: '',
    gallery: '',
    compatibleModels: '',
    isFeatured: false,
    isCampaign: false,
    isActive: true,
    order: 0,
  });

  // ==========================================
  // IMAGE UPLOAD HANDLERS
  // ==========================================
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadMainImage = async (e: React.ChangeEvent<HTMLInputElement>, isPart: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    try {
      const res = await uploadImageAction(formData);
      if (res.success && res.url) {
        if (isPart) {
          setPartForm(prev => ({ ...prev, image: res.url! }));
        } else {
          setMotorForm(prev => ({ ...prev, image: res.url! }));
        }
      } else {
        alert(res.error || 'Yükleme başarısız.');
      }
    } catch (err) {
      alert('Görsel yüklenirken bir hata oluştu.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadGalleryImage = async (e: React.ChangeEvent<HTMLInputElement>, isPart: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    try {
      const res = await uploadImageAction(formData);
      if (res.success && res.url) {
        if (isPart) {
          let currentGallery: string[] = [];
          try {
            currentGallery = JSON.parse(partForm.gallery || '[]');
          } catch(e) {}
          if (!Array.isArray(currentGallery)) currentGallery = [];
          currentGallery.push(res.url);
          setPartForm(prev => ({ ...prev, gallery: JSON.stringify(currentGallery) }));
        } else {
          let currentGallery: string[] = [];
          try {
            currentGallery = JSON.parse(motorForm.gallery || '[]');
          } catch(e) {}
          if (!Array.isArray(currentGallery)) currentGallery = [];
          currentGallery.push(res.url);
          setMotorForm(prev => ({ ...prev, gallery: JSON.stringify(currentGallery) }));
        }
      } else {
        alert(res.error || 'Yükleme başarısız.');
      }
    } catch (err) {
      alert('Görsel yüklenirken bir hata oluştu.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveGalleryImage = (index: number, isPart: boolean) => {
    if (isPart) {
      let currentGallery: string[] = [];
      try {
        currentGallery = JSON.parse(partForm.gallery || '[]');
      } catch(e) {}
      if (!Array.isArray(currentGallery)) currentGallery = [];
      currentGallery.splice(index, 1);
      setPartForm(prev => ({ ...prev, gallery: JSON.stringify(currentGallery) }));
    } else {
      let currentGallery: string[] = [];
      try {
        currentGallery = JSON.parse(motorForm.gallery || '[]');
      } catch(e) {}
      if (!Array.isArray(currentGallery)) currentGallery = [];
      currentGallery.splice(index, 1);
      setMotorForm(prev => ({ ...prev, gallery: JSON.stringify(currentGallery) }));
    }
  };

  // ==========================================
  // FILTERS LOGIC
  // ==========================================
  
  const filteredMotors = motors.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === 'ALL' || m.brand === selectedBrand;
    const matchesStock = selectedStock === 'ALL' || m.stock === selectedStock;
    return matchesSearch && matchesBrand && matchesStock;
  });

  const filteredParts = parts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === 'ALL' || p.brand === selectedBrand;
    const matchesStock = selectedStock === 'ALL' || p.stock === selectedStock;
    return matchesSearch && matchesBrand && matchesStock;
  });

  // ==========================================
  // ACTIONS HANDLERS
  // ==========================================

  const handleOpenAddMotor = () => {
    setMotorForm({
      name: '',
      brand: brands[0]?.name || 'Ducati',
      model: '',
      year: new Date().getFullYear(),
      cc: 1000,
      km: 0,
      condition: 'SIFIR',
      documentStatus: 'Ruhsatı Hazır',
      price: 0,
      oldPrice: '',
      stock: 'Stokta Var',
      status: 'Sıfır',
      shortDesc: '',
      description: '',
      motorType: '',
      power: '',
      torque: '',
      weight: '',
      seatHeight: '',
      fuelCapacity: '',
      image: '',
      gallery: '',
      isFeatured: false,
      isCampaign: false,
      isActive: true,
      order: 0,
    });
    setModalType('add_motor');
    setShowModal(true);
  };

  const handleOpenEditMotor = (m: any) => {
    let specs = { motorType: '', power: '', torque: '', weight: '', seatHeight: '', fuelCapacity: '' };
    try {
      specs = JSON.parse(m.specs || '{}');
    } catch(e) {}

    setMotorForm({
      name: m.name,
      brand: m.brand,
      model: m.model,
      year: m.year,
      cc: m.cc,
      km: m.km,
      condition: m.condition,
      documentStatus: m.documentStatus,
      price: m.price,
      oldPrice: m.oldPrice ? String(m.oldPrice) : '',
      stock: m.stock,
      status: m.status || 'Sıfır',
      shortDesc: m.shortDesc,
      description: m.description,
      motorType: specs.motorType || '',
      power: specs.power || '',
      torque: specs.torque || '',
      weight: specs.weight || '',
      seatHeight: specs.seatHeight || '',
      fuelCapacity: specs.fuelCapacity || '',
      image: m.image,
      gallery: typeof m.gallery === 'string' ? m.gallery : JSON.stringify(m.gallery || []),
      isFeatured: m.isFeatured,
      isCampaign: m.isCampaign,
      isActive: m.isActive,
      order: m.order,
    });
    setEditingId(m.id);
    setModalType('edit_motor');
    setShowModal(true);
  };

  const handleOpenAddPart = () => {
    setPartForm({
      name: '',
      brand: brands[0]?.name || 'Brembo',
      category: categories[0]?.name || 'Fren',
      price: 0,
      oldPrice: '',
      stock: 'Stokta Var',
      shortDesc: '',
      description: '',
      image: '',
      gallery: '',
      compatibleModels: '',
      isFeatured: false,
      isCampaign: false,
      isActive: true,
      order: 0,
    });
    setModalType('add_part');
    setShowModal(true);
  };

  const handleOpenEditPart = (p: any) => {
    setPartForm({
      name: p.name,
      brand: p.brand,
      category: p.category,
      price: p.price,
      oldPrice: p.oldPrice ? String(p.oldPrice) : '',
      stock: p.stock,
      shortDesc: p.shortDesc,
      description: p.description,
      image: p.image,
      gallery: typeof p.gallery === 'string' ? p.gallery : JSON.stringify(p.gallery || []),
      compatibleModels: typeof p.compatibleModels === 'string' ? p.compatibleModels : JSON.stringify(p.compatibleModels || []),
      isFeatured: p.isFeatured,
      isCampaign: p.isCampaign,
      isActive: p.isActive,
      order: p.order,
    });
    setEditingId(p.id);
    setModalType('edit_part');
    setShowModal(true);
  };

  const handleSaveMotor = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const specsObj = {
      motorType: motorForm.motorType,
      power: motorForm.power,
      torque: motorForm.torque,
      weight: motorForm.weight,
      seatHeight: motorForm.seatHeight,
      fuelCapacity: motorForm.fuelCapacity,
    };

    const submitData = {
      ...motorForm,
      specs: JSON.stringify(specsObj),
    };

    startTransition(async () => {
      if (modalType === 'add_motor') {
        const res = await createMotorcycle(submitData);
        if (res.success && res.product) {
          setMotors((prev) => [...prev, res.product]);
          setShowModal(false);
          alert('Motosiklet başarıyla eklendi.');
        } else {
          alert(res.error || 'Motosiklet eklenemedi.');
        }
      } else if (modalType === 'edit_motor' && editingId) {
        const res = await updateMotorcycle(editingId, submitData);
        if (res.success && res.product) {
          setMotors((prev) => prev.map((item) => item.id === editingId ? res.product : item));
          setShowModal(false);
          alert('Motosiklet başarıyla güncellendi.');
        } else {
          alert(res.error || 'Motosiklet güncellenemedi.');
        }
      }
    });
  };

  const handleSavePart = async (e: React.FormEvent) => {
    e.preventDefault();
    
    startTransition(async () => {
      if (modalType === 'add_part') {
        const res = await createSparePart(partForm);
        if (res.success && res.product) {
          setParts((prev) => [...prev, res.product]);
          setShowModal(false);
          alert('Yedek parça başarıyla eklendi.');
        } else {
          alert(res.error || 'Yedek parça eklenemedi.');
        }
      } else if (modalType === 'edit_part' && editingId) {
        const res = await updateSparePart(editingId, partForm);
        if (res.success && res.product) {
          setParts((prev) => prev.map((item) => item.id === editingId ? res.product : item));
          setShowModal(false);
          alert('Yedek parça başarıyla güncellendi.');
        } else {
          alert(res.error || 'Yedek parça güncellenemedi.');
        }
      }
    });
  };

  const handleDeleteMotor = async (id: string, name: string) => {
    if (confirm(`"${name}" motosikletini tamamen silmek istediğinize emin misiniz?`)) {
      const res = await deleteMotorcycle(id);
      if (res.success) {
        setMotors((prev) => prev.filter((item) => item.id !== id));
        alert('Motosiklet silindi.');
      } else {
        alert(res.error || 'Motosiklet silinemedi.');
      }
    }
  };

  const handleDeletePart = async (id: string, name: string) => {
    if (confirm(`"${name}" yedek parçasını tamamen silmek istediğinize emin misiniz?`)) {
      const res = await deleteSparePart(id);
      if (res.success) {
        setParts((prev) => prev.filter((item) => item.id !== id));
        alert('Yedek parça silindi.');
      } else {
        alert(res.error || 'Yedek parça silinemedi.');
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 text-left relative">
      
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white">ÜRÜN & KATALOG YÖNETİMİ</h1>
          <p className="text-brand-muted text-sm mt-2 font-light">
            Showroom envanterini, motosiklet modellerini, yedek parçaları, fiyatlandırmaları ve stokları buradan kontrol edin.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          {activeTab === 'motors' ? (
            <button
              onClick={handleOpenAddMotor}
              className="px-5 py-3 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-xs transition-colors flex items-center gap-2 cursor-pointer orange-glow"
            >
              <Plus className="w-4 h-4" /> Motosiklet Ekle
            </button>
          ) : (
            <button
              onClick={handleOpenAddPart}
              className="px-5 py-3 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-xs transition-colors flex items-center gap-2 cursor-pointer orange-glow"
            >
              <Plus className="w-4 h-4" /> Yedek Parça Ekle
            </button>
          )}
        </div>
      </div>

      {/* 2. TABS SELECTOR */}
      <div className="flex border-b border-white/5 gap-6">
        <button
          onClick={() => { setActiveTab('motors'); setSearchQuery(''); }}
          className={`pb-4 text-xs font-bold uppercase tracking-wider transition-colors relative cursor-pointer ${
            activeTab === 'motors' ? 'text-brand-primary' : 'text-brand-muted hover:text-white'
          }`}
        >
          {activeTab === 'motors' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary" />}
          <span className="flex items-center gap-2">
            <Motorbike className="w-4 h-4" /> Motosiklet Koleksiyonu ({motors.length})
          </span>
        </button>

        <button
          onClick={() => { setActiveTab('parts'); setSearchQuery(''); }}
          className={`pb-4 text-xs font-bold uppercase tracking-wider transition-colors relative cursor-pointer ${
            activeTab === 'parts' ? 'text-brand-primary' : 'text-brand-muted hover:text-white'
          }`}
        >
          {activeTab === 'parts' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary" />}
          <span className="flex items-center gap-2">
            <Wrench className="w-4 h-4" /> Yedek Parça & Aksesuar ({parts.length})
          </span>
        </button>
      </div>

      {/* 3. FILTERS & SEARCH ROW */}
      <div className="p-4 rounded-2xl bg-brand-card border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Katalogda arayın..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary/50 transition-colors"
          />
          <Search className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
        </div>

        {/* Filter Badges Selectors */}
        <div className="w-full md:w-auto flex flex-wrap items-center gap-4 justify-end">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-brand-muted">Marka:</span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
            >
              <option value="ALL">Tümü</option>
              {brands.map((b) => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-brand-muted">Stok:</span>
            <select
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
            >
              <option value="ALL">Tümü</option>
              <option value="Stokta Var">Stokta Var</option>
              <option value="Sınırlı Stok">Sınırlı Stok</option>
              <option value="Tükendi">Tükendi</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. CONTENT LISTING */}
      {activeTab === 'motors' ? (
        // MOTORCYCLES PANEL VIEW
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMotors.map((m) => (
            <div 
              key={m.id} 
              className={`group rounded-2xl overflow-hidden bg-brand-card border border-white/5 flex flex-col justify-between premium-card ${
                !m.isActive && 'opacity-50'
              }`}
            >
              <div className="relative h-48 w-full bg-[#111] overflow-hidden border-b border-white/5">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-brand-primary text-white text-[8px] font-extrabold uppercase tracking-widest">
                  {m.status}
                </div>
                {!m.isActive && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-xs font-bold text-red-400 uppercase tracking-widest">
                    YAYINDA DEĞİL
                  </div>
                )}
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                <div className="text-left">
                  <span className="text-brand-primary text-[10px] font-bold uppercase tracking-wider">{m.brand} | {m.model} | {m.year}</span>
                  <h3 className="text-white font-extrabold text-base mt-1 line-clamp-1 uppercase">{m.name}</h3>
                  <p className="text-brand-muted text-[11px] font-light mt-1.5 leading-relaxed line-clamp-2">{m.shortDesc}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-brand-muted block">Satış Fiyatı</span>
                    <span className="text-white font-black text-lg">{m.price.toLocaleString('tr-TR')} TL</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditMotor(m)}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-brand-primary/40 text-brand-muted hover:text-brand-primary transition-all cursor-pointer"
                      title="Düzenle"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteMotor(m.id, m.name)}
                      className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                      title="Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredMotors.length === 0 && (
            <div className="col-span-full text-center py-24 text-sm text-brand-muted uppercase tracking-widest font-light">
              Arama kriterlerine uygun motosiklet bulunamadı.
            </div>
          )}
        </div>
      ) : (
        // SPARE PARTS PANEL VIEW
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map((p) => (
            <div 
              key={p.id} 
              className={`group rounded-2xl overflow-hidden bg-brand-card border border-white/5 flex flex-col justify-between premium-card ${
                !p.isActive && 'opacity-50'
              }`}
            >
              <div className="relative h-48 w-full bg-[#111] overflow-hidden border-b border-white/5">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-white/10 border border-white/10 text-white text-[8px] font-extrabold uppercase tracking-widest">
                  {p.category}
                </div>
                {!p.isActive && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-xs font-bold text-red-400 uppercase tracking-widest">
                    YAYINDA DEĞİL
                  </div>
                )}
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                <div className="text-left">
                  <span className="text-brand-primary text-[10px] font-bold uppercase tracking-wider">{p.brand}</span>
                  <h3 className="text-white font-extrabold text-base mt-1 line-clamp-1 uppercase">{p.name}</h3>
                  <p className="text-brand-muted text-[11px] font-light mt-1.5 leading-relaxed line-clamp-2">{p.shortDesc}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-brand-muted block">Satış Fiyatı</span>
                    <span className="text-white font-black text-lg">{p.price.toLocaleString('tr-TR')} TL</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditPart(p)}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-brand-primary/40 text-brand-muted hover:text-brand-primary transition-all cursor-pointer"
                      title="Düzenle"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePart(p.id, p.name)}
                      className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                      title="Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredParts.length === 0 && (
            <div className="col-span-full text-center py-24 text-sm text-brand-muted uppercase tracking-widest font-light">
              Arama kriterlerine uygun yedek parça bulunamadı.
            </div>
          )}
        </div>
      )}

      {/* ==========================================
          5. MODALS & FORMS (PREMIUM GLASS OVERLAYS)
          ========================================== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/85 backdrop-blur-xs">
          
          {/* Motorcycle Add/Edit Form Modal */}
          {(modalType === 'add_motor' || modalType === 'edit_motor') && (
            <div className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto flex flex-col gap-6 text-left shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="text-white font-extrabold text-lg uppercase tracking-wider flex items-center gap-2">
                  <Motorbike className="w-5 h-5 text-brand-primary" />
                  {modalType === 'add_motor' ? 'Motosiklet Ekle' : 'Motosikleti Düzenle'}
                </h3>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="p-1 rounded bg-white/5 text-brand-muted hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveMotor} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                {/* Name */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Motosiklet Adı</label>
                  <input
                    type="text"
                    required
                    value={motorForm.name}
                    onChange={(e) => setMotorForm({ ...motorForm, name: e.target.value })}
                    placeholder="Örn: Ducati Panigale V4 S"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary/50"
                  />
                </div>

                {/* Brand */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Marka</label>
                  <select
                    value={motorForm.brand}
                    onChange={(e) => {
                      const newBrand = e.target.value;
                      const brandObj = brands.find((b: any) => b.name === newBrand);
                      const defaultModel = brandObj?.models?.[0]?.name || '';
                      setMotorForm({ ...motorForm, brand: newBrand, model: defaultModel });
                    }}
                    className="bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                {/* Model */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Model / Seri</label>
                  <select
                    value={motorForm.model}
                    onChange={(e) => setMotorForm({ ...motorForm, model: e.target.value })}
                    className="bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                    required
                  >
                    <option value="" disabled>Model Seçin</option>
                    {(brands.find((b: any) => b.name === motorForm.brand)?.models || []).map((m: any) => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                    {/* Fallback to preserve custom models not in brand models */}
                    {motorForm.model && !(brands.find((b: any) => b.name === motorForm.brand)?.models || []).some((m: any) => m.name === motorForm.model) && (
                      <option value={motorForm.model}>{motorForm.model}</option>
                    )}
                  </select>
                </div>

                {/* Year */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Model Yılı</label>
                  <input
                    type="number"
                    required
                    value={motorForm.year}
                    onChange={(e) => setMotorForm({ ...motorForm, year: Number(e.target.value) })}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary/50"
                  />
                </div>

                {/* CC */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Motor Hacmi (cc)</label>
                  <input
                    type="number"
                    required
                    value={motorForm.cc}
                    onChange={(e) => setMotorForm({ ...motorForm, cc: Number(e.target.value) })}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                  />
                </div>

                {/* KM */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Kilometre</label>
                  <input
                    type="number"
                    required
                    value={motorForm.km}
                    onChange={(e) => setMotorForm({ ...motorForm, km: Number(e.target.value) })}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                  />
                </div>

                {/* Price */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Satış Fiyatı (TL)</label>
                  <input
                    type="number"
                    required
                    value={motorForm.price}
                    onChange={(e) => setMotorForm({ ...motorForm, price: Number(e.target.value) })}
                    className="bg-white/5 border border-brand-primary/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                {/* Stock Status */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Stok Durumu</label>
                  <select
                    value={motorForm.stock}
                    onChange={(e) => setMotorForm({ ...motorForm, stock: e.target.value })}
                    className="bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  >
                    <option value="Stokta Var">Stokta Var</option>
                    <option value="Sınırlı Stok">Sınırlı Stok</option>
                    <option value="Tükendi">Tükendi</option>
                  </select>
                </div>

                {/* Condition */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Durum</label>
                  <select
                    value={motorForm.condition}
                    onChange={(e) => setMotorForm({ ...motorForm, condition: e.target.value })}
                    className="bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  >
                    <option value="SIFIR">Sıfır</option>
                  </select>
                </div>

                {/* Status Badge */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Etiket / Durum</label>
                  <select
                    value={motorForm.status}
                    onChange={(e) => setMotorForm({ ...motorForm, status: e.target.value })}
                    className="bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  >
                    <option value="Sıfır">Sıfır</option>
                    <option value="Kampanyalı">Kampanyalı</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>

                {/* Document Status */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Evrak / Ruhsat Durumu</label>
                  <input
                    type="text"
                    value={motorForm.documentStatus}
                    onChange={(e) => setMotorForm({ ...motorForm, documentStatus: e.target.value })}
                    placeholder="Örn: Ruhsatı Hazır"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                  />
                </div>

                {/* Kapak Görseli */}
                <div className="flex flex-col gap-2 md:col-span-2 border border-white/5 bg-white/5 p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-primary" /> Kapak Görseli
                    </label>
                    {isUploading && <span className="text-[10px] font-semibold text-brand-primary animate-pulse">Yükleniyor...</span>}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    {motorForm.image ? (
                      <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-white/10 bg-[#111] shrink-0">
                        <img src={motorForm.image} alt="Kapak Önizleme" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setMotorForm({ ...motorForm, image: '' })}
                          className="absolute top-1 right-1 p-0.5 rounded bg-black/60 hover:bg-black text-red-400 hover:text-red-500 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-24 h-16 rounded-lg border border-dashed border-white/20 bg-white/5 flex items-center justify-center shrink-0 text-brand-muted text-[10px] font-light">
                        Yok
                      </div>
                    )}
                    <div className="flex-grow w-full flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        required
                        value={motorForm.image}
                        onChange={(e) => setMotorForm({ ...motorForm, image: e.target.value })}
                        placeholder="Görsel URL veya aşağıdan dosya yükleyin"
                        className="flex-grow bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2 text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary/50 text-[11px]"
                      />
                      <label className="shrink-0 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold uppercase tracking-wider text-[10px] cursor-pointer transition-colors border border-white/5 flex items-center justify-center gap-1.5">
                        <Plus className="w-3.5 h-3.5" /> Dosya Seç & Yükle
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleUploadMainImage(e, false)}
                          className="hidden"
                          disabled={isUploading}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Galeri Görselleri */}
                <div className="flex flex-col gap-3 md:col-span-2 border border-white/5 bg-white/5 p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-brand-primary" /> Ürün Galerisi ({
                        (() => {
                          try {
                            const arr = JSON.parse(motorForm.gallery || '[]');
                            return Array.isArray(arr) ? arr.length : 0;
                          } catch(e) { return 0; }
                        })()
                      })
                    </label>
                    <label className="px-3 py-1.5 rounded-lg bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-[9px] cursor-pointer transition-colors orange-glow flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Görsel Ekle
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUploadGalleryImage(e, false)}
                        className="hidden"
                        disabled={isUploading}
                      />
                    </label>
                  </div>

                  {/* Render Visual Grid of gallery images */}
                  <div className="flex flex-wrap gap-2.5 max-h-36 overflow-y-auto p-1.5 bg-[#0d0d0d] rounded-xl border border-white/5">
                    {(() => {
                      try {
                        const arr = JSON.parse(motorForm.gallery || '[]');
                        if (!Array.isArray(arr) || arr.length === 0) {
                          return (
                            <div className="w-full py-4 text-center text-brand-muted text-[10px] font-light uppercase tracking-widest">
                              Galeri boş. Görsel ekleyin.
                            </div>
                          );
                        }
                        return arr.map((url, idx) => (
                          <div key={idx} className="relative w-16 h-12 rounded-lg overflow-hidden border border-white/10 bg-[#111] group">
                            <img src={url} alt={`Galeri ${idx}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryImage(idx, false)}
                              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 hover:text-red-500 cursor-pointer transition-opacity"
                              title="Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ));
                      } catch(e) {
                        return (
                          <div className="w-full py-4 text-center text-red-400 text-[10px] font-mono">
                            JSON Hatası: Galeri verisi düzgün formatta değil.
                          </div>
                        );
                      }
                    })()}
                  </div>

                  {/* Backup Raw Text Input for advanced users */}
                  <details className="mt-1 cursor-pointer">
                    <summary className="text-[9px] uppercase font-bold text-brand-muted hover:text-white transition-colors">Gelişmiş: JSON Verisini Düzenle</summary>
                    <textarea
                      rows={2}
                      value={motorForm.gallery}
                      onChange={(e) => setMotorForm({ ...motorForm, gallery: e.target.value })}
                      placeholder='["https://image1.jpg", "https://image2.jpg"]'
                      className="w-full mt-2 bg-[#0d0d0d] border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-[10px] focus:outline-none"
                    />
                  </details>
                </div>

                {/* Short Desc */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Kısa Açıklama</label>
                  <input
                    type="text"
                    required
                    value={motorForm.shortDesc}
                    onChange={(e) => setMotorForm({ ...motorForm, shortDesc: e.target.value })}
                    placeholder="Kart üzerinde görünecek tek satırlık açıklama"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Detaylı Ürün Açıklaması</label>
                  <textarea
                    rows={4}
                    required
                    value={motorForm.description}
                    onChange={(e) => setMotorForm({ ...motorForm, description: e.target.value })}
                    placeholder="Ürün sayfasında görünecek uzun açıklama metni"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                  />
                </div>

                {/* Technical specs block */}
                <div className="md:col-span-2 border-t border-white/10 pt-4 flex flex-col gap-4">
                  <h4 className="text-white font-extrabold uppercase text-[10px] tracking-wider text-brand-primary">TEKNİK ÖZELLİKLER (SPESİFİKASYONLAR)</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold uppercase text-brand-muted">Motor Tipi</label>
                      <input
                        type="text"
                        value={motorForm.motorType}
                        onChange={(e) => setMotorForm({ ...motorForm, motorType: e.target.value })}
                        placeholder="Örn: 90° V4"
                        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold uppercase text-brand-muted">Motor Gücü</label>
                      <input
                        type="text"
                        value={motorForm.power}
                        onChange={(e) => setMotorForm({ ...motorForm, power: e.target.value })}
                        placeholder="Örn: 215.5 HP"
                        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold uppercase text-brand-muted">Tork</label>
                      <input
                        type="text"
                        value={motorForm.torque}
                        onChange={(e) => setMotorForm({ ...motorForm, torque: e.target.value })}
                        placeholder="Örn: 123 Nm"
                        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold uppercase text-brand-muted">Ağırlık</label>
                      <input
                        type="text"
                        value={motorForm.weight}
                        onChange={(e) => setMotorForm({ ...motorForm, weight: e.target.value })}
                        placeholder="Örn: 174 kg"
                        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold uppercase text-brand-muted">Sele Yüksekliği</label>
                      <input
                        type="text"
                        value={motorForm.seatHeight}
                        onChange={(e) => setMotorForm({ ...motorForm, seatHeight: e.target.value })}
                        placeholder="Örn: 850 mm"
                        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold uppercase text-brand-muted">Yakıt Kapasitesi</label>
                      <input
                        type="text"
                        value={motorForm.fuelCapacity}
                        onChange={(e) => setMotorForm({ ...motorForm, fuelCapacity: e.target.value })}
                        placeholder="Örn: 17 Litre"
                        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Flags Checkboxes */}
                <div className="md:col-span-2 flex flex-wrap items-center gap-6 border-t border-white/5 pt-4 mt-2">
                  <label className="flex items-center gap-2 font-bold cursor-pointer text-brand-muted hover:text-white">
                    <input
                      type="checkbox"
                      checked={motorForm.isFeatured}
                      onChange={(e) => setMotorForm({ ...motorForm, isFeatured: e.target.checked })}
                      className="w-4 h-4 rounded border-white/10 bg-white/5 text-brand-primary accent-brand-primary"
                    />
                    Öne Çıkan Ürün
                  </label>

                  <label className="flex items-center gap-2 font-bold cursor-pointer text-brand-muted hover:text-white">
                    <input
                      type="checkbox"
                      checked={motorForm.isCampaign}
                      onChange={(e) => setMotorForm({ ...motorForm, isCampaign: e.target.checked })}
                      className="w-4 h-4 rounded border-white/10 bg-white/5 text-brand-primary accent-brand-primary"
                    />
                    Kampanyalı Ürün
                  </label>

                  <label className="flex items-center gap-2 font-bold cursor-pointer text-brand-muted hover:text-white">
                    <input
                      type="checkbox"
                      checked={motorForm.isActive}
                      onChange={(e) => setMotorForm({ ...motorForm, isActive: e.target.checked })}
                      className="w-4 h-4 rounded border-white/10 bg-white/5 text-brand-primary accent-brand-primary"
                    />
                    Yayında / Aktif
                  </label>
                </div>

                {/* Form Footer Actions */}
                <div className="md:col-span-2 border-t border-white/10 pt-4 flex items-center justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-brand-muted hover:text-white font-bold uppercase tracking-wider text-[10px]"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-[10px] orange-glow flex items-center gap-1.5 disabled:opacity-50"
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
          )}

          {/* Spare Part Add/Edit Form Modal */}
          {(modalType === 'add_part' || modalType === 'edit_part') && (
            <div className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto flex flex-col gap-6 text-left shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="text-white font-extrabold text-lg uppercase tracking-wider flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-brand-primary" />
                  {modalType === 'add_part' ? 'Yedek Parça Ekle' : 'Yedek Parçayı Düzenle'}
                </h3>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="p-1 rounded bg-white/5 text-brand-muted hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSavePart} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                {/* Name */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Yedek Parça Adı</label>
                  <input
                    type="text"
                    required
                    value={partForm.name}
                    onChange={(e) => setPartForm({ ...partForm, name: e.target.value })}
                    placeholder="Örn: Brembo GP4-RX Kaliper Takımı"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary/50"
                  />
                </div>

                {/* Brand */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Marka</label>
                  <select
                    value={partForm.brand}
                    onChange={(e) => setPartForm({ ...partForm, brand: e.target.value })}
                    className="bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Kategori</label>
                  <select
                    value={partForm.category}
                    onChange={(e) => setPartForm({ ...partForm, category: e.target.value })}
                    className="bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Satış Fiyatı (TL)</label>
                  <input
                    type="number"
                    required
                    value={partForm.price}
                    onChange={(e) => setPartForm({ ...partForm, price: Number(e.target.value) })}
                    className="bg-white/5 border border-brand-primary/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                {/* Stock Status */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Stok Durumu</label>
                  <select
                    value={partForm.stock}
                    onChange={(e) => setPartForm({ ...partForm, stock: e.target.value })}
                    className="bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  >
                    <option value="Stokta Var">Stokta Var</option>
                    <option value="Sınırlı Stok">Sınırlı Stok</option>
                    <option value="Tükendi">Tükendi</option>
                  </select>
                </div>

                {/* Kapak Görseli */}
                <div className="flex flex-col gap-2 md:col-span-2 border border-white/5 bg-white/5 p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-primary" /> Kapak Görseli
                    </label>
                    {isUploading && <span className="text-[10px] font-semibold text-brand-primary animate-pulse">Yükleniyor...</span>}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    {partForm.image ? (
                      <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-white/10 bg-[#111] shrink-0">
                        <img src={partForm.image} alt="Kapak Önizleme" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setPartForm({ ...partForm, image: '' })}
                          className="absolute top-1 right-1 p-0.5 rounded bg-black/60 hover:bg-black text-red-400 hover:text-red-500 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-24 h-16 rounded-lg border border-dashed border-white/20 bg-white/5 flex items-center justify-center shrink-0 text-brand-muted text-[10px] font-light">
                        Yok
                      </div>
                    )}
                    <div className="flex-grow w-full flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        required
                        value={partForm.image}
                        onChange={(e) => setPartForm({ ...partForm, image: e.target.value })}
                        placeholder="Görsel URL veya aşağıdan dosya yükleyin"
                        className="flex-grow bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2 text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary/50 text-[11px]"
                      />
                      <label className="shrink-0 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold uppercase tracking-wider text-[10px] cursor-pointer transition-colors border border-white/5 flex items-center justify-center gap-1.5">
                        <Plus className="w-3.5 h-3.5" /> Dosya Seç & Yükle
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleUploadMainImage(e, true)}
                          className="hidden"
                          disabled={isUploading}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Galeri Görselleri */}
                <div className="flex flex-col gap-3 md:col-span-2 border border-white/5 bg-white/5 p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-brand-primary" /> Ürün Galerisi ({
                        (() => {
                          try {
                            const arr = JSON.parse(partForm.gallery || '[]');
                            return Array.isArray(arr) ? arr.length : 0;
                          } catch(e) { return 0; }
                        })()
                      })
                    </label>
                    <label className="px-3 py-1.5 rounded-lg bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-[9px] cursor-pointer transition-colors orange-glow flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Görsel Ekle
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUploadGalleryImage(e, true)}
                        className="hidden"
                        disabled={isUploading}
                      />
                    </label>
                  </div>

                  {/* Render Visual Grid of gallery images */}
                  <div className="flex flex-wrap gap-2.5 max-h-36 overflow-y-auto p-1.5 bg-[#0d0d0d] rounded-xl border border-white/5">
                    {(() => {
                      try {
                        const arr = JSON.parse(partForm.gallery || '[]');
                        if (!Array.isArray(arr) || arr.length === 0) {
                          return (
                            <div className="w-full py-4 text-center text-brand-muted text-[10px] font-light uppercase tracking-widest">
                              Galeri boş. Görsel ekleyin.
                            </div>
                          );
                        }
                        return arr.map((url, idx) => (
                          <div key={idx} className="relative w-16 h-12 rounded-lg overflow-hidden border border-white/10 bg-[#111] group">
                            <img src={url} alt={`Galeri ${idx}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryImage(idx, true)}
                              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 hover:text-red-500 cursor-pointer transition-opacity"
                              title="Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ));
                      } catch(e) {
                        return (
                          <div className="w-full py-4 text-center text-red-400 text-[10px] font-mono">
                            JSON Hatası: Galeri verisi düzgün formatta değil.
                          </div>
                        );
                      }
                    })()}
                  </div>

                  {/* Backup Raw Text Input for advanced users */}
                  <details className="mt-1 cursor-pointer">
                    <summary className="text-[9px] uppercase font-bold text-brand-muted hover:text-white transition-colors">Gelişmiş: JSON Verisini Düzenle</summary>
                    <textarea
                      rows={2}
                      value={partForm.gallery}
                      onChange={(e) => setPartForm({ ...partForm, gallery: e.target.value })}
                      placeholder='["https://image1.jpg", "https://image2.jpg"]'
                      className="w-full mt-2 bg-[#0d0d0d] border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-[10px] focus:outline-none"
                    />
                  </details>
                </div>

                {/* Compatible Models */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Uyumlu Motosiklet Modelleri (Stringified JSON Array)</label>
                  <input
                    type="text"
                    value={partForm.compatibleModels}
                    onChange={(e) => setPartForm({ ...partForm, compatibleModels: e.target.value })}
                    placeholder='["Ducati Panigale V4", "BMW S1000RR"]'
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none font-mono"
                  />
                </div>

                {/* Short Desc */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Kısa Açıklama</label>
                  <input
                    type="text"
                    required
                    value={partForm.shortDesc}
                    onChange={(e) => setPartForm({ ...partForm, shortDesc: e.target.value })}
                    placeholder="Kart üzerinde görünecek tek satırlık açıklama"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Detaylı Ürün Açıklaması</label>
                  <textarea
                    rows={4}
                    required
                    value={partForm.description}
                    onChange={(e) => setPartForm({ ...partForm, description: e.target.value })}
                    placeholder="Ürün sayfasında görünecek uzun açıklama metni"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                  />
                </div>

                {/* Flags Checkboxes */}
                <div className="md:col-span-2 flex flex-wrap items-center gap-6 border-t border-white/5 pt-4 mt-2">
                  <label className="flex items-center gap-2 font-bold cursor-pointer text-brand-muted hover:text-white">
                    <input
                      type="checkbox"
                      checked={partForm.isFeatured}
                      onChange={(e) => setPartForm({ ...partForm, isFeatured: e.target.checked })}
                      className="w-4 h-4 rounded border-white/10 bg-white/5 text-brand-primary accent-brand-primary"
                    />
                    Öne Çıkan Ürün
                  </label>

                  <label className="flex items-center gap-2 font-bold cursor-pointer text-brand-muted hover:text-white">
                    <input
                      type="checkbox"
                      checked={partForm.isCampaign}
                      onChange={(e) => setPartForm({ ...partForm, isCampaign: e.target.checked })}
                      className="w-4 h-4 rounded border-white/10 bg-white/5 text-brand-primary accent-brand-primary"
                    />
                    Kampanyalı Ürün
                  </label>

                  <label className="flex items-center gap-2 font-bold cursor-pointer text-brand-muted hover:text-white">
                    <input
                      type="checkbox"
                      checked={partForm.isActive}
                      onChange={(e) => setPartForm({ ...partForm, isActive: e.target.checked })}
                      className="w-4 h-4 rounded border-white/10 bg-white/5 text-brand-primary accent-brand-primary"
                    />
                    Yayında / Aktif
                  </label>
                </div>

                {/* Form Footer Actions */}
                <div className="md:col-span-2 border-t border-white/10 pt-4 flex items-center justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-brand-muted hover:text-white font-bold uppercase tracking-wider text-[10px]"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-[10px] orange-glow flex items-center gap-1.5 disabled:opacity-50"
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
          )}

        </div>
      )}

    </div>
  );
}

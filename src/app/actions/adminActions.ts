'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

// ==========================================
// 1. ANALYTICS & LOGGING
// ==========================================

export async function logAnalyticsEvent(eventType: 'WHATSAPP' | 'PHONE' | 'IBAN' | 'RECEIPT', eventName: string) {
  try {
    await db.analyticsLog.create({
      data: {
        eventType,
        eventName,
      },
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to log analytics event:', error);
    return { success: false };
  }
}

// ==========================================
// 2. DASHBOARD STATS
// ==========================================

export async function getDashboardStats() {
  try {
    const totalMotors = await db.motorcycle.count();
    const totalParts = await db.sparePart.count();
    
    // Stok counts
    const motorsInStock = await db.motorcycle.count({ where: { stock: 'Stokta Var' } });
    const motorsLimitedStock = await db.motorcycle.count({ where: { stock: 'Sınırlı Stok' } });
    const motorsOutOfStock = await db.motorcycle.count({ where: { stock: 'Tükendi' } });

    const partsInStock = await db.sparePart.count({ where: { stock: 'Stokta Var' } });
    const partsLimitedStock = await db.sparePart.count({ where: { stock: 'Sınırlı Stok' } });
    const partsOutOfStock = await db.sparePart.count({ where: { stock: 'Tükendi' } });

    // Recent items
    const recentMotors = await db.motorcycle.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const recentParts = await db.sparePart.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    // Analytics clicks logs
    const whatsappClicks = await db.analyticsLog.count({ where: { eventType: 'WHATSAPP' } });
    const phoneCalls = await db.analyticsLog.count({ where: { eventType: 'PHONE' } });
    const ibanCopies = await db.analyticsLog.count({ where: { eventType: 'IBAN' } });
    const receiptUploads = await db.analyticsLog.count({ where: { eventType: 'RECEIPT' } });

    return {
      success: true,
      stats: {
        totalMotors,
        totalParts,
        totalProducts: totalMotors + totalParts,
        motorsInStock: motorsInStock + motorsLimitedStock,
        motorsOutOfStock,
        partsInStock: partsInStock + partsLimitedStock,
        partsOutOfStock,
        whatsappClicks,
        phoneCalls,
        ibanCopies,
        receiptUploads,
      },
      recentMotors,
      recentParts,
    };
  } catch (error) {
    console.error('Failed to query dashboard stats:', error);
    return {
      success: false,
      error: 'İstatistikler yüklenirken bir hata oluştu.',
      stats: {
        totalMotors: 0,
        totalParts: 0,
        totalProducts: 0,
        motorsInStock: 0,
        motorsOutOfStock: 0,
        partsInStock: 0,
        partsOutOfStock: 0,
        whatsappClicks: 0,
        phoneCalls: 0,
        ibanCopies: 0,
        receiptUploads: 0,
      },
      recentMotors: [],
      recentParts: [],
    };
  }
}

// ==========================================
// 3. MOTORCYCLES MANAGEMENT
// ==========================================

export async function getAdminMotorcycles() {
  try {
    return await db.motorcycle.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.error('Failed to get motorcycles:', error);
    return [];
  }
}

export async function createMotorcycle(data: any) {
  try {
    const newMotor = await db.motorcycle.create({
      data: {
        name: data.name,
        brand: data.brand,
        model: data.model,
        year: Number(data.year),
        cc: Number(data.cc),
        km: Number(data.km),
        condition: data.condition,
        documentStatus: data.documentStatus,
        price: Number(data.price),
        oldPrice: data.oldPrice ? Number(data.oldPrice) : null,
        stock: data.stock || 'Stokta Var',
        shortDesc: data.shortDesc,
        description: data.description,
        specs: typeof data.specs === 'string' ? data.specs : JSON.stringify(data.specs || {}),
        image: data.image || 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
        gallery: typeof data.gallery === 'string' ? data.gallery : JSON.stringify(data.gallery || []),
        status: data.status || 'Sıfır',
        isFeatured: Boolean(data.isFeatured),
        isCampaign: Boolean(data.isCampaign),
        isActive: Boolean(data.isActive !== false),
        order: Number(data.order || 0),
      },
    });
    revalidatePath('/');
    revalidatePath('/motosikletler');
    return { success: true, product: newMotor };
  } catch (error: any) {
    console.error('Failed to create motorcycle:', error);
    return { success: false, error: 'Motosiklet eklenirken hata oluştu.' };
  }
}

export async function updateMotorcycle(id: string, data: any) {
  try {
    const updated = await db.motorcycle.update({
      where: { id },
      data: {
        name: data.name,
        brand: data.brand,
        model: data.model,
        year: Number(data.year),
        cc: Number(data.cc),
        km: Number(data.km),
        condition: data.condition,
        documentStatus: data.documentStatus,
        price: Number(data.price),
        oldPrice: data.oldPrice ? Number(data.oldPrice) : null,
        stock: data.stock,
        shortDesc: data.shortDesc,
        description: data.description,
        specs: typeof data.specs === 'string' ? data.specs : JSON.stringify(data.specs || {}),
        image: data.image,
        gallery: typeof data.gallery === 'string' ? data.gallery : JSON.stringify(data.gallery || []),
        status: data.status,
        isFeatured: Boolean(data.isFeatured),
        isCampaign: Boolean(data.isCampaign),
        isActive: Boolean(data.isActive !== false),
        order: Number(data.order || 0),
      },
    });
    revalidatePath('/');
    revalidatePath('/motosikletler');
    revalidatePath(`/urun/${id}`);
    return { success: true, product: updated };
  } catch (error: any) {
    console.error('Failed to update motorcycle:', error);
    return { success: false, error: 'Motosiklet güncellenirken hata oluştu.' };
  }
}

export async function deleteMotorcycle(id: string) {
  try {
    await db.motorcycle.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/motosikletler');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete motorcycle:', error);
    return { success: false, error: 'Motosiklet silinirken hata oluştu.' };
  }
}

// ==========================================
// 4. SPARE PARTS MANAGEMENT
// ==========================================

export async function getAdminSpareParts() {
  try {
    return await db.sparePart.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.error('Failed to get spare parts:', error);
    return [];
  }
}

export async function createSparePart(data: any) {
  try {
    const newPart = await db.sparePart.create({
      data: {
        name: data.name,
        brand: data.brand,
        category: data.category,
        price: Number(data.price),
        oldPrice: data.oldPrice ? Number(data.oldPrice) : null,
        stock: data.stock || 'Stokta Var',
        shortDesc: data.shortDesc,
        description: data.description,
        image: data.image || 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
        gallery: typeof data.gallery === 'string' ? data.gallery : JSON.stringify(data.gallery || []),
        compatibleModels: typeof data.compatibleModels === 'string' ? data.compatibleModels : JSON.stringify(data.compatibleModels || []),
        isFeatured: Boolean(data.isFeatured),
        isCampaign: Boolean(data.isCampaign),
        isActive: Boolean(data.isActive !== false),
        order: Number(data.order || 0),
      },
    });
    revalidatePath('/');
    revalidatePath('/yedek-parca');
    return { success: true, product: newPart };
  } catch (error: any) {
    console.error('Failed to create spare part:', error);
    return { success: false, error: 'Yedek parça eklenirken hata oluştu.' };
  }
}

export async function updateSparePart(id: string, data: any) {
  try {
    const updated = await db.sparePart.update({
      where: { id },
      data: {
        name: data.name,
        brand: data.brand,
        category: data.category,
        price: Number(data.price),
        oldPrice: data.oldPrice ? Number(data.oldPrice) : null,
        stock: data.stock,
        shortDesc: data.shortDesc,
        description: data.description,
        image: data.image,
        gallery: typeof data.gallery === 'string' ? data.gallery : JSON.stringify(data.gallery || []),
        compatibleModels: typeof data.compatibleModels === 'string' ? data.compatibleModels : JSON.stringify(data.compatibleModels || []),
        isFeatured: Boolean(data.isFeatured),
        isCampaign: Boolean(data.isCampaign),
        isActive: Boolean(data.isActive !== false),
        order: Number(data.order || 0),
      },
    });
    revalidatePath('/');
    revalidatePath('/yedek-parca');
    revalidatePath(`/urun/${id}`);
    return { success: true, product: updated };
  } catch (error: any) {
    console.error('Failed to update spare part:', error);
    return { success: false, error: 'Yedek parça güncellenirken hata oluştu.' };
  }
}

export async function deleteSparePart(id: string) {
  try {
    await db.sparePart.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/yedek-parca');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete spare part:', error);
    return { success: false, error: 'Yedek parça silinirken hata oluştu.' };
  }
}

// ==========================================
// 5. SETTINGS MANAGEMENT (SITE CONFIGS)
// ==========================================

export async function getAdminSiteSettings() {
  try {
    return await db.siteSetting.findUnique({
      where: { id: 'global-setting' },
    });
  } catch (error) {
    console.error('Failed to query site settings:', error);
    return null;
  }
}

export async function saveSiteSettings(data: any) {
  try {
    const updated = await db.siteSetting.upsert({
      where: { id: 'global-setting' },
      update: {
        siteName: data.siteName,
        logoUrl: data.logoUrl,
        bannerUrl: data.bannerUrl,
        heroTitle: data.heroTitle,
        heroDescription: data.heroDescription,
        slogan: data.slogan,
        phone: data.phone,
        phoneFormatted: data.phoneFormatted,
        whatsapp: data.whatsapp,
        whatsappFormatted: data.whatsappFormatted,
        address: data.address,
        email: data.email,
        mapUrl: data.mapUrl,
        workingHours: typeof data.workingHours === 'string' ? data.workingHours : JSON.stringify(data.workingHours || []),
        socialLinks: typeof data.socialLinks === 'string' ? data.socialLinks : JSON.stringify(data.socialLinks || {}),
        footerText: data.footerText,
        aboutText: data.aboutText,
        contactText: data.contactText,
        kullaniciText: data.kullaniciText,
        gizlilikText: data.gizlilikText,
        kvkkText: data.kvkkText,
        mesafeliText: data.mesafeliText,
        hukukText: data.hukukText,
        aboutTitle: data.aboutTitle,
        aboutDesc: data.aboutDesc,
        aboutValues: typeof data.aboutValues === 'string' ? data.aboutValues : JSON.stringify(data.aboutValues || []),
        aboutMilestones: typeof data.aboutMilestones === 'string' ? data.aboutMilestones : JSON.stringify(data.aboutMilestones || []),
        sparePartsActive: Boolean(data.sparePartsActive),
        showProductPrices: Boolean(data.showProductPrices),
      },
      create: {
        id: 'global-setting',
        siteName: data.siteName,
        logoUrl: data.logoUrl,
        bannerUrl: data.bannerUrl,
        heroTitle: data.heroTitle,
        heroDescription: data.heroDescription,
        slogan: data.slogan,
        phone: data.phone,
        phoneFormatted: data.phoneFormatted,
        whatsapp: data.whatsapp,
        whatsappFormatted: data.whatsappFormatted,
        address: data.address,
        email: data.email,
        mapUrl: data.mapUrl,
        workingHours: typeof data.workingHours === 'string' ? data.workingHours : JSON.stringify(data.workingHours || []),
        socialLinks: typeof data.socialLinks === 'string' ? data.socialLinks : JSON.stringify(data.socialLinks || {}),
        footerText: data.footerText,
        aboutText: data.aboutText,
        contactText: data.contactText,
        kullaniciText: data.kullaniciText,
        gizlilikText: data.gizlilikText,
        kvkkText: data.kvkkText,
        mesafeliText: data.mesafeliText,
        hukukText: data.hukukText,
        aboutTitle: data.aboutTitle,
        aboutDesc: data.aboutDesc,
        aboutValues: typeof data.aboutValues === 'string' ? data.aboutValues : JSON.stringify(data.aboutValues || []),
        aboutMilestones: typeof data.aboutMilestones === 'string' ? data.aboutMilestones : JSON.stringify(data.aboutMilestones || []),
        sparePartsActive: Boolean(data.sparePartsActive),
        showProductPrices: Boolean(data.showProductPrices),
      },
    });
    revalidatePath('/');
    revalidatePath('/yedek-parca');
    revalidatePath('/iletisim');
    revalidatePath('/hakkimizda');
    revalidatePath('/yasal');
    revalidatePath('/', 'layout');
    return { success: true, settings: updated };
  } catch (error) {
    console.error('Failed to save site settings:', error);
    return { success: false, error: 'Site genel ayarları kaydedilirken hata oluştu.' };
  }
}

// ==========================================
// 6. PAYMENT CONFIGS
// ==========================================

export async function getAdminPaymentSettings() {
  try {
    return await db.paymentSetting.findUnique({
      where: { id: 'global-payment' },
    });
  } catch (error) {
    console.error('Failed to query payment settings:', error);
    return null;
  }
}

export async function savePaymentSettings(data: any) {
  try {
    const updated = await db.paymentSetting.upsert({
      where: { id: 'global-payment' },
      update: {
        bankName: data.bankName,
        branch: data.branch,
        accountHolder: data.accountHolder,
        iban: data.iban,
        description: data.description,
        cardPaymentsActive: Boolean(data.cardPaymentsActive),
        bankPaymentsActive: Boolean(data.bankPaymentsActive),
      },
      create: {
        id: 'global-payment',
        bankName: data.bankName,
        branch: data.branch,
        accountHolder: data.accountHolder,
        iban: data.iban,
        description: data.description,
        cardPaymentsActive: Boolean(data.cardPaymentsActive),
        bankPaymentsActive: Boolean(data.bankPaymentsActive),
      },
    });
    revalidatePath('/odeme');
    revalidatePath('/', 'layout');
    return { success: true, settings: updated };
  } catch (error) {
    console.error('Failed to save payment settings:', error);
    return { success: false, error: 'Banka/IBAN ayarları kaydedilirken hata oluştu.' };
  }
}

// ==========================================
// 7. LIVE SUPPORT CHAT CONFIGS
// ==========================================

export async function getAdminLiveSupportSettings() {
  try {
    return await db.liveSupportSetting.findUnique({
      where: { id: 'global-livesupport' },
    });
  } catch (error) {
    console.error('Failed to query live support settings:', error);
    return null;
  }
}

export async function saveLiveSupportSettings(data: any) {
  try {
    const updated = await db.liveSupportSetting.upsert({
      where: { id: 'global-livesupport' },
      update: {
        aiActive: Boolean(data.aiActive),
        aiName: data.aiName || 'HAWK AI',
        maintenanceMessage: data.maintenanceMessage,
        whatsappMessage: data.whatsappMessage,
      },
      create: {
        id: 'global-livesupport',
        aiActive: Boolean(data.aiActive),
        aiName: data.aiName || 'HAWK AI',
        maintenanceMessage: data.maintenanceMessage,
        whatsappMessage: data.whatsappMessage,
      },
    });
    revalidatePath('/');
    return { success: true, settings: updated };
  } catch (error) {
    console.error('Failed to save live support settings:', error);
    return { success: false, error: 'Canlı destek yapay zekâ ayarları kaydedilirken hata oluştu.' };
  }
}

// ==========================================
// 8. CATEGORY MANAGEMENT
// ==========================================

export async function getAdminCategories() {
  try {
    return await db.category.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.error('Failed to get categories:', error);
    return [];
  }
}

export async function createCategory(data: any) {
  try {
    const newCat = await db.category.create({
      data: {
        name: data.name,
        slug: data.slug.toLowerCase().trim().replace(/\s+/g, '-'),
        order: Number(data.order || 0),
        isActive: Boolean(data.isActive !== false),
      },
    });
    return { success: true, category: newCat };
  } catch (error) {
    console.error('Failed to create category:', error);
    return { success: false, error: 'Kategori eklenirken hata oluştu.' };
  }
}

export async function updateCategory(id: string, data: any) {
  try {
    const updated = await db.category.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug.toLowerCase().trim().replace(/\s+/g, '-'),
        order: Number(data.order || 0),
        isActive: Boolean(data.isActive !== false),
      },
    });
    return { success: true, category: updated };
  } catch (error) {
    console.error('Failed to update category:', error);
    return { success: false, error: 'Kategori güncellenirken hata oluştu.' };
  }
}

export async function deleteCategory(id: string) {
  try {
    await db.category.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error('Failed to delete category:', error);
    return { success: false, error: 'Kategori silinirken hata oluştu.' };
  }
}

// ==========================================
// 8.5. BRAND MANAGEMENT
// ==========================================

export async function getAdminBrands() {
  try {
    return await db.brand.findMany({
      include: { models: true },
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error('Failed to get brands:', error);
    return [];
  }
}

export async function createBrand(data: any) {
  try {
    const newBrand = await db.brand.create({
      data: {
        name: data.name.trim(),
      },
    });
    return { success: true, brand: newBrand };
  } catch (error: any) {
    console.error('Failed to create brand:', error);
    if (error.code === 'P2002') {
      return { success: false, error: 'Bu marka zaten mevcut.' };
    }
    return { success: false, error: 'Marka eklenirken hata oluştu.' };
  }
}

export async function updateBrand(id: string, data: any) {
  try {
    const updated = await db.brand.update({
      where: { id },
      data: {
        name: data.name.trim(),
      },
    });
    return { success: true, brand: updated };
  } catch (error: any) {
    console.error('Failed to update brand:', error);
    if (error.code === 'P2002') {
      return { success: false, error: 'Bu isimde başka bir marka zaten mevcut.' };
    }
    return { success: false, error: 'Marka güncellenirken hata oluştu.' };
  }
}

export async function deleteBrand(id: string) {
  try {
    await db.brand.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error('Failed to delete brand:', error);
    return { success: false, error: 'Marka silinirken hata oluştu.' };
  }
}

// ==========================================
// 8.6. BRAND MODELS MANAGEMENT
// ==========================================

export async function getBrandModels(brandId: string) {
  try {
    return await db.brandModel.findMany({
      where: { brandId },
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error('Failed to get brand models:', error);
    return [];
  }
}

export async function createBrandModel(data: { name: string; brandId: string }) {
  try {
    const newModel = await db.brandModel.create({
      data: {
        name: data.name.trim(),
        brandId: data.brandId,
      },
    });
    return { success: true, model: newModel };
  } catch (error: any) {
    console.error('Failed to create brand model:', error);
    if (error.code === 'P2002') {
      return { success: false, error: 'Bu model bu marka için zaten tanımlı.' };
    }
    return { success: false, error: 'Model eklenirken hata oluştu.' };
  }
}

export async function deleteBrandModel(id: string) {
  try {
    await db.brandModel.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error('Failed to delete brand model:', error);
    return { success: false, error: 'Model silinirken hata oluştu.' };
  }
}

// ==========================================
// 9. IMAGE UPLOAD TO DISK
// ==========================================

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      return { success: false, error: 'Dosya seçilmedi.' };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique name
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
    
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });

    // Write file to disk
    const filePath = join(uploadDir, filename);
    await writeFile(filePath, buffer);

    return { success: true, url: `/uploads/${filename}` };
  } catch (error: any) {
    console.error('Image upload failed:', error);
    return { success: false, error: 'Görsel sunucuya kaydedilirken hata oluştu.' };
  }
}

// ==========================================
// 10. LEGAL DOCUMENTS MANAGEMENT (CMS)
// ==========================================

export async function getAdminLegalDocuments() {
  try {
    return await db.legalDocument.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.error('Failed to get legal documents:', error);
    return [];
  }
}

export async function createLegalDocument(data: any) {
  try {
    const slug = data.title.toLowerCase().trim()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
      
    const newDoc = await db.legalDocument.create({
      data: {
        title: data.title,
        slug: data.slug || slug,
        content: data.content,
        isActive: Boolean(data.isActive !== false),
        order: Number(data.order || 0),
      },
    });
    revalidatePath('/yasal');
    return { success: true, document: newDoc };
  } catch (error: any) {
    console.error('Failed to create legal document:', error);
    return { success: false, error: 'Yasal sözleşme eklenirken hata oluştu.' };
  }
}

export async function updateLegalDocument(id: string, data: any) {
  try {
    const updated = await db.legalDocument.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        isActive: Boolean(data.isActive !== false),
        order: Number(data.order || 0),
      },
    });
    revalidatePath('/yasal');
    return { success: true, document: updated };
  } catch (error: any) {
    console.error('Failed to update legal document:', error);
    return { success: false, error: 'Yasal sözleşme güncellenirken hata oluştu.' };
  }
}

export async function deleteLegalDocument(id: string) {
  try {
    await db.legalDocument.delete({ where: { id } });
    revalidatePath('/yasal');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete legal document:', error);
    return { success: false, error: 'Yasal sözleşme silinirken hata oluştu.' };
  }
}

import db from './db';
import { 
  siteConfig as staticConfig, 
  motorcycles as staticMotors, 
  spareParts as staticParts 
} from '@/config/site';

// ==========================================
// 1. SITE SETTINGS REPOSITORY
// ==========================================

export async function getDbSiteSettings() {
  try {
    const [dbSettings, paySettings] = await Promise.all([
      db.siteSetting.findUnique({ where: { id: 'global-setting' } }),
      db.paymentSetting.findUnique({ where: { id: 'global-payment' } })
    ]);

    if (dbSettings) {
      let workingHours = staticConfig.workingHours;
      let socialLinks = { instagram: 'https://instagram.com/hawkmotortr', tiktok: 'https://tiktok.com/@hawkmotortr' };

      try {
        if (dbSettings.workingHours) workingHours = JSON.parse(dbSettings.workingHours);
      } catch (e) {}

      try {
        if (dbSettings.socialLinks) socialLinks = JSON.parse(dbSettings.socialLinks);
      } catch (e) {}

      const bankPaymentsActive = paySettings ? paySettings.bankPaymentsActive !== false : true;

      return {
        name: dbSettings.siteName,
        logoUrl: dbSettings.logoUrl || '',
        bannerUrl: dbSettings.bannerUrl || '',
        slogan: dbSettings.slogan || 'PREMIUM HUB',
        title: `${dbSettings.siteName} | ${dbSettings.heroTitle}`,
        description: dbSettings.heroDescription,
        phone: dbSettings.phone,
        phoneFormatted: dbSettings.phoneFormatted,
        whatsapp: dbSettings.whatsapp,
        whatsappFormatted: dbSettings.whatsappFormatted,
        address: dbSettings.address,
        workingHours,
        socialLinks,
        footerText: dbSettings.footerText,
        aboutText: dbSettings.aboutText,
        contactText: dbSettings.contactText,
        seoKeywords: staticConfig.seoKeywords,
        bankDetails: staticConfig.bankDetails, // Fallback bank details if payment is empty
        // Dynamic CMS extensions
        email: dbSettings.email || 'info@hawkmotor.com',
        mapUrl: dbSettings.mapUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.9713180424564!2d29.006935276550792!3d41.04752831732959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a224ba4609%3A0x633bd2f3922d0cfb!2sBarbaros%20Blv.%2C%20Be%C5%9Fikta%C5%9F%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1717234850000!5m2!1str!2str',
        kullaniciText: dbSettings.kullaniciText || '',
        gizlilikText: dbSettings.gizlilikText || '',
        kvkkText: dbSettings.kvkkText || '',
        mesafeliText: dbSettings.mesafeliText || '',
        hukukText: dbSettings.hukukText || '',
        aboutTitle: dbSettings.aboutTitle || 'BİZ KİMİZ?',
        aboutDesc: dbSettings.aboutDesc || 'HAWK MOTOR, yüksek performanslı premium motosikletler için kurulan seçkin bir merkezdir.',
        aboutValues: dbSettings.aboutValues || '[]',
        aboutMilestones: dbSettings.aboutMilestones || '[]',
        sparePartsActive: dbSettings.sparePartsActive,
        bankPaymentsActive: bankPaymentsActive,
        showProductPrices: dbSettings.showProductPrices,
      };
    }
  } catch (error) {
    console.warn('Database offline or empty, falling back to static siteConfig:', error);
  }

  // Fallback to static config
  return {
    ...staticConfig,
    socialLinks: {
      instagram: 'https://instagram.com/hawkmotortr',
      tiktok: 'https://tiktok.com/@hawkmotortr'
    },
    aboutText: 'HAWK MOTOR, 2018 yılından bu yana Beşiktaş, İstanbul showroomunda premium motosikletlerin tedariğini yapmaktadır.',
    contactText: 'Sorularınız, iş birlikleri veya showroom ziyaret talepleriniz için bize e-posta veya telephone ile ulaşabilirsiniz.',
    email: 'info@hawkmotor.com',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.9713180424564!2d29.006935276550792!3d41.04752831732959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a224ba4609%3A0x633bd2f3922d0cfb!2sBarbaros%20Blv.%2C%20Be%C5%9Fikta%C5%9F%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1717234850000!5m2!1str!2str',
    kullaniciText: '',
    gizlilikText: '',
    kvkkText: '',
    mesafeliText: '',
    hukukText: '',
    aboutTitle: 'BİZ KİMİZ?',
    aboutDesc: 'HAWK MOTOR, yüksek performanslı premium motosikletler için kurulan seçkin bir merkezdir.',
    aboutValues: '[]',
    aboutMilestones: '[]',
    sparePartsActive: false,
    bankPaymentsActive: true,
    showProductPrices: true,
  };
}

// ==========================================
// 2. PAYMENT CONFIGS REPOSITORY
// ==========================================

export async function getDbPaymentSettings() {
  try {
    const pay = await db.paymentSetting.findUnique({
      where: { id: 'global-payment' },
    });
    if (pay) {
      return {
        bankName: pay.bankName,
        branch: pay.branch,
        accountHolder: pay.accountHolder,
        iban: pay.iban,
        description: pay.description,
        cardPaymentsActive: pay.cardPaymentsActive,
        bankPaymentsActive: pay.bankPaymentsActive !== false,
      };
    }
  } catch (error) {
    console.warn('Database payment configs query failed, using static fallback:', error);
  }

  // Fallback
  return {
    ...staticConfig.bankDetails,
    description: 'Havale veya FAST işlemlerinizde alıcı ünvanını eksiksiz girmeniz ve açıklama kısmına sipariş onay kodunu yazmanız rica olunur.',
    cardPaymentsActive: false,
    bankPaymentsActive: true,
  };
}

// ==========================================
// 3. MOTORCYCLES REPOSITORY
// ==========================================

export async function getDbMotorcycles() {
  try {
    const list = await db.motorcycle.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    if (list.length > 0) {
      return list.map((m) => {
        let specs = {};
        let gallery = [m.image];
        try {
          specs = JSON.parse(m.specs || '{}');
        } catch (e) {}
        try {
          if (m.gallery) gallery = JSON.parse(m.gallery);
        } catch (e) {}

        return {
          id: m.id,
          name: m.name,
          brand: m.brand,
          model: m.model,
          cc: m.cc,
          year: m.year,
          price: m.price,
          status: m.status as any,
          stock: m.stock as any,
          image: m.image,
          gallery,
          shortDesc: m.shortDesc,
          description: m.description,
          specs,
          km: m.km,
          condition: m.condition,
          documentStatus: m.documentStatus,
          isFeatured: m.isFeatured,
          isCampaign: m.isCampaign,
        };
      });
    }
  } catch (error) {
    console.warn('Failed to query db motorcycles, using static catalog:', error);
  }

  // Fallback
  return staticMotors;
}

// ==========================================
// 4. SPARE PARTS REPOSITORY
// ==========================================

export async function getDbSpareParts() {
  try {
    const list = await db.sparePart.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    if (list.length > 0) {
      return list.map((p) => {
        let gallery = [p.image];
        let compatibleModels = [];
        try {
          if (p.gallery) gallery = JSON.parse(p.gallery);
        } catch (e) {}
        try {
          if (p.compatibleModels) compatibleModels = JSON.parse(p.compatibleModels);
        } catch (e) {}

        return {
          id: p.id,
          name: p.name,
          brand: p.brand,
          category: p.category as any,
          price: p.price,
          stock: p.stock as any,
          image: p.image,
          gallery,
          shortDesc: p.shortDesc,
          description: p.description,
          specs: {},
          compatibleModels,
          isFeatured: p.isFeatured,
          isCampaign: p.isCampaign,
        };
      });
    }
  } catch (error) {
    console.warn('Failed to query db spare parts, using static catalog:', error);
  }

  // Fallback
  return staticParts;
}

// ==========================================
// 5. UNIFIED PRODUCT GETTER (BY ID)
// ==========================================

export async function getDbProduct(id: string) {
  try {
    // 1. Check if it's a motorcycle in DB
    const m = await db.motorcycle.findUnique({ where: { id } });
    if (m) {
      let specs = {};
      let gallery = [m.image];
      try {
        specs = JSON.parse(m.specs || '{}');
      } catch (e) {}
      try {
        if (m.gallery) gallery = JSON.parse(m.gallery);
      } catch (e) {}

      return {
        id: m.id,
        name: m.name,
        brand: m.brand,
        model: m.model,
        cc: m.cc,
        year: m.year,
        price: m.price,
        status: m.status as any,
        stock: m.stock as any,
        image: m.image,
        gallery,
        shortDesc: m.shortDesc,
        description: m.description,
        specs,
        isMotor: true,
      };
    }

    // 2. Check if it's a spare part in DB
    const p = await db.sparePart.findUnique({ where: { id } });
    if (p) {
      let gallery = [p.image];
      let compatibleModels = [];
      try {
        if (p.gallery) gallery = JSON.parse(p.gallery);
      } catch (e) {}
      try {
        if (p.compatibleModels) compatibleModels = JSON.parse(p.compatibleModels);
      } catch (e) {}

      return {
        id: p.id,
        name: p.name,
        brand: p.brand,
        category: p.category as any,
        price: p.price,
        stock: p.stock as any,
        image: p.image,
        gallery,
        shortDesc: p.shortDesc,
        description: p.description,
        specs: {},
        compatibleModels,
        isMotor: false,
      };
    }
  } catch (error) {
    console.warn(`Database product query failed for id ${id}, using static fallback:`, error);
  }

  // 3. Fallback to static catalogs
  const motor = staticMotors.find((item) => item.id === id);
  if (motor) return { ...motor, isMotor: true };

  const part = staticParts.find((item) => item.id === id);
  if (part) return { ...part, isMotor: false };

  return null;
}

// ==========================================
// 6. LIVE SUPPORT CHAT CONFIGS REPOSITORY
// ==========================================

export async function getDbLiveSupportSettings() {
  try {
    const chat = await db.liveSupportSetting.findUnique({
      where: { id: 'global-livesupport' },
    });
    if (chat) {
      return {
        aiActive: chat.aiActive,
        aiName: chat.aiName || 'HAWK AI',
        maintenanceMessage: chat.maintenanceMessage,
        whatsappMessage: chat.whatsappMessage,
      };
    }
  } catch (error) {
    console.warn('Database chatbot configs query failed, using standard defaults:', error);
  }

  // Fallback defaults
  return {
    aiActive: true,
    aiName: 'HAWK AI',
    maintenanceMessage: 'Yapay zekâ destek sistemi şu anda bakım aşamasındadır. En hızlı destek için WhatsApp üzerinden bize ulaşabilirsiniz.',
    whatsappMessage: 'Merhaba HAWK MOTOR, Yapay Zekâ asistanı üzerinden ulaşıyorum. Canlı satış temsilcisi ile görüşebilir miyim?',
  };
}

// ==========================================
// 7. LEGAL DOCUMENTS REPOSITORY
// ==========================================

export async function getDbLegalDocuments() {
  try {
    const list = await db.legalDocument.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    return list;
  } catch (error) {
    console.warn('Failed to query db legal documents:', error);
    return [];
  }
}

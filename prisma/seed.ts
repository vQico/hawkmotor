import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { motorcycles as staticMotors, spareParts as staticParts } from '../src/config/site';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding HAWK MOTOR database...');

  // 1. Clear existing data
  await prisma.adminUser.deleteMany({});
  await prisma.motorcycle.deleteMany({});
  await prisma.sparePart.deleteMany({});
  await prisma.paymentSetting.deleteMany({});
  await prisma.liveSupportSetting.deleteMany({});
  await prisma.siteSetting.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.brand.deleteMany({});
  await prisma.analyticsLog.deleteMany({});
  await prisma.legalDocument.deleteMany({});

  // 2. Create Default Admin User
  const hashedPassword = bcrypt.hashSync('HawkMotor2026!', 10);
  const admin = await prisma.adminUser.create({
    data: {
      email: 'admin@hawkmotor.com',
      password: hashedPassword,
      name: 'HAWK Admin',
    },
  });
  console.log(`- Admin User created: ${admin.email}`);

  // 3. Create Categories
  const categories = [
    { name: 'Motosikletler', slug: 'motosikletler', order: 1 },
    { name: 'Yedek Parça', slug: 'yedek-parca', order: 2 },
    { name: 'Aksesuar', slug: 'aksesuar', order: 3 },
    { name: 'Koruma Ekipmanları', slug: 'koruma-ekipmanlari', order: 4 },
    { name: 'Bakım Ürünleri', slug: 'bakim-urunleri', order: 5 },
  ];

  for (const cat of categories) {
    await prisma.category.create({ data: cat });
  }
  console.log('- Categories seeded.');

  // 4. Create Brands
  const brands = [
    'Ducati', 'BMW', 'KTM', 'Yamaha', 'Honda', 
    'Kawasaki', 'Suzuki', 'CFMOTO', 'RKS', 
    'QJ Motor', 'Benelli', 'Voge', 'Harley-Davidson', 'Kuba'
  ];

  const brandMap: Record<string, string> = {};
  for (const b of brands) {
    const created = await prisma.brand.create({ data: { name: b } });
    brandMap[b] = created.id;
  }
  console.log('- Brands seeded.');

  // 5. Seed Payment Settings
  await prisma.paymentSetting.create({
    data: {
      id: 'global-payment',
      bankName: 'Türkiye İş Bankası',
      branch: 'Beşiktaş Ticari Şubesi (1234)',
      accountHolder: 'HAWK MOTOR SANAYİ VE TİCARET A.Ş.',
      iban: 'TR98 0006 2000 0001 2345 6789 01',
      description: 'Havale veya FAST işlemlerinizde alıcı ünvanını eksiksiz girmeniz ve açıklama kısmına sipariş onay kodunu yazmanız rica olunur.',
      cardPaymentsActive: false,
      bankPaymentsActive: true,
    },
  });
  console.log('- Payment settings seeded.');

  // 6. Seed Live Support Settings
  await prisma.liveSupportSetting.create({
    data: {
      id: 'global-livesupport',
      aiActive: true,
      aiName: 'HAWK AI',
      maintenanceMessage: 'Yapay zekâ destek sistemi şu anda bakım aşamasındadır. En hızlı destek için WhatsApp üzerinden bize ulaşabilirsiniz.',
      whatsappMessage: 'Merhaba HAWK MOTOR, Yapay Zekâ asistanı üzerinden ulaşıyorum. Canlı satış temsilcisi ile görüşebilir miyim?',
    },
  });
  console.log('- Live support settings seeded.');

  // 7. Seed Site Settings
  await prisma.siteSetting.create({
    data: {
      id: 'global-setting',
      siteName: 'HAWK MOTOR',
      heroTitle: 'Türkiye’nin Premium Motosiklet Merkezi',
      heroDescription: 'Lüks motosiklet markaları ve seçkin sürücü ekipmanlarında Türkiye\'nin rakipsiz premium noktası.',
      slogan: 'PREMIUM HUB',
      phone: '0212 900 8989',
      phoneFormatted: '+902129008989',
      whatsapp: '0532 900 8989',
      whatsappFormatted: '905329008989',
      address: 'Barbaros Bulvarı No: 89, Beşiktaş, İstanbul',
      workingHours: JSON.stringify([
        { days: 'Pazartesi - Cuma', hours: '09:00 - 19:00' },
        { days: 'Cumartesi', hours: '10:00 - 17:00' },
        { days: 'Pazar', hours: 'Kapalı' }
      ]),
      socialLinks: JSON.stringify({
        instagram: 'https://instagram.com/hawkmotortr',
        tiktok: 'https://tiktok.com/@hawkmotortr'
      }),
      footerText: 'Türkiye genelinde premium motosiklet tedariğinde rakipsiz lider. En lüks markalar ve en üstün hizmet kalitesi ile yoldaki gücünüz.',
      aboutText: 'HAWK MOTOR, 2018 yılından bu yana Beşiktaş, İstanbul showroomunda premium motosikletlerin tedariğini yapmaktadır.',
      contactText: 'Sorularınız, iş birlikleri veya showroom ziyaret talepleriniz için bize e-posta veya telephone ile ulaşabilirsiniz.',
      showProductPrices: true,
      sparePartsActive: false,
    },
  });
  console.log('- Site settings seeded.');

  // 8. Seed Initial Motorcycles
  console.log('- Seeding motorcycles from static catalog...');
  const addedModels = new Set<string>();
  for (const m of staticMotors) {
    const specsObj = m.specs || {};
    const modelName = m.name.replace(m.brand, '').trim();
    const brandId = brandMap[m.brand];
    
    if (brandId) {
      const modelKey = `${modelName}_${brandId}`;
      if (!addedModels.has(modelKey)) {
        await prisma.brandModel.create({
          data: {
            name: modelName,
            brandId: brandId
          }
        });
        addedModels.add(modelKey);
      }
    }
    
    await prisma.motorcycle.create({
      data: {
        id: m.id,
        name: m.name,
        brand: m.brand,
        model: modelName,
        year: m.year,
        cc: m.cc,
        km: 0,
        condition: 'SIFIR',
        documentStatus: 'Ruhsatı Hazır',
        price: m.price,
        stock: m.stock,
        shortDesc: m.shortDesc,
        description: m.description,
        specs: JSON.stringify(specsObj),
        image: m.image,
        gallery: JSON.stringify(m.gallery),
        status: m.status,
        isFeatured: m.status === 'Kampanyalı' || m.id.includes('v4s') || m.id.includes('rr') || m.id.includes('h2r') || m.id.includes('hayabusa') || m.id.includes('world-raid') || m.id.includes('diavel'),
        isCampaign: m.status === 'Kampanyalı',
        isActive: true,
        order: 0,
      },
    });
  }
  console.log(`- ${staticMotors.length} Motorcycles seeded.`);

  // 9. Seed Initial Spare Parts
  console.log('- Seeding spare parts from static catalog...');
  for (const p of staticParts) {
    await prisma.sparePart.create({
      data: {
        id: p.id,
        name: p.name,
        brand: p.brand,
        category: p.category,
        price: p.price,
        stock: p.stock,
        shortDesc: p.shortDesc,
        description: p.description,
        image: p.image,
        gallery: JSON.stringify(p.gallery),
        compatibleModels: JSON.stringify((p as any).compatibleModels || []),
        isFeatured: p.id.includes('kaliper') || p.id.includes('lastik') || p.id.includes('egzoz'),
        isCampaign: false,
        isActive: true,
        order: 0,
      },
    });
  }
  console.log(`- ${staticParts.length} Spare parts seeded.`);

  // 10. Seed Default Legal Documents
  const legalDocsData = [
    {
      slug: 'kullanici-sozlesmesi',
      title: 'Kullanıcı Sözleşmesi',
      order: 1,
      content: `1. Giriş ve Taraflar
Bu Kullanıcı Sözleşmesi ("Sözleşme"), HAWK MOTOR SANAYİ VE TİCARET A.Ş. ("HAWK MOTOR") ile bu web sitesini ("Site") ziyaret eden, alışveriş yapan ve hizmetlerden faydalanan tüm internet kullanıcıları ("Kullanıcı" veya "Müşteri") arasında akdedilmiştir. Siteye erişim sağlamakla bu sözleşmedeki tüm şartları peşinen kabul etmiş bulunmaktasınız.

2. Site Kullanım Kuralları ve Telif Hakları
Site üzerinde yer alan tüm görsel tasarımlar, özgün motosiklet görselleri, yedek parça verileri, teknik tablolar, yazılı metinler ve kod altyapısı HAWK MOTOR'a ait fikri mülkiyet haklarıdır. Siteden bilgi kopyalamak, görselleri sunucularına indirmek, yazılımları tersine mühendislik yöntemleriyle incelemek, sağ tık menüsünü devre dışı bırakan korumaları aşmak veya F12 gibi geliştirici araçlarıyla veri kazımak kesinlikle yasaktır. Bu tür girişimler tespit edildiğinde 5846 sayılı Fikir ve Sanat Eserleri Kanunu uyarınca yasal işlem başlatılır.

3. Sorumluluk Sınırları
HAWK MOTOR, e-ticaret sisteminin 7/24 kesintisiz çalışması için en yüksek düzeyde teknik altyapı sağlamaktadır. Ancak servis sağlayıcılarından kaynaklanan genel internet kesintileri, sunucu bakımları veya siber saldırılar nedeniyle oluşabilecek geçici kesintilerden HAWK MOTOR sorumlu tutulamaz. Fiyatlandırma hatalarında HAWK MOTOR, siparişi iptal edip ücreti iade etme hakkını saklı tutar.

4. Hesap Güvenliği
Müşterilerimiz ödeme ve sipariş süreçlerinde verdikleri tüm bilgilerin doğruluğundan bizzat sorumludur. Yanıltıcı bilgi girilmesinden doğacak gecikmeler veya yasal sorumluluklar tamamen kullanıcıya aittir.`
    },
    {
      slug: 'gizlilik-politikasi',
      title: 'Gizlilik Politikası',
      order: 2,
      content: `1. Toplanan Bilgiler ve Amaçları
HAWK MOTOR, e-ticaret sitemiz üzerinden verilen siparişlerin işleme alınması, teslimat (ahşap kasalı nakliye / kargo) işlemlerinin gerçekleştirilmesi, faturalandırma süreçlerinin tamamlanması ve müşteri memnuniyetinin en üst seviyede tutulması amacıyla ad-soyad, telefon numarası, e-posta, teslimat adresi ve ödeme detaylarını toplamaktadır.

2. Veri Güvenliği ve SSL Şifreleme
Sitemizde toplanan tüm kişisel veriler, en yüksek güvenlikli sunucularda saklanmaktadır. Ödeme sayfalarında kullanılan kart bilgileri doğrudan banka POS sistemlerine iletilmekte olup, sitemiz altyapısında kesinlikle kredi kartı şifre veya kart numarası saklanmamaktadır. Veri iletimi 256-bit SSL şifreleme sertifikası ile korunmaktadır.

3. Çerezler (Cookies) Politikası
Müşterilerimize daha kişiselleştirilmiş bir e-ticaret deneyimi sunabilmek ve Google Ads dönüşüm kampanyalarının doğruluğunu ölçmek adına sitemizde çerezler kullanılmaktadır. Çerezler, tarayıcınızın geçici hafızasında saklanan ve kişisel veri içermeyen dosyalardır. Dilediğiniz zaman tarayıcı ayarlarınızdan çerezleri engelleyebilirsiniz.

4. Bilgilerin Paylaşımı
Kişisel verileriniz, yasal zorunluluklar ve mahkeme kararları hariç olmak üzere, teslimatı gerçekleştiren sigortalı lojistik ortaklarımız ve anlaşmalı kargo firmaları dışında hiçbir üçüncü şahıs veya kurumla kesinlikle paylaşılmamaktadır.`
    },
    {
      slug: 'kvkk-aydinlatma-metni',
      title: 'KVKK Aydınlatma Metni',
      order: 3,
      content: `1. Veri Sorumlusu
6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla Barbaros Bulvarı No: 89, Beşiktaş, İstanbul adresinde mukim HAWK MOTOR SANAYİ VE TİCARET A.Ş. tarafından aşağıda açıklanan kapsamda işlenmektedir.

2. Kişisel Verilerin İşlenme Amacı
Kişisel verileriniz KVKK'nın 5. ve 6. maddelerinde belirtilen şartlar dahilinde:
- Sözleşmesel yükümlülüklerimizin (motosiklet teslimatı, garanti süreçleri vb.) yerine getirilmesi,
- Finans ve muhasebe işlerinin (fatura düzenleme, FAST transfer kontrolü vb.) yürütülmesi,
- Müşteri taleplerinin takibi ve yapay zekâ asistanı veya WhatsApp destek kanalları üzerinden çözümlenmesi,
- Kanuni yükümlülüklerimizin (5651 sayılı kanun kapsamındaki log kayıtları vb.) yerine getirilmesi amacıyla işlenmektedir.

3. İlgili Kişi Olarak Haklarınız
KVKK'nın 11. maddesi uyarınca veri sahibi olarak HAWK MOTOR'a başvurarak; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacına uygun kullanılıp kullanılmadığını öğrenme, eksik veya yanlış işlenmişse düzeltilmesini isteme ve verilerinizin silinmesini talep etme haklarına sahipsiniz. Başvurularınızı yazılı olarak veya kayıtlı elektronik posta (KEP) adresimiz üzerinden info@hawkmotor.com.tr adresine iletebilirsiniz.`
    },
    {
      slug: 'mesafeli-satis-sozlesmesi',
      title: 'Mesafeli Satış Sözleşmesi',
      order: 4,
      content: `Madde 1 - Taraflar
Satıcı: HAWK MOTOR SANAYİ VE TİCARET A.Ş.
Adres: Barbaros Bulvarı No: 89, Beşiktaş, İstanbul
Telefon: 0212 900 8989
E-posta: info@hawkmotor.com

Alıcı: Siteden sipariş veren ve ödeme yapan müşteri.

Madde 2 - Sözleşme Konusu Ürünler
Sözleşmenin konusu, Alıcı'nın Satıcı'ya ait web sitesinden siparişini verdiği motosiklet veya orijinal yedek parçaların özellikleri, satış bedeli, teslimat şartları ve ödeme yöntemlerine ilişkin 6502 sayılı Tüketicinin Korunması Hakkında Kanu ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.

Madde 3 - Teslimat, Kasko ve Sigorta Şartları (Zorunlu)
HAWK MOTOR bünyesinde satışı ve nakliyesi gerçekleştirilen tüm premium motosikletlerin ve yüksek değerli yedek parçaların sevkıyat güvenliği için kasko ve taşımacılık sigortası yaptırılması zorunludur. Motosiklet siparişleri, HAWK MOTOR'a özel kapalı çelik/ahşap konstrüksiyonlu lojistik sandıklarıyla, tam kapsamlı lojistik sigortası ve sevkiyat kaskosu kapsamında hasarsız teslimat garantisi ile Alıcı'nın adresine sevk edilmektedir. Sevkiyat esnasında oluşabilecek tüm olası hasarlar sigorta ve kasko güvencesiyle %100 teminat altındadır.

Madde 4 - Cayma Hakkı
Müşteri, orijinal paketi açılmamış, kullanılmamış ve montajı yapılmamış yedek parçalar için 14 gün içinde hiçbir gerekçe göstermeksizin cayma hakkına sahiptir. Ancak, tescil işlemleri (plaka, ruhsat çıkarılması) tamamlanmış veya trafiğe çıkış işlemleri yapılmış motosikletlerde, ürünün niteliği ve mevzuat gereği cayma hakkı kullanılamaz.

Madde 5 - Uyuşmazlıklar
Sözleşmenin uygulanma sürecinde çıkabilecek tüm ihtilaflarda İstanbul (Çağlayan) Tüketici Mahkemeleri ve İcra Daireleri yetkilidir.`
    },
    {
      slug: 'hukuk-musavirligi',
      title: 'Hukuk Müşavirliği & Büro',
      order: 5,
      content: `HAWK MOTOR SANAYİ VE TİCARET A.Ş.'nin tüm yerel ve uluslararası ticari ilişkileri, müşteri sözleşmeleri, KVKK uyumluluk süreçleri ile telif/marka hakları koruma faaliyetleri, Türkiye'nin köklü hukuk kurumlarından Demir & Hukuk Ortaklığı tarafından yürütülmektedir.

Resmi Hukuki Temsilci:
Av. Caner Demir (İstanbul Barosu - Sicil No: 45291)
Adres: Büyükdere Caddesi, No: 193, Levent, Beşiktaş, İstanbul
E-posta: hukuk@hawkmotor.com.tr
Telefon: 0 (212) 998 42 00

Hukuki Faaliyet ve Yetki Alanları:
- Sözleşmeler Hukuku: HAWK MOTOR tarafından hazırlanan Kullanıcı Sözleşmesi, Mesafeli Satış Sözleşmesi ve ticari tedarik anlaşmalarının mevzuata tam uyumluluğu.
- Fikri Mülkiyet Haklarının Korunması: HAWK MOTOR logosunun, web sitesi tasarımlarının, yazılımsal kodların, motor görsellerinin ve ürün teknik verilerinin izinsiz kopyalanması, sahte sosyal medya hesapları veya taklit siteler ile haksız rekabet oluşturulması durumunda cezai ve hukuki işlemlerin başlatılması.
- Tüketici Hukuku: 6502 sayılı Tüketicinin Korunması Hakkında Kanun uyarınca, tüketicilerle kurulacak hukuki ilişkilerin ve uyuşmazlık çözümlerinin takibi.
- KVKK & Veri Güvenliği Denetimi: Kişisel Verilerin Korunması Kanunu kapsamında sunucu altyapılarımızın, veri saklama koşullarımızın ve pazarlama çerezlerinin denetlenmesi.`
    }
  ];

  for (const doc of legalDocsData) {
    await prisma.legalDocument.create({ data: doc });
  }
  console.log('- Legal documents seeded.');

  console.log('HAWK MOTOR database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

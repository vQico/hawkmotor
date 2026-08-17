export interface Motorcycle {
  id: string;
  name: string;
  brand: string;
  cc: number;
  year: number;
  price: number; // in TRY
  status: 'Sıfır' | 'Kampanyalı' | 'Premium';
  stock: 'Stokta Var' | 'Sınırlı Stok' | 'Tükendi';
  image: string;
  gallery: string[];
  shortDesc: string;
  description: string;
  specs: {
    motorType: string;
    power: string;
    torque: string;
    weight: string;
    seatHeight: string;
    fuelCapacity: string;
  };
}

export interface SparePart {
  id: string;
  name: string;
  category: 'Fren' | 'Lastik' | 'Zincir' | 'Elektrik' | 'Bakım Ürünleri' | 'Aksesuar';
  brand: string;
  price: number; // in TRY
  stock: 'Stokta Var' | 'Sınırlı Stok' | 'Tükendi';
  image: string;
  gallery: string[];
  shortDesc: string;
  description: string;
  specs: Record<string, string>;
}

export const siteConfig = {
  name: 'HAWK MOTOR',
  title: 'HAWK MOTOR | Türkiye\'nin Premium Motosiklet Merkezi',
  description: 'Türkiye geneline hizmet veren premium seviyede modern, hızlı ve yüksek dönüşüm odaklı profesyonel motosiklet ve seçkin ekipman platformu.',
  phone: '0212 900 8989',
  phoneFormatted: '+902129008989',
  whatsapp: '0532 900 8989',
  whatsappFormatted: '905329008989',
  email: 'info@hawkmotor.com.tr',
  address: 'Barbaros Bulvarı No: 89, Beşiktaş, İstanbul',
  workingHours: [
    { days: 'Pazartesi - Cuma', hours: '09:00 - 19:00' },
    { days: 'Cumartesi', hours: '10:00 - 17:00' },
    { days: 'Pazar', hours: 'Kapalı' }
  ],
  bankDetails: {
    bankName: 'Türkiye İş Bankası',
    branch: 'Beşiktaş Ticari Şubesi (1234)',
    accountHolder: 'HAWK MOTOR SANAYİ VE TİCARET A.Ş.',
    iban: 'TR98 0006 2000 0001 2345 6789 01',
  },
  seoKeywords: [
    'motosiklet satışı',
    'motosiklet satış Türkiye',
    'motosiklet ekipmanları',
    'motor aksesuar',
    'lüks motosiklet',
    'Türkiye motosiklet satış',
    'HAWK MOTOR',
    'premium motosiklet',
    'ducati türkiye',
    'bmw motorrad'
  ]
};

export const motorcycles: Motorcycle[] = [
  {
    id: 'ducati-panigale-v4s',
    name: 'Ducati Panigale V4 S',
    brand: 'Ducati',
    cc: 1103,
    year: 2024,
    price: 1850000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Pist teknolojisinin sokakla buluştuğu nokta. 215.5 beygirlik saf adrenalin.',
    description: 'Ducati Panigale V4 S, İtalyan mühendisliğinin ve yarış dünyasının zirvesini temsil eder. MotoGP teknolojisinden türetilen Desmosedici Stradale V4 motoru, Öhlins elektronik süspansiyonları ve gelişmiş aerodinamik kanatçıkları ile hem pistte hem de yolda rakipsiz bir performans sunar.',
    specs: {
      motorType: 'Desmosedici Stradale 90° V4, 4 supaplı, sıvı soğutmalı',
      power: '215.5 HP @ 13,000 d/d',
      torque: '123.6 Nm @ 9,500 d/d',
      weight: '174 kg (kuru ağırlık)',
      seatHeight: '850 mm',
      fuelCapacity: '17 Litre'
    }
  },
  {
    id: 'ducati-multistrada-v4-pikes-peak',
    name: 'Ducati Multistrada V4 Pikes Peak',
    brand: 'Ducati',
    cc: 1158,
    year: 2026,
    price: 2100000,
    status: 'Sıfır',
    stock: 'Sınırlı Stok',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Bir macera motosikletinde süper spor ruhu. Öhlins süspansiyon ve 17 inç ön jant.',
    description: 'Multistrada V4 Pikes Peak, spor ve gezi konseptlerini benzersiz bir yarış tasarımı altında birleştirir. 170 beygirlik V4 Granturismo motoru ve MotoGP renk şeması ile asfaltın en hızlı macera makinesidir.',
    specs: {
      motorType: 'V4 Granturismo, sıvı soğutmalı, silindir başına 4 supap',
      power: '170 HP @ 10,500 d/d',
      torque: '125 Nm @ 8,750 d/d',
      weight: '214 kg (kuru ağırlık)',
      seatHeight: '840 mm',
      fuelCapacity: '22 Litre'
    }
  },
  {
    id: 'ducati-monster-937',
    name: 'Ducati Monster 937',
    brand: 'Ducati',
    cc: 937,
    year: 2024,
    price: 780000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Hafif, kompakt ve maksimum eğlence odaklı spor naked efsanesi.',
    description: 'Yeni nesil Monster, kafes şasiden alüminyum ön şasiye geçerek ağırlığını radikal ölçüde azaltmıştır. 937 cc Testastretta 11° motoru ile şehir içi ve virajlı dağ yollarında saf sürüş zevki sunar.',
    specs: {
      motorType: 'Testastretta 11° V2, silindir başına 4 supap, sıvı soğutmalı',
      power: '111 HP @ 9,250 d/d',
      torque: '93 Nm @ 6,500 d/d',
      weight: '166 kg (kuru ağırlık)',
      seatHeight: '820 mm',
      fuelCapacity: '14 Litre'
    }
  },
  {
    id: 'ducati-diavel-v4',
    name: 'Ducati Diavel V4',
    brand: 'Ducati',
    cc: 1158,
    year: 2024,
    price: 1450000,
    status: 'Kampanyalı',
    stock: 'Sınırlı Stok',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Kaslı cruiser tasarımı ile süper spor performansının benzersiz birleşimi.',
    description: 'Granturismo V4 motoru ile güçlendirilen Diavel V4, kaslı duruşu, nefes kesen hızlanması ve şaşırtıcı viraj kabiliyeti ile cruiser segmentinde kuralları yeniden yazıyor.',
    specs: {
      motorType: 'V4 Granturismo, sıvı soğutmalı, silindir başına 4 supap',
      power: '168 HP @ 10,750 d/d',
      torque: '126 Nm @ 7,500 d/d',
      weight: '211 kg (kuru ağırlık)',
      seatHeight: '790 mm',
      fuelCapacity: '20 Litre'
    }
  },
  {
    id: 'bmw-s1000rr',
    name: 'BMW S 1000 RR',
    brand: 'BMW',
    cc: 999,
    year: 2024,
    price: 1650000,
    status: 'Kampanyalı',
    stock: 'Sınırlı Stok',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Daha hızlı, daha dinamik ve tamamen kontrol edilebilir süper spor lideri.',
    description: 'BMW S 1000 RR, BMW ShiftCam teknolojisine sahip motoruyla her devir aralığında maksimum tork ve yüksek güç üretir. Yenilenen aerodinamik kanatları (winglets) ve gelişmiş sürüş destek sistemleri ile virajları fethetmek için üretilmiştir.',
    specs: {
      motorType: 'Sıralı 4 silindirli, 4 zamanlı, sıvı soğutmalı, ShiftCam',
      power: '210 HP @ 13,750 d/d',
      torque: '113 Nm @ 11,000 d/d',
      weight: '197 kg (ıslak ağırlık)',
      seatHeight: '824 mm',
      fuelCapacity: '16.5 Litre'
    }
  },
  {
    id: 'bmw-r1250gs-adventure',
    name: 'BMW R 1250 GS Adventure',
    brand: 'BMW',
    cc: 1254,
    year: 2024,
    price: 1320000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Dünyayı keşfetmek isteyenler için konfor, güç ve durdurulamaz GS ruhu.',
    description: 'BMW R 1250 GS Adventure, ShiftCam özellikli boxer motoru, devasa yakıt tankı ve mükemmel şasi stabilitesi ile en zorlu arazi rotalarından kıtalararası otoyollara kadar dünyanın her yerini fethedecek güçtedir.',
    specs: {
      motorType: 'Çift silindirli Boxer, 4 zamanlı, ShiftCam, sıvı/hava soğutmalı',
      power: '136 HP @ 7,750 d/d',
      torque: '143 Nm @ 6,250 d/d',
      weight: '268 kg (ıslak ağırlık)',
      seatHeight: '890 / 910 mm',
      fuelCapacity: '30 Litre'
    }
  },
  {
    id: 'bmw-m1000rr',
    name: 'BMW M 1000 RR',
    brand: 'BMW',
    cc: 999,
    year: 2026,
    price: 2450000,
    status: 'Sıfır',
    stock: 'Sınırlı Stok',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'WSBK onaylı yarış genleri. Karbon kaplamalar ve 212 beygirlik pist canavarı.',
    description: 'BMW M departmanının ürettiği ilk iki tekerlekli şaheser. Saf karbon fiber aero winglets, titanyum egzoz sistemi ve M yarış frenleri ile doğrudan WSBK yarış pistlerinden yollara inmiştir.',
    specs: {
      motorType: 'Sıralı 4 silindirli, sıvı soğutmalı, M titanyum supaplı',
      power: '212 HP @ 14,500 d/d',
      torque: '113 Nm @ 11,000 d/d',
      weight: '192 kg (ıslak ağırlık)',
      seatHeight: '832 mm',
      fuelCapacity: '16.5 Litre'
    }
  },
  {
    id: 'bmw-rninet',
    name: 'BMW R nineT Roadster',
    brand: 'BMW',
    cc: 1170,
    year: 2024,
    price: 950000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Klasik roadster tasarımı ve efsanevi hava soğutmalı Boxer karakteri.',
    description: 'Modern mühendisliğin klasik tasarım hatlarıyla buluştuğu nokta. R nineT, hava/yağ soğutmalı boxer motoru, çift egzoz çıkışı ve kişiselleştirmeye son derece uygun yapısı ile bir hayat tarzıdır.',
    specs: {
      motorType: 'İki silindirli Boxer, 4 zamanlı, hava/yağ soğutmalı',
      power: '109 HP @ 7,250 d/d',
      torque: '116 Nm @ 6,000 d/d',
      weight: '221 kg (ıslak ağırlık)',
      seatHeight: '805 mm',
      fuelCapacity: '17 Litre'
    }
  },
  {
    id: 'ktm-1290-super-duke-r',
    name: 'KTM 1290 Super Duke R Evo',
    brand: 'KTM',
    cc: 1301,
    year: 2023,
    price: 1420000,
    status: 'Sıfır',
    stock: 'Sınırlı Stok',
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: '"The Beast" lakaplı, vahşi torkuyla asfalta hükmeden hiper-naked canavarı.',
    description: 'KTM 1290 Super Duke R Evo, yarı aktif WP APEX süspansiyon teknolojisi ve 1301 cc V-Twin motoruyla saf tork ve eşsiz bir naked deneyimi sunar. Agresif tasarımı ve üst düzey elektronik donanımları ile rakipsizdir.',
    specs: {
      motorType: '2 silindirli, 4 zamanlı, V 75°, sıvı soğutmalı',
      power: '180 HP @ 9,500 d/d',
      torque: '140 Nm @ 8,000 d/d',
      weight: '189 kg (kuru ağırlık)',
      seatHeight: '835 mm',
      fuelCapacity: '16 Litre'
    }
  },
  {
    id: 'ktm-1290-super-adventure-s',
    name: 'KTM 1290 Super Adventure S',
    brand: 'KTM',
    cc: 1301,
    year: 2024,
    price: 1280000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Kusursuz arazi ve cadde dinamiklerini birleştiren teknolojik seyahat canavarı.',
    description: 'Radar destekli adaptif hız sabitleyici (ACC), yarı aktif süspansiyonları ve 160 beygirlik V-Twin motoru ile KTM 1290 Super Adventure S, en uzun rotalarda bile rakipsiz bir sürüş dinamiği sunar.',
    specs: {
      motorType: '2 silindirli, 4 zamanlı, V 75°, sıvı soğutmalı',
      power: '160 HP @ 9,000 d/d',
      torque: '138 Nm @ 6,500 d/d',
      weight: '220 kg (kuru ağırlık)',
      seatHeight: '849 mm',
      fuelCapacity: '23 Litre'
    }
  },
  {
    id: 'yamaha-yzf-r1',
    name: 'Yamaha YZF-R1M',
    brand: 'Yamaha',
    cc: 998,
    year: 2024,
    price: 1750000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'M1 MotoGP motorundan ilham alan karbon fiber gövdeli yarış makinesi.',
    description: 'Yamaha YZF-R1M, karbon fiber gövdesi, Öhlins Elektronik Yarış Süspansiyonu (ERS) ve gelişmiş CCU veri toplama sistemi ile fabrikasyon bir yarış motosikletidir. Crossplane motoru karakteristik sesi ve inanılmaz yüksek devir gücü sağlar.',
    specs: {
      motorType: 'Sıralı 4 silindirli, sıvı soğutmalı, 4 zamanlı, DOHC',
      power: '200 HP @ 13,500 d/d',
      torque: '113.3 Nm @ 11,500 d/d',
      weight: '202 kg (ıslak ağırlık)',
      seatHeight: '860 mm',
      fuelCapacity: '17 Litre'
    }
  },
  {
    id: 'yamaha-tenere-700-world-raid',
    name: 'Yamaha Tenere 700 World Raid',
    brand: 'Yamaha',
    cc: 689,
    year: 2024,
    price: 790000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Çift yakıt deposu ve geliştirilmiş süspansiyonları ile gerçek çöl fatihi.',
    description: 'Yamaha Tenere 700 World Raid, 23 litrelik çift yakıt tankı, yüksek performanslı KYB süspansiyonları, 3 modlu ABS sistemi ve efsanevi CP2 motoru ile uzak ufukları fethetmek üzere tasarlanmıştır.',
    specs: {
      motorType: '2 silindirli, sıvı soğutmalı, 4 zamanlı, DOHC',
      power: '73.4 HP @ 9,000 d/d',
      torque: '68 Nm @ 6,500 d/d',
      weight: '220 kg (ıslak ağırlık)',
      seatHeight: '890 mm',
      fuelCapacity: '23 Litre'
    }
  },
  {
    id: 'yamaha-mt-09-sp',
    name: 'Yamaha MT-09 SP',
    brand: 'Yamaha',
    cc: 890,
    year: 2024,
    price: 680000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Öhlins arka amortisör, özel renk şeması ve karanlığın en vahşi üç silindirlisi.',
    description: 'MT-09 SP, CP3 motorunun patlayıcı gücünü, KYB ve Öhlins süspansiyon sistemlerinin kusursuz kontrolüyle birleştirir. Agresif duruşu ve premium R1M esintili tasarımı ile hiper-naked zirvesidir.',
    specs: {
      motorType: '3 silindirli, sıvı soğutmalı, CP3 teknolojisi',
      power: '119 HP @ 10,000 d/d',
      torque: '93 Nm @ 7,000 d/d',
      weight: '190 kg (ıslak ağırlık)',
      seatHeight: '825 mm',
      fuelCapacity: '14 Litre'
    }
  },
  {
    id: 'honda-crf1100l-africa-twin',
    name: 'Honda CRF1100L Africa Twin Adventure Sports',
    brand: 'Honda',
    cc: 1084,
    year: 2024,
    price: 1150000,
    status: 'Kampanyalı',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Dünyayı keşfetmek isteyenler için konfor, teknoloji ve üstün arazi yeteneği.',
    description: 'Büyük maceralar için tasarlanan Africa Twin Adventure Sports, DCT şanzıman seçeneği, geniş yakıt deposu, üst seviye rüzgar koruması ve Showa EERA elektronik süspansiyonları ile en zorlu arazi koşullarını ve en uzun otoyol rotalarını konforlu hale getirir.',
    specs: {
      motorType: 'Sıralı çift silindirli, 4 zamanlı, 8 supaplı SOHC',
      power: '102 HP @ 7,500 d/d',
      torque: '105 Nm @ 6,250 d/d',
      weight: '238 kg (ıslak ağırlık)',
      seatHeight: '850 - 870 mm (ayarlanabilir)',
      fuelCapacity: '24.8 Litre'
    }
  },
  {
    id: 'honda-cbr1000rr-r-fireblade',
    name: 'Honda CBR1000RR-R Fireblade SP',
    brand: 'Honda',
    cc: 1000,
    year: 2024,
    price: 1780000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'MotoGP RC213V-S mühendisliğinden doğan 217 beygirlik saf yarış odaklı süper spor.',
    description: 'Honda Fireblade SP, HRC (Honda Racing Corporation) teknolojisi, Öhlins akıllı elektronik amortisörleri ve Brembo Stylema fren kaliperleri ile donatılmış, pist rekorlarını altüst etmek için üretilmiş olağanüstü bir yarış makinesidir.',
    specs: {
      motorType: 'Sıralı 4 silindirli, 16 supaplı, DOHC, sıvı soğutmalı',
      power: '217 HP @ 14,500 d/d',
      torque: '113 Nm @ 12,500 d/d',
      weight: '201 kg (ıslak ağırlık)',
      seatHeight: '830 mm',
      fuelCapacity: '16.1 Litre'
    }
  },
  {
    id: 'honda-goldwing-tour',
    name: 'Honda GL1800 Gold Wing Tour DCT',
    brand: 'Honda',
    cc: 1833,
    year: 2026,
    price: 1980000,
    status: 'Sıfır',
    stock: 'Sınırlı Stok',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'İki tekerlekli lüksün ve kıtalararası konforun yegane zirvesi.',
    description: '6 silindirli devasa motoru, 7 vitesli çift kavramalı DCT şanzımanı, hava yastığı (airbag), Apple CarPlay destekli kokpiti ve mükemmel rüzgar koruması ile Gold Wing, motosiklet dünyasının first-class sınıfıdır.',
    specs: {
      motorType: '6 silindirli Boxer, sıvı soğutmalı, silindir başına 4 supap',
      power: '126 HP @ 5,500 d/d',
      torque: '170 Nm @ 4,500 d/d',
      weight: '390 kg (ıslak ağırlık)',
      seatHeight: '745 mm',
      fuelCapacity: '21 Litre'
    }
  },
  {
    id: 'kawasaki-ninja-h2r',
    name: 'Kawasaki Ninja H2R',
    brand: 'Kawasaki',
    cc: 998,
    year: 2026,
    price: 3850000,
    status: 'Sıfır',
    stock: 'Sınırlı Stok',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Supercharged kompresör motorlu, 310 beygirlik sınırları aşan teknoloji canavarı.',
    description: 'Yalnızca kapalı yarış pistlerinde kullanılabilen, süperşarjlı santrifüj kompresör teknolojisine sahip tek seri üretim motor. Karbon kanatları ve 310 beygirlik gücü ile havacılık ve motor mühendisliğinin sınır noktasıdır.',
    specs: {
      motorType: 'Sıralı 4 silindirli, kompresörlü (Supercharged), sıvı soğutmalı',
      power: '310 HP @ 14,000 d/d',
      torque: '165 Nm @ 12,500 d/d',
      weight: '216 kg (kuru ağırlık)',
      seatHeight: '830 mm',
      fuelCapacity: '17 Litre'
    }
  },
  {
    id: 'kawasaki-ninja-zx10r',
    name: 'Kawasaki Ninja ZX-10R',
    brand: 'Kawasaki',
    cc: 998,
    year: 2024,
    price: 1390000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'WSBK şampiyonluklarının mimarı. Saf performans odaklı süper spor.',
    description: 'Dünya Superbike şampiyonasında Jonathan Rea ile yıllarca domine eden şasi ve motor karakteri. Aerodinamik ZX tasarımı, entegre kanatçıkları ve yüksek devir çeviren motoruyla cadde ve pistin şampiyonudur.',
    specs: {
      motorType: 'Sıralı 4 silindirli, sıvı soğutmalı, supap tahrikli parmak iticili',
      power: '203 HP @ 13,200 d/d',
      torque: '114.9 Nm @ 11,400 d/d',
      weight: '207 kg (ıslak ağırlık)',
      seatHeight: '835 mm',
      fuelCapacity: '17 Litre'
    }
  },
  {
    id: 'harley-fatboy',
    name: 'Harley-Davidson Fat Boy 114',
    brand: 'Harley-Davidson',
    cc: 1868,
    year: 2024,
    price: 1480000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Krom detayları, devasa Lakester jantları ve meşhur Milwaukee-Eight 114 torkuyla cruiser ikonu.',
    description: 'Terminatör 2 filminden bu yana motosiklet tarihinin en ikonik modeli olan Fat Boy, parlak saten krom kaplamaları, geniş arka lastiği ve Milwaukee-Eight 114 V-Twin motorunun sarsıntısız gürlemesiyle gerçek Amerikan cruiser zevkidir.',
    specs: {
      motorType: 'Milwaukee-Eight 114 V-Twin, hava/yağ soğutmalı',
      power: '94 HP @ 5,020 d/d',
      torque: '155 Nm @ 3,250 d/d',
      weight: '317 kg (kuru ağırlık)',
      seatHeight: '675 mm',
      fuelCapacity: '18.9 Litre'
    }
  },
  {
    id: 'suzuki-hayabusa',
    name: 'Suzuki Hayabusa GSX1300R',
    brand: 'Suzuki',
    cc: 1340,
    year: 2024,
    price: 1290000,
    status: 'Kampanyalı',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Hız efsanesi geri döndü. Eşsiz aerodinamik tasarımıyla 1340 cc saf tork.',
    description: 'Suzuki Hayabusa, iki tekerlekli süper spor turing dünyasının yegane sembolüdür. Eşsiz aerodinamik silüeti, 1340 cc hacmindeki efsanevi sıralı 4 silindirli motoru ve Suzuki Akıllı Sürüş Sistemi (SIRS) ile asfalta hükmeder.',
    specs: {
      motorType: 'Sıralı 4 silindirli, 4 zamanlı, sıvı soğutmalı, DOHC',
      power: '190 HP @ 9,700 d/d',
      torque: '150 Nm @ 7,000 d/d',
      weight: '264 kg (ıslak ağırlık)',
      seatHeight: '800 mm',
      fuelCapacity: '20 Litre'
    }
  },
  {
    id: 'cfmoto-450sr',
    name: 'CFMOTO 450SR',
    brand: 'CFMOTO',
    cc: 450,
    year: 2024,
    price: 285000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Çift silindirli 270 derece krank yapılı, pist genlerine sahip hiper 450cc süper spor.',
    description: 'CFMOTO 450SR, rüzgar tünelinde geliştirilmiş aerodinamik kanatları (winglets), Brembo fren kaliperleri ve 50 beygir gücündeki çift silindirli motoru ile Türkiye pazarının en popüler süper spor modelidir.',
    specs: {
      motorType: 'Çift silindirli, sıvı soğutmalı, 8 supaplı DOHC',
      power: '50 HP @ 9,500 d/d',
      torque: '39 Nm @ 7,600 d/d',
      weight: '168 kg (ıslak ağırlık)',
      seatHeight: '795 mm',
      fuelCapacity: '14 Litre'
    }
  },
  {
    id: 'cfmoto-250nk',
    name: 'CFMOTO 250NK',
    brand: 'CFMOTO',
    cc: 249,
    year: 2024,
    price: 165000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Şehir içi sürüşleri için son derece dinamik, çevik ve ekonomik naked modeli.',
    description: 'Hafif kafes şasisi, kaydırmalı debriyajı, TFT dijital ekranı ve agresif tasarımı ile 250NK, genç sürücülerin ve şehir içi pratik ulaşım arayanların en çok tercih ettiği 250cc modelidir.',
    specs: {
      motorType: 'Tek silindirli, sıvı soğutmalı, 4 supaplı DOHC',
      power: '27.5 HP @ 9,750 d/d',
      torque: '22 Nm @ 7,300 d/d',
      weight: '158 kg (ıslak ağırlık)',
      seatHeight: '795 mm',
      fuelCapacity: '12.5 Litre'
    }
  },
  {
    id: 'cfmoto-800mt-touring',
    name: 'CFMOTO 800MT Touring',
    brand: 'CFMOTO',
    cc: 799,
    year: 2024,
    price: 495000,
    status: 'Sıfır',
    stock: 'Sınırlı Stok',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'KTM LC8c motor bloğundan türetilen, zengin donanımlı premium seyahat endurosu.',
    description: 'CFMOTO 800MT Touring, tel jantları, KYB ayarlı süspansiyonları, çift yönlü Quickshifterı, ısıtmalı elcik ve koltuğu ile en uzun seyahatleri konforlu bir maceraya çevirir.',
    specs: {
      motorType: 'Sıralı çift silindirli, sıvı soğutmalı, DOHC',
      power: '95 HP @ 9,000 d/d',
      torque: '77 Nm @ 7,500 d/d',
      weight: '231 kg (ıslak ağırlık)',
      seatHeight: '825 mm',
      fuelCapacity: '19 Litre'
    }
  },
  {
    id: 'rks-a250',
    name: 'RKS A250 naked',
    brand: 'RKS',
    cc: 249,
    year: 2024,
    price: 155000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Şık İtalyan hatları taşıyan, son derece ekonomik çift silindirli 250cc naked.',
    description: 'RKS Motorun en çok satan naked modellerinden biri olan A250, çift silindirli motor sesi, kaslı deposu ve agresif LED aydınlatmaları ile bütçe dostu bir sürüş zevki sunar.',
    specs: {
      motorType: 'Çift silindirli, sıvı soğutmalı, 4 zamanlı',
      power: '26 HP @ 9,000 d/d',
      torque: '22 Nm @ 7,000 d/d',
      weight: '165 kg (ıslak ağırlık)',
      seatHeight: '790 mm',
      fuelCapacity: '15 Litre'
    }
  },
  {
    id: 'rks-freccia-150',
    name: 'RKS Freccia 150',
    brand: 'RKS',
    cc: 149,
    year: 2024,
    price: 115000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Anahtarsız çalıştırma ve start-stop özellikli premium adventure scooter.',
    description: 'RKS Freccia 150, geniş LCD paneli, uzun yol camı, off-road uyumlu gövde detayları ve sıvı soğutmalı ekonomik motoruyla hem şehir içinde hem de hafta sonu kaçamaklarında mükemmel pratiklik sağlar.',
    specs: {
      motorType: 'Tek silindirli, sıvı soğutmalı, 4 zamanlı',
      power: '14.5 HP @ 8,500 d/d',
      torque: '14 Nm @ 6,500 d/d',
      weight: '135 kg (kuru ağırlık)',
      seatHeight: '775 mm',
      fuelCapacity: '9.3 Litre'
    }
  },
  {
    id: 'rks-wildcat-125',
    name: 'RKS Wildcat 125',
    brand: 'RKS',
    cc: 124,
    year: 2024,
    price: 75000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Şehir içi günlük ulaşımın ve kuryelerin en ekonomik, dayanıklı scooter tercihi.',
    description: 'RKS Wildcat 125, düşük yakıt tüketimi, geniş sele altı bagaj alanı ve bütçe dostu yedek parçalarıyla şehir trafiğini tamamen stressiz hale getirir.',
    specs: {
      motorType: 'Tek silindirli, hava soğutmalı, 4 zamanlı',
      power: '9 HP @ 7,500 d/d',
      torque: '8.8 Nm @ 6,000 d/d',
      weight: '110 kg (kuru ağırlık)',
      seatHeight: '760 mm',
      fuelCapacity: '6.5 Litre'
    }
  },
  {
    id: 'qjmotor-srk400',
    name: 'QJ Motor SRK 400',
    brand: 'QJ Motor',
    cc: 400,
    year: 2024,
    price: 245000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Çift silindirli kükreyen motor sesi ve üst seviye donanımlı 400cc naked lideri.',
    description: 'QJ Motorun SRK 400 modeli, ters ön amortisörleri, çift disk papatya frenleri ve 41.5 beygirlik çift silindirli bloğu ile orta sınıfta spor ve kaslı bir naked sürüşü sunar.',
    specs: {
      motorType: 'Çift silindirli, sıvı soğutmalı, 8 supaplı DOHC',
      power: '41.5 HP @ 9,000 d/d',
      torque: '37 Nm @ 7,500 d/d',
      weight: '186 kg (ıslak ağırlık)',
      seatHeight: '790 mm',
      fuelCapacity: '13.5 Litre'
    }
  },
  {
    id: 'qjmotor-srv300',
    name: 'QJ Motor SRV 300',
    brand: 'QJ Motor',
    cc: 298,
    year: 2024,
    price: 215000,
    status: 'Sıfır',
    stock: 'Sınırlı Stok',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'V-Twin motorlu bobber tarzı, alçak seleli şık cruiser.',
    description: 'QJ Motor SRV 300, su soğutmalı V-Twin motor bloğu, kayışlı aktarması ve bobber çamurluk yapısıyla caddelerde son derece karizmatik ve konforlu bir bobber sürüşü sağlar.',
    specs: {
      motorType: 'Çift silindirli V-Twin, sıvı soğutmalı, 4 zamanlı',
      power: '30.7 HP @ 9,000 d/d',
      torque: '26 Nm @ 7,000 d/d',
      weight: '163 kg (ıslak ağırlık)',
      seatHeight: '700 mm',
      fuelCapacity: '13.5 Litre'
    }
  },
  {
    id: 'benelli-trk502x',
    name: 'Benelli TRK 502 X',
    brand: 'Benelli',
    cc: 500,
    year: 2024,
    price: 345000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'İtalyan tasarımı, heybetli kasa ve bütçe dostu çift silindirli adventure lideri.',
    description: 'Çinli QJ Motor bünyesinde İtalyan genleriyle üretilen Benelli TRK 502 X, 19 inç ön tel jantı, yüksek rüzgar koruması ve çift silindirli motorunun mükemmel dengesiyle Türkiye genelinde en çok satan orta sınıf adventure modelidir.',
    specs: {
      motorType: 'Çift silindirli, sıvı soğutmalı, DOHC',
      power: '47.6 HP @ 8,500 d/d',
      torque: '46 Nm @ 6,000 d/d',
      weight: '213 kg (kuru ağırlık)',
      seatHeight: '840 mm',
      fuelCapacity: '20 Litre'
    }
  },
  {
    id: 'voge-525dsx',
    name: 'Voge 525DSX',
    brand: 'Voge',
    cc: 494,
    year: 2024,
    price: 355000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'KYB amortisörler, Nissin frenler ve çekiş kontrol (TCS) donanımlı premium seyahat endurosu.',
    description: 'Çinli Loncin markasının premium markası olan Voge, 525DSX modeliyle rakiplerini kıskandıracak KYB süspansiyon, Nissin frenler, tubeless tel jantlar ve entegre sis farları gibi üst düzey donanımlarla gelmektedir.',
    specs: {
      motorType: 'Çift silindirli, sıvı soğutmalı, 8 supaplı DOHC',
      power: '47.6 HP @ 8,500 d/d',
      torque: '44.5 Nm @ 7,000 d/d',
      weight: '190 kg (kuru ağırlık)',
      seatHeight: '810 mm',
      fuelCapacity: '16.5 Litre'
    }
  },
  {
    id: 'ducati-streetfighter-v4s',
    name: 'Ducati Streetfighter V4 S',
    brand: 'Ducati',
    cc: 1103,
    year: 2024,
    price: 1680000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Naked sınıfının en agresif üyesi. 208 beygirlik V4 gücü ve Öhlins elektronik süspansiyon.',
    description: 'Ducati Streetfighter V4 S, Panigale V4\'ün grenajlarının sökülüp yüksek gidon takılmasıyla oluşturulmuş bir performans canavarıdır. Desmosedici Stradale motoru, aerodinamik çift kanatçıkları ve Öhlins Smart EC 2.0 süspansiyonlarıyla pist hissini yola taşır.',
    specs: {
      motorType: 'Desmosedici Stradale 90° V4, sıvı soğutmalı',
      power: '208 HP @ 13,000 d/d',
      torque: '123 Nm @ 9,500 d/d',
      weight: '178 kg (kuru ağırlık)',
      seatHeight: '845 mm',
      fuelCapacity: '16 Litre'
    }
  },
  {
    id: 'ducati-desertx',
    name: 'Ducati DesertX',
    brand: 'Ducati',
    cc: 937,
    year: 2024,
    price: 890000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: '80\'lerin Dakar efsanelerinden ilham alan, 21 inç ön jantlı gerçek off-road makinesi.',
    description: 'DesertX, Ducati\'nin en sert arazi koşullarını fethetmek için ürettiği ilk modern adventure modelidir. 937 cc Testastretta 11° Desmodromik motoru, 21" ön ve 18" arka tel jant yapısı ve Kayaba süspansiyonlarıyla arazide sınır tanımaz.',
    specs: {
      motorType: 'Testastretta 11° L-Twin, sıvı soğutmalı',
      power: '110 HP @ 9,250 d/d',
      torque: '92 Nm @ 6,500 d/d',
      weight: '202 kg (kuru ağırlık)',
      seatHeight: '875 mm',
      fuelCapacity: '21 Litre'
    }
  },
  {
    id: 'bmw-r1300gs',
    name: 'BMW R 1300 GS Option 719',
    brand: 'BMW',
    cc: 1300,
    year: 2026,
    price: 1850000,
    status: 'Sıfır',
    stock: 'Sınırlı Stok',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Yenilenen efsane. 1300 cc boxer motoru, radar teknolojisi ve lüks Option 719 detayları.',
    description: 'Yeni nesil R 1300 GS, tamamen hafifletilmiş şasisi, ShiftCam teknolojisine sahip en güçlü Boxer motoru ve şerit takip radar sistemleriyle premium macera segmentinde standartları belirler.',
    specs: {
      motorType: '2 silindirli Boxer, ShiftCam, sıvı/hava soğutmalı',
      power: '145 HP @ 7,750 d/d',
      torque: '149 Nm @ 6,500 d/d',
      weight: '237 kg (ıslak ağırlık)',
      seatHeight: '850 mm',
      fuelCapacity: '19 Litre'
    }
  },
  {
    id: 'bmw-s1000xr',
    name: 'BMW S 1000 XR',
    brand: 'BMW',
    cc: 999,
    year: 2024,
    price: 1380000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Süper spor performansı ile uzun yol konforunun muazzam bir birleşimi (Adventure-Sport).',
    description: 'S 1000 RR\'dan türetilen 4 silindirli yırtıcı motoru ve konforlu yüksek sürüş pozisyonu ile S 1000 XR, virajları ve uzun otoyolları en hızlı şekilde aşmak isteyenlerin ilk tercihidir.',
    specs: {
      motorType: 'Sıralı 4 silindirli, sıvı soğutmalı',
      power: '170 HP @ 11,000 d/d',
      torque: '114 Nm @ 9,250 d/d',
      weight: '226 kg (ıslak ağırlık)',
      seatHeight: '850 mm',
      fuelCapacity: '20 Litre'
    }
  },
  {
    id: 'ktm-390duke',
    name: 'KTM 390 Duke',
    brand: 'KTM',
    cc: 399,
    year: 2024,
    price: 345000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: '"Corner Rocket" lakaplı, yenilenen kasası ve agresif TFT ekranıyla A2 sınıfı lideri.',
    description: 'Yenilenen KTM 390 Duke, tamamen değişen şasisi, geliştirilmiş tek silindirli LC4c motor bloğu ve viraj ABS\'siyle şehir içi kullanımda üstün çeviklik ve saf sürüş heyecanı yaşatır.',
    specs: {
      motorType: 'Tek silindirli, 4 zamanlı, sıvı soğutmalı',
      power: '45 HP @ 8,500 d/d',
      torque: '39 Nm @ 7,000 d/d',
      weight: '165 kg (ıslak ağırlık)',
      seatHeight: '820 mm',
      fuelCapacity: '15 Litre'
    }
  },
  {
    id: 'ktm-890adventure-r',
    name: 'KTM 890 Adventure R',
    brand: 'KTM',
    cc: 889,
    year: 2024,
    price: 880000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Gerçek arazi canavarı. WP XPLOR süspansiyonları ve ralliden türetilen şasi geometrisi.',
    description: 'KTM 890 Adventure R, en zorlu off-road rotaları için üretilmiştir. Alçak konumlandırılmış yakıt depoları, tamamen ayarlanabilir WP süspansiyonları ve gelişmiş elektronik sürüş modları ile durdurulamazdır.',
    specs: {
      motorType: 'Sıralı çift silindirli, sıvı soğutmalı',
      power: '105 HP @ 8,000 d/d',
      torque: '100 Nm @ 6,500 d/d',
      weight: '196 kg (kuru ağırlık)',
      seatHeight: '880 mm',
      fuelCapacity: '20 Litre'
    }
  },
  {
    id: 'yamaha-mt07',
    name: 'Yamaha MT-07',
    brand: 'Yamaha',
    cc: 689,
    year: 2024,
    price: 435000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'CP2 çapraz düzlem motorunun tork karakteriyle naked sınıfının en çok satan efsanesi.',
    description: 'Yamaha MT-07, 270 derecelik krank açısına sahip CP2 motorunun patlayıcı alt devir torku, son derece dengeli şasisi ve akıcı sürüş kabiliyetiyle naked segmentinin tartışmasız lideridir.',
    specs: {
      motorType: '2 silindirli, sıvı soğutmalı, CP2',
      power: '73.4 HP @ 8,750 d/d',
      torque: '67 Nm @ 6,500 d/d',
      weight: '184 kg (ıslak ağırlık)',
      seatHeight: '805 mm',
      fuelCapacity: '14 Litre'
    }
  },
  {
    id: 'yamaha-tracer9gt',
    name: 'Yamaha Tracer 9 GT+',
    brand: 'Yamaha',
    cc: 890,
    year: 2026,
    price: 885000,
    status: 'Sıfır',
    stock: 'Sınırlı Stok',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Radar tabanlı adaptif hız sabitleyici (ACC) ve yarı aktif süspansiyonlu premium turing.',
    description: 'Yeni Tracer 9 GT+, radar destekli frenleme ve hız sabitleme teknolojileri, KYB yarı aktif elektronik süspansiyonları ve 7 inç renkli TFT ekranıyla uzun seyahatlerin en konforlu ve güvenli yol arkadaşıdır.',
    specs: {
      motorType: '3 silindirli, sıvı soğutmalı, CP3',
      power: '119 HP @ 10,000 d/d',
      torque: '93 Nm @ 7,000 d/d',
      weight: '223 kg (ıslak ağırlık)',
      seatHeight: '820 mm',
      fuelCapacity: '19 Litre'
    }
  },
  {
    id: 'honda-cb650r',
    name: 'Honda CB650R Neo Sports Cafe',
    brand: 'Honda',
    cc: 649,
    year: 2024,
    price: 495000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Retro-modern hatlar, pürüzsüz 4 silindir senfonisi ve seçkin Showa süspansiyon.',
    description: 'Honda CB650R Neo Sports Cafe, klasik çizgileri modern agresif detaylarla harmanlar. Sıralı 4 silindirli yüksek devirli motoru, Showa SFF-BP ters ön çatalları ve HSTC çekiş kontrolüyle eşsizdir.',
    specs: {
      motorType: 'Sıralı 4 silindirli, sıvı soğutmalı',
      power: '95 HP @ 12,000 d/d',
      torque: '63 Nm @ 9,500 d/d',
      weight: '202.5 kg (ıslak ağırlık)',
      seatHeight: '810 mm',
      fuelCapacity: '15.4 Litre'
    }
  },
  {
    id: 'honda-adv350',
    name: 'Honda ADV 350',
    brand: 'Honda',
    cc: 330,
    year: 2024,
    price: 365000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Macera ruhlu premium scooter. Showa amortisörler ve geniş arazi gövdesi.',
    description: 'Honda ADV 350, X-ADV efsanesinin pratik orta segment versiyonudur. Showa arka gazlı tüplü amortisörleri, blok desenli lastikleri ve HSTC kontrolüyle hem şehir içi hem de hafif arazi yollarında harika konfor sunar.',
    specs: {
      motorType: 'Tek silindirli, sıvı soğutmalı, eSP+',
      power: '29.2 HP @ 7,500 d/d',
      torque: '31.5 Nm @ 5,250 d/d',
      weight: '186 kg (ıslak ağırlık)',
      seatHeight: '795 mm',
      fuelCapacity: '11.7 Litre'
    }
  },
  {
    id: 'kawasaki-z1000r',
    name: 'Kawasaki Z1000 R Edition',
    brand: 'Kawasaki',
    cc: 1043,
    year: 2024,
    price: 1150000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Sugomi tasarım felsefesinin vahşi naked temsilcisi. Öhlins arka amortisör ve Brembo frenler.',
    description: 'Z1000 R Edition, agresif duruşu ve kükreyen motoruyla gerçek bir efsanedir. Brembo M50 kaliperler ve Öhlins S46 arka amortisör donanımıyla saf sürüş odaklı bir canavardır.',
    specs: {
      motorType: 'Sıralı 4 silindirli, sıvı soğutmalı',
      power: '142 HP @ 10,000 d/d',
      torque: '111 Nm @ 7,300 d/d',
      weight: '221 kg (ıslak ağırlık)',
      seatHeight: '815 mm',
      fuelCapacity: '17 Litre'
    }
  },
  {
    id: 'kawasaki-vulcans',
    name: 'Kawasaki Vulcan S',
    brand: 'Kawasaki',
    cc: 649,
    year: 2024,
    price: 485000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Modern cruiser tasarımı ve ayarlanabilir Ergo-Fit ergonomi sistemi.',
    description: 'Vulcan S, geleneksel cruiser çizgilerini spor motosiklet genleriyle birleştirir. Çift silindirli canlı motor bloğu ve Ergo-Fit (ayarlanabilir gidon, ayaklık ve sele) yapısıyla benzersiz konfor sunar.',
    specs: {
      motorType: 'Çift silindirli, sıvı soğutmalı, 4 zamanlı',
      power: '61 HP @ 7,500 d/d',
      torque: '63 Nm @ 6,600 d/d',
      weight: '229 kg (ıslak ağırlık)',
      seatHeight: '705 mm',
      fuelCapacity: '14 Litre'
    }
  },
  {
    id: 'harley-sportsters',
    name: 'Harley-Davidson Sportster S',
    brand: 'Harley-Davidson',
    cc: 1252,
    year: 2024,
    price: 1390000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Revolution Max 1250T su soğutmalı yeni nesil motor bloğuyla kaslı cruiser.',
    description: 'Sportster S, Harley-Davidson\'ın spor performans cruiser segmentindeki başyapıtıdır. 121 beygirlik güçlü Revolution Max motoru, yukarı konumlandırılmış çift egzozu ve şık tasarımıyla caddelerin yeni lideridir.',
    specs: {
      motorType: 'Revolution Max 1250T V-Twin, sıvı soğutmalı',
      power: '121 HP @ 7,500 d/d',
      torque: '127 Nm @ 6,000 d/d',
      weight: '228 kg (ıslak ağırlık)',
      seatHeight: '765 mm',
      fuelCapacity: '11.8 Litre'
    }
  },
  {
    id: 'harley-panamerica',
    name: 'Harley-Davidson Pan America 1250 Special',
    brand: 'Harley-Davidson',
    cc: 1252,
    year: 2024,
    price: 1550000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Harley-Davidson kalitesiyle arazide macera. Adaptif Yükseklik Kontrolü (ARH) donanımlı.',
    description: 'Pan America 1250 Special, Harley-Davidson\'ın ilk premium adventure modelidir. 150 beygirlik Revolution Max 1250 motoru ve durduğunda seleyi otomatik alçaltan ARH sistemiyle sınıfında çığır açmıştır.',
    specs: {
      motorType: 'Revolution Max 1250 V-Twin, sıvı soğutmalı',
      power: '150 HP @ 8,750 d/d',
      torque: '128 Nm @ 6,750 d/d',
      weight: '258 kg (ıslak ağırlık)',
      seatHeight: '830 - 850 mm (ARH ile)',
      fuelCapacity: '21.2 Litre'
    }
  },
  {
    id: 'suzuki-gsxr1000',
    name: 'Suzuki GSX-R1000R',
    brand: 'Suzuki',
    cc: 1000,
    year: 2024,
    price: 1450000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Pistlerin kralı. Showa BFF süspansiyonlar ve değişken supap zamanlaması (VVT).',
    description: 'Suzuki GSX-R1000R, MotoGP teknolojilerinden türetilmiş VVT supap sistemi, Showa Balance Free Front çatalı ve üstün şasi dengesiyle yarış pistlerinin en stabil ve hızlı makinelerinden biridir.',
    specs: {
      motorType: 'Sıralı 4 silindirli, sıvı soğutmalı, DOHC VVT',
      power: '202 HP @ 13,200 d/d',
      torque: '117.6 Nm @ 10,800 d/d',
      weight: '203 kg (ıslak ağırlık)',
      seatHeight: '825 mm',
      fuelCapacity: '16 Litre'
    }
  },
  {
    id: 'suzuki-vstrom800',
    name: 'Suzuki V-Strom 800DE',
    brand: 'Suzuki',
    cc: 776,
    year: 2024,
    price: 645000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Yepyeni paralel çift silindirli motor bloğu ve 21 inç ön tel jantlı macera endurosu.',
    description: 'Yeni Suzuki V-Strom 800DE, arazi performansı odaklı 21 inç ön jant yapısı, uzun stroklu Showa süspansiyonları ve 270 derece kranklı yeni paralel çift silindir bloğuyla her türlü yol koşulunda üstün kontrol sağlar.',
    specs: {
      motorType: 'Paralel çift silindirli, sıvı soğutmalı, 4 zamanlı',
      power: '84.3 HP @ 8,500 d/d',
      torque: '78 Nm @ 6,800 d/d',
      weight: '230 kg (ıslak ağırlık)',
      seatHeight: '855 mm',
      fuelCapacity: '20 Litre'
    }
  },
  {
    id: 'cfmoto-250sr',
    name: 'CFMOTO 250SR',
    brand: 'CFMOTO',
    cc: 249,
    year: 2024,
    price: 175000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'A1-A2 uyumlu, son derece şık tasarımlı agresif 250cc süper spor.',
    description: 'CFMOTO 250SR, yarış çizgilerini yansıtan agresif tasarımı, renkli TFT ekranı, kaydırmalı debriyajı ve canlı tek silindirli motoruyla motosiklet dünyasına spor bir adım atmak isteyen gençlerin gözdesidir.',
    specs: {
      motorType: 'Tek silindirli, sıvı soğutmalı, DOHC',
      power: '27.5 HP @ 9,750 d/d',
      torque: '22 Nm @ 7,500 d/d',
      weight: '165 kg (ıslak ağırlık)',
      seatHeight: '780 mm',
      fuelCapacity: '12 Litre'
    }
  },
  {
    id: 'cfmoto-700clx',
    name: 'CFMOTO 700CL-X Heritage',
    brand: 'CFMOTO',
    cc: 693,
    year: 2024,
    price: 365000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Neo-retro scrambler tasarımı, hız sabitleyici ve sürüş modlu şık naket.',
    description: '700CL-X Heritage, yuvarlak retro farı ve scrambler detaylarıyla estetik bir duruş sunar. Çift silindirli güçlü motoru, Kayaba süspansiyon donanımı ve standart hız sabitleyicisiyle son derece lükstür.',
    specs: {
      motorType: 'Çift silindirli, sıvı soğutmalı, 4 zamanlı',
      power: '74 HP @ 8,500 d/d',
      torque: '68 Nm @ 6,500 d/d',
      weight: '196 kg (ıslak ağırlık)',
      seatHeight: '800 mm',
      fuelCapacity: '13 Litre'
    }
  },
  {
    id: 'rks-rt250',
    name: 'RKS RT250',
    brand: 'RKS',
    cc: 249,
    year: 2024,
    price: 185000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Geniş koruma camı ve konforlu selesiyle seyahat odaklı maxi-scooter.',
    description: 'RKS RT250, şehir içi işe gitme süreçlerini ve hafta sonu kaçamaklarını son derece lüks ve zahmetsiz hale getiren, geniş bagajlı ve ekonomik 250cc maxi-scooter modelidir.',
    specs: {
      motorType: 'Tek silindirli, sıvı soğutmalı, 4 zamanlı',
      power: '22 HP @ 7,500 d/d',
      torque: '21 Nm @ 6,000 d/d',
      weight: '185 kg (ıslak ağırlık)',
      seatHeight: '770 mm',
      fuelCapacity: '13 Litre'
    }
  },
  {
    id: 'qjmotor-srt800',
    name: 'QJ Motor SRT 800 SX',
    brand: 'QJ Motor',
    cc: 799,
    year: 2024,
    price: 485000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Brembo frenler, Marzocchi amortisörler and heybetli adventure kasası.',
    description: 'QJ Motor SRT 800 SX, 92 beygirlik güçlü bloğu, 7 inç renkli ekranı ve standart üçlü çanta demiri hazırlığı ile kıtalararası yolculuklar için en fiyat-performans odaklı büyük adventure modelidir.',
    specs: {
      motorType: 'Sıralı çift silindirli, sıvı soğutmalı, DOHC',
      power: '92.5 HP @ 9,000 d/d',
      torque: '77 Nm @ 8,000 d/d',
      weight: '236 kg (ıslak ağırlık)',
      seatHeight: '835 mm',
      fuelCapacity: '24 Litre'
    }
  },
  {
    id: 'benelli-leoncino500',
    name: 'Benelli Leoncino 500',
    brand: 'Benelli',
    cc: 500,
    year: 2024,
    price: 315000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'İtalyan aslanı. Klasik scrambler çizgileri taşıyan 500cc naked.',
    description: 'Pesaro mühendisliğinden doğan Benelli Leoncino 500, ön çamurluğundaki minik aslan figürü, klasik İtalyan scrambler tarzı ve çift silindirli tatlı motor sesiyle son derece estetik bir naked motosiklettir.',
    specs: {
      motorType: 'Çift silindirli, sıvı soğutmalı, DOHC',
      power: '47.6 HP @ 8,500 d/d',
      torque: '46 Nm @ 6,000 d/d',
      weight: '186 kg (kuru ağırlık)',
      seatHeight: '785 mm',
      fuelCapacity: '12.7 Litre'
    }
  },
  {
    id: 'voge-900dsx',
    name: 'Voge 900DSX Premium',
    brand: 'Voge',
    cc: 895,
    year: 2026,
    price: 645000,
    status: 'Sıfır',
    stock: 'Sınırlı Stok',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Brembo frenler, KYB süspansiyonlar ve radar destekli kör nokta uyarılı amiral gemisi.',
    description: 'Voge 900DSX, 895 cc hacmindeki motor bloğu, Brembo frenleri, tubeless tel jantları, standart gelen kör nokta radar uyarı sistema ve koltuk/elcik ısıtmalarıyla adventure segmentinin en zengin donanımlı yeni kralıdır.',
    specs: {
      motorType: 'Çift silindirli, sıvı soğutmalı, 8 supaplı DOHC',
      power: '95 HP @ 8,250 d/d',
      torque: '95 Nm @ 6,250 d/d',
      weight: '215 kg (kuru ağırlık)',
      seatHeight: '825 mm',
      fuelCapacity: '20 Litre'
    }
  }
,
  {
    id: 'kuba-superlight-200',
    name: 'Kuba Superlight 200',
    brand: 'Kuba',
    cc: 197,
    year: 2026,
    price: 124000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Klasik cruiser tarzı ve retro tasarımıyla şehir içi ve kısa turlar için ideal chopper.',
    description: 'Kuba Superlight 200, mat siyah kaplaması, yayvan gidonu ve rahat selesi ile klasik cruiser sürüşünü ekonomik ve erişilebilir bir paket halinde sunar. Yeni başlayanlar ve tarz sahibi sürücüler için mükemmel bir seçenektir.',
    specs: {
      motorType: 'Tek silindirli, 4 zamanlı, hava soğutmalı',
      power: '12.8 HP @ 7,500 d/d',
      torque: '13.5 Nm @ 6,000 d/d',
      weight: '134 kg (kuru ağırlık)',
      seatHeight: '730 mm',
      fuelCapacity: '15 Litre'
    }
  },
  {
    id: 'kuba-blueberry-50',
    name: 'Kuba Blueberry 50',
    brand: 'Kuba',
    cc: 49,
    year: 2025,
    price: 42000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'B sınıfı ehliyetle kullanılabilen, pratik ve sevimli şehir içi scooterı.',
    description: 'Kuba Blueberry 50, sevimli pastel tonları, hafif yapısı ve MTV muafiyeti ile şehir içi kısa mesafelerde, market alışverişlerinde ve günlük ulaşımda en pratik dostunuzdur.',
    specs: {
      motorType: 'Tek silindirli, 4 zamanlı, hava soğutmalı',
      power: '3.1 HP @ 7,000 d/d',
      torque: '3.3 Nm @ 6,000 d/d',
      weight: '85 kg (kuru ağırlık)',
      seatHeight: '760 mm',
      fuelCapacity: '5 Litre'
    }
  },
  {
    id: 'kuba-dragon-50',
    name: 'Kuba Dragon 50',
    brand: 'Kuba',
    cc: 49,
    year: 2026,
    price: 45000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Şık ve modern tasarımıyla öne çıkan ekonomik başlangıç cub/scooter modeli.',
    description: 'Kuba Dragon 50, düşük yakıt tüketimi, sağlam şasisi ve kolay kullanımı ile bütçe dostu mobilite arayan gençlerin ve kuryelerin ilk tercihidir.',
    specs: {
      motorType: 'Tek silindirli, 4 zamanlı, hava soğutmalı',
      power: '3.2 HP @ 7,500 d/d',
      torque: '3.4 Nm @ 6,000 d/d',
      weight: '92 kg',
      seatHeight: '770 mm',
      fuelCapacity: '5.5 Litre'
    }
  },
  {
    id: 'kuba-cg-150',
    name: 'Kuba CG 150',
    brand: 'Kuba',
    cc: 149,
    year: 2026,
    price: 55000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Yüksek torku ve klasikleşen tasarımıyla efsaneleşmiş CG efsanesi.',
    description: 'Kuba CG 150, klasik hatları, yüksek yük taşıma kapasitesi ve modifikasyona uygun yapısıyla Anadolu yollarının vazgeçilmez emektarı ve performans makinesidir.',
    specs: {
      motorType: 'Tek silindirli, 4 zamanlı, hava soğutmalı',
      power: '11.5 HP @ 8,500 d/d',
      torque: '10.8 Nm @ 7,000 d/d',
      weight: '115 kg',
      seatHeight: '780 mm',
      fuelCapacity: '9 Litre'
    }
  },
  {
    id: 'kuba-reiz-50',
    name: 'Kuba Reiz 50',
    brand: 'Kuba',
    cc: 49,
    year: 2025,
    price: 46000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Kompakt boyutları ve dinamik hatlarıyla dikkat çeken modern 50cc scooter.',
    description: 'Kuba Reiz 50, keskin hatlı far tasarımı, dijital göstergesi ve konforlu sürüşü ile şehir içi yoğun trafikte kıvrak hareket edebileceğiniz, park sorunu yaşatmayan bir araçtır.',
    specs: {
      motorType: 'Tek silindirli, 4 zamanlı, hava soğutmalı',
      power: '3.3 HP @ 7,500 d/d',
      torque: '3.5 Nm @ 6,000 d/d',
      weight: '89 kg',
      seatHeight: '765 mm',
      fuelCapacity: '4.8 Litre'
    }
  },
  {
    id: 'rks-bitter-125',
    name: 'RKS Bitter 125',
    brand: 'RKS',
    cc: 125,
    year: 2026,
    price: 68000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Retro İtalyan tasarımıyla şıklığı ve ekonomiyi buluşturan popüler 125cc scooter.',
    description: 'RKS Bitter 125, nostaljik İtalyan çizgileri, krom detayları, LED aydınlatması ve ekonomik 125cc motor bloğu ile hem tarz görünmek hem de bütçesini korumak isteyenlerin gözdesidir.',
    specs: {
      motorType: 'Tek silindirli, 4 zamanlı, hava soğutmalı',
      power: '8.3 HP @ 7,500 d/d',
      torque: '8.5 Nm @ 6,000 d/d',
      weight: '105 kg',
      seatHeight: '760 mm',
      fuelCapacity: '6.2 Litre'
    }
  },
  {
    id: 'rks-tnt-125',
    name: 'RKS TNT 125',
    brand: 'RKS',
    cc: 125,
    year: 2026,
    price: 72000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Kompakt boyutlu fun-bike tarzı naked tasarımıyla şehir içi canavarı.',
    description: 'RKS TNT 125, çift egzoz çıkışı, agresif şasi tasarımı ve küçük ebatlı kalın tekerlekleriyle şehir içi sürüşlerinizi tam bir eğlenceye dönüştüren mini naked modelidir.',
    specs: {
      motorType: 'Tek silindirli, 4 zamanlı, sıvı soğutmalı',
      power: '11.1 HP @ 9,000 d/d',
      torque: '10.0 Nm @ 7,000 d/d',
      weight: '116 kg',
      seatHeight: '780 mm',
      fuelCapacity: '7.2 Litre'
    }
  },
  {
    id: 'rks-cg-125',
    name: 'RKS CG 125',
    brand: 'RKS',
    cc: 124,
    year: 2026,
    price: 58000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Klasik CG şasisi ve ekonomik motoruyla kırsal ve şehir içi ulaşımın klasikleşmiş modeli.',
    description: 'RKS CG 125, nikelaj kaplamalı çamurlukları, düz selesi ve sağlam yapısı ile hem yük taşımak hem de günlük ulaşım ihtiyaçlarını düşük maliyetle karşılamak için üretilmiştir.',
    specs: {
      motorType: 'Tek silindirli, 4 zamanlı, hava soğutmalı',
      power: '9.8 HP @ 8,000 d/d',
      torque: '9.2 Nm @ 6,500 d/d',
      weight: '110 kg',
      seatHeight: '775 mm',
      fuelCapacity: '9.5 Litre'
    }
  },
  {
    id: 'rks-srv-125',
    name: 'RKS SRV 125',
    brand: 'RKS',
    cc: 125,
    year: 2026,
    price: 85000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Premium cruiser çizgilerini 125cc hacminde sunan tarz sahibi başlangıç motoru.',
    description: 'RKS SRV 125, su soğutmalı motor bloğu, LCD gösterge paneli ve alçak sele tasarımıyla Harleysvari cruiser hissiyatını başlangıç sınıfında başarıyla yaşatır.',
    specs: {
      motorType: 'Tek silindirli, 4 zamanlı, su soğutmalı',
      power: '14.7 HP @ 9,500 d/d',
      torque: '12.1 Nm @ 7,000 d/d',
      weight: '150 kg',
      seatHeight: '720 mm',
      fuelCapacity: '14.5 Litre'
    }
  },
  {
    id: 'honda-pcx-125',
    name: 'Honda PCX 125',
    brand: 'Honda',
    cc: 125,
    year: 2026,
    price: 160000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Türkiye\'nin en çok satan premium şehir içi scooterı. eSP+ motor ve ABS güvencesi.',
    description: 'Honda PCX 125, Honda Seçilebilir Tork Kontrolü (HSTC), ABS fren sistemi, geniş koltuk altı bagajı ve start-stop özellikli eSP+ motoruyla şehir içi lüks ulaşımın tartışmasız lideridir.',
    specs: {
      motorType: 'Tek silindirli, sıvı soğutmalı, eSP+ SOHC',
      power: '12.5 HP @ 8,750 d/d',
      torque: '11.8 Nm @ 6,500 d/d',
      weight: '130 kg',
      seatHeight: '764 mm',
      fuelCapacity: '8.1 Litre'
    }
  },
  {
    id: 'honda-forza-250',
    name: 'Honda Forza 250',
    brand: 'Honda',
    cc: 249,
    year: 2026,
    price: 260000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Elektrikli ön camı ve üstün konforuyla şehir içi ve şehirler arası lüks maxi scooter.',
    description: 'Honda Forza 250, elektrikli olarak ayarlanabilen ön siperlik camı, akıllı anahtar sistemi, HSTC tork kontrolü ve geniş çift kasklık bagaj hacmiyle GT sınıfı konforunu yollara taşır.',
    specs: {
      motorType: 'Tek silindirli, sıvı soğutmalı, eSP+ 4 supaplı',
      power: '23 HP @ 7,750 d/d',
      torque: '24 Nm @ 6,250 d/d',
      weight: '186 kg',
      seatHeight: '780 mm',
      fuelCapacity: '11.7 Litre'
    }
  },
  {
    id: 'honda-activa-125',
    name: 'Honda Activa 125',
    brand: 'Honda',
    cc: 124,
    year: 2026,
    price: 105000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Yüksek dayanıklılığıyla bilinen, Türkiye\'nin kurye ve esnaf efsanesi.',
    description: 'Honda Activa 125, metal gövde panelleri, yakıt cimrisi PGM-FI enjeksiyonlu motoru ve aşınmaya karşı son derece dayanıklı yapısıyla ticari ve günlük kullanımda en güvenilir iş ortağınızdır.',
    specs: {
      motorType: 'Tek silindirli, fan soğutmalı, 4 zamanlı',
      power: '8.3 HP @ 6,500 d/d',
      torque: '10.3 Nm @ 5,000 d/d',
      weight: '111 kg',
      seatHeight: '765 mm',
      fuelCapacity: '5.3 Litre'
    }
  },
  {
    id: 'honda-crf250l',
    name: 'Honda CRF250L',
    brand: 'Honda',
    cc: 250,
    year: 2025,
    price: 210000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Çift amaçlı (Dual-Sport) enduro sınıfının efsanevi, sağlam ve dengeli modeli.',
    description: 'Honda CRF250L, hem şehir içinde asfaltta konforlu sürüş hem de arazide yüksek engelleri aşma yeteneğiyle macera sever sürücüler için sınıfının en popüler çift amaçlı motosikletidir.',
    specs: {
      motorType: 'Tek silindirli, sıvı soğutmalı, DOHC 4 supaplı',
      power: '24.8 HP @ 8,500 d/d',
      torque: '22.6 Nm @ 6,750 d/d',
      weight: '146 kg',
      seatHeight: '875 mm',
      fuelCapacity: '7.8 Litre'
    }
  },
  {
    id: 'yamaha-nmax-125',
    name: 'Yamaha NMAX 125',
    brand: 'Yamaha',
    cc: 125,
    year: 2026,
    price: 165000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'VVA teknolojili Blue Core motoru ve TCS çekiş kontrolü ile şehir içi spor scooter.',
    description: 'Yamaha NMAX 125, Akıllı Anahtar Sistemi, LCD Göstergesi, Akıllı Telefon Bağlantısı, VVA (Değişken Supap Hareketi) motoru ve TCS Çekiş Kontrolü ile premium bir şehir içi sürüş deneyimi yaşatır.',
    specs: {
      motorType: 'Tek silindirli, sıvı soğutmalı, Blue Core 4 supaplı',
      power: '12.2 HP @ 8,000 d/d',
      torque: '11.2 Nm @ 6,000 d/d',
      weight: '131 kg',
      seatHeight: '765 mm',
      fuelCapacity: '7.1 Litre'
    }
  },
  {
    id: 'yamaha-xmax-250',
    name: 'Yamaha XMAX 250',
    brand: 'Yamaha',
    cc: 250,
    year: 2026,
    price: 275000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Navigasyonlu TFT ekranı ve dinamik tasarımıyla en popüler spor maxi scooter.',
    description: 'Yamaha XMAX 250, X şeklindeki LED far tasarımı, TFT gösterge üzerinden akıllı telefon navigasyon desteği, TCS, ABS ve yüksek hızlı Blue Core 250cc motor bloğuyla lüks konforun zirvesidir.',
    specs: {
      motorType: 'Tek silindirli, sıvı soğutmalı, SOHC 4 supaplı',
      power: '22.8 HP @ 7,000 d/d',
      torque: '24.3 Nm @ 5,500 d/d',
      weight: '183 kg',
      seatHeight: '795 mm',
      fuelCapacity: '13.2 Litre'
    }
  },
  {
    id: 'yamaha-yzf-r25',
    name: 'Yamaha YZF-R25',
    brand: 'Yamaha',
    cc: 250,
    year: 2026,
    price: 225000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Yarış pisti DNA\'sı taşıyan, çift silindirli agresif başlangıç supersport modeli.',
    description: 'Yamaha YZF-R25, R serisi M1 tarzı gövde yapısı, ters ön çatalları, 14.000 devir çeviren çift silindirli motoru ile supersport dünyasına adım atmak isteyen genç sürücülerin rüya makinesidir.',
    specs: {
      motorType: 'Çift silindirli, sıvı soğutmalı, 4 zamanlı DOHC',
      power: '36 HP @ 12,000 d/d',
      torque: '22.6 Nm @ 10,000 d/d',
      weight: '166 kg',
      seatHeight: '780 mm',
      fuelCapacity: '14 Litre'
    }
  },
  {
    id: 'yamaha-mt-07',
    name: 'Yamaha MT-07',
    brand: 'Yamaha',
    cc: 689,
    year: 2026,
    price: 380000,
    status: 'Premium',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'CP2 çapraz düzlem motor teknolojisiyle tork canavarı hyper naked.',
    description: 'Yamaha MT-07, 5 inç TFT akıllı göstergesi, agresif fütüristik LED farı ve lineer tork üreten 689cc CP2 motor bloğuyla segmentinin en eğlenceli ve en çok tercih edilen naked modelidir.',
    specs: {
      motorType: 'Çift silindirli, sıvı soğutmalı, CP2 DOHC',
      power: '73.4 HP @ 8,750 d/d',
      torque: '67.0 Nm @ 6,500 d/d',
      weight: '184 kg',
      seatHeight: '805 mm',
      fuelCapacity: '14 Litre'
    }
  },
  {
    id: 'cfmoto-250-nk',
    name: 'CFMOTO 250 NK',
    brand: 'CFMOTO',
    cc: 249,
    year: 2026,
    price: 140000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Kıvrak şasisi, TFT ekranı ve agresif hatlarıyla en popüler 250cc naked model.',
    description: 'CFMOTO 250 NK, kaydırmalı debriyajı, çift sürüş modu (Eco/Sport), renkli TFT gösterge ekranı ve Kiska Design imzalı agresif tasarımı ile 250cc sınıfının fiyat/performans şampiyonudur.',
    specs: {
      motorType: 'Tek silindirli, sıvı soğutmalı, 4 supaplı DOHC',
      power: '27.5 HP @ 9,750 d/d',
      torque: '22.0 Nm @ 7,500 d/d',
      weight: '151 kg',
      seatHeight: '795 mm',
      fuelCapacity: '12.5 Litre'
    }
  },
  {
    id: 'cfmoto-250-sr',
    name: 'CFMOTO 250 SR',
    brand: 'CFMOTO',
    cc: 249,
    year: 2026,
    price: 155000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'Rüzgar tünelinde şekillenen gövde tasarımıyla iddialı spor yarış makinesi.',
    description: 'CFMOTO 250 SR, pist odaklı aerodinamik yapısı, LED aydınlatmaları, ABS fren sistemi ve renkli TFT ekranıyla yarış ruhunu günlük sokak sürüşlerine taşıyan dikkat çekici bir modeldir.',
    specs: {
      motorType: 'Tek silindirli, sıvı soğutmalı, DOHC 4 supaplı',
      power: '27.5 HP @ 9,750 d/d',
      torque: '22.0 Nm @ 7,500 d/d',
      weight: '165 kg',
      seatHeight: '780 mm',
      fuelCapacity: '12 Litre'
    }
  },
  {
    id: 'cfmoto-450sr-2026',
    name: 'CFMOTO 450SR',
    brand: 'CFMOTO',
    cc: 450,
    year: 2026,
    price: 295000,
    status: 'Premium',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: '270° krank açılı çift silindirli motoruyla 400cc sınıfının yeni oyun kurucusu.',
    description: 'CFMOTO 450SR, rüzgar kanatçıkları (winglets), Brembo kaliperli frenleri, 270 derece krank açısıyla V-twin benzeri ses ve güç karakteri sunan yeni nesil hafif supersport kralıdır.',
    specs: {
      motorType: 'Çift silindirli, sıvı soğutmalı, 270° krank DOHC',
      power: '47 HP @ 9,500 d/d',
      torque: '39.3 Nm @ 7,600 d/d',
      weight: '168 kg',
      seatHeight: '795 mm',
      fuelCapacity: '14 Litre'
    }
  },
  {
    id: 'ktm-duke-250',
    name: 'KTM Duke 250',
    brand: 'KTM',
    cc: 249,
    year: 2026,
    price: 215000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'WP süspansiyonları ve çelik kafes şasisiyle Avusturyalı sokak savaşçısı.',
    description: 'KTM Duke 250, agresif Naked gövde dili, ByBre fren sistemi, WP APEX amortisörleri ve yüksek performanslı tek silindirli motoru ile virajların hakimidir.',
    specs: {
      motorType: 'Tek silindirli, sıvı soğutmalı, 4 supaplı DOHC',
      power: '30 HP @ 9,000 d/d',
      torque: '24 Nm @ 7,250 d/d',
      weight: '149 kg (kuru ağırlık)',
      seatHeight: '830 mm',
      fuelCapacity: '13.4 Litre'
    }
  },
  {
    id: 'benelli-125s',
    name: 'Benelli 125S',
    brand: 'Benelli',
    cc: 125,
    year: 2026,
    price: 85000,
    status: 'Sıfır',
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200'
    ],
    shortDesc: 'B3SP üç bujili motor teknolojisi ile yüksek verimli İtalyan tasarımı naked.',
    description: 'Benelli 125S, spor egzozu, çift katlı LED far tasarımı, CBS kombine fren sistemi ve 3 bujili B3SP motor bloğu ile başlangıç naked sınıfına İtalyan estetiği kazandırıyor.',
    specs: {
      motorType: 'Tek silindirli, sıvı soğutmalı, SOHC 3 bujili 4 supap',
      power: '12.8 HP @ 9,500 d/d',
      torque: '10.0 Nm @ 8,500 d/d',
      weight: '147 kg',
      seatHeight: '810 mm',
      fuelCapacity: '10 Litre'
    }
  }
];

export const spareParts: SparePart[] = [
  {
    id: 'brembo-gp4-rx-kaliper',
    name: 'Brembo GP4-RX CNC Radyal Fren Kaliper Seti',
    category: 'Fren',
    brand: 'Brembo',
    price: 54000,
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'MotoGP deneyimini yola taşıyan üst seviye CNC kütük fren kaliper takımı.',
    description: 'Brembo GP4-RX fren kaliperleri, alüminyum kütükten CNC ile işlenmiş gövdesi ve nikel kaplaması sayesinde en zorlu fren koşullarında bile mükemmel stabilite ve fren gücü sağlar. Yarış pistleri ve premium cadde kullanımı için tasarlanmıştır.',
    specs: {
      'Kaliper Gövdesi': 'CNC Alüminyum Kütük',
      'Kaplama': 'Nikel Kaplama',
      'Piston Sayısı': '4 (32mm çaplı)',
      'Bağlantı Mesafesi': '108 mm',
      'Kullanım Alanı': 'Süper Spor / Yarış'
    }
  },
  {
    id: 'pirelli-diablo-supercorsa-sp-v4',
    name: 'Pirelli Diablo Supercorsa SP V4 Lastik Takımı',
    category: 'Lastik',
    brand: 'Pirelli',
    price: 24500,
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Yarış pistlerinin efsanevi hamuru, caddeler için tamamen onaylı.',
    description: 'Pirelli Diablo Supercorsa SP V4, World Superbike Şampiyonasından elde edilen hamur yapısıyla caddede ve pistte maksimum yol tutuş, viraj kararlılığı ve hızlanma tork aktarımı sağlar.',
    specs: {
      'Ön Lastik Ebadı': '120/70 ZR17 M/C (58W)',
      'Arka Lastik Ebadı': '200/55 ZR17 M/C (78W)',
      'Hamur Yapısı': 'Çift Bileşenli (SP)',
      'Kullanım Alanı': 'Pist & Yol (50% / 50%)'
    }
  },
  {
    id: 'did-525-zincir',
    name: 'D.I.D 525 ZVM-X Süper Güçlendirilmiş X-Ring Altın Zincir',
    category: 'Zincir',
    brand: 'D.I.D',
    price: 9800,
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Yerçekimine karşı koyan dayanıklılık. Altın kaplamalı X-ring zincir.',
    description: 'D.I.D ZVM-X serisi, patentli X-Ring teknolojisi ile sürtünmeyi en aza indirirken maksimum güç aktarımı ve aşınma direnci sağlar. Altın rengi kaplaması ile premium görünüm ve korozyon koruması sunar.',
    specs: {
      'Zincir Tipi': '525 ZVM-X',
      'Halka Tipi': 'X-Ring',
      'Renk': 'Altın / Altın',
      'Bakla Sayısı': '120 Bakla',
      'Maksimum CC Dayanımı': '1200 cc'
    }
  },
  {
    id: 'akrapovic-titanyum-egzoz-s1000rr',
    name: 'Akrapovic Slip-On Line Titanyum Egzoz (S1000RR)',
    category: 'Aksesuar',
    brand: 'Akrapovic',
    price: 48500,
    stock: 'Sınırlı Stok',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Titanyum gövde ve karbon fiber uçlu efsanevi Akrapovic tınısı.',
    description: 'BMW S1000RR (2020-2024) modelleriyle tam uyumlu Akrapovic slip-on egzoz. Ağırlığı azaltır, güç ve tork artışı sağlarken motosikletinize yarış pistlerinin derin ve benzersiz sesini kazandırır.',
    specs: {
      'Malzeme': 'Yüksek Kalite Titanyum',
      'Uç Malzemesi': 'Karbon Fiber',
      'Ağırlık Tasarrufu': '-1.5 kg',
      'Güç Artışı': '+1.2 kW (13,400 d/d)',
      'Tork Artışı': '+1.0 Nm (13,400 d/d)'
    }
  },
  {
    id: 'motul-300v-yag',
    name: 'Motul 300V Factory Line Road Racing 10W-40 Motor Yağı (4L)',
    category: 'Bakım Ürünleri',
    brand: 'Motul',
    price: 3200,
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Ester Core teknolojili, yarış takımları tarafından onaylı 100% sentetik yağ.',
    description: 'Motul 300V Road Racing, sürtünmeleri en aza indirerek maksimum motor gücü elde etmek, debriyaj hissini artırmak ve şanzıman ömrünü korumak için tasarlanmış özel bir yarış yağıdır.',
    specs: {
      'Viskozite': '10W-40',
      'Hacim': '4 Litre',
      'Teknoloji': 'Ester Core Technology',
      'Tip': '100% Sentetik Double Ester'
    }
  },
  {
    id: 'evotech-koruma-takozu-panigale',
    name: 'Evotech Performance Şasi Koruma Takozu Seti (Panigale V4)',
    category: 'Aksesuar',
    brand: 'Evotech',
    price: 12500,
    stock: 'Stokta Var',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Motosikletinizin gövdesini ve şasisini korumak üzere tasarlanmış CNC koruma.',
    description: 'İngiliz Evotech Performance tarafından Panigale V4 için tasarlanan koruma takozları, gövdede kesme biçme yapmadan doğrudan montajlanır. Darbe emici özel polimer yapısı ile olası düşmelerde şasiyi hasardan korur.',
    specs: {
      'Malzeme': 'CNC Uçak Sınıfı Alüminyum & Derlin',
      'Montaj Tipi': 'Doğrudan (Modifikasyonsuz)',
      'Menşei': 'İngiltere',
      'Uyumlu Model': 'Ducati Panigale V4 / V4 S (2018-2024)'
    }
  }
];

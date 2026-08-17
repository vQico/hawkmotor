# HAWK MOTOR - Veritabanı Entegrasyonu & Admin Paneli Proje Raporu

HAWK MOTOR web uygulaması için tasarlanan **Premium Koyu Tema Admin Paneli (`/admin`)**, **Dinamik Veritabanı (DB) Entegrasyonu**, **Yerel Dosya Yükleme Sistemi** ve **%100 Dinamik CMS Yetenekleri** başarıyla tamamlanmıştır. Uygulamanın tüm sayfaları, bileşenleri, veri çeken Server Component'leri ve Edge-Safe Middleware katmanları TypeScript sıkı tip kontrolü altında sıfır hata ile derlenmiştir (`npm run build` %100 başarıyla tamamlanmıştır).

> [!TIP]
> **Önerilen İşlem:** Proje kodlarını doğrudan çalıştırmak, veritabanını sorgulamak ve yönetmek için lütfen proje kök dizinini aktif çalışma alanınız (Active Workspace) olarak ayarlayın.

---

## 🛠️ Mimari ve Teknolojik Altyapı
- **Framework & Runtime:** Next.js 16.2 & React 19 (Server/Client Bileşen Mimarisi)
- **Veritabanı Katmanı:** Prisma ORM 6.2.1 & SQLite (`prisma/dev.db` - Sıfır bağımlılıkla yerel kurulum)
- **Güvenlik & Kriptografi:** `bcrypt` (Şifre tuzlama & hash'leme) & `jsonwebtoken` (JWT tabanlı oturum yönetimi)
- **Dosya Depolama:** Yerel disk tabanlı güvenli `/public/uploads/` depolama alanı (Harici bulut API key bağımlılığı olmadan %100 offline çalışma garantisi).
- **Edge Rota Koruması:** Hızlı Edge-Safe Cookie analizi yapan `src/middleware.ts` yönlendirici kalkanı.
- **Veri Güvencesi (Zero-Downtime Fallback):** Veritabanına erişilemediği veya bağlantı koptuğu anlarda, sitenin çökmesini engellemek için anında statik dosya konfigürasyonlarını (`src/config/site.ts`) devreye sokan **kesintisiz yedekli veri katmanı** (`src/lib/data.ts`) geliştirilmiştir.

---

## 🚀 Yeni Eklenen Gelişmiş Özellikler

### 1. Yerel Dosya Seçme ve Yükleme Sistemi (Direct File Upload)
- **Modül Rotaları:** [ProductsClient.tsx](./src/app/admin/urunler/ProductsClient.tsx) form pencereleri.
- **Kapak Görseli:** "Resim Seç & Yükle" butonu eklenmiştir. Butona tıklandığında yerel dosya penceresi açılır, seçilen görsel Server Action (`uploadImageAction`) aracılığıyla `/public/uploads/` dizinine yazılır. relative URL `/uploads/filename.ext` form state'ine atanır ve anında **görsel önizleme thumbnail** olarak ekranda belirir.
- **Ürün Galerisi:** Ürünler için sınırsız görsel galerisi yönetim alanı eklendi. "Görsel Ekle" butonuyla galeriyi yerinde büyütebilir, eklenen görselleri galeri ızgarasında görebilir ve üzerindeki **"Çöp Kutusu"** butonuna tıklayarak anında galeriden çıkartabilirsiniz.
- **Gelişmiş Desteği:** İleri düzey yöneticiler için ham JSON dizisini doğrudan düzenleme alanı `<details>` etiketi altına gizlenerek esneklik korunmuştur.

### 2. %100 Dinamik CMS ve Sistem Ayarları
- **Sekme Rotaları:** [SettingsClient.tsx](./src/app/admin/ayarlar/SettingsClient.tsx)
- **Hakkımızda & Değerlerimiz Sekmesi:**
  - `aboutTitle` (Hakkımızda Başlığı)
  - `aboutDesc` (Hakkımızda Kısa Giriş)
  - `aboutText` (Kurumsal Tarihçe Hikayesi)
  - `aboutValues` (Kurumsal Değerler Vizyon - JSON formatında)
  - `aboutMilestones` (Tarihsel Yolculuk Kilometre Taşları - JSON formatında)
- **Yasal Sözleşmeler Sekmesi (Dinamik CRUD Entegrasyonu):**
  - Sözleşmeler artık 5 sabit kolon yerine veritabanındaki `LegalDocument` tablosunda tutulmaktadır.
  - Admin panelindeki "Yasal Sözleşmeler" tabından dilediğiniz kadar sözleşme **ekleyebilir**, **silebilir**, **düzenleyebilir** veya **sıralamasını** değiştirebilirsiniz.
  - Her sözleşme için başlık, özel slug (URL kısa adı), sıra numarası, zengin içerik ve yayında olma durumu (aktif/pasif) kolayca yönetilebilir.
  - Sözleşmelerin içinde dinamik değişken desteği sunulmuştur. Metnin içinde `{settings.phone}` veya `{settings.email}` ifadeleri kullanıldığında, bu kısımlar anında en güncel kurumsal iletişim bilgileri ile değiştirilir.
- **İletişim, E-Posta & Harita Entegrasyonu:**
  - Şirket e-posta adresi (`email`) ve Google Haritalar Embed bağlantısı (`mapUrl`) admin paneline eklendi.
  - İletişim sayfasındaki harita alanı **harika bir CSS filter katmanı** (`grayscale(1) invert(0.9) contrast(1.2)`) ile taranarak Google Maps varsayılan renklerinden kurtarılmış, HAWK MOTOR'un ultra premium metalik koyu temasına %100 uydurulmuştur!

### 3. Kullanılabilirlik ve Tasarım İyileştirmeleri
- **SplashLoader Bypass Filtresi:** Giriş esnasındaki premium intro yükleme ekranının (`SplashLoader.tsx`), yöneticilerin hızlı işlem yapmasını engellememesi adına `/admin/*` yönetim paneli sayfalarında görünmesi engellenmiştir. Admin sayfaları artık anında yüklenmektedir.
- **Navigasyon Düzeltmesi:** Sol üst köşedeki HAWK YÖNETİM logosuna tıklandığında kullanıcının istem dışı olarak ana siteye yönlendirilmesi hatası giderilmiştir. Artık bu logo yöneticileri doğrudan admin anasayfasına (`/admin`) yönlendirmektedir.

### 4. Dinamik Model, Yıl ve Tüm Marka Kataloğu Entegrasyonu
- **Marka & Model Senkronizasyonu:** Admin panelinde ve veritabanı şemasında var olan ancak ana sitedeki envanter listesinde görünmeyen markalar (**RKS**, **Yamaha**, **Honda**, **Suzuki**, **QJ Motor**, **Benelli**, **Voge** vb.) ile tüm modeller ve model yılları veritabanına dinamik olarak entegre edildi.
- **Seeding Güncellemesi:** [seed.ts](./prisma/seed.ts) dosyası güncellenerek statik katalogda yer alan 30 farklı motosiklet modeli ve 6 farklı orijinal yedek parça modeli doğrudan SQLite veritabanına (`prisma/dev.db`) yazılacak şekilde otomatikleştirildi.
- **Model Alanı Entegrasyonu:** `getDbMotorcycles` ve `getDbProduct` veri çekici metodlarına veritabanındaki `model` alanı eşleştirilerek, motosikletlerin model isimlerinin hem admin panelinde hem de ana site katalog kartlarında dinamik olarak sergilenmesi ve arama sonuçlarında filtrenebilmesi sağlandı.

---

## 📂 Revize Edilen ve Eklenen Dosya Yapısı

### 1. CMS & Envanter Entegrasyonu
* **[ProductsClient.tsx](./src/app/admin/urunler/ProductsClient.tsx) [MODIFY]:** Motosiklet ve Yedek Parça formlarına visual dropzone dosya yükleme butonu ve galeri yönetimi eklendi.
* **[SettingsClient.tsx](./src/app/admin/ayarlar/SettingsClient.tsx) [MODIFY]:** "Hakkımızda & Değerlerimiz" ile "Yasal Sözleşmeler" sekmeleri eklendi. Yasal sözleşmeler kısmı tamamen dinamik bir CRUD yönetim tablosuna ve pop-up düzenleme pencerelerine kavuşturuldu.
* **[AdminLayoutClient.tsx](./src/app/admin/AdminLayoutClient.tsx) [MODIFY]:** Sol üst logo bağlantısı `/admin` olarak değiştirildi.
* **[adminActions.ts](./src/app/actions/adminActions.ts) [MODIFY]:** `getAdminLegalDocuments`, `createLegalDocument`, `updateLegalDocument` ve `deleteLegalDocument` Server Action'ları eklendi.
* **[data.ts](./src/lib/data.ts) [MODIFY]:** `getDbLegalDocuments` veri çekici metodu eklenerek tüm yasal sözleşmelerin aktiflik ve sıra numarasına göre dinamik listelenmesi sağlandı.

### 2. Frontend Dinamik Entegrasyonu
* **[yasal/page.tsx](./src/app/yasal/page.tsx) [MODIFY] & [LegalHubClient.tsx](./src/app/yasal/LegalHubClient.tsx) [MODIFY]:** Yasal sözleşmeler sayfası tamamen dinamik `LegalDocument` tablosuna bağlandı. DB'deki sözleşmelere göre otomatik olarak tablar oluşturulur ve metinleri yükler.
* **[hakkimizda/page.tsx](./src/app/hakkimizda/page.tsx) [MODIFY] & [AboutClient.tsx](./src/app/hakkimizda/AboutClient.tsx) [MODIFY]:** Hakkımızda sayfasının başlıkları, vizyon maddeleri, kilometre taşları ve kurumsal tarihçe hikayesi tamamen dinamikleştirildi.
* **[ContactClient.tsx](./src/app/iletisim/ContactClient.tsx) [MODIFY]:** İletişim sayfasındaki e-posta adresi veritabanından çekilir ve harita alanı premium koyu tema Google Maps iframe ile beslenir.
* **[SplashLoader.tsx](./src/components/common/SplashLoader.tsx) [MODIFY]:** Yükleme ekranı `/admin` rotalarında pasifize edildi.
* **[ayarlar/page.tsx](./src/app/admin/ayarlar/page.tsx) [MODIFY] & [SettingsClient.tsx](./src/app/admin/ayarlar/SettingsClient.tsx) [MODIFY]:** Kategoriler, Markalar, Şirket Logosu & Banner görsel yüklemeleri, interaktif Çalışma Saatleri (günler/saatler satır ekleme/silme) ve tüm Sosyal Medya Bağlantıları (Instagram, TikTok, Facebook, X, YouTube, LinkedIn) için dinamik görsel editörler entegre edildi.
* **[ProductsClient.tsx](./src/app/admin/urunler/ProductsClient.tsx) [MODIFY]:** Ürün ekleme/düzenleme formlarındaki kategori ve marka seçicileri tamamen veritabanından çekilen dinamik değerlerle beslendi ve güvenli fallback mantığı yerleştirildi.
* **[adminActions.ts](./src/app/actions/adminActions.ts) [MODIFY]:** `saveSiteSettings` Server Action'ı güncellenerek logoUrl ve bannerUrl alanlarının veritabanında başarıyla güncellenmesi ve oluşturulması sağlandı.
* **[data.ts](./src/lib/data.ts) [MODIFY]:** `getDbSiteSettings` veri çekici metodu güncellenerek `logoUrl`, `bannerUrl` ve `slogan` alanlarının veri katmanından frontend'e güvenle iletilmesi sağlandı.
* **[Header.tsx](./src/components/layout/Header.tsx) [MODIFY] & [Footer.tsx](./src/components/layout/Footer.tsx) [MODIFY]:** Statik logolar, marka isimleri ve sloganlar kaldırılarak tamamen veritabanından çekilen dinamik `logoUrl` (yüklenen kurumsal logo resmi), `name` (site ismi) ve `slogan` verilerine bağlandı.

---

## 🔍 Doğrulama ve Test Sonuçları
- `npm run build` Next.js Turbopack production derleme komutu başarıyla çalıştırılmıştır.
- **TypeScript Derleme Durumu:** `Finished TypeScript` (Sıfır Hata ve Uyarı)
- **Sayfa Optimizasyonu ve Statik Çıktılar:** `Generating static pages ... (16/16) Compiled successfully.` (Sıfır hata ile üretim paketlemesi tamamlandı!)

---

## 🚀 Yönetim Paneline Erişim Kılavuzu
Proje yerel sunucusunu başlattıktan sonra aşağıdaki bilgiler ile admin paneline giriş yapabilirsiniz:

- **Erişim Adresi:** `http://localhost:3000/admin`
- **Varsayılan Yönetici E-Postası:** `admin@hawkmotor.com`
- **Varsayılan Yönetici Şifresi:** `HawkMotor2026!`
- **Dosya Depolama Yolu:** `public/uploads`

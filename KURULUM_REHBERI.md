# HAWK MOTOR - Production Deployment & Kurulum Kılavuzu (A'dan Z'ye)

Bu kılavuz, **Next.js 16 (Turbopack)**, **Prisma ORM** ve **SQLite** altyapısıyla geliştirilen **HAWK MOTOR Web Uygulaması & Yönetim Paneli**'nin production ortamına (canlıya) hatasız, güvenli ve yüksek performanslı bir şekilde kurulması için hazırlanmıştır.

---

## 🛡️ Güvenlik ve Gizlilik Taraması Sonuçları
Tüm codebase üzerinde gerçekleştirilen derin güvenlik ve gizlilik taramalarında:
* **Kişisel Bilgi:** Kod dosyalarının içerisinde hiçbir şekilde kişisel isimler, yerel bilgisayar dizin yolları veya hassas kişisel veriler bulunmamaktadır. Tüm dizin yolları %100 relative (bağıl) veya yapılandırılabilir çevre değişkenleriyle yönetilmektedir.
* **IP Adresleri:** Kod içerisinde hiçbir hardcoded yerel veya harici sunucu IP adresi geçmemektedir. `SettingsClient.tsx` içindeki Google Maps embed parametreleri gibi alfanümerik ifadeler dışında hiçbir ağ ifşaatı bulunmamaktadır.
* **Oturum Güvenliği:** Admin oturumları `jsonwebtoken` (JWT) ve `bcrypt` ile şifrelenmiş cookie katmanları üzerinden, `src/middleware.ts` rotasıyla Edge seviyesinde korunmaktadır.

---

## 💾 SQLite Veritabanı ve Sunucu Gereksinimleri (Kritik Bilgi!)
Projede hafif, hızlı ve sıfır-bakım gerektiren dosya tabanlı **SQLite** veritabanı kullanılmıştır. SQLite, verileri sunucu diskindeki tek bir dosyada (`prisma/dev.db`) tutar.

> [!WARNING]
> **Vercel, Netlify veya AWS Lambda gibi Serverless (Sunucusuz) platformlara kurulum yapmayınız!**
> Serverless sistemler "salt-okunur" (read-only) ve geçici (ephemeral) dosya sistemine sahiptir. Sunucu her yeniden başladığında veritabanınız sıfırlanır, eklediğiniz ürünler, yasal sözleşmeler ve ayarlar kalıcı olarak silinir.
> **Kurulum kesinlikle kalıcı diski (Persistent Storage) olan bir VPS, VDS, Paylaşımlı Hosting veya Dedicated Server üzerine yapılmalıdır.**

---

## 📊 Plesk Panel mi, cPanel mi? Hangisi Daha İyi Çalışır?

| Kriter | 🟢 Plesk Panel (Önerilen - 10/10) | 🔴 cPanel (Önerilmeyen - 4/10) |
| :--- | :--- | :--- |
| **Node.js Desteği** | **Yerleşik & Gelişmiş:** Plesk, resmi Node.js eklentisiyle Next.js uygulamalarını tek tıkla çalıştırır. | **Kısıtlı:** Genelde eski CloudLinux Node.js selector arayüzlerini kullanır ve Next.js derleme adımlarında kilitlenir. |
| **Ters Proxy (Nginx)** | **Otomatik:** Plesk, Node.js portunu otomatik olarak Nginx üzerinden 80/443 portlarına yönlendirir. | **Zor:** Apache tabanlı olduğu için ters proxy kurmak için WHM / root yetkileriyle manuel `.htaccess` ayarları gerekir. |
| **Çevre Değişkenleri** | **Arayüzden:** `JWT_SECRET` gibi değişkenler panel üzerinden kolayca tanımlanır. | **Zor:** `.env` dosyaları ve terminal izinleriyle uğraştırır. |
| **SSL (HTTPS)** | **Tek Tıkla Let's Encrypt:** SSL kurulumu ve otomatik yenileme son derece basittir. | **Standart:** SSL kurulur ancak Node.js servis entegrasyonu kararsız olabilir. |

> [!TIP]
> **Karar:** Eğer bir kontrol paneli kullanacaksanız kesinlikle **Plesk Panel** tercih edin. Plesk, Node.js mimarileri için endüstri standardı bir kolaylık sunar.

---

## 🛠️ Seçenek A: Plesk Panel ile Kurulum Adımları (Adım Adım)

### 1. Dosyaların Hazırlanması ve Yüklenmesi
1. Yerel bilgisayarınızdaki proje klasörünü zip dosyası haline getirin.
   * **UYARI:** `.next`, `node_modules` ve `prisma/dev.db` (eğer sıfır kurulum yapacaksanız) klasörlerini zip dosyasına **dahil etmeyin**.
2. Plesk Panel'e giriş yapın, **Dosya Yöneticisi (File Manager)** üzerinden zip dosyasını sitenizin ana dizinine (`httpdocs`) yükleyin ve zipten çıkarın.

### 2. Plesk Node.js Yapılandırması
1. Plesk sitenizin yönetim ekranında **Node.js** ikonuna tıklayın. (Eğer yüklü değilse, sunucu yöneticinizden Plesk Node.js extension'ı aktif etmesini isteyin).
2. Ayarları şu şekilde yapılandırın:
   * **Node.js Version:** `20.x` veya `18.x` (LTS sürümleri)
   * **Application Mode:** `production`
   * **Application Root:** `/httpdocs`
   * **Document Root:** `/httpdocs/public`
   * **Application Startup File:** `node_modules/next/dist/bin/next` (Plesk Next.js'i bu dosya üzerinden tetikler).
3. **"NPM Install"** butonuna tıklayarak sunucu üzerinde kütüphanelerin temiz bir şekilde kurulmasını sağlayın.

### 3. Çevre Değişkenlerinin Tanımlanması (Environment Variables)
Plesk Node.js arayüzündeki **Variables** kısmından şu iki değişkeni ekleyin:
* `NODE_ENV` = `production`
* `JWT_SECRET` = `CokGizliSifrelemeAnahtari_2026_Hawk` (Admin oturumlarının şifrelenmesi için rastgele uzun bir kelime yazın).

### 4. Prisma Veritabanı Kurulumu ve Derleme (Build)
1. Plesk panelinde **"Terminal"** veya **"SSH"** erişimini açın.
2. Sitenizin dizinine geçiş yapın:
   ```bash
   cd /var/www/vhosts/alanadiniz.com/httpdocs
   ```
3. Veritabanı şemasını oluşturun ve varsayılan verileri yükleyin (Seed):
   ```bash
   npx prisma db push
   npx prisma db seed
   ```
4. Uygulamayı production için derleyin:
   ```bash
   npm run build
   ```
5. Plesk Node.js ekranına geri dönün ve **"Restart App"** butonuna basın. Uygulamanız yayındadır!

---

## 🐧 Seçenek B: Linux VPS / VDS üzerine Saf Kurulum (Önerilen Production Kurulumu)
Eğer kontrol paneli kullanmadan, uygulamanızı saf bir Ubuntu Server üzerine kurup maksimum performans almak istiyorsanız bu adımları izleyin.

### Gereksinimler:
* **İşletim Sistemi:** Ubuntu 22.04 LTS veya Ubuntu 24.04 LTS
* **Minimum Donanım:** 1 vCPU, 1 GB RAM (Next.js derlemesi esnasında RAM sıkışmaması için 2 GB swap alanı ayrılması önerilir).

### 1. Sunucu Hazırlığı & Node.js Kurulumu
Sunucunuza SSH ile bağlanın ve güncelleyin:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential
```
Node.js v20 LTS kurulumu:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### 2. Projenin Yüklenmesi ve Kurulumu
1. Proje dosyalarınızı `/var/www/hawk-motor` klasörüne yükleyin (veya Git ile klonlayın).
2. Klasöre gidin ve bağımlılıkları yükleyin:
   ```bash
   cd /var/www/hawk-motor
   npm install --production=false
   ```

### 3. Prisma Veritabanı Hazırlığı
Veritabanı dosyasını oluşturun, şemayı uygulayın ve varsayılan admin kullanıcısı ile site ayarlarını içeri aktarın:
```bash
npx prisma db push
npx prisma db seed
```

### 4. Next.js Derleme (Build) Adımı
Production çıktılarını oluşturun:
```bash
npm run build
```

### 5. PM2 (Process Manager) ile Arka Planda Çalıştırma
Next.js uygulamasının sunucu kapansa bile arka planda sürekli çalışması ve çökme durumlarında otomatik olarak yeniden başlaması için **PM2** kullanacağız:
```bash
sudo npm install -g pm2
pm2 start "npm run start" --name "hawk-motor"
```
Sunucu yeniden başladığında PM2'nin otomatik devreye girmesi için:
```bash
pm2 startup
pm2 save
```

### 6. Nginx Reverse Proxy (Ters Proxy) Yapılandırması
Kullanıcıların siteye 80 (HTTP) ve 443 (HTTPS) portlarından erişebilmesi için Next.js'in çalıştığı portu (varsayılan 3000) Nginx ile yönlendiriyoruz.

Nginx yükleyin:
```bash
sudo apt install -y nginx
```
Yapılandırma dosyasını oluşturun:
```bash
sudo nano /etc/nginx/sites-available/hawk-motor
```
Aşağıdaki blokları yapıştırın (alanadiniz.com kısımlarını güncelleyin):
```nginx
server {
    listen 80;
    server_name alanadiniz.com www.alanadiniz.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # public/uploads klasörünün doğrudan Nginx tarafından hızlı servis edilmesi (Performans Optimizasyonu)
    location /uploads/ {
        alias /var/www/hawk-motor/public/uploads/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```
Dosyayı kaydedip çıkın (CTRL+O, Enter, CTRL+X).
Sanal hostu aktif edin ve Nginx'i yeniden başlatın:
```bash
sudo ln -s /etc/nginx/sites-available/hawk-motor /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### 7. Let's Encrypt SSL (Güvenli Bağlantı) Kurulumu
Sitenizi anında HTTPS şifreleme sertifikasıyla korumak için Certbot kullanın:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d alanadiniz.com -d www.alanadiniz.com
```
Yönergeleri izleyin ve HTTP trafiğini HTTPS'e otomatik yönlendirme seçeneğini (Redirect) seçin.

---

## 🛠️ Üretim Sonrası Bakım ve Güncelleme İşlemleri
Sitede gelecekte bir kod güncellemesi yapmak istediğinizde izlemeniz gereken komut sırası:

```bash
cd /var/www/hawk-motor
git pull   # veya yeni dosyaları yükleyin
npm install
npm run build
pm2 restart hawk-motor
```

Artık premium **HAWK MOTOR** web siteniz ve yüksek güvenlikli yönetim paneliniz canlı yayına çıkmaya %100 hazırdır!

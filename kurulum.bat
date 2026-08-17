@echo off
title HAWK MOTOR - Otomatik Kurulum Sihirbazi
color 0b
echo =======================================================================
echo                 HAWK MOTOR AUTOMATED SETUP WIZARD (WINDOWS)
echo =======================================================================
echo.
echo Bu sihirbaz, HAWK MOTOR web uygulamasinin tum bagimliliklarini yukleyecek,
echo veritabanini olusturacak, seed verilerini aktaracak ve sistemi baslatacaktir.
echo.
echo GEREKSINIM: Bilgisayarinizda Node.js kurulmus olmalidir.
echo.
pause

echo.
echo [1/4] NPM paketleri yukleniyor (Bu islem birkac dakika surebilir)...
call npm install
if %ERRORLEVEL% neq 0 (
    color 0c
    echo HATA: NPM paketleri yuklenirken bir sorun olustu! Lutfen internet baglantinizi ve Node.js surumunuzu kontrol edin.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/4] Veritabanı semasi SQLite uzerine uygulaniyor...
call npx prisma db push
if %ERRORLEVEL% neq 0 (
    color 0c
    echo HATA: Prisma veritabani eslestirmesi basarisiz oldu!
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [3/4] Varsayilan Yonetici ve Motosiklet katalog verileri yukleniyor (Seed)...
call npx tsx prisma/seed.ts
if %ERRORLEVEL% neq 0 (
    color 0c
    echo HATA: Veritabanina baslangic verileri (Seed) yuklenemedi!
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [4/4] Uygulama production icin derleniyor (Build)...
call npm run build
if %ERRORLEVEL% neq 0 (
    color 0c
    echo HATA: Next.js derleme (build) islemi basarisiz oldu!
    pause
    exit /b %ERRORLEVEL%
)

color 0a
echo.
echo =======================================================================
echo TEBRIKLER! HAWK MOTOR KURULUMU BASARIYLA TAMAMLANDI.
echo =======================================================================
echo.
echo Yonetim Paneli Giris Bilgileri:
echo - Adres: http://localhost:3000/admin
echo - E-Posta: admin@hawkmotor.com
echo - Sifre: HawkMotor2026!
echo.
echo Uygulama simdi baslatiliyor (Tarayicinizdan http://localhost:3000 adresine gidin)...
echo.
call npm run start
pause

#!/bin/bash

# Renkli ciktilar icin renk kodlari
GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}=======================================================================${NC}"
echo -e "${CYAN}                 HAWK MOTOR AUTOMATED SETUP WIZARD (LINUX/MAC)         ${NC}"
echo -e "${CYAN}=======================================================================${NC}"
echo ""
echo "Bu sihirbaz, HAWK MOTOR web uygulamasinin tum bagimliliklarini yukleyecek,"
echo "veritabanini olusturacak, seed verilerini aktaracak ve sistemi baslatacaktir."
echo ""
echo "GEREKSINIM: Bilgisayarinizda Node.js ve npm kurulmus olmalidir."
echo ""
read -p "Devam etmek icin [ENTER] tusuna basin..."

# Node.js kontrolu
if ! command -v node &> /dev/null; then
    echo -e "${RED}HATA: Node.js kurulu degil! Lutfen once Node.js yukleyin.${NC}"
    exit 1
fi

# npm kontrolu
if ! command -v npm &> /dev/null; then
    echo -e "${RED}HATA: npm kurulu degil! Lutfen once npm yukleyin.${NC}"
    exit 1
fi

echo ""
echo -e "${CYAN}[1/4] NPM paketleri yukleniyor (Bu islem birkac dakika surebilir)...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}HATA: NPM paketleri yuklenirken bir sorun olustu!${NC}"
    exit 1
fi

echo ""
echo -e "${CYAN}[2/4] Veritabanı semasi SQLite uzerine uygulaniyor...${NC}"
npx prisma db push
if [ $? -ne 0 ]; then
    echo -e "${RED}HATA: Prisma veritabani eslestirmesi basarisiz oldu!${NC}"
    exit 1
fi

echo ""
echo -e "${CYAN}[3/4] Varsayilan Yonetici ve Motosiklet katalog verileri yukleniyor (Seed)...${NC}"
npx tsx prisma/seed.ts
if [ $? -ne 0 ]; then
    echo -e "${RED}HATA: Veritabanina baslangic verileri (Seed) yuklenemedi!${NC}"
    exit 1
fi

echo ""
echo -e "${CYAN}[4/4] Uygulama production icin derleniyor (Build)...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}HATA: Next.js derleme (build) islemi basarisiz oldu!${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}=======================================================================${NC}"
echo -e "${GREEN}TEBRIKLER! HAWK MOTOR KURULUMU BASARIYLA TAMAMLANDI.                   ${NC}"
echo -e "${GREEN}=======================================================================${NC}"
echo ""
echo "Yonetim Paneli Giris Bilgileri:"
echo -e " - Adres: ${GREEN}http://localhost:3000/admin${NC}"
echo -e " - E-Posta: ${GREEN}admin@hawkmotor.com${NC}"
echo -e " - Sifre: ${GREEN}HawkMotor2026!${NC}"
echo ""
echo "Uygulama simdi baslatiliyor (Tarayicinizdan http://localhost:3000 adresine gidin)..."
echo ""

npm run start

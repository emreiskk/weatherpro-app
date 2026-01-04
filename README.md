# WeatherPro - Modern Hava Durumu Uygulaması

**OpenWeatherMap API** entegrasyonu ile geliştirilmiş, **Next.js 15** tabanlı modern ve responsive hava durumu web uygulaması.

## 🌟 Özellikler

- **Gerçek Zamanlı Hava Durumu**: Şehir bazlı anlık hava durumu bilgileri
- **5 Günlük Tahmin**: İleriye dönük detaylı hava tahminleri
- **24 Saatlik Tahmin**: Saatlik sıcaklık ve hava durumu grafikleri
- **Hava Kalitesi**: AQI, PM2.5, PM10, O₃ ve NO₂ değerleri
- **Detaylı Bilgiler**: Rüzgar hızı, basınç, nem, görüş mesafesi
- **Gün Doğumu/Batımı**: Güneş saatleri bilgisi
- **Konum Desteği**: Otomatik konum algılama
- **Animasyonlu İkonlar**: Hava durumuna göre özel tasarlanmış animasyonlu SVG ikonlar

## 🎨 Tasarım & Teknoloji

- **Glassmorphism UI**: Modern cam efekti tasarım
- **Framer Motion**: Akıcı animasyonlar ve geçişler
- **Recharts**: İnteraktif sıcaklık grafikleri
- **Responsive**: Tüm cihazlarda mükemmel görünüm
- **TypeScript**: Tip güvenli kod yapısı
- **Tailwind CSS**: Modern ve özelleştirilebilir stil sistemi

## 🚀 Teknolojiler

- Next.js 15.1.6
- React 19
- TypeScript 5
- Tailwind CSS 3.4
- Framer Motion 12.4
- Recharts
- Lucide React Icons

## 📦 Kurulum

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd appweather
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env.local` dosyası oluşturun ve API anahtarınızı ekleyin:
```env
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 🔑 API Anahtarı

Bu proje [OpenWeatherMap API](https://openweathermap.org/api) kullanmaktadır. Ücretsiz API anahtarı almak için:

1. [OpenWeatherMap](https://openweathermap.org/api) sitesine gidin
2. Ücretsiz hesap oluşturun
3. API anahtarınızı `.env.local` dosyasına ekleyin

## 📝 Kullanılan API'ler

- **Current Weather Data**: Anlık hava durumu bilgileri
- **5 Day / 3 Hour Forecast**: 5 günlük tahmin verileri
- **Air Pollution API**: Hava kalitesi verileri

## 🎯 Özellik Detayları

### Ana Hava Durumu Kartı
- Şehir adı ve ülke kodu
- Anlık sıcaklık (büyük gösterim)
- Hava durumu açıklaması
- Animasyonlu hava durumu ikonu

### Detaylar Kartı
- Hissedilen sıcaklık
- En yüksek/düşük sıcaklık
- Nem oranı

### Sıcaklık Grafiği
- 12 saatlik sıcaklık trendi
- İnteraktif grafik (Recharts)
- Responsive tasarım

### Hava Durumu Detayları
- Rüzgar hızı (m/s)
- Basınç (hPa)
- Görüş mesafesi (km)
- Rüzgar yönü (derece)

### 5 Günlük Tahmin
- Grid layout (responsive)
- Her gün için ortalama sıcaklık
- Hava durumu ikonu ve açıklama

### Hava Kalitesi
- AQI (Air Quality Index)
- PM2.5 ve PM10 değerleri
- O₃ (Ozon) değeri
- NO₂ (Nitrojen Dioksit) değeri

### Gün Işığı
- Gündoğumu saati
- Günbatımı saati
- Renkli icon'lar ile görsel gösterim

### Saatlik Hava Durumu
- 24 saatlik tahmin
- Yatay scroll
- Her saat için icon ve sıcaklık

## 🎨 Tasarım Sistemi

### Renkler
- Glassmorphism efekt: `bg-white/10`, `bg-white/5`
- Blur efekt: `backdrop-blur-xl`
- Dinamik gradient arka planlar

### Animasyonlar
- Framer Motion ile smooth geçişler
- Hover efektleri
- Scroll animasyonları
- Özel hava durumu icon animasyonları

### Responsive Breakpoints
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## 📱 Responsive Tasarım

Uygulama tüm ekran boyutlarında optimize edilmiştir:
- **Mobil**: 2 kolonlu grid'ler
- **Tablet**: 3 kolonlu grid'ler
- **Masaüstü**: 5 kolonlu grid'ler

## 🛠️ Geliştirme

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Production sunucusu
npm run start

# Linting
npm run lint
```

## 📄 Lisans

© 2025 EMRE IŞIK - Tüm hakları saklıdır.

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Pull request göndermekten çekinmeyin.

## 📧 İletişim

Sorularınız için issue açabilirsiniz.

---

**Not**: Bu proje eğitim ve portfolyo amaçlı geliştirilmiştir.

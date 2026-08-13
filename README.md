<div align="center">

# 🌤️ WeatherPro
### Next.js 15 & OpenWeatherMap API ile Geliştirilmiş Modern Hava Durumu Platformu

[![Canlı Demo](https://img.shields.io/badge/Canlı%20Demo-Vercel-007ACC?style=for-the-badge&logo=vercel&logoColor=white)](https://weatherpro-3kobxibgr-projects-projects-98062c87.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js%2015-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[🌐 **Canlı Uygulamayı Ziyaret Et**](https://weatherpro-3kobxibgr-projects-projects-98062c87.vercel.app/) • [✉️ **İletişim & Geri Bildirim**](mailto:emreisikdeveloper@gmail.com)

</div>

---

## 📌 WeatherPro Hakkında

**WeatherPro**, **OpenWeatherMap API** entegrasyonu ile geliştirilmiş, anlık ve ileriye dönük hava tahminlerini modern **Glassmorphism** arayüzü ve akıcı animasyonlarla sunan **Next.js 15** tabanlı responsive web uygulamasıdır.

Kullanıcıların otomatik konum algılama veya şehir araması ile 24 saatlik ve 5 günlük tahminlere, hava kalitesi (AQI) indekslerine, rüzgar/basınç/nem detaylarına ve gün doğumu/batımı grafiklerine anında erişmesini sağlar.

---

## ✨ Önemli Özellikler

- 🌤️ **Gerçek Zamanlı Hava Durumu**: Şehir bazlı anlık sıcaklık, hissedilen sıcaklık ve dinamik hava durumu bilgileri.
- 📅 **5 Günlük & 24 Saatlik Tahmin**: Detaylı 5 günlük tahmin grid'i ve saatlik sıcaklık değişim grafikleri.
- 🍃 **Hava Kalitesi İndeksi (AQI)**: PM2.5, PM10, O₃ ve NO₂ hava kirlilik değerlerinin canlı takibi.
- 📊 **İnteraktif Sıcaklık Grafikleri**: Recharts ile desteklenmiş 12-24 saatlik görsel sıcaklık trendi.
- 🌅 **Güneş Döngüsü & Detaylar**: Rüzgar hızı/yönü, nem oranı, görüş mesafesi, basınç ve gün doğumu/batımı saatleri.
- 🎨 **Glassmorphism & Animasyonlar**: Framer Motion ile yumuşak geçişler, cam efektli UI ve dinamik SVG hava durumu ikonları.
- 📱 **Tam Responsive Tasarım**: Mobil, tablet ve masaüstü cihazlar için özel grid düzenleri.

---

## 🛠️ Teknoloji Yığını ve Mimari

| Katman | Kullanılan Teknolojiler |
| :--- | :--- |
| **Web Çerçevesi** | Next.js 15 (App Router), React 19 |
| **Dil ve Stil** | TypeScript, Tailwind CSS, Glassmorphism UI |
| **Animasyon & Grafik** | Framer Motion, Recharts, Lucide Icons |
| **Hava Durumu API** | OpenWeatherMap API (Current, Forecast, Air Pollution) |
| **Barındırma / Yayın** | Vercel |

---

## 📦 Kurulum ve Çalıştırma

1. Projeyi klonlayın:
```bash
git clone https://github.com/emreiskk/weatherpro-app.git
cd weatherpro-app
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env.local` dosyası oluşturun ve OpenWeatherMap API anahtarınızı ekleyin:
```env
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

---

<div align="center">

**Mehmet Emre Işık** Tarafından Tasarlandı ve Geliştirildi  
© 2026 WeatherPro. Tüm Hakları Saklıdır.

</div>

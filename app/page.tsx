"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Wind,
  Gauge,
  Eye,
  Sunrise,
  Sunset,
  MapPin,
  TrendingUp,
  CloudRain,
  Navigation,
} from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import GlassCard from "@/components/GlassCard";
import WeatherChart from "@/components/WeatherChart";
import WeatherIcon from "@/components/WeatherIcon";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
  };
  weather: { description: string; icon: string; main: string }[];
  sys: { sunrise: number; sunset: number; country: string };
  wind: { speed: number; deg: number };
  visibility: number;
  coord: { lat: number; lon: number };
}

interface AirQualityData {
  list: Array<{
    main: { aqi: number };
    components: {
      co: number;
      no2: number;
      o3: number;
      pm2_5: number;
      pm10: number;
    };
  }>;
}

interface ForecastItem {
  dt: number;
  main: { temp: number };
  weather: { icon: string; description: string; main: string }[];
}

interface WeeklyForecastItem {
  day: string;
  averageTemp: string;
  weather: { icon: string; description: string; main: string };
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>("Istanbul");
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [weeklyForecast, setWeeklyForecast] = useState<WeeklyForecastItem[]>([]);
  const [searchCity, setSearchCity] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);

  const fetchWeather = async (query: string) => {
    setError("");
    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&lang=tr&units=metric&appid=${apiKey}`
      );
      if (!res.ok) throw new Error("Şehir bulunamadı!");
      const data: WeatherData = await res.json();
      setWeather(data);
      setCity(data.name);

      // Fetch air quality
      fetchAirQuality(data.coord.lat, data.coord.lon);
    } catch (err) {
      setError("Şehir bulunamadı. Lütfen geçerli bir şehir adı girin.");
      setWeather(null);
      console.error(err);
    }
  };

  const fetchAirQuality = async (lat: number, lon: number) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      if (res.ok) {
        const data = await res.json();
        setAirQuality(data);
      }
    } catch (err) {
      console.error("Hava kalitesi alınamadı:", err);
    }
  };

  const fetchForecast = async (query: string) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query}&lang=tr&units=metric&appid=${apiKey}`
      );
      if (!res.ok) throw new Error("Hava tahmini alınamadı!");

      const data = await res.json();
      setForecast(data.list);

      interface DayData {
        totalTemp: number;
        count: number;
        weather: { icon: string; description: string };
      }

      const upcomingDays: Record<string, DayData> = {};

      data.list.forEach((item: ForecastItem) => {
        const date = new Date(item.dt * 1000).toLocaleDateString("tr-TR", {
          weekday: "short",
        });
        if (!upcomingDays[date]) {
          upcomingDays[date] = {
            totalTemp: 0,
            count: 0,
            weather: item.weather[0],
          };
        }
        upcomingDays[date].totalTemp += item.main.temp;
        upcomingDays[date].count++;
      });

      const dailyForecast = Object.entries(upcomingDays).map(([day, data]: [string, DayData]) => ({
        day,
        averageTemp: (data.totalTemp / data.count).toFixed(1),
        weather: data.weather,
      }));

      setWeeklyForecast(dailyForecast.slice(0, 5));
    } catch (err) {
      console.error("Hava tahmini alınırken hata oluştu:", err);
    }
  };

  useEffect(() => {
    fetchWeather(city);
    fetchForecast(city);
  }, [city]);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=tr`;

            fetch(url)
              .then((response) => response.json())
              .then((data) => {
                setWeather(data);
                setCity(data.name);
                fetchAirQuality(latitude, longitude);
              })
              .catch(() => {
                setError("Hava durumu verisi alınırken bir hata oluştu.");
              });
          },
          () => {
            fetchWeather("Istanbul");
          }
        );
      } else {
        fetchWeather("Istanbul");
      }
    };

    getLocation();
  }, []);

  const handleSearch = () => {
    if (searchCity.trim()) {
      fetchWeather(searchCity);
      fetchForecast(searchCity);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getAQILevel = (aqi: number) => {
    const levels = [
      { label: "Mükemmel", color: "text-green-400" },
      { label: "İyi", color: "text-lime-400" },
      { label: "Orta", color: "text-yellow-400" },
      { label: "Kötü", color: "text-orange-400" },
      { label: "Çok Kötü", color: "text-red-400" },
    ];
    return levels[aqi - 1] || levels[0];
  };

  if (error && !weather) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AnimatedBackground />
        <div className="text-center text-white text-xl">{error}</div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AnimatedBackground />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12">
      <AnimatedBackground weatherCondition={weather.weather[0].main} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            WeatherPro
          </h1>

          {/* Search Bar */}
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <Search className="text-white/70" size={24} />
              <input
                type="text"
                placeholder="Şehir ara..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white text-lg placeholder-white/50 focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white font-medium transition-all"
              >
                Ara
              </button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Main Content - Full Width Layout */}
        <div className="space-y-5">
          {/* Current Weather */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <GlassCard className="p-6" delay={0.1}>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-white/80" size={20} />
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {weather.name}, {weather.sys.country}
                  </h2>
                  <p className="text-white/70 text-sm capitalize">
                    {weather.weather[0].description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-end gap-2">
                  <span className="text-7xl font-bold text-white">
                    {Math.round(weather.main.temp)}°
                  </span>
                  <span className="text-3xl text-white/60 mb-3">C</span>
                </div>
                <WeatherIcon condition={weather.weather[0].main} size="xl" />
              </div>
            </GlassCard>

            <GlassCard className="p-6" delay={0.15}>
              <h3 className="text-lg font-bold text-white mb-4">Detaylar</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60 text-xs mb-1">Hissedilen</p>
                  <p className="text-white text-xl font-semibold">
                    {Math.round(weather.main.feels_like)}°C
                  </p>
                </div>
                <div>
                  <p className="text-white/60 text-xs mb-1">Nem</p>
                  <p className="text-white text-xl font-semibold">
                    {weather.main.humidity}%
                  </p>
                </div>
                <div>
                  <p className="text-white/60 text-xs mb-1">En Yüksek</p>
                  <p className="text-white text-xl font-semibold">
                    {Math.round(weather.main.temp_max)}°C
                  </p>
                </div>
                <div>
                  <p className="text-white/60 text-xs mb-1">En Düşük</p>
                  <p className="text-white text-xl font-semibold">
                    {Math.round(weather.main.temp_min)}°C
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

            {/* Temperature Chart */}
            {forecast.length > 0 && (
              <GlassCard className="p-5" delay={0.2}>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="text-white/80" size={18} />
                  <h3 className="text-lg font-bold text-white">Sıcaklık Grafiği</h3>
                </div>
                <WeatherChart data={forecast} />
              </GlassCard>
            )}

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <GlassCard className="p-4" delay={0.3}>
                <div className="flex flex-col items-center text-center">
                  <Wind className="text-white/80 mb-2" size={28} />
                  <p className="text-white/60 text-xs mb-1">Rüzgar</p>
                  <p className="text-white text-xl font-bold">
                    {weather.wind.speed}
                  </p>
                  <p className="text-white/60 text-xs">m/s</p>
                </div>
              </GlassCard>

              <GlassCard className="p-4" delay={0.35}>
                <div className="flex flex-col items-center text-center">
                  <Gauge className="text-white/80 mb-2" size={28} />
                  <p className="text-white/60 text-xs mb-1">Basınç</p>
                  <p className="text-white text-xl font-bold">
                    {weather.main.pressure}
                  </p>
                  <p className="text-white/60 text-xs">hPa</p>
                </div>
              </GlassCard>

              <GlassCard className="p-4" delay={0.4}>
                <div className="flex flex-col items-center text-center">
                  <Eye className="text-white/80 mb-2" size={28} />
                  <p className="text-white/60 text-xs mb-1">Görüş</p>
                  <p className="text-white text-xl font-bold">
                    {(weather.visibility / 1000).toFixed(1)}
                  </p>
                  <p className="text-white/60 text-xs">km</p>
                </div>
              </GlassCard>

              <GlassCard className="p-4" delay={0.45}>
                <div className="flex flex-col items-center text-center">
                  <Navigation
                    className="text-white/80 mb-2"
                    size={28}
                    style={{ transform: `rotate(${weather.wind.deg}deg)` }}
                  />
                  <p className="text-white/60 text-xs mb-1">Yön</p>
                  <p className="text-white text-xl font-bold">
                    {weather.wind.deg}°
                  </p>
                  <p className="text-white/60 text-xs">derece</p>
                </div>
              </GlassCard>
            </div>

          {/* 5 Day Forecast - Grid Layout */}
          <GlassCard className="p-5" delay={0.4}>
            <h3 className="text-lg font-bold text-white mb-3">5 Günlük Tahmin</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {weeklyForecast.map((day, index) => {
                const date = new Date();
                date.setDate(date.getDate() + index + 1);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex flex-col items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <span className="text-white/70 text-sm font-medium mb-2">
                      {date.toLocaleDateString("tr-TR", { weekday: "short" })}
                    </span>
                    <WeatherIcon condition={day.weather.main} size="md" />
                    <span className="text-white/60 text-xs mt-2 capitalize text-center">
                      {day.weather.description}
                    </span>
                    <span className="text-white text-2xl font-bold mt-2">
                      {day.averageTemp}°
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>

          {/* Air Quality & Sun Times Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Air Quality */}
            {airQuality && airQuality.list[0] && (
              <GlassCard className="p-5" delay={0.5}>
                <div className="flex items-center gap-2 mb-3">
                  <CloudRain className="text-white/80" size={18} />
                  <h3 className="text-lg font-bold text-white">Hava Kalitesi</h3>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  <div className="text-center">
                    <p className="text-white/60 text-xs mb-1">AQI</p>
                    <p className={`text-xl font-bold ${getAQILevel(airQuality.list[0].main.aqi).color}`}>
                      {airQuality.list[0].main.aqi}
                    </p>
                    <p className="text-white/60 text-xs">
                      {getAQILevel(airQuality.list[0].main.aqi).label}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/60 text-xs mb-1">PM2.5</p>
                    <p className="text-white text-lg font-semibold">
                      {airQuality.list[0].components.pm2_5.toFixed(1)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/60 text-xs mb-1">PM10</p>
                    <p className="text-white text-lg font-semibold">
                      {airQuality.list[0].components.pm10.toFixed(1)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/60 text-xs mb-1">O₃</p>
                    <p className="text-white text-lg font-semibold">
                      {airQuality.list[0].components.o3.toFixed(1)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/60 text-xs mb-1">NO₂</p>
                    <p className="text-white text-lg font-semibold">
                      {airQuality.list[0].components.no2.toFixed(1)}
                    </p>
                  </div>
                </div>
              </GlassCard>
            )}

            {/* Sun Times */}
            <GlassCard className="p-5" delay={0.55}>
              <div className="flex items-center gap-2 mb-4">
                <Sunrise className="text-orange-300" size={18} />
                <h3 className="text-lg font-bold text-white">Gün Işığı</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className="p-2 rounded-full bg-orange-400/20">
                    <Sunrise className="text-orange-300" size={20} />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs mb-0.5">Gündoğumu</p>
                    <p className="text-white text-lg font-semibold">
                      {new Date(weather.sys.sunrise * 1000).toLocaleTimeString("tr-TR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className="p-2 rounded-full bg-purple-400/20">
                    <Sunset className="text-purple-300" size={20} />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs mb-0.5">Günbatımı</p>
                    <p className="text-white text-lg font-semibold">
                      {new Date(weather.sys.sunset * 1000).toLocaleTimeString("tr-TR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Hourly Forecast - Horizontal Scroll */}
        <GlassCard className="p-5 mt-5" delay={0.5}>
          <h3 className="text-lg font-bold text-white mb-3">Saatlik Hava Durumu</h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {forecast.slice(0, 24).map((hour, index) => {
              const time = new Date(hour.dt * 1000);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.02 }}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all min-w-[90px]"
                >
                  <span className="text-white/70 text-xs mb-2">
                    {time.toLocaleTimeString("tr-TR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <WeatherIcon condition={hour.weather[0].main} size="md" />
                  <span className="text-white text-lg font-bold mt-2">
                    {Math.round(hour.main.temp)}°
                  </span>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-white/50 text-sm"
        >
          <p>WeatherPro © 2025 EMRE IŞIK - Tüm hakları saklıdır.</p>
        </motion.div>
      </div>
    </div>
  );
}

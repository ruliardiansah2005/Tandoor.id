import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Droplets, 
  ThermometerSun, 
  Wind,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Leaf,
  Crown,
  Zap,
  MapPin
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useAuth } from "../contexts/AuthContext";
import { UpgradeModal } from "../components/UpgradeModal";
import { LockedFeature } from "../components/LockedFeature";
import { ChartWrapper } from "../components/ChartWrapper";
import { WhatsAppNotifier } from "../components/WhatsAppNotifier";
import { AdBanner } from "../components/AdBanner";
import { useNavigate } from "react-router";

export function Dashboard() {
  const { isAuthenticated, isPremium, user } = useAuth();
  const navigate = useNavigate();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // --- STATE CUACA & LOKASI ---
  const [currentWeather, setCurrentWeather] = useState({
    temp: 0,
    humidity: 0,
    wind: 0,
    condition: "Mendeteksi Lokasi...",
    locationName: "Mencari lokasi..."
  });
  const [weatherData, setWeatherData] = useState([]);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // --- FUNGSI FETCH CUACA BERDASARKAN KOORDINAT ---
  const fetchWeather = async (lat, lon) => {
    try {
      setIsLoadingWeather(true);
      
      // Open-Meteo API (Akurasi tinggi untuk wilayah Indonesia & No CORS issue)
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,relative_humidity_2m_max,precipitation_sum&timezone=auto`
      );
      const data = await response.json();

      // Mapping Kode Cuaca WMO ke Deskripsi Bahasa Indonesia
      const weatherCodes = {
        0: "Cerah",
        1: "Cerah Berawan", 2: "Berawan", 3: "Mendung",
        45: "Kabut", 51: "Gerimis", 61: "Hujan Ringan", 
        63: "Hujan", 80: "Hujan Deras", 95: "Badai Petir"
      };

      // 1. Update Cuaca Saat Ini
      setCurrentWeather(prev => ({
        ...prev,
        temp: Math.round(data.current.temperature_2m),
        humidity: data.current.relative_humidity_2m,
        wind: data.current.wind_speed_10m,
        condition: weatherCodes[data.current.weather_code] || "Berawan"
      }));

      // 2. Update Prakiraan 7 Hari (Premium Feature)
      const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
      const formattedForecast = data.daily.time.map((dateStr, index) => {
        const date = new Date(dateStr);
        return {
          id: `wd-${index}`,
          day: days[date.getDay()],
          temp: Math.round(data.daily.temperature_2m_max[index]),
          humidity: data.daily.relative_humidity_2m_max[index],
          rain: data.daily.precipitation_sum[index]
        };
      });
      
      setWeatherData(formattedForecast);
    } catch (error) {
      console.error("Gagal mengambil data cuaca:", error);
    } finally {
      setIsLoadingWeather(false);
    }
  };

  // --- DETEKSI LOKASI OTOMATIS ---
  useEffect(() => {
    if (isAuthenticated) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentWeather(prev => ({ ...prev, locationName: "Lokasi Terdeteksi" }));
            fetchWeather(latitude, longitude);
            
            // Auto-refresh setiap 15 menit
            const interval = setInterval(() => fetchWeather(latitude, longitude), 900000);
            return () => clearInterval(interval);
          },
          (error) => {
            console.error("Akses lokasi ditolak:", error);
            // Fallback ke koordinat Jakarta jika lokasi ditolak
            setCurrentWeather(prev => ({ ...prev, locationName: "Jakarta (Default)" }));
            fetchWeather(-6.2088, 106.8456);
          }
        );
      }
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  // --- MOCK DATA ---
  const plantHealthData = [
    { date: "Jan", health: 85 }, { date: "Feb", health: 88 },
    { date: "Mar", health: 90 }, { date: "Apr", health: 87 },
    { date: "Mei", health: 92 }, { date: "Jun", health: 95 },
  ];

  const productivityData = [
    { month: "Jan", yield: 4200, target: 4000 },
    { month: "Feb", yield: 4500, target: 4200 },
    { month: "Mar", yield: 4800, target: 4500 },
    { month: "Apr", yield: 4600, target: 4400 },
    { month: "Mei", yield: 5100, target: 4800 },
    { month: "Jun", yield: 5400, target: 5000 },
  ];

  const cards = [
    { title: "Kesehatan Tanaman", value: "95.2%", change: "+3.5%", trend: "up", icon: Leaf, color: "from-green-500 to-emerald-500", status: "Sangat Baik", locked: false },
    { title: "Stok Hasil Tani", value: "8,450 kg", change: "+12%", trend: "up", icon: CheckCircle, color: "from-blue-500 to-cyan-500", status: "Tersedia", locked: false },
    { title: "Prediksi Panen", value: "15 Hari", change: "On Track", trend: "neutral", icon: Calendar, color: "from-purple-500 to-indigo-500", status: "Sesuai Jadwal", locked: !isPremium },
    { title: "Efisiensi Air", value: "87%", change: "+5%", trend: "up", icon: Droplets, color: "from-cyan-500 to-blue-500", status: "Optimal", locked: !isPremium },
  ];

  const recommendations = [
    { priority: "high", title: "Irigasi Diperlukan", description: "Area Blok C kering. Tingkatkan irigasi 20%.", action: "Terapkan", icon: AlertTriangle, color: "text-orange-600 bg-orange-100" },
    { priority: "medium", title: "Waktu Pupuk", description: "Cuaca ideal untuk NPK dalam 48 jam ke depan.", action: "Jadwalkan", icon: CheckCircle, color: "text-green-600 bg-green-100" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard Pertanian</h1>
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>{currentWeather.locationName}</span>
              <span className="mx-2">|</span>
              <p>Halo, {user?.name}! 👋</p>
            </div>
          </div>
          {!isPremium && (
            <button onClick={() => setShowUpgradeModal(true)} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg hover:shadow-lg transition-all font-semibold">
              <Crown className="w-5 h-5" /> Upgrade ke Premium
            </button>
          )}
        </div>

        {/* Weather Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 mb-8 text-white relative overflow-hidden shadow-xl">
          {isLoadingWeather && (
            <div className="absolute inset-0 bg-blue-700/50 backdrop-blur-sm flex items-center justify-center z-10">
              <span className="animate-pulse font-semibold text-lg">Sinkronisasi Cuaca Real-time...</span>
            </div>
          )}
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <div className="text-sm opacity-90 mb-1 font-medium tracking-wide uppercase">Kondisi Lahan Terkini</div>
              <div className="text-4xl font-bold capitalize">{currentWeather.condition}</div>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-xl"><ThermometerSun className="w-6 h-6" /></div>
                <div><div className="text-2xl font-bold">{currentWeather.temp}°C</div><div className="text-xs opacity-75">Suhu</div></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-xl"><Droplets className="w-6 h-6" /></div>
                <div><div className="text-2xl font-bold">{currentWeather.humidity}%</div><div className="text-xs opacity-75">Lembab</div></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-xl"><Wind className="w-6 h-6" /></div>
                <div><div className="text-2xl font-bold">{currentWeather.wind} <span className="text-sm">km/h</span></div><div className="text-xs opacity-75">Angin</div></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} onClick={card.locked ? () => setShowUpgradeModal(true) : undefined} className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all ${card.locked ? 'cursor-pointer hover:bg-slate-50' : 'hover:shadow-md'}`}>
                {card.locked ? (
                  <div className="flex flex-col items-center justify-center py-2">
                    <Crown className="w-8 h-8 text-yellow-500 mb-2" />
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">{card.title}</p>
                    <p className="text-xs text-blue-500 font-semibold mt-1">Unlock Premium</p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color}`}><Icon className="w-6 h-6 text-white" /></div>
                      <span className={`flex items-center text-sm font-medium ${card.trend === 'up' ? 'text-green-600' : 'text-slate-500'}`}>
                        {card.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : null} {card.change}
                      </span>
                    </div>
                    <div className="text-sm text-slate-500">{card.title}</div>
                    <div className="text-3xl font-bold">{card.value}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" /> Tren Kesehatan Tanaman (%)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={plantHealthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="health" stroke="#10b981" strokeWidth={4} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" /> Prakiraan Cuaca 7 Hari
            </h3>
            {isPremium ? (
               <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weatherData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="temp" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Suhu (°C)" />
                  <Bar dataKey="rain" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Hujan (mm)" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <div className="text-center">
                  <Crown className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
                  <p className="text-slate-600 font-medium">Buka Prakiraan 7 Hari</p>
                  <button onClick={() => setShowUpgradeModal(true)} className="text-blue-600 text-sm font-bold underline mt-1">Upgrade Sekarang</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Premium Content (Recommendations & Productivity) */}
        {isPremium && (
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-4">Analisis Produktivitas</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={productivityData}>
                  <XAxis dataKey="month" hide />
                  <Tooltip />
                  <Area type="monotone" dataKey="yield" stroke="#10b981" fill="#d1fae5" />
                  <Area type="monotone" dataKey="target" stroke="#6366f1" fill="#e0e7ff" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" /> Rekomendasi AI
              </h3>
              <div className="space-y-3">
                {recommendations.map((rec, i) => (
                  <div key={i} className={`p-3 rounded-lg ${rec.color} border border-black/5`}>
                    <p className="font-bold text-sm">{rec.title}</p>
                    <p className="text-xs opacity-80">{rec.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Ad Banner */}
        {!isPremium && <AdBanner placement="dashboard" size="large" />}
      </div>

      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </div>
  );
}
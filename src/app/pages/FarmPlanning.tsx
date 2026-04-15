import React, { useState } from "react";
import { TrendingUp, Activity, MapPin, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line 
} from "recharts";

// Impor React-Leaflet
import { MapContainer, TileLayer, Polygon, useMapEvents } from "react-leaflet";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

// Fix Icon
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow });
L.Marker.prototype.options.icon = DefaultIcon;

// --- DATA ---
const zones = [
  { id: "A1", name: "Zona A1", area: "2.5 Ha", ndvi: 0.50, moisture: 50, status: "Kering", color: "bg-red-500", fillColor: "red", path: [ [-7.844229, 110.320475], [-7.844133, 110.320904], [-7.844800, 110.320754], [-7.844701, 110.320389] ] },
  { id: "A2", name: "Zona A2", area: "3.9 Ha", ndvi: 0.78, moisture: 78, status: "Optimal", color: "bg-green-400", fillColor: "#84cc16", path: [ [-7.844212, 110.321132], [-7.844342, 110.321786], [-7.845256, 110.321569], [-7.845120, 110.320944] ] },
  { id: "B1", name: "Zona B1", area: "1.3 Ha", ndvi: 0.62, moisture: 62, status: "Sedang", color: "bg-yellow-500", fillColor: "#eab308", path: [ [-7.844512, 110.322344], [-7.844231, 110.322392], [-7.844273, 110.322553], [-7.844560, 110.322534] ] }
];

const ndviData = [
  { id: 'ndvi1', zone: "A1", ndvi: 0.82, history: 0.80 },
  { id: 'ndvi2', zone: "A2", ndvi: 0.75, history: 0.78 },
  { id: 'ndvi3', zone: "B1", ndvi: 0.68, history: 0.65 },
  { id: 'ndvi4', zone: "B2", ndvi: 0.71, history: 0.70 }
];

const harvestForecast = [
  { id: 'hf1', month: "Jul", forecast: 5200, actual: 5100 },
  { id: 'hf2', month: "Agu", forecast: 5400, actual: 5500 },
  { id: 'hf3', month: "Sep", forecast: 5600, actual: 5450 },
  { id: 'hf4', month: "Okt", forecast: 5300, actual: null },
];

const soilAnalysis = [
  { id: 'soil1', metric: "pH", value: 85, ideal: 80 },
  { id: 'soil2', metric: "Nitrogen", value: 72, ideal: 75 },
  { id: 'soil3', metric: "Fosfor", value: 68, ideal: 70 },
  { id: 'soil4', metric: "Kalium", value: 78, ideal: 80 },
  { id: 'soil5', metric: "Organik", value: 82, ideal: 85 },
];

function MouseCoordsTracker({ setCoords }: { setCoords: (coords: { lat: number, lng: number }) => void }) {
  useMapEvents({
    mousemove(e) { setCoords({ lat: e.latlng.lat, lng: e.latlng.lng }); }
  });
  return null;
}
function GeomanInit() {
  const map = useMap();

  useEffect(() => {
    // Menambahkan tombol kontrol Geoman ke dalam peta
    map.pm.addControls({
      position: 'topleft',
      drawCircle: false,
      drawText: false,
      drawMarker: false,
      drawPolyline: false,
      editMode: true, // Untuk edit sudut poligon
      dragMode: true, // Untuk memindahkan poligon utuh
      removalMode: true,
    });

    // Opsional: Matikan Geoman saat komponen dibongkar
    return () => {
      map.pm.removeControls();
    };
  }, [map]);

  return null;
}
export function FarmPlanning() {
  const [activeZone, setActiveZone] = useState<typeof zones[0] | null>(null);
  const [mouseCoords, setMouseCoords] = useState({ lat: -7.844864, lng: 110.321105 });
  const [activeLayers, setActiveLayers] = useState({ satellite: true, zones: true });

  const toggleLayer = (layer: keyof typeof activeLayers) => setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));

  return (
    <div className="w-full bg-slate-50 font-sans p-4 md:p-6">
      {/* SUNTIKAN CSS LEAFLET AGAR PETA TIDAK HITAM */}
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      
      {/* LAYOUT UTAMA: Dibagi 2 Kolom di layar besar (Desktop) */}
      <div className="flex flex-col xl:flex-row gap-6 w-full">
        
        {/* KOLOM KIRI (Peta & Grafik Bawah) */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          
          {/* 1. KOTAK PETA (Dipaksa tinggi minimal 500px agar tidak bantet) */}
          <div className="w-full bg-slate-800 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden min-h-[500px] h-[55vh]">
            <MapContainer 
              center={[-7.844212, 110.321132]} 
              zoom={17} 
              style={{ height: "100%", width: "100%", zIndex: 1 }} 
              className="cursor-crosshair"
            >
              <MouseCoordsTracker setCoords={setMouseCoords} />
              <GeomanInit />
              {/* Gunakan OpenStreetMap yang anti-blokir untuk jaga-jaga */}
              {activeLayers.satellite && (
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution='Tiles &copy; Esri'
                  maxZoom={100}
                />
              )}

              {/* Poligon Lahan */}
              {activeLayers.zones && zones.map((zone) => (
                <Polygon
                  key={zone.id}
                  positions={zone.path as [number, number][]}
                  pathOptions={{
                    fillColor: zone.fillColor,
                    fillOpacity: activeZone?.id === zone.id ? 0.7 : 0.3,
                    color: activeZone?.id === zone.id ? "#ffffff" : "#22c55e",
                    weight: activeZone?.id === zone.id ? 3 : 2,
                  }}
                  eventHandlers={{
                    mouseover: () => setActiveZone(zone),
                    mouseout: () => setActiveZone(null),
                  }}
                />
              ))}
            </MapContainer>

            {/* Widget Koordinat di Dalam Peta */}
            <div className="absolute top-4 right-4 z-[1000] bg-slate-900/90 text-white px-4 py-3 rounded-xl border border-white/10 shadow-xl pointer-events-none">
               <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Koordinat GPS</p>
               <p className="text-sm font-mono font-bold">{mouseCoords.lat.toFixed(6)}, {mouseCoords.lng.toFixed(6)}</p>
            </div>
          </div>

          {/* 2. AREA GRAFIK BAWAH (Dipaksa tinggi 300px agar besar dan jelas) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            
            {/* Kartu Sensor Area */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-[300px] flex flex-col">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-500" /> Sensor Area
              </h3>
              {activeZone ? (
                <div className="flex flex-col h-full justify-center">
                  <h4 className="text-3xl font-black text-slate-800 mb-1">{activeZone.name}</h4>
                  <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold text-white mb-4 w-max ${activeZone.color}`}>{activeZone.status}</span>
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[11px] text-slate-400 font-bold mb-1">SKOR NDVI</p>
                      <p className="text-2xl font-black text-slate-800">{activeZone.ndvi}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[11px] text-slate-400 font-bold mb-1">LENGAS (%)</p>
                      <p className="text-2xl font-black text-slate-800">{activeZone.moisture}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <p className="text-sm font-medium">Arahkan kursor ke poligon<br/>di peta untuk detail.</p>
                </div>
              )}
            </div>

            {/* Bagan NDVI */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-[300px] flex flex-col w-full">
              <h3 className="text-sm font-bold mb-4 text-slate-500 uppercase tracking-wider">Perbandingan NDVI</h3>
              <div className="w-full flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ndviData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="zone" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" domain={[0, 1]} fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip cursor={{fill: '#f8fafc'}} />
                    <Bar dataKey="ndvi" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="history" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bagan Panen */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-[300px] flex flex-col w-full">
              <h3 className="text-sm font-bold mb-4 text-slate-500 uppercase tracking-wider">Prediksi Panen (Ton)</h3>
              <div className="w-full flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={harvestForecast}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip />
                    <Line type="monotone" dataKey="forecast" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>

        {/* KOLOM KANAN (Sidebar Radar Chart) */}
        <div className="w-full xl:w-[400px] flex flex-col gap-6 shrink-0">
          
          {/* Kontrol Peta */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="space-y-3">
              <button onClick={() => toggleLayer('satellite')} className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${activeLayers.satellite ? 'border-green-500 bg-green-50/50' : 'border-slate-100 bg-slate-50'}`}>
                <span className="font-bold text-sm text-slate-700">Citra Satelit Base</span>
                {activeLayers.satellite ? <Eye className="w-5 h-5 text-green-500" /> : <EyeOff className="w-5 h-5 text-slate-400" />}
              </button>
              <button onClick={() => toggleLayer('zones')} className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${activeLayers.zones ? 'border-green-500 bg-green-50/50' : 'border-slate-100 bg-slate-50'}`}>
                <span className="font-bold text-sm text-slate-700">Batas Zonasi Lahan</span>
                {activeLayers.zones ? <Eye className="w-5 h-5 text-green-500" /> : <EyeOff className="w-5 h-5 text-slate-400" />}
              </button>
            </div>
          </div>

          {/* RADAR CHART - Dipaksa tinggi min-h-[350px] agar PASTI MUNCUL */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col min-h-[350px] w-full relative">
            <h3 className="text-sm font-bold mb-4 text-slate-500 uppercase tracking-wider">Komposisi Nutrisi Lahan</h3>
            {/* Pembungkus absolut ini mencegah Recharts collapse */}
            <div className="absolute top-[60px] bottom-6 left-6 right-6">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={soilAnalysis}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Kondisi Saat Ini" dataKey="value" stroke="#10b981" strokeWidth={2} fill="#10b981" fillOpacity={0.5} />
                  <RechartsTooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Peringatan */}
          <div className="bg-red-50 rounded-2xl p-5 border border-red-100 shadow-sm relative">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-1 shrink-0" />
              <div>
                <div className="font-extrabold text-red-900 text-sm mb-1 uppercase">Peringatan Kritis</div>
                <p className="text-sm text-red-800 font-medium mb-3">Zona C2 mengalami defisit lengas tanah (58%). Risiko *water stress* pada tanaman.</p>
                <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm">Aktifkan Irigasi B-4</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FarmPlanning;
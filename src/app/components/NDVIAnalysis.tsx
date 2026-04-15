import { useState } from "react";
import { Activity, TrendingUp, AlertTriangle, CheckCircle, Droplets, Zap, RefreshCw } from "lucide-react";
import ndviImage from "../../imports/image-3.png";

interface NDVIAnalysisProps {
  onAnalysisUpdate?: (analysis: {
    avgNDVI: number;
    healthStatus: string;
    recommendation: string;
    issue?: string;
  }) => void;
}

export function NDVIAnalysis({ onAnalysisUpdate }: NDVIAnalysisProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock NDVI analysis data - based on the image
  const ndviData = {
    avgNDVI: 0.62,
    maxNDVI: 0.85,
    minNDVI: 0.25,
    healthyArea: 65, // percentage
    moderateArea: 25,
    stressedArea: 10,
  };

  const healthStatus = ndviData.avgNDVI > 0.6 ? "Sangat Sehat" : ndviData.avgNDVI >= 0.3 ? "Sedang" : "Perlu Perhatian";
  const recommendation = ndviData.avgNDVI > 0.6
    ? "Pertahankan pola tanam dan irigasi yang ada. Pantau terus perkembangan tanaman."
    : ndviData.avgNDVI >= 0.3
    ? "Tingkatkan nutrisi tanaman dengan pupuk organik. Pastikan irigasi merata di seluruh lahan."
    : "Segera lakukan pemupukan intensif dan perbaiki sistem irigasi. Ada indikasi kekurangan air atau nutrisi.";

  const issue = ndviData.avgNDVI < 0.6
    ? ndviData.avgNDVI >= 0.3
      ? "Beberapa area menunjukkan pertumbuhan tidak merata - kemungkinan distribusi air atau nutrisi tidak optimal."
      : "Stress tanaman terdeteksi - kemungkinan kekurangan air, serangan hama, atau defisiensi nutrisi."
    : undefined;

  // Send analysis to parent component
  if (onAnalysisUpdate) {
    onAnalysisUpdate({
      avgNDVI: ndviData.avgNDVI,
      healthStatus,
      recommendation,
      issue,
    });
  }

  const handleUpdateNDVI = () => {
    setIsUpdating(true);
    // Simulate fetching new satellite data
    setTimeout(() => {
      setIsUpdating(false);
      setLastUpdate(new Date());
      // You can add actual API call here to fetch new NDVI data
    }, 2000);
  };

  const getHealthColor = (ndvi: number) => {
    if (ndvi > 0.6) return "text-green-600";
    if (ndvi >= 0.3) return "text-yellow-600";
    return "text-orange-600";
  };

  const getHealthIcon = (ndvi: number) => {
    if (ndvi > 0.6) return CheckCircle;
    if (ndvi >= 0.3) return Activity;
    return AlertTriangle;
  };

  const HealthIcon = getHealthIcon(ndviData.avgNDVI);

  return (
    <div className="space-y-6">
      {/* NDVI Image Display */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Peta NDVI Lahan Anda</h3>
          </div>
          <p className="text-sm text-white/80 mt-1">
            Analisis kesehatan vegetasi menggunakan citra satelit
          </p>
        </div>

        <div className="relative">
          <img src={ndviImage} alt="NDVI Map" className="w-full h-auto" />
          
          {/* NDVI Scale Bar - Improved Layout */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4">
            <div className="text-xs font-semibold mb-2 text-slate-700">NDVI Scale</div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1">
                <div className="h-6 w-32 rounded" style={{
                  background: "linear-gradient(to right, #8B4513 0%, #D2691E 15%, #F4A460 30%, #FFFF00 45%, #ADFF2F 60%, #00FF00 75%, #006400 100%)"
                }}></div>
                <div className="flex justify-between text-[10px] text-slate-600">
                  <span>-1.0</span>
                  <span>-0.5</span>
                  <span>0.0</span>
                  <span>0.5</span>
                  <span>1.0</span>
                </div>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 bg-red-700 rounded"></div>
                <span className="text-slate-600">Tanah/Air</span>
              </div>
              <div className="flex items-center gap-2 text-xs mt-1">
                <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                <span className="text-slate-600">Vegetasi Sedang</span>
              </div>
              <div className="flex items-center gap-2 text-xs mt-1">
                <div className="w-3 h-3 bg-green-600 rounded"></div>
                <span className="text-slate-600">Vegetasi Sehat</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-600">Status Kesehatan</span>
            <HealthIcon className={`w-5 h-5 ${getHealthColor(ndviData.avgNDVI)}`} />
          </div>
          <div className={`text-2xl font-bold ${getHealthColor(ndviData.avgNDVI)}`}>
            {healthStatus}
          </div>
          <div className="mt-2 text-sm text-slate-500">
            NDVI Rata-rata: {ndviData.avgNDVI.toFixed(2)}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-600">Range NDVI</span>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-lg font-semibold text-slate-700">
            {ndviData.minNDVI.toFixed(2)} - {ndviData.maxNDVI.toFixed(2)}
          </div>
          <div className="mt-2 text-sm text-slate-500">
            Variasi: {(ndviData.maxNDVI - ndviData.minNDVI).toFixed(2)}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-600">Area Sehat</span>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            {ndviData.healthyArea}%
          </div>
          <div className="mt-2 text-sm text-slate-500">
            Dari total lahan
          </div>
        </div>
      </div>

      {/* Distribution Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h4 className="font-semibold mb-4">Distribusi Kesehatan Lahan</h4>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-600">Area Sangat Sehat (NDVI &gt; 0.6)</span>
              <span className="font-semibold text-green-600">{ndviData.healthyArea}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all"
                style={{ width: `${ndviData.healthyArea}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-600">Area Sedang (NDVI 0.3-0.6)</span>
              <span className="font-semibold text-yellow-600">{ndviData.moderateArea}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all"
                style={{ width: `${ndviData.moderateArea}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-600">Area Stress (NDVI &lt; 0.3)</span>
              <span className="font-semibold text-orange-600">{ndviData.stressedArea}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all"
                style={{ width: `${ndviData.stressedArea}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-start gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2">Rekomendasi Tindakan</h4>
            <p className="text-slate-700 mb-3">{recommendation}</p>
            
            {issue && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-yellow-800 text-sm mb-1">Penyebab Potensial:</div>
                  <div className="text-yellow-700 text-sm">{issue}</div>
                </div>
              </div>
            )}

            <div className="mt-4 grid md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2 text-sm">
                <Droplets className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600">
                  Pastikan irigasi tetes berfungsi optimal di area kuning/orange
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Activity className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600">
                  Monitor perkembangan NDVI setiap 7-10 hari
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Button */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-slate-700">Data Satelit</h4>
            <p className="text-sm text-slate-500 mt-1">
              Terakhir diperbarui: {lastUpdate.toLocaleString('id-ID', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <button
            onClick={handleUpdateNDVI}
            disabled={isUpdating}
            className={`flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all ${
              isUpdating ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
            }`}
          >
            <RefreshCw className={`w-5 h-5 ${isUpdating ? 'animate-spin' : ''}`} />
            <span>{isUpdating ? 'Memperbarui...' : 'Update NDVI'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { 
  Upload, 
  Camera, 
  Brain, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Droplets,
  Thermometer,
  Zap,
  MapPin
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function PlantHealth() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = () => {
    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        healthScore: 87,
        status: "Sehat dengan Peringatan",
        issues: [
          {
            type: "warning",
            title: "Kekurangan Nitrogen Ringan",
            severity: "Sedang",
            confidence: 92,
            description: "Daun menunjukkan sedikit kekuningan di bagian bawah, indikasi kekurangan nitrogen.",
            recommendation: "Aplikasi pupuk NPK 15-15-15 dengan dosis 200kg/ha dalam 3-5 hari."
          },
          {
            type: "info",
            title: "Kelembaban Optimal",
            severity: "Info",
            confidence: 95,
            description: "Tingkat kelembaban tanah dalam rentang optimal untuk pertumbuhan.",
            recommendation: "Pertahankan jadwal irigasi saat ini."
          }
        ],
        metrics: {
          waterStress: 15,
          nutrientLevel: 72,
          diseaseRisk: 8,
          pestRisk: 12
        },
        affectedArea: "Sektor B2, sekitar 350m² (8% dari total lahan)"
      });
      setAnalyzing(false);
    }, 2500);
  };

  const sampleImages = [
    { url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80", label: "Padi" },
    { url: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400&q=80", label: "Jagung" },
    { url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80", label: "Sayuran" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Analisis Kesehatan Tanaman AI</h1>
          <p className="text-slate-600">Upload foto tanaman untuk deteksi dini penyakit dan rekomendasi perawatan</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Camera className="w-6 h-6 text-green-600" />
                Upload Foto Tanaman
              </h3>

              {!selectedImage ? (
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:border-green-500 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-slate-700 mb-2">
                      Klik untuk upload atau drag & drop
                    </p>
                    <p className="text-sm text-slate-500">
                      PNG, JPG, JPEG hingga 10MB
                    </p>
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden">
                    <img src={selectedImage} alt="Uploaded plant" className="w-full h-64 object-cover" />
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setAnalysisResult(null);
                      }}
                      className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700"
                    >
                      Hapus
                    </button>
                  </div>

                  {!analysisResult && (
                    <button
                      onClick={runAnalysis}
                      disabled={analyzing}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {analyzing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Menganalisis dengan AI...
                        </>
                      ) : (
                        <>
                          <Brain className="w-5 h-5" />
                          Analisis Sekarang
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Sample Images */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h4 className="font-semibold mb-4">Atau gunakan contoh foto:</h4>
              <div className="grid grid-cols-3 gap-4">
                {sampleImages.map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImage(sample.url);
                      setAnalysisResult(null);
                    }}
                    className="group relative overflow-hidden rounded-lg border-2 border-slate-200 hover:border-green-500 transition-all"
                  >
                    <ImageWithFallback
                      src={sample.url}
                      alt={sample.label}
                      className="w-full h-24 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                      <span className="text-white text-xs font-medium">{sample.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Cara Kerja AI Detection
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Analisis warna dan tekstur daun menggunakan Computer Vision</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Deteksi penyakit, hama, dan stres tanaman dengan akurasi 95%+</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Rekomendasi tindakan berdasarkan database 10,000+ kasus</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="space-y-6">
            {analysisResult ? (
              <>
                {/* Health Score */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-xl font-semibold mb-4">Hasil Analisis AI</h3>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Skor Kesehatan Tanaman</span>
                      <span className="text-2xl font-bold text-green-600">{analysisResult.healthScore}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-600 to-emerald-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${analysisResult.healthScore}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">{analysisResult.status}</p>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <Droplets className="w-5 h-5 text-blue-600 mb-2" />
                      <div className="text-xs text-slate-600">Stres Air</div>
                      <div className="text-xl font-bold text-blue-600">{analysisResult.metrics.waterStress}%</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <Zap className="w-5 h-5 text-green-600 mb-2" />
                      <div className="text-xs text-slate-600">Nutrisi</div>
                      <div className="text-xl font-bold text-green-600">{analysisResult.metrics.nutrientLevel}%</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-orange-600 mb-2" />
                      <div className="text-xs text-slate-600">Risiko Penyakit</div>
                      <div className="text-xl font-bold text-orange-600">{analysisResult.metrics.diseaseRisk}%</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <Thermometer className="w-5 h-5 text-red-600 mb-2" />
                      <div className="text-xs text-slate-600">Risiko Hama</div>
                      <div className="text-xl font-bold text-red-600">{analysisResult.metrics.pestRisk}%</div>
                    </div>
                  </div>

                  {/* Affected Area */}
                  <div className="bg-slate-50 p-4 rounded-lg flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-1">Area Terdampak</div>
                      <div className="text-sm text-slate-600">{analysisResult.affectedArea}</div>
                    </div>
                  </div>
                </div>

                {/* Issues & Recommendations */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-xl font-semibold mb-4">Temuan & Rekomendasi</h3>
                  <div className="space-y-4">
                    {analysisResult.issues.map((issue: any, index: number) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg border-l-4 ${
                          issue.type === 'warning' 
                            ? 'bg-orange-50 border-orange-500' 
                            : 'bg-blue-50 border-blue-500'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold flex items-center gap-2">
                            {issue.type === 'warning' ? (
                              <AlertCircle className="w-5 h-5 text-orange-600" />
                            ) : (
                              <Info className="w-5 h-5 text-blue-600" />
                            )}
                            {issue.title}
                          </h4>
                          <span className="text-xs px-2 py-1 bg-white rounded-full text-slate-700">
                            {issue.confidence}% confident
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 mb-3">{issue.description}</p>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-xs font-medium text-green-700 mb-1">💡 Rekomendasi:</div>
                          <p className="text-sm text-slate-700">{issue.recommendation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                  Simpan Hasil & Jadwalkan Tindakan
                </button>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                <Brain className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Upload foto tanaman untuk melihat hasil analisis AI</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

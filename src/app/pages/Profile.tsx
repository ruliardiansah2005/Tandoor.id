import { 
  User, 
  MapPin, 
  Calendar, 
  Award, 
  BookOpen,
  TrendingUp,
  Leaf,
  Droplets,
  Sun,
  Video,
  FileText,
  Lightbulb
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

export function Profile() {
  const farmerProfile = {
    name: "Budi Santoso",
    type: "Petani Milenial",
    location: "Jember, Jawa Timur",
    memberSince: "Januari 2024",
    farmSize: "12.5 Ha",
    crops: ["Padi", "Jagung", "Cabai"],
    achievements: [
      { title: "Petani Terbaik 2024", icon: Award, color: "text-yellow-600 bg-yellow-100" },
      { title: "Produksi Terbaik", icon: TrendingUp, color: "text-green-600 bg-green-100" },
      { title: "Inovasi Pertanian", icon: Lightbulb, color: "text-blue-600 bg-blue-100" },
    ]
  };

  const farmHistory = [
    { 
      season: "2024-1", 
      crop: "Padi", 
      yield: 5400, 
      area: 5, 
      revenue: "Rp 35.1 juta",
      status: "completed" 
    },
    { 
      season: "2024-2", 
      crop: "Jagung", 
      yield: 4200, 
      area: 4, 
      revenue: "Rp 17.6 juta",
      status: "completed" 
    },
    { 
      season: "2024-3", 
      crop: "Cabai", 
      yield: 1800, 
      area: 2, 
      revenue: "Rp 81 juta",
      status: "active" 
    },
  ];

  const yieldTrend = [
    { year: "2022", padi: 4200, jagung: 3800, cabai: 1200 },
    { year: "2023", padi: 4800, jagung: 4000, cabai: 1500 },
    { year: "2024", padi: 5400, jagung: 4200, cabai: 1800 },
  ];

  const skillsData = [
    { skill: "Smart Farming", score: 85 },
    { skill: "Precision Agriculture", score: 78 },
    { skill: "Manajemen Irigasi", score: 90 },
    { skill: "Pengendalian Hama", score: 72 },
    { skill: "Analisis Data", score: 68 },
  ];

  const recommendations = [
    {
      category: "Teknologi",
      title: "Implementasi Sistem Irigasi Tetes",
      description: "Hemat air hingga 40% dan tingkatkan efisiensi pemupukan",
      impact: "Tinggi",
      icon: Droplets
    },
    {
      category: "Varietas",
      title: "Varietas Padi Tahan Kekeringan",
      description: "Cocok untuk musim kemarau dengan yield 15% lebih tinggi",
      impact: "Sedang",
      icon: Leaf
    },
    {
      category: "Pemasaran",
      title: "Diversifikasi Produk Olahan",
      description: "Tambah nilai jual dengan produk olahan seperti beras organik premium",
      impact: "Tinggi",
      icon: TrendingUp
    },
  ];

  const educationContent = [
    {
      title: "Pengenalan AI dalam Pertanian",
      type: "Video",
      duration: "15 menit",
      icon: Video,
      status: "new"
    },
    {
      title: "Panduan Lengkap Remote Sensing",
      type: "E-Book",
      duration: "45 halaman",
      icon: FileText,
      status: "popular"
    },
    {
      title: "Workshop: Precision Agriculture",
      type: "Webinar",
      duration: "2 jam",
      icon: BookOpen,
      status: "upcoming"
    },
    {
      title: "Optimalisasi Pupuk dengan Data",
      type: "Artikel",
      duration: "10 menit",
      icon: FileText,
      status: ""
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Profil & Edukasi Petani</h1>
          <p className="text-slate-600">Kelola profil lahan dan akses konten edukasi pertanian modern</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 h-24"></div>
              <div className="p-6 -mt-12">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center mb-4">
                  <User className="w-12 h-12 text-green-600" />
                </div>
                
                <h2 className="text-2xl font-bold mb-1">{farmerProfile.name}</h2>
                <div className="text-sm text-green-600 font-medium mb-4">{farmerProfile.type}</div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>{farmerProfile.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span>Bergabung: {farmerProfile.memberSince}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Leaf className="w-4 h-4" />
                    <span>Luas Lahan: {farmerProfile.farmSize}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm font-semibold mb-2">Komoditas:</div>
                  <div className="flex flex-wrap gap-2">
                    {farmerProfile.crops.map((crop, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-3">Pencapaian:</div>
                  <div className="space-y-2">
                    {farmerProfile.achievements.map((achievement, index) => {
                      const Icon = achievement.icon;
                      return (
                        <div key={index} className={`flex items-center gap-3 p-2 rounded-lg ${achievement.color.split(' ')[1]}`}>
                          <Icon className={`w-5 h-5 ${achievement.color.split(' ')[0]}`} />
                          <span className="text-sm font-medium">{achievement.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                  Edit Profil
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Farm History */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-semibold mb-6">Histori Tanam & Panen</h3>
              <div className="space-y-4">
                {farmHistory.map((record, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-lg">{record.crop}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            record.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {record.status === 'completed' ? 'Selesai' : 'Aktif'}
                          </span>
                        </div>
                        <div className="text-sm text-slate-600">Musim Tanam: {record.season}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">{record.revenue}</div>
                        <div className="text-xs text-slate-500">Total Pendapatan</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200">
                      <div>
                        <div className="text-xs text-slate-600">Hasil Panen</div>
                        <div className="text-lg font-semibold">{record.yield.toLocaleString()} kg</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600">Luas Area</div>
                        <div className="text-lg font-semibold">{record.area} Ha</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Yield Trend */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-semibold mb-6">Tren Produktivitas 3 Tahun</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={yieldTrend} id="yield-trend-chart">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="year" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                  <Line type="monotone" dataKey="padi" stroke="#10b981" strokeWidth={3} name="Padi (kg/ha)" />
                  <Line type="monotone" dataKey="jagung" stroke="#3b82f6" strokeWidth={3} name="Jagung (kg/ha)" />
                  <Line type="monotone" dataKey="cabai" stroke="#ef4444" strokeWidth={3} name="Cabai (kg/ha)" />
                </LineChart>
              </ResponsiveContainer>
              <div className="bg-green-50 p-4 rounded-lg mt-4">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-semibold">Peningkatan rata-rata 22% per tahun</span>
                </div>
              </div>
            </div>

            {/* Skills Radar */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-semibold mb-6">Kemampuan Pertanian Modern</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={skillsData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 11 }} />
                    <Radar 
                      name="Skor" 
                      dataKey="score" 
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.6} 
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="flex flex-col justify-center space-y-3">
                  {skillsData.map((skill, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>{skill.skill}</span>
                        <span className="font-semibold text-green-600">{skill.score}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-600 to-emerald-500 h-2 rounded-full"
                          style={{ width: `${skill.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
                Rekomendasi AI untuk Peningkatan Hasil
              </h3>
              <div className="space-y-4">
                {recommendations.map((rec, index) => {
                  const Icon = rec.icon;
                  return (
                    <div key={index} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                              {rec.category}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              rec.impact === 'Tinggi' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              Impact: {rec.impact}
                            </span>
                          </div>
                          <h4 className="font-semibold mb-1">{rec.title}</h4>
                          <p className="text-sm text-slate-600 mb-3">{rec.description}</p>
                          <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                            Pelajari Lebih Lanjut →
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Education Content */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-purple-600" />
                Konten Edukasi Pertanian Modern
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {educationContent.map((content, index) => {
                  const Icon = content.icon;
                  return (
                    <div key={index} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-all">
                          <Icon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {content.status && (
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                content.status === 'new' ? 'bg-green-100 text-green-700' :
                                content.status === 'popular' ? 'bg-orange-100 text-orange-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {content.status === 'new' ? 'Baru' :
                                 content.status === 'popular' ? 'Populer' : 'Segera'}
                              </span>
                            )}
                          </div>
                          <h4 className="font-semibold text-sm mb-1 group-hover:text-green-600 transition-all">
                            {content.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-slate-600">
                            <span>{content.type}</span>
                            <span>•</span>
                            <span>{content.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="w-full mt-6 border-2 border-green-600 text-green-700 py-3 rounded-lg font-medium hover:bg-green-50 transition-all">
                Lihat Semua Konten Edukasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
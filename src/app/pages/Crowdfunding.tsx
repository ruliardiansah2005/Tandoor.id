import { useState } from "react";
import { Link } from "react-router";
import {
  TrendingUp,
  Clock,
  Users,
  Target,
  Leaf,
  Sprout,
  Fish,
  Wheat,
  Apple,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Calendar,
  MapPin,
  Award,
  BarChart3,
  PlusCircle,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

// Mock data for crowdfunding projects
const projectCategories = [
  { id: "all", name: "Semua", icon: Leaf },
  { id: "vegetables", name: "Sayuran", icon: Sprout },
  { id: "fruits", name: "Buah-buahan", icon: Apple },
  { id: "grains", name: "Padi & Jagung", icon: Wheat },
  { id: "aquaculture", name: "Perikanan", icon: Fish },
];

const mockProjects = [
  {
    id: 1,
    title: "Budidaya Cabai Merah Premium - Musim Tanam 2026",
    farmer: "Pak Budi Santoso",
    location: "Garut, Jawa Barat",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1583641411506-8f32df5e1d6e?w=800&q=80",
    targetAmount: 50000000,
    currentAmount: 35500000,
    investors: 42,
    daysLeft: 15,
    roi: 25,
    riskLevel: "Medium",
    timeline: "6 bulan",
    landSize: "2 hektar",
    status: "funding",
    description:
      "Proyek budidaya cabai merah keriting varietas unggul dengan sistem irigasi tetes otomatis dan greenhouse modern.",
    highlights: [
      "Kontrak offtaker dengan supermarket chain",
      "Teknologi greenhouse otomatis",
      "Bersertifikat GAP (Good Agricultural Practices)",
      "Track record 3x panen sukses",
    ],
    returnSchedule: [
      { month: 3, percentage: 30, description: "Panen pertama (30%)" },
      { month: 5, percentage: 40, description: "Panen kedua (40%)" },
      { month: 6, percentage: 30, description: "Panen ketiga (30%)" },
    ],
  },
  {
    id: 2,
    title: "Durian Montong Super - Investasi Jangka Panjang",
    farmer: "Kelompok Tani Sumber Rezeki",
    location: "Medan, Sumatera Utara",
    category: "fruits",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80",
    targetAmount: 150000000,
    currentAmount: 98000000,
    investors: 67,
    daysLeft: 8,
    roi: 45,
    riskLevel: "Low",
    timeline: "12 bulan",
    landSize: "5 hektar",
    status: "funding",
    description:
      "Perkebunan durian montong premium dengan sistem organik dan sertifikasi ekspor ke China.",
    highlights: [
      "Eksportir terdaftar ke China & Singapura",
      "Pohon berumur 7 tahun (produktif maksimal)",
      "Sertifikat organik",
      "Pre-order dari buyer internasional",
    ],
    returnSchedule: [
      { month: 8, percentage: 50, description: "Panen raya pertama" },
      { month: 12, percentage: 50, description: "Panen raya kedua" },
    ],
  },
  {
    id: 3,
    title: "Padi Organik Bersertifikat - Program Desa Mandiri",
    farmer: "Koperasi Tani Maju Bersama",
    location: "Karawang, Jawa Barat",
    category: "grains",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
    targetAmount: 80000000,
    currentAmount: 80000000,
    investors: 95,
    daysLeft: 0,
    roi: 18,
    riskLevel: "Low",
    timeline: "5 bulan",
    landSize: "10 hektar",
    status: "funded",
    description:
      "Program tanam padi organik bersertifikat dengan jaminan beli dari pemerintah dan retail modern.",
    highlights: [
      "MOU dengan Bulog & retail chain",
      "Sertifikat organik SNI",
      "Asuransi gagal panen dari pemerintah",
      "Pendampingan dari Dinas Pertanian",
    ],
    returnSchedule: [{ month: 5, percentage: 100, description: "Panen raya" }],
  },
  {
    id: 4,
    title: "Budidaya Lele Bioflok Teknologi Modern",
    farmer: "CV Mina Sejahtera",
    location: "Bogor, Jawa Barat",
    category: "aquaculture",
    image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&q=80",
    targetAmount: 60000000,
    currentAmount: 42000000,
    investors: 38,
    daysLeft: 12,
    roi: 30,
    riskLevel: "Medium",
    timeline: "4 bulan",
    landSize: "8 kolam",
    status: "funding",
    description:
      "Budidaya lele dengan sistem bioflok modern, monitoring IoT, dan kontrak dengan supplier restoran.",
    highlights: [
      "Teknologi bioflok ramah lingkungan",
      "IoT monitoring 24/7",
      "Kontrak dengan 15+ restoran",
      "Siklus panen cepat (3-4 bulan)",
    ],
    returnSchedule: [
      { month: 3, percentage: 50, description: "Panen pertama" },
      { month: 4, percentage: 50, description: "Panen kedua" },
    ],
  },
  {
    id: 5,
    title: "Strawberry Hidroponik Premium - Agrowisata Edukatif",
    farmer: "Ibu Siti Nurhaliza",
    location: "Lembang, Bandung",
    category: "fruits",
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=800&q=80",
    targetAmount: 45000000,
    currentAmount: 28000000,
    investors: 31,
    daysLeft: 20,
    roi: 28,
    riskLevel: "Medium",
    timeline: "8 bulan",
    landSize: "1,500 m²",
    status: "funding",
    description:
      "Kebun strawberry hidroponik dengan konsep agrowisata, petik sendiri, dan kafe farm-to-table.",
    highlights: [
      "Lokasi wisata strategis (Lembang)",
      "Dual income: hasil panen + tiket wisata",
      "Konsep farm-to-table cafe",
      "Marketing via social media 50K followers",
    ],
    returnSchedule: [
      { month: 4, percentage: 25, description: "Soft opening agrowisata" },
      { month: 6, percentage: 35, description: "Panen raya pertama" },
      { month: 8, percentage: 40, description: "Panen + revenue cafe" },
    ],
  },
  {
    id: 6,
    title: "Jagung Manis Hibrida - Kontrak Industri Pangan",
    farmer: "PT Agro Nusantara",
    location: "Lampung",
    category: "grains",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80",
    targetAmount: 120000000,
    currentAmount: 65000000,
    investors: 48,
    daysLeft: 18,
    roi: 22,
    riskLevel: "Low",
    timeline: "4 bulan",
    landSize: "15 hektar",
    status: "funding",
    description:
      "Budidaya jagung manis hibrida dengan kontrak industri pengalengan dan frozen food.",
    highlights: [
      "Kontrak binding dengan pabrik pengalengan",
      "Harga jual terjamin (tidak fluktuatif)",
      "Sistem mekanisasi modern",
      "Asuransi pertanian aktif",
    ],
    returnSchedule: [{ month: 4, percentage: 100, description: "Panen raya" }],
  },
];

export function Crowdfunding() {
  const { isAuthenticated, isPremium } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  // Filter projects
  const filteredProjects = mockProjects.filter((project) => {
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.investors - a.investors;
      case "newest":
        return b.id - a.id;
      case "ending":
        return a.daysLeft - b.daysLeft;
      case "roi":
        return b.roi - a.roi;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                🌾 Crowdfunding Pertanian
              </h1>
              <p className="text-slate-600">
                Investasi langsung ke proyek pertanian produktif. Dukung petani, raih keuntungan.
              </p>
            </div>
            <div className="flex gap-3">
              {isAuthenticated && (
                <Link
                  to="/crowdfunding/create"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <PlusCircle className="w-5 h-5" />
                  Ajukan Proyek
                </Link>
              )}
              <Link
                to="/crowdfunding/portfolio"
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-all"
              >
                <BarChart3 className="w-5 h-5" />
                Portofolio Saya
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Proyek</p>
                  <p className="text-2xl font-bold text-slate-900">42</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Investor</p>
                  <p className="text-2xl font-bold text-slate-900">1,245</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Dana Terkumpul</p>
                  <p className="text-2xl font-bold text-slate-900">12.5M</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Avg ROI</p>
                  <p className="text-2xl font-bold text-slate-900">26%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 mb-4">
            {projectCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-600"
                      : "bg-white text-slate-700 border-slate-200 hover:border-green-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari proyek, lokasi, atau petani..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            >
              <option value="popular">Paling Populer</option>
              <option value="newest">Terbaru</option>
              <option value="ending">Segera Berakhir</option>
              <option value="roi">ROI Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} isPremium={isPremium} />
          ))}
        </div>

        {sortedProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Proyek tidak ditemukan
            </h3>
            <p className="text-slate-600">
              Coba ubah filter atau kata kunci pencarian
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Project Card Component
function ProjectCard({ project, isPremium }: { project: any; isPremium: boolean }) {
  const progress = (project.currentAmount / project.targetAmount) * 100;
  const isFunded = project.status === "funded";

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-600 bg-green-50";
      case "Medium":
        return "text-yellow-600 bg-yellow-50";
      case "High":
        return "text-red-600 bg-red-50";
      default:
        return "text-slate-600 bg-slate-50";
    }
  };

  return (
    <Link
      to={`/crowdfunding/${project.id}`}
      className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isFunded && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            Terdanai
          </div>
        )}
        {!isFunded && project.daysLeft <= 7 && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-white rounded-full text-sm font-medium flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {project.daysLeft} hari lagi
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
          {project.title}
        </h3>

        {/* Farmer & Location */}
        <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{project.farmer}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{project.location}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-600">Progress</span>
            <span className="text-sm font-semibold text-green-600">
              {progress.toFixed(0)}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-600 to-emerald-500 rounded-full transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-slate-500">
              Rp {(project.currentAmount / 1000000).toFixed(1)}jt terkumpul
            </span>
            <span className="text-xs text-slate-500">
              Target: Rp {(project.targetAmount / 1000000).toFixed(0)}jt
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="font-bold text-green-600">{project.roi}%</span>
            </div>
            <span className="text-xs text-slate-500">ROI</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-blue-600">{project.timeline}</span>
            </div>
            <span className="text-xs text-slate-500">Durasi</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="w-4 h-4 text-orange-600" />
              <span className="font-bold text-orange-600">{project.investors}</span>
            </div>
            <span className="text-xs text-slate-500">Investor</span>
          </div>
        </div>

        {/* Risk Badge */}
        <div className="flex items-center justify-between">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(
              project.riskLevel
            )}`}
          >
            Risk: {project.riskLevel}
          </span>
          <div className="flex items-center gap-1 text-green-600 font-medium text-sm">
            Lihat Detail
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

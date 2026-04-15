import { useState } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  TrendingUp,
  Clock,
  Users,
  Target,
  MapPin,
  Calendar,
  Award,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  BarChart3,
  FileText,
  Shield,
  Star,
  MessageCircle,
  Share2,
  Heart,
  Leaf,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

// Mock project data (in real app, fetch from API)
const mockProject = {
  id: 1,
  title: "Budidaya Cabai Merah Premium - Musim Tanam 2026",
  farmer: "Pak Budi Santoso",
  farmerAvatar: "https://ui-avatars.com/api/?name=Budi+Santoso&background=16a34a&color=fff",
  farmerRating: 4.8,
  farmerProjects: 5,
  location: "Garut, Jawa Barat",
  category: "vegetables",
  image: "https://images.unsplash.com/photo-1583641411506-8f32df5e1d6e?w=1200&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1583641411506-8f32df5e1d6e?w=800&q=80",
    "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&q=80",
    "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80",
  ],
  targetAmount: 50000000,
  currentAmount: 35500000,
  investors: 42,
  daysLeft: 15,
  roi: 25,
  riskLevel: "Medium",
  timeline: "6 bulan",
  landSize: "2 hektar",
  status: "funding",
  minInvestment: 500000,
  maxInvestment: 10000000,
  description: `Proyek budidaya cabai merah keriting varietas unggul dengan sistem irigasi tetes otomatis dan greenhouse modern. 

Kami menargetkan produksi 15 ton cabai merah premium per siklus tanam dengan kualitas super yang memenuhi standar ekspor. Lokasi strategis di Garut yang terkenal dengan cabai berkualitas tinggi.

Dengan pengalaman 10 tahun di industri pertanian dan track record sukses, kami berkomitmen memberikan return optimal bagi investor sambil berkontribusi pada ketahanan pangan nasional.`,
  highlights: [
    "Kontrak offtaker dengan supermarket chain (Giant, Transmart)",
    "Teknologi greenhouse otomatis dengan IoT monitoring",
    "Bersertifikat GAP (Good Agricultural Practices)",
    "Track record 3x panen sukses dengan ROI rata-rata 20%+",
  ],
  documents: [
    { name: "Business Plan & Financial Projection", type: "PDF", size: "2.4 MB" },
    { name: "Sertifikat Lahan & Legalitas", type: "PDF", size: "1.8 MB" },
    { name: "Kontrak Offtaker & MOU", type: "PDF", size: "956 KB" },
    { name: "Sertifikat GAP", type: "PDF", size: "1.2 MB" },
  ],
  returnSchedule: [
    { month: 3, percentage: 30, amount: 3750000, description: "Panen pertama (30%)" },
    { month: 5, percentage: 40, amount: 5000000, description: "Panen kedua (40%)" },
    { month: 6, percentage: 30, amount: 3750000, description: "Panen ketiga (30%)" },
  ],
  investmentTiers: [
    {
      name: "Seed Investor",
      min: 500000,
      max: 1999999,
      perks: ["Update progress bulanan", "Sertifikat investor", "Prioritas re-invest"],
    },
    {
      name: "Growth Investor",
      min: 2000000,
      max: 4999999,
      perks: [
        "Semua benefit Seed",
        "Farm visit 1x (gratis)",
        "5kg hasil panen gratis",
        "Early access proyek baru",
      ],
    },
    {
      name: "Impact Investor",
      min: 5000000,
      max: 10000000,
      perks: [
        "Semua benefit Growth",
        "Farm visit unlimited",
        "15kg hasil panen gratis",
        "Nama di plakat proyek",
        "Consultation 1-on-1 dengan petani",
      ],
    },
  ],
  riskAnalysis: [
    {
      risk: "Cuaca Ekstrem",
      mitigation: "Greenhouse dengan climate control & asuransi pertanian",
      level: "Medium",
    },
    {
      risk: "Hama & Penyakit",
      mitigation: "Monitoring IoT, pestisida organik terjadwal, SOP ketat",
      level: "Low",
    },
    {
      risk: "Fluktuasi Harga",
      mitigation: "Kontrak offtaker dengan harga minimum terjamin",
      level: "Low",
    },
  ],
  updates: [
    {
      date: "2026-04-10",
      title: "Persiapan Lahan Selesai 100%",
      content:
        "Alhamdulillah proses pengolahan tanah, instalasi greenhouse, dan sistem irigasi sudah selesai. Siap tanam minggu depan!",
      images: ["https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"],
    },
    {
      date: "2026-04-05",
      title: "Kontrak Offtaker Resmi Ditandatangani",
      content:
        "MOU dengan Giant dan Transmart untuk penyerapan 80% hasil panen sudah resmi. Harga minimum Rp 45,000/kg!",
      images: [],
    },
  ],
};

export function CrowdfundingDetail() {
  const { id } = useParams();
  const { isAuthenticated, isPremium } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState(1000000);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const progress = (mockProject.currentAmount / mockProject.targetAmount) * 100;
  const projectedReturn = (investmentAmount * mockProject.roi) / 100;
  const totalReturn = investmentAmount + projectedReturn;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-600 bg-green-50 border-green-200";
      case "Medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "High":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/crowdfunding"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-green-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Semua Proyek
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Project Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
              <div className="relative h-96">
                <img
                  src={mockProject.gallery[selectedImage]}
                  alt={mockProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isLiked ? "fill-red-500 text-red-500" : "text-slate-600"
                    }`}
                  />
                </button>
              </div>
              <div className="flex gap-2 p-4">
                {mockProject.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative h-20 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-green-600 ring-2 ring-green-200"
                        : "border-slate-200 hover:border-green-400"
                    }`}
                  >
                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h1 className="text-3xl font-bold text-slate-900 mb-4">{mockProject.title}</h1>

              {/* Farmer Info */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={mockProject.farmerAvatar}
                    alt={mockProject.farmer}
                    className="w-16 h-16 rounded-full border-2 border-green-600"
                  />
                  <div>
                    <h3 className="font-semibold text-slate-900">{mockProject.farmer}</h3>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{mockProject.farmerRating}</span>
                      </div>
                      <span>•</span>
                      <span>{mockProject.farmerProjects} proyek sukses</span>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/farmers/${mockProject.id}`}
                  className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-all text-sm font-medium"
                >
                  Lihat Profil
                </Link>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Tentang Proyek</h3>
                <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                  {mockProject.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">✨ Keunggulan</h3>
                <div className="grid gap-3">
                  {mockProject.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Return Schedule */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  💰 Jadwal Return Investasi
                </h3>
                <div className="space-y-3">
                  {mockProject.returnSchedule.map((schedule, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-green-200">
                          <span className="text-lg font-bold text-green-600">
                            M{schedule.month}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{schedule.description}</p>
                          <p className="text-sm text-slate-600">
                            Bulan {schedule.month} ({schedule.percentage}% dari total ROI)
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">Estimasi return</p>
                        <p className="text-lg font-bold text-green-600">
                          Rp {((investmentAmount * mockProject.roi) / 100 * (schedule.percentage / 100)).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Analysis */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  🛡️ Analisis & Mitigasi Risiko
                </h3>
                <div className="space-y-3">
                  {mockProject.riskAnalysis.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 rounded-lg border border-slate-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-900">{item.risk}</h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(
                            item.level
                          )}`}
                        >
                          {item.level}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        {item.mitigation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">📄 Dokumen Proyek</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {mockProject.documents.map((doc, idx) => (
                    <button
                      key={idx}
                      className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-green-600 hover:bg-green-50 transition-all text-left"
                    >
                      <div className="p-3 bg-white rounded-lg border border-slate-200">
                        <FileText className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 text-sm">{doc.name}</p>
                        <p className="text-xs text-slate-600">
                          {doc.type} • {doc.size}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Updates */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">📢 Update Proyek</h3>
              <div className="space-y-6">
                {mockProject.updates.map((update, idx) => (
                  <div key={idx} className="border-l-4 border-green-600 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600">{update.date}</span>
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">{update.title}</h4>
                    <p className="text-slate-700 mb-3">{update.content}</p>
                    {update.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {update.images.map((img, imgIdx) => (
                          <img
                            key={imgIdx}
                            src={img}
                            alt="Update"
                            className="rounded-lg border border-slate-200"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Investment Card (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Investment Card */}
              <div className="bg-white rounded-xl p-6 border-2 border-green-600 shadow-lg">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">Progress Pendanaan</span>
                    <span className="text-sm font-semibold text-green-600">
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-gradient-to-r from-green-600 to-emerald-500 rounded-full"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Rp {(mockProject.currentAmount / 1000000).toFixed(1)}jt</span>
                    <span>Target: Rp {(mockProject.targetAmount / 1000000).toFixed(0)}jt</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-green-600">{mockProject.roi}%</p>
                    <p className="text-xs text-slate-600">Target ROI</p>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-blue-600">{mockProject.timeline}</p>
                    <p className="text-xs text-slate-600">Durasi</p>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                    <Users className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-orange-600">{mockProject.investors}</p>
                    <p className="text-xs text-slate-600">Investor</p>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-red-50 to-rose-50 rounded-lg border border-red-200">
                    <Clock className="w-5 h-5 text-red-600 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-red-600">{mockProject.daysLeft}</p>
                    <p className="text-xs text-slate-600">Hari Lagi</p>
                  </div>
                </div>

                {/* Investment Amount Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Jumlah Investasi
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">
                      Rp
                    </span>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      min={mockProject.minInvestment}
                      max={mockProject.maxInvestment}
                      step={100000}
                      className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent font-semibold text-lg"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Min: Rp {(mockProject.minInvestment / 1000000).toFixed(1)}jt • Max: Rp{" "}
                    {(mockProject.maxInvestment / 1000000).toFixed(0)}jt
                  </p>
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {[500000, 1000000, 5000000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setInvestmentAmount(amount)}
                      className="px-3 py-2 bg-slate-100 hover:bg-green-100 hover:text-green-600 rounded-lg text-sm font-medium transition-all"
                    >
                      {amount / 1000000}jt
                    </button>
                  ))}
                </div>

                {/* Return Projection */}
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 mb-6">
                  <h4 className="text-sm font-medium text-slate-700 mb-3">
                    Proyeksi Return ({mockProject.timeline})
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Modal Awal:</span>
                      <span className="font-semibold">
                        Rp {investmentAmount.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">ROI {mockProject.roi}%:</span>
                      <span className="font-semibold text-green-600">
                        + Rp {projectedReturn.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="border-t border-green-200 pt-2 flex justify-between">
                      <span className="font-semibold text-slate-900">Total Return:</span>
                      <span className="font-bold text-lg text-green-600">
                        Rp {totalReturn.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Invest Button */}
                {isAuthenticated ? (
                  <button
                    onClick={() => setShowInvestModal(true)}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    💰 Investasi Sekarang
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="block w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold text-center hover:shadow-lg transition-all"
                  >
                    Login untuk Investasi
                  </Link>
                )}

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">Bagikan</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">Tanya</span>
                  </button>
                </div>
              </div>

              {/* Investment Tiers */}
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">🎁 Benefit Investor</h3>
                <div className="space-y-3">
                  {mockProject.investmentTiers.map((tier, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        investmentAmount >= tier.min && investmentAmount <= tier.max
                          ? "border-green-600 bg-green-50"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-900">{tier.name}</h4>
                        {investmentAmount >= tier.min && investmentAmount <= tier.max && (
                          <Award className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mb-2">
                        Rp {(tier.min / 1000000).toFixed(1)}jt - Rp {(tier.max / 1000000).toFixed(0)}
                        jt
                      </p>
                      <ul className="space-y-1">
                        {tier.perks.map((perk, perkIdx) => (
                          <li key={perkIdx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                            {perk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Jaminan Keamanan
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Dana dikelola escrow system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Verifikasi legalitas proyek</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Asuransi gagal panen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Transparansi 100%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      {showInvestModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Konfirmasi Investasi</h3>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Proyek</p>
                <p className="font-semibold text-slate-900">{mockProject.title}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-slate-600 mb-1">Jumlah Investasi</p>
                <p className="text-2xl font-bold text-green-600">
                  Rp {investmentAmount.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-2">Estimasi Return</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>ROI {mockProject.roi}%</span>
                    <span className="font-semibold text-green-600">
                      Rp {projectedReturn.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total Return</span>
                    <span className="text-green-600">Rp {totalReturn.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowInvestModal(false)}
                className="flex-1 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all"
              >
                Batal
              </button>
              <button className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold">
                Bayar Sekarang
              </button>
            </div>
            <p className="text-xs text-center text-slate-500 mt-4">
              Dengan melanjutkan, Anda menyetujui{" "}
              <a href="#" className="text-green-600 underline">
                Syarat & Ketentuan
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

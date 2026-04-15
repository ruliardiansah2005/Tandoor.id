import { useState } from "react";
import { Link } from "react-router";
import {
  TrendingUp,
  ArrowLeft,
  BarChart3,
  DollarSign,
  Clock,
  CheckCircle2,
  Leaf,
  Calendar,
  Download,
  Eye,
} from "lucide-react";

// Mock data untuk portofolio investor
const mockPortfolio = {
  totalInvested: 15000000,
  totalReturn: 3750000,
  activeProjects: 5,
  completedProjects: 3,
  investments: [
    {
      id: 1,
      projectTitle: "Budidaya Cabai Merah Premium - Musim Tanam 2026",
      projectImage: "https://images.unsplash.com/photo-1583641411506-8f32df5e1d6e?w=400&q=80",
      investedAmount: 5000000,
      currentReturn: 1250000,
      expectedReturn: 1250000,
      roi: 25,
      status: "active",
      progress: 50,
      nextReturn: "2026-06-15",
      investmentDate: "2026-04-01",
    },
    {
      id: 2,
      projectTitle: "Durian Montong Super - Investasi Jangka Panjang",
      projectImage: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80",
      investedAmount: 3000000,
      currentReturn: 0,
      expectedReturn: 1350000,
      roi: 45,
      status: "active",
      progress: 20,
      nextReturn: "2026-08-20",
      investmentDate: "2026-04-05",
    },
    {
      id: 3,
      projectTitle: "Padi Organik Bersertifikat - Program Desa Mandiri",
      projectImage: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80",
      investedAmount: 2000000,
      currentReturn: 360000,
      expectedReturn: 360000,
      roi: 18,
      status: "completed",
      progress: 100,
      completedDate: "2026-04-10",
      investmentDate: "2025-11-15",
    },
    {
      id: 4,
      projectTitle: "Budidaya Lele Bioflok Teknologi Modern",
      projectImage: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&q=80",
      investedAmount: 3000000,
      currentReturn: 450000,
      expectedReturn: 900000,
      roi: 30,
      status: "active",
      progress: 50,
      nextReturn: "2026-05-20",
      investmentDate: "2026-03-20",
    },
    {
      id: 5,
      projectTitle: "Strawberry Hidroponik Premium - Agrowisata Edukatif",
      projectImage: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=400&q=80",
      investedAmount: 2000000,
      currentReturn: 0,
      expectedReturn: 560000,
      roi: 28,
      status: "active",
      progress: 15,
      nextReturn: "2026-07-10",
      investmentDate: "2026-04-10",
    },
  ],
};

export function CrowdfundingPortfolio() {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredInvestments = mockPortfolio.investments.filter((inv) => {
    if (filter === "all") return true;
    return inv.status === filter;
  });

  const avgROI =
    mockPortfolio.investments.reduce((sum, inv) => sum + inv.roi, 0) /
    mockPortfolio.investments.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <Link
          to="/crowdfunding"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-green-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Crowdfunding
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">📊 Portofolio Investasi Saya</h1>
          <p className="text-slate-600">
            Pantau performa investasi pertanian Anda secara real-time
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 opacity-80" />
              <span className="text-sm opacity-80">Total Investasi</span>
            </div>
            <p className="text-3xl font-bold">
              Rp {(mockPortfolio.totalInvested / 1000000).toFixed(1)}jt
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 opacity-80" />
              <span className="text-sm opacity-80">Total Return</span>
            </div>
            <p className="text-3xl font-bold">
              Rp {(mockPortfolio.totalReturn / 1000000).toFixed(1)}jt
            </p>
            <p className="text-sm opacity-80 mt-1">+{avgROI.toFixed(1)}% Avg ROI</p>
          </div>

          <div className="bg-gradient-to-br from-orange-600 to-amber-600 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Leaf className="w-8 h-8 opacity-80" />
              <span className="text-sm opacity-80">Proyek Aktif</span>
            </div>
            <p className="text-3xl font-bold">{mockPortfolio.activeProjects}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="w-8 h-8 opacity-80" />
              <span className="text-sm opacity-80">Selesai</span>
            </div>
            <p className="text-3xl font-bold">{mockPortfolio.completedProjects}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-3">
            {[
              { value: "all", label: "Semua" },
              { value: "active", label: "Aktif" },
              { value: "completed", label: "Selesai" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value as any)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  filter === tab.value
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-green-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export PDF</span>
          </button>
        </div>

        {/* Investments List */}
        <div className="space-y-4">
          {filteredInvestments.map((investment) => (
            <div
              key={investment.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="p-6">
                <div className="flex items-start gap-6">
                  {/* Project Image */}
                  <img
                    src={investment.projectImage}
                    alt={investment.projectTitle}
                    className="w-32 h-32 rounded-lg object-cover flex-shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-1">
                          {investment.projectTitle}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Invested: {investment.investmentDate}</span>
                          </div>
                          {investment.status === "active" && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>Next return: {investment.nextReturn}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          investment.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {investment.status === "active" ? "Aktif" : "Selesai"}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    {investment.status === "active" && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-slate-600">Progress ROI</span>
                          <span className="text-sm font-semibold text-green-600">
                            {investment.progress}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-600 to-emerald-500 rounded-full"
                            style={{ width: `${investment.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Modal Investasi</p>
                        <p className="font-semibold text-slate-900">
                          Rp {(investment.investedAmount / 1000000).toFixed(1)}jt
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Return Diterima</p>
                        <p className="font-semibold text-green-600">
                          Rp {(investment.currentReturn / 1000000).toFixed(1)}jt
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Expected Return</p>
                        <p className="font-semibold text-blue-600">
                          Rp {(investment.expectedReturn / 1000000).toFixed(1)}jt
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 mb-1">ROI Target</p>
                        <p className="font-semibold text-orange-600">{investment.roi}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 pt-4 border-t border-slate-200 flex gap-3">
                  <Link
                    to={`/crowdfunding/${investment.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    Lihat Proyek
                  </Link>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-all text-sm font-medium">
                    <BarChart3 className="w-4 h-4" />
                    Lihat Performance
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-all text-sm font-medium">
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredInvestments.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Belum ada investasi {filter !== "all" && filter}
            </h3>
            <p className="text-slate-600 mb-6">
              Mulai investasi di proyek pertanian produktif untuk mendukung petani dan raih keuntungan
            </p>
            <Link
              to="/crowdfunding"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <TrendingUp className="w-5 h-5" />
              Jelajahi Proyek
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { X, Sparkles, TrendingUp, Globe, Leaf, Zap, ArrowRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isPremium } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has seen the welcome modal today
    const lastSeen = localStorage.getItem("welcomeModalLastSeen");
    const today = new Date().toDateString();

    if (lastSeen !== today && user) {
      setIsOpen(true);
    }
  }, [user]);

  const handleClose = () => {
    const today = new Date().toDateString();
    localStorage.setItem("welcomeModalLastSeen", today);
    setIsOpen(false);
  };

  const handleExplore = (path: string) => {
    handleClose();
    navigate(path);
  };

  if (!isOpen) return null;

  const features = [
    {
      icon: Globe,
      title: "Pemetaan Lahan",
      description: "Monitoring real-time dengan satelit",
      color: "from-blue-500 to-cyan-500",
      path: "/farm-planning"
    },
    {
      icon: TrendingUp,
      title: "Analisis NDVI",
      description: "AI-powered kesehatan tanaman",
      color: "from-green-500 to-emerald-500",
      path: "/farm-planning"
    },
    {
      icon: Leaf,
      title: "Smart Farming",
      description: "Rekomendasi berbasis data",
      color: "from-orange-500 to-amber-500",
      path: "/dashboard"
    },
    {
      icon: Zap,
      title: "Marketplace",
      description: "Jual hasil panen langsung",
      color: "from-purple-500 to-indigo-500",
      path: "/marketplace"
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg"
        >
          <X className="w-5 h-5 text-slate-700" />
        </button>

        {/* Header with Gradient */}
        <div className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 p-8 md:p-12 text-white overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Selamat Datang, {user?.name}! 👋
                </h1>
                {isPremium && (
                  <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full">
                    <Sparkles className="w-4 h-4" />
                    PREMIUM USER
                  </span>
                )}
              </div>
            </div>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Platform pertanian pintar Indonesia yang menggabungkan AI, Remote Sensing, dan Precision Agriculture untuk meningkatkan produktivitas hingga 50%
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">
            Jelajahi Fitur Unggulan TANDOOR
          </h2>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleExplore(feature.path)}
                  className="group relative bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl border-2 border-slate-200 hover:border-green-500 transition-all hover:shadow-lg text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 text-slate-800 group-hover:text-green-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">15K+</div>
                <div className="text-xs text-slate-600">Petani Aktif</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">50K+</div>
                <div className="text-xs text-slate-600">Hektar Terpantau</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">+45%</div>
                <div className="text-xs text-slate-600">Produktivitas</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleExplore("/dashboard")}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
            >
              Mulai Sekarang
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={handleClose}
              className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all font-semibold"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

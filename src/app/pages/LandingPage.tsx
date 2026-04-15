import { Link } from "react-router";
import { 
  ArrowRight, 
  Satellite, 
  Brain, 
  TrendingUp, 
  Shield, 
  DollarSign,
  Leaf,
  MapPin,
  BarChart3,
  Users
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import logoTandoor from "../../imports/tandoor.png";

export function LandingPage() {
  const stats = [
    { label: "Produktivitas", value: "+45%", icon: TrendingUp, color: "text-green-600" },
    { label: "Risiko Gagal Panen", value: "-38%", icon: Shield, color: "text-blue-600" },
    { label: "Efisiensi Biaya", value: "+32%", icon: DollarSign, color: "text-emerald-600" },
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Deteksi dini penyakit tanaman dan rekomendasi akurat berbasis kecerdasan buatan",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: Satellite,
      title: "Remote Sensing",
      description: "Monitoring lahan menggunakan citra satelit dan teknologi GIS terkini",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: BarChart3,
      title: "Precision Agriculture",
      description: "Optimalisasi input pertanian dengan data spasial dan temporal yang akurat",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Supply Chain Management",
      description: "Kelola distribusi dan pasar hasil tani dengan sistem terintegrasi",
      gradient: "from-orange-500 to-red-500"
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-orange-50 to-emerald-50"></div>
        {/* Removed bg-grid pattern that was causing issues */}
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm">
                <Satellite className="w-4 h-4" />
                <span>Platform Pertanian Presisi Indonesia</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Pertanian Presisi
                <br />
                untuk Masa Depan Indonesia
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed">
                Tingkatkan produktivitas, kurangi risiko, dan optimalkan hasil panen dengan teknologi AI, Remote Sensing, dan Precision Agriculture.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Mulai Gratis
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 border-2 border-slate-300 rounded-lg hover:border-green-600 transition-all"
                >
                  <MapPin className="w-5 h-5" />
                  Masuk
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                      <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                      <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-xs text-slate-600 mt-1">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-green-600 to-orange-500 rounded-2xl p-1 shadow-2xl">
                <div className="bg-slate-900 rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80"
                    alt="Modern Agriculture with Drone and Satellite Technology"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
              {/* Floating cards */}
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Kesehatan Tanaman</div>
                    <div className="text-lg font-bold text-green-600">98.5%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Teknologi Canggih untuk Pertanian Modern
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Manfaatkan kekuatan AI, Remote Sensing, dan Big Data untuk mengoptimalkan setiap aspek pertanian Anda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-transparent hover:shadow-xl transition-all duration-300"
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.gradient} mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-60 to dark bg-green-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Siap Bertani dengan Teknologi Masa Depan?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan petani modern yang telah meningkatkan produktivitas mereka
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 rounded-lg hover:shadow-xl transition-all text-lg font-semibold"
          >
            Mulai Sekarang
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Target Users Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            
            {/* Gunakan inline-flex agar h2 tetap terpusat (center) tapi isinya berjejer ke samping */}
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3 flex-wrap">
              <span>Untuk Siapa</span>
                <img 
                  src={logoTandoor} 
                  alt="Logo Tandoor" 
                  className="h-12 w-auto object-contain" 
                />
              <span>?</span>
            </h2>
            <p className="text-xl text-slate-600">
              Platform yang dirancang untuk seluruh ekosistem pertanian Indonesia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Petani Individu", desc: "Petani modern & milenial yang ingin meningkatkan produktivitas" },
              { title: "Kelompok Tani", desc: "Koperasi dan organisasi petani untuk manajemen bersama" },
              { title: "Distributor", desc: "Offtaker hasil pertanian yang mencari supply chain efisien" },
              { title: "Perusahaan Swasta", desc: "Perusahaan pertanian yang mengelola lahan skala besar" }
            ].map((user, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{user.title}</h3>
                <p className="text-slate-600 text-sm">{user.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
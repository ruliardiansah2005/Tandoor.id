import { Link } from "react-router";
import {
  ArrowRight,
  Target,
  TrendingUp,
  Users,
  BarChart3,
  Eye,
  MousePointerClick,
  CheckCircle,
  Zap,
  ShoppingCart,
  LayoutDashboard,
  Leaf,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import logoTandoor from "../../imports/tandoor.png";

export function AdvertiserLanding() {
  const stats = [
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "Avg. CTR", value: "3.8%", icon: MousePointerClick },
    { label: "Reach", value: "500K+", icon: Eye },
    { label: "Conversions", value: "12K+", icon: TrendingUp },
  ];

  const placements = [
    {
      name: "Dashboard Banner",
      description: "Large banner ads on main dashboard - high visibility",
      reach: "45K daily impressions",
      ctr: "4.2% avg CTR",
      price: "Rp 2M/month",
      icon: LayoutDashboard,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Marketplace Ads",
      description: "Product placement in marketplace - purchase intent users",
      reach: "32K daily impressions",
      ctr: "5.1% avg CTR",
      price: "Rp 1.5M/month",
      icon: ShoppingCart,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Sidebar Ads",
      description: "Small ads on sidebar - continuous visibility",
      reach: "15K daily impressions",
      ctr: "2.8% avg CTR",
      price: "Rp 800K/month",
      icon: BarChart3,
      color: "from-purple-500 to-indigo-500",
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: "Targeted Audience",
      description: "Reach farmers, cooperatives, distributors, and agricultural companies",
    },
    {
      icon: TrendingUp,
      title: "High Performance",
      description: "Average 3.8% CTR with engaged agricultural professionals",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track impressions, clicks, CTR, and conversions in real-time",
    },
    {
      icon: Zap,
      title: "Quick Setup",
      description: "Launch your campaign in minutes with our easy-to-use platform",
    },
  ];

  const audiences = [
    { segment: "Petani Individu", percentage: 45, color: "bg-green-600" },
    { segment: "Kelompok Tani", percentage: 25, color: "bg-blue-600" },
    { segment: "Distributor", percentage: 20, color: "bg-orange-600" },
    { segment: "Perusahaan", percentage: 10, color: "bg-purple-600" },
  ];

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-orange-50 to-emerald-50"></div>

        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm">
                <Target className="w-4 h-4" />
                <span>Advertising Platform untuk Produk Pertanian</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className>
                  Jangkau
                </span>
                <br />
                50,000+ Petani Modern Indonesia
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed">
                Pasang iklan produk pertanian Anda di platform Tandoor dan dapatkan akses ke ribuan petani, koperasi,
                distributor, dan perusahaan pertanian aktif.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/advertiser-dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Mulai Beriklan
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 border-2 border-slate-300 rounded-lg hover:border-green-600 transition-all"
                >
                  Lihat Harga
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                      <Icon className="w-5 h-5 text-green-600 mb-2" />
                      <div className="text-2xl font-bold text-green-600">{stat.value}</div>
                      <div className="text-xs text-slate-600 mt-1">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-green-60 to divide-amber-200 rounded-2xl p-1 shadow-2xl">
                <div className="bg-white rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                    alt="Advertising Dashboard Analytics"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            
            {/* Flexbox untuk menyejajarkan teks dan logo */}
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3 flex-wrap">
              Mengapa Beriklan di 
              <img 
                src={logoTandoor} 
                alt="Logo Tandoor" 
                className="h-10 w-auto object-contain rounded" 
              />
              ?
            </h2>      
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Platform advertising yang dirancang khusus untuk industri pertanian modern
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-transparent hover:shadow-xl transition-all duration-300"
                >
                  <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Audience Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Target Audience</h2>
              <p className="text-xl text-slate-600">Jangkau segmen yang tepat untuk produk Anda</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="space-y-6">
                {audiences.map((audience, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded ${audience.color}`}></div>
                        <span className="text-lg font-semibold">{audience.segment}</span>
                      </div>
                      <span className="text-2xl font-bold text-slate-700">{audience.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-4">
                      <div
                        className={`${audience.color} h-4 rounded-full transition-all`}
                        style={{ width: `${audience.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Ad Placements & Pricing</h2>
            <p className="text-xl text-slate-600">Pilih penempatan iklan yang sesuai dengan kebutuhan Anda</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {placements.map((placement, index) => {
              const Icon = placement.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border-2 border-slate-200 hover:border-green-500 hover:shadow-xl transition-all p-8"
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${placement.color} mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{placement.name}</h3>
                  <p className="text-slate-600 mb-6">{placement.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="w-4 h-4 text-green-600" />
                      <span>{placement.reach}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MousePointerClick className="w-4 h-4 text-green-600" />
                      <span>{placement.ctr}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <div className="text-3xl font-bold text-green-600 mb-4">{placement.price}</div>
                    <Link
                      to="/advertiser-dashboard"
                      className="block w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center rounded-lg hover:shadow-lg transition-all font-semibold"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">💳 Pembayaran aman melalui Transfer Bank, E-Wallet, dan Kartu Kredit</p>
            <p className="text-slate-600">📊 Dapatkan laporan analytics real-time untuk semua campaign Anda</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-dark bg-green-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Siap Meningkatkan Penjualan Produk Anda?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan puluhan brand pertanian yang telah meningkatkan awareness dan penjualan mereka
          </p>
          <Link
            to="/advertiser-dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 rounded-lg hover:shadow-xl transition-all text-lg font-semibold"
          >
            Mulai Campaign Pertama
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              
              {/* Kolom 1: Logo & Deskripsi */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {/* Bagian Logo Utama */}
                  <img 
                    src={logoTandoor} 
                    alt="Tandoor Logo" 
                    className="h-8 w-auto object-contain" 
                  />
                </div>
                <p className="text-slate-400 text-sm">
                  Platform Pertanian Presisi Indonesia
                </p>
              </div>
            <div>
              <h4 className="font-semibold mb-4">Advertiser</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link to="/advertiser-dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>Analytics</li>
                <li>Support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link to="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/marketplace" className="hover:text-white">
                    Marketplace
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Email: ads@tandoor.id</li>
                <li>Phone: +62 812-3456-7890</li>
                <li>Yogyakarta, Indonesia</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2026 Tandoor. Platform Pertanian Pintar Indonesia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

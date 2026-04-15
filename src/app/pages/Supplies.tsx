import { useState } from "react";
import {
  ShoppingCart,
  Search,
  Filter,
  Star,
  Package,
  Truck,
  Shield,
  Sprout,
  Droplets,
  Wrench,
  Leaf,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Supplies() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const supplies = [
    {
      id: 1,
      name: "NPK Phonska Pupuk Organik 50kg",
      seller: "Toko Pertanian Makmur",
      category: "pupuk",
      price: 185000,
      originalPrice: 220000,
      discount: 16,
      stock: 450,
      unit: "karung",
      rating: 4.8,
      sold: 1200,
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80",
      certified: true,
      badge: "Bestseller",
    },
    {
      id: 2,
      name: "Pestisida Organik NEEM OIL 500ml",
      seller: "Agro Supply Center",
      category: "pestisida",
      price: 125000,
      originalPrice: 150000,
      discount: 17,
      stock: 280,
      unit: "botol",
      rating: 4.9,
      sold: 850,
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80",
      certified: true,
      badge: "Eco-Friendly",
    },
    {
      id: 3,
      name: "Pupuk Urea Subsidi 50kg",
      seller: "Koperasi Tani Sejahtera",
      category: "pupuk",
      price: 95000,
      stock: 600,
      unit: "karung",
      rating: 4.6,
      sold: 2400,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80",
      certified: true,
      badge: "Subsidi",
    },
    {
      id: 4,
      name: "Sprayer Elektrik 16 Liter",
      seller: "Alat Tani Modern",
      category: "alat",
      price: 850000,
      originalPrice: 1100000,
      discount: 23,
      stock: 45,
      unit: "unit",
      rating: 4.7,
      sold: 320,
      image: "https://images.unsplash.com/photo-1416339442236-8ceb164046f8?w=400&q=80",
      certified: false,
      badge: "Promo",
    },
    {
      id: 5,
      name: "Pupuk Kompos Organik 25kg",
      seller: "Green Farm Supplies",
      category: "pupuk",
      price: 45000,
      stock: 800,
      unit: "karung",
      rating: 4.8,
      sold: 1850,
      image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&q=80",
      certified: true,
      badge: "Organik",
    },
    {
      id: 6,
      name: "Insektisida Sistemik IMIDA 100ml",
      seller: "Tani Protect Store",
      category: "pestisida",
      price: 65000,
      stock: 350,
      unit: "botol",
      rating: 4.5,
      sold: 640,
      image: "https://images.unsplash.com/photo-1595255834481-26d90abd5044?w=400&q=80",
      certified: true,
    },
    {
      id: 7,
      name: "Cangkul Heavy Duty + Gagang",
      seller: "Alat Tani Modern",
      category: "alat",
      price: 175000,
      originalPrice: 220000,
      discount: 20,
      stock: 120,
      unit: "unit",
      rating: 4.9,
      sold: 580,
      image: "https://images.unsplash.com/photo-1615671524827-c1fe3973b648?w=400&q=80",
      certified: false,
      badge: "Promo",
    },
    {
      id: 8,
      name: "Pupuk KCL (Kalium) 50kg",
      seller: "Koperasi Tani Sejahtera",
      category: "pupuk",
      price: 145000,
      stock: 420,
      unit: "karung",
      rating: 4.7,
      sold: 970,
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&q=80",
      certified: true,
    },
    {
      id: 9,
      name: "Sistem Irigasi Tetes 100m",
      seller: "Agro Supply Center",
      category: "alat",
      price: 1250000,
      originalPrice: 1500000,
      discount: 17,
      stock: 25,
      unit: "set",
      rating: 5.0,
      sold: 145,
      image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=400&q=80",
      certified: true,
      badge: "Premium",
    },
  ];

  const categories = [
    { id: "all", label: "Semua Produk", icon: Package, count: supplies.length },
    {
      id: "pupuk",
      label: "Pupuk & Nutrisi",
      icon: Sprout,
      count: supplies.filter((p) => p.category === "pupuk").length,
    },
    {
      id: "pestisida",
      label: "Pestisida & Obat",
      icon: Shield,
      count: supplies.filter((p) => p.category === "pestisida").length,
    },
    {
      id: "alat",
      label: "Alat Pertanian",
      icon: Wrench,
      count: supplies.filter((p) => p.category === "alat").length,
    },
  ];

  const filteredSupplies = supplies.filter((supply) => {
    const matchesCategory = selectedCategory === "all" || supply.category === selectedCategory;
    const matchesSearch =
      supply.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supply.seller.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { label: "Produk Tersedia", value: "2,850+", icon: Package, color: "from-green-500 to-emerald-500" },
    { label: "Penjual Terpercaya", value: "180+", icon: Shield, color: "from-blue-500 to-cyan-500" },
    { label: "Transaksi Bulan Ini", value: "3,420", icon: TrendingUp, color: "from-purple-500 to-indigo-500" },
    { label: "Pengiriman Gratis", value: "24 Jam", icon: Truck, color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Toko Sarana Pertanian</h1>
          <p className="text-slate-600 text-sm md:text-base">
            Belanja kebutuhan pertanian - Pupuk, Pestisida, dan Alat langsung dari supplier terpercaya
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} mb-2`}>
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div className="text-xs md:text-sm text-slate-600">{stat.label}</div>
                <div className="text-lg md:text-2xl font-bold">{stat.value}</div>
              </div>
            );
          })}
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari pupuk, pestisida, alat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 whitespace-nowrap">
              <Filter className="w-5 h-5" />
              <span className="hidden md:inline">Filter</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 mt-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center justify-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{cat.label}</span>
                  <span className="md:hidden">{cat.label.split(" ")[0]}</span>
                  <span className="hidden md:inline">({cat.count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSupplies.map((supply) => (
            <div
              key={supply.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <ImageWithFallback
                  src={supply.image}
                  alt={supply.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {supply.badge && (
                  <div
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
                      supply.badge === "Bestseller"
                        ? "bg-orange-600 text-white"
                        : supply.badge === "Eco-Friendly"
                        ? "bg-green-600 text-white"
                        : supply.badge === "Subsidi"
                        ? "bg-blue-600 text-white"
                        : supply.badge === "Organik"
                        ? "bg-emerald-600 text-white"
                        : supply.badge === "Premium"
                        ? "bg-purple-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {supply.badge}
                  </div>
                )}
                {supply.certified && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span className="text-green-700">Resmi</span>
                  </div>
                )}
                {supply.discount && (
                  <div className="absolute bottom-3 right-3 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
                    -{supply.discount}%
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-base md:text-lg mb-2 line-clamp-2">{supply.name}</h3>

                <div className="flex items-center gap-2 text-xs md:text-sm text-slate-600 mb-3">
                  <Package className="w-4 h-4" />
                  <span className="line-clamp-1">{supply.seller}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold">{supply.rating}</span>
                  </div>
                  <span className="text-xs text-slate-500">|</span>
                  <span className="text-xs text-slate-500">Terjual {supply.sold}</span>
                </div>

                {/* Price */}
                <div className="mb-3">
                  {supply.originalPrice ? (
                    <>
                      <div className="text-xs text-slate-400 line-through">
                        Rp {supply.originalPrice.toLocaleString()}
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-green-600">
                        Rp {supply.price.toLocaleString()}
                      </div>
                    </>
                  ) : (
                    <div className="text-xl md:text-2xl font-bold text-green-600">
                      Rp {supply.price.toLocaleString()}
                    </div>
                  )}
                  <div className="text-xs text-slate-500">per {supply.unit}</div>
                </div>

                {/* Stock */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-600">Stok</span>
                    <span className="font-semibold">
                      {supply.stock} {supply.unit}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-green-600 to-emerald-500 h-1.5 rounded-full"
                      style={{ width: `${Math.min((supply.stock / 1000) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 md:py-2.5 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm md:text-base">
                  <ShoppingCart className="w-4 h-4" />
                  Beli Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSupplies.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Produk tidak ditemukan</h3>
            <p className="text-slate-600">Coba ubah filter atau kata kunci pencarian Anda</p>
          </div>
        )}

        {/* Info Banner */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-start gap-3">
              <div className="bg-green-600 p-3 rounded-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Gratis Ongkir</h3>
                <p className="text-sm text-slate-600">Untuk pembelian minimal Rp 500.000</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Produk Terjamin</h3>
                <p className="text-sm text-slate-600">100% original dari supplier resmi</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-start gap-3">
              <div className="bg-purple-600 p-3 rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Konsultasi Gratis</h3>
                <p className="text-sm text-slate-600">Dapatkan saran ahli untuk tanaman Anda</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

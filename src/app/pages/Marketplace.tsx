import { 
  ShoppingCart, 
  MapPin, 
  TrendingUp, 
  Star,
  Filter,
  Search,
  DollarSign,
  Package,
  Truck,
  CheckCircle
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState, useMemo } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AdBanner } from "../components/AdBanner";
import { ChartWrapper } from "../components/ChartWrapper";

export function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = useMemo(() => [
    {
      id: 1,
      name: "Padi Organik Premium",
      farmer: "Kelompok Tani Makmur",
      location: "Jember, Jawa Timur",
      distance: "45 km",
      price: 6500,
      quality: 95,
      available: 2500,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80",
      category: "padi",
      rating: 4.9,
      certified: true
    },
    {
      id: 2,
      name: "Cabai Merah Keriting",
      farmer: "Pak Bambang",
      location: "Garut, Jawa Barat",
      distance: "120 km",
      price: 45000,
      quality: 92,
      available: 500,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80",
      category: "sayuran",
      rating: 4.7,
      certified: true
    },
    {
      id: 3,
      name: "Tomat Segar",
      farmer: "CV Sayur Hijau",
      location: "Bandung, Jawa Barat",
      distance: "85 km",
      price: 18000,
      quality: 90,
      available: 800,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&q=80",
      category: "sayuran",
      rating: 4.8,
      certified: false
    },
    {
      id: 4,
      name: "Jagung Manis",
      farmer: "Koperasi Tani Sejahtera",
      location: "Malang, Jawa Timur",
      distance: "60 km",
      price: 4200,
      quality: 88,
      available: 1500,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&q=80",
      category: "jagung",
      rating: 4.6,
      certified: true
    },
    {
      id: 5,
      name: "Kedelai Lokal",
      farmer: "Kelompok Tani Subur",
      location: "Kediri, Jawa Timur",
      distance: "52 km",
      price: 9500,
      quality: 94,
      available: 980,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1595974203925-da10e6b8f2bb?w=400&q=80",
      category: "kedelai",
      rating: 4.8,
      certified: true
    },
  ], []);

  const priceHistory = useMemo(() => [
    { id: 'ph1', product: "Cabai", week1: 42000, week2: 43500, week3: 44000, week4: 45000 },
    { id: 'ph2', product: "Tomat", week1: 16000, week2: 17000, week3: 17500, week4: 18000 },
    { id: 'ph3', product: "Padi", week1: 6000, week2: 6200, week3: 6300, week4: 6500 },
    { id: 'ph4', product: "Jagung", week1: 3800, week2: 4000, week3: 4100, week4: 4200 },
  ], []);

  const transactions = useMemo(() => [
    { id: "TRX001", buyer: "PT Pangan Nusantara", product: "Padi Organik", amount: "500 kg", status: "completed", time: "2 jam lalu" },
    { id: "TRX002", buyer: "CV Sayur Segar", product: "Cabai Merah", amount: "200 kg", status: "shipping", time: "5 jam lalu" },
    { id: "TRX003", buyer: "Koperasi Pasar", product: "Tomat", amount: "350 kg", status: "processing", time: "1 hari lalu" },
  ], []);

  const categories = [
    { id: "all", label: "Semua", count: products.length },
    { id: "padi", label: "Padi", count: products.filter(p => p.category === "padi").length },
    { id: "sayuran", label: "Sayuran", count: products.filter(p => p.category === "sayuran").length },
    { id: "jagung", label: "Jagung", count: products.filter(p => p.category === "jagung").length },
    { id: "kedelai", label: "Kedelai", count: products.filter(p => p.category === "kedelai").length },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOrder = (product: any) => {
    setSelectedProduct(product);
    setShowOrderModal(true);
  };

  const handleCloseModal = () => {
    setShowOrderModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Marketplace Hasil Tani</h1>
          <p className="text-slate-600">Platform jual-beli hasil pertanian langsung dari petani ke pembeli</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Produk", value: "2,450", icon: Package, color: "from-green-500 to-emerald-500" },
            { label: "Petani Aktif", value: "156", icon: Star, color: "from-blue-500 to-cyan-500" },
            { label: "Transaksi Bulan Ini", value: "428", icon: ShoppingCart, color: "from-purple-500 to-indigo-500" },
            { label: "Total Volume", value: "85 Ton", icon: TrendingUp, color: "from-orange-500 to-red-500" },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-lg transition-all">
                <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} mb-2`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            );
          })}
        </div>

        {/* Ad Banner - Top */}
        <div className="mb-8">
          <AdBanner placement="top" size="medium" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search & Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari produk atau petani..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                  <Filter className="w-5 h-5" />
                  Filter
                </button>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mt-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat.id
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {cat.label} ({cat.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all group">
                  {/* Product Image */}
                  <div className="relative h-48 bg-slate-200 overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.certified && (
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Tersertifikasi
                        </span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <div className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold">{product.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{product.location}</span>
                      <span className="text-slate-400">•</span>
                      <span>{product.distance}</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          Rp {product.price.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-500">per {product.unit}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">Stok: {product.available} kg</div>
                        <div className="text-xs text-slate-500">Kualitas: {product.quality}%</div>
                      </div>
                    </div>

                    <div className="text-sm text-slate-600 mb-3">
                      <span className="font-medium">Petani:</span> {product.farmer}
                    </div>

                    <button
                      onClick={() => handleOrder(product)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Pesan Sekarang
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Tidak ada produk ditemukan</h3>
                <p className="text-slate-600">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            )}

            {/* Ad Banner - Middle */}
            <div className="my-6">
              <AdBanner placement="marketplace" size="medium" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-4">Transaksi Terbaru</h3>
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="border-b border-slate-100 pb-3 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{tx.buyer}</div>
                        <div className="text-xs text-slate-600">{tx.product}</div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        tx.status === "completed" ? "bg-green-100 text-green-700" :
                        tx.status === "shipping" ? "bg-blue-100 text-blue-700" :
                        "bg-orange-100 text-orange-700"
                      }`}>
                        {tx.status === "completed" ? "Selesai" :
                         tx.status === "shipping" ? "Dikirim" : "Proses"}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">{tx.amount}</span>
                      <span className="text-slate-400">{tx.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price History Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-4">Riwayat Harga</h3>
              <ChartWrapper>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="product" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Bar key="bar-week4" dataKey="week4" fill="#10b981" name="Minggu Ini" radius={[8, 8, 0, 0]} />
                    <Bar key="bar-week3" dataKey="week3" fill="#6ee7b7" name="Minggu Lalu" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </div>

            {/* Ad Banner - Sidebar */}
            <AdBanner placement="sidebar" size="small" />

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="font-bold mb-4">Statistik Hari Ini</h3>
              <div className="space-y-3">
                {[
                  { label: "Pesanan Baru", value: "24", icon: ShoppingCart },
                  { label: "Sedang Dikirim", value: "18", icon: Truck },
                  { label: "Nilai Transaksi", value: "Rp 45.2 Jt", icon: DollarSign },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-slate-700">{stat.label}</span>
                      </div>
                      <span className="font-bold text-green-600">{stat.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold mb-4">Konfirmasi Pesanan</h3>
            <div className="mb-4">
              <div className="flex items-start gap-4 mb-4">
                <ImageWithFallback
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-bold">{selectedProduct.name}</h4>
                  <p className="text-sm text-slate-600">{selectedProduct.farmer}</p>
                  <p className="text-lg font-bold text-green-600 mt-1">
                    Rp {selectedProduct.price.toLocaleString()}/{selectedProduct.unit}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Jumlah (kg)</label>
                  <input
                    type="number"
                    defaultValue={100}
                    min={1}
                    max={selectedProduct.available}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Alamat Pengiriman</label>
                  <textarea
                    rows={3}
                    placeholder="Masukkan alamat lengkap..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-semibold"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  alert(`Pesanan ${selectedProduct.name} berhasil dibuat!`);
                  handleCloseModal();
                }}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                Konfirmasi Pesanan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
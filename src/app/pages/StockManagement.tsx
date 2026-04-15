import { 
  Package, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck,
  Warehouse,
  BarChart3,
  Bell
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

export function StockManagement() {
  const stockData = [
    { name: "Padi", current: 8450, reorder: 5000, unit: "kg", status: "good", trend: "+12%" },
    { name: "Jagung", current: 3200, reorder: 4000, unit: "kg", status: "low", trend: "-8%" },
    { name: "Cabai", current: 1850, reorder: 1500, unit: "kg", status: "good", trend: "+15%" },
    { name: "Tomat", current: 2100, reorder: 2000, unit: "kg", status: "good", trend: "+5%" },
    { name: "Bawang", current: 950, reorder: 1200, unit: "kg", status: "critical", trend: "-22%" },
  ];

  const stockTrend = [
    { date: "1 Jun", padi: 7200, jagung: 4100, cabai: 1600, tomat: 1900 },
    { date: "8 Jun", padi: 7800, jagung: 3900, cabai: 1700, tomat: 2000 },
    { date: "15 Jun", padi: 8100, jagung: 3600, cabai: 1750, tomat: 2050 },
    { date: "22 Jun", padi: 8450, jagung: 3200, cabai: 1850, tomat: 2100 },
  ];

  const distributionStatus = [
    { name: "Dalam Gudang", value: 45, color: "#10b981" },
    { name: "Dalam Pengiriman", value: 30, color: "#3b82f6" },
    { name: "Terkirim", value: 20, color: "#8b5cf6" },
    { name: "Tertunda", value: 5, color: "#ef4444" },
  ];

  const supplyChain = [
    {
      stage: "Panen",
      location: "Lahan Blok A-C",
      status: "active",
      quantity: "2,450 kg",
      time: "2 jam lalu"
    },
    {
      stage: "Sortir & Packing",
      location: "Gudang Utama",
      status: "active",
      quantity: "2,100 kg",
      time: "1 jam lalu"
    },
    {
      stage: "Pengiriman",
      location: "Dalam Perjalanan",
      status: "in-transit",
      quantity: "1,850 kg",
      time: "30 menit lalu"
    },
    {
      stage: "Pasar Distribusi",
      location: "Pasar Induk Surabaya",
      status: "delivered",
      quantity: "1,200 kg",
      time: "Tiba pukul 14:30"
    },
  ];

  const alerts = [
    {
      type: "critical",
      title: "Stok Bawang Merah Kritis",
      message: "Stok di bawah reorder point. Segera lakukan panen atau pemesanan.",
      time: "15 menit lalu"
    },
    {
      type: "warning",
      title: "Prediksi Kelebihan Stok Padi",
      message: "Stok akan melebihi kapasitas gudang dalam 5 hari. Pertimbangkan penjualan.",
      time: "1 jam lalu"
    },
    {
      type: "info",
      title: "Permintaan Pasar Meningkat",
      message: "Harga cabai merah naik 15%. Waktu optimal untuk distribusi.",
      time: "2 jam lalu"
    },
  ];

  const marketDemand = [
    { product: "Cabai", demand: 95, price: "Rp 45.000/kg", trend: "up" },
    { product: "Tomat", demand: 78, price: "Rp 18.000/kg", trend: "stable" },
    { product: "Padi", demand: 85, price: "Rp 6.500/kg", trend: "up" },
    { product: "Jagung", demand: 62, price: "Rp 4.200/kg", trend: "down" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Manajemen Stok & Rantai Pasok</h1>
          <p className="text-slate-600">Monitoring real-time stok hasil tani dan distribusi terintegrasi</p>
        </div>

        {/* Alert Banner */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 animate-pulse" />
            <div className="flex-1">
              <div className="font-semibold mb-1">3 Notifikasi Penting</div>
              <div className="text-sm opacity-90">1 Critical, 1 Warning, 1 Info - Klik untuk lihat detail</div>
            </div>
            <button className="px-4 py-2 bg-white text-orange-700 rounded-lg font-medium hover:bg-orange-50">
              Lihat Semua
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Stock */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-green-600" />
                Stok Saat Ini
              </h3>
              <div className="space-y-4">
                {stockData.map((item, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          item.status === 'critical' ? 'bg-red-100' :
                          item.status === 'low' ? 'bg-orange-100' :
                          'bg-green-100'
                        }`}>
                          <Package className={`w-5 h-5 ${
                            item.status === 'critical' ? 'text-red-600' :
                            item.status === 'low' ? 'text-orange-600' :
                            'text-green-600'
                          }`} />
                        </div>
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-sm text-slate-600">Reorder: {item.reorder.toLocaleString()} {item.unit}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{item.current.toLocaleString()}</div>
                        <div className="text-sm text-slate-600">{item.unit}</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-2">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            item.status === 'critical' ? 'bg-red-500' :
                            item.status === 'low' ? 'bg-orange-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${Math.min((item.current / item.reorder) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className={`flex items-center gap-1 font-medium ${
                        item.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.trend.startsWith('+') ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {item.trend} dari minggu lalu
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.status === 'critical' ? 'bg-red-100 text-red-700' :
                        item.status === 'low' ? 'bg-orange-100 text-orange-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {item.status === 'critical' ? 'Kritis' :
                         item.status === 'low' ? 'Rendah' : 'Baik'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock Trend Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-semibold mb-6">Tren Stok 4 Minggu Terakhir</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stockTrend} id="stock-trend-chart">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="padi" stroke="#10b981" strokeWidth={2} name="Padi" />
                  <Line type="monotone" dataKey="jagung" stroke="#3b82f6" strokeWidth={2} name="Jagung" />
                  <Line type="monotone" dataKey="cabai" stroke="#ef4444" strokeWidth={2} name="Cabai" />
                  <Line type="monotone" dataKey="tomat" stroke="#f59e0b" strokeWidth={2} name="Tomat" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Supply Chain Tracking */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Truck className="w-6 h-6 text-blue-600" />
                Tracking Rantai Pasok Real-Time
              </h3>
              <div className="relative">
                {/* Timeline */}
                <div className="space-y-6">
                  {supplyChain.map((stage, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          stage.status === 'active' ? 'bg-green-500' :
                          stage.status === 'in-transit' ? 'bg-blue-500' :
                          'bg-purple-500'
                        }`}>
                          {stage.status === 'active' ? <CheckCircle className="w-5 h-5 text-white" /> :
                           stage.status === 'in-transit' ? <Truck className="w-5 h-5 text-white" /> :
                           <Warehouse className="w-5 h-5 text-white" />}
                        </div>
                        {index < supplyChain.length - 1 && (
                          <div className="w-0.5 h-full bg-slate-200 my-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="bg-slate-50 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="font-semibold">{stage.stage}</div>
                            <span className="text-xs text-slate-500">{stage.time}</span>
                          </div>
                          <div className="text-sm text-slate-600 mb-1">{stage.location}</div>
                          <div className="text-sm font-medium text-green-600">{stage.quantity}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Distribution Status */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold mb-6">Status Distribusi</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={distributionStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {distributionStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {distributionStatus.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Demand */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Permintaan Pasar
              </h3>
              <div className="space-y-4">
                {marketDemand.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{item.product}</span>
                        {item.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                        {item.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600" />}
                      </div>
                      <span className="text-xs text-slate-600">{item.price}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          item.demand > 80 ? 'bg-green-500' :
                          item.demand > 60 ? 'bg-blue-500' :
                          'bg-orange-500'
                        }`}
                        style={{ width: `${item.demand}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{item.demand}% demand</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-600" />
                Notifikasi & Alert
              </h3>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.type === 'critical' ? 'bg-red-50 border-red-500' :
                      alert.type === 'warning' ? 'bg-orange-50 border-orange-500' :
                      'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-1">
                      {alert.type === 'critical' ? <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" /> :
                       alert.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" /> :
                       <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />}
                      <div>
                        <div className="text-sm font-semibold">{alert.title}</div>
                        <p className="text-xs text-slate-600 mt-1">{alert.message}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-2">
                          <Clock className="w-3 h-3" />
                          {alert.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold mb-4">Aksi Cepat</h3>
              <div className="space-y-2">
                <button className="w-full bg-white hover:bg-green-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium text-left transition-all">
                  + Tambah Stok Manual
                </button>
                <button className="w-full bg-white hover:bg-blue-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium text-left transition-all">
                  📊 Export Laporan
                </button>
                <button className="w-full bg-white hover:bg-purple-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium text-left transition-all">
                  🔔 Atur Notifikasi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
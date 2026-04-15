import { useState } from "react";
import { 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Phone, 
  Mail,
  User,
  Navigation,
  Camera,
  Clipboard,
  Zap,
  Clock,
  ArrowRight,
  Star
} from "lucide-react";

export function SurveyService() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    landSize: "",
    surveyType: "basic",
    preferredDate: "",
    notes: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Mock submission
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        landSize: "",
        surveyType: "basic",
        preferredDate: "",
        notes: ""
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const surveyPackages = [
    {
      id: "basic",
      name: "Survey Dasar",
      price: "Rp 500.000",
      duration: "1 Hari",
      features: [
        "Pengukuran luas lahan dengan GPS",
        "Pemetaan batas lahan",
        "Analisis topografi dasar",
        "Dokumentasi foto udara",
        "Laporan digital PDF"
      ],
      icon: MapPin,
      color: "from-blue-600 to-cyan-600"
    },
    {
      id: "advanced",
      name: "Survey Lanjutan",
      price: "Rp 1.200.000",
      duration: "2-3 Hari",
      features: [
        "Semua fitur Survey Dasar",
        "Analisis NDVI dari citra satelit",
        "Analisis kualitas tanah (pH, NPK)",
        "Rekomendasi zonasi tanam",
        "Saran pemupukan spesifik",
        "Konsultasi gratis 30 menit"
      ],
      icon: Zap,
      color: "from-green-600 to-emerald-600",
      popular: true
    },
    {
      id: "premium",
      name: "Survey Presisi",
      price: "Rp 2.500.000",
      duration: "3-5 Hari",
      features: [
        "Semua fitur Survey Lanjutan",
        "Drone mapping resolusi tinggi",
        "Analisis kelembaban tanah multi-titik",
        "Prediksi hasil panen berbasis AI",
        "Rencana tanam 6 bulan",
        "Monitoring berkala (3 bulan)",
        "Konsultasi dedicated agronomist"
      ],
      icon: Camera,
      color: "from-orange-600 to-red-600"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Isi Formulir",
      description: "Lengkapi data lahan dan kontak Anda",
      icon: Clipboard
    },
    {
      step: 2,
      title: "Konfirmasi Tim",
      description: "Tim kami akan menghubungi dalam 24 jam",
      icon: Phone
    },
    {
      step: 3,
      title: "Kunjungan Lapangan",
      description: "Surveyor mengunjungi dan menganalisis lahan",
      icon: Navigation
    },
    {
      step: 4,
      title: "Terima Laporan",
      description: "Dapatkan laporan lengkap dan rekomendasi",
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-4">
            <Navigation className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Survey Profesional</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
            Pesan Jasa Survey Lahan
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Dapatkan data akurat tentang lahan Anda dengan teknologi GPS, drone, dan remote sensing untuk optimasi hasil panen
          </p>
        </div>

        {/* Survey Packages */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Pilih Paket Survey</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {surveyPackages.map((pkg) => {
              const Icon = pkg.icon;
              return (
                <div
                  key={pkg.id}
                  className={`bg-white rounded-2xl shadow-lg border-2 transition-all hover:shadow-xl ${
                    pkg.popular ? "border-green-500 scale-105" : "border-slate-200"
                  }`}
                >
                  {pkg.popular && (
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-2 rounded-t-xl font-semibold text-sm">
                      ⭐ Paling Populer
                    </div>
                  )}
                  <div className="p-6">
                    <div className={`inline-flex p-3 bg-gradient-to-br ${pkg.color} rounded-xl mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-green-600">{pkg.price}</span>
                      <span className="text-slate-500 text-sm">/ lahan</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
                      <Clock className="w-4 h-4" />
                      <span>Selesai dalam {pkg.duration}</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setFormData({ ...formData, surveyType: pkg.id })}
                      className={`w-full py-3 rounded-lg font-semibold transition-all ${
                        formData.surveyType === pkg.id
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {formData.surveyType === pkg.id ? "Terpilih" : "Pilih Paket"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Timeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Proses Survey</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {process.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 hidden md:block"
                         style={{ display: index === 3 ? "none" : "block" }}>
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Formulir Pemesanan Survey</h2>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Pesanan Berhasil!</h3>
                <p className="text-slate-600 mb-6">
                  Tim kami akan menghubungi Anda dalam 24 jam untuk konfirmasi jadwal survey
                </p>
                <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                  <Mail className="w-4 h-4" />
                  <span>Email konfirmasi telah dikirim</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nomor Telepon *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="08xx xxxx xxxx"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                {/* Land Info */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Alamat Lahan *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Masukkan alamat lengkap lahan pertanian"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Luas Lahan (Ha) *
                    </label>
                    <input
                      type="number"
                      name="landSize"
                      value={formData.landSize}
                      onChange={handleChange}
                      required
                      step="0.1"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Contoh: 2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Tanggal Preferensi *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Catatan Tambahan
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Informasi tambahan yang perlu kami ketahui tentang lahan Anda..."
                  />
                </div>

                {/* Summary */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <h3 className="font-semibold mb-3">Ringkasan Pemesanan</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Paket Survey:</span>
                      <span className="font-semibold">
                        {surveyPackages.find(p => p.id === formData.surveyType)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Harga:</span>
                      <span className="font-semibold text-green-600">
                        {surveyPackages.find(p => p.id === formData.surveyType)?.price}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Estimasi Waktu:</span>
                      <span className="font-semibold">
                        {surveyPackages.find(p => p.id === formData.surveyType)?.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Pesan Survey Sekarang</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-xs text-center text-slate-500">
                  * Dengan memesan, Anda menyetujui syarat dan ketentuan layanan survey TANDOOR
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Testimoni Petani</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Budi Santoso",
                location: "Malang, Jawa Timur",
                text: "Survey TANDOOR sangat membantu! Data GPS dan analisis tanah membuat saya bisa optimalkan hasil panen hingga 30%.",
                rating: 5
              },
              {
                name: "Siti Rahayu",
                location: "Bandung, Jawa Barat",
                text: "Tim profesional, laporan detail, dan harga terjangkau. Sangat merekomendasikan untuk petani modern!",
                rating: 5
              },
              {
                name: "Ahmad Hidayat",
                location: "Yogyakarta",
                text: "Drone mapping-nya keren banget! Bisa lihat seluruh lahan dari atas dan dapat rekomendasi zonasi tanam yang akurat.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-slate-500">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

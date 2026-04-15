import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Leaf, Mail, Lock, User, MapPin, ArrowRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import logoTandoor from "../../imports/tandoor.png";

type UserRole = "petani" | "koperasi" | "distributor" | "perusahaan";

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "petani" as UserRole,
    location: "",
    farmSize: ""
  });

  const roles = [
    { value: "petani", label: "Petani Individu", desc: "Kelola lahan pertanian pribadi" },
    { value: "koperasi", label: "Kelompok Tani / Koperasi", desc: "Manajemen multi-lahan bersama" },
    { value: "distributor", label: "Distributor / Offtaker", desc: "Beli hasil tani langsung dari petani" },
    { value: "perusahaan", label: "Perusahaan Pertanian", desc: "Kelola lahan pertanian perusahaan" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await register(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-3">
              <img 
                src={logoTandoor} 
                alt="TANDOOR Logo" 
                className="h-14 w-auto object-contain"
              />
            </Link>
          </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2].map((num) => (
            <div key={num} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                step >= num 
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white" 
                  : "bg-slate-200 text-slate-500"
              }`}>
                {num}
              </div>
              <span className={`text-sm ${step >= num ? "text-green-600" : "text-slate-500"}`}>
                {num === 1 ? "Pilih Peran" : "Data Diri"}
              </span>
              {num < 2 && <div className="w-12 h-0.5 bg-slate-200"></div>}
            </div>
          ))}
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-6">Pilih Peran Anda</h2>
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, role: role.value as UserRole });
                      setStep(2);
                    }}
                    className="w-full p-6 border-2 border-slate-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left group"
                  >
                    <div className="font-semibold text-lg mb-1 group-hover:text-green-700">{role.label}</div>
                    <div className="text-sm text-slate-600">{role.desc}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Data Diri</h2>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    ← Ubah Peran
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nama Anda"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Min. 8 karakter"
                      required
                      minLength={8}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Lokasi Lahan (Opsional)
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Kota/Kabupaten"
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Luas Lahan (Opsional)
                    </label>
                    <input
                      type="text"
                      value={formData.farmSize}
                      onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                      placeholder="contoh: 5 Ha"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Mendaftar...
                    </>
                  ) : (
                    <>
                      Mulai Gratis
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </form>

          {step === 2 && (
            <div className="mt-6 text-center">
              <p className="text-slate-600 text-sm">
                Sudah punya akun?{" "}
                <Link to="/login" className="text-green-600 font-semibold hover:text-green-700">
                  Masuk
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Free Features Info */}
        <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <h3 className="font-semibold text-center mb-4">✨ Yang Anda Dapatkan Gratis:</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-1">📊</div>
              <div className="font-medium">Monitoring Dasar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">📸</div>
              <div className="font-medium">2 Scan/Bulan</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🗺️</div>
              <div className="font-medium">Peta Lahan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Leaf, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import logoTandoor from "../../imports/tandoor.png";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
         <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <img 
              src={logoTandoor} 
              alt="TANDOOR Logo" 
              className="h-16 w-auto object-contain"
            />
          </Link>
        
          <h1 className="text-3xl font-bold mb-2">Selamat Datang Kembali</h1>
          <p className="text-slate-600">Masuk untuk melanjutkan ke dashboard Anda</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="petani@example.com"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-slate-600">Ingat saya</span>
              </label>
              <a href="#" className="text-green-600 hover:text-green-700">
                Lupa password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Memproses...
                </>
              ) : (
                <>
                  Masuk
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Belum punya akun?{" "}
              <Link to="/register" className="text-green-600 font-semibold hover:text-green-700">
                Daftar Gratis
              </Link>
            </p>
          </div>
        </div>

        {/* Free Trial Info */}
        <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
          <p className="text-sm text-center text-slate-700">
            🎉 Daftar sekarang dan dapatkan akses <span className="font-semibold text-green-700">GRATIS</span> ke fitur monitoring dasar!
          </p>
        </div>
      </div>
    </div>
  );
}
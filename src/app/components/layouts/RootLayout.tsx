import { Outlet, Link, useLocation } from "react-router";
import { 
  Home, 
  LayoutDashboard, 
  Leaf, 
  Map, 
  Package, 
  ShoppingCart, 
  User,
  Menu,
  X,
  Crown,
  LogOut,
  Navigation
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { WelcomeModal } from "../WelcomeModal";
import logoTandoor from "../../../imports/tandoor.png";

export function RootLayout() {
  const location = useLocation();
  const { isAuthenticated, user, isPremium, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLanding = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register";

  const navItems = [
    { path: "/", label: "Beranda", icon: Home },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/plant-health", label: "Kesehatan Tanaman", icon: Leaf },
    { path: "/farm-planning", label: "Perencanaan", icon: Map },
    { path: "/survey", label: "Jasa Survey", icon: Navigation },
    { path: "/stock-management", label: "Manajemen Stok", icon: Package },
    { path: "/marketplace", label: "Marketplace Hasil", icon: ShoppingCart },
    { path: "/supplies", label: "Toko Sarana", icon: Package },
    { path: "/profile", label: "Profil", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={logoTandoor} 
                alt="TANDOOR Logo" 
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {isAuthenticated ? (
                <>
                  {navItems.slice(1).map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    );
                  })}
                  
                  {/* User Menu */}
                  <div className="ml-4 flex items-center gap-2">
                    {isPremium ? (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-sm font-medium">
                        <Crown className="w-4 h-4" />
                        Premium
                      </div>
                    ) : (
                      <div className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm">
                        Free
                      </div>
                    )}
                    
                    <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    
                    <button
                      onClick={logout}
                      className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Logout"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Mulai Gratis
                  </Link>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 space-y-1">
              {isAuthenticated ? (
                <>
                  {navItems.slice(1).map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-center"
                  >
                    Mulai Gratis
                  </Link>
                </>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Welcome Modal - Now inside Router context */}
      <WelcomeModal />

      {/* Footer */}
      {isLanding && (
        <footer className="bg-slate-900 text-white py-12 mt-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="mb-4">
                  <img 
                    src={logoTandoor} 
                    alt="TANDOOR Logo" 
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <p className="text-slate-400 text-sm">
                  Platform pertanian modern berbasis AI dan Remote Sensing untuk masa depan pertanian Indonesia.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Fitur</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>Analisis Kesehatan Tanaman</li>
                  <li>Perencanaan Pertanian</li>
                  <li>Manajemen Stok</li>
                  <li>Marketplace</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Tentang</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>Tentang Tandoor</li>
                  <li>Tim Kami</li>
                  <li>
                    <Link to="/advertiser" className="hover:text-white transition-colors">
                      Beriklan di Tandoor
                    </Link>
                  </li>
                  <li>Kontak</li>
                  <li>FAQ</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>Kebijakan Privasi</li>
                  <li>Syarat & Ketentuan</li>
                  <li>Lisensi</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
              © 2026 Tandoor. Platform Pertanian Pintar Indonesia.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
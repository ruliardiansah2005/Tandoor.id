import { X, Check, Zap, TrendingUp, Shield } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
}

export function UpgradeModal({ isOpen, onClose, feature }: UpgradeModalProps) {
  const { upgradeToPremium } = useAuth();

  if (!isOpen) return null;

  const benefits = [
    { icon: TrendingUp, text: "Tingkatkan hasil panen hingga 45% dengan AI prediction" },
    { icon: Zap, text: "Scan kesehatan tanaman tanpa batas" },
    { icon: Shield, text: "Kurangi risiko gagal panen hingga 38%" },
    { icon: Check, text: "Akses peta NDVI dan multi-layer precision farming" },
    { icon: Check, text: "AI recommendation real-time" },
    { icon: Check, text: "Marketplace prioritas & buyer matching" },
    { icon: Check, text: "Supply chain tracking lengkap" },
    { icon: Check, text: "Insight & analytics mendalam" },
  ];

  const plans = [
    {
      name: "Bulanan",
      price: "Rp 99.000",
      period: "/bulan",
      savings: null,
      popular: false,
      target: "Petani Individu"
    },
    {
      name: "Tahunan",
      price: "Rp 950.000",
      period: "/tahun",
      savings: "Hemat Rp 238.000",
      popular: true,
      target: "Petani Individu"
    },
    {
      name: "Koperasi",
      price: "Rp 2.500.000",
      period: "/tahun",
      savings: "Untuk 10+ lahan",
      popular: false,
      target: "Kelompok Tani"
    },
    {
      name: "Enterprise",
      price: "Rp 15.000.000",
      period: "/tahun",
      savings: "Unlimited users & lahan",
      popular: false,
      target: "Perusahaan Swasta"
    }
  ];

  const handleUpgrade = (planName: string) => {
    // Simulate payment success
    setTimeout(() => {
      upgradeToPremium();
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">Upgrade ke Premium</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">
              {feature ? `Unlock ${feature}` : "Maksimalkan Potensi Pertanian Anda"}
            </h2>
            <p className="text-white/90 text-lg">
              Bergabung dengan ribuan petani modern yang telah meningkatkan produktivitas mereka
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="p-8 border-b border-slate-200">
          <h3 className="text-xl font-semibold mb-6 text-center">Yang Anda Dapatkan dengan Premium:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-slate-700">{benefit.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="p-8">
          <h3 className="text-xl font-semibold mb-6 text-center">Pilih Paket yang Sesuai:</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative border-2 rounded-xl p-6 ${
                  plan.popular
                    ? "border-green-600 shadow-lg scale-105"
                    : "border-slate-200 hover:border-green-300"
                } transition-all`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Paling Populer
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="text-xs text-slate-500 mb-2">{plan.target}</div>
                  <h4 className="text-lg font-semibold mb-2">{plan.name}</h4>
                  <div className="text-2xl font-bold text-green-600 mb-1">{plan.price}</div>
                  <div className="text-xs text-slate-600">{plan.period}</div>
                  {plan.savings && (
                    <div className="mt-2 text-xs text-green-600 font-medium">{plan.savings}</div>
                  )}
                </div>

                <button
                  onClick={() => handleUpgrade(plan.name)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all text-sm ${
                    plan.popular
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Pilih {plan.name}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 mb-4">
              💳 Pembayaran aman melalui berbagai metode: Transfer Bank, E-Wallet, Kartu Kredit
            </p>
            <p className="text-sm text-slate-500">
              ✅ Garansi 7 hari uang kembali jika tidak puas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
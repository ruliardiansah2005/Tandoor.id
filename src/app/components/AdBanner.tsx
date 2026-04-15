import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AdBannerProps {
  placement?: "dashboard" | "marketplace" | "sidebar" | "top";
  size?: "large" | "medium" | "small";
}

export function AdBanner({ placement = "dashboard", size = "large" }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Mock ad data - in production, this would come from an ad server
  const ads = {
    dashboard: {
      large: {
        id: 1,
        title: "Pupuk Organik Premium - Tingkatkan Hasil Panen 50%",
        description: "Terbukti meningkatkan produktivitas. Gratis ongkir untuk pembelian pertama!",
        image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=300&fit=crop",
        cta: "Pesan Sekarang",
        link: "/supplies",
        advertiser: "PT Pupuk Indonesia"
      }
    },
    marketplace: {
      medium: {
        id: 2,
        title: "Benih Padi Unggul Varietas Terbaru",
        description: "Tahan hama, hasil melimpah. Subsidi 30% untuk petani TANDOOR",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=250&fit=crop",
        cta: "Lihat Produk",
        link: "/supplies",
        advertiser: "Mitra Tani Sejahtera"
      }
    },
    sidebar: {
      small: {
        id: 3,
        title: "Pestisida Organik",
        description: "Ramah lingkungan & efektif",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop",
        cta: "Info Lebih",
        link: "/supplies",
        advertiser: "EcoFarm Solutions"
      }
    },
    top: {
      medium: {
        id: 4,
        title: "Alat Monitoring IoT - Pantau Lahan dari Smartphone",
        description: "Sensor kelembaban, suhu, pH tanah real-time",
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1400&h=200&fit=crop",
        cta: "Cek Harga",
        link: "/supplies",
        advertiser: "SmartFarm Tech"
      }
    }
  };

  const ad = ads[placement]?.[size] || ads.dashboard.large;

  if (!isVisible) return null;

  const handleClick = () => {
    // Track ad click analytics here
    console.log(`Ad clicked: ${ad.id} - ${ad.title}`);
  };

  const handleClose = () => {
    setIsVisible(false);
    // Track ad dismissal
    console.log(`Ad dismissed: ${ad.id}`);
  };

  // Size variants
  const sizeClasses = {
    large: "h-32 md:h-40",
    medium: "h-24 md:h-32",
    small: "h-20 md:h-24"
  };

  const containerClasses = {
    large: "rounded-xl",
    medium: "rounded-lg",
    small: "rounded-lg"
  };

  return (
    <div className={`relative bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 ${containerClasses[size]} overflow-hidden group hover:shadow-lg transition-all`}>
      {/* Sponsored Badge */}
      <div className="absolute top-2 left-2 z-10">
        <span className="px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded">
          Sponsored
        </span>
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all opacity-0 group-hover:opacity-100"
        aria-label="Close ad"
      >
        <X className="w-4 h-4 text-slate-700" />
      </button>

      {/* Ad Content */}
      <a
        href={ad.link}
        onClick={handleClick}
        className="flex h-full items-center gap-4 p-4 no-underline"
      >
        {/* Ad Image */}
        {size !== "small" && (
          <div className={`flex-shrink-0 ${size === "large" ? "w-48 md:w-64" : "w-32 md:w-48"} ${sizeClasses[size]} bg-slate-200 rounded-lg overflow-hidden`}>
            <ImageWithFallback
              src={ad.image}
              alt={ad.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Ad Text */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-slate-800 mb-1 ${size === "large" ? "text-lg md:text-xl" : size === "medium" ? "text-base md:text-lg" : "text-sm"} line-clamp-2`}>
            {ad.title}
          </h3>
          {size !== "small" && (
            <p className={`text-slate-600 mb-2 ${size === "large" ? "text-sm md:text-base" : "text-xs md:text-sm"} line-clamp-2`}>
              {ad.description}
            </p>
          )}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">
              {ad.cta}
              <ExternalLink className="w-4 h-4" />
            </span>
            {size === "large" && (
              <span className="text-xs text-slate-500">
                oleh {ad.advertiser}
              </span>
            )}
          </div>
        </div>
      </a>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-orange-500/5 pointer-events-none"></div>
    </div>
  );
}

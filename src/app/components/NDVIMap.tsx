import { useEffect, useRef, useState } from "react";
import { MapPin, Layers, Navigation } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface NDVIMapProps {
  farmLocation?: { lat: number; lng: number };
  showNDVI?: boolean;
}

export function NDVIMap({ farmLocation = { lat: -7.2575, lng: 112.7521 }, showNDVI = true }: NDVIMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [layerType, setLayerType] = useState<"satellite" | "ndvi" | "soil">("satellite");

  useEffect(() => {
    // Get user's current GPS location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("GPS error:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([farmLocation.lat, farmLocation.lng], 15);
    mapInstanceRef.current = map;

    // Add base layer (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);

    // Add farm marker
    const farmMarker = L.marker([farmLocation.lat, farmLocation.lng], {
      icon: L.divIcon({
        className: "custom-marker",
        html: `<div style="background: #16a34a; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
      })
    }).addTo(map);

    farmMarker.bindPopup("<b>Lahan Anda</b><br>Area pertanian utama");

    // Mock NDVI overlay (semi-transparent colored rectangles representing vegetation health)
    if (showNDVI) {
      // Green areas - healthy vegetation (NDVI > 0.6)
      L.rectangle(
        [[farmLocation.lat - 0.002, farmLocation.lng - 0.003], [farmLocation.lat + 0.001, farmLocation.lng]],
        { color: "#16a34a", fillColor: "#22c55e", fillOpacity: 0.5, weight: 1 }
      ).addTo(map).bindPopup("NDVI: 0.75 - Sangat Sehat");

      // Yellow areas - moderate vegetation (NDVI 0.3-0.6)
      L.rectangle(
        [[farmLocation.lat + 0.001, farmLocation.lng - 0.003], [farmLocation.lat + 0.003, farmLocation.lng]],
        { color: "#f59e0b", fillColor: "#fbbf24", fillOpacity: 0.5, weight: 1 }
      ).addTo(map).bindPopup("NDVI: 0.45 - Sedang");

      // Orange areas - stressed vegetation (NDVI < 0.3)
      L.rectangle(
        [[farmLocation.lat - 0.002, farmLocation.lng], [farmLocation.lat + 0.001, farmLocation.lng + 0.003]],
        { color: "#f97316", fillColor: "#fb923c", fillOpacity: 0.5, weight: 1 }
      ).addTo(map).bindPopup("NDVI: 0.25 - Perlu Perhatian");
    }

    // Add current location marker if available
    if (currentLocation) {
      L.marker([currentLocation.lat, currentLocation.lng], {
        icon: L.divIcon({
          className: "pulse-marker",
          html: `<div style="background: #3b82f6; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(59,130,246,0.5);"></div>`,
          iconSize: [15, 15],
          iconAnchor: [7.5, 7.5]
        })
      }).addTo(map).bindPopup("Lokasi Anda Sekarang");
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [farmLocation, showNDVI, currentLocation]);

  const centerToCurrentLocation = () => {
    if (currentLocation && mapInstanceRef.current) {
      mapInstanceRef.current.setView([currentLocation.lat, currentLocation.lng], 16);
    }
  };

  return (
    <div className="relative">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-[1000] space-y-2">
        <div className="bg-white rounded-lg shadow-lg p-2 space-y-1">
          <button
            onClick={() => setLayerType("satellite")}
            className={`w-full px-3 py-2 text-sm rounded ${
              layerType === "satellite" ? "bg-green-600 text-white" : "hover:bg-slate-100"
            }`}
          >
            <Layers className="w-4 h-4 inline mr-2" />
            Satelit
          </button>
          <button
            onClick={() => setLayerType("ndvi")}
            className={`w-full px-3 py-2 text-sm rounded ${
              layerType === "ndvi" ? "bg-green-600 text-white" : "hover:bg-slate-100"
            }`}
          >
            <Layers className="w-4 h-4 inline mr-2" />
            NDVI
          </button>
          <button
            onClick={() => setLayerType("soil")}
            className={`w-full px-3 py-2 text-sm rounded ${
              layerType === "soil" ? "bg-green-600 text-white" : "hover:bg-slate-100"
            }`}
          >
            <Layers className="w-4 h-4 inline mr-2" />
            Kelembaban
          </button>
        </div>

        {currentLocation && (
          <button
            onClick={centerToCurrentLocation}
            className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
          >
            <Navigation className="w-4 h-4 inline mr-2" />
            Lokasi Saya
          </button>
        )}
      </div>

      {/* Legend */}
      {showNDVI && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-3">
          <div className="text-sm font-semibold mb-2">NDVI Legend</div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>&gt; 0.6 Sangat Sehat</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded"></div>
              <span>0.3-0.6 Sedang</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span>&lt; 0.3 Perlu Perhatian</span>
            </div>
          </div>
        </div>
      )}

      {/* GPS Coordinates Display */}
      {currentLocation && (
        <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg px-3 py-2 text-xs">
          <MapPin className="w-3 h-3 inline mr-1 text-blue-600" />
          <span className="font-mono">
            {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
          </span>
        </div>
      )}

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-[500px] rounded-xl overflow-hidden shadow-sm"></div>
    </div>
  );
}

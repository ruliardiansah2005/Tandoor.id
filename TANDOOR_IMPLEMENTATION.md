# 🌾 TANDOOR Platform - Implementation Guide

## Platform Overview
**TANDOOR** adalah platform pertanian presisi berbasis AI, Remote Sensing, dan GPS yang menghubungkan petani dengan distributor, supplier, dan investor.

### Color Palette
- **Primary (Hijau)**: `#16a34a` - Pertanian, growth, kesehatan
- **Secondary (Orange)**: `#f97316` - Energi, action, warning

---

## 🎯 Core Features

### 1. **Advertising System**
- ✅ Dashboard Ads (Large Banner)
- ✅ Sidebar Small Ads
- **Location**: Dashboard, Marketplace
- **Component**: `AdBanner.tsx`

### 2. **Enhanced Monitoring Workflow**
```
Data Sensor → AI Analysis → Dampak/Rekomendasi → Action → WhatsApp Notification
```

**Example Flow**:
1. Sistem deteksi kelembaban tanah 45% (rendah)
2. AI analisa: "Tanaman stress air, perlu irigasi +20%"
3. Dampak: "Risiko penurunan hasil 15% jika tidak diatasi dalam 24 jam"
4. Action Button: "Siram Sekarang"
5. Notifikasi WhatsApp otomatis ke petani

**Components**:
- ✅ `WhatsAppNotifier.tsx`
- Monitoring Dashboard dengan actionable insights
- Integration ke WhatsApp Business API

### 3. **Jasa Survey Pemetaan**
- GPS tracking real-time
- Drone survey integration
- Professional mapping service marketplace
- **Status**: To be implemented
- **Route**: `/survey-mapping`

### 4. **Dual Marketplace**

#### A. Marketplace Distribusi (Petani → Distributor)
- Petani jual hasil panen
- Distributor cari pasokan
- Price matching & negotiation
- Quality verification
- **Route**: `/marketplace/distribution`

#### B. Marketplace Supplies (Petani → Supplier)
- Petani beli pupuk, benih, pestisida
- Supplier listing products
- Bulk discount & delivery
- **Route**: `/marketplace/supplies`

### 5. **Crowdfunding Platform**
**Fitur Utama**:
- Petani create campaign dengan data historis
- Investor lihat performance metrics
- Analytics periode sebelumnya:
  - Hasil panen 6 bulan terakhir
  - Efisiensi penggunaan sumber daya
  - ROI historis
  - Skor kesehatan lahan (NDVI trends)
- Milestone-based fund release
- **Route**: `/crowdfunding`

### 6. **Maps & GIS Integration**
- ✅ Leaflet.js untuk mapping
- ✅ NDVI layer overlay
- ✅ GPS location tracking
- ✅ Real-time coordinates display
- Multi-layer support (satelit, NDVI, kelembaban tanah)
- **Component**: `NDVIMap.tsx`

### 7. **BMKG API Integration**
**Features**:
- Real-time weather data
- 7-day forecast
- Rain prediction
- Wind & humidity monitoring
- Weather-based recommendations
- **Status**: To be implemented
- **Mock endpoint**: Will use real BMKG API when available

---

## 📱 WhatsApp Integration

### Notification Types
1. **Critical Alerts**: Hama, penyakit, cuaca ekstrem
2. **Action Required**: Irigasi, pemupukan, harvest time
3. **Updates**: Progress monitoring, growth stage changes
4. **Reports**: Weekly summary, financial reports

### Implementation
```typescript
// Mock function - will integrate with WhatsApp Business API
function sendWhatsAppNotification(phoneNumber: string, message: string) {
  const formattedMessage = `🌾 TANDOOR Alert\n\n${message}`;
  // Real implementation akan use WhatsApp Business Cloud API
  // https://developers.facebook.com/docs/whatsapp/cloud-api
}
```

---

## 🗺️ GPS & Location Features

### Features Implemented
1. **Real-time GPS Tracking**
   - Navigator.geolocation API
   - Continuous location updates
   - Accuracy radius display

2. **Farm Boundary Mapping**
   - Draw polygon tool
   - Area calculation
   - Coordinate export (GeoJSON)

3. **Navigation to Farm**
   - Directions from current location
   - Distance & ETA calculation

---

## 📊 Data Sources

### Satellite Imagery
- **NDVI Data**: Vegetation health index
- **Update Frequency**: Weekly (Sentinel-2)
- **Resolution**: 10m per pixel

### Weather Data (BMKG)
- **API**: https://data.bmkg.go.id/
- **Data Points**: Temperature, humidity, rainfall, wind
- **Forecast**: Up to 7 days

### GPS
- **Source**: Browser Geolocation API + Device GPS
- **Accuracy**: ±10m (depends on device)

---

## 🎨 UI/UX Guidelines

### Branding
- **Logo**: TANDOOR with leaf icon
- **Tagline**: "Pertanian Presisi untuk Indonesia Modern"
- **Typography**: Clean, readable, mobile-friendly

### Color Usage
- **Green**: Primary actions, success states, health indicators
- **Orange**: Warnings, CTAs, secondary actions
- **Blue**: Information, water-related data
- **Red**: Critical alerts, destructive actions

### Components
- Rounded corners (12px default)
- Gradient buttons for CTAs
- Card-based layout
- Mobile-first responsive design

---

## 🚀 Next Steps

### Phase 1: Core Infrastructure ✅
- [x] Rebrand to TANDOOR
- [x] Update color scheme
- [x] AdBanner component
- [x] WhatsApp notifier
- [x] NDVI Map with GPS

### Phase 2: Marketplaces (In Progress)
- [ ] Distribution marketplace
- [ ] Supplies marketplace
- [ ] Listing & search functionality
- [ ] Order management

### Phase 3: Crowdfunding
- [ ] Campaign creation
- [ ] Investor dashboard
- [ ] Performance analytics
- [ ] Fund management

### Phase 4: Advanced Features
- [ ] BMKG API integration
- [ ] Survey mapping service
- [ ] Drone integration
- [ ] Real WhatsApp Business API

---

## 📝 Technical Notes

### Dependencies Added
- `leaflet`: ^1.9.4 for mapping

### Browser Requirements
- GPS support (HTTPS required)
- Modern browser with Geolocation API
- WebGL for advanced map rendering

### API Endpoints (Future)
```
/api/bmkg/weather/:location
/api/satellite/ndvi/:coordinates
/api/whatsapp/send
/api/marketplace/listings
/api/crowdfunding/campaigns
```

---

## 🔐 Security & Privacy

- GPS data stored locally
- User location permissions required
- HTTPS for all API calls
- WhatsApp E2E encryption
- PII data protection compliant

---

**Last Updated**: April 15, 2026
**Version**: 2.0.0 (TANDOOR Rebrand)

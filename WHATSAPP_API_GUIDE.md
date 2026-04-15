# 📱 Panduan WhatsApp Business API Integration - TANDOOR

## 📋 Daftar Isi
1. [Penjelasan Cara Kerja](#penjelasan-cara-kerja)
2. [Mode Development vs Production](#mode-development-vs-production)
3. [Setup Production](#setup-production)
4. [Contoh Implementasi](#contoh-implementasi)
5. [Best Practices](#best-practices)

---

## 🔍 Penjelasan Cara Kerja

### Current Implementation (Development Mode)

**File yang terlibat:**
- `/src/app/services/whatsappService.ts` - Service layer untuk WhatsApp API
- `/src/app/components/WhatsAppNotifier.tsx` - UI component untuk notifications

**Flow saat ini (Mode Demo):**

```
User Click "Kirim ke WhatsApp"
    ↓
handleSendWhatsApp() dipanggil
    ↓
sendWhatsAppNotification() dari whatsappService
    ↓
Cek: WHATSAPP_CONFIG.isDevelopment === true
    ↓
YES → Buka WhatsApp Web dengan pre-filled message
    ↓
User harus klik "Send" secara manual di WhatsApp Web
```

**Kode saat ini:**
```typescript
// Development mode
if (WHATSAPP_CONFIG.isDevelopment) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
  return { success: true };
}
```

**Keterbatasan:**
- ❌ Tidak otomatis terkirim (user harus klik send manual)
- ❌ Tidak bisa untuk notifikasi otomatis real-time
- ❌ Hanya untuk testing/demo purposes
- ✅ Tidak perlu setup API (cocok untuk development)

---

## 🏗️ Mode Development vs Production

### Development Mode (Saat Ini)

**Karakteristik:**
- Menggunakan WhatsApp Web URL Scheme
- Membuka browser tab baru
- User harus approve manual
- Tidak perlu API keys
- Cocok untuk prototype & demo

**Kode:**
```typescript
// isDevelopment: true di whatsappService.ts
window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
```

---

### Production Mode (Real WhatsApp API)

**Karakteristik:**
- Menggunakan WhatsApp Business Cloud API
- Kirim otomatis tanpa user interaction
- Support template messages
- Perlu verifikasi Business Account
- Butuh API credentials

**Kode:**
```typescript
// Production implementation
const response = await fetch(
  `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: phoneNumber,
      type: 'text',
      text: { body: message }
    })
  }
);
```

**⚠️ PENTING:** Production API calls harus dari **BACKEND**, bukan client-side!

---

## 🚀 Setup Production

### Option 1: WhatsApp Business Cloud API (Meta - Recommended)

**Step-by-Step:**

#### 1. Buat Meta Business Account
- Kunjungi: https://business.facebook.com
- Klik "Create Account"
- Lengkapi informasi bisnis Anda

#### 2. Setup WhatsApp Business App
- Buka: https://developers.facebook.com
- Klik "My Apps" → "Create App"
- Pilih "Business" type
- Tambahkan WhatsApp product

#### 3. Dapatkan Credentials
```
Phone Number ID: 123456789012345
Access Token: EAAxxxxxxxxxxxxxxxxxxxxxxx
Verify Token: your_custom_verify_token (untuk webhook)
```

#### 4. Setup Environment Variables

**Frontend (.env):**
```bash
# Untuk development testing saja (jangan di production!)
VITE_WHATSAPP_PHONE_NUMBER_ID=123456789012345
VITE_WHATSAPP_ACCESS_TOKEN=your_temp_test_token
```

**Backend (production - Node.js/Express):**
```bash
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_ACCESS_TOKEN=your_production_token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_verify_token
```

#### 5. Backend Implementation

**File: `backend/services/whatsapp.js`**
```javascript
const axios = require('axios');

async function sendWhatsAppMessage(phoneNumber, message) {
  const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
  
  try {
    const response = await axios.post(
      url,
      {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: { body: message }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return { success: true, messageId: response.data.messages[0].id };
  } catch (error) {
    console.error('WhatsApp API error:', error.response?.data);
    return { success: false, error: error.message };
  }
}

module.exports = { sendWhatsAppMessage };
```

**File: `backend/routes/notifications.js`**
```javascript
const express = require('express');
const router = express.Router();
const { sendWhatsAppMessage } = require('../services/whatsapp');

router.post('/send-whatsapp', async (req, res) => {
  const { phoneNumber, message } = req.body;
  
  // Validate request
  if (!phoneNumber || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Send WhatsApp message
  const result = await sendWhatsAppMessage(phoneNumber, message);
  
  if (result.success) {
    res.json({ success: true, messageId: result.messageId });
  } else {
    res.status(500).json({ success: false, error: result.error });
  }
});

module.exports = router;
```

#### 6. Update Frontend Service

**File: `/src/app/services/whatsappService.ts`**
```typescript
// Update konfigurasi
const WHATSAPP_CONFIG = {
  isDevelopment: false, // ← Set ke false untuk production
  backendUrl: 'https://your-backend-api.com', // Backend URL
};

export async function sendWhatsAppNotification(
  notification: WhatsAppNotification
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  
  // Production: Call backend API
  try {
    const response = await fetch(`${WHATSAPP_CONFIG.backendUrl}/api/notifications/send-whatsapp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phoneNumber: notification.phoneNumber,
        message: notification.message
      })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to send WhatsApp:', error);
    return { success: false, error: error.message };
  }
}
```

---

### Option 2: Third-Party Services (Lebih Mudah)

#### Twilio WhatsApp API

**Setup:**
1. Buat account di https://www.twilio.com
2. Setup WhatsApp Sandbox atau production
3. Dapatkan Account SID & Auth Token

**Backend Code:**
```javascript
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendWhatsAppViaTwilio(phoneNumber, message) {
  try {
    const msg = await client.messages.create({
      from: 'whatsapp:+14155238886', // Twilio WhatsApp number
      to: `whatsapp:${phoneNumber}`,
      body: message
    });
    
    return { success: true, messageId: msg.sid };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

**Pricing:** 
- Sandbox: Free (limited)
- Production: ~$0.005 per message

---

## 💡 Contoh Implementasi

### 1. Automatic NDVI Alert

**Scenario:** Sistem deteksi NDVI rendah secara otomatis kirim notifikasi

**File: `/src/app/pages/FarmPlanning.tsx`**
```typescript
import { sendWhatsAppNotification, NOTIFICATION_TEMPLATES } from '../services/whatsappService';

// Di dalam component
useEffect(() => {
  // Check NDVI values
  const poorZones = ndviData.filter(z => z.ndvi < 0.6);
  
  if (poorZones.length > 0) {
    poorZones.forEach(zone => {
      const notification = NOTIFICATION_TEMPLATES.lowNDVI(zone.zone, zone.ndvi);
      
      // Send WhatsApp notification
      sendWhatsAppNotification({
        phoneNumber: '6281234567890', // User's phone
        message: formatTandoorNotification(
          notification.title,
          notification.message,
          notification.actionRequired
        ),
        type: 'text'
      });
    });
  }
}, [ndviData]);
```

### 2. Scheduled Weather Alerts

**File: `backend/cron/weatherAlerts.js`**
```javascript
const cron = require('node-cron');
const { sendWhatsAppMessage } = require('../services/whatsapp');

// Run every day at 6 AM
cron.schedule('0 6 * * *', async () => {
  const weatherData = await fetchBMKGWeather();
  
  if (weatherData.isHeavyRain) {
    const users = await getAllFarmers();
    
    users.forEach(user => {
      sendWhatsAppMessage(
        user.phoneNumber,
        `🌾 TANDOOR Alert\n\n*Peringatan Cuaca*\nHujan lebat diprediksi hari ini. Tunda pemupukan.`
      );
    });
  }
});
```

### 3. Template Messages (Faster & Cheaper)

**Setup Template di Meta:**
```
Template Name: tandoor_irrigation_alert
Category: UTILITY
Language: Indonesian (id)

Body:
🌾 *TANDOOR Alert*

Halo {{1}},

Zona {{2}} memerlukan irigasi segera.
Kelembaban tanah: {{3}}%

⚡ Tindakan: Lakukan penyiraman dalam 24 jam

_Dikirim oleh TANDOOR - Platform Pertanian Cerdas_
```

**Send Template:**
```typescript
sendWhatsAppNotification({
  phoneNumber: '6281234567890',
  type: 'template',
  templateName: 'tandoor_irrigation_alert',
  templateParams: ['Pak Budi', 'C2', '45']
});
```

---

## ✅ Best Practices

### 1. **Security**
- ❌ NEVER expose Access Token di frontend
- ✅ ALWAYS call WhatsApp API from backend
- ✅ Use environment variables for credentials
- ✅ Implement rate limiting

### 2. **User Opt-in**
- ✅ Get user consent before sending notifications
- ✅ Provide opt-out mechanism
- ✅ Store user preferences in database

**Database Schema:**
```sql
CREATE TABLE user_notification_preferences (
  user_id INT PRIMARY KEY,
  phone_number VARCHAR(20),
  whatsapp_enabled BOOLEAN DEFAULT false,
  ndvi_alerts BOOLEAN DEFAULT true,
  weather_alerts BOOLEAN DEFAULT true,
  harvest_alerts BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. **Message Templates**
- ✅ Use pre-approved templates for marketing
- ✅ Keep messages concise and actionable
- ✅ Include opt-out instructions

### 4. **Error Handling**
```typescript
try {
  const result = await sendWhatsAppNotification(notification);
  
  if (!result.success) {
    // Log to monitoring system (Sentry, etc.)
    console.error('WhatsApp failed:', result.error);
    
    // Fallback to SMS or email
    await sendSMSNotification(notification);
  }
} catch (error) {
  // Handle network errors
  await queueForRetry(notification);
}
```

### 5. **Rate Limiting**
```typescript
// Limit: 80 messages per second per phone number
const rateLimiter = new RateLimiter({
  tokensPerInterval: 80,
  interval: 'second'
});

await rateLimiter.removeTokens(1);
await sendWhatsAppNotification(notification);
```

---

## 📊 Cost Estimation

### WhatsApp Business Cloud API (Meta)

**Pricing tiers (Indonesia):**
- First 1,000 conversations/month: **FREE**
- Service conversations: **Rp 1,200 per conversation**
- Marketing conversations: **Rp 1,800 per conversation**

**Conversation:** Message window 24 jam dengan user

**Example untuk TANDOOR:**
- 100 farmers
- 5 notifications per farmer per month
- = 500 conversations
- **Cost: FREE** (under 1,000 limit)

### Twilio
- ~$0.005 per message = **Rp 75 per message**
- 500 messages/month = **Rp 37,500/month**

---

## 🔗 Resources

- **Meta WhatsApp Cloud API:** https://developers.facebook.com/docs/whatsapp/cloud-api
- **Twilio WhatsApp API:** https://www.twilio.com/docs/whatsapp
- **MessageBird:** https://developers.messagebird.com/api/whatsapp/
- **WhatsApp Business API Pricing:** https://developers.facebook.com/docs/whatsapp/pricing

---

## 🎯 Next Steps untuk TANDOOR

1. **Phase 1 - Development (Saat Ini)** ✅
   - WhatsApp Web integration (demo mode)
   - UI components ready
   - Service layer implemented

2. **Phase 2 - Backend Setup**
   - Setup Node.js/Express backend
   - Implement `/api/notifications/send-whatsapp` endpoint
   - Setup Meta Business Account

3. **Phase 3 - Production**
   - Get WhatsApp Business API approved
   - Setup webhook for two-way communication
   - Implement user opt-in flow
   - Add notification preferences in user profile

4. **Phase 4 - Advanced Features**
   - Automatic alerts based on NDVI thresholds
   - Scheduled weather alerts from BMKG
   - Interactive buttons in messages
   - Chatbot for quick queries

---

**🌾 Dibuat untuk TANDOOR - Platform Pertanian Cerdas Indonesia**

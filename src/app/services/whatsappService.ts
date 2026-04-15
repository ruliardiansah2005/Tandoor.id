/**
 * WhatsApp Business API Integration Service
 * 
 * PRODUCTION SETUP GUIDE:
 * =======================
 * 
 * Option 1: WhatsApp Business Cloud API (Recommended - Official by Meta)
 * -----------------------------------------------------------------------
 * 1. Create a Meta Business Account at https://business.facebook.com
 * 2. Add WhatsApp to your app at https://developers.facebook.com
 * 3. Get your Phone Number ID and Access Token
 * 4. Set environment variables:
 *    - WHATSAPP_PHONE_NUMBER_ID
 *    - WHATSAPP_ACCESS_TOKEN
 * 
 * Documentation: https://developers.facebook.com/docs/whatsapp/cloud-api
 * 
 * Option 2: Third-party Services (Easier Setup)
 * ----------------------------------------------
 * - Twilio WhatsApp API: https://www.twilio.com/whatsapp
 * - MessageBird: https://messagebird.com/whatsapp
 * - Vonage: https://www.vonage.com/communications-apis/messages/
 * 
 * IMPORTANT NOTES:
 * ================
 * - WhatsApp requires pre-approved message templates for marketing/notifications
 * - You can only send messages to users who have opted in
 * - Rate limits apply (varies by tier)
 * - Figma Make is NOT meant for collecting PII or securing sensitive data
 * - For production, implement this on your backend server, not client-side
 */

// WhatsApp Message Types
export type WhatsAppMessageType = 'template' | 'text';

export interface WhatsAppNotification {
  phoneNumber: string;
  message: string;
  type?: WhatsAppMessageType;
  templateName?: string;
  templateParams?: string[];
}

// Configuration (should be in environment variables in production)
const WHATSAPP_CONFIG = {
  // Meta WhatsApp Business Cloud API
  phoneNumberId: import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID || 'YOUR_PHONE_NUMBER_ID_HERE',
  accessToken: import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN || 'YOUR_ACCESS_TOKEN_HERE',
  apiVersion: 'v18.0',
  
  // For development/demo
  isDevelopment: true, // Set to false in production
};

/**
 * Send WhatsApp notification using WhatsApp Business Cloud API
 * 
 * PRODUCTION IMPLEMENTATION:
 * This should be called from your backend server, not client-side!
 * Never expose API keys in frontend code.
 */
export async function sendWhatsAppNotification(
  notification: WhatsAppNotification
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  
  // Development mode: Just log and open WhatsApp Web
  if (WHATSAPP_CONFIG.isDevelopment) {
    console.log('📱 [DEV MODE] WhatsApp notification:', notification);
    
    // Open WhatsApp Web with pre-filled message
    const formattedMessage = encodeURIComponent(notification.message);
    const whatsappUrl = `https://wa.me/${notification.phoneNumber}?text=${formattedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    return { 
      success: true, 
      messageId: `dev_${Date.now()}`,
      error: undefined 
    };
  }

  // PRODUCTION IMPLEMENTATION (Backend only!)
  try {
    const url = `https://graph.facebook.com/${WHATSAPP_CONFIG.apiVersion}/${WHATSAPP_CONFIG.phoneNumberId}/messages`;
    
    const payload = {
      messaging_product: 'whatsapp',
      to: notification.phoneNumber,
      type: notification.type || 'text',
      ...(notification.type === 'template' && notification.templateName
        ? {
            template: {
              name: notification.templateName,
              language: { code: 'id' }, // Indonesian
              components: notification.templateParams
                ? [
                    {
                      type: 'body',
                      parameters: notification.templateParams.map((param) => ({
                        type: 'text',
                        text: param,
                      })),
                    },
                  ]
                : [],
            },
          }
        : {
            text: {
              body: notification.message,
            },
          }),
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_CONFIG.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        messageId: data.messages?.[0]?.id,
      };
    } else {
      console.error('WhatsApp API error:', data);
      return {
        success: false,
        error: data.error?.message || 'Failed to send WhatsApp message',
      };
    }
  } catch (error) {
    console.error('WhatsApp service error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Format TANDOOR notification message
 */
export function formatTandoorNotification(
  title: string,
  message: string,
  actionRequired?: string
): string {
  let formattedMessage = `🌾 *TANDOOR Alert*\n\n`;
  formattedMessage += `*${title}*\n`;
  formattedMessage += `${message}\n`;
  
  if (actionRequired) {
    formattedMessage += `\n⚡ *Tindakan:* ${actionRequired}\n`;
  }
  
  formattedMessage += `\n_Dikirim oleh TANDOOR - Platform Pertanian Cerdas_`;
  
  return formattedMessage;
}

/**
 * Pre-defined notification templates for common scenarios
 */
export const NOTIFICATION_TEMPLATES = {
  // NDVI alerts
  lowNDVI: (zone: string, ndviValue: number) => ({
    title: 'Peringatan NDVI Rendah',
    message: `Zona ${zone} menunjukkan nilai NDVI rendah (${ndviValue}). Tanaman mungkin mengalami stress.`,
    actionRequired: 'Periksa irigasi dan nutrisi tanaman',
  }),
  
  // Irrigation alerts
  irrigationNeeded: (zone: string, moistureLevel: number) => ({
    title: 'Irigasi Diperlukan',
    message: `Zona ${zone} memerlukan penyiraman. Kelembaban tanah: ${moistureLevel}%`,
    actionRequired: 'Lakukan irigasi segera',
  }),
  
  // Weather alerts
  heavyRain: (date: string) => ({
    title: 'Peringatan Cuaca',
    message: `BMKG memprediksi hujan lebat pada ${date}. Tunda aktivitas pemupukan.`,
    actionRequired: 'Periksa sistem drainase',
  }),
  
  // Harvest alerts
  harvestReady: (zone: string, estimatedYield: number) => ({
    title: 'Waktu Panen Optimal',
    message: `Zona ${zone} siap dipanen. Estimasi hasil: ${estimatedYield} kg/ha`,
    actionRequired: 'Jadwalkan tim panen',
  }),
  
  // Pest/disease alerts
  pestAlert: (zone: string, pestType: string) => ({
    title: 'Deteksi Hama/Penyakit',
    message: `Terdeteksi ${pestType} di Zona ${zone}. Segera lakukan tindakan pencegahan.`,
    actionRequired: 'Aplikasikan pestisida yang sesuai',
  }),
};

/**
 * Send bulk notifications to multiple users
 * Note: Implement rate limiting in production!
 */
export async function sendBulkNotifications(
  notifications: WhatsAppNotification[]
): Promise<{ success: number; failed: number; results: any[] }> {
  const results = await Promise.allSettled(
    notifications.map((notif) => sendWhatsAppNotification(notif))
  );

  const success = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected').length;

  return { success, failed, results };
}

/**
 * Verify webhook signature (for receiving WhatsApp messages)
 * This should be implemented on your backend
 */
export function verifyWhatsAppWebhook(
  signature: string,
  payload: string,
  secret: string
): boolean {
  // Implementation would use crypto to verify HMAC signature
  // This is just a placeholder
  console.log('Webhook verification:', { signature, payload, secret });
  return true;
}

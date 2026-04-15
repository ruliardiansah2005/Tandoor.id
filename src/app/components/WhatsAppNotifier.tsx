import { MessageCircle, Check, Info, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { 
  sendWhatsAppNotification, 
  formatTandoorNotification,
  NOTIFICATION_TEMPLATES 
} from "../services/whatsappService";

interface Notification {
  id: string;
  type: "info" | "warning" | "action";
  title: string;
  message: string;
  actionRequired?: string;
  timestamp: Date;
  phoneNumber?: string;
}

export function WhatsAppNotifier() {
  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      type: "action",
      title: "Irigasi Diperlukan",
      message: "Area Blok C memerlukan penyiraman tambahan 20%. Kelembaban tanah: 45%",
      actionRequired: "Siram sekarang",
      timestamp: new Date(),
      phoneNumber: "6281234567890"
    },
    {
      id: "2",
      type: "warning",
      title: "Prediksi Hujan",
      message: "BMKG memprediksi hujan lebat besok. Tunda pemupukan NPK.",
      timestamp: new Date(Date.now() - 3600000),
      phoneNumber: "6281234567890"
    },
    {
      id: "3",
      type: "info",
      title: "NDVI Update",
      message: "Zona A1 menunjukkan peningkatan NDVI dari 0.75 menjadi 0.82. Tindakan pemupukan berhasil!",
      timestamp: new Date(Date.now() - 7200000),
      phoneNumber: "6281234567890"
    }
  ]);

  const [sendingStatus, setSendingStatus] = useState<{ [key: string]: 'idle' | 'sending' | 'sent' | 'error' }>({});

  const handleSendWhatsApp = async (notification: Notification) => {
    if (!notification.phoneNumber) {
      console.error('No phone number provided');
      return;
    }

    setSendingStatus(prev => ({ ...prev, [notification.id]: 'sending' }));

    const formattedMessage = formatTandoorNotification(
      notification.title,
      notification.message,
      notification.actionRequired
    );

    const result = await sendWhatsAppNotification({
      phoneNumber: notification.phoneNumber,
      message: formattedMessage,
      type: 'text'
    });

    if (result.success) {
      setSendingStatus(prev => ({ ...prev, [notification.id]: 'sent' }));
      console.log('✅ WhatsApp notification sent successfully:', result.messageId);
    } else {
      setSendingStatus(prev => ({ ...prev, [notification.id]: 'error' }));
      console.error('❌ Failed to send WhatsApp notification:', result.error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Development Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-blue-900 mb-1">Mode Development</h4>
            <p className="text-xs text-blue-800">
              WhatsApp notifications saat ini berjalan dalam mode demo. Tombol "Kirim ke WhatsApp" akan membuka WhatsApp Web. 
              Untuk production, koneksi ke WhatsApp Business API diperlukan.
            </p>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 rounded-lg border-l-4 ${
              notif.type === "action"
                ? "bg-orange-50 border-orange-500"
                : notif.type === "warning"
                ? "bg-yellow-50 border-yellow-500"
                : "bg-blue-50 border-blue-500"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">{notif.title}</h4>
                  <span className="text-xs text-slate-500">
                    {Math.floor((Date.now() - notif.timestamp.getTime()) / 60000)}m yang lalu
                  </span>
                </div>
                <p className="text-sm text-slate-700 mb-2">{notif.message}</p>
                
                {notif.actionRequired && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSendWhatsApp(notif)}
                      disabled={sendingStatus[notif.id] === 'sending'}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-all ${
                        sendingStatus[notif.id] === 'sent'
                          ? 'bg-green-100 text-green-700 cursor-default'
                          : sendingStatus[notif.id] === 'sending'
                          ? 'bg-slate-300 text-slate-500 cursor-wait'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      {sendingStatus[notif.id] === 'sent' 
                        ? 'Terkirim' 
                        : sendingStatus[notif.id] === 'sending'
                        ? 'Mengirim...'
                        : 'Kirim ke WhatsApp'}
                    </button>
                    {sendingStatus[notif.id] === 'sent' && (
                      <span className="text-xs text-green-600 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Notifikasi berhasil dikirim
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <button className="p-1 hover:bg-white/50 rounded transition-all">
                <Check className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Setup Guide Link */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-green-900 mb-1">Setup WhatsApp Business API</h4>
            <p className="text-xs text-green-800 mb-2">
              Untuk mengaktifkan notifikasi WhatsApp otomatis, setup WhatsApp Business Cloud API diperlukan.
            </p>
            <div className="text-xs text-green-700 space-y-1">
              <div>📋 <strong>Langkah Setup:</strong></div>
              <div>1. Buat Meta Business Account</div>
              <div>2. Tambahkan WhatsApp ke aplikasi Anda</div>
              <div>3. Dapatkan Phone Number ID & Access Token</div>
              <div>4. Setup environment variables di backend</div>
              <div className="mt-2 pt-2 border-t border-green-300">
                <a 
                  href="https://developers.facebook.com/docs/whatsapp/cloud-api" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-700 underline hover:text-green-900"
                >
                  📖 Lihat dokumentasi lengkap
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
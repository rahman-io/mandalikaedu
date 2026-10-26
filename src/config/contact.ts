// Centralized Contact & WhatsApp & Legal Payment Configuration
export const CONTACT_CONFIG = {
  // Ganti dengan nomor WhatsApp aktif Anda (format internasional tanpa tanda +, contoh: '6281234567890')
  whatsappNumber: '6281234567890', 
  whatsappDisplay: '+62 812-3456-7890',
  email: 'salam@mandalikaedu.id',
  address: 'Mataram, Nusa Tenggara Barat, Indonesia',
  legalEntity: 'Lembaga Research Empowerment and Learning Centre Institute',
  
  // Rekening Bank Resmi
  bankName: 'Bank Central Asia (BCA)',
  bankAccountNo: '1234567890',
  bankAccountName: 'Lembaga Research Empowerment and Learning Centre Institute',

  // Rekening Cadangan (Opsional)
  bankName2: 'Bank Mandiri',
  bankAccountNo2: '0987654321',

  // QRIS All Payment Image Path
  qrisImageUrl: '/assets/qris-mandalikaedu.png',
  haloAiUrl: 'https://haloai.app/en'
};

// Helper to get active WhatsApp number (can be overridden by localStorage in runtime)
export const getActiveWhatsAppNumber = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('mandalika_whatsapp_number');
    if (saved) return saved.replace(/[^0-9]/g, '');
  }
  return CONTACT_CONFIG.whatsappNumber;
};

export const getActiveWhatsAppDisplay = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('mandalika_whatsapp_display');
    if (saved) return saved;
  }
  return CONTACT_CONFIG.whatsappDisplay;
};

export const setActiveWhatsAppNumber = (num: string): void => {
  if (typeof window !== 'undefined') {
    const cleanNum = num.replace(/[^0-9]/g, '');
    const formatted = cleanNum.startsWith('62') 
      ? `+${cleanNum.slice(0, 2)} ${cleanNum.slice(2, 5)}-${cleanNum.slice(5, 9)}-${cleanNum.slice(9)}`
      : cleanNum;
    localStorage.setItem('mandalika_whatsapp_number', cleanNum);
    localStorage.setItem('mandalika_whatsapp_display', formatted);
  }
};

// Centralized Contact & WhatsApp & Legal Payment Configuration
export const CONTACT_CONFIG = {
  // Nomor WhatsApp resmi MandalikaEdu (+6287753935810)
  whatsappNumber: '6287753935810', 
  whatsappDisplay: '+62 877-5393-5810',
  email: 'salam@mandalikaedu.id',
  address: 'Mataram, Nusa Tenggara Barat, Indonesia',
  legalEntity: 'LEMBAGA RESEARCH EMPOWERMENT LEARNING AND REPLACE INSTITUTE',
  
  // Rekening Bank Resmi
  bankName: 'Bank NTB Syariah (KC Sumbawa)',
  bankAccountNo: '004.02.00332.06-0',
  bankAccountName: 'LEMBAGA RESEARCH EMPOWERMENT LEARNING AND REPLACE INSTITUTE',

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
    if (saved && saved !== '6281234567890' && saved !== '6282247563829') return saved.replace(/[^0-9]/g, '');
  }
  return CONTACT_CONFIG.whatsappNumber;
};

export const getActiveWhatsAppDisplay = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('mandalika_whatsapp_display');
    if (saved && !saved.includes('812-3456') && !saved.includes('822-4756')) return saved;
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

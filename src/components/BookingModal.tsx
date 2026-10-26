import React, { useState } from 'react';
import { 
  X, Calendar, Clock, MessageSquare, CheckCircle2, 
  Sparkles, ShieldCheck, ArrowRight, Phone, Copy, Check,
  QrCode, Building2, CreditCard, ExternalLink, Download
} from 'lucide-react';
import { PACKAGES_DATA, ServicePackage } from '../data/packages';
import { CONTACT_CONFIG, getActiveWhatsAppNumber } from '../config/contact';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPackageId?: string;
  customNote?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedPackageId,
  customNote
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    studyLevel: 'S2',
    targetCountry: 'Jepang',
    packageId: preselectedPackageId || 'discovery-free',
    preferredDate: '',
    preferredTime: '19:30 WIB (Malam)',
    backgroundNotes: customNote || ''
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [activePaymentTab, setActivePaymentTab] = useState<'qris' | 'bank'>('qris');
  const [copiedBank, setCopiedBank] = useState(false);
  const [uniqueCode] = useState(() => Math.floor(Math.random() * 89) + 10); // Code 10-98

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const selectedPkg = PACKAGES_DATA.find(p => p.id === formData.packageId) || PACKAGES_DATA[0];
  const isFree = selectedPkg.priceNumber === 0;

  // Calculate unique nominal for easy transaction matching
  const uniquePrice = selectedPkg.priceNumber > 0 ? selectedPkg.priceNumber + uniqueCode : 0;
  const uniquePriceFormatted = selectedPkg.priceNumber > 0 ? `Rp ${uniquePrice.toLocaleString('id-ID')}` : selectedPkg.priceFormatted;

  // Copy bank account to clipboard
  const handleCopyAccount = (accNo: string) => {
    navigator.clipboard.writeText(accNo);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  // Generate WhatsApp Payment Confirmation Link
  const waText = encodeURIComponent(
    isFree
      ? `Halo Tim MandalikaEdu, saya ingin mendaftar Sesi Discovery Gratis:\n\n` +
        `• Nama: ${formData.name}\n` +
        `• Asal Kota/Daerah: ${formData.city}\n` +
        `• Jenjang & Negara Target: ${formData.studyLevel} - ${formData.targetCountry}\n` +
        `• Paket Layanan: ${selectedPkg.name} (${selectedPkg.priceFormatted})\n` +
        `• Pilihan Waktu: ${formData.preferredDate || 'Segera'} jam ${formData.preferredTime}\n` +
        (formData.backgroundNotes ? `• Catatan: ${formData.backgroundNotes}\n` : '') +
        `\nMohon konfirmasi jadwal ketersediaan mentor. Terima kasih!`
      : `Halo Admin MandalikaEdu & ${CONTACT_CONFIG.legalEntity},\n\nSaya telah melakukan pemesanan paket bimbingan di website:\n\n` +
        `• Nama Pemesan: ${formData.name}\n` +
        `• Nomor WA: ${formData.phone}\n` +
        `• Asal Kota/Daerah: ${formData.city}\n` +
        `• Paket Dipilih: ${selectedPkg.name}\n` +
        `• Total Tagihan: ${uniquePriceFormatted}\n` +
        `• Metode Pembayaran: ${activePaymentTab === 'qris' ? 'QRIS All Payment' : 'Transfer Bank (' + CONTACT_CONFIG.bankName + ')'}\n` +
        `• Pilihan Jadwal Sesi: ${formData.preferredDate || 'Segera'} (${formData.preferredTime})\n\n` +
        `Berikut saya lampirkan bukti transfer pembayaran. Mohon verifikasi dan konfirmasi jadwal sesi. Terima kasih!`
  );

  const waUrl = `https://wa.me/${getActiveWhatsAppNumber()}?text=${waText}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              <Calendar className="w-4 h-4 text-slate-700" />
              <span>Formulir Booking & Konsultasi</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
              Jadwalkan Konsultasi Bersama Mentor
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Sesi konsultasi 1-on-1 via Google Meet / Zoom. Dapatkan pemetaan peluang beasiswa yang jujur dan objektif.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Nama & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nama Anda"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nomor WhatsApp Aktif *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Kota Domisili & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kota / Asal Daerah *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Contoh: Mataram / Kupang / Samarinda"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Alamat Email (Opsional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="emailanda@gmail.com"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Pilihan Paket Layanan */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pilihan Paket Bimbingan *
                </label>
                <select
                  value={formData.packageId}
                  onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                >
                  {PACKAGES_DATA.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.priceFormatted})
                    </option>
                  ))}
                </select>
              </div>

              {/* Jenjang & Negara Target */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Jenjang
                  </label>
                  <select
                    value={formData.studyLevel}
                    onChange={(e) => setFormData({ ...formData, studyLevel: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="S1">S1 (Sarjana)</option>
                    <option value="S2">S2 (Magister/Master)</option>
                    <option value="S3">S3 (Doktor/PhD)</option>
                    <option value="Riset">Program Riset Non-Degree</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Negara Tujuan Utama
                  </label>
                  <select
                    value={formData.targetCountry}
                    onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="Jepang">Jepang (MEXT / Mitsui)</option>
                    <option value="Jerman">Jerman (DAAD / Free Tuition)</option>
                    <option value="Inggris">Inggris (Chevening)</option>
                    <option value="Australia">Australia (AAS)</option>
                    <option value="Turki">Turki (Türkiye Bursları)</option>
                    <option value="Korea Selatan">Korea Selatan (GKS)</option>
                    <option value="Belanda">Belanda (NL Scholarship)</option>
                    <option value="Belum Yakin">Belum Yakin / Butuh Saran</option>
                  </select>
                </div>
              </div>

              {/* Kalender Booking & Jam */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pilihan Tanggal Sesi
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pilihan Slot Jam
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="10:00 WIB (Pagi)">10:00 WIB (Pagi)</option>
                    <option value="14:00 WIB (Siang)">14:00 WIB (Siang)</option>
                    <option value="16:30 WIB (Sore)">16:30 WIB (Sore)</option>
                    <option value="19:30 WIB (Malam)">19:30 WIB (Malam - Ramah Karyawan/Mahasiswa)</option>
                  </select>
                </div>
              </div>

              {/* Catatan / Kebutuhan Khusus */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kendala atau Hal yang Ingin Dikonsultasikan
                </label>
                <textarea
                  rows={2}
                  value={formData.backgroundNotes}
                  onChange={(e) => setFormData({ ...formData, backgroundNotes: e.target.value })}
                  placeholder="Contoh: Belum punya skor IELTS, ingin tahu peluang beasiswa afirmasi anak daerah..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isFree ? 'Kirim Booking Sesi Gratis (Rp 0)' : 'Lanjut ke Pembayaran QRIS / Bank'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                MandalikaEdu menjamin privasi data Anda. Dilindungi payung hukum {CONTACT_CONFIG.legalEntity}.
              </p>

            </form>
          </div>
        ) : (
          /* SUCCESS / PAYMENT INSTRUCTIONS MODAL STATE */
          <div className="space-y-5">
            {isFree ? (
              /* FREE DISCOVERY CONFIRMATION STATE */
              <div className="py-4 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  Formulir Sesi Gratis Terdaftar!
                </h3>

                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Halo <strong>{formData.name}</strong>, jadwal sesi Discovery Gratis Anda untuk paket <strong>{selectedPkg.name}</strong> telah dicatat oleh sistem MandalikaEdu.
                </p>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 max-w-sm mx-auto text-left space-y-1">
                  <div>· <strong>Asal Daerah:</strong> {formData.city}</div>
                  <div>· <strong>Target:</strong> {formData.studyLevel} {formData.targetCountry}</div>
                  <div>· <strong>Jadwal:</strong> {formData.preferredDate || 'Segera'} ({formData.preferredTime})</div>
                </div>

                <div className="pt-2 space-y-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Konfirmasi ke WhatsApp Admin MandalikaEdu</span>
                  </a>

                  <button
                    onClick={onClose}
                    className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-900 font-semibold cursor-pointer"
                  >
                    Tutup Jendela Ini
                  </button>
                </div>
              </div>
            ) : (
              /* PAID PACKAGE - MANUAL PAYMENT INSTRUCTION (QRIS & BANK TRANSFER) */
              <div className="space-y-4">
                
                {/* Header Payment Note */}
                <div className="text-center space-y-1 border-b border-slate-100 pb-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold">
                    <CreditCard className="w-3.5 h-3.5 text-amber-600" />
                    <span>Instruksi Pembayaran Manual Resmi</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Selesaikan Pembayaran {selectedPkg.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Transfers & QRIS aman di bawah naungan legal resmi lembaga.
                  </p>
                </div>

                {/* Total Nominal Box */}
                <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-md">
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                      Total Nominal Pembayaran
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-amber-400">
                      {uniquePriceFormatted}
                    </div>
                    <div className="text-[10px] text-slate-300">
                      Termasuk kode verifikasi transaksi (+Rp {uniqueCode})
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-lg border border-emerald-500/30">
                      Menunggu Pembayaran
                    </span>
                  </div>
                </div>

                {/* Legal Entity Badge */}
                <div className="p-2.5 bg-indigo-50/80 border border-indigo-100 rounded-xl text-[11px] text-indigo-900 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Payung Hukum Resmi:</strong>
                    <div className="font-semibold text-indigo-950 mt-0.5">
                      {CONTACT_CONFIG.legalEntity}
                    </div>
                  </div>
                </div>

                {/* Payment Method Tabs */}
                <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold text-slate-600">
                  <button
                    type="button"
                    onClick={() => setActivePaymentTab('qris')}
                    className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activePaymentTab === 'qris'
                        ? 'bg-white text-indigo-700 shadow-2xs font-extrabold'
                        : 'hover:text-slate-900'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Scan QRIS (All Payment)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePaymentTab('bank')}
                    className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activePaymentTab === 'bank'
                        ? 'bg-white text-indigo-700 shadow-2xs font-extrabold'
                        : 'hover:text-slate-900'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Transfer Bank</span>
                  </button>
                </div>

                {/* Tab Content 1: QRIS */}
                {activePaymentTab === 'qris' && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-3">
                    <div className="text-xs font-bold text-slate-800">
                      Scan Kode QRIS (Dukungan Semua e-Wallet & Bank)
                    </div>

                    {/* QR Code Frame Mockup */}
                    <div className="w-48 h-48 bg-white border-2 border-slate-900 rounded-2xl p-2 mx-auto flex flex-col items-center justify-center shadow-xs">
                      {/* Visual QR SVG representation */}
                      <svg className="w-36 h-36 text-slate-900" viewBox="0 0 100 100">
                        <rect x="10" y="10" width="25" height="25" fill="currentColor" />
                        <rect x="15" y="15" width="15" height="15" fill="white" />
                        <rect x="18" y="18" width="9" height="9" fill="currentColor" />
                        <rect x="65" y="10" width="25" height="25" fill="currentColor" />
                        <rect x="70" y="15" width="15" height="15" fill="white" />
                        <rect x="73" y="18" width="9" height="9" fill="currentColor" />
                        <rect x="10" y="65" width="25" height="25" fill="currentColor" />
                        <rect x="15" y="70" width="15" height="15" fill="white" />
                        <rect x="18" y="73" width="9" height="9" fill="currentColor" />
                        <rect x="40" y="40" width="20" height="20" fill="currentColor" />
                        <rect x="45" y="15" width="10" height="20" fill="currentColor" />
                        <rect x="70" y="45" width="15" height="10" fill="currentColor" />
                        <rect x="45" y="70" width="20" height="15" fill="currentColor" />
                        <rect x="70" y="70" width="15" height="15" fill="currentColor" />
                      </svg>
                      <span className="text-[10px] font-black tracking-widest text-slate-900 mt-1 uppercase">
                        QRIS MANDALIKAEDU
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500">
                      Dapat di-scan melalui GoPay, OVO, DANA, ShopeePay, LinkAja, BCA Mobile, Livin Mandiri, BRImo, BNI Mobile, dll.
                    </p>
                  </div>
                )}

                {/* Tab Content 2: Transfer Bank */}
                {activePaymentTab === 'bank' && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-xs">
                    <div className="font-bold text-slate-800 border-b border-slate-200 pb-2 flex items-center justify-between">
                      <span>{CONTACT_CONFIG.bankName}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-indigo-100 text-indigo-800 font-bold rounded">
                        Transfer Bank
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-slate-500 font-semibold text-[10px]">Nomor Rekening:</div>
                      <div className="flex items-center justify-between bg-white border border-slate-300 rounded-xl p-2.5 font-mono text-sm font-bold text-slate-900">
                        <span>{CONTACT_CONFIG.bankAccountNo}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyAccount(CONTACT_CONFIG.bankAccountNo)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-sans font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedBank ? 'Tersalin!' : 'Salin'}</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="text-slate-500 font-semibold text-[10px]">Atas Nama Rekening:</div>
                      <div className="font-bold text-slate-900 bg-white border border-slate-200 rounded-xl p-2.5 leading-snug">
                        {CONTACT_CONFIG.bankAccountName}
                      </div>
                    </div>

                    {CONTACT_CONFIG.bankName2 && (
                      <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                        <strong>Opsi Bank Lain:</strong> {CONTACT_CONFIG.bankName2} ({CONTACT_CONFIG.bankAccountNo2})
                      </div>
                    )}
                  </div>
                )}

                {/* Action Button: Confirm & Submit Proof via WhatsApp */}
                <div className="pt-2 space-y-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Konfirmasi & Kirim Bukti Transfer ke WA Admin</span>
                  </a>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-900 font-semibold cursor-pointer"
                  >
                    Tutup / Bayar Nanti
                  </button>
                </div>

              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


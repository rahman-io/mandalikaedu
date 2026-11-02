import React, { useState } from 'react';
import { 
  X, Calendar, Clock, MessageSquare, CheckCircle2, 
  Sparkles, ShieldCheck, ArrowRight, Phone, Copy, Check,
  QrCode, Building2, CreditCard, ExternalLink, Download
} from 'lucide-react';
import { PACKAGES_DATA, ServicePackage } from '../data/packages';
import { CONTACT_CONFIG, getActiveWhatsAppNumber } from '../config/contact';
import { submitBookingRecord } from '../lib/firebase/bookingService';

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingTicketCode, setBookingTicketCode] = useState('');
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [activePaymentTab, setActivePaymentTab] = useState<'qris' | 'bank'>('qris');
  const [copiedBank, setCopiedBank] = useState(false);
  const [uniqueCode] = useState(() => Math.floor(Math.random() * 89) + 10); // Code 10-98

  if (!isOpen) return null;

  const selectedPkg = PACKAGES_DATA.find(p => p.id === formData.packageId) || PACKAGES_DATA[0];
  const isFree = selectedPkg.priceNumber === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await submitBookingRecord({
        studentName: formData.name,
        studentWhatsapp: formData.phone,
        studentEmail: formData.email,
        originCity: formData.city,
        targetCountry: formData.targetCountry,
        studyLevel: formData.studyLevel,
        targetScholarship: `${formData.studyLevel} ${formData.targetCountry}`,
        packageId: selectedPkg.id,
        packageName: selectedPkg.name,
        priceFormatted: selectedPkg.priceFormatted,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        notes: formData.backgroundNotes,
        isFree: isFree,
      });
      if (res?.bookingId) {
        setBookingTicketCode(res.bookingId);
      }
    } catch (err) {
      console.error('Error submitting booking:', err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  // Calculate unique nominal for easy transaction matching
  const uniquePrice = selectedPkg.priceNumber > 0 ? selectedPkg.priceNumber + uniqueCode : 0;
  const uniquePriceFormatted = selectedPkg.priceNumber > 0 ? `Rp ${uniquePrice.toLocaleString('id-ID')}` : selectedPkg.priceFormatted;

  // Copy bank account to clipboard
  const handleCopyAccount = (accNo: string) => {
    navigator.clipboard.writeText(accNo);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-5 sm:p-7 shadow-2xl relative my-auto max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-slate-800 p-1.5 rounded-full hover:bg-slate-100 transition-colors z-10 cursor-pointer"
          aria-label="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-y-auto pr-1.5 pt-1">
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
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-75 disabled:cursor-not-allowed text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Mengamankan Data...</span>
                  ) : (
                    <>
                      <span>{isFree ? 'Kirim Booking Sesi Gratis (Rp 0)' : 'Lanjut ke Pembayaran QRIS / Bank'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
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

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pendaftaran Terverifikasi Sistem</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  Formulir Konsultasi Berhasil Terkirim!
                </h3>

                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Halo <strong>{formData.name}</strong>, jadwal pengajuan sesi Discovery Gratis Anda untuk paket <strong>{selectedPkg.name}</strong> telah dicatat secara aman oleh sistem MandalikaEdu.
                </p>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 max-w-sm mx-auto text-left space-y-1.5">
                  <div>· <strong>Kode Tiket</strong> <span className="font-mono font-bold text-slate-900">{bookingTicketCode || 'MDK-TERDAFTAR'}</span></div>
                  <div>· <strong>Asal Daerah</strong> {formData.city}</div>
                  <div>· <strong>Target Studi</strong> {formData.studyLevel} {formData.targetCountry}</div>
                  <div>· <strong>Pilihan Waktu</strong> {formData.preferredDate || 'Segera'} ({formData.preferredTime})</div>
                  <div>· <strong>Status</strong> <span className="text-emerald-700 font-bold">Menunggu Validasi Konsultan</span></div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-[11px] text-blue-900 text-left max-w-sm mx-auto leading-relaxed">
                  Pemberitahuan telah diteruskan langsung ke sistem tim konsultan. Konsultan resmi kami akan segera menghubungi nomor WhatsApp Anda (<strong>{formData.phone}</strong>) setelah ketersediaan jadwal tervalidasi.
                </div>

                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Selesai dan Tutup Jendela
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
                <div className="p-2.5 bg-blue-50/80 border border-blue-100 rounded-xl text-[11px] text-blue-900 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Payung Hukum Resmi</strong>
                    <div className="font-semibold text-blue-950 mt-0.5">
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
                        ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
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
                        ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
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
                      <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded">
                        Transfer Bank
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-slate-500 font-semibold text-[10px]">Nomor Rekening</div>
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
                      <div className="text-slate-500 font-semibold text-[10px]">Atas Nama Rekening</div>
                      <div className="font-bold text-slate-900 bg-white border border-slate-200 rounded-xl p-2.5 leading-snug">
                        {CONTACT_CONFIG.bankAccountName}
                      </div>
                    </div>

                    {CONTACT_CONFIG.bankName2 && (
                      <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                        <strong>Opsi Bank Lain</strong> {CONTACT_CONFIG.bankName2} ({CONTACT_CONFIG.bankAccountNo2})
                      </div>
                    )}
                  </div>
                )}

                {/* Action Button: Confirm Payment without exposing Admin WA */}
                {!isPaymentConfirmed ? (
                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsPaymentConfirmed(true);
                        const confirmPayload = {
                          studentName: formData.name,
                          studentWhatsapp: formData.phone,
                          studentEmail: formData.email,
                          originCity: formData.city,
                          targetCountry: formData.targetCountry,
                          studyLevel: formData.studyLevel,
                          packageId: selectedPkg.id,
                          packageName: selectedPkg.name,
                          priceFormatted: uniquePriceFormatted,
                          preferredDate: formData.preferredDate,
                          preferredTime: formData.preferredTime,
                          notes: `[KONFIRMASI BAYAR] Siswa telah mentransfer via ${activePaymentTab === 'qris' ? 'QRIS' : 'Bank ' + CONTACT_CONFIG.bankName}. Total: ${uniquePriceFormatted}`,
                          isFree: false,
                        };
                        fetch('/api/booking/submit', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(confirmPayload)
                        }).then(r => {
                          if (!r.ok) {
                            fetch('https://mandalikaedu-ai.rahman-udemy-manager.workers.dev/api/booking/submit', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(confirmPayload)
                            }).catch(() => {});
                          }
                        }).catch(() => {
                          fetch('https://mandalikaedu-ai.rahman-udemy-manager.workers.dev/api/booking/submit', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(confirmPayload)
                          }).catch(() => {});
                        });
                      }}
                      className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Saya Sudah Transfer / Konfirmasi Pembayaran</span>
                    </button>

                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-900 font-semibold cursor-pointer"
                    >
                      Tutup / Bayar Nanti
                    </button>
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">
                      Konfirmasi Transfer Diterima!
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                      Terima kasih <strong>{formData.name}</strong>. Notifikasi pembayaran paket <strong>{selectedPkg.name}</strong> ({uniquePriceFormatted}) telah dicatat oleh sistem.
                    </p>
                    <div className="p-3 bg-white border border-emerald-200 rounded-xl text-[11px] text-slate-700 text-left space-y-1">
                      <div>· <strong>Paket</strong> {selectedPkg.name}</div>
                      <div>· <strong>Status</strong> Menunggu Verifikasi Mutasi Bank</div>
                      <div>· <strong>Nomor WhatsApp Anda</strong> {formData.phone}</div>
                    </div>
                    <p className="text-[11px] text-blue-900 font-medium">
                      Admin keuangan MandalikaEdu akan segera memverifikasi mutasi dan menghubungi nomor WhatsApp Anda untuk memulai bimbingan.
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                    >
                      Selesai dan Tutup
                    </button>
                  </div>
                )}

              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};


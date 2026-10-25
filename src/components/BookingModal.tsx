import React, { useState } from 'react';
import { 
  X, Calendar, Clock, MessageSquare, CheckCircle2, 
  Sparkles, ShieldCheck, ArrowRight, Phone 
} from 'lucide-react';
import { PACKAGES_DATA, ServicePackage } from '../data/packages';
import { getActiveWhatsAppNumber } from '../config/contact';

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  // Generate WhatsApp Direct Link
  const selectedPkg = PACKAGES_DATA.find(p => p.id === formData.packageId) || PACKAGES_DATA[0];

  const waText = encodeURIComponent(
    `Halo Tim MandalikaEdu, saya ingin mendaftar sesi konsultasi:\n\n` +
    `• Nama: ${formData.name}\n` +
    `• Asal Kota/Daerah: ${formData.city}\n` +
    `• Jenjang & Negara Target: ${formData.studyLevel} - ${formData.targetCountry}\n` +
    `• Paket Layanan: ${selectedPkg.name} (${selectedPkg.priceFormatted})\n` +
    `• Pilihan Waktu: ${formData.preferredDate || 'Segera'} jam ${formData.preferredTime}\n` +
    (formData.backgroundNotes ? `• Catatan: ${formData.backgroundNotes}\n` : '') +
    `\nMohon konfirmasi jadwal ketersediaan mentor. Terima kasih!`
  );

  const waUrl = `https://wa.me/${getActiveWhatsAppNumber()}?text=${waText}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1"
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
                  <span>Kirim & Hubungkan ke WhatsApp Mentor</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                MandalikaEdu menjamin privasi data Anda. Konsultasi Discovery 100% bebas biaya (Rp 0).
              </p>

            </form>
          </div>
        ) : (
          /* SUCCESS STATE WITH DIRECT WHATSAPP ACTION */
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-slate-100 text-slate-900 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Formulir Berhasil Disimpan!
            </h3>

            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Halo <strong>{formData.name}</strong>, jadwal konsultasi Anda untuk paket <strong>{selectedPkg.name}</strong> telah dicatat oleh sistem MandalikaEdu.
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
                <span>Kirim Format ke WhatsApp Admin MandalikaEdu</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-900 font-semibold"
              >
                Tutup Jendela Ini
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

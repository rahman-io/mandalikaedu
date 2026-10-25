import React, { useState } from 'react';
import { Video, Calendar, Clock, Users, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface WebinarSectionProps {
  onOpenBooking: () => void;
}

export const WebinarSection: React.FC<WebinarSectionProps> = ({ onOpenBooking }) => {
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [region, setRegion] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsapp.trim()) return;
    setRegistered(true);
  };

  return (
    <div className="py-16 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Webinar Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-slate-300">
                <Video className="w-3.5 h-3.5 text-emerald-400" />
                <span>Webinar Bulanan Gratis MandalikaEdu</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                Bedah Trik Lolos Beasiswa S1 & S2 Luar Negeri Khusus Mahasiswa Daerah
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Kupas tuntas strategi mengubah keterbatasan fasilitas daerah menjadi cerita keunggulan kepemimpinan yang memikat komite beasiswa MEXT, DAAD, dan AAS.
              </p>

              {/* Date, Time, Capacity */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Waktu & Tanggal:</span>
                  <strong className="text-white">Sabtu, 14 November 2026</strong>
                  <span className="text-slate-400 block text-[11px]">19.30 - 21.30 WITA</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Platform:</span>
                  <strong className="text-white">Zoom Live Interaktif</strong>
                  <span className="text-slate-400 block text-[11px]">Tanya Jawab Bebas</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-slate-400 block text-[11px]">Investasi:</span>
                  <strong className="text-emerald-400">100% GRATIS</strong>
                  <span className="text-slate-400 block text-[11px]">Kuota 150 Peserta</span>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-6 sm:p-7 shadow-lg">
              {!registered ? (
                <form onSubmit={handleRegister} className="space-y-3.5">
                  <h3 className="text-base font-bold text-slate-900">
                    Daftar Tempat Anda Sekarang
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tautan Zoom & rekaman materi akan dikirimkan langsung ke nomor WhatsApp Anda.
                  </p>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama Anda"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Nomor WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="0812-xxxx-xxxx"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Asal Kota / Kampus Daerah
                    </label>
                    <input
                      type="text"
                      required
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      placeholder="Contoh: Univ. Mataram / Kupang / Samarinda"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
                  >
                    Klaim Tiket Webinar Gratis
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center space-y-3">
                  <div className="w-10 h-10 bg-slate-100 text-slate-900 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    Tiket Webinar Terkonfirmasi!
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Terima kasih <strong>{name}</strong>. Pengingat dan link akses Zoom telah kami alokasikan untuk nomor <strong>{whatsapp}</strong>.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

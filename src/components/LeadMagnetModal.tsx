import React, { useState } from 'react';
import { X, Download, BookOpen, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadMagnetModal: React.FC<LeadMagnetModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [channel, setChannel] = useState<'whatsapp' | 'email'>('whatsapp');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    setDownloadSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {!downloadSuccess ? (
          <div>
            <div className="w-12 h-12 bg-slate-100 text-slate-900 rounded-2xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>

            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Lead Magnet Eksklusif (Gratis)
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Unduh E-Book: "Panduan Beasiswa 2027: Dari Daerah Menembus Kampus Dunia"
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Plus bonus <strong>5 Template CV ATS & Motivation Letter</strong> berstandar Eropa, Asia, dan Australia yang telah meloloskan alumni MandalikaEdu.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kirim E-Book Melalui:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <button
                    type="button"
                    onClick={() => setChannel('whatsapp')}
                    className={`py-2 px-3 rounded-lg border text-center transition-colors ${
                      channel === 'whatsapp'
                        ? 'bg-slate-900 text-white border-slate-900 font-medium'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Nomor WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannel('email')}
                    className={`py-2 px-3 rounded-lg border text-center transition-colors ${
                      channel === 'email'
                        ? 'bg-slate-900 text-white border-slate-900 font-medium'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Alamat Email
                  </button>
                </div>

                <input
                  type={channel === 'whatsapp' ? 'tel' : 'email'}
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={channel === 'whatsapp' ? '0812-xxxx-xxxx' : 'emailanda@gmail.com'}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Dapatkan E-Book & Template Sekarang</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Bebas spam & data Anda 100% terjaga kerahasiaannya.</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 bg-slate-100 text-slate-900 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              E-Book Telah Dikirim!
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Terima kasih <strong>{name}</strong>! Tautan unduh E-Book "Panduan Beasiswa 2027" serta file template CV dan esai telah berhasil dialokasikan ke <strong>{contact}</strong>.
            </p>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
              Anda juga bisa langsung mengunduh salinan lokal sekarang:
            </div>

            <button
              onClick={() => {
                alert('Mengunduh salinan berkas E-Book MandalikaEdu 2027...');
                onClose();
              }}
              className="w-full py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Langsung (PDF)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

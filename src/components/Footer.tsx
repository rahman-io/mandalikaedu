import React from 'react';
import { ShieldCheck, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenLeadMagnet: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenBooking, onOpenLeadMagnet }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top 4-Column Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-slate-900 flex items-center justify-center font-bold text-base">
                M
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                MandalikaEdu
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Layanan bimbingan studi dan beasiswa kuliah luar negeri yang berpihak pada talenta daerah luar kota metropolitan: didampingi dari nol berkas, persiapan bahasa, review esai, hingga persiapan keberangkatan.
            </p>

            <div className="space-y-1.5 text-slate-400 text-[11px]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Headquarters: Mataram, Lombok, Nusa Tenggara Barat</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>WhatsApp: +62 821-4567-8901 (Fast Response)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Email: halo@mandalikaedu.id</span>
              </div>
            </div>
          </div>

          {/* Navigasi Layanan */}
          <div className="space-y-3">
            <div className="text-white font-bold tracking-wider uppercase text-[11px]">
              Fitur & Layanan
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavClick('beasiswa')} className="hover:text-white transition-colors text-left">
                  Database Beasiswa
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('kuis')} className="hover:text-white transition-colors text-left">
                  Kuis "Cocok Kuliah di Mana?"
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('kalkulator')} className="hover:text-white transition-colors text-left">
                  Kalkulator Biaya Hidup
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('negara')} className="hover:text-white transition-colors text-left">
                  Negara Tujuan Populer
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('paket')} className="hover:text-white transition-colors text-left">
                  Paket & Biaya Bimbingan
                </button>
              </li>
            </ul>
          </div>

          {/* Eksplorasi Siswa */}
          <div className="space-y-3">
            <div className="text-white font-bold tracking-wider uppercase text-[11px]">
              Komunitas & Edukasi
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavClick('kisah')} className="hover:text-white transition-colors text-left">
                  Kisah Sukses Anak Daerah
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('dashboard')} className="hover:text-white transition-colors text-left">
                  Roadmap & Checklist Siswa
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('blog')} className="hover:text-white transition-colors text-left">
                  Blog & Tips Beasiswa
                </button>
              </li>
              <li>
                <button onClick={onOpenLeadMagnet} className="hover:text-white transition-colors text-left">
                  Unduh E-Book Panduan 2027
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('tentang')} className="hover:text-white transition-colors text-left">
                  Profil Mentor & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Konsultasi CTA */}
          <div className="space-y-3">
            <div className="text-white font-bold tracking-wider uppercase text-[11px]">
              Mulai Langkah Anda
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Daftar sesi Discovery 20 menit bersama alumni luar negeri secara gratis.
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 px-3 bg-white text-slate-900 font-bold uppercase text-[11px] rounded-xl hover:bg-slate-100 transition-colors shadow-xs"
            >
              Konsultasi Gratis (Rp 0)
            </button>
          </div>

        </div>

        {/* Section 8 Ethical Disclaimer & Risk Warning */}
        <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-500 space-y-2">
          <div className="flex items-center gap-1.5 text-slate-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Pernyataan Etis & Penafian Tanggung Jawab (Bab 8 Panduan MandalikaEdu):</span>
          </div>
          <p className="leading-relaxed">
            MandalikaEdu adalah konsultan bimbingan pendidikan independen. Kami mendampingi proses persiapan aplikasi secara profesional dan transparan, tanpa memberikan jaminan kelulusan mutlak (beasiswa atau universitas). Keputusan penerimaan sepenuhnya berada pada hak prerogatif komite seleksi resmi masing-masing penyelenggara beasiswa. Informasi data beasiswa, biaya, dan tautan resmi diverifikasi secara berkala namun dapat berubah sewaktu-waktu oleh pihak penyelenggara.
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 mt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} MandalikaEdu. Seluruh hak cipta dilindungi undang-undang.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavClick('tentang')} className="hover:text-slate-400">
              Kebijakan Privasi
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavClick('tentang')} className="hover:text-slate-400">
              Syarat & Ketentuan Layanan
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavClick('tentang')} className="hover:text-slate-400">
              Kebijakan Refund
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

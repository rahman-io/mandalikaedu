import React, { useState } from 'react';
import { PACKAGES_DATA, ServicePackage } from '../data/packages';
import { 
  Check, ArrowRight, ShieldCheck, HelpCircle, 
  Sparkles, Clock, MessageSquare, Layers, FileCheck, Star
} from 'lucide-react';

interface PackagesSectionProps {
  onSelectPackage: (pkg: ServicePackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'group' | 'addon'>('all');

  const filteredPackages = PACKAGES_DATA.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="py-16 bg-eduvance-grid min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-3 shadow-2xs">
            Investasi Masa Depan yang Transparan
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            <span className="text-indigo-600">Pilih</span> Paket Yang Cocok Untuk <span className="text-indigo-600">Impianmu</span>
          </h1>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Mulai dari konsultasi Discovery 100% Gratis hingga pendampingan komprehensif end-to-end. Pilih paket yang paling pas dengan kesiapan berkas dan target beasiswa Anda.
          </p>

          {/* Category Tabs (Rounded-full pill style from Eduvance) */}
          <div className="mt-8 inline-flex items-center gap-1.5 p-1.5 bg-white border border-slate-200/80 rounded-full shadow-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Layanan
            </button>
            <button
              onClick={() => setActiveCategory('core')}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                activeCategory === 'core'
                  ? 'bg-amber-400 text-slate-950 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Paket Inti Bimbingan
            </button>
            <button
              onClick={() => setActiveCategory('group')}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                activeCategory === 'group'
                  ? 'bg-amber-400 text-slate-950 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kelas Grup Online
            </button>
            <button
              onClick={() => setActiveCategory('addon')}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                activeCategory === 'addon'
                  ? 'bg-amber-400 text-slate-950 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Layanan Add-On
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (Matching screenshot: White cards & Vibrant Purple featured card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredPackages.map((pkg) => {
            const isPurpleCard = pkg.isPopular;

            return (
              <div
                key={pkg.id}
                className={`rounded-3xl border p-8 flex flex-col justify-between transition-all duration-200 relative ${
                  isPurpleCard
                    ? 'bg-indigo-600 text-white border-2 border-indigo-500 shadow-xl lg:-translate-y-2'
                    : 'bg-white border-slate-200/90 text-slate-900 hover:border-indigo-200 hover:shadow-md'
                }`}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div className={`inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider mb-3 shadow-xs ${
                    isPurpleCard
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                  }`}>
                    {isPurpleCard && <Star className="w-3.5 h-3.5 fill-current" />}
                    <span>{pkg.badge}</span>
                  </div>
                )}

                <div>
                  <h3 className={`text-xl font-bold mb-1 ${isPurpleCard ? 'text-white' : 'text-slate-900'}`}>
                    {pkg.name}
                  </h3>

                  <p className={`text-xs mb-6 min-h-[32px] leading-relaxed ${isPurpleCard ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {pkg.tagline}
                  </p>

                  <div className={`mb-6 pb-6 border-b ${isPurpleCard ? 'border-indigo-500' : 'border-slate-100'}`}>
                    <div className={`text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums ${isPurpleCard ? 'text-white' : 'text-slate-900'}`}>
                      {pkg.priceFormatted}
                    </div>
                    <div className={`text-xs mt-1.5 flex items-center gap-1.5 font-medium ${isPurpleCard ? 'text-indigo-200' : 'text-slate-500'}`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className={`text-xs font-bold uppercase tracking-wider ${isPurpleCard ? 'text-indigo-200' : 'text-slate-400'}`}>
                      Termasuk dalam paket:
                    </div>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className={`flex items-start gap-2.5 text-xs ${isPurpleCard ? 'text-indigo-50' : 'text-slate-700'}`}>
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isPurpleCard ? 'text-amber-300' : 'text-amber-500'}`} />
                        <span className="leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Deliverables Output Box */}
                  <div className={`p-3.5 rounded-2xl mb-6 text-xs ${isPurpleCard ? 'bg-indigo-700/60 border border-indigo-400/30' : 'bg-slate-50 border border-slate-100'}`}>
                    <span className={`font-bold block mb-1.5 ${isPurpleCard ? 'text-amber-300' : 'text-slate-900'}`}>
                      Output yang Diterima:
                    </span>
                    <ul className="space-y-1 text-[11px]">
                      {pkg.deliverables.map((deliv, i) => (
                        <li key={i} className={`flex items-center gap-1.5 ${isPurpleCard ? 'text-indigo-100' : 'text-slate-600'}`}>
                          <span className={isPurpleCard ? 'text-amber-300' : 'text-slate-400'}>·</span>
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div>
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95 ${
                      isPurpleCard
                        ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-md'
                        : pkg.isFree
                          ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                          : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    <span>{pkg.isFree ? 'Ambil Sesi Gratis (20 Mnt)' : `Pilih Paket ${pkg.name.split(':')[0]}`}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <p className={`text-[10px] text-center mt-2.5 font-medium ${isPurpleCard ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {pkg.isFree ? 'Tanpa biaya tersembunyi & tanpa ikatan' : 'Bisa dibayar bertahap / cicilan'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section: Ethical Commitment & Policy */}
        <div className="mt-16 bg-white rounded-3xl border border-indigo-100 p-8 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700 mb-3">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Komitmen Etis & Kebijakan Transparansi (Bab 8 Panduan Resmi)</span>
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Prinsip Pelayanan & Integritas MandalikaEdu
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
            <div className="space-y-1.5 p-4 bg-slate-50/70 rounded-2xl border border-slate-100">
              <strong className="text-slate-900 block font-semibold text-sm">
                1. Tanpa Janji Palsu (No False Promise)
              </strong>
              <p>
                Kami menegaskan komitmen etis bahwa kami <strong>mendampingi proses secara profesional</strong>, bukan menjanjikan kelulusan mutlak. Keputusan akhir sepenuhnya di tangan dewan juri beasiswa independen.
              </p>
            </div>

            <div className="space-y-1.5 p-4 bg-slate-50/70 rounded-2xl border border-slate-100">
              <strong className="text-slate-900 block font-semibold text-sm">
                2. Status Konsultan Independen
              </strong>
              <p>
                MandalikaEdu adalah konsultan pendidikan independen yang berpihak pada kepentingan siswa, memberikan rekomendasi objektif tanpa tekanan komersial dari universitas tertentu.
              </p>
            </div>

            <div className="space-y-1.5 p-4 bg-slate-50/70 rounded-2xl border border-slate-100">
              <strong className="text-slate-900 block font-semibold text-sm">
                3. Akurasi & Verifikasi Data
              </strong>
              <p>
                Seluruh informasi beasiswa, batas waktu, dan tautan resmi diverifikasi berkala oleh tim kami. Kami selalu mencantumkan tanggal verifikasi dan situs penyelenggara resmi.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

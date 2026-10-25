import React, { useState } from 'react';
import { PACKAGES_DATA, ServicePackage } from '../data/packages';
import { 
  Check, ArrowRight, ShieldCheck, HelpCircle, 
  Sparkles, Clock, MessageSquare, Layers, FileCheck 
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
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Investasi Masa Depan yang Transparan
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Paket Layanan Bimbingan MandalikaEdu
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Mulai dari konsultasi Discovery 100% Gratis hingga pendampingan komprehensif end-to-end. Pilih paket yang paling pas dengan kesiapan berkas dan target beasiswa Anda.
          </p>

          {/* Category Tabs */}
          <div className="mt-8 inline-flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Layanan
            </button>
            <button
              onClick={() => setActiveCategory('core')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'core'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Paket Inti Bimbingan
            </button>
            <button
              onClick={() => setActiveCategory('group')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'group'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kelas Grup Online
            </button>
            <button
              onClick={() => setActiveCategory('addon')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'addon'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Layanan Add-On
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => {
            return (
              <div
                key={pkg.id}
                className={`rounded-3xl border p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 bg-white relative ${
                  pkg.isPopular
                    ? 'border-slate-900 shadow-lg ring-1 ring-slate-900'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-7 px-3 py-1 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900">
                      {pkg.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 mb-6 min-h-[32px] leading-relaxed">
                    {pkg.tagline}
                  </p>

                  <div className="mb-6 pb-6 border-b border-slate-100">
                    <div className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                      {pkg.priceFormatted}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Termasuk dalam paket:
                    </div>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Deliverables */}
                  <div className="p-3.5 bg-slate-50 rounded-xl mb-6 text-xs text-slate-600">
                    <span className="font-semibold text-slate-800 block mb-1">
                      Output yang Diterima:
                    </span>
                    <ul className="space-y-1 text-[11px] text-slate-600">
                      {pkg.deliverables.map((deliv, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="text-slate-400">·</span>
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div>
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
                      pkg.isPopular || pkg.isFree
                        ? 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95 shadow-sm'
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200 active:scale-95'
                    }`}
                  >
                    <span>{pkg.isFree ? 'Ambil Sesi Gratis (20 Mnt)' : `Pilih Paket ${pkg.name.split(':')[0]}`}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <p className="text-[10px] text-slate-400 text-center mt-2.5">
                    {pkg.isFree ? 'Tanpa biaya tersembunyi & tanpa ikatan' : 'Bisa dibayar bertahap / cicilan'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section 8: Catatan Penting & Kode Etik MandalikaEdu */}
        <div className="mt-16 bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            <ShieldCheck className="w-4 h-4 text-slate-700" />
            <span>Komitmen Etis & Kebijakan Transparansi (Bab 8 Panduan Resmi)</span>
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Prinsip Pelayanan & Integritas MandalikaEdu
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
            <div className="space-y-1.5">
              <strong className="text-slate-900 block font-semibold text-sm">
                1. Tanpa Janji Palsu (No False Promise)
              </strong>
              <p>
                Kami menegaskan komitmen etis bahwa kami <strong>mendampingi proses secara profesional</strong>, bukan menjanjikan kelulusan mutlak. Keputusan akhir sepenuhnya di tangan dewan juri beasiswa independen.
              </p>
            </div>

            <div className="space-y-1.5">
              <strong className="text-slate-900 block font-semibold text-sm">
                2. Status Konsultan Independen
              </strong>
              <p>
                MandalikaEdu adalah konsultan pendidikan independen yang berpihak pada kepentingan siswa, memberikan rekomendasi objektif tanpa tekanan komersial dari universitas tertentu.
              </p>
            </div>

            <div className="space-y-1.5">
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

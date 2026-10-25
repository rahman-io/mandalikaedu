import React, { useState } from 'react';
import { COUNTRIES_DATA, CountryDetail } from '../data/countries';
import { 
  Globe, ArrowRight, DollarSign, BookOpen, Clock, 
  MapPin, CheckCircle2, Building2, X, Sparkles, HeartHandshake 
} from 'lucide-react';

interface CountriesDirectoryProps {
  onSelectCountryForScholarships: (countryName: string) => void;
  onOpenBooking: () => void;
}

export const CountriesDirectory: React.FC<CountriesDirectoryProps> = ({ 
  onSelectCountryForScholarships, 
  onOpenBooking 
}) => {
  const [activeModalCountry, setActiveModalCountry] = useState<CountryDetail | null>(null);

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Panduan Lengkap Studi Mancanegara
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Eksplorasi Negara Tujuan Favorit
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Pahami karakteristik sistem pendidikan, kebijakan SPP, biaya hidup riil bulanan, regulasi kerja sampingan, serta peluang beasiswa terfavorit untuk setiap negara.
          </p>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COUNTRIES_DATA.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveModalCountry(c)}
              className="bg-white rounded-3xl border border-slate-200/90 hover:border-slate-400/80 p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:shadow-md cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" role="img" aria-label={c.name}>{c.flag}</span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
                        {c.name}
                      </h3>
                      <span className="text-xs text-slate-500">Ibu kota: {c.capital}</span>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg">
                    {c.currency}
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-6 font-medium leading-relaxed">
                  {c.tagline}
                </p>

                {/* Unboxed Metadata Stats */}
                <div className="space-y-3 mb-6 text-xs text-slate-700">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-slate-500">Living Cost Bulanan:</span>
                    <strong className="text-slate-900 text-right">{c.avgLivingCostMonthly.idr}</strong>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <span className="text-slate-500">Kuliah Gratis / SPP:</span>
                    <span className="text-slate-800 text-right line-clamp-1 font-medium">{c.tuitionFeeInfo.split('.')[0]}</span>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <span className="text-slate-500">Syarat Bahasa:</span>
                    <span className="text-slate-800 text-right line-clamp-1 font-medium">{c.languageRequirements.english.split('(')[0]}</span>
                  </div>
                </div>

                {/* Popular universities preview */}
                <div className="p-3 bg-slate-50 rounded-2xl mb-6 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800 block mb-1">
                    Kampus Terkemuka:
                  </span>
                  <div className="text-[11px] text-slate-500 line-clamp-2">
                    {c.popularUniversities.map(u => u.name.split('(')[0].trim()).join(', ')}
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Lihat Rincian Studi <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[11px] text-slate-400">
                  {c.availableScholarships.length} Beasiswa
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Country Detail Modal */}
      {activeModalCountry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 sm:px-8 py-5 border-b border-slate-100 flex items-start justify-between gap-4 z-10">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{activeModalCountry.flag}</span>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Panduan Studi di {activeModalCountry.name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeModalCountry.tagline}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveModalCountry(null)}
                className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 sm:px-8 py-6 space-y-6">
              
              {/* Biaya Kuliah & Living Cost */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-slate-700" />
                    <span>Ketentuan Biaya Kuliah (Tuition)</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {activeModalCountry.tuitionFeeInfo}
                  </p>
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-700" />
                    <span>Biaya Hidup Bulanan</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    {activeModalCountry.avgLivingCostMonthly.idr}
                  </div>
                  <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-200">
                    <div>· Sewa Tempat Tinggal: {activeModalCountry.avgLivingCostMonthly.breakdown.rent}</div>
                    <div>· Makan Harian: {activeModalCountry.avgLivingCostMonthly.breakdown.food}</div>
                    <div>· Asuransi: {activeModalCountry.avgLivingCostMonthly.breakdown.insurance}</div>
                  </div>
                </div>
              </div>

              {/* Syarat Bahasa & Kerja Paruh Waktu */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-slate-700" />
                    <span>Syarat Kemahiran Bahasa</span>
                  </div>
                  <div className="text-xs text-slate-700 space-y-1">
                    <div><strong>Bahasa Inggris:</strong> {activeModalCountry.languageRequirements.english}</div>
                    <div><strong>Bahasa Lokal:</strong> {activeModalCountry.languageRequirements.localLanguage}</div>
                    <div className="text-slate-500 pt-1 text-[11px] italic">{activeModalCountry.languageRequirements.notes}</div>
                  </div>
                </div>

                <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-700" />
                    <span>Regulasi Kerja Paruh Waktu Legal</span>
                  </div>
                  <div className="text-xs text-slate-700 space-y-1">
                    <div><strong>Jam Kerja Diizinkan:</strong> {activeModalCountry.partTimeWorkRules.allowedHours}</div>
                    <div><strong>Upah Rata-Rata:</strong> {activeModalCountry.partTimeWorkRules.hourlyWage}</div>
                    <div className="text-slate-900 font-semibold pt-1">Potensi: {activeModalCountry.partTimeWorkRules.monthlyEarningPotential}</div>
                  </div>
                </div>
              </div>

              {/* Kampus Populer */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-slate-700" />
                  <span>Universitas Populer di {activeModalCountry.name}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeModalCountry.popularUniversities.map((u, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                      <div className="font-bold text-slate-900">{u.name}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">{u.city} · {u.highlight}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beasiswa Tersedia */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Skema Beasiswa Populer:
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {activeModalCountry.availableScholarships.map((schName, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-lg font-medium">
                      {schName}
                    </span>
                  ))}
                </div>
              </div>

              {/* Adaptasi Anak Daerah */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl text-xs space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-slate-200">
                  <Sparkles className="w-4 h-4 text-slate-300" />
                  <span>Catatan Khusus untuk Mahasiswa Asal Daerah:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {activeModalCountry.regionalStudentFriendly}
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 sm:px-8 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => {
                  const countryName = activeModalCountry.name;
                  setActiveModalCountry(null);
                  onSelectCountryForScholarships(countryName);
                }}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cari Beasiswa di {activeModalCountry.name}
              </button>

              <button
                onClick={() => {
                  setActiveModalCountry(null);
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-sm"
              >
                Konsultasi Kuliah ke {activeModalCountry.name}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

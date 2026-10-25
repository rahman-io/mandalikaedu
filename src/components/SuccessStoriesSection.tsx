import React, { useState } from 'react';
import { TESTIMONIALS_DATA, Testimonial } from '../data/testimonials';
import { 
  Award, MapPin, GraduationCap, Quote, 
  ArrowRight, X, Sparkles, CheckCircle2 
} from 'lucide-react';

interface SuccessStoriesSectionProps {
  onOpenBooking: () => void;
}

export const SuccessStoriesSection: React.FC<SuccessStoriesSectionProps> = ({ onOpenBooking }) => {
  const [selectedStory, setSelectedStory] = useState<Testimonial | null>(null);
  const [filterCountry, setFilterCountry] = useState<string>('all');

  const filteredStories = TESTIMONIALS_DATA.filter((item) => {
    if (filterCountry === 'all') return true;
    return item.country.toLowerCase().includes(filterCountry.toLowerCase());
  });

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Bukti Nyata Dari Berbagai Pelosok Nusantara
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Kisah Sukses Talenta Daerah Menembus Kampus Impian Dunia
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Mereka berawal dari kampus dan kota yang sama seperti Anda: menghadapi keraguan, keterbatasan informasi, dan minimnya bimbingan lokal. Bersama MandalikaEdu, mereka membuktikan bahwa anak daerah mampu berdiri setara di panggung akademik global.
          </p>

          {/* Filter Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {['all', 'Jepang', 'Jerman', 'Inggris', 'Australia', 'Turki'].map((c) => (
              <button
                key={c}
                onClick={() => setFilterCountry(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  filterCountry === c
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c === 'all' ? 'Semua Destinasi' : c}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="bg-slate-50 rounded-3xl border border-slate-200/90 hover:border-slate-400/80 p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:shadow-md cursor-pointer group"
            >
              <div>
                {/* Regional Badge & Country */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-slate-600" />
                    <span>Asal: {story.origin}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-lg">{story.flag}</span>
                    <span className="font-medium text-slate-700">{story.country}</span>
                  </div>
                </div>

                {/* Student Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
                    {story.name}
                  </h3>
                  <div className="text-xs text-slate-600 font-medium mt-0.5">
                    {story.program}
                  </div>
                  <div className="text-xs font-semibold text-slate-900 mt-1">
                    {story.university}
                  </div>
                </div>

                {/* Scholarship Tag (Unboxed Clean) */}
                <div className="text-xs font-bold text-slate-900 mb-4 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-slate-700" />
                  <span>{story.scholarship}</span>
                  <span className="text-slate-400 font-normal">· {story.year}</span>
                </div>

                {/* Quote snippet */}
                <blockquote className="text-xs text-slate-600 italic leading-relaxed mb-6 border-l-2 border-slate-300 pl-3">
                  "{story.quote}"
                </blockquote>

                {/* Initial challenge summary */}
                <div className="p-3 bg-white rounded-xl text-xs text-slate-600 space-y-1 border border-slate-200/60 mb-4">
                  <span className="font-semibold text-slate-800 block text-[11px]">
                    Tantangan Awal:
                  </span>
                  <p className="line-clamp-2 text-slate-500">{story.initialProblem}</p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Baca Kisah Lengkap</span>
                <span className="font-bold text-slate-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Giliran Anda Menjadi Kisah Sukses Berikutnya
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
            Jadwalkan sesi konsultasi Discovery 20 menit gratis. Kami dengarkan mimpi Anda, petakan peluang realistis, dan rancang strategi langkah demi langkah dari nol.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 bg-white text-slate-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-100 active:scale-95 transition-all shadow-sm"
          >
            Mulai Konsultasi Gratis (Rp 0)
          </button>
        </div>

      </div>

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Asal Daerah: <strong>{selectedStory.origin}</strong></span>
              <span>·</span>
              <span>{selectedStory.flag} {selectedStory.country}</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              {selectedStory.name}
            </h2>
            <div className="text-sm font-semibold text-slate-700 mb-1">
              {selectedStory.program} • {selectedStory.university}
            </div>
            <div className="text-xs font-bold text-slate-900 mb-6 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-slate-700" />
              <span>{selectedStory.scholarship}</span>
              <span className="font-normal text-slate-400">({selectedStory.year})</span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Kondisi & Keraguan Awal:
                </div>
                <p className="text-slate-600">{selectedStory.initialProblem}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Peran & Solusi Bimbingan MandalikaEdu:
                </div>
                <p className="text-slate-600">{selectedStory.solutionByMandalika}</p>
              </div>

              <div>
                <div className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  Kisah Perjalanan & Refleksi:
                </div>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedStory.fullStory}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                Ingin menempuh jalur beasiswa serupa seperti {selectedStory.name}?
              </div>
              <button
                onClick={() => {
                  setSelectedStory(null);
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-colors"
              >
                Konsultasikan Rencanamu
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

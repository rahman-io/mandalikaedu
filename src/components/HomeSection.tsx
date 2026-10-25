import React from 'react';
import { 
  ArrowRight, CheckCircle2, Compass, Calculator, 
  Sparkles, Award, MapPin, Globe, ShieldCheck, Download, 
  Clock, BookOpen, Users, ChevronRight, HelpCircle, PhoneCall
} from 'lucide-react';
import { COUNTRIES_DATA } from '../data/countries';
import { SCHOLARSHIPS_DATA } from '../data/scholarships';
import { PACKAGES_DATA, ServicePackage } from '../data/packages';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { WebinarSection } from './WebinarSection';

interface HomeSectionProps {
  onNavigateTab: (tab: string) => void;
  onOpenBooking: () => void;
  onSelectScholarship: (scholarship: any) => void;
  onSelectPackage: (pkg: ServicePackage) => void;
  onOpenLeadMagnet: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onNavigateTab,
  onOpenBooking,
  onSelectScholarship,
  onSelectPackage,
  onOpenLeadMagnet,
}) => {
  const featuredScholarships = SCHOLARSHIPS_DATA.slice(0, 4);
  const featuredTestimonials = TESTIMONIALS_DATA.slice(0, 3);
  const popularPackages = PACKAGES_DATA.slice(0, 4);

  return (
    <div className="space-y-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Regional Focus Kicker */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-slate-700" />
                <span>Bimbingan Kuliah Luar Negeri Ramah Anak Daerah & Non-Jakarta</span>
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] max-w-2xl text-balance">
                Kuliah ke Luar Negeri dari Mana Saja, Kami Dampingi dari Nol.
              </h1>

              {/* Value Proposition Body */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Buka peluang beasiswa dunia bagi putra-putri daerah: kurasi beasiswa fully funded, bimbingan IELTS realistis, bedah esai mendalam, hingga persiapan visa dan keberangkatan bersama mentor alumni kampus top dunia.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-7 py-4 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 rounded-xl hover:bg-slate-800 active:scale-95 transition-all text-center shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Konsultasi Gratis (20 Menit)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigateTab('beasiswa')}
                  className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-center cursor-pointer"
                >
                  Cari Beasiswa Berdasarkan Negara
                </button>
              </div>

              {/* Micro proof line (Unboxed) */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-slate-700" />
                  <span>Sesi Pertama Rp 0 (Discovery)</span>
                </div>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-slate-700" />
                  <span>Tanpa Janji Palsu / No False Claim</span>
                </div>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                  <Users className="w-4 h-4 text-slate-700" />
                  <span>100% Online dari Kota Anda</span>
                </div>
              </div>

            </div>

            {/* Right Focal Card: Interactive Quiz & Tool Teaser (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 text-white rounded-3xl p-7 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Fitur Interaktif Cepat
                  </span>
                  <span className="text-xs bg-white/10 px-2.5 py-1 rounded-full text-slate-300">
                    Gratis
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">
                    Kuis: Cocok Kuliah di Mana?
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Jawab 6 pertanyaan seputar budget, kemampuan bahasa, jurusan, dan daerah asal Anda. Dapatkan rekomendasi negara, beasiswa cocok, dan estimasi biaya secara instan!
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between text-slate-300">
                    <span>1. Analisis Kesempatan Afirmasi Daerah</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between text-slate-300">
                    <span>2. Pilihan Beasiswa Fully Funded / Bebas SPP</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between text-slate-300">
                    <span>3. Simulasi Biaya Hidup & Upah Kerja Part-Time</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>

                <button
                  onClick={() => onNavigateTab('kuis')}
                  className="w-full py-3.5 bg-white text-slate-900 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Compass className="w-4 h-4" />
                  <span>Mulai Kuis Rekomendasi (3 Menit)</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. LOGO NEGARA TUJUAN POPULER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Destinasi Studi Utama
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Pilihan Negara Favorit Mahasiswa Indonesia
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('negara')}
            className="text-xs font-bold text-slate-900 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            Lihat Panduan Lengkap Semua Negara <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {COUNTRIES_DATA.map((c) => (
            <button
              key={c.id}
              onClick={() => onNavigateTab('negara')}
              className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-xs transition-all text-center flex flex-col items-center justify-center gap-2 cursor-pointer group"
            >
              <span className="text-3xl transition-transform group-hover:scale-110" role="img" aria-label={c.name}>
                {c.flag}
              </span>
              <div className="text-xs font-bold text-slate-900 group-hover:text-slate-800">
                {c.name}
              </div>
              <div className="text-[10px] text-slate-500 truncate w-full">
                {c.avgLivingCostMonthly.idr.split('-')[0].trim()}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. FITUR ANDALAN SHOWCASE: DATABASE BEASISWA INTERAKTIF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
                Fitur Andalan MandalikaEdu
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Database Beasiswa Terverifikasi per Negara
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
                Temukan beasiswa S1, S2, dan S3 dengan filter jenjang, jenis pendanaan, syarat IPK/IELTS, serta pengingat batas waktu pendaftaran via WhatsApp.
              </p>
            </div>

            <button
              onClick={() => onNavigateTab('beasiswa')}
              className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer"
            >
              Buka Database Lengkap ({SCHOLARSHIPS_DATA.length} Beasiswa)
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredScholarships.map((sch) => (
              <div
                key={sch.id}
                onClick={() => {
                  onSelectScholarship(sch);
                }}
                className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="text-lg">{sch.flag}</span>
                    <span className="font-semibold text-slate-800">{sch.country}</span>
                    <span>·</span>
                    <span>{sch.level.join(', ')}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-slate-800 mb-1 line-clamp-2">
                    {sch.name}
                  </h3>

                  <p className="text-[11px] text-slate-500 mb-3 line-clamp-1">
                    {sch.organizer}
                  </p>

                  <div className="p-2.5 bg-slate-50 rounded-xl text-xs text-slate-700 mb-3 space-y-1">
                    <div className="font-bold text-slate-900">{sch.fundingType}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">
                      {sch.coverage[0]}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-500">
                    Deadline: <strong className="text-slate-900">{sch.applicationPeriod.deadline}</strong>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. WHY MANDALIKAEDU (POSITIONING CELAH PASAR ANAK DAERAH) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Mengapa MandalikaEdu?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Dirancang Khusus Menjawab Kendala Nyata Anak Daerah
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Kami memahami kegelisahan pelamar dari luar pulau Jawa: rasa minder terhadap lulusan kota metropolitan, keterbatasan akses les bahasa mahal, dan kebingungan memulai berkas dari nol.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: '01',
              title: 'Prioritas Afirmasi Geografis',
              desc: 'Memanfaatkan kuota khusus Indonesia Timur dan daerah berkembang pada beasiswa AAS Australia, LPDP Afirmasi, dan DAAD Jerman.',
              icon: MapPin
            },
            {
              num: '02',
              title: 'Strategi Bahasa Tanpa Les Puluhan Juta',
              desc: 'Metode belajar mandiri Cambridge IELTS 90 hari & kurasi beasiswa luar negeri yang menyediakan kursus bahasa 1 tahun gratis (Turki, Jepang, Korea).',
              icon: Award
            },
            {
              num: '03',
              title: 'Storytelling Esai Kekuatan Lokal',
              desc: 'Mengubah pengalaman lapangan di daerah Anda menjadi bukti kepemimpinan otentik yang disukai komite seleksi dunia.',
              icon: BookOpen
            },
            {
              num: '04',
              title: 'Mentor Alumni dari Daerah',
              desc: 'Didampingi langsung oleh sesama anak daerah yang telah sukses menempuh S2 dan Ph.D. di Jepang, Jerman, Inggris, dan Australia.',
              icon: Users
            }
          ].map((item) => (
            <div key={item.num} className="p-6 bg-white rounded-3xl border border-slate-200 space-y-3">
              <div className="text-2xl font-black text-slate-300 font-mono">
                {item.num}
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SUCCESS STORIES HIGHLIGHT (BUKTI NYATA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Kisah Siswa Terbimbing
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Dari Daerah ke Panggung Dunia
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Kisah inspiratif para penerima beasiswa bimbingan MandalikaEdu.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('kisah')}
            className="text-xs font-bold text-slate-900 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            Lihat Semua Kisah Sukses <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTestimonials.map((t) => (
            <div key={t.id} className="bg-slate-50 rounded-3xl border border-slate-200 p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3 pb-3 border-b border-slate-200">
                  <span className="font-semibold text-slate-800">Asal: {t.origin}</span>
                  <span>{t.flag} {t.country}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{t.name}</h3>
                <div className="text-xs font-semibold text-slate-700 mt-0.5">{t.scholarship}</div>
                <div className="text-xs text-slate-500">{t.university}</div>

                <p className="text-xs text-slate-600 italic leading-relaxed my-4 border-l-2 border-slate-300 pl-3">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                Solusi MandalikaEdu: {t.solutionByMandalika.split('.')[0]}.
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. RINGKASAN PAKET LAYANAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
            Transparansi Model Bisnis
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Pilihan Paket Pendampingan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Pintu masuk Discovery 100% Gratis, dilanjutkan paket terarah sesuai fase berkas Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl border p-6 flex flex-col justify-between bg-white ${
                pkg.isPopular ? 'border-slate-900 shadow-lg ring-1 ring-slate-900' : 'border-slate-200'
              }`}
            >
              <div>
                {pkg.badge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    {pkg.badge}
                  </span>
                )}
                <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
                <div className="text-2xl font-extrabold text-slate-900 tracking-tight my-2">
                  {pkg.priceFormatted}
                </div>
                <p className="text-xs text-slate-500 mb-4 min-h-[36px]">
                  {pkg.tagline}
                </p>

                <ul className="space-y-1.5 text-xs text-slate-700 mb-6">
                  {pkg.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectPackage(pkg)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  pkg.isPopular || pkg.isFree
                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}
              >
                {pkg.isFree ? 'Ambil Sesi Gratis' : 'Pilih Paket'}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => onNavigateTab('paket')}
            className="text-xs font-bold text-slate-900 hover:underline inline-flex items-center gap-1"
          >
            Lihat Detail Paket & Biaya Lengkap (Termasuk Kelas Grup & Add-on) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 7. WEBINAR SECTION (Bulanan) */}
      <WebinarSection onOpenBooking={onOpenBooking} />

      {/* 8. LEAD MAGNET BANNER (E-BOOK DOWNLOAD) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 rounded-3xl border border-slate-200 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <Download className="w-4 h-4 text-slate-700" />
              <span>E-Book Gratis MandalikaEdu</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Unduh "Panduan Beasiswa 2027: Dari Daerah Menembus Kampus Impian Dunia"
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Dapatkan panduan 60 halaman lengkap dengan template CV ATS, contoh Motivation Letter lolos beasiswa, dan kalender deadline 2026/2027 secara cuma-cuma.
            </p>
          </div>

          <button
            onClick={onOpenLeadMagnet}
            className="px-6 py-3.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-800 active:scale-95 transition-all whitespace-nowrap shadow-sm shrink-0 cursor-pointer"
          >
            Unduh E-Book & Template (Gratis)
          </button>
        </div>
      </section>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  ArrowRight, CheckCircle2, Compass, Calculator, 
  Sparkles, Award, MapPin, Globe, ShieldCheck, Download, 
  Clock, BookOpen, Users, ChevronRight, HelpCircle, PhoneCall,
  Video, Star, ChevronDown, Check
} from 'lucide-react';
import { COUNTRIES_DATA } from '../data/countries';
import { SCHOLARSHIPS_DATA } from '../data/scholarships';
import { PACKAGES_DATA, ServicePackage } from '../data/packages';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { BLOG_POSTS_DATA } from '../data/blogPosts';
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
  const featuredBlogs = BLOG_POSTS_DATA.slice(0, 5);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const homeFaqs = [
    {
      q: 'Apakah anak daerah dari kampus non-top di luar Jawa benar-benar punya peluang dapat beasiswa luar negeri?',
      a: 'Sangat besar! Bahkan dalam beberapa beasiswa paling bergengsi seperti Australia Awards (AAS) dan LPDP, terdapat kuota afirmasi prioritas geografis untuk kawasan Indonesia Timur (NTB, NTT, Maluku, Papua). Selain itu, komite beasiswa internasional sangat menyukai kandidat yang memiliki kedekatan emosional dengan masalah riil di daerah asalnya.'
    },
    {
      q: 'Bahasa Inggris saya masih pas-pasan, apakah saya harus les mahal dulu sebelum mulai konsultasi?',
      a: 'Tidak perlu les mahal puluhan juta. Dalam sesi Discovery gratis kami, kami akan mengevaluasi kemampuan awal Anda dan memberikan roadmap bertahap: kapan harus fokus bahasa, bahan belajar gratis Cambridge yang tepat, serta pilihan negara seperti Turki, Jerman, atau Jepang yang memiliki jalur kursus bahasa gratis 1 tahun dari beasiswa.'
    },
    {
      q: 'Apakah MandalikaEdu konsultan independen atau agen komersial kampus?',
      a: 'MandalikaEdu adalah konsultan bimbingan beasiswa dan studi independen. Kami berpihak 100% pada kepentingan siswa, bukan agen komersial yang mengarahkan Anda ke universitas berbayar tertentu demi komisi. Rekomendasi kami murni didasarkan pada kecocokan profil dan potensi beasiswa penuh.'
    },
    {
      q: 'Bagaimana alur bimbingan jika saya berada jauh di daerah pelosok?',
      a: 'Seluruh sesi konsultasi, review esai, dan simulasi mock interview dilakukan 100% secara daring (Google Meet, Zoom, dan WhatsApp grup intensif). Siswa kami tersebar mulai dari pelosok Nusa Tenggara, pedalaman Kalimantan, Sulawesi, hingga Papua.'
    }
  ];

  return (
    <div className="space-y-24 bg-white">
      
      {/* 1. HERO SECTION (100% MATCHING SCREENSHOT) */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-eduvance-grid border-b border-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Pill Kicker - Lilac / Lavender badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold shadow-2xs">
                <span>Best Learning Platform</span>
                <span className="text-indigo-300">·</span>
                <span>Khusus Putra-Putri Daerah</span>
              </div>

              {/* Display Headline with Signature Highlighted Box & Sparkle */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] text-balance">
                <span className="inline-block border-2 border-amber-400 bg-amber-100/70 rounded-2xl px-3.5 py-0.5 text-slate-950 font-black mr-2 shadow-xs">
                  Wujudkan
                </span>
                Kuliah Dunia <span className="inline-block text-pink-400 font-serif text-3xl sm:text-4xl">*</span>
                <br />
                Dengan <span className="text-indigo-600 font-extrabold">Beasiswa Penuh</span>
              </h1>

              {/* Value Proposition Body */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Kuliah ke luar negeri dari mana saja, kami dampingi dari nol. Buka peluang beasiswa dunia bagi putra-putri daerah: kurasi beasiswa fully funded, bimbingan IELTS realistis, bedah esai mendalam, hingga persiapan visa dan keberangkatan bersama mentor alumni kampus top dunia.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-8 py-4 text-xs font-black uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all active:scale-95 text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Konsultasi Gratis (20 Menit)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigateTab('beasiswa')}
                  className="px-6 py-4 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-center cursor-pointer"
                >
                  Cari 15+ Database Beasiswa
                </button>
              </div>

              {/* Stats Counters Below CTA */}
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">120+</div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">Siswa Lolos Beasiswa</div>
                </div>
                <div className="h-10 w-px bg-slate-200" />
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">600+</div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">Pilihan Kampus & Beasiswa</div>
                </div>
              </div>

            </div>

            {/* Right Focal Card: Visual Student Composition with Floating Badges (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                
                {/* Soft glow background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/60 via-purple-100/40 to-amber-100/60 rounded-3xl filter blur-2xl transform scale-95 -z-10" />

                {/* Central Student Canvas */}
                <div className="bg-gradient-to-b from-indigo-50/70 to-purple-50/50 rounded-3xl p-5 border border-indigo-100/80 shadow-xl overflow-hidden relative">
                  
                  {/* Floating Badge 1: Top Left Satisfaction Rate (90% / 96%) */}
                  <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 px-3.5 shadow-lg border border-slate-100 flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-[11px] font-black text-emerald-700">
                      96%
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] font-bold text-slate-900 leading-tight">Kepuasan Siswa</div>
                      <div className="text-[9px] text-slate-500">Mentoring 1-on-1</div>
                    </div>
                  </div>

                  {/* Floating Badge 2: Top Right Video Consultation Camera Button */}
                  <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-2xl bg-pink-500 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
                    <Video className="w-5 h-5 fill-current" />
                  </div>

                  {/* Main Student Visual Photo */}
                  <div className="rounded-2xl overflow-hidden mt-6 pt-6 flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80"
                      alt="Mahasiswa Indonesia Meraih Beasiswa Luar Negeri"
                      className="w-full h-80 sm:h-96 object-cover object-top rounded-2xl shadow-inner"
                    />
                  </div>

                  {/* Floating Badge 3: Bottom Right Multi-Student Avatar Card */}
                  <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-100 flex items-center gap-3 max-w-[220px]">
                    <div className="flex -space-x-2">
                      <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Alumni" />
                      <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Alumni" />
                      <div className="w-7 h-7 rounded-full border-2 border-white bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center">
                        <Globe className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-700 font-semibold leading-tight">
                      120+ putra-putri daerah tembus kampus dunia
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PARTNER / DONOR LOGOS FLEX STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 border-y border-slate-100 flex flex-wrap items-center justify-around gap-6 text-slate-400 font-bold text-xs uppercase tracking-wider">
          <div className="flex items-center gap-2 hover:text-slate-600 transition-colors">
            <Award className="w-4 h-4 text-indigo-500" />
            <span>Beasiswa LPDP</span>
          </div>
          <div className="flex items-center gap-2 hover:text-slate-600 transition-colors">
            <Award className="w-4 h-4 text-amber-500" />
            <span>MEXT Jepang</span>
          </div>
          <div className="flex items-center gap-2 hover:text-slate-600 transition-colors">
            <Award className="w-4 h-4 text-emerald-500" />
            <span>DAAD Jerman</span>
          </div>
          <div className="flex items-center gap-2 hover:text-slate-600 transition-colors">
            <Award className="w-4 h-4 text-indigo-500" />
            <span>Australia Awards (AAS)</span>
          </div>
          <div className="flex items-center gap-2 hover:text-slate-600 transition-colors">
            <Award className="w-4 h-4 text-pink-500" />
            <span>Chevening UK</span>
          </div>
          <div className="flex items-center gap-2 hover:text-slate-600 transition-colors">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Türkiye Bursları</span>
          </div>
        </div>
      </section>

      {/* 3. VIBRANT YELLOW BANNER (PROFESSIONALLY ALIGNED CATEGORIES - FROM SCREENSHOT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-400 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-lg">
          
          {/* Decorative Purple Doodle Loop in top right corner */}
          <div className="absolute top-2 right-4 pointer-events-none opacity-40">
            <svg className="w-48 h-48 text-indigo-700 stroke-current fill-none stroke-[3]" viewBox="0 0 200 200">
              <path d="M 50 150 C 20 80, 160 20, 150 100 C 140 180, 30 140, 80 60 C 100 30, 150 50, 170 90" />
            </svg>
          </div>

          {/* White Pill Badge */}
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white text-slate-900 text-xs font-bold mb-4 shadow-2xs">
            Kategori Unggulan
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-8 max-w-xl">
            Kurasi <span className="text-indigo-700">Terarah</span> Program Bimbingan & Beasiswa
          </h2>

          {/* 4 Cards Grid (3 white + 1 deep vibrant purple) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Card 1: Beasiswa Fully Funded (White) */}
            <div 
              onClick={() => onNavigateTab('beasiswa')}
              className="bg-white rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1">
                  Beasiswa Fully Funded
                </h3>
                <div className="text-xs text-slate-500 font-semibold mb-6">
                  15+ Program Beasiswa Penuh
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-amber-400 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
                {/* Purple 4-point sparkle star */}
                <div className="w-8 h-8 text-indigo-600 flex items-center justify-center">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 2: Jalur Afirmasi Daerah (White) */}
            <div 
              onClick={() => onNavigateTab('beasiswa')}
              className="bg-white rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1">
                  Jalur Afirmasi Daerah
                </h3>
                <div className="text-xs text-slate-500 font-semibold mb-6">
                  NTB, NTT, Kalimantan, Papua
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-amber-400 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
                {/* Purple geometric pixel square */}
                <div className="w-8 h-8 grid grid-cols-2 gap-1 text-indigo-600">
                  <div className="bg-indigo-600 rounded-xs" />
                  <div className="bg-indigo-600 rounded-xs" />
                  <div className="bg-indigo-600 rounded-xs" />
                  <div className="bg-indigo-600 rounded-xs" />
                </div>
              </div>
            </div>

            {/* Card 3: Essay & CV Lab (DEEP VIBRANT INDIGO PURPLE AS IN SCREENSHOT) */}
            <div 
              onClick={() => onNavigateTab('paket')}
              className="bg-indigo-600 text-white rounded-3xl p-6 flex flex-col justify-between shadow-md hover:bg-indigo-700 transition-all cursor-pointer group"
            >
              <div>
                <h3 className="text-base font-extrabold text-white mb-1">
                  Essay & CV Lab
                </h3>
                <div className="text-xs text-indigo-200 font-semibold mb-6">
                  3x Review Baris-per-Baris
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
                {/* Yellow/amber geometric pinwheel */}
                <div className="w-8 h-8 text-amber-300 flex items-center justify-center">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2C12 7 8 8 8 12C4 12 3 8 3 8C8 8 7 4 12 2Z" />
                    <path d="M22 12C17 12 16 8 12 8C12 4 16 3 16 3C16 8 20 7 22 12Z" />
                    <path d="M12 22C12 17 16 16 16 12C20 12 21 16 21 16C16 16 17 20 12 22Z" />
                    <path d="M2 12C7 12 8 16 12 16C12 20 8 21 8 21C8 16 4 17 2 12Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 4: IELTS & English Strategy (White) */}
            <div 
              onClick={() => onNavigateTab('paket')}
              className="bg-white rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1">
                  IELTS & Bahasa Inggris
                </h3>
                <div className="text-xs text-slate-500 font-semibold mb-6">
                  Metode Belajar Mandiri 90 Hari
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-amber-400 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
                {/* Purple starburst asterisk */}
                <div className="w-8 h-8 text-indigo-600 flex items-center justify-center">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M11 2h2v7h7v2h-7v7h-2v-7H4v-2h7V2z" transform="rotate(45 12 12)" />
                    <path d="M11 2h2v7h7v2h-7v7h-2v-7H4v-2h7V2z" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. GATEWAY TO PERSONAL & PROFESSIONAL GROWTH (MATCHING SCREENSHOT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        
        {/* Decorative pastel sparkles */}
        <div className="absolute top-0 left-10 text-emerald-400 text-3xl select-none font-serif">*</div>
        <div className="absolute top-8 right-12 text-pink-400 text-3xl select-none font-serif">*</div>

        <div className="max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
            Tentang MandalikaEdu
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            <span className="text-indigo-600">Gateway</span> Menuju Pendidikan Tinggi Kelas <span className="text-indigo-600">Dunia</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Kami percaya talenta hebat tersebar di seluruh penjuru daerah Indonesia. MandalikaEdu mendampingi putra-putri daerah meraih beasiswa kuliah luar negeri dari nol, membedah berkas, menguatkan esai dengan cerita lokal otentik, dan membimbing hingga keberangkatan.
          </p>
        </div>

        {/* 4 Pillars of Strength Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[
            {
              num: '01',
              title: 'Prioritas Afirmasi Geografis',
              desc: 'Memanfaatkan kuota khusus Indonesia Timur dan daerah berkembang pada beasiswa AAS Australia, LPDP Afirmasi, dan DAAD Jerman.',
              icon: MapPin,
              accent: 'bg-indigo-50 text-indigo-600 border-indigo-100'
            },
            {
              num: '02',
              title: 'Strategi Bahasa Tanpa Les Mahal',
              desc: 'Metode belajar mandiri Cambridge IELTS 90 hari dan kurasi beasiswa luar negeri yang menyediakan kursus bahasa 1 tahun gratis (Turki, Jepang, Korea).',
              icon: Award,
              accent: 'bg-amber-50 text-amber-600 border-amber-100'
            },
            {
              num: '03',
              title: 'Storytelling Esai Kekuatan Lokal',
              desc: 'Mengubah pengalaman nyata di daerah asal menjadi narasi kepemimpinan otentik yang sangat diapresiasi komite donor beasiswa internasional.',
              icon: BookOpen,
              accent: 'bg-pink-50 text-pink-600 border-pink-100'
            },
            {
              num: '04',
              title: 'Mentor Alumni Luar Negeri',
              desc: 'Didampingi langsung oleh sesama putra-putri daerah yang sukses menempuh S2 dan Ph.D. di Jepang, Jerman, Inggris, dan Australia.',
              icon: Users,
              accent: 'bg-emerald-50 text-emerald-600 border-emerald-100'
            }
          ].map((item) => (
            <div key={item.num} className="p-7 bg-white rounded-3xl border border-slate-200/90 hover:border-indigo-200 hover:shadow-md transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-300 font-mono">{item.num}</span>
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${item.accent}`}>
                  <item.icon className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 pt-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* 5. PRICING SECTION ("CHOOSE WHAT WORKS FOR YOU" - SCREENSHOT EXACT LAYOUT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-3">
            Pilihan Paket
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            <span className="text-indigo-600">Pilih</span> Paket Yang Cocok Untuk <span className="text-indigo-600">Impianmu</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Mulai dari Sesi Discovery Rp 0 100% Gratis hingga pendampingan intensif dari nol hingga submit dokumen.
          </p>
        </div>

        {/* 3 Pricing Cards: Left White, Center Vibrant Purple ("Best Choice"), Right White */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Free Plan (Discovery Gratis) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Free Plan</h3>
              <p className="text-xs text-slate-500 mb-4">Sesi Discovery & evaluasi profil awal tanpa biaya.</p>
              
              <div className="flex items-baseline gap-1 my-4">
                <span className="text-4xl font-black text-slate-900">Rp 0</span>
                <span className="text-xs text-slate-400 font-semibold">/ sesi</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 my-6">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Sesi 1-on-1 daring 20 Menit</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Cek kelayakan profil ke 2-3 beasiswa</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Roadmap awal persiapan berkas</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Tanpa kewajiban beli paket apa pun</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Klaim Sesi Gratis (Rp 0)
            </button>
          </div>

          {/* Card 2: Starter / Featured (DEEP VIBRANT INDIGO PURPLE AS IN SCREENSHOT) */}
          <div className="bg-indigo-600 text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl relative transform lg:-translate-y-2 border-2 border-indigo-500">
            {/* Best Choice Amber Badge */}
            <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black uppercase tracking-wider mb-2 shadow-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Pilihan Terfavorit</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-1">Essay & CV Lab</h3>
              <p className="text-xs text-indigo-100 mb-4">Bedah esai beasiswa berstandar internasional bersama mentor luar negeri.</p>

              <div className="flex items-baseline gap-1 my-4">
                <span className="text-4xl font-black text-white">Rp 499.000</span>
                <span className="text-xs text-indigo-200 font-semibold">/ dokumen</span>
              </div>

              <ul className="space-y-3 text-xs text-indigo-50 my-6">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>3x Review mendalam baris-per-baris</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Motivation Letter & Europass CV</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Penguatan narasi kontribusi daerah</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Koreksi grammar & struktur akademik</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPackage(PACKAGES_DATA[2] || PACKAGES_DATA[0])}
              className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer active:scale-95"
            >
              Pilih Paket Ini
            </button>
          </div>

          {/* Card 3: Mentorship 360 (Pro Plan) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Mentorship 360</h3>
              <p className="text-xs text-slate-500 mb-4">Pendampingan all-in intensif dari nol hingga submit aplikasi.</p>

              <div className="flex items-baseline gap-1 my-4">
                <span className="text-4xl font-black text-slate-900">Rp 1.490.000</span>
                <span className="text-xs text-slate-400 font-semibold">/ batch</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 my-6">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Review esai & dokumen tanpa batas</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>2x Simulasi Mock Interview</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Panduan visa & akomodasi luar negeri</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Grup WhatsApp eksklusif dengan mentor</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPackage(PACKAGES_DATA[3] || PACKAGES_DATA[0])}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Daftar Mentorship 360
            </button>
          </div>

        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => onNavigateTab('paket')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            Lihat Semua Pilihan Paket Termasuk Kelas Grup & Add-On <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 5.5 EKOSISTEM TOOLS BELAJAR BAHASA INGGRIS (KEMITRAAN RESMI EKSTERNAL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-extrabold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span>Kemitraan Resmi Penyedia Layanan Eksternal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tools Interaktif Pendamping <span className="text-indigo-600">Belajar Bahasa Inggris</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Akses 2 platform inovatif mitra MandalikaEdu untuk menguasai Grammar, Tenses, dan Kosa Kata (Vocabulary) IELTS & TOEFL dengan cara seru!
          </p>
        </div>

        {/* 2 Featured Partner Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Partner Card 1: TenseGO (Grammar AI & AR) */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-7 sm:p-9 text-white shadow-xl relative overflow-hidden border border-purple-500/20 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 text-purple-300 text-[11px] font-bold rounded-full">
                  📱 TenseGO · Grammar AI & AR
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">Mitra Eksternal</span>
              </div>

              <h3 className="text-2xl font-black text-white leading-tight">
                TenseGO <span className="text-purple-400 font-normal">| Belajar Grammar & Tenses Interaktif</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Aplikasi pintar yang memadukan AI & Augmented Reality (AR) untuk menyulap objek di sekitarmu menjadi kelas bahasa Inggris interaktif bersama Tutor AI Cosmo 24/7.
              </p>

              <div className="space-y-2 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span><strong>Kamera AR Cosmo:</strong> Ubah Objek Jadi Materi Tenses</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                  <span><strong>Tutor AI 24/7:</strong> Tanya Jawab 16 Tenses Kapan Saja</span>
                </div>
              </div>
            </div>

            <a
              href="https://tensego.replaceid.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Buka TenseGO (tensego.replaceid.org)</span>
              <Globe className="w-4 h-4" />
            </a>
          </div>

          {/* Partner Card 2: Diglosa (Game Petualangan Kata / Vocabulary) */}
          <div className="bg-gradient-to-br from-amber-950 via-amber-900/90 to-slate-950 rounded-3xl p-7 sm:p-9 text-white shadow-xl relative overflow-hidden border border-amber-500/20 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-bold rounded-full">
                  🏰 Diglosa · Game Petualangan Kata
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">Mitra Eksternal</span>
              </div>

              <h3 className="text-2xl font-black text-white leading-tight">
                Diglosa <span className="text-amber-300 font-normal">| Petualangan Kosa Kata RPG</span>
              </h3>

              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                Game petualangan edukasi seru untuk meningkatkan kuantitas dan kualitas Kosa Kata (Vocabulary) akademik Bahasa Inggris kamu lewat tantangan petualangan RPG fantasy!
              </p>

              <div className="space-y-2 text-xs text-amber-100/90 pt-2">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span><strong>Petualangan RPG Fantasy:</strong> Belajar Vocab Sambil Main Game</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-300 shrink-0" />
                  <span><strong>Leveling & Trofi:</strong> Pantau Progres Kosa Kata Akademik</span>
                </div>
              </div>
            </div>

            <a
              href="https://diglosa.replaceid.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Mainkan Diglosa (diglosa.replaceid.org)</span>
              <Globe className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* 6. YOUR LEARNING JOURNEY IN 4 SIMPLE STEPS (FROM SCREENSHOT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-3">
            Alur Bimbingan
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tahapan Bimbingan Menuju Kampus Impian Dalam <span className="text-indigo-600">4 Langkah</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Metodologi terstruktur dan terbukti mendampingi ratusan pelamar dari luar pulau Jawa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '1',
              title: 'Discovery & Profiling',
              desc: 'Evaluasi profil akademik, kesiapan sertifikat bahasa, dan pemetaan beasiswa paling cocok (khususnya jalur afirmasi daerah).'
            },
            {
              step: '2',
              title: 'Roadmap & Strategi 90 Hari',
              desc: 'Penyusunan timeline terstruktur: pemilihan 3 kampus impian, kontak profesor pembimbing, dan persiapan berkas administrasi.'
            },
            {
              step: '3',
              title: 'Bedah Esai & Storytelling',
              desc: '3x review intensif Motivation Letter dan CV bersama mentor alumni luar negeri dengan penekanan kekuatan kontribusi daerah.'
            },
            {
              step: '4',
              title: 'Simulasi Interview & Submit',
              desc: 'Latihan wawancara nyata dengan alumni kampus top dunia hingga Anda siap 100% menghadapi komite penyeleksi beasiswa.'
            }
          ].map((s) => (
            <div key={s.step} className="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-6 relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-extrabold flex items-center justify-center text-sm mb-4 shadow-xs">
                  {s.step}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. INSIGHTS & IDEAS FROM MANDALIKALEDU (BLOG SECTION - FROM SCREENSHOT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-2">
              Artikel & Edukasi
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              <span className="text-indigo-600">Wawasan</span> & Panduan Beasiswa Dari <span className="text-indigo-600">MandalikaEdu</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Tips praktis dari para mentor untuk menembus beasiswa kuliah luar negeri.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('blog')}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-2xs whitespace-nowrap self-start md:self-auto cursor-pointer"
          >
            Lihat Semua Panduan
          </button>
        </div>

        {/* Blog layout: Left large feature post + Right 2x2 grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Large Featured Post (6 cols) */}
          {featuredBlogs[0] && (
            <div 
              onClick={() => onNavigateTab('blog')}
              className="lg:col-span-6 bg-slate-50/80 rounded-3xl border border-slate-200/90 overflow-hidden hover:shadow-md transition-all cursor-pointer group"
            >
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80" 
                alt="Panduan Beasiswa" 
                className="w-full h-56 object-cover group-hover:scale-102 transition-transform duration-300"
              />
              <div className="p-7 space-y-3">
                <span className="inline-block px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-700 text-[11px] font-bold">
                  {featuredBlogs[0].category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                  {featuredBlogs[0].title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {featuredBlogs[0].excerpt}
                </p>
                <div className="text-[11px] text-slate-400 font-medium pt-2">
                  {featuredBlogs[0].publishedDate} · {featuredBlogs[0].readTime}
                </div>
              </div>
            </div>
          )}

          {/* Right 2x2 Grid (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredBlogs.slice(1, 5).map((post) => (
              <div 
                key={post.id}
                onClick={() => onNavigateTab('blog')}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 hover:shadow-xs hover:border-indigo-200 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold mb-2">
                    {post.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h4>
                </div>
                <div className="text-[10px] text-slate-400 font-medium mt-3 pt-2 border-t border-slate-100">
                  {post.publishedDate}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS (FROM SCREENSHOT) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-2">
            FAQ
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            <span className="text-indigo-600">Frequently</span> Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Pertanyaan yang sering diajukan oleh calon siswa dan orang tua.
          </p>
        </div>

        <div className="space-y-3">
          {homeFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:bg-slate-50/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-indigo-600 font-extrabold">Q:</span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <strong className="text-indigo-600 mr-1">A:</strong>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-xs"
          >
            Tanya Langsung ke Mentor via WhatsApp
          </button>
        </div>
      </section>

      {/* 9. WEBINAR SECTION */}
      <WebinarSection onOpenBooking={onOpenBooking} />

      {/* 10. LEAD MAGNET BANNER (E-BOOK DOWNLOAD) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16">
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
              <Download className="w-4 h-4" />
              <span>E-Book Gratis MandalikaEdu</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Unduh "Panduan Beasiswa 2027: Dari Daerah Menembus Kampus Impian Dunia"
            </h3>
            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
              Dapatkan panduan 60 halaman lengkap dengan template CV ATS, contoh Motivation Letter lolos beasiswa, dan kalender deadline 2026/2027 secara cuma-cuma.
            </p>
          </div>

          <button
            onClick={onOpenLeadMagnet}
            className="px-7 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl active:scale-95 transition-all whitespace-nowrap shadow-md shrink-0 cursor-pointer"
          >
            Unduh E-Book & Template (Gratis)
          </button>
        </div>
      </section>

    </div>
  );
};

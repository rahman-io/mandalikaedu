import React, { useState } from 'react';
import { 
  ShieldCheck, Award, GraduationCap, ChevronDown, 
  MapPin, Heart, Sparkles, HelpCircle, ArrowRight 
} from 'lucide-react';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

const MENTORS = [
  {
    name: 'Dr. Ilham Ramdani, Ph.D.',
    role: 'Co-Founder & Head Academic Mentor',
    origin: 'Lombok, Nusa Tenggara Barat',
    education: 'Ph.D. in Engineering — The University of Tokyo, Jepang',
    scholarship: 'Penerima MEXT Monbukagakusho Scholarship (2018 - 2023)',
    bio: 'Menyelesaikan S1 di kampus regional Mataram sebelum menembus beasiswa MEXT ke Todai. Telah membimbing lebih dari 120 mahasiswa daerah meraih beasiswa Asia dan Eropa.',
  },
  {
    name: 'Nadia Salsabila, M.Sc.',
    role: 'Lead Mentor Eropa & Jerman',
    origin: 'Padang, Sumatera Barat',
    education: 'M.Sc. Sustainable Engineering — RWTH Aachen University, Jerman',
    scholarship: 'Penerima DAAD EPOS Scholarship',
    bio: 'Spesialis penyusunan Europass CV dan Motivation Letter berstandar institusi Jerman. Membantu pelamar daerah menyiasati blocked account dan visa pelajar.',
  },
  {
    name: 'Kevin Jonathan, M.P.P.',
    role: 'Lead Mentor UK & Beasiswa Kepemimpinan',
    origin: 'Kupang, Nusa Tenggara Timur',
    education: 'Master of Public Policy — University of Oxford (Blavatnik School)',
    scholarship: 'Penerima Chevening Scholarship UK',
    bio: 'Berpengalaman melatih pelamar daerah menyusun 4 esai Chevening berbasis pengalaman kepemimpinan riil di masyarakat tanpa gaya bahasa klise.',
  },
  {
    name: 'Ratih Puspadewi, S.Pd., M.Ed.',
    role: 'Language & IELTS Strategist',
    origin: 'Purwokerto, Jawa Tengah',
    education: 'Master of Education — The University of Melbourne, Australia',
    scholarship: 'Penerima Australia Awards Scholarships (AAS)',
    bio: 'Meraih skor IELTS Band 8.5 melalui metode belajar mandiri 90 hari. Mengembangkan kurikulum persiapan tes bahasa yang realistis dan terjangkau untuk anak daerah.',
  }
];

const FAQS = [
  {
    q: 'Apakah anak daerah dari kampus non-top di luar Jawa benar-benar punya peluang dapat beasiswa luar negeri?',
    a: 'Sangat besar! Bahkan dalam beberapa beasiswa paling bergengsi seperti Australia Awards (AAS) dan LPDP, terdapat kuota afirmasi prioritas geografis (Geographic Focus Area) untuk kawasan Indonesia Timur (termasuk NTB, NTT, Maluku, Papua). Selain itu, komite beasiswa internasional menyukai kandidat yang memiliki kedekatan emosional dengan masalah riil di daerah asalnya.'
  },
  {
    q: 'Bahasa Inggris saya masih pas-pasan, apakah saya harus les mahal dulu sebelum mulai konsultasi?',
    a: 'Tidak perlu les mahal puluhan juta. Dalam sesi Discovery gratis kami, kami akan mengevaluasi kemampuan awal Anda dan memberikan roadmap bertahap: kapan harus fokus bahasa, bahan belajar gratis Cambridge yang tepat, serta pilihan negara seperti Turki, Jerman, atau Jepang yang memiliki jalur kursus bahasa gratis 1 tahun dari beasiswa.'
  },
  {
    q: 'Apakah MandalikaEdu menjanjikan 100% pasti diterima beasiswa atau kampus?',
    a: 'TIDAK. Sesuai kode etik resmi kami (Bab 8 Panduan MandalikaEdu), kami tidak pernah membuat janji palsu "pasti lulus". Keputusan mutlak ada di tangan komite beasiswa dan universitas. Komitmen kami adalah mendampingi proses persiapan secara profesional dari nol: membedah berkas, memaksimalkan kekuatan esai, dan memastikan aplikasi Anda tidak ditolak karena kesalahan administrasi.'
  },
  {
    q: 'Apakah MandalikaEdu konsultan independen atau agen resmi kampus?',
    a: 'MandalikaEdu adalah konsultan bimbingan beasiswa & studi independen. Kami berpihak 100% pada kepentingan siswa, bukan agen komersial yang mengarahkan Anda ke universitas berbayar tertentu demi komisi. Rekomendasi kami murni didasarkan pada kecocokan profil dan potensi beasiswa penuh.'
  },
  {
    q: 'Bagaimana alur bimbingan jika saya berada jauh di daerah?',
    a: 'Seluruh sesi konsultasi, review esai, dan simulasi mock interview dilakukan 100% secara daring (Google Meet / Zoom dan WhatsApp grup intensif). Siswa kami tersebar mulai dari pelosok Nusa Tenggara, pedalaman Kalimantan, Sulawesi, hingga Papua.'
  },
  {
    q: 'Berapa biaya konsultasi pertama?',
    a: 'Sesi Discovery pertama (20 Menit) 100% GRATIS (Rp 0). Anda bisa mendiskusikan latar belakang dan mengecek kelayakan 2-3 beasiswa tanpa kewajiban membeli paket apa pun.'
  }
];

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Story Section */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Cerita Di Balik Nama MandalikaEdu
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
            Meratakan Akses Beasiswa Dunia untuk Anak Daerah
          </h1>
          <p className="text-base text-slate-600 leading-relaxed mb-6">
            Nama <strong>Mandalika</strong> berakar dari Lombok, Nusa Tenggara Barat — melambangkan tekad kami membuka gerbang kesempatan pendidikan tinggi kelas dunia bagi putra-putri daerah di luar kota metropolitan Jakarta.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Selama bertahun-tahun, informasi beasiswa kuliah luar negeri didominasi oleh kota-kota besar. Banyak anak daerah berbakat mengubur impiannya hanya karena tidak tahu cara menulis Motivation Letter, bingung mencari profesor riset, atau takut dengan biaya kursus bahasa. MandalikaEdu hadir sebagai jembatan: <em>"Kuliah ke Luar Negeri dari Mana Saja, Kami Dampingi dari Nol."</em>
          </p>
        </div>

        {/* Mentors Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Kredibilitas & Pengalaman Nyata
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Profil Tim Mentor Alumni Luar Negeri
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Anda akan didampingi langsung oleh alumni peraih beasiswa bergengsi yang juga berasal dari berbagai daerah di Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MENTORS.map((m, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-7 sm:p-8 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
                      {m.name.split(' ')[1]?.[0] || 'M'}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{m.name}</h3>
                      <div className="text-xs text-slate-600 font-medium">{m.role}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>Asal: {m.origin}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-xl text-slate-700">
                      <strong>Pendidikan:</strong> {m.education}
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl text-slate-900 font-semibold flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-slate-700" />
                      <span>{m.scholarship}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {m.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2 flex items-center justify-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-slate-700" />
              <span>Pertanyaan Umum Calon Siswa & Orang Tua</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Tanya Jawab (FAQ)
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:bg-slate-50/50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-xs text-slate-500 mb-4">
              Masih punya pertanyaan spesifik yang belum terjawab di atas?
            </p>
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
            >
              Hubungi Mentor via WhatsApp
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Compass, CheckCircle2, ArrowRight, RotateCcw, 
  Sparkles, ExternalLink, MessageCircle, Award, Globe, DollarSign 
} from 'lucide-react';
import { COUNTRIES_DATA, CountryDetail } from '../data/countries';
import { SCHOLARSHIPS_DATA, Scholarship } from '../data/scholarships';
import { PACKAGES_DATA, ServicePackage } from '../data/packages';

interface QuizStudyFinderProps {
  onOpenBookingWithPackage: (packageId: string, customNote?: string) => void;
  onExploreScholarship: (scholarshipId: string) => void;
}

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    value: string;
    tag?: string;
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'Jenjang pendidikan apa yang ingin Anda tempuh di luar negeri?',
    subtitle: 'Pilih jenjang yang paling sesuai dengan kualifikasi akademis terakhir Anda.',
    options: [
      { label: 'S1 (Sarjana / Bachelor)', description: 'Baru lulus atau kelas 12 SMA/SMK/MA sederajat', value: 'S1' },
      { label: 'S2 (Magister / Master)', description: 'Lulusan S1 atau mahasiswa tingkat akhir yang bersiap lanjut studi', value: 'S2', tag: 'Paling Populer' },
      { label: 'S3 (Doktoral / PhD)', description: 'Lulusan S2, dosen daerah, atau peneliti yang ingin riset mendalam', value: 'S3' },
      { label: 'Program Riset / Non-Degree', description: 'Pelatihan riset singkat, fellowship, atau persiapan pra-doktor', value: 'Riset' }
    ]
  },
  {
    id: 2,
    title: 'Rumpun bidang keilmuan apa yang Anda minati?',
    subtitle: 'Setiap negara memiliki keunggulan spesifik di bidang industri dan riset tertentu.',
    options: [
      { label: 'Teknik, Rekayasa & STEM', description: 'Teknik mesin, elektro, informatika, AI, fisika, material', value: 'STEM', tag: 'Kekuatan Jepang & Jerman' },
      { label: 'Sosial, Kebijakan Publik & Humaniora', description: 'Hubungan internasional, sosiologi, hukum, diplomasi, media', value: 'Sosial', tag: 'Kekuatan UK & Belanda' },
      { label: 'Bisnis, Manajemen & Ekonomi', description: 'Keuangan, kewirausahaan, supply chain, akuntansi global', value: 'Bisnis' },
      { label: 'Kesehatan, Kedokteran & Gizi Masyarakat', description: 'Public health, biomedis, keperawatan, gizi daerah', value: 'Kesehatan', tag: 'Kekuatan Australia' }
    ]
  },
  {
    id: 3,
    title: 'Bagaimana status sertifikat kemahiran bahasa Inggris Anda saat ini?',
    subtitle: 'Jangan khawatir, banyak beasiswa yang ramah bagi yang baru mulai belajar.',
    options: [
      { label: 'Belum pernah tes resmi & masih pemula', description: 'Ingin beasiswa yang tidak mewajibkan sertifikat IELTS di awal seleksi', value: 'beginner' },
      { label: 'Pernah tes prediksi / TOEFL ITP (Skor ~480 - 540)', description: 'Sudah mengerti dasar bahasa Inggris namun butuh strategi mendongkrak skor', value: 'intermediate' },
      { label: 'Sudah punya IELTS 6.0 - 6.5 / TOEFL iBT 80+', description: 'Memenuhi syarat sebagian besar universitas negeri Eropa dan Asia', value: 'advanced' },
      { label: 'Siap belajar bahasa lokal (Jepang / Jerman / Turki)', description: 'Tertarik beasiswa fully funded dengan fasilitas kursus bahasa 1 tahun gratis', value: 'multilingual' }
    ]
  },
  {
    id: 4,
    title: 'Bagaimana preferensi pembiayaan studi Anda?',
    subtitle: 'MandalikaEdu memetakan skema realistis sesuai kapasitas keuangan keluarga.',
    options: [
      { label: 'Harus 100% Fully Funded (Gratis total + Uang saku)', description: 'Mencakup SPP, tiket pesawat, asuransi, dan living allowance bulanan', value: 'full_funded' },
      { label: 'Kuliah Gratis SPP + Biaya hidup ditutup kerja paruh waktu', description: 'Model studi mandiri Jerman / Eropa dengan kombinasi student job resmi', value: 'free_tuition_work' },
      { label: 'Beasiswa Parsial / Subsidi potongan kuliah 50%', description: 'Keluarga siap menanggung sisa biaya hidup bulanan yang terjangkau', value: 'partial_funded' }
    ]
  },
  {
    id: 5,
    title: 'Preferensi lingkungan dan suasana negara mana yang paling Anda idamkan?',
    subtitle: 'Faktor adaptasi budaya sangat penting untuk kenyamanan belajar jangka panjang.',
    options: [
      { label: 'Eropa yang kaya sejarah & gratis biaya kuliah universitas', description: 'Sistem pendidikan terstruktur, akses keliling Schengen, standar teknologi tinggi', value: 'europe' },
      { label: 'Asia modern yang aman, tertib, dan teknologinya terdepan', description: 'Jepang atau Korea Selatan dengan lingkungan riset kondusif & komunitas ramah', value: 'east_asia' },
      { label: 'Kawasan berbahasa Inggris dengan upah kerja part-time tertinggi', description: 'Australia atau UK, sangat ramah multikultur dan kesempatan karir global', value: 'anglo' },
      { label: 'Negara jembatan Eropa-Asia dengan biaya hidup sangat hemat', description: 'Turki, mudah adaptasi makanan halal, bebas biaya asrama & makan', value: 'turkey' }
    ]
  },
  {
    id: 6,
    title: 'Di mana wilayah asal daerah domisili Anda di Indonesia?',
    subtitle: 'Beberapa beasiswa internasional memiliki kuota afirmasi prioritas khusus daerah luar Jawa.',
    options: [
      { label: 'Nusa Tenggara Barat (Lombok / Sumbawa) & NTT', description: 'Masuk wilayah afirmasi utama Australia Awards (AAS) & LPDP Daerah Afirmasi', value: 'nusatenggara', tag: 'Prioritas Afirmasi Tinggi' },
      { label: 'Sulawesi, Maluku, atau Papua', description: 'Memiliki nilai keunikan tinggi dalam esai komitmen pembangunan Indonesia Timur', value: 'timur' },
      { label: 'Sumatera atau Kalimantan', description: 'Peluang besar menarasikan hilirisasi SDA, agrikultur, dan mitigasi lingkungan', value: 'sumatera_kalimantan' },
      { label: 'Jawa & Bali', description: 'Persaingan meritokratis berbasis portofolio akademik dan inovasi kepemimpinan', value: 'jawa_bali' }
    ]
  }
];

export const QuizStudyFinder: React.FC<QuizStudyFinderProps> = ({ 
  onOpenBookingWithPackage 
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCalculated(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCalculated(false);
  };

  // Recommendation engine logic
  const resultData = React.useMemo(() => {
    const q1 = answers[1]; // S1, S2, S3
    const q2 = answers[2]; // STEM, Sosial, Bisnis, Kesehatan
    const q3 = answers[3]; // beginner, intermediate, advanced, multilingual
    const q4 = answers[4]; // full_funded, free_tuition_work, partial_funded
    const q5 = answers[5]; // europe, east_asia, anglo, turkey
    const q6 = answers[6]; // nusatenggara, timur, etc.

    let matchedCountryId = 'jepang';
    let countryReason = '';
    let topScholarships: Scholarship[] = [];
    let suggestedPackageId = 'scholarship-hunter';

    // Prioritize destination logic
    if (q5 === 'turkey' || (q3 === 'beginner' && q4 === 'full_funded' && q1 === 'S1')) {
      matchedCountryId = 'turki';
      countryReason = 'Turki adalah destinasi paling realistis dan ramah karena beasiswa Türkiye Bursları tidak mewajibkan sertifikat IELTS di awal, memberikan kursus bahasa Turki 1 tahun gratis, serta fasilitas asrama dan makan gratis.';
    } else if (q4 === 'free_tuition_work' || q5 === 'europe') {
      matchedCountryId = 'jerman';
      countryReason = 'Jerman menawarkan kuliah 100% bebas SPP di universitas negeri bereputasi dunia. Biaya hidup sangat rasional dan bisa ditutup lewat kerja paruh waktu resmi mahasiswa (Werkstudent).';
    } else if (q6 === 'nusatenggara' || q6 === 'timur' || q2 === 'Kesehatan' || q5 === 'anglo') {
      matchedCountryId = 'australia';
      countryReason = 'Sebagai talenta dari kawasan Indonesia Timur/NTB/NTT, Anda memiliki hak istimewa jalur Geographic Focus Area (GFA) pada beasiswa Australia Awards (AAS) dengan batas IELTS lebih ringan dan peluang lolos berlipat ganda.';
    } else if (q2 === 'STEM' || q5 === 'east_asia') {
      matchedCountryId = 'jepang';
      countryReason = 'Jepang adalah kiblat inovasi teknologi dengan beasiswa MEXT yang membiayai seluruh biaya kuliah plus tunjangan bulanan royal hingga tamat tanpa ikatan dinas.';
    } else {
      matchedCountryId = 'inggris';
      countryReason = 'Inggris menawarkan program Master ringkas 1 tahun dengan beasiswa Chevening yang sangat menghargai kepemimpinan kontekstual dari talenta daerah.';
    }

    const matchedCountry = COUNTRIES_DATA.find(c => c.id === matchedCountryId) || COUNTRIES_DATA[0];

    // Filter relevant scholarships
    topScholarships = SCHOLARSHIPS_DATA.filter(s => 
      s.country.toLowerCase().includes(matchedCountry.name.toLowerCase()) ||
      (q4 === 'full_funded' && s.fundingType === 'Fully Funded')
    ).slice(0, 3);

    // Recommended package
    if (q3 === 'beginner' || !q1) {
      suggestedPackageId = 'discovery-free';
    } else if (q4 === 'full_funded') {
      suggestedPackageId = 'scholarship-hunter';
    } else {
      suggestedPackageId = 'starter-consultation';
    }

    const matchedPackage = PACKAGES_DATA.find(p => p.id === suggestedPackageId) || PACKAGES_DATA[3];

    return {
      country: matchedCountry,
      reason: countryReason,
      scholarships: topScholarships,
      recPackage: matchedPackage,
      userRegion: q6 === 'nusatenggara' ? 'Nusa Tenggara (NTB / NTT)' : 'Luar Jawa / Regional'
    };
  }, [answers]);

  const currentQ = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2 flex items-center justify-center gap-1.5">
            <Compass className="w-4 h-4 text-slate-700" />
            <span>Interactive Study Matching Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Kuis "Cocok Kuliah di Mana?"
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Jawab 6 pertanyaan singkat untuk menemukan negara tujuan, skema beasiswa paling realistis, dan strategi bimbingan terbaik untuk profil asal daerah Anda.
          </p>
        </div>

        {!isCalculated ? (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
            
            {/* Progress Bar & Counter */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                <span>Pertanyaan {currentStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                <span className="tabular-nums font-bold text-slate-800">
                  {Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Selesai
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-900 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Title */}
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5">
                {currentQ.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                {currentQ.subtitle}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectOption(currentQ.id, opt.value)}
                    className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-4 ${
                      isSelected
                        ? 'bg-white border-slate-900 shadow-sm ring-1 ring-slate-900'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-100/50'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          {opt.label}
                        </span>
                        {opt.tag && (
                          <span className="text-[11px] font-medium text-slate-500">
                            · {opt.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected 
                        ? 'bg-slate-900 border-slate-900 text-white' 
                        : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`text-xs font-semibold py-2 px-4 rounded-lg transition-colors ${
                  currentStep === 0
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                Kembali
              </button>

              <div className="text-xs text-slate-400">
                Pilih opsi di atas untuk lanjut otomatis
              </div>
            </div>

          </div>
        ) : (
          /* RESULT SCREEN */
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Top Match Hero Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
              <div className="max-w-2xl relative z-10">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-slate-300" />
                  <span>Rekomendasi Utama Hasil Analisis Profil Anda</span>
                </div>

                <div className="flex items-center gap-3 my-3">
                  <span className="text-4xl" role="img" aria-label={resultData.country.name}>
                    {resultData.country.flag}
                  </span>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {resultData.country.name}
                    </h2>
                    <p className="text-xs text-slate-300">
                      {resultData.country.tagline}
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 sm:p-5 mt-4 text-xs sm:text-sm text-slate-200 leading-relaxed border border-white/10">
                  <strong className="text-white block mb-1">Mengapa cocok untuk Anda?</strong>
                  {resultData.reason}
                </div>

                {/* Country Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Biaya Hidup Rata-Rata</span>
                    <strong className="text-white">{resultData.country.avgLivingCostMonthly.idr} / bln</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Kerja Paruh Waktu</span>
                    <strong className="text-white">{resultData.country.partTimeWorkRules.allowedHours.split('(')[0]}</strong>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-slate-400 block text-[11px]">Syarat Bahasa</span>
                    <strong className="text-white truncate block">{resultData.country.languageRequirements.english.split('(')[0]}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Scholarships for this result */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Beasiswa yang Paling Cocok untuk Profil Anda
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Berdasarkan kombinasi jenjang dan pembiayaan yang Anda pilih:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resultData.scholarships.map((sch) => (
                  <div key={sch.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{sch.flag} {sch.country}</span>
                      <span className="font-semibold text-slate-800">{sch.fundingType}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{sch.name}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2">{sch.summary}</p>
                    <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                      Deadline: <strong>{sch.applicationPeriod.deadline}</strong> · Kesulitan: {sch.difficulty}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Package Consultation Action (Upsell) */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                  Paket Pendampingan yang Disarankan
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {resultData.recPackage.name} ({resultData.recPackage.priceFormatted})
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {resultData.recPackage.tagline}. Termasuk: {resultData.recPackage.features.slice(0, 3).join(', ')}.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi Kuis</span>
                </button>

                <button
                  onClick={() => onOpenBookingWithPackage(resultData.recPackage.id, `Hasil Kuis: Rekomendasi ${resultData.country.name}`)}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Konsultasikan Hasil Kuis Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

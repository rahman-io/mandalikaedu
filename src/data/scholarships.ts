export interface Scholarship {
  id: string;
  name: string;
  organizer: string;
  country: string;
  flag: string;
  level: ('S1' | 'S2' | 'S3' | 'Riset')[];
  fundingType: 'Fully Funded' | 'Partial' | 'Tuition Waiver';
  coverage: string[];
  fieldsOfStudy: string[];
  requirements: {
    gpa: string;
    language: string;
    maxAge?: string;
    workExperience?: string;
    documents: string[];
  };
  applicationPeriod: {
    open: string;
    deadline: string;
    deadlineStatus: 'open' | 'closing_soon' | 'upcoming';
  };
  officialUrl: string;
  difficulty: 'Moderat' | 'Kompetitif' | 'Sangat Kompetitif';
  lastVerified: string;
  summary: string;
  tipsMandalika: string;
  quota: string;
  selectionStages: string[];
}

export const SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    id: 'mext-japan',
    name: 'MEXT Scholarship (Monbukagakusho)',
    organizer: 'Kementerian Pendidikan, Budaya, Olahraga, Sains & Teknologi Jepang',
    country: 'Jepang',
    flag: '🇯🇵',
    level: ['S1', 'S2', 'S3', 'Riset'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah (Tuition fee) 100% lunas',
      'Uang saku bulanan ¥143.000 - ¥148.000 (~Rp 15-16 juta/bulan)',
      'Tiket pesawat PP Indonesia - Jepang',
      'Kursus persiapan bahasa Jepang intensif 6 bulan',
      'Bebas biaya ujian masuk universitas'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Ekonomi', 'Kedokteran & Kesehatan', 'Seni & Desain'],
    requirements: {
      gpa: 'Minimal 3.20 / 4.00 (atau rata-rata rapor 84 untuk S1)',
      language: 'TOEFL ITP min 550 / iBT 80 / IELTS 6.0 atau sertifikat JLPT (N2/N3 diutamakan)',
      maxAge: 'Maksimal 34 tahun saat mendaftar (untuk S2/S3)',
      workExperience: 'Tidak wajib, namun relevan untuk pelamar riset',
      documents: [
        'Formulir pendaftaran resmi MEXT',
        'Field of Study and Research Plan (Proposal Riset)',
        'Salinan Ijazah & Transkrip Akademik Berbahasa Inggris',
        'Surat Rekomendasi dari Dekan/Dosen Pembimbing',
        'Sertifikat Kemampuan Bahasa (Inggris/Jepang)',
        'Abstrak Skripsi/Tesis'
      ]
    },
    applicationPeriod: {
      open: 'April 2026',
      deadline: 'Mei 2026',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://www.id.emb-japan.go.jp/sch.html',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-03-20',
    summary: 'Beasiswa paling prestisius dari pemerintah Jepang dengan pembiayaan penuh tanpa ikatan dinas kembali ke tanah air, terbuka bagi jalur Kedutaan (Embassy) maupun Universitas (U-to-U).',
    tipsMandalika: 'Kunci lolos MEXT terletak pada "Research Plan" yang selaras dengan laboratorium profesor target di Jepang. Untuk anak daerah, tunjukkan kontribusi riset Anda terhadap pemecahan masalah lokal di Indonesia.',
    quota: '± 200 mahasiswa dari Indonesia per tahun',
    selectionStages: ['Seleksi Berkas Dokumen', 'Ujian Tertulis (Bahasa Inggris & Jepang)', 'Wawancara Kedutaan Besar Jepang', 'Pencarian Letter of Acceptance (LoA)', 'Pengumuman Final MEXT Tokyo']
  },
  {
    id: 'daad-epos-germany',
    name: 'DAAD EPOS (Development-Related Postgraduate Courses)',
    organizer: 'Deutscher Akademischer Austauschdienst (Pemerintah Federal Jerman)',
    country: 'Jerman',
    flag: '🇩🇪',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Bebas biaya kuliah di universitas negeri Jerman',
      'Uang saku bulanan €934 untuk Master, €1.300 untuk Doktor (~Rp 16-22 juta/bulan)',
      'Asuransi kesehatan komprehensif, kecelakaan & tanggung jawab hukum',
      'Tunjangan perjalanan tiket pesawat PP',
      'Subsidi sewa bulanan dan tunjangan pendamping keluarga (kondisional)'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Ekonomi', 'Lingkungan & Pertanian', 'Kesehatan Masyarakat'],
    requirements: {
      gpa: 'Minimal IPK 3.00 / 4.00 dengan predikat memuaskan',
      language: 'IELTS minimal 6.0 / 6.5 (program pengantar Inggris) atau DSH-2 / TestDaF 4 (program pengantar Jerman)',
      maxAge: 'Gelar sarjana tidak lebih dari 6 tahun saat mendaftar',
      workExperience: 'Wajib memiliki pengalaman kerja minimal 2 tahun di bidang relevan',
      documents: [
        'DAAD Application Form',
        'Europass CV bertanda tangan manual',
        'Hand-signed Motivation Letter (maks 2 halaman) dengan referensi pekerjaan',
        'Letter of Recommendation dari atasan kerja saat ini',
        'Academic Recommendation dari dosen pembimbing kampus',
        'Surat keterangan kerja (Certificate of Employment)'
      ]
    },
    applicationPeriod: {
      open: 'Agustus 2026',
      deadline: 'Oktober 2026',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-03-18',
    summary: 'Beasiswa khusus bagi profesional muda dari negara berkembang untuk menempuh program Master/Doktor di universitas terkemuka Jerman dalam disiplin yang berdampak bagi pembangunan.',
    tipsMandalika: 'DAAD EPOS sangat menghargai pelamar yang bekerja di instansi daerah (Bappeda, LSM lokal, puskesmas, kampus regional). Tuliskan dalam esai bagaimana studi Anda akan diaplikasikan di daerah asal.',
    quota: '± 50 penerima dari Indonesia',
    selectionStages: ['Pendaftaran langsung ke kampus mitra Jerman', 'Pra-seleksi komite universitas', 'Verifikasi & nominasi oleh kantor DAAD Bonn', 'Award letter resmi']
  },
  {
    id: 'chevening-uk',
    name: 'Chevening Scholarship UK',
    organizer: 'Foreign, Commonwealth & Development Office (FCDO) Pemerintah Inggris',
    country: 'Inggris',
    flag: '🇬🇧',
    level: ['S2'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah Master 1 tahun penuh di seluruh universitas UK ternama',
      'Uang saku bulanan standar London / luar London (£1.100 - £1.400 / ~Rp 22-28 juta/bulan)',
      'Tiket pesawat PP kelas ekonomi ke dan dari Inggris',
      'Biaya visa pelajar Inggris (Student Visa)',
      'Tunjangan kedatangan dan kepulangan (Arrival & departure allowance)'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Ekonomi', 'Kebijakan Publik & Hukum', 'Media & Kreatif'],
    requirements: {
      gpa: 'Setara dengan UK 2:1 Honours degree (IPK Indonesia min ~3.20)',
      language: 'IELTS min 6.5 (tidak ada band < 5.5) / sesuai syarat kampus UK yang dipilih',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Minimal 2.800 jam kerja (sekitar 2 tahun pengalaman kerja purnawaktu/paruh waktu)',
      documents: [
        '4 Esai Wajib: Leadership & Influence, Networking, Studying in the UK, Career Plan',
        '2 Surat Rekomendasi Profesional / Akademik',
        'Ijazah & Transkrip Resmi',
        '3 Pilihan Program Master di UK',
        'Paspor yang masih berlaku minimal 18 bulan'
      ]
    },
    applicationPeriod: {
      open: 'Agustus 2026',
      deadline: 'November 2026',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.chevening.org/scholarship/indonesia/',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-03-22',
    summary: 'Program beasiswa global bergengsi pemerintah Inggris untuk melahirkan pemimpin masa depan, pembuat kebijakan, dan profesional visioner.',
    tipsMandalika: 'Banyak alumni Chevening berasal dari daerah luar Jawa! Kuncinya adalah memberikan contoh nyata "leadership in action" yang kontekstual dengan kondisi daerah Anda menggunakan kerangka STAR (Situation, Task, Action, Result).',
    quota: '± 45-55 penerima dari Indonesia per tahun',
    selectionStages: ['Aplikasi Online & 4 Esai', 'Reading Committee Assessment', 'Interview di Kedutaan Besar Inggris Jakarta', 'Pengunggahan LoA Unconditional & Verifikasi Final']
  },
  {
    id: 'australia-awards-aas',
    name: 'Australia Awards Scholarships (AAS)',
    organizer: 'Departemen Luar Negeri dan Perdagangan (DFAT) Australia',
    country: 'Australia',
    flag: '🇦🇺',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Full tuition fee di universitas terkemuka Australia (Group of Eight & lainnya)',
      'Uang saku bulanan (Contribution to Living Expenses / CLE) AUD ~2.500/bulan (~Rp 26 juta)',
      'Tiket penerbangan PP Indonesia - Australia',
      'Asuransi Overseas Student Health Cover (OSHC)',
      'Pelatihan bahasa Inggris intensif (Pre-Departure Training / PDT) gratis di Bali/Jakarta'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Ekonomi', 'Kesehatan & Gizi', 'Maritim & Kelautan'],
    requirements: {
      gpa: 'IPK min 2.90 untuk pelamar umum; KHUSUS wilayah target daerah (NTB, NTT, Maluku, Papua) min IPK 2.75',
      language: 'IELTS min 5.5 (untuk pelamar daerah target geografis) atau 6.0 untuk umum',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Pengalaman kerja relevan diutamakan',
      documents: [
        'Salinan KTP & Akta Kelahiran',
        'Ijazah dan Transkrip S1/S2',
        'Sertifikat IELTS/TOEFL resmi yang masih berlaku',
        'Formulir Aplikasi AAS & Jawaban Pertanyaan Reflektif',
        'Curriculum Vitae terbaru',
        'Surat rekomendasi instansi / akademisi'
      ]
    },
    applicationPeriod: {
      open: 'Februari 2026',
      deadline: 'April 2026',
      deadlineStatus: 'closing_soon'
    },
    officialUrl: 'https://www.australiaawardsindonesia.org/',
    difficulty: 'Kompetitif',
    lastVerified: '2026-03-25',
    summary: 'Beasiswa tertua dan paling inklusif di Indonesia, dengan kuota khusus afirmasi untuk pelamar dari kawasan Indonesia Timur (termasuk NTB & NTT) serta penyandang disabilitas.',
    tipsMandalika: 'Sebagai anak daerah NTB/NTT/Indonesia Timur, Anda masuk Kategori Geographic Focus Area (GFA) dengan syarat IELTS lebih lunak (5.5) dan peluang lolos jauh lebih tinggi dibanding pelamar umum kota besar!',
    quota: '± 200 penerima dari Indonesia tiap tahun',
    selectionStages: ['Seleksi Berkas Online Oasis', 'Shortlisting & Uji IELTS Tambahan', 'Joint Selection Team (JST) Interview', 'Pre-Departure Training (PDT) di Indonesia', 'Keberangkatan ke Australia']
  },
  {
    id: 'turkiye-burslari-ytb',
    name: 'Türkiye Bursları Scholarship (YTB)',
    organizer: 'Presidency for Turks Abroad and Related Communities (Pemerintah Turki)',
    country: 'Turki',
    flag: '🇹🇷',
    level: ['S1', 'S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Gratis biaya kuliah 100% di universitas negeri top Turki',
      'Akomodasi asrama mahasiswa gratis lengkap dengan makan harian',
      'Uang saku bulanan (S1: 3.500 TL, S2: 5.000 TL, S3: 6.500 TL)',
      'Tiket pesawat PP Indonesia - Turki (sekali saat datang dan saat lulus)',
      'Asuransi kesehatan publik gratis',
      'Kursus bahasa Turki (TÖMER) gratis selama 1 tahun penuh'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Ekonomi', 'Kedokteran & Farmasi', 'Studi Islam & Hubungan Internasional'],
    requirements: {
      gpa: 'Minimal 70% untuk S1, 75% untuk S2/S3, dan 90% khusus rumpun Kedokteran',
      language: 'Tidak wajib sertifikat bahasa Inggris jika memilih jurusan berbahasa Turki',
      maxAge: 'Di bawah 21 tahun (S1), di bawah 30 tahun (S2), di bawah 35 tahun (S3)',
      workExperience: 'Tidak dipersyaratkan',
      documents: [
        'KTP / Paspor',
        'Foto profil formal',
        'Ijazah & Transkrip Nilai Terjemahan',
        'Letter of Intent / Esai Rencana Studi',
        'Surat Rekomendasi (Akademik / Organisasi)',
        'Sertifikat prestasi / piagam penghargaan daerah atau nasional'
      ]
    },
    applicationPeriod: {
      open: 'Januari 2026',
      deadline: 'Februari 2026',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://www.turkiyeburslari.gov.tr/',
    difficulty: 'Moderat',
    lastVerified: '2026-03-10',
    summary: 'Beasiswa yang sangat ramah bagi lulusan SMA/SMK dan sarjana daerah yang ingin kuliah gratis ke Eropa-Asia tanpa wajib memiliki sertifikat IELTS di awal.',
    tipsMandalika: 'Turki sangat ramah bagi anak daerah karena mencakup asrama dan makan gratis. Kuncinya pada Letter of Intent yang menunjukkan rasa hormat pada hubungan diplomasi Indonesia-Turki dan rencana karir yang spesifik.',
    quota: '± 80-100 mahasiswa dari Indonesia',
    selectionStages: ['Pendaftaran Online TBBS', 'Pemeriksaan Berkas & Prestasi', 'Wawancara Tatap Muka di Jakarta/Aceh/Online', 'Pengumuman Final & Pengurusan Visa']
  },
  {
    id: 'gks-korea',
    name: 'Global Korea Scholarship (GKS / KGSP)',
    organizer: 'National Institute for International Education (NIIED) Korea Selatan',
    country: 'Korea Selatan',
    flag: '🇰🇷',
    level: ['S1', 'S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya SPP kuliah 100% lunas sampai tamat',
      'Uang saku bulanan 1.000.000 - 1.500.000 KRW (~Rp 12-18 juta/bulan)',
      'Tiket pesawat PP Indonesia - Korea',
      'Kursus bahasa Korea intensif 1 tahun sebelum perkuliahan',
      'Tunjangan awal pemukiman 200.000 KRW & tunjangan publikasi riset',
      'Asuransi kesehatan nasional Korea (NHIS)'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Ekonomi', 'K-Culture & Desain', 'Teknologi Informasi'],
    requirements: {
      gpa: 'Minimal nilai kumulatif 80% atau IPK 3.00 dari 4.00',
      language: 'Tidak wajib IELTS/TOPIK, namun memiliki sertifikat memberikan poin bonus signifikan',
      maxAge: 'Maks 25 tahun untuk S1; Maks 40 tahun untuk S2/S3',
      workExperience: 'Tidak wajib',
      documents: [
        'Formulir resmi NIIED GKS',
        'Personal Statement',
        'Statement of Purpose (Study Plan & Future Career)',
        '2 Surat Rekomendasi bertanda tangan tertutup (amplop bersegel)',
        'Medical Assessment Form',
        'Kartu Keluarga dan Akta Lahir (bukti kewarganegaraan)'
      ]
    },
    applicationPeriod: {
      open: 'September 2026 (S1) / Februari 2026 (S2)',
      deadline: 'Oktober 2026 (S1) / Maret 2026 (S2)',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://www.studyinkorea.go.kr/',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-03-24',
    summary: 'Beasiswa bergengsi dari pemerintah Korea Selatan untuk studi di universitas ternama (SKY University dan kampus riset regional terkemuka) dengan fasilitasi bahasa Korea 1 tahun.',
    tipsMandalika: 'Jika mendaftar melalui University Track (jalur kampus regional Korea), peluang lolos pelamar Indonesia jauh lebih besar daripada jalur Embassy Track yang diperebutkan ribuan pelamar!',
    quota: '± 70 mahasiswa dari Indonesia per tahun',
    selectionStages: ['Seleksi Tahap 1 (Kedutaan / Universitas)', 'Seleksi Tahap 2 (NIIED Pusat Seoul)', 'Seleksi Tahap 3 (Penerimaan Departemen Kampus)', 'Pemberangkatan']
  },
  {
    id: 'erasmus-mundus',
    name: 'Erasmus Mundus Joint Masters (EMJM)',
    organizer: 'Uni Eropa (European Commission)',
    country: 'Uni Eropa',
    flag: '🇪🇺',
    level: ['S2'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah penuh di 2-4 universitas negara Eropa berbeda selama 2 tahun',
      'Uang saku bulanan bebas pajak €1.400 / bulan (~Rp 24 juta/bulan)',
      'Tunjangan perjalanan dan instalasi internasional',
      'Asuransi kesehatan lengkap di seluruh negara anggota Schengen',
      'Mendapatkan gelar ganda (Double Degree / Joint Degree) Eropa'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Lingkungan & Energi', 'Data Science & AI', 'Pertanian Berkelanjutan'],
    requirements: {
      gpa: 'IPK minimal 3.25 / 4.00',
      language: 'IELTS min 6.5 (beberapa program meminta min 7.0)',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Pengalaman riset / magang relevan sangat dihargai',
      documents: [
        'Curriculum Vitae format Europass',
        'Motivation Letter berorientasi mobilitas internasional',
        '2 Surat Rekomendasi Dosen / Kolega Riset',
        'Transkrip nilai dan ijazah bahasa Inggris',
        'Proof of Residence (surat keterangan domisili)'
      ]
    },
    applicationPeriod: {
      open: 'Oktober 2026',
      deadline: 'Januari 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://erasmus-plus.ec.europa.eu/',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-03-12',
    summary: 'Program Master gabungan Eropa di mana Anda belajar di minimal 2 negara Eropa berbeda (misal semester 1 di Prancis, semester 2 di Jerman, semester 3 di Spanyol).',
    tipsMandalika: 'Pelamar dari Indonesia sangat berpeluang karena Uni Eropa memiliki kuota khusus "Partner Countries" (Kawasan Asia Tenggara). Sorot kesiapan Anda beradaptasi di lingkungan multikultural.',
    quota: '± 80-100 mahasiswa dari Indonesia',
    selectionStages: ['Pendaftaran konsorsium program', 'Evaluasi portofolio akademik & esai', 'Interview daring', 'Nominasi Komisi Uni Eropa']
  },
  {
    id: 'deutschlandstipendium',
    name: 'Deutschlandstipendium Jerman',
    organizer: 'Pemerintah Federal Jerman & Mitra Industri / Yayasan Swasta',
    country: 'Jerman',
    flag: '🇩🇪',
    level: ['S1', 'S2'],
    fundingType: 'Partial',
    coverage: [
      'Bebas biaya SPP (Universitas negeri Jerman gratis)',
      'Uang tunjangan saku tunai €300 / bulan sebagai penopang living cost',
      'Akses program mentoring eksklusif dan jejaring perusahaan Jerman',
      'Dapat dikombinasikan dengan kerja paruh waktu resmi mahasiswa (20 jam/minggu)'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Bisnis & Ekonomi', 'Sosial & Humaniora', 'Sains Komputasi'],
    requirements: {
      gpa: 'Prestasi akademik di atas rata-rata (IPK setara 3.3+)',
      language: 'Sesuai bahasa pengantar kuliah (Inggris IELTS 6.5 atau Jerman B2/C1)',
      maxAge: 'Tidak ada batasan',
      workExperience: 'Keterlibatan sosial & organisasi kemasyarakatan bernilai tinggi',
      documents: [
        'Surat penerimaan kuliah (Zulassungsbescheid) di kampus Jerman',
        'CV Akademik ringkas',
        'Motivation Letter',
        'Bukti keterlibatan organisasi / relawan sosial di daerah asal'
      ]
    },
    applicationPeriod: {
      open: 'Juni 2026',
      deadline: 'Agustus 2026',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.deutschlandstipendium.de/',
    difficulty: 'Moderat',
    lastVerified: '2026-03-15',
    summary: 'Beasiswa kemitraan publik-swasta terbesar di Jerman yang terbuka untuk mahasiswa internasional di universitas negeri Jerman, sangat ideal melengkapi biaya hidup hemat.',
    tipsMandalika: 'Karena kuliah di Jerman pada dasarnya gratis SPP, Deutschlandstipendium ini sangat cocok bagi yang ingin hidup mandiri di Jerman dengan kombinasi kerja werkstudent.',
    quota: 'Ribuan kuota di seluruh kampus Jerman',
    selectionStages: ['Pendaftaran via portal universitas tempat diterima', 'Seleksi komite beasiswa universitas', 'Awarding']
  },
  {
    id: 'nl-scholarship',
    name: 'NL Scholarship (Holland Scholarship)',
    organizer: 'Kementerian Pendidikan, Kebudayaan dan Ilmu Pengetahuan Belanda',
    country: 'Belanda',
    flag: '🇳🇱',
    level: ['S1', 'S2'],
    fundingType: 'Partial',
    coverage: [
      'Dana bantuan biaya kuliah sebesar €5.000 atau €10.000 pada tahun pertama studi',
      'Meringankan secara signifikan tuition fee universitas riset & sains terapan Belanda'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Bisnis & Ekonomi', 'Sosial & Humaniora', 'Pertanian & Pengelolaan Air'],
    requirements: {
      gpa: 'IPK minimal 3.25',
      language: 'IELTS min 6.5 (writing min 6.0)',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Tidak wajib untuk S1, dianjurkan untuk S2',
      documents: [
        'Bukti pendaftaran program gelar di universitas Belanda yang berpartisipasi',
        'Motivation letter khusus NL Scholarship',
        'CV dan portofolio prestasi'
      ]
    },
    applicationPeriod: {
      open: 'November 2026',
      deadline: 'Februari 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.studyinnl.org/finances/nl-scholarship',
    difficulty: 'Moderat',
    lastVerified: '2026-03-01',
    summary: 'Beasiswa pendanaan parsial bergengsi dari pemerintah Belanda untuk mahasiswa berprestasi dari luar Kawasan Ekonomi Eropa (EEA).',
    tipsMandalika: 'Daftar sedini mungkin ke universitas tujuan Belanda (seperti Wageningen, TU Delft, Leiden) karena kuota NL Scholarship dialokasikan berdasar kecepatan dan keunggulan esai pelamar.',
    quota: '± 2.000 kuota global',
    selectionStages: ['Aplikasi ke universitas Belanda', 'Pengajuan NL Scholarship form', 'Keputusan fakultas']
  },
  {
    id: 'mitsui-bussan-s1',
    name: 'Mitsui-Bussan Scholarship for Indonesia',
    organizer: 'Mitsui & Co., Ltd. Japan',
    country: 'Jeng',
    flag: '🇯🇵',
    level: ['S1'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah penuh S1 di Jepang (termasuk 1.5 tahun sekolah bahasa Jepang di Tokyo)',
      'Tunjangan biaya hidup bulanan ¥145.000 (~Rp 15.5 juta/bulan)',
      'Tiket pesawat PP Indonesia-Jepang',
      'Tunjangan kedatangan ¥50.000',
      'Asuransi kesehatan dan kecelakaan penuh'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Bisnis & Ekonomi', 'Sosial & Humaniora'],
    requirements: {
      gpa: 'Nilai rapor SMA/SMK minimal 80 untuk Matematika dan Bahasa Inggris',
      language: 'Kemampuan dasar bahasa Inggris, tidak wajib bisa bahasa Jepang saat mendaftar',
      maxAge: 'Berusia di bawah 20 tahun dan belum menikah',
      workExperience: 'Lulusan SMA/SMK sederajat',
      documents: [
        'Formulir pendaftaran daring',
        'Rapor SMA semester 1 sampai semester 5/6',
        'Surat rekomendasi dari Kepala Sekolah / Guru',
        'Karya tulis / esai motivasi'
      ]
    },
    applicationPeriod: {
      open: 'Februari 2026',
      deadline: 'Maret 2026',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://www.mbk-scholarship-id.com/',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-03-16',
    summary: 'Beasiswa swasta Jepang paling bergengsi khusus lulusan SMA/SMK Indonesia untuk kuliah S1 di universitas negeri terkemuka di Jepang dengan pendampingan bahasa intensif di Tokyo.',
    tipsMandalika: 'Hanya meloloskan 2-3 orang per tahun di seluruh Indonesia, namun MandalikaEdu memiliki panduan khusus ujian matematika logika dan trik wawancara panelis Jepang.',
    quota: '2 - 3 siswa per tahun se-Indonesia',
    selectionStages: ['Seleksi Dokumen Rapor', 'Ujian Tertulis (Matematika & Bahasa Inggris)', 'Tes Bakat Skolastik & Kesehatan', 'Wawancara Final dengan Dewan Direksi Mitsui']
  },
  {
    id: 'france-excellence',
    name: 'France Excellence Scholarship',
    organizer: 'Institut Français d’Indonésie (IFI) & Kedutaan Besar Prancis',
    country: 'Prancis',
    flag: '🇫🇷',
    level: ['S1', 'S2'],
    fundingType: 'Fully Funded',
    coverage: [
      'Pembebasan biaya kuliah (biaya registrasi institusi publik Prancis)',
      'Uang saku bulanan €860/bulan (~Rp 14.5 juta/bulan)',
      'Tiket pesawat PP Indonesia - Prancis',
      'Bantuan akomodasi mahasiswa (subsidi CAF Prancis)',
      'Bebas biaya visa pelajar Prancis'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Seni & Arsitektur', 'Sosial & Humaniora', 'Bisnis & Manajemen', 'Gastronomi'],
    requirements: {
      gpa: 'IPK minimal 3.20 (S2) atau rata-rata rapor 85 (S1)',
      language: 'DELF/DALF B2 (jurusan bahasa Prancis) atau IELTS min 6.5 (jurusan bahasa Inggris)',
      maxAge: 'Maks 30 tahun',
      workExperience: 'Tidak wajib',
      documents: [
        'Attestation d’admission / LoA dari universitas di Prancis',
        'Curriculum Vitae',
        'Motivation Letter',
        'Ijazah & Transkrip terjemahan tersumpah'
      ]
    },
    applicationPeriod: {
      open: 'Maret 2026',
      deadline: 'Mei 2026',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://www.ifi-id.com/fr/programmes-de-bourses/',
    difficulty: 'Kompetitif',
    lastVerified: '2026-03-14',
    summary: 'Beasiswa resmi pemerintah Prancis untuk mahasiswa Indonesia berprestasi tinggi yang ingin melanjutkan studi sarjana atau magister di Prancis.',
    tipsMandalika: 'Prancis memiliki banyak program magister berbahasa Inggris 100%. Jangan ragu mendaftar meski belum lancar berbahasa Prancis!',
    quota: '± 40 mahasiswa per tahun',
    selectionStages: ['Pendaftaran via portal IFI', 'Seleksi Berkas Dokumen', 'Wawancara Daring dengan Tim Ahli IFI', 'Pengumuman Penerima']
  },
  {
    id: 'fulbright-usa',
    name: 'Fulbright Master & PhD Degree Scholarship',
    organizer: 'AMINEF (American Indonesian Exchange Foundation)',
    country: 'Amerika Serikat',
    flag: '🇺🇸',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah penuh (tuition & fees) di universitas Amerika Serikat',
      'Tunjangan hidup bulanan disesuaikan dengan biaya kota di AS ($1.800 - $2.800/bulan)',
      'Tiket pesawat PP Indonesia - AS',
      'Asuransi kesehatan kecelakaan AS (ASPE)',
      'Tunjangan buku, perlengkapan studi, dan konferensi profesional'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Kebijakan Publik', 'Pendidikan & Linguistik', 'Lingkungan Hidup'],
    requirements: {
      gpa: 'IPK minimal 3.00 pada skala 4.00',
      language: 'TOEFL ITP minimal 550 / iBT 80 / IELTS 6.5 / Duolingo 110',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Diutamakan memiliki komitmen pengabdian bagi Indonesia',
      documents: [
        'Formulir pendaftaran resmi AMINEF',
        'Study Objective Essay (maks 500 kata)',
        'Personal Statement Essay (maks 500 kata)',
        '3 Surat Rekomendasi (akademik/profesional)',
        'Salinan Ijazah dan Transkrip Akademik Berbahasa Inggris'
      ]
    },
    applicationPeriod: {
      open: 'Desember 2025',
      deadline: 'Februari 2026',
      deadlineStatus: 'closing_soon'
    },
    officialUrl: 'https://www.aminef.or.id/grants-for-indonesians/',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-03-21',
    summary: 'Beasiswa ke AS paling prestisius dengan jejaring alumni terkuat di dunia, mengedepankan pertukaran budaya dan kontribusi pembangunan sosial di tanah air.',
    tipsMandalika: 'Fulbright sangat menyukai kandidat yang memiliki jiwa kepemimpinan komunitas di luar kota metropolitan. Ceritakan kiprah nyata Anda di daerah asal dalam Personal Statement!',
    quota: '± 35 mahasiswa Master & Doktor per tahun',
    selectionStages: ['Seleksi Administrasi Berkas', 'Wawancara Panel Gabungan Indonesia-AS', 'Tes Resmi TOEFL iBT & GRE dibiayai AMINEF', 'Penempatan Universitas di AS (University Placement)']
  }
];

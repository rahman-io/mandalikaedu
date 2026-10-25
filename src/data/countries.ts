export interface CountryDetail {
  id: string;
  name: string;
  flag: string;
  tagline: string;
  capital: string;
  currency: string;
  currencyRateIdr: number; // e.g. 1 EUR = ~17000 IDR
  avgLivingCostMonthly: {
    eurOrLocal: string;
    idr: string;
    breakdown: {
      rent: string;
      food: string;
      insurance: string;
      transport: string;
    };
  };
  tuitionFeeInfo: string;
  languageRequirements: {
    english: string;
    localLanguage: string;
    notes: string;
  };
  popularUniversities: {
    name: string;
    city: string;
    highlight: string;
  }[];
  partTimeWorkRules: {
    allowedHours: string;
    hourlyWage: string;
    monthlyEarningPotential: string;
  };
  availableScholarships: string[];
  regionalStudentFriendly: string;
  visaRequirementsSummary: string;
}

export const COUNTRIES_DATA: CountryDetail[] = [
  {
    id: 'jepang',
    name: 'Jepang',
    flag: '🇯🇵',
    tagline: 'Pusat Inovasi Teknologi Dunia & Kesempatan Beasiswa Terbesar',
    capital: 'Tokyo',
    currency: 'JPY (¥)',
    currencyRateIdr: 105,
    avgLivingCostMonthly: {
      eurOrLocal: '¥90.000 - ¥130.000',
      idr: 'Rp 9.500.000 - Rp 13.600.000',
      breakdown: {
        rent: '¥40.000 - ¥60.000 (asrama/apartemen)',
        food: '¥30.000 - ¥40.000',
        insurance: '¥2.000 (Asuransi Kesehatan Nasional Kokumin Kenko Hoken)',
        transport: '¥10.000 (diskon komuter mahasiswa)'
      }
    },
    tuitionFeeInfo: 'Universitas negeri standar (National Universities): ¥535.800/tahun (~Rp 56 juta/tahun). Namun sebagian besar mahasiswa internasional mendapat potongan 50% hingga 100% (tuition exemption) atau full beasiswa MEXT.',
    languageRequirements: {
      english: 'TOEFL iBT 80+ / IELTS 6.0+ (untuk program English-taught)',
      localLanguage: 'JLPT N2/N1 (untuk program Japanese-taught) atau kursus dasar bagi pelamar MEXT',
      notes: 'Banyak universitas riset menyediakan program berbahasa Inggris (SGU/Global 30) tanpa wajib JLPT di awal.'
    },
    popularUniversities: [
      { name: 'The University of Tokyo (Todai)', city: 'Tokyo', highlight: 'Peringkat #1 Jepang, pusat sains & teknologi' },
      { name: 'Kyoto University', city: 'Kyoto', highlight: 'Kampus peraih Nobel terbanyak di Asia' },
      { name: 'Tokyo Institute of Technology (Science Tokyo)', city: 'Tokyo', highlight: 'Paling diminati insinyur & ilmuwan STEM' },
      { name: 'Osaka University', city: 'Osaka', highlight: 'Riset kedokteran & bioteknologi kelas dunia' },
      { name: 'Tohoku University', city: 'Sendai', highlight: 'Pusat material science & robotika ramah mahasiswa asing' }
    ],
    partTimeWorkRules: {
      allowedHours: '28 jam per minggu saat masa kuliah, hingga 40 jam per minggu saat libur semester',
      hourlyWage: '¥1.050 - ¥1.300 / jam (~Rp 110.000 - Rp 136.000 / jam)',
      monthlyEarningPotential: '¥110.000 - ¥140.000 (~Rp 11.5 - 14.7 juta/bulan, cukup menutup biaya hidup mandiri)'
    },
    availableScholarships: ['MEXT Scholarship (S1/S2/S3)', 'Mitsui Bussan Scholarship (S1)', 'ADB-JSP Asian Development Bank', 'Rotary Yoneyama Scholarship'],
    regionalStudentFriendly: 'Komunitas Persatuan Pelajar Indonesia (PPI) Jepang sangat guyub dan menyambut hangat mahasiswa dari berbagai pelosok daerah. Suasana kampus sangat aman dan sistem beasiswanya sangat terstruktur.',
    visaRequirementsSummary: 'Certificate of Eligibility (CoE) dari kampus Jepang, paspor, foto, dan formulir aplikasi visa di VFS/Kedutaan Jepang.'
  },
  {
    id: 'jerman',
    name: 'Jerman',
    flag: '🇩🇪',
    tagline: 'Kuliah Gratis di Jantung Eropa & Standar Rekayasa Tertinggi',
    capital: 'Berlin',
    currency: 'EUR (€)',
    currencyRateIdr: 17300,
    avgLivingCostMonthly: {
      eurOrLocal: '€850 - €992',
      idr: 'Rp 14.700.000 - Rp 17.200.000',
      breakdown: {
        rent: '€350 - €500 (Studentenwohnheim asrama mahasiswa)',
        food: '€200 - €250',
        insurance: '€125 (Asuransi kesehatan wajib TK / AOK)',
        transport: 'Gratis/Termasuk Semesterticket (keliling 1 negara bagian)'
      }
    },
    tuitionFeeInfo: 'GRATIS 100% SPP di hampir seluruh universitas negeri (hanya membayar Semesterbeitrag administrasi €150-€350 per semester yang sudah termasuk tiket transportasi umum).',
    languageRequirements: {
      english: 'IELTS 6.5+ / TOEFL iBT 90+ untuk International Master Program',
      localLanguage: 'TestDaF Level 4 / DSH 2 / Goethe C1 jika mengambil program sarjana berbahasa Jerman',
      notes: 'Untuk jenjang Master, tersedia lebih dari 2.000 program studi yang 100% menggunakan bahasa pengantar Inggris.'
    },
    popularUniversities: [
      { name: 'Technical University of Munich (TUM)', city: 'Munich', highlight: 'Peringkat teratas teknik & inovasi Eropa' },
      { name: 'RWTH Aachen University', city: 'Aachen', highlight: 'Kiblat insinyur mesin dan manufaktur dunia' },
      { name: 'Heidelberg University', city: 'Heidelberg', highlight: 'Universitas tertua di Jerman, unggul kedokteran & humaniora' },
      { name: 'Humboldt University of Berlin', city: 'Berlin', highlight: 'Pusat riset ilmu sosial, filsafat, dan sains' },
      { name: 'Karlsruhe Institute of Technology (KIT)', city: 'Karlsruhe', highlight: 'Pusat riset komputasi dan teknik elektro' }
    ],
    partTimeWorkRules: {
      allowedHours: '140 hari penuh atau 280 hari setengah per tahun (setara 20 jam/minggu sebagai Werkstudent)',
      hourlyWage: '€12.82 - €16.00 / jam (~Rp 220.000 - Rp 275.000 / jam)',
      monthlyEarningPotential: '€800 - €1.100 (~Rp 13.8 - 19 juta/bulan, menutup 100% living cost)'
    },
    availableScholarships: ['DAAD EPOS (S2/S3)', 'DAAD Helmut Schmidt (Kebijakan Publik)', 'Deutschlandstipendium (€300/bulan)', 'Heinrich Böll Foundation'],
    regionalStudentFriendly: 'Karena kuliahnya gratis, ini adalah pintu masuk paling rasional bagi keluarga daerah dengan budget terbatas. Dengan modal awal blocked account, mahasiswa bisa mandiri lewat kerja paruh waktu resmi.',
    visaRequirementsSummary: 'Sperrkonto (Blocked Account) senilai €11.904/tahun ATAU Surat Jaminan Beasiswa resmi (DAAD), asuransi masuk, dan LoA universitas Jerman.'
  },
  {
    id: 'inggris',
    name: 'Inggris (UK)',
    flag: '🇬🇧',
    tagline: 'Pendidikan Kelas Dunia 1 Tahun Master & Gerbang Karir Global',
    capital: 'London',
    currency: 'GBP (£)',
    currencyRateIdr: 20400,
    avgLivingCostMonthly: {
      eurOrLocal: '£900 - £1.400',
      idr: 'Rp 18.300.000 - Rp 28.500.000',
      breakdown: {
        rent: '£500 - £900 (luar London lebih hemat, London £800+)',
        food: '£200 - £300',
        insurance: 'NHS Immigration Health Surcharge dibayar di muka saat visa',
        transport: '£60 - £120 (kartu railcard mahasiswa)'
      }
    },
    tuitionFeeInfo: 'Program Master di UK hanya berlangsung 1 TAHUN penuh (menghemat waktu dan biaya hidup setahun dibanding negara lain). Biaya kuliah internasional berkisar £16.000 - £28.000/tahun.',
    languageRequirements: {
      english: 'IELTS Academic for UKVI min 6.5 (tidak ada subskor di bawah 6.0)',
      localLanguage: 'Bahasa Inggris adalah bahasa ibu',
      notes: 'Beberapa kampus menerima Duolingo English Test (DET) atau sertifikat tes bahasa internal.'
    },
    popularUniversities: [
      { name: 'University of Oxford & Cambridge', city: 'Oxford/Cambridge', highlight: 'Institusi akademis paling legendaris dunia' },
      { name: 'University of Edinburgh', city: 'Edinburgh, Skotlandia', highlight: 'Paling favorit untuk riset kebijakan & STEM' },
      { name: 'The University of Manchester', city: 'Manchester', highlight: 'Pusat inovasi bisnis, ekonomi, dan rekayasa' },
      { name: 'University of Bristol', city: 'Bristol', highlight: 'Sangat ramah mahasiswa internasional dan riset iklim' },
      { name: 'UCL (University College London)', city: 'London', highlight: 'Top 10 dunia untuk sains, pendidikan & arsitektur' }
    ],
    partTimeWorkRules: {
      allowedHours: '20 jam per minggu selama masa perkuliahan aktif, full time saat liburan',
      hourlyWage: '£10.42 - £12.50 / jam (~Rp 212.000 - Rp 255.000 / jam)',
      monthlyEarningPotential: '£800 - £1.000 (~Rp 16.3 - 20.4 juta/bulan)'
    },
    availableScholarships: ['Chevening Scholarship UK (Full)', 'GREAT Scholarships British Council', 'Gates Cambridge Scholarship', 'Commonwealth Scholarship'],
    regionalStudentFriendly: 'MandalikaEdu membimbing anak daerah menyusun 4 esai Chevening yang kaya akan narasi kearifan lokal daerah asal untuk membedakan diri dari ribuan kandidat perkotaan.',
    visaRequirementsSummary: 'CAS (Confirmation of Acceptance for Studies) dari kampus, bukti keuangan maintenance fund 28 hari berturut-turut, TB clearance test, dan IHS surcharge.'
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    tagline: 'Afirmasi Khusus Indonesia Timur & Gaya Hidup Multikultural',
    capital: 'Canberra',
    currency: 'AUD ($)',
    currencyRateIdr: 10400,
    avgLivingCostMonthly: {
      eurOrLocal: 'AUD $1.800 - $2.400',
      idr: 'Rp 18.700.000 - Rp 24.900.000',
      breakdown: {
        rent: 'AUD $900 - $1.400 (sharehouse / studio)',
        food: 'AUD $450 - $600',
        insurance: 'AUD $55 (OSHC Health Cover)',
        transport: 'AUD $120 - $180'
      }
    },
    tuitionFeeInfo: 'Biaya kuliah AUD $30.000 - $48.000/tahun. Namun, terdapat skema beasiswa Australia Awards (AAS) yang menanggung 100% biaya plus kursus bahasa pra-keberangkatan.',
    languageRequirements: {
      english: 'IELTS Academic 6.5 (min 6.0 per band) atau PTE Academic 58+',
      localLanguage: 'Bahasa Inggris',
      notes: 'Khusus beasiswa AAS untuk pelamar kawasan Indonesia Timur (termasuk NTB, NTT, Maluku, Papua), syarat IELTS diturunkan ke 5.5!'
    },
    popularUniversities: [
      { name: 'The University of Melbourne', city: 'Melbourne', highlight: 'Peringkat #1 Australia, kampus riset Group of Eight' },
      { name: 'The Australian National University (ANU)', city: 'Canberra', highlight: 'Pusat sains, hukum, dan kebijakan publik' },
      { name: 'The University of Sydney', city: 'Sydney', highlight: 'Unggul di bidang kesehatan, arsitektur, dan bisnis' },
      { name: 'The University of Queensland (UQ)', city: 'Brisbane', highlight: 'Pusat riset kelautan, pertanian, dan bioteknologi' },
      { name: 'The University of Western Australia (UWA)', city: 'Perth', highlight: 'Zona waktu sama persis dengan WITA Indonesia!' }
    ],
    partTimeWorkRules: {
      allowedHours: '48 jam per bentang 2 minggu (fortnight), tanpa batas jam kerja saat masa reses libur',
      hourlyWage: 'AUD $23.23 - $28.00 / jam (upah minimum tertinggi di dunia)',
      monthlyEarningPotential: 'AUD $1.800 - $2.400 (~Rp 18.7 - 25 juta/bulan)'
    },
    availableScholarships: ['Australia Awards Scholarships (AAS)', 'Destination Australia Program', 'Melbourne Research Scholarship', 'Sydney International Award'],
    regionalStudentFriendly: 'Australia adalah surga beasiswa bagi anak NTB/NTT dan Indonesia Timur karena adanya prioritas kebijakan luar negeri Australia untuk kawasan timur Indonesia.',
    visaRequirementsSummary: 'CoE (Confirmation of Enrolment), Genuine Student (GS) assessment statement, asuransi OSHC, dan bukti dana pendukung.'
  },
  {
    id: 'turki',
    name: 'Turki',
    flag: '🇹🇷',
    tagline: 'Perpaduan Peradaban Eropa-Asia & Sangat Terjangkau untuk Anak Daerah',
    capital: 'Ankara',
    currency: 'TRY (₺)',
    currencyRateIdr: 470,
    avgLivingCostMonthly: {
      eurOrLocal: '4.500 - 8.000 TL',
      idr: 'Rp 2.100.000 - Rp 3.800.000',
      breakdown: {
        rent: '1.500 - 3.500 TL (Asrama negeri KYK sangat murah atau gratis beasiswa)',
        food: '1.500 - 2.500 TL',
        insurance: '400 TL (SGK Mahasiswa)',
        transport: '300 TL (Kartu transportasi mahasiswa diskon 80%)'
      }
    },
    tuitionFeeInfo: 'Universitas negeri Turki mematok SPP sangat terjangkau: Rp 4 juta - Rp 15 juta/tahun untuk jalur mandiri, atau 100% GRATIS melalui Türkiye Bursları.',
    languageRequirements: {
      english: 'IELTS 6.0 (jika memilih jurusan full berbahasa Inggris)',
      localLanguage: 'TÖMER C1 (disediakan kursus bahasa Turki gratis 1 tahun bagi peraih beasiswa)',
      notes: 'Sangat ramah bagi lulusan SMA/SMK dari daerah yang belum memiliki skor IELTS.'
    },
    popularUniversities: [
      { name: 'Middle East Technical University (METU / ODTÜ)', city: 'Ankara', highlight: 'Kampus teknik terbaik Turki dengan bahasa Inggris penuh' },
      { name: 'Istanbul University', city: 'Istanbul', highlight: 'Salah satu kampus tertua di dunia, peraih Nobel kimia & sastra' },
      { name: 'Boğaziçi University', city: 'Istanbul', highlight: 'Paling prestisius untuk manajemen, sains terapan & hubungan internasional' },
      { name: 'Ankara University', city: 'Ankara', highlight: 'Pusat studi ilmu sosial, sains, kedokteran & diplomasi' }
    ],
    partTimeWorkRules: {
      allowedHours: 'Hanya diizinkan untuk mahasiswa pascasarjana (S2/S3) setelah mendapatkan izin kerja (Çalışma İzni)',
      hourlyWage: '120 - 200 TL / jam',
      monthlyEarningPotential: '4.000 - 6.000 TL'
    },
    availableScholarships: ['Türkiye Bursları (YTB) S1/S2/S3', 'Beasiswa Diyanet (Ilahiyat/Studi Agama)', 'TÜBİTAK Research Fellowship'],
    regionalStudentFriendly: 'Biaya hidup di Turki sangat mirip bahkan di beberapa kota lebih terjangkau daripada Jakarta/Surabaya, dengan kultur masyarakat yang sangat ramah terhadap orang Indonesia.',
    visaRequirementsSummary: 'Acceptance Letter resmi, verifikasi ijazah terjemahan tersumpah, asuransi, dan janji temu di Kedutaan Turki di Jakarta.'
  },
  {
    id: 'korea-selatan',
    name: 'Korea Selatan',
    flag: '🇰🇷',
    tagline: 'Raksasa Teknologi Masa Depan, Riset Canggih & Beasiswa GKS',
    capital: 'Seoul',
    currency: 'KRW (₩)',
    currencyRateIdr: 11.5,
    avgLivingCostMonthly: {
      eurOrLocal: '₩700.000 - ₩1.100.000',
      idr: 'Rp 8.000.000 - Rp 12.600.000',
      breakdown: {
        rent: '₩350.000 - ₩550.000 (Dormitory kampus / One-room)',
        food: '₩300.000 - ₩400.000 (Kantin kampus murah)',
        insurance: '₩70.000 (National Health Insurance)',
        transport: '₩60.000 (T-Money Card)'
      }
    },
    tuitionFeeInfo: 'Biaya kuliah berkisar ₩3.500.000 - ₩6.500.000 per semester. Namun lewat GKS atau Lab Professor Scholarship, mahasiswa seringkali menerima pembebasan SPP 100% ditambah stipend bulanan.',
    languageRequirements: {
      english: 'IELTS 6.0+ / TOEFL iBT 80+ untuk program bahasa Inggris',
      localLanguage: 'TOPIK Level 3 untuk kuliah, atau gratis belajar 1 tahun via beasiswa GKS',
      notes: 'Banyak profesor STEM mendanai mahasiswa riset (Lab Assistantship) tanpa wajib mahir bahasa Korea di awal.'
    },
    popularUniversities: [
      { name: 'Seoul National University (SNU)', city: 'Seoul', highlight: 'Puncak universitas SKY Korea' },
      { name: 'KAIST (Korea Advanced Institute of Science & Technology)', city: 'Daejeon', highlight: 'MIT-nya Korea Selatan, perkuliahan 100% bahasa Inggris' },
      { name: 'Yonsei University', city: 'Seoul', highlight: 'Unggul di bidang kedokteran, bisnis, dan hubungan internasional' },
      { name: 'Korea University', city: 'Seoul', highlight: 'Tradisi akademik kuat hukum dan rekayasa komputer' }
    ],
    partTimeWorkRules: {
      allowedHours: '20-25 jam per minggu (tergantung level TOPIK)',
      hourlyWage: '₩9.860 / jam (~Rp 113.000 / jam)',
      monthlyEarningPotential: '₩800.000 - ₩1.000.000 (~Rp 9.2 - 11.5 juta/bulan)'
    },
    availableScholarships: ['Global Korea Scholarship (GKS)', 'KAIST International Student Scholarship', 'Professor Lab Research Assistantship'],
    regionalStudentFriendly: 'Tersedia jalur "Regional University Track" di beasiswa GKS di mana kuota khusus dialokasikan untuk kampus di luar kota metropolitan Seoul dengan persaingan lebih ramah.',
    visaRequirementsSummary: 'Visa D-2 (Student Visa), Certificate of Admission (CoA), rekening koran pendukung, dan ijazah ter-Apostille.'
  },
  {
    id: 'belanda',
    name: 'Belanda',
    flag: '🇳🇱',
    tagline: 'Negara Eropa Paling Banyak Menawarkan Jurusan Bahasa Inggris',
    capital: 'Amsterdam',
    currency: 'EUR (€)',
    currencyRateIdr: 17300,
    avgLivingCostMonthly: {
      eurOrLocal: '€950 - €1.350',
      idr: 'Rp 16.400.000 - Rp 23.300.000',
      breakdown: {
        rent: '€500 - €800 (akomodasi mahasiswa)',
        food: '€250 - €300',
        insurance: '€60 (Student Insurance khusus Aon/Lombard)',
        transport: '€50 (sebagian besar mahasiswa bersepeda)'
      }
    },
    tuitionFeeInfo: 'Universitas di Belanda menawarkan lebih dari 2.100 program sarjana dan magister dalam bahasa Inggris murni. Biaya kuliah non-EEA: €8.000 - €16.000/tahun.',
    languageRequirements: {
      english: 'IELTS Academic 6.5 (tidak ada band < 6.0) atau TOEFL iBT 90+',
      localLanguage: 'Tidak wajib bahasa Belanda (95% populasi fasih bahasa Inggris)',
      notes: 'Lingkungan sangat nyaman bagi orang Indonesia karena hubungan sejarah yang panjang dan ketersediaan makanan nusantara melimpah.'
    },
    popularUniversities: [
      { name: 'TU Delft (Delft University of Technology)', city: 'Delft', highlight: 'Peringkat top 10 dunia untuk teknik sipil, perkapalan & arsitektur' },
      { name: 'Wageningen University & Research', city: 'Wageningen', highlight: 'Peringkat #1 dunia untuk pertanian, pangan, dan kehutanan' },
      { name: 'University of Amsterdam (UvA)', city: 'Amsterdam', highlight: 'Riset nomor 1 dunia untuk komunikasi dan media' },
      { name: 'Leiden University', city: 'Leiden', highlight: 'Kampus tertua di Belanda dengan koleksi manuskrip nusantara terlengkap' }
    ],
    partTimeWorkRules: {
      allowedHours: '16 jam per minggu atau full-time selama bulan Juni, Juli, Agustus (memerlukan TWV work permit dari majikan)',
      hourlyWage: '€11.50 - €14.00 / jam',
      monthlyEarningPotential: '€700 - €900 (~Rp 12 - 15.5 juta/bulan)'
    },
    availableScholarships: ['NL Scholarship (dulu Holland Scholarship)', 'Erasmus+ Joint European Masters', 'Universitas Excellence Scholarships (TU Delft / Leiden / Utrecht)'],
    regionalStudentFriendly: 'Kemudahan adaptasi bahasa Inggris membuat mahasiswa daerah merasa cepat percaya diri bergaul di kampus Belanda.',
    visaRequirementsSummary: 'Diurus langsung oleh universitas Belanda melalui sponsor MVV (Machtiging tot Voorlopig Verblijf) dan VVR residence permit.'
  }
];

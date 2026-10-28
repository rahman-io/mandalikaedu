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
  // Metadata pelengkap resmi dokumen PDF 28 Oktober 2026
  regionGroup: string;
  seasonPattern?: 'Jan-Mar' | 'Apr-Jun' | 'Jul-Sep' | 'Okt-Des' | 'Sepanjang Tahun';
  isVerifiedCheckmark?: boolean; // Tanda ✔ terverifikasi per 28 Oktober 2026
  statusNote?: string;
  educationalNote?: string;
}

export const SCHOLARSHIPS_DATA: Scholarship[] = [
  // ==========================================
  // 1. INDONESIA (WNI KULIAH DALAM / LUAR NEGERI)
  // ==========================================
  {
    id: 'lpdp-reguler',
    name: 'LPDP Beasiswa Reguler',
    organizer: 'Lembaga Pengelola Dana Pendidikan (Kemenkeu RI)',
    country: 'Indonesia',
    flag: '🇮🇩',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya Pendidikan: Pendaftaran, SPP (Tuition Fee), Tunjangan Buku, Penelitian Tesis/Disertasi, Seminar Internasional, Publikasi Jurnal',
      'Biaya Pendukung: Tunjangan hidup bulanan, transportasi tiket pesawat PP, asuransi kesehatan, visa, biaya kedatangan, dan dana darurat',
      'Dukungan studi di universitas dalam negeri maupun luar negeri mitra terkemuka',
      'Kewajiban alumni kembali berkontribusi di Indonesia (skema 2n + 1)'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Ekonomi', 'Kedokteran & Kesehatan', 'Kebijakan Publik & Hukum'],
    requirements: {
      gpa: 'IPK minimal 3.00 (S2) dan 3.25 (S3) pada skala 4.00',
      language: 'Luar negeri: TOEFL iBT min 80 / IELTS 6.5 / PTE 58; Dalam negeri: TOEFL ITP 500 / iBT 61 / IELTS 6.0',
      maxAge: 'Maksimal 35 tahun untuk Magister (S2) dan 40 tahun untuk Doktor (S3)',
      workExperience: 'Tidak wajib bagi jalur reguler fresh graduate',
      documents: [
        'KTP dan Ijazah + Transkrip legalisir',
        'Sertifikat kemampuan bahasa Inggris resmi (IELTS/TOEFL iBT/PTE)',
        'Surat rekomendasi akademisi atau atasan',
        'Komitmen kembali ke Indonesia dan rencana pasca studi (esai)',
        'Proposal penelitian tesis/disertasi (khusus pelamar S3)',
        'LoA Unconditional (jika sudah ada, opsional)'
      ]
    },
    applicationPeriod: {
      open: '30 Juni 2026',
      deadline: '31 Juli 2026',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://lpdp.kemenkeu.go.id',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Skema beasiswa pembiayaan penuh pemerintah Indonesia untuk putra-putri terbaik bangsa menempuh pendidikan Master dan Doktor di perguruan tinggi terbaik dunia maupun nasional.',
    tipsMandalika: 'Fokuskan esai komitmen pada kontribusi terukur bagi daerah asal Anda. Penilai LPDP sangat mengapresiasi pemahaman kontekstual terhadap tantangan riil di daerah.',
    quota: '± 3.000 - 4.000 awardee total per tahun',
    selectionStages: ['Pendaftaran Online & Administrasi', 'Tes Bakat Skolastik (TBS) & Tes Kebangsaan', 'Seleksi Substansi / Wawancara Final', 'Pengumuman Kelulusan'],
    regionGroup: 'Indonesia',
    seasonPattern: 'Jul-Sep',
    isVerifiedCheckmark: true,
    statusNote: '✔ Batch 2/2026: daftar 30 Juni-31 Juli 2026, hasil 30 Nov 2026, studi paling cepat mulai 1 Jan 2027. Pola umum dua batch per tahun.'
  },
  {
    id: 'lpdp-afirmasi',
    name: 'LPDP Afirmasi dan Targeted Group',
    organizer: 'Lembaga Pengelola Dana Pendidikan (Kemenkeu RI)',
    country: 'Indonesia',
    flag: '🇮🇩',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Cakupan pendanaan penuh sama dengan Beasiswa Reguler LPDP (SPP, tunjangan hidup bulanan, tiket PP, asuransi, dll)',
      'Fasilitas pengayaan bahasa (English Enrichment) bagi penerima yang membutuhkan sebelum studi',
      'Biaya pendaftaran dan tunjangan kedatangan',
      'Pengawalan khusus bagi talenta daerah 3T dan prasejahtera'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Ekonomi', 'Kedokteran & Kesehatan', 'Pendidikan'],
    requirements: {
      gpa: 'IPK minimal 2.50 - 2.75 (khusus daerah afirmasi 3T/prasejahtera lebih fleksibel)',
      language: 'Skor bahasa lebih adaptif: TOEFL ITP min 400-500 atau IELTS min 5.0-6.0 (tergantung kategori afirmasi/LN/DN)',
      maxAge: 'Fleksibel hingga 42 tahun (S2) dan 47 tahun (S3) untuk kategori afirmasi daerah tertentu',
      workExperience: 'Disesuaikan dengan target sasaran (PNS, TNI, Polri, Tenaga Medis, Kader Ulama)',
      documents: [
        'KTP berdomisili di daerah afirmasi (minimal 3 tahun menetap)',
        'Surat Keterangan Prasejahtera / KMS / Kartu Keluarga Sejahtera (jika jalur prasejahtera)',
        'Surat rekomendasi kepala dinas/tokoh masyarakat/akademisi',
        'Ijazah, transkrip nilai, dan sertifikat bahasa',
        'Esai komitmen kontribusi pembangunan wilayah'
      ]
    },
    applicationPeriod: {
      open: 'Januari 2026 / Juni 2026',
      deadline: 'Februari 2026 / Juli 2026',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://lpdp.kemenkeu.go.id',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Jalur khusus LPDP untuk talenta dari Daerah Afirmasi (3T), keluarga Prasejahtera, Putra-Putri Papua, Penyandang Disabilitas, Dokter Spesialis, dan Kader Ulama.',
    tipsMandalika: 'Peluang emas bagi pemuda NTB, NTT, Maluku, dan Papua. Manfaatkan afirmasi geografis di mana ambang batas skor tes lebih ramah namun tetap didanai penuh 100%!',
    quota: 'Ratusan kuota khusus teralokasikan',
    selectionStages: ['Seleksi Administrasi Afirmasi', 'Tes Bakat Skolastik', 'Wawancara Substansi', 'Program Pengayaan Bahasa (bila diperlukan)'],
    regionGroup: 'Indonesia',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: true,
    statusNote: '✔ Mengikuti batch berkala LPDP (Batch 1 buka Jan-Feb, Batch 2 buka Juni-Juli). Kategori: Daerah 3T, Prasejahtera, Papua, Disabilitas, Targeted.'
  },
  {
    id: 'lpdp-ptud',
    name: 'LPDP Perguruan Tinggi Utama Dunia (PTUD)',
    organizer: 'Lembaga Pengelola Dana Pendidikan (Kemenkeu RI)',
    country: 'Indonesia',
    flag: '🇮🇩',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Pendanaan penuh tanpa batas batas atas biaya kuliah di universitas Top 25 dunia',
      'Tunjangan biaya hidup bulanan standar kota top dunia (Boston, Oxford, Cambridge, London, Stanford, dll)',
      'Tiket pesawat PP kelas ekonomi, asuransi internasional, visa, tunjangan buku dan konferensi'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Ekonomi', 'Kedokteran & Kesehatan', 'Kebijakan Publik & Hukum'],
    requirements: {
      gpa: 'Sesuai dengan syarat penerimaan universitas target PTUD',
      language: 'TOEFL iBT / IELTS sesuai standar kampus top dunia (umumnya IELTS 7.0 - 7.5)',
      maxAge: 'Maksimal 35 tahun (S2) dan 40 tahun (S3)',
      workExperience: 'Tidak diwajibkan',
      documents: [
        'LoA Unconditional WAJIB ada saat mendaftar dari daftar kampus PTUD LPDP',
        'Ijazah dan transkrip nilai resmi berbahasa Inggris',
        'Esai rencana studi dan rencana kontribusi nasional',
        'Surat rekomendasi akademisi/profesional',
        'Sertifikat kemampuan bahasa resmi'
      ]
    },
    applicationPeriod: {
      open: 'Januari 2026 / Juni 2026',
      deadline: 'Februari 2026 / Juli 2026',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://lpdp.kemenkeu.go.id',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Jalur prioritas LPDP untuk WNI yang telah mengantongi LoA Unconditional dari kampus terbaik dunia (Harvard, MIT, Stanford, Oxford, Cambridge, ETH Zurich, dll). Tanpa tes TBS!',
    tipsMandalika: 'Jika Anda sudah memegang LoA Unconditional dari kampus daftar PTUD LPDP, Anda langsung bypass (bebas) tes bakat skolastik dan langsung melaju ke tahap wawancara substansi.',
    quota: 'Prioritas pendanaan penuh',
    selectionStages: ['Pendaftaran dengan LoA PTUD', 'Seleksi Administrasi', 'Wawancara Substansi', 'Awarding'],
    regionGroup: 'Indonesia',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: true,
    statusNote: '✔ Mengikuti batch LPDP (Batch 1 & 2). Khusus pemilik LoA Unconditional dari kampus Top PTUD resmi LPDP.'
  },
  {
    id: 'lpdp-brin',
    name: 'LPDP–BRIN (Degree by Research)',
    organizer: 'Badan Riset dan Inovasi Nasional (BRIN) & LPDP',
    country: 'Indonesia',
    flag: '🇮🇩',
    level: ['S3', 'Riset'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya studi S3 berbasis riset penuh (Degree by Research)',
      'Tunjangan bulanan riset (~Rp 4,5 - 5 juta/bulan menurut data sekunder resmi)',
      'Akses fasilitas riset, laboratorium mutakhir, dan pembimbingan co-promotor dari periset BRIN',
      'Pendanaan mobilitas riset dan publikasi ilmiah internasional'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Lingkungan & Energi', 'Pertanian & Kelautan', 'Kedokteran & Kesehatan', 'Sains Material'],
    requirements: {
      gpa: 'IPK minimal 3.00 pada jenjang Master (S2)',
      language: 'TOEFL ITP min 500 / iBT 61 / IELTS 6.0',
      maxAge: 'Tidak ada batas usia kaku untuk periset aktif',
      workExperience: 'Periset, dosen, atau talenta muda dengan rekam jejak riset',
      documents: [
        'Proposal riset doktoral terintegrasi dengan klaster riset BRIN',
        'Persetujuan Co-Promotor dari periset utama BRIN',
        'LoA dari perguruan tinggi mitra Degree by Research (DN/LN)',
        'Daftar publikasi ilmiah sebelumnya'
      ]
    },
    applicationPeriod: {
      open: 'Maret 2027',
      deadline: 'April 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://brin.go.id',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Program kolaborasi LPDP dan BRIN untuk mencetak doktor periset unggul berbasis keterlibatan riset langsung di kelompok riset dan laboratorium BRIN.',
    tipsMandalika: 'Kuncinya adalah menjalin komunikasi terlebih dahulu dengan periset senior BRIN yang memiliki kepakaran sesuai topik Anda untuk dijadikan co-promotor.',
    quota: '± 100-200 periset per tahun',
    selectionStages: ['Pendaftaran & Verifikasi Proposal BRIN', 'Evaluasi Kelayakan Riset', 'Wawancara Panel BRIN-LPDP', 'Penetapan Penerima'],
    regionGroup: 'Indonesia',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: false,
    statusNote: 'Sumber sekunder menyebut pendaftaran Maret 2027 (menunggu pengumuman resmi BRIN & LPDP).'
  },
  {
    id: 'beasiswa-indonesia-maju',
    name: 'Beasiswa Indonesia Maju (BIM)',
    organizer: 'Pusat Prestasi Nasional (Puspresnas) / Kemdiktisaintek RI & LPDP',
    country: 'Indonesia',
    flag: '🇮🇩',
    level: ['S1', 'S2'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya SPP (Tuition Fee) penuh di dalam negeri atau ~107 universitas mitra top luar negeri',
      'Tunjangan biaya hidup bulanan',
      'Tiket penerbangan PP internasional/domestik, visa, dan asuransi kesehatan',
      'Tunjangan buku, tunjangan kedatangan, dan dana darurat'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Ekonomi', 'Seni & Desain', 'Kesehatan'],
    requirements: {
      gpa: 'Prestasi akademik tinggi & portofolio juara olimpiade/lomba Puspresnas/talenta nasional',
      language: 'IELTS minimal 6.5 atau TOEFL iBT minimal 80 untuk universitas luar negeri',
      maxAge: 'Lulusan SMA/SMK sederajat untuk S1 berprestasi; Maksimal 35 tahun untuk S2',
      workExperience: 'Tidak diwajibkan',
      documents: [
        'Sertifikat prestasi juara kompetisi/olimpiade Puspresnas atau ajang talenta terkurasi',
        'Surat rekomendasi kepala sekolah/dosen',
        'Esai motivasi studi dan kontribusi masa depan',
        'Transkrip nilai rapor SMA atau ijazah S1'
      ]
    },
    applicationPeriod: {
      open: 'Mei 2027',
      deadline: 'Juli 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://pusatprestasinasional.kemdikbud.go.id',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Program beasiswa penuh pemerintah Indonesia untuk peserta didik dan lulusan berprestasi pada ajang talenta sains, riset, seni, budaya, dan olahraga ke kampus terbaik dunia.',
    tipsMandalika: 'Jika Anda pernah meraih medali OSN, O2SN, FLS2N, atau lomba inovasi nasional yang dikurasi Puspresnas, BIM adalah jalur prioritas tercepat Anda kuliah di 107 kampus top dunia!',
    quota: '± 200-300 penerima per angkatan',
    selectionStages: ['Seleksi Administrasi & Kurasi Prestasi', 'Tes Bakat Skolastik', 'Wawancara Keberbakatan', 'Pembinaan & Keberangkatan'],
    regionGroup: 'Indonesia',
    seasonPattern: 'Apr-Jun',
    isVerifiedCheckmark: false,
    statusNote: 'Dikelola Kemdiktisaintek/Puspresnas. Cek pembaruan jadwal intake 2027 di situs resmi.'
  },
  {
    id: 'beasiswa-kemdiktisaintek-bpi',
    name: 'Beasiswa Kemdiktisaintek / BPI',
    organizer: 'Kementerian Pendidikan Tinggi, Sains, dan Teknologi RI (Kemdiktisaintek)',
    country: 'Indonesia',
    flag: '🇮🇩',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Pendanaan penuh SPP kuliah di dalam negeri atau luar negeri',
      'Tunjangan biaya hidup bulanan, tunjangan buku, dan tunjangan transportasi PP',
      'Skema khusus bagi calon dosen, dosen tetap, tenaga kependidikan, serta pelaku kebudayaan',
      'Asuransi kesehatan dan dana kedatangan'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Pendidikan & Pedagogi', 'Seni & Kebudayaan', 'Sains Terapan'],
    requirements: {
      gpa: 'IPK minimal 3.00 (S2) dan 3.25 (S3)',
      language: 'TOEFL ITP min 500 / iBT 61 / IELTS 6.0 untuk DN; TOEFL iBT 80 / IELTS 6.5 untuk LN',
      maxAge: 'Disesuaikan dengan status profesi (dosen/tendik/pelaku budaya)',
      workExperience: 'Wajib memiliki NIDN/NUPTK untuk jalur dosen perguruan tinggi',
      documents: [
        'Surat rekomendasi pimpinan perguruan tinggi / dinas kebudayaan',
        'SK Dosen / Tenaga Kependidikan / Bukti portofolio kebudayaan',
        'Ijazah, transkrip, sertifikat bahasa resmi',
        'Surat izin atasan langsung'
      ]
    },
    applicationPeriod: {
      open: 'April 2027',
      deadline: 'Mei 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://beasiswa.kemdikbud.go.id',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa pemerintah di luar seleksi umum LPDP reguler, dirancang khusus mempercepat kualifikasi dosen S3 dan tenaga pendidik perguruan tinggi nasional.',
    tipsMandalika: 'Pastikan seluruh berkas kepegawaian institusi dan persetujuan rektorat telah siap jauh-jauh hari karena seleksi BPI memeriksa legalitas NIDN secara ketat.',
    quota: 'Ribuan kuota untuk pendidik nasional',
    selectionStages: ['Registrasi Daring BPI', 'Verifikasi Administrasi & NIDN', 'Wawancara Akademik', 'Awarding'],
    regionGroup: 'Indonesia',
    seasonPattern: 'Apr-Jun',
    isVerifiedCheckmark: false,
    statusNote: 'Skema kementerian di luar LPDP langsung. Jadwal dan kuota diumumkan tahunan di portal resmi Kemdiktisaintek.'
  },
  {
    id: 'iisma',
    name: 'IISMA (Indonesian International Student Mobility Awards)',
    organizer: 'Kemdiktisaintek RI & LPDP',
    country: 'Indonesia',
    flag: '🇮🇩',
    level: ['S1', 'Riset'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya pendaftaran dan SPP kuliah (tuition fee) di universitas top dunia selama 1 semester',
      'Uang saku bulanan (living allowance) standar negara tujuan',
      'Tiket penerbangan internasional kelas ekonomi PP',
      'Asuransi kesehatan internasional, biaya visa, dan tes kesehatan',
      'Konversi hingga 20 SKS mata kuliah ke kampus asal di Indonesia'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Ekonomi', 'Seni & Desain', 'Komunikasi'],
    requirements: {
      gpa: 'IPK minimal 3.00 dari 4.00 (mahasiswa semester 4-6 S1 atau semester 4-5 Vokasi D3/D4)',
      language: 'IELTS min 6.0 / TOEFL iBT min 78 / Duolingo English Test (DET) min 100',
      maxAge: 'Maksimal 23 tahun saat mendaftar',
      workExperience: 'Mahasiswa aktif perguruan tinggi terakreditasi',
      documents: [
        'Surat rekomendasi dari Wakil Rektor Bidang Akademik kampus asal',
        'Transkrip nilai akademik terbaru berbahasa Inggris',
        'Sertifikat kemampuan bahasa Inggris (IELTS/TOEFL iBT/Duolingo)',
        'Esai motivasi studi dan refleksi diri',
        'SKCK dan surat bebas narkoba'
      ]
    },
    applicationPeriod: {
      open: 'Januari 2027',
      deadline: 'Februari 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://iisma.kemdikbud.go.id',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Program mobilitas mahasiswa bergengsi untuk merasakan studi selama satu semester di universitas terkemuka dunia di UK, AS, Eropa, Australia, dan Asia.',
    tipsMandalika: 'Keunggulan IISMA menerima Duolingo English Test (DET) yang biayanya jauh lebih terjangkau. Fokuskan esai pada adaptabilitas lintas budaya dan wawasan yang akan dibawa pulang ke daerah.',
    quota: '± 1.500 - 2.000 mahasiswa per tahun',
    selectionStages: ['Pendaftaran Daring & Verifikasi Kampus', 'Tes Kebangsaan Daring', 'Wawancara Bahasa Inggris', 'Pengumuman Host University'],
    regionGroup: 'Indonesia',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: false,
    statusNote: 'Program tahunan Kemdiktisaintek. Pendaftaran biasanya dibuka Januari-Februari untuk mobilitas semester ganjil.'
  },

  // ==========================================
  // 2. INGGRIS (UK)
  // ==========================================
  {
    id: 'chevening-uk',
    name: 'Chevening Scholarship UK',
    organizer: 'Foreign, Commonwealth & Development Office (FCDO) Pemerintah Inggris',
    country: 'Inggris',
    flag: '🇬🇧',
    level: ['S2'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah Master 1 tahun penuh di seluruh universitas UK ternama tanpa batasan jurusan',
      'Uang saku bulanan standar London / luar London (£1.100 - £1.400 / ~Rp 22-28 juta/bulan)',
      'Tiket pesawat PP kelas ekonomi ke dan dari Inggris',
      'Biaya visa pelajar Inggris (Student Visa)',
      'Tunjangan kedatangan dan kepulangan (Arrival & departure allowance)',
      'Akses ke jejaring eksklusif Chevening global dan resepsi diplomatik Kerajaan Inggris'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Ekonomi', 'Kebijakan Publik & Hukum', 'Media & Kreatif'],
    requirements: {
      gpa: 'Setara dengan UK 2:1 Honours degree (IPK Indonesia min ~3.20)',
      language: 'IELTS min 6.5 (tidak ada band < 5.5) / sesuai syarat kampus UK yang dipilih',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Minimal 2.800 jam kerja (sekitar 2 tahun pengalaman kerja purnawaktu/paruh waktu/relawan)',
      documents: [
        '4 Esai Wajib: Leadership & Influence, Networking, Studying in the UK, Career Plan',
        '2 Surat Rekomendasi Profesional / Akademik',
        'Ijazah & Transkrip Resmi berbahasa Inggris',
        '3 Pilihan Program Master di universitas UK',
        'Paspor yang masih berlaku minimal 18 bulan'
      ]
    },
    applicationPeriod: {
      open: 'Agustus 2027',
      deadline: 'Oktober 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.chevening.org',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Program beasiswa global prestisius pemerintah Inggris untuk melahirkan pemimpin masa depan, pembuat kebijakan, dan profesional visioner.',
    tipsMandalika: 'Gunakan kerangka STAR (Situation, Task, Action, Result) saat menulis 4 esai wajib. Angkat kisah kepemimpinan nyata Anda dalam menggerakkan komunitas lokal di daerah.',
    quota: '± 45-55 penerima dari Indonesia per tahun',
    selectionStages: ['Pendaftaran Online & 4 Esai', 'Reading Committee Assessment', 'Interview di Kedutaan Besar Inggris Jakarta', 'Pengunggahan LoA Unconditional Final'],
    regionGroup: 'Inggris',
    seasonPattern: 'Jul-Sep',
    isVerifiedCheckmark: true,
    statusNote: '✔ Periode 2027/28 dibuka 4 Ags - 6 Okt 2026 (status: sudah lewat untuk batch ini). Siklus berikutnya akan dibuka Agustus - Oktober 2027.'
  },
  {
    id: 'gates-cambridge',
    name: 'Gates Cambridge Scholarship',
    organizer: 'Bill & Melinda Gates Foundation & University of Cambridge',
    country: 'Inggris',
    flag: '🇬🇧',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah penuh University Composition Fee di Cambridge',
      'Tunjangan pemeliharaan hidup (£20.000/tahun untuk masa studi)',
      'Tiket penerbangan ekonomi internasional PP',
      'Biaya visa masuk UK dan International Health Surcharge (IHS)',
      'Tunjangan pengembangan akademik (£500 - £2.000 untuk konferensi dan kursus)'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Kedokteran & Kesehatan', 'Bisnis & Ekonomi', 'Sains Terapan'],
    requirements: {
      gpa: 'Prestasi akademik luar biasa (IPK minimal 3.70 - 3.80 / First Class Honours)',
      language: 'IELTS minimal 7.5 (dengan minimal 7.0 tiap komponen) atau TOEFL iBT 110',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Rekam jejak kepemimpinan sosial dan publikasi ilmiah',
      documents: [
        'Aplikasi pascasarjana University of Cambridge',
        'Pernyataan Gates Cambridge (500 kata menjelaskan kecocokan dengan misi Gates)',
        'Proposal riset doktoral terperinci (khusus pelamar PhD)',
        'Referensi referent khusus Gates selain dua referensi akademik'
      ]
    },
    applicationPeriod: {
      open: 'September 2026',
      deadline: 'Desember 2026 / Januari 2027',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://www.gatescambridge.org',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa internasional paling bergengsi di University of Cambridge untuk mahasiswa luar UK dengan keunggulan intelektual dan komitmen memperbaiki kehidupan umat manusia.',
    tipsMandalika: 'Selain kecerdasan intelektual, Gates Cambridge mencari "komitmen kuat memperbaiki kehidupan orang lain". Tunjukkan bagaimana riset Anda di Cambridge berdampak langsung bagi masyarakat marjinal.',
    quota: '± 80 awardee global per tahun (~55 untuk luar AS)',
    selectionStages: ['Pendaftaran via portal Cambridge', 'Penyaringan Departemen Akademik', 'Shortlisting Komite Gates', 'Wawancara Online Panel Internasional'],
    regionGroup: 'Inggris',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: false,
    statusNote: 'Pendaftaran dibuka September/Oktober, tenggat Desember/Januari bergantung departemen tujuan di Cambridge.'
  },
  {
    id: 'clarendon-oxford',
    name: 'Clarendon Fund Scholarship (Oxford)',
    organizer: 'University of Oxford',
    country: 'Inggris',
    flag: '🇬🇧',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah (Tuition fee) 100% penuh di University of Oxford',
      'Tunjangan biaya hidup tahunan yang sangat memadai (living grant ~£18.600+)',
      'Otomatis dipertimbangkan saat mendaftar kuliah ke Oxford sebelum batas waktu Januari',
      'Keanggotaan dalam komunitas prestisius Clarendon Scholars Association'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Ekonomi', 'Kedokteran & Kedokteran Klinis', 'Hukum'],
    requirements: {
      gpa: 'Predikat kelulusan First Class Honours (IPK setara 3.75+)',
      language: 'IELTS min 7.5 (min 7.0 tiap band) atau TOEFL iBT min 110',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Tidak diwajibkan khusus, berorientasi murni akademik',
      documents: [
        'Aplikasi masuk program pascasarjana Oxford sebelum batas waktu Januari',
        'Academic CV dan Transkrip Nilai resmi',
        'Sample of Written Work (karya tulis akademik)',
        '3 Surat Rekomendasi Akademik dari profesor/dosen senior',
        'Research proposal atau Statement of Purpose'
      ]
    },
    applicationPeriod: {
      open: 'September 2026',
      deadline: 'Januari 2027',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://www.ox.ac.uk/clarendon',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Skema beasiswa pascasarjana terbesar di University of Oxford yang mendanai mahasiswa terbaik dunia tanpa memandang kewarganegaraan atau status finansial.',
    tipsMandalika: 'Tidak ada formulir beasiswa terpisah! Kuncinya adalah menyempurnakan aplikasi studi Oxford dan karya tulis (written sample) sebelum tenggat waktu jurusan di bulan Januari.',
    quota: '± 160 mahasiswa baru Oxford per tahun',
    selectionStages: ['Pendaftaran Program Magister/Doktor Oxford', 'Nominasi oleh Akademisi Departemen', 'Seleksi Dewan Clarendon Fund', 'Pemberitahuan Kelulusan (Februari-April)'],
    regionGroup: 'Inggris',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: false,
    statusNote: 'Otomatis dipertimbangkan saat mendaftar program pascasarjana Oxford, batas waktu Desember/Januari.'
  },
  {
    id: 'commonwealth-uk-note',
    name: 'Commonwealth Scholarships (Catatan Non-Eligibilitas WNI)',
    organizer: 'Commonwealth Scholarship Commission (CSC UK)',
    country: 'Inggris',
    flag: '🇬🇧',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Pendanaan penuh biaya kuliah dan tunjangan hidup bagi warganegara anggota Commonwealth',
      'Catatan Edukasi Regulasi: INDONESIA BUKAN ANGGOTA COMMONWEALTH, sehingga skema CSC reguler TIDAK BERLAKU bagi pemegang paspor WNI biasa'
    ],
    fieldsOfStudy: ['Kebijakan Publik & Pembangunan', 'Sosial & Humaniora'],
    requirements: {
      gpa: 'Khusus warganegara persemakmuran (Commonwealth citizen)',
      language: 'IELTS / standar kampus UK',
      documents: ['Hanya berlaku untuk negara anggota Commonwealth']
    },
    applicationPeriod: {
      open: 'Informasi Edukasi',
      deadline: 'Tidak Berlaku untuk WNI',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://cscuk.fcdo.gov.uk',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Catatan penting edukasi dari dokumen resmi: Skema Commonwealth tidak berlaku untuk WNI karena Indonesia bukan anggota Commonwealth. Gunakan Chevening, Gates, atau Clarendon.',
    tipsMandalika: 'Jangan habiskan waktu melamar Commonwealth Scholarship jika berpaspor Indonesia. Alihkan persiapan esai Anda ke Chevening atau GREAT Scholarships!',
    quota: '0 (Tidak berlaku untuk WNI)',
    selectionStages: ['Non-Eligible bagi WNI'],
    regionGroup: 'Inggris',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: false,
    educationalNote: 'Catatan Resmi PDF: Indonesia bukan anggota Commonwealth, skema tidak berlaku untuk WNI.'
  },

  // ==========================================
  // 3. AMERIKA SERIKAT
  // ==========================================
  {
    id: 'fulbright-usa',
    name: 'Fulbright Master & PhD Scholarship',
    organizer: 'AMINEF (American Indonesian Exchange Foundation) & US Dept of State',
    country: 'Amerika Serikat',
    flag: '🇺🇸',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah penuh (Tuition & mandatory fees) di universitas terkemuka Amerika Serikat',
      'Tunjangan biaya hidup bulanan ($1.800 - $2.800/bulan) disesuaikan kota studi di AS',
      'Tiket pesawat internasional PP Indonesia - Amerika Serikat kelas ekonomi',
      'Asuransi kesehatan kecelakaan ASPE dari Pemerintah Federal AS',
      'Biaya tes resmi lanjutan (TOEFL iBT / GRE) dibiayai penuh oleh AMINEF',
      'Dukungan penempatan universitas (University Placement Service)'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Ekonomi', 'Kebijakan Publik & Hukum', 'Pendidikan & Seni'],
    requirements: {
      gpa: 'IPK minimal 3.00 pada skala 4.00',
      language: 'S2: TOEFL ITP min 550 / iBT 80 / IELTS 6.5 / Duolingo 110; S3: TOEFL ITP 575 / iBT 90 / IELTS 7.0',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Diutamakan memiliki pengalaman kerja & komitmen pelayanan publik untuk Indonesia',
      documents: [
        'Formulir pendaftaran resmi AMINEF Fulbright',
        'Study Objective Essay (maks 500 kata) yang terfokus dan matang',
        'Personal Statement Essay (maks 500 kata) menceritakan nilai hidup dan karakter',
        '3 Surat Rekomendasi Resmi',
        'Salinan Ijazah dan Transkrip Akademik Berbahasa Inggris legalisir'
      ]
    },
    applicationPeriod: {
      open: 'Desember 2026',
      deadline: '15 Februari 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.aminef.or.id',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa ke AS paling bergengsi dengan jejaring alumni global terkuat di dunia, menjembatani pertukaran budaya dan kontribusi pembangunan sosial di tanah air.',
    tipsMandalika: 'Fulbright sangat menyukai kandidat yang memiliki jiwa kepemimpinan komunitas di luar kota metropolitan Jawa. Tunjukkan kiprah nyata Anda di daerah asal dalam Personal Statement!',
    quota: '± 35-40 mahasiswa Master & Doktor per tahun',
    selectionStages: ['Pendaftaran Berkas AMINEF', 'Wawancara Panel Gabungan Indonesia-AS', 'Official Testing (TOEFL iBT & GRE) dibiayai AMINEF', 'Penempatan Universitas di AS (Placement)'],
    regionGroup: 'Amerika Serikat',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: false,
    statusNote: 'Program tahunan lewat AMINEF. Pendaftaran biasanya dibuka Desember dan ditutup pertengahan Februari.'
  },
  {
    id: 'humphrey-fellowship',
    name: 'Hubert H. Humphrey Fellowship Program',
    organizer: 'AMINEF & US Department of State',
    country: 'Amerika Serikat',
    flag: '🇺🇸',
    level: ['Riset'],
    fundingType: 'Fully Funded',
    coverage: [
      'Program non-gelar 1 tahun di universitas terkemuka AS dengan pendanaan penuh',
      'Tunjangan hidup bulanan, biaya perkuliahan profesional, dan tunjangan buku/komputer',
      'Tiket penerbangan internasional PP dan perjalanan domestik AS',
      'Penempatan magang profesional (Professional Affiliation) di institusi/lembaga terkemuka AS',
      'Program kepemimpinan intensif di Washington D.C.'
    ],
    fieldsOfStudy: ['Kebijakan Publik & Hukum', 'Ekonomi & Keuangan', 'Kesehatan Masyarakat', 'Lingkungan & Iklim', 'Pendidikan'],
    requirements: {
      gpa: 'Gelar sarjana (S1) dengan catatan akademik baik',
      language: 'TOEFL ITP min 525 / iBT 71 / IELTS 6.0',
      maxAge: 'Tidak ada batas usia formal, ditujukan untuk karir menengah (mid-career)',
      workExperience: 'Minimal 5 tahun pengalaman kerja profesional purnawaktu di sektor publik/LSM',
      documents: [
        'Formulir pendaftaran Humphrey AMINEF',
        'Surat dukungan dari pimpinan institusi/atasan tempat bekerja',
        'Esai program profesional dan komitmen pengabdian publik',
        'Transkrip dan ijazah S1'
      ]
    },
    applicationPeriod: {
      open: 'Februari 2027',
      deadline: 'April 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.aminef.or.id',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Program pertukaran profesional satu tahun di AS untuk para praktisi karir menengah yang memiliki rekam jejak kepemimpinan dan dedikasi pada pelayanan publik.',
    tipsMandalika: 'Bukan program kuliah gelar, melainkan kombinasi studi pascasarjana dan magang kerja di lembaga AS. Sangat cocok bagi ASN, aktivis NGO, atau jurnalis daerah.',
    quota: '± 5-10 fellow dari Indonesia per tahun',
    selectionStages: ['Seleksi Berkas AMINEF', 'Wawancara Panel Jakarta', 'Nominasi ke Washington D.C.', 'Penempatan Host University AS'],
    regionGroup: 'Amerika Serikat',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: false,
    statusNote: 'Program 1 tahun non-gelar profesional karir menengah di kampus AS pendanaan penuh. Setahun sekali.'
  },
  {
    id: 'knight-hennessy',
    name: 'Knight-Hennessy Scholars (Stanford University)',
    organizer: 'Stanford University, California',
    country: 'Amerika Serikat',
    flag: '🇺🇸',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Pendanaan penuh hingga 3 tahun untuk program pascasarjana Stanford (JD, MA, MBA, MD, MS, PhD)',
      'Biaya kuliah penuh (Tuition fee) di Stanford University',
      'Tunjangan biaya hidup bulanan dan tunjangan buku/akademik',
      'Tiket penerbangan tahunan PP ke dan dari Stanford',
      'King Global Leadership Program (KGLP) untuk pengembangan kepemimpinan mutakhir'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Bisnis & Ekonomi', 'Kedokteran & Kesehatan', 'Kebijakan Publik & Hukum', 'Sosial & Humaniora'],
    requirements: {
      gpa: 'Gelar sarjana diperoleh dalam 7 tahun terakhir; IPK mendekati sempurna',
      language: 'TOEFL iBT sesuai standar program pascasarjana Stanford target (umumnya 100+)',
      maxAge: 'Lulus S1 setelah Januari 2020',
      workExperience: 'Inisiatif kepemimpinan luar biasa dan pemikiran independen (Independence of Thought)',
      documents: [
        'Aplikasi terpisah Knight-Hennessy dan aplikasi program pascasarjana Stanford',
        'Resume / CV 1 halaman',
        '2 Esai reflektif Knight-Hennessy',
        'Video statement 2 menit menjawab pertanyaan spesifik',
        '2 Surat rekomendasi kepemimpinan'
      ]
    },
    applicationPeriod: {
      open: 'Juni 2027',
      deadline: 'Awal Oktober 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://knight-hennessy.stanford.edu',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Komunitas beasiswa pascasarjana terbesar di dunia di Stanford University, membekali calon pemimpin global untuk memecahkan persoalan paling rumit umat manusia.',
    tipsMandalika: 'Knight-Hennessy menilai tiga pilar: Independence of Thought, Purposeful Leadership, dan Civic Mindset. Ceritakan orisinalitas ide Anda dalam memecahkan masalah lokal.',
    quota: '± 80-100 scholars global per tahun',
    selectionStages: ['Aplikasi Online & Video', 'Penyaringan Berkas Komite Stanford', 'Immersion Weekend di Kampus Stanford', 'Pengumuman Final'],
    regionGroup: 'Amerika Serikat',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: true,
    statusNote: '✔ Tenggat 6 Okt 2026 (siklus 2027 telah ditutup). Siklus berikutnya dibuka pertengahan 2027 dengan batas awal Okt 2027.'
  },
  {
    id: 'east-west-center',
    name: 'East-West Center Graduate Degree Fellowship',
    organizer: 'East-West Center & University of Hawaii at Manoa',
    country: 'Amerika Serikat',
    flag: '🇺🇸',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah penuh di University of Hawaii at Manoa',
      'Akomodasi di asrama residence hall East-West Center di Honolulu, Hawaii',
      'Tunjangan biaya hidup bulanan untuk makan dan kebutuhan pribadi',
      'Tunjangan buku dan asuransi kesehatan',
      'Program kepemimpinan komunitas dan seminar pemahaman lintas budaya Asia-Pasifik'
    ],
    fieldsOfStudy: ['Sosial & Humaniora', 'Lingkungan & Kelautan', 'Kebijakan Publik & Hukum', 'Ekonomi Pembangunan', 'Komunikasi'],
    requirements: {
      gpa: 'IPK minimal 3.00 pada jenjang sarjana',
      language: 'TOEFL iBT min 79 atau IELTS min 6.5',
      maxAge: 'Tidak ada batasan',
      workExperience: 'Ketertarikan tinggi pada isu-isu kawasan Asia Pasifik',
      documents: [
        'Aplikasi online East-West Center dan aplikasi University of Hawaii',
        'Esai komitmen pengembangan kawasan Asia Pasifik',
        '3 Surat rekomendasi akademik/profesional',
        'Transkrip nilai dan sertifikat bahasa resmi'
      ]
    },
    applicationPeriod: {
      open: 'Agustus 2026',
      deadline: '1 Desember 2026',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://www.eastwestcenter.org',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Fellowship pascasarjana penuh untuk studi di University of Hawaii dan tinggal di lingkungan multikultural East-West Center, berfokus pada kolaborasi Asia Pasifik dan AS.',
    tipsMandalika: 'Lokasi di Hawaii sangat dekat dengan karakteristik geografis pulau tropis Indonesia. Sangat cocok bagi Anda yang menekuni riset kelautan, mitigasi bencana pulau, atau pariwisata berkelanjutan.',
    quota: '± 20-30 fellow global per tahun',
    selectionStages: ['Pendaftaran Ganda (EWC & UH Manoa)', 'Seleksi Berkas Dokumen', 'Wawancara Online', 'Pengumuman Penerima'],
    regionGroup: 'Amerika Serikat',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: false,
    statusNote: 'Fellowship penuh kawasan Asia Pasifik di Hawaii. Tenggat pendaftaran menjelang akhir tahun (1 Des).'
  },

  // ==========================================
  // 4. AUSTRALIA
  // ==========================================
  {
    id: 'australia-awards-aas',
    name: 'Indonesia Australia Awards (AAS)',
    organizer: 'Departemen Luar Negeri dan Perdagangan (DFAT) Australia',
    country: 'Australia',
    flag: '🇦🇺',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Full tuition fee di universitas terkemuka Australia (Group of Eight & kampus mitra)',
      'Tunjangan hidup bulanan (Contribution to Living Expenses / CLE) AUD ~2.500/bulan (~Rp 26 juta)',
      'Tiket penerbangan internasional kelas ekonomi PP Indonesia - Australia',
      'Asuransi Overseas Student Health Cover (OSHC) untuk mahasiswa selama masa beasiswa',
      'Pelatihan bahasa Inggris intensif (Pre-Departure Training / PDT) gratis di Bali/Jakarta',
      'Tunjangan kedatangan (Establishment Allowance)'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Ekonomi', 'Kesehatan & Gizi', 'Maritim & Kelautan'],
    requirements: {
      gpa: 'IPK min 2.90 untuk pelamar umum; KHUSUS wilayah target daerah (NTB, NTT, Maluku, Papua) min IPK 2.75',
      language: 'IELTS min 5.5 (untuk pelamar daerah target geografis GFA) atau 6.0 untuk pelamar umum',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Pengalaman kerja relevan diutamakan',
      documents: [
        'Salinan KTP & Akta Kelahiran resmi',
        'Ijazah dan Transkrip S1/S2 terjemahan resmi',
        'Sertifikat IELTS/TOEFL resmi yang masih berlaku',
        'Formulir Aplikasi AAS OASIS & Jawaban Pertanyaan Reflektif Pembangunan',
        'Curriculum Vitae terbaru',
        'Surat rekomendasi instansi / akademisi'
      ]
    },
    applicationPeriod: {
      open: '1 Februari 2027',
      deadline: '30 April 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.australiaawardsindonesia.org',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa tertua dan paling inklusif di Indonesia, dengan kuota khusus afirmasi untuk pelamar dari kawasan Indonesia Timur (termasuk NTB & NTT) serta penyandang disabilitas.',
    tipsMandalika: 'Sebagai talenta NTB/NTT/Indonesia Timur, Anda masuk Kategori Geographic Focus Area (GFA) dengan syarat IELTS lebih lunak (5.5) dan peluang lolos jauh lebih tinggi dibanding pelamar umum!',
    quota: '± 200 penerima dari Indonesia tiap tahun',
    selectionStages: ['Seleksi Berkas Online Oasis', 'Shortlisting & Uji IELTS Tambahan', 'Joint Selection Team (JST) Interview', 'Pre-Departure Training (PDT) di Indonesia', 'Keberangkatan'],
    regionGroup: 'Australia',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: true,
    statusNote: '✔ Intake 2027 ditutup 30 Apr 2026 (status: telah lewat). Intake 2028 dibuka 1 Feb - 30 Apr 2027.'
  },
  {
    id: 'lpdp-australia-awards',
    name: 'LPDP–Australia Awards Joint Scholarship',
    organizer: 'LPDP (Kemenkeu RI) & DFAT Australia',
    country: 'Australia',
    flag: '🇦🇺',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Pendanaan bersama LPDP dan Pemerintah Australia dengan cakupan 100% penuh',
      'Biaya perkuliahan penuh di universitas kelas dunia di Australia',
      'Tunjangan biaya hidup bulanan standar Australia',
      'Tiket pesawat PP, visa, tunjangan kedatangan, dan asuransi OSHC',
      'Jejaring bilateral strategis Indonesia-Australia'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Transisi Energi & Iklim', 'Ekonomi Digital', 'Kesehatan Masyarakat', 'Kebijakan Publik'],
    requirements: {
      gpa: 'IPK minimal 3.00 pada jenjang sarjana',
      language: 'IELTS minimal 6.5 atau TOEFL iBT minimal 80',
      maxAge: 'Maksimal 35 tahun (S2) dan 40 tahun (S3)',
      workExperience: 'Pengalaman kerja di sektor prioritas bilateral',
      documents: [
        'Formulir pendaftaran gabungan LPDP & Australia Awards',
        'Esai komitmen pengabdian dan proyek kolaborasi bilateral',
        'Transkrip nilai, ijazah, dan sertifikat bahasa',
        'Surat rekomendasi atasan atau dosen pembimbing'
      ]
    },
    applicationPeriod: {
      open: 'April 2027',
      deadline: 'Mei 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.australiaawardsindonesia.org',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Skema prestisius hasil kemitraan strategis Kementerian Keuangan RI dan DFAT Australia untuk mencetak pakar pada bidang prioritas transisi energi, ekonomi digital, dan kesehatan.',
    tipsMandalika: 'Fokuskan proposal studi pada penguatan hubungan kerja sama perdagangan, transisi energi hijau, atau riset inovasi antara Indonesia dan Australia.',
    quota: '± 20-30 awardee per tahun',
    selectionStages: ['Pendaftaran Bersama', 'Seleksi Administrasi Dual Komite', 'Wawancara Panel Gabungan LPDP & DFAT', 'Pengumuman Final'],
    regionGroup: 'Australia',
    seasonPattern: 'Apr-Jun',
    isVerifiedCheckmark: true,
    statusNote: '✔ Intake 2027 sudah ditutup (Apr-awal Mei 2026). Siklus berikutnya dibuka April 2027.'
  },
  {
    id: 'australia-awards-garuda',
    name: 'Australia Awards Garuda & Specialized Tracks',
    organizer: 'DFAT Pemerintah Australia',
    country: 'Australia',
    flag: '🇦🇺',
    level: ['S2'],
    fundingType: 'Fully Funded',
    coverage: [
      'Pendanaan penuh biaya kuliah S2 di universitas mitra Australia',
      'Tunjangan biaya hidup bulanan, tiket penerbangan PP, asuransi OSHC',
      'Pelatihan kepemimpinan dan spesialisasi sektoral terarah (misal pendidikan penerbangan/teknis)'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Pendidikan & Pedagogi', 'Aero & Transportasi', 'Kebijakan Publik'],
    requirements: {
      gpa: 'IPK minimal 2.90',
      language: 'IELTS minimal 6.0 / 6.5',
      maxAge: 'Tidak ada batasan kaku',
      workExperience: 'Bekerja pada sektor industri penerbangan, kedirgantaraan, atau institusi mitra',
      documents: [
        'Formulir pendaftaran jalur Garuda/Khusus',
        'Surat dukungan instansi',
        'Ijazah, transkrip, sertifikat bahasa',
        'Pernyataan tujuan studi spesifik'
      ]
    },
    applicationPeriod: {
      open: 'Februari 2027',
      deadline: 'April 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.australiaawardsindonesia.org',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Jalur spesifik Australia Awards untuk penguatan kapasitas sektoral di bidang pendidikan, aviasi, transportasi, dan kemitraan bilateral.',
    tipsMandalika: 'Periksa kesesuaian latar belakang profesi Anda dengan tema tahunan yang dirilis oleh Kedutaan Besar Australia di Jakarta.',
    quota: 'Tergantung kuota sektoral tahunan',
    selectionStages: ['Pendaftaran Khusus Sektoral', 'Evaluasi Teknis', 'Wawancara', 'Pemberangkatan'],
    regionGroup: 'Australia',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: false,
    statusNote: 'Skema terarah misal pendidikan/aviasi. Mengikuti pengumuman berkala DFAT Australia.'
  },
  {
    id: 'australia-maritime-security',
    name: 'Australia Maritime Security Scholarships',
    organizer: 'Departemen Luar Negeri dan Perdagangan (DFAT) Australia',
    country: 'Australia',
    flag: '🇦🇺',
    level: ['S2', 'Riset'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah pascasarjana penuh bidang keamanan maritim di kampus terkemuka Australia',
      'Uang saku biaya hidup bulanan standar Australia',
      'Tiket penerbangan internasional PP, asuransi OSHC, dan tunjangan studi lapangan'
    ],
    fieldsOfStudy: ['Kebijakan Publik & Hukum', 'Maritim & Kelautan', 'Keamanan Internasional & Pertahanan'],
    requirements: {
      gpa: 'IPK minimal 2.90',
      language: 'IELTS min 6.5',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Pegawai pemerintah atau praktisi di bidang maritim, kelautan, dan pertahanan laut',
      documents: [
        'Surat rekomendasi dari kementerian kelautan/keamanan/pertahanan',
        'Dokumen akademik dan sertifikat bahasa',
        'Esai kontribusi terhadap tata kelola perairan maritim regional'
      ]
    },
    applicationPeriod: {
      open: 'Februari 2027',
      deadline: '30 April 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.dfat.gov.au',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa pascasarjana khusus bagi pegawai pemerintah dan profesional bidang maritim untuk memperkuat kerja sama keamanan maritim dan hukum laut internasional.',
    tipsMandalika: 'Sangat relevan bagi putra daerah NTB dan kepulauan Indonesia Timur yang bertugas di instansi kelautan, perikanan, atau penjaga laut (Bakamla/TNI AL/Kemenhub).',
    quota: '± 10-15 kuota khusus per intake',
    selectionStages: ['Pendaftaran Jalur Maritim', 'Penyaringan Berkas DFAT', 'Wawancara Panel Ahli Maritim', 'Awarding'],
    regionGroup: 'Australia',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: true,
    statusNote: '✔ Intake 2027 ditutup 30 Apr 2026. Siklus berikutnya dibuka Februari - 30 April 2027.'
  },

  // ==========================================
  // 5. SELANDIA BARU DAN KANADA
  // ==========================================
  {
    id: 'manaaki-nz',
    name: 'Manaaki New Zealand Scholarships',
    organizer: 'Kementerian Luar Negeri dan Perdagangan Selandia Baru (MFAT)',
    country: 'Selandia Baru',
    flag: '🇳🇿',
    level: ['S1', 'S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah penuh (Tuition fee) di universitas terakreditasi di Selandia Baru',
      'Tunjangan biaya hidup (Living allowance) NZD $531 per dua minggu (setara ~NZD $1.150/bulan)',
      'Tunjangan awal kedatangan (Establishment allowance) NZD $3.000',
      'Tiket penerbangan internasional kelas ekonomi PP',
      'Asuransi perjalanan dan kesehatan komprehensif',
      'Tunjangan riset dan penulisan tesis untuk pascasarjana'
    ],
    fieldsOfStudy: ['Lingkungan & Energi', 'Pertanian & Ketahanan Pangan', 'Manajemen Bencana', 'Teknologi Informasi & STEM', 'Pemerintahan'],
    requirements: {
      gpa: 'Nilai akademik baik (IPK minimal 3.00 untuk S2/S3; rapor 80+ untuk S1)',
      language: 'IELTS min 6.5 (tidak ada band < 6.0) untuk pascasarjana; IELTS 6.0 untuk sarjana',
      maxAge: 'Berusia minimal 18 tahun saat memulai studi, diutamakan di bawah 40 tahun',
      workExperience: 'Minimal 1 tahun pengalaman kerja relevan (2 tahun untuk pelamar beasiswa pascasarjana)',
      documents: [
        'Formulir aplikasi online Manaaki NZ Portal',
        'Esai penjabaran kontribusi pada sektor prioritas Selandia Baru-Indonesia',
        'Transkrip akademik dan ijazah berbahasa Inggris',
        'Bukti pengalaman kerja dan referensi atasan'
      ]
    },
    applicationPeriod: {
      open: '1 Februari 2027',
      deadline: '28 Februari 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.nzscholarships.govt.nz',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa bergengsi pemerintah Selandia Baru yang berfokus pada ketahanan iklim, energi terbarukan, manajemen bencana, dan ketahanan pangan.',
    tipsMandalika: 'Fokuskan pilihan studi pada sektor keunggulan New Zealand: Energi Panas Bumi (Geothermal), Manajemen Risiko Bencana Alam, atau Pertanian Modern yang sangat cocok untuk NTB!',
    quota: '± 30-40 mahasiswa dari Indonesia per tahun',
    selectionStages: ['Eligibility Test Online', 'Aplikasi Berkas & Esai Pembangunan', 'Wawancara Psikometri & Panel Daring', 'Penempatan Universitas'],
    regionGroup: 'Selandia Baru & Kanada',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: false,
    statusNote: 'Pendaftaran dibuka awal tahun (Februari) dan ditutup akhir Februari/Maret.'
  },
  {
    id: 'pearson-toronto',
    name: 'Lester B. Pearson International Scholarship',
    organizer: 'University of Toronto, Kanada',
    country: 'Kanada',
    flag: '🇨🇦',
    level: ['S1'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah penuh (Tuition fee) selama 4 tahun program sarjana di University of Toronto',
      'Tunjangan buku teks dan perlengkapan perkuliahan',
      'Biaya insidental penuh mahasiswa internasional',
      'Tunjangan tempat tinggal asrama kampus (Residence support) penuh selama 4 tahun'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Manajemen', 'Sains Hayati & Komputer', 'Seni'],
    requirements: {
      gpa: 'Prestasi akademik rapor SMA/SMK peringkat teratas di sekolah',
      language: 'IELTS min 6.5 (tidak ada band < 6.0) atau TOEFL iBT min 100',
      maxAge: 'Lulusan SMA tahun berjalan atau baru lulus yang belum memulai studi universitas',
      workExperience: 'Rekam jejak kepemimpinan siswa dan dampak sosial di komunitas sekolah',
      documents: [
        'Nominasi resmi dari Kepala Sekolah SMA/SMK asal (School Nomination)',
        'Aplikasi pendaftaran mahasiswa baru ke University of Toronto (OUAC)',
        'Esai aplikasi beasiswa Lester B. Pearson',
        'Rapor SMA semester 1-5'
      ]
    },
    applicationPeriod: {
      open: 'September 2026',
      deadline: '30 November 2026 (Nominasi) / 15 Januari 2027 (Aplikasi)',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://future.utoronto.ca',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa sarjana S1 paling prestisius dan kompetitif di Kanada untuk siswa SMA internasional yang memiliki rekam jejak akademik cemerlang dan kreativitas kepemimpinan.',
    tipsMandalika: 'Hanya siswa yang dinominasikan secara resmi oleh SMA-nya yang dapat mendaftar. Pastikan sekolah Anda mengajukan nominasi sebelum 30 November!',
    quota: '± 37 siswa dari seluruh dunia per tahun',
    selectionStages: ['Nominasi Sekolah', 'Aplikasi OUAC U of T', 'Aplikasi Esai Beasiswa Pearson', 'Pengumuman Penerima (April)'],
    regionGroup: 'Selandia Baru & Kanada',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: false,
    statusNote: 'Nominasi sekolah ditutup akhir November, aplikasi mahasiswa ditutup pertengahan Januari.'
  },
  {
    id: 'vanier-cgs',
    name: 'Vanier Canada Graduate Scholarships (Vanier CGS)',
    organizer: 'Pemerintah Federal Kanada (CIHR, NSERC, SSHRC)',
    country: 'Kanada',
    flag: '🇨🇦',
    level: ['S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Pendanaan doktoral CAD $50.000 per tahun selama 3 tahun masa studi PhD di Kanada',
      'Dapat dialokasikan untuk biaya pendidikan, biaya hidup, dan aktivitas riset laboratorium tingkat tinggi'
    ],
    fieldsOfStudy: ['Kedokteran & Kesehatan (CIHR)', 'Engineering & Natural Sciences (NSERC)', 'Sosial & Humaniora (SSHRC)'],
    requirements: {
      gpa: 'Prestasi akademik tingkat master first-class (IPK setara 3.80+)',
      language: 'Sesuai standar universitas Kanada target (IELTS min 7.0 / TOEFL iBT 100)',
      maxAge: 'Sedang mengejar gelar PhD tahun pertama atau akan mendaftar PhD',
      workExperience: 'Potensi kepemimpinan dan publikasi ilmiah terindeks',
      documents: [
        'Nominasi resmi dari salah satu universitas Kanada yang memiliki kuota Vanier',
        'Proposal riset doktoral komprehensif',
        'Surat referensi kepemimpinan (Leadership Reference Letter)',
        'Dua surat rekomendasi akademik dari periset terkemuka'
      ]
    },
    applicationPeriod: {
      open: 'Juli 2026',
      deadline: '1 November 2026',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://vanier.gc.ca',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Program beasiswa doktoral utama pemerintah Kanada untuk menarik peneliti PhD kelas dunia ke perguruan tinggi Kanada.',
    tipsMandalika: 'Kriteria penilaian dibagi sama rata: Academic Excellence, Research Potential, dan Leadership. Jangan hanya fokus pada paper riset, tonjolkan inisiatif kepemimpinan Anda!',
    quota: '± 166 beasiswa baru dianugerahkan per tahun',
    selectionStages: ['Pengajuan ke Universitas Kanada', 'Nominasi Kampus ke Komite Federal', 'Penilaian Dewan Riset Kanada (Tri-Agency)', 'Pengumuman Final (April)'],
    regionGroup: 'Selandia Baru & Kanada',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: false,
    statusNote: 'Pendanaan doktoral kampus Kanada. Nominasi universitas berlangsung musim gugur (Okt/Nov).'
  },
  {
    id: 'trudeau-foundation',
    name: 'Pierre Elliott Trudeau Foundation Scholarships',
    organizer: 'Pierre Elliott Trudeau Foundation, Kanada',
    country: 'Kanada',
    flag: '🇨🇦',
    level: ['S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Tunjangan biaya hidup dan perkuliahan hingga CAD $40.000 per tahun selama 3 tahun',
      'Tunjangan penelitian dan perjalanan ilmiah hingga CAD $20.000 per tahun',
      'Program mentoring kepemimpinan bersama para Fellows dan Mentors terkemuka Kanada',
      'Akses ke forum kepemimpinan publik dan konferensi internasional di berbagai kota Kanada'
    ],
    fieldsOfStudy: ['Sosial & Humaniora', 'Hak Asasi Manusia & Keadilan', 'Kewarganegaraan & Hubungan Internasional', 'Lingkungan & Masyarakat'],
    requirements: {
      gpa: 'Mahasiswa doktoral tahun pertama atau kedua di bidang ilmu sosial/humaniora',
      language: 'Kemampuan bahasa Inggris yang lancar (bahasa Prancis menjadi nilai tambah besar)',
      maxAge: 'Tidak ada batasan',
      workExperience: 'Keterlibatan publik dan komitmen terhadap dialog masyarakat sipil',
      documents: [
        'Aplikasi online portal Trudeau Foundation',
        'Proposal penelitian doktoral bertema isu sosial kontemporer',
        '3 Surat rekomendasi (akademik dan kepemimpinan komunitas)',
        'Transkrip pascasarjana'
      ]
    },
    applicationPeriod: {
      open: 'September 2026',
      deadline: 'Desember 2026',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://www.trudeaufoundation.ca',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Program kepemimpinan doktoral Kanada yang melatih peneliti ilmu sosial dan humaniora agar karyanya tidak sekadar di perpustakaan, tetapi berdampak pada kebijakan publik.',
    tipsMandalika: 'Yayasan mencari "Public Intellectuals" masa depan. Jelaskan bagaimana riset Anda tentang masyarakat atau kearifan lokal dapat berkontribusi pada tata kelola dunia.',
    quota: '± 16 scholars terpilih dari seluruh dunia per tahun',
    selectionStages: ['Pendaftaran Daring', 'Review Komite Penilai', 'Wawancara Semi-Final', 'Wawancara Panel Final Trudeau'],
    regionGroup: 'Selandia Baru & Kanada',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: false,
    statusNote: 'Doktoral humaniora & ilmu sosial kampus Kanada. Dibuka setahun sekali menjelang akhir tahun.'
  },

  // ==========================================
  // 6. JEPANG
  // ==========================================
  {
    id: 'mext-japan',
    name: 'MEXT Scholarship (Monbukagakusho)',
    organizer: 'Kementerian Pendidikan, Budaya, Olahraga, Sains & Teknologi (MEXT) Jepang',
    country: 'Jepang',
    flag: '🇯🇵',
    level: ['S1', 'S2', 'S3', 'Riset'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah (Tuition fee) 100% lunas di universitas negeri Jepang',
      'Uang saku bulanan bebas pajak: ¥117.000 - ¥145.000 (~Rp 13-16 juta/bulan)',
      'Tiket pesawat internasional PP Indonesia - Jepang',
      'Kursus persiapan bahasa Jepang intensif 6 bulan - 1 tahun sebelum kuliah',
      'Bebas biaya ujian masuk dan pendaftaran universitas',
      'TANPA IKATAN DINAS (bebas berkarier di Jepang atau pulang ke Indonesia)'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Ekonomi', 'Kedokteran & Kesehatan', 'Seni & Desain'],
    requirements: {
      gpa: 'Minimal 3.20 / 4.00 (S2/S3) atau rata-rata rapor 84 (S1/D3/Kosen/Senshu)',
      language: 'TOEFL ITP min 550 / iBT 80 / IELTS 6.0 atau sertifikat JLPT (N2/N3 diutamakan)',
      maxAge: 'Maksimal 34 tahun saat mendaftar (untuk S2/S3); Di bawah 24 tahun untuk S1',
      workExperience: 'Tidak wajib, namun relevan untuk pelamar riset',
      documents: [
        'Formulir pendaftaran resmi MEXT',
        'Field of Study and Research Program Plan (Proposal Riset)',
        'Salinan Ijazah & Transkrip Akademik Berbahasa Inggris',
        'Surat Rekomendasi dari Dekan/Dosen Pembimbing',
        'Sertifikat Kemampuan Bahasa (Inggris/Jepang)',
        'Abstrak Skripsi/Tesis'
      ]
    },
    applicationPeriod: {
      open: 'April 2026',
      deadline: 'Mei / Juni 2026',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://www.id.emb-japan.go.jp',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa paling prestisius dari pemerintah Jepang dengan pembiayaan penuh tanpa ikatan dinas kembali ke tanah air, terbuka bagi jalur Kedutaan (Embassy) maupun Universitas (U-to-U).',
    tipsMandalika: 'Kunci lolos MEXT terletak pada "Research Plan" yang selaras dengan laboratorium profesor target di Jepang. Untuk anak daerah, tunjukkan kontribusi riset Anda terhadap pemecahan masalah lokal di Indonesia.',
    quota: '± 200 mahasiswa dari Indonesia per tahun',
    selectionStages: ['Seleksi Berkas Dokumen', 'Ujian Tertulis (Bahasa Inggris & Jepang)', 'Wawancara Kedutaan Besar Jepang', 'Pencarian Letter of Acceptance (LoA)', 'Pengumuman Final MEXT Tokyo'],
    regionGroup: 'Jepang',
    seasonPattern: 'Apr-Jun',
    isVerifiedCheckmark: true,
    statusNote: '✔ Embassy Rec 2027 dibuka 2026 (Apr-Jun). University Rec mengikuti jadwal kampus masing-masing (Okt-Jan).'
  },
  {
    id: 'inpex-japan',
    name: 'INPEX Scholarship Foundation',
    organizer: 'INPEX Scholarship Foundation, Tokyo',
    country: 'Jepang',
    flag: '🇯🇵',
    level: ['S2'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah penuh (Entrance fee, tuition fee) di universitas negeri/swasta di Jepang',
      'Tunjangan biaya hidup bulanan ¥160.000 (~Rp 17,5 juta/bulan)',
      'Tiket pesawat internasional PP Indonesia - Tokyo',
      'Tunjangan kedatangan (Commemorative allowance) ¥60.000',
      'Asuransi kecelakaan dan kesehatan mahasiswa'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sains Alam (Fisika, Kimia, Biologi)', 'Geologi & Geofisika', 'Pertambangan & Energi'],
    requirements: {
      gpa: 'IPK minimal 3.00 pada jenjang Sarjana (S1)',
      language: 'TOEFL iBT min 80 / IELTS min 6.5 / TOEFL ITP min 550',
      maxAge: 'Berusia di bawah 30 tahun saat mendaftar',
      workExperience: 'Lulusan sarjana di bidang Natural Science (Sains Alam/Teknik)',
      documents: [
        'Formulir aplikasi resmi INPEX Foundation',
        'Study and Research Plan di universitas Jepang',
        'Surat rekomendasi dari Dekan atau Profesor pembimbing S1',
        'Surat keterangan sehat resmi dokter',
        'Salinan ijazah dan transkrip nilai resmi'
      ]
    },
    applicationPeriod: {
      open: 'Agustus 2026',
      deadline: '31 Oktober 2026',
      deadlineStatus: 'closing_soon'
    },
    officialUrl: 'https://www.inpex-s.com',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa swasta penuh paling bonafide dari korporasi energi Jepang untuk mencetak talenta Indonesia bergelar Master di bidang ilmu sains alam dan teknik.',
    tipsMandalika: 'Fokuskan proposal riset Anda pada eksplorasi geologi kelautan, energi baru terbarukan, atau rekayasa material yang bernilai strategis bagi pengembangan sumber daya alam Indonesia.',
    quota: '± 3-4 penerima per tahun se-Indonesia',
    selectionStages: ['Seleksi Dokumen Berkas', 'Wawancara Daring/Luring Jakarta', 'Pengumuman Penerima (Januari/Februari)'],
    regionGroup: 'Jepang',
    seasonPattern: 'Jul-Sep',
    isVerifiedCheckmark: true,
    statusNote: '✔ Tenggat pendaftaran 31 Oktober 2026 untuk perkuliahan Oktober 2027. Terbuka khusus jurusan STEM / Natural Science.'
  },
  {
    id: 'jds-japan',
    name: 'JDS (Japanese Grant Aid for HRD)',
    organizer: 'JICA (Japan International Cooperation Agency) & Pemerintah Jepang',
    country: 'Jepang',
    flag: '🇯🇵',
    level: ['S2'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah penuh program Master di universitas ternama Jepang',
      'Uang saku bulanan yang memadai untuk biaya hidup di Jepang',
      'Tiket penerbangan internasional PP',
      'Tunjangan buku, subsidi pengadaan komputer, dan subsidi sewa tempat tinggal',
      'Seminar khusus kepemimpinan dan pembangunan ekonomi'
    ],
    fieldsOfStudy: ['Kebijakan Publik & Hukum', 'Ekonomi & Keuangan Daerah', 'Infrastruktur & Transportasi', 'Manajemen Bencana', 'Hubungan Internasional'],
    requirements: {
      gpa: 'IPK minimal 2.75 pada jenjang S1',
      language: 'TOEFL ITP min 500 / iBT 61 / IELTS 5.5',
      maxAge: 'Maksimal 40 tahun saat mendaftar',
      workExperience: 'Wajib berstatus PNS / ASN di kementerian/lembaga/pemerintah daerah minimal 2 tahun',
      documents: [
        'Formulir aplikasi JDS',
        'Surat izin dan rekomendasi resmi dari Pejabat Pembina Kepegawaian (Bappenas/BKD)',
        'Proposal riset pemecahan masalah administrasi atau kebijakan publik',
        'Ijazah dan transkrip S1'
      ]
    },
    applicationPeriod: {
      open: 'Juli 2026',
      deadline: 'Oktober 2026',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://jds-scholarship.org',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Program hibah pemerintah Jepang untuk peningkatan kapasitas aparatur sipil negara (ASN) calon pemimpin masa depan pembuat kebijakan publik Indonesia.',
    tipsMandalika: 'Khusus bagi pegawai Pemda/Bappeda di NTB dan kabupaten/kota luar Jawa: JDS mengalokasikan kuota untuk desentralisasi dan tata kelola daerah.',
    quota: '± 24 pegawai ASN per tahun',
    selectionStages: ['Pemeriksaan Dokumen & Izin Instansi', 'Ujian Matematika & Bahasa Inggris', 'Wawancara Universitas Jepang di Jakarta', 'Persetujuan Komite Pengarah Gabungan'],
    regionGroup: 'Jepang',
    seasonPattern: 'Jul-Sep',
    isVerifiedCheckmark: false,
    statusNote: 'Khusus pegawai pemerintah/mitra (ASN) negara mitra. Dibuka tahunan via JICA.'
  },

  // ==========================================
  // 7. KOREA SELATAN, TIONGKOK, TAIWAN, HONG KONG
  // ==========================================
  {
    id: 'gks-korea',
    name: 'Global Korea Scholarship (GKS / KGSP)',
    organizer: 'National Institute for International Education (NIIED) Korea Selatan',
    country: 'Korea Selatan',
    flag: '🇰🇷',
    level: ['S1', 'S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya SPP kuliah 100% lunas sampai selesai masa studi',
      'Uang saku bulanan: 1.000.000 KRW (S1) - 1.500.000 KRW (S2/S3) (~Rp 12-18 juta/bulan)',
      'Tiket pesawat internasional PP Indonesia - Korea Selatan',
      'Kursus bahasa Korea intensif 1 tahun sebelum perkuliahan di universitas bahasa Korea',
      'Tunjangan awal pemukiman 200.000 KRW & tunjangan publikasi riset',
      'Asuransi kesehatan nasional Korea (NHIS)'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Ekonomi', 'K-Culture & Desain', 'Teknologi Informasi'],
    requirements: {
      gpa: 'Minimal nilai kumulatif 80% dari skala 100% atau IPK 3.00 dari 4.00',
      language: 'Tidak wajib sertifikat bahasa (TOPIK/IELTS), namun sertifikat memberikan poin bonus signifikan',
      maxAge: 'Maks 25 tahun untuk S1; Maks 40 tahun untuk S2/S3',
      workExperience: 'Tidak diwajibkan',
      documents: [
        'Formulir resmi NIIED GKS',
        'Personal Statement yang kuat dan terarah',
        'Statement of Purpose (Study Plan & Future Career)',
        '2 Surat Rekomendasi bertanda tangan dalam amplop tertutup',
        'Medical Assessment Form',
        'Kartu Keluarga dan Akta Lahir (bukti kewarganegaraan)'
      ]
    },
    applicationPeriod: {
      open: 'September 2026 (S1) / Februari 2027 (Pascasarjana)',
      deadline: 'Oktober 2026 (S1) / Maret 2027 (Pascasarjana)',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://www.studyinkorea.go.kr',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa bergengsi dari pemerintah Korea Selatan untuk studi di universitas ternama Korea dengan fasilitas pelatihan bahasa Korea 1 tahun penuh.',
    tipsMandalika: 'Jika mendaftar melalui University Track (jalur kampus regional Korea), peluang lolos pelamar Indonesia jauh lebih besar daripada jalur Embassy Track yang diperebutkan ribuan pelamar!',
    quota: '± 70 mahasiswa dari Indonesia per tahun',
    selectionStages: ['Seleksi Tahap 1 (Kedutaan / Universitas)', 'Seleksi Tahap 2 (NIIED Pusat Seoul)', 'Seleksi Tahap 3 (Penerimaan Departemen Kampus)', 'Pemberangkatan'],
    regionGroup: 'Korea, Tiongkok, Taiwan & HK',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: false,
    statusNote: 'Jalur Kedutaan dibuka awal tahun (Feb-Mar), jalur S1 dibuka musim gugur (Sep-Okt).'
  },
  {
    id: 'koica-korea',
    name: 'KOICA Scholarship Program',
    organizer: 'Korea International Cooperation Agency (KOICA)',
    country: 'Korea Selatan',
    flag: '🇰🇷',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah penuh di universitas ternama di Korea Selatan',
      'Tunjangan biaya hidup bulanan KRW 999.000/bulan',
      'Akomodasi asrama universitas yang nyaman',
      'Tiket penerbangan internasional kelas ekonomi PP',
      'Asuransi kesehatan dan kegiatan studi lapangan kebudayaan Korea'
    ],
    fieldsOfStudy: ['Kebijakan Publik & Tata Kelola', 'Pembangunan Ekonomi & Pedesaan', 'Teknologi Informasi & Smart City', 'Kesehatan Masyarakat'],
    requirements: {
      gpa: 'IPK minimal 3.00 pada jenjang Sarjana',
      language: 'TOEFL iBT min 80 / IELTS min 6.0',
      maxAge: 'Diutamakan di bawah 40 tahun',
      workExperience: 'Pegawai pemerintah/lembaga publik negara mitra minimal 2 tahun',
      documents: [
        'Formulir aplikasi resmi KOICA',
        'Surat nominasi dari kementerian asal (misal Setneg RI)',
        'Proposal riset kebijakan pembangunan',
        'Transkrip dan ijazah berbahasa Inggris'
      ]
    },
    applicationPeriod: {
      open: 'Januari 2027',
      deadline: 'Maret 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.koica.go.kr',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Program beasiswa Master pemerintah Korea bagi pejabat dan aparatur pemerintah negara berkembang untuk belajar dari keajaiban pembangunan ekonomi Korea (Saemaul Undong).',
    tipsMandalika: 'Fokuskan riset Anda pada adopsi teknologi e-government atau model pembangunan ekonomi pedesaan Korea yang dapat diduplikasi di daerah Anda.',
    quota: '± 15-20 pegawai dari Indonesia per tahun',
    selectionStages: ['Nominasi Instansi & Verifikasi Setneg', 'Seleksi Dokumen KOICA & Universitas', 'Wawancara Online Universitas Korea', 'Medical Checkup & Visa'],
    regionGroup: 'Korea, Tiongkok, Taiwan & HK',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: false,
    statusNote: 'Program beasiswa S2 bagi pegawai pemerintah dan mitra pembangunan. Dibuka awal tahun.'
  },
  {
    id: 'csc-china',
    name: 'Chinese Government Scholarship (CSC)',
    organizer: 'China Scholarship Council (CSC) & Kementerian Pendidikan Tiongkok',
    country: 'Tiongkok',
    flag: '🇨🇳',
    level: ['S1', 'S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Bebas biaya perkuliahan (Tuition fee waiver) 100%',
      'Akomodasi kamar asrama gratis di dalam kampus universitas',
      'Uang saku bulanan: S1: RMB 2.500; S2: RMB 3.000; S3: RMB 3.500 (~Rp 5,5 - 8 juta/bulan)',
      'Asuransi kesehatan komprehensif untuk mahasiswa internasional di Tiongkok'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Bisnis & Ekonomi', 'Kedokteran & Farmasi', 'Sosial & Humaniora', 'Bahasa & Sastra Mandarin'],
    requirements: {
      gpa: 'Prestasi akademik baik (IPK minimal 3.00 untuk S2/S3; rapor 80+ untuk S1)',
      language: 'Program Inggris: IELTS min 6.0 / TOEFL iBT 80; Program Mandarin: Sertifikat HSK level 4 (S1) atau HSK 5 (S2/S3)',
      maxAge: 'S1: di bawah 25 thn; S2: di bawah 35 thn; S3: di bawah 40 thn',
      workExperience: 'Tidak diwajibkan',
      documents: [
        'Formulir pendaftaran CSC online (Jalur Type A Kedutaan atau Type B Universitas)',
        'Salinan Ijazah dan Transkrip Nilai notaris tersumpah',
        'Study Plan / Research Proposal (minimal 800 kata)',
        'Dua surat rekomendasi dari profesor/associate professor',
        'Foreigner Physical Examination Form (pemeriksaan kesehatan resmi)'
      ]
    },
    applicationPeriod: {
      open: 'Januari 2027',
      deadline: 'April 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.campuschina.org',
    difficulty: 'Moderat',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa pembiayaan penuh pemerintah Tiongkok di ratusan universitas terkemuka di Beijing, Shanghai, Wuhan, dan kota lainnya dengan ribuan kuota.',
    tipsMandalika: 'Jika mendaftar melalui Jalur Type B (langsung ke universitas target di Tiongkok) dan mengontongi Pre-Admission Letter dari profesor, peluang lolos Anda mencapai lebih dari 90%!',
    quota: '± 200+ mahasiswa Indonesia per tahun',
    selectionStages: ['Pendaftaran di portal CSC & Kampus', 'Pemeriksaan Berkas & Kontak Profesor', 'Verifikasi Kampus ke CSC Beijing', 'Penerbitan JW201 Form'],
    regionGroup: 'Korea, Tiongkok, Taiwan & HK',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: false,
    statusNote: 'Pendaftaran dibuka Januari - April untuk intake musim gugur (September) tahun berjalan.'
  },
  {
    id: 'schwarzman-scholars',
    name: 'Schwarzman Scholars (Tsinghua University)',
    organizer: 'Schwarzman Scholars & Tsinghua University, Beijing',
    country: 'Tiongkok',
    flag: '🇨🇳',
    level: ['S2'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah penuh Program Master of Global Affairs di Tsinghua University selama 1 tahun',
      'Akomodasi asrama modern dan makan di Schwarzman College, Beijing',
      'Tiket penerbangan internasional kelas ekonomi PP',
      'Uang saku personal bulanan ($4.000 selama program)',
      'Asuransi kesehatan lengkap, laptop, dan biaya studi lapangan di berbagai penjuru Tiongkok'
    ],
    fieldsOfStudy: ['Kebijakan Publik & Hubungan Internasional', 'Bisnis & Ekonomi', 'Kepemimpinan Global'],
    requirements: {
      gpa: 'Catatan akademik unggul di tingkat sarjana',
      language: 'TOEFL iBT min 100 / IELTS min 7.0',
      maxAge: 'Berusia minimal 18 dan di bawah 29 tahun saat memulai program',
      workExperience: 'Kemampuan kepemimpinan yang telah terbukti nyata',
      documents: [
        'Aplikasi online resmi Schwarzman',
        'Esai kepemimpinan (Leadership Essay - 750 kata)',
        'Esai Statement of Purpose (500 kata)',
        '3 Surat rekomendasi resmi',
        'Video pengenalan diri 1 menit'
      ]
    },
    applicationPeriod: {
      open: 'April 2026',
      deadline: 'September 2026',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.schwarzmanscholars.org',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Salah satu program kepemimpinan global paling elit di Asia, terinspirasi dari Rhodes Scholarship, bertempat di Schwarzman College, Tsinghua University.',
    tipsMandalika: 'Schwarzman tidak hanya mencari orang pintar, tetapi individu yang memiliki energi untuk memengaruhi perubahan kebijakan. Paparkan inisiatif kepemimpinan Anda secara berani.',
    quota: '± 150 scholars dari seluruh dunia per tahun',
    selectionStages: ['Aplikasi Daring', 'Review Komite Seleksi Global', 'Wawancara Panel di Singapura/London/New York', 'Awarding'],
    regionGroup: 'Korea, Tiongkok, Taiwan & HK',
    seasonPattern: 'Jul-Sep',
    isVerifiedCheckmark: false,
    statusNote: 'Pendanaan penuh kuliah & hidup Master 1 tahun di Tsinghua. Pendaftaran dibuka musim gugur.'
  },
  {
    id: 'yenching-academy',
    name: 'Yenching Academy of Peking University',
    organizer: 'Peking University, Beijing',
    country: 'Tiongkok',
    flag: '🇨🇳',
    level: ['S2'],
    fundingType: 'Fully Funded',
    coverage: [
      'Bebas 100% biaya kuliah Master of China Studies di Peking University',
      'Akomodasi kamar tinggal di kampus Yenching Academy',
      'Tunjangan biaya hidup bulanan untuk makan dan pengeluaran pribadi',
      'Tiket penerbangan internasional kelas ekonomi sekali jalan',
      'Tunjangan riset lapangan di Tiongkok'
    ],
    fieldsOfStudy: ['Sosial & Humaniora', 'Politik & Hubungan Internasional', 'Ekonomi & Manajemen Tiongkok', 'Hukum & Masyarakat', 'Filsafat & Agama'],
    requirements: {
      gpa: 'Gelar sarjana dengan prestasi akademik luar biasa',
      language: 'IELTS min 7.0 / TOEFL iBT min 100 / Cambridge Advanced',
      maxAge: 'Diutamakan di bawah 28 tahun',
      workExperience: 'Keterlibatan pada isu-isu sosial dan studi lintas budaya',
      documents: [
        'Aplikasi daring Yenching Academy',
        'Statement of Purpose (maks 750 kata)',
        'Research Proposal (maks 1.500 kata)',
        'Curriculum Vitae',
        '2 Surat Rekomendasi Akademik'
      ]
    },
    applicationPeriod: {
      open: 'Agustus 2026',
      deadline: 'Awal Desember 2026',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://yenching.pku.edu.cn',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Program magister interdisipliner bergengsi dalam bahasa Inggris di universitas nomor satu Tiongkok untuk memperdalam dinamika peradaban Tiongkok modern dan historis.',
    tipsMandalika: 'Proposal riset harus mengaitkan dinamika hubungan ekonomi/sosial Tiongkok dengan kawasan Asia Tenggara atau Indonesia secara kritis dan berbobot.',
    quota: '± 120 mahasiswa global per angkatan',
    selectionStages: ['Pendaftaran Online', 'Evaluasi Berkas Komite Yenching', 'Wawancara Online', 'Pengumuman Final'],
    regionGroup: 'Korea, Tiongkok, Taiwan & HK',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: false,
    statusNote: 'Program magister penuh di Peking University. Pendaftaran dibuka hingga akhir tahun.'
  },
  {
    id: 'taiwan-moe-scholarship',
    name: 'Taiwan Scholarship (Kemendikbud Taiwan)',
    organizer: 'Ministry of Education (MOE) Taiwan',
    country: 'Taiwan',
    flag: '🇹🇼',
    level: ['S1', 'S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Subsidi biaya perkuliahan hingga NTD 40.000 per semester (kelebihan ditanggung universitas mitra)',
      'Tunjangan hidup bulanan: NTD 15.000 (~Rp 7,5 juta/bulan untuk S1); NTD 20.000 (~Rp 10 juta/bulan untuk S2/S3)',
      'Dukungan visa dan izin tinggal resident certificate'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Semikonduktor & Mikroelektronika', 'Bisnis & Manajemen', 'Sosial & Humaniora', 'Kesehatan'],
    requirements: {
      gpa: 'Prestasi akademik di atas rata-rata (IPK minimal 3.00 atau rapor 80+)',
      language: 'Program berbahasa Inggris: TOEFL ITP min 550 / iBT 79 / IELTS 6.0; Program Mandarin: TOCFL Level 3 atau 4',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Tidak diwajibkan',
      documents: [
        'Formulir pendaftaran Taiwan Scholarship via portal TETO',
        'Fotokopi bukti pendaftaran ke salah satu universitas di Taiwan',
        'Ijazah dan transkrip terjemahan legalisir TETO',
        '2 Surat rekomendasi dosen/kepala sekolah',
        'Study plan berbahasa Inggris atau Mandarin'
      ]
    },
    applicationPeriod: {
      open: '1 Februari 2027',
      deadline: '31 Maret 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.studyintaiwan.org',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa resmi pemerintah Taiwan untuk menempuh jenjang Sarjana, Magister, atau Doktor di pusat teknologi semikonduktor dan inovasi dunia.',
    tipsMandalika: 'Taiwan merupakan episentrum industri semikonduktor dunia (TSMC). Jurusan teknik elektro, informatika, dan material science di kampus Taiwan (NTU, NCKU, NYCU) memiliki prospek karier global luar biasa.',
    quota: '± 30-40 awardee per tahun dari Indonesia',
    selectionStages: ['Pendaftaran ke Kampus Taiwan & Portal TETO', 'Seleksi Berkas TETO Jakarta/Surabaya', 'Wawancara (jika diperlukan)', 'Pengumuman Penerima (Mei/Juni)'],
    regionGroup: 'Korea, Tiongkok, Taiwan & HK',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: false,
    statusNote: 'Kemendikbud Taiwan. Pendaftaran dibuka 1 Februari - 31 Maret setiap tahun via TETO.'
  },
  {
    id: 'hkpfs-hongkong',
    name: 'Hong Kong PhD Fellowship Scheme (HKPFS)',
    organizer: 'Research Grants Council (RGC) Hong Kong',
    country: 'Hong Kong',
    flag: '🇭🇰',
    level: ['S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Tunjangan biaya hidup tahunan yang sangat besar: HK$337.200 per tahun (~Rp 680 juta/tahun atau ~Rp 56 juta/bulan)',
      'Tunjangan konferensi dan penelitian perjalanan ilmiah HK$14.000 per tahun selama 3 tahun',
      'Bebas biaya kuliah di universitas Hong Kong yang berpartisipasi',
      'Jaminan tempat tinggal asrama kampus'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Biomedis & Kedokteran', 'Bisnis & Keuangan', 'Sosial & Humaniora', 'Data Science & AI'],
    requirements: {
      gpa: 'Prestasi akademik tingkat master first-class (IPK setara 3.70+)',
      language: 'TOEFL iBT min 90-100 atau IELTS min 6.5 - 7.0',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Portofolio publikasi riset terindeks internasional',
      documents: [
        'Aplikasi awal di portal RGC HKPFS (memperoleh nomor referensi HKPFS)',
        'Aplikasi lengkap ke 1 atau 2 universitas Hong Kong (HKU, CUHK, HKUST, PolyU, CityU, HKBU, Lingnan, EdUHK)',
        'Proposal riset doktoral berstandar internasional',
        'Surat rekomendasi dari periset terkemuka'
      ]
    },
    applicationPeriod: {
      open: '1 September 2026',
      deadline: '1 Desember 2026',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://cerg1.ugc.edu.hk/hkpfs',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa doktoral dengan tunjangan finansial paling royal di Asia untuk menarik para peneliti muda paling brilian dari seluruh dunia ke 8 kampus riset unggulan Hong Kong.',
    tipsMandalika: 'Hong Kong menjadi pintu gerbang riset internasional dengan ranking kampus dunia sangat tinggi (HKU, HKUST, CUHK semuanya top 50 dunia). Hubungi calon profesor pembimbing sebelum mendaftar!',
    quota: '± 300 fellows global per tahun',
    selectionStages: ['Pendaftaran RGC HKPFS', 'Aplikasi ke Universitas Hong Kong', 'Nominasi Kampus ke RGC', 'Pengumuman Final (Maret)'],
    regionGroup: 'Korea, Tiongkok, Taiwan & HK',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: false,
    statusNote: 'Tunjangan bulanan riset & konferensi di 8 kampus top HK. Tenggat awal Desember.'
  },

  // ==========================================
  // 8. SINGAPURA, MALAYSIA, DAN ASIA LAINNYA
  // ==========================================
  {
    id: 'singa-singapore',
    name: 'Singapore International Graduate Award (SINGA)',
    organizer: 'A*STAR (Agency for Science, Technology and Research), Singapura',
    country: 'Singapura',
    flag: '🇸🇬',
    level: ['S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah penuh (Tuition fee) selama 4 tahun studi doktoral PhD',
      'Uang saku bulanan SGD 2.700 (ditingkatkan menjadi SGD 3.200 setelah lulus ujian kualifikasi / qualifying exam)',
      'Tunjangan tiket pesawat penerbangan sekali jalan SGD 1.500',
      'Tunjangan kedatangan (Settling-in allowance) SGD 1.000',
      'Fasilitas laboratorium riset mutakhir di A*STAR Research Institutes, NUS, NTU, atau SUTD'
    ],
    fieldsOfStudy: ['Biomedical Sciences', 'Computing & AI', 'Physical Sciences & Engineering', 'Material Science'],
    requirements: {
      gpa: 'Prestasi akademik sangat baik di tingkat sarjana/magister (IPK min 3.50)',
      language: 'Kemampuan bahasa Inggris aktif (IELTS/TOEFL tidak wajib kaku, namun sangat disarankan)',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Passion yang kuat dalam penelitian laboratorium sains dan teknik',
      documents: [
        'Formulir pendaftaran online SINGA Portal',
        'Salinan Ijazah dan Transkrip Akademik berbahasa Inggris',
        '2 Surat Rekomendasi dari dosen pembimbing akademik',
        'Proposal minat riset laboratorium'
      ]
    },
    applicationPeriod: {
      open: 'Buka Sepanjang Tahun',
      deadline: '1 Desember 2026 (Intake Ags 2027) / 1 Juni 2027 (Intake Jan 2028)',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://www.a-star.edu.sg',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa PhD sains dan teknik terkemuka di Singapura hasil kolaborasi lembaga riset kelas dunia A*STAR bersama NUS, NTU, dan SUTD.',
    tipsMandalika: 'Tidak memerlukan LoA saat mendaftar! Kuncinya adalah meninjau daftar proyek riset profesor di situs A*STAR dan menuliskan keselarasan minat Anda dalam formulir SINGA.',
    quota: '± 200 mahasiswa internasional per tahun',
    selectionStages: ['Pendaftaran Daring SINGA', 'Shortlisting Tim Penilai A*STAR', 'Wawancara Panel Daring', 'Penerbitan Kontrak Beasiswa'],
    regionGroup: 'Singapura, Malaysia & Asia Lainnya',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: false,
    statusNote: 'Kuliah, tunjangan bulanan, perjalanan awal & akhir. Dibuka 2x setahun (tenggat 1 Des & 1 Jun).'
  },
  {
    id: 'nus-ntu-research',
    name: 'NUS & NTU Research Scholarship',
    organizer: 'National University of Singapore & Nanyang Technological University',
    country: 'Singapura',
    flag: '🇸🇬',
    level: ['S2', 'S3', 'Riset'],
    fundingType: 'Fully Funded',
    coverage: [
      'Pembebasan biaya kuliah (Tuition fee waiver) di NUS atau NTU',
      'Uang saku bulanan SGD 2.200 - SGD 2.800 (naik setelah lulus kualifikasi PhD)',
      'Dukungan dana riset laboratorium dan konferensi internasional'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Data Science & AI', 'Bisnis & Manajemen', 'Sosial & Humaniora', 'Sains Hayati'],
    requirements: {
      gpa: 'Gelar sarjana dengan predikat First Class Honours atau Second Class Upper',
      language: 'IELTS min 6.5 atau TOEFL iBT min 85 (skor GRE diwajibkan untuk jurusan tertentu)',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Rekam jejak riset dan publikasi',
      documents: [
        'Aplikasi pascasarjana langsung di portal NUS/NTU Graduate Admission',
        'Proposal riset (Research Proposal)',
        'Salinan ijazah dan transkrip akademik',
        'Surat rekomendasi akademisi'
      ]
    },
    applicationPeriod: {
      open: 'Oktober 2026',
      deadline: '15 Januari 2027 (Intake Agustus) / 31 Juli 2027 (Intake Januari)',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://nus.edu.sg',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa riset pascasarjana langsung dari universitas nomor 1 dan 2 di Asia (NUS & NTU) untuk program Master by Research dan PhD.',
    tipsMandalika: 'Hubungi calon profesor supervisor di departemen terkait di NUS atau NTU terlebih dahulu untuk mendapatkan persetujuan awal (endorsement) riset.',
    quota: 'Ratusan mahasiswa riset tiap semester',
    selectionStages: ['Pendaftaran Aplikasi Departemen', 'Review Komite Akademik Fakultas', 'Wawancara Riset', 'Award Letter'],
    regionGroup: 'Singapura, Malaysia & Asia Lainnya',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: false,
    statusNote: 'Kuliah & tunjangan bulanan di dua kampus top Singapura. Intake Ags & Jan.'
  },
  {
    id: 'asean-undergraduate-sg',
    name: 'ASEAN Undergraduate Scholarship (Singapura)',
    organizer: 'Kementerian Pendidikan Singapura & Universitas Negeri (NUS/NTU/SMU/SUTD)',
    country: 'Singapura',
    flag: '🇸🇬',
    level: ['S1'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya SPP kuliah (Tuition fee) penuh setelah subsidi MOE Tuition Grant',
      'Tunjangan biaya hidup tahunan SGD 5.800',
      'Tunjangan akomodasi tempat tinggal tahunan (SGD 3.000)',
      'Tunjangan kedatangan (Settling-in allowance) SGD 1.750 sekali saat awal studi'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Komputer & Kecerdasan Buatan', 'Bisnis & Akuntansi', 'Sosial & Humaniora', 'Hukum'],
    requirements: {
      gpa: 'Nilai rapor SMA/SMK rata-rata di atas 88-90, terutama Matematika & IPA/IPS',
      language: 'IELTS min 6.5 / TOEFL iBT min 92 / SAT dengan skor tinggi',
      maxAge: 'Warganegara anggota ASEAN (selain Singapura) yang baru lulus SMA',
      workExperience: 'Prestasi ko-kurikuler dan kepemimpinan sekolah',
      documents: [
        'Pendaftaran mahasiswa baru sarjana di NUS, NTU, SMU, atau SUTD',
        'Rapor SMA semester 1 sampai 5/6',
        'Sertifikat prestasi lomba/olimpiade',
        'Surat rekomendasi kepala sekolah'
      ]
    },
    applicationPeriod: {
      open: 'Oktober 2026',
      deadline: 'Februari 2027',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://nus.edu.sg',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa sarjana penuh di kampus terbaik Singapura untuk lulusan SMA berprestasi luar biasa dari negara anggota ASEAN.',
    tipsMandalika: 'Otomatis dipertimbangkan saat mendaftar kuliah ke NUS atau NTU. Perhatikan bahwa penerima beasiswa ini memiliki komitmen kerja (bond) selama 3 tahun di perusahaan yang beroperasi di Singapura setelah lulus.',
    quota: '± 40-50 siswa ASEAN per kampus',
    selectionStages: ['Pendaftaran Masuk Kampus Singapura', 'Shortlisting Beasiswa Berdasarkan Rapor & Ujian', 'Wawancara Beasiswa di Jakarta/Online', 'Offer Letter'],
    regionGroup: 'Singapura, Malaysia & Asia Lainnya',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: false,
    statusNote: 'Program sarjana S1 di universitas top Singapura dengan tunjangan hidup dan akomodasi.'
  },
  {
    id: 'mis-malaysia',
    name: 'Malaysia International Scholarship (MIS)',
    organizer: 'Kementerian Pendidikan Tinggi (KPT) Malaysia',
    country: 'Malaysia',
    flag: '🇲🇾',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya perkuliahan penuh (Full tuition fee) di universitas negeri riset Malaysia',
      'Uang saku bulanan RM 1.500 per bulan (~Rp 5,5 juta/bulan)',
      'Bebas biaya pendaftaran dan administrasi kampus'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Teknologi Informasi & Komunikasi', 'Pertanian & Perikanan', 'Kesehatan & Farmasi', 'Studi Islam & Sosial'],
    requirements: {
      gpa: 'IPK minimal 3.00 pada jenjang Sarjana / Master',
      language: 'IELTS minimal 6.0 atau TOEFL iBT minimal 70',
      maxAge: 'Maksimal 40 tahun untuk Master (S2) dan 45 tahun untuk PhD (S3)',
      workExperience: 'Tidak diwajibkan',
      documents: [
        'Formulir aplikasi online KPT Malaysia',
        'Proposal penelitian akademik (minimal 1.000 kata untuk riset)',
        'Dua surat rekomendasi',
        'Transkrip nilai dan ijazah legalisir',
        'Surat penerimaan kuliah (LoA) dari universitas riset Malaysia (UM, UKM, UPM, USM, UTM)'
      ]
    },
    applicationPeriod: {
      open: 'April 2027',
      deadline: 'Mei 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://mohe.gov.my',
    difficulty: 'Moderat',
    lastVerified: '2026-10-28',
    summary: 'Inisiatif pemerintah Malaysia untuk menarik talenta akademik internasional terbaik melanjutkan studi Master dan Doktor di universitas riset terkemuka Malaysia.',
    tipsMandalika: 'Universiti Malaya (UM) kini menempati ranking Top 60 dunia. Biaya hidup yang terjangkau, makanan halal berlimpah, dan kultur serumpun membuat MIS sangat nyaman bagi mahasiswa Indonesia.',
    quota: '± 50-70 kuota mahasiswa internasional',
    selectionStages: ['Pendaftaran Daring MIS', 'Evaluasi Berkas KPT Malaysia', 'Verifikasi Universitas Riset Malaysia', 'Pengumuman Final'],
    regionGroup: 'Singapura, Malaysia & Asia Lainnya',
    seasonPattern: 'Apr-Jun',
    isVerifiedCheckmark: false,
    statusNote: 'Dibiayai pemerintah Malaysia untuk jenjang S2 & S3. Dibuka sekitar April - Mei.'
  },
  {
    id: 'searca-philippines',
    name: 'SEARCA Graduate Scholarship',
    organizer: 'Southeast Asian Regional Center for Graduate Study and Research in Agriculture',
    country: 'Filipina',
    flag: '🇵🇭',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah penuh di universitas anggota konsorsium SEARCA (UPLB Filipina, IPB, Kasetsart Thailand, UPM Malaysia)',
      'Tunjangan biaya hidup bulanan untuk makan dan sewa akomodasi',
      'Tunjangan buku dan tunjangan penelitian tesis/disertasi',
      'Tiket pesawat internasional PP, asuransi kesehatan, dan subsidi penerbitan jurnal internasional'
    ],
    fieldsOfStudy: ['Pertanian & Agribisnis', 'Ketahanan Pangan & Gizi', 'Pengelolaan Sumber Daya Alam & Lingkungan', 'Pembangunan Pedesaan'],
    requirements: {
      gpa: 'Catatan akademik baik di bidang pertanian/ilmu terkait',
      language: 'TOEFL ITP min 550 / iBT 80 / IELTS 6.0',
      maxAge: 'Maksimal 35 tahun saat mendaftar',
      workExperience: 'Staf pengajar, periset, atau pegawai pemerintah di bidang pertanian',
      documents: [
        'Aplikasi daring SEARCA',
        'Proposal penelitian terfokus pada ketahanan pangan dan pembangunan pedesaan',
        'Surat rekomendasi pimpinan instansi tempat bekerja',
        'Ijazah dan transkrip akademik'
      ]
    },
    applicationPeriod: {
      open: 'Mei 2026',
      deadline: '31 Juli 2026',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.searca.org',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa spesialisasi pertanian dan ketahanan pangan paling terkemuka di Asia Tenggara, melahirkan para periset dan birokrat agrikultur regional.',
    tipsMandalika: 'Nusa Tenggara Barat memiliki potensi pertanian lahan kering dan agrowisata yang sangat besar. Ajukan proposal tentang inovasi irigasi hemat air atau ketahanan pangan lokal!',
    quota: '± 20-30 beasiswa per tahun',
    selectionStages: ['Pendaftaran Daring', 'Screening Komite SEARCA', 'Wawancara Seleksi', 'Awarding'],
    regionGroup: 'Singapura, Malaysia & Asia Lainnya',
    seasonPattern: 'Jul-Sep',
    isVerifiedCheckmark: false,
    statusNote: 'Khusus bidang pertanian & pembangunan pedesaan. Dibuka setahun sekali menjelang pertengahan tahun.'
  },
  {
    id: 'iccr-india',
    name: 'ICCR Scholarship (Pemerintah India)',
    organizer: 'Indian Council for Cultural Relations (ICCR), Pemerintah India',
    country: 'India',
    flag: '🇮🇳',
    level: ['S1', 'S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Bebas biaya perkuliahan penuh di universitas negeri terakreditasi di India',
      'Uang saku bulanan (Stipend) untuk biaya hidup',
      'Tunjangan sewa akomodasi / asrama kampus',
      'Bantuan biaya penyusunan tesis/proyek studi',
      'Layanan fasilitas medis darurat'
    ],
    fieldsOfStudy: ['Engineering & IT', 'Teknologi Informasi & Software', 'Manajemen & Perdagangan', 'Sains Murni & Farmasi', 'Seni Budaya & Yoga'],
    requirements: {
      gpa: 'Nilai rapor / IPK minimal 60% dari standar maksimum',
      language: 'Kemampuan bahasa Inggris baik (ujian kemahiran bahasa Inggris online via portal A2A)',
      maxAge: 'S1/S2: 18 - 30 tahun; PhD: 18 - 45 tahun',
      workExperience: 'Tidak diwajibkan',
      documents: [
        'Formulir pendaftaran di portal A2A ICCR',
        'Esai 500 kata dalam bahasa Inggris alasan memilih studi di India',
        'Ijazah dan transkrip nilai resmi berbahasa Inggris',
        'Pemeriksaan medis resmi dari rumah sakit'
      ]
    },
    applicationPeriod: {
      open: 'Januari 2027',
      deadline: 'April 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.iccr.gov.in',
    difficulty: 'Moderat',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa resmi pemerintah India untuk mahasiswa Indonesia menempuh studi S1, S2, atau S3 di negara raksasa teknologi informasi dan farmasi dunia.',
    tipsMandalika: 'India adalah tempat terbaik untuk belajar ilmu komputer, software development, dan farmasi dengan biaya hidup sangat hemat. Ujian seleksinya melalui tes esai bahasa Inggris online.',
    quota: '± 20-30 kuota beasiswa bagi WNI',
    selectionStages: ['Pendaftaran Online Portal A2A', 'Ujian Kemahiran Bahasa Inggris Online', 'Verifikasi Kedutaan Besar India Jakarta', 'Penempatan Universitas'],
    regionGroup: 'Singapura, Malaysia & Asia Lainnya',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: false,
    statusNote: 'Biaya kuliah, tunjangan hidup, komponen lain. Dibuka awal tahun via Kedutaan India.'
  },

  // ==========================================
  // 9. JERMAN, AUSTRIA, SWISS, DAN EROPA TENGAH
  // ==========================================
  {
    id: 'daad-epos-germany',
    name: 'DAAD Scholarships (EPOS & Helmut Schmidt)',
    organizer: 'Deutscher Akademischer Austauschdienst (Pemerintah Federal Jerman)',
    country: 'Jerman',
    flag: '🇩🇪',
    level: ['S2', 'S3', 'Riset'],
    fundingType: 'Fully Funded',
    coverage: [
      'Bebas biaya kuliah di universitas negeri terkemuka Jerman',
      'Uang saku bulanan: €934 untuk Master, €1.300 untuk Doktor (~Rp 16-22 juta/bulan)',
      'Asuransi kesehatan komprehensif, kecelakaan, dan tanggung jawab hukum',
      'Tunjangan perjalanan tiket pesawat PP Indonesia - Jerman',
      'Subsidi sewa bulanan dan tunjangan pendamping keluarga (kondisional)',
      'Kursus bahasa Jerman intensif sebelum perkuliahan'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Ekonomi', 'Lingkungan & Pertanian', 'Kesehatan Masyarakat'],
    requirements: {
      gpa: 'Minimal IPK 3.00 / 4.00 dengan predikat memuaskan',
      language: 'IELTS minimal 6.0 / 6.5 (program pengantar Inggris) atau DSH-2 / TestDaF 4 (program pengantar Jerman)',
      maxAge: 'Gelar sarjana tidak lebih dari 6 tahun saat mendaftar',
      workExperience: 'Wajib memiliki pengalaman kerja minimal 2 tahun di bidang relevan setelah lulus S1',
      documents: [
        'DAAD Application Form resmi',
        'Europass CV bertanda tangan manual dengan tanggal terbaru',
        'Hand-signed Motivation Letter (maks 2 halaman) dengan referensi pekerjaan',
        'Letter of Recommendation dari atasan kerja saat ini',
        'Academic Recommendation dari dosen pembimbing kampus',
        'Surat keterangan kerja (Certificate of Employment)'
      ]
    },
    applicationPeriod: {
      open: 'Agustus 2026',
      deadline: 'Oktober 2026 / November 2026',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.daad.de',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa khusus bagi profesional muda dari negara berkembang untuk menempuh program Master/Doktor di universitas terkemuka Jerman dalam disiplin yang berdampak bagi pembangunan.',
    tipsMandalika: 'DAAD EPOS sangat menghargai pelamar yang bekerja di instansi daerah (Bappeda, LSM lokal, puskesmas, kampus regional). Tuliskan dalam esai bagaimana studi Anda akan diaplikasikan di daerah asal.',
    quota: '± 50-70 penerima dari Indonesia per tahun',
    selectionStages: ['Pendaftaran langsung ke kampus mitra Jerman', 'Pra-seleksi komite universitas', 'Verifikasi & nominasi oleh kantor DAAD Bonn', 'Award letter resmi'],
    regionGroup: 'Jerman, Austria, Swiss & Eropa Tengah',
    seasonPattern: 'Jul-Sep',
    isVerifiedCheckmark: false,
    statusNote: 'Berbagai skema termasuk EPOS. Biaya hidup, asuransi, tiket. Pendaftaran musim gugur.'
  },
  {
    id: 'humboldt-fellowship',
    name: 'Alexander von Humboldt Research Fellowship',
    organizer: 'Alexander von Humboldt Foundation, Jerman',
    country: 'Jerman',
    flag: '🇩🇪',
    level: ['Riset'],
    fundingType: 'Fully Funded',
    coverage: [
      'Tunjangan riset bulanan €2.670 (postdoc) hingga €3.170 (experienced researchers)',
      'Tunjangan mobilitas perjalanan internasional dan asuransi',
      'Tunjangan keluarga pendamping (pasangan dan anak)',
      'Kursus bahasa Jerman intensif gratis untuk periset dan pasangan',
      'Keanggotaan seumur hidup dalam jejaring Humboldtian global elit'
    ],
    fieldsOfStudy: ['Sains Murni & Matematika', 'Engineering & Teknologi', 'Kedokteran & Biologi', 'Humaniora & Ilmu Sosial'],
    requirements: {
      gpa: 'Gelar doktor (PhD) yang diselesaikan dalam 4 tahun terakhir (postdoc) atau 12 tahun (experienced)',
      language: 'Bahasa Inggris akademik yang fasih atau bahasa Jerman',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Publikasi ilmiah terindeks di jurnal internasional bergengsi',
      documents: [
        'Proposal penelitian independen yang inovatif',
        'Surat kesediaan dari profesor tuan rumah (Host Professor) di universitas/institusi riset Jerman',
        'Daftar lengkap publikasi ilmiah dan karya terbaik terpilih',
        'Surat rekomendasi dari pakar internasional'
      ]
    },
    applicationPeriod: {
      open: 'Buka Sepanjang Tahun',
      deadline: 'Evaluasi Maret, Juli, dan November',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://www.humboldt-foundation.de',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa pascadoktoral paling bergengsi di dunia untuk para ilmuwan muda brilian melakukan riset kolaboratif jangka panjang di laboratorium terdepan Jerman.',
    tipsMandalika: 'Kuncinya adalah menjalin kontak akademik langsung dengan calon profesor tuan rumah di institut Jerman seperti Max Planck, Fraunhofer, atau universitas riset Jerman.',
    quota: '± 450 fellowship dianugerahkan secara global per tahun',
    selectionStages: ['Pengajuan Berkas Online', 'Peer Review oleh Pakar Independen', 'Keputusan Komite Seleksi Humboldt (3x setahun)'],
    regionGroup: 'Jerman, Austria, Swiss & Eropa Tengah',
    seasonPattern: 'Sepanjang Tahun',
    isVerifiedCheckmark: false,
    statusNote: 'Pascadoktoral & riset lanjutan di Jerman. Aplikasi dibuka sepanjang tahun.'
  },
  {
    id: 'iasp-austria',
    name: 'Indonesia-Austria Scholarship Programme (IASP)',
    organizer: 'OeAD (Austrian Agency for Education and Internationalisation) & Kemdiktisaintek RI',
    country: 'Austria',
    flag: '🇦🇹',
    level: ['S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Pendanaan penuh biaya perkuliahan doktoral di universitas terkemuka Austria',
      'Tunjangan biaya hidup bulanan €1.150 per bulan',
      'Tiket penerbangan internasional kelas ekonomi PP',
      'Asuransi kesehatan dan kecelakaan selama masa studi doktoral di Austria'
    ],
    fieldsOfStudy: ['Engineering & Teknologi Terapan', 'Sains Alam & Hayati', 'Pertanian & Kehutanan', 'Sosial & Humaniora'],
    requirements: {
      gpa: 'IPK minimal 3.25 pada jenjang Magister (S2)',
      language: 'IELTS min 6.5 atau TOEFL iBT min 85',
      maxAge: 'Maksimal 35 tahun (non-dosen) atau 40 tahun (dosen tetap)',
      workExperience: 'Terbuka bagi dosen perguruan tinggi dan calon dosen',
      documents: [
        'Letter of Acceptance (LoA) dari universitas riset Austria',
        'Proposal riset doktoral yang telah disetujui supervisor Austria',
        'Ijazah dan transkrip S1/S2 terjemahan resmi',
        'Surat izin dan rekomendasi dari pimpinan perguruan tinggi asal'
      ]
    },
    applicationPeriod: {
      open: 'Februari 2027',
      deadline: 'April 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://oead.at',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Program beasiswa bilateral khusus bagi akademisi dan periset Indonesia untuk menyelesaikan gelar doktor (PhD) di universitas terkemuka di Austria.',
    tipsMandalika: 'Austria memiliki reputasi global dalam teknologi energi terbarukan, arsitektur ramah lingkungan, dan musik klasik. Manfaatkan jalur khusus kemitraan IASP ini!',
    quota: '± 20-30 awardee doktoral per tahun',
    selectionStages: ['Pendaftaran di Portal OeAD & BPI', 'Verifikasi Dual Komite', 'Wawancara Akademik', 'Awarding'],
    regionGroup: 'Jerman, Austria, Swiss & Eropa Tengah',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: true,
    statusNote: '✔ Listing 2026 tersedia di portal OeAD dan kementerian. S3 Kemdikbud & OeAD.'
  },
  {
    id: 'ernst-mach-grant',
    name: 'Ernst Mach Grant – ASEA-UNINET (Austria)',
    organizer: 'OeAD & ASEA-UNINET (ASEAN-European Academic University Network)',
    country: 'Austria',
    flag: '🇦🇹',
    level: ['S2', 'S3', 'Riset'],
    fundingType: 'Fully Funded',
    coverage: [
      'Tunjangan biaya hidup bulanan: €1.150/bulan (PhD) atau €1.250/bulan (Postdoc)',
      'Tunjangan biaya perjalanan internasional (Travel allowance) hingga €1.400',
      'Pembebasan penuh biaya kuliah (Tuition fee waiver) di universitas Austria',
      'Asuransi kesehatan dan bantuan pemesanan akomodasi oleh OeAD'
    ],
    fieldsOfStudy: ['Sains Murni & Hayati', 'Engineering & Teknologi', 'Kedokteran & Kesehatan', 'Ekonomi & Sosial', 'Musik & Seni'],
    requirements: {
      gpa: 'Catatan akademik unggul dari universitas anggota jejaring ASEA-UNINET di Indonesia (UGM, UI, ITB, Unair, Undip, ITS, Udayana, dll)',
      language: 'IELTS min 6.0 atau TOEFL iBT min 80',
      maxAge: 'Maks 35 tahun untuk mahasiswa doktoral; Maks 45 tahun untuk postdoc',
      workExperience: 'Mahasiswa S2/S3 aktif atau staf pengajar universitas jejaring',
      documents: [
        'Formulir pendaftaran online di scholarship.at',
        'Consent letter dari supervisor akademik di salah satu universitas Austria',
        'Proposal riset (Research Proposal) 2-4 halaman',
        '2 Surat rekomendasi dari profesor kampus asal',
        'Salinan paspor dan ijazah'
      ]
    },
    applicationPeriod: {
      open: '1 Desember 2026',
      deadline: '15 Maret 2027',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://oead.at',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa bergengsi pemerintah Austria untuk riset singkat (1-9 bulan) atau gelar PhD penuh (36 bulan) bagi peneliti dan mahasiswa dari perguruan tinggi anggota jejaring ASEA-UNINET.',
    tipsMandalika: 'Kunci lolos adalah mendapatkan "Written Consent" dari profesor Austria terlebih dahulu. Tunjukkan bagaimana kolaborasi riset akan memperkuat jejaring ilmiah ASEAN dan Austria.',
    quota: '± 40-50 grant per tahun untuk seluruh kawasan ASEAN',
    selectionStages: ['Pendaftaran Online di scholarship.at', 'Pemeriksaan Formal OeAD', 'Review Panel Ahli ASEA-UNINET', 'Pengumuman Penerima (Juni)'],
    regionGroup: 'Jerman, Austria, Swiss & Eropa Tengah',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: true,
    statusNote: '✔ Call 2027/28 dipublikasikan. Pendaftaran dibuka hingga 15 Maret 2027. S2, S3, riset jejaring ASEAN-Eropa.'
  },
  {
    id: 'stipendium-hungaricum',
    name: 'Stipendium Hungaricum Scholarship',
    organizer: 'Pemerintah Hungaria & Tempus Public Foundation',
    country: 'Hungaria',
    flag: '🇭🇺',
    level: ['S1', 'S2', 'S3', 'Riset'],
    fundingType: 'Fully Funded',
    coverage: [
      'Bebas biaya kuliah penuh (100% Tuition fee exemption) di universitas ternama Hungaria',
      'Akomodasi asrama gratis atau subsidi tempat tinggal bulanan HUF 40.000 (~Rp 1,8 juta)',
      'Uang saku bulanan: HUF 43.700 (S1/S2) dan HUF 140.000 - 180.000 (S3)',
      'Asuransi kesehatan publik gratis (Hungarian National Health Insurance)'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Pertanian & Lingkungan', 'Kedokteran & Farmasi', 'Bisnis & Hubungan Internasional', 'Sains Komputasi'],
    requirements: {
      gpa: 'Minimal 80/100 untuk S1 atau IPK min 3.00 untuk S2/S3',
      language: 'IELTS min 5.5 - 6.5 (tergantung universitas dan jenjang studi)',
      maxAge: 'Minimal 18 tahun saat perkuliahan dimulai',
      workExperience: 'Tidak diwajibkan',
      documents: [
        'Aplikasi pendaftaran di DreamApply Tempus Public Foundation',
        'Pendaftaran paralel di portal seleksi kementerian RI (Kemdikbud)',
        'Motivation letter (minimal 1 halaman)',
        'Ijazah, transkrip nilai, dan sertifikat bahasa legalisir',
        'Surat keterangan sehat medis (Medical Certificate)'
      ]
    },
    applicationPeriod: {
      open: 'November 2026',
      deadline: '15 Januari 2027',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://stipendiumhungaricum.hu',
    difficulty: 'Moderat',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa pembiayaan penuh pemerintah Hungaria untuk seluruh jenjang studi dengan biaya hidup sangat terjangkau di jantung benua Eropa.',
    tipsMandalika: 'Pelamar WNI wajib dinominasikan oleh Kemendikbudristek/Kemdiktisaintek RI. Pastikan Anda mengunggah berkas ke dua portal: Tempus Hungaria dan portal kementerian RI!',
    quota: '± 100-110 kuota bagi mahasiswa Indonesia per tahun',
    selectionStages: ['Pendaftaran Online Tempus Hungaria', 'Nominasi oleh Kementerian RI', 'Ujian Tertulis / Wawancara Daring Kampus Hungaria', 'Penetapan Tempus'],
    regionGroup: 'Jerman, Austria, Swiss & Eropa Tengah',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: false,
    statusNote: 'Kuliah, akomodasi, tunjangan, asuransi. Pendaftaran Nov - Jan, seleksi Jan - Mar.'
  },
  {
    id: 'swiss-excellence',
    name: 'Swiss Government Excellence Scholarships',
    organizer: 'State Secretariat for Education, Research and Innovation (SERI) Swiss',
    country: 'Swiss',
    flag: '🇨🇭',
    level: ['S3', 'Riset'],
    fundingType: 'Fully Funded',
    coverage: [
      'Tunjangan biaya hidup bulanan: CHF 1.920 (~Rp 34 juta/bulan untuk PhD/Riset) atau CHF 3.500 (~Rp 62 juta/bulan untuk Postdoc)',
      'Bebas biaya kuliah di universitas kanton Swiss atau institut teknologi ETH Zurich / EPFL',
      'Asuransi kesehatan wajib Swiss komprehensif yang dibayar penuh',
      'Tunjangan tempat tinggal awal (Housing allowance) CHF 300 sekali bayar',
      'Tiket penerbangan kepulangan ke Indonesia setelah program selesai'
    ],
    fieldsOfStudy: ['Engineering & Teknologi', 'Sains Murni & Presisi', 'Biomedis & Farmasi', 'Lingkungan & Glasiologi', 'Ekonomi'],
    requirements: {
      gpa: 'Gelar magister (S2) dengan catatan akademik luar biasa',
      language: 'Bahasa Inggris yang sangat fasih (IELTS 7.0+) atau bahasa resmi Swiss (Jerman/Prancis/Italia)',
      maxAge: 'Lahir setelah 31 Desember 1989 (untuk riset PhD)',
      workExperience: 'Rekam jejak riset dan publikasi ilmiah',
      documents: [
        'Formulir pendaftaran resmi FCS Swiss (diperoleh via Kedutaan Swiss Jakarta)',
        'Letter of Admission / Academic Host Letter dari profesor di universitas Swiss',
        'Proposal riset komprehensif (maksimal 5 halaman)',
        '2 Surat rekomendasi menggunakan formulir khusus FCS',
        'Sertifikat kesehatan resmi'
      ]
    },
    applicationPeriod: {
      open: 'Agustus 2026',
      deadline: 'Akhir November 2026',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://www.sbfi.admin.ch',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa riset dan doktoral paling selektif di dunia dari Pemerintah Konfederasi Swiss untuk meneliti di institusi teratas dunia seperti ETH Zurich dan EPFL.',
    tipsMandalika: 'Syarat mutlak tanpa kompromi adalah memiliki "Surat Dukungan Profesor Tuan Rumah" dari salah satu universitas di Swiss sebelum meminta paket formulir ke Kedubes Swiss di Jakarta.',
    quota: '± 2-4 peneliti terpilih dari Indonesia per tahun',
    selectionStages: ['Pencarian Profesor Tuan Rumah Swiss', 'Permohonan Formulir ke Kedubes Swiss Jakarta', 'Penyerahan Berkas Fisik', 'Seleksi Komite FCS di Bern'],
    regionGroup: 'Jerman, Austria, Swiss & Eropa Tengah',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: false,
    statusNote: 'Riset, S3 doktoral, pascadoktoral. Pendaftaran dibuka hingga akhir tahun.'
  },

  // ==========================================
  // 10. PRANCIS, BELGIA, BELANDA, ITALIA, SKANDINAVIA, RUSIA, TURKI
  // ==========================================
  {
    id: 'eiffel-excellence',
    name: 'Eiffel Excellence Scholarship Program (Prancis)',
    organizer: 'Kementerian Urusan Eropa dan Luar Negeri Prancis (MEAE)',
    country: 'Prancis',
    flag: '🇫🇷',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Tunjangan biaya hidup bulanan: €1.181/bulan (Master) atau €1.800/bulan (Doktor)',
      'Tiket pesawat penerbangan internasional PP Indonesia - Prancis',
      'Transportasi lokal di Prancis dan asuransi kesehatan resmi',
      'Subsidi perumahan dan prioritas penempatan di asrama CROUS',
      'Akses ke berbagai kegiatan kebudayaan eksklusif Campus France'
    ],
    fieldsOfStudy: ['Engineering & Sains Terapan', 'Ekonomi & Manajemen', 'Hukum & Ilmu Politik', 'Transisi Ekologi & Energi'],
    requirements: {
      gpa: 'Prestasi akademik tingkat sarjana first-class (IPK setara 3.50+)',
      language: 'Sesuai bahasa pengantar program studi (IELTS min 6.5 atau DELF B2/DALF C1)',
      maxAge: 'Maksimal 25 tahun untuk Master; Maksimal 30 tahun untuk Doktor',
      workExperience: 'Tidak diwajibkan',
      documents: [
        'Pelamar TIDAK mendaftar langsung ke Campus France, tetapi mendaftar ke universitas di Prancis',
        'Berkas pendaftaran universitas Prancis yang diajukan untuk nominasi Eiffel',
        'Motivation letter dan Research Project (untuk S3)',
        'Transkrip nilai resmi dan CV'
      ]
    },
    applicationPeriod: {
      open: 'Oktober 2026',
      deadline: 'Awal Januari 2027',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://www.campusfrance.org',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Program beasiswa keunggulan pemerintah Prancis untuk menarik mahasiswa pascasarjana internasional terbaik ke perguruan tinggi Prancis.',
    tipsMandalika: 'Universitas di Prancis yang menyeleksi dan menominasikan Anda ke Campus France Paris. Kontak universitas Prancis pilihan Anda sedini mungkin di bulan Oktober/November!',
    quota: '± 350 awardee global per tahun',
    selectionStages: ['Pendaftaran ke Institusi Pendidikan Prancis', 'Seleksi Internal Universitas', 'Pengajuan Nominasi ke Campus France Paris', 'Pengumuman Penerima (April)'],
    regionGroup: 'Eropa Barat, Skandinavia & Turki',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: false,
    statusNote: 'Tunjangan bulanan, tiket, asuransi S2/S3. Pendaftaran melalui nominasi kampus Prancis hingga ~Januari.'
  },
  {
    id: 'france-excellence-ifi',
    name: 'France Excellence Scholarship (Kedutaan Prancis / IFI)',
    organizer: 'Institut Français d’Indonésie (IFI) & Kedutaan Besar Prancis di Indonesia',
    country: 'Prancis',
    flag: '🇫🇷',
    level: ['S1', 'S2'],
    fundingType: 'Fully Funded',
    coverage: [
      'Pembebasan biaya kuliah registrasi di perguruan tinggi negeri Prancis',
      'Uang saku bulanan €860/bulan (~Rp 14,5 juta/bulan)',
      'Tiket pesawat PP Indonesia - Prancis kelas ekonomi',
      'Bantuan akomodasi mahasiswa (subsidi CAF Prancis)',
      'Bebas biaya visa pelajar Prancis dan perlindungan asuransi kesehatan sosial'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Seni & Arsitektur', 'Sosial & Humaniora', 'Bisnis & Manajemen', 'Gastronomi'],
    requirements: {
      gpa: 'IPK minimal 3.20 (S2) atau rata-rata rapor 85 (S1)',
      language: 'DELF/DALF B2 (jurusan bahasa Prancis) atau IELTS min 6.5 (jurusan bahasa Inggris)',
      maxAge: 'Maks 30 tahun',
      workExperience: 'Tidak wajib',
      documents: [
        'Attestation d’admission / LoA dari universitas di Prancis',
        'Curriculum Vitae terbaru',
        'Motivation Letter',
        'Ijazah & Transkrip terjemahan tersumpah'
      ]
    },
    applicationPeriod: {
      open: 'Maret 2027',
      deadline: 'Mei 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.ifi-id.com',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa resmi pemerintah Prancis untuk mahasiswa Indonesia berprestasi tinggi yang ingin melanjutkan studi sarjana atau magister di Prancis.',
    tipsMandalika: 'Prancis kini memiliki ratusan program Master berbahasa Inggris penuh! Jangan ragu mendaftar meski belum lancar bahasa Prancis, asalkan Anda memiliki LoA dari universitas di Prancis.',
    quota: '± 40 mahasiswa per tahun',
    selectionStages: ['Pendaftaran via portal IFI', 'Seleksi Berkas Dokumen', 'Wawancara Daring dengan Tim Ahli IFI', 'Pengumuman Penerima'],
    regionGroup: 'Eropa Barat, Skandinavia & Turki',
    seasonPattern: 'Apr-Jun',
    isVerifiedCheckmark: false,
    statusNote: 'Beasiswa pemerintah Prancis lewat IFI Jakarta. Dibuka Maret - Mei.'
  },
  {
    id: 'vlir-uos-ares-belgium',
    name: 'VLIR-UOS dan ARES Scholarships (Belgia)',
    organizer: 'Pemerintah Federal Belgia (VLIR-UOS Flanders & ARES Wallonia-Brussels)',
    country: 'Belgia',
    flag: '🇧🇪',
    level: ['S2', 'Riset'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya perkuliahan penuh (Tuition fee) di universitas terkemuka Belgia',
      'Tunjangan biaya hidup bulanan yang memadai untuk tinggal di Belgia',
      'Akomodasi asrama dan biaya insidental',
      'Tiket penerbangan internasional kelas ekonomi PP',
      'Asuransi kesehatan dan kecelakaan komprehensif'
    ],
    fieldsOfStudy: ['Pengelolaan Air & Sanitasi', 'Keamanan Pangan & Pertanian Berkelanjutan', 'Kesehatan Tropis & Epidemiologi', 'Teknologi Informasi untuk Pembangunan'],
    requirements: {
      gpa: 'Gelar sarjana akademik dengan catatan prestasi baik',
      language: 'IELTS min 6.5 atau TOEFL iBT min 80',
      maxAge: 'Maksimal 35 tahun untuk program Master pada saat pendaftaran',
      workExperience: 'Diutamakan memiliki pengalaman kerja di bidang pembangunan/penelitian',
      documents: [
        'Formulir pendaftaran beasiswa di portal program Master yang berafiliasi VLIR-UOS atau ARES',
        'Motivation letter bertema dampak pembangunan bagi Indonesia',
        'Surat rekomendasi instansi kerja dan akademisi',
        'Ijazah dan transkrip terjemahan'
      ]
    },
    applicationPeriod: {
      open: 'Oktober 2026',
      deadline: 'Februari 2027',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://www.vliruos.be',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa penuh pemerintah Belgia untuk program Master spesialisasi pembangunan berkelanjutan di universitas Flanders (Belgia utara) dan Wallonia (Belgia selatan).',
    tipsMandalika: 'Belgia adalah jantung Uni Eropa dan memiliki keunggulan dunia di bidang riset air, kelautan, dan kesehatan tropis (seperti ITM Antwerp). Sangat relevan bagi periset kesehatan dan lingkungan daerah.',
    quota: '± 10-15 mahasiswa dari Indonesia per tahun',
    selectionStages: ['Pendaftaran Program Master Terakreditasi', 'Shortlisting Universitas Belgia', 'Verifikasi Komite Beasiswa Federal', 'Penerbitan Visa & Keberangkatan'],
    regionGroup: 'Eropa Barat, Skandinavia & Turki',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: false,
    statusNote: 'Program berorientasi pembangunan bagi negara berkembang. Pendaftaran dibuka Oktober - Februari.'
  },
  {
    id: 'belanda-stuned-note',
    name: 'Belanda (Catatan Non-Eligibilitas StuNed/OKP & NL Scholarship)',
    organizer: 'Nuffic Neso / Pemerintah Kerajaan Belanda',
    country: 'Belanda',
    flag: '🇳🇱',
    level: ['S1', 'S2'],
    fundingType: 'Partial',
    coverage: [
      'Peringatan Resmi Dokumen: TIDAK ADA SKEMA BEASISWA PENUH PEMERINTAH BELANDA UNTUK WNI SAAT INI',
      'Program StuNed dan Orange Knowledge Programme (OKP) telah resmi berakhir',
      'Skema yang tersedia dari pemerintah Belanda hanya "NL Scholarship" (Holland Scholarship) yang sifatnya PARSIAL (€5.000 atau €10.000 satu kali)',
      'Solusi Alternatif: Pelamar WNI yang menginginkan pendanaan penuh ke universitas Belanda diwajibkan mendaftar melalui skema LPDP Reguler atau Erasmus Mundus'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Pengelolaan Air & Maritim', 'Hukum Internasional', 'Pertanian & Pangan'],
    requirements: {
      gpa: 'IPK minimal 3.25',
      language: 'IELTS min 6.5',
      documents: ['Surat penerimaan universitas di Belanda']
    },
    applicationPeriod: {
      open: 'Informasi Edukasi Resmi',
      deadline: 'Tidak Ada Skema Penuh',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.studyinholland.nl',
    difficulty: 'Moderat',
    lastVerified: '2026-10-28',
    summary: 'Catatan penting edukasi dari dokumen resmi: StuNed dan OKP sudah berakhir. Skema Belanda hanya parsial (NL Scholarship). Jika ingin kuliah penuh gratis di Belanda, wajib gunakan LPDP atau Erasmus Mundus.',
    tipsMandalika: 'Jangan mencari formulir StuNed karena sudah ditutup permanen. Jika Anda ingin kuliah di Wageningen, TU Delft, atau Leiden, daftarlah via beasiswa LPDP Luar Negeri!',
    quota: '0 (Skema pemerintah penuh telah berakhir)',
    selectionStages: ['Gunakan Jalur LPDP Luar Negeri untuk universitas target di Belanda'],
    regionGroup: 'Eropa Barat, Skandinavia & Turki',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: false,
    educationalNote: 'Catatan Resmi PDF: Tidak ada skema pemerintah penuh untuk WNI. StuNed dan OKP berakhir, gunakan LPDP atau Erasmus Mundus.'
  },
  {
    id: 'maeci-italy',
    name: 'Italian Government Scholarships (MAECI)',
    organizer: 'Kementerian Luar Negeri dan Kerja Sama Internasional Italia (MAECI)',
    country: 'Italia',
    flag: '🇮🇹',
    level: ['S2', 'S3', 'Riset'],
    fundingType: 'Fully Funded',
    coverage: [
      'Pembebasan biaya pendaftaran dan biaya kuliah di universitas negeri Italia',
      'Tunjangan biaya hidup bulanan sebesar €900/bulan',
      'Asuransi kesehatan dan kecelakaan selama periode studi',
      'Masa pendanaan 6 hingga 9 bulan untuk Master/Riset'
    ],
    fieldsOfStudy: ['Seni & Desain', 'Arsitektur & Teknik Sipil', 'Engineering & Teknologi', 'Ekonomi & Manajemen', 'Bahasa & Budaya Italia'],
    requirements: {
      gpa: 'Gelar sarjana dengan catatan akademik baik',
      language: 'Program Inggris: minimal B2 (IELTS 6.0 / TOEFL iBT 78); Program Italia: minimal B2 bahasa Italia',
      maxAge: 'Maksimal 28 tahun untuk Master; Maksimal 30 tahun untuk PhD',
      workExperience: 'Tidak diwajibkan',
      documents: [
        'Formulir pendaftaran daring via portal Study in Italy',
        'Salinan paspor yang masih berlaku',
        'Transkrip nilai dan ijazah legalisir',
        'Motivation letter dan sertifikat kemahiran bahasa'
      ]
    },
    applicationPeriod: {
      open: 'Mei 2027',
      deadline: 'Juni 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://studyinitaly.esteri.it',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa resmi pemerintah Italia untuk menempuh program Master, Doktoral, atau riset di universitas bersejarah dan politeknik terkemuka Italia (Politecnico di Milano, Bologna, dll).',
    tipsMandalika: 'Italia merupakan kiblat dunia untuk desain, mode, teknik otomotif/mekanik, dan restorasi budaya. Banyak program di Politecnico di Milano dan Roma yang 100% berbahasa Inggris.',
    quota: '± 10-15 kuota beasiswa untuk Indonesia',
    selectionStages: ['Pendaftaran di portal Study in Italy', 'Seleksi Komite Bersama Kedutaan Italia Jakarta', 'Wawancara Daring', 'Penerbitan Visa'],
    regionGroup: 'Eropa Barat, Skandinavia & Turki',
    seasonPattern: 'Apr-Jun',
    isVerifiedCheckmark: false,
    statusNote: 'Biaya hidup dan asuransi. Pendaftaran dibuka pertengahan tahun via Kedutaan Italia.'
  },
  {
    id: 'sisgp-sweden',
    name: 'Swedish Institute Scholarships for Global Professionals (SISGP)',
    organizer: 'Swedish Institute (Pemerintah Kerajaan Swedia)',
    country: 'Swedia',
    flag: '🇸🇪',
    level: ['S2'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah penuh (100% Tuition fee) langsung dibayarkan ke universitas di Swedia',
      'Uang saku bulanan SEK 12.000 (~Rp 18 juta/bulan) untuk living cost',
      'Tunjangan perjalanan internasional SEK 15.000',
      'Asuransi kesehatan dan kecelakaan komprehensif',
      'Keanggotaan eksklusif dalam SI Network for Future Global Leaders (NFGL)'
    ],
    fieldsOfStudy: ['Sustainability & Energi Bersih', 'Engineering & IT', 'Hak Asasi Manusia & Tata Kelola', 'Kesehatan Masyarakat', 'Bisnis Inovasi'],
    requirements: {
      gpa: 'Gelar sarjana dengan catatan prestasi akademik baik',
      language: 'Sesuai syarat program Master di Swedia (IELTS min 6.5)',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Wajib memiliki minimal 3.000 jam pengalaman kerja profesional dan pengalaman kepemimpinan yang dapat dibuktikan',
      documents: [
        'Aplikasi penerimaan Master di universityadmissions.se',
        'Formulir CV resmi format SI (Swedish Institute)',
        'Surat bukti pengalaman kerja resmi dari instansi',
        'Surat bukti kepemimpinan (Proof of Work and Leadership Experience) format SI',
        'Salinan paspor'
      ]
    },
    applicationPeriod: {
      open: 'Oktober 2026 (Aplikasi Kampus) / Februari 2027 (Aplikasi Beasiswa SI)',
      deadline: '15 Januari 2027 (Kampus) / 28 Februari 2027 (Beasiswa)',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://si.se',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa prestisius pemerintah Swedia yang membiayai para profesional visioner dari negara berkembang untuk studi Master di negara paling inovatif di Eropa.',
    tipsMandalika: 'SISGP sangat menitikberatkan pada "Leadership Experience" dan relevansi dengan target SDGs. Pastikan atasan Anda mengisi form kepemimpinan SI dengan contoh terukur.',
    quota: '± 300 penerima global (~15-25 dari Indonesia)',
    selectionStages: ['Pendaftaran Master di Universityadmissions.se', 'Pendaftaran Beasiswa di Portal SI', 'Evaluasi Kepemimpinan & Pengalaman Kerja', 'Pengumuman Final (April)'],
    regionGroup: 'Eropa Barat, Skandinavia & Turki',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: false,
    statusNote: 'Kuliah & tunjangan Master di Swedia. Pendaftaran kampus musim gugur, beasiswa di bulan Februari.'
  },
  {
    id: 'russian-government',
    name: 'Russian Government Scholarship (Russian House)',
    organizer: 'Kementerian Sains dan Pendidikan Tinggi Federasi Rusia & Rossotrudnichestvo',
    country: 'Rusia',
    flag: '🇷🇺',
    level: ['S1', 'S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Bebas biaya perkuliahan 100% (Free tuition fee) sepanjang masa studi',
      'Gratis 1 tahun kursus bahasa Rusia di fakultas persiapan (Podfak) sebelum perkuliahan dimulai',
      'Subsidi akomodasi asrama kampus yang sangat murah',
      'Tunjangan pemeliharaan bulanan standar mahasiswa Rusia'
    ],
    fieldsOfStudy: ['Engineering Nuklir & Dirgantara', 'Kedokteran & Bedah', 'Hubungan Internasional & Diplomasi', 'Sains Murni & Matematika', 'Seni Musik & Tari'],
    requirements: {
      gpa: 'Rata-rata nilai rapor SMA minimal 80 untuk S1; IPK minimal 3.00 untuk S2/S3',
      language: 'TIDAK WAJIB BISA BAHASA RUSIA saat mendaftar (disediakan sekolah bahasa 1 tahun)',
      maxAge: 'Tidak ada batasan usia kaku',
      workExperience: 'Tidak diwajibkan',
      documents: [
        'Pendaftaran di portal resmi education-in-russia.com',
        'Salinan paspor dengan masa berlaku minimal 18 bulan',
        'Ijazah dan transkrip nilai resmi terjemahan tersumpah bahasa Rusia',
        'Surat keterangan bebas HIV/AIDS dan narkoba resmi',
        'Portofolio prestasi akademik/non-akademik'
      ]
    },
    applicationPeriod: {
      open: 'Oktober 2026',
      deadline: '15 Januari 2027',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://russia.study',
    difficulty: 'Moderat',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa kuota pemerintah Federasi Rusia yang dikelola Russian House di Jakarta untuk menempuh studi sarjana hingga doktoral di kampus sains dan teknik terbaik Rusia.',
    tipsMandalika: 'Sangat ramah bagi lulusan SMA atau sarjana daerah karena tidak memerlukan sertifikat IELTS sama sekali! Rusia sangat unggul di bidang teknik penerbangan, nuklir, dan kedokteran.',
    quota: '± 250-300 kuota beasiswa bagi Indonesia per tahun',
    selectionStages: ['Pendaftaran di education-in-russia.com', 'Seleksi Berkas di Russian House Jakarta', 'Wawancara Online/Luring', 'Pemberangkatan & Podfak'],
    regionGroup: 'Eropa Barat, Skandinavia & Turki',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: true,
    statusNote: '✔ Periode 2026/2027 dikelola Russian House di Indonesia via portal resmi. Termasuk 1 tahun sekolah bahasa gratis.'
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
      'Akomodasi asrama mahasiswa gratis lengkap dengan makan harian (sarapan & makan malam)',
      'Uang saku bulanan: S1: 3.500 TL; S2: 5.000 TL; S3: 6.500 TL',
      'Tiket pesawat PP Indonesia - Turki (sekali saat awal dan saat lulus)',
      'Asuransi kesehatan publik gratis (General Health Insurance)',
      'Kursus bahasa Turki (TÖMER) gratis selama 1 tahun penuh'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Bisnis & Ekonomi', 'Kedokteran & Farmasi', 'Studi Islam & Hubungan Internasional'],
    requirements: {
      gpa: 'Minimal 70% untuk S1, 75% untuk S2/S3, dan 90% khusus rumpun Kedokteran',
      language: 'Tidak wajib sertifikat bahasa Inggris jika memilih jurusan berbahasa Turki',
      maxAge: 'Di bawah 21 tahun (S1), di bawah 30 tahun (S2), di bawah 35 tahun (S3)',
      workExperience: 'Tidak dipersyaratkan',
      documents: [
        'KTP / Paspor yang masih berlaku',
        'Foto profil formal',
        'Ijazah & Transkrip Nilai Terjemahan',
        'Letter of Intent / Esai Rencana Studi terstruktur',
        'Surat Rekomendasi (Akademik / Organisasi)',
        'Sertifikat prestasi / piagam penghargaan daerah atau nasional'
      ]
    },
    applicationPeriod: {
      open: '10 Januari 2027',
      deadline: '20 Februari 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.turkiyeburslari.gov.tr',
    difficulty: 'Moderat',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa yang sangat ramah bagi lulusan SMA/SMK dan sarjana daerah yang ingin kuliah gratis ke Eropa-Asia tanpa wajib memiliki sertifikat IELTS di awal.',
    tipsMandalika: 'Turki sangat ramah bagi anak daerah karena mencakup asrama dan makan gratis. Kuncinya pada Letter of Intent yang menunjukkan rasa hormat pada hubungan diplomasi Indonesia-Turki dan rencana karir yang spesifik.',
    quota: '± 80-100 mahasiswa dari Indonesia per tahun',
    selectionStages: ['Pendaftaran Online TBBS', 'Pemeriksaan Berkas & Prestasi', 'Wawancara Tatap Muka di Jakarta/Aceh/Online', 'Pengumuman Final & Pengurusan Visa'],
    regionGroup: 'Eropa Barat, Skandinavia & Turki',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: false,
    statusNote: 'Kuliah, akomodasi, uang saku, tiket, kursus bahasa Turki, asuransi. Pendaftaran serentak 10 Jan - 20 Feb.'
  },

  // ==========================================
  // 11. TIMUR TENGAH
  // ==========================================
  {
    id: 'kaust-saudi',
    name: 'KAUST Fellowship (Arab Saudi)',
    organizer: 'King Abdullah University of Science and Technology (KAUST)',
    country: 'Arab Saudi',
    flag: '🇸🇦',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Bebas biaya perkuliahan 100% (Full tuition support)',
      'Tunjangan biaya hidup tahunan yang sangat royal: $20.000 - $30.000 per tahun (bebas pajak / ~Rp 26-39 juta/bulan)',
      'Akomodasi perumahan mahasiswa modern gratis di tepi Laut Merah',
      'Asuransi kesehatan dan gigi lengkap',
      'Tiket penerbangan internasional tahunan PP',
      'Akses fasilitas riset superkomputer dan laboratorium tercanggih di Timur Tengah'
    ],
    fieldsOfStudy: ['Applied Physics & Mathematics', 'Bioengineering & Bioscience', 'Chemical & Petroleum Engineering', 'Computer Science & AI', 'Marine & Environmental Science'],
    requirements: {
      gpa: 'IPK minimal 3.50 pada skala 4.00 di bidang STEM',
      language: 'TOEFL iBT min 79 atau IELTS min 6.5',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Passion tinggi pada eksperimen sains dan riset laboratorium',
      documents: [
        'Formulir pendaftaran online KAUST Admissions',
        'Statement of Purpose (latar belakang riset dan rencana studi)',
        'Curriculum Vitae',
        '3 Surat Rekomendasi dari akademisi di bidang sains/teknik',
        'Transkrip resmi berbahasa Inggris'
      ]
    },
    applicationPeriod: {
      open: 'Buka Sepanjang Tahun',
      deadline: 'Penerimaan Bergulir (Rolling Basis: Musim Gugur & Musim Semi)',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://www.kaust.edu.sa',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa sains dan teknologi paling makmur di dunia di universitas riset internasional KAUST, Thuwal, Arab Saudi dengan fasilitas laboratorium bernilai miliaran dolar.',
    tipsMandalika: 'KAUST merupakan kampus internasional independen berbahasa Inggris penuh di tepi Laut Merah. Kampusnya bebas campur gender dan fokus mencetak saintis kelas dunia.',
    quota: 'Ratusan fellowship riset per tahun',
    selectionStages: ['Pendaftaran Daring KAUST', 'Evaluasi Komite Pascasarjana', 'Wawancara Akademik Daring', 'Penerbitan Surat Tawaran'],
    regionGroup: 'Timur Tengah',
    seasonPattern: 'Sepanjang Tahun',
    isVerifiedCheckmark: false,
    statusNote: 'Pendanaan penuh kuliah, tunjangan hidup royal, akomodasi tepi Laut Merah. Buka sepanjang tahun.'
  },
  {
    id: 'mbzuai-uae',
    name: 'MBZUAI Scholarship for Artificial Intelligence (UAE)',
    organizer: 'Mohamed bin Zayed University of Artificial Intelligence, Abu Dhabi',
    country: 'Uni Emirat Arab',
    flag: '🇦🇪',
    level: ['S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah penuh 100% (100% Tuition fee waiver)',
      'Tunjangan bulanan besar (bebas pajak) untuk biaya hidup di Abu Dhabi',
      'Akomodasi asrama modern mahasiswa gratis',
      'Tiket penerbangan tahunan PP internasional',
      'Asuransi kesehatan lengkap UAE dan pengurusan visa kependudukan UAE'
    ],
    fieldsOfStudy: ['Machine Learning & Deep Learning', 'Computer Vision', 'Natural Language Processing (NLP)', 'Robotics & Autonomous Systems'],
    requirements: {
      gpa: 'Gelar sarjana/magister di bidang Ilmu Komputer, Teknik Elektro, Matematika dengan IPK min 3.20',
      language: 'TOEFL iBT min 90 / IELTS min 6.5 (tidak ada band < 6.0)',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Kemampuan pemrograman (Python, C++) dan pemahaman kalkulus/aljabar linier',
      documents: [
        'Aplikasi pendaftaran online portal MBZUAI',
        'Statement of Purpose di bidang Artificial Intelligence',
        'Research Proposal (untuk pelamar PhD)',
        'Transkrip nilai resmi',
        '2 Surat rekomendasi akademik'
      ]
    },
    applicationPeriod: {
      open: '1 September 2026',
      deadline: '15 Januari 2027',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://mbzuai.ac.ae',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Universitas riset spesialis AI pertama di dunia di Abu Dhabi yang menawarkan beasiswa penuh bagi talenta global di bidang Artificial Intelligence dan Robotika.',
    tipsMandalika: 'MBZUAI dipimpin oleh ilmuwan AI top dunia. Jika Anda memiliki latar belakang matematika, data science, atau computer science, beasiswa ini adalah tiket emas karier AI global!',
    quota: '± 100-150 mahasiswa per angkatan',
    selectionStages: ['Pendaftaran Daring', 'Ujian Masuk Online Matematika & Pemrograman', 'Wawancara Akademik Panel Profesor AI', 'Pengumuman Penerimaan'],
    regionGroup: 'Timur Tengah',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: false,
    statusNote: 'Beasiswa penuh AI & tunjangan bulanan di Abu Dhabi. Pendaftaran dibuka hingga Januari.'
  },
  {
    id: 'madinah-alazhar',
    name: 'Universitas Islam Madinah & Al-Azhar Kairo',
    organizer: 'Pemerintah Kerajaan Arab Saudi & Al-Azhar Al-Syarif (via Kemenag RI)',
    country: 'Arab Saudi & Mesir',
    flag: '🇸🇦',
    level: ['S1', 'S2', 'S3'],
    fundingType: 'Fully Funded',
    coverage: [
      'Pendidikan tinggi gratis 100% di pusat keilmuan Islam tertua dan terkemuka dunia',
      'Asrama mahasiswa gratis lengkap dengan fasilitas belajar',
      'Uang saku bulanan untuk kebutuhan hidup',
      'Subsidi makan harian',
      'Tiket pesawat PP tahunan (khusus Universitas Islam Madinah)',
      'Layanan kesehatan di rumah sakit kampus'
    ],
    fieldsOfStudy: ['Syariah & Hukum Islam', 'Ushuluddin & Teologi', 'Bahasa & Sastra Arab', 'Hadis & Studi Al-Qur’an', 'Dakwah & Sejarah Islam'],
    requirements: {
      gpa: 'Nilai rapor Madrasah Aliyah / SMA / Pesantren di atas rata-rata',
      language: 'Kemahiran bahasa Arab aktif (lisan dan tulisan) dan hafalan Al-Qur’an',
      maxAge: 'Madinah: maksimal 25 tahun untuk S1; Al-Azhar melalui jalur seleksi Kemenag',
      workExperience: 'Tidak diwajibkan',
      documents: [
        'Ijazah Madrasah Aliyah / Pesantren muadalah terjemahan resmi bahasa Arab',
        'Syahadah hafalan Al-Qur’an (jika ada)',
        'Surat rekomendasi dari ormas Islam / tokoh ulama',
        'SKCK dan surat keterangan sehat'
      ]
    },
    applicationPeriod: {
      open: 'Januari 2027',
      deadline: 'April 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://iu.edu.sa',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Jalur beasiswa utama untuk mendalami studi keislaman dan bahasa Arab di dua kutub peradaban Islam: Madinah Nabawiyyah dan Al-Azhar Kairo Mesir.',
    tipsMandalika: 'Nusa Tenggara Barat memiliki julukan "Pulau Seribu Masjid" dengan tradisi pesantren kuat. Jalur ini sangat tepat bagi santri berprestasi yang menguasai tahfidz dan nahwu sharaf.',
    quota: 'Ratusan santri Indonesia setiap tahun',
    selectionStages: ['Seleksi Berkas / Tes Kemenag (Pusiba/Diktis)', 'Ujian Tahfidz & Bahasa Arab', 'Wawancara Syafahi', 'Pemberangkatan Visa Pelajar'],
    regionGroup: 'Timur Tengah',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: false,
    statusNote: 'Madinah via portal E-Service; Al-Azhar via seleksi resmi Kemenag RI (Diktis/Pusiba).'
  },

  // ==========================================
  // 12. LINTAS NEGARA
  // ==========================================
  {
    id: 'erasmus-mundus',
    name: 'Erasmus Mundus Joint Masters (EMJM)',
    organizer: 'Uni Eropa (European Commission)',
    country: 'Lintas Negara',
    flag: '🇪🇺',
    level: ['S2'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah penuh di 2 hingga 4 universitas negara Eropa berbeda selama 2 tahun',
      'Uang saku bulanan bebas pajak €1.400 / bulan (~Rp 24 juta/bulan)',
      'Tunjangan perjalanan dan instalasi internasional',
      'Asuransi kesehatan lengkap di seluruh negara anggota Schengen',
      'Mendapatkan gelar ganda (Double Degree / Joint Degree) resmi dari universitas-universitas Eropa'
    ],
    fieldsOfStudy: ['Engineering & STEM', 'Sosial & Humaniora', 'Lingkungan & Energi', 'Data Science & AI', 'Pertanian Berkelanjutan'],
    requirements: {
      gpa: 'IPK minimal 3.25 / 4.00 pada jenjang Sarjana (S1)',
      language: 'IELTS min 6.5 (beberapa program meminta min 7.0)',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Pengalaman riset / magang relevan sangat dihargai',
      documents: [
        'Curriculum Vitae format Europass',
        'Motivation Letter berorientasi mobilitas internasional',
        '2 Surat Rekomendasi Dosen / Kolega Riset',
        'Transkrip nilai dan ijazah bahasa Inggris terjemahan resmi',
        'Proof of Residence (surat keterangan domisili)'
      ]
    },
    applicationPeriod: {
      open: 'Oktober 2026',
      deadline: 'Januari 2027 / Februari 2027',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://erasmus-plus.ec.europa.eu',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Program Master gabungan Eropa di mana Anda belajar di minimal 2 negara Eropa berbeda (misal semester 1 di Prancis, semester 2 di Jerman, semester 3 di Spanyol).',
    tipsMandalika: 'Pelamar dari Indonesia sangat berpeluang karena Uni Eropa memiliki alokasi anggaran khusus "Partner Countries" (Kawasan Asia Tenggara). Sorot kesiapan Anda beradaptasi di lingkungan multikultural.',
    quota: '± 80-100 mahasiswa dari Indonesia per tahun',
    selectionStages: ['Pendaftaran konsorsium program di katalog EMJM', 'Evaluasi portofolio akademik & esai', 'Interview daring', 'Nominasi Komisi Uni Eropa'],
    regionGroup: 'Lintas Negara',
    seasonPattern: 'Okt-Des',
    isVerifiedCheckmark: false,
    statusNote: 'Program Master multi-negara Eropa bergelar ganda. Pendaftaran dibuka Oktober - Februari.'
  },
  {
    id: 'adb-japan-scholarship',
    name: 'ADB–Japan Scholarship Program (ADB-JSP)',
    organizer: 'Asian Development Bank (ADB) & Pemerintah Jepang',
    country: 'Lintas Negara',
    flag: '🌐',
    level: ['S2'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah penuh (Full tuition fee) di universitas mitra terpilih di Asia Pasifik',
      'Tunjangan biaya hidup bulanan untuk makan dan tempat tinggal',
      'Tunjangan buku dan materi pembelajaran',
      'Asuransi medis dan kecelakaan komprehensif',
      'Tiket penerbangan internasional kelas ekonomi PP'
    ],
    fieldsOfStudy: ['Ekonomi Pembangunan & Manajemen', 'Engineering & Teknologi', 'Sains Lingkungan & Sumber Daya Hayati', 'Kesehatan Masyarakat'],
    requirements: {
      gpa: 'Catatan akademik sarjana yang unggul (IPK min 3.20)',
      language: 'Kemampuan bahasa Inggris sesuai standar kampus mitra (IELTS min 6.5)',
      maxAge: 'Maksimal 35 tahun saat mendaftar',
      workExperience: 'Minimal 2 tahun pengalaman kerja profesional setelah lulus sarjana',
      documents: [
        'Formulir aplikasi pendaftaran universitas mitra ADB',
        'Formulir beasiswa ADB-JSP dengan bukti penghasilan',
        'Surat rekomendasi atasan tempat bekerja',
        'Esai komitmen kembali ke Indonesia dan berkontribusi minimal 2 tahun'
      ]
    },
    applicationPeriod: {
      open: 'Buka Sepanjang Tahun',
      deadline: 'Minimal 6 bulan sebelum jadwal perkuliahan kampus mitra',
      deadlineStatus: 'open'
    },
    officialUrl: 'https://www.adb.org',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Beasiswa pembiayaan penuh di universitas ternama di Jepang, Singapura, Australia, Hong Kong, Thailand, dan Selandia Baru untuk bidang pembangunan ekonomi.',
    tipsMandalika: 'Wajib kembali ke Indonesia minimal 2 tahun setelah lulus. Sangat tepat bagi profesional yang berorientasi pada pembangunan infrastruktur dan pemulihan ekonomi.',
    quota: '± 135 beasiswa dianugerahkan per tahun di kawasan Asia Pasifik',
    selectionStages: ['Pendaftaran ke Kampus Mitra ADB', 'Shortlisting Universitas', 'Review Dewan Eksekutif ADB di Manila', 'Awarding'],
    regionGroup: 'Lintas Negara',
    seasonPattern: 'Sepanjang Tahun',
    isVerifiedCheckmark: false,
    statusNote: 'Kuliah, tunjangan, tiket, asuransi di kampus mitra Asia Pasifik. Dibuka berkala.'
  },
  {
    id: 'joint-japan-worldbank',
    name: 'Joint Japan/World Bank Graduate Scholarship (JJ/WBGSP)',
    organizer: 'World Bank & Pemerintah Jepang',
    country: 'Lintas Negara',
    flag: '🌐',
    level: ['S2'],
    fundingType: 'Fully Funded',
    coverage: [
      'Biaya kuliah penuh di program Master mitra terpilih di AS, Eropa, Afrika, Oseania, dan Jepang',
      'Tunjangan biaya hidup bulanan yang memadai',
      'Tiket penerbangan kelas ekonomi PP internasional',
      'Tunjangan perjalanan $500',
      'Asuransi kesehatan komprehensif'
    ],
    fieldsOfStudy: ['Kebijakan Pembangunan Ekonomi', 'Manajemen Pajak & Keuangan Publik', 'Infrastruktur & Energi', 'Manajemen Kesehatan Global'],
    requirements: {
      gpa: 'Gelar sarjana dengan rekam jejak akademik baik',
      language: 'Kemahiran bahasa Inggris sesuai program mitra',
      maxAge: 'Tidak ada batasan kaku, diutamakan profesional usia produktif',
      workExperience: 'Wajib memiliki minimal 3 tahun pengalaman kerja penuh waktu di sektor pembangunan setelah lulus S1',
      documents: [
        'Surat penerimaan tanpa syarat (Unconditional LoA) dari salah satu program studi mitra JJ/WBGSP',
        'Bukti pengalaman kerja minimal 3 tahun di bidang pembangunan',
        'Dua surat rekomendasi profesional',
        'Formulir aplikasi daring Bank Dunia'
      ]
    },
    applicationPeriod: {
      open: 'Januari 2027 (Window 1) / Maret 2027 (Window 2)',
      deadline: 'Februari 2027 (Window 1) / Mei 2027 (Window 2)',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.worldbank.org',
    difficulty: 'Sangat Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Program prestisius Bank Dunia untuk melatih para perencana pembangunan dari negara berkembang pada program studi magister terakreditasi dunia.',
    tipsMandalika: 'Pelamar harus sudah mengantongi surat penerimaan (LoA) dari program studi yang ada dalam daftar Participating Programs Bank Dunia sebelum mengajukan aplikasi beasiswa.',
    quota: 'Puluhan praktisi pembangunan internasional tiap tahun',
    selectionStages: ['Penerimaan LoA di Kampus Mitra', 'Aplikasi Beasiswa Bank Dunia', 'Seleksi Komite Independen World Bank Washington', 'Pengumuman Penerima'],
    regionGroup: 'Lintas Negara',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: false,
    statusNote: 'Program magister pembangunan mitra terpilih Bank Dunia. Dua jendela aplikasi (Jan-Feb & Mar-Mei).'
  },
  {
    id: 'rotary-peace-fellowship',
    name: 'Rotary Peace Fellowship',
    organizer: 'The Rotary Foundation',
    country: 'Lintas Negara',
    flag: '🌐',
    level: ['S2', 'Riset'],
    fundingType: 'Fully Funded',
    coverage: [
      'Pendanaan penuh biaya kuliah di Rotary Peace Centers terkemuka di dunia',
      'Tunjangan kamar dan konsumsi makan bulanan',
      'Tiket transportasi PP internasional',
      'Pendanaan penuh untuk studi lapangan dan magang perdamaian (Applied Field Experience)',
      'Asuransi kesehatan menyeluruh'
    ],
    fieldsOfStudy: ['Perdamaian & Resolusi Konflik', 'Hubungan Internasional & Diplomasi', 'Pencegahan Bencana & Kemanusiaan', 'Pembangunan Sosial'],
    requirements: {
      gpa: 'Gelar sarjana dengan catatan akademik baik',
      language: 'Kemahiran bahasa Inggris yang fasih',
      maxAge: 'Tidak ada batasan usia',
      workExperience: 'Minimal 3 tahun pengalaman kerja relevan untuk Master; minimal 5 tahun untuk Sertifikat Profesional',
      documents: [
        'Aplikasi daring Rotary Peace Fellowship',
        'Endorsement dari Distrik Rotary setempat',
        'Esai pengalaman kepemimpinan dalam penyelesaian konflik atau advokasi sosial',
        'Transkrip akademik dan resume'
      ]
    },
    applicationPeriod: {
      open: '1 Februari 2027',
      deadline: '15 Mei 2027',
      deadlineStatus: 'upcoming'
    },
    officialUrl: 'https://www.rotary.org',
    difficulty: 'Kompetitif',
    lastVerified: '2026-10-28',
    summary: 'Fellowship perdamaian global yang membiayai para aktivis, mediator konflik, diplomat, dan jurnalis untuk mendalami resolusi konflik dan kepemimpinan kemanusiaan.',
    tipsMandalika: 'Pusat studi berada di universitas bergengsi dunia (Duke/UNC di AS, Queensland di Australia, Uppsala di Swedia, ICU di Jepang, Makerere di Uganda, Bahçeşehir di Turki). Hubungi Rotary Club terdekat untuk endorsement!',
    quota: '± 130 fellows perdamaian global per tahun (50 Master & 80 Sertifikat)',
    selectionStages: ['Pendaftaran Online', 'Endorsement Distrik Rotary', 'Review Komite Yayasan Rotary Dunia', 'Penetapan Penerima (November)'],
    regionGroup: 'Lintas Negara',
    seasonPattern: 'Jan-Mar',
    isVerifiedCheckmark: false,
    statusNote: 'Program Master atau sertifikat profesional di Pusat Studi Perdamaian Rotary dunia. Dibuka Feb - Mei.'
  }
];

export const SCHOLARSHIP_SEASONS = [
  { id: 'all', label: 'Semua Musim', count: SCHOLARSHIPS_DATA.length },
  { id: 'Jan-Mar', label: '🌸 Jan - Mar (Musim Semi Awal)', desc: 'Türkiye Bursları, Stipendium Hungaricum, CSC, GKS Kedutaan, LPDP Batch 1, Australia Awards (buka Feb), Manaaki NZ' },
  { id: 'Apr-Jun', label: '☀️ Apr - Jun (Musim Panas Awal)', desc: 'MEXT Kedutaan, Australia Awards (tutup akhir Apr), LPDP-Australia Awards, Rotary Peace' },
  { id: 'Jul-Sep', label: '🍂 Jul - Sep (Musim Gugur)', desc: 'LPDP Batch 2, Chevening UK (buka Ags), program Eropa tertentu' },
  { id: 'Okt-Des', label: '❄️ Okt - Des (Musim Dingin)', desc: 'Chevening (tutup awal Okt), Knight-Hennessy, Gates Cambridge, Swiss Excellence, SISGP, HKPFS, Pearson U of T, Erasmus Mundus' }
];

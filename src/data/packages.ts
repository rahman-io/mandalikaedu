export interface ServicePackage {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  priceFormatted: string;
  priceNumber: number;
  isPopular?: boolean;
  isFree?: boolean;
  category: 'core' | 'group' | 'addon';
  duration: string;
  features: string[];
  deliverables: string[];
  targetAudience: string;
  whatsappMessage: string;
}

export const PACKAGES_DATA: ServicePackage[] = [
  {
    id: 'discovery-free',
    name: 'Discovery Session',
    badge: '100% Gratis',
    tagline: 'Pintu Masuk Pertama: Kenali Peluang Kuliah Luar Negeri Anda',
    priceFormatted: 'Rp 0',
    priceNumber: 0,
    isFree: true,
    category: 'core',
    duration: '1 sesi (20 Menit daring)',
    features: [
      'Analisis awal latar belakang akademik & profil daerah Anda',
      'Skrining kelayakan 2-3 beasiswa luar negeri yang paling realistis',
      'Rekomendasi pilihan negara berdasarkan budget & target karir',
      'Sesi tanya jawab langsung 1-on-1 dengan konsultan senior',
      'Tanpa kewajiban membeli paket berbayar apa pun'
    ],
    deliverables: [
      'Lembar ringkasan rekomendasi beasiswa PDF',
      'Ceklis persiapan awal mandiri'
    ],
    targetAudience: 'Pemula, mahasiswa/lulusan daerah yang masih bingung harus mulai dari mana dan butuh validasi arah.',
    whatsappMessage: 'Halo Tim MandalikaEdu, saya ingin mendaftar Sesi Discovery (Gratis 20 Menit) untuk konsultasi awal kuliah luar negeri.'
  },
  {
    id: 'starter-consultation',
    name: 'Starter: Konsultasi',
    badge: 'Paling Fleksibel',
    tagline: 'Bedah Roadmap Studi & Pemilihan Kampus Terarah',
    priceFormatted: 'Rp 350.000',
    priceNumber: 350000,
    category: 'core',
    duration: '2 sesi (Total 120 Menit)',
    features: [
      '2x Sesi private tatap muka virtual @60 menit',
      'Penyusunan Personal Study Roadmap jangka pendek & menengah',
      'Kurasi mendalam 5 universitas & 3 skema beasiswa target',
      'Strategi peningkatan skor bahasa (IELTS/TOEFL) hemat budget',
      'Analisis kecocokan profil dengan dewan juri beasiswa'
    ],
    deliverables: [
      'Dokumen Master Study Roadmap MandalikaEdu (PDF)',
      'Daftar kontak laboratorium profesor / admission kampus target',
      'Rekaman video sesi konsultasi'
    ],
    targetAudience: 'Kandidat yang sudah memiliki niat kuat dan ingin memiliki rencana langkah demi langkah yang rapi.',
    whatsappMessage: 'Halo Tim MandalikaEdu, saya tertarik mengambil Paket Starter: Konsultasi (Rp 350.000). Mohon informasi jadwal yang tersedia.'
  },
  {
    id: 'essay-document-review',
    name: 'Essay & Document Review',
    badge: 'Fokus Berkas',
    tagline: 'Kupas Tuntas Esai, Motivation Letter & CV Standar Global',
    priceFormatted: 'Rp 850.000',
    priceNumber: 850000,
    category: 'core',
    duration: 'Hingga 3 putaran revisi (7-10 hari kerja)',
    features: [
      'Review mendalam Curriculum Vitae (ATS & Academic CV)',
      'Bedah struktur Motivation Letter / Personal Statement (maks 1.000 kata)',
      'Koreksi tata bahasa (proofreading native-level) & kohesi narasi',
      'Highlight keunikan latar belakang lokal / daerah sebagai nilai pembeda',
      'Review format Surat Rekomendasi (Letter of Recommendation)'
    ],
    deliverables: [
      'Track changes berkas Word dengan anotasi detail tiap paragraf',
      'Voice note / video loom feedback 15 menit dari reviewer',
      'Maksimal 3x iterasi revisi hingga berkas siap submit'
    ],
    targetAudience: 'Pendaftar beasiswa yang sudah memiliki draf esai tapi ragu apakah narasinya sudah cukup persuasif dan berbobot.',
    whatsappMessage: 'Halo Tim MandalikaEdu, saya ingin memesan layanan Essay & Document Review (Rp 850.000) untuk beasiswa target saya.'
  },
  {
    id: 'scholarship-hunter',
    name: 'Scholarship Hunter',
    badge: 'Rekomendasi Utama',
    tagline: 'Bimbingan Komprehensif Berkas, Esai, Hingga Latihan Wawancara',
    priceFormatted: 'Rp 2.900.000',
    priceNumber: 2900000,
    isPopular: true,
    category: 'core',
    duration: '2 - 3 Bulan Pendampingan Intensif',
    features: [
      'Semua manfaat dalam Paket Starter & Essay Review',
      'Pendampingan intensif untuk 1-2 skema beasiswa target utama',
      'Revisi esai & statement of purpose tanpa batasan kuota putaran',
      'Penyusunan Research Proposal (untuk pelamar S2 Riset / S3)',
      '2x Sesi Simulasi Wawancara (Mock Interview) 60 menit bersama alumni peraih beasiswa terkait',
      'Grup WhatsApp private tanya jawab langsung bersama mentor'
    ],
    deliverables: [
      'Paket lengkap berkas aplikasi siap submit (Final proofread)',
      'Laporan evaluasi mock interview (rubrik penilaian resmi)',
      'Bank pertanyaan wawancara beasiswa target'
    ],
    targetAudience: 'Hunter beasiswa serius (MEXT, DAAD, AAS, Chevening, LPDP) yang ingin memaksimalkan peluang lolos seleksi.',
    whatsappMessage: 'Halo Tim MandalikaEdu, saya ingin mendaftar Paket Scholarship Hunter (Rp 2.900.000). Bisakah kita jadwalkan asesmen awal?'
  },
  {
    id: 'full-guidance',
    name: 'Full Guidance End-to-End',
    badge: 'Pendampingan 360°',
    tagline: 'Dari Nol Dokumen Sampai Koper Masuk Bagasi Pesawat',
    priceFormatted: 'Rp 7.800.000',
    priceNumber: 7800000,
    category: 'core',
    duration: 'Hingga 6 - 9 Bulan (Hingga Terbang)',
    features: [
      'Pendampingan menyeluruh dari nol tanpa syarat minimal berkas awal',
      'Bimbingan pendaftaran kampus, korespondensi profesor & LoA',
      'Revisi seluruh dokumen beasiswa + pendaftaran universitas',
      'Unlimited 1-on-1 coaching & mock interview berkali-kali',
      'Bantuan pengurusan visa pelajar, blocked account, dan financial guarantee',
      'Pencarian akomodasi & sesi briefing budaya (pre-departure survival)',
      'Jejaring relasi dengan diaspora & ikatan mahasiswa di negara tujuan'
    ],
    deliverables: [
      'Manajemen berkas komplit end-to-end',
      'Dedicated mentor pendamping pribadi',
      'Dukungan darurat saat ketibaan di negara tujuan'
    ],
    targetAudience: 'Calon mahasiswa dan orang tua yang menginginkan kepastian panduan menyeluruh, tenang, dan tertata rapi sejak nol.',
    whatsappMessage: 'Halo Tim MandalikaEdu, saya tertarik dengan bimbingan Full Guidance End-to-End (Rp 7.800.000). Mohon informasi skema pembayarannya.'
  },
  {
    id: 'group-class-essay',
    name: 'Kelas Grup: Mastering Scholarship Essay',
    badge: 'Kelas Interaktif',
    tagline: 'Belajar Bareng Menulis Esai Pemikat Komite Seleksi',
    priceFormatted: 'Rp 450.000 / orang',
    priceNumber: 450000,
    category: 'group',
    duration: '6 Pertemuan Online (Jumat & Sabtu Malam)',
    features: [
      'Kelas interaktif via Zoom kapasitas terbatas (maksimal 15 peserta)',
      'Bedah formula storytelling esai: Menjadikan latar belakang daerah sebagai kekuatan',
      'Live review esai peserta secara bergantian di kelas',
      'Akses rekaman kelas selamanya + template esai yang sudah terbukti lolos',
      'Tugas mingguan dengan koreksi terarah'
    ],
    deliverables: [
      'Workbook Esai MandalikaEdu (50+ Halaman)',
      'Kumpulan contoh esai peraih beasiswa (MEXT, AAS, Chevening, DAAD)',
      'Sertifikat keikutsertaan kelas'
    ],
    targetAudience: 'Mahasiswa yang ingin belajar teknik menulis esai beasiswa berkualitas dengan biaya sangat terjangkau bersama komunitas sevisi.',
    whatsappMessage: 'Halo Tim MandalikaEdu, saya ingin bergabung di Kelas Grup Esai Beasiswa (Rp 450.000). Kapan batch terdekat dibuka?'
  },
  {
    id: 'addon-mock-interview',
    name: 'Add-On: 1-on-1 Mock Interview',
    badge: 'Add-On Spesifik',
    tagline: 'Simulasi Wawancara Realistis dengan Alumni Beasiswa',
    priceFormatted: 'Rp 350.000',
    priceNumber: 350000,
    category: 'addon',
    duration: '1 sesi 60 Menit + 20 Menit Debriefing',
    features: [
      'Simulasi wawancara menggunakan bahasa Inggris/Jepang sesuai beasiswa target',
      'Pertanyaan adaptif berstandar panel juri beasiswa',
      'Umpan balik langsung terkait bahasa tubuh, intonasi, dan kejernihan jawaban',
      'Tips menjawab pertanyaan jebakan (kelemahan diri, rencana pasca-studi)'
    ],
    deliverables: [
      'Skor rubrik wawancara & catatan evaluasi tertulis',
      'Rekaman video simulasi untuk evaluasi mandiri'
    ],
    targetAudience: 'Pelamar yang telah lolos tahap berkas dan dipanggil wawancara dalam waktu dekat.',
    whatsappMessage: 'Halo Tim MandalikaEdu, saya ingin memesan Add-on Mock Interview 1-on-1 (Rp 350.000) untuk persiapan wawancara beasiswa saya.'
  },
  {
    id: 'addon-visa-guidance',
    name: 'Add-On: Bimbingan Visa Pelajar & Keuangan',
    badge: 'Add-On Spesifik',
    tagline: 'Panduan Anti-Tolak Visa & Pemenuhan Finansial',
    priceFormatted: 'Rp 400.000',
    priceNumber: 400000,
    category: 'addon',
    duration: '2 sesi konsultasi + ceklis berkas',
    features: [
      'Pengecekan kelengkapan berkas visa pelajar (Schengen, UK Student Visa, Japan Student Visa, Australia Subclass 500)',
      'Strategi penyiapan rekening koran, sponsor finansial, atau blocked account',
      'Draf Surat Penjelasan Finansial (Cover Letter to Embassy)',
      'Simulasi wawancara visa (bila diwajibkan kedutaan)'
    ],
    deliverables: [
      'Ceklis verifikasi visa per negara',
      'Draf cover letter visa siap pakai'
    ],
    targetAudience: 'Kandidat yang sudah memegang LoA dan beasiswa/sponsor yang ingin proses visanya lancar tanpa drama penolakan.',
    whatsappMessage: 'Halo Tim MandalikaEdu, saya membutuhkan layanan Add-on Bimbingan Visa Pelajar (Rp 400.000).'
  }
];

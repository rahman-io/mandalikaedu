export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Edukasi' | 'Tips Esai' | 'Info Deadline' | 'Strategi Bahasa' | 'Visa & Finansial';
  countryTag?: string;
  author: {
    name: string;
    role: string;
    credentials: string;
  };
  publishedDate: string;
  readTime: string;
  excerpt: string;
  content: string[];
  instagramCarousel: {
    slideNumber: number;
    title: string;
    body: string;
    takeaway: string;
  }[];
}

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: '1',
    slug: 'trik-menulis-motivation-letter-anak-daerah',
    title: 'Cara Menulis Motivation Letter yang Memikat Komite Seleksi: Rahasia Anak Daerah',
    category: 'Tips Esai',
    countryTag: 'Global',
    author: {
      name: 'Dr. Ilham Ramdani',
      role: 'Head Mentor MandalikaEdu',
      credentials: 'Alumni Ph.D. The University of Tokyo (MEXT Scholar)'
    },
    publishedDate: '18 Maret 2026',
    readTime: '6 menit baca',
    excerpt: 'Jangan sembunyikan asal daerah Anda! Pelajari bagaimana mengubah tantangan keterbatasan fasilitas daerah menjadi narasi kepemimpinan dan komitmen sosial yang dicari reviewer beasiswa dunia.',
    content: [
      'Banyak calon pelamar beasiswa dari luar pulau Jawa merasa minder saat harus menulis Motivation Letter atau Personal Statement. Mereka mengira komite beasiswa luar negeri hanya menyukai kandidat yang pernah magang di perusahaan multinasional megah di Jakarta.',
      'Kenyataannya justru 180 derajat terbalik. Para profesor dan reviewer beasiswa internasional (seperti Chevening, AAS, Fulbright, DAAD) sudah bosan membaca ratusan esai dengan narasi korporat yang seragam. Yang mereka cari adalah *authenticity* dan keterikatan emosional pelamar dengan masalah nyata di masyarakat.',
      'Rumus 4 Paragraf Emas MandalikaEdu:',
      '1. Paragraf Pembuka (The Spark): Bukan kutipan klise Nelson Mandela atau Einstein, melainkan momen personal spesifik di daerah Anda yang memicu rasa ingin tahu akademis.',
      '2. Paragraf Pembuktian (Action & Impact): Ceritakan aksi nyata Anda dengan metode STAR. Misalnya bagaimana Anda menginisiasi pengolahan limbah pertanian sederhana di desa Anda.',
      '3. Mengapa Universitas & Beasiswa Ini (The Strategic Bridge): Hubungkan riset laboratorium kampus target secara presisi dengan kebutuhan riil di tanah air.',
      '4. Kontribusi Konkret Pasca-Studi (Vision): Tuliskan rencana 5 tahun Anda yang terukur dan realistis saat kembali ke Indonesia.'
    ],
    instagramCarousel: [
      {
        slideNumber: 1,
        title: 'Anak Daerah Mau Tembus Beasiswa Luar Negeri? 🌏',
        body: 'Kenapa komite beasiswa internasional justru SANGAT MENYUKAI pelamar dari luar kota metropolitan?',
        takeaway: 'Swipe untuk rahasia nulis Motivation Letter berbobot! 👉'
      },
      {
        slideNumber: 2,
        title: '1. Jangan Hapus Cerita Daerahmu! 🌾',
        body: 'Keterbatasan fasilitas laboratorium atau akses yang pernah kamu hadapi adalah bukti kegigihan (resilience) yang tidak dimiliki kandidat kota besar.',
        takeaway: 'Ubah tantangan jadi bukti dedikasi.'
      },
      {
        slideNumber: 3,
        title: '2. Gunakan Formula S-T-A-R 🎯',
        body: 'Situation (Kondisi di daerah) -> Task (Tantanganmu) -> Action (Inisiatif konkret yang kamu kerjakan) -> Result (Dampak nyata pada orang sekitar).',
        takeaway: 'Bukan sekadar curhat, tapi solusi kepemimpinan.'
      },
      {
        slideNumber: 4,
        title: '3. Hindari Kutipan Klise Tokoh 🚫',
        body: 'Hentikan membuka esai dengan "Education is the most powerful weapon..." Mulailah langsung dengan kalimat pembuka pengalaman pribadimu di lapangan!',
        takeaway: 'Orisinalitas selalu menang di mata profesor.'
      },
      {
        slideNumber: 5,
        title: 'Mau Dibantu Bedah Esaimu dari Nol? 📝',
        body: 'Konsultasi gratis 20 menit bersama mentor alumni luar negeri MandalikaEdu. Kami dampingi sampai berkasmu siap kirim!',
        takeaway: 'Klik link di bio / Hubungi WhatsApp kami sekarang!'
      }
    ]
  },
  {
    id: '2',
    slug: 'kuliah-gratis-jerman-kupas-tuntas',
    title: 'Studi Gratis di Jerman: Kupas Tuntas Visa, Syarat Bahasa, dan Blocked Account',
    category: 'Edukasi',
    countryTag: 'Jerman',
    author: {
      name: 'Nadia Salsabila, M.Sc.',
      role: 'Lead European Advisor',
      credentials: 'Alumni Master RWTH Aachen University'
    },
    publishedDate: '12 Maret 2026',
    readTime: '8 menit baca',
    excerpt: 'Tahukah Anda bahwa di universitas negeri Jerman, biaya kuliah adalah Rp 0 untuk seluruh mahasiswa internasional? Inilah panduan realistis pembiayaan mandiri dan beasiswa DAAD.',
    content: [
      'Jerman tetap menjadi destinasi studi sains dan teknik paling rasional di dunia. Pemerintah 16 negara bagian Jerman membiayai penuh operasional universitas negeri sehingga biaya SPP digratiskan.',
      'Namun, pertanyaan terbesar orang tua dan calon mahasiswa adalah: "Bagaimana dengan biaya hidupnya?"',
      'Pemerintah Jerman mewajibkan bukti jaminan hidup berupa Sperrkonto (Blocked Account) senilai €11.904 untuk tahun pertama. Uang ini bukan biaya yang diserahkan ke pihak lain, melainkan rekening pribadi Anda sendiri yang bisa dicairkan €992 setiap bulan untuk makan dan sewa kamar.',
      'Kabar baiknya: Jika Anda lolos beasiswa DAAD, persyaratan blocked account ini langsung gugur karena DAAD menerbitkan dokumen jaminan finansial penuh. Selain itu, mahasiswa diizinkan bekerja paruh waktu resmi (Werkstudent) hingga 20 jam/minggu dengan gaji rata-rata €13-€16 per jam.'
    ],
    instagramCarousel: [
      {
        slideNumber: 1,
        title: 'Kuliah di Jerman Beneran Rp 0? 🇩🇪',
        body: 'Fakta di balik sistem pendidikan gratis di Jerman dan cara anak daerah bisa kuliah di sana.',
        takeaway: 'Simak rinciannya sampai slide terakhir! 👉'
      },
      {
        slideNumber: 2,
        title: '1. SPP 100% Ditanggung Pemerintah 🏛️',
        body: 'Di universitas negeri Jerman, kamu cuma bayar biaya administrasi semesteran (Semesterbeitrag) sekitar €150-350 yang sudah termasuk tiket gratis kereta seantero negara bagian!',
        takeaway: 'Bebas uang gedung dan SPP mahal.'
      },
      {
        slideNumber: 3,
        title: '2. Cara Siasati Biaya Hidup 💶',
        body: 'Bekerja resmi paruh waktu (Werkstudent) 20 jam/minggu menghasilkan €800 - €1.100 per bulan. Angka ini cukup menutup sewa kamar dan makan bulanan!',
        takeaway: 'Mandiri secara finansial di Eropa.'
      },
      {
        slideNumber: 4,
        title: '3. Tersedia 2.000+ Jurusan Bahasa Inggris 🇬🇧',
        body: 'Khusus jenjang Master (S2), kamu tidak wajib fasih bahasa Jerman di awal. Cukup miliki skor IELTS 6.5 untuk mendaftar International Degree Programme!',
        takeaway: 'Peluang terbuka lebar untuk lulusan S1 daerah.'
      },
      {
        slideNumber: 5,
        title: 'Bingung Cara Bikin Blocked Account & Daftar Kampus? 🧭',
        body: 'MandalikaEdu siap dampingi pemilihan kampus, pengurusan visa Jerman, dan beasiswa DAAD dari nol.',
        takeaway: 'Jadwalkan Discovery Call gratis via MandalikaEdu!'
      }
    ]
  },
  {
    id: '3',
    slug: 'beasiswa-mext-jepang-embassy-vs-university',
    title: 'Panduan Lengkap Beasiswa MEXT Jepang: Trik Lolos Jalur Kedutaan vs Universitas',
    category: 'Info Deadline',
    countryTag: 'Jepang',
    author: {
      name: 'Dr. Ilham Ramdani',
      role: 'Head Mentor MandalikaEdu',
      credentials: 'Alumni Ph.D. The University of Tokyo'
    },
    publishedDate: '05 Maret 2026',
    readTime: '7 menit baca',
    excerpt: 'Banyak yang hanya tahu MEXT jalur Kedutaan (Embassy Track) yang saingannya ribuan orang, padahal ada jalur Universitas (University Track) dengan peluang lolos jauh lebih besar!',
    content: [
      'Beasiswa Monbukagakusho (MEXT) adalah impian banyak mahasiswa Indonesia. Fasilitasnya sangat royal: tiket pesawat PP, SPP gratis 100%, tanpa ikatan dinas, dan tunjangan bulanan hingga ¥148.000 (~Rp 15,5 juta).',
      'Namun kebanyakan pendaftar hanya fokus pada Embassy Recommendation yang dibuka setiap April-Mei di Kedutaan Besar Jepang di Jakarta. Padahal kuotanya sangat ketat dan harus melalui ujian tertulis matematika serta bahasa Jepang.',
      'Trik Rahasia: University Recommendation (U-to-U Track)!',
      'Jalur ini dibuka sekitar Oktober-Desember setiap tahunnya. Kuncinya adalah Anda menghubungi calon profesor (Sensei) di laboratorium riset target di Jepang terlebih dahulu. Jika profesor tertarik dengan proposal riset Anda, profesor yang akan mendaftarkan nama Anda langsung ke Kementerian Pendidikan Jepang tanpa ujian tertulis Kedutaan!'
    ],
    instagramCarousel: [
      {
        slideNumber: 1,
        title: 'MEXT Jepang: Jalur Rahasia yang Jarang Diketahui 🇯🇵',
        body: 'Jangan cuma daftar jalur Kedutaan! Kenalan sama jalur University Track dengan peluang lolos 3x lebih besar.',
        takeaway: 'Bocoran strategi dari alumni Todai! 👉'
      },
      {
        slideNumber: 2,
        title: 'Embassy Track vs University Track ⚖️',
        body: 'Embassy: Ujian tertulis ketat di Jakarta, ribuan saingan se-Indonesia.\nUniversity: Tanpa tes tulis kedutaan! Kuncinya korespondensi langsung dengan calon profesor.',
        takeaway: 'Pilih jalur yang sesuai profilmu.'
      },
      {
        slideNumber: 3,
        title: 'Kunci Lolos: Email Pertama ke Profesor 📧',
        body: 'Jangan kirim email massal "copy-paste"! Baca 2-3 paper terbaru profesor, temukan irisannya dengan skripsimu, lalu jelaskan apa yang bisa kamu kontribusikan.',
        takeaway: 'Profesor Jepang menyukai kandidat yang spesifik.'
      },
      {
        slideNumber: 4,
        title: 'Benefit MEXT: Paling Nyaman di Asia 🍱',
        body: 'Uang saku ¥145.000/bulan (~Rp 15 juta) sangat surplus untuk hidup di kota-kota seperti Sendai, Fukuoka, atau Tsukuba!',
        takeaway: 'Bisa menabung sambil riset kelas dunia.'
      },
      {
        slideNumber: 5,
        title: 'Ingin Dibimbing Kontak Profesor Jepang? ⛩️',
        body: 'Tim MandalikaEdu memfasilitasi draf email, review proposal riset, dan simulasi interview dengan alumni MEXT.',
        takeaway: 'Mulai dengan Konsultasi Discovery Gratis!'
      }
    ]
  },
  {
    id: '4',
    slug: 'strategi-anak-daerah-ielts-7-tanpa-les-mahal',
    title: 'Strategi Anak Daerah Menembus IELTS 7.0 Tanpa Perlu Les Puluhan Juta di Jakarta',
    category: 'Strategi Bahasa',
    countryTag: 'Global',
    author: {
      name: 'Ratih Puspadewi, S.Pd.',
      role: 'Language Specialist',
      credentials: 'IELTS Band 8.5, Trainer MandalikaEdu'
    },
    publishedDate: '26 Februari 2026',
    readTime: '5 menit baca',
    excerpt: 'Tinggal di daerah tanpa tempat les bahasa Inggris ternama bukan halangan. Ikuti jadwal latihan terstruktur 90 hari memanfaatkan materi gratis terkurasi.',
    content: [
      'Salah satu rintangan psikologis terbesar anak daerah adalah mitos bahwa untuk dapat skor IELTS 6.5 atau 7.0, kita harus mengeluarkan Rp 10 - 20 juta untuk les privat di kota besar.',
      'Itu tidak benar. IELTS adalah tes standar yang menguji pola dan konsistensi, bukan aksen atau kemewahan tempat belajar Anda.',
      'Roadmap 90 Hari Belajar Mandiri:',
      'Bulan 1: Kuasai Grammar Fundamental & Vocabulary Akademik (Collocation). Dengarkan podcast BBC 6 Minute English dan naskah TED Talks setiap pagi.',
      'Bulan 2: Bedah Pola Listening dan Reading menggunakan buku resmi Cambridge IELTS (Jilid 14-19). Analisis mengapa jawaban Anda salah, jangan cuma menghitung skor.',
      'Bulan 3: Fokus Writing Task 1 & 2 serta Speaking. Rekam suara Anda sendiri saat menjawab prompt Speaking, dan mintalah review berkala kepada mentor berpengalaman.'
    ],
    instagramCarousel: [
      {
        slideNumber: 1,
        title: 'IELTS 7.0 dari Kamar Kos di Daerah? BISA BANGET! 🎧',
        body: 'Gak perlu les mahal puluhan juta di Jakarta. Ini strategi realistis 90 hari tembus skor target beasiswa.',
        takeaway: 'Simpan postingan ini buat jadwal belajarmu! 👉'
      },
      {
        slideNumber: 2,
        title: '1. Sumber Latihan Paling Otentik 📚',
        body: 'Cukup gunakan buku resmi Cambridge IELTS Practice Tests 15-19. Format soalnya 100% persis dengan ujian asli British Council & IDP.',
        takeaway: 'Jangan pakai bank soal abal-abal di internet.'
      },
      {
        slideNumber: 3,
        title: '2. Kunci Writing: Kohesi & Struktur ✍️',
        body: 'Banyak orang gagal di Writing bukan karena kosa katanya kurang canggih, tapi karena paragrafnya tidak menjawab prompt pertanyaan dengan runtut.',
        takeaway: 'Gunakan struktur paragraf PEEL.'
      },
      {
        slideNumber: 4,
        title: '3. Speaking: Kelancaran > Aksen Bule 🎙️',
        body: 'Examiner tidak menilai apakah kamu beraksen British atau American. Yang dinilai adalah kelancaran (fluency), kejelasan intonasi, dan variasi tenses!',
        takeaway: 'Percaya diri dengan aksen aslimu.'
      },
      {
        slideNumber: 5,
        title: 'Mau Tes Diagnostik Kemampuan Bahasamu? 📊',
        body: 'Konsultasikan target beasiswa dan strategi persiapannya bersama tim ahli bahasa MandalikaEdu.',
        takeaway: 'Booking sesi konsultasimu sekarang, link di bio!'
      }
    ]
  }
];

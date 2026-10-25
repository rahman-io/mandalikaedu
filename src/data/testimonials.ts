export interface Testimonial {
  id: string;
  name: string;
  origin: string; // Regional origin e.g. Mataram (Lombok), Kupang (NTT), etc.
  scholarship: string;
  university: string;
  country: string;
  flag: string;
  program: string;
  year: string;
  initialProblem: string;
  solutionByMandalika: string;
  quote: string;
  fullStory: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'fauzan-lombok',
    name: 'Fauzan Hidayat',
    origin: 'Lombok Timur, NTB',
    scholarship: 'MEXT Scholarship (University Recommendation)',
    university: 'Tokyo Institute of Technology (Science Tokyo)',
    country: 'Jepang',
    flag: '🇯🇵',
    program: 'Master in Mechanical Engineering',
    year: 'Angkatan 2025',
    initialProblem: 'Lulusan universitas daerah di Mataram, bingung cara menghubungi profesor Jepang dan esai riset masih terlalu teoretis tanpa kaitan ke masalah riil.',
    solutionByMandalika: 'Mentor MandalikaEdu membimbing penyusunan Research Proposal tentang optimalisasi energi terbarukan di pulau-pulau kecil, merevisi email korespondensi ke profesor di Tokyo Tech, dan latihan wawancara berkali-kali.',
    quote: 'Saya alumni kampus daerah di Lombok yang sempat minder bersaing dengan lulusan universitas top Jawa. Tim MandalikaEdu membuktikan bahwa asal daerah justru kekuatan terbesar kita jika dinarasikan dengan jujur.',
    fullStory: 'Awalnya saya merasa kuliah di Tokyo hanyalah angan-angan kosong. MandalikaEdu tidak sekadar memeriksa tata bahasa esai saya, tapi membongkar cara berpikir saya agar bisa menyajikan riset yang bernilai di mata Sensei Jepang. Ketika pengumuman MEXT keluar dan nama saya ada di daftar penerima full scholarship, keluarga kami di Lombok sujud syukur.'
  },
  {
    id: 'maria-kupang',
    name: 'Maria Angelina Berek',
    origin: 'Kupang, NTT',
    scholarship: 'Australia Awards Scholarships (AAS)',
    university: 'The University of Melbourne',
    country: 'Australia',
    flag: '🇦🇺',
    program: 'Master of Public Health (Kesehatan Masyarakat)',
    year: 'Angkatan 2025',
    initialProblem: 'Skor IELTS awal masih 5.5, merasa sulit bersaing dengan pelamar kota metropolitan Jakarta yang sudah fasih berbahasa Inggris sejak sekolah.',
    solutionByMandalika: 'MandalikaEdu mengarahkan Maria memanfaatkan afirmasi kuota Geographic Focus Area (GFA) untuk kawasan NTT, menyusun 4 esai reflektif AAS dengan contoh konkret kasus stunting di pelosok Timor, dan drilling wawancara panelis JST.',
    quote: 'MandalikaEdu tahu persis peluang afirmasi untuk kawasan Indonesia Timur. Berkat bimbingan intensif esai dan wawancara, saya berhasil meraih AAS full funding ke Melbourne!',
    fullStory: 'Banyak anak daerah tidak tahu bahwa beasiswa internasional seperti AAS justru secara spesifik mencari talenta dari kawasan timur yang punya hati mengabdi di daerah. MandalikaEdu membantu saya menerjemahkan pengalaman kerja lapangan saya di puskesmas pedalaman menjadi esai kepemimpinan yang menyentuh dan berbobot ilmiah.'
  },
  {
    id: 'rizky-padang',
    name: 'Rizky Pratama',
    origin: 'Bukittinggi, Sumatera Barat',
    scholarship: 'DAAD EPOS Full Scholarship',
    university: 'RWTH Aachen University',
    country: 'Jerman',
    flag: '🇩🇪',
    program: 'M.Sc. in Sustainable Water Resources Management',
    year: 'Angkatan 2024',
    initialProblem: 'Sudah bekerja 3 tahun di instansi pengairan daerah tapi kesulitan merangkum pengalaman kerja menjadi Motivation Letter sesuai format standar DAAD Jerman.',
    solutionByMandalika: 'Review berkas 3 putaran membedah Europass CV dan esai 2 halaman dengan argumen logis mengapa keilmuan hidrologi Jerman krusial untuk mitigasi bencana di Sumatera.',
    quote: 'Review berkas di MandalikaEdu sangat jujur dan tajam. Tidak ada basa-basi, langsung ke poin-poin yang dicari oleh reviewer Jerman.',
    fullStory: 'Saya sempat mendaftar mandiri tahun sebelumnya dan gagal di tahap berkas. Di bimbingan MandalikaEdu, saya baru sadar bahwa esai saya yang lama terlalu generik. Mentor membantu saya merumuskan proyeksi 5 tahun pasca-studi yang sangat konkret. Kini saya kuliah di Aachen dengan SPP gratis dan uang saku €934 per bulan.'
  },
  {
    id: 'anisa-makassar',
    name: 'Nurul Anisa',
    origin: 'Makassar, Sulawesi Selatan',
    scholarship: 'Chevening Scholarship UK',
    university: 'University of Edinburgh',
    country: 'Inggris',
    flag: '🇬🇧',
    program: 'MSc in International Development',
    year: 'Angkatan 2025',
    initialProblem: 'Kesulitan menulis esai "Networking" dan "Leadership" Chevening karena merasa belum pernah menjabat posisi direktur atau manajer formal.',
    solutionByMandalika: 'Melalui sesi 1-on-1, mentor menggali inisiatif komunitas literasi pesisir yang Anisa bangun, lalu menyusunnya dengan metode STAR (Situation, Task, Action, Result) yang tajam.',
    quote: 'MandalikaEdu membantu saya menemukan mutiara di dalam perjalanan hidup saya sendiri yang selama ini saya anggap biasa saja.',
    fullStory: 'Saya hampir menyerah menulis esai Chevening karena merasa kisah saya bukan kisah CEO hebat. Mentor meyakinkan saya bahwa kepemimpinan akar rumput dari daerah adalah nilai emas. Saat wawancara di Kedubes Inggris, pewawancara menanyakan persis topik yang kami simulasikan di sesi mock interview MandalikaEdu!'
  },
  {
    id: 'dimas-samarinda',
    name: 'Dimas Aditya Saputra',
    origin: 'Samarinda, Kalimantan Timur',
    scholarship: 'Türkiye Bursları (YTB)',
    university: 'Middle East Technical University (METU)',
    country: 'Turki',
    flag: '🇹🇷',
    program: 'BSc in Computer Engineering (S1 Full Funded)',
    year: 'Angkatan 2024',
    initialProblem: 'Baru lulus SMA di Samarinda, tidak punya sertifikat TOEFL/IELTS, orang tua berpenghasilan pas-pasan tidak mampu membiayai kuliah swasta mahal.',
    solutionByMandalika: 'MandalikaEdu mengarahkan Dimas ke beasiswa Türkiye Bursları yang menanggung biaya kuliah, asrama, makan gratis, dan tiket pesawat tanpa syarat wajib IELTS di awal.',
    quote: 'Tanpa MandalikaEdu, saya mungkin sudah mengubur impian kuliah di luar negeri karena kendala biaya. Sekarang saya kuliah gratis di kampus teknik nomor 1 Turki!',
    fullStory: 'Kami sekeluarga tidak pernah membayangkan anak daerah dari Kaltim bisa kuliah di luar negeri gratis 100%. MandalikaEdu membimbing penulisan Letter of Intent dan memeriksa seluruh terjemahan ijazah saya dengan teliti sampai saya lolos wawancara.'
  }
];

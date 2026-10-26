import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, MessageCircle, X, Send, Bot, CheckCheck, 
  ExternalLink, Sparkles, ChevronRight, Phone, RefreshCw, Calendar, Award, ShieldCheck, Settings, Edit3,
  Cloud, Key, Check, AlertCircle, Loader2, FileText, Maximize2, Minimize2, ArrowUp, SquarePen
} from 'lucide-react';
import { SafiyaAvatar } from './SafiyaAvatar';
import { 
  getActiveWhatsAppNumber, 
  getActiveWhatsAppDisplay, 
  setActiveWhatsAppNumber, 
  CONTACT_CONFIG 
} from '../config/contact';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actionButtons?: {
    label: string;
    type: 'whatsapp' | 'booking' | 'tab' | 'external';
    target?: string;
    packageId?: string;
  }[];
}

interface WhatsAppAiBotProps {
  onOpenBooking: (pkgId?: string, note?: string) => void;
  onNavigateTab: (tab: string) => void;
}

const HALOAI_URL = CONTACT_CONFIG.haloAiUrl;

export const sanitizePunctuation = (text: string): string => {
  if (!text) return text;
  return text
    .replace(/\s*—\s*/g, ', ')
    .replace(/\s*–\s*/g, ' - ')
    .replace(/—/g, ', ')
    .replace(/–/g, ' - ')
    .replace(/,\s*,/g, ', ')
    .replace(/,\s*\./g, '.')
    .replace(/\s{2,}/g, ' ')
    .trim();
};

export const WhatsAppAiBot: React.FC<WhatsAppAiBotProps> = ({
  onOpenBooking,
  onNavigateTab
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  
  // Dynamic WhatsApp Number
  const currentWaNumber = getActiveWhatsAppNumber();

  // Cloudflare Worker AI default fallback
  const cfWorkerUrl = 
    localStorage.getItem('mandalika_cf_worker_url') || 
    (import.meta.env.VITE_CF_WORKER_URL as string) || 
    'https://mandalikaedu-ai.rahman-udemy-manager.workers.dev';

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'Halo Kak! Selamat datang di MandalikaEdu 🎓\n\nSaya **Safiya**, asisten cerdas AI MandalikaEdu. Saya siap menemani diskusi Kakak seputar kuliah luar negeri, rekomendasi beasiswa, atau pemesanan paket bimbingan.',
      timestamp: 'Baru saja',
      actionButtons: [
        { label: '🆓 Klaim Sesi Discovery Gratis (Rp 0)', type: 'booking', packageId: 'discovery-free' },
        { label: '📦 Tanya Pilihan Paket & Biaya', type: 'tab', target: 'paket' },
        { label: '🔍 Cari Rekomendasi Beasiswa', type: 'tab', target: 'beasiswa' },
        { label: '💬 Chat di WhatsApp Resmi', type: 'whatsapp', target: 'Halo Tim MandalikaEdu, saya ingin konsultasi seputar persiapan kuliah luar negeri.' }
      ]
    }
  ]);

  const quickPrompts = [
    'Boleh bertanya?',
    '🎯 Rekomendasi beasiswa untuk saya',
    '📦 Berapa biaya & paket bimbingan?',
    '🆓 Mau booking Discovery Gratis (Rp 0)',
    '👨‍🏫 Siapa saja mentor di MandalikaEdu?',
    '📝 Review esai & Motivation Letter',
    '💬 Hubungi WhatsApp Resmi'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowTooltip(false);
    }
  }, [messages, isOpen]);

  // Direct WhatsApp opener
  const safeOpenWhatsApp = (text: string) => {
    const num = getActiveWhatsAppNumber();
    const msg = encodeURIComponent(text);
    window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
  };

  // Reset conversation handler (New Chat)
  const handleNewChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'ai',
        text: 'Halo Kak! Selamat datang di MandalikaEdu 🎓\n\nSaya **Safiya**, asisten cerdas AI MandalikaEdu. Saya siap menemani diskusi Kakak seputar kuliah luar negeri, rekomendasi beasiswa, atau pemesanan paket bimbingan.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        actionButtons: [
          { label: '🆓 Klaim Sesi Discovery Gratis (Rp 0)', type: 'booking', packageId: 'discovery-free' },
          { label: '📦 Tanya Pilihan Paket & Biaya', type: 'tab', target: 'paket' },
          { label: '🔍 Cari Rekomendasi Beasiswa', type: 'tab', target: 'beasiswa' },
          { label: '💬 Chat di WhatsApp Resmi', type: 'whatsapp', target: 'Halo Tim MandalikaEdu, saya ingin konsultasi seputar persiapan kuliah luar negeri.' }
        ]
      }
    ]);
  };

  // Context-aware agentic response engine (matches Safiya natural conversational CX)
  const generateAgenticResponse = (query: string): { text: string; actionButtons?: Message['actionButtons'] } => {
    const raw = query.trim();
    const q = raw.toLowerCase();

    // 0. Guardrail: Deteksi pertanyaan di luar konteks MandalikaEdu (beli sayur, masak, dsb.)
    const isOffTopic = /sayur|masak|resep|makan|minum|baju|motor|mobil|bengkel|politik|pemilu|presiden|artis|gosip|pacar|jodoh|game|slot|cuaca|lirik lagu/i.test(q);
    if (isOffTopic && !q.includes('beasiswa') && !q.includes('kuliah') && !q.includes('studi') && !q.includes('kampus')) {
      return {
        text: 'Maaf ya Kak, Safiya khusus dirancang untuk mendampingi persiapan beasiswa, kuliah luar negeri, dan layanan bimbingan MandalikaEdu 😊.\n\nAda yang bisa kami bantu seputar riset beasiswa, review esai, atau klaim Sesi Discovery Gratis (Rp 0)?',
        actionButtons: [
          { label: '🆓 Klaim Sesi Discovery Gratis (Rp 0)', type: 'booking', packageId: 'discovery-free' },
          { label: '🔍 Cari Rekomendasi Beasiswa', type: 'tab', target: 'beasiswa' },
          { label: '💬 Chat di WhatsApp Resmi', type: 'whatsapp', target: 'Halo MandalikaEdu, saya ingin konsultasi beasiswa.' }
        ]
      };
    }

    // 1. Sapaan & Izin Bertanya (Menjawab "Hi, boleh bertanya?", "Halo", "P", "Permisi", dsb)
    const isGreetingOrAskingPermission = 
      /^(hi|halo|hei|hey|p|assalamu|selamat|permisi|tes|test|pagi|siang|sore|malam)/i.test(q) ||
      q.includes('boleh tanya') || 
      q.includes('mau tanya') || 
      q.includes('bisa tanya') || 
      q.includes('nanya') || 
      q.includes('tanya dong') ||
      q.includes('tanya ya') ||
      q === 'halo' ||
      q === 'hi' ||
      q === 'hai' ||
      q === 'p';

    if (isGreetingOrAskingPermission && !q.includes('biaya') && !q.includes('beasiswa') && !q.includes('paket') && !q.includes('mentor')) {
      return {
        text: 'Halo Kak! Tentu saja **boleh sekali** 😊.\n\nSilakan, ada yang ingin Kakak tanyakan atau diskusikan seputar:\n• Rekomendasi beasiswa (Jepang, Jerman, Australia, UK, Turki, dll.)\n• Bimbingan pembuatan Motivation Letter & CV internasional\n• Biaya dan pemesanan paket bimbingan (atau klaim sesi Discovery Rp 0)\n• Informasi rekrutmen mentor luar negeri\n\nKira-kira jenjang apa (S1/S2/S3) atau negara mana yang sedang Kakak minati?',
        actionButtons: [
          { label: '🆓 Klaim Sesi Discovery Gratis (Rp 0)', type: 'booking', packageId: 'discovery-free' },
          { label: '🔍 Lihat Database 15+ Beasiswa', type: 'tab', target: 'beasiswa' },
          { label: '📦 Cek Paket Bimbingan', type: 'tab', target: 'paket' },
          { label: '💬 Hubungi WhatsApp Resmi', type: 'whatsapp', target: 'Halo MandalikaEdu, saya ingin berdiskusi seputar peluang beasiswa kuliah luar negeri.' }
        ]
      };
    }

    // 2. Pertanyaan seputar Safiya / Safiya AI
    if (q.includes('safiya') || q.includes('haloai') || q.includes('halo ai') || q.includes('haloai.app')) {
      return {
        text: 'Halo Kak! Saya **Safiya**, asisten AI cerdas resmi MandalikaEdu yang siap menemani diskusi Kakak 24/7 seputar beasiswa dan persiapan kuliah luar negeri 😊.\n\nKakak bisa berdiskusi langsung di sini atau melanjutkan obrolan ke WhatsApp resmi MandalikaEdu di **' + getActiveWhatsAppDisplay() + '**.',
        actionButtons: [
          { label: '💬 Chat Safiya di WhatsApp Resmi', type: 'whatsapp', target: 'Halo Safiya & Tim MandalikaEdu, saya ingin berkonsultasi.' },
          { label: '🆓 Klaim Sesi Discovery Gratis (Rp 0)', type: 'booking', packageId: 'discovery-free' }
        ]
      };
    }

    // 3. Pemesanan / Order / Booking Paket
    if (q.includes('pesan') || q.includes('order') || q.includes('beli') || q.includes('daftar') || q.includes('booking') || q.includes('ambil paket')) {
      if (q.includes('roadmap') || q.includes('199')) {
        return {
          text: 'Siap Kak! **Paket Roadmap Beasiswa (Rp 199.000)** sangat pas untuk memetakan timeline 90 hari, kurasi 3 kampus & beasiswa impian, serta strategi persiapan dari nol.\n\nSilakan klik tombol di bawah untuk isi formulir pemesanan web atau chat WhatsApp resmi kami:',
          actionButtons: [
            { label: '📝 Buka Form Pemesanan Roadmap (Web)', type: 'booking', packageId: 'roadmap-90' },
            { label: '💬 Pesan via WhatsApp Resmi', type: 'whatsapp', target: 'Halo Admin MandalikaEdu, saya ingin memesan Paket Roadmap Beasiswa (Rp 199.000).' }
          ]
        };
      }
      if (q.includes('esai') || q.includes('essay') || q.includes('cv') || q.includes('499')) {
        return {
          text: 'Pilihan tepat Kak! **Paket Essay & CV Lab (Rp 499.000)** memberikan 3x review mendalam baris-per-baris untuk Motivation Letter, Statement of Purpose, atau Europass CV oleh mentor alumni luar negeri.\n\nSilakan pilih jalur pemesanan yang Kakak sukai:',
          actionButtons: [
            { label: '📝 Buka Form Pemesanan Essay Lab (Web)', type: 'booking', packageId: 'essay-lab' },
            { label: '💬 Pesan via WhatsApp Resmi', type: 'whatsapp', target: 'Halo Admin MandalikaEdu, saya ingin memesan Paket Essay & CV Lab (Rp 499.000).' }
          ]
        };
      }
      if (q.includes('360') || q.includes('lengkap') || q.includes('mentorship') || q.includes('1.490') || q.includes('1490')) {
        return {
          text: 'Pilihan terbaik! **Paket Mentorship 360 (Rp 1.490.000)** adalah program pendampingan end-to-end lengkap dari nol hingga pengumuman:\n• Review esai & dokumen tanpa batas\n• 2x sesi simulasi wawancara (Mock Interview)\n• Panduan visa, blocked account & akomodasi\n• Akses grup WhatsApp eksklusif dengan mentor.\n\nKuota dibatasi maksimal 15 siswa per batch per bulan.',
          actionButtons: [
            { label: '🌟 Ambil Slot Mentorship 360 (Web)', type: 'booking', packageId: 'mentorship-360' },
            { label: '💬 Daftar via WhatsApp Resmi', type: 'whatsapp', target: 'Halo Admin MandalikaEdu, saya ingin mendaftar program intensif Mentorship 360.' }
          ]
        };
      }

      return {
        text: 'Kakak ingin memesan layanan MandalikaEdu? Kami menyediakan opsi berjenjang:\n\n1. **Sesi Discovery (20 Menit)**: Rp 0 (100% GRATIS)\n2. **Roadmap Beasiswa**: Rp 199.000\n3. **Essay & CV Lab (3x Review)**: Rp 499.000\n4. **Mentorship 360 (All-in End to End)**: Rp 1.490.000\n\nKakak bisa booking langsung lewat form web atau konfirmasi ke WhatsApp kami:',
        actionButtons: [
          { label: '🆓 Ambil Sesi Discovery Gratis (Web)', type: 'booking', packageId: 'discovery-free' },
          { label: '📋 Lihat Detail Semua Paket', type: 'tab', target: 'paket' },
          { label: '💬 Konfirmasi Pemesanan ke WhatsApp', type: 'whatsapp', target: 'Halo Admin MandalikaEdu, saya ingin berkonsultasi mengenai pemesanan paket bimbingan.' }
        ]
      };
    }

    // 4. Tanya Sesi Gratis / Discovery Session
    if (q.includes('gratis') || q.includes('discovery') || q.includes('free') || q.includes('coba')) {
      return {
        text: 'Kabar gembira! MandalikaEdu menyediakan **Sesi Discovery 20 Menit GRATIS (Rp 0)** untuk seluruh putra-putri daerah di Indonesia 🇮🇩.\n\nDalam sesi ini, Kakak akan:\n• Mengecek kecocokan profil akademik dengan beasiswa impian\n• Membedah 2-3 pilihan beasiswa yang paling realistis ditembus\n• Mendapatkan roadmap langkah awal tanpa kewajiban membeli paket berbayar apa pun.',
        actionButtons: [
          { label: '📅 Jadwalkan Sesi Discovery Rp 0', type: 'booking', packageId: 'discovery-free' },
          { label: '💬 Klaim via WhatsApp Admin', type: 'whatsapp', target: 'Halo MandalikaEdu, saya ingin klaim Sesi Discovery Gratis 20 Menit.' }
        ]
      };
    }

    // 5. Rekomendasi Beasiswa & Negara
    if (q.includes('beasiswa') || q.includes('mext') || q.includes('daad') || q.includes('aas') || q.includes('chevening') || q.includes('lpdp') || q.includes('jepang') || q.includes('jerman') || q.includes('turki') || q.includes('australia') || q.includes('korea') || q.includes('gks') || q.includes('inggris') || q.includes('uk')) {
      return {
        text: 'MandalikaEdu merangkum 15+ beasiswa fully funded yang sangat ramah pelamar daerah!\n\nBeberapa opsi beasiswa favorit:\n• **MEXT (Jepang)**: Bebas biaya kuliah 100% + tunjangan ~144.000 JPY/bln.\n• **DAAD EPOS (Jerman)**: Kuliah gratis di Jerman + uang saku 934 EUR/bln untuk yang berpengalaman kerja 2 thn.\n• **Australia Awards (AAS)**: Memiliki kuota afirmasi geografis khusus kawasan Indonesia Timur (NTB, NTT, Papua, Maluku, dll).\n• **Türkiye Bursları (Turki)**: Termasuk kursus bahasa Turki gratis 1 thn, asrama, tiket PP, dan uang saku.\n• **Chevening (Inggris/UK)**: Beasiswa Master 1 thn di kampus ternama UK.\n• **LPDP (Afirmasi & Reguler)**: Kuota afirmasi daerah 3T dengan syarat bahasa lebih fleksibel.',
        actionButtons: [
          { label: '🔍 Buka Database Beasiswa Lengkap', type: 'tab', target: 'beasiswa' },
          { label: '🎯 Kuis Pencocokan Beasiswa (3 Menit)', type: 'tab', target: 'kuis' },
          { label: '💬 Diskusi Kelayakan Profil di WhatsApp', type: 'whatsapp', target: 'Halo Admin, saya ingin mengecek kelayakan profil saya untuk beasiswa luar negeri.' }
        ]
      };
    }

    // 6. Tanya Tim Mentor
    if (q.includes('mentor') || q.includes('pembimbing') || q.includes('siapa') || q.includes('kak') || q.includes('pengajar')) {
      return {
        text: 'Tim mentor kami adalah alumni penerima beasiswa luar negeri yang juga berasal dari daerah di Indonesia:\n\n• **Dr. Ilham Ramdani, Ph.D.** (Asal Lombok NTB, S3 di The University of Tokyo, penerima MEXT Jepang)\n• **Nadia Salsabila, M.Sc.** (Asal Padang Sumbar, S2 RWTH Aachen, penerima DAAD EPOS Jerman)\n• **Kevin Jonathan, M.P.P.** (Asal Kupang NTT, Master di Oxford University, penerima Chevening UK)\n• **Ratih Puspadewi, M.Ed.** (Asal Purwokerto Jateng, S2 Melbourne University, penerima AAS Australia)\n\nKakak bisa berkonsultasi 1-on-1 langsung dengan mentor sesuai negara tujuan!',
        actionButtons: [
          { label: '👥 Profil Tim Mentor', type: 'tab', target: 'tentang' },
          { label: '📅 Booking Sesi dengan Mentor', type: 'booking', packageId: 'discovery-free' }
        ]
      };
    }

    // 7. Bahasa / TOEFL / IELTS / Tanpa Bahasa
    if (q.includes('bahasa') || q.includes('ielts') || q.includes('toefl') || q.includes('inggris') || q.includes('skor')) {
      return {
        text: 'Jangan khawatir Kak! Tidak semua beasiswa mewajibkan skor IELTS tinggi di awal:\n• **Turki (Türkiye Bursları)**: Menyediakan kelas persiapan bahasa gratis 1 tahun di Turki.\n• **Jepang (MEXT Jalur Kedutaan)**: Seleksi tahap awal menggunakan ujian tertulis matematika & bahasa Inggris mandiri MEXT.\n• **AAS & LPDP Afirmasi**: Menerima sertifikat TOEFL ITP dengan standar skor lebih ringan untuk anak daerah.\n\nMandalikaEdu memiliki strategi bertahap untuk menembus tes bahasa secara mandiri dan hemat biaya.',
        actionButtons: [
          { label: '🆓 Diskusi Strategi Bahasa di Sesi Discovery', type: 'booking', packageId: 'discovery-free' },
          { label: '💬 Chat Tim MandalikaEdu', type: 'whatsapp', target: 'Halo, saya ingin konsultasi mengenai persiapan bahasa Inggris untuk beasiswa.' }
        ]
      };
    }

    // 8. Anak Daerah Kalimantan, NTB/NTT, Papua, Sumatra, Sulawesi
    if (q.includes('kalimantan') || q.includes('borneo') || q.includes('samarinda') || q.includes('balikpapan') || q.includes('pontianak') || q.includes('banjarmasin') || q.includes('kaltim') || q.includes('kalbar') || q.includes('kalteng') || q.includes('kalsel') || q.includes('kaltara')) {
      return {
        text: 'Kabar baik banget untuk putra-putri daerah Kalimantan! 🌲\n\nUntuk anak daerah dari Kalimantan, ada beberapa jalur istimewa yang bisa dimanfaatkan:\n1. **LPDP Afirmasi Daerah 3T**: Kabupaten di Kalimantan (seperti pedalaman Kalbar, Kaltara, Kaltim, Kalteng) masuk jalur afirmasi dengan syarat TOEFL/IELTS & IPK yang jauh lebih fleksibel daripada jalur reguler.\n2. **Beasiswa Pemda (Kaltim Tuntas / APBD)**: Bantuan kuliah jenjang D3/S1/S2/S3 dari Pemprov/Pemkab.\n3. **AAS (Australia Awards)** & **MEXT Jepang**: Komite beasiswa sangat menyukai pelamar yang mengangkat isu pembangunan daerah Kalimantan (seperti kelestarian hutan, transisi energi, hilirisasi, atau IKN) di dalam Motivation Letter.\n\nKakak sedang merencanakan jenjang S1 atau S2? Mau kami bantu petakan kampusnya?',
        actionButtons: [
          { label: '🆓 Klaim Sesi Discovery Gratis (Rp 0)', type: 'booking', packageId: 'discovery-free' },
          { label: '🔍 Cek Database 15+ Beasiswa', type: 'tab', target: 'beasiswa' },
          { label: '💬 Diskusi via WhatsApp Resmi', type: 'whatsapp', target: 'Halo MandalikaEdu, saya dari Kalimantan ingin tanya beasiswa yang cocok.' }
        ]
      };
    }

    if (q.includes('lombok') || q.includes('ntb') || q.includes('mataram') || q.includes('sumbawa') || q.includes('bima') || q.includes('ntt') || q.includes('kupang') || q.includes('sumba') || q.includes('flores')) {
      return {
        text: 'Halo Kak! Sebagai sesama putra daerah NTB & NTT, MandalikaEdu lahir langsung di Mataram, NTB!\n\nPeluang emas untuk anak daerah NTB & NTT:\n1. **AAS (Australia Awards)**: Punya kuota Targeted Geographic Area khusus NTB & NTT dengan syarat IELTS minimal hanya 5.0.\n2. **MEXT Jepang**: Fully funded tanpa ikatan dinas, seperti yang diraih Co-Founder kami Dr. Ilham Ramdani asal NTB (The University of Tokyo).\n3. **LPDP Afirmasi Daerah**: Pendanaan 100% kuliah luar negeri dengan kuota daerah khusus.\n4. **Türkiye Bursları**: Bebas biaya hidup, asrama, dan kursus bahasa Turki 1 tahun gratis.\n\nKakak mau kami bantu review dokumen atau mapping beasiswa dari nol?',
        actionButtons: [
          { label: '🆓 Klaim Sesi Discovery Gratis (Rp 0)', type: 'booking', packageId: 'discovery-free' },
          { label: '📦 Paket Roadmap Beasiswa (Rp 199k)', type: 'booking', packageId: 'roadmap-90' },
          { label: '💬 Chat WhatsApp Resmi MandalikaEdu', type: 'whatsapp', target: 'Halo MandalikaEdu, saya dari NTB/NTT ingin konsultasi beasiswa.' }
        ]
      };
    }

    // Follow-up inquiries ("gimana", "caranya", "maksudnya", "terus")
    if (q === 'gimana?' || q === 'gimana' || q.includes('gimana caranya') || q.includes('maksudnya') || q.includes('terus gimana') || q.includes('caranya gimana') || q.includes('mulainya gimana') || q.includes('langkahnya')) {
      return {
        text: 'Caranya sangat mudah dan bertahap Kak! Berikut langkah persiapan di MandalikaEdu dari nol:\n\n1. **Langkah 1 (Cek Peluang)**: Ikuti Sesi Discovery (20 Menit) secara 100% Gratis untuk cek kecocokan profil & beasiswa target.\n2. **Langkah 2 (Roadmap 90 Hari)**: Tentukan 3 kampus impian, timeline pendaftaran, dan syarat sertifikat bahasa (IELTS/Duolingo).\n3. **Langkah 3 (Bedah Dokumen)**: Bimbingan intensif menulis Motivation Letter, Europass CV, dan Surat Rekomendasi bersama mentor alumni beasiswa luar negeri.\n4. **Langkah 4 (Submit & Mock Interview)**: Simulasi wawancara beasiswa hingga siap 100% menghadapi interviewer.\n\nMau mulai dari **Sesi Discovery Gratis (Rp 0)** dulu Kak?',
        actionButtons: [
          { label: '🆓 Ambil Sesi Discovery Gratis (Rp 0)', type: 'booking', packageId: 'discovery-free' },
          { label: '📦 Cek Paket Lengkap Mentorship', type: 'tab', target: 'paket' },
          { label: '💬 Tanya Langsung di WhatsApp Resmi', type: 'whatsapp', target: 'Halo Admin MandalikaEdu, saya mau tahu cara mulai bimbingan beasiswa.' }
        ]
      };
    }

    // 9. Anak Daerah / IPK Rendah / Kampus Swasta
    if (q.includes('ipk') || q.includes('daerah') || q.includes('swasta') || q.includes('peluang') || q.includes('bisa tidak') || q.includes('lulusan')) {
      return {
        text: 'Peluang Kakak sangat terbuka! Komite beasiswa internasional saat ini sangat menghargai komitmen kontribusi dan keterikatan emosional dengan pembangunan daerah asal.\n\nBanyak alumni bimbingan MandalikaEdu yang berasal dari kampus non-top di luar Jawa dan berhasil menembus MEXT, DAAD, dan AAS berkat kekuatan Motivation Letter serta pemetaan masalah daerah yang otentik!',
        actionButtons: [
          { label: '🆓 Cek Peluang di Sesi Discovery Gratis', type: 'booking', packageId: 'discovery-free' },
          { label: '🌟 Baca Kisah Sukses Anak Daerah', type: 'tab', target: 'kisah' }
        ]
      };
    }

    // 10. Terima Kasih / Closing
    if (q.includes('terima kasih') || q.includes('makasih') || q.includes('thanks') || q.includes('ok') || q.includes('oke') || q.includes('siap') || q.includes('baiklah')) {
      return {
        text: 'Sama-sama Kak! Senang sekali bisa membantu 😊.\n\nJika nanti ada hal yang ingin ditanyakan lagi atau ingin langsung memulai persiapan dokumen bersama mentor, silakan hubungi kami kapan saja ya. Sukses selalu untuk rencana studinya! 🎓',
        actionButtons: [
          { label: '💬 Simpan Kontak WhatsApp Resmi', type: 'whatsapp', target: 'Halo MandalikaEdu, saya simpan nomor ini untuk konsultasi beasiswa.' },
          { label: '🆓 Jadwalkan Sesi Discovery', type: 'booking', packageId: 'discovery-free' }
        ]
      };
    }

    // Default polite intelligent response
    return {
      text: `Pertanyaan yang bagus Kak! Di MandalikaEdu, kami mendampingi putra-putri daerah mulai dari riset beasiswa ramah daerah, bedah esai (Motivation Letter), hingga simulasi wawancara bersama mentor alumni luar negeri.\n\nBiar kami bisa beri rekomendasi yang paling tepat: saat ini Kakak sedang merencanakan kuliah ke negara mana atau jenjang apa (S1/S2/S3)?`,
      actionButtons: [
        { label: '🆓 Jadwalkan Sesi Discovery Gratis', type: 'booking', packageId: 'discovery-free' },
        { label: '📦 Lihat Pilihan Paket Bimbingan', type: 'tab', target: 'paket' },
        { label: '💬 Diskusi Lanjut di WhatsApp', type: 'whatsapp', target: `Halo MandalikaEdu, saya ingin bertanya: "${raw}"` }
      ]
    };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text || isTyping) return;

    setInputText('');

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      // 1. Try Cloudflare Worker or server-side Gemini Flash API call
      const conversationHistory = newMessages.map(m => ({
        role: m.sender === 'ai' ? 'model' : 'user',
        content: m.text
      }));

      const targetEndpoint = cfWorkerUrl ? cfWorkerUrl.trim().replace(/\/+$/, '') : '/api/chat';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const res = await fetch(targetEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationHistory }),
        signal: controller.signal
      }).catch(() => null);

      clearTimeout(timeoutId);

      if (res && res.ok) {
        const data = await res.json().catch(() => null);
        if (data && data.reply && !data.fallback && !data.reply.includes('Sedang ada antrean')) {
          const aiMessage: Message = {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: sanitizePunctuation(data.reply),
            timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            actionButtons: [
              { label: '🆓 Jadwalkan Sesi Discovery Gratis', type: 'booking', packageId: 'discovery-free' },
              { label: '💬 Lanjut ke WhatsApp Resmi Safiya AI', type: 'whatsapp', target: `Halo Admin MandalikaEdu via Safiya AI, saya ingin konsultasi lanjutan: "${text}"` }
            ]
          };
          setMessages(prev => [...prev, aiMessage]);
          return;
        }
      }

      // 2. Natural agentic fallback (Works seamlessly on GitHub Pages static hosting & offline)
      const agentic = generateAgenticResponse(text);
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: sanitizePunctuation(agentic.text),
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        actionButtons: agentic.actionButtons
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch {
      const agentic = generateAgenticResponse(text);
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: sanitizePunctuation(agentic.text),
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        actionButtons: agentic.actionButtons
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionButtonClick = (btn: NonNullable<Message['actionButtons']>[number]) => {
    if (btn.type === 'whatsapp') {
      safeOpenWhatsApp(btn.target || 'Halo MandalikaEdu, saya ingin berkonsultasi seputar beasiswa luar negeri.');
    } else if (btn.type === 'booking') {
      onOpenBooking(btn.packageId || 'discovery-free', `Melalui Safiya AI Bot: ${btn.label}`);
      setIsOpen(false);
    } else if (btn.type === 'tab' && btn.target) {
      onNavigateTab(btn.target);
      setIsOpen(false);
    } else if (btn.type === 'external' && btn.target) {
      window.open(btn.target, '_blank');
    }
  };

  return (
    <>
      {/* Floating Circular Trigger Button (Matching Screenshot Design) */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
        
        {/* Tooltip greeting preview */}
        {!isOpen && showTooltip && (
          <div className="mb-3 max-w-xs bg-slate-900/90 backdrop-blur-md text-white p-3.5 rounded-2xl rounded-br-xs shadow-xl border border-slate-700/60 text-xs flex items-start gap-2.5 animate-bounce-subtle">
            <div className="w-2.5 h-2.5 rounded-full bg-violet-400 shrink-0 mt-1 animate-pulse" />
            <div className="space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span>Safiya • AI Agent MandalikaEdu</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded font-medium">Online</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Tanya beasiswa atau pesan paket bimbingan di sini! 💬
              </p>
            </div>
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
              className="text-slate-400 hover:text-slate-200 p-0.5 rounded cursor-pointer"
              aria-label="Tutup petunjuk"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Circular Violet Trigger Button with '1' Notification Badge */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Buka Chat Safiya AI Agent MandalikaEdu"
          className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] active:scale-95 text-white flex items-center justify-center shadow-xl shadow-purple-600/30 transition-all duration-200 cursor-pointer"
        >
          {isOpen ? (
            <X className="w-7 h-7 transition-transform group-hover:rotate-90 duration-200" />
          ) : (
            <>
              {/* Floating notification badge '1' */}
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 border-2 border-white rounded-full text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                1
              </span>
              <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
            </>
          )}
        </button>
      </div>

      {/* Chat Window Modal / Drawer */}
      {isOpen && (
        <div 
          role="dialog"
          aria-label="AI Agent Chat Window"
          className={
            isExpanded
              ? "fixed inset-0 z-[9999] w-screen h-screen bg-white rounded-none border-0 p-0 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
              : "fixed bottom-22 sm:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[410px] h-[590px] max-h-[84vh] bg-white rounded-[28px] shadow-2xl shadow-slate-400/25 border border-slate-200/80 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          }
        >
          {/* Pure White Header */}
          <div className="bg-white px-5 py-3.5 flex items-center justify-between border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-3">
              {/* Brand Logo Avatar */}
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-2xs shrink-0">
                <SafiyaAvatar talking={isTyping} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base leading-tight">Safiya AI</h3>
                <p className="text-xs text-slate-400 font-normal mt-0.5">Online</p>
              </div>
            </div>

            {/* Header Action Icons */}
            <div className="flex items-center gap-2 text-slate-400">
              <button
                type="button"
                onClick={handleNewChat}
                title="Obrolan Baru"
                className="p-1 rounded-md hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <SquarePen className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => safeOpenWhatsApp('Halo Tim MandalikaEdu via Halo AI! Saya ingin berdiskusi.')}
                title="Chat via WhatsApp Resmi"
                className="p-1 rounded-md hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Kecilkan Tampilan' : 'Perbesar Tampilan'}
                className="p-1 rounded-md hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Tutup Chat"
                className="p-1 rounded-md hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Messages Body Area (Light Gray Neutral Background) */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#F9FAFB]">
            
            {messages.map((m) => {
              const isAi = m.sender === 'ai';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[86%] p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                      isAi
                        ? 'bg-[#F3F4F6] text-slate-800 rounded-2xl rounded-bl-xs'
                        : 'bg-[#8B5CF6] text-white rounded-2xl rounded-br-xs'
                    }`}
                  >
                    {/* Message Text */}
                    <div className="whitespace-pre-wrap space-y-2">
                      {m.text.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx}>
                          {paragraph.split('**').map((chunk, cIdx) => 
                            cIdx % 2 === 1 ? <strong key={cIdx} className={isAi ? 'font-bold text-slate-900' : 'font-bold text-white'}>{chunk}</strong> : chunk
                          )}
                        </p>
                      ))}
                    </div>

                    {/* Timestamp inside message bubble */}
                    <div className={`mt-2 text-[10px] ${isAi ? 'text-slate-400 text-right' : 'text-purple-200/90 text-right'}`}>
                      {m.timestamp}
                    </div>
                  </div>

                  {/* Interactive Action Buttons if attached */}
                  {isAi && m.actionButtons && m.actionButtons.length > 0 && (
                    <div className="mt-2 space-y-1.5 max-w-[86%] w-full">
                      {m.actionButtons.map((btn, bIdx) => (
                        <button
                          key={bIdx}
                          type="button"
                          onClick={() => handleActionButtonClick(btn)}
                          className="w-full text-left px-3.5 py-2.5 bg-white hover:bg-violet-50 active:bg-violet-100 border border-slate-200/80 hover:border-violet-300 rounded-xl text-xs font-semibold text-slate-800 hover:text-violet-950 flex items-center justify-between transition-colors shadow-2xs group cursor-pointer"
                        >
                          <span>{btn.label}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-600 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Center System / Contact Form Notice Divider (Matching Screenshot) */}
            <div className="py-1 text-center">
              <span className="text-xs text-slate-400 font-medium">
                MandalikaEdu AI terhubung dengan WhatsApp resmi
              </span>
            </div>

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 bg-[#F3F4F6] text-slate-600 rounded-2xl rounded-bl-xs px-4 py-3 max-w-[180px] shadow-2xs text-xs">
                <Bot className="w-3.5 h-3.5 text-violet-600 animate-spin" />
                <span className="italic text-xs">AI agent mengetik...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="bg-[#F9FAFB] px-4 py-1.5 border-t border-slate-100 overflow-x-auto scrollbar-none flex gap-1.5 shrink-0">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(p)}
                className="shrink-0 text-[11px] font-medium bg-white hover:bg-violet-50 text-slate-600 hover:text-violet-700 border border-slate-200/80 hover:border-violet-300 rounded-full px-3 py-1 transition-all cursor-pointer shadow-2xs"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box Component (Matching Screenshot Card Style) */}
          <div className="p-3 sm:p-4 bg-[#F9FAFB]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-2xs space-y-2"
            >
              <textarea
                rows={2}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ketik pertanyaan atau izin bertanya..."
                className="w-full text-xs sm:text-sm bg-transparent border-0 focus:outline-none resize-none text-slate-800 placeholder-slate-400"
              />

              <div className="flex items-center justify-end pt-1 border-t border-slate-100/60">
                {/* Circular Send Arrow Button */}
                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  aria-label="Kirim Pesan"
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    inputText.trim() && !isTyping
                      ? 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
};


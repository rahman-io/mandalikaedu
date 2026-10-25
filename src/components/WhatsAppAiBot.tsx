import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, Bot, CheckCheck, 
  ExternalLink, Sparkles, ChevronRight, Phone, RefreshCw, Calendar, Award, ShieldCheck, Settings, Edit3
} from 'lucide-react';
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

export const WhatsAppAiBot: React.FC<WhatsAppAiBotProps> = ({
  onOpenBooking,
  onNavigateTab
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  
  // Dynamic WhatsApp Number configuration
  const [currentWaNumber, setCurrentWaNumber] = useState<string>(getActiveWhatsAppNumber());
  const [currentWaDisplay, setCurrentWaDisplay] = useState<string>(getActiveWhatsAppDisplay());
  const [isNumberSettingsOpen, setIsNumberSettingsOpen] = useState(false);
  const [inputCustomNumber, setInputCustomNumber] = useState(getActiveWhatsAppNumber());
  const [pendingWaText, setPendingWaText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'Halo Kak! Selamat datang di MandalikaEdu 🎓\n\nSaya **Halo AI**, asisten cerdas yang didukung oleh teknologi **Halo AI (haloai.app)**. Saya siap menemani diskusi Kakak seputar kuliah luar negeri, rekomendasi beasiswa, atau pemesanan paket bimbingan.',
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

  // Save new custom WhatsApp number
  const handleSaveCustomNumber = (openAfterSave: boolean = false) => {
    let clean = inputCustomNumber.replace(/[^0-9]/g, '');
    if (clean.startsWith('0')) {
      clean = '62' + clean.slice(1);
    } else if (!clean.startsWith('62')) {
      clean = '62' + clean;
    }

    if (clean.length < 10) {
      alert('Mohon masukkan nomor WhatsApp yang valid (minimal 10 digit, contoh: 08123456789)');
      return;
    }

    setActiveWhatsAppNumber(clean);
    setCurrentWaNumber(clean);
    setCurrentWaDisplay(getActiveWhatsAppDisplay());
    setIsNumberSettingsOpen(false);

    if (openAfterSave && pendingWaText !== null) {
      const msg = encodeURIComponent(pendingWaText || 'Halo MandalikaEdu, saya ingin konsultasi beasiswa.');
      window.open(`https://wa.me/${clean}?text=${msg}`, '_blank');
      setPendingWaText(null);
    }
  };

  // Safe WhatsApp opener: detects if placeholder number is used
  const safeOpenWhatsApp = (text: string) => {
    const isPlaceholder = 
      currentWaNumber === '6281234567890' || 
      currentWaNumber === '6282247563829' || 
      currentWaNumber === '6282145678901';

    if (isPlaceholder) {
      setPendingWaText(text);
      setIsNumberSettingsOpen(true);
      return;
    }

    const msg = encodeURIComponent(text);
    window.open(`https://wa.me/${currentWaNumber}?text=${msg}`, '_blank');
  };

  // Context-aware agentic response engine (matches Halo AI natural conversational CX)
  const generateAgenticResponse = (query: string): { text: string; actionButtons?: Message['actionButtons'] } => {
    const raw = query.trim();
    const q = raw.toLowerCase();

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

    // 2. Pertanyaan seputar Halo AI / haloai.app
    if (q.includes('haloai') || q.includes('halo ai') || q.includes('haloai.app')) {
      return {
        text: 'Betul Kak! Sistem live chat cerdas kami terintegrasi dengan teknologi **Halo AI (haloai.app)** untuk memastikan respons ramah 24/7.\n\nKakak bisa berdiskusi langsung di web ini atau melanjutkan obrolan ke bot WhatsApp resmi MandalikaEdu di **' + currentWaDisplay + '**.',
        actionButtons: [
          { label: '💬 Buka WhatsApp Resmi Halo AI', type: 'whatsapp', target: 'Halo Tim MandalikaEdu via Halo AI, saya ingin berkonsultasi.' },
          { label: '🌐 Kunjungi HaloAI.app', type: 'external', target: HALOAI_URL }
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

    // 8. Anak Daerah / IPK Rendah / Kampus Swasta
    if (q.includes('ipk') || q.includes('daerah') || q.includes('swasta') || q.includes('peluang') || q.includes('bisa tidak') || q.includes('lulusan')) {
      return {
        text: 'Peluang Kakak sangat terbuka! Komite beasiswa internasional saat ini sangat menghargai komitmen kontribusi dan keterikatan emosional dengan pembangunan daerah asal.\n\nBanyak alumni bimbingan MandalikaEdu yang berasal dari kampus non-top di luar Jawa dan berhasil menembus MEXT, DAAD, dan AAS berkat kekuatan Motivation Letter serta pemetaan masalah daerah yang otentik!',
        actionButtons: [
          { label: '🆓 Cek Peluang di Sesi Discovery Gratis', type: 'booking', packageId: 'discovery-free' },
          { label: '🌟 Baca Kisah Sukses Anak Daerah', type: 'tab', target: 'kisah' }
        ]
      };
    }

    // 9. Terima Kasih / Closing
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
      text: `Terima kasih atas pertanyaannya Kak! MandalikaEdu adalah lembaga bimbingan independen yang mendampingi putra-putri daerah meraih beasiswa luar negeri dari nol.\n\nAda yang bisa kami bantu seputar riset kampus, pembuatan esai, simulasi wawancara, atau paket bimbingan bersama mentor alumni luar negeri?`,
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
      // 1. Try server-side Gemini 3.8 Flash API call
      const conversationHistory = newMessages.map(m => ({
        role: m.sender === 'ai' ? 'model' : 'user',
        content: m.text
      }));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationHistory }),
        signal: controller.signal
      }).catch(() => null);

      clearTimeout(timeoutId);

      if (res && res.ok) {
        const data = await res.json();
        if (data.reply) {
          const aiMessage: Message = {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            actionButtons: [
              { label: '🆓 Jadwalkan Sesi Discovery Gratis', type: 'booking', packageId: 'discovery-free' },
              { label: '💬 Lanjut ke WhatsApp Resmi Halo AI', type: 'whatsapp', target: `Halo Admin MandalikaEdu via Halo AI, saya ingin konsultasi lanjutan: "${text}"` }
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
        text: agentic.text,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        actionButtons: agentic.actionButtons
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch {
      const agentic = generateAgenticResponse(text);
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: agentic.text,
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
      onOpenBooking(btn.packageId || 'discovery-free', `Melalui Halo AI Bot: ${btn.label}`);
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
      {/* Floating WhatsApp Launcher */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
        
        {/* Tooltip greeting preview (shows when widget is closed) */}
        {!isOpen && showTooltip && (
          <div className="mb-3 max-w-xs bg-white text-slate-800 p-3.5 rounded-2xl rounded-br-xs shadow-xl border border-slate-200/80 text-xs flex items-start gap-2.5 animate-bounce-subtle">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 mt-1 animate-pulse" />
            <div className="space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <span>Halo AI MandalikaEdu</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-semibold">Online</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Tanya beasiswa atau pesan paket bimbingan di sini! 💬
              </p>
            </div>
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
              aria-label="Tutup petunjuk"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* WhatsApp Circular Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Buka Chat WhatsApp Halo AI MandalikaEdu"
          className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-emerald-950/25 transition-all duration-200 cursor-pointer"
        >
          {isOpen ? (
            <X className="w-7 h-7 transition-transform group-hover:rotate-90 duration-200" />
          ) : (
            <>
              {/* Pulsing indicator */}
              <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full animate-ping opacity-75" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
              
              <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
            </>
          )}
        </button>
      </div>

      {/* WhatsApp Chat Window Modal / Drawer */}
      {isOpen && (
        <div 
          role="dialog"
          aria-label="Halo AI WhatsApp Chat"
          className="fixed bottom-22 sm:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[400px] h-[560px] max-h-[82vh] bg-slate-100 rounded-3xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header (Authentic WhatsApp Green) */}
          <div className="bg-[#075E54] text-white p-3.5 sm:p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-black text-white text-base">
                  <Bot className="w-6 h-6 text-emerald-300" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm tracking-wide text-white">Halo AI MandalikaEdu</h3>
                  <span className="text-[10px] bg-emerald-400/20 text-emerald-200 px-1.5 py-0.2 rounded font-medium border border-emerald-400/30">Bot</span>
                </div>
                <p className="text-[11px] text-emerald-100/90 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  <span>Online • Powered by HaloAI (haloai.app)</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => safeOpenWhatsApp('Halo Tim MandalikaEdu via Halo AI! Saya ingin berdiskusi.')}
                title={`Buka WhatsApp Resmi (${currentWaDisplay})`}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Tutup Obrolan"
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subheader Banner: Official WhatsApp link & Change number option */}
          <div className="bg-[#128C7E] px-4 py-1.5 text-white/90 text-[11px] flex items-center justify-between border-t border-emerald-700/50">
            <span className="flex items-center gap-1.5 truncate">
              <span>WA: {currentWaDisplay}</span>
              <button
                type="button"
                onClick={() => setIsNumberSettingsOpen(true)}
                title="Ubah nomor WhatsApp bisnis Anda"
                className="text-[10px] text-emerald-200 hover:text-white underline cursor-pointer"
              >
                (Ubah)
              </button>
            </span>
            <button
              type="button"
              onClick={() => safeOpenWhatsApp('Halo Admin MandalikaEdu, saya ingin konsultasi via WhatsApp.')}
              className="text-[10px] bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full font-semibold transition-colors cursor-pointer shrink-0"
            >
              Buka WA Asli ↗
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#EFEAE2]">
            {/* Encryption notice banner */}
            <div className="mx-auto max-w-xs bg-amber-50/95 border border-amber-200/80 rounded-xl p-2.5 text-center text-[10px] text-amber-900 leading-snug shadow-xs">
              🔒 <strong>Halo AI Agent</strong> terhubung langsung dengan basis pengetahuan MandalikaEdu & WhatsApp resmi.
            </div>

            {messages.map((m) => {
              const isAi = m.sender === 'ai';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-xs ${
                      isAi
                        ? 'bg-white text-slate-800 rounded-tl-xs border border-slate-200'
                        : 'bg-[#D9FDD3] text-slate-900 rounded-tr-xs border border-emerald-200'
                    }`}
                  >
                    {/* Message Text with simple markdown formatting */}
                    <div className="whitespace-pre-wrap space-y-2">
                      {m.text.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx}>
                          {paragraph.split('**').map((chunk, cIdx) => 
                            cIdx % 2 === 1 ? <strong key={cIdx} className="font-bold">{chunk}</strong> : chunk
                          )}
                        </p>
                      ))}
                    </div>

                    {/* Timestamp & checks */}
                    <div className={`mt-1.5 flex items-center justify-end gap-1 text-[10px] ${isAi ? 'text-slate-400' : 'text-emerald-700'}`}>
                      <span>{m.timestamp}</span>
                      {!isAi && <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                  </div>

                  {/* Interactive Action Buttons if attached */}
                  {isAi && m.actionButtons && m.actionButtons.length > 0 && (
                    <div className="mt-2 space-y-1.5 max-w-[85%] w-full">
                      {m.actionButtons.map((btn, bIdx) => (
                        <button
                          key={bIdx}
                          type="button"
                          onClick={() => handleActionButtonClick(btn)}
                          className="w-full text-left px-3 py-2 bg-white hover:bg-emerald-50 active:bg-emerald-100 border border-slate-200 hover:border-emerald-300 rounded-xl text-[11px] font-semibold text-slate-800 hover:text-emerald-950 flex items-center justify-between transition-colors shadow-2xs group cursor-pointer"
                        >
                          <span>{btn.label}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 bg-white rounded-2xl rounded-tl-xs px-3.5 py-2.5 max-w-[180px] shadow-xs border border-slate-200 text-slate-500 text-xs">
                <Bot className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                <span className="italic text-[11px]">Halo AI mengetik...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="bg-slate-50 px-3 py-2 border-t border-slate-200 overflow-x-auto scrollbar-none flex gap-1.5">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(p)}
                className="shrink-0 text-[10px] font-medium bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 rounded-full px-2.5 py-1 transition-colors cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 sm:p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ketik pertanyaan atau izin bertanya..."
              className="flex-1 text-xs px-3.5 py-2.5 bg-slate-100 rounded-full border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white text-slate-900 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              aria-label="Kirim Pesan"
              className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20ba59] disabled:opacity-50 disabled:hover:bg-[#25D366] text-white flex items-center justify-center transition-transform active:scale-95 shadow-xs cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      )}

      {/* Set WhatsApp Number Modal Dialog */}
      {isNumberSettingsOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <Phone className="w-4 h-4" />
                <span>Atur Nomor WhatsApp Bisnis</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsNumberSettingsOpen(false);
                  setPendingWaText(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Nomor WhatsApp saat ini masih berupa nomor contoh. Masukkan nomor WhatsApp aktif Anda (contoh: <strong>08123456789</strong> atau <strong>628123456789</strong>) agar tombol WhatsApp langsung membuka chat ke nomor Anda:
            </p>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Nomor WhatsApp Anda:
              </label>
              <input
                type="tel"
                value={inputCustomNumber}
                onChange={(e) => setInputCustomNumber(e.target.value)}
                placeholder="Contoh: 08123456789"
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => handleSaveCustomNumber(true)}
                className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Simpan & Lanjutkan ke WhatsApp
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsNumberSettingsOpen(false);
                  onOpenBooking('discovery-free', 'Pemesanan langsung via form web');
                }}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl transition-colors cursor-pointer"
              >
                Gunakan Form Booking di Web Saja
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

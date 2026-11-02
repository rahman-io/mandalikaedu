import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { GoogleGenAI } from '@google/genai';
import { SCHOLARSHIPS_DATA } from './src/data/scholarships';
import { generateFirebaseExportBundle } from './src/lib/firebase/firestoreExport';
import { generateOgPngBuffer } from './src/lib/ogImageGenerator';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Direktori dan berkas cadangan data pendaftaran internal
const LEADS_DATA_DIR = path.join(__dirname, 'data');
const LEADS_DATA_FILE = path.join(LEADS_DATA_DIR, 'leads-backup.json');
const MENTORS_DATA_FILE = path.join(LEADS_DATA_DIR, 'mentors-backup.json');
const TELEGRAM_CONFIG_FILE = path.join(LEADS_DATA_DIR, 'telegram-config.json');
const TELEGRAM_LOGS_FILE = path.join(LEADS_DATA_DIR, 'telegram-notifications.json');
const EMAIL_CONFIG_FILE = path.join(LEADS_DATA_DIR, 'email-config.json');
const EMAIL_LOGS_FILE = path.join(LEADS_DATA_DIR, 'email-notifications.json');

const ADMIN_TELEGRAM_PHONE = '+48576982748';
const DEFAULT_ADMIN_EMAIL = 'admin@mandalikaedu.com';
const DEFAULT_FORWARD_EMAIL = 'rahman.udemy.manager@gmail.com';

function ensureLeadsStorage() {
  try {
    if (!fs.existsSync(LEADS_DATA_DIR)) {
      fs.mkdirSync(LEADS_DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LEADS_DATA_FILE)) {
      fs.writeFileSync(LEADS_DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
    if (!fs.existsSync(MENTORS_DATA_FILE)) {
      fs.writeFileSync(MENTORS_DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
    if (!fs.existsSync(TELEGRAM_CONFIG_FILE)) {
      fs.writeFileSync(TELEGRAM_CONFIG_FILE, JSON.stringify({
        adminPhone: ADMIN_TELEGRAM_PHONE,
        botToken: process.env.TELEGRAM_BOT_TOKEN || '',
        chatId: process.env.TELEGRAM_CHAT_ID || ''
      }, null, 2), 'utf-8');
    }
    if (!fs.existsSync(TELEGRAM_LOGS_FILE)) {
      fs.writeFileSync(TELEGRAM_LOGS_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
    if (!fs.existsSync(EMAIL_CONFIG_FILE)) {
      fs.writeFileSync(EMAIL_CONFIG_FILE, JSON.stringify({
        adminEmail: DEFAULT_ADMIN_EMAIL,
        forwardTo: DEFAULT_FORWARD_EMAIL,
        smtpHost: 'smtp.gmail.com',
        smtpPort: 465,
        smtpSecure: true,
        smtpUser: DEFAULT_FORWARD_EMAIL,
        smtpPass: process.env.GMAIL_APP_PASSWORD || ''
      }, null, 2), 'utf-8');
    }
    if (!fs.existsSync(EMAIL_LOGS_FILE)) {
      fs.writeFileSync(EMAIL_LOGS_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error initializing leads backup storage:', err);
  }
}

function saveLeadRecord(record: any) {
  try {
    ensureLeadsStorage();
    const existingRaw = fs.readFileSync(LEADS_DATA_FILE, 'utf-8');
    const records = JSON.parse(existingRaw || '[]');
    records.push(record);
    fs.writeFileSync(LEADS_DATA_FILE, JSON.stringify(records, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving lead to backup file:', err);
  }
}

function saveMentorRecord(record: any) {
  try {
    ensureLeadsStorage();
    const existingRaw = fs.readFileSync(MENTORS_DATA_FILE, 'utf-8');
    const records = JSON.parse(existingRaw || '[]');
    records.push(record);
    fs.writeFileSync(MENTORS_DATA_FILE, JSON.stringify(records, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving mentor to backup file:', err);
  }
}

interface TelegramConfig {
  botToken?: string;
  chatId?: string;
  adminPhone?: string;
}

function getTelegramConfig(): TelegramConfig {
  try {
    ensureLeadsStorage();
    if (fs.existsSync(TELEGRAM_CONFIG_FILE)) {
      const raw = fs.readFileSync(TELEGRAM_CONFIG_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      return {
        botToken: process.env.TELEGRAM_BOT_TOKEN || parsed.botToken || '',
        chatId: process.env.TELEGRAM_CHAT_ID || parsed.chatId || '',
        adminPhone: parsed.adminPhone || ADMIN_TELEGRAM_PHONE,
      };
    }
  } catch (err) {
    console.error('Error reading telegram config:', err);
  }
  return {
    botToken: process.env.TELEGRAM_BOT_TOKEN || '',
    chatId: process.env.TELEGRAM_CHAT_ID || '',
    adminPhone: ADMIN_TELEGRAM_PHONE,
  };
}

async function sendTelegramAlert(
  message: string, 
  urlButtons?: Array<{ text: string; url: string }>
): Promise<{ success: boolean; reason?: string }> {
  const config = getTelegramConfig();
  const timestamp = new Date().toISOString();
  
  // Catat riwayat notifikasi ke berkas audit lokal
  try {
    ensureLeadsStorage();
    let logs: any[] = [];
    if (fs.existsSync(TELEGRAM_LOGS_FILE)) {
      logs = JSON.parse(fs.readFileSync(TELEGRAM_LOGS_FILE, 'utf-8') || '[]');
    }
    logs.push({
      timestamp,
      adminPhone: config.adminPhone || ADMIN_TELEGRAM_PHONE,
      message,
      buttons: urlButtons,
      dispatched: Boolean(config.botToken && config.chatId)
    });
    fs.writeFileSync(TELEGRAM_LOGS_FILE, JSON.stringify(logs.slice(-100), null, 2), 'utf-8');
  } catch (err) {
    console.error('Error logging telegram alert:', err);
  }

  // Tampilkan notifikasi siap pakai di terminal server
  console.log(`\n======================================================\n[NOTIFIKASI TELEGRAM ADMIN ${config.adminPhone || ADMIN_TELEGRAM_PHONE}]\n${message}\n======================================================\n`);

  if (!config.botToken || !config.chatId) {
    return { success: true, reason: 'Tercatat dalam log notifikasi admin Telegram' };
  }

  try {
    const payload: any = {
      chat_id: config.chatId,
      text: message,
      parse_mode: 'Markdown',
      disable_web_page_preview: false,
    };

    if (urlButtons && urlButtons.length > 0) {
      payload.reply_markup = {
        inline_keyboard: [
          urlButtons.map(btn => ({ text: btn.text, url: btn.url }))
        ]
      };
    }

    const res = await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    return { success: Boolean(data.ok), reason: data.description };
  } catch (err: any) {
    console.error('Error dispatching telegram message:', err);
    return { success: false, reason: err?.message };
  }
}

interface EmailConfig {
  adminEmail: string;
  forwardTo: string;
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
}

function getEmailConfig(): EmailConfig {
  try {
    ensureLeadsStorage();
    if (fs.existsSync(EMAIL_CONFIG_FILE)) {
      const raw = fs.readFileSync(EMAIL_CONFIG_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      return {
        adminEmail: process.env.ADMIN_EMAIL || parsed.adminEmail || DEFAULT_ADMIN_EMAIL,
        forwardTo: process.env.ADMIN_FORWARD_EMAIL || parsed.forwardTo || DEFAULT_FORWARD_EMAIL,
        smtpHost: process.env.SMTP_HOST || parsed.smtpHost || 'smtp.gmail.com',
        smtpPort: Number(process.env.SMTP_PORT || parsed.smtpPort || 465),
        smtpSecure: parsed.smtpSecure !== undefined ? Boolean(parsed.smtpSecure) : true,
        smtpUser: process.env.GMAIL_USER || process.env.SMTP_USER || parsed.smtpUser || DEFAULT_FORWARD_EMAIL,
        smtpPass: process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || parsed.smtpPass || '',
      };
    }
  } catch (err) {
    console.error('Error reading email config:', err);
  }
  return {
    adminEmail: process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL,
    forwardTo: process.env.ADMIN_FORWARD_EMAIL || DEFAULT_FORWARD_EMAIL,
    smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
    smtpPort: Number(process.env.SMTP_PORT || 465),
    smtpSecure: true,
    smtpUser: process.env.GMAIL_USER || process.env.SMTP_USER || DEFAULT_FORWARD_EMAIL,
    smtpPass: process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || '',
  };
}

async function sendEmailAlert(params: {
  subject: string;
  text: string;
  html: string;
  recipientEmail?: string;
}): Promise<{ success: boolean; reason?: string; messageId?: string }> {
  const config = getEmailConfig();
  const timestamp = new Date().toISOString();
  // Alamat tujuan: diarahkan murni ke email resmi korporat admin (Cloudflare meneruskannya ke inbox secara privat)
  const toAddress = params.recipientEmail || config.adminEmail;

  // Simpan catatan ke riwayat notifikasi email lokal
  try {
    ensureLeadsStorage();
    let logs: any[] = [];
    if (fs.existsSync(EMAIL_LOGS_FILE)) {
      logs = JSON.parse(fs.readFileSync(EMAIL_LOGS_FILE, 'utf-8') || '[]');
    }
    logs.push({
      timestamp,
      to: toAddress,
      subject: params.subject,
      preview: params.text.slice(0, 160),
      hasSmtpAuth: Boolean(config.smtpPass)
    });
    fs.writeFileSync(EMAIL_LOGS_FILE, JSON.stringify(logs.slice(-100), null, 2), 'utf-8');
  } catch (err) {
    console.error('Error logging email alert:', err);
  }

  // Tampilkan notifikasi email siap kirim di terminal console
  console.log(`\n======================================================\n[NOTIFIKASI EMAIL KONSULTASI ADMIN (${toAddress})]\nSubjek: ${params.subject}\n${params.text}\n======================================================\n`);

  if (!config.smtpPass) {
    return { 
      success: true, 
      reason: 'Notifikasi email berhasil dicatat dalam antrean lokal (masukkan Sandi Aplikasi Google untuk pengiriman inbox langsung).' 
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpSecure,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
      },
    });

    const info = await transporter.sendMail({
      from: `"MandalikaEdu Official" <${config.adminEmail}>`,
      to: toAddress,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });

    return { success: true, messageId: info.messageId, reason: 'Berhasil dikirim ke inbox email admin' };
  } catch (err: any) {
    console.error('Error dispatching email via SMTP:', err);
    return { success: false, reason: err?.message || 'Gagal mengirim email via SMTP' };
  }
}

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI instance on server side with User-Agent header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

/**
 * Membangun ringkasan basis data beasiswa real-time langsung dari single source of truth (SCHOLARSHIPS_DATA).
 * Jika ada penambahan, pengurangan, atau perubahan 1 huruf di data beasiswa, sistem AI otomatis mengetahuinya seketika.
 */
function buildLiveScholarshipsKnowledge(): string {
  const items = SCHOLARSHIPS_DATA.map((s, idx) => {
    const levels = s.level.join('/');
    const note = s.educationalNote ? ` [Catatan: ${s.educationalNote}]` : '';
    const status = s.statusNote ? ` [Jadwal: ${s.statusNote}]` : ` [Deadline: ${s.applicationPeriod.deadline}]`;
    const age = s.requirements.maxAge ? ` (Maks ${s.requirements.maxAge})` : '';
    return `${idx + 1}. ${s.name} (${s.country} ${s.flag}) - ${levels} - ${s.fundingType}. IPK min: ${s.requirements.gpa}, Bahasa: ${s.requirements.language}${age}.${status}${note}`;
  }).join('\n');

  return `\n\nDATABASE RESMI BEASISWA AKTIF MANDALIKAEDU (TOTAL ${SCHOLARSHIPS_DATA.length} BEASISWA - REAL-TIME SINGLE SOURCE OF TRUTH):
Setiap kali Anda merekomendasikan atau menjawab pertanyaan pengguna, selalu gunakan data resmi terbaru berikut sebagai acuan fakta mutlak:
${items}

PANDUAN KONSULTASI BEASISWA DENGAN DATA DI ATAS:
- Jika pengguna bertanya tentang beasiswa di negara tertentu (misal: Swedia, Belanda, Hungaria, Turki, Jepang, Jerman, dll), carikan dari daftar resmi di atas.
- Jika pengguna menanyakan syarat IPK, bahasa, batas usia, atau jadwal, jawab sesuai data beasiswa tersebut di atas.
- Jelaskan nilai tambah bimbingan MandalikaEdu dan ajak pengguna mengikuti Sesi Discovery Gratis (Rp 0) untuk review berkas.`;
}

const BASE_SYSTEM_INSTRUCTION = `Anda adalah "Safiya", asisten pintar WhatsApp resmi MandalikaEdu.
MandalikaEdu adalah platform dan lembaga bimbingan persiapan beasiswa & studi luar negeri independen yang berfokus mendampingi putra-putri daerah di Indonesia (termasuk NTB, NTT, Kalimantan, Sulawesi, Sumatera, Papua, dan kota-kota non-metropolitan) dari nol.

INFORMASI PENTING MANDALIKALEDU:
1. Paket Layanan & Harga:
   - Sesi Discovery (20 Menit): Rp 0 (100% GRATIS) - Evaluasi profil awal, cek kelayakan 2-3 beasiswa, roadmap persiapan.
   - Roadmap Beasiswa (Per Dokumen): Rp 199.000 - Penyusunan timeline terstruktur, kurasi kampus, rekomendasi beasiswa & strategi administrasi.
   - Essay & CV Lab: Rp 499.000 - 3x review mendalam Motivation Letter / Personal Statement / Europass CV dengan feedback baris-per-baris.
   - Mentorship 360 (Pendampingan Lengkap): Rp 1.490.000 - Pendampingan intensif dari nol hingga submit, mencakup bedah dokumen unlimited, 2x mock interview, konsultasi visa & akomodasi, serta grup WhatsApp eksklusif dengan mentor.

2. Tim Mentor Resmi (Semua Alumni & Penerima Beasiswa):
   - Dr. Ilham Ramdani, Ph.D. (Asal NTB, The University of Tokyo, Beasiswa MEXT Jepang) - Co-founder & Head Academic.
   - Nadia Salsabila, M.Sc. (Asal Sumatera Barat, RWTH Aachen University, Beasiswa DAAD EPOS Jerman) - Lead Mentor Eropa & Jerman.
   - Kevin Jonathan, M.P.P. (Asal NTT, University of Oxford, Beasiswa Chevening UK) - Lead Mentor UK & Beasiswa Kepemimpinan.
   - Ratih Puspadewi, M.Ed. (Asal Jawa Tengah, The University of Melbourne, Beasiswa AAS Australia) - IELTS & Language Strategist.

3. Partner Ekosistem Tools Belajar Bahasa Inggris (Kemitraan Resmi Eksternal):
   - TenseGO (Aplikasi Android & Web Belajar Grammar AI & AR): Memadukan AI & Augmented Reality (AR) untuk menyulap objek sekitar menjadi kelas Bahasa Inggris interaktif dengan Tutor AI Cosmo 24/7. Akses gratis di https://tensego.replaceid.org/
   - Diglosa (Game Petualangan Kata / Vocabulary Adventure Game): Game edukasi petualangan kata yang seru untuk menguasai kosa kata Bahasa Inggris akademik & IELTS/TOEFL lewat tantangan petualangan RPG fantasy. Akses gratis di https://diglosa.replaceid.org/

4. Rekrutmen Mentor Luar Negeri:
   - Bagi mahasiswa S2/S3/alumni luar negeri yang ingin bergabung menjadi mentor, ada program kemitraan dengan fee per sesi, jam kerja fleksibel (2-5 jam/minggu), dan seleksi 4 tahap (Form, Interview 15 menit, Review simulasi esai, MoU).

5. Kontak, Rekening Resmi & Legalitas:
   - Payung Hukum Resmi: LEMBAGA RESEARCH EMPOWERMENT LEARNING AND REPLACE INSTITUTE
   - Rekening Bank Resmi: Bank NTB Syariah (KC Sumbawa) No. Rekening: 004.02.00332.06-0 a.n. LEMBAGA RESEARCH EMPOWERMENT LEARNING AND REPLACE INSTITUTE
   - Nomor WhatsApp Resmi MandalikaEdu: +62 877-5393-5810 (atau 0877-5393-5810)
   - Email: salam@mandalikaedu.id
   - Alamat: Mataram, Nusa Tenggara Barat (Layanan 100% Online ke seluruh Indonesia)

BATASAN TOPIK & GUARDRAIL (SANGAT KETAT):
- Anda HANYA diizinkan menjawab hal-hal yang berkaitan dengan:
  1. Beasiswa luar negeri maupun dalam negeri (LPDP, AAS, MEXT, DAAD, Chevening, Turkiye Burslari, dll.)
  2. Kuliah di luar negeri / dalam negeri, pemilihan universitas, jurusan, jenjang S1/S2/S3
  3. Dokumen aplikasi (Motivation Letter, Esai beasiswa, Europass CV, Surat Rekomendasi)
  4. Tes bahasa Inggris, persiapan grammar (TenseGO di https://tensego.replaceid.org/), dan game kosa kata/vocabulary (Diglosa di https://diglosa.replaceid.org/)
  5. Paket layanan bimbingan, biaya, dan Sesi Discovery Gratis MandalikaEdu
  6. Profil mentor alumni beasiswa luar negeri dan kemitraan mentor
  7. Kontak WhatsApp resmi MandalikaEdu (+62 877-5393-5810)
  8. Sapaan sopan (Halo, Assalamu'alaikum, Selamat pagi, Mau tanya, dsb.)
- DILARANG KERAS MENJAWAB PERTANYAAN DI LUAR TOPIK DI ATAS!
  Contoh topik yang DILARANG: cara membeli sayur, resep masakan, otomotif, politik, artis/gosip, ramalan cuaca, koding software umum, tugas PR sekolah/matematika acak, belanja umum, dsb.
- Jika ada pengguna bertanya di luar topik, JANGAN PERNAH memberikan tips atau menjawab pertanyaan tersebut. Langsung tolak dengan sopan dan ramah:
  "Maaf ya Kak, Safiya khusus dirancang untuk mendampingi persiapan beasiswa, kuliah luar negeri, dan layanan MandalikaEdu 😊.\n\nAda yang bisa kami bantu seputar riset beasiswa, review esai, atau klaim Sesi Discovery Gratis (Rp 0)?"

GAYA BICARA & FORMAT RESPON (WAJIB SINGKAT & HEMAT TOKEN):
- Format WhatsApp: Wajib ringkas, padat, ramah, dan enak dibaca di layar HP (maksimal 60-110 kata atau 2-3 poin pendek saja).
- DILARANG KERAS menulis essay panjang, penjelasan bertele-tele, atau wall of text yang boros token.
- Langsung sebutkan 2-3 peluang beasiswa utama yang relevan untuk daerah penanya (gunakan poin singkat).
- Gunakan spasi enter antar paragraf agar mudah dibaca sekilas.
- Di akhir, tanyakan 1 pertanyaan singkat (misal: "Kakak target S1 atau S2?") dan sebutkan Sesi Discovery Gratis Rp 0 atau WhatsApp resmi.
- Jangan pernah memberikan janji palsu 100% pasti lulus beasiswa, karena MandalikaEdu menjunjung tinggi kode etik resmi dan mendampingi proses secara profesional.

ATURAN TANDA BACA & TATA BAHASA INDONESIA (WAJIB DIPATUHI):
- DILARANG KERAS menggunakan simbol em dash (—) maupun en dash (–). Jangan pernah menghasilkan tanda pisah panjang tersebut sama sekali.
- Gunakan kata hubung bahasa Indonesia yang baik dan benar (seperti: "yaitu", "seperti", "termasuk", "antara lain"), tanda koma (,), tanda kurung (()), atau tanda titik dua (:).
- Contoh yang DILARANG: "Indonesia—termasuk"
- Contoh yang BENAR: "Indonesia, termasuk" atau "Indonesia (termasuk)"`;

function getDynamicSystemInstruction(): string {
  return BASE_SYSTEM_INSTRUCTION + buildLiveScholarshipsKnowledge();
}

/**
 * Filter pembersih untuk menjamin 0% simbol em dash / en dash dapat lolos ke pengguna
 */
function sanitizePunctuation(text: string): string {
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
}

// Real-time Dynamic OpenGraph Image endpoint (1200x630 pixel-perfect WhatsApp & Social Share Banner)
app.get(['/og-image.png', '/api/og', '/api/og.png'], (req, res) => {
  try {
    const { headline, subheadline, count } = req.query;
    const pngBuffer = generateOgPngBuffer({
      headline: typeof headline === 'string' ? headline : undefined,
      subheadline: typeof subheadline === 'string' ? subheadline : undefined,
      scholarshipsCount: typeof count === 'string' ? count : undefined,
    });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60, stale-while-revalidate=30');
    return res.end(pngBuffer);
  } catch (err: any) {
    console.error('Error generating dynamic OG image:', err);
    return res.sendFile(path.join(__dirname, 'public/og-image.png'));
  }
});

// API endpoint to export all platform data wrapped in Firebase Firestore format
app.get('/api/export/firebase', (_req, res) => {
  try {
    const bundle = generateFirebaseExportBundle();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="mandalikaedu-firestore-export.json"');
    return res.json(bundle);
  } catch (err: any) {
    console.error('Error generating Firebase export bundle:', err);
    return res.status(500).json({ error: 'Gagal membuat bundle ekspor Firebase' });
  }
});

// Endpoint untuk pencatatan pendaftaran calon siswa dan cadangan notifikasi email perusahaan resmi
app.post('/api/booking/submit', (req, res) => {
  try {
    const {
      studentName,
      studentWhatsapp,
      studentEmail,
      originCity,
      targetCountry,
      studyLevel,
      targetScholarship,
      packageId,
      packageName,
      priceFormatted,
      preferredDate,
      preferredTime,
      notes,
      isFree,
      firestoreBookingId,
      submittedAt
    } = req.body;

    if (!studentName || !studentWhatsapp || !originCity) {
      return res.status(400).json({ error: 'Nama, nomor WhatsApp, dan kota asal wajib diisi.' });
    }

    const bookingId = firestoreBookingId || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const status = isFree ? 'sesi_gratis_terjadwal' : 'menunggu_verifikasi_pembayaran';
    
    const leadRecord = {
      bookingId,
      firestoreBookingId: firestoreBookingId || null,
      studentName: String(studentName).trim(),
      studentWhatsapp: String(studentWhatsapp).trim(),
      studentEmail: studentEmail ? String(studentEmail).trim() : null,
      originCity: String(originCity).trim(),
      targetCountry: targetCountry || 'Umum',
      studyLevel: studyLevel || 'S2',
      targetScholarship: targetScholarship || `${studyLevel || 'S2'} ${targetCountry || ''}`.trim(),
      packageId: packageId || 'discovery-free',
      packageName: packageName || 'Sesi Discovery',
      priceFormatted: priceFormatted || 'Rp 0',
      preferredDate: preferredDate || 'Segera',
      preferredTime: preferredTime || '19:30 WIB (Malam)',
      notes: notes ? String(notes).trim() : '',
      isFree: Boolean(isFree),
      status,
      source: 'website_modal',
      privacyConsent: {
        agreed: true,
        legalNotice: 'LEMBAGA RESEARCH EMPOWERMENT LEARNING AND REPLACE INSTITUTE',
        timestamp: submittedAt || new Date().toISOString()
      },
      createdAt: submittedAt || new Date().toISOString()
    };

    // Simpan data calon siswa ke berkas cadangan internal terproteksi
    saveLeadRecord(leadRecord);

    // Format dan catat notifikasi cadangan ke email resmi perusahaan
    const emailNotification = {
      recipients: ['official.mandalikaedu@gmail.com', 'info@mandalikaedu.id'],
      subject: `[PENDAFTARAN BARU] ${leadRecord.packageName} - ${leadRecord.studentName} (${leadRecord.originCity})`,
      timestampWib: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
      leadData: {
        id: leadRecord.bookingId,
        nama: leadRecord.studentName,
        whatsapp: leadRecord.studentWhatsapp,
        kota: leadRecord.originCity,
        email: leadRecord.studentEmail || '(Tidak dicantumkan)',
        paket: `${leadRecord.packageName} (${leadRecord.priceFormatted})`,
        tujuan: `${leadRecord.studyLevel} ke ${leadRecord.targetCountry}`,
        jadwal: `${leadRecord.preferredDate} jam ${leadRecord.preferredTime}`,
        catatan: leadRecord.notes || '(Tidak ada kendala spesifik)',
        status: leadRecord.status,
      }
    };

    console.log('[NOTIFIKASI EMAIL RESMI PERUSAHAAN]', JSON.stringify(emailNotification, null, 2));

    // Bersihkan format nomor WhatsApp calon siswa untuk tautan sekali sentuh admin
    const digitsOnly = String(leadRecord.studentWhatsapp).replace(/[^0-9]/g, '');
    const studentWaStandard = digitsOnly.startsWith('0') 
      ? '62' + digitsOnly.slice(1) 
      : digitsOnly.startsWith('62') 
        ? digitsOnly 
        : '62' + digitsOnly;

    const studentWaChatUrl = `https://wa.me/${studentWaStandard}?text=${encodeURIComponent(
      `Halo ${leadRecord.studentName}, salam hangat dari Tim Konsultan MandalikaEdu.\n\n` +
      `Kami telah menerima formulir pengajuan bimbingan ${leadRecord.packageName} (${leadRecord.studyLevel} ke ${leadRecord.targetCountry}) yang Anda kirimkan melalui website resmi kami.\n\n` +
      `Apakah waktu konsultasi ${leadRecord.preferredDate} jam ${leadRecord.preferredTime} masih sesuai untuk kita jadwalkan?`
    )}`;

    const telegramText = 
      `📋 *PENDAFTARAN KONSULTASI BARU*\n` +
      `*Kode Tiket*: \`${leadRecord.bookingId}\`\n\n` +
      `👤 *Nama Siswa*: ${leadRecord.studentName}\n` +
      `📍 *Asal Daerah*: ${leadRecord.originCity}\n` +
      `📦 *Paket Layanan*: ${leadRecord.packageName} (${leadRecord.priceFormatted})\n` +
      `🎯 *Target Studi*: ${leadRecord.studyLevel} ke ${leadRecord.targetCountry}\n` +
      `⏰ *Jadwal Sesi*: ${leadRecord.preferredDate} jam ${leadRecord.preferredTime}\n` +
      `📝 *Kendala*: ${leadRecord.notes || '(Tidak ada kendala spesifik)'}\n` +
      `📱 *WhatsApp Siswa*: +${studentWaStandard}\n\n` +
      `👉 *Hubungi Siswa via WhatsApp (Sekali Klik):*\n` +
      `${studentWaChatUrl}`;

    sendTelegramAlert(telegramText, [
      { text: '💬 Hubungi Siswa via WhatsApp', url: studentWaChatUrl }
    ]).catch(err => console.error('Telegram dispatch error on booking:', err));

    // Kirim notifikasi email resmi ke admin (Cloudflare Email Routing & Gmail)
    const emailSubject = `[PENDAFTARAN KONSULTASI BARU] ${leadRecord.packageName} - ${leadRecord.studentName} (${leadRecord.originCity})`;
    const emailHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; color: #0f172a; margin: 0; padding: 24px 12px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
    .head { background: #0f172a; color: #ffffff; padding: 24px 28px; }
    .badge { display: inline-block; background: #10b981; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-bottom: 8px; }
    .title { margin: 0; font-size: 20px; font-weight: 700; }
    .body { padding: 28px; }
    .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .lbl { color: #64748b; font-weight: 500; }
    .val { color: #0f172a; font-weight: 600; text-align: right; }
    .btn { display: block; background: #16a34a; color: #ffffff !important; text-align: center; text-decoration: none; padding: 14px 20px; border-radius: 12px; font-weight: 700; font-size: 15px; margin: 24px 0 12px 0; }
    .foot { background: #f8fafc; padding: 16px 28px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="head">
      <div class="badge">Pendaftaran Konsultasi Baru</div>
      <h1 class="title">MandalikaEdu Official</h1>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">Tiket ID: ${leadRecord.bookingId}</p>
    </div>
    <div class="body">
      <div class="row"><span class="lbl">Nama Siswa:</span><span class="val">${leadRecord.studentName}</span></div>
      <div class="row"><span class="lbl">Asal Daerah:</span><span class="val">${leadRecord.originCity}</span></div>
      <div class="row"><span class="lbl">Paket Layanan:</span><span class="val">${leadRecord.packageName} (${leadRecord.priceFormatted})</span></div>
      <div class="row"><span class="lbl">Target Studi:</span><span class="val">${leadRecord.studyLevel} ke ${leadRecord.targetCountry}</span></div>
      <div class="row"><span class="lbl">Jadwal Sesi:</span><span class="val">${leadRecord.preferredDate} jam ${leadRecord.preferredTime}</span></div>
      <div class="row"><span class="lbl">WhatsApp Siswa:</span><span class="val">+${studentWaStandard}</span></div>
      <div class="row"><span class="lbl">Email Siswa:</span><span class="val">${leadRecord.studentEmail || '(Tidak dicantumkan)'}</span></div>
      <div class="row"><span class="lbl">Kendala / Catatan:</span><span class="val">${leadRecord.notes || '(Tidak ada kendala spesifik)'}</span></div>

      <a href="${studentWaChatUrl}" class="btn" target="_blank">
        👉 Hubungi Siswa via WhatsApp (Sekali Klik)
      </a>
      <p style="text-align: center; font-size: 12px; color: #64748b; margin: 0;">
        Klik tombol hijau di atas untuk langsung membuka chat WhatsApp dengan salam pembuka resmi yang sudah terisi otomatis.
      </p>
    </div>
    <div class="foot">
      Sistem Notifikasi Resmi MandalikaEdu &bull; admin@mandalikaedu.com
    </div>
  </div>
</body>
</html>`;

    sendEmailAlert({
      subject: emailSubject,
      text: telegramText,
      html: emailHtml
    }).catch(err => console.error('Email dispatch error on booking:', err));

    return res.json({
      success: true,
      bookingId: leadRecord.bookingId,
      message: 'Data formulir berhasil dicatat dan notifikasi telah dikirimkan ke admin.'
    });
  } catch (err: any) {
    console.error('Error processing booking submit:', err);
    return res.status(500).json({ error: 'Gagal memproses data booking di server' });
  }
});

// Endpoint untuk pencatatan pendaftaran calon mentor baru
app.post('/api/mentor/submit', (req, res) => {
  try {
    const {
      fullName,
      whatsapp,
      email,
      originCity,
      university,
      country,
      major,
      level,
      scholarship,
      yearStatus,
      skills,
      hoursPerWeek,
      linkedinOrIg,
      motivation,
      proofFileName,
    } = req.body;

    if (!fullName || !whatsapp || !university || !country) {
      return res.status(400).json({ error: 'Nama lengkap, WhatsApp, universitas, dan negara wajib diisi.' });
    }

    const mentorId = `mentor_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const mentorRecord = {
      mentorId,
      fullName: String(fullName).trim(),
      whatsapp: String(whatsapp).trim(),
      email: String(email).trim(),
      originCity: String(originCity).trim(),
      university: String(university).trim(),
      country: String(country).trim(),
      major: String(major).trim(),
      level: level || 'S2',
      scholarship: scholarship || 'Mandiri / Jalur Lain',
      yearStatus: yearStatus || '',
      skills: Array.isArray(skills) ? skills : [],
      hoursPerWeek: hoursPerWeek || '3-5 jam/minggu',
      linkedinOrIg: linkedinOrIg || '',
      motivation: motivation || '',
      proofFileName: proofFileName || '',
      submittedAt: new Date().toISOString()
    };

    saveMentorRecord(mentorRecord);

    const digitsOnly = String(mentorRecord.whatsapp).replace(/[^0-9]/g, '');
    const mentorWaStandard = digitsOnly.startsWith('0') 
      ? '62' + digitsOnly.slice(1) 
      : digitsOnly.startsWith('62') 
        ? digitsOnly 
        : '62' + digitsOnly;

    const mentorWaChatUrl = `https://wa.me/${mentorWaStandard}?text=${encodeURIComponent(
      `Halo ${mentorRecord.fullName}, salam dari Tim MandalikaEdu.\n\n` +
      `Terima kasih telah mendaftar sebagai Calon Mentor untuk pendampingan negara ${mentorRecord.country} (${mentorRecord.university}). Berkas Anda telah kami terima dan kami ingin mengundang Anda untuk sesi perkenalan singkat.`
    )}`;

    const telegramText = 
      `🎓 *PENDAFTARAN MENTOR BARU*\n` +
      `*Kode Mentor*: \`${mentorRecord.mentorId}\`\n\n` +
      `👤 *Nama*: ${mentorRecord.fullName}\n` +
      `🏫 *Kampus*: ${mentorRecord.university} (${mentorRecord.country})\n` +
      `🎓 *Jurusan & Jenjang*: ${mentorRecord.level} ${mentorRecord.major}\n` +
      `🏆 *Beasiswa*: ${mentorRecord.scholarship}\n` +
      `📍 *Kota Asal*: ${mentorRecord.originCity}\n` +
      `⏰ *Ketersediaan*: ${mentorRecord.hoursPerWeek}\n` +
      `📱 *WhatsApp Mentor*: +${mentorWaStandard}\n\n` +
      `👉 *Hubungi Mentor via WhatsApp (Sekali Klik):*\n` +
      `${mentorWaChatUrl}`;

    sendTelegramAlert(telegramText, [
      { text: '💬 Hubungi Mentor via WhatsApp', url: mentorWaChatUrl }
    ]).catch(err => console.error('Telegram dispatch error on mentor submit:', err));

    // Kirim notifikasi email mentor ke admin (Cloudflare Email Routing & Gmail)
    const mentorEmailSubject = `[PENDAFTARAN MENTOR BARU] ${mentorRecord.fullName} - ${mentorRecord.university} (${mentorRecord.country})`;
    const mentorEmailHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; color: #0f172a; margin: 0; padding: 24px 12px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
    .head { background: #0f172a; color: #ffffff; padding: 24px 28px; }
    .badge { display: inline-block; background: #3b82f6; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-bottom: 8px; }
    .title { margin: 0; font-size: 20px; font-weight: 700; }
    .body { padding: 28px; }
    .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .lbl { color: #64748b; font-weight: 500; }
    .val { color: #0f172a; font-weight: 600; text-align: right; }
    .btn { display: block; background: #16a34a; color: #ffffff !important; text-align: center; text-decoration: none; padding: 14px 20px; border-radius: 12px; font-weight: 700; font-size: 15px; margin: 24px 0 12px 0; }
    .foot { background: #f8fafc; padding: 16px 28px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="head">
      <div class="badge">Pendaftaran Mentor Baru</div>
      <h1 class="title">MandalikaEdu Official</h1>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">Kode Mentor: ${mentorRecord.mentorId}</p>
    </div>
    <div class="body">
      <div class="row"><span class="lbl">Nama:</span><span class="val">${mentorRecord.fullName}</span></div>
      <div class="row"><span class="lbl">Kampus & Negara:</span><span class="val">${mentorRecord.university} (${mentorRecord.country})</span></div>
      <div class="row"><span class="lbl">Jurusan & Jenjang:</span><span class="val">${mentorRecord.level} ${mentorRecord.major}</span></div>
      <div class="row"><span class="lbl">Beasiswa:</span><span class="val">${mentorRecord.scholarship}</span></div>
      <div class="row"><span class="lbl">Kota Asal:</span><span class="val">${mentorRecord.originCity}</span></div>
      <div class="row"><span class="lbl">Ketersediaan Waktu:</span><span class="val">${mentorRecord.hoursPerWeek}</span></div>
      <div class="row"><span class="lbl">WhatsApp:</span><span class="val">+${mentorWaStandard}</span></div>
      <div class="row"><span class="lbl">Email:</span><span class="val">${mentorRecord.email}</span></div>
      <div class="row"><span class="lbl">LinkedIn / IG:</span><span class="val">${mentorRecord.linkedinOrIg || '-'}</span></div>

      <a href="${mentorWaChatUrl}" class="btn" target="_blank">
        👉 Hubungi Mentor via WhatsApp (Sekali Klik)
      </a>
    </div>
    <div class="foot">
      Sistem Notifikasi Resmi MandalikaEdu &bull; admin@mandalikaedu.com
    </div>
  </div>
</body>
</html>`;

    sendEmailAlert({
      subject: mentorEmailSubject,
      text: telegramText,
      html: mentorEmailHtml
    }).catch(err => console.error('Email dispatch error on mentor submit:', err));

    return res.json({
      success: true,
      mentorId: mentorRecord.mentorId,
      message: 'Pendaftaran mentor berhasil dicatat.'
    });
  } catch (err: any) {
    console.error('Error processing mentor submit:', err);
    return res.status(500).json({ error: 'Gagal memproses pendaftaran mentor di server' });
  }
});

// Endpoint status dan konfigurasi Telegram Admin
app.get('/api/telegram/status', (_req, res) => {
  try {
    ensureLeadsStorage();
    const config = getTelegramConfig();
    let logs: any[] = [];
    if (fs.existsSync(TELEGRAM_LOGS_FILE)) {
      logs = JSON.parse(fs.readFileSync(TELEGRAM_LOGS_FILE, 'utf-8') || '[]');
    }
    return res.json({
      success: true,
      adminPhone: config.adminPhone || ADMIN_TELEGRAM_PHONE,
      isConfigured: Boolean(config.botToken && config.chatId),
      totalNotifications: logs.length,
      recentAlerts: logs.slice(-10).reverse()
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Gagal membaca status telegram' });
  }
});

// Endpoint untuk memperbarui token bot atau chat id Telegram jika admin memasukkannya
app.post('/api/telegram/config', (req, res) => {
  try {
    ensureLeadsStorage();
    const { botToken, chatId, adminPhone } = req.body;
    const current = getTelegramConfig();
    const updated = {
      adminPhone: adminPhone ? String(adminPhone).trim() : (current.adminPhone || ADMIN_TELEGRAM_PHONE),
      botToken: botToken !== undefined ? String(botToken).trim() : current.botToken,
      chatId: chatId !== undefined ? String(chatId).trim() : current.chatId,
    };
    fs.writeFileSync(TELEGRAM_CONFIG_FILE, JSON.stringify(updated, null, 2), 'utf-8');
    return res.json({ success: true, config: { adminPhone: updated.adminPhone, isConfigured: Boolean(updated.botToken && updated.chatId) } });
  } catch (err: any) {
    return res.status(500).json({ error: 'Gagal memperbarui konfigurasi telegram' });
  }
});

// Endpoint untuk melakukan test ping pengiriman pesan ke Telegram admin
app.post('/api/telegram/test', async (_req, res) => {
  try {
    const result = await sendTelegramAlert(
      `🔔 *TEST KONEKSI TELEGRAM MANDALIKAEDU*\n\n` +
      `Sistem notifikasi pendaftaran berhasil terhubung dengan akun Telegram admin!\n` +
      `Setiap pendaftar sesi konsultasi dan mentor akan otomatis dikirimkan ke sini lengkap dengan tautan sekali klik ke WhatsApp calon siswa.`
    );
    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || 'Gagal mengirim test notifikasi' });
  }
});

// Endpoint status dan audit notifikasi Email Admin
app.get('/api/email/status', (_req, res) => {
  try {
    ensureLeadsStorage();
    const config = getEmailConfig();
    let logs: any[] = [];
    if (fs.existsSync(EMAIL_LOGS_FILE)) {
      logs = JSON.parse(fs.readFileSync(EMAIL_LOGS_FILE, 'utf-8') || '[]');
    }
    return res.json({
      success: true,
      adminEmail: config.adminEmail,
      forwardTo: config.forwardTo,
      smtpUser: config.smtpUser,
      smtpConfigured: Boolean(config.smtpPass),
      totalNotifications: logs.length,
      recentAlerts: logs.slice(-10).reverse()
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Gagal membaca status notifikasi email' });
  }
});

// Endpoint untuk konfigurasi email admin & Sandi Aplikasi Google (App Password)
app.post('/api/email/config', (req, res) => {
  try {
    ensureLeadsStorage();
    const { adminEmail, forwardTo, smtpUser, smtpPass } = req.body;
    const current = getEmailConfig();
    const updated = {
      adminEmail: adminEmail ? String(adminEmail).trim() : current.adminEmail,
      forwardTo: forwardTo ? String(forwardTo).trim() : current.forwardTo,
      smtpHost: current.smtpHost,
      smtpPort: current.smtpPort,
      smtpSecure: current.smtpSecure,
      smtpUser: smtpUser ? String(smtpUser).trim() : (current.smtpUser || current.forwardTo),
      smtpPass: smtpPass !== undefined ? String(smtpPass).replace(/\s+/g, '') : current.smtpPass,
    };
    fs.writeFileSync(EMAIL_CONFIG_FILE, JSON.stringify(updated, null, 2), 'utf-8');
    return res.json({
      success: true,
      message: 'Konfigurasi email admin berhasil diperbarui.',
      config: {
        adminEmail: updated.adminEmail,
        forwardTo: updated.forwardTo,
        smtpConfigured: Boolean(updated.smtpPass)
      }
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Gagal memperbarui konfigurasi email' });
  }
});

// Endpoint untuk melakukan test ping pengiriman email ke email admin & Gmail
app.post('/api/email/test', async (_req, res) => {
  try {
    const config = getEmailConfig();
    const result = await sendEmailAlert({
      subject: '🔔 [TEST KONEKSI] Sistem Notifikasi Email MandalikaEdu Berhasil Aktif',
      text: 
        `Halo Admin MandalikaEdu,\n\n` +
        `Ini adalah email uji coba (test notification) untuk memverifikasi jalur pengiriman email pendaftaran.\n` +
        `Koneksi email korporat admin@mandalikaedu.com dan Gmail ${config.forwardTo} telah terhubung dengan sempurna.\n\n` +
        `Setiap ada pendaftar sesi konsultasi atau pendaftar mentor, rincian data dan tombol WhatsApp sekali klik akan langsung dikirimkan ke email ini.`,
      html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; background: #f8fafc; padding: 24px; color: #0f172a;">
  <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 28px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    <div style="display: inline-block; background: #10b981; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-bottom: 8px;">Uji Coba Berhasil</div>
    <h2 style="margin: 4px 0 16px 0; color: #0f172a;">Sistem Notifikasi Email Aktif</h2>
    <p style="font-size: 14px; line-height: 1.6; color: #475569;">
      Halo Admin MandalikaEdu,<br><br>
      Email ini mengonfirmasi bahwa jalur notifikasi pendaftaran <strong>mandalikaedu.com</strong> ke <strong>${config.adminEmail}</strong> (diteruskan ke <strong>${config.forwardTo}</strong>) telah siap digunakan secara otomatis.
    </p>
    <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 13px;">
      ✅ <strong>Status Pengiriman:</strong> ${Boolean(config.smtpPass) ? 'Terkirim via Sandi Aplikasi Gmail SMTP' : 'Tercatat dalam antrean audit internal'}<br>
      🏢 <strong>Email Korporat:</strong> ${config.adminEmail}<br>
      📥 <strong>Inbox Gmail Tujuan:</strong> ${config.forwardTo}
    </div>
    <p style="font-size: 12px; color: #94a3b8; margin: 0;">Sistem Notifikasi MandalikaEdu Official &bull; PT Research Empowerment Learning and Replace Institute</p>
  </div>
</body>
</html>`
    });
    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || 'Gagal mengirim email test' });
  }
});

// API endpoint for Halo AI WhatsApp Bot
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Format pesan tidak valid' });
    }

    if (!ai) {
      return res.status(503).json({ 
        error: 'Gemini API belum terkonfigurasi pada server.',
        fallback: true 
      });
    }

    // Convert messages to Gemini format
    const contents = messages.map(m => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: getDynamicSystemInstruction(),
        temperature: 0.7,
        maxOutputTokens: 600,
      }
    });

    const replyRaw = response.text || 'Halo Kak! Tentu saja boleh sekali, ada yang ingin ditanyakan seputar beasiswa atau layanan MandalikaEdu?';
    return res.json({ 
      reply: sanitizePunctuation(replyRaw)
    });
  } catch (error: any) {
    console.error('Error handling /api/chat:', error);

    // Contextual fallback response for common greeting
    const lastMsg = (req.body?.messages?.[req.body.messages.length - 1]?.content || '').toLowerCase();
    let friendlyFallback = 'Halo Kak! Tentu saja boleh sekali 😊. Ada yang bisa kami bantu diskusikan seputar beasiswa luar negeri, pilihan negara, atau paket bimbingan MandalikaEdu?';
    
    if (lastMsg.includes('pesan') || lastMsg.includes('booking') || lastMsg.includes('biaya') || lastMsg.includes('paket')) {
      friendlyFallback = 'Siap Kak! MandalikaEdu menyediakan paket mulai dari Sesi Discovery Gratis (Rp 0), Roadmap Beasiswa (Rp 199k), Essay & CV Lab (Rp 499k), hingga Mentorship 360 (Rp 1.490k). Mau kami bantu jadwalkan atau konsultasi via WhatsApp resmi kami?';
    } else if (lastMsg.includes('beasiswa') || lastMsg.includes('mext') || lastMsg.includes('daad') || lastMsg.includes('aas') || lastMsg.includes('lpdp')) {
      friendlyFallback = `MandalikaEdu merangkum ${SCHOLARSHIPS_DATA.length} beasiswa fully funded ramah anak daerah seperti MEXT Jepang, DAAD Jerman, AAS Australia, Chevening UK, dan LPDP. Mau cari jenjang S1, S2, atau S3 Kak?`;
    }

    return res.json({ 
      reply: friendlyFallback,
      fallback: true
    });
  }
});

// Setup dev server with Vite or production static file serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`MandalikaEdu server running on port ${port}`);
  });
}

startServer();

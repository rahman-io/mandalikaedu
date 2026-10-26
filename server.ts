import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const SYSTEM_INSTRUCTION = `Anda adalah "Safiya", asisten pintar WhatsApp resmi MandalikaEdu.
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

4. Beasiswa Populer: MEXT (Jepang, fully funded + uang saku ~144k JPY), DAAD EPOS (Jerman, kuliah gratis + uang saku 934 EUR), AAS (Australia, kuota afirmasi daerah Indonesia Timur), Chevening (Inggris/UK), LPDP (Afirmasi & Reguler), Turkiye Burslari (Turki, termasuk kursus bahasa gratis 1 tahun), GKS (Korea Selatan), Stipendium Hungaricum (Hungaria).

5. Rekrutmen Mentor Luar Negeri:
   - Bagi mahasiswa S2/S3/alumni luar negeri yang ingin bergabung menjadi mentor, ada program kemitraan dengan fee per sesi, jam kerja fleksibel (2-5 jam/minggu), dan seleksi 4 tahap (Form, Interview 15 menit, Review simulasi esai, MoU).

6. Kontak & Pemesanan:
   - Nomor WhatsApp Resmi MandalikaEdu: +62 822-4756-3829 (atau 0822-4756-3829)
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
  7. Kontak WhatsApp resmi MandalikaEdu (+62 822-4756-3829)
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
      model: 'gemini-3.5-flash-lite',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 260,
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
      friendlyFallback = 'MandalikaEdu merangkum 15+ beasiswa fully funded ramah anak daerah seperti MEXT Jepang, DAAD Jerman, AAS Australia, Chevening UK, dan LPDP. Mau cari jenjang S1, S2, atau S3 Kak?';
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

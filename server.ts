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

const SYSTEM_INSTRUCTION = `Anda adalah "Halo AI", asisten pintar WhatsApp resmi MandalikaEdu.
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

3. Beasiswa Populer: MEXT (Jepang, fully funded + uang saku ~144k JPY), DAAD EPOS (Jerman, kuliah gratis + uang saku 934 EUR), AAS (Australia, kuota afirmasi daerah Indonesia Timur), Chevening (Inggris/UK), LPDP (Afirmasi & Reguler), Turkiye Burslari (Turki, termasuk kursus bahasa gratis 1 tahun), GKS (Korea Selatan), Stipendium Hungaricum (Hungaria).

4. Rekrutmen Mentor Luar Negeri:
   - Bagi mahasiswa S2/S3/alumni luar negeri yang ingin bergabung menjadi mentor, ada program kemitraan dengan fee per sesi, jam kerja fleksibel (2-5 jam/minggu), dan seleksi 4 tahap (Form, Interview 15 menit, Review simulasi esai, MoU).

5. Kontak & Pemesanan:
   - Nomor WhatsApp Resmi MandalikaEdu: +62 822-4756-3829 (atau 0822-4756-3829)
   - Email: salam@mandalikaedu.id
   - Alamat: Mataram, Nusa Tenggara Barat (Layanan 100% Online ke seluruh Indonesia)

GAYA BICARA & RESPON:
- Gunakan bahasa Indonesia yang ramah, sopan, antusias, suportif ("Halo Kak!", "Siap Kak!", "Senang sekali bisa bantu!").
- Beri jawaban ringkas, jelas, terstruktur (gunakan bullet points jika perlu).
- Jika pengguna ingin memesan paket atau booking konsultasi, jelaskan paketnya secara singkat dan undang mereka untuk menekan tombol "Lanjutkan ke WhatsApp Resmi" atau konfirmasikan pemesanan ke nomor WhatsApp resmi MandalikaEdu +62 822-4756-3829.
- Jangan pernah memberikan janji palsu 100% pasti lulus beasiswa, karena MandalikaEdu menjunjung tinggi kode etik resmi dan mendampingi proses secara profesional.`;

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
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return res.json({ 
      reply: response.text || 'Halo Kak! Tentu saja boleh sekali, ada yang ingin ditanyakan seputar beasiswa atau layanan MandalikaEdu?' 
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

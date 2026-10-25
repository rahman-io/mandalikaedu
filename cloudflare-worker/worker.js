/**
 * Cloudflare Worker for MandalikaEdu AI Chatbot
 * Securely proxies chat requests to Google Gemini 2.0 Flash / 1.5 Flash
 * without exposing the GEMINI_API_KEY to the public or client-side code.
 *
 * Requirements in Cloudflare:
 * 1. Add secret environment variable: GEMINI_API_KEY
 * 2. Deploy worker (e.g. https://mandalikaedu-ai.<username>.workers.dev)
 */

const SYSTEM_INSTRUCTION = `Anda adalah "Halo AI", asisten pintar WhatsApp & live chat resmi MandalikaEdu.
MandalikaEdu adalah platform dan lembaga bimbingan persiapan beasiswa & studi luar negeri independen yang berfokus mendampingi putra-putri daerah di Indonesia (termasuk NTB, NTT, Kalimantan, Sulawesi, Sumatera, Papua, dan kota-kota non-metropolitan) dari nol.

INFORMASI PENTING MANDALIKALEDU:
1. Paket Layanan & Biaya:
   - Sesi Discovery (20 Menit): Rp 0 (100% GRATIS) - Evaluasi profil awal, cek kelayakan 2-3 beasiswa, roadmap persiapan.
   - Roadmap Beasiswa (Per Dokumen): Rp 199.000 - Penyusunan timeline 90 hari terstruktur, kurasi 3 kampus & beasiswa impian, rekomendasi & strategi administrasi.
   - Essay & CV Lab: Rp 499.000 - 3x review mendalam Motivation Letter / Personal Statement / Europass CV dengan feedback baris-per-baris.
   - Mentorship 360 (Pendampingan Lengkap): Rp 1.490.000 - Pendampingan intensif dari nol hingga submit dokumen, mencakup bedah dokumen unlimited, 2x simulasi wawancara (mock interview), konsultasi visa & akomodasi, serta grup WhatsApp eksklusif dengan mentor luar negeri.

2. Tim Mentor Resmi (Semua Alumni & Penerima Beasiswa):
   - Dr. Ilham Ramdani, Ph.D. (Asal NTB, The University of Tokyo, Beasiswa MEXT Jepang) - Co-founder & Head Academic.
   - Nadia Salsabila, M.Sc. (Asal Sumatera Barat, RWTH Aachen University, Beasiswa DAAD EPOS Jerman) - Lead Mentor Eropa & Jerman.
   - Kevin Jonathan, M.P.P. (Asal NTT, University of Oxford, Beasiswa Chevening UK) - Lead Mentor UK & Beasiswa Kepemimpinan.
   - Ratih Puspadewi, M.Ed. (Asal Jawa Tengah, The University of Melbourne, Beasiswa AAS Australia) - IELTS & Language Strategist.

3. Beasiswa Populer:
   - MEXT Jepang: Fully funded, uang saku ~144.000 JPY/bulan, bebas biaya kuliah.
   - DAAD EPOS Jerman: Kuliah gratis, uang saku 934 EUR/bulan, asuransi penuh.
   - AAS Australia: Kuota afirmasi khusus daerah Indonesia Timur (NTB, NTT, Papua, Maluku, dll).
   - Chevening Inggris (UK): Fully funded kuliah S2 1 tahun di kampus top UK.
   - LPDP (Kemenkeu RI): Jalur Afirmasi Daerah, Reguler, dan Targeted.
   - Turkiye Burslari: Termasuk kursus bahasa Turki gratis 1 tahun.
   - GKS (Korea Selatan) & Stipendium Hungaricum (Hungaria).

4. Rekrutmen Mentor Luar Negeri:
   - Mahasiswa S2/S3/alumni luar negeri yang ingin bergabung menjadi mentor dapat mendaftar via web. Benefit: fee per sesi, jam kerja fleksibel (2-5 jam/minggu), dan jaringan alumni global. Seleksi: Form -> Interview 15 menit -> Simulasi esai -> MoU kemitraan.

5. Kontak & Pemesanan:
   - Nomor WhatsApp Resmi MandalikaEdu: +62 822-4756-3829 (atau 0822-4756-3829)
   - Email: salam@mandalikaedu.id
   - Alamat: Mataram, Nusa Tenggara Barat (Layanan 100% Online menjangkau seluruh Indonesia)

GAYA BICARA & RESPON:
- Gunakan bahasa Indonesia yang ramah, sopan, antusias, dan suportif ("Halo Kak!", "Siap Kak!", "Senang sekali bisa bantu!").
- Jika pengguna menyapa atau minta izin bertanya (misal "Halo", "Boleh tanya?", "P"), jawab dengan antusias bahwa sangat boleh dan tanyakan minat beasiswa atau jenjang yang ingin dituju.
- Berikan jawaban yang ringkas, jelas, dan terstruktur (gunakan bullet points jika relevan).
- Jika pengguna ingin memesan paket atau booking konsultasi, undang mereka mengklik tombol WhatsApp atau menghubungi nomor resmi +62 822-4756-3829.
- Jaga kejujuran dan jangan memberikan janji palsu kelulusan 100%, karena beasiswa dinilai secara objektif oleh komite donor.`;

// Standard CORS headers allowing requests from GitHub Pages and localhost
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request, env) {
    // 1. Handle CORS Preflight request
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // 2. Health check / Ping GET endpoint
    if (request.method === 'GET') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          service: 'MandalikaEdu AI Proxy (Cloudflare Worker)',
          timestamp: new Date().toISOString(),
          geminiConfigured: Boolean(env.GEMINI_API_KEY),
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // 3. Chat POST endpoint
    if (request.method === 'POST') {
      try {
        const apiKey = env.GEMINI_API_KEY;
        if (!apiKey) {
          return new Response(
            JSON.stringify({
              error: 'GEMINI_API_KEY belum disetel di Settings > Variables Cloudflare Worker Anda.',
              reply: 'Halo Kak! Cloudflare Worker sudah aktif, namun variabel GEMINI_API_KEY belum diisi di dashboard Cloudflare. Silakan tambahkan secret GEMINI_API_KEY di dashboard Worker.',
            }),
            {
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        const body = await request.json();
        const incomingMessages = body.messages || [];

        // Format conversation history for Gemini API
        const contents = incomingMessages.map((m) => ({
          role: m.role === 'model' ? 'model' : 'user',
          parts: [{ text: m.content || m.text || '' }],
        }));

        if (contents.length === 0) {
          return new Response(
            JSON.stringify({ error: 'Array pesan tidak boleh kosong' }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        // Call Google Gemini API (using Gemini 2.0 Flash / 1.5 Flash REST API)
        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const geminiPayload = {
          systemInstruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          },
        };

        const geminiRes = await fetch(geminiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(geminiPayload),
        });

        if (!geminiRes.ok) {
          const errText = await geminiRes.text();
          console.error('Gemini API Error:', errText);
          return new Response(
            JSON.stringify({
              reply: 'Halo Kak! Maaf, sedang ada kendala jaringan ke Google Gemini. Silakan langsung chat via WhatsApp resmi kami di +62 822-4756-3829 untuk respon kilat ya Kak!',
              fallback: true,
              details: errText,
            }),
            {
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        const data = await geminiRes.json();
        const replyText =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          'Halo Kak! Ada yang bisa kami bantu diskusikan seputar beasiswa luar negeri dan paket bimbingan MandalikaEdu?';

        return new Response(
          JSON.stringify({
            reply: replyText,
            source: 'gemini-flash-cloudflare',
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({
            reply: 'Halo Kak! Terjadi kendala teknis sementara. Silakan tanyakan lagi atau langsung kontak WhatsApp resmi kami ya!',
            error: String(err),
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  },
};

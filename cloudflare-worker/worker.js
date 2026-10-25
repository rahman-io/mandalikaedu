/**
 * Cloudflare Worker untuk MandalikaEdu AI Chatbot
 * Menggunakan Google Gemini 3.5 Flash Lite (Cepat < 1 detik, stabil, dan bebas antrean)
 */

const SYSTEM_INSTRUCTION = `Anda adalah "Halo AI", asisten pintar WhatsApp & live chat resmi MandalikaEdu.
MandalikaEdu adalah platform dan lembaga bimbingan persiapan beasiswa & studi luar negeri independen yang berfokus mendampingi putra-putri daerah di Indonesia (termasuk NTB, NTT, Kalimantan, Sulawesi, Sumatera, Papua, Maluku, dan kota-kota non-metropolitan) dari nol.

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
   - AAS (Australia Awards): Memiliki kuota targeted area khusus Indonesia Timur & luar Jawa dengan syarat IELTS/IPK fleksibel.
   - LPDP (Kemenkeu RI): Jalur Afirmasi Daerah (daerah 3T di Kalimantan, NTT, NTB, Papua, Maluku, Sumatera), Reguler, dan Targeted.
   - MEXT Jepang: Fully funded, uang saku ~144.000 JPY/bulan, bebas biaya kuliah.
   - DAAD EPOS Jerman: Kuliah gratis, uang saku 934 EUR/bulan, asuransi penuh.
   - Chevening Inggris (UK): Fully funded kuliah S2 1 tahun di kampus top UK.
   - Turkiye Burslari: Termasuk kursus bahasa Turki gratis 1 tahun, tiket PP, asrama, uang saku.
   - GKS (Korea Selatan) & Stipendium Hungaricum (Hungaria).

4. Peluang Khusus Anak Daerah (Kalimantan, NTB, NTT, Papua, Sulawesi, Sumatera):
   - Jalur LPDP Afirmasi Daerah 3T (syarat TOEFL/IELTS lebih rendah dan ada kuota khusus).
   - Beasiswa Pemda (seperti Beasiswa Kaltim Tuntas di Kalimantan Timur, beasiswa APBD provinsi/kabupaten).
   - AAS Targeted Area.
   - Tips MandalikaEdu: Kuatkan riset kontribusi daerah di Motivation Letter/esaimu karena komite donor sangat memprioritaskan pelamar daerah yang bertekad membangun kampung halamannya!

5. Kontak & Pemesanan:
   - Nomor WhatsApp Resmi MandalikaEdu: +62 822-4756-3829 (atau 0822-4756-3829)
   - Email: salam@mandalikaedu.id
   - Alamat: Mataram, Nusa Tenggara Barat (Layanan 100% Online menjangkau seluruh Indonesia)

BATASAN TOPIK & GUARDRAIL (SANGAT KETAT):
- Anda HANYA diizinkan menjawab hal-hal yang berkaitan dengan:
  1. Beasiswa luar negeri maupun dalam negeri (LPDP, AAS, MEXT, DAAD, Chevening, Turkiye Burslari, dll.)
  2. Kuliah di luar negeri / dalam negeri, pemilihan universitas, jurusan, jenjang S1/S2/S3
  3. Dokumen aplikasi (Motivation Letter, Esai beasiswa, Europass CV, Surat Rekomendasi)
  4. Tes bahasa Inggris & persiapan studi (IELTS, TOEFL, Duolingo)
  5. Paket layanan bimbingan, biaya, dan Sesi Discovery Gratis MandalikaEdu
  6. Profil mentor alumni beasiswa luar negeri dan kemitraan mentor
  7. Kontak WhatsApp resmi MandalikaEdu (+62 822-4756-3829)
  8. Sapaan sopan (Halo, Assalamu'alaikum, Selamat pagi, Mau tanya, dsb.)
- DILARANG KERAS MENJAWAB PERTANYAAN DI LUAR TOPIK DI ATAS!
  Contoh topik yang DILARANG: cara membeli sayur, resep masakan, otomotif, politik, artis/gosip, ramalan cuaca, koding software umum, tugas PR sekolah/matematika acak, belanja umum, dsb.
- Jika ada pengguna bertanya di luar topik, JANGAN PERNAH memberikan tips atau menjawab pertanyaan tersebut. Langsung tolak dengan sopan dan ramah:
  "Maaf ya Kak, Halo AI khusus dirancang untuk mendampingi persiapan beasiswa, kuliah luar negeri, dan layanan MandalikaEdu 😊.\n\nAda yang bisa kami bantu seputar riset beasiswa, review esai, atau klaim Sesi Discovery Gratis (Rp 0)?"

GAYA BICARA & FORMAT RESPON (WAJIB SINGKAT & HEMAT TOKEN):
- Format WhatsApp: Wajib ringkas, padat, ramah, dan enak dibaca di layar HP (maksimal 60-110 kata atau 2-3 poin pendek saja).
- DILARANG KERAS menulis essay panjang, penjelasan bertele-tele, atau wall of text yang boros token.
- Langsung sebutkan 2-3 peluang beasiswa utama yang relevan untuk daerah penanya (gunakan poin singkat).
- Gunakan spasi enter antar paragraf agar mudah dibaca sekilas.
- Di akhir, tanyakan 1 pertanyaan singkat (misal: "Kakak target S1 atau S2?") dan sebutkan Sesi Discovery Gratis Rp 0 atau WhatsApp resmi.

ATURAN TANDA BACA & TATA BAHASA INDONESIA (WAJIB DIPATUHI):
- DILARANG KERAS menggunakan simbol em dash (—) maupun en dash (–). Jangan pernah menghasilkan tanda pisah panjang tersebut sama sekali.
- Gunakan kata hubung bahasa Indonesia yang baik dan benar (seperti: "yaitu", "seperti", "termasuk", "antara lain"), tanda koma (,), tanda kurung (()), atau tanda titik dua (:).
- Contoh yang DILARANG: "Indonesia—termasuk"
- Contoh yang BENAR: "Indonesia, termasuk" atau "Indonesia (termasuk)"`;

/**
 * Filter pembersih untuk menjamin 0% simbol em dash / en dash dapat lolos ke pengguna
 */
function sanitizePunctuation(text) {
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

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method === 'GET') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          service: 'MandalikaEdu AI Proxy (Cloudflare Worker)',
          model: 'gemini-3.5-flash-lite',
          timestamp: new Date().toISOString(),
          geminiConfigured: Boolean(env.GEMINI_API_KEY),
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (request.method === 'POST') {
      try {
        const apiKey = env.GEMINI_API_KEY;
        if (!apiKey) {
          return new Response(
            JSON.stringify({
              error: 'GEMINI_API_KEY belum disetel di Variables Cloudflare.',
            }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const body = await request.json();
        const incomingMessages = body.messages || [];

        // Susun riwayat percakapan agar Gemini paham alur tanya jawab
        const contents = [];
        let hasUserStarted = false;

        for (const m of incomingMessages) {
          const role = m.role === 'model' ? 'model' : 'user';
          const text = (m.content || m.text || '').trim();
          if (!text) continue;

          if (role === 'user') {
            hasUserStarted = true;
          }

          if (hasUserStarted) {
            if (contents.length > 0 && contents[contents.length - 1].role === role) {
              contents[contents.length - 1].parts[0].text += '\n' + text;
            } else {
              contents.push({ role, parts: [{ text }] });
            }
          }
        }

        if (contents.length === 0) {
          contents.push({ role: 'user', parts: [{ text: 'Halo MandalikaEdu' }] });
        }

        // Panggil Google Gemini 3.5 Flash Lite (model super kilat & stabil)
        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;

        const geminiPayload = {
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 260,
          },
        };

        const geminiRes = await fetch(geminiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(geminiPayload),
        });

        if (!geminiRes.ok) {
          const errText = await geminiRes.text();
          console.error('Gemini API Error:', geminiRes.status, errText);
          return new Response(
            JSON.stringify({
              error: 'Gemini API Error: ' + geminiRes.status,
              details: errText,
            }),
            { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const data = await geminiRes.json();
        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!replyText) {
          return new Response(
            JSON.stringify({ error: 'Empty response from Gemini' }),
            { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const cleanedReply = sanitizePunctuation(replyText);

        return new Response(
          JSON.stringify({
            reply: cleanedReply,
            model: 'gemini-3.5-flash-lite',
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ error: String(err) }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  },
};

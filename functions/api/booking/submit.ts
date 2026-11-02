// Cloudflare Pages Function: /api/booking/submit
// Menangani pendaftaran sesi konsultasi langsung di edge Cloudflare (mandalikaedu.com)
// Mendukung semua perangkat (iPhone, Android, Laptop) secara global

const TELEGRAM_BOT_TOKEN = '9253011123:AAFc9Ws7JdpGX1Sz271cn6fncD-iybikD4U';
const TELEGRAM_CHAT_ID = '2126895475';
const ADMIN_EMAIL = 'admin@mandalikaedu.com';
const GMAIL_USER = 'rahman.udemy.manager@gmail.com';
const GMAIL_APP_PASSWORD = 'ksjpbhwjbvlaorlg';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Kirim notifikasi instan ke Telegram Admin
async function sendTelegramNotification(text: string, waUrl: string) {
  try {
    const payload = {
      chat_id: TELEGRAM_CHAT_ID,
      text: text,
      parse_mode: 'Markdown',
      disable_web_page_preview: false,
      reply_markup: {
        inline_keyboard: [
          [{ text: '💬 Hubungi Siswa via WhatsApp', url: waUrl }]
        ]
      }
    };

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error('Error sending Telegram alert from Pages Function:', err);
  }
}

// Kirim notifikasi email resmi via SMTP Google menggunakan socket TLS
async function sendSmtpEmail(
  subject: string, 
  text: string, 
  html: string,
  replyTo?: { name?: string; email?: string }
) {
  try {
    // @ts-ignore - cloudflare:sockets tersedia di runtime Cloudflare Pages
    const { connect } = await import('cloudflare:sockets');
    const socket = connect(
      { hostname: 'smtp.gmail.com', port: 465 },
      { secureTransport: 'on' }
    );

    const reader = socket.readable.getReader();
    const writer = socket.writable.getWriter();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    let buffer = '';
    async function readResponse(): Promise<string> {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\r\n');
        for (const line of lines) {
          // Format respons SMTP: 3 angka diikuti spasi (misal '220 ', '250 ')
          if (/^\d{3} /.test(line)) {
            const res = buffer;
            buffer = '';
            return res;
          }
        }
      }
      const res = buffer;
      buffer = '';
      return res;
    }

    async function sendCommand(cmd: string): Promise<string> {
      await writer.write(encoder.encode(cmd + '\r\n'));
      return await readResponse();
    }

    // 1. Baca sambutan server Google
    await readResponse();

    // 2. Handshake EHLO
    await sendCommand('EHLO mandalikaedu.com');

    // 3. Otentikasi LOGIN dengan App Password
    await sendCommand('AUTH LOGIN');
    await sendCommand(btoa(GMAIL_USER));
    await sendCommand(btoa(GMAIL_APP_PASSWORD));

    // 4. Pengirim dan Penerima resmi (hanya admin@mandalikaedu.com)
    await sendCommand(`MAIL FROM:<${ADMIN_EMAIL}>`);
    await sendCommand(`RCPT TO:<${ADMIN_EMAIL}>`);

    // 5. Kirim isi pesan email berformat MIME
    await sendCommand('DATA');

    const replyToHeader = replyTo && replyTo.email 
      ? `Reply-To: "${replyTo.name || 'Calon Siswa'}" <${replyTo.email}>` 
      : `Reply-To: "MandalikaEdu Official" <${ADMIN_EMAIL}>`;

    const boundary = '----=_Part_' + Date.now();
    const emailData = [
      `From: "MandalikaEdu Official" <${ADMIN_EMAIL}>`,
      `To: ${ADMIN_EMAIL}`,
      replyToHeader,
      `Subject: ${subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      ``,
      `--${boundary}`,
      `Content-Type: text/plain; charset=UTF-8`,
      `Content-Transfer-Encoding: 8bit`,
      ``,
      text,
      ``,
      `--${boundary}`,
      `Content-Type: text/html; charset=UTF-8`,
      `Content-Transfer-Encoding: 8bit`,
      ``,
      html,
      ``,
      `--${boundary}--`,
      `.`
    ].join('\r\n');

    await sendCommand(emailData);
    await sendCommand('QUIT');

    try {
      socket.close();
    } catch {}
  } catch (err) {
    console.error('SMTP dispatch error in Pages Function:', err);
  }
}

export const onRequestOptions = async () => {
  return new Response(null, { status: 204, headers: corsHeaders });
};

export const onRequestPost = async (context: any) => {
  try {
    const data = await context.request.json();
    const {
      studentName,
      studentWhatsapp,
      studentEmail,
      originCity,
      targetCountry = 'Umum',
      studyLevel = 'S2',
      packageName = 'Sesi Discovery',
      priceFormatted = 'Rp 0',
      preferredDate = 'Segera',
      preferredTime = '19:30 WIB (Malam)',
      notes = '',
      firestoreBookingId
    } = data;

    if (!studentName || !studentWhatsapp) {
      return new Response(JSON.stringify({ error: 'Nama dan WhatsApp wajib diisi' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const bookingId = firestoreBookingId || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Standarisasi nomor WhatsApp
    const digitsOnly = String(studentWhatsapp).replace(/[^0-9]/g, '');
    const studentWaStandard = digitsOnly.startsWith('0') 
      ? '62' + digitsOnly.slice(1) 
      : digitsOnly.startsWith('62') 
        ? digitsOnly 
        : '62' + digitsOnly;

    const studentWaChatUrl = `https://wa.me/${studentWaStandard}?text=${encodeURIComponent(
      `Halo ${studentName}, salam hangat dari Tim Konsultan MandalikaEdu.\n\n` +
      `Kami telah menerima formulir pengajuan bimbingan ${packageName} (${studyLevel} ke ${targetCountry}) yang Anda kirimkan melalui website resmi kami.\n\n` +
      `Apakah waktu konsultasi ${preferredDate} jam ${preferredTime} masih sesuai untuk kita jadwalkan?`
    )}`;

    const telegramText = 
      `📋 *PENDAFTARAN KONSULTASI BARU*\n` +
      `*Kode Tiket*: \`${bookingId}\`\n\n` +
      `👤 *Nama Siswa*: ${studentName}\n` +
      `📍 *Asal Daerah*: ${originCity || '-'}\n` +
      `📦 *Paket Layanan*: ${packageName} (${priceFormatted})\n` +
      `🎯 *Target Studi*: ${studyLevel} ke ${targetCountry}\n` +
      `⏰ *Jadwal Sesi*: ${preferredDate} jam ${preferredTime}\n` +
      `📝 *Kendala*: ${notes || '(Tidak ada kendala spesifik)'}\n` +
      `📱 *WhatsApp Siswa*: +${studentWaStandard}\n\n` +
      `👉 *Hubungi Siswa via WhatsApp (Sekali Klik):*\n` +
      `${studentWaChatUrl}`;

    const emailSubject = `[PENDAFTARAN KONSULTASI BARU] ${packageName} - ${studentName} (${originCity || '-'})`;
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
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">Tiket ID: ${bookingId}</p>
    </div>
    <div class="body">
      <div class="row"><span class="lbl">Nama Siswa:</span><span class="val">${studentName}</span></div>
      <div class="row"><span class="lbl">Asal Daerah:</span><span class="val">${originCity || '-'}</span></div>
      <div class="row"><span class="lbl">Paket Layanan:</span><span class="val">${packageName} (${priceFormatted})</span></div>
      <div class="row"><span class="lbl">Target Studi:</span><span class="val">${studyLevel} ke ${targetCountry}</span></div>
      <div class="row"><span class="lbl">Jadwal Sesi:</span><span class="val">${preferredDate} jam ${preferredTime}</span></div>
      <div class="row"><span class="lbl">WhatsApp Siswa:</span><span class="val">+${studentWaStandard}</span></div>
      <div class="row"><span class="lbl">Email Siswa:</span><span class="val">${studentEmail || '(Tidak dicantumkan)'}</span></div>
      <div class="row"><span class="lbl">Kendala / Catatan:</span><span class="val">${notes || '(Tidak ada kendala spesifik)'}</span></div>

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

    // Jalankan pengiriman Telegram dan Email secara paralel di background worker
    if (context.waitUntil) {
      context.waitUntil(
        Promise.all([
          sendTelegramNotification(telegramText, studentWaChatUrl),
          sendSmtpEmail(emailSubject, telegramText, emailHtml, { name: studentName, email: studentEmail })
        ])
      );
    } else {
      await Promise.all([
        sendTelegramNotification(telegramText, studentWaChatUrl),
        sendSmtpEmail(emailSubject, telegramText, emailHtml, { name: studentName, email: studentEmail })
      ]);
    }

    return new Response(
      JSON.stringify({
        success: true,
        bookingId: bookingId,
        message: 'Data formulir berhasil dicatat dan notifikasi telah dikirimkan ke admin.'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Gagal memproses data: ' + err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

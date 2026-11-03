// Cloudflare Pages Function: /api/mentor/submit
// Menangani pendaftaran mentor langsung di edge Cloudflare (mandalikaedu.com)

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

async function sendTelegramNotification(text: string, waUrl: string) {
  try {
    const payload = {
      chat_id: TELEGRAM_CHAT_ID,
      text: text,
      parse_mode: 'Markdown',
      disable_web_page_preview: false,
      reply_markup: {
        inline_keyboard: [
          [{ text: '💬 Hubungi Mentor via WhatsApp', url: waUrl }]
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

async function sendSmtpEmail(
  subject: string, 
  text: string, 
  html: string,
  replyTo?: { name?: string; email?: string }
) {
  try {
    // @ts-ignore - cloudflare:sockets
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

    await readResponse();
    await sendCommand('EHLO mandalikaedu.com');
    await sendCommand('AUTH LOGIN');
    await sendCommand(btoa(GMAIL_USER));
    await sendCommand(btoa(GMAIL_APP_PASSWORD));
    await sendCommand(`MAIL FROM:<${ADMIN_EMAIL}>`);
    await sendCommand(`RCPT TO:<${ADMIN_EMAIL}>`);
    await sendCommand('DATA');

    const replyToHeader = replyTo && replyTo.email 
      ? `Reply-To: "${replyTo.name || 'Calon Mentor'}" <${replyTo.email}>` 
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
      fullName,
      whatsapp,
      email,
      originCity = '-',
      university,
      country,
      major = '',
      level = 'S2',
      scholarship = 'Mandiri / Jalur Lain',
      hoursPerWeek = '3-5 jam/minggu',
      linkedinOrIg = '',
    } = data;

    if (!fullName || !whatsapp) {
      return new Response(JSON.stringify({ error: 'Nama dan WhatsApp wajib diisi' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const mentorId = `mentor_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const digitsOnly = String(whatsapp).replace(/[^0-9]/g, '');
    const mentorWaStandard = digitsOnly.startsWith('0') 
      ? '62' + digitsOnly.slice(1) 
      : digitsOnly.startsWith('62') 
        ? digitsOnly 
        : '62' + digitsOnly;

    const mentorWaChatUrl = `https://wa.me/${mentorWaStandard}?text=${encodeURIComponent(
      `Halo ${fullName}, salam dari Tim MandalikaEdu.\n\n` +
      `Terima kasih telah mendaftar sebagai Calon Mentor untuk pendampingan negara ${country} (${university}). Berkas Anda telah kami terima dan kami ingin mengundang Anda untuk sesi perkenalan singkat.`
    )}`;

    const telegramText = 
      `🎓 *PENDAFTARAN MENTOR BARU*\n` +
      `*Kode Mentor*: \`${mentorId}\`\n\n` +
      `👤 *Nama*: ${fullName}\n` +
      `🏫 *Kampus*: ${university} (${country})\n` +
      `🎓 *Jurusan & Jenjang*: ${level} ${major}\n` +
      `🏆 *Beasiswa*: ${scholarship}\n` +
      `📍 *Kota Asal*: ${originCity}\n` +
      `⏰ *Ketersediaan*: ${hoursPerWeek}\n` +
      `📱 *WhatsApp Mentor*: +${mentorWaStandard}\n\n` +
      `👉 *Hubungi Mentor via WhatsApp (Sekali Klik):*\n` +
      `${mentorWaChatUrl}`;

    const mentorEmailSubject = `[PENDAFTARAN MENTOR BARU] ${fullName} - ${university} (${country})`;
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
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">Kode Mentor: ${mentorId}</p>
    </div>
    <div class="body">
      <div class="row"><span class="lbl">Nama:</span><span class="val">${fullName}</span></div>
      <div class="row"><span class="lbl">Kampus & Negara:</span><span class="val">${university} (${country})</span></div>
      <div class="row"><span class="lbl">Jurusan & Jenjang:</span><span class="val">${level} ${major}</span></div>
      <div class="row"><span class="lbl">Beasiswa:</span><span class="val">${scholarship}</span></div>
      <div class="row"><span class="lbl">Kota Asal:</span><span class="val">${originCity}</span></div>
      <div class="row"><span class="lbl">Ketersediaan Waktu:</span><span class="val">${hoursPerWeek}</span></div>
      <div class="row"><span class="lbl">WhatsApp:</span><span class="val">+${mentorWaStandard}</span></div>
      <div class="row"><span class="lbl">Email:</span><span class="val">${email || '-'}</span></div>
      <div class="row"><span class="lbl">LinkedIn / IG:</span><span class="val">${linkedinOrIg || '-'}</span></div>

      <a href="${mentorWaChatUrl}" class="btn" target="_blank">
        👉 Hubungi Mentor via WhatsApp (Sekali Klik)
      </a>
      ${email ? `
      <a href="mailto:${email}?subject=${encodeURIComponent(`[MandalikaEdu] Konfirmasi Pendaftaran Calon Mentor - ${fullName}`)}&body=${encodeURIComponent(`Halo ${fullName},\n\nTerima kasih telah mendaftar sebagai Calon Mentor di MandalikaEdu (${university}, ${country}). Berkas dan data Anda telah kami terima.\n\nKami mengundang Anda untuk sesi perkenalan singkat via Google Meet. Mohon informasikan ketersediaan waktu luang Anda.\n\nSalam hangat,\nTim Rekrutmen MandalikaEdu\nadmin@mandalikaedu.com`)}" style="display: block; background: #0284c7; color: #ffffff !important; text-align: center; text-decoration: none; padding: 14px 20px; border-radius: 12px; font-weight: 700; font-size: 15px; margin: 8px 0 12px 0;">
        ✉️ Balas / Kirim Email ke Mentor (Sekali Klik)
      </a>` : ''}
    </div>
    <div class="foot">
      Sistem Notifikasi Resmi MandalikaEdu &bull; admin@mandalikaedu.com
    </div>
  </div>
</body>
</html>`;

    if (context.waitUntil) {
      context.waitUntil(
        Promise.all([
          sendTelegramNotification(telegramText, mentorWaChatUrl),
          sendSmtpEmail(mentorEmailSubject, telegramText, mentorEmailHtml, { name: fullName, email: email })
        ])
      );
    } else {
      await Promise.all([
        sendTelegramNotification(telegramText, mentorWaChatUrl),
        sendSmtpEmail(mentorEmailSubject, telegramText, mentorEmailHtml, { name: fullName, email: email })
      ]);
    }

    return new Response(
      JSON.stringify({
        success: true,
        mentorId: mentorId,
        message: 'Pendaftaran mentor berhasil dicatat.'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Gagal memproses pendaftaran mentor: ' + err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

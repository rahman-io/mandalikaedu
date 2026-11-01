import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cached base64 assets to ensure sub-millisecond generation
let logoBase64 = '';
let manduBase64 = '';
let studentsBase64 = '';

function loadAssetBase64(filePath: string): string {
  try {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath).toString('base64');
    }
  } catch (e) {
    console.error('Failed to load asset for OG image:', filePath, e);
  }
  return '';
}

export function getDynamicOgSvg(options?: {
  headline?: string;
  subheadline?: string;
  scholarshipsCount?: string;
}): string {
  const rootDir = path.resolve(__dirname, '../../');
  if (!logoBase64) {
    logoBase64 = loadAssetBase64(path.join(rootDir, 'public/apple-touch-icon.png'));
  }
  if (!manduBase64) {
    manduBase64 = loadAssetBase64(path.join(rootDir, 'public/assets/mandu-og.png'));
  }
  if (!studentsBase64) {
    studentsBase64 = loadAssetBase64(path.join(rootDir, 'public/assets/students.jpg'));
    if (!studentsBase64) {
      studentsBase64 = loadAssetBase64('/tmp/students.jpg');
    }
  }

  const countLabel = options?.scholarshipsCount ?? '600+';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <!-- Background Grid Pattern matching web eduvance-grid -->
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#f1f5f9" stroke-width="1.2"/>
    </pattern>
    
    <!-- Gradients -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#f8faff"/>
      <stop offset="100%" stop-color="#eff6ff"/>
    </linearGradient>

    <radialGradient id="glowSky" cx="75%" cy="45%" r="45%">
      <stop offset="0%" stop-color="#bae6fd" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="glowAmber" cx="20%" cy="20%" r="35%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>

    <!-- Clip Path for Student Photo -->
    <clipPath id="photoClip">
      <rect x="755" y="115" width="370" height="360" rx="20" ry="20"/>
    </clipPath>

    <!-- Clip Path for Mandu Avatar -->
    <clipPath id="manduClip">
      <circle cx="1110" cy="525" r="40"/>
    </clipPath>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glowSky)"/>
  <rect width="1200" height="630" fill="url(#glowAmber)"/>

  <!-- Top Left: Logo & Brand -->
  <g transform="translate(60, 48)">
    ${logoBase64 ? `<image href="data:image/png;base64,${logoBase64}" x="0" y="0" width="44" height="44"/>` : ''}
    <text x="54" y="26" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="22" font-weight="bold" fill="#0f172a">Mandalika<tspan fill="#ea580c">Edu</tspan></text>
    <text x="54" y="42" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748b">Bimbingan Kuliah Luar Negeri</text>
  </g>

  <!-- Left Content Column -->
  <g transform="translate(60, 126)">
    <!-- Pill Badge -->
    <rect x="0" y="0" width="415" height="32" rx="16" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>
    <text x="18" y="21" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#1d4ed8">Best Learning Platform  •  Khusus Putra-Putri Daerah</text>

    <!-- Big Headline Line 1: Wujudkan Kuliah Dunia * -->
    <g transform="translate(0, 46)">
      <!-- Yellow Tag Box for Wujudkan -->
      <rect x="0" y="0" width="252" height="62" rx="16" fill="#fef3c7" stroke="#f59e0b" stroke-width="2.5"/>
      <text x="22" y="45" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="38" font-weight="bold" fill="#0f172a">Wujudkan</text>
      
      <text x="272" y="45" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="38" font-weight="bold" fill="#0f172a">Kuliah Dunia</text>
      <text x="552" y="45" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="36" font-weight="bold" fill="#f472b6">*</text>
    </g>

    <!-- Big Headline Line 2: Dengan Beasiswa Penuh -->
    <g transform="translate(0, 118)">
      <text x="0" y="45" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="42" font-weight="bold" fill="#0f172a">Dengan <tspan fill="#2563eb">Beasiswa Penuh</tspan></text>
    </g>

    <!-- Humanized Sub-headline -->
    <g transform="translate(0, 185)">
      <text x="0" y="20" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="18" font-weight="bold" fill="#334155">Mimpi kuliah di luar negeri bukan cuma milik kota besar.</text>
      <text x="0" y="48" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="16" font-weight="normal" fill="#475569">Dari mana pun asalmu, kami dampingi perjuanganmu dari nol bersama</text>
      <text x="0" y="72" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="16" font-weight="normal" fill="#475569">mentor alumni, mulai dari kurasi beasiswa tepat sasaran,</text>
      <text x="0" y="96" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="16" font-weight="normal" fill="#475569">bedah esai mendalam, hingga siap berangkat ke kampus impian.</text>
    </g>

    <!-- Action Pill Button -->
    <g transform="translate(0, 312)">
      <rect x="0" y="0" width="275" height="44" rx="12" fill="#fbbf24"/>
      <text x="20" y="28" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#0f172a" letter-spacing="0.5">KONSULTASI GRATIS (20 MENIT) →</text>
    </g>

    <!-- Stats Row -->
    <g transform="translate(0, 386)">
      <text x="0" y="32" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="34" font-weight="bold" fill="#0f172a">120+</text>
      <text x="0" y="50" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#64748b">Siswa Lolos Beasiswa</text>

      <line x1="160" y1="10" x2="160" y2="52" stroke="#cbd5e1" stroke-width="1.5"/>

      <text x="185" y="32" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="34" font-weight="bold" fill="#0f172a">${countLabel}</text>
      <text x="185" y="50" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#64748b">Pilihan Kampus &amp; Beasiswa</text>

      <line x1="375" y1="10" x2="375" y2="52" stroke="#cbd5e1" stroke-width="1.5"/>

      <text x="400" y="32" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="34" font-weight="bold" fill="#0f172a">100%</text>
      <text x="400" y="50" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#64748b">Online Ramah Daerah</text>
    </g>
  </g>

  <!-- Right Column: Student Card Composition -->
  <g>
    <!-- Card Frame Outer Glow & Border -->
    <rect x="735" y="65" width="410" height="475" rx="28" fill="#ffffff" stroke="#bfdbfe" stroke-width="2"/>
    <rect x="745" y="75" width="390" height="455" rx="22" fill="#f8faff"/>

    <!-- Student Photo -->
    ${studentsBase64 ? `
    <g clip-path="url(#photoClip)">
      <image href="data:image/jpeg;base64,${studentsBase64}" x="755" y="115" width="370" height="360" preserveAspectRatio="xMidYMid slice"/>
    </g>` : ''}

    <!-- Floating Badge 1 (Top Left): 96% Kepuasan Siswa -->
    <g transform="translate(760, 85)">
      <rect width="160" height="52" rx="16" fill="#ffffff" stroke="#f1f5f9" stroke-width="1.5"/>
      <!-- Circle 96% -->
      <circle cx="30" cy="26" r="16" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
      <text x="30" y="31" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">96%</text>
      <text x="54" y="22" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="11" font-weight="bold" fill="#0f172a">Kepuasan Siswa</text>
      <text x="54" y="36" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="10" font-weight="500" fill="#64748b">Mentoring 1-on-1</text>
    </g>

    <!-- Floating Badge 2 (Top Right): Video Pink Button -->
    <g transform="translate(1080, 85)">
      <rect width="45" height="45" rx="16" fill="#ec4899"/>
      <!-- Camera Icon SVG Path -->
      <path d="M15 17 h10 a2 2 0 0 1 2 2 v8 a2 2 0 0 1 -2 2 h-10 a2 2 0 0 1 -2 -2 v-8 a2 2 0 0 1 2 -2 z M27 20 l6 -3 v12 l-6 -3 z" fill="#ffffff"/>
    </g>

    <!-- Floating Badge 3 (Bottom Center of Card): 120+ anak daerah -->
    <g transform="translate(780, 435)">
      <rect width="280" height="44" rx="16" fill="#ffffff" stroke="#f1f5f9" stroke-width="1.5"/>
      <!-- Mini avatar dots -->
      <circle cx="24" cy="22" r="10" fill="#3b82f6"/>
      <circle cx="40" cy="22" r="10" fill="#10b981" stroke="#ffffff" stroke-width="1.5"/>
      <circle cx="56" cy="22" r="10" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5"/>
      <text x="74" y="27" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="11" font-weight="bold" fill="#0f172a">120+ anak daerah tembus beasiswa</text>
    </g>

    <!-- Floating Mandu Avatar Button in Corner -->
    <g transform="translate(0, 0)">
      <circle cx="1110" cy="525" r="42" fill="#ffffff" stroke="#3b82f6" stroke-width="3"/>
      ${manduBase64 ? `
      <g clip-path="url(#manduClip)">
        <image href="data:image/png;base64,${manduBase64}" x="1070" y="485" width="80" height="80"/>
      </g>` : ''}
      <!-- Online Green Dot -->
      <circle cx="1138" cy="545" r="7" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
      <!-- Notification 1 -->
      <circle cx="1138" cy="495" r="9" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
      <text x="1138" y="499" font-family="DejaVu Sans, Liberation Sans, -apple-system, sans-serif" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    </g>
  </g>
</svg>`;
}

export function generateOgPngBuffer(options?: {
  headline?: string;
  subheadline?: string;
  scholarshipsCount?: string;
}): Buffer {
  const svg = getDynamicOgSvg(options);
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  });
  const pngData = resvg.render();
  return Buffer.from(pngData.asPng());
}

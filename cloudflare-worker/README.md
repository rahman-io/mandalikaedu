# Panduan Menyiapkan Cloudflare Worker untuk AI MandalikaEdu

Dokumen ini berisi panduan langkah-demi-langkah bagi Anda (bahkan jika masih awam) untuk memasang **Google Gemini Flash AI** secara **100% GRATIS dan AMAN** menggunakan Cloudflare Workers.

Dengan cara ini:
- API Key Google Anda **tersimpan di brankas Cloudflare (Secret)**, bukan di kode GitHub Pages publik.
- Orang lain tidak akan bisa mencuri atau menyalahgunakan API Key Anda.
- Kuota gratis Cloudflare: **100.000 panggilan per hari** (sangat besar untuk web beasiswa).
- Kuota gratis Google AI Studio: **1.500 panggilan per hari**.

---

## Langkah 1: Siapkan API Key Google Gemini (Gratis)
1. Buka situs [Google AI Studio](https://aistudio.google.com/).
2. Login dengan akun Google Anda (misalnya: `rahman.udemy.manager@gmail.com`).
3. Klik tombol **"Get API key"** di pojok kiri atas.
4. Klik **"Create API key"** -> pilih **"Create API key in new project"**.
5. Salin kodenya (contoh: `AIzaSy...`). Simpan sementara di catatan pribadi Anda.

---

## Langkah 2: Buat Akun Cloudflare (Gratis)
1. Buka [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up).
2. Masukkan email & password untuk mendaftar (100% Gratis, tidak perlu kartu kredit).
3. Setelah login ke dashboard Cloudflare:
   - Di menu sebelah kiri, cari dan klik **"Workers & Pages"** (atau "Compute (Workers)").
   - Klik tombol biru **"Create Application"** (atau **"Create Worker"**).
   - Beri nama worker Anda, misalnya: `mandalikaedu-ai`.
   - Klik **"Deploy"** (Worker kosong awal akan langsung terbuat).

---

## Langkah 3: Masukkan Kode Worker
1. Di halaman Worker yang baru Anda buat, klik tombol **"Edit code"** (di pojok kanan atas).
2. Hapus seluruh kode contoh bawaan di sebelah kiri.
3. Buka file `cloudflare-worker/worker.js` di proyek ini, **salin semua isinya (Copy)**, lalu **tempel (Paste)** ke editor Cloudflare.
4. Klik tombol **"Deploy"** (atau **"Save and Deploy"**) di pojok kanan atas.

---

## Langkah 4: Simpan API Key Anda di Cloudflare (Penting!)
Agar Worker bisa menghubungi Google Gemini tanpa membocorkan API key ke publik:
1. Kembali ke halaman utama worker Anda (`mandalikaedu-ai`).
2. Klik tab **"Settings"** (Pengaturan).
3. Pilih menu **"Variables and Secrets"** (atau "Variables").
4. Di bagian **Environment Variables / Secrets**, klik **"Add"**:
   - Kolom **Variable name**: ketik persis `GEMINI_API_KEY` (huruf kapital semua).
   - Kolom **Value**: tempelkan API key Google Anda dari Langkah 1 (`AIzaSy...`).
   - Centang opsi **"Encrypt"** (Enkripsi / Secret) jika ada, agar terkunci aman.
5. Klik **"Save"** atau **"Deploy"**.

---

## Langkah 5: Salin URL Worker & Pasang di Web MandalikaEdu
1. Di halaman ringkasan Worker, salin alamat URL Worker Anda.
   Bentuknya seperti: `https://mandalikaedu-ai.<nama-akun-anda>.workers.dev`
2. Buka web MandalikaEdu Anda.
3. Buka pop-up Chatbot WhatsApp di pojok kanan bawah.
4. Klik ikon ⚙️ **Pengaturan** di jendela chat, atau klik teks **"(Ubah)"** di dekat nomor WA.
5. Buka tab **"Koneksi AI (Cloudflare Worker)"**.
6. Tempelkan URL Worker Anda ke kolom yang tersedia, lalu klik tombol **"Test Koneksi"**.
7. Jika muncul pesan hijau *"Berhasil terhubung!"*, klik **"Simpan URL Worker"**.

Selesai! Sekarang chatbot di web MandalikaEdu Anda di GitHub Pages sudah ditenagai oleh Google Gemini Flash tercerdas, dengan respon seputar beasiswa & paket bimbingan daerah secara otomatis dan terlindungi 100%.

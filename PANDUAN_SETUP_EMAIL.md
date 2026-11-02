# Panduan Lengkap Setup Email Resmi: admin@mandalikaedu.com (100% Gratis)

Sistem notifikasi email otomatis sudah aktif di server MandalikaEdu. Ikuti 3 langkah mudah berikut untuk menghubungkan email domain korporat Anda dengan akun Gmail pribadi secara gratis dan aman:

---

## Langkah 1: Aktifkan Cloudflare Email Routing (Menerima Email Masuk)
1. Buka [dash.cloudflare.com](https://dash.cloudflare.com/) dan login ke akun Cloudflare tempat domain `mandalikaedu.com` berada.
2. Klik domain **mandalikaedu.com**.
3. Di menu sebelah kiri, klik **"Email Routing"** (atau **"Email"**).
4. Klik tombol **"Get Started"** / **"Enable Email Routing"**.
5. Di bagian **Destination addresses** (Alamat Tujuan):
   - Masukkan: `rahman.udemy.manager@gmail.com`.
   - Buka inbox Gmail Anda, cari email verifikasi dari Cloudflare, lalu klik tautan verifikasi.
6. Di bagian **Custom addresses** (Aturan Rute):
   - Custom address: ketik `admin` (sehingga menjadi `admin@mandalikaedu.com`).
   - Action: **Send to**.
   - Destination: pilih `rahman.udemy.manager@gmail.com`.
   - Klik **Save**.
7. Jika Cloudflare meminta penambahan DNS record (MX dan TXT), klik tombol otomatis **"Add records and enable"**.

*Selesai! Sekarang semua email yang dikirim ke `admin@mandalikaedu.com` akan otomatis masuk ke Gmail Anda.*

---

## Langkah 2: Buat Sandi Aplikasi Google (App Password)
Agar server website dan Gmail Anda bisa mengirim email atas nama `admin@mandalikaedu.com`:
1. Buka [myaccount.google.com](https://myaccount.google.com/) menggunakan akun `rahman.udemy.manager@gmail.com`.
2. Klik tab **"Keamanan" (Security)** di menu sebelah kiri.
3. Pastikan **Verifikasi 2 Langkah (2-Step Verification)** sudah dalam kondisi **Aktif (ON)**.
4. Di bilah pencarian paling atas halaman Google Account, ketik: **`Sandi aplikasi`** (atau **`App passwords`**), lalu pilih menu tersebut.
5. Beri nama aplikasi: ketik `MandalikaEdu Website`, lalu klik **Buat (Create)**.
6. Google akan memunculkan kode sandi 16 huruf kuning (contoh: `abcd efgh ijkl mnop`).
7. Salin kode 16 huruf tersebut (simpan baik-baik).

---

## Langkah 3: Atur "Send Mail As" di Gmail (Balas/Kirim Atas Nama Admin)
1. Buka [mail.google.com](https://mail.google.com/) di laptop/komputer.
2. Klik ikon ⚙️ **Pengaturan (Settings)** di pojok kanan atas -> klik **"Lihat semua setelan" (See all settings)**.
3. Pilih tab **"Akun dan Impor" (Accounts and Import)**.
4. Cari bagian **"Kirim email sebagai" (Send mail as)** -> klik **"Tambahkan alamat email lain" (Add another email address)**.
5. Di jendela pop-up yang muncul:
   - **Nama:** `MandalikaEdu Official`
   - **Alamat email:** `admin@mandalikaedu.com`
   - Centang **"Perlakukan sebagai alias" (Treat as an alias)**.
   - Klik **Langkah Berikutnya (Next Step)**.
6. Masukkan pengaturan SMTP:
   - **Server SMTP:** `smtp.gmail.com`
   - **Port:** `465` (atau `587`)
   - **Nama Pengguna:** `rahman.udemy.manager@gmail.com`
   - **Sandi:** Masukkan kode 16 huruf Sandi Aplikasi dari Langkah 2 di atas.
   - Pilih: **Koneksi aman menggunakan SSL** (jika port 465) atau **TLS** (jika port 587).
   - Klik **Tambahkan Akun (Add Account)**.
7. Google akan mengirimkan kode konfirmasi angka ke inbox `admin@mandalikaedu.com` (yang sudah langsung masuk ke Gmail Anda). Buka email tersebut, salin kodenya, dan masukkan ke jendela pop-up untuk verifikasi.

---

## Selesai! 🎉
- Setiap ada pendaftaran baru di web, rincian data siswa + tombol hijau chat WhatsApp sekali klik akan langsung mendarat di Gmail Anda.
- Jika Anda ingin membalas siswa lewat email, tinggal pilih **Dari: admin@mandalikaedu.com**.

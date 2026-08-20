# NEXORA SERVICE — Premium Portfolio Web

Premium AC Service Management System built with **HTML5 + CSS3 + Vanilla JavaScript**.

## Cara Menjalankan

Frontend tidak membutuhkan build process.

Gunakan salah satu cara:
1. Buka folder project.
2. Jalankan `index.html` melalui VS Code Live Server atau static server.
3. Atau deploy langsung ke Vercel sebagai static frontend.

## Login Demo

Masukkan username/email dan password apa pun yang tidak kosong.

Login ini khusus portfolio demo dan **bukan autentikasi production**.

## Modul

- Login premium dengan animasi
- Dashboard
- Buat Nota + live invoice preview
- Multiple service items
- Kalkulasi subtotal, diskon, biaya tambahan, pajak, pembayaran, sisa
- Simpan Nota
- Cetak invoice
- Kirim Invoice (workflow demo + backend scaffold)
- Riwayat Nota
- Jadwal Pekerjaan
- Pelanggan + unit AC
- Teknisi
- Monitoring Teknisi dengan dispatch-style demo map
- Aktivitas Teknisi
- Backup
- Pengaturan
- Global Search
- Toast & confirmation modal

## Data Portfolio

Data interaktif demo disimpan menggunakan `localStorage`.

Tidak ada SQL/database schema di project ini.

## WhatsApp

Frontend memanggil:

`POST /api/invoices/send-whatsapp`

Credential **tidak pernah** disimpan di frontend.

Contoh serverless endpoint tersedia di:
- `api/invoices/send-whatsapp.js`
- `api/whatsapp/test-connection.js`

Isi `.env.example` hanya contoh nama variabel, bukan secret asli.

## Production Requirements

Untuk deployment production, tambahkan:
- secure backend authentication
- authorization / role checks
- database
- server-side invoice persistence
- real backup service
- WhatsApp provider/bot resmi atau tepercaya
- delivery logs
- audit logging
- validation dan rate limiting

## Location Privacy

Monitoring lokasi hanya dimodelkan untuk pekerjaan yang diotorisasi. Demo map bersifat visual portfolio dan tidak mengakses GPS perangkat.

## Icon System

Semua core icon tersedia lokal di `assets/icons/`.

Tidak menggunakan:
- Font Awesome CDN
- Bootstrap Icons CDN
- remote icon URLs
- emoji sebagai interface icons

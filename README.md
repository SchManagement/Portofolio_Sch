# Portfolio Muhammad Hilman Alfiqri

Website portfolio premium berbasis **HTML5, CSS3, dan Vanilla JavaScript**. Tidak menggunakan framework, package manager, build tool, atau dependency JavaScript eksternal.

## Teknologi

- HTML5
- CSS3
- Vanilla JavaScript
- IntersectionObserver
- CSS Grid & Flexbox
- CSS custom properties

## Struktur

```text
portfolio/
├── index.html
├── style.css
├── app.js
├── README.md
├── assets/
│   ├── images/
│   │   └── og-cover.svg
│   ├── icons/
│   └── projects/
│       └── README.txt
└── favicon/
    └── favicon.svg
```

## Menjalankan Website

### Cara paling sederhana

Buka `index.html` langsung di browser.

### Static HTTP server

Jika Python tersedia:

```bash
python -m http.server 8080
```

Lalu buka:

```text
http://localhost:8080
```

## Mengatur Kontak

Edit objek `PROFILE` di bagian paling atas `app.js`:

```js
const PROFILE = {
  name: "Muhammad Hilman Alfiqri",
  role: "Web Application Developer & Digital Solution Builder",
  whatsapp: "628xxxxxxxxxx",
  email: "nama@email.com",
  github: "https://github.com/username"
};
```

Catatan:

- Nomor WhatsApp sebaiknya menggunakan format internasional tanpa tanda `+`, misalnya `62812...`.
- Jika suatu field kosong, opsi kontak tersebut otomatis disembunyikan.
- CTA utama otomatis mengarah ke WhatsApp ketika nomor sudah diisi. Jika kosong, CTA kembali ke section Kontak.

## Mengganti Screenshot Project

Saat screenshot asli sudah tersedia, Anda dapat menambahkannya ke:

```text
assets/projects/
```

Contoh nama file:

```text
assets/projects/lorhil-dashboard.webp
assets/projects/lorhil-technician-mobile.webp
```

Layout saat ini menggunakan mockup CSS agar website tetap terlihat lengkap tanpa aset eksternal. Mockup dapat dipertahankan, atau bagian visual pada `index.html` dapat diganti dengan elemen `<img>` tanpa mengubah struktur section lain.

Contoh:

```html
<img
  class="project-real-image"
  src="assets/projects/lorhil-dashboard.webp"
  alt="Dashboard LORHIL AC Management System"
  loading="lazy"
/>
```

Gunakan `object-fit: cover` atau `object-fit: contain` sesuai screenshot.

## Menambah Project Baru

Project konseptual lain disimpan pada array `projects` di `app.js`:

```js
const projects = [
  {
    title: "Nama Project",
    category: "Status Project",
    description: "Deskripsi singkat.",
    technologies: ["HTML", "JavaScript"]
  }
];
```

Card akan dirender otomatis ke bagian "Project & Eksperimen Lainnya".

## SEO & Open Graph

Sebelum production:

1. Ganti canonical URL `https://example.com/` di `index.html`.
2. Ganti `og:url` dengan domain production.
3. Opsional: ganti `assets/images/og-cover.svg` dengan `og-cover.webp` berukuran 1200×630.
4. Sesuaikan favicon bila diperlukan.

## Deployment

### Vercel

Upload folder repository dan deploy sebagai static project. Tidak ada build command.

### GitHub Pages

Push isi folder ke repository GitHub, lalu aktifkan GitHub Pages dari branch yang digunakan.

### Netlify

Drag-and-drop folder portfolio atau hubungkan repository. Publish directory adalah root project.

## Catatan Performa

- Tidak ada framework JavaScript.
- Animasi scroll memakai `IntersectionObserver`.
- Efek pointer desktop otomatis tidak digunakan pada pointer kasar/touchscreen.
- `prefers-reduced-motion` didukung.
- Tidak ada video, library animasi besar, atau preloader berat.

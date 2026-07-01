# Kira Creator Hub

Platform belajar untuk content creator Indonesia yang ingin belajar Facebook Professional Mode, Monetisasi Konten, dan Affiliate Marketing.

## Tech Stack

- HTML5
- Vanilla CSS (Custom Properties / Design System)
- Vanilla JavaScript (ES Modules)
- Lucide Icons (CDN)

## Cara Menjalankan Secara Lokal

Karena project ini menggunakan ES Modules (`import`/`export`), Anda tidak bisa membuka `index.html` langsung dari file explorer (akan terkena kebijakan CORS browser).

Anda membutuhkan local web server. Cara paling mudah:

1. Install [Node.js](https://nodejs.org/)
2. Buka terminal di folder project ini
3. Jalankan perintah:
   ```bash
   npx serve
   ```
4. Buka browser dan akses `http://localhost:3000`

## Deploy ke Vercel

Project ini 100% static dan siap deploy tanpa konfigurasi tambahan.

1. Push project ini ke GitHub.
2. Buka [Vercel](https://vercel.com/).
3. Klik "Add New Project" -> Import Repository GitHub Anda.
4. Framework Preset: **Other**
5. Build Command: *Kosongkan*
6. Output Directory: *Kosongkan* (atau `.`
7. Klik Deploy.

Vercel akan langsung menyajikan file `index.html` dan mengatur header MIME type untuk ES Modules dengan benar.

## Aturan Project

Baca file [PROJECT_RULE.md](./PROJECT_RULE.md) untuk memahami arsitektur dan konvensi pengembangan.
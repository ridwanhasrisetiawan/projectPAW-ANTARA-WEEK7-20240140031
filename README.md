# Express + SQLite API (MVC, Simple)

REST API sederhana pola **MVC** (Model – Controller – Route). Backend murni, tanpa view, tanpa JWT.
Fitur aktif: **Login**. Fitur **Register** di-TODO (lihat bagian bawah).

## 📁 Struktur

```
src/
├── config/
│   └── database.js           # Koneksi & init schema SQLite
├── models/
│   └── user.model.js          # Query + logic dasar user (termasuk hash/compare password)
├── controllers/
│   └── auth.controller.js     # Terima req, validasi ringan, panggil Model, kirim response
├── routes/
│   ├── index.js                # Aggregator route + health check
│   └── auth.routes.js          # Endpoint /auth/*
├── middlewares/
│   └── errorHandler.middleware.js  # 404 handler + global error handler
├── utils/
│   └── ApiResponse.js          # Helper response standar (sendSuccess / sendError)
├── database/
│   ├── seed.js                 # Seeder user demo
│   └── app.db                   # File database SQLite (auto-generate)
├── app.js                       # Konfigurasi Express
└── server.js                    # Entry point
```

**Alur:** `Route` → `Controller` (validasi + logic) → `Model` (query DB) → `Controller` kirim response.
Simple, gak ada layer tambahan (service/repository), gak ada JWT.

## 🚀 Cara Jalanin

```bash
npm install
cp .env.example .env
npm run seed      # bikin akun demo
npm run dev       # jalanin pakai nodemon (auto-reload)
```

Server jalan di `http://localhost:3000`.

## 🔑 Akun Demo (dari seed)

| Email             | Password |
| ----------------- | -------- |
| admin@example.com | 12345678 |
| rizki@example.com | 12345678 |

## 📡 Endpoints

### `GET /api/health`

Cek server hidup.

### `POST /api/auth/login`

**Body:**

```json
{ "email": "admin@example.com", "password": "admin123" }
```

**Sukses (200):**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login berhasil",
  "data": {
    "user": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@example.com",
      "created_at": "2026-08-03 10:15:28"
    }
  },
  "timestamp": "2026-08-03T10:15:37.390Z"
}
```

Tidak ada token — cuma balikin data user. Kalau nanti butuh "state login" antar-request,
tinggal tambah `express-session` di `app.js`, gampang.

**Gagal - salah kredensial (401):**

```json
{
  "success": false,
  "statusCode": 401,
  "message": "Email atau password salah",
  "timestamp": "..."
}
```

**Gagal - field kosong (400):**

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Email dan password wajib diisi",
  "timestamp": "..."
}
```

## 📐 Format Response

**Sukses:** `{ success: true, statusCode, message, data, timestamp }`
**Error:** `{ success: false, statusCode, message, errors?, timestamp }`

## ✅ TODO: Register

Sudah disiapkan contoh kode-nya (tinggal uncomment):

1. `src/models/user.model.js` — `User.create()` sudah siap dipakai, tidak perlu diubah.
2. `src/controllers/auth.controller.js` — tambahkan method `register()` (contoh ada di comment).
3. `src/routes/auth.routes.js` — daftarkan `router.post('/register', authController.register)`.

## 🛠️ Stack

- **Express** — HTTP framework
- **better-sqlite3** — SQLite driver (synchronous)
- **bcryptjs** — hash & compare password
- **nodemon** — auto-reload dev
- **cors**, **morgan** — CORS & request logging

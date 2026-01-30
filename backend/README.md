# Backend - Pengelolaan Dana Bergulir

AdonisJS 6 API server implementing Clean Architecture patterns.

## 🏗️ Architecture Detail

Aplikasi ini menggunakan pola **Layered Architecture**:

1. **Entities (Models)**: Representasi data transaksi di database (`app/models/transaction.ts`).
2. **Repositories**: Layer akses data. Implementasi Lucid ORM diisolasi di sini (`app/repositories/`).
3. **Interfaces**: Kontrak untuk Repositori agar mendukung Dependency Inversion (`app/interfaces/`).
4. **Services**: Mengandung Business Logic utama, seperti kalkulasi saldo dashboard (`app/services/`).
5. **Controllers**: Menangani HTTP Request, validasi input, dan memetakan response ke JSON (`app/controllers/`).

## 🛠️ Technical Commands

- `node ace migration:run`: Menjalankan migrasi database SQLite.
- `npm run dev`: Menjalankan server development dengan Hot Module Replacement (HMR).
- `npm run typecheck`: Memvalidasi integritas tipe TypeScript.
- `node ace list:routes`: Melihat semua endpoint API yang tersedia.

## 🔑 API Endpoints

- `GET /api/transactions`: Mendapatkan data dashboard (saldo, summary, history).
- `POST /api/transactions`: Mencatat transaksi baru.

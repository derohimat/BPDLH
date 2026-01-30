# Frontend - Pengelolaan Dana Bergulir

Vue 3 + Vite application for monitoring and recording revolving fund transactions.

## 🏗️ Technical Approach

- **Composition API**: Menggunakan `<script setup>` untuk logic komponen yang lebih clean dan reaktif.
- **Repository Pattern (API Layer)**: Memisahkan pemanggilan Axios ke dalam `src/api/transactionRepo.js` agar komponen frontend tidak berinteraksi langsung dengan instance Axios.
- **Reactive Data Binding**: Sinkronisasi otomatis antara Dashboard Summary dan Tabel Riwayat setelah transaksi baru disimpan.
- **Responsive Design**: Layout dashboard yang adaptif menggunakan CSS Grid.

## 🛠️ Technical Commands

- `npm install`: Menginstall dependencies (Vue, Axios, Vite).
- `npm run dev`: Menjalankan development server.
- `npm run build`: Membangun bundle produksi di folder `dist/`.

## 📂 Project Structure

- `src/api/`: Abstraksi pemanggilan REST API.
- `src/components/`: Komponen UI reusable (Cards, Form, List).
- `src/views/`: Komponen halaman utama (Dashboard).

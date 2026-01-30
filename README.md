# Pengelolaan Dana Bergulir

Aplikasi Pengelolaan Dana Bergulir built with a modern tech stack focused on maintainability and scalability.

## 🚀 Tech Stack

### Backend

- **Framework**: [AdonisJS 6](https://adonisjs.com/) (Node.js)
- **Database**: SQLite (via Lucid ORM)
- **Architecture**: **Clean Architecture** (Layered: Controller -> Service -> Repository)
- **Validation**: VineJS

### Frontend

- **Framework**: [Vue 3](https://vuejs.org/) (Vite)
- **State Management**: Composition API (reactive/ref)
- **HTTP Client**: Axios
- **Styling**: Vanilla CSS with Modern Aesthetics

---

## 🛠️ Cara Pakai (Usage)

### 1. Prerequisites

Pastikan Anda memiliki:

- Node.js (v20.x or higher)
- npm

### 2. Backend Setup

```bash
cd backend
npm install
node ace migration:run
npm run dev
```

*Backend akan berjalan di `http://localhost:3333`.*

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

*Frontend akan berjalan di `http://localhost:5173`.*

---

## 🧪 Cara Testing

### Manual Testing

1. Buka browser ke `http://localhost:5173`.
2. **Dashboard**: Pastikan saldo awal dan riwayat tampil.
3. **Input Dana**: Masukkan nominal dan simpan. Saldo harus bertambah.
4. **Salur Dana**: Masukkan pengeluaran. Saldo harus berkurang.
5. **Kembali Dana**: Masukkan cicilan. Saldo harus bertambah kembali.

### Technical Testing

- **Backend Typecheck**: `cd backend && npm run typecheck`
- **Frontend Build**: `cd frontend && npm run build`

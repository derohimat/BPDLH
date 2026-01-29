<template>
  <div class="summary-grid">
    <div class="card">
      <h3>Saldo Saat Ini</h3>
      <p class="balance">{{ formatCurrency(balance) }}</p>
    </div>
    <div class="card">
      <h3>Total Masuk</h3>
      <p class="amount input">{{ formatCurrency(summary.input) }}</p>
    </div>
    <div class="card">
      <h3>Total Salur</h3>
      <p class="amount salur">{{ formatCurrency(summary.salur) }}</p>
    </div>
    <div class="card">
      <h3>Total Kembali</h3>
      <p class="amount kembali">{{ formatCurrency(summary.kembali) }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  balance: Number,
  summary: {
    type: Object,
    default: () => ({ input: 0, salur: 0, kembali: 0 })
  }
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value || 0)
}
</script>

<style scoped>
.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

@media (min-width: 1440px) {
  .summary-grid {
    grid-template-columns: repeat(4, 1fr); /* Force 4 columns on large screens to prevent stretching */
  }
}

@media (max-width: 640px) {
  .summary-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .card {
    padding: 1.25rem;
  }
}

.card {
  background: white;
  padding: clamp(1.25rem, 3vw, 2rem);
  border-radius: 20px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03);
  text-align: center;
  border: 1px solid #f3f4f6;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
  border-color: #e5e7eb;
}

.card h3 {
  font-size: 0.75rem;
  font-weight: 700;
  color: #9ca3af;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.balance {
  font-size: clamp(1.25rem, 3vw, 1.875rem);
  font-weight: 800;
  color: #2563eb;
  letter-spacing: -0.025em;
}

.amount {
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 700;
  letter-spacing: -0.01em;
}

.input { color: #10b981; }
.salur { color: #f59e0b; }
.kembali { color: #06b6d4; }
</style>

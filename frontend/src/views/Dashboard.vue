<template>
  <div class="container">
    <header class="header">
      <h1>Pengelolaan Dana Bergulir</h1>
      <button class="btn-add" @click="isFormOpen = true">
        <span class="plus-icon">+</span>
        Tambah Transaksi
      </button>
    </header>

    <main>
      <SummaryCard :balance="balance" :summary="summary" />
      <TransactionForm 
        :show="isFormOpen" 
        @close="isFormOpen = false" 
        @submit="handleCreate" 
      />
      <TransactionList :transactions="transactions" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import transactionRepo from '../api/transactionRepo'
import SummaryCard from '../components/SummaryCard.vue'
import TransactionForm from '../components/TransactionForm.vue'
import TransactionList from '../components/TransactionList.vue'

const transactions = ref([])
const balance = ref(0)
const summary = ref({ input: 0, salur: 0, kembali: 0 })
const isFormOpen = ref(false)

const fetchData = async () => {
  try {
    const response = await transactionRepo.getDashboardData()
    // backend response: { status: 'success', data: { balance, summary, transactions } }
    const { data } = response.data
    balance.value = data.balance
    summary.value = data.summary
    transactions.value = data.transactions
  } catch (error) {
    console.error('Failed to fetch data', error)
  }
}

const handleCreate = async (payload) => {
  try {
    await transactionRepo.createTransaction(payload)
    isFormOpen.value = false
    await fetchData()
  } catch (error) {
    console.error('Failed to create transaction', error)
    alert('Gagal menyimpan transaksi')
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.container {
  max-width: 1400px; /* Slightly wider for modern ultra-wide screens */
  margin: 0 auto;
  padding: clamp(1rem, 5vw, 3rem); /* Fluid padding */
  font-family: 'Inter', sans-serif;
  color: #1f2937;
  min-height: 100vh;
}

@media (max-width: 640px) {
  .container {
    padding: 1rem;
  }
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
}

.header {
  margin-bottom: clamp(2rem, 8vw, 4rem);
  border-bottom: 2px solid #f3f4f6; /* Modern subtle border */
  padding-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-size: clamp(1.5rem, 4vw, 2.5rem); /* Fluid typography */
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.025em;
}

.btn-add {
  background-color: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2), 0 2px 4px -1px rgba(37, 99, 235, 0.1);
}

@media (max-width: 640px) {
  .btn-add {
    width: 100%;
    justify-content: center;
  }
}

.btn-add:hover {
  background-color: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
}

.btn-add:active {
  transform: translateY(0);
}
.plus-icon {
  font-size: 1.25rem;
  line-height: 1;
}
</style>

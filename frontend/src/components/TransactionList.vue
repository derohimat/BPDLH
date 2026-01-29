<template>
  <div class="list-card">
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Jenis</th>
            <th>Keterangan</th>
            <th class="text-right">Nominal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in transactions" :key="t.id">
            <td class="whitespace-nowrap">{{ formatDate(t.createdAt) }}</td>
            <td>
              <span :class="['badge', t.type.toLowerCase()]">{{ t.type }}</span>
            </td>
            <td class="min-w-150">{{ t.description || '-' }}</td>
            <td class="text-right whitespace-nowrap">{{ formatCurrency(t.amount) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  transactions: Array
})

const formatDate = (date) => {
  const d = new Date(date)
  return d.toLocaleDateString('id-ID', { 
    day: '2-digit', 
    month: '2-digit', 
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
const formatCurrency = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
</script>

<style scoped>
.list-card {
  background: white;
  border-radius: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03);
  overflow: hidden;
  border: 1px solid #f3f4f6;
  margin-top: 2rem;
}
.table-responsive {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
table {
  width: 100%;
  border-collapse: collapse;
}

@media (min-width: 641px) {
  table {
    min-width: 700px;
  }
}

@media (max-width: 640px) {
  table {
    min-width: 500px; /* Still allow local scroll, but the parent will contain it */
  }
}
th, td {
  padding: 1.25rem 2rem;
  text-align: left;
}
@media (max-width: 640px) {
  th, td {
    padding: 0.75rem 0.5rem;
  }
}
thead {
  background-color: #f9fafb;
}
th {
  font-size: 0.6875rem;
  font-weight: 800;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
tbody tr {
  border-top: 1px solid #f3f4f6;
  transition: background-color 0.2s;
}
tbody tr:last-child {
  border-bottom: none;
}
tbody tr:hover {
  background-color: #f9fafb;
}
.text-right {
  text-align: right;
}
.whitespace-nowrap {
  white-space: nowrap;
}
.min-w-150 {
  min-width: 150px;
}

@media (max-width: 640px) {
  th, td {
    padding: 0.75rem 0.5rem;
  }
  .min-w-150 {
    min-width: 120px;
  }
}

td {
  font-size: 0.9375rem;
  color: #374151;
  font-weight: 500;
}

.badge {
  padding: 0.375rem 1rem;
  border-radius: 10px;
  font-size: 0.625rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.input { background-color: #ecfdf5; color: #059669; border: 1px solid #d1fae5; }
.salur { background-color: #fff7ed; color: #d97706; border: 1px solid #ffedd5; }
.kembali { background-color: #f0f9ff; color: #0284c7; border: 1px solid #e0f2fe; }

.whitespace-nowrap {
  font-variant-numeric: tabular-nums; /* Better alignment for digits */
}
</style>

<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-container">
      <div class="modal-header">
        <h3>Tambah Transaksi Baru</h3>
        <button class="close-btn" @click="close">&times;</button>
      </div>

      <div class="modal-body">
        <form @submit.prevent="submit">
          <div class="form-grid">
            <!-- Jenis Transaksi as Radio Group -->
            <div class="form-group full-width">
              <label>Jenis Transaksi</label>
              <div class="radio-group">
                <label class="radio-item" :class="{ active: form.type === 'INPUT' }">
                  <input type="radio" v-model="form.type" value="INPUT" />
                  <span class="radio-label">Input Dana</span>
                </label>
                <label class="radio-item" :class="{ active: form.type === 'SALUR' }">
                  <input type="radio" v-model="form.type" value="SALUR" />
                  <span class="radio-label">Salur Dana</span>
                </label>
                <label class="radio-item" :class="{ active: form.type === 'KEMBALI' }">
                  <input type="radio" v-model="form.type" value="KEMBALI" />
                  <span class="radio-label">Pengembalian</span>
                </label>
              </div>
            </div>

            <!-- Nominal with Currency Format -->
            <div class="form-group">
              <label>Nominal</label>
              <div class="input-wrapper">
                <span class="prefix">Rp</span>
                <input 
                  type="text" 
                  :value="displayAmount" 
                  @input="handleAmountInput"
                  placeholder="0"
                  required 
                />
              </div>
            </div>

            <!-- Keterangan as Textarea -->
            <div class="form-group">
              <label>Keterangan</label>
              <textarea 
                v-model="form.description" 
                placeholder="Tulis deskripsi transaksi di sini..."
                rows="2"
              ></textarea>
            </div>
          </div>
        </form>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn-secondary" @click="close">Batal</button>
        <button type="button" class="btn-primary" @click="submit">Simpan Transaksi</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['submit', 'close'])

const form = reactive({
  type: 'INPUT',
  amount: 0,
  description: ''
})

// Currency Formatting Logic
const displayAmount = computed(() => {
  if (!form.amount) return ''
  return new Intl.NumberFormat('id-ID').format(form.amount)
})

const handleAmountInput = (e) => {
  const value = e.target.value.replace(/\D/g, '')
  form.amount = value ? parseInt(value, 10) : 0
}

const close = () => {
  emit('close')
}

const submit = () => {
  if (form.amount <= 0) return
  emit('submit', { ...form })
  resetForm()
}

const resetForm = () => {
  form.amount = 0
  form.description = ''
  form.type = 'INPUT'
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1.5rem;
  transition: opacity 0.3s ease;
}

.modal-container {
  background: white;
  width: 100%;
  max-width: 520px;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  animation: modal-anim 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@media (max-width: 640px) {
  .modal-overlay {
    padding: 0;
    align-items: flex-end;
  }
  .modal-container {
    max-width: 95vw;
    width: 100%;
    margin: 0 auto;
    border-radius: 24px;
    max-height: 90vh;
  }
}

@keyframes modal-anim {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@media (max-width: 640px) {
  @keyframes modal-anim {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
}

.modal-header {
  padding: 1.5rem 2.5rem;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 640px) {
  .modal-header {
    padding: 1.25rem 1.5rem;
  }
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.025em;
}

.close-btn {
  background: #f9fafb;
  border: none;
  font-size: 1.125rem;
  color: #9ca3af;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.close-btn:hover {
  background: #f3f4f6;
  color: #ef4444; /* Subtle red on hover for destructive close action */
  transform: rotate(90deg);
}

.modal-body {
  padding: 2.5rem;
}

@media (max-width: 640px) {
  .modal-body {
    padding: 1.5rem;
  }
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group label {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Premium Radio Group */
.radio-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  background: #f9fafb;
  padding: 0.5rem;
  border-radius: 16px;
  border: 1px solid #f3f4f6;
}

@media (max-width: 640px) {
  .radio-group {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}

.radio-item {
  position: relative;
  cursor: pointer;
}

.radio-item input {
  position: absolute;
  opacity: 0;
}

.radio-label {
  display: block;
  padding: 0.75rem 0.5rem;
  text-align: center;
  background: transparent;
  border-radius: 12px;
  font-size: 0.8125rem;
  font-weight: 700;
  color: #6b7280;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.radio-item.active .radio-label {
  background: white;
  color: #2563eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Input & Textarea */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.prefix {
  position: absolute;
  left: 1rem;
  color: #9ca3af;
  font-size: 1rem;
  font-weight: 700;
}

input[type="text"], textarea {
  padding: 1rem;
  border: 2px solid #f3f4f6;
  border-radius: 16px;
  width: 100%;
  box-sizing: border-box; /* Ensure padding doesn't cause overflow */
  font-size: 1rem;
  color: #111827;
  font-weight: 500;
  transition: all 0.2s;
  background-color: #f9fafb;
  -webkit-appearance: none;
}

input[type="text"]:focus, textarea:focus {
  outline: none;
  border-color: #2563eb;
  background-color: white;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

input[type="text"] { padding-left: 3rem; }
textarea { min-height: 120px; resize: none; }

.modal-footer {
  padding: 1.5rem 2.5rem;
  background: white;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  border-top: 1px solid #f3f4f6;
}

@media (max-width: 640px) {
  .modal-footer {
    padding: 1.25rem 1.5rem;
    flex-direction: column-reverse;
    padding-bottom: calc(1.25rem + env(safe-area-inset-bottom));
  }
}

.btn-primary, .btn-secondary {
  min-height: 52px;
  border-radius: 16px;
  font-size: 1rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 0 2rem;
  border: none;
  cursor: pointer;
  font-weight: 800;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
}

.btn-primary:hover {
  background-color: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #4b5563;
  padding: 0 1.5rem;
  border: none;
  cursor: pointer;
  font-weight: 700;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
  color: #111827;
}
</style>

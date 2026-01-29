import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3333/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default {
    getDashboardData() {
        return api.get('/transactions')
    },
    createTransaction(payload) {
        return api.post('/transactions', payload)
    },
}

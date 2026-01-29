import { inject } from '@adonisjs/core'
import TransactionRepository from '#repositories/TransactionRepository'

@inject()
export default class TransactionService {
    constructor(protected transactionRepo: TransactionRepository) { }

    async getDashboardData() {
        const summary = await this.transactionRepo.getSummary()
        const history = await this.transactionRepo.findAll()

        const currentBalance = (summary.input + summary.kembali) - summary.salur

        return {
            balance: currentBalance,
            summary: summary,
            transactions: history,
        }
    }

    async recordTransaction(payload: any) {
        return this.transactionRepo.create(payload)
    }
}

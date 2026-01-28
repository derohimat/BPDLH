import Transaction from '#models/transaction'
import TransactionRepositoryInterface from '#interfaces/TransactionRepositoryInterface'

export default class TransactionRepository implements TransactionRepositoryInterface {
    async findAll(): Promise<Transaction[]> {
        return Transaction.query().orderBy('created_at', 'desc')
    }

    async create(payload: Partial<Transaction>): Promise<Transaction> {
        return Transaction.create(payload)
    }

    async getSummary(): Promise<{ input: number; salur: number; kembali: number }> {
        const input = await Transaction.query().where('type', 'INPUT').sum('amount as total').first()
        const salur = await Transaction.query().where('type', 'SALUR').sum('amount as total').first()
        const kembali = await Transaction.query().where('type', 'KEMBALI').sum('amount as total').first()

        return {
            input: Number(input?.$extras.total || 0),
            salur: Number(salur?.$extras.total || 0),
            kembali: Number(kembali?.$extras.total || 0),
        }
    }
}

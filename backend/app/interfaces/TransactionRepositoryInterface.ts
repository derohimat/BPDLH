import Transaction from '#models/transaction'

export default interface TransactionRepositoryInterface {
    findAll(): Promise<Transaction[]>
    create(payload: Partial<Transaction>): Promise<Transaction>
    getSummary(): Promise<{ input: number; salur: number; kembali: number }>
}

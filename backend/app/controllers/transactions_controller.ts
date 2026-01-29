import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import TransactionService from '#services/TransactionService'
import { createTransactionValidator } from '#validators/create_transaction'

@inject()
export default class TransactionsController {
    constructor(protected transactionService: TransactionService) { }

    async index({ response }: HttpContext) {
        const data = await this.transactionService.getDashboardData()
        return response.ok({ status: 'success', data })
    }

    async store({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createTransactionValidator)
        const transaction = await this.transactionService.recordTransaction(payload)
        return response.created({ status: 'success', data: transaction })
    }
}
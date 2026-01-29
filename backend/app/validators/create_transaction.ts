import vine from '@vinejs/vine'

export const createTransactionValidator = vine.compile(
    vine.object({
        type: vine.enum(['INPUT', 'SALUR', 'KEMBALI']),
        amount: vine.number().min(0),
        description: vine.string().optional(),
    })
)
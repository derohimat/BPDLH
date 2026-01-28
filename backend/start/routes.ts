import router from '@adonisjs/core/services/router'
const TransactionsController = () => import('#controllers/transactions_controller')

router.group(() => {
  router.get('/transactions', [TransactionsController, 'index'])
  router.post('/transactions', [TransactionsController, 'store'])
}).prefix('api')

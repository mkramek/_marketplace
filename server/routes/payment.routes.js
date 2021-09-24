import express from 'express'
import paymentCtrl from '../controllers/mail.controller'

const router = express.Router()

router.route('/api/payment/verify')
    .post(paymentCtrl.verifyPayment)

export default router

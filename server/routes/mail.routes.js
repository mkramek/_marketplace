import express from 'express'
import mailCtrl from '../controllers/mail.controller'

const router = express.Router()

router.route('/api/mail/send')
    .post(mailCtrl.sendEmail)

export default router

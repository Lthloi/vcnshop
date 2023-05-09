import express from 'express'
import {
    initPayment,
} from '../controllers/order_controllers.js'
import { verifyJWTtoken }from '../middlewares/verify_user.js'

const router = express.Router()

router.post('/initPayment', verifyJWTtoken, initPayment)

export default router
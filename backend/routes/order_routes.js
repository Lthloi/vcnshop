import express from 'express'
import {
    initPayment, newOrder, sendReceipt,
    getOrder, getOrders,
} from '../controllers/order_controllers.js'
import { verifyJWTtoken } from '../middlewares/verify_user.js'

const router = express.Router()

router.post('/initPayment', verifyJWTtoken, initPayment)

router.post('/newOrder', verifyJWTtoken, newOrder)

router.post('/sendReceiptViaEmail', verifyJWTtoken, sendReceipt)

router.get('/getOrder', verifyJWTtoken, getOrder)

router.get('/getOrders', verifyJWTtoken, getOrders)

export default router
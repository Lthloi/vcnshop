import express from 'express'
import {
    initPlaceOrder, completePlaceOrder, sendReceipt,
    getOrder, getOrders,
} from '../controllers/order_controllers.js'
import { verifyJWTtoken } from '../middlewares/verify_user.js'

const router = express.Router()

router.post('/initPlaceOrder', verifyJWTtoken, initPlaceOrder)

router.post('/completePlaceOrder', verifyJWTtoken, completePlaceOrder)

router.post('/sendReceiptViaEmail', verifyJWTtoken, sendReceipt)

router.get('/getOrder', verifyJWTtoken, getOrder)

router.get('/getOrders', verifyJWTtoken, getOrders)

export default router
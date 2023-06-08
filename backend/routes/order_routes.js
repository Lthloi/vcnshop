import express from 'express'
import {
    initPlaceOrder, completePlaceOrder, sendReceipt,
    getOrder, getOrders, getOrdersByAdmin,
} from '../controllers/order_controllers.js'
import { roleAuthorization, verifyJWTtoken } from '../middlewares/auth.js'

const router = express.Router()

router.use(verifyJWTtoken)

router.post('/initPlaceOrder', initPlaceOrder)

router.post('/completePlaceOrder', completePlaceOrder)

router.post('/sendReceiptViaEmail', sendReceipt)

router.get('/getOrder', getOrder)

router.get('/getOrders', getOrders)

router.get('/getOrdersByAdmin', roleAuthorization('Admin'), getOrdersByAdmin)

export default router
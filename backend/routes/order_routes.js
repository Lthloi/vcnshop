import express from 'express'
import {
    initPlaceOrder, completePlaceOrder, sendReceipt,
    getOrder, getOrders, getOrdersByAdmin,
    getOrdersForShop, getOrderForShop,
} from '../controllers/order_controllers.js'
import { roleAuthorization, verifyJWTtoken, verifyShop } from '../middlewares/auth.js'

const router = express.Router()

router.use(verifyJWTtoken)

router.post('/initPlaceOrder', initPlaceOrder)

router.post('/completePlaceOrder', completePlaceOrder)

router.post('/sendReceiptViaEmail', sendReceipt)

router.get('/getOrder', getOrder)

router.get('/getOrders', getOrders)

router.get('/getOrdersForShop', verifyShop, getOrdersForShop)

router.get('/getOrderForShop', verifyShop, getOrderForShop)

router.get('/getOrdersByAdmin', roleAuthorization('Admin'), getOrdersByAdmin)

export default router
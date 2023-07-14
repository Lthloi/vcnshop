import express from 'express'
import {
    getStripeKey,
    initPlaceOrder, completePlaceOrder, sendReceipt,
    getOrder, getOrders, getOrdersByAdmin,
    getOrdersForShop, findOrdersWithProductId,
    getOneOrderForShop,
} from '../controllers/order_controllers.js'
import { roleAuthorization, verifyJWTtoken, verifyShop } from '../middlewares/auth.js'

const router = express.Router()

router.use(verifyJWTtoken)

router.get('/getStripeKey', getStripeKey)

router.post('/initPlaceOrder', initPlaceOrder)

router.put('/completePlaceOrder', completePlaceOrder)

router.post('/sendReceiptViaEmail', sendReceipt)

router.get('/getOrder', getOrder)

router.get('/getOrders', getOrders)

router.get('/getOrdersForShop', verifyShop, getOrdersForShop)

router.get('/findOrdersWithProductId', verifyShop, findOrdersWithProductId)

router.get('/getOrdersByAdmin', roleAuthorization('Admin'), getOrdersByAdmin)

router.get('/getOneOrderForShop', getOneOrderForShop)

export default router
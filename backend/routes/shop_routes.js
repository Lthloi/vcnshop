import express from 'express'
import {
    getShop, createShop, getShopsByAdmin,
} from '../controllers/shop_controller.js'
import { roleAuthorization, verifyJWTtoken } from '../middlewares/auth.js'

const router = express.Router()

router.get('/getShop/:shopId', getShop)
router.get('/getShopForUser', verifyJWTtoken, getShop)

router.post('/createShop', verifyJWTtoken, createShop)

router.get('/getShopsByAdmin', verifyJWTtoken, roleAuthorization('Admin'), getShopsByAdmin)

export default router